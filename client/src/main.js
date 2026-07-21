// ─── TOPPLE client ───────────────────────────────────────────────────────────
// Orchestrates everything: renderer, camera, join flow, the fixed-rate input
// loop (prediction), remote blob interpolation, events → effects/audio/HUD.

import * as THREE from "three";
import { BLOB_COLORS, INPUT_SEND_RATE } from "../../shared/constants.js";
import { deriveAnim } from "../../shared/movement.js";
import { Net } from "./net.js";
import { Input } from "./input.js";
import { createBlob, disposeBlob } from "./blob.js";
import { animateBlob } from "./animator.js";
import { createTowerView } from "./tower-view.js";
import { createEffects } from "./effects.js";
import { GameAudio } from "./audio.js";
import { createHud } from "./hud.js";
import { isTouchDevice, setupTouch, bindHoldButton } from "./touch.js";

// Touch devices get the virtual controls and never request pointer lock.
const IS_TOUCH = isTouchDevice();
if (IS_TOUCH) document.body.classList.add("touch");
/** Pointer lock is a desktop concept — a no-op on touch. */
function lockPointer() {
  if (!IS_TOUCH) canvas.requestPointerLock?.();
}

// ── Renderer / scene ─────────────────────────────────────────────────────────

const canvas = document.getElementById("game");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  900,
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const towerView = createTowerView(scene);
const effects = createEffects(scene);
const audio = new GameAudio();
const net = new Net();

// ── HUD ──────────────────────────────────────────────────────────────────────

const hud = createHud({
  onChat(text) {
    net.chat(text);
    closeChatInput();
  },
});

// ── Blobs ────────────────────────────────────────────────────────────────────

let myBlob = null;
const remoteBlobs = new Map(); // id → blob
let leaderId = null;
let playing = false;

function ensureRemoteBlob(id, col) {
  let blob = remoteBlobs.get(id);
  if (!blob) {
    blob = createBlob(col);
    scene.add(blob.group);
    remoteBlobs.set(id, blob);
  }
  return blob;
}

function removeRemoteBlob(id) {
  const blob = remoteBlobs.get(id);
  if (!blob) return;
  scene.remove(blob.group);
  disposeBlob(blob);
  remoteBlobs.delete(id);
}

function nameOf(id) {
  if (id === net.id) return "you";
  return net.players.get(id)?.info.n ?? "someone";
}

// ── Input + chat ─────────────────────────────────────────────────────────────

const input = new Input(canvas, {
  shove() {
    net.shove();
    audio.noiseBurst({ dur: 0.12, gain: 0.05, freq: 3000 }); // local swish
  },
  chatOpen() {
    openChatInput();
  },
  mute() {
    const muted = audio.toggleMute();
    hud.toast(muted ? "🔇 muted" : "🔊 sound on");
  },
});

// ── Touch controls ───────────────────────────────────────────────────────────

const touchUi = document.getElementById("touchui");
if (IS_TOUCH) {
  setupTouch(
    canvas,
    input,
    document.getElementById("joy"),
    document.getElementById("joynub"),
  );
  bindHoldButton(
    document.getElementById("tjump"),
    () => (input.touch.jump = true),
    () => (input.touch.jump = false),
  );
  bindHoldButton(document.getElementById("tshove"), () => {
    net.shove();
    audio.noiseBurst({ dur: 0.12, gain: 0.05, freq: 3000 });
  });
  bindHoldButton(document.getElementById("tboard"), () => {
    if (!playing) return;
    if (pauseEl.classList.contains("on")) hideStandings();
    else showStandings();
  });
}

function openChatInput() {
  input.enabled = false;
  document.exitPointerLock?.();
  hud.openChat();
}
function closeChatInput() {
  hud.closeChat();
  input.enabled = true;
  if (playing) lockPointer();
}
// hud's own Enter/Escape handling calls onChat/closeChat; re-enable input after
document.getElementById("chatinput").addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeChatInput();
});

// ── Standings overlay (ESC) ──────────────────────────────────────────────────

const pauseEl = document.getElementById("pause");
const sliveEl = document.getElementById("slive");
const sallEl = document.getElementById("sall");
let lastBoard = { live: [], all: [], rank: 0 };

