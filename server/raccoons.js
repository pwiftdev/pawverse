// ─── Raccoon system ─────────────────────────────────────────────────────────
// Raccoons forage on the lawn near a home tree; when a player
// gets close they bolt for the nearest tree. Tag one mid-flee and it "escapes
// up the tree" — the chasing player earns Zoomies and the raccoon
// hides for a while before popping out somewhere else.
//
// States: forage → alert (frozen, tail up) → flee → hide(invisible) → forage

import {
  RACCOON_COUNT,
  RACCOON_ALERT_RADIUS,
  RACCOON_TAG_RADIUS,
  RACCOON_FLEE_SPEED,
  RACCOON_FORAGE_SPEED,
  RACCOON_HIDE_MS,
  WORLD_BOUND,
} from "../shared/constants.js";
import {
  TREES,
  groundHeightAt,
  isWaterAt,
  resolveObstacles,
} from "../shared/world.js";
import { seedRng } from "../shared/breeds.js";

const ALERT_MS = 350; // freeze before bolting
const HOP_LEN = 2.2; // forage hop distance
const TREE_REACH = 1.3; // close enough to vanish up the trunk
const ALERT_R2 = RACCOON_ALERT_RADIUS * RACCOON_ALERT_RADIUS;
const TAG_R2 = RACCOON_TAG_RADIUS * RACCOON_TAG_RADIUS;

export class RaccoonSystem {
  constructor() {
    this.rng = seedRng("pawverse-raccoons");
    this.raccoons = [];
    for (let i = 0; i < RACCOON_COUNT; i++) {
      const home = TREES[Math.floor(this.rng() * TREES.length)];
      this.raccoons.push({
        id: i,
        home,
        x: home.x + (this.rng() * 4 - 2),
        z: home.z + (this.rng() * 4 - 2),
        ry: 0,
        st: "forage", // forage | alert | flee | hide
        stateUntil: 0,
        hop: null, // {x,z} current forage hop target
        fleeTree: null, // tree we're running to
      });
    }
  }

  nearestPlayer(x, z, players) {
    let best = null,
      bestD2 = Infinity;
    for (const p of players.values()) {
      const dx = p.move.x - x,
        dz = p.move.z - z;
      const d2 = dx * dx + dz * dz;
      if (d2 < bestD2) {
        bestD2 = d2;
        best = p;
      }
    }
    return best ? { dog: best, d2: bestD2 } : null;
  }

  /** Tree to flee to: nearest one that is AWAY from the threat. */
  pickFleeTree(s, threatX, threatZ) {
    let best = null,
      bestScore = Infinity;
    for (const t of TREES) {
      const dSq = (t.x - s.x) ** 2 + (t.z - s.z) ** 2;
      if (dSq < 4) continue; // not the one we're under
      const dThreat = (t.x - threatX) ** 2 + (t.z - threatZ) ** 2;
      if (dThreat < 64) continue;
      const score = dSq - dThreat * 0.25; // near me, far from the dog
      if (score < bestScore) {
        bestScore = score;
        best = t;
      }
    }
    return best || s.home;
  }

  /**
   * Per-tick AI. Returns chase events for the player that tags a raccoon.
   */
  update(dt, now, players) {
    const events = [];
    for (const s of this.raccoons) {
      switch (s.st) {
        case "forage": {
          const near = this.nearestPlayer(s.x, s.z, players);
          if (near && near.d2 < ALERT_R2) {
            s.st = "alert";
            s.stateUntil = now + ALERT_MS;
            s.ry = Math.atan2(near.dog.move.x - s.x, near.dog.move.z - s.z);
            break;
          }
          if (!s.hop || now >= s.stateUntil) {
            // pick a new hop target around the home tree
            const a = this.rng() * Math.PI * 2;
            const r = 1.5 + this.rng() * 4;
            let hx = s.home.x + Math.cos(a) * r;
            let hz = s.home.z + Math.sin(a) * r;
            hx = Math.max(-WORLD_BOUND, Math.min(WORLD_BOUND, hx));
            hz = Math.max(-WORLD_BOUND, Math.min(WORLD_BOUND, hz));
            if (!isWaterAt(hx, hz)) s.hop = { x: hx, z: hz };
            s.stateUntil = now + 1200 + this.rng() * 2600;
          }
          if (s.hop)
            this.moveToward(s, s.hop.x, s.hop.z, RACCOON_FORAGE_SPEED, dt);
          break;
        }

        case "alert": {
          if (now < s.stateUntil) break;
          const near = this.nearestPlayer(s.x, s.z, players);
          if (!near || near.d2 > ALERT_R2 * 2.2) {
            s.st = "forage";
            break;
          }
          s.st = "flee";
          s.fleeTree = this.pickFleeTree(s, near.dog.move.x, near.dog.move.z);
          break;
        }

        case "flee": {
          const near = this.nearestPlayer(s.x, s.z, players);
          if (near && near.d2 < TAG_R2) {
            events.push({ kind: "chase", dog: near.dog, x: s.x, z: s.z });
            this.hide(s, now);
            break;
          }
          const t = s.fleeTree;
          this.moveToward(s, t.x, t.z, RACCOON_FLEE_SPEED, dt);
          if ((t.x - s.x) ** 2 + (t.z - s.z) ** 2 < TREE_REACH * TREE_REACH) {
            this.hide(s, now); // made it — vanish up the trunk
          }
          break;
        }

        case "hide":
          if (now >= s.stateUntil) {
            // reappear under a random tree, refreshed
            const home = TREES[Math.floor(this.rng() * TREES.length)];
            s.home = home;
            s.x = home.x + (this.rng() * 3 - 1.5);
            s.z = home.z + (this.rng() * 3 - 1.5);
            s.st = "forage";
            s.hop = null;
          }
          break;
      }
    }
    return events;
  }

  hide(s, now) {
    s.st = "hide";
    s.stateUntil = now + RACCOON_HIDE_MS;
    s.fleeTree = null;
  }

  moveToward(s, tx, tz, speed, dt) {
    const dx = tx - s.x,
      dz = tz - s.z;
    const len = Math.hypot(dx, dz);
    if (len < 1e-4) return;
    s.x += (dx / len) * speed * dt;
    s.z += (dz / len) * speed * dt;
    resolveObstacles(s, 0.2);
    s.ry = Math.atan2(dx, dz);
  }

  /** Hidden raccoons aren't serialized at all — they're up a tree. */
  serializeAll() {
    const out = [];
    for (const s of this.raccoons) {
      if (s.st === "hide") continue;
      out.push({
        id: s.id,
        p: [r3(s.x), r3(groundHeightAt(s.x, s.z)), r3(s.z)],
        ry: r3(s.ry),
        st: s.st,
      });
    }
    return out;
  }
}

function r3(v) {
  return Math.round(v * 1000) / 1000;
}
