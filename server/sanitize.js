// ─── Input sanitization ──────────────────────────────────────────────────────
// All client-supplied data is validated/normalized here before entering state.

import { CHAT_MAX_LEN } from '../shared/constants.js';
import { BREED_MAP, PATTERNS, ACCESSORIES } from '../shared/breeds.js';

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

/** Player name: string, trimmed, 1..16 chars, else 'Dog'. */
export function sanitizeName(name) {
  if (typeof name !== 'string') return 'Dog';
  const n = name.trim();
  if (n.length < 1 || n.length > 16) return 'Dog';
  return n;
}

function hexOr(value, fallback) {
  return (typeof value === 'string' && HEX_COLOR.test(value)) ? value.toLowerCase() : fallback;
}

function clamp(v, lo, hi, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(hi, Math.max(lo, n));
}

/**
 * Normalize a client customization object against the contract:
 *   breed ∈ BREED_MAP, colors #rrggbb, size 0.7..1.4, known pattern/accessory.
 */
export function sanitizeCustomization(dog, name) {
  const d = (dog && typeof dog === 'object') ? dog : {};
  const breed = BREED_MAP[d.breed] ? d.breed : 'shiba';
  const def = BREED_MAP[breed];
  return {
    breed,
    primary: hexOr(d.primary, def.primary),
    secondary: hexOr(d.secondary, def.secondary),
    pattern: PATTERNS.includes(d.pattern) ? d.pattern : def.pattern,
    size: clamp(d.size, 0.7, 1.4, 1.0),
    collar: d.collar === null ? null : hexOr(d.collar, '#d23b3b'),
    accessory: ACCESSORIES.includes(d.accessory) ? d.accessory : 'none',
    name,
  };
}

/** Chat text: trimmed string, capped at CHAT_MAX_LEN; '' means "ignore". */
export function sanitizeChat(text) {
  if (typeof text !== 'string') return '';
  return text.trim().slice(0, CHAT_MAX_LEN);
}
