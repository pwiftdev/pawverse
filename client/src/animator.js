// ─── Procedural blob animation ───────────────────────────────────────────────
// No rigs, no clips — pure squash & stretch driven by the shared anim state
// (idle | run | sprint | rise | fall) plus velocity. Landing squash is an
// impulse main.js sets on the blob (blob.squash = strength).

const RUN_FREQ = 11;
const SPRINT_FREQ = 14.5;

/**
 * @param blob  from createBlob()
 * @param anim  shared anim state string
 * @param speed planar speed m/s
 * @param vy    vertical velocity m/s
 * @param dt    frame seconds
 * @param t     wall-clock seconds
 */
export function animateBlob(blob, anim, speed, vy, dt, t) {
  const s = t + blob.seed;

  // Landing squash decays fast
  blob.squash = Math.max(0, blob.squash - dt * 6);
  const squashK = blob.squash;

  let sy = 1,
    sxz = 1,
    bob = 0,
    tilt = 0;

  switch (anim) {
    case "rise":
      sy = 1.16;
      sxz = 0.93;
      break;
    case "fall": {
      const k = Math.min(0.4, Math.abs(vy) * 0.013);
      sy = 1 + k;
      sxz = 1 - k * 0.45;
      tilt = Math.sin(s * 16) * Math.min(0.12, Math.abs(vy) * 0.004); // flail
      break;
    }
    case "sprint":
      bob = Math.abs(Math.sin(s * SPRINT_FREQ)) * 0.09;
      tilt = Math.sin(s * SPRINT_FREQ) * 0.1;
      sy = 1 + Math.sin(s * SPRINT_FREQ * 2) * 0.04;
      break;
    case "run":
      bob = Math.abs(Math.sin(s * RUN_FREQ)) * 0.06;
      tilt = Math.sin(s * RUN_FREQ) * 0.075;
      break;
    default: // idle — gentle breathing
      sy = 1 + Math.sin(s * 2.6) * 0.025;
      sxz = 1 - Math.sin(s * 2.6) * 0.012;
  }

  // Fold in the landing squash (flatten + widen)
  sy *= 1 - squashK * 0.38;
  sxz *= 1 + squashK * 0.26;

  blob.body.scale.set(sxz, 0.92 * sy, sxz);
  blob.body.position.y = 0.386 * sy + bob;
  blob.eyes.position.y = 0.386 * sy + bob;
  blob.mouth.position.y = 0.3 * sy + bob;
  blob.group.rotation.z = tilt;
  blob.crown.position.y = 0.78 * sy + bob;

  // Feet: patter while moving, tuck in the air
  const airborne = anim === "rise" || anim === "fall";
  const freq = anim === "sprint" ? SPRINT_FREQ : RUN_FREQ;
  for (let i = 0; i < blob.feet.length; i++) {
    const foot = blob.feet[i];
    if (airborne) {
      foot.position.y = 0.16;
      foot.rotation.x = 0.5;
    } else if (speed > 0.3) {
      const phase = s * freq + i * Math.PI;
      foot.position.y = 0.07 + Math.max(0, Math.sin(phase)) * 0.11;
      foot.position.z = Math.cos(phase) * 0.1;
      foot.rotation.x = 0;
    } else {
      foot.position.y = 0.07;
      foot.position.z = 0;
      foot.rotation.x = 0;
    }
  }

  // Blink: quick lid-squash every few seconds, phase-offset per blob
  const blinkCycle = (s * 0.42) % 1;
  const blink = blinkCycle > 0.96 ? 0.12 : 1;
  for (const eye of blob.eyes.children) eye.scale.y = blink;
}
