// ─── Procedural audio ────────────────────────────────────────────────────────
// 100% synthesized WebAudio — no clips to download. SFX are pre-rendered to
// AudioBuffers with OfflineAudioContext at init; 3D positioning comes from
// THREE.PositionalAudio (panner) with the listener on the camera. Ambient park
// (birds + sea) runs on lightweight schedulers.
//
// Swap in real recordings by replacing the synth* functions with fetch+decode.

import * as THREE from "three";

const SR = 22050;

async function render(seconds, build) {
  const ctx = new OfflineAudioContext(1, Math.ceil(seconds * SR), SR);
  build(ctx);
  return ctx.startRendering();
}

function noiseBuffer(ctx, seconds) {
  const buf = ctx.createBuffer(
    1,
    Math.ceil(seconds * ctx.sampleRate),
    ctx.sampleRate,
  );
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function env(ctx, node, points) {
  // [[t, gain], …]
  const g = ctx.createGain();
  g.gain.setValueAtTime(points[0][1], points[0][0]);
  for (const [t, v] of points.slice(1))
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, v), t);
  node.connect(g);
  g.connect(ctx.destination);
  return g;
}

// ── SFX synths ───────────────────────────────────────────────────────────────

const synthBark = () =>
  render(0.3, (ctx) => {
    // Layered "WOOF": chest thump + formant-filtered saw + throat noise.
    // The formant bandpass is what makes it read as a voice, not a buzzer.
    const sub = ctx.createOscillator(); // chest resonance
    sub.type = "sine";
    sub.frequency.setValueAtTime(150, 0);
    sub.frequency.exponentialRampToValueAtTime(65, 0.18);
    env(ctx, sub, [
      [0, 0.0001],
      [0.012, 0.75],
      [0.2, 0.0001],
    ]);

    const voice = ctx.createOscillator(); // the actual "wo-o-f" pitch
    voice.type = "sawtooth";
    voice.frequency.setValueAtTime(410, 0);
    voice.frequency.exponentialRampToValueAtTime(240, 0.06);
    voice.frequency.exponentialRampToValueAtTime(120, 0.22);
    const formant = ctx.createBiquadFilter();
    formant.type = "bandpass";
    formant.frequency.setValueAtTime(950, 0); // open "o" mouth shape…
    formant.frequency.exponentialRampToValueAtTime(480, 0.16); // …closing to "f"
    formant.Q.value = 2.2;
    voice.connect(formant);
    env(ctx, formant, [
      [0, 0.0001],
      [0.018, 1.0],
      [0.12, 0.5],
      [0.26, 0.0001],
    ]);

    const breath = ctx.createBufferSource(); // throat noise snap
    breath.buffer = noiseBuffer(ctx, 0.14);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1400;
    bp.Q.value = 0.9;
    breath.connect(bp);
    env(ctx, bp, [
      [0, 0.0001],
      [0.008, 0.4],
      [0.11, 0.0001],
    ]);

    sub.start();
    voice.start();
    breath.start();
  });

const synthMeow = () =>
  render(0.55, (ctx) => {
    const voice = ctx.createOscillator();
    voice.type = "triangle";
    voice.frequency.setValueAtTime(520, 0);
    voice.frequency.exponentialRampToValueAtTime(820, 0.18);
    voice.frequency.exponentialRampToValueAtTime(430, 0.5);
    env(ctx, voice, [
      [0, 0.0001],
      [0.025, 0.55],
      [0.34, 0.38],
      [0.53, 0.0001],
    ]);
    voice.start();
  });

const synthChitter = () =>
  render(0.34, (ctx) => {
    const voice = ctx.createOscillator();
    voice.type = "square";
    voice.frequency.setValueAtTime(420, 0);
    voice.frequency.exponentialRampToValueAtTime(700, 0.3);
    const tremolo = ctx.createOscillator();
    tremolo.frequency.value = 24;
    const tremoloGain = ctx.createGain();
    tremoloGain.gain.value = 90;
    tremolo.connect(tremoloGain);
    tremoloGain.connect(voice.frequency);
    env(ctx, voice, [
      [0, 0.0001],
      [0.015, 0.32],
      [0.32, 0.0001],
    ]);
    voice.start();
    tremolo.start();
  });

