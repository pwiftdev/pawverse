// ─── All-time highscores ─────────────────────────────────────────────────────
// Tiny persistent top list: best altitude ever reached per run, kept across
// restarts in a local JSON file (best-effort — a missing/corrupt file just
// starts an empty board).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HIGHSCORE_KEEP } from "../shared/constants.js";

const FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "data",
  "highscores.json",
);

export class Highscores {
  constructor(file = FILE) {
    this.file = file;
    this.entries = []; // [{ n, alt, ts }] sorted desc by alt
    this.saveTimer = null;
    try {
      const raw = JSON.parse(fs.readFileSync(this.file, "utf8"));
      if (Array.isArray(raw)) {
        this.entries = raw
          .filter((e) => e && typeof e.n === "string" && Number.isFinite(e.alt))
          .map((e) => ({
            n: e.n,
            alt: e.alt,
            w: typeof e.w === "string" ? e.w : "",
            ts: e.ts || 0,
          }))
          .sort((a, b) => b.alt - a.alt)
          .slice(0, HIGHSCORE_KEEP);
      }
    } catch {
      /* first run / unreadable — empty board */
    }
  }

  /** The altitude needed to enter the board (0 while it has free slots). */
  floor() {
    return this.entries.length < HIGHSCORE_KEEP
      ? 0
      : this.entries[this.entries.length - 1].alt;
  }

  /**
   * Offer a run. One entry per name (keeps the board diverse); returns true
   * if the board changed (→ broadcast a RECORD event).
   */
  submit(name, alt, wallet = "") {
    if (!Number.isFinite(alt) || alt <= this.floor()) return false;
    const existing = this.entries.find((e) => e.n === name);
    if (existing) {
      if (alt <= existing.alt) return false;
      existing.alt = alt;
      if (wallet) existing.w = wallet;
      existing.ts = Date.now();
    } else {
      this.entries.push({ n: name, alt, w: wallet || "", ts: Date.now() });
    }
    this.entries.sort((a, b) => b.alt - a.alt);
    this.entries.length = Math.min(this.entries.length, HIGHSCORE_KEEP);
    this.scheduleSave();
    return true;
  }

  top(n = 5) {
    return this.entries
      .slice(0, n)
      .map((e) => ({ n: e.n, alt: e.alt, w: e.w || "" }));
  }

  scheduleSave() {
    if (this.saveTimer) return;
    this.saveTimer = setTimeout(() => {
      this.saveTimer = null;
      try {
        fs.mkdirSync(path.dirname(this.file), { recursive: true });
        fs.writeFileSync(this.file, JSON.stringify(this.entries));
      } catch {
        /* read-only fs (some hosts) — in-memory board still works */
      }
    }, 2000);
    this.saveTimer.unref?.();
  }
}
