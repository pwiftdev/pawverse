// ─── Input ───────────────────────────────────────────────────────────────────
// Pointer-lock mouse-look + WASD, with discrete-action callbacks. main.js
// polls `sample()` at the fixed input rate; everything else is event-driven.

export class Input {
  constructor(canvas, actions) {
    this.canvas = canvas;
    this.actions = actions;
    this.keys = new Set();
    this.yaw = 0; // camera yaw (rad) — sent with every input
    this.pitch = -0.32;
    this.enabled = true; // false while the chat box is open

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
    return {
      f: on("KeyW") || on("ArrowUp"),
      b: on("KeyS") || on("ArrowDown"),
      l: on("KeyA") || on("ArrowLeft"),
      r: on("KeyD") || on("ArrowRight"),
      sprint: on("ShiftLeft") || on("ShiftRight"),
      jump: on("Space"),
      yaw: this.yaw,
    };
  }
}
