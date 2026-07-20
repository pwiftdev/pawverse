// ─── NPC system ──────────────────────────────────────────────────────────────
// Simple server-side AI for the park's humans. They amble along waypoint
// loops, flinch and flee when scared (bark/bite), and walk over to pet any
// dog that sits/lays/wags calmly next to them for PET_TIME_MS.
// update() returns events; the game layer broadcasts them and hands out rewards.

import {
  NPC_COUNT,
  NPC_WALK_SPEED,
  NPC_FLEE_SPEED,
  NPC_FLEE_TIME_MS,
  PET_RANGE,
  PET_TIME_MS,
  WORLD_BOUND,
} from "../shared/constants.js";
import {
  NPC_WAYPOINTS,
  groundHeightAt,
  resolveObstacles,
} from "../shared/world.js";
import { deriveAnim } from "../shared/movement.js";

const FLINCH_MS = 500;
const PET_COOLDOWN_MS = 20_000; // per NPC per dog — anti-farming
const PET_APPROACH_SPEED = 2.4; // walk-over speed when going to pet
const PET_REACH = 1.4; // distance at which the pet happens
const WAYPOINT_ARRIVE = 2.6; // > treat-stand collider radius, or NPCs push forever
const GREET_RANGE = 6;
const GREET_COOLDOWN_MS = 30_000;
const NPC_ROLES = ["jogger", "walker", "trainer", "picnicker"];
const ROLE_SPEED = { jogger: 1.3, walker: 1, trainer: 0.9, picnicker: 0.75 };

export class NpcSystem {
  constructor() {
    this.npcs = [];
    for (let i = 0; i < NPC_COUNT; i++) {
      const loop = NPC_WAYPOINTS[i % NPC_WAYPOINTS.length];
      const start = loop[0];
      this.npcs.push({
        id: i,
        x: start.x,
        z: start.z,
        ry: 0,
        st: "idle",
        loop,
        wp: 1, // next waypoint index
        stateUntil: Math.random() * 2000, // stagger initial idle pauses
        threat: null, // {x,z} that scared us
        petDog: null, // dog id we're walking over to pet
        petSince: 0, // when the current pet candidate started qualifying
        petCandidate: null, // dog id currently qualifying
        cooldowns: new Map(), // dogId → timestamp when pettable again
        memories: new Map(), // dogId → familiarity, changed by pets/scares
        greetings: new Map(), // dogId → next greeting timestamp
        role: NPC_ROLES[i % NPC_ROLES.length],
      });
    }
  }

  remember(npcId, dogId, amount) {
    const npc = this.npcs[npcId];
    if (!npc) return;
    const current = npc.memories.get(dogId) || 0;
    npc.memories.set(dogId, Math.max(-5, Math.min(5, current + amount)));
    if (amount > 0 && !npc.greetings.has(dogId)) {
      npc.greetings.set(dogId, Date.now() + 10_000);
    }
  }

  forgetDog(dogId) {
    for (const npc of this.npcs) {
      npc.memories.delete(dogId);
      npc.greetings.delete(dogId);
      npc.cooldowns.delete(dogId);
      if (npc.petDog === dogId) npc.petDog = null;
      if (npc.petCandidate === dogId) npc.petCandidate = null;
    }
  }

  /**
   * Scare NPCs within radius of (x,z): flinch, then flee away from the threat.
   * @returns array of freshly scared npcs (for EVENT SCARE + rep penalty)
   */
  scare(x, z, radius, now) {
    const scared = [];
    const r2 = radius * radius;
    for (const n of this.npcs) {
      if (n.st === "flinch" || n.st === "flee") continue; // already panicking
      const dx = n.x - x,
        dz = n.z - z;
      if (dx * dx + dz * dz > r2) continue;
      n.st = "flinch";
      n.stateUntil = now + FLINCH_MS;
      n.threat = { x, z };
      n.petDog = null;
      n.petCandidate = null;
      n.petSince = 0;
      scared.push(n);
    }
    return scared;
  }

