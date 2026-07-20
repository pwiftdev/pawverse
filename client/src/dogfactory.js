// ─── Procedural character factory ────────────────────────────────────────────
// Builds low-poly dogs from breed `build` params (shared/breeds.js) and simple
// NPC humans — zero external assets. Every dog is a small hierarchy of named
// pivots that animator.js poses procedurally:
//
//   root (faces +Z)
//   ├─ body            (bob / roll / sit-tilt)
//   │   ├─ headPivot   (neck — pitch for howl/dig)
//   │   ├─ legs[4]     (hip pivots: FL FR BL BR)
//   │   └─ tailPivot   (wag)
//   └─ (scaled by breed.scale × custom.size)

import * as THREE from "three";
import { resolveBreed } from "../../shared/breeds.js";

const matCache = new Map();
const contactShadowMaterial = new THREE.MeshBasicMaterial({
  color: "#172013",
  transparent: true,
  opacity: 0.24,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
});
function mat(color) {
  if (!matCache.has(color)) {
    matCache.set(
      color,
      new THREE.MeshStandardMaterial({
        color,
        flatShading: true,
        roughness: 0.9,
      }),
    );
  }
  return matCache.get(color);
}

/** Darken/lighten a #rrggbb color by factor f (0.8 = 20% darker). */
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.min(255, Math.max(0, Math.round(v * f)));
  const r = ch(n >> 16),
    g = ch((n >> 8) & 255),
    b = ch(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function box(w, h, d, color) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
  m.castShadow = true;
  return m;
}
function ball(r, color, ws = 7, hs = 5) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, ws, hs), mat(color));
  m.castShadow = true;
  return m;
}

/**
 * Build a dog from a customization object {breed, primary, secondary, pattern,
 * size, collar, accessory, name}. Returns { group, parts, mouth }.
 */
