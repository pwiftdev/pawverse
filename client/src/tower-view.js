// ─── Tower view ──────────────────────────────────────────────────────────────
// Renders the endless climb FROM shared/tower.js data: the floating island,
// the platform helix (instanced, windowed around the camera), an altitude-
// reactive sky with sun and stars, cloud layers, fog that breathes with the
// zones, and the leader's crown beacon. 100% procedural — no assets.

import * as THREE from "three";
import { ISLAND_RADIUS, MAX_ALTITUDE } from "../../shared/constants.js";
import {
  islandHeightAt,
  PLATFORMS,
  P_BOUNCY,
  P_ICE,
  P_REST,
  seedRng,
} from "../../shared/tower.js";

// ── Altitude zones (interpolated colour scheme) ──────────────────────────────

const ZONES = [
  // y     skyTop    horizon   fog       platTop   platSide  glow      hemi     sun
  {
    y: 0,
    top: 0x4fa8e8,
    hor: 0xcfe9f7,
    fog: 0xc9e4f5,
    pt: 0x5db56f,
    ps: 0x7d6648,
    gl: 0x9fe8ae,
    hemi: 0xbfe3ff,
    sun: 1.2,
  },
  {
    y: 130,
    top: 0x6fb0e0,
    hor: 0xf2f7fb,
    fog: 0xe8f1f8,
    pt: 0xaab8c4,
    ps: 0x6f7d8c,
    gl: 0xcfe0ee,
    hemi: 0xd8e8f5,
    sun: 1.05,
  },
  {
    y: 280,
    top: 0x8a5fae,
    hor: 0xffb36b,
    fog: 0xe8a87e,
    pt: 0xd29a73,
    ps: 0x8a5a48,
    gl: 0xffcf9e,
    hemi: 0xf5c9a0,
    sun: 0.95,
  },
  {
    y: 500,
    top: 0x2c2350,
    hor: 0x9a6fc0,
    fog: 0x5f4b85,
    pt: 0x8f7bf0,
    ps: 0x4b3da8,
    gl: 0xb8a9ff,
    hemi: 0x8a75b8,
    sun: 0.7,
  },
  {
    y: 800,
    top: 0x070b22,
    hor: 0x1b2547,
    fog: 0x131a35,
    pt: 0x37e0cf,
    ps: 0x156a78,
    gl: 0x66fff0,
    hemi: 0x2a3a5f,
    sun: 0.5,
  },
  {
    y: 1600,
    top: 0x02030c,
    hor: 0x0d1030,
    fog: 0x0a0d24,
    pt: 0xffd166,
    ps: 0x8a6d2f,
    gl: 0xffe9a8,
    hemi: 0x1c2038,
    sun: 0.45,
  },
];

const _a = new THREE.Color();
const _b = new THREE.Color();

/** Interpolated zone palette at altitude y. Reuses one scratch object. */
export function zoneAt(y, out = {}) {
  let i = 0;
  while (i < ZONES.length - 1 && y > ZONES[i + 1].y) i++;
  const za = ZONES[i];
  const zb = ZONES[Math.min(i + 1, ZONES.length - 1)];
  const span = Math.max(1, zb.y - za.y);
  const k = za === zb ? 0 : Math.min(1, Math.max(0, (y - za.y) / span));
  const kk = k * k * (3 - 2 * k);
  for (const key of ["top", "hor", "fog", "pt", "ps", "gl", "hemi"]) {
    _a.setHex(za[key]);
    _b.setHex(zb[key]);
    out[key] = (out[key] || new THREE.Color()).copy(_a).lerp(_b, kk);
  }
  out.sun = za.sun + (zb.sun - za.sun) * kk;
  return out;
}

