// ─── PAWVERSE shared movement ────────────────────────────────────────────────
// The SAME integration code runs on the server (authoritative) and on the
// client (prediction). Given the same state + input + dt, both agree.

import {
  ACCEL,
  DECEL,
  GRAVITY,
  JUMP_VELOCITY,
  SPRINT_SPEED,
  SWIM_SPEED,
  WALK_SPEED,
  WORLD_BOUND,
} from "./constants.js";
import { groundHeightAt, resolveObstacles, WATER_LEVEL } from "./world.js";

export function createMoveState(x = 0, z = 12) {
  return {
    x,
    y: 0,
    z,
    vx: 0,
    vy: 0,
    vz: 0,
    yaw: 0,
    grounded: true,
    swimming: false,
  };
}

/**
 * @param s      move state (mutated): {x,y,z,vx,vy,vz,yaw,grounded,swimming}
 * @param input  {f,b,l,r, sprint, jump, yaw}  — yaw is camera yaw (rad)
 * @param dt     seconds (server clamps to ≤ 0.1)
 * @param speedMul character preset speed multiplier
 */
export function stepMovement(s, input, dt, speedMul = 1) {
  s.yaw = input.yaw;

  // Desired planar direction, relative to camera yaw
  const ix = (input.r ? 1 : 0) - (input.l ? 1 : 0);
  const iz = (input.b ? 1 : 0) - (input.f ? 1 : 0);
  let dx = 0,
    dz = 0;
  if (ix !== 0 || iz !== 0) {
    const sin = Math.sin(input.yaw),
      cos = Math.cos(input.yaw);
    dx = ix * cos - iz * sin;
    dz = ix * sin + iz * cos;
    const len = Math.hypot(dx, dz);
    dx /= len;
    dz /= len;
  }

  const gh = groundHeightAt(s.x, s.z);
  s.swimming = gh < WATER_LEVEL - 0.2;

  const speed =
    (s.swimming ? SWIM_SPEED : input.sprint ? SPRINT_SPEED : WALK_SPEED) *
    speedMul;
  // Momentum: planar velocity chases the input direction instead of snapping.
  // Exponential smoothing on a fixed formula — deterministic for any dt, so
  // server replay and client prediction still agree bit-for-bit.
  const targetVx = dx * speed,
    targetVz = dz * speed;
  const rate = dx === 0 && dz === 0 ? DECEL : ACCEL;
  const k = Math.min(1, rate * dt);
  s.vx += (targetVx - s.vx) * k;
  s.vz += (targetVz - s.vz) * k;
  // kill sub-perceptual drift so idle dogs are exactly still
  if (targetVx === 0 && targetVz === 0 && Math.hypot(s.vx, s.vz) < 0.05) {
    s.vx = 0;
    s.vz = 0;
  }

  if (s.swimming) {
    // Float on the surface; gentle bob is purely client-side visual.
    s.vy = 0;
    s.y = WATER_LEVEL - 0.15;
    s.grounded = false;
  } else {
    if (s.grounded && input.jump) {
      s.vy = JUMP_VELOCITY;
      s.grounded = false;
    }
    s.vy += GRAVITY * dt;
    s.y += s.vy * dt;
    const ghNew = groundHeightAt(s.x, s.z);
    if (s.grounded && ghNew >= WATER_LEVEL - 0.2 && s.y - ghNew <= 0.45) {
      // Step-snap: hug the ground on slopes instead of going micro-airborne
      // every step downhill (keeps the run anim stable and prediction clean).
      s.y = ghNew;
      s.vy = 0;
    } else if (ghNew >= WATER_LEVEL - 0.2 && s.y <= ghNew) {
      s.y = ghNew;
      s.vy = 0;
      s.grounded = true;
    } else if (s.y < ghNew) {
      s.y = ghNew;
      s.vy = 0;
      s.grounded = true;
    }
  }

  s.x += s.vx * dt;
  s.z += s.vz * dt;

  // World bounds
  s.x = Math.max(-WORLD_BOUND, Math.min(WORLD_BOUND, s.x));
  s.z = Math.max(-WORLD_BOUND, Math.min(WORLD_BOUND, s.z));

  // Solid objects: trees, benches, furniture, the yard fence. Deterministic
  // push-out, so server and client prediction land on identical positions.
  // (Feet height gates low props — a jumping dog vaults a bench.)
  resolveObstacles(s, 0.35);
}

/** Derive the animation state both sides can agree on. Emotes override. */
export function deriveAnim(s, emote) {
  if (emote && emote !== "none") return emote; // sit | lay | wag | roll | dig | howl
  if (s.swimming) return "swim";
  if (!s.grounded) return "air";
  const planar = Math.hypot(s.vx, s.vz);
  if (planar > WALK_SPEED * 1.1) return "sprint";
  if (planar > 0.2) return "run";
  return "idle";
}
