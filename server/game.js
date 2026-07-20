// ─── Game room ───────────────────────────────────────────────────────────────
// One global room: players, balls, NPCs. step() runs at TICK_RATE and
// broadcasts interest-filtered snapshots at SNAPSHOT_RATE. All client
// messages are validated here; movement integrates through shared/movement.js
// so client prediction and the authoritative server agree exactly.

import {
  TICK_RATE,
  SNAPSHOT_RATE,
  BARK_COOLDOWN_MS,
  BARK_SCARE_RADIUS,
  BITE_COOLDOWN_MS,
  BITE_RANGE,
  EMOTE_COOLDOWN_MS,
  BALL_GRAB_RANGE,
  BALL_RETURN_RANGE,
  CHAT_TTL_MS,
  HOWL_GROUP_RADIUS,
  HOWL_GROUP_WINDOW_MS,
  LEADERBOARD_MS,
  HOWL_ROCK_RADIUS,
  HOWL_ROCK_COOLDOWN_MS,
  TRICK_WINDOW_MS,
  TRICK_EMOTES_NEEDED,
  TRICK_NPC_RANGE,
  TRICK_COOLDOWN_MS,
  POINTS,
  REP,
  HAPPINESS_MAX,
  HAPPINESS_DECAY_PER_MIN,
} from "../shared/constants.js";
import { SPAWN, HOWL_ROCK, groundHeightAt } from "../shared/world.js";
import { SCENT_DISCOVERY_RADIUS, SCENT_SPOTS } from "../shared/living.js";
import { C2S, S2C, EVENTS } from "../shared/protocol.js";
import {
  createMoveState,
  stepMovement,
  deriveAnim,
} from "../shared/movement.js";
import { resolveBreed } from "../shared/breeds.js";
import {
  sanitizeName,
  sanitizeCustomization,
  sanitizeChat,
} from "./sanitize.js";
import { withinInterest, filterVisible } from "./interest.js";
import { BallSystem } from "./balls.js";
import { NpcSystem } from "./npcs.js";
import { SquirrelSystem } from "./squirrels.js";
import { DigSystem } from "./digspots.js";
import { ParkEventSystem } from "./park-events.js";

const MAX_DT = 0.1; // per-input dt clamp (seconds)
const INPUT_QUEUE_MAX = 60; // drop oldest beyond this
const MAX_MSG_BYTES = 4096;
const EMOTE_SET = new Set(["sit", "lay", "wag", "roll", "dig", "howl", "none"]);
const HOWL_GROUP_SQ = HOWL_GROUP_RADIUS * HOWL_GROUP_RADIUS;
const BALL_MOUTH_OFFSET = 0.45; // held ball sits just in front of the snout
const BALL_MOUTH_HEIGHT = 0.35;
const PET_HAPPINESS = 10;

