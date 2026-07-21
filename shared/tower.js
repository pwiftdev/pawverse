// ─── TOPPLE shared tower geometry ────────────────────────────────────────────
// Single source of truth for the endless climb: the floating base island and
// the deterministic platform helix above it. Client renders FROM this data;
// the server simulates WITH it — so prediction and authority agree exactly.
//
// The whole tower is generated once at module load from a fixed seed by
// iterating platform-to-platform with jump-envelope constraints, guaranteeing
// every consecutive hop is physically reachable. ~microseconds, tiny memory.

import { ISLAND_RADIUS, LAND_GRACE, MAX_ALTITUDE } from "./constants.js";

// ── Seeded RNG (mulberry32 over a string hash — deterministic everywhere) ────

export function seedRng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── The base island ──────────────────────────────────────────────────────────
// A gentle grass dome floating over an endless cloud sea. Height is pure math.

export function islandHeightAt(x, z) {
  const d = Math.hypot(x, z);
  if (d >= ISLAND_RADIUS) return null; // off the edge — open air
  const t = 1 - d / ISLAND_RADIUS;
  return t * t * (3 - 2 * t) * 1.6; // smoothstep dome, 1.6 m at the center
}

/** Where new blobs appear (ring around the dome, jitter added server-side). */
export const SPAWN = { x: 0, z: 10 };

// ── Platform types ───────────────────────────────────────────────────────────

export const P_NORMAL = 0;
export const P_BOUNCY = 1; // launches you upward on landing
export const P_ICE = 2; // low friction
export const P_REST = 3; // big social ring every ~60 m

// ── The helix ────────────────────────────────────────────────────────────────
// Iterative construction: each platform is placed a reachable hop from the
// previous one (rise ≤ 1.7 m, 3D gap within a sprint-jump). The path orbits
// the central axis with a wandering radius so the climb corkscrews with
// variety. Side platforms add alternate routes; rest rings punctuate zones.
//
// platform: { i, x, y, z, r, type }   (r = walkable top radius; tops are flat)

/** Max horizontal EDGE-to-edge gap the jump arc can cover at max rise. */
export const MAX_EDGE_GAP = 3.1;
/** Max rise between consecutive platforms (jump apex is ~1.76 m). */
export const MAX_RISE = 1.6;

export const PLATFORMS = (() => {
  const rng = seedRng("topple-tower-v1");
  const out = [];
  let angle = rng() * Math.PI * 2;
  let radius = 8.5;
  let y = 2.6; // first hop from the island dome
  let i = 0;
  let sinceBouncy = 99;
  let nextRest = 55 + rng() * 20;
  let prev = null; // last main-path platform (rest rings count)

  /** Pull `next` toward `prev` until the edge gap is jumpable. */
  function clampGap(next) {
    if (!prev) return next;
    const dx = next.x - prev.x,
      dz = next.z - prev.z;
    const d = Math.hypot(dx, dz) || 1e-4;
    const maxD = prev.r + next.r + MAX_EDGE_GAP;
    if (d > maxD) {
      next.x = prev.x + (dx / d) * maxD;
      next.z = prev.z + (dz / d) * maxD;
    }
    return next;
  }

  while (y < MAX_ALTITUDE) {
    // Difficulty eases upward: platforms shrink, gaps stretch a little.
    const hard = Math.min(1, y / 900);

    if (y >= nextRest) {
      // Rest ring: a big safe disc pulled in toward the axis.
      const rest = clampGap({
        i: i++,
        x: Math.cos(angle) * (radius * 0.55),
        y,
        z: Math.sin(angle) * (radius * 0.55),
        r: 5.4,
        type: P_REST,
      });
      out.push(rest);
      prev = rest;
      nextRest = y + 52 + rng() * 26;
      y += 1.25 + rng() * 0.3;
      angle += 0.8 + rng() * 0.6;
      continue;
    }

    const r = Math.max(1.05, 2.5 - hard * 1.1 - rng() * 0.35);

    // Choose the type
    let type = P_NORMAL;
    sinceBouncy++;
    if (sinceBouncy > 4 && rng() < 0.055) {
      type = P_BOUNCY;
      sinceBouncy = 0;
    } else if (y > 250 && rng() < 0.13 + hard * 0.08) {
      type = P_ICE;
    }

    const main = clampGap({
      i: i++,
      x: Math.cos(angle) * radius,
      y,
      z: Math.sin(angle) * radius,
      r,
      type,
    });
    out.push(main);
    prev = main;

    // Occasional side platform — an alternate route, always within a hop.
    if (rng() < 0.3) {
      const a2 = rng() * Math.PI * 2;
      const off = main.r + 1.6 + rng() * 1.6;
      out.push({
        i: i++,
        x: main.x + Math.cos(a2) * off,
        y: y + 0.35 + rng() * 0.6,
        z: main.z + Math.sin(a2) * off,
        r: Math.max(0.95, r - 0.35),
        type: rng() < 0.08 ? P_BOUNCY : P_NORMAL,
      });
    }

    // Advance the main path one reachable hop.
    const rise = 1.05 + rng() * (0.45 + hard * 0.1); // ≤ MAX_RISE
    const chord = 2.4 + rng() * (1.4 + hard * 0.4);
    radius += (rng() * 2 - 1) * 1.6;
    radius = Math.max(5.5, Math.min(14, radius));
    angle += chord / radius; // arc step ≈ chord length
    y += rise;
  }

  // The Summit — a legend-making platform at the very top (y is already the
  // natural next hop above the last platform, so it stays reachable).
  const summit = clampGap({
    i: i++,
    x: 0,
    y,
    z: 0,
    r: 6.5,
    type: P_REST,
  });
  out.push(summit);

  // Demote bouncy pads shadowed from directly above — a pad you can't drop
  // onto is a lie. (Overlapping "stair step" platforms are otherwise fine.)
  const byBand = new Map();
  const BAND = 5;
  for (const p of out) {
    const k = Math.floor(p.y / BAND);
    if (!byBand.has(k)) byBand.set(k, []);
    byBand.get(k).push(p);
  }
  for (const p of out) {
    if (p.type !== P_BOUNCY) continue;
    const k = Math.floor(p.y / BAND);
    outer: for (let b = k; b <= k + 1; b++) {
      for (const q of byBand.get(b) || []) {
        if (q === p || q.y <= p.y || q.y - p.y > BAND) continue;
        if (Math.hypot(q.x - p.x, q.z - p.z) < q.r + 0.3) {
          p.type = P_NORMAL;
          break outer;
        }
      }
    }
  }
  return out;
})();

