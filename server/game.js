// ─── Game room ───────────────────────────────────────────────────────────────
// One global tower. step() runs at TICK_RATE and broadcasts interest-filtered
// snapshots at SNAPSHOT_RATE. All client messages are validated here; movement
// integrates through shared/movement.js so client prediction and the
// authoritative server agree exactly. On top of the shared integrator the
// server owns the parts clients can't predict: blob-vs-blob bumps, shoves,
// fall drama, the crown, and the all-time highscore board.

import {
  TICK_RATE,
  SNAPSHOT_RATE,
  BODY_RADIUS,
  BUMP_MAX_IMPULSE,
  BUMP_MIN_IMPULSE,
  BUMP_RESTITUTION,
  BIG_FALL_M,
  HUGE_FALL_M,
  CHAT_TTL_MS,
  CROWN_MIN_ALT,
  LEADERBOARD_MS,
  SAFE_ALTITUDE,
  SHOVE_ARC_COS,
  SHOVE_COOLDOWN_MS,
  SHOVE_IMPULSE,
  SHOVE_LIFT,
  SHOVE_RANGE,
  SHOVE_RECOIL,
} from "../shared/constants.js";
import { C2S, S2C, EVENTS } from "../shared/protocol.js";
import {
  createMoveState,
  stepMovement,
  deriveAnim,
} from "../shared/movement.js";
import { islandHeightAt } from "../shared/tower.js";
import { sanitizeName, sanitizeColor, sanitizeChat } from "./sanitize.js";
import { filterVisible, withinInterest } from "./interest.js";
import { Highscores } from "./highscores.js";

const MAX_DT = 0.1; // per-input dt clamp (seconds)
const INPUT_QUEUE_MAX = 60; // drop oldest beyond this
const MAX_MSG_BYTES = 2048;
const BUMP_PAIR_DIST = BODY_RADIUS * 2; // blobs closer than this collide
const BUMP_EVENT_MIN = 4; // impulse threshold for the FX event
const BUMP_EVENT_GAP_MS = 300; // per-player FX event rate limit

export class Game {
  constructor({ highscores = new Highscores() } = {}) {
    this.players = new Map(); // id → player
    this.nextId = 1;
    this.tick = 0;
    this.highscores = highscores;
    this.lastLeaderboard = 0;
    this.leaderId = null;
    // One simulation step covers SNAPSHOT_DIV ticks; snapshot on the last one.
    this.snapshotEvery = Math.max(1, Math.round(TICK_RATE / SNAPSHOT_RATE));
  }

  // ── Connection lifecycle ──────────────────────────────────────────────────

  handleConnection(ws) {
    const session = { ws, player: null };
    ws.on("message", (data) => {
      if (data.length > MAX_MSG_BYTES) return;
      let msg;
      try {
        msg = JSON.parse(data);
      } catch {
        return;
      }
      try {
        this.onMessage(session, msg);
      } catch (err) {
        console.error("[game] message error:", err);
      }
    });
    ws.on("close", () => this.onDisconnect(session));
    ws.on("error", () => {});
  }

  onMessage(s, msg) {
    if (!msg || typeof msg !== "object") return;
    if (!s.player) {
      if (msg.t === C2S.JOIN) this.join(s, msg);
      return;
    }
    const p = s.player;
    switch (msg.t) {
      case C2S.INPUT:
        return this.onInput(p, msg);
      case C2S.SHOVE:
        return this.onShove(p);
      case C2S.CHAT:
        return this.onChat(p, msg);
    }
  }

  join(s, msg) {
    const id = this.nextId++;
    // Spawn on a ring around the island dome so blobs don't stack.
    const a = Math.random() * Math.PI * 2;
    const r = 8 + Math.random() * 3;
    const move = createMoveState(Math.cos(a) * r, Math.sin(a) * r);
    const p = {
      id,
      ws: s.ws,
      name: sanitizeName(msg.name),
      col: sanitizeColor(msg.color),
      move,
      inputQueue: [],
      lastSeq: 0,
      lastShove: 0,
      lastBumpEv: 0,
      chat: null,
      hiMark: move.y, // fall-drama watermark
      sessionBest: 0, // best altitude this run
    };
    s.player = p;
    this.players.set(id, p);

    this.send(p, {
      t: S2C.WELCOME,
      id,
      tick: this.tick,
      you: this.serializePlayer(p),
      players: [...this.players.values()]
        .filter((o) => o !== p)
        .map((o) => this.serializePlayer(o)),
      best: this.highscores.top(5),
      settings: { tick: TICK_RATE },
    });
    this.broadcast({ t: S2C.JOIN, player: this.serializePlayer(p) }, p);
  }