function shortWallet(w) {
  return w.length > 10 ? `${w.slice(0, 4)}…${w.slice(-4)}` : w;
}

function standingsRow(r, idx, isMe) {
  const walletCell = r.w
    ? `<span class="swallet" title="${escapeHtml(r.w)}">${escapeHtml(shortWallet(r.w))}</span>` +
      `<button class="cpy" data-w="${escapeHtml(r.w)}">COPY</button>`
    : `<span class="swallet free">FREE PLAY</span>`;
  return (
    `<div class="srow${isMe ? " me" : ""}">` +
    `<span class="srank">${idx + 1}</span>` +
    `<span class="sname">${escapeHtml(r.n)}</span>` +
    `<span class="salt">${r.alt}m</span>${walletCell}</div>`
  );
}

function renderStandings() {
  sliveEl.innerHTML = lastBoard.live.length
    ? lastBoard.live
        .map((r, i) => standingsRow(r, i, r.id === net.id))
        .join("")
    : '<div class="sempty">nobody on the tower right now</div>';
  sallEl.innerHTML = lastBoard.all.length
    ? lastBoard.all.map((r, i) => standingsRow(r, i, false)).join("")
    : '<div class="sempty">no legends yet — be the first</div>';
}

/** Clipboard API first; textarea+execCommand fallback for http / older UAs. */
function copyText(text) {
  const legacy = () =>
    new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.append(ta);
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        /* fall through */
      }
      ta.remove();
      ok ? resolve() : reject(new Error("copy blocked"));
    });
  return navigator.clipboard?.writeText
    ? navigator.clipboard.writeText(text).catch(legacy)
    : legacy();
}

pauseEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".cpy");
  if (!btn) return;
  copyText(btn.dataset.w).then(
    () => {
      btn.textContent = "COPIED";
      btn.classList.add("ok");
      setTimeout(() => {
        btn.textContent = "COPY";
        btn.classList.remove("ok");
      }, 1400);
    },
    () => hud.toast("couldn't copy — clipboard blocked", "bad"),
  );
});

function showStandings() {
  renderStandings();
  pauseEl.classList.add("on");
}
function hideStandings() {
  pauseEl.classList.remove("on");
}

document.getElementById("resume").addEventListener("click", () => {
  hideStandings();
  lockPointer();
});
document.addEventListener("pointerlockchange", () => {
  if (!playing) return;
  const locked = document.pointerLockElement === canvas;
  if (!locked && !hud.chatOpen) showStandings();
  else hideStandings();
});
// ESC also works when the pointer was never locked (e.g. after chat).
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape" || !playing || hud.chatOpen) return;
  if (document.pointerLockElement === canvas) return; // browser handles it
  if (pauseEl.classList.contains("on")) hideStandings();
  else showStandings();
});

// ── Join overlay ─────────────────────────────────────────────────────────────

const joinEl = document.getElementById("join");
const nameEl = document.getElementById("name");
const walletEl = document.getElementById("wallet");
const swatchesEl = document.getElementById("swatches");
const playBtn = document.getElementById("play");
const joinBestEl = document.getElementById("joinbest");

// Solana public key: base58, 32–44 chars. Empty = free play (no rewards).
const SOL_ADDR = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
walletEl.value = localStorage.getItem("booster-wallet") || "";
walletEl.addEventListener("input", () => walletEl.classList.remove("bad"));

const RANDOM_NAMES = [
  "Wobbles",
  "Boing",
  "Sir Slips",
  "Plop",
  "Momo",
  "Yeet",
  "Gumdrop",
  "Bloop",
  "Tumbles",
  "Pudding",
  "Zoomy",
  "Squish",
];
nameEl.value =
  localStorage.getItem("topple-name") ||
  RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];

let colorIdx = Number(localStorage.getItem("topple-color"));
if (
  !Number.isInteger(colorIdx) ||
  colorIdx < 0 ||
  colorIdx >= BLOB_COLORS.length
)
  colorIdx = Math.floor(Math.random() * BLOB_COLORS.length);

BLOB_COLORS.forEach((hex, i) => {
  const sw = document.createElement("div");
  sw.className = "sw" + (i === colorIdx ? " sel" : "");
  sw.style.background = hex;
  sw.addEventListener("click", () => {
    colorIdx = i;
    swatchesEl
      .querySelectorAll(".sw")
      .forEach((el, j) => el.classList.toggle("sel", j === i));
  });
  swatchesEl.append(sw);
});

