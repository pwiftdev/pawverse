// ─── PAWVERSE shared world geometry ──────────────────────────────────────────
// Single source of truth for terrain, solid objects, and collision so client
// prediction and the authoritative server agree exactly. The client renders
// FROM this data; the server simulates WITH it. Pure functions + deterministic
// generation (seedRng), no dependencies beyond shared/.

import { seedRng } from './breeds.js';

export const WATER_LEVEL = -0.55;

const BEACH_START = 60;   // x where the sand starts sloping down
const BEACH_END = 90;     // x where the sea floor levels out
const SEA_FLOOR = -2.4;

export const FOUNTAIN = { x: 0, z: 0, r: 4.5, depth: -0.75 }; // shallow splash pool

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/**
 * Gentle rolling hills — pure trig, so client and server agree exactly.
 * Range ≈ ±1.8 before the flat-area masks below scale it down.
 */
function hillNoise(x, z) {
  return (
    Math.sin(x * 0.045 + 1.3) * Math.cos(z * 0.052 - 0.7) * 0.85 +
    Math.sin(x * 0.11 + z * 0.093 + 2.2) * 0.4 +
    Math.cos(x * 0.021 - z * 0.033 + 4.1) * 0.55
  );
}

/** 0 → hills fully suppressed (gameplay areas), 1 → hills at full strength. */
function hillMaskAt(x, z) {
  // Flat circles around gameplay spots: fountain plaza, spawn, ball pads, stands.
  let m = 1;
  for (const [cx, cz, r] of HILL_FLAT_SPOTS) {
    const d = Math.hypot(x - cx, z - cz);
    m = Math.min(m, smoothstep(r, r + 9, d));
  }
  // The fenced dog yard stays flat (fence rails are straight).
  const ydx = Math.max(Math.abs(x - FENCED_YARD.x) - FENCED_YARD.w / 2, 0);
  const ydz = Math.max(Math.abs(z - FENCED_YARD.z) - FENCED_YARD.d / 2, 0);
  m = Math.min(m, smoothstep(0, 9, Math.hypot(ydx, ydz)));
  // Blend out toward the beach slope and the perimeter fence line.
  m *= 1 - smoothstep(BEACH_START - 14, BEACH_START - 2, x);
  const edge = Math.max(Math.abs(x), Math.abs(z));
  m *= 1 - smoothstep(92, 101, edge);
  return m;
}

/**
 * Big landmark hills: [cx, cz, radius, height]. Cosine-dome bumps placed clear
 * of every gameplay flat spot so the masks never carve dents into them.
 * SUNSET_HILL (south) carries Howl Rock on its summit; the second is a broad
 * meadow rise in the north.
 */
export const BIG_HILLS = [
  [-5, -75, 30, 7.0],    // Sunset Hill — the lookout
  [-15, 72, 26, 4.6],    // North Meadow rise
];

function bigHillsAt(x, z) {
  let h = 0;
  for (const [cx, cz, r, peak] of BIG_HILLS) {
    const d = Math.hypot(x - cx, z - cz);
    if (d >= r) continue;
    const k = Math.cos((d / r) * Math.PI) * 0.5 + 0.5;   // 1 at center → 0 at rim
    h += peak * k * k;                                    // squared = soft shoulders
  }
  // fade near the beach and the perimeter, like the rolling noise does
  h *= 1 - smoothstep(BEACH_START - 14, BEACH_START - 2, x);
  const edge = Math.max(Math.abs(x), Math.abs(z));
  h *= 1 - smoothstep(94, 103, edge);
  return h;
}

/** Howl Rock — the stone slab on Sunset Hill's summit. Howl here → park echo. */
export const HOWL_ROCK = { x: BIG_HILLS[0][0], z: BIG_HILLS[0][1] };

/** The ring of standing stones around Howl Rock (solid — see COLLIDERS). */
export const HOWL_STONES = Array.from({ length: 5 }, (_, i) => {
  const a = (i / 5) * Math.PI * 2 + 0.4;
  return { x: HOWL_ROCK.x + Math.cos(a) * 4.6, z: HOWL_ROCK.z + Math.sin(a) * 4.6, a, h: 1.1 + (i % 3) * 0.35 };
});