  onDisconnect(s) {
    const p = s.player;
    if (!p) return;
    s.player = null;
    this.players.delete(p.id);
    this.submitBest(p);
    this.broadcast({ t: S2C.LEAVE, id: p.id });
  }

  // ── Input pipeline ────────────────────────────────────────────────────────

  onInput(p, msg) {
    p.inputQueue.push({
      seq: Number.isFinite(msg.seq) ? msg.seq : 0,
      f: !!msg.f,
      b: !!msg.b,
      l: !!msg.l,
      r: !!msg.r,
      sprint: !!msg.sprint,
      jump: !!msg.jump,
      yaw: Number.isFinite(msg.yaw) ? msg.yaw : p.move.yaw,
      dt: Number.isFinite(msg.dt) ? msg.dt : 1 / TICK_RATE,
    });
    if (p.inputQueue.length > INPUT_QUEUE_MAX) {
      p.inputQueue.splice(0, p.inputQueue.length - INPUT_QUEUE_MAX);
    }
  }

  /** Drain one player's input queue in order through shared movement. */
  applyInputs(p) {
    while (p.inputQueue.length) {
      const input = p.inputQueue.shift();
      const dt = Math.min(MAX_DT, Math.max(0, input.dt));
      const ev = stepMovement(p.move, input, dt);
      if (input.seq > p.lastSeq) p.lastSeq = input.seq;
      this.trackAltitude(p, ev);
    }
  }

  /** High-water mark, personal best, fall drama, cloud-sea rescues. */
  trackAltitude(p, ev) {
    const y = p.move.y;
    if (y > p.hiMark) p.hiMark = y;
    if (y > p.sessionBest) p.sessionBest = y;
    if (ev.landed || ev.voided) {
      const drop = p.hiMark - y;
      if (ev.voided) {
        const pos = playerPos(p);
        this.broadcast({
          t: S2C.EVENT,
          kind: EVENTS.VOIDED,
          id: p.id,
          n: p.name,
          p: pos,
        });
      } else if (drop >= BIG_FALL_M) {
        const pos = playerPos(p);
        const msg = {
          t: S2C.EVENT,
          kind: EVENTS.BIGFALL,
          id: p.id,
          n: p.name,
          drop: Math.round(drop),
          alt: Math.round(y),
          p: pos,
        };
        // Huge falls are tower-wide news; smaller ones stay local.
        if (drop >= HUGE_FALL_M) this.broadcast(msg);
        else this.sendNear(pos, msg, [p]);
      }
      p.hiMark = y;
    }
  }

  // ── Blob vs blob ──────────────────────────────────────────────────────────

  onShove(p) {
    const now = Date.now();
    if (now - p.lastShove < SHOVE_COOLDOWN_MS) return;
    if (p.move.y < SAFE_ALTITUDE) return; // island base is a truce zone
    // Facing direction (camera convention: forward = [sin(yaw), −cos(yaw)]).
    const fx = Math.sin(p.move.yaw),
      fz = -Math.cos(p.move.yaw);
    let target = null,
      bestDot = SHOVE_ARC_COS;
    for (const o of this.players.values()) {
      if (o === p || o.move.y < SAFE_ALTITUDE) continue;
      const dx = o.move.x - p.move.x,
        dy = o.move.y - p.move.y,
        dz = o.move.z - p.move.z;
      if (Math.abs(dy) > 1.6) continue;
      const d = Math.hypot(dx, dz);
      if (d > SHOVE_RANGE || d < 1e-4) continue;
      const dot = (dx / d) * fx + (dz / d) * fz;
      if (dot > bestDot) {
        bestDot = dot;
        target = o;
      }
    }
    p.lastShove = now;
    if (!target) return;
    const dx = target.move.x - p.move.x,
      dz = target.move.z - p.move.z;
    const d = Math.hypot(dx, dz) || 1e-4;
    const nx = dx / d,
      nz = dz / d;
    const t = target.move;
    t.vx += nx * SHOVE_IMPULSE;
    t.vz += nz * SHOVE_IMPULSE;
    t.vy = Math.max(t.vy, SHOVE_LIFT);
    t.grounded = false;
    t.jumped = true; // no coyote jump out of a shove
    p.move.vx -= nx * SHOVE_RECOIL;
    p.move.vz -= nz * SHOVE_RECOIL;
    const pos = playerPos(target);
    this.sendNear(pos, {
      t: S2C.EVENT,
      kind: EVENTS.SHOVE,
      from: p.id,
      to: target.id,
      p: pos,
    });
  }

