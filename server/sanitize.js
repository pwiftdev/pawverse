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

/**
 * Solana wallet address: base58, 32–44 chars, else '' (free play).
 * Public keys only — this is display/reward-routing data, never a secret.
 */
const SOL_ADDR = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
export function sanitizeWallet(wallet) {
  if (typeof wallet !== "string") return "";
  const w = wallet.trim();
  return SOL_ADDR.test(w) ? w : "";
}
