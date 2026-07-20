// ─── PAWVERSE client entry ───────────────────────────────────────────────────
// Boots the lobby, then runs the game: fixed-rate predicted input → server,
// interpolated remote entities, third-person camera, effects, audio, HUD.

import * as THREE from "three";
import {
  INPUT_SEND_RATE,
  BALL_GRAB_RANGE,
  BITE_RANGE,
  BALL_RADIUS,
  CHAT_TTL_MS,
  DAY_LENGTH_MS,
} from "../../shared/constants.js";
import { EVENTS } from "../../shared/protocol.js";
import { deriveAnim } from "../../shared/movement.js";
import { groundHeightAt, isWaterAt } from "../../shared/world.js";
import { buildWorld } from "./world.js";
import {
  makeDog,
  makeHuman,
  makeSquirrel,
  makeTextSprite,
} from "./dogfactory.js";
import { animateDog, animateHuman, animateSquirrel } from "./animator.js";
import { Effects, PawPrints } from "./effects.js";
import { GameAudio } from "./audio.js";
import { Net } from "./net.js";
import { Input } from "./input.js";
import { Hud } from "./hud.js";
import { initLobby } from "./lobby.js";
import { ScentSystem } from "./living.js";
import { beginTutorial } from "./onboarding.js";

// ── renderer / scene ─────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // soft contact shadows
renderer.toneMapping = THREE.ACESFilmicToneMapping; // filmic color response
renderer.toneMappingExposure = 1.12;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  62,
  innerWidth / innerHeight,
  0.1,
  400,
);
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const world = buildWorld(scene);
const effects = new Effects(scene);
const scents = new ScentSystem(scene, effects);
const pawPrints = new PawPrints(scene);
const audio = new GameAudio(camera);
const net = new Net();

// world clock (server-synced): phase 0 sunrise → 0.25 noon → 0.5 sunset → 0.75 midnight
let worldEpoch = null,
  clockOffset = 0;
function worldPhase() {
  if (worldEpoch === null) return 0.18; // pleasant late morning pre-connect
  const elapsed = Date.now() + clockOffset - worldEpoch;
  return (elapsed / DAY_LENGTH_MS + 0.15) % 1; // servers boot mid-morning
}

// ── game state ───────────────────────────────────────────────────────────────
let playing = false;
let myView = null; // my dog's 3D view
let myCustom = null; // my customization (voice pitch, size)
let myFacing = Math.PI; // smoothed model facing (rad)
let myLean = 0;
let prevMyAnim = "idle";
let printClock = 0,
  printSide = 1; // paw print cadence
let wakeClock = 0,
  reactionClock = 0;

/** Bark/howl playback rate: small dogs yap high, big dogs boom low. */
function voiceRate(size = 1) {
  return 1.5 - 0.5 * size;
}
function dogSizeOf(id) {
  if (id === net.id) return myCustom?.size ?? 1;
  return dogViews.get(id) ? (net.dogs.get(id)?.info.c.size ?? 1) : 1;
}
const dogViews = new Map(); // id → { view, tag, bubble?, bubbleUntil, facing, lastAnim }
const ballMeshes = new Map(); // id → mesh
const npcViews = new Map(); // id → human view
const squirrelViews = new Map(); // id → squirrel view
const tmpV = new THREE.Vector3();

const hud = new Hud({
  onChatSend: (text) => net.chat(text),
  onEmote: (emote) => net.emote(emote),
  onBark: () => net.bark(),
  onSniff: () => beginSniff(),
});

function beginSniff() {
  if (!playing || !net.connected) return;
  const pos = { x: net.move.x, y: net.move.y, z: net.move.z };
  scents.sniff(pos);
  net.sniff();
}