const synthThud = () =>
  render(0.16, (ctx) => {
    // landing after a jump
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, 0);
    osc.frequency.exponentialRampToValueAtTime(45, 0.13);
    env(ctx, osc, [
      [0, 0.0001],
      [0.008, 0.6],
      [0.14, 0.0001],
    ]);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer(ctx, 0.05);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 700;
    noise.connect(lp);
    env(ctx, lp, [
      [0, 0.0001],
      [0.006, 0.25],
      [0.045, 0.0001],
    ]);
    osc.start();
    noise.start();
  });

const synthYelp = () =>
  render(0.3, (ctx) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(700, 0);
    osc.frequency.exponentialRampToValueAtTime(1400, 0.08);
    osc.frequency.exponentialRampToValueAtTime(500, 0.26);
    env(ctx, osc, [
      [0, 0.0001],
      [0.02, 0.7],
      [0.28, 0.0001],
    ]);
    osc.start();
  });

const synthHowl = () =>
  render(1.8, (ctx) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, 0);
    osc.frequency.exponentialRampToValueAtTime(520, 0.5);
    osc.frequency.setValueAtTime(520, 1.0);
    osc.frequency.exponentialRampToValueAtTime(300, 1.7);
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.5;
    const vibGain = ctx.createGain();
    vibGain.gain.value = 14;
    vib.connect(vibGain);
    vibGain.connect(osc.frequency);
    env(ctx, osc, [
      [0, 0.0001],
      [0.15, 0.55],
      [1.3, 0.4],
      [1.75, 0.0001],
    ]);
    osc.start();
    vib.start();
  });

const synthSplash = () =>
  render(0.5, (ctx) => {
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer(ctx, 0.5);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2400, 0);
    lp.frequency.exponentialRampToValueAtTime(300, 0.45);
    noise.connect(lp);
    env(ctx, lp, [
      [0, 0.0001],
      [0.02, 0.8],
      [0.45, 0.0001],
    ]);
    noise.start();
  });

const synthPop = () =>
  render(0.12, (ctx) => {
    // ball pickup
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(500, 0);
    osc.frequency.exponentialRampToValueAtTime(900, 0.08);
    env(ctx, osc, [
      [0, 0.0001],
      [0.01, 0.4],
      [0.1, 0.0001],
    ]);
    osc.start();
  });

const synthWhoosh = () =>
  render(0.35, (ctx) => {
    // ball throw
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer(ctx, 0.35);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 2;
    bp.frequency.setValueAtTime(400, 0);
    bp.frequency.exponentialRampToValueAtTime(1800, 0.3);
    noise.connect(bp);
    env(ctx, bp, [
      [0, 0.0001],
      [0.05, 0.5],
      [0.32, 0.0001],
    ]);
    noise.start();
  });

const synthChime = () =>
  render(0.7, (ctx) => {
    // pet/feed reward
    for (const [f, t0] of [
      [660, 0],
      [880, 0.12],
      [1100, 0.24],
    ]) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      env(ctx, osc, [
        [t0, 0.0001],
        [t0 + 0.02, 0.3],
        [t0 + 0.4, 0.0001],
      ]);
      osc.start(t0);
    }
  });

const synthGrowl = () =>
  render(0.4, (ctx) => {
    // bite tussle
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(90, 0);
    const trem = ctx.createOscillator();
    trem.frequency.value = 22;
    const tremGain = ctx.createGain();
    tremGain.gain.value = 30;
    trem.connect(tremGain);
    tremGain.connect(osc.frequency);
    env(ctx, osc, [
      [0, 0.0001],
      [0.03, 0.5],
      [0.38, 0.0001],
    ]);
    osc.start();
    trem.start();
  });

// ── public API ───────────────────────────────────────────────────────────────

