// ─── Network client ──────────────────────────────────────────────────────────
// One WebSocket to the authoritative server. Owns:
//  • client-side prediction for MY dog (shared/movement.js — same integrator
//    as the server) with an unacked-input ring and server reconciliation,
//  • snapshot interpolation buffers for every REMOTE entity (dogs/balls/npcs),
//  • a tiny event bus the rest of the client subscribes to.

import { INTERP_DELAY_MS } from "../../shared/constants.js";
import { C2S, S2C } from "../../shared/protocol.js";
import { createMoveState, stepMovement } from "../../shared/movement.js";
import { groundHeightAt, isWaterAt, WATER_LEVEL } from "../../shared/world.js";
import {
  reconnectDelay,
  SOCKET_CONNECT_TIMEOUT_MS,
  SOCKET_STALE_MS,
  SOCKET_WATCHDOG_MS,
} from "./reconnect.js";

const RECONCILE_SNAP = 4; // metres — beyond this, hard snap (no smoothing)
const PENDING_MAX = 90; // safety cap on the unacked input ring

function wsUrl() {
  const override = import.meta.env.VITE_WS_URL;
  if (override) return override;
  const proto = location.protocol === "https:" ? "wss" : "ws";
  return `${proto}://${location.host}/ws`;
}

export class Net {
  constructor() {
    this.ws = null;
    this.id = null; // my dog id (set by WELCOME)
    this.connected = false;
    this.connection = null;
    this.shouldReconnect = false;
    this.reconnectAttempt = 0;
    this.reconnectTimer = null;
    this.connectTimer = null;
    this.watchdogTimer = null;
    this.lastMessageAt = 0;
    this.seq = 0;
    this.pending = []; // inputs sent but not yet acked
    this.move = createMoveState(); // predicted authoritative-agreeing state
    this.smooth = { x: 0, y: 0, z: 0 }; // decaying reconciliation error (visual only)
    this.speedMul = 1; // my breed speed multiplier
    this.myBall = null; // ball id I'm holding (server-confirmed)
    this.myAnim = "idle";
    this.myEmote = "none";

    // Remote interpolation buffers: id → [{t, p, ry, v, anim, ...}, …]
    this.dogs = new Map(); // remote dogs: id → { info:{n,c}, buf:[], ball, chat }
    this.balls = new Map(); // id → { t, p, v, holder, spawner }
    this.npcs = new Map(); // id → { buf:[], st }
    this.raccoons = new Map(); // id → { buf:[], st }
    this.digs = new Map(); // spotId → buried (1|0)
    this.parkEvent = null;
    this.listeners = new Map(); // event → Set<fn>
  }

  on(ev, fn) {
    if (!this.listeners.has(ev)) this.listeners.set(ev, new Set());
    this.listeners.get(ev).add(fn);
  }
  emit(ev, data) {
    this.listeners.get(ev)?.forEach((fn) => fn(data));
  }

  connect(name, customization, discoveries = []) {
    this.connection = { name, customization, discoveries };
    this.shouldReconnect = true;
    this.openSocket();
  }

  openSocket() {
    if (!this.shouldReconnect || !this.connection) return;
    if (
      this.ws?.readyState === WebSocket.OPEN ||
      this.ws?.readyState === WebSocket.CONNECTING
    )
      return;
    clearTimeout(this.reconnectTimer);
    const ws = new WebSocket(wsUrl());
    this.ws = ws;
    this.connectTimer = setTimeout(() => {
      if (this.ws === ws && ws.readyState === WebSocket.CONNECTING) ws.close();
    }, SOCKET_CONNECT_TIMEOUT_MS);
    ws.onopen = () => {
      if (this.ws !== ws) return;
      clearTimeout(this.connectTimer);
      this.connectTimer = null;
      this.lastMessageAt = Date.now();
      this.startWatchdog(ws);
      const { name, customization, discoveries } = this.connection;
      ws.send(
        JSON.stringify({ t: C2S.JOIN, name, dog: customization, discoveries }),
      );
    };
    ws.onmessage = (e) => {
      if (this.ws !== ws) return;
      clearTimeout(this.connectTimer);
      this.connectTimer = null;
      this.lastMessageAt = Date.now();
      let msg;
      try {
        msg = JSON.parse(e.data);
      } catch {
        return;
      }
      this.onMessage(msg);
    };
    ws.onclose = () => {
      if (this.ws !== ws) return;
      clearTimeout(this.connectTimer);
      this.connectTimer = null;
      this.stopWatchdog();
      this.ws = null;
      this.connected = false;
      this.emit("disconnect");
      this.scheduleReconnect();
    };
    ws.onerror = () => {};
  }