let lifetimeBest = Number(localStorage.getItem("topple-best")) || 0;
if (lifetimeBest > 0)
  joinBestEl.textContent = `YOUR RECORD — ${Math.round(lifetimeBest)}m`;

playBtn.addEventListener("click", () => {
  const name = nameEl.value.trim().slice(0, 14) || "Blob";
  const wallet = walletEl.value.trim();
  if (wallet && !SOL_ADDR.test(wallet)) {
    walletEl.classList.add("bad");
    walletEl.focus();
    hud.toast("that doesn't look like a Solana address", "bad");
    return;
  }
  localStorage.setItem("topple-name", name);
  localStorage.setItem("topple-color", String(colorIdx));
  localStorage.setItem("booster-wallet", wallet);
  playBtn.disabled = true;
  playBtn.textContent = "CONNECTING…";
  audio.ensure();
  net.connect(name, colorIdx, wallet);
});
for (const el of [nameEl, walletEl]) {
  el.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Enter") playBtn.click();
  });
}

// ── Session state ────────────────────────────────────────────────────────────

let sessionBest = 0;
let milestoneMark = 0; // last flashed 100 m line
let beatLifetime = false;

net.on("welcome", () => {
  playing = true;
  sessionBest = 0;
  milestoneMark = 0;
  zoneMark = 0;
  beatLifetime = false;
  hud.setConnecting(false);
  joinEl.classList.add("off");
  hud.show();
  // (re)build my blob
  if (myBlob) {
    scene.remove(myBlob.group);
    disposeBlob(myBlob);
  }
  myBlob = createBlob(colorIdx);
  scene.add(myBlob.group);
  for (const id of remoteBlobs.keys()) removeRemoteBlob(id);
  touchUi.classList.add("on");
  lockPointer();
});

net.on("disconnect", () => {
  if (playing) hud.setConnecting(true);
});
net.on("reconnecting", () => {
  if (playing) hud.setConnecting(true);
});
net.on("playerleave", (id) => removeRemoteBlob(id));

// ── Leaderboard / crown / beacon ─────────────────────────────────────────────

net.on("leaderboard", (msg) => {
  lastBoard = msg;
  if (pauseEl.classList.contains("on")) renderStandings();
  hud.setBoard(msg.live, msg.all, msg.rank, net.id, msg.leaderId);
  towerView.setBeacon(
    msg.leaderId !== null && msg.leaderId !== net.id ? msg.leaderPos : null,
  );
  leaderId = msg.leaderId;
  if (myBlob) myBlob.crown.visible = leaderId === net.id;
});

// ── World events → effects, audio, feed ──────────────────────────────────────

function nearMe(p, r = 30) {
  if (!p) return false;
  const m = net.move;
  return Math.hypot(p[0] - m.x, p[1] - m.y, p[2] - m.z) < r;
}

net.on("event", (msg) => {
  switch (msg.kind) {
    case "shove": {
      effects.ring(msg.p);
      if (nearMe(msg.p)) audio.shove();
      if (msg.to === net.id) hud.toast("💥 you got shoved!", "bad");
      hud.feed(
        `💥 <b>${escapeHtml(nameOf(msg.from))}</b> shoved <b>${escapeHtml(nameOf(msg.to))}</b>`,
      );
      break;
    }
    case "bump":
      effects.stars(msg.p);
      if (nearMe(msg.p)) audio.bump();
      break;
    case "bigfall": {
      if (msg.id === net.id) {
        hud.toast(`💀 −${msg.drop}m`, "bad");
      }
      hud.feed(`💀 <b>${escapeHtml(msg.n)}</b> fell <b>${msg.drop}m</b>`);
      break;
    }
    case "voided":
      if (msg.id !== net.id) {
        effects.poof(msg.p);
        hud.feed(`☁️ <b>${escapeHtml(msg.n)}</b> fell into the clouds`);
      }
      break;
    case "crown": {
      hud.feed(
        `👑 <b>${escapeHtml(msg.n)}</b> took the crown at <b>${msg.alt}m</b>`,
        true,
      );
      if (msg.id === net.id) {
        hud.toast("👑 YOU WEAR THE CROWN", "gold");
        audio.fanfare();
        effects.confetti([net.move.x, net.move.y, net.move.z]);
      }
      break;
    }
    case "record": {
      hud.feed(
        `🏆 NEW TOWER RECORD — <b>${escapeHtml(msg.n)}</b>: <b>${msg.alt}m</b>`,
        true,
      );
      if (msg.n === localStorage.getItem("topple-name")) audio.fanfare();
      else audio.milestone();
      break;
    }
    case "chat": {
      const rec = net.players.get(msg.id);
      if (rec) rec.chat = { text: msg.text, until: Date.now() + 4000 };
      break;
    }
  }
});

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

