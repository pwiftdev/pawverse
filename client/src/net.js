// ─── Network client ──────────────────────────────────────────────────────────
// One WebSocket to the authoritative server. Owns:
//  • client-side prediction for MY blob (shared/movement.js — same integrator
//    as the server) with an unacked-input ring and server reconciliation,
//  • snapshot interpolation buffers for every REMOTE player,
//  • a tiny event bus the rest of the client subscribes to.

import { INTERP_DELAY_MS } from "../../shared/constants.js";
import { C2S, S2C } from "../../shared/protocol.js";
import { createMoveState, stepMovement } from "../../shared/movement.js";
import { P_NORMAL } from "../../shared/tower.js";
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
    this.id = null; // my player id (set by WELCOME)
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

    // Remote interpolation buffers: id → { info:{n,col}, buf:[], chat, alt }
    this.players = new Map();
    this.listeners = new Map(); // event → Set<fn>
  }

  on(ev, fn) {
    if (!this.listeners.has(ev)) this.listeners.set(ev, new Set());
    this.listeners.get(ev).add(fn);
  }
  emit(ev, data) {
    this.listeners.get(ev)?.forEach((fn) => fn(data));
  }

  connect(name, color, wallet = "") {
    this.connection = { name, color, wallet };
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
      const { name, color, wallet } = this.connection;
      ws.send(JSON.stringify({ t: C2S.JOIN, name, color, wallet }));
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
        if (Array.isArray(msg.you.cp)) {
          [this.move.cx, this.move.cy, this.move.cz] = msg.you.cp;
        }
        for (const p of msg.players) this.upsertPlayer(p);
        this.emit("welcome", msg);
        break;
      }
      case S2C.STATE:
        this.onState(msg);
        break;
      case S2C.JOIN:
        this.upsertPlayer(msg.player);
        this.emit("playerjoin", msg.player);
        break;
      case S2C.LEAVE:
        this.players.delete(msg.id);
        this.emit("playerleave", msg.id);
        break;
      case S2C.EVENT:
        this.emit("event", msg);
        break;
      case S2C.LEADERBOARD:
        this.emit("leaderboard", msg);
        break;
    }
  }

  resetSession() {
    this.seq = 0;
    this.pending = [];
    this.smooth = { x: 0, y: 0, z: 0 };
    this.players.clear();
  }

  onState(msg) {
    const now = performance.now();
    const seen = new Set();
    for (const p of msg.players) {
      if (p.id === this.id) {
        this.reconcile(p, msg.ack);
        continue;
      }
      seen.add(p.id);
      this.upsertPlayer(p, now);
    }
    // Entities missing from an interest-filtered snapshot left our radius.
    for (const id of this.players.keys())
      if (!seen.has(id)) this.players.delete(id);
    this.emit("state", msg);
  }

  upsertPlayer(p, now = performance.now()) {
    let rec = this.players.get(p.id);
    if (!rec) {
      rec = { info: { n: p.n, col: p.col }, buf: [], chat: null, alt: 0 };
      this.players.set(p.id, rec);
    }
    rec.info.n = p.n;
    rec.info.col = p.col;
    rec.chat = p.chat;
    rec.alt = p.alt;
    rec.buf.push({ t: now, p: p.p, ry: p.ry, v: p.v, anim: p.anim });
    if (rec.buf.length > 30) rec.buf.splice(0, rec.buf.length - 30);
  }

  // ── prediction & reconciliation ────────────────────────────────────────────

  /**
   * Run one fixed-rate input step locally (prediction) and send it.
   * Returns the step's event flags (jumped/landed/bounced/voided) so the
   * caller can drive local effects and audio with zero latency.
   * @param input {f,b,l,r,sprint,jump,yaw}   @param dt seconds
   */
  applyInput(input, dt) {
    const full = { ...input, seq: ++this.seq, dt };
    const ev = stepMovement(this.move, full, dt);
    this.pending.push(full);
    if (this.pending.length > PENDING_MAX) this.pending.shift();
    this.send({ t: C2S.INPUT, ...full });
    return ev;
  }

  /**
   * Server told us where our blob authoritatively is after processing inputs
   * ≤ ack. Rewind to that state, replay unacked inputs, and fold the visual
   * difference into a decaying smoothing offset so corrections never pop.
   * (Bumps and shoves from other blobs arrive exactly this way.)
   */
  reconcile(serverP, ack) {
    const before = { x: this.move.x, y: this.move.y, z: this.move.z };

    const [x, y, z] = serverP.p;
    const [vx, vy, vz] = serverP.v;
    const s = this.move;
    s.x = x;
    s.y = y;
    s.z = z;
    s.vx = vx;
    s.vy = vy;
    s.vz = vz;
    s.yaw = serverP.ry;
    s.grounded = serverP.g === 1;
    s.groundType = Number.isInteger(serverP.gt) ? serverP.gt : P_NORMAL;
    if (Array.isArray(serverP.cp)) [s.cx, s.cy, s.cz] = serverP.cp;
    // Timers aren't on the wire; the pending-input replay recreates their
    // effect over the window that matters.
    s.coyote = s.grounded ? 0 : 1;
    s.jumped = !s.grounded;

    this.pending = this.pending.filter((i) => i.seq > ack);
    for (const input of this.pending) stepMovement(s, input, input.dt);

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

  /** Where to RENDER my blob this frame (predicted + decaying error offset). */
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
   * Sample a remote player's interpolation buffer at (now − INTERP_DELAY_MS).
   * Returns {p:[x,y,z], ry, v, anim} or null if the buffer is empty.
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

  shove() {
    this.send({ t: C2S.SHOVE });
  }
  chat(text) {
    this.send({ t: C2S.CHAT, text });
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