export function makeDog(custom) {
  const breed = resolveBreed(custom);
  const b = breed.build;
  const primary = custom.primary || breed.primary;
  const secondary = custom.secondary || breed.secondary;

  const root = new THREE.Group();
  const contactShadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.72, 20),
    contactShadowMaterial,
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.018;
  contactShadow.scale.set(0.72, 1.05, 1);
  const body = new THREE.Group();
  root.add(body);

  const hipY = b.legLen + b.bodyH / 2; // body centre height
  body.position.y = hipY;

  // ── torso ──
  const torso = box(b.bodyH * 0.95, b.bodyH, b.bodyLen, primary);
  body.add(torso);
  // rounded haunches + shoulders soften the box silhouette
  for (const sz of [-1, 1]) {
    const round = ball(b.bodyH * 0.52, primary, 7, 5);
    round.scale.set(0.95, 0.98, 1.0);
    round.position.set(0, 0, sz * (b.bodyLen / 2 - b.bodyH * 0.3));
    body.add(round);
  }
  // soft belly in the secondary tone
  const bellyMesh = ball(b.bodyH * 0.5, shade(secondary, 0.96), 7, 5);
  bellyMesh.scale.set(0.82, 0.5, b.bodyLen / (b.bodyH * 1.05));
  bellyMesh.position.y = -b.bodyH * 0.32;
  body.add(bellyMesh);
  if (b.fur === "fluffy") {
    const ruff = box(b.bodyH * 1.1, b.bodyH * 0.9, b.bodyLen * 0.4, primary);
    ruff.position.set(0, 0.02, b.bodyLen * 0.28);
    body.add(ruff);
  }
  if (b.fur === "curly") {
    for (let i = 0; i < 5; i++) {
      const puff = ball(b.bodyH * 0.32, primary);
      puff.position.set(
        (i % 2 ? 1 : -1) * 0.12,
        b.bodyH * 0.42,
        (i / 4 - 0.5) * b.bodyLen * 0.85,
      );
      body.add(puff);
    }
  }
  // chest patch (mask/socks breeds get a light chest)
  if (custom.pattern !== "none") {
    const chest = box(b.bodyH * 0.7, b.bodyH * 0.6, 0.1, secondary);
    chest.position.set(0, -b.bodyH * 0.15, b.bodyLen / 2 - 0.02);
    body.add(chest);
  }
  if (custom.pattern === "saddle") {
    const saddle = box(
      b.bodyH * 1.02,
      b.bodyH * 0.45,
      b.bodyLen * 0.55,
      secondary,
    );
    saddle.position.set(0, b.bodyH * 0.32, -b.bodyLen * 0.12);
    body.add(saddle);
  }
  if (custom.pattern === "spots") {
    const offs = [
      [0.4, 0.25, 0.2],
      [-0.42, 0.1, -0.25],
      [0.38, -0.05, -0.35],
      [-0.35, 0.3, 0.32],
    ];
    for (const [sx, sy, sz] of offs) {
      const spot = ball(b.bodyH * 0.22, secondary, 6, 4);
      spot.scale.set(1, 1, 1.4);
      spot.position.set(sx * b.bodyH * 0.55, sy * b.bodyH, sz * b.bodyLen);
      body.add(spot);
    }
  }

  // ── head (on a neck pivot so it can pitch for howl/dig) ──
  const headPivot = new THREE.Group();
  headPivot.position.set(0, b.bodyH * 0.42, b.bodyLen / 2 + 0.02);
  body.add(headPivot);

  const headColor = custom.pattern === "mask" ? secondary : primary;
  const head = ball(b.headR, primary, 8, 6);
  head.position.set(0, b.headR * 0.55, b.headR * 0.4);
  headPivot.add(head);
  if (custom.pattern === "mask") {
    // muzzle-side mask patch
    const maskPatch = ball(b.headR * 0.88, headColor, 8, 6);
    maskPatch.position.set(0, b.headR * 0.38, b.headR * 0.62);
    headPivot.add(maskPatch);
  }
  const snout = box(
    b.headR * 0.75,
    b.headR * 0.6,
    b.snoutLen + 0.08,
    custom.pattern === "none" ? primary : secondary,
  );
  snout.position.set(0, b.headR * 0.3, b.headR + b.snoutLen / 2);
  headPivot.add(snout);
  const nose = box(0.07, 0.06, 0.06, "#1c1a1a");
  nose.position.set(0, b.headR * 0.42, b.headR + b.snoutLen + 0.05);
  headPivot.add(nose);
  // cheeks round out the muzzle
  for (const side of [-1, 1]) {
    const cheek = ball(b.headR * 0.34, primary, 6, 4);
    cheek.position.set(side * b.headR * 0.42, b.headR * 0.3, b.headR * 0.72);
    headPivot.add(cheek);
  }
  // eyes (stored for blinking; tiny specular highlights make them feel alive)
  const eyes = [];
  for (const side of [-1, 1]) {
    const eye = ball(0.045, "#141414", 5, 4);
    eye.position.set(side * b.headR * 0.5, b.headR * 0.75, b.headR * 0.75);
    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.014, 4, 3),
      new THREE.MeshBasicMaterial({ color: "#ffffff" }),
    );
    shine.position.set(0.014, 0.016, 0.034);
    eye.add(shine);
    headPivot.add(eye);
    eyes.push(eye);
  }
  // tongue (hidden unless the animator shows it — happy/panting dogs)
  const tongue = box(b.headR * 0.3, 0.03, 0.2, "#e87a8a");
  tongue.position.set(0, b.headR * 0.08, b.headR + b.snoutLen * 0.6);
  tongue.userData.restZ = tongue.position.z;
  tongue.visible = false;
  headPivot.add(tongue);
  // ears
  const ears = [];
  for (const side of [-1, 1]) {
    let ear;
    if (b.ear === "pointy") {
      ear = new THREE.Mesh(
        new THREE.ConeGeometry(b.headR * 0.35, b.headR * 0.95, 4),
        mat(primary),
      );
      ear.position.set(side * b.headR * 0.55, b.headR * 1.35, 0);
    } else if (b.ear === "floppy") {
      ear = box(b.headR * 0.42, b.headR * 0.85, 0.09, primary);
      ear.position.set(side * b.headR * 0.75, b.headR * 0.85, 0);
      ear.rotation.z = side * 0.55;
    } else {
      // button
      ear = ball(b.headR * 0.3, primary, 5, 4);
      ear.position.set(side * b.headR * 0.6, b.headR * 1.15, 0);
    }
    ear.castShadow = true;
    ear.userData.restRotation = ear.rotation.clone();
    headPivot.add(ear);
    ears.push(ear);
  }

  // ── accessories ──
  if (custom.accessory === "hat") {
    const brim = new THREE.Mesh(
      new THREE.CylinderGeometry(b.headR * 0.95, b.headR * 0.95, 0.04, 8),
      mat("#c8342f"),
    );
    brim.position.set(0, b.headR * 1.28, b.headR * 0.3);
    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(
        b.headR * 0.55,
        b.headR * 0.6,
        b.headR * 0.5,
        8,
      ),
      mat("#c8342f"),
    );
    top.position.set(0, b.headR * 1.5, b.headR * 0.3);
    headPivot.add(brim, top);
  }
  if (custom.accessory === "glasses") {
    for (const side of [-1, 1]) {
      const lens = box(b.headR * 0.42, b.headR * 0.34, 0.05, "#15181f");
      lens.position.set(side * b.headR * 0.42, b.headR * 0.75, b.headR * 0.85);
      headPivot.add(lens);
    }
    const bridge = box(b.headR * 0.3, 0.04, 0.04, "#15181f");
    bridge.position.set(0, b.headR * 0.78, b.headR * 0.85);
    headPivot.add(bridge);
  }
  if (custom.accessory === "bandana") {
    const scarf = new THREE.Mesh(
      new THREE.ConeGeometry(b.headR * 0.8, b.headR * 0.9, 4),
      mat("#2f6fc8"),
    );
    scarf.rotation.x = Math.PI; // point hangs down over the chest
    scarf.position.set(0, -b.headR * 0.15, b.headR * 0.35);
    headPivot.add(scarf);
  }
  if (custom.collar) {
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(b.headR * 0.72, 0.05, 5, 10),
      mat(custom.collar),
    );
    collar.rotation.x = Math.PI / 2 - 0.35;
    collar.position.set(0, -b.headR * 0.05, 0.02);
    headPivot.add(collar);
  }

  // ── legs (hip pivots at torso corners; mesh hangs down) ──
  const legs = [];
  const legW = Math.min(0.16, b.bodyH * 0.3);
  const lx = b.bodyH * 0.42 - legW / 2;
  const lz = b.bodyLen / 2 - legW * 0.9;
  const legColor = custom.pattern === "socks" ? secondary : primary;
  for (const [sx, sz] of [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ]) {
    // FL FR BL BR
    const hip = new THREE.Group();
    hip.position.set(sx * lx, -b.bodyH / 2 + 0.05, sz * lz);
    const upper = box(legW, b.legLen * 0.65, legW, primary);
    upper.position.y = -b.legLen * 0.32;
    const lower = box(legW * 0.85, b.legLen * 0.45, legW * 0.85, legColor);
    lower.position.y = -b.legLen * 0.82;
    // little paw, slightly forward and a touch darker
    const paw = box(
      legW * 1.05,
      legW * 0.55,
      legW * 1.35,
      shade(legColor, 0.82),
    );
    paw.position.set(0, -b.legLen * 1.02, legW * 0.18);
    hip.add(upper, lower, paw);
    body.add(hip);
    legs.push(hip);
  }

  // ── tail ──
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, b.bodyH * 0.35, -b.bodyLen / 2);
  body.add(tailPivot);
  let tail;
  if (b.tail === "curled") {
    tail = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.055, 5, 8, Math.PI * 1.4),
      mat(primary),
    );
    tail.rotation.y = Math.PI / 2;
    tail.position.set(0, 0.14, -0.05);
  } else if (b.tail === "bob") {
    tail = ball(0.09, primary, 5, 4);
    tail.position.set(0, 0.05, -0.05);
  } else if (b.tail === "flag") {
    tail = box(0.09, 0.3, 0.14, secondary);
    tail.rotation.x = -0.9;
    tail.position.set(0, 0.12, -0.14);
  } else {
    // straight
    tail = box(0.07, 0.07, 0.38, primary);
    tail.rotation.x = -0.5;
    tail.position.set(0, 0.08, -0.16);
  }
  tail.castShadow = true;
  tailPivot.add(tail);

  // ── mouth anchor (held balls attach here; must match server mouthPos scale) ──
  const mouth = new THREE.Group();
  mouth.position.set(0, b.headR * 0.2, b.headR + b.snoutLen + 0.12);
  headPivot.add(mouth);

  const scale = breed.scale * (custom.size || 1);
  root.scale.setScalar(scale);

  return {
    group: root,
    parts: { body, headPivot, legs, tailPivot, hipY, eyes, tongue, ears },
    mouth,
    contactShadow,
    breed,
  };
}

