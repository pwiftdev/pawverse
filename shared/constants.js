// ─── TOPPLE shared gameplay constants ────────────────────────────────────────
// Imported by BOTH server (node) and client (vite). Keep it dependency-free ESM.

export const TICK_RATE = 30; // server simulation rate (Hz)
export const SNAPSHOT_RATE = 15; // server → client state broadcast rate (Hz)
export const INPUT_SEND_RATE = 30; // client → server input rate (Hz)
export const INTERP_DELAY_MS = 150; // remote-entity interpolation buffer

// ── The world ────────────────────────────────────────────────────────────────
export const WORLD_RADIUS = 60; // horizontal soft bound (circle around the axis)
export const ISLAND_RADIUS = 26; // the floating base island
export const VOID_Y = -26; // fall below this → lifted back to the island
export const SAFE_ALTITUDE = 4; // below this no bumps/shoves (spawn peace)
export const MAX_ALTITUDE = 5000; // where the tower generator stops (The Summit)

// ── Movement (deterministic — shared by server sim + client prediction) ──────
export const WALK_SPEED = 4.6; // m/s
export const SPRINT_SPEED = 7.4;
export const JUMP_VELOCITY = 9.2; // → apex ≈ 1.76 m with GRAVITY −24
export const GRAVITY = -24;
export const TERMINAL_VY = -42;
export const ACCEL = 14; // 1/s ground — velocity chases input
export const DECEL = 16; // 1/s ground — stopping is snappier
export const AIR_ACCEL = 6; // steering mid-air is mushier
export const AIR_DECEL = 1.6; // momentum carries through jumps
export const ICE_ACCEL = 3.2; // ice platforms: everything slides
export const ICE_DECEL = 0.9;
export const COYOTE_TIME = 0.12; // s of grace after walking off an edge
export const LAND_GRACE = 0.28; // m of horizontal forgiveness on platform edges
export const BOUNCE_VELOCITY = 13.5; // bouncy pads launch you at this vy
export const BOOST_VELOCITY = 19; // $BOOSTER pads — apex ≈ 7.5 m of free climb
export const STICKY_SPEED_K = 0.55; // honey platforms: slow but sure-footed
export const STICKY_ACCEL = 22; // honey grips instantly…
export const STICKY_DECEL = 26; // …and stops you dead
export const BODY_RADIUS = 0.42; // blob body radius for collisions

// ── Player vs player ─────────────────────────────────────────────────────────
export const BUMP_RESTITUTION = 0.8; // collision bounce factor
export const BUMP_MIN_IMPULSE = 2.4; // even a gentle nudge shoves a little
export const BUMP_MAX_IMPULSE = 11; // cap so physics stays comedic, not lethal
export const SHOVE_RANGE = 2.3; // m — shove reach
export const SHOVE_ARC_COS = 0.35; // facing cone half-angle (~69°)
export const SHOVE_IMPULSE = 9.5; // horizontal m/s given to the target
export const SHOVE_LIFT = 3.4; // vertical pop so shoves clear ledges
export const SHOVE_RECOIL = 2.2; // shover slides back a touch
export const SHOVE_COOLDOWN_MS = 1500;

// ── Scoring / drama ──────────────────────────────────────────────────────────
export const BIG_FALL_M = 25; // landing this far under your high mark = a fall
export const HUGE_FALL_M = 60; // …this far = broadcast to the whole tower
export const CROWN_MIN_ALT = 20; // leader beacon only above this
export const LEADERBOARD_MS = 2000; // leaderboard broadcast cadence
export const HIGHSCORE_KEEP = 10; // all-time entries persisted server-side

// ── Interest management ──────────────────────────────────────────────────────
export const INTEREST_RADIUS = 80; // m (3D) — entities beyond this are culled
export const INTEREST_RADIUS_SQ = INTEREST_RADIUS * INTEREST_RADIUS;

// ── Chat ─────────────────────────────────────────────────────────────────────
export const CHAT_MAX_LEN = 120;
export const CHAT_TTL_MS = 4000;

// ── Blob palette (join screen swatches; index goes over the wire) ────────────
export const BLOB_COLORS = [
  "#ff6b6b", // coral
  "#ff9f43", // tangerine
  "#feca57", // lemon
  "#7bed9f", // lime
  "#55efc4", // mint
  "#48dbfb", // sky
  "#74b9ff", // blue
  "#a29bfe", // lavender
  "#fd79a8", // pink
  "#e84393", // magenta
  "#c8d6e5", // cloud
  "#576574", // storm
];
