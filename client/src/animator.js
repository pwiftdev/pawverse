// ─── Procedural animation ────────────────────────────────────────────────────
// No rigs, no clips: every pose is computed per-frame from the animation state
// string that BOTH sides derive via shared/movement.js deriveAnim(). Dogs and
// humans keep a running phase on their view object (view.phase).

/**
 * Pose a dog view (from dogfactory.makeDog) for this frame.
 * @param view  { parts: {body, headPivot, legs, tailPivot, hipY}, phase?, squash? }
 * @param anim  idle|run|sprint|air|swim|sit|lay|wag|roll|dig|howl
 * @param dt    seconds
 * @param speed planar speed (m/s) — drives gait frequency
 * @param lean  roll into turns (rad, signed) — computed by the caller from yaw rate
 */
export function animateDog(view, anim, dt, speed = 0, lean = 0) {
  const P = view.parts;
  view.phase = (view.phase || 0) + dt * (4 + speed * 2.2);
  const t = view.phase;

  // Baseline pose (everything else is a delta from this)
  P.body.position.y = P.hipY;
  P.body.rotation.set(0, 0, 0);
  P.headPivot.rotation.set(0, 0, 0);
  for (const leg of P.legs) leg.rotation.set(0, 0, 0);
  P.tailPivot.rotation.set(0, 0, 0);
  P.body.scale.set(1, 1, 1);
  for (const ear of P.ears || []) ear.rotation.copy(ear.userData.restRotation);
  if (P.tongue) P.tongue.position.z = P.tongue.userData.restZ;

  const wagTail = (freq, amp) => {
    P.tailPivot.rotation.y = Math.sin(t * freq) * amp;
  };

  switch (anim) {
    case "run": {
      const s = Math.sin(t * 2.2);
      // trot: diagonal pairs FL+BR vs FR+BL
      P.legs[0].rotation.x = s * 0.65;
      P.legs[3].rotation.x = s * 0.65;
      P.legs[1].rotation.x = -s * 0.65;
      P.legs[2].rotation.x = -s * 0.65;
      P.body.position.y = P.hipY + Math.abs(Math.sin(t * 2.2)) * 0.06;
      wagTail(3, 0.25);
      break;
    }
    case "sprint": {
      // bounding gallop: front pair together, back pair together, spine flexing
      const s = Math.sin(t * 2.6);
      P.legs[0].rotation.x = s * 1.05;
      P.legs[1].rotation.x = s * 1.05;
      P.legs[2].rotation.x = -s * 1.05;
      P.legs[3].rotation.x = -s * 1.05;
      P.body.rotation.x = -s * 0.13; // spine gathers + extends
      P.body.position.y = P.hipY + Math.max(0, Math.sin(t * 2.6 + 0.7)) * 0.13;
      P.headPivot.rotation.x = s * 0.08;
      wagTail(2.6, 0.2);
      P.tailPivot.rotation.x = -0.25 + s * 0.15; // tail streams behind
      break;
    }
    case "air":
      P.legs[0].rotation.x = 0.9;
      P.legs[1].rotation.x = 0.9; // front reach
      P.legs[2].rotation.x = -0.9;
      P.legs[3].rotation.x = -0.9; // back kick
      P.body.rotation.x = -0.15;
      P.tailPivot.rotation.x = 0.4;
      break;
    case "swim": {
      const s = Math.sin(t * 3.4);
      P.body.rotation.x = 0.12;
      P.headPivot.rotation.x = -0.35; // keep the snout above water
      P.legs[0].rotation.x = s * 0.5;
      P.legs[1].rotation.x = -s * 0.5;
      P.legs[2].rotation.x = -s * 0.5;
      P.legs[3].rotation.x = s * 0.5;
      P.body.position.y = P.hipY + Math.sin(t * 1.1) * 0.03; // gentle bob
      break;
    }
    case "sit":
      P.body.rotation.x = -0.5;
      P.body.position.y = P.hipY * 0.72;
      P.legs[2].rotation.x = 1.5;
      P.legs[3].rotation.x = 1.5; // hind folded
      P.legs[0].rotation.x = 0.5;
      P.legs[1].rotation.x = 0.5; // front planted
      P.headPivot.rotation.x = 0.12;
      wagTail(6, 0.18);
      break;
    case "lay":
      P.body.position.y = P.hipY * 0.45;
      for (const leg of P.legs) leg.rotation.x = 1.5;
      P.headPivot.rotation.x = 0.22;
      break;
    case "wag":
      P.body.position.y = P.hipY + Math.sin(t * 0.8) * 0.015;
      wagTail(14, 0.55);
      P.body.rotation.z = Math.sin(t * 14) * 0.03; // whole-butt wag
      break;
    case "roll":
      P.body.rotation.z = t * 4; // keep rolling!
      P.body.position.y = P.hipY * 0.8;
      for (const leg of P.legs) leg.rotation.x = 0.6;
      break;
    case "dig": {
      const s = Math.sin(t * 7);
      P.body.rotation.x = 0.22;
      P.headPivot.rotation.x = 0.55;
      P.legs[0].rotation.x = 0.7 + s * 0.7;
      P.legs[1].rotation.x = 0.7 - s * 0.7;
      wagTail(10, 0.3);
      break;
    }
    case "howl":
      P.body.rotation.x = -0.28;
      P.body.position.y = P.hipY * 0.85;
      P.headPivot.rotation.x = -0.85; // snout to the sky
      P.legs[2].rotation.x = 1.1;
      P.legs[3].rotation.x = 1.1;
      break;
    default: // idle
      P.body.position.y = P.hipY + Math.sin(t * 0.8) * 0.015; // breathing
      wagTail(2.2, 0.12);
      P.headPivot.rotation.y = Math.sin(t * 0.35) * 0.15; // look around
  }

  // ── game-feel layers on top of the pose ──
  // lean into turns (never during ground emotes where it looks broken)
  if (
    anim === "run" ||
    anim === "sprint" ||
    anim === "air" ||
    anim === "idle"
  ) {
    P.body.rotation.z += lean;
  }
  if (anim === "idle" || anim === "run" || anim === "sprint") {
    P.headPivot.rotation.y += view.lookYaw || 0;
    P.headPivot.rotation.x += view.lookPitch || 0;
  }
  for (let i = 0; i < (P.ears || []).length; i++) {
    const ear = P.ears[i];
    const side = i === 0 ? -1 : 1;
    ear.rotation.x +=
      Math.sin(t * 1.7 + i) * 0.045 - Math.min(0.22, speed * 0.02);
    ear.rotation.z += side * Math.sin(t * 2.1 + i * 0.7) * 0.035;
  }
  // landing squash-and-stretch: view.squash set by the caller on touchdown
  if (view.squash > 0) {
    view.squash = Math.max(0, view.squash - dt * 3.2);
    const k = Math.sin((view.squash / 0.3) * Math.PI) * 0.22; // in-and-out curve
    P.body.scale.set(1 + k * 0.6, 1 - k, 1 + k * 0.4);
    P.body.position.y -= P.hipY * k * 0.35;
  }

  // ── life details: blinking + a happy panting tongue ──
  if (P.eyes) {
    // quick blink every ~3.7 s (phase-based so every dog blinks on its own beat)
    const blink = t % 3.7 > 3.55 ? 0.12 : 1;
    for (const eye of P.eyes) eye.scale.y = blink;
  }
  if (P.tongue) {
    const panting = anim === "sprint" || anim === "wag" || anim === "sit";
    P.tongue.visible = panting;
    if (panting)
      P.tongue.position.z = P.tongue.userData.restZ + Math.sin(t * 8) * 0.008;
  }
}