// ─── NPC humans ──────────────────────────────────────────────────────────────

const SHIRTS = [
  "#c8574f",
  "#4f7fc8",
  "#57a06a",
  "#c8a24f",
  "#8a5fc8",
  "#4fb8c8",
  "#c86fa8",
  "#7a8a99",
];
const PANTS = ["#3a4152", "#5a4a3a", "#2e3e35", "#4a3a5a"];
const SKINS = ["#e8b48c", "#c88f62", "#8a5f3f", "#f0c8a0"];

/** Low-poly park human. Parts: legs[2], arms[2], torso — posed by animator. */
export function makeHuman(seed = 0) {
  const shirt = SHIRTS[seed % SHIRTS.length];
  const pant = PANTS[seed % PANTS.length];
  const skin = SKINS[seed % SKINS.length];

  const root = new THREE.Group();
  const torso = new THREE.Group();
  torso.position.y = 0.86;
  root.add(torso);

  const chest = box(0.42, 0.62, 0.24, shirt);
  chest.position.y = 0.31;
  torso.add(chest);
  const head = ball(0.16, skin, 7, 5);
  head.position.y = 0.75;
  torso.add(head);
  const hair = ball(
    0.165,
    seed % 3 === 0 ? "#3a2c1e" : seed % 3 === 1 ? "#1d1d22" : "#7a6a4a",
    7,
    5,
  );
  hair.scale.set(1, 0.72, 1);
  hair.position.set(0, 0.83, -0.03);
  torso.add(hair);

  const arms = [],
    legs = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.27, 0.58, 0);
    const armMesh = box(0.11, 0.5, 0.11, shirt);
    armMesh.position.y = -0.25;
    const hand = ball(0.06, skin, 5, 4);
    hand.position.y = -0.52;
    arm.add(armMesh, hand);
    torso.add(arm);
    arms.push(arm);

    const leg = new THREE.Group();
    leg.position.set(side * 0.12, 0, 0);
    const legMesh = box(0.14, 0.86, 0.14, pant);
    legMesh.position.y = -0.43;
    leg.add(legMesh);
    torso.add(leg);
    legs.push(leg);
  }

  return { group: root, parts: { torso, arms, legs } };
}

