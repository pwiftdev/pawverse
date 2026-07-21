// ─── Input sanitization ──────────────────────────────────────────────────────
// All client-supplied data is validated/normalized here before entering state.

import { BLOB_COLORS, CHAT_MAX_LEN } from "../shared/constants.js";

/** Player name: string, trimmed, 1..14 chars, else 'Blob'. */
export function sanitizeName(name) {
  if (typeof name !== "string") return "Blob";
  const n = name.trim();
  if (n.length < 1 || n.length > 14) return "Blob";
  return n;
}

/** Blob color: a valid BLOB_COLORS index, else a random one. */
export function sanitizeColor(color) {
  const n = Number(color);
  if (Number.isInteger(n) && n >= 0 && n < BLOB_COLORS.length) return n;
  return Math.floor(Math.random() * BLOB_COLORS.length);
}

/** Chat text: trimmed string, capped at CHAT_MAX_LEN; '' means "ignore". */
export function sanitizeChat(text) {
  if (typeof text !== "string") return "";
  return text.trim().slice(0, CHAT_MAX_LEN);
}
