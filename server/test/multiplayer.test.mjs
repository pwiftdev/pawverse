// ─── TOPPLE multiplayer integration test ─────────────────────────────────────
// Plain node + ws, no framework. Starts the real server on an ephemeral port,
// connects clients, and checks movement replication, acks, shoves, bumps,
// fall drama, leaderboards — plus unit checks of the tower generator, the
// shared platformer integrator, interest management, and highscores.
// Run: node server/test/multiplayer.test.mjs

import { WebSocket } from "ws";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { createServer } from "../index.js";
import { withinInterest, filterVisible } from "../interest.js";
import { Highscores } from "../highscores.js";
import { C2S, S2C, EVENTS } from "../../shared/protocol.js";
import {
  INTEREST_RADIUS,
  WALK_SPEED,
  SAFE_ALTITUDE,
  VOID_Y,
  JUMP_VELOCITY,
  MAX_ALTITUDE,
  BLOB_COLORS,
} from "../../shared/constants.js";
import {
  PLATFORMS,
  islandHeightAt,
  supportAt,
  landingAt,
  P_BOUNCY,
  P_REST,
  MAX_EDGE_GAP,
  MAX_RISE,
  SPAWN,
} from "../../shared/tower.js";
import { createMoveState, stepMovement } from "../../shared/movement.js";
import { isOriginAllowed, parseAllowedOrigins } from "../origins.js";
import { reconnectDelay } from "../../client/src/reconnect.js";

// ── tiny assert helper ───────────────────────────────────────────────────────
let failures = 0;
function check(label, cond, extra = "") {
  if (cond) console.log(`PASS  ${label}`);
  else {
    failures++;
    console.log(`FAIL  ${label}${extra ? " — " + extra : ""}`);
  }
}

// ── ws test client with predicate-based waiting (checks backlog first) ──────
function connect(port, origin) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      `ws://127.0.0.1:${port}/ws`,
      origin ? { origin } : undefined,
    );
    const c = {
      ws,
      msgs: [],
      waiters: [],
      send: (o) => ws.send(JSON.stringify(o)),
      waitFor(pred, ms = 2500, label = "message") {
        const hit = c.msgs.find((m) => safe(pred, m));
        if (hit) return Promise.resolve(hit);
        return new Promise((res, rej) => {
          const timer = setTimeout(
            () => rej(new Error(`timeout waiting for ${label}`)),
            ms,
          );
          c.waiters.push({ pred, resolve: res, timer });
        });
      },
    };
    ws.on("message", (data) => {
      let m;
      try {
        m = JSON.parse(data);
      } catch {
        return;
      }
      c.msgs.push(m);
      c.waiters = c.waiters.filter((w) => {
        if (!safe(w.pred, m)) return true;
        clearTimeout(w.timer);
        w.resolve(m);
        return false;
      });
    });
    ws.on("open", () => resolve(c));
    ws.on("error", reject);
  });
}
function safe(pred, m) {
  try {
    return pred(m);
  } catch {
    return false;
  }
}