// ── input wiring ─────────────────────────────────────────────────────────────
let throwArmed = false; // charging with a ball in mouth
const input = new Input(renderer.domElement, {
  bark: () => net.bark(),
  bite: () => {
    const target = nearestDog(BITE_RANGE);
    if (target !== null) net.bite(target);
  },
  grabDrop: () => {
    if (net.myBall !== null) {
      net.drop();
      return;
    }
    const ballId = nearestFreeBall(BALL_GRAB_RANGE);
    if (ballId !== null) net.grab(ballId);
  },
  emote: (emote) => net.emote(emote),
  mute: () => {
    const muted = audio.toggleMute();
    hud.toast(muted ? "🔇 sound muted (M)" : "🔊 sound on");
  },
  sniff: () => beginSniff(),
  journal: () => hud.toggleJournal(),
  chatOpen: () => {
    if (!playing) return;
    input.enabled = false;
    hud.openChat();
  },
  throwStart: () => {
    throwArmed = net.myBall !== null;
  },
  throwRelease: (power) => {
    hud.setPower(null);
    if (!throwArmed || net.myBall === null) return;
    throwArmed = false;
    // Aim along the camera: yaw forward + a pitch-driven arc.
    const up = Math.min(0.9, Math.max(0.12, 0.45 + input.pitch));
    net.throw([Math.sin(input.yaw), up, -Math.cos(input.yaw)], power);
  },
});

// chat box closes → re-enable game keys
document.getElementById("chat-input").addEventListener("blur", () => {
  input.enabled = true;
  hud.closeChat();
});
document.addEventListener("pointerlockchange", () => {
  if (playing)
    hud.setPointerHint(
      document.pointerLockElement !== renderer.domElement && !hud.chatOpen,
    );
});
document.getElementById("click-to-play").addEventListener("click", () => {
  renderer.domElement.requestPointerLock();
});

function nearestDog(range) {
  let best = null,
    bestD2 = range * range;
  for (const [id, rec] of dogViews) {
    const p = rec.view.group.position;
    const d2 = (p.x - net.move.x) ** 2 + (p.z - net.move.z) ** 2;
    if (d2 < bestD2) {
      bestD2 = d2;
      best = id;
    }
  }
  return best;
}

function nearestFreeBall(range) {
  let best = null,
    bestD2 = range * range;
  for (const [id, b] of net.balls) {
    if (b.holder !== null) continue;
    const d2 = (b.p[0] - net.move.x) ** 2 + (b.p[2] - net.move.z) ** 2;
    if (d2 < bestD2) {
      bestD2 = d2;
      best = id;
    }
  }
  return best;
}

// ── net events → world reactions ─────────────────────────────────────────────
net.on("welcome", (msg) => {
  hud.setConnection("online");
  if (msg.settings?.epoch) {
    worldEpoch = msg.settings.epoch;
    clockOffset = msg.settings.now - Date.now(); // absorb client/server clock skew
  }
  hud.setParkEvent(msg.settings?.parkEvent || null);
});
net.on("disconnect", () => hud.setConnection("connection lost"));
net.on("reconnecting", ({ attempt, delay }) => {
  hud.setConnection(`reconnecting ${attempt} · ${Math.ceil(delay / 1000)}s`);
});
net.on("score", (s) => hud.setScore(s));
net.on("park", (event) => hud.setParkEvent(event));