  /**
   * Per-tick AI.
   * @param dogs   Map of dogId → player (needs .move, .emote, .id)
   * @returns events: [{kind:'pet', npc, dog} | {kind:'scare-done'?}] — pet only today
   */
  update(dt, now, dogs) {
    const events = [];
    for (const n of this.npcs) {
      switch (n.st) {
        case "idle":
          if (now >= n.stateUntil) {
            n.st = "walk";
          }
          if (this.watchForGreeting(n, now, dogs, events)) break;
          this.watchForPet(n, now, dogs);
          break;

        case "walk": {
          this.moveToward(
            n,
            n.loop[n.wp],
            NPC_WALK_SPEED * ROLE_SPEED[n.role],
            dt,
          );
          const wp = n.loop[n.wp];
          if (dist2(n.x, n.z, wp.x, wp.z) < WAYPOINT_ARRIVE * WAYPOINT_ARRIVE) {
            n.wp = (n.wp + 1) % n.loop.length;
            n.st = "idle";
            n.stateUntil = now + 1000 + Math.random() * 2500;
          }
          if (this.watchForGreeting(n, now, dogs, events)) break;
          this.watchForPet(n, now, dogs);
          break;
        }

        case "wave":
          if (now >= n.stateUntil) {
            n.st = "idle";
            n.stateUntil = now + 900;
          }
          break;

        case "pet": {
          const dog = dogs.get(n.petDog);
          if (
            !dog ||
            !isCalm(dog) ||
            dist2(n.x, n.z, dog.move.x, dog.move.z) > PET_RANGE * PET_RANGE * 4
          ) {
            // Dog left or stood up — give up, back to wandering.
            n.st = "idle";
            n.stateUntil = now + 1000;
            n.petDog = null;
            break;
          }
          this.moveToward(n, dog.move, PET_APPROACH_SPEED, dt);
          if (
            dist2(n.x, n.z, dog.move.x, dog.move.z) <=
            PET_REACH * PET_REACH
          ) {
            n.cooldowns.set(dog.id, now + PET_COOLDOWN_MS);
            n.st = "idle";
            n.stateUntil = now + 2000;
            n.petDog = null;
            n.ry = Math.atan2(dog.move.x - n.x, dog.move.z - n.z);
            events.push({ kind: "pet", npc: n, dog });
          }
          break;
        }

        case "flinch":
          if (now >= n.stateUntil) {
            n.st = "flee";
            n.stateUntil = now + NPC_FLEE_TIME_MS;
          }
          break;

        case "flee": {
          if (now >= n.stateUntil) {
            n.st = "idle";
            n.stateUntil = now + 1500;
            n.threat = null;
            break;
          }
          // Run directly away from the threat point.
          const dx = n.x - n.threat.x,
            dz = n.z - n.threat.z;
          const len = Math.hypot(dx, dz) || 1;
          this.moveToward(
            n,
            { x: n.x + (dx / len) * 10, z: n.z + (dz / len) * 10 },
            NPC_FLEE_SPEED,
            dt,
          );
          break;
        }
      }
    }
    return events;
  }

  watchForGreeting(n, now, dogs, events) {
    for (const dog of dogs.values()) {
      if ((n.memories.get(dog.id) || 0) < 2) continue;
      if ((n.greetings.get(dog.id) || 0) > now) continue;
      if (dist2(n.x, n.z, dog.move.x, dog.move.z) > GREET_RANGE * GREET_RANGE)
        continue;
      n.st = "wave";
      n.stateUntil = now + 1600;
      n.ry = Math.atan2(dog.move.x - n.x, dog.move.z - n.z);
      n.greetings.set(dog.id, now + GREET_COOLDOWN_MS);
      events.push({ kind: "greet", npc: n, dog });
      return true;
    }
    return false;
  }

  /**
   * While idle/walking: notice a calm dog (sit/lay/wag, standing still) inside
   * PET_RANGE for PET_TIME_MS, then walk over to pet it.
   */
  watchForPet(n, now, dogs) {
    let best = null,
      bestD2 = PET_RANGE * PET_RANGE;
    for (const dog of dogs.values()) {
      if ((n.cooldowns.get(dog.id) || 0) > now) continue; // this dog farmed us recently
      if (!isCalm(dog)) continue;
      const d2 = dist2(n.x, n.z, dog.move.x, dog.move.z);
      if (d2 <= bestD2) {
        bestD2 = d2;
        best = dog;
      }
    }
    if (!best) {
      n.petCandidate = null;
      n.petSince = 0;
      return;
    }
    if (n.petCandidate !== best.id) {
      n.petCandidate = best.id;
      n.petSince = now;
      return;
    }
    if (now - n.petSince >= PET_TIME_MS) {
      n.st = "pet";
      n.petDog = best.id;
      n.petCandidate = null;
      n.petSince = 0;
    }
  }

  moveToward(n, target, speed, dt) {
    const dx = target.x - n.x,
      dz = target.z - n.z;
    const len = Math.hypot(dx, dz);
    if (len < 1e-4) return;
    n.x += (dx / len) * speed * dt;
    n.z += (dz / len) * speed * dt;
    n.x = Math.max(-WORLD_BOUND, Math.min(WORLD_BOUND, n.x));
    n.z = Math.max(-WORLD_BOUND, Math.min(WORLD_BOUND, n.z));
    resolveObstacles(n, 0.4); // humans don't ghost through trees either
    n.ry = Math.atan2(dx, dz);
  }

  serialize(n) {
    return {
      id: n.id,
      p: [r3(n.x), r3(groundHeightAt(n.x, n.z)), r3(n.z)],
      ry: r3(n.ry),
      st: n.st,
    };
  }

  serializeAll() {
    return this.npcs.map((n) => this.serialize(n));
  }
}

/** A dog the NPC wants to pet: calm emote and standing still. */
function isCalm(dog) {
  const anim = deriveAnim(dog.move, dog.emote);
  if (anim !== "sit" && anim !== "lay" && anim !== "wag") return false;
  return Math.hypot(dog.move.vx, dog.move.vz) < 0.2;
}

function dist2(ax, az, bx, bz) {
  const dx = ax - bx,
    dz = az - bz;
  return dx * dx + dz * dz;
}
function r3(v) {
  return Math.round(v * 1000) / 1000;
}
