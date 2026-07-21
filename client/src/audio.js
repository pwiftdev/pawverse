// ─── Audio ───────────────────────────────────────────────────────────────────
// 100% procedural WebAudio: altitude-reactive wind, a slow ambient pad that
// re-chords per zone, squishy jump/land/bounce foley, whooshes, bells, and a
// tiny fanfare. No samples, no files. Everything routes through one master
// gain for muting.

const ZONE_CHORDS = [
  [220, 277.2, 329.6], // meadow — A major
  [196, 246.9, 293.7], // clouds — G major
  [174.6, 220, 261.6], // sunset — F major
  [164.8, 196, 246.9], // dusk — Em
  [146.8, 185, 220], // space — D major
  [130.8, 164.8, 196], // deep — C major
  [123.5, 155.6, 185], // nebula — B major, otherworldly
  [110, 164.8, 220], // summit — open A5, thin and vast
];
const ZONE_YS = [0, 130, 280, 500, 800, 1600, 2600, 4000];

export class GameAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.windGain = null;
    this.windFilter = null;
    this.padOscs = [];
    this.padGain = null;
    this.zoneIdx = -1;
    this.whistle = null; // { osc, gain } while fall-whistling
  }

  /** Create the context on a user gesture (the PLAY click). */
  ensure() {
    if (this.ctx) {
      this.ctx.resume?.();
      return;
    }
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.9;
    this.master.connect(ctx.destination);

    // Wind: looped noise → bandpass → gain
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    this.windFilter = ctx.createBiquadFilter();
    this.windFilter.type = "bandpass";
    this.windFilter.frequency.value = 500;
    this.windFilter.Q.value = 0.6;
    this.windGain = ctx.createGain();
    this.windGain.gain.value = 0.015;
    noise.connect(this.windFilter).connect(this.windGain).connect(this.master);
    noise.start();

    // Ambient pad: two detuned triangles through a lowpass
    this.padGain = ctx.createGain();
    this.padGain.gain.value = 0;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    this.padGain.connect(lp).connect(this.master);
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      const g = ctx.createGain();
      g.gain.value = 0.05;
      osc.connect(g).connect(this.padGain);
      osc.start();
      this.padOscs.push({ osc, g });
    }
    this.padGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 4);
    this.setChord(0);
  }

  setMuted(m) {
    this.muted = m;
    if (this.master)
      this.master.gain.linearRampToValueAtTime(
        m ? 0 : 0.9,
        this.ctx.currentTime + 0.1,
      );
    return m;
  }
  toggleMute() {
    return this.setMuted(!this.muted);
  }

  setChord(idx) {
    if (!this.ctx || idx === this.zoneIdx) return;
    this.zoneIdx = idx;
    const chord = ZONE_CHORDS[Math.min(idx, ZONE_CHORDS.length - 1)];
    const t = this.ctx.currentTime;
    this.padOscs.forEach(({ osc }, i) => {
      osc.frequency.linearRampToValueAtTime(
        chord[i % chord.length] * (i === 2 ? 0.5 : 1),
        t + 2.5,
      );
    });
  }

  /** Per-frame: wind follows altitude + speed; pad re-chords per zone. */
  update({ alt, speed, vy }) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const windAmount =
      0.012 +
      Math.min(0.16, alt / 2500) +
      Math.min(0.1, (Math.abs(vy) + speed) * 0.004);
    this.windGain.gain.linearRampToValueAtTime(windAmount, t + 0.25);
    this.windFilter.frequency.linearRampToValueAtTime(
      420 + Math.min(1400, alt * 0.9 + Math.abs(vy) * 30),
      t + 0.25,
    );
    let zi = 0;
    for (let i = 0; i < ZONE_YS.length; i++) if (alt >= ZONE_YS[i]) zi = i;
    this.setChord(zi);

    // Fall whistle while plummeting
    if (vy < -17 && !this.whistle) {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 1300;
      const g = this.ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.05, t + 0.15);
      osc.connect(g).connect(this.master);
      osc.start();
      this.whistle = { osc, g };
    } else if (this.whistle) {
      if (vy >= -8) {
        this.whistle.g.gain.linearRampToValueAtTime(0, t + 0.08);
        this.whistle.osc.stop(t + 0.15);
        this.whistle = null;
      } else {
        this.whistle.osc.frequency.linearRampToValueAtTime(
          700 + Math.max(0, 2600 + vy * 60),
          t + 0.1,
        );
      }
    }
  }

  // ── One-shots ──────────────────────────────────────────────────────────────

  blip({
    type = "sine",
    from = 300,
    to = 500,
    dur = 0.12,
    gain = 0.14,
    delay = 0,
  }) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  noiseBurst({ dur = 0.15, gain = 0.2, freq = 800, delay = 0 }) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const len = Math.ceil(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++)
      d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = freq;
    const g = this.ctx.createGain();
    g.gain.value = gain;
    src.connect(f).connect(g).connect(this.master);
    src.start(t);
  }

  jump() {
    this.blip({ type: "triangle", from: 190, to: 360, dur: 0.13, gain: 0.1 });
  }

  land(impact = 1) {
    const k = Math.min(1.6, impact);
    this.noiseBurst({ dur: 0.1, gain: 0.1 * k, freq: 500 });
    this.blip({ type: "sine", from: 130, to: 60, dur: 0.1, gain: 0.12 * k });
  }

  bounce() {
    this.blip({ type: "sine", from: 200, to: 640, dur: 0.22, gain: 0.16 });
    this.blip({ type: "sine", from: 400, to: 1280, dur: 0.22, gain: 0.05 });
  }

  boost() {
    // $BOOSTER pad — rocket whoosh + rising scream
    this.noiseBurst({ dur: 0.45, gain: 0.18, freq: 1600 });
    this.blip({ type: "sawtooth", from: 120, to: 900, dur: 0.5, gain: 0.09 });
    this.blip({ type: "sine", from: 300, to: 1800, dur: 0.45, gain: 0.06 });
  }

  bump() {
    this.blip({ type: "triangle", from: 320, to: 140, dur: 0.1, gain: 0.13 });
    this.noiseBurst({ dur: 0.06, gain: 0.06, freq: 1200 });
  }

  shove() {
    this.noiseBurst({ dur: 0.28, gain: 0.16, freq: 2200 });
    this.blip({ type: "sawtooth", from: 500, to: 90, dur: 0.25, gain: 0.06 });
  }

  milestone() {
    this.blip({ type: "sine", from: 880, to: 880, dur: 0.5, gain: 0.1 });
    this.blip({ type: "sine", from: 1760, to: 1760, dur: 0.4, gain: 0.03 });
  }

  chime() {
    // personal best — pentatonic run up
    [523.3, 659.3, 784, 1046.5].forEach((f, i) =>
      this.blip({
        type: "sine",
        from: f,
        to: f,
        dur: 0.35,
        gain: 0.09,
        delay: i * 0.09,
      }),
    );
  }

  fanfare() {
    // crown / tower record
    [392, 523.3, 659.3, 784].forEach((f, i) =>
      this.blip({
        type: "triangle",
        from: f,
        to: f,
        dur: i === 3 ? 0.6 : 0.18,
        gain: 0.11,
        delay: i * 0.13,
      }),
    );
  }

  voided() {
    this.noiseBurst({ dur: 0.5, gain: 0.12, freq: 500 });
    this.blip({ type: "sine", from: 300, to: 90, dur: 0.6, gain: 0.07 });
  }
}