net.on("event", (ev) => {
  const p = ev.p || [0, 0, 0];
  switch (ev.kind) {
    case EVENTS.BARK:
      effects.ring(p, "#ffd166", 6);
      world.react?.(p, 7);
      audio.play("bark", p, 1, voiceRate(dogSizeOf(ev.id)));
      break;
    case EVENTS.HOWL:
      effects.ring(p, "#9ecbff", 10, 1.4);
      audio.play("howl", p, 1, voiceRate(dogSizeOf(ev.id)));
      break;
    case EVENTS.ECHO:
      // park-wide: triple expanding ring + a distant answering howl
      effects.ring(p, "#c9d9ff", 30, 3);
      effects.ring(p, "#8fb8ff", 20, 2.4);
      audio.play("howl", null, 0.7, voiceRate(dogSizeOf(ev.id)) * 0.92);
      hud.toast(
        ev.id === net.id
          ? "🌕 YOUR HOWL ECHOES ACROSS THE PARK! +5"
          : "🌕 a howl echoes from Howl Rock…",
        ev.id === net.id ? "good" : "",
      );
      break;
    case EVENTS.TRICK: {
      effects.burst(p, {
        color: "#ffd166",
        n: 16,
        speed: 3,
        up: 4.5,
        size: 0.07,
        ttl: 0.8,
      });
      effects.hearts(p, 3);
      audio.play("chime", p);
      if (ev.dog === net.id)
        hud.toast("🎪 TRICK SHOW! The human loved it! +5 ⚡ +1 🦴", "good");
      break;
    }
    case EVENTS.GROUP_HOWL:
      effects.ring(p, "#c9a6ff", 16, 2);
      if (ev.ids?.includes(net.id))
        hud.toast("🌕 GROUP HOWL! +10 Zoomies", "good");
      break;
    case EVENTS.YELP:
      audio.play("yelp", p, 0.8);
      break;
    case EVENTS.BITE:
      effects.burst(p, {
        color: "#ffe0a3",
        n: 12,
        speed: 2.5,
        up: 3.5,
        size: 0.07,
      });
      audio.play("growl", p, 0.9);
      if (ev.to === net.id) hud.toast("🐶 play-bitten!");
      break;
    case EVENTS.PICKUP:
      audio.play("pop", p ?? null);
      if (ev.dog === net.id && ev.caught)
        hud.toast("✨ MID-AIR CATCH! +5", "good");
      break;
    case EVENTS.THROW:
      audio.play("whoosh", null, 0.7);
      break;
    case EVENTS.PET: {
      const dogPos =
        ev.dog === net.id
          ? [net.move.x, net.move.y, net.move.z]
          : dogViews.get(ev.dog)?.view.group.position.toArray();
      if (dogPos) {
        effects.hearts(dogPos);
      }
      if (ev.dog === net.id) audio.play("chime");
      break;
    }
    case EVENTS.FEED:
      if (ev.dog === net.id) hud.toast("🦴 treat! +happiness", "good");
      break;
    case EVENTS.SCARE:
      effects.burst(p, {
        color: "#ffffff",
        n: 5,
        speed: 1.5,
        up: 2.5,
        size: 0.06,
        ttl: 0.4,
      });
      world.react?.(p, 10);
      break;
    case EVENTS.SNIFF:
      if (ev.dog !== net.id) effects.ring(p, "#b9f6d0", 7, 1);
      break;
    case EVENTS.DISCOVERY:
      scents.discover(ev.spot, p);
      hud.recordDiscovery(ev);
      audio.play("chime", p);
      break;
    case EVENTS.GREET:
      effects.hearts(p, 2);
      if (ev.dog === net.id)
        hud.toast("A familiar park friend waves hello", "good");
      break;
    case EVENTS.PARK_COMPLETE: {
      const participated = ev.ids?.includes(net.id);
      hud.recordParkCompletion(ev.event, participated);
      hud.setParkEvent(ev.event);
      const celebrationPos = participated
        ? [net.move.x, net.move.y, net.move.z]
        : p;
      effects.burst(celebrationPos, {
        color: "#7be8a8",
        n: 28,
        speed: 4,
        up: 6,
        size: 0.08,
        ttl: 1.1,
      });
      hud.toast(
        participated
          ? "Community goal complete: +20 Zoomies"
          : "The park completed a community goal",
        "good",
      );
      audio.play("chime");
      break;
    }
    case EVENTS.CHAT: {
      showBubble(ev.id, ev.text);
      const isMe = ev.id === net.id;
      const who = isMe
        ? myCustom?.name || "You"
        : net.dogs.get(ev.id)?.info.n || "Dog";
      hud.addChatLine(who, ev.text, isMe);
      break;
    }
    case EVENTS.CHASE:
      effects.burst(p, {
        color: "#c9a06a",
        n: 14,
        speed: 3,
        up: 4,
        size: 0.07,
      });
      audio.play("pop", p, 0.9);
      if (ev.dog === net.id) hud.toast("🐿️ SQUIRREL CHASED! +8", "good");
      world.react?.(p, 12);
      break;
    case EVENTS.TREASURE: {
      effects.burst(p, {
        color: "#ffe28a",
        n: 20,
        speed: 3.5,
        up: 5,
        size: 0.08,
        ttl: 0.9,
      });
      effects.burst(p, {
        color: "#7a5a3c",
        n: 10,
        speed: 2,
        up: 3,
        size: 0.09,
      });
      audio.play("chime", p);
      const label =
        {
          bone: "🦴 a bone!",
          stick: "🪵 a great stick!",
          shiny: "✨ something SHINY!",
        }[ev.loot] || ev.loot;
      if (ev.dog === net.id)
        hud.toast(`Dug up ${label} +${ev.zoomies}`, "good");
      // floating loot popup at the mound
      const pop = makeTextSprite(label, {
        bg: "rgba(255,226,138,0.92)",
        fg: "#3a2c10",
      });
      pop.position.set(p[0], p[1] + 1.1, p[2]);
      effects.add(pop, 1.6, (fx, dt2, k) => {
        fx.obj.position.y += dt2 * 0.8;
        fx.obj.material.opacity = 1 - k * k;
      });
      break;
    }
  }
  hud.trackEvent?.(ev, net.id);
});
net.on("leaderboard", (msg) => hud.setLeaderboard(msg.top, msg.rank));