/** Terrain height at (x, z). Same result on client and server — always. */
export function groundHeightAt(x, z) {
  // Beach on the east edge sloping into the sea
  if (x > BEACH_START) {
    return smoothstep(BEACH_START, BEACH_END, x) * SEA_FLOOR;
  }
  // Fountain basin in the park center
  const dx = x - FOUNTAIN.x, dz = z - FOUNTAIN.z;
  if (dx * dx + dz * dz < FOUNTAIN.r * FOUNTAIN.r) return FOUNTAIN.depth;
  let h = hillNoise(x, z) * 0.75 * hillMaskAt(x, z) + bigHillsAt(x, z);
  // Lawn never dips into accidental ponds — swimming lives at the beach/fountain.
  if (h < -0.35) h = -0.35;
  return h;
}

/** Terrain steepness at (x, z) — |∇h|. Used for rock shading + gameplay checks. */
export function slopeAt(x, z) {
  const e = 0.6;
  const h0 = groundHeightAt(x, z);
  return Math.hypot(groundHeightAt(x + e, z) - h0, groundHeightAt(x, z + e) - h0) / e;
}

/** True when the ground here is submerged (dog should swim). */
export function isWaterAt(x, z) {
  return groundHeightAt(x, z) < WATER_LEVEL - 0.2;
}

/** Ball spawner pads (also the "fetch return" targets). */
export const BALL_SPAWNERS = [
  { id: 0, x: -40, z: -40 },
  { id: 1, x: -40, z: 40 },
  { id: 2, x: 30, z: -50 },
  { id: 3, x: 20, z: 45 },
];

/** Treat stands — visual landmarks, NPC humans hang around them. */
export const TREAT_STANDS = [
  { id: 0, x: -15, z: -20 },
  { id: 1, x: 25, z: 15 },
];

/** Fenced yard — the "dog park" corner (solid rails, gate gap on the east). */
export const FENCED_YARD = { x: -55, z: 0, w: 50, d: 60 };
export const YARD_GATE = { z1: -4, z2: 4 };   // opening in the east rail

/** Where new players spawn. */
export const SPAWN = { x: 0, z: 12 };

/** NPC waypoint loops (they amble between these). */
export const NPC_WAYPOINTS = [
  [{ x: -15, z: -20 }, { x: -30, z: 5 }, { x: -10, z: 30 }, { x: 10, z: 10 }],
  [{ x: 25, z: 15 }, { x: 40, z: -10 }, { x: 15, z: -30 }, { x: 0, z: -10 }],
  [{ x: -40, z: -40 }, { x: -60, z: -10 }, { x: -40, z: 40 }, { x: -20, z: 0 }],
  [{ x: 20, z: 45 }, { x: 45, z: 40 }, { x: 50, z: 10 }, { x: 30, z: -20 }],
  [{ x: -5, z: 50 }, { x: -30, z: 60 }, { x: -50, z: 30 }, { x: -20, z: 25 }],
  [{ x: 10, z: -50 }, { x: -20, z: -55 }, { x: -45, z: -30 }, { x: -10, z: -25 }],
  [{ x: 55, z: -30 }, { x: 55, z: 30 }, { x: 35, z: 50 }, { x: 45, z: 0 }],
  [{ x: -60, z: 50 }, { x: -65, z: -40 }, { x: -30, z: -60 }, { x: -15, z: 40 }],
];

// [cx, cz, flatRadius] — areas that must stay perfectly level (declared late
// because it references the gameplay landmarks above).
const HILL_FLAT_SPOTS = [
  [FOUNTAIN.x, FOUNTAIN.z, 11],
  [SPAWN.x, SPAWN.z, 8],
  ...BALL_SPAWNERS.map((s) => [s.x, s.z, 8]),
  ...TREAT_STANDS.map((s) => [s.x, s.z, 7]),
];

// ─── Dirt paths (visual on the client, "keep clear" mask for placement) ──────

const PATH_SEGS = [];
for (const loop of NPC_WAYPOINTS) {
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i], b = loop[(i + 1) % loop.length];
    PATH_SEGS.push([a.x, a.z, b.x, b.z]);
  }
}

