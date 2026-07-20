// ─── Buried treasure ─────────────────────────────────────────────────────────
// Dirt mounds (shared/world.js DIG_SPOTS) hide treasures. A dog that digs
// (G emote) within DIG_RADIUS of a full mound for DIG_TIME_MS unearths a
// treasure: +1 treat, +zoomies by loot rarity, EVENTS.TREASURE. The mound
// refills after DIG_RESPAWN_MS.

import { DIG_RADIUS, DIG_TIME_MS, DIG_RESPAWN_MS, TREASURES } from '../shared/constants.js';
import { DIG_SPOTS } from '../shared/world.js';
import { deriveAnim } from '../shared/movement.js';
import { seedRng } from '../shared/breeds.js';

const DIG_R2 = DIG_RADIUS * DIG_RADIUS;
const TOTAL_WEIGHT = TREASURES.reduce((sum, t) => sum + t.w, 0);

export class DigSystem {
  constructor() {
    this.rng = seedRng('pawverse-loot');
    this.spots = DIG_SPOTS.map((s) => ({
      ...s,
      buried: true,          // treasure available?
      refillAt: 0,
      progress: new Map(),   // dogId → ms of digging accumulated
    }));
  }

  rollLoot() {
    let roll = this.rng() * TOTAL_WEIGHT;
    for (const t of TREASURES) {
      roll -= t.w;
      if (roll <= 0) return t;
    }
    return TREASURES[0];
  }

  /**
   * Per-tick: accumulate dig progress for digging dogs near full mounds.
   * @returns events: [{kind:'treasure', dog, spot, loot, zoomies}]
   */
  update(dtMs, now, dogs) {
    const events = [];
    for (const spot of this.spots) {
      if (!spot.buried) {
        if (now >= spot.refillAt) { spot.buried = true; spot.progress.clear(); }
        continue;
      }
      for (const dog of dogs.values()) {
        const dx = dog.move.x - spot.x, dz = dog.move.z - spot.z;
        if (dx * dx + dz * dz > DIG_R2) { spot.progress.delete(dog.id); continue; }
        if (deriveAnim(dog.move, dog.emote) !== 'dig') { spot.progress.delete(dog.id); continue; }
        const p = (spot.progress.get(dog.id) || 0) + dtMs;
        if (p < DIG_TIME_MS) { spot.progress.set(dog.id, p); continue; }
        // Unearthed!
        const { loot, zoomies } = this.rollLoot();
        spot.buried = false;
        spot.refillAt = now + DIG_RESPAWN_MS;
        spot.progress.clear();
        events.push({ kind: 'treasure', dog, spot, loot, zoomies });
        break;                                   // one treasure per mound
      }
    }
    return events;
  }

  /** Wire state: which mounds currently hold a treasure. */
  serializeAll() {
    return this.spots.map((s) => ({ id: s.id, b: s.buried ? 1 : 0 }));
  }
}
