// ─── Input ───────────────────────────────────────────────────────────────────
// Pointer-lock mouse-look + WASD, with discrete-action callbacks. main.js
// polls `sample()` at the fixed input rate; everything else is event-driven.

const EMOTE_KEYS = {
  KeyC: "sit",
  KeyX: "lay",
  KeyV: "wag",
  KeyR: "roll",
  KeyG: "dig",
  KeyH: "howl",
};

export class Input {
  constructor(canvas, actions) {
    this.canvas = canvas;
    this.actions = actions;
    this.keys = new Set();
    this.yaw = 0; // camera yaw (rad) — sent with every input
    this.pitch = -0.35;
    this.enabled = true; // false while the chat box is open
    this.charging = false; // throw charge in progress
    this.chargeStart = 0;

    canvas.addEventListener("click", () => {
      if (this.enabled && document.pointerLockElement !== canvas)
        canvas.requestPointerLock();
    });
    document.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement !== canvas) return;
      this.yaw += e.movementX * 0.0026;
      this.pitch = Math.max(
        -1.2,
        Math.min(0.5, this.pitch - e.movementY * 0.0022),
      );
    });
    document.addEventListener("mousedown", (e) => {
      if (document.pointerLockElement !== canvas || e.button !== 0) return;
      this.startCharge();
    });
    document.addEventListener("mouseup", (e) => {
      if (e.button === 0) this.releaseCharge();
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
        case "KeyB":
          this.actions.bark();
          break;
        case "KeyF":
          this.actions.bite();
          break;
        case "KeyE":
          this.actions.grabDrop();
          break;
        case "KeyQ":
          this.startCharge();
          break;
        case "KeyM":
          this.actions.mute?.();
          break;
        case "KeyN":
          this.actions.sniff?.();
          break;
        case "KeyJ":
          this.actions.journal?.();
          break;
        default:
          if (EMOTE_KEYS[e.code]) this.actions.emote(EMOTE_KEYS[e.code]);
      }
    });
    document.addEventListener("keyup", (e) => {
      this.keys.delete(e.code);
      if (e.code === "KeyQ") this.releaseCharge();
    });
    window.addEventListener("blur", () => this.keys.clear());
  }

  startCharge() {
    if (this.charging) return;
    this.charging = true;
    this.chargeStart = performance.now();
    this.actions.throwStart();
  }

  releaseCharge() {
    if (!this.charging) return;
    this.charging = false;
    this.actions.throwRelease(this.chargePower());
  }

  /** 0→1 over 1.1 s of holding. */
  chargePower() {
    return Math.min(1, (performance.now() - this.chargeStart) / 1100);
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
