// ─── Interest management ─────────────────────────────────────────────────────
// Each client only receives entities within INTEREST_RADIUS of its own dog
// (plus always its own dog). Pure functions so tests can import them directly.

import { INTEREST_RADIUS_SQ } from '../shared/constants.js';

/** Planar dist² check: is (bx,bz) within interest radius of (ax,az)? */
export function withinInterest(ax, az, bx, bz) {
  const dx = ax - bx, dz = az - bz;
  return dx * dx + dz * dz <= INTEREST_RADIUS_SQ;
}

/**
 * Filter a list of entities to those visible from (px,pz).
 * @param entities array of entities
 * @param getXZ    entity → [x, z]
 * @param alwaysId entity id that is always included (the viewer's own dog), or null
 */
export function filterVisible(px, pz, entities, getXZ, alwaysId = null) {
  const out = [];
  for (const e of entities) {
    if (alwaysId !== null && e.id === alwaysId) { out.push(e); continue; }
    const [x, z] = getXZ(e);
    if (withinInterest(px, pz, x, z)) out.push(e);
  }
  return out;
}