export class Game {
  constructor() {
    this.players = new Map(); // dogId → player
    this.nextDogId = 1;
    this.tick = 0;
    this.ballSys = new BallSystem();
    this.npcSys = new NpcSystem();
    this.squirrelSys = new SquirrelSystem();
    this.digSys = new DigSystem();
    this.parkEvents = new ParkEventSystem();
    this.lastLeaderboard = 0;
    this.epoch = Date.now(); // world-clock zero (day/night phase origin)
    this.recentHowls = []; // [{id,x,z,t}] within HOWL_GROUP_WINDOW_MS
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
      case C2S.BARK:
        return this.onBark(p);
      case C2S.BITE:
        return this.onBite(p, msg);
      case C2S.EMOTE:
        return this.onEmote(p, msg);
      case C2S.GRAB:
        return this.onGrab(p, msg);
      case C2S.DROP:
        return this.onDrop(p);
      case C2S.THROW:
        return this.onThrow(p, msg);
      case C2S.CHAT:
        return this.onChat(p, msg);
      case C2S.SNIFF:
        return this.onSniff(p);
    }
  }

  join(s, msg) {
    const name = sanitizeName(msg.name);
    const custom = sanitizeCustomization(msg.dog, name);
    const breed = resolveBreed(custom);
    const knownScentIds = new Set(SCENT_SPOTS.map((spot) => spot.id));
    const discoveries = new Set(
      Array.isArray(msg.discoveries)
        ? msg.discoveries
            .filter((id) => typeof id === "string" && knownScentIds.has(id))
            .slice(0, SCENT_SPOTS.length)
        : [],
    );
    const id = this.nextDogId++;
    // Slight spawn jitter so dogs don't stack on the exact same tile.
    const move = createMoveState(
      SPAWN.x + (Math.random() * 3 - 1.5),
      SPAWN.z + (Math.random() * 3 - 1.5),
    );
    const p = {
      id,
      ws: s.ws,
      name,
      custom,
      breed,
      move,
      emote: "none",
      ball: null, // held ball id
      inputQueue: [],
      lastSeq: 0,
      lastBark: 0,
      lastBite: 0,
      lastEmote: 0,
      zoomies: 0,
      happiness: HAPPINESS_MAX / 2,
      treats: 0,
      rep: 0,
      scoreDirty: true,
      chat: null,
      recentEmotes: [], // [{e, t}] for trick combos
      lastTrick: 0,
      lastEcho: 0,
      lastSniff: 0,
      discoveries,
      needs: { play: 55, social: 45, explore: 0 },
    };
    s.player = p;
    this.players.set(id, p);

    // WELCOME carries the full world (unfiltered) so the client can bootstrap.
    this.send(p, {
      t: S2C.WELCOME,
      id,
      tick: this.tick,
      you: this.serializeDog(p),
      dogs: [...this.players.values()]
        .filter((o) => o !== p)
        .map((o) => this.serializeDog(o)),
      balls: this.ballSys.serializeAll(),
      npcs: this.npcSys.serializeAll(),
      sq: this.squirrelSys.serializeAll(),
      digs: this.digSys.serializeAll(),
      settings: {
        tick: TICK_RATE,
        epoch: this.epoch,
        now: Date.now(),
        parkEvent: this.parkEvents.serialize(),
      },
    });
    // Others hear about the new dog (global; clients cull by STATE).
    this.broadcast({ t: S2C.JOIN, dog: this.serializeDog(p) }, p);
  }

  onDisconnect(s) {
    const p = s.player;
    if (!p) return;
    s.player = null;
    this.players.delete(p.id);
    this.npcSys.forgetDog(p.id);
    if (p.ball !== null) {
      // Put the held ball back into the world where the dog stood.
      this.ballSys.release(
        p.ball,
        p.move ? [p.move.x, p.move.y + 0.3, p.move.z] : [0, 0.5, 0],
        [0, 0, 0],
      );
    }
    this.recentHowls = this.recentHowls.filter((h) => h.id !== p.id);
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
      // Walking out of an emote cancels it (emote is a pose, not a lock).
      if (input.f || input.b || input.l || input.r) p.emote = "none";
      stepMovement(p.move, input, dt, p.breed.speed);
      if (input.seq > p.lastSeq) p.lastSeq = input.seq;
    }
  }

  // ── Social actions ────────────────────────────────────────────────────────

  onBark(p) {
    const now = Date.now();
    if (now - p.lastBark < BARK_COOLDOWN_MS) return;
    p.lastBark = now;
    const pos = dogPos(p);
    this.sendNear(pos, { t: S2C.EVENT, kind: EVENTS.BARK, id: p.id, p: pos });
    this.scareNpcs(pos, BARK_SCARE_RADIUS, p);
  }

  onSniff(p) {
    const now = Date.now();
    if (now - p.lastSniff < 900) return;
    p.lastSniff = now;
    const pos = dogPos(p);
    this.sendNear(pos, { t: S2C.EVENT, kind: EVENTS.SNIFF, dog: p.id, p: pos });
    const radiusSq = SCENT_DISCOVERY_RADIUS * SCENT_DISCOVERY_RADIUS;
    const spot = SCENT_SPOTS.find(
      (candidate) =>
        !p.discoveries.has(candidate.id) &&
        dist2(p.move.x, p.move.z, candidate.x, candidate.z) <= radiusSq,
    );
    if (!spot) return;
    p.discoveries.add(spot.id);
    this.addZoomies(p, POINTS.DISCOVERY);
    this.satisfyNeed(p, "explore", 18);
    this.send(p, {
      t: S2C.EVENT,
      kind: EVENTS.DISCOVERY,
      dog: p.id,
      spot: spot.id,
      label: spot.label,
      discoveryKind: spot.kind,
      p: [spot.x, groundHeightAt(spot.x, spot.z), spot.z],
    });
  }

  onBite(p, msg) {
    const now = Date.now();
    if (now - p.lastBite < BITE_COOLDOWN_MS) return;
    const target = this.players.get(msg.target);
    if (!target || target === p) return;
    if (
      dist2(p.move.x, p.move.z, target.move.x, target.move.z) >
      BITE_RANGE * BITE_RANGE
    )
      return;
    p.lastBite = now;
    const pos = dogPos(target);
    this.sendNear(pos, {
      t: S2C.EVENT,
      kind: EVENTS.BITE,
      from: p.id,
      to: target.id,
      p: pos,
    });
    this.sendNear(pos, {
      t: S2C.EVENT,
      kind: EVENTS.YELP,
      id: target.id,
      p: pos,
    });
    this.scareNpcs(pos, BARK_SCARE_RADIUS, p);
  }

  onEmote(p, msg) {
    const now = Date.now();
    if (now - p.lastEmote < EMOTE_COOLDOWN_MS) return;
    if (!EMOTE_SET.has(msg.emote)) return;
    p.lastEmote = now;
    p.emote = msg.emote;
    if (msg.emote === "howl") this.onHowl(p, now);
    if (msg.emote !== "none") this.checkTrickCombo(p, msg.emote, now);
  }

  /**
   * Trick show: TRICK_EMOTES_NEEDED *distinct* emotes inside TRICK_WINDOW_MS,
   * performed within TRICK_NPC_RANGE of a human → applause, +zoomies, +treat.
   */
  checkTrickCombo(p, emote, now) {
    p.recentEmotes = p.recentEmotes.filter((r) => now - r.t <= TRICK_WINDOW_MS);
    if (p.recentEmotes.at(-1)?.e !== emote)
      p.recentEmotes.push({ e: emote, t: now });
    if (now - p.lastTrick < TRICK_COOLDOWN_MS) return;
    if (new Set(p.recentEmotes.map((r) => r.e)).size < TRICK_EMOTES_NEEDED)
      return;
    const audience = this.npcSys.npcs.find(
      (n) =>
        n.st !== "flee" &&
        n.st !== "flinch" &&
        dist2(n.x, n.z, p.move.x, p.move.z) <=
          TRICK_NPC_RANGE * TRICK_NPC_RANGE,
    );
    if (!audience) return;
    p.lastTrick = now;
    p.recentEmotes = [];
    p.treats += 1;
    this.addZoomies(p, POINTS.TRICK);
    this.recordParkProgress("trick", p);
    this.addRep(p, 2);
    const pos = dogPos(p);
    this.sendNear(pos, {
      t: S2C.EVENT,
      kind: EVENTS.TRICK,
      dog: p.id,
      npc: audience.id,
      p: pos,
    });
  }

  onHowl(p, now) {
    const pos = dogPos(p);
    this.sendNear(pos, { t: S2C.EVENT, kind: EVENTS.HOWL, id: p.id, p: pos });
    // Howl Rock: howling from the summit echoes across the whole park.
    const rockD2 = dist2(p.move.x, p.move.z, HOWL_ROCK.x, HOWL_ROCK.z);
    if (
      rockD2 <= HOWL_ROCK_RADIUS * HOWL_ROCK_RADIUS &&
      now - p.lastEcho >= HOWL_ROCK_COOLDOWN_MS
    ) {
      p.lastEcho = now;
      this.addZoomies(p, POINTS.ECHO);
      this.broadcast({ t: S2C.EVENT, kind: EVENTS.ECHO, id: p.id, p: pos });
    }
    // Prune stale howls, then look for a group around this howler.
    this.recentHowls = this.recentHowls.filter(
      (h) => now - h.t <= HOWL_GROUP_WINDOW_MS && h.id !== p.id,
    );
    const group = this.recentHowls.filter(
      (h) => dist2(p.move.x, p.move.z, h.x, h.z) <= HOWL_GROUP_SQ,
    );
    if (group.length >= 1) {
      // ≥2 dogs (this howler + at least one other) howling together.
      const ids = [...new Set([p.id, ...group.map((h) => h.id)])];
      this.sendNear(pos, {
        t: S2C.EVENT,
        kind: EVENTS.GROUP_HOWL,
        ids,
        p: pos,
      });
      for (const id of ids) {
        const dog = this.players.get(id);
        if (dog) {
          this.addZoomies(dog, POINTS.GROUP_HOWL);
          this.satisfyNeed(dog, "social", 14);
        }
      }
      this.recordParkProgress("howl", p);
      this.recentHowls = this.recentHowls.filter((h) => !ids.includes(h.id));
    } else {
      this.recentHowls.push({ id: p.id, x: p.move.x, z: p.move.z, t: now });
    }
  }

  onChat(p, msg) {
    const text = sanitizeChat(msg.text);
    if (!text) return;
    p.chat = { text, until: Date.now() + CHAT_TTL_MS };
    this.sendNear(dogPos(p), {
      t: S2C.EVENT,
      kind: EVENTS.CHAT,
      id: p.id,
      text,
    });
  }

  // ── Ball actions ──────────────────────────────────────────────────────────

  onGrab(p, msg) {
    const b = this.ballSys.get(msg.ball);
    if (!b || b.holder !== null) return;
    if (
      dist2(p.move.x, p.move.z, b.p[0], b.p[2]) >
      BALL_GRAB_RANGE * BALL_GRAB_RANGE
    )
      return;
    if (p.ball !== null) this.dropBall(p, false); // one ball per dog
    // Mid-air catch of a ball someone else threw counts extra.
    const rest = groundHeightAt(b.p[0], b.p[2]) + 0.4;
    const caught = b.thrownBy !== null && b.thrownBy !== p.id && b.p[1] > rest;
    b.holder = p.id;
    b.thrownBy = null;
    b.spawner = null; // frees the pad to respawn a new ball
    b.v = [0, 0, 0];
    p.ball = b.id;
    this.addZoomies(p, caught ? POINTS.CATCH : POINTS.PICKUP);
    this.satisfyNeed(p, "play", caught ? 10 : 5);
    this.sendNear(dogPos(p), {
      t: S2C.EVENT,
      kind: EVENTS.PICKUP,
      dog: p.id,
      ball: b.id,
      caught,
    });
  }

  onDrop(p) {
    if (p.ball === null) return;
    this.dropBall(p, true);
  }

  /** Release the held ball at mouth position with a small forward velocity. */
  dropBall(p, withEvent) {
    const ballId = p.ball;
    p.ball = null;
    const mouth = this.mouthPos(p);
    const fwd = forwardOf(p.move.yaw);
    const b = this.ballSys.release(ballId, mouth, [
      fwd[0] * 1.2,
      1.0,
      fwd[1] * 1.2,
    ]);
    if (!b) return;
    // Returning a ball to a spawner pad earns a bonus.
    for (const sp of this.ballSys.spawners) {
      if (
        dist2(b.p[0], b.p[2], sp.x, sp.z) <=
        BALL_RETURN_RANGE * BALL_RETURN_RANGE
      ) {
        this.addZoomies(p, POINTS.RETURN);
        this.recordParkProgress("fetch", p);
        break;
      }
    }
    if (withEvent)
      this.sendNear(dogPos(p), {
        t: S2C.EVENT,
        kind: EVENTS.DROP,
        dog: p.id,
        ball: b.id,
        p: b.p.map(r3),
      });
  }

  onThrow(p, msg) {
    if (p.ball === null) return;
    let [dx, dy, dz] = Array.isArray(msg.dir) ? msg.dir : [0, 0, 0];
    dx = Number(dx) || 0;
    dy = Number(dy) || 0;
    dz = Number(dz) || 0;
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-4) {
      const f = forwardOf(p.move.yaw);
      dx = f[0];
      dy = 0.3;
      dz = f[1];
    } else {
      dx /= len;
      dy /= len;
      dz /= len;
    }
    const power = Math.min(1, Math.max(0, Number(msg.power) || 0));
    const speed = 4 + power * 10;
    const ballId = p.ball;
    p.ball = null;
    const mouth = this.mouthPos(p);
    const b = this.ballSys.release(
      ballId,
      mouth,
      [dx * speed, dy * speed + 3, dz * speed],
      p.id,
    );
    if (!b) return;
    this.sendNear(dogPos(p), {
      t: S2C.EVENT,
      kind: EVENTS.THROW,
      dog: p.id,
      ball: b.id,
    });
  }

  /** Mouth position of a dog — where held balls ride and throws originate. */
  mouthPos(p) {
    const f = forwardOf(p.move.yaw);
    return [
      p.move.x + f[0] * BALL_MOUTH_OFFSET,
      p.move.y + BALL_MOUTH_HEIGHT * p.custom.size,
      p.move.z + f[1] * BALL_MOUTH_OFFSET,
    ];
  }

  // ── NPC glue ──────────────────────────────────────────────────────────────

  /** Bark/bite scare: flinch→flee + EVENT SCARE, one rep penalty per action. */
  scareNpcs(pos, radius, byPlayer) {
    const scared = this.npcSys.scare(pos[0], pos[2], radius, Date.now());
    for (const n of scared) {
      this.sendNear(pos, {
        t: S2C.EVENT,
        kind: EVENTS.SCARE,
        npc: n.id,
        p: [r3(n.x), 0, r3(n.z)],
      });
      if (byPlayer) this.npcSys.remember(n.id, byPlayer.id, -2);
    }
    if (scared.length && byPlayer) this.addRep(byPlayer, REP.SCARE);
  }

  handlePetEvents(events) {
    for (const ev of events) {
      if (ev.kind === "greet") {
        const pos = dogPos(ev.dog);
        this.sendNear(pos, {
          t: S2C.EVENT,
          kind: EVENTS.GREET,
          npc: ev.npc.id,
          dog: ev.dog.id,
          p: pos,
        });
        continue;
      }
      if (ev.kind !== "pet") continue;
      const { npc, dog } = ev;
      const pos = dogPos(dog);
      this.sendNear(pos, {
        t: S2C.EVENT,
        kind: EVENTS.PET,
        npc: npc.id,
        dog: dog.id,
      });
      this.sendNear(pos, {
        t: S2C.EVENT,
        kind: EVENTS.FEED,
        npc: npc.id,
        dog: dog.id,
        treats: dog.treats + 1,
      });
      dog.treats += 1;
      dog.happiness = Math.min(HAPPINESS_MAX, dog.happiness + PET_HAPPINESS);
      this.addRep(dog, REP.PET + REP.FEED);
      this.addZoomies(dog, POINTS.PET);
      this.satisfyNeed(dog, "social", 16);
      this.npcSys.remember(npc.id, dog.id, 2);
      dog.scoreDirty = true;
    }
  }

  // ── Stats ─────────────────────────────────────────────────────────────────

  addZoomies(p, n) {
    p.zoomies += n;
    p.scoreDirty = true;
  }

  satisfyNeed(p, need, amount) {
    p.needs[need] = Math.min(100, p.needs[need] + amount);
    p.scoreDirty = true;
  }

  recordParkProgress(kind, p) {
    const result = this.parkEvents.record(
      kind,
      p.id,
      Date.now(),
      Math.min(2, this.players.size),
    );
    if (!result) return;
    if (result.completedIds.length) {
      for (const id of result.completedIds) {
        const contributor = this.players.get(id);
        if (contributor) this.addZoomies(contributor, POINTS.PARK_EVENT);
      }
      this.broadcast({
        t: S2C.EVENT,
        kind: EVENTS.PARK_COMPLETE,
        event: this.parkEvents.serialize(),
        ids: result.completedIds,
        p: [0, 0, 0],
      });
    }
    this.broadcast({ t: S2C.PARK, event: this.parkEvents.serialize() });
  }

  addRep(p, n) {
    p.rep = Math.min(REP.MAX, Math.max(REP.MIN, p.rep + n));
    p.scoreDirty = true;
  }

  // ── Simulation step ───────────────────────────────────────────────────────

  step() {
    const now = Date.now();
    const dt = 1 / TICK_RATE;
    this.tick++;

    for (const p of this.players.values()) {
      this.applyInputs(p);
      // Happiness decays slowly; only re-send SCORE when the floored value moves.
      const before = Math.floor(p.happiness);
      p.happiness = Math.max(
        0,
        p.happiness - HAPPINESS_DECAY_PER_MIN / 60 / TICK_RATE,
      );
      const playBefore = Math.floor(p.needs.play);
      const socialBefore = Math.floor(p.needs.social);
      p.needs.play = Math.max(0, p.needs.play - dt * 0.07);
      p.needs.social = Math.max(0, p.needs.social - dt * 0.04);
      if (
        Math.floor(p.needs.play) !== playBefore ||
        Math.floor(p.needs.social) !== socialBefore
      )
        p.scoreDirty = true;
      if (Math.floor(p.happiness) !== before) p.scoreDirty = true;
      if (p.chat && p.chat.until <= now) p.chat = null;
      if (p.scoreDirty) {
        this.send(p, {
          t: S2C.SCORE,
          zoomies: p.zoomies,
          happiness: Math.round(p.happiness),
          treats: p.treats,
          rep: p.rep,
          needs: {
            play: Math.round(p.needs.play),
            social: Math.round(p.needs.social),
            explore: Math.round(p.needs.explore),
          },
        });
        p.scoreDirty = false;
      }
    }

    this.ballSys.update(dt, now, (holderId) => {
      const holder = this.players.get(holderId);
      return holder ? this.mouthPos(holder) : null;
    });

    this.handlePetEvents(this.npcSys.update(dt, now, this.players));
    this.handleChaseEvents(this.squirrelSys.update(dt, now, this.players));
    this.handleTreasureEvents(this.digSys.update(dt * 1000, now, this.players));

    if (this.parkEvents.update(now)) {
      this.broadcast({ t: S2C.PARK, event: this.parkEvents.serialize() });
    }

    if (now - this.lastLeaderboard >= LEADERBOARD_MS && this.players.size) {
      this.lastLeaderboard = now;
      this.broadcastLeaderboard();
    }

    if (this.tick % this.snapshotEvery === 0) this.broadcastStates();
  }

  handleChaseEvents(events) {
    for (const ev of events) {
      const pos = [r3(ev.x), r3(groundHeightAt(ev.x, ev.z)), r3(ev.z)];
      this.addZoomies(ev.dog, POINTS.CHASE);
      this.satisfyNeed(ev.dog, "play", 9);
      this.recordParkProgress("chase", ev.dog);
      this.sendNear(pos, {
        t: S2C.EVENT,
        kind: EVENTS.CHASE,
        dog: ev.dog.id,
        p: pos,
      });
    }
  }

  handleTreasureEvents(events) {
    for (const ev of events) {
      const { dog, spot, loot, zoomies } = ev;
      dog.treats += 1;
      this.addZoomies(dog, zoomies);
      this.satisfyNeed(dog, "explore", 9);
      this.recordParkProgress("treasure", dog);
      this.addRep(dog, 1); // industrious dogs are good dogs
      dog.scoreDirty = true;
      const pos = [r3(spot.x), r3(groundHeightAt(spot.x, spot.z)), r3(spot.z)];
      this.sendNear(pos, {
        t: S2C.EVENT,
        kind: EVENTS.TREASURE,
        dog: dog.id,
        spot: spot.id,
        loot,
        zoomies,
        p: pos,
      });
    }
  }

  /** Top-5 by Zoomies + each player's own rank. */
  broadcastLeaderboard() {
    const ranked = [...this.players.values()].sort(
      (a, b) => b.zoomies - a.zoomies,
    );
    const top = ranked.slice(0, 5).map((p) => ({ n: p.name, z: p.zoomies }));
    ranked.forEach((p, i) => {
      this.send(p, { t: S2C.LEADERBOARD, top, rank: i + 1 });
    });
  }

  // ── Snapshots / broadcasting ──────────────────────────────────────────────

  broadcastStates() {
    const dogs = [...this.players.values()].map((p) => this.serializeDog(p));
    const balls = this.ballSys.serializeAll();
    const npcs = this.npcSys.serializeAll();
    const sq = this.squirrelSys.serializeAll();
    const digs = this.digSys.serializeAll(); // tiny (10 × {id,b}) — send whole
    for (const p of this.players.values()) {
      const { x, z } = p.move;
      this.send(p, {
        t: S2C.STATE,
        tick: this.tick,
        ack: p.lastSeq,
        dogs: filterVisible(x, z, dogs, (d) => [d.p[0], d.p[2]], p.id),
        balls: filterVisible(x, z, balls, (b) => [b.p[0], b.p[2]]),
        npcs: filterVisible(x, z, npcs, (n) => [n.p[0], n.p[2]]),
        sq: filterVisible(x, z, sq, (s) => [s.p[0], s.p[2]]),
        digs,
      });
    }
  }

  /** Global broadcast (JOIN/LEAVE), optionally skipping one player. */
  broadcast(msg, except = null) {
    for (const p of this.players.values()) {
      if (p !== except) this.send(p, msg);
    }
  }

  /** Event broadcast to players whose dog is within interest radius of pos. */
  sendNear(pos, msg) {
    for (const p of this.players.values()) {
      if (withinInterest(p.move.x, p.move.z, pos[0], pos[2])) this.send(p, msg);
    }
  }

  send(p, msg) {
    if (p.ws.readyState === 1) p.ws.send(JSON.stringify(msg));
  }

  serializeDog(p) {
    return {
      id: p.id,
      n: p.name,
      c: p.custom,
      p: [r3(p.move.x), r3(p.move.y), r3(p.move.z)],
      ry: r3(p.move.yaw),
      v: [r3(p.move.vx), r3(p.move.vy), r3(p.move.vz)],
      anim: deriveAnim(p.move, p.emote),
      ball: p.ball,
      chat: p.chat,
    };
  }
}

// ── small helpers ────────────────────────────────────────────────────────────

function r3(v) {
  return Math.round(v * 1000) / 1000;
}
function dist2(ax, az, bx, bz) {
  const dx = ax - bx,
    dz = az - bz;
  return dx * dx + dz * dz;
}
function dogPos(p) {
  return [r3(p.move.x), r3(p.move.y), r3(p.move.z)];
}
/** Planar forward for a yaw, matching stepMovement's camera convention. */
function forwardOf(yaw) {
  return [Math.sin(yaw), -Math.cos(yaw)];
}