  scheduleReconnect() {
    if (!this.shouldReconnect || this.reconnectTimer) return;
    const delay = reconnectDelay(this.reconnectAttempt++);
    this.emit("reconnecting", { attempt: this.reconnectAttempt, delay });
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.openSocket();
    }, delay);
  }

  startWatchdog(ws) {
    this.stopWatchdog();
    this.watchdogTimer = setInterval(() => {
      if (this.ws !== ws || ws.readyState !== WebSocket.OPEN) return;
      if (Date.now() - this.lastMessageAt > SOCKET_STALE_MS)
        ws.close(4000, "stale connection");
    }, SOCKET_WATCHDOG_MS);
  }

  stopWatchdog() {
    clearInterval(this.watchdogTimer);
    this.watchdogTimer = null;
  }

  send(obj) {
    if (this.ws?.readyState === 1) this.ws.send(JSON.stringify(obj));
  }

  // ── incoming ───────────────────────────────────────────────────────────────

  onMessage(msg) {
    switch (msg.t) {
      case S2C.WELCOME: {
        this.resetSession();
        this.id = msg.id;
        this.connected = true;
        this.reconnectAttempt = 0;
        // Seed my predicted state from the server's spawn position.
        const [x, y, z] = msg.you.p;
        this.move = createMoveState(x, z);
        this.move.y = y;
        for (const d of msg.dogs) this.upsertDog(d);
        for (const b of msg.balls) this.upsertBall(b);
        for (const n of msg.npcs) this.upsertNpc(n);
        for (const s of msg.raccoons || []) this.upsertRaccoon(s);
        for (const d of msg.digs || []) this.digs.set(d.id, d.b);
        this.parkEvent = msg.settings?.parkEvent || null;
        this.emit("welcome", msg);
        break;
      }
      case S2C.STATE:
        this.onState(msg);
        break;
      case S2C.JOIN:
        this.upsertDog(msg.dog);
        this.emit("dogjoin", msg.dog);
        break;
      case S2C.LEAVE:
        this.dogs.delete(msg.id);
        this.emit("dogleave", msg.id);
        break;
      case S2C.EVENT:
        this.emit("event", msg);
        break;
      case S2C.SCORE:
        this.emit("score", msg);
        break;
      case S2C.LEADERBOARD:
        this.emit("leaderboard", msg);
        break;
      case S2C.PARK:
        this.parkEvent = msg.event;
        this.emit("park", msg.event);
        break;
    }
  }

  resetSession() {
    this.seq = 0;
    this.pending = [];
    this.myBall = null;
    this.myAnim = "idle";
    this.myEmote = "none";
    this.smooth = { x: 0, y: 0, z: 0 };
    this.dogs.clear();
    this.balls.clear();
    this.npcs.clear();
    this.raccoons.clear();
    this.digs.clear();
  }

  onState(msg) {
    const now = performance.now();
    const seenDogs = new Set(),
      seenBalls = new Set();
    for (const d of msg.dogs) {
      if (d.id === this.id) {
        this.reconcile(d, msg.ack);
        this.myBall = d.ball;
        continue;
      }
      seenDogs.add(d.id);
      this.upsertDog(d, now);
    }
    for (const b of msg.balls) {
      seenBalls.add(b.id);
      this.upsertBall(b, now);
    }
    for (const n of msg.npcs) {
      this.upsertNpc(n, now);
    }
    const seenRaccoons = new Set();
    for (const s of msg.raccoons || []) {
      seenRaccoons.add(s.id);
      this.upsertRaccoon(s, now);
    }
    for (const d of msg.digs || []) this.digs.set(d.id, d.b);
    // Entities missing from an interest-filtered snapshot left our radius (or died).
    for (const id of this.dogs.keys())
      if (!seenDogs.has(id)) this.dogs.delete(id);
    for (const id of this.balls.keys())
      if (!seenBalls.has(id)) this.balls.delete(id);
    // Raccoons vanish when they hide up a tree (or leave interest).
    for (const id of this.raccoons.keys())
      if (!seenRaccoons.has(id)) this.raccoons.delete(id);
    // NPCs are permanent; missing just means "out of interest" — keep last state.
    this.emit("state", msg);
  }

  upsertDog(d, now = performance.now()) {
    let rec = this.dogs.get(d.id);
    if (!rec) {
      rec = { info: { n: d.n, c: d.c }, buf: [], ball: null, chat: null };
      this.dogs.set(d.id, rec);
    }
    rec.info.n = d.n;
    rec.info.c = d.c;
    rec.ball = d.ball;
    rec.chat = d.chat;
    rec.buf.push({ t: now, p: d.p, ry: d.ry, v: d.v, anim: d.anim });
    if (rec.buf.length > 30) rec.buf.splice(0, rec.buf.length - 30);
  }

  upsertBall(b, now = performance.now()) {
    this.balls.set(b.id, {
      t: now,
      p: b.p,
      v: b.v,
      holder: b.holder,
      spawner: b.spawner,
    });
  }

  upsertNpc(n, now = performance.now()) {
    let rec = this.npcs.get(n.id);
    if (!rec) {
      rec = { buf: [], st: n.st };
      this.npcs.set(n.id, rec);
    }
    rec.st = n.st;
    rec.buf.push({ t: now, p: n.p, ry: n.ry });
    if (rec.buf.length > 30) rec.buf.splice(0, rec.buf.length - 30);
  }

  upsertRaccoon(s, now = performance.now()) {
    let rec = this.raccoons.get(s.id);
    if (!rec) {
      rec = { buf: [], st: s.st };
      this.raccoons.set(s.id, rec);
    }
    rec.st = s.st;
    rec.buf.push({ t: now, p: s.p, ry: s.ry });
    if (rec.buf.length > 30) rec.buf.splice(0, rec.buf.length - 30);
  }

  // ── prediction & reconciliation ────────────────────────────────────────────

  /**
   * Run one fixed-rate input step locally (prediction) and send it.
   * @param input {f,b,l,r,sprint,jump,yaw}   @param dt seconds
   */
  applyInput(input, dt) {
    const full = { ...input, seq: ++this.seq, dt };
    stepMovement(this.move, full, dt, this.speedMul);
    this.pending.push(full);
    if (this.pending.length > PENDING_MAX) this.pending.shift();
    this.send({ t: C2S.INPUT, ...full });
  }

  /**
   * Server told us where our dog authoritatively is after processing inputs
   * ≤ ack. Rewind to that state, replay unacked inputs, and fold the visual
   * difference into a decaying smoothing offset so corrections never pop.
   */
  reconcile(serverDog, ack) {
    this.myAnim = serverDog.anim;
    const before = { x: this.move.x, y: this.move.y, z: this.move.z };

    const [x, y, z] = serverDog.p;
    const [vx, vy, vz] = serverDog.v;
    const s = this.move;
    s.x = x;
    s.y = y;
    s.z = z;
    s.vx = vx;
    s.vy = vy;
    s.vz = vz;
    s.yaw = serverDog.ry;
    // grounded/swimming aren't on the wire — derive them like the server would.
    s.swimming = isWaterAt(x, z);
    s.grounded =
      !s.swimming &&
      Math.abs(y - groundHeightAt(x, z)) < 0.02 &&
      Math.abs(vy) < 0.01;
    if (s.swimming) s.y = WATER_LEVEL - 0.15;

    this.pending = this.pending.filter((i) => i.seq > ack);
    for (const input of this.pending)
      stepMovement(s, input, input.dt, this.speedMul);

    // Visual smoothing: carry the old-vs-new difference and decay it per frame.
    const ex = before.x - s.x,
      ey = before.y - s.y,
      ez = before.z - s.z;
    if (Math.hypot(ex, ey, ez) < RECONCILE_SNAP) {
      this.smooth.x += ex;
      this.smooth.y += ey;
      this.smooth.z += ez;
    } else {
      this.smooth.x = this.smooth.y = this.smooth.z = 0; // teleport — snap
    }
  }

  /** Where to RENDER my dog this frame (predicted + decaying error offset). */
  renderPos(dt) {
    const k = Math.pow(0.001, dt); // ~fully decayed in 1 s
    this.smooth.x *= k;
    this.smooth.y *= k;
    this.smooth.z *= k;
    return {
      x: this.move.x + this.smooth.x,
      y: this.move.y + this.smooth.y,
      z: this.move.z + this.smooth.z,
    };
  }

  /**
   * Sample a remote entity's interpolation buffer at (now − INTERP_DELAY_MS).
   * Returns {p:[x,y,z], ry, anim} or null if the buffer is empty.
   */
  sample(buf, now = performance.now()) {
    if (!buf.length) return null;
    const t = now - INTERP_DELAY_MS;
    if (t <= buf[0].t) return buf[0];
    for (let i = buf.length - 1; i >= 0; i--) {
      if (buf[i].t <= t) {
        const a = buf[i],
          b = buf[i + 1];
        if (!b) return a; // newer than newest snapshot — hold last
        const k = Math.min(1, (t - a.t) / Math.max(1, b.t - a.t));
        return {
          p: [
            lerp(a.p[0], b.p[0], k),
            lerp(a.p[1], b.p[1], k),
            lerp(a.p[2], b.p[2], k),
          ],
          ry: lerpAngle(a.ry, b.ry, k),
          v: b.v || a.v,
          anim: b.anim ?? a.anim,
        };
      }
    }
    return buf[buf.length - 1];
  }

  // ── outgoing actions ───────────────────────────────────────────────────────

  bark() {
    this.send({ t: C2S.BARK });
  }
  bite(targetId) {
    this.send({ t: C2S.BITE, target: targetId });
  }
  emote(emote) {
    this.myEmote = emote;
    this.send({ t: C2S.EMOTE, emote });
  }
  grab(ballId) {
    this.send({ t: C2S.GRAB, ball: ballId });
  }
  drop() {
    this.send({ t: C2S.DROP });
  }
  throw(dir, power) {
    this.send({ t: C2S.THROW, dir, power });
  }
  chat(text) {
    this.send({ t: C2S.CHAT, text });
  }
  sniff() {
    this.send({ t: C2S.SNIFF });
  }

  respawnPlayer(id, position) {
    if (!Array.isArray(position) || position.length !== 3) return;
    if (id === this.id) {
      this.move = createMoveState(position[0], position[2]);
      this.move.y = position[1];
      this.pending = [];
      this.myBall = null;
      this.myAnim = "idle";
      this.myEmote = "none";
      this.smooth = { x: 0, y: 0, z: 0 };
      return;
    }
    const rec = this.dogs.get(id);
    if (!rec) return;
    rec.buf = [
      {
        t: performance.now(),
        p: position,
        ry: 0,
        v: [0, 0, 0],
        anim: "idle",
      },
    ];
    rec.ball = null;
  }
}

function lerp(a, b, k) {
  return a + (b - a) * k;
}
function lerpAngle(a, b, k) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * k;
}