/**
 * Pose an NPC human view (from dogfactory.makeHuman) for this frame.
 * @param view { parts: {torso, arms, legs}, phase? }
 * @param st   idle|walk|pet|wave|flinch|flee
 */
export function animateHuman(view, st, dt) {
  const P = view.parts;
  view.phase = (view.phase || 0) + dt;
  const t = view.phase;

  P.torso.rotation.set(0, 0, 0);
  P.torso.position.y = 0.86;
  for (const a of P.arms) a.rotation.set(0, 0, 0);
  for (const l of P.legs) l.rotation.set(0, 0, 0);

  switch (st) {
    case "walk": {
      const s = Math.sin(t * 6);
      P.legs[0].rotation.x = s * 0.5;
      P.legs[1].rotation.x = -s * 0.5;
      P.arms[0].rotation.x = -s * 0.35;
      P.arms[1].rotation.x = s * 0.35;
      break;
    }
    case "pet":
      P.torso.rotation.x = 0.55; // bend down toward the dog
      P.arms[0].rotation.x = -1.1 + Math.sin(t * 6) * 0.18; // patting hand
      P.arms[1].rotation.x = -0.3;
      break;
    case "wave":
      P.arms[0].rotation.z = -2.4;
      P.arms[0].rotation.x = Math.sin(t * 9) * 0.35;
      P.torso.rotation.z = 0.08;
      break;
    case "flinch":
      P.arms[0].rotation.x = -2.6;
      P.arms[1].rotation.x = -2.6; // hands up!
      P.torso.position.y = 0.86 + Math.abs(Math.sin(t * 18)) * 0.08;
      P.torso.rotation.x = -0.12;
      break;
    case "flee": {
      const s = Math.sin(t * 11);
      P.legs[0].rotation.x = s * 0.9;
      P.legs[1].rotation.x = -s * 0.9;
      P.arms[0].rotation.x = -2.4;
      P.arms[1].rotation.x = -2.4; // running, arms up
      P.torso.rotation.x = 0.18;
      break;
    }
    default: // idle
      P.torso.position.y = 0.86 + Math.sin(t * 1.4) * 0.012;
      P.arms[0].rotation.z = Math.sin(t * 1.4) * 0.05;
      P.arms[1].rotation.z = -Math.sin(t * 1.4) * 0.05;
  }
}