  /**
   * Soft-body comedy: overlapping blobs push apart and trade an impulse along
   * the contact normal. O(n²) over height-sorted players with early exit —
   * fine for one room, and only near-equal heights can touch anyway.
   */
  resolveBumps(now) {
    const list = [...this.players.values()].sort((a, b) => a.move.y - b.move.y);
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (b.move.y - a.move.y > 1.1) break; // sorted — nothing higher touches
        if (a.move.y < SAFE_ALTITUDE && b.move.y < SAFE_ALTITUDE) continue;
        const dx = b.move.x - a.move.x,
          dz = b.move.z - a.move.z;
        const d2 = dx * dx + dz * dz;
        if (d2 >= BUMP_PAIR_DIST * BUMP_PAIR_DIST) continue;
        const d = Math.sqrt(d2) || 1e-4;
        const nx = dx / d,
          nz = dz / d;
        // positional separation, split evenly
        const overlap = (BUMP_PAIR_DIST - d) / 2;
        a.move.x -= nx * overlap;
        a.move.z -= nz * overlap;
        b.move.x += nx * overlap;
        b.move.z += nz * overlap;
        // impulse from approach speed along the normal
        const rvx = b.move.vx - a.move.vx,
          rvz = b.move.vz - a.move.vz;
        const approach = -(rvx * nx + rvz * nz);
        if (approach <= 0) continue; // already separating
        // (1 + e) reverses the approach into a bounce instead of just damping it
        const impulse = Math.min(
          BUMP_MAX_IMPULSE,
          Math.max(BUMP_MIN_IMPULSE, approach * (1 + BUMP_RESTITUTION)),
        );
        a.move.vx -= (nx * impulse) / 2;
        a.move.vz -= (nz * impulse) / 2;
        b.move.vx += (nx * impulse) / 2;
        b.move.vz += (nz * impulse) / 2;
        if (
          impulse >= BUMP_EVENT_MIN &&
          now - a.lastBumpEv > BUMP_EVENT_GAP_MS &&
          now - b.lastBumpEv > BUMP_EVENT_GAP_MS
        ) {
          a.lastBumpEv = b.lastBumpEv = now;
          const pos = [
            r3((a.move.x + b.move.x) / 2),
            r3((a.move.y + b.move.y) / 2),
            r3((a.move.z + b.move.z) / 2),
          ];
          this.sendNear(pos, {
            t: S2C.EVENT,
            kind: EVENTS.BUMP,
            a: a.id,
            b: b.id,
            p: pos,
          });
        }
      }
    }
  }

  // ── Chat ──────────────────────────────────────────────────────────────────

  onChat(p, msg) {
    const text = sanitizeChat(msg.text);
    if (!text) return;
    p.chat = { text, until: Date.now() + CHAT_TTL_MS };
    this.sendNear(playerPos(p), {
      t: S2C.EVENT,
      kind: EVENTS.CHAT,
      id: p.id,
      text,
    });
  }

  // ── Highscores / crown ────────────────────────────────────────────────────

  /** Offer a player's session best to the all-time board. */
  submitBest(p) {
    if (p.sessionBest < 8) return; // hopping around the island isn't a run
    const prevTop = this.highscores.entries[0];
    const changed = this.highscores.submit(p.name, Math.round(p.sessionBest));
    if (!changed) return;
    const top = this.highscores.entries[0];
    // Only the tower record itself is an announcement.
    if (!prevTop || top.alt > prevTop.alt) {
      this.broadcast({
        t: S2C.EVENT,
        kind: EVENTS.RECORD,
        n: top.n,
        alt: top.alt,
      });
    }
  }

  broadcastLeaderboard() {
    for (const p of this.players.values()) this.submitBest(p);
    const ranked = [...this.players.values()].sort(
      (a, b) => b.move.y - a.move.y,
    );
    const live = ranked
      .slice(0, 5)
      .map((p) => ({ id: p.id, n: p.name, alt: Math.round(p.move.y) }));
    const all = this.highscores.top(5);

    const leader = ranked[0];
    const leaderId =
      leader && leader.move.y >= CROWN_MIN_ALT ? leader.id : null;
    if (leaderId !== null && leaderId !== this.leaderId) {
      this.broadcast({
        t: S2C.EVENT,
        kind: EVENTS.CROWN,
        id: leader.id,
        n: leader.name,
        alt: Math.round(leader.move.y),
      });
    }
    this.leaderId = leaderId;
    const leaderPos = leaderId !== null ? playerPos(leader) : null;

    ranked.forEach((p, idx) => {
      this.send(p, {
        t: S2C.LEADERBOARD,
        live,
        all,
        rank: idx + 1,
        leaderId,
        leaderPos,
      });
    });
  }

  // ── Simulation step ───────────────────────────────────────────────────────

  step() {
    const now = Date.now();
    this.tick++;

    for (const p of this.players.values()) {
      this.applyInputs(p);
      if (p.chat && p.chat.until <= now) p.chat = null;
    }

    this.resolveBumps(now);

    if (now - this.lastLeaderboard >= LEADERBOARD_MS && this.players.size) {
      this.lastLeaderboard = now;
      this.broadcastLeaderboard();
    }

    if (this.tick % this.snapshotEvery === 0) this.broadcastStates();
  }

  // ── Snapshots / broadcasting ──────────────────────────────────────────────

  broadcastStates() {
    const all = [...this.players.values()].map((p) => this.serializePlayer(p));
    for (const p of this.players.values()) {
      const { x, y, z } = p.move;
      this.send(p, {
        t: S2C.STATE,
        tick: this.tick,
        ack: p.lastSeq,
        players: filterVisible(
          x,
          y,
          z,
          all,
          (e) => [e.p[0], e.p[1], e.p[2]],
          p.id,
        ),
      });
    }
  }

  /** Global broadcast (JOIN/LEAVE/news), optionally skipping one player. */
  broadcast(msg, except = null) {
    for (const p of this.players.values()) {
      if (p !== except) this.send(p, msg);
    }
  }

  /** Event broadcast to players within interest radius of pos. */
  sendNear(pos, msg, requiredRecipients = []) {
    const required = new Set(requiredRecipients);
    for (const p of this.players.values()) {
      if (
        required.has(p) ||
        withinInterest(p.move.x, p.move.y, p.move.z, pos[0], pos[1], pos[2])
      )
        this.send(p, msg);
    }
  }

  send(p, msg) {
    if (p.ws.readyState === 1) p.ws.send(JSON.stringify(msg));
  }

  serializePlayer(p) {
    const m = p.move;
    return {
      id: p.id,
      n: p.name,
      col: p.col,
      p: [r3(m.x), r3(m.y), r3(m.z)],
      ry: r3(m.yaw),
      v: [r3(m.vx), r3(m.vy), r3(m.vz)],
      g: m.grounded ? 1 : 0,
      gt: m.groundType,
      anim: deriveAnim(m),
      alt: Math.round(Math.max(0, m.y)),
      best: Math.round(p.sessionBest),
      chat: p.chat,
    };
  }
}

// ── small helpers ────────────────────────────────────────────────────────────

function r3(v) {
  return Math.round(v * 1000) / 1000;
}
function playerPos(p) {
  return [r3(p.move.x), r3(p.move.y), r3(p.move.z)];
}

/** Exported for tests: the island dome must exist where blobs spawn. */
export { islandHeightAt };