// ── Sky dome shader (gradient + procedural stars + sun glow) ─────────────────

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const SKY_FRAG = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform float uStarK;
  uniform vec3 uSunDir;
  uniform float uSunK;
  varying vec3 vDir;

  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }

  void main() {
    float h = clamp(vDir.y, -1.0, 1.0);
    float t = smoothstep(-0.12, 0.55, h);
    vec3 col = mix(uHorizon, uTop, t);

    // sun disc + halo
    float sd = max(dot(vDir, uSunDir), 0.0);
    col += vec3(1.0, 0.92, 0.75) * pow(sd, 600.0) * 1.6 * uSunK;
    col += vec3(1.0, 0.85, 0.6) * pow(sd, 24.0) * 0.22 * uSunK;

    // stars — stable cells on the dome, twinkle-free, fade in with altitude
    vec3 cell = floor(vDir * 220.0);
    float star = step(0.9975, hash13(cell));
    float mag = hash13(cell + 7.0);
    col += vec3(0.85 + 0.15 * mag) * star * uStarK * (0.4 + 0.6 * mag)
         * smoothstep(0.0, 0.15, h + 0.2);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Cloud sea shader (soft fbm plane far below the island) ───────────────────

const SEA_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const SEA_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uTint;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec2 p = vUv * 26.0;
    float n = noise(p + uTime * 0.14) * 0.6
            + noise(p * 2.3 - uTime * 0.09) * 0.3
            + noise(p * 5.1 + uTime * 0.05) * 0.1;
    float edge = 1.0 - smoothstep(0.32, 0.5, distance(vUv, vec2(0.5)));
    float a = smoothstep(0.35, 0.75, n) * edge;
    vec3 col = mix(uTint * 0.85, vec3(1.0), n);
    gl_FragColor = vec4(col, a * 0.92);
  }
