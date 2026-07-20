// ─── Ball system ─────────────────────────────────────────────────────────────
// Spawner pads keep the park stocked with balls (per-spawner respawn cooldown,
// MAX_BALLS total). Free balls integrate simple physics; held balls follow
// their holder's mouth position (supplied by the game each tick).

import {
  GRAVITY, MAX_BALLS, BALL_RESPAWN_MS, BALL_RADIUS, WORLD_BOUND,
} from '../shared/constants.js';
import { BALL_SPAWNERS, firstCircleHit, groundHeightAt, isWaterAt, WATER_LEVEL } from '../shared/world.js';

const BOUNCE_DAMPING = 0.45;   // vertical energy kept on ground bounce
const GROUND_FRICTION = 3.0;   // planar damping (1/s) while touching ground
const SLEEP_SPEED_SQ = 0.04;   // below this, a grounded ball stops

export class BallSystem {
  constructor() {
    this.balls = new Map();          // id → ball
    this.nextId = 1;
    this.spawners = BALL_SPAWNERS.map((s) => ({ ...s, lastSpawn: -Infinity }));
  }

  /** Total live balls (held + free). */
  get count() { return this.balls.size; }

  get(id) { return this.balls.get(id); }

  /** Spawn a fresh ball on a pad. */
  spawn(spawner, now) {
    const id = this.nextId++;
    const ball = {
      id,
      spawner: spawner.id,
      p: [spawner.x, groundHeightAt(spawner.x, spawner.z) + BALL_RADIUS, spawner.z],
      v: [0, 0, 0],
      holder: null,
      thrownBy: null,
    };
    spawner.lastSpawn = now;
    this.balls.set(id, ball);
    return ball;
  }

  /** Keep every pad stocked: respawn when its ball is gone and cooldown passed. */
  maintainSpawners(now) {
    for (const sp of this.spawners) {
      if (this.balls.size >= MAX_BALLS) break;
      const padInUse = [...this.balls.values()].some((b) => b.spawner === sp.id);
      if (!padInUse && now - sp.lastSpawn >= BALL_RESPAWN_MS) this.spawn(sp, now);
    }
  }

  /**
   * Per-tick update.
   * @param dt       seconds
   * @param now      ms
   * @param mouthPos (holderId) → [x,y,z] | null  — where a held ball sits
   */
  update(dt, now, mouthPos) {
    this.maintainSpawners(now);
    for (const b of this.balls.values()) {
      if (b.holder !== null) {
        // Held balls are kinematic: glued to the holder's mouth.
        const m = mouthPos(b.holder);
        if (m) { b.p[0] = m[0]; b.p[1] = m[1]; b.p[2] = m[2]; b.v = [0, 0, 0]; }
        continue;
      }
      this.integrate(b, dt);
    }
  }

  /** Free-ball physics: gravity, ground bounce, friction, water float. */
  integrate(b, dt) {
    b.v[1] += GRAVITY * dt;
    b.p[0] += b.v[0] * dt;
    b.p[1] += b.v[1] * dt;
    b.p[2] += b.v[2] * dt;

    // World bounds (bounce softly off the fence)
    for (const axis of [0, 2]) {
      if (b.p[axis] > WORLD_BOUND) { b.p[axis] = WORLD_BOUND; b.v[axis] *= -BOUNCE_DAMPING; }
      if (b.p[axis] < -WORLD_BOUND) { b.p[axis] = -WORLD_BOUND; b.v[axis] *= -BOUNCE_DAMPING; }
    }

    // Bounce off solid objects (trees, benches, stands)
    const solid = firstCircleHit(b.p[0], b.p[2], b.p[1], BALL_RADIUS);
    if (solid) {
      const dx = b.p[0] - solid.x, dz = b.p[2] - solid.z;
      const d = Math.hypot(dx, dz) || 1e-5;
      const nx = dx / d, nz = dz / d;
      const minD = solid.r + BALL_RADIUS;
      b.p[0] = solid.x + nx * minD;
      b.p[2] = solid.z + nz * minD;
      // reflect the planar velocity across the surface normal, losing energy
      const dot = b.v[0] * nx + b.v[2] * nz;
      if (dot < 0) {
        b.v[0] = (b.v[0] - 2 * dot * nx) * 0.55;
        b.v[2] = (b.v[2] - 2 * dot * nz) * 0.55;
      }
    }

    if (isWaterAt(b.p[0], b.p[2])) {
      // Float on the surface with heavy drag.
      if (b.p[1] < WATER_LEVEL) { b.p[1] = WATER_LEVEL; b.v[1] = 0; }
      const drag = Math.max(0, 1 - 2.5 * dt);
      b.v[0] *= drag; b.v[2] *= drag;
      return;
    }

    const rest = groundHeightAt(b.p[0], b.p[2]) + BALL_RADIUS;
    if (b.p[1] <= rest) {
      b.p[1] = rest;
      if (Math.abs(b.v[1]) > 0.8) b.v[1] = -b.v[1] * BOUNCE_DAMPING;
      else b.v[1] = 0;
      // Planar friction while touching the ground
      const drag = Math.max(0, 1 - GROUND_FRICTION * dt);
      b.v[0] *= drag; b.v[2] *= drag;
      if (b.v[0] * b.v[0] + b.v[2] * b.v[2] < SLEEP_SPEED_SQ && b.v[1] === 0) {
        b.v[0] = 0; b.v[2] = 0;
      }
    }
  }

  /** Release a held ball at pos with velocity; returns the ball or null. */
  release(ballId, p, v, thrownBy = null) {
    const b = this.balls.get(ballId);
    if (!b) return null;
    b.holder = null;
    b.thrownBy = thrownBy;
    b.p = [...p];
    b.v = [...v];
    return b;
  }

  serialize(b) {
    return {
      id: b.id, spawner: b.spawner,
      p: b.p.map(r3), v: b.v.map(r3),
      holder: b.holder, thrownBy: b.thrownBy,
    };
  }

  serializeAll() { return [...this.balls.values()].map((b) => this.serialize(b)); }
}

function r3(v) { return Math.round(v * 1000) / 1000; }