function showBubble(dogId, text) {
  const rec = dogId === net.id ? selfBubble : dogViews.get(dogId);
  if (!rec) return;
  if (rec.bubble) rec.bubbleHolder.remove(rec.bubble);
  rec.bubble = makeTextSprite(`💬 ${text}`, {
    bg: "rgba(255,255,255,0.92)",
    fg: "#1a1f2e",
  });
  rec.bubble.position.y = 0.55;
  rec.bubbleHolder.add(rec.bubble);
  rec.bubbleUntil = performance.now() + CHAT_TTL_MS;
}
const selfBubble = { bubble: null, bubbleHolder: null, bubbleUntil: 0 }; // holder set on play

function expireBubble(rec, now) {
  if (rec.bubble && now > rec.bubbleUntil) {
    rec.bubbleHolder.remove(rec.bubble);
    rec.bubble = null;
  }
}

// ── entity view sync ─────────────────────────────────────────────────────────
function syncDogViews(now, dt) {
  // create / update remote dogs
  for (const [id, rec] of net.dogs) {
    let dv = dogViews.get(id);
    if (!dv) {
      const view = makeDog(rec.info.c);
      const holder = new THREE.Group(); // tag + bubble anchor
      holder.position.y = 1.55 * (rec.info.c.size || 1);
      const tag = makeTextSprite(rec.info.n || "Dog");
      holder.add(tag);
      view.group.add(holder);
      scene.add(view.group, view.contactShadow);
      dv = {
        view,
        tag,
        bubbleHolder: holder,
        bubble: null,
        bubbleUntil: 0,
        facing: Math.PI,
        lastAnim: "idle",
      };
      dogViews.set(id, dv);
    }
    const s = net.sample(rec.buf, now);
    if (!s) continue;
    dv.view.group.position.set(s.p[0], s.p[1], s.p[2]);
    updateContactShadow(dv.view, s.p[0], s.p[1], s.p[2]);
    const speed = s.v ? Math.hypot(s.v[0], s.v[2]) : 0;
    const targetFacing =
      speed > 0.5 ? Math.atan2(s.v[0], s.v[2]) : Math.PI - s.ry;
    const before = dv.facing;
    dv.facing = lerpAngle(dv.facing, targetFacing, Math.min(1, dt * 10));
    dv.view.group.rotation.y = dv.facing;
    const yawRate = dt > 0 ? shortAngle(dv.facing - before) / dt : 0;
    dv.lean = dv.lean || 0;
    dv.lean +=
      (clamp(-yawRate * 0.055 * Math.min(1, speed / 5), -0.3, 0.3) - dv.lean) *
      Math.min(1, dt * 8);
    animateDog(dv.view, s.anim, dt, speed, dv.lean);
    if (s.anim === "swim" && dv.lastAnim !== "swim") {
      effects.burst(s.p, {
        color: "#bfe8ff",
        n: 10,
        speed: 2,
        up: 2.5,
        size: 0.06,
      });
      audio.play("splash", s.p, 0.7);
    }
    if (dv.lastAnim === "air" && s.anim !== "air" && s.anim !== "swim") {
      dv.view.squash = 0.3;
      effects.burst(s.p, {
        color: "#c9b58a",
        n: 6,
        speed: 1.5,
        up: 1.4,
        size: 0.055,
        ttl: 0.4,
      });
      audio.play("thud", s.p, 0.5);
    }
    dv.lastAnim = s.anim;
    // remote paw prints
    if (speed > 1.6) {
      dv.printClock = (dv.printClock ?? 0) - speed * dt;
      if (dv.printClock <= 0) {
        dv.printClock = 0.62;
        dv.printSide = -(dv.printSide || 1);
        pawPrints.stamp(s.p[0], s.p[1], s.p[2], dv.facing, dv.printSide);
      }
    }
    expireBubble(dv, now);
  }
  // remove dogs that left interest / disconnected
  for (const [id, dv] of dogViews) {
    if (!net.dogs.has(id)) {
      scene.remove(dv.view.group);
      scene.remove(dv.view.contactShadow);
      dogViews.delete(id);
    }
  }
}