/**
 * Pose a squirrel view (from dogfactory.makeSquirrel) for this frame.
 * @param view { parts: {body, headPivot, tailPivot}, phase? }
 * @param st   forage|alert|flee
 */
export function animateSquirrel(view, st, dt) {
  const P = view.parts;
  view.phase = (view.phase || 0) + dt;
  const t = view.phase;

  P.body.position.y = 0.16;
  P.body.rotation.set(0, 0, 0);
  P.headPivot.rotation.set(0, 0, 0);
  P.tailPivot.rotation.set(0, 0, 0);

  switch (st) {
    case "alert":
      // upright on hind legs, tail flagged, head scanning
      P.body.rotation.x = -1.15;
      P.body.position.y = 0.24;
      P.headPivot.rotation.x = 1.0;
      P.tailPivot.rotation.x = 0.5 + Math.sin(t * 18) * 0.1; // nervous flicks
      break;
    case "flee": {
      // stretched-out bounding gallop
      const hop = Math.abs(Math.sin(t * 11));
      P.body.position.y = 0.16 + hop * 0.16;
      P.body.rotation.x = Math.sin(t * 11) * 0.35;
      P.tailPivot.rotation.x = -0.35 + Math.sin(t * 11) * 0.25; // streaming behind
      break;
    }
    default: {
      // forage
      const hop = Math.max(0, Math.sin(t * 6));
      P.body.position.y = 0.16 + hop * 0.05;
      P.headPivot.rotation.x = 0.35 + Math.sin(t * 2.2) * 0.25; // nibbling
      P.tailPivot.rotation.x = Math.sin(t * 3.1) * 0.14;
      P.tailPivot.rotation.y = Math.sin(t * 1.7) * 0.1;
    }
  }
}