// ─── Squirrels ───────────────────────────────────────────────────────────────

const SQUIRREL_FURS = ["#a4623a", "#8a5230", "#b87a4a", "#6e4a34"];

/**
 * Low-poly park squirrel (faces +Z). Parts: body, headPivot, tailPivot —
 * posed by animator.animateSquirrel per server AI state.
 */
export function makeSquirrel(seed = 0) {
  const fur = SQUIRREL_FURS[seed % SQUIRREL_FURS.length];
  const belly = "#e8d5b8";

  const root = new THREE.Group();
  const body = new THREE.Group();
  body.position.y = 0.16;
  root.add(body);

  const torso = ball(0.14, fur, 7, 5);
  torso.scale.set(0.85, 0.9, 1.25);
  body.add(torso);
  const chest = ball(0.09, belly, 6, 4);
  chest.position.set(0, -0.02, 0.08);
  body.add(chest);

  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.1, 0.14);
  body.add(headPivot);
  const head = ball(0.095, fur, 7, 5);
  head.position.set(0, 0.03, 0.03);
  headPivot.add(head);
  const snout = ball(0.045, belly, 5, 4);
  snout.position.set(0, 0.0, 0.12);
  headPivot.add(snout);
  const nose = ball(0.018, "#2a1c14", 4, 3);
  nose.position.set(0, 0.005, 0.155);
  headPivot.add(nose);
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.07, 4), mat(fur));
    ear.position.set(side * 0.055, 0.12, 0.0);
    headPivot.add(ear);
    const eye = ball(0.016, "#141414", 4, 3);
    eye.position.set(side * 0.06, 0.05, 0.1);
    headPivot.add(eye);
  }

  // signature fluffy S-curve tail: stacked spheres on a pivot
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 0.04, -0.15);
  body.add(tailPivot);
  const tailCurve = [
    [0, 0.0, -0.06],
    [0, 0.06, -0.12],
    [0, 0.16, -0.14],
    [0, 0.26, -0.1],
    [0, 0.32, -0.02],
  ];
  tailCurve.forEach(([x, y, z], i) => {
    const seg = ball(0.05 + Math.sin((i / 4) * Math.PI) * 0.035, fur, 6, 4);
    seg.position.set(x, y, z);
    tailPivot.add(seg);
  });

  // tiny legs (kept static; hopping is body motion)
  for (const [sx, sz] of [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ]) {
    const leg = box(0.035, 0.09, 0.035, fur);
    leg.position.set(sx * 0.07, -0.13, sz * 0.09);
    body.add(leg);
  }

  return { group: root, parts: { body, headPivot, tailPivot } };
}

// ─── Floating name tags / chat bubbles (canvas sprites) ──────────────────────

export function makeTextSprite(
  text,
  {
    font = "600 26px system-ui",
    pad = 10,
    bg = "rgba(16,19,26,0.72)",
    fg = "#fff",
  } = {},
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width) + pad * 2;
  const h = 40 + pad;
  canvas.width = w;
  canvas.height = h;
  ctx.font = font;
  ctx.fillStyle = bg;
  roundRect(ctx, 0, 0, w, h, 12);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2 + 1);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }),
  );
  const s = 0.008;
  sprite.scale.set(w * s, h * s, 1);
  sprite.renderOrder = 10;
  return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