function syncBalls(dt) {
  for (const [id, b] of net.balls) {
    let mesh = ballMeshes.get(id);
    if (!mesh) {
      mesh = new THREE.Mesh(
        new THREE.SphereGeometry(BALL_RADIUS, 10, 8),
        new THREE.MeshStandardMaterial({
          color: "#cbe54b",
          flatShading: true,
          roughness: 0.7,
        }),
      );
      mesh.castShadow = true;
      scene.add(mesh);
      ballMeshes.set(id, mesh);
    }
    if (b.holder !== null) {
      // Glue to the holder's mouth for lag-free carrying.
      const holderView =
        b.holder === net.id ? myView : dogViews.get(b.holder)?.view;
      if (holderView) {
        holderView.group.updateMatrixWorld();
        holderView.mouth.getWorldPosition(tmpV);
        mesh.position.copy(tmpV);
        continue;
      }
    }
    // Free ball: converge on the server position, extrapolating with velocity.
    const age = (performance.now() - b.t) / 1000;
    tmpV.set(
      b.p[0] + b.v[0] * age,
      Math.max(
        groundHeightAt(b.p[0], b.p[2]) + BALL_RADIUS * 0.8,
        b.p[1] + b.v[1] * age,
      ),
      b.p[2] + b.v[2] * age,
    );
    mesh.position.lerp(tmpV, Math.min(1, dt * 14));
  }
  for (const [id, mesh] of ballMeshes) {
    if (!net.balls.has(id)) {
      scene.remove(mesh);
      ballMeshes.delete(id);
    }
  }
}

function syncSquirrels(now, dt) {
  for (const [id, rec] of net.squirrels) {
    let sv = squirrelViews.get(id);
    if (!sv) {
      sv = makeSquirrel(id);
      scene.add(sv.group);
      squirrelViews.set(id, sv);
    }
    const s = net.sample(rec.buf, now);
    if (!s) continue;
    sv.group.position.set(s.p[0], s.p[1], s.p[2]);
    sv.group.rotation.y = s.ry;
    animateSquirrel(sv, rec.st, dt);
  }
  for (const [id, sv] of squirrelViews) {
    if (!net.squirrels.has(id)) {
      scene.remove(sv.group);
      squirrelViews.delete(id);
    }
  }
}

function syncNpcs(now, dt) {
  for (const [id, rec] of net.npcs) {
    let nv = npcViews.get(id);
    if (!nv) {
      nv = makeHuman(id);
      scene.add(nv.group);
      npcViews.set(id, nv);
    }
    const s = net.sample(rec.buf, now);
    if (!s) continue;
    nv.group.position.set(s.p[0], s.p[1], s.p[2]);
    nv.group.rotation.y = s.ry;
    animateHuman(nv, rec.st, dt);
  }
}

// ── fixed-rate input → prediction → server ───────────────────────────────────
const INPUT_DT = 1 / INPUT_SEND_RATE;
let inputAccum = 0;

function stepInputs(dt) {
  inputAccum += dt;
  while (inputAccum >= INPUT_DT) {
    inputAccum -= INPUT_DT;
    const sample = input.sample();
    if (sample.f || sample.b || sample.l || sample.r) net.myEmote = "none"; // mirror server rule
    net.applyInput(sample, INPUT_DT);
  }
}