// ── Camera ───────────────────────────────────────────────────────────────────

const CAM_DIST = 7.4;
let fov = 70;
let shake = 0;
const camTarget = new THREE.Vector3();
const camDir = new THREE.Vector3();

function updateCamera(pos, dt) {
  camTarget.set(pos.x, pos.y + 1.15, pos.z);
  const cp = Math.cos(input.pitch),
    sp = Math.sin(input.pitch);
  camDir.set(Math.sin(input.yaw) * cp, sp, -Math.cos(input.yaw) * cp);
  camera.position.copy(camTarget).addScaledVector(camDir, -CAM_DIST);
  // keep the camera off the island floor
  if (camera.position.y < pos.y - 3 && pos.y < 6) camera.position.y = pos.y - 3;
  if (shake > 0) {
    shake = Math.max(0, shake - dt * 3);
    camera.position.x += (Math.random() - 0.5) * shake * 0.3;
    camera.position.y += (Math.random() - 0.5) * shake * 0.3;
  }
  camera.lookAt(camTarget);

  const speed = Math.hypot(net.move.vx, net.move.vz);
  const fall = Math.max(0, -net.move.vy);
  const targetFov = 70 + Math.min(16, speed * 0.55 + fall * 0.32);
  fov += (targetFov - fov) * Math.min(1, dt * 5);
  camera.fov = fov;
  camera.updateProjectionMatrix();
}

// ── Fixed-rate input → prediction → local feedback ───────────────────────────

const STEP = 1 / INPUT_SEND_RATE;
let accum = 0;

function pumpInput(dt) {
  if (!playing || !net.connected) return;
  accum += dt;
  while (accum >= STEP) {
    accum -= STEP;
    const ev = net.applyInput(input.sample(), STEP);
    const m = net.move;
    if (ev.jumped) audio.jump();
    if (ev.bounced) {
      if (ev.boosted) {
        audio.boost();
        effects.sparkle([m.x, m.y, m.z]);
        effects.ring([m.x, m.y + 0.2, m.z]);
        shake = Math.max(shake, 0.5);
      } else {
        audio.bounce();
        effects.sparkle([m.x, m.y, m.z]);
      }
    }
    if (ev.landed) {
      const impact = Math.abs(ev.impactVy);
      audio.land(impact / 10);
      if (impact > 4) effects.dust([m.x, m.y, m.z], Math.min(1.6, impact / 9));
      if (myBlob) myBlob.squash = Math.min(1, impact / 15);
      if (impact > 14) shake = Math.min(1, impact / 24);
    }
    if (ev.voided) {
      audio.voided();
      effects.poof([m.x, m.y + 0.5, m.z]);
      hud.toast(
        m.y > 4
          ? `⛑ rescued to your rest ring — ${Math.round(m.y)}m banked`
          : "☁️ the wind carried you home",
        "bad",
      );
    }
  }
}

// ── Milestones, zones & personal bests ───────────────────────────────────────

const ZONE_NAMES = [
  [130, "☁️ THE CLOUD LAYER"],
  [280, "🍯 THE HONEY SUNSET"],
  [500, "🔮 THE DUSK CRYSTALS"],
  [800, "🌌 DEEP SPACE"],
  [1600, "✨ THE GOLDEN REACH"],
  [2600, "🌠 THE NEBULA"],
  [4000, "🏔 SUMMIT APPROACH"],
];
let zoneMark = 0;

