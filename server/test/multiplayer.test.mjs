// ─── PAWVERSE multiplayer integration test ───────────────────────────────────
// Plain node + ws, no framework. Starts the real server on an ephemeral port,
// connects two clients, and checks movement replication, acks, bark, chat —
// plus a unit-level check of the interest filter. Run: node server/test/multiplayer.test.mjs

import { WebSocket } from "ws";
import { createServer } from "../index.js";
import { withinInterest, filterVisible } from "../interest.js";
import { C2S, S2C, EVENTS } from "../../shared/protocol.js";
import { INTEREST_RADIUS, DIG_TIME_MS } from "../../shared/constants.js";
import {
  TREES,
  DIG_SPOTS,
  resolveObstacles,
  WALLS,
  BALL_SPAWNERS,
  groundHeightAt,
  HOWL_ROCK,
  SPAWN,
} from "../../shared/world.js";
import { WALK_SPEED } from "../../shared/constants.js";
import { createMoveState, stepMovement } from "../../shared/movement.js";
import { DigSystem } from "../digspots.js";
import { RaccoonSystem } from "../raccoons.js";
import { NpcSystem } from "../npcs.js";
import { ParkEventSystem } from "../park-events.js";
import { SCENT_SPOTS } from "../../shared/living.js";
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
      msgs: [], // full backlog so late waiters can match earlier messages
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

// Hard watchdog: never exceed the budget (leaderboard cadence needs ~3.5 s).
const watchdog = setTimeout(() => {
  console.log("FAIL  global timeout (14s)");
  process.exit(1);
}, 14000);