function rejectedStatus(port, origin) {
  return new Promise((resolve) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/ws`, { origin });
    ws.on("unexpected-response", (request, response) => {
      response.resume();
      resolve(response.statusCode);
    });
    ws.on("open", () => {
      ws.close();
      resolve(101);
    });
    ws.on("error", () => {});
  });
}

// ── main ─────────────────────────────────────────────────────────────────────
const srv = createServer({ port: 0 });
const port = await srv.listen();

const watchdog = setTimeout(() => {
  console.log("FAIL  global timeout (14s)");
  process.exit(1);
}, 14000);

try {
  // 1) Two blobs join.
  const A = await connect(port);
  const B = await connect(port);
  A.send({ t: C2S.JOIN, name: "Alpha", color: 3 });
  B.send({ t: C2S.JOIN, name: "Bravo", color: 99 }); // invalid → random
  const wA = await A.waitFor((m) => m.t === S2C.WELCOME, 2500, "welcome A");
  const wB = await B.waitFor((m) => m.t === S2C.WELCOME, 2500, "welcome B");
  check(
    "both clients got WELCOME with distinct ids",
    wA.id !== undefined && wB.id !== undefined && wA.id !== wB.id,
  );
  check("WELCOME settings.tick = 30", wB.settings && wB.settings.tick === 30);
  check("valid color survives sanitization", wA.you.col === 3);
  check(
    "invalid color is normalized into the palette",
    Number.isInteger(wB.you.col) &&
      wB.you.col >= 0 &&
      wB.you.col < BLOB_COLORS.length,
  );
  check(
    "WELCOME carries players + all-time board",
    Array.isArray(wB.players) && Array.isArray(wB.best),
  );
  check(
    "spawn is on the island at island height",
    Math.hypot(wA.you.p[0], wA.you.p[2]) < 15 &&
      Math.abs(wA.you.p[1] - (islandHeightAt(wA.you.p[0], wA.you.p[2]) ?? -9)) <
        0.05,
  );

  // 2) B sees A in STATE (same island → inside interest radius).
  const firstStateWithA = await B.waitFor(
    (m) => m.t === S2C.STATE && m.players.some((d) => d.id === wA.id),
    2500,
    "B state containing A",
  );
  const aStart = firstStateWithA.players.find((d) => d.id === wA.id).p;

  // 3) A moves forward; dt 0.5 must be clamped server-side to 0.1 s.
  let seq = 1;
  for (let i = 0; i < 12; i++)
    A.send({ t: C2S.INPUT, seq: seq++, f: true, yaw: 0, dt: 0.5 });
  const moved = await B.waitFor(
    (m) => {
      if (m.t !== S2C.STATE) return false;
      const d = m.players.find((x) => x.id === wA.id);
      if (!d) return false;
      return Math.hypot(d.p[0] - aStart[0], d.p[2] - aStart[2]) > 0.5;
    },
    2000,
    "A moved on B",
  );
  const aNow = moved.players.find((x) => x.id === wA.id).p;
  const dist = Math.hypot(aNow[0] - aStart[0], aNow[2] - aStart[2]);
  check(
    "A moved on B via INPUT replication",
    dist > 0.5,
    `d=${dist.toFixed(2)}`,
  );
  check(
    "dt clamped to ≤0.1 s (moved < 12 m)",
    dist < 12,
    `d=${dist.toFixed(2)}`,
  );

  // 4) A's own STATE carries an ack for the processed inputs.
  const acked = await A.waitFor(
    (m) => m.t === S2C.STATE && m.ack >= 1,
    2000,
    "ack",
  );
  check(
    "STATE ack tracks last processed seq",
    acked.ack >= 1,
    `ack=${acked.ack}`,
  );

  // 5) CHAT replicates to B (and is sanitized).
  A.send({ t: C2S.CHAT, text: "  going up  " });
  const chat = await B.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.CHAT,
    2000,
    "chat event",
  );
  check(
    "B received sanitized CHAT from A",
    chat.id === wA.id && chat.text === "going up",
  );

  // 6) Shove: server owns range, cone, cooldown, and the truce zone.
  const pa = srv.game.players.get(wA.id);
  const pb = srv.game.players.get(wB.id);
  // Truce: both on the island (below SAFE_ALTITUDE) → shove refused.
  pa.move.x = 0;
  pa.move.z = 0;
  pa.move.y = 1;
  pb.move.x = 0;
  pb.move.z = -1.5;
  pb.move.y = 1;
  pa.move.yaw = 0; // faces −z, straight at B
  pa.lastShove = 0;
  const vbBefore = Math.hypot(pb.move.vx, pb.move.vz);
  srv.game.onShove(pa);
  check(
    "island is a truce zone (no shove below SAFE_ALTITUDE)",
    Math.hypot(pb.move.vx, pb.move.vz) === vbBefore &&
      pa.move.y < SAFE_ALTITUDE,
  );
  // Up on the tower the shove lands.
  pa.move.y = pb.move.y = 30;
  pa.lastShove = 0;
  const shoveEvP = B.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.SHOVE && m.to === wB.id,
    2000,
    "shove event",
  );
  srv.game.onShove(pa);
  const shoveEv = await shoveEvP;
  check(
    "shove launches the target with lift",
    shoveEv.from === wA.id &&
      Math.hypot(pb.move.vx, pb.move.vz) > 5 &&
      pb.move.vy > 0 &&
      pb.move.grounded === false,
  );
  const vAfter = Math.hypot(pb.move.vx, pb.move.vz);
  srv.game.onShove(pa); // immediate second — cooldown blocks
  check(
    "shove cooldown blocks immediate repeat",
    Math.hypot(pb.move.vx, pb.move.vz) === vAfter,
  );

  // 7) Bumps: overlapping blobs get separated and impulsed apart.
  pa.move.x = 0;
  pa.move.z = 0;
  pa.move.y = 30;
  pb.move.x = 0.3;
  pb.move.z = 0;
  pb.move.y = 30;
  pa.move.vx = 3;
  pb.move.vx = -3;
  srv.game.resolveBumps(Date.now());
  check(
    "bump separates overlapping blobs and reverses approach",
    Math.abs(pb.move.x - pa.move.x) > 0.6 && pb.move.vx > pa.move.vx,
    `dx=${Math.abs(pb.move.x - pa.move.x).toFixed(2)}`,
  );

  // 8) Fall drama: landing far below the high-water mark → BIGFALL broadcast.
  pa.hiMark = 200;
  pa.move.y = 40;
  const fallP = B.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.BIGFALL && m.id === wA.id,
    2000,
    "bigfall event",
  );
  srv.game.trackAltitude(pa, { landed: true, voided: false });
  const fall = await fallP;
  check(
    "BIGFALL carries the drop and resets the watermark",
    fall.drop === 160 && fall.n === "Alpha" && pa.hiMark === pa.move.y,
  );

  // 9) Cloud-sea rescue → VOIDED broadcast.
  const voidP = B.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.VOIDED && m.id === wA.id,
    2000,
    "voided event",
  );
  srv.game.trackAltitude(pa, { landed: false, voided: true });
  await voidP;
  check("VOIDED reaches other players", true);

  // 10) Leaderboard: live + all-time + rank + crown.
  pa.move.y = 120; // A is clearly the leader (above CROWN_MIN_ALT)
  const crownP = B.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.CROWN && m.id === wA.id,
    4000,
    "crown event",
  );
  const lb = await B.waitFor(
    (m) => m.t === S2C.LEADERBOARD,
    4000,
    "leaderboard",
  );
  check(
    "LEADERBOARD has live rows, all-time rows, own rank",
    Array.isArray(lb.live) &&
      lb.live.length >= 1 &&
      Array.isArray(lb.all) &&
      typeof lb.rank === "number" &&
      lb.live.every(
        (r) => typeof r.n === "string" && typeof r.alt === "number",
      ),
  );
  const crown = await crownP;
  check(
    "CROWN announces the new leader",
    crown.n === "Alpha" && crown.alt >= 100,
  );
  const lb2 = await B.waitFor(
    (m) => m.t === S2C.LEADERBOARD && m.leaderId === wA.id,
    4000,
    "leader in leaderboard",
  );
  check(
    "leaderboard carries leaderId + leaderPos for the beacon",
    Array.isArray(lb2.leaderPos) && lb2.leaderPos.length === 3,
  );

  // 11) Interest filter unit checks (3D — height separation culls too).
  check(
    "withinInterest: 5 m included",
    withinInterest(0, 0, 0, 3, 4, 0) === true,
  );
  check(
    `withinInterest: ${INTEREST_RADIUS + 20} m vertical excluded`,
    withinInterest(0, 0, 0, 0, INTEREST_RADIUS + 20, 0) === false,
  );
  const filtered = filterVisible(
    0,
    0,
    0,
    [
      { id: 1, x: 0, y: 300, z: 0 },
      { id: 2, x: 5, y: 0, z: 0 },
      { id: 3, x: -500, y: 0, z: 0 },
    ],
    (e) => [e.x, e.y, e.z],
    3,
  );
  check(
    "filterVisible: far blob excluded, near blob + self kept",
    filtered.length === 2 &&
      filtered.some((e) => e.id === 2) &&
      filtered.some((e) => e.id === 3),
  );

  // 12) Origin allowlist + reconnect backoff (unchanged infrastructure).
  const allowedOrigins = parseAllowedOrigins(
    "https://topple.vercel.app/, https://play.topple.gg, invalid",
  );
  check(
    "origin allowlist normalizes and accepts configured hosts",
    allowedOrigins.size === 2 &&
      isOriginAllowed("https://topple.vercel.app", allowedOrigins),
  );
  check(
    "origin allowlist rejects missing and unconfigured origins",
    !isOriginAllowed(undefined, allowedOrigins) &&
      !isOriginAllowed("https://attacker.example", allowedOrigins),
  );
  check(
    "empty origin allowlist preserves local development",
    isOriginAllowed(undefined, new Set()),
  );
  check(
    "reconnect backoff grows and caps at fifteen seconds",
    reconnectDelay(0, 0.5) === 1000 &&
      reconnectDelay(2, 0.5) === 4000 &&
      reconnectDelay(10, 0.5) === 15000,
  );

  {
    const secureSrv = createServer({
      port: 0,
      allowedOrigins: new Set(["https://allowed.example"]),
    });
    const securePort = await secureSrv.listen();
    try {
      const accepted = await connect(securePort, "https://allowed.example");
      accepted.send({ t: C2S.JOIN, name: "Origin", color: 0 });
      const welcome = await accepted.waitFor(
        (m) => m.t === S2C.WELCOME,
        2000,
        "origin welcome",
      );
      check(
        "configured browser origin completes a WebSocket upgrade",
        !!welcome.id,
      );
      check(
        "unconfigured browser origin receives HTTP 403",
        (await rejectedStatus(securePort, "https://blocked.example")) === 403,
      );
      accepted.ws.close();
    } finally {
      await secureSrv.close();
    }
  }

  // 13) Tower generator: every platform is reachable from something below it.
  {
    const all = [
      ...PLATFORMS,
      // island counts as a launch pad for the low platforms
    ];
    let unreachable = 0;
    for (const p of PLATFORMS) {
      if (p.y < 4.5) continue; // reachable from the island dome
      let ok = false;
      for (const q of all) {
        if (q === p) continue;
        const dy = p.y - q.y;
        if (dy <= 0 || dy > MAX_RISE + 0.01) continue;
        const gap = Math.hypot(p.x - q.x, p.z - q.z) - p.r - q.r;
        if (gap <= MAX_EDGE_GAP + 0.01) {
          ok = true;
          break;
        }
      }
      if (!ok) unreachable++;
    }
    check(
      `tower: all ${PLATFORMS.length} platforms are reachable`,
      unreachable === 0,
      `${unreachable} unreachable`,
    );
    check(
      "tower: reaches the summit",
      PLATFORMS[PLATFORMS.length - 1].y >= MAX_ALTITUDE &&
        PLATFORMS[PLATFORMS.length - 1].type === P_REST,
    );
    const rests = PLATFORMS.filter((p) => p.type === P_REST).length;
    check("tower: has rest rings along the way", rests > 40, `rests=${rests}`);
  }

  // 14) Movement: momentum ramps, jumps land on platforms, pads bounce.
  {
    const s = createMoveState();
    stepMovement(s, { f: true, yaw: 0 }, 1 / 30);
    const v1 = Math.hypot(s.vx, s.vz);
    check("momentum: first step well below walk speed", v1 < WALK_SPEED * 0.6);
    for (let i = 0; i < 40; i++) stepMovement(s, { f: true, yaw: 0 }, 1 / 30);
    check(
      "momentum: converges to walk speed",
      Math.abs(Math.hypot(s.vx, s.vz) - WALK_SPEED) < 0.3,
    );
    for (let i = 0; i < 30; i++) stepMovement(s, { yaw: 0 }, 1 / 30);
    check("momentum: idle blob fully stops", s.vx === 0 && s.vz === 0);

    // jump arc: takeoff flag, apex under 2 m, lands back on the island
    let ev = stepMovement(s, { jump: true, yaw: 0 }, 1 / 30);
    check(
      "jump: takeoff event + upward velocity",
      ev.jumped && !s.grounded && s.vy > JUMP_VELOCITY - 1,
    );
    let apex = s.y,
      landed = false,
      impact = 0;
    for (let i = 0; i < 90 && !landed; i++) {
      ev = stepMovement(s, { jump: true, yaw: 0 }, 1 / 30);
      apex = Math.max(apex, s.y);
      if (ev.landed) {
        landed = true;
        impact = ev.impactVy;
      }
    }
    check(
      "jump: lands back on the island with impact",
      landed &&
        impact < -3 &&
        Math.abs(s.y - (islandHeightAt(s.x, s.z) ?? 0)) < 0.01,
    );
    check("jump: held space does not auto-rejump (latch)", s.grounded === true);
  }

  {
    // drop onto a known platform top
    const p = PLATFORMS.find((q) => q.type !== P_BOUNCY);
    const s = createMoveState();
    s.x = p.x;
    s.z = p.z;
    s.y = p.y + 2;
    s.grounded = false;
    let landed = false;
    for (let i = 0; i < 60 && !landed; i++) {
      landed = stepMovement(s, { yaw: 0 }, 1 / 30).landed;
    }
    check(
      "landing: falling body lands exactly on a platform top",
      landed && s.y === p.y && s.grounded,
    );
    const sup = supportAt(s.x, s.y, s.z);
    check("supportAt agrees with the landing", sup && sup.top === p.y);

    // bouncy pad launches
    const bp = PLATFORMS.find((q) => q.type === P_BOUNCY);
    const b = createMoveState();
    b.x = bp.x;
    b.z = bp.z;
    b.y = bp.y + 2;
    b.grounded = false;
    let bounced = false;
    for (let i = 0; i < 60 && !bounced; i++) {
      bounced = stepMovement(b, { yaw: 0 }, 1 / 30).bounced;
    }
    check("bouncy pad: landing launches upward", bounced && b.vy > 8);

    // walking off a platform edge → airborne
    const w = createMoveState();
    w.x = p.x;
    w.z = p.z;
    w.y = p.y;
    w.grounded = true;
    for (let i = 0; i < 90 && w.grounded; i++)
      stepMovement(w, { f: true, sprint: true, yaw: 0 }, 1 / 30);
    check(
      "edges: sprinting off a platform goes airborne",
      w.grounded === false,
    );

    // falling into the void → deterministic lift back to the island
    const v = createMoveState();
    v.x = 40; // off the island edge
    v.z = 0;
    v.y = 0.5;
    v.grounded = false;
    let voided = false;
    for (let i = 0; i < 200 && !voided; i++) {
      voided = stepMovement(v, { yaw: 0 }, 1 / 30).voided;
    }
    check(
      "void: cloud sea returns the blob to the island",
      voided &&
        v.grounded &&
        Math.hypot(v.x, v.z) < 12 &&
        Math.abs(v.y - (islandHeightAt(v.x, v.z) ?? -9)) < 0.01,
    );
    check("void line sits below the island", VOID_Y < -20);

    // landingAt one-way check: a body already below p's top can never land
    // on p itself (something lower — like the island — may still catch it)
    const through = landingAt(p.x, p.y - 1, p.y - 2, p.z);
    check(
      "one-way platforms: no landing on a top you're already below",
      !through || through.top <= p.y - 1,
    );
  }

  // 15) Highscores: floor, dedupe by name, ordering, persistence shape.
  {
    const file = path.join(os.tmpdir(), `topple-hs-${Date.now()}.json`);
    const hs = new Highscores(file);
    check("highscores: empty board floor is 0", hs.floor() === 0);
    hs.submit("Zed", 120);
    hs.submit("Ada", 300);
    check("highscores: sorted desc", hs.top(2)[0].n === "Ada");
    const changed = hs.submit("Zed", 90);
    check("highscores: lower score for same name rejected", changed === false);
    hs.submit("Zed", 500);
    check(
      "highscores: same name improves in place (no duplicates)",
      hs.top(5).filter((e) => e.n === "Zed").length === 1 &&
        hs.top(1)[0].alt === 500,
    );
    for (let i = 0; i < 12; i++) hs.submit(`p${i}`, 10 + i);
    check("highscores: board capped at 10", hs.entries.length === 10);
    fs.rmSync(file, { force: true });
  }

  // 16) Spawn constant sanity (used by shared movement's void rescue).
  check(
    "SPAWN sits on the island",
    (islandHeightAt(SPAWN.x, SPAWN.z) ?? -1) >= 0,
  );

  // 17) Disconnect propagation: close A, B should get LEAVE.
  const leaveP = B.waitFor(
    (m) => m.t === S2C.LEAVE && m.id === wA.id,
    2000,
    "leave event",
  );
  A.ws.close();
  const leave = await leaveP;
  check("B received LEAVE when A disconnected", leave.id === wA.id);

  B.ws.close();
} catch (err) {
  failures++;
  console.log(`FAIL  ${err.message}`);
} finally {
  clearTimeout(watchdog);
  await srv.close();
}

console.log(failures === 0 ? "ALL PASS" : `${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
