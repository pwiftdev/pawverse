// ─── World scene ─────────────────────────────────────────────────────────────
// Builds the park/beach/yard visuals. Terrain height comes from the SAME
// shared/world.js functions the server simulates with, so what you see is
// exactly what you collide with. Everything procedural — no asset downloads.
//
// Visual tour: gradient sky dome + sun glow, vertex-colored terrain with a
// canvas grass texture (dirt paths baked along the NPC walking loops, a stone
// plaza around the fountain), custom animated water shader with shoreline
// foam, wind-swayed trees, instanced flowers/tufts/rocks/bushes, park benches,
// a fenced agility yard with props + dog house, drifting petals, butterflies
// and circling birds.

import * as THREE from "three";
import { WORLD_SIZE, WORLD_BOUND } from "../../shared/constants.js";
import {
  groundHeightAt,
  slopeAt,
  WATER_LEVEL,
  FOUNTAIN,
  BALL_SPAWNERS,
  TREAT_STANDS,
  FENCED_YARD,
  TREES,
  BENCHES,
  DOG_HOUSE,
  DIG_SPOTS,
  YARD_GATE,
  HOWL_ROCK,
  HOWL_STONES,
  pathDist,
} from "../../shared/world.js";
import { seedRng } from "../../shared/breeds.js";

export const PAD_COLORS = ["#e5533f", "#3f8fe5", "#46c46a", "#e5b53f"];

const GRASS = new THREE.Color("#58a14c");
const GRASS2 = new THREE.Color("#6fb75a");
const GRASS_CREST = new THREE.Color("#7cc065");
const SAND = new THREE.Color("#e6ca8d");
const SEABED = new THREE.Color("#b8a06a");
const DEEPBED = new THREE.Color("#7a8a5f");
const PATH = new THREE.Color("#cfb98a");
const PLAZA = new THREE.Color("#c7c0ae");
const ROCKFACE = new THREE.Color("#8d8d90");
const FOG_COLOR = "#d4e7f2";
const SUN_DIR = new THREE.Vector3(-0.55, 0.62, 0.35).normalize();

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// (dirt-path distance comes from shared/world.js — same mask the server uses)

/** True for open lawn where scatter may be planted. */
function isOpenGrass(x, z) {
  if (x > 50) return false; // beach
  if (Math.hypot(x - FOUNTAIN.x, z - FOUNTAIN.z) < FOUNTAIN.r + 2.5)
    return false;
  if (Math.hypot(x - FOUNTAIN.x, z - FOUNTAIN.z) < 11) return false; // plaza
  if (BALL_SPAWNERS.some((s) => Math.hypot(x - s.x, z - s.z) < 4.5))
    return false;
  if (TREAT_STANDS.some((s) => Math.hypot(x - s.x, z - s.z) < 4)) return false;
  if (pathDist(x, z) < 3.0) return false;
  return true;
}

// ── canvas texture helpers ──
function grassTexture() {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 256;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#f4f6ef";
  ctx.fillRect(0, 0, 256, 256);
  const rng = seedRng("grass-tex");
  for (let i = 0; i < 60; i++) {
    // soft blotches
    ctx.fillStyle = `rgba(${(120 + rng() * 60) | 0},${(140 + rng() * 50) | 0},${(90 + rng() * 40) | 0},0.05)`;
    ctx.beginPath();
    ctx.arc(rng() * 256, rng() * 256, 14 + rng() * 30, 0, 7);
    ctx.fill();
  }
  for (let i = 0; i < 4200; i++) {
    // speckle
    ctx.fillStyle = `rgba(${(70 + rng() * 90) | 0},${(95 + rng() * 90) | 0},${(55 + rng() * 60) | 0},${0.05 + rng() * 0.09})`;
    ctx.fillRect(rng() * 256, rng() * 256, 1.5, 1.5);
  }
  ctx.strokeStyle = "rgba(80,110,60,0.16)"; // tiny blades
  ctx.lineWidth = 1;
  for (let i = 0; i < 700; i++) {
    const x = rng() * 256,
      y = rng() * 256;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rng() - 0.5) * 2, y - 2 - rng() * 2.5);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(64, 64);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function stripesTexture() {
  const cv = document.createElement("canvas");
  cv.width = 64;
  cv.height = 64;
  const ctx = cv.getContext("2d");
  ctx.clearRect(0, 0, 64, 64);
  const grad = ctx.createLinearGradient(0, 0, 64, 0);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.65, "rgba(255,255,255,0.5)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 40);
  return tex;
}

function radialGlowTexture() {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const ctx = cv.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(255,246,220,1)");
  g.addColorStop(0.25, "rgba(255,238,190,0.55)");
  g.addColorStop(1, "rgba(255,238,190,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(cv);
}

function moonTexture() {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 128;
  const ctx = cv.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 20, 64, 64, 62);
  g.addColorStop(0, "rgba(238,242,250,1)");
  g.addColorStop(0.55, "rgba(220,228,244,0.95)");
  g.addColorStop(0.8, "rgba(190,205,235,0.35)");
  g.addColorStop(1, "rgba(190,205,235,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  // craters
  ctx.fillStyle = "rgba(165,180,215,0.5)";
  for (const [x, y, r] of [
    [48, 52, 7],
    [74, 44, 5],
    [62, 76, 8],
    [84, 68, 4],
    [42, 74, 4],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  }
  return new THREE.CanvasTexture(cv);
}

function signTexture(text) {
  const cv = document.createElement("canvas");
  cv.width = 256;
  cv.height = 96;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#8a6a48";
  ctx.fillRect(0, 0, 256, 96);
  ctx.strokeStyle = "#6a4a30";
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 248, 88);
  ctx.fillStyle = "#fff4e0";
  ctx.font = '700 38px "Avenir Next", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 52);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ── day/night palettes (lerped every frame by the world clock) ──
const PAL = {
  day: {
    zen: "#3f9be0",
    hor: "#d8ecf7",
    sun: "#fff3d0",
    fog: "#d4e7f2",
    deep: "#2a7cc2",
    shal: "#63c7e8",
  },
  dusk: {
    zen: "#51518f",
    hor: "#ff9e6b",
    sun: "#ffc27a",
    fog: "#e0a988",
    deep: "#3a5a92",
    shal: "#c97a5e",
  },
  night: {
    zen: "#0a0f2c",
    hor: "#1a2848",
    sun: "#bcd0ff",
    fog: "#101a2e",
    deep: "#0d2a4a",
    shal: "#1c4a6e",
  },
};

// ── sky dome + water shaders ──
function makeSky(sunDir) {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uZenith: { value: new THREE.Color("#3f9be0") },
      uHorizon: { value: new THREE.Color("#d8ecf7") },
      uSunDir: { value: sunDir },
      uSunColor: { value: new THREE.Color("#fff3d0") },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_Position.z = gl_Position.w; // pin to the far plane
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uZenith, uHorizon, uSunColor;
      uniform vec3 uSunDir;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = max(d.y, 0.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.55));
        float s = max(dot(d, normalize(uSunDir)), 0.0);
        col += uSunColor * (pow(s, 600.0) * 1.6 + pow(s, 24.0) * 0.22);
        col = mix(col, uSunColor * 0.92, pow(s, 3.0) * (1.0 - h) * 0.12);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(320, 32, 16), mat);
  sky.frustumCulled = false;
  sky.renderOrder = -10;
  return sky;
}