try {
  // 1) Three species join.
  const A = await connect(port);
  const B = await connect(port);
  const C = await connect(port);
  A.send({ t: C2S.JOIN, name: "Alpha", dog: { breed: "tabby" } });
  B.send({
    t: C2S.JOIN,
    name: "Bravo",
    dog: { breed: "raccoon" },
    discoveries: [SCENT_SPOTS[0].id, "not-a-real-scent"],
  });
  C.send({ t: C2S.JOIN, name: "Charlie", dog: { breed: "shiba" } });
  const wA = await A.waitFor((m) => m.t === S2C.WELCOME, 2500, "welcome A");
  const wB = await B.waitFor((m) => m.t === S2C.WELCOME, 2500, "welcome B");
  const wC = await C.waitFor((m) => m.t === S2C.WELCOME, 2500, "welcome C");
  check(
    "both clients got WELCOME with distinct ids",
    wA.id !== undefined && wB.id !== undefined && wA.id !== wB.id,
  );
  check("WELCOME settings.tick = 30", wB.settings && wB.settings.tick === 30);
  check(
    "cat and raccoon character presets survive server sanitization",
    wA.you.c.breed === "tabby" && wB.you.c.breed === "raccoon",
  );
  check("dog preset survives server sanitization", wC.you.c.breed === "shiba");
  check(
    "WELCOME carries full world (dogs/balls/npcs arrays)",
    Array.isArray(wB.dogs) && Array.isArray(wB.balls) && Array.isArray(wB.npcs),
  );
  check(
    "WELCOME carries the active community event",
    wB.settings?.parkEvent?.target > 0 &&
      typeof wB.settings.parkEvent.label === "string",
  );
  const bDiscoveries = srv.game.players.get(wB.id).discoveries;
  check(
    "JOIN accepts only known persisted scent ids",
    bDiscoveries.size === 1 && bDiscoveries.has(SCENT_SPOTS[0].id),
  );

  // 2) B sees A spawn nearby (same spawn area → inside interest radius).
  const firstStateWithA = await B.waitFor(
    (m) => m.t === S2C.STATE && m.dogs.some((d) => d.id === wA.id),
    2500,
    "B state containing A",
  );
  const aStart = firstStateWithA.dogs.find((d) => d.id === wA.id).p;
  check("B sees A in STATE (interest includes nearby dogs)", true);

  // 3) A moves forward; dt 0.5 must be clamped server-side to 0.1 s.
  let seq = 1;
  for (let i = 0; i < 12; i++)
    A.send({ t: C2S.INPUT, seq: seq++, f: true, yaw: 0, dt: 0.5 });
  const moved = await B.waitFor(
    (m) => {
      if (m.t !== S2C.STATE) return false;
      const d = m.dogs.find((x) => x.id === wA.id);
      if (!d) return false;
      return Math.hypot(d.p[0] - aStart[0], d.p[2] - aStart[2]) > 0.5;
    },
    2000,
    "A moved on B",
  );
  const aNow = moved.dogs.find((x) => x.id === wA.id).p;
  const dist = Math.hypot(aNow[0] - aStart[0], aNow[2] - aStart[2]);
  check(
    "A moved on B via INPUT replication",
    dist > 0.5,
    `dist=${dist.toFixed(2)}`,
  );
  // 12 inputs × clamped 0.1 s × ~4.54 m/s ≈ 5.4 m; unclamped would be ~27 m.
  check(
    "dt clamped to ≤0.1 s (moved < 12 m for 12 inputs)",
    dist < 12,
    `dist=${dist.toFixed(2)}`,
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

  // 5) BARK replicates to B with A's id.
  A.send({ t: C2S.BARK });
  const bark = await B.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.BARK,
    2000,
    "bark event",
  );
  check("B received EVENT BARK from A", bark.id === wA.id);

  // 6) CHAT replicates to B (and is sanitized).
  A.send({ t: C2S.CHAT, text: "  hello park  " });
  const chat = await B.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.CHAT,
    2000,
    "chat event",
  );
  check(
    "B received EVENT CHAT from A",
    chat.id === wA.id && chat.text === "hello park",
  );

  // PvP is dog-versus-runner only and the server owns range, life, and respawns.
  const cat = srv.game.players.get(wA.id);
  const runner = srv.game.players.get(wB.id);
  const dog = srv.game.players.get(wC.id);
  dog.move.x = runner.move.x;
  dog.move.z = runner.move.z;
  runner.protectedUntil = 0;
  runner.zoomies = 42;
  runner.treats = 3;
  runner.rep = 8;
  runner.happiness = 90;
  runner.needs = { play: 90, social: 90, explore: 90 };
  cat.move.x = dog.move.x;
  cat.move.z = dog.move.z;
  srv.game.onBite(cat, { target: dog.id });
  check("cats cannot damage dogs", dog.life === 3);
  srv.game.onBite(dog, { target: cat.id });
  check("dogs cannot damage protected runners", cat.life === 3);
  dog.move.x = runner.move.x + 20;
  srv.game.onBite(dog, { target: runner.id });
  check("server rejects out-of-range dog bites", runner.life === 3);
  dog.move.x = runner.move.x;

  for (const expectedLife of [2, 1]) {
    dog.lastBite = 0;
    srv.game.onBite(dog, { target: runner.id });
    check(
      `dog bite reduces runner life to ${expectedLife}`,
      runner.life === expectedLife,
    );
  }
  dog.lastBite = 0;
  const caughtPromise = B.waitFor(
    (m) =>
      m.t === S2C.EVENT && m.kind === EVENTS.CAUGHT && m.target === runner.id,
    2000,
    "PvP caught event",
  );
  srv.game.onBite(dog, { target: runner.id });
  const caught = await caughtPromise;
  check(
    "third dog bite catches and respawns runner",
    caught.by === dog.id &&
      runner.life === 3 &&
      Math.hypot(runner.move.x - SPAWN.x, runner.move.z - SPAWN.z) < 3,
  );
  check(
    "catch resets runner session stats",
    runner.zoomies === 0 &&
      runner.treats === 0 &&
      runner.rep === 0 &&
      runner.happiness === 50 &&
      runner.needs.play === 55 &&
      runner.needs.social === 45 &&
      runner.needs.explore === 0,
  );
  check(
    "caught runner receives spawn protection",
    runner.protectedUntil > Date.now(),
  );

  // Sniff discoveries are validated against the authoritative player position.
  const scent = SCENT_SPOTS[0];
  const playerA = srv.game.players.get(wA.id);
  playerA.move.x = scent.x;
  playerA.move.z = scent.z;
  A.send({ t: C2S.SNIFF });
  const discovery = await A.waitFor(
    (m) => m.t === S2C.EVENT && m.kind === EVENTS.DISCOVERY,
    2000,
    "sniff discovery",
  );
  check(
    "sniff discovers a nearby server-validated scent",
    discovery.spot === scent.id && playerA.discoveries.has(scent.id),
  );

  // 7) Interest filter unit checks (a dog 100 m away must be excluded).
  check("withinInterest: 5 m included", withinInterest(0, 0, 3, 4) === true);
  check(
    `withinInterest: 100 m excluded (radius ${INTEREST_RADIUS})`,
    withinInterest(0, 0, 100, 0) === false,
  );
  const filtered = filterVisible(
    0,
    0,
    [
      { id: 1, x: 100, z: 0 },
      { id: 2, x: 5, z: 0 },
      { id: 3, x: -500, z: 0 },
    ],
    (e) => [e.x, e.z],
    3,
  );
  check(
    "filterVisible: far dog excluded, near dog + self kept",
    filtered.length === 2 &&
      filtered.some((e) => e.id === 2) &&
      filtered.some((e) => e.id === 3),
  );

  const allowedOrigins = parseAllowedOrigins(
    "https://pawverse.vercel.app/, https://play.pawverse.com, invalid",
  );
  check(
    "origin allowlist normalizes and accepts configured hosts",
    allowedOrigins.size === 2 &&
      isOriginAllowed("https://pawverse.vercel.app", allowedOrigins),
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

  // 8) WELCOME carries the new world systems.
  check(
    "WELCOME carries raccoons + dig spots",
    Array.isArray(wB.raccoons) &&
      Array.isArray(wB.digs) &&
      wB.digs.length === DIG_SPOTS.length,
  );

  // 9) Leaderboard broadcast arrives with names and scores.
  const lb = await B.waitFor(
    (m) => m.t === S2C.LEADERBOARD,
    4000,
    "leaderboard",
  );
  check(
    "LEADERBOARD has top list + own rank",
    Array.isArray(lb.top) &&
      lb.top.length >= 1 &&
      typeof lb.rank === "number" &&
      lb.top.every((r) => typeof r.n === "string" && typeof r.z === "number"),
  );

  // 10) Collision: resolveObstacles pushes a point out of a tree trunk.
  {
    const tree = TREES[0];
    const p = { x: tree.x + 0.05, z: tree.z - 0.05, y: 0 };
    resolveObstacles(p, 0.35);
    const d = Math.hypot(p.x - tree.x, p.z - tree.z);
    check(
      "resolveObstacles pushes out of a tree",
      d >= 0.42 + 0.35 - 1e-6,
      `d=${d.toFixed(3)}`,
    );
  }

  // 11) Collision inside stepMovement: walking into a trunk never penetrates it.
  {
    const tree = TREES[0];
    const s = createMoveState(tree.x, tree.z + 3);
    // camera yaw 0 → forward is −z, i.e. straight at the tree
    for (let i = 0; i < 90; i++) stepMovement(s, { f: true, yaw: 0 }, 1 / 30);
    const d = Math.hypot(s.x - tree.x, s.z - tree.z);
    check(
      "stepMovement blocks at tree trunks",
      d >= 0.42 + 0.35 - 1e-6,
      `d=${d.toFixed(3)}`,
    );
  }

  // 12) Collision: yard fence wall blocks; the gate gap lets dogs through.
  {
    const wall = WALLS[0]; // north yard rail
    const p = { x: (wall.x1 + wall.x2) / 2, z: wall.z1 + 0.1, y: 0 };
    resolveObstacles(p, 0.35);
    check(
      "yard fence pushes a grounded dog out",
      Math.abs(p.z - wall.z1) >= 0.28 + 0.35 - 1e-6,
    );
    const inGate = { x: -30 + 0.0, z: 0, y: 0 }; // east rail x=−30, gate spans z −4…4
    const before = { ...inGate };
    resolveObstacles(inGate, 0.35);
    check(
      "gate gap stays open",
      inGate.x === before.x && inGate.z === before.z,
    );
  }

  // 13) DigSystem: digging near a full mound for DIG_TIME_MS yields a treasure.
  {
    const digSys = new DigSystem();
    const spot = DIG_SPOTS[0];
    const digger = {
      id: 99,
      move: {
        x: spot.x + 0.5,
        z: spot.z,
        y: 0,
        vx: 0,
        vz: 0,
        grounded: true,
        swimming: false,
      },
      emote: "dig",
    };
    const dogs = new Map([[99, digger]]);
    let evs = digSys.update(DIG_TIME_MS - 50, 1000, dogs); // not yet…
    check("dig: no treasure before DIG_TIME_MS", evs.length === 0);
    evs = digSys.update(100, 1100, dogs); // …crosses the line
    check(
      "dig: treasure unearthed after digging long enough",
      evs.length === 1 &&
        evs[0].dog === digger &&
        typeof evs[0].loot === "string" &&
        evs[0].zoomies > 0,
    );
    check(
      "dig: mound now empty on the wire",
      digSys.serializeAll().find((d) => d.id === spot.id).b === 0,
    );
  }

  // Rotating park events cap progress and retain unique contributors.
  {
    const park = new ParkEventSystem(1000);
    const kind = park.current.kind;
    let completion = null;
    for (let i = 0; i < park.current.target; i++)
      completion = park.record(kind, i + 1, 1100 + i, 2);
    check(
      "park event completes at its target",
      park.current.complete && completion.completedIds.length > 0,
    );
    check(
      "park event serialization omits the internal contributor Set",
      !("contributors" in park.serialize()) &&
        park.serialize().participants === park.current.target,
    );
  }

  {
    const npcs = new NpcSystem();
    npcs.remember(0, 42, 2);
    check("NPC remembers a friendly dog", npcs.npcs[0].memories.get(42) === 2);
    npcs.forgetDog(42);
    check(
      "NPC memory is cleaned up when a dog leaves",
      !npcs.npcs[0].memories.has(42),
    );
  }

  {
    const secureSrv = createServer({
      port: 0,
      allowedOrigins: new Set(["https://allowed.example"]),
    });
    const securePort = await secureSrv.listen();
    try {
      const accepted = await connect(securePort, "https://allowed.example");
      accepted.send({ t: C2S.JOIN, name: "Origin", dog: { breed: "shiba" } });
      const welcome = await accepted.waitFor(
        (message) => message.t === S2C.WELCOME,
        2000,
        "origin welcome",
      );
      check(
        "configured browser origin completes a WebSocket upgrade",
        Boolean(welcome.id),
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

  // 14) RaccoonSystem: a dog on top of a fleeing raccoon tags it (chase event).
  {
    const raccoonSys = new RaccoonSystem();
    const raccoon = raccoonSys.raccoons[0];
    const chaser = { id: 7, move: { x: raccoon.x, z: raccoon.z, y: 0 } };
    const dogs = new Map([[7, chaser]]);
    let chaseEv = null;
    let now = 0;
    for (let i = 0; i < 100 && !chaseEv; i++) {
      now += 100;
      chaser.move.x = raccoon.x;
      chaser.move.z = raccoon.z;
      const evs = raccoonSys.update(0.1, now, dogs);
      chaseEv = evs.find((e) => e.kind === "chase") || null;
    }
    check(
      "raccoon: glued chaser eventually tags it",
      !!chaseEv && chaseEv.dog === chaser,
    );
    check(
      "raccoon: tagged raccoon hides (not serialized)",
      !raccoonSys.serializeAll().some((s) => s.id === raccoon.id),
    );
  }

  // 15) Terrain 2.0: real highground, with gameplay areas kept flat.
  {
    const summit = groundHeightAt(HOWL_ROCK.x, HOWL_ROCK.z);
    check(
      "Sunset Hill summit is proper highground (> 4 m)",
      summit > 4,
      `h=${summit.toFixed(2)}`,
    );
    const padsFlat = BALL_SPAWNERS.every(
      (s) => Math.abs(groundHeightAt(s.x, s.z)) < 0.3,
    );
    check("ball pads stay flat despite the hills", padsFlat);
  }

  // 16) Movement momentum: velocity ramps instead of snapping.
  {
    const s = createMoveState(0, 12);
    stepMovement(s, { f: true, yaw: 0 }, 1 / 30);
    const v1 = Math.hypot(s.vx, s.vz);
    check(
      "momentum: first step is well below walk speed",
      v1 < WALK_SPEED * 0.6,
      `v=${v1.toFixed(2)}`,
    );
    for (let i = 0; i < 40; i++) stepMovement(s, { f: true, yaw: 0 }, 1 / 30);
    const v2 = Math.hypot(s.vx, s.vz);
    check(
      "momentum: converges to walk speed",
      Math.abs(v2 - WALK_SPEED) < 0.3,
      `v=${v2.toFixed(2)}`,
    );
    for (let i = 0; i < 30; i++) stepMovement(s, { yaw: 0 }, 1 / 30);
    check(
      "momentum: idle dog comes to a complete stop",
      s.vx === 0 && s.vz === 0,
    );
  }

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
  C.ws.close();
} catch (err) {
  failures++;
  console.log(`FAIL  ${err.message}`);
} finally {
  clearTimeout(watchdog);
  await srv.close();
}

console.log(failures === 0 ? "ALL PASS" : `${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