`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function cloudTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 6, 64, 64, 62);
  grad.addColorStop(0, "rgba(255,255,255,0.95)");
  grad.addColorStop(0.55, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _sv = new THREE.Vector3();
const _pv = new THREE.Vector3();
const _c = new THREE.Color();

// Platforms sorted by altitude for fast windowed rebuilds.
const SORTED = [...PLATFORMS].sort((a, b) => a.y - b.y);

const MAX_PLAT = 512;
const MAX_DECOR = 360;
const WINDOW_M = 150; // render platforms within ±this of the camera
const REBUILD_STEP = 24; // rebuild when the camera crosses a bucket this tall

export function createTowerView(scene) {
  const rng = seedRng("topple-view");

  // ── Sky ────────────────────────────────────────────────────────────────────
  const skyUniforms = {
    uTop: { value: new THREE.Color(ZONES[0].top) },
    uHorizon: { value: new THREE.Color(ZONES[0].hor) },
    uStarK: { value: 0 },
    uSunDir: { value: new THREE.Vector3(0.42, 0.52, -0.74).normalize() },
    uSunK: { value: 1 },
  };
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(440, 32, 16),
    new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  );
  sky.frustumCulled = false;
  scene.add(sky);

  scene.fog = new THREE.Fog(ZONES[0].fog, 55, 210);

  // ── Lights ─────────────────────────────────────────────────────────────────
  const hemi = new THREE.HemisphereLight(0xbfe3ff, 0x4a5568, 0.75);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff2dd, 1.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 140;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -30;
  sun.shadow.camera.right = sun.shadow.camera.top = 30;
  sun.shadow.bias = -0.0005;
  scene.add(sun, sun.target);

  // ── The floating island ────────────────────────────────────────────────────
  {
    const disc = new THREE.CircleGeometry(ISLAND_RADIUS, 56);
    disc.rotateX(-Math.PI / 2);
    const pos = disc.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const grass = new THREE.Color(0x5db56f);
    const grassHi = new THREE.Color(0x8fd98a);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        z = pos.getZ(i);
      const h = islandHeightAt(x, z) ?? 0;
      pos.setY(i, h);
      _c.copy(grass).lerp(grassHi, h / 1.6 + (rng() - 0.5) * 0.12);
      colors[i * 3] = _c.r;
      colors[i * 3 + 1] = _c.g;
      colors[i * 3 + 2] = _c.b;
    }
    disc.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    disc.computeVertexNormals();
    const island = new THREE.Mesh(
      disc,
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }),
    );
    island.receiveShadow = true;
    scene.add(island);

    // rocky underside
    const under = new THREE.Mesh(
      new THREE.ConeGeometry(ISLAND_RADIUS * 0.98, 20, 40, 4),
      new THREE.MeshStandardMaterial({
        color: 0x5c554f,
        roughness: 1,
        flatShading: true,
      }),
    );
    under.rotation.x = Math.PI;
    under.position.y = -10;
    scene.add(under);

    // grass tufts + rim rocks
    const tuftGeo = new THREE.ConeGeometry(0.09, 0.42, 5);
    const tuftMat = new THREE.MeshStandardMaterial({
      color: 0x7ccf77,
      roughness: 1,
    });
    const tufts = new THREE.InstancedMesh(tuftGeo, tuftMat, 160);
    for (let i = 0; i < 160; i++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * (ISLAND_RADIUS - 1.5);
      const x = Math.cos(a) * r,
        z = Math.sin(a) * r;
      _m.makeRotationY(rng() * Math.PI);
      _m.setPosition(x, (islandHeightAt(x, z) ?? 0) + 0.18, z);
      tufts.setMatrixAt(i, _m);
    }
    tufts.instanceMatrix.needsUpdate = true;
    scene.add(tufts);

    const rockGeo = new THREE.DodecahedronGeometry(0.7, 0);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x8a8578,
      roughness: 1,
      flatShading: true,
    });
    const rocks = new THREE.InstancedMesh(rockGeo, rockMat, 14);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + rng() * 0.4;
      const r = ISLAND_RADIUS - 1.4 - rng() * 2;
      const x = Math.cos(a) * r,
        z = Math.sin(a) * r;
      _q.setFromEuler(new THREE.Euler(rng() * 3, rng() * 3, rng() * 3));
      _sv.setScalar(0.5 + rng() * 0.9);
      _pv.set(x, (islandHeightAt(x, z) ?? 0) + 0.2, z);
      _m.compose(_pv, _q, _sv);
      rocks.setMatrixAt(i, _m);
    }
    rocks.instanceMatrix.needsUpdate = true;
    rocks.castShadow = true;
    scene.add(rocks);
  }

  // ── Platform instancing (windowed around the camera) ───────────────────────
  const sideGeo = new THREE.CylinderGeometry(0.94, 0.8, 0.5, 14);
  const topGeo = new THREE.CylinderGeometry(1, 0.97, 0.12, 14);
  const sideMat = new THREE.MeshStandardMaterial({
    roughness: 0.85,
    flatShading: true,
  });
  const topMat = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  const sideMesh = new THREE.InstancedMesh(sideGeo, sideMat, MAX_PLAT);
  const topMesh = new THREE.InstancedMesh(topGeo, topMat, MAX_PLAT);
  sideMesh.frustumCulled = topMesh.frustumCulled = false;
  topMesh.castShadow = true;
  topMesh.receiveShadow = true;
  scene.add(sideMesh, topMesh);

  // glow rings (rest platforms, bouncy pads, high-zone neon rims)
  const ringGeo = new THREE.TorusGeometry(1, 0.045, 8, 40);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ringMesh = new THREE.InstancedMesh(ringGeo, ringMat, 96);
  ringMesh.frustumCulled = false;
  scene.add(ringMesh);

  // decor: grass tufts low, crystals high
  const decorTuftMesh = new THREE.InstancedMesh(
    new THREE.ConeGeometry(0.07, 0.34, 5),
    new THREE.MeshStandardMaterial({ color: 0x7ccf77, roughness: 1 }),
    MAX_DECOR,
  );
  const crystalMesh = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(0.16, 0),
    new THREE.MeshStandardMaterial({
      color: 0xbcaeff,
      emissive: 0x7a5fff,
      emissiveIntensity: 0.9,
      roughness: 0.3,
    }),
    MAX_DECOR,
  );
  decorTuftMesh.frustumCulled = crystalMesh.frustumCulled = false;
  scene.add(decorTuftMesh, crystalMesh);

  const zoneScratch = {};
  let lastBucket = Infinity;

  function rebuild(camY) {
    const lo = camY - WINDOW_M;
    const hi = camY + WINDOW_M;
    let nPlat = 0,
      nRing = 0,
      nTuft = 0,
      nCrystal = 0;
    // binary search the window start in the sorted list
    let a = 0,
      b = SORTED.length;
    while (a < b) {
      const mid = (a + b) >> 1;
      if (SORTED[mid].y < lo) a = mid + 1;
      else b = mid;
    }
    for (let i = a; i < SORTED.length && SORTED[i].y <= hi; i++) {
      const p = SORTED[i];
      if (nPlat >= MAX_PLAT) break;
      const z = zoneAt(p.y, zoneScratch);
      const jag = 0.92 + (((p.i * 2654435761) % 100) / 100) * 0.16; // stable jitter

      // side
      _q.identity();
      _sv.set(p.r, 1, p.r);
      _pv.set(p.x, p.y - 0.25, p.z);
      _m.compose(_pv, _q, _sv);
      sideMesh.setMatrixAt(nPlat, _m);
      _c.copy(z.ps).multiplyScalar(jag);
      sideMesh.setColorAt(nPlat, _c);

      // top
      _pv.set(p.x, p.y - 0.06, p.z);
      _m.compose(_pv, _q, _sv);
      topMesh.setMatrixAt(nPlat, _m);
      if (p.type === P_BOUNCY) _c.setHex(0xff7edb);
      else if (p.type === P_ICE) _c.setHex(0xcfeaff);
      else _c.copy(z.pt).multiplyScalar(jag);
      topMesh.setColorAt(nPlat, _c);
      nPlat++;

      // glow ring for special platforms and the neon zones
      const neon = p.y > 700;
      if (
        nRing < 96 &&
        (p.type === P_REST || p.type === P_BOUNCY || (neon && p.type !== P_ICE))
      ) {
        _pv.set(p.x, p.y + 0.03, p.z);
        _sv.set(p.r * 1.02, 1, p.r * 1.02);
        _m.compose(_pv, _q, _sv);
        ringMesh.setMatrixAt(nRing, _m);
        if (p.type === P_REST) _c.setHex(0xffd166);
        else if (p.type === P_BOUNCY) _c.setHex(0xff9ae5);
        else _c.copy(z.gl);
        ringMesh.setColorAt(nRing, _c);
        nRing++;
      }

      // decor
      const drand = seedRng("decor" + p.i);
      if (p.y < 140 && p.type !== P_BOUNCY) {
        const n = 1 + Math.floor(drand() * 2);
        for (let d = 0; d < n && nTuft < MAX_DECOR; d++) {
          const a2 = drand() * Math.PI * 2;
          const rr = drand() * (p.r - 0.3);
          _q.setFromAxisAngle(_sv.set(0, 1, 0), drand() * Math.PI);
          _sv.setScalar(0.8 + drand() * 0.5);
          _pv.set(p.x + Math.cos(a2) * rr, p.y + 0.16, p.z + Math.sin(a2) * rr);
          _m.compose(_pv, _q, _sv);
          decorTuftMesh.setMatrixAt(nTuft++, _m);
        }
      } else if (p.y > 480 && p.y < 1600 && drand() < 0.55) {
        const a2 = drand() * Math.PI * 2;
        const rr = 0.3 + drand() * (p.r - 0.5);
        _q.setFromEuler(new THREE.Euler(drand(), drand() * 3, drand()));
        _sv.setScalar(0.7 + drand() * 0.9);
        _pv.set(p.x + Math.cos(a2) * rr, p.y + 0.18, p.z + Math.sin(a2) * rr);
        _m.compose(_pv, _q, _sv);
        crystalMesh.setMatrixAt(nCrystal++, _m);
      }
    }
    sideMesh.count = topMesh.count = nPlat;
    ringMesh.count = nRing;
    decorTuftMesh.count = nTuft;
    crystalMesh.count = nCrystal;
    sideMesh.instanceMatrix.needsUpdate = true;
    topMesh.instanceMatrix.needsUpdate = true;
    ringMesh.instanceMatrix.needsUpdate = true;
    decorTuftMesh.instanceMatrix.needsUpdate = true;
    crystalMesh.instanceMatrix.needsUpdate = true;
    if (sideMesh.instanceColor) sideMesh.instanceColor.needsUpdate = true;
    if (topMesh.instanceColor) topMesh.instanceColor.needsUpdate = true;
    if (ringMesh.instanceColor) ringMesh.instanceColor.needsUpdate = true;
  }

  // ── Clouds ─────────────────────────────────────────────────────────────────
  const cloudTex = cloudTexture();
  const cloudSea = new THREE.Mesh(
    new THREE.CircleGeometry(340, 40),
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTint: { value: new THREE.Color(0xdfeaf5) },
      },
      vertexShader: SEA_VERT,
      fragmentShader: SEA_FRAG,
      transparent: true,
      depthWrite: false,
    }),
  );
  cloudSea.rotation.x = -Math.PI / 2;
  cloudSea.position.y = -17;
  scene.add(cloudSea);

  const sprites = [];
  function addCloud(x, y, z, scale, opacity) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: cloudTex,
        transparent: true,
        opacity,
        depthWrite: false,
      }),
    );
    s.position.set(x, y, z);
    s.scale.set(scale, scale * 0.42, 1);
    s.userData.drift = 0.3 + Math.random() * 0.7;
    scene.add(s);
    sprites.push(s);
  }
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    const r = 30 + rng() * 90;
    addCloud(
      Math.cos(a) * r,
      -12 + rng() * 7,
      Math.sin(a) * r,
      22 + rng() * 26,
      0.75,
    );
  }
  for (let i = 0; i < 26; i++) {
    const a = rng() * Math.PI * 2;
    const r = 14 + rng() * 55;
    addCloud(
      Math.cos(a) * r,
      95 + rng() * 85,
      Math.sin(a) * r,
      16 + rng() * 22,
      0.5,
    );
  }

  // ── Leader beacon ──────────────────────────────────────────────────────────
  const beaconMat = new THREE.MeshBasicMaterial({
    color: 0xffd166,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const beacon = new THREE.Group();
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.9, 480, 12, 1, true),
    beaconMat,
  );
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.28, 480, 8, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xfff3cf,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  beacon.add(shaft, core);
  beacon.visible = false;
  scene.add(beacon);

  // ── Summit flag (the 5000 m legend) ────────────────────────────────────────
  {
    const top = SORTED[SORTED.length - 1];
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 3, 8),
      new THREE.MeshStandardMaterial({ color: 0xd8d8e0, metalness: 0.6 }),
    );
    pole.position.set(top.x, top.y + 1.5, top.z);
    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.85),
      new THREE.MeshBasicMaterial({ color: 0xffd166, side: THREE.DoubleSide }),
    );
    flag.position.set(top.x + 0.72, top.y + 2.55, top.z);
    scene.add(pole, flag);
  }

  const zc = {};
  let seaTime = 0;

  return {
    zoneAt,
    /** Per-frame: colours, fog, lights, clouds, platform window, beacon. */
    update(camPos, playerPos, dt) {
      sky.position.copy(camPos);
      const z = zoneAt(camPos.y, zc);
      skyUniforms.uTop.value.copy(z.top);
      skyUniforms.uHorizon.value.copy(z.hor);
      skyUniforms.uStarK.value = Math.min(
        1,
        Math.max(0, (camPos.y - 420) / 260) + (camPos.y > 1600 ? 0.15 : 0),
      );
      skyUniforms.uSunK.value = z.sun;
      scene.fog.color.copy(z.fog);
      const spaceK = Math.min(1, Math.max(0, (camPos.y - 600) / 300));
      scene.fog.near = 55 + spaceK * 45;
      scene.fog.far = 210 + spaceK * 140;
      hemi.color.copy(z.hemi);
      hemi.groundColor.copy(z.fog).multiplyScalar(0.6);
      sun.intensity = z.sun;
      sun.position.set(playerPos.x + 26, playerPos.y + 34, playerPos.z - 18);
      sun.target.position.set(playerPos.x, playerPos.y, playerPos.z);

      seaTime += dt;
      cloudSea.material.uniforms.uTime.value = seaTime;
      cloudSea.material.uniforms.uTint.value.copy(z.hor);
      for (const s of sprites) {
        s.position.x += s.userData.drift * dt;
        if (s.position.x > 160) s.position.x = -160;
      }

      const bucket = Math.floor(camPos.y / REBUILD_STEP);
      if (bucket !== lastBucket) {
        lastBucket = bucket;
        rebuild(camPos.y);
      }
    },

    /** Show/move the crown beacon (world pos array or null). */
    setBeacon(pos) {
      if (!pos) {
        beacon.visible = false;
        return;
      }
      beacon.visible = true;
      beacon.position.set(pos[0], pos[1] + 240, pos[2]);
    },
  };
}

export { MAX_ALTITUDE };