// ── Spatial index by altitude band (queried every physics step) ──────────────

const CELL_Y = 4;
const bandIndex = new Map();
for (const p of PLATFORMS) {
  const key = Math.floor(p.y / CELL_Y);
  if (!bandIndex.has(key)) bandIndex.set(key, []);
  bandIndex.get(key).push(p);
}

/** All platforms whose top lies in [yMin, yMax] (inclusive bands). */
export function platformsInBand(yMin, yMax) {
  const out = [];
  const a = Math.floor(yMin / CELL_Y);
  const b = Math.floor(yMax / CELL_Y);
  for (let k = a; k <= b; k++) {
    const cell = bandIndex.get(k);
    if (cell) for (const p of cell) if (p.y >= yMin && p.y <= yMax) out.push(p);
  }
  return out;
}

/**
 * The supporting surface at (x,z) for feet at height y, or null.
 * Checks the island dome and platform tops within a snap window.
 * Returns { top, type } — deterministic, used by movement AND reconciliation.
 */
export function supportAt(x, y, z, snap = 0.3) {
  // Island dome
  const ih = islandHeightAt(x, z);
  if (ih !== null && y >= ih - 0.5 && y <= ih + snap) {
    return { top: ih, type: P_REST };
  }
  // Platform tops
  for (const p of platformsInBand(y - snap - 0.01, y + snap + 0.01)) {
    const dx = x - p.x,
      dz = z - p.z;
    if (dx * dx + dz * dz <= (p.r + LAND_GRACE) ** 2) {
      if (y >= p.y - snap && y <= p.y + snap) return { top: p.y, type: p.type };
    }
  }
  return null;
}

/**
 * Landing test for a falling body that moved feet from prevY down to newY:
 * the first surface whose top lies in (newY, prevY] under (x,z).
 * Returns { top, type } or null.
 */
export function landingAt(x, prevY, newY, z) {
  let best = null;
  const ih = islandHeightAt(x, z);
  if (ih !== null && ih <= prevY + 1e-6 && ih >= newY) {
    best = { top: ih, type: P_REST };
  }
  for (const p of platformsInBand(newY, prevY + 0.01)) {
    if (p.y > prevY + 1e-6 || p.y < newY) continue;
    const dx = x - p.x,
      dz = z - p.z;
    if (dx * dx + dz * dz > (p.r + LAND_GRACE) ** 2) continue;
    if (!best || p.y > best.top) best = { top: p.y, type: p.type };
  }
  return best;
}
