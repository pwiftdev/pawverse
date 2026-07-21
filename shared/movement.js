// ─── TOPPLE shared movement ──────────────────────────────────────────────────
// The SAME integration code runs on the server (authoritative) and on the
// client (prediction). Given the same state + input + dt, both agree.
//
// Platformer model: momentum on the ground, floatier steering in the air,
// coyote time off ledges, one-way platform tops (jump up through, land on),
// bouncy pads, ice, a soft radial world bound, and a deterministic lift back
// to the island if you fall into the cloud sea.

import {
  ACCEL,
  AIR_ACCEL,
  AIR_DECEL,
  BOOST_VELOCITY,
  BOUNCE_VELOCITY,
  COYOTE_TIME,
  DECEL,
  GRAVITY,
  ICE_ACCEL,
  ICE_DECEL,
  JUMP_VELOCITY,
  SPRINT_SPEED,
  STICKY_ACCEL,
  STICKY_DECEL,
  STICKY_SPEED_K,
  TERMINAL_VY,
  VOID_Y,
  WALK_SPEED,
  WORLD_RADIUS,
} from "./constants.js";
import {
  islandHeightAt,
  landingAt,
  P_BOOST,
  P_BOUNCY,
  P_ICE,
  P_NORMAL,
  P_REST,
  P_STICKY,
  SPAWN,
  supportAt,
} from "./tower.js";

export function createMoveState(x = SPAWN.x, z = SPAWN.z) {
  const y = islandHeightAt(x, z) ?? 0;
  return {
    x,
    y,
    z,
    vx: 0,
    vy: 0,
    vz: 0,
    yaw: 0,
    grounded: true,
    groundType: P_NORMAL,
    coyote: 0, // seconds since we last stood on something
    jumped: false, // true from takeoff until the next landing
    jumpLatch: false, // must release jump before jumping again
    // Checkpoint — the last REST surface stood on. Falling into the cloud
    // sea returns you here, so every rest ring is progress banked.
    cx: x,
    cy: y,
    cz: z,
  };
}

/**
 * @param s      move state (mutated)
 * @param input  {f,b,l,r, sprint, jump, yaw} — yaw is camera yaw (rad)
 * @param dt     seconds (server clamps to ≤ 0.1)
 * @returns      { landed, impactVy, bounced, voided } — one step's events,
 *               identical on both sides (drive effects/audio from these).
 */
export function stepMovement(s, input, dt) {
  s.yaw = input.yaw;
  const ev = {
    landed: false,
    impactVy: 0,
    bounced: false,
    boosted: false,
    voided: false,
    jumped: false,
  };

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

  // Momentum: planar velocity chases the input direction. Rates depend on
  // footing — ground is crisp, air keeps momentum, ice barely grips, honey
  // grips completely but wades slowly.
  const onIce = s.grounded && s.groundType === P_ICE;
  const onHoney = s.grounded && s.groundType === P_STICKY;
  const speed =
    (input.sprint ? SPRINT_SPEED : WALK_SPEED) * (onHoney ? STICKY_SPEED_K : 1);
  const accel = s.grounded
    ? onIce
      ? ICE_ACCEL
      : onHoney
        ? STICKY_ACCEL
        : ACCEL
    : AIR_ACCEL;
  const decel = s.grounded
    ? onIce
      ? ICE_DECEL
      : onHoney
        ? STICKY_DECEL
        : DECEL
    : AIR_DECEL;
  const targetVx = dx * speed,
    targetVz = dz * speed;
  const rate = dx === 0 && dz === 0 ? decel : accel;
  const k = Math.min(1, rate * dt);
  s.vx += (targetVx - s.vx) * k;
  s.vz += (targetVz - s.vz) * k;
  // kill sub-perceptual drift so idle blobs are exactly still
  if (targetVx === 0 && targetVz === 0 && Math.hypot(s.vx, s.vz) < 0.05) {
    s.vx = 0;
    s.vz = 0;
  }

  // Jump — grounded, or shortly after walking off an edge (coyote).
  if (!input.jump) s.jumpLatch = false;
  if (
    input.jump &&
    !s.jumpLatch &&
    (s.grounded || (s.coyote < COYOTE_TIME && !s.jumped))
  ) {
    s.vy = JUMP_VELOCITY;
    s.grounded = false;
    s.jumped = true;
    s.jumpLatch = true;
    s.coyote = COYOTE_TIME;
    ev.jumped = true;
  }

  // Vertical integration with one-way landing (falling only).
  if (!s.grounded) {
    s.coyote += dt;
    s.vy = Math.max(TERMINAL_VY, s.vy + GRAVITY * dt);
    const prevY = s.y;
    s.y += s.vy * dt;
    if (s.vy <= 0) {
      const hit = landingAt(s.x, prevY, s.y, s.z);
      if (hit) {
        s.y = hit.top;
        ev.impactVy = s.vy;
        if (hit.type === P_BOUNCY || hit.type === P_BOOST) {
          s.vy = hit.type === P_BOOST ? BOOST_VELOCITY : BOUNCE_VELOCITY;
          s.jumped = true;
          ev.bounced = true;
          ev.boosted = hit.type === P_BOOST;
        } else {
          s.vy = 0;
          s.grounded = true;
          s.groundType = hit.type;
          s.jumped = false;
          s.coyote = 0;
          ev.landed = true;
          if (hit.type === P_REST) {
            s.cx = s.x;
            s.cy = hit.top;
            s.cz = s.z;
          }
        }
      }
    }
  }

  // Horizontal integration.
  s.x += s.vx * dt;
  s.z += s.vz * dt;

  // Grounded blobs hug their surface — and notice when it ends.
  if (s.grounded) {
    const sup = supportAt(s.x, s.y, s.z, 0.35);
    if (sup) {
      s.y = sup.top;
      s.groundType = sup.type;
      if (sup.type === P_BOUNCY || sup.type === P_BOOST) {
        // standing on a pad you didn't fall onto (edge case) — pop anyway
        s.vy = sup.type === P_BOOST ? BOOST_VELOCITY : BOUNCE_VELOCITY;
        s.grounded = false;
        s.jumped = true;
        ev.bounced = true;
        ev.boosted = sup.type === P_BOOST;
      }
    } else {
      s.grounded = false;
      s.coyote = 0;
      s.vy = 0;
    }
  }

  // Soft radial world bound — walk into it and it gently holds you.
  const rad = Math.hypot(s.x, s.z);
  if (rad > WORLD_RADIUS) {
    const f = WORLD_RADIUS / rad;
    s.x *= f;
    s.z *= f;
  }

  // Fell into the cloud sea → the wind lifts you back to your checkpoint:
  // the last rest surface you stood on (the island until you bank a ring).
  // Deterministic — checkpoint lives in the move state on both sides.
  if (s.y < VOID_Y) {
    s.x = s.cx;
    s.y = s.cy;
    s.z = s.cz;
    s.vx = 0;
    s.vy = 0;
    s.vz = 0;
    s.grounded = true;
    s.groundType = P_REST;
    s.jumped = false;
    s.coyote = 0;
    ev.voided = true;
  }

  return ev;
}

/** Derive the animation state both sides agree on. */
export function deriveAnim(s) {
  if (!s.grounded) return s.vy > 1 ? "rise" : "fall";
  const planar = Math.hypot(s.vx, s.vz);
  if (planar > WALK_SPEED * 1.1) return "sprint";
  if (planar > 0.2) return "run";
  return "idle";
}