// ── camera ───────────────────────────────────────────────────────────────────
const BASE_FOV = 62;
let fovKick = 0; // widens with speed for a sense of zoomies
function updateCamera(pos, dt = 0.016) {
  const dist = 6.2;
  const pitch = -input.pitch; // camera elevation angle
  const d = dist * Math.cos(pitch);
  const cx = pos.x - Math.sin(input.yaw) * d;
  const cz = pos.z + Math.cos(input.yaw) * d;
  let cy = pos.y + 1.2 + dist * Math.sin(pitch);
  cy = Math.max(groundHeightAt(cx, cz) + 0.4, cy);
  camera.position.set(cx, cy, cz);
  camera.lookAt(pos.x, pos.y + 0.9, pos.z);

  // sprint FOV kick (smoothed)
  const speed = Math.hypot(net.move.vx, net.move.vz);
  const target = Math.min(1, Math.max(0, (speed - 4.5) / 3.5));
  fovKick += (target - fovKick) * Math.min(1, dt * 6);
  const fov = BASE_FOV + fovKick * 8;
  if (Math.abs(camera.fov - fov) > 0.05) {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }
}

// ── main loop ────────────────────────────────────────────────────────────────
// rAF drives rendering, with a timer fallback so the simulation and the
// server connection stay alive in throttled/background tabs (multiplayer:
// your dog shouldn't rubber-band just because you alt-tabbed).
let lastT = performance.now();
let rafId = 0,
  fallbackId = 0;
function schedule() {
  rafId = requestAnimationFrame(frame);
  fallbackId = setTimeout(frame, 120);
}
function frame() {
  cancelAnimationFrame(rafId);
  clearTimeout(fallbackId);
  const now = performance.now();
  const dt = Math.min(0.1, (now - lastT) / 1000);
  lastT = now;

  const nightK = world.update(dt, worldPhase());
  audio.setNight?.(nightK);
  effects.update(dt, camera);
  pawPrints.update(dt);

  if (playing && net.connected) {
    stepInputs(dt);

    // my dog: predicted position + smoothed reconciliation offset
    const pos = net.renderPos(dt);
    const anim = deriveAnim(net.move, net.myEmote);
    myView.group.position.set(pos.x, pos.y, pos.z);
    updateContactShadow(myView, pos.x, pos.y, pos.z);
    const speed = Math.hypot(net.move.vx, net.move.vz);
    const targetFacing =
      speed > 0.5 ? Math.atan2(net.move.vx, net.move.vz) : myFacing;
    const facingBefore = myFacing;
    myFacing = lerpAngle(myFacing, targetFacing, Math.min(1, dt * 10));
    myView.group.rotation.y = myFacing;
    updateAttention(myView, pos, myFacing, dt);
    // lean into turns: roll opposite the yaw rate, scaled by speed
    const yawRate = dt > 0 ? shortAngle(myFacing - facingBefore) / dt : 0;
    myLean +=
      (clamp(-yawRate * 0.055 * Math.min(1, speed / 5), -0.3, 0.3) - myLean) *
      Math.min(1, dt * 8);
    animateDog(myView, anim, dt, speed, myLean);
    if (anim === "swim" && prevMyAnim !== "swim") {
      effects.burst([pos.x, pos.y, pos.z], {
        color: "#bfe8ff",
        n: 12,
        speed: 2.5,
        up: 3,
        size: 0.07,
      });
      audio.play("splash", null, 0.8);
    }
    // landing: squash + dust + thud
    if (prevMyAnim === "air" && anim !== "air" && anim !== "swim") {
      myView.squash = 0.3;
      effects.burst([pos.x, pos.y, pos.z], {
        color: "#c9b58a",
        n: 8,
        speed: 1.8,
        up: 1.6,
        size: 0.06,
        ttl: 0.45,
      });
      audio.play("thud", null, 0.7, voiceRate(myCustom?.size ?? 1) * 0.9);
    }
    prevMyAnim = anim;
    // paw print trail while running on solid ground
    if (net.move.grounded && speed > 1.6) {
      printClock -= speed * dt;
      if (printClock <= 0) {
        printClock = 0.62; // metres between stamps
        printSide = -printSide;
        pawPrints.stamp(pos.x, pos.y, pos.z, myFacing, printSide);
      }
    }
    if (anim === "swim") {
      wakeClock -= dt;
      if (wakeClock <= 0) {
        wakeClock = 0.45;
        effects.ring([pos.x, pos.y, pos.z], "#d9f4ff", 1.8, 0.75);
      }
    }
    reactionClock -= dt;
    if (speed > 6 && reactionClock <= 0) {
      reactionClock = 0.8;
      world.react?.([pos.x, pos.y, pos.z], 4.5);
    }
    expireBubble(selfBubble, now);

    if (input.charging && throwArmed) hud.setPower(input.chargePower());

    syncDogViews(now, dt);
    syncBalls(dt);
    syncNpcs(now, dt);
    syncSquirrels(now, dt);
    world.updateDigs(net.digs);
    scents.update(pos, now);
    hud.updateLiving(Date.now());
    updateCamera(pos, dt);
    audio.setSeaProximity(pos.x);
    hud.drawMinimap?.(net, pos);
    if (anim === "swim") hud.trackLocal?.("swim");
  }

  renderer.render(scene, camera);
  schedule();
}
frame();