export class GameAudio {
  constructor(camera) {
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);
    this.buffers = {};
    this.ready = false;
    this.scene = null;
    this._ambient = false;
  }

  /** Must be called after a user gesture (browser autoplay policy). */
  async init(scene) {
    if (this.ready) return;
    this.scene = scene;
    this.listener.context.resume?.();
    const [
      bark,
      meow,
      chitter,
      yelp,
      howl,
      splash,
      pop,
      whoosh,
      chime,
      growl,
      thud,
    ] = await Promise.all([
      synthBark(),
      synthMeow(),
      synthChitter(),
      synthYelp(),
      synthHowl(),
      synthSplash(),
      synthPop(),
      synthWhoosh(),
      synthChime(),
      synthGrowl(),
      synthThud(),
    ]);
    this.buffers = {
      bark,
      meow,
      chitter,
      yelp,
      howl,
      splash,
      pop,
      whoosh,
      chime,
      growl,
      thud,
    };
    this.ready = true;
    this.nightK = 0;
    this.startAmbient();
  }

  /** Mute toggle (M). Returns the new muted state. */
  toggleMute() {
    this.muted = !this.muted;
    this.listener.setMasterVolume(this.muted ? 0 : 1);
    return this.muted;
  }

  /**
   * Play a named SFX at a world position (3D panned) — or flat if pos omitted.
   * @param rate playback rate: a big dog barks low (≈0.8), a small dog yaps (≈1.3)
   */
  play(name, pos = null, volume = 1, rate = 1) {
    if (!this.ready || !this.buffers[name]) return;
    if (!pos) {
      const a = new THREE.Audio(this.listener);
      a.setBuffer(this.buffers[name]);
      a.setVolume(volume);
      a.setPlaybackRate(rate);
      a.play();
      return;
    }
    const holder = new THREE.Object3D();
    holder.position.set(pos[0], pos[1] + 0.5, pos[2]);
    const a = new THREE.PositionalAudio(this.listener);
    a.setBuffer(this.buffers[name]);
    a.setRefDistance(6);
    a.setMaxDistance(60);
    a.setVolume(volume);
    a.setPlaybackRate(rate);
    holder.add(a);
    this.scene.add(holder);
    a.play();
    a.source.onended = () => this.scene.remove(holder);
  }

  /** Ambient park: random birdsong chirps + a soft sea-wash noise bed. */
  startAmbient() {
    if (this._ambient) return;
    this._ambient = true;
    const ctx = this.listener.context;

    // sea wash: looped noise through a slow-wobbling lowpass
    const noise = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      // brown-ish noise
      last = (last + (Math.random() * 2 - 1) * 0.04) * 0.98;
      d[i] = last * 6;
    }
    noise.buffer = buf;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 420;
    this.seaGain = ctx.createGain();
    this.seaGain.gain.value = 0.02;
    noise.connect(lp);
    lp.connect(this.seaGain);
    this.seaGain.connect(this.listener.getInput());
    noise.start();

    // wildlife scheduler: birdsong by day, cricket trills by night
    const wildlife = () => {
      if (!this._ambient) return;
      const t0 = ctx.currentTime + 0.05;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      const g = ctx.createGain();
      g.gain.value = 0;
      osc.connect(g);
      g.connect(this.listener.getInput());
      if (this.nightK > 0.5) {
        // cricket: fast trill of high pulses
        const f = 3800 + Math.random() * 900;
        const pulses = 6 + Math.floor(Math.random() * 5);
        for (let n = 0; n < pulses; n++) {
          const t = t0 + n * 0.055;
          osc.frequency.setValueAtTime(f, t);
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.022, t + 0.012);
          g.gain.linearRampToValueAtTime(0, t + 0.045);
        }
        osc.start(t0);
        osc.stop(t0 + pulses * 0.055 + 0.1);
        setTimeout(wildlife, 900 + Math.random() * 2200);
      } else {
        // bird: 2–4 rising notes
        const base = 2200 + Math.random() * 1600;
        const notes = 2 + Math.floor(Math.random() * 3);
        for (let n = 0; n < notes; n++) {
          const t = t0 + n * 0.14;
          osc.frequency.setValueAtTime(base, t);
          osc.frequency.exponentialRampToValueAtTime(
            base * (1.2 + Math.random() * 0.3),
            t + 0.07,
          );
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.05, t + 0.02);
          g.gain.linearRampToValueAtTime(0, t + 0.11);
        }
        osc.start(t0);
        osc.stop(t0 + notes * 0.14 + 0.1);
        setTimeout(wildlife, 2500 + Math.random() * 5000);
      }
    };
    wildlife();
  }

  /** 0 = day (birds), 1 = night (crickets). Fed by the world clock. */
  setNight(k) {
    this.nightK = k;
  }

  /** Fade the sea bed louder as the player nears the beach (x → +east). */
  setSeaProximity(x) {
    if (!this.seaGain) return;
    const k = Math.min(1, Math.max(0, (x - 10) / 70));
    this.seaGain.gain.value = 0.015 + k * 0.12;
  }
}