/** Distance from (x,z) to the nearest NPC walking path. */
export function pathDist(x, z) {
  let best = Infinity;
  for (const [ax, az, bx, bz] of PATH_SEGS) {
    const abx = bx - ax, abz = bz - az;
    const len2 = abx * abx + abz * abz || 1;
    const t = Math.min(1, Math.max(0, ((x - ax) * abx + (z - az) * abz) / len2));
    const dx = x - (ax + abx * t), dz = z - (az + abz * t);
    const d2 = dx * dx + dz * dz;
    if (d2 < best) best = d2;
  }
  return Math.sqrt(best);
}

// ─── Solid object placement (deterministic — shared by render + collision) ──

const WORLD_HALF = 108;   // matches constants.WORLD_BOUND + margin (no import cycle)

/**
 * Trees. Generated once with the same seeded RNG the old client used, so the
 * park layout is stable across versions/sessions. Each entry carries the
 * visual parameters too, so the client renders exactly what collides.
 * { x, z, h (trunk height), layers, cherry (flowering?), seed (0..1 misc) }
 */
export const TREES = (() => {
  const rng = seedRng('pawverse-trees');
  const out = [];
  while (out.length < 56) {
    const x = (rng() * 2 - 1) * (WORLD_HALF - 6);
    const z = (rng() * 2 - 1) * (WORLD_HALF - 6);
    const h = 2.2 + rng() * 2.2;
    const layers = 2 + Math.floor(rng() * 2);
    const cherryRoll = rng();
    const cherry = cherryRoll < 0.17;
    const leafSeed = rng();
    if (x > 48) continue;                                            // beach stays open
    if (x * x + z * z < 140) continue;                               // fountain plaza
    if (BALL_SPAWNERS.some((s) => (x - s.x) ** 2 + (z - s.z) ** 2 < 45)) continue;
    if (TREAT_STANDS.some((s) => (x - s.x) ** 2 + (z - s.z) ** 2 < 45)) continue;
    if (pathDist(x, z) < 2.6) continue;                              // keep paths clear
    if (Math.hypot(x - SPAWN.x, z - SPAWN.z) < 6) continue;          // clear spawn
    out.push({ x, z, h, layers, cherry, seed: leafSeed });
  }
  return out;
})();

/** Park benches: { x, z, ry }. */
export const BENCHES = [
  { x: 9, z: -6.5, ry: -2.2 },
  { x: -9.5, z: 5, ry: 1.2 },
  { x: 6, z: 11, ry: 2.6 },
  { x: 24, z: -22, ry: -0.6 },
  { x: -24, z: 26, ry: 0.8 },
];

/** Dog house in the fenced yard. */
export const DOG_HOUSE = { x: -68, z: -20, ry: 0.95 };

/**
 * Buried-treasure dig spots: visible dirt mounds. Dig (G) on one for a couple
 * of seconds to unearth a treasure. Positions handpicked on open lawn.
 */
export const DIG_SPOTS = [
  { id: 0, x: -18, z: 12 },
  { id: 1, x: 14, z: -14 },
  { id: 2, x: 36, z: 28 },
  { id: 3, x: -34, z: -18 },
  { id: 4, x: -52, z: 44 },
  { id: 5, x: 44, z: -32 },
  { id: 6, x: -68, z: 14 },   // in the fenced yard
  { id: 7, x: 4, z: 36 },
  { id: 8, x: -8, z: -38 },
  { id: 9, x: 55, z: 12 },    // near the beach edge
];

// ─── Collision ───────────────────────────────────────────────────────────────
// Circles (trees, furniture) + wall segments (yard fence). `h` is the
// obstacle's blocking height: a jumping dog whose feet are above `h` clears it
// (so benches and agility props can be vaulted, trees cannot).

export const COLLIDERS = [
  ...TREES.map((t) => ({ x: t.x, z: t.z, r: 0.42, h: Infinity })),
  ...BENCHES.map((b) => ({ x: b.x, z: b.z, r: 0.95, h: 0.75 })),
  ...TREAT_STANDS.map((s) => ({ x: s.x, z: s.z, r: 1.55, h: Infinity })),
  { x: DOG_HOUSE.x, z: DOG_HOUSE.z, r: 1.25, h: Infinity },
  { x: FOUNTAIN.x, z: FOUNTAIN.z, r: 0.85, h: Infinity },   // centre pillar
  ...HOWL_STONES.map((s) => ({ x: s.x, z: s.z, r: 0.5, h: Infinity })),
];

/**
 * Yard fence wall segments [{x1,z1,x2,z2}] with the gate gap left open.
 * The perimeter fence is enforced by the WORLD_BOUND clamp in movement.
 */