// ── boot ─────────────────────────────────────────────────────────────────────
initLobby({
  onPlay(name, customization) {
    playing = true;
    input.enabled = false;
    myCustom = { ...customization, name };
    hud.show();
    hud.setIdentity(name || "Dog", customization.primary || "#e9c67a");
    audio.init(scene); // the Play click satisfies autoplay policy

    myView = makeDog({ ...customization, name });
    scene.add(myView.group, myView.contactShadow);
    net.speedMul = myView.breed.speed;
    const holder = new THREE.Group();
    holder.position.y = 1.55 * (customization.size || 1);
    holder.add(
      makeTextSprite(name || "Dog", {
        bg: "rgba(110,231,160,0.85)",
        fg: "#0c2214",
      }),
    );
    myView.group.add(holder);
    selfBubble.bubbleHolder = holder;

    const discoveries = hud.getDiscoveryIds();
    scents.setDiscovered(discoveries);
    net.connect(name, customization, discoveries);
    beginTutorial(() => {
      input.enabled = true;
      renderer.domElement.requestPointerLock();
    });
  },
});

// Dev-only debug handle (harmless in prod builds, tree-shaken by the guard).
if (import.meta.env.DEV) window.__paw = { net, input };

function lerpAngle(a, b, k) {
  return a + shortAngle(b - a) * k;
}
function shortAngle(d) {
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function updateAttention(view, pos, facing, dt) {
  let target = null;
  let bestD2 = 12 * 12;
  const consider = (x, y, z) => {
    const d2 = (x - pos.x) ** 2 + (z - pos.z) ** 2;
    if (d2 >= bestD2) return;
    bestD2 = d2;
    target = { x, y, z };
  };
  for (const rec of net.squirrels.values()) {
    const sample = rec.buf[rec.buf.length - 1];
    if (sample) consider(sample.p[0], sample.p[1], sample.p[2]);
  }
  for (const rec of net.dogs.values()) {
    const sample = rec.buf[rec.buf.length - 1];
    if (sample) consider(sample.p[0], sample.p[1] + 0.6, sample.p[2]);
  }
  const desiredYaw = target
    ? clamp(
        shortAngle(Math.atan2(target.x - pos.x, target.z - pos.z) - facing),
        -0.65,
        0.65,
      )
    : 0;
  const desiredPitch = target
    ? clamp(
        -Math.atan2(target.y - pos.y - 0.5, Math.sqrt(bestD2)) * 0.35,
        -0.2,
        0.2,
      )
    : 0;
  view.lookYaw =
    (view.lookYaw || 0) +
    (desiredYaw - (view.lookYaw || 0)) * Math.min(1, dt * 4);
  view.lookPitch =
    (view.lookPitch || 0) +
    (desiredPitch - (view.lookPitch || 0)) * Math.min(1, dt * 4);
}

function updateContactShadow(view, x, y, z) {
  const shadow = view.contactShadow;
  if (!shadow) return;
  shadow.visible = !isWaterAt(x, z);
  const groundY = groundHeightAt(x, z);
  const scale = 1 - Math.min(0.75, Math.max(0, y - groundY) * 0.18);
  shadow.position.set(x, groundY + 0.018, z);
  shadow.scale.set(0.72 * scale, 1.05 * scale, 1);
}
