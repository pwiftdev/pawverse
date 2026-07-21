// ─── Input ───────────────────────────────────────────────────────────────────
// Pointer-lock mouse-look + WASD, with discrete-action callbacks. main.js
// polls `sample()` at the fixed input rate; everything else is event-driven.
// Touch devices feed the same state through `this.touch` (see touch.js) —
// the wire protocol stays identical (digital f/b/l/r + yaw).

export class Input {
  constructor(canvas, actions) {
    this.canvas = canvas;
    this.actions = actions;
    this.keys = new Set();
    this.yaw = 0; // camera yaw (rad) — sent with every input
    this.pitch = -0.32;
    this.enabled = true; // false while the chat box is open
    // Virtual state written by the touch layer: mx/mz in [-1,1]
    // (strafe / forward), jump held, sprint = stick pushed to the rim.
    this.touch = { mx: 0, mz: 0, jump: false, sprint: false };

    canvas.addEventListener("click", () => {
      if (this.enabled && document.pointerLockElement !== canvas)
        canvas.requestPointerLock();
    });
    document.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement !== canvas) return;
      this.yaw += e.movementX * 0.0026;
      // Wide pitch range — looking straight down the tower is half the fun.
      this.pitch = Math.max(
        -1.38,
        Math.min(0.7, this.pitch - e.movementY * 0.0022),
      );
    });

    document.addEventListener("keydown", (e) => {
      if (!this.enabled) return;
      if (e.code === "Enter") {
        e.preventDefault();
        this.actions.chatOpen();
        return;
      }
      this.keys.add(e.code);
      if (e.repeat) return;
      switch (e.code) {
        case "KeyF":
          this.actions.shove();
          break;
        case "KeyM":
          this.actions.mute?.();
          break;
      }
    });
    document.addEventListener("keyup", (e) => this.keys.delete(e.code));
    window.addEventListener("blur", () => this.keys.clear());
  }

  /** Movement portion of the current input state (polled at INPUT_SEND_RATE). */
  sample() {
    const k = this.keys;
    const on = (c) => this.enabled && k.has(c);
    const t = this.enabled ? this.touch : { mx: 0, mz: 0 };
    return {
      f: on("KeyW") || on("ArrowUp") || t.mz > 0.3,
      b: on("KeyS") || on("ArrowDown") || t.mz < -0.3,
      l: on("KeyA") || on("ArrowLeft") || t.mx < -0.3,
      r: on("KeyD") || on("ArrowRight") || t.mx > 0.3,
      sprint: on("ShiftLeft") || on("ShiftRight") || !!t.sprint,
      jump: on("Space") || !!t.jump,
      yaw: this.yaw,
    };
  }
}