export const WALLS = (() => {
  const Y = FENCED_YARD, hw = Y.w / 2, hd = Y.d / 2;
  return [
    { x1: Y.x - hw, z1: Y.z - hd, x2: Y.x + hw, z2: Y.z - hd },
    { x1: Y.x - hw, z1: Y.z + hd, x2: Y.x + hw, z2: Y.z + hd },
    { x1: Y.x - hw, z1: Y.z - hd, x2: Y.x - hw, z2: Y.z + hd },
    { x1: Y.x + hw, z1: Y.z - hd, x2: Y.x + hw, z2: Y.z + YARD_GATE.z1 },
    { x1: Y.x + hw, z1: Y.z + YARD_GATE.z2, x2: Y.x + hw, z2: Y.z + hd },
  ];
})();

const WALL_H = 0.95;        // fence height — dogs cannot jump it (use the gate!)
const WALL_PAD = 0.28;      // half-thickness of the wall for push-out

// Cheap spatial hash over the circle colliders (queried every input step).
const CELL = 8;
const colliderGrid = new Map();
for (const c of COLLIDERS) {
  const minGX = Math.floor((c.x - c.r - 1) / CELL), maxGX = Math.floor((c.x + c.r + 1) / CELL);
  const minGZ = Math.floor((c.z - c.r - 1) / CELL), maxGZ = Math.floor((c.z + c.r + 1) / CELL);
  for (let gx = minGX; gx <= maxGX; gx++) {
    for (let gz = minGZ; gz <= maxGZ; gz++) {
      const key = gx * 1000 + gz;
      if (!colliderGrid.has(key)) colliderGrid.set(key, []);
      colliderGrid.get(key).push(c);
    }
  }
}

/**
 * Push a point out of every solid it overlaps. Deterministic (no iteration
 * order surprises: two passes handle corner cases well enough for gameplay).
 * @param p      {x, z, y?} — mutated in place. y (feet height) gates low props.
 * @param radius body radius of the mover
 * @returns true if any push-out happened
 */
export function resolveObstacles(p, radius = 0.35) {
  let hit = false;
  const y = p.y ?? 0;
  for (let pass = 0; pass < 2; pass++) {
    // circles via the spatial hash
    const cell = colliderGrid.get(Math.floor(p.x / CELL) * 1000 + Math.floor(p.z / CELL));
    if (cell) {
      for (const c of cell) {
        if (y > c.h) continue;                    // airborne above a low prop
        const dx = p.x - c.x, dz = p.z - c.z;
        const minD = c.r + radius;
        const d2 = dx * dx + dz * dz;
        if (d2 >= minD * minD) continue;
        const d = Math.sqrt(d2) || 1e-5;
        p.x = c.x + (dx / d) * minD;
        p.z = c.z + (dz / d) * minD;
        hit = true;
      }
    }
    // yard fence walls
    if (y <= WALL_H) {
      for (const w of WALLS) {
        const abx = w.x2 - w.x1, abz = w.z2 - w.z1;
        const len2 = abx * abx + abz * abz || 1;
        const t = Math.min(1, Math.max(0, ((p.x - w.x1) * abx + (p.z - w.z1) * abz) / len2));
        const cx = w.x1 + abx * t, cz = w.z1 + abz * t;
        const dx = p.x - cx, dz = p.z - cz;
        const minD = WALL_PAD + radius;
        const d2 = dx * dx + dz * dz;
        if (d2 >= minD * minD) continue;
        const d = Math.sqrt(d2) || 1e-5;
        p.x = cx + (dx / d) * minD;
        p.z = cz + (dz / d) * minD;
        hit = true;
      }
    }
  }
  return hit;
}

/**
 * Circle-only query for ball physics: returns the first overlapping circle
 * collider (balls bounce off trees/furniture but roll under the fence rails).
 */
export function firstCircleHit(x, z, y, radius) {
  const cell = colliderGrid.get(Math.floor(x / CELL) * 1000 + Math.floor(z / CELL));
  if (!cell) return null;
  for (const c of cell) {
    if (y > c.h) continue;
    const dx = x - c.x, dz = z - c.z;
    const minD = c.r + radius;
    if (dx * dx + dz * dz < minD * minD) return c;
  }
  return null;
}
