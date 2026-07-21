// ─── Touch controls ──────────────────────────────────────────────────────────
// Landscape mobile: a floating joystick on the LEFT half of the canvas
// (appears where the thumb lands), camera-look drag on the RIGHT half, and
// DOM buttons (jump / shove / standings) wired up in main.js. All of it
// writes into input.touch / input.yaw / input.pitch — the game loop and wire
// protocol don't know or care that the input came from a screen.

const JOY_RADIUS = 52; // px from center to full deflection
const SPRINT_RIM = 0.92; // deflection beyond this = sprint
const LOOK_X = 0.0052; // rad per px
const LOOK_Y = 0.0046;

export function isTouchDevice() {
  return (
    matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    // debug override so touch controls can be exercised on desktop
    new URLSearchParams(location.search).has("touch")
  );
}

export function setupTouch(canvas, input, joyEl, nubEl) {
  let joyId = null; // touch identifier steering the stick
  let lookId = null; // touch identifier steering the camera
  let joyX = 0,
    joyY = 0; // joystick anchor (where the touch started)
  let lookX = 0,
    lookY = 0; // last look-touch position

  function resetJoy() {
    joyId = null;
    joyEl.style.display = "none";
    input.touch.mx = 0;
    input.touch.mz = 0;
    input.touch.sprint = false;
  }

  function steer(t) {
    const dx = (t.clientX - joyX) / JOY_RADIUS;
    const dy = (t.clientY - joyY) / JOY_RADIUS;
    const mag = Math.hypot(dx, dy);
    const k = mag > 1 ? 1 / mag : 1; // clamp to the rim
    input.touch.mx = dx * k;
    input.touch.mz = -dy * k; // screen-up = forward
    input.touch.sprint = mag >= SPRINT_RIM;
    nubEl.style.transform = `translate(-50%, -50%) translate(${
      dx * k * JOY_RADIUS
    }px, ${dy * k * JOY_RADIUS}px)`;
  }

  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // no synthetic clicks / scroll / double-tap zoom
      if (!input.enabled) return;
      for (const t of e.changedTouches) {
        if (t.clientX < window.innerWidth * 0.45 && joyId === null) {
          joyId = t.identifier;
          joyX = t.clientX;
          joyY = t.clientY;
          joyEl.style.display = "block";
          joyEl.style.left = joyX + "px";
          joyEl.style.top = joyY + "px";
          steer(t);
        } else if (lookId === null) {
          lookId = t.identifier;
          lookX = t.clientX;
          lookY = t.clientY;
        }
      }
    },
    { passive: false },
  );

  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier === joyId) {
          steer(t);
        } else if (t.identifier === lookId) {
          input.yaw += (t.clientX - lookX) * LOOK_X;
          input.pitch = Math.max(
            -1.38,
            Math.min(0.7, input.pitch - (t.clientY - lookY) * LOOK_Y),
          );
          lookX = t.clientX;
          lookY = t.clientY;
        }
      }
    },
    { passive: false },
  );

  for (const ev of ["touchend", "touchcancel"]) {
    canvas.addEventListener(
      ev,
      (e) => {
        for (const t of e.changedTouches) {
          if (t.identifier === joyId) resetJoy();
          else if (t.identifier === lookId) lookId = null;
        }
      },
      { passive: true },
    );
  }

  window.addEventListener("blur", resetJoy);
}

/** Hold-style button: pressed = flag on, released = flag off. */
export function bindHoldButton(el, onDown, onUp) {
  el.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault(); // keep focus on the game, no ghost clicks
      onDown();
    },
    { passive: false },
  );
  for (const ev of ["touchend", "touchcancel"]) {
    el.addEventListener(ev, (e) => {
      e.preventDefault();
      onUp?.();
    });
  }
}