function makeWaterMaterial(sunDir) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#2a7cc2") },
      uShallow: { value: new THREE.Color("#63c7e8") },
      uSunDir: { value: sunDir },
      uFogColor: { value: new THREE.Color(FOG_COLOR) },
      uFogNear: { value: 70 },
      uFogFar: { value: 230 },
      uAlpha: { value: 0.78 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      float wave(vec2 p) {
        return sin(p.x * 0.35 + uTime * 1.1) * 0.055
             + sin(p.y * 0.42 - uTime * 0.9) * 0.045
             + sin((p.x + p.y) * 0.18 + uTime * 0.6) * 0.06;
      }
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        float w = wave(wp.xz);
        wp.y += w;
        float e = 0.6;
        float wx = wave(wp.xz + vec2(e, 0.0)) - w;
        float wz = wave(wp.xz + vec2(0.0, e)) - w;
        vNormalW = normalize(vec3(-wx / e, 1.0, -wz / e));
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uDeep, uShallow, uSunDir, uFogColor;
      uniform float uFogNear, uFogFar, uTime, uAlpha;
      varying vec3 vWorld;
      varying vec3 vNormalW;
      void main() {
        vec3 V = normalize(cameraPosition - vWorld);
        vec3 N = normalize(vNormalW);
        float fres = pow(1.0 - max(dot(N, V), 0.0), 2.0);
        vec3 col = mix(uDeep, uShallow, fres * 0.85 + 0.12);
        vec3 R = reflect(-normalize(uSunDir), N);
        float spec = pow(max(dot(R, V), 0.0), 90.0);
        col += vec3(1.0, 0.95, 0.8) * spec * 0.9;
        float sp = sin(vWorld.x * 3.1 + uTime * 2.0) * sin(vWorld.z * 2.7 - uTime * 1.7);
        col += vec3(0.06) * smoothstep(0.75, 1.0, sp);
        float dist = distance(cameraPosition, vWorld);
        col = mix(col, uFogColor, smoothstep(uFogNear, uFogFar, dist));
        gl_FragColor = vec4(col, uAlpha + fres * 0.15);
      }`,
  });
}

export function buildWorld(scene) {
  scene.fog = new THREE.Fog(FOG_COLOR, 70, 230);

  // The sun direction is MUTABLE — the day/night clock swings it across the
  // sky every frame. Sky + water shaders share this exact vector reference.
  const sunDir = SUN_DIR.clone();
  const sky = makeSky(sunDir);
  const skyMat = sky.material;
  scene.add(sky);

  // sun glow sprite
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialGlowTexture(),
      transparent: true,
      depthWrite: false,
      fog: false,
      toneMapped: false,
    }),
  );
  glow.scale.setScalar(150);
  glow.position.copy(sunDir).multiplyScalar(290);
  scene.add(glow);

  // ── lights ──
  const hemi = new THREE.HemisphereLight("#cfe8ff", "#4a6b3f", 0.85);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#ffedcc", 2.0);
  sun.position.copy(sunDir).multiplyScalar(140);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -95;
  sc.right = 95;
  sc.top = 95;
  sc.bottom = -95;
  sc.far = 320;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.6;
  scene.add(sun);

  // ── terrain (vertex heights from the shared height function) ──
  const seg = 150;
  const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, seg, seg);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const rng = seedRng("pawverse-terrain");
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      z = pos.getZ(i);
    const h = groundHeightAt(x, z);
    pos.setY(i, h);
    if (h < WATER_LEVEL - 0.05) {
      c.copy(SEABED).lerp(DEEPBED, smoothstep(-0.6, -2.2, h));
    } else {
      // lawn with per-vertex variation + lighter crests on the hills
      c.copy(GRASS).lerp(GRASS2, rng());
      c.lerp(GRASS_CREST, Math.min(0.6, Math.max(0, h * 0.55)));
      if (x < 56) {
        // stone plaza around the fountain
        const fd = Math.hypot(x - FOUNTAIN.x, z - FOUNTAIN.z);
        c.lerp(PLAZA, 1 - smoothstep(6.8, 9.5, fd));
        // dirt paths along the NPC loops
        c.lerp(PATH, (1 - smoothstep(1.9, 3.3, pathDist(x, z))) * 0.9);
      }
      // steep hillside faces read as exposed rock
      const sl = slopeAt(x, z);
      c.lerp(ROCKFACE, smoothstep(0.34, 0.62, sl) * 0.75);
      // blend to sand toward the beach
      c.lerp(SAND, smoothstep(50, 58, x));
    }
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const ground = new THREE.Mesh(
    geo,
    new THREE.MeshLambertMaterial({
      vertexColors: true,
      map: grassTexture(),
    }),
  );
  ground.receiveShadow = true;
  scene.add(ground);

  // ── sea + fountain water (shared animated shader) ──
  const waterMat = makeWaterMaterial(sunDir);
  const sea = new THREE.Mesh(
    new THREE.PlaneGeometry(WORLD_SIZE - 96, WORLD_SIZE, 48, 48),
    waterMat,
  );
  sea.rotation.x = -Math.PI / 2;
  sea.position.set(WORLD_SIZE / 2 - (WORLD_SIZE - 96) / 2, WATER_LEVEL, 0);
  scene.add(sea);
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(FOUNTAIN.r - 0.3, 24),
    waterMat,
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(FOUNTAIN.x, WATER_LEVEL + 0.18, FOUNTAIN.z);
  scene.add(pool);

  // shoreline foam band (the beach crosses the waterline near x ≈ 68.7)
  const foamTex = stripesTexture();
  const foam = new THREE.Mesh(
    new THREE.PlaneGeometry(4.5, WORLD_SIZE),
    new THREE.MeshBasicMaterial({
      color: "#eaf8ff",
      alphaMap: foamTex,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    }),
  );
  foam.rotation.x = -Math.PI / 2;
  foam.position.set(68.7, WATER_LEVEL + 0.04, 0);
  scene.add(foam);

  // ── fountain ──
  const stone = new THREE.MeshStandardMaterial({
    color: "#b9bcc5",
    flatShading: true,
    roughness: 0.9,
  });
  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(FOUNTAIN.r, 0.45, 6, 24),
    stone,
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.set(FOUNTAIN.x, 0.25, FOUNTAIN.z);
  rim.castShadow = true;
  scene.add(rim);
  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.7, 1.6, 8),
    stone,
  );
  pillar.position.set(FOUNTAIN.x, 0.4, FOUNTAIN.z);
  pillar.castShadow = true;
  scene.add(pillar);
  const bowl = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 0.7, 0.35, 10),
    stone,
  );
  bowl.position.set(FOUNTAIN.x, 1.3, FOUNTAIN.z);
  bowl.castShadow = true;
  scene.add(bowl);
  // spray: a cluster of tiny animated droplets
  const dropGeo = new THREE.SphereGeometry(0.06, 4, 3);
  const dropMat = new THREE.MeshBasicMaterial({
    color: "#cfeeff",
    transparent: true,
    opacity: 0.85,
  });
  const drops = new THREE.InstancedMesh(dropGeo, dropMat, 40);
  drops.position.set(FOUNTAIN.x, 0, FOUNTAIN.z);
  scene.add(drops);
  const dropSeeds = Array.from({ length: 40 }, (_, i) => ({
    a: (i / 40) * Math.PI * 2,
    sp: 0.7 + (i % 5) * 0.12,
    off: i * 0.13,
  }));

  // ── trees — rendered FROM the shared collision data (shared/world.js TREES)
  //    so every trunk you see is exactly a trunk you collide with ──
  const trunkMat = new THREE.MeshStandardMaterial({
    color: "#6a4a30",
    flatShading: true,
    roughness: 1,
  });
  const leafMats = [
    "#3f7d3a",
    "#4c8f3f",
    "#5f9c46",
    "#37703f",
    "#c87fa0",
    "#e0a0b8",
  ].map(
    (col) =>
      new THREE.MeshStandardMaterial({
        color: col,
        flatShading: true,
        roughness: 1,
      }),
  );
  const treeSway = [];
  for (const td of TREES) {
    const { x, z, h, layers, cherry, seed } = td;
    const gy = groundHeightAt(x, z);
    const tree = new THREE.Group();
    tree.position.set(x, gy, z);
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.28, h, 6),
      trunkMat,
    );
    trunk.position.y = h / 2;
    trunk.castShadow = true;
    tree.add(trunk);
    const leafMat =
      leafMats[cherry ? 4 + Math.floor(seed * 2) : Math.floor(seed * 4)];
    for (let l = 0; l < layers; l++) {
      const r = (1.6 - l * 0.4) * (0.8 + ((seed * 7.13 + l * 0.37) % 1) * 0.5);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, 1.6, 7), leafMat);
      cone.position.y = h + l * 1.0;
      cone.castShadow = true;
      tree.add(cone);
    }
    scene.add(tree);
    treeSway.push({ g: tree, phase: seed * Math.PI * 2 });
  }

  // ── fences (perimeter + dog-yard) ──
  const fenceMat = new THREE.MeshStandardMaterial({
    color: "#8a6a48",
    flatShading: true,
    roughness: 1,
  });
  const postGeo = new THREE.BoxGeometry(0.14, 1.0, 0.14);
  const posts = [];
  const addRail = (x1, z1, x2, z2) => {
    const len = Math.hypot(x2 - x1, z2 - z1);
    for (let d = 0; d <= len; d += 4) {
      const k = d / len;
      posts.push([x1 + (x2 - x1) * k, z1 + (z2 - z1) * k]);
    }
    for (const y of [0.45, 0.85]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.1, len),
        fenceMat,
      );
      rail.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
      rail.rotation.y = Math.atan2(x2 - x1, z2 - z1);
      scene.add(rail);
    }
  };
  const Wb = WORLD_BOUND + 1;
  addRail(-Wb, -Wb, Wb, -Wb);
  addRail(Wb, -Wb, Wb, Wb);
  addRail(Wb, Wb, -Wb, Wb);
  addRail(-Wb, Wb, -Wb, -Wb);
  // fenced yard with a gate gap on its east side (matches shared WALLS colliders)
  const Y = FENCED_YARD,
    hw = Y.w / 2,
    hd = Y.d / 2;
  addRail(Y.x - hw, Y.z - hd, Y.x + hw, Y.z - hd);
  addRail(Y.x - hw, Y.z + hd, Y.x + hw, Y.z + hd);
  addRail(Y.x - hw, Y.z - hd, Y.x - hw, Y.z + hd);
  addRail(Y.x + hw, Y.z - hd, Y.x + hw, Y.z + YARD_GATE.z1);
  addRail(Y.x + hw, Y.z + YARD_GATE.z2, Y.x + hw, Y.z + hd);
  const postMesh = new THREE.InstancedMesh(postGeo, fenceMat, posts.length);
  const m4 = new THREE.Matrix4();
  posts.forEach(([x, z], i) => {
    m4.setPosition(x, 0.5 + groundHeightAt(x, z), z);
    postMesh.setMatrixAt(i, m4);
  });
  postMesh.castShadow = true;
  scene.add(postMesh);

  // ── ball spawner pads ──
  for (const sp of BALL_SPAWNERS) {
    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.4, 0.12, 16),
      new THREE.MeshStandardMaterial({
        color: PAD_COLORS[sp.id % PAD_COLORS.length],
        flatShading: true,
        roughness: 0.8,
      }),
    );
    pad.position.set(sp.x, groundHeightAt(sp.x, sp.z) + 0.06, sp.z);
    pad.receiveShadow = true;
    scene.add(pad);
  }

  // ── treat stands ──
  for (const st of TREAT_STANDS) {
    const stand = new THREE.Group();
    const counter = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.0, 1.2),
      new THREE.MeshStandardMaterial({
        color: "#9c6b43",
        flatShading: true,
        roughness: 1,
      }),
    );
    counter.position.y = 0.5;
    counter.castShadow = true;
    stand.add(counter);
    for (const sx of [-1, 1]) {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 2.3, 6),
        fenceMat,
      );
      pole.position.set(sx * 1.1, 1.15, 0.5);
      stand.add(pole);
    }
    const awning = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.1, 1.7),
      new THREE.MeshStandardMaterial({
        color: "#d9534f",
        flatShading: true,
        roughness: 1,
      }),
    );
    awning.position.set(0, 2.35, 0.25);
    awning.rotation.x = -0.15;
    awning.castShadow = true;
    stand.add(awning);
    const bone = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.12, 0.5, 3, 6),
      new THREE.MeshStandardMaterial({ color: "#f5efdf", flatShading: true }),
    );
    bone.rotation.z = Math.PI / 2;
    bone.position.set(0, 1.25, 0.62);
    stand.add(bone);
    stand.position.set(st.x, groundHeightAt(st.x, st.z), st.z);
    scene.add(stand);
  }

  // ── park benches ──
  const benchAt = (x, z, ry) => {
    const b = new THREE.Group();
    const wood = fenceMat;
    for (const sx of [-0.75, 0.75]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.5), wood);
      leg.position.set(sx, 0.22, 0);
      b.add(leg);
    }
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.07, 0.5), wood);
    seat.position.y = 0.46;
    seat.castShadow = true;
    b.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 0.06), wood);
    back.position.set(0, 0.78, -0.24);
    back.rotation.x = -0.15;
    back.castShadow = true;
    b.add(back);
    b.position.set(x, groundHeightAt(x, z), z);
    b.rotation.y = ry;
    scene.add(b);
  };
  for (const b of BENCHES) benchAt(b.x, b.z, b.ry); // shared data = collidable

  // ── agility yard props + dog house + gate sign ──
  {
    // jump hoop
    const hoop = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.06, 6, 18),
      new THREE.MeshStandardMaterial({
        color: "#d9534f",
        flatShading: true,
        roughness: 0.8,
      }),
    );
    ring.position.y = 0.85;
    ring.castShadow = true;
    hoop.add(ring);
    for (const sx of [-0.8, 0.8]) {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 1.5, 6),
        fenceMat,
      );
      pole.position.set(sx, 0.75, 0);
      pole.castShadow = true;
      hoop.add(pole);
    }
    hoop.position.set(-45, groundHeightAt(-45, -10), -10);
    hoop.rotation.y = 0.4;
    scene.add(hoop);

    // A-frame ramp
    const rampMat = new THREE.MeshStandardMaterial({
      color: "#3f8fe5",
      flatShading: true,
      roughness: 0.9,
    });
    const aframe = new THREE.Group();
    for (const side of [-1, 1]) {
      const ramp = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.09, 2.3),
        rampMat,
      );
      ramp.position.set(0, 0.62, side * 0.98);
      ramp.rotation.x = side * 0.62;
      ramp.castShadow = true;
      aframe.add(ramp);
    }
    aframe.position.set(-62, groundHeightAt(-62, 8), 8);
    aframe.rotation.y = -0.3;
    scene.add(aframe);

    // weave poles
    const weave = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 1.1, 6),
        new THREE.MeshStandardMaterial({
          color: i % 2 ? "#e5b53f" : "#3f8fe5",
          flatShading: true,
          roughness: 0.8,
        }),
      );
      pole.position.set(i * 0.85, 0.55, 0);
      pole.castShadow = true;
      weave.add(pole);
    }
    weave.position.set(-50, groundHeightAt(-50, 16), 16);
    weave.rotation.y = 1.1;
    scene.add(weave);

    // dog house
    const house = new THREE.Group();
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.15, 1.5),
      new THREE.MeshStandardMaterial({
        color: "#b0713c",
        flatShading: true,
        roughness: 1,
      }),
    );
    walls.position.y = 0.58;
    walls.castShadow = true;
    house.add(walls);
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.45, 0.8, 4),
      new THREE.MeshStandardMaterial({
        color: "#8a3d33",
        flatShading: true,
        roughness: 1,
      }),
    );
    roof.position.y = 1.55;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    house.add(roof);
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.7, 0.06),
      new THREE.MeshStandardMaterial({ color: "#2a1f18", roughness: 1 }),
    );
    door.position.set(0, 0.36, 0.76);
    house.add(door);
    house.position.set(
      DOG_HOUSE.x,
      groundHeightAt(DOG_HOUSE.x, DOG_HOUSE.z),
      DOG_HOUSE.z,
    );
    house.rotation.y = DOG_HOUSE.ry;
    scene.add(house);

    // PAW PARK sign at the yard gate
    const sign = new THREE.Group();
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 2.0, 6),
        fenceMat,
      );
      post.position.set(sx * 1.05, 1.0, 0);
      post.castShadow = true;
      sign.add(post);
    }
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.85, 0.08),
      new THREE.MeshStandardMaterial({
        map: signTexture("🐾 PAW PARK"),
        roughness: 1,
      }),
    );
    board.position.y = 1.75;
    board.castShadow = true;
    sign.add(board);
    sign.position.set(Y.x + hw + 1.2, groundHeightAt(Y.x + hw + 1.2, -7), -7);
    sign.rotation.y = Math.PI / 2;
    scene.add(sign);
  }

  // ── scatter: grass tufts, flowers, rocks, bushes (instanced) ──
  const dummy = new THREE.Object3D();
  const scRng = seedRng("pawverse-scatter");
  const scatterOn = (mesh, count, place) => {
    let i = 0,
      guard = 0;
    while (i < count && guard++ < count * 40) {
      const x = (scRng() * 2 - 1) * (WORLD_BOUND - 3);
      const z = (scRng() * 2 - 1) * (WORLD_BOUND - 3);
      if (!place(x, z, i)) continue;
      mesh.setMatrixAt(i, dummy.matrix);
      if (mesh.setColorAt && mesh.userData.colors) {
        mesh.setColorAt(
          i,
          mesh.userData.colors[
            Math.floor(scRng() * mesh.userData.colors.length)
          ],
        );
      }
      i++;
    }
    mesh.count = i;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);
  };

  {
    // grass tufts
    const tuft = new THREE.InstancedMesh(
      new THREE.ConeGeometry(0.055, 0.24, 4),
      new THREE.MeshLambertMaterial({ flatShading: true }),
      550,
    );
    tuft.userData.colors = ["#69b457", "#5da24e", "#7cc065", "#4c8f3f"].map(
      (c2) => new THREE.Color(c2),
    );
    scatterOn(tuft, 550, (x, z) => {
      if (!isOpenGrass(x, z)) return false;
      dummy.position.set(x, groundHeightAt(x, z) + 0.1, z);
      dummy.rotation.set(0, scRng() * Math.PI, 0);
      dummy.scale.setScalar(0.7 + scRng() * 0.9);
      dummy.updateMatrix();
      return true;
    });
  }
  {
    // flowers
    const flower = new THREE.InstancedMesh(
      new THREE.ConeGeometry(0.075, 0.17, 5),
      new THREE.MeshLambertMaterial({ flatShading: true }),
      240,
    );
    flower.userData.colors = [
      "#ff8fb3",
      "#ffd166",
      "#f5f5f5",
      "#c9a6ff",
      "#ff9c6b",
    ].map((c2) => new THREE.Color(c2));
    scatterOn(flower, 240, (x, z) => {
      if (!isOpenGrass(x, z)) return false;
      dummy.position.set(x, groundHeightAt(x, z) + 0.14, z);
      dummy.rotation.set(0, scRng() * Math.PI, 0);
      dummy.scale.setScalar(0.8 + scRng() * 0.7);
      dummy.updateMatrix();
      return true;
    });
  }
  {
    // rocks (some on the beach)
    const rock = new THREE.InstancedMesh(
      new THREE.DodecahedronGeometry(0.3, 0),
      new THREE.MeshStandardMaterial({ flatShading: true, roughness: 1 }),
      48,
    );
    rock.castShadow = true;
    rock.userData.colors = ["#9a9aa2", "#8a8a92", "#aaa89e", "#7d7d85"].map(
      (c2) => new THREE.Color(c2),
    );
    scatterOn(rock, 48, (x, z) => {
      const onBeach = x > 52 && x < 78;
      if (!onBeach && !isOpenGrass(x, z)) return false;
      dummy.position.set(x, groundHeightAt(x, z) + 0.08, z);
      dummy.rotation.set(scRng() * 3, scRng() * 3, scRng() * 3);
      dummy.scale.set(
        0.6 + scRng() * 1.8,
        0.5 + scRng() * 0.9,
        0.6 + scRng() * 1.8,
      );
      dummy.updateMatrix();
      return true;
    });
  }
  {
    // bushes, favoring the fence line
    const bush = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.MeshStandardMaterial({ flatShading: true, roughness: 1 }),
      52,
    );
    bush.castShadow = true;
    bush.userData.colors = ["#3f7d3a", "#4c8f3f", "#37703f", "#2f6b33"].map(
      (c2) => new THREE.Color(c2),
    );
    scatterOn(bush, 52, (x, z) => {
      const nearFence = Math.max(Math.abs(x), Math.abs(z)) > 78;
      if (!nearFence && !isOpenGrass(x, z)) return false;
      if (x > 48) return false;
      if (Math.hypot(x - FOUNTAIN.x, z - FOUNTAIN.z) < 12) return false;
      dummy.position.set(x, groundHeightAt(x, z) + 0.3, z);
      dummy.rotation.set(0, scRng() * Math.PI, 0);
      dummy.scale.set(
        0.8 + scRng() * 1.1,
        0.55 + scRng() * 0.5,
        0.8 + scRng() * 1.1,
      );
      dummy.updateMatrix();
      return true;
    });
  }

  // ── buried-treasure dig mounds (buried state driven by the server) ──
  const moundMat = new THREE.MeshStandardMaterial({
    color: "#7a5a3c",
    flatShading: true,
    roughness: 1,
  });
  const moundDugMat = new THREE.MeshStandardMaterial({
    color: "#5c452f",
    flatShading: true,
    roughness: 1,
  });
  const sparkMat = new THREE.MeshBasicMaterial({
    color: "#ffe28a",
    transparent: true,
    depthWrite: false,
  });
  const digMounds = new Map(); // spotId → { mound, spark, holeRing }
  for (const spot of DIG_SPOTS) {
    const gy = groundHeightAt(spot.x, spot.z);
    const mound = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 8, 5),
      moundMat,
    );
    mound.scale.set(1, 0.36, 1);
    mound.position.set(spot.x, gy + 0.02, spot.z);
    mound.castShadow = true;
    scene.add(mound);
    // little pawprints of loose dirt around it
    for (let i = 0; i < 3; i++) {
      const crumb = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.09, 0),
        moundMat,
      );
      const a = (i / 3) * Math.PI * 2 + spot.id;
      crumb.position.set(
        spot.x + Math.cos(a) * 1.0,
        gy + 0.05,
        spot.z + Math.sin(a) * 1.0,
      );
      scene.add(crumb);
    }
    // hovering sparkle = "something's buried here!"
    const spark = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.13, 0),
      sparkMat,
    );
    spark.position.set(spot.x, gy + 1.0, spot.z);
    scene.add(spark);
    digMounds.set(spot.id, { mound, spark, baseY: gy });
  }

  /** Called with net.digs (spotId → 1|0) whenever the server updates them. */
  function updateDigs(digsMap) {
    for (const [id, rec] of digMounds) {
      const buried = digsMap.get(id) !== 0; // default to "buried" pre-welcome
      rec.spark.visible = buried;
      rec.mound.material = buried ? moundMat : moundDugMat;
      rec.mound.scale.y = buried ? 0.36 : 0.14; // dug-out mounds look emptied
    }
  }

  // ── Howl Rock — stone slab on Sunset Hill's summit (howl here → park echo) ──
  {
    const rockMat = new THREE.MeshStandardMaterial({
      color: "#7d7f8a",
      flatShading: true,
      roughness: 1,
    });
    const summitY = groundHeightAt(HOWL_ROCK.x, HOWL_ROCK.z);
    // low slab — reads as a step, so dogs standing "on" it look right
    const slab = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 3.2, 0.34, 9),
      rockMat,
    );
    slab.position.set(HOWL_ROCK.x, summitY + 0.17, HOWL_ROCK.z);
    slab.castShadow = true;
    slab.receiveShadow = true;
    scene.add(slab);
    // ring of standing stones (positions/colliders live in shared/world.js)
    for (const s of HOWL_STONES) {
      const stone = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, s.h, 0.4),
        rockMat,
      );
      stone.position.set(s.x, groundHeightAt(s.x, s.z) + s.h / 2 - 0.05, s.z);
      stone.rotation.y = s.a;
      stone.castShadow = true;
      scene.add(stone);
    }
    // carved moon glyph that glows at night
    const glyphMat = new THREE.MeshStandardMaterial({
      color: "#3c3f4c",
      emissive: "#8fb8ff",
      emissiveIntensity: 0,
    });
    const glyph = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.1, 6, 20, Math.PI * 1.25),
      glyphMat,
    );
    glyph.rotation.set(-Math.PI / 2, 0, 0.6);
    glyph.position.set(HOWL_ROCK.x, summitY + 0.72, HOWL_ROCK.z);
    scene.add(glyph);
    var howlGlyphMat = glyphMat; // hoisted for update()
  }

  // ── night sky: stars + moon ──
  const starGeo = new THREE.BufferGeometry();
  {
    const starRng = seedRng("pawverse-stars");
    const pts = [];
    for (let i = 0; i < 420; i++) {
      const az = starRng() * Math.PI * 2;
      const el = Math.asin(starRng() * 0.95 + 0.05);
      pts.push(
        300 * Math.cos(el) * Math.cos(az),
        300 * Math.sin(el),
        300 * Math.cos(el) * Math.sin(az),
      );
    }
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  }
  const starMat = new THREE.PointsMaterial({
    color: "#cfe0ff",
    size: 1.7,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    fog: false,
    depthWrite: false,
  });
  const stars = new THREE.Points(starGeo, starMat);
  stars.frustumCulled = false;
  scene.add(stars);

  const moon = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: moonTexture(),
      transparent: true,
      depthWrite: false,
      fog: false,
      toneMapped: false,
      opacity: 0,
    }),
  );
  moon.scale.setScalar(34);
  scene.add(moon);

  // ── lamp posts (glow + real light at night) ──
  const lamps = [];
  {
    const poleMat = new THREE.MeshStandardMaterial({
      color: "#2e3440",
      flatShading: true,
      roughness: 0.8,
    });
    const bulbMat = new THREE.MeshStandardMaterial({
      color: "#ffe8c0",
      emissive: "#ffc98a",
      emissiveIntensity: 0,
    });
    const lampSpots = [
      [10, 4],
      [-10, -4],
      [4, -10],
      [-4, 10], // fountain plaza ring
      [-29, -7], // yard gate
      [-15, -17],
      [25, 12], // treat stands
    ];
    for (const [lx, lz] of lampSpots) {
      const gy = groundHeightAt(lx, lz);
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.09, 2.7, 6),
        poleMat,
      );
      pole.position.set(lx, gy + 1.35, lz);
      pole.castShadow = true;
      scene.add(pole);
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 8, 6),
        bulbMat,
      );
      bulb.position.set(lx, gy + 2.75, lz);
      scene.add(bulb);
      const halo = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: radialGlowTexture(),
          color: "#ffcf96",
          transparent: true,
          depthWrite: false,
          opacity: 0,
        }),
      );
      halo.scale.setScalar(3.2);
      halo.position.copy(bulb.position);
      scene.add(halo);
      const light = new THREE.PointLight("#ffc98a", 0, 15, 2);
      light.position.set(lx, gy + 2.6, lz);
      light.visible = false;
      scene.add(light);
      lamps.push({ bulbMat, halo, light });
    }
  }

  // ── fireflies (night only, drifting near the lawn) ──
  const FIREFLIES = 36;
  const fireflyMat = new THREE.MeshBasicMaterial({
    color: "#d9ffa0",
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: false,
  });
  const fireflies = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.05, 4, 3),
    fireflyMat,
    FIREFLIES,
  );
  fireflies.frustumCulled = false;
  const fireflySeeds = [];
  for (let i = 0; i < FIREFLIES; i++) {
    fireflySeeds.push({
      x: (scRng() * 2 - 1) * 70,
      z: (scRng() * 2 - 1) * 70,
      ph: scRng() * 20,
      sp: 0.4 + scRng() * 0.5,
    });
  }
  scene.add(fireflies);

  // ── clouds ──
  const cloudMat = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.85,
    fog: false,
  });
  const clouds = [];
  const cloudRng = seedRng("pawverse-clouds");
  for (let i = 0; i < 12; i++) {
    const cl = new THREE.Group();
    for (let p = 0; p < 4 + Math.floor(cloudRng() * 3); p++) {
      const puff = new THREE.Mesh(
        new THREE.SphereGeometry(3 + cloudRng() * 4.5, 7, 5),
        cloudMat,
      );
      puff.scale.y = 0.5;
      puff.position.set((p - 2) * 4.2, cloudRng() * 1.6, cloudRng() * 3.5);
      cl.add(puff);
    }
    cl.position.set(
      (cloudRng() * 2 - 1) * 170,
      46 + cloudRng() * 20,
      (cloudRng() * 2 - 1) * 170,
    );
    scene.add(cl);
    clouds.push(cl);
  }

  // ── butterflies ──
  const butterflies = [];
  const bColors = ["#ffb3d1", "#ffe08a", "#c9a6ff", "#9ad1ff", "#ffc29a"];
  for (let i = 0; i < 7; i++) {
    const b = new THREE.Group();
    const wingMat = new THREE.MeshBasicMaterial({
      color: bColors[i % bColors.length],
      side: THREE.DoubleSide,
    });
    const wings = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group();
      const wing = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.12), wingMat);
      wing.position.x = side * 0.09;
      wing.rotation.x = -Math.PI / 2;
      pivot.add(wing);
      b.add(pivot);
      wings.push(pivot);
    }
    const anchor = {
      x: (scRng() * 2 - 1) * 60,
      z: (scRng() * 2 - 1) * 60,
    };
    scene.add(b);
    butterflies.push({
      g: b,
      wings,
      anchor,
      phase: scRng() * 20,
      speed: 0.5 + scRng() * 0.5,
    });
  }

  // ── birds ──
  const birds = [];
  for (let i = 0; i < 3; i++) {
    const b = new THREE.Group();
    const bodyMat = new THREE.MeshBasicMaterial({ color: "#3a4a5a" });
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.42, 5), bodyMat);
    body.rotation.x = Math.PI / 2;
    b.add(body);
    const wings = [];
    for (const side of [-1, 1]) {
      const wing = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.02, 0.16),
        bodyMat,
      );
      wing.position.x = side * 0.3;
      b.add(wing);
      wings.push(wing);
    }
    scene.add(b);
    birds.push({
      g: b,
      wings,
      cx: (scRng() * 2 - 1) * 60,
      cz: (scRng() * 2 - 1) * 60,
      r: 22 + scRng() * 20,
      h: 20 + scRng() * 12,
      speed: (0.12 + scRng() * 0.08) * (i % 2 ? 1 : -1),
      phase: scRng() * 9,
    });
  }

  // ── drifting petals / pollen ──
  const PETALS = 64;
  const petalMesh = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(0.1, 0.1),
    new THREE.MeshBasicMaterial({
      color: "#ffeef4",
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
    PETALS,
  );
  petalMesh.frustumCulled = false;
  const petals = [];
  for (let i = 0; i < PETALS; i++) {
    petals.push({
      x: (scRng() * 2 - 1) * 100,
      y: 0.4 + scRng() * 3.2,
      z: (scRng() * 2 - 1) * 100,
      ph: scRng() * 9,
      spin: scRng() * 2 + 0.5,
    });
  }
  scene.add(petalMesh);

  // ── per-frame animation ──
  let t = 0;
  const reactions = [];
  const cA = new THREE.Color(),
    cB = new THREE.Color(); // scratch colors
  const lerpPal = (key, duskK, nightK) => {
    cA.set(PAL.day[key]).lerp(cB.set(PAL.dusk[key]), duskK);
    return cA.lerp(cB.set(PAL.night[key]), nightK);
  };

  /**
   * @param dt    seconds
   * @param phase world-clock phase 0..1 — 0 sunrise, 0.25 noon, 0.5 sunset,
   *              0.75 midnight. Defaults to a pleasant late morning.
   * @returns nightK (0 day → 1 night) so callers can sync audio etc.
   */
  function update(dt, phase = 0.18) {
    t += dt;
    for (let i = reactions.length - 1; i >= 0; i--) {
      reactions[i].age += dt;
      if (reactions[i].age > 2.2) reactions.splice(i, 1);
    }

    // ── celestial mechanics ──
    const a = phase * Math.PI * 2;
    const el = Math.sin(a); // sun elevation −1..1
    const nightK = smoothstep(0.06, -0.14, el); // 0 day → 1 night
    const duskK = (1 - nightK) * smoothstep(0.45, 0.1, Math.abs(el)); // sunrise/sunset band

    // Sun rises over the sea (+x) and sets behind the yard (−x).
    sunDir.set(Math.cos(a), Math.max(el, 0.02) * 0.95 + 0.03, 0.35).normalize();
    if (nightK < 0.5) {
      sun.position.copy(sunDir).multiplyScalar(140);
      sun.color.set("#ffedcc").lerp(cB.set("#ff9e5e"), duskK);
      sun.intensity =
        0.15 + (1 - nightK) * 1.85 * (0.35 + 0.65 * Math.max(0, el));
    } else {
      // the moon takes over as the shadow-casting light — cool and dim
      sun.position.set(-sunDir.x * 120, 80, -20);
      sun.color.set("#9ab8ff");
      sun.intensity = 0.35;
    }
    hemi.intensity = 0.22 + (1 - nightK) * 0.65;
    hemi.color.set("#cfe8ff").lerp(cB.set("#2a3a5e"), nightK);

    // sky + fog + water palettes
    skyMat.uniforms.uZenith.value.copy(lerpPal("zen", duskK, nightK));
    skyMat.uniforms.uHorizon.value.copy(lerpPal("hor", duskK, nightK));
    skyMat.uniforms.uSunColor.value.copy(lerpPal("sun", duskK, nightK));
    scene.fog.color.copy(lerpPal("fog", duskK, nightK));
    waterMat.uniforms.uFogColor.value.copy(scene.fog.color);
    waterMat.uniforms.uDeep.value.copy(lerpPal("deep", duskK, nightK));
    waterMat.uniforms.uShallow.value.copy(lerpPal("shal", duskK, nightK));

    // sun glow / moon / stars
    glow.position.copy(sunDir).multiplyScalar(290);
    glow.material.opacity = Math.max(0, 1 - nightK * 1.6);
    moon.position.set(
      -sunDir.x * 280,
      Math.max(0.12, -el * 0.9 + 0.15) * 280 * 0.5 + 40,
      -90,
    );
    moon.material.opacity = nightK;
    starMat.opacity = nightK * 0.9;
    cloudMat.color.set("#ffffff").lerp(cB.set("#27314e"), nightK);
    foam.material.color.set("#eaf8ff").lerp(cB.set("#5a7a9e"), nightK);

    // lamps + Howl Rock glyph + fireflies wake at night
    for (const lamp of lamps) {
      lamp.bulbMat.emissiveIntensity = nightK * 1.6;
      lamp.halo.material.opacity = nightK * 0.75;
      lamp.light.visible = nightK > 0.05;
      lamp.light.intensity = nightK * 14;
    }
    howlGlyphMat.emissiveIntensity = nightK * (1.1 + Math.sin(t * 1.8) * 0.35);
    fireflyMat.opacity = nightK * 0.95;
    if (nightK > 0.02) {
      for (let i = 0; i < FIREFLIES; i++) {
        const f = fireflySeeds[i];
        const ft = t * f.sp + f.ph;
        const x = f.x + Math.sin(ft * 0.7) * 4 + Math.sin(ft * 1.9) * 1.2;
        const z = f.z + Math.cos(ft * 0.5) * 4 + Math.cos(ft * 2.3) * 1.2;
        dummy.position.set(
          x,
          groundHeightAt(x, z) + 0.7 + Math.sin(ft * 1.3) * 0.4,
          z,
        );
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(0.7 + Math.sin(ft * 6) * 0.45); // twinkle
        dummy.updateMatrix();
        fireflies.setMatrixAt(i, dummy.matrix);
      }
      fireflies.instanceMatrix.needsUpdate = true;
    }
    fireflies.visible = nightK > 0.02;

    // daytime-only life
    for (const b of butterflies) b.g.visible = nightK < 0.5;
    for (const b of birds) b.g.visible = nightK < 0.5;

    waterMat.uniforms.uTime.value = t;
    foamTex.offset.y = (t * 0.025) % 1;
    foam.material.opacity = 0.36 + Math.sin(t * 0.8) * 0.1;
    foam.position.y = WATER_LEVEL + 0.04 + Math.sin(t * 0.9) * 0.035;

    for (let i = 0; i < dropSeeds.length; i++) {
      const d = dropSeeds[i];
      const ph = (t * d.sp + d.off) % 1;
      const r = ph * 1.6;
      dummy.position.set(
        Math.cos(d.a) * r,
        1.55 + ph * 2.2 - ph * ph * 4.4,
        Math.sin(d.a) * r,
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      drops.setMatrixAt(i, dummy.matrix);
    }
    drops.instanceMatrix.needsUpdate = true;

    for (const cl of clouds) {
      cl.position.x += dt * 0.7;
      if (cl.position.x > 200) cl.position.x = -200;
    }

    const wind = 0.65 + Math.sin(t * 0.11) * 0.25 + Math.sin(t * 0.037) * 0.2;
    for (const { g, phase } of treeSway) {
      g.rotation.z = Math.sin(t * 0.7 + phase) * 0.018 * wind;
      g.rotation.x = Math.cos(t * 0.55 + phase) * 0.011 * wind;
    }

    for (const b of butterflies) {
      const bt = t * b.speed + b.phase;
      let x = b.anchor.x + Math.sin(bt * 0.9) * 5 + Math.sin(bt * 2.3) * 1.2;
      let z = b.anchor.z + Math.cos(bt * 0.7) * 5 + Math.cos(bt * 1.9) * 1.2;
      for (const reaction of reactions) {
        const dx2 = x - reaction.x,
          dz2 = z - reaction.z;
        const distance = Math.hypot(dx2, dz2) || 1;
        const force =
          Math.max(0, 1 - distance / reaction.strength) *
          (1 - reaction.age / 2.2);
        x += (dx2 / distance) * force * 5;
        z += (dz2 / distance) * force * 5;
      }
      const y = groundHeightAt(x, z) + 1.0 + Math.sin(bt * 1.7) * 0.45;
      const dx = x - b.g.position.x,
        dz = z - b.g.position.z;
      if (Math.abs(dx) + Math.abs(dz) > 1e-4)
        b.g.rotation.y = Math.atan2(dx, dz);
      b.g.position.set(x, y, z);
      const flap = Math.sin(t * 14 + b.phase) * 0.75;
      b.wings[0].rotation.z = flap;
      b.wings[1].rotation.z = -flap;
    }

    for (const b of birds) {
      const a = t * b.speed + b.phase;
      const x = b.cx + Math.cos(a) * b.r;
      const z = b.cz + Math.sin(a) * b.r;
      b.g.position.set(x, b.h + Math.sin(t * 0.8 + b.phase) * 1.6, z);
      b.g.rotation.y =
        Math.atan2(
          -Math.sin(a) * Math.sign(b.speed),
          Math.cos(a) * Math.sign(b.speed),
        ) + (b.speed > 0 ? 0 : Math.PI);
      const flap = Math.sin(t * 9 + b.phase) * 0.5;
      b.wings[0].rotation.z = flap;
      b.wings[1].rotation.z = -flap;
    }

    for (let i = 0; i < PETALS; i++) {
      const p = petals[i];
      p.x += dt * (0.55 + Math.sin(t * 0.4 + p.ph) * 0.3);
      p.z += dt * Math.cos(t * 0.3 + p.ph) * 0.35;
      p.y += dt * Math.sin(t * 0.9 + p.ph) * 0.22;
      for (const reaction of reactions) {
        const dx2 = p.x - reaction.x,
          dz2 = p.z - reaction.z;
        const distance = Math.hypot(dx2, dz2) || 1;
        const force =
          Math.max(0, 1 - distance / reaction.strength) *
          (1 - reaction.age / 2.2);
        p.x += (dx2 / distance) * force * dt * 5;
        p.z += (dz2 / distance) * force * dt * 5;
        p.y += force * dt * 2;
      }
      if (p.x > 105) p.x = -105;
      if (p.z > 105) p.z = -105;
      else if (p.z < -105) p.z = 105;
      if (p.y < 0.25) p.y = 3.4;
      else if (p.y > 3.8) p.y = 0.3;
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(t * p.spin, p.ph, t * p.spin * 0.7);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      petalMesh.setMatrixAt(i, dummy.matrix);
    }
    petalMesh.instanceMatrix.needsUpdate = true;

    // dig sparkles twinkle + bob
    for (const rec of digMounds.values()) {
      if (!rec.spark.visible) continue;
      rec.spark.position.y =
        rec.baseY + 0.95 + Math.sin(t * 2.1 + rec.baseY) * 0.12;
      rec.spark.rotation.y = t * 2.4;
      rec.spark.material.opacity = 0.65 + Math.sin(t * 3.7) * 0.3;
    }

    return nightK;
  }

  function react(pos, strength = 8) {
    if (!Array.isArray(pos) || pos.length < 3) return;
    reactions.push({ x: pos[0], z: pos[2], strength, age: 0 });
    if (reactions.length > 12) reactions.shift();
  }

  return { update, updateDigs, react };
}