function trackProgress() {
  const alt = net.move.y;
  if (alt > sessionBest) sessionBest = alt;

  const line = Math.floor(sessionBest / 100) * 100;
  if (line >= 100 && line > milestoneMark) {
    milestoneMark = line;
    hud.milestone(line);
    audio.milestone();
  }

  // Zone announcements — first time this run you climb into a new band.
  for (const [y, name] of ZONE_NAMES) {
    if (sessionBest >= y && zoneMark < y) {
      zoneMark = y;
      hud.toast(`${name}`, "gold");
    }
  }

  if (lifetimeBest >= 20 && !beatLifetime && alt > lifetimeBest) {
    beatLifetime = true;
    hud.toast("⭐ NEW PERSONAL BEST", "gold");
    audio.chime();
    effects.confetti([net.move.x, net.move.y, net.move.z]);
  }
  if (sessionBest > lifetimeBest) {
    lifetimeBest = sessionBest;
    localStorage.setItem("topple-best", String(Math.round(lifetimeBest)));
  }
}

// ── Label projection ─────────────────────────────────────────────────────────

const _proj = new THREE.Vector3();

function projectLabels(now) {
  const entries = [];
  for (const [id, rec] of net.players) {
    const s = net.sample(rec.buf, now);
    if (!s) continue;
    _proj.set(s.p[0], s.p[1] + 1.35, s.p[2]);
    const dist = _proj.distanceTo(camera.position);
    _proj.project(camera);
    const visible =
      _proj.z < 1 &&
      Math.abs(_proj.x) < 1.1 &&
      Math.abs(_proj.y) < 1.1 &&
      dist < 65;
    const chat =
      rec.chat && (!rec.chat.until || rec.chat.until > Date.now())
        ? rec.chat.text
        : null;
    entries.push({
      id,
      sx: (_proj.x * 0.5 + 0.5) * window.innerWidth,
      sy: (-_proj.y * 0.5 + 0.5) * window.innerHeight,
      name: rec.info.n,
      alt: rec.alt ?? 0,
      chat,
      isLeader: id === leaderId,
      visible,
    });
  }
  hud.updateLabels(entries);
}

// ── Main loop ────────────────────────────────────────────────────────────────

let lastT = performance.now();

function frame() {
  requestAnimationFrame(frame);
  const now = performance.now();
  const dt = Math.min(0.05, (now - lastT) / 1000);
  lastT = now;
  const t = now / 1000;

  pumpInput(dt);

  if (playing && net.connected) trackProgress();

  // my blob
  const pos = net.renderPos(dt);
  if (myBlob) {
    myBlob.group.position.set(pos.x, pos.y, pos.z);
    myBlob.group.rotation.y = -net.move.yaw;
    animateBlob(
      myBlob,
      deriveAnim(net.move),
      Math.hypot(net.move.vx, net.move.vz),
      net.move.vy,
      dt,
      t,
    );
  }

  // remote blobs
  for (const [id, rec] of net.players) {
    const blob = ensureRemoteBlob(id, rec.info.col);
    const s = net.sample(rec.buf, now);
    if (!s) continue;
    blob.group.position.set(s.p[0], s.p[1], s.p[2]);
    blob.group.rotation.y = -s.ry;
    blob.crown.visible = id === leaderId;
    const speed = s.v ? Math.hypot(s.v[0], s.v[2]) : 0;
    const vy = s.v ? s.v[1] : 0;
    // remote landing dust: falling fast in the last snapshot, grounded now
    if (blob._wasAnim === "fall" && s.anim !== "fall" && s.anim !== "rise") {
      effects.dust(s.p, 0.7);
      blob.squash = 0.5;
    }
    blob._wasAnim = s.anim;
    animateBlob(blob, s.anim, speed, vy, dt, t);
  }
  // prune blobs whose players vanished from interest
  for (const id of remoteBlobs.keys())
    if (!net.players.has(id)) removeRemoteBlob(id);

  updateCamera(pos, dt);
  towerView.update(camera.position, pos, dt);
  effects.update(dt);

  if (playing && net.connected) {
    hud.setAltitude(net.move.y, Math.max(lifetimeBest, sessionBest));
    projectLabels(now);
    audio.update({
      alt: Math.max(0, net.move.y),
      speed: Math.hypot(net.move.vx, net.move.vz),
      vy: net.move.vy,
    });
  }

  renderer.render(scene, camera);
}
frame();
