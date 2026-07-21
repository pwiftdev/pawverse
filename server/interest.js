// ─── Interest management ─────────────────────────────────────────────────────
// Each client only receives entities within INTEREST_RADIUS (full 3D — the
// tower is vertical, so height separation culls too). Pure functions so tests
// can import them directly.

import { INTEREST_RADIUS_SQ } from "../shared/constants.js";

/** 3D dist² check: is b within interest radius of a? */
export function withinInterest(ax, ay, az, bx, by, bz) {
  const dx = ax - bx,
    dy = ay - by,
    dz = az - bz;
  return dx * dx + dy * dy + dz * dz <= INTEREST_RADIUS_SQ;
}

/**
 * Filter a list of entities to those visible from (px,py,pz).
 * @param entities array of entities
 * @param getXYZ   entity → [x, y, z]
 * @param alwaysId entity id that is always included (the viewer), or null
 */
export function filterVisible(px, py, pz, entities, getXYZ, alwaysId = null) {
  const out = [];
  for (const e of entities) {
    if (alwaysId !== null && e.id === alwaysId) {
      out.push(e);
      continue;
    }
    const [x, y, z] = getXYZ(e);
    if (withinInterest(px, py, pz, x, y, z)) out.push(e);
  }
  return out;
}
