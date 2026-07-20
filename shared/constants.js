// ─── PAWVERSE shared gameplay constants ──────────────────────────────────────
// Imported by BOTH server (node) and client (vite). Keep it dependency-free ESM.

export const TICK_RATE = 30; // server simulation rate (Hz)
export const SNAPSHOT_RATE = 15; // server → client state broadcast rate (Hz)
export const INPUT_SEND_RATE = 30; // client → server input rate (Hz)
export const INTERP_DELAY_MS = 150; // remote-entity interpolation buffer

export const WORLD_SIZE = 220; // park square, centered on origin
export const WORLD_BOUND = WORLD_SIZE / 2 - 2;

export const WALK_SPEED = 4.2; // m/s
export const SPRINT_SPEED = 7.5;
export const SWIM_SPEED = 2.6;
export const JUMP_VELOCITY = 7.5;
export const GRAVITY = -22;
export const ACCEL = 11; // 1/s — how fast velocity chases input
export const DECEL = 14; // 1/s — stopping is snappier than starting

export const INTEREST_RADIUS = 70; // m — entities beyond this are culled per-client
export const INTEREST_RADIUS_SQ = INTEREST_RADIUS * INTEREST_RADIUS;

export const BARK_COOLDOWN_MS = 1500;
export const BARK_SCARE_RADIUS = 7; // NPCs within this flinch/flee
export const BITE_COOLDOWN_MS = 2000;
export const BITE_RANGE = 2.6;
export const PET_RANGE = 3.2; // sit this close to an NPC to get petted
export const PET_TIME_MS = 1500; // sit still this long before the NPC reacts
export const EMOTE_COOLDOWN_MS = 400;

export const MAX_BALLS = 12;
export const BALL_RESPAWN_MS = 4000; // per-spawner cooldown between spawns
export const BALL_GRAB_RANGE = 2.2;
export const BALL_RETURN_RANGE = 3.0; // drop within this of a spawner → bonus
export const BALL_RADIUS = 0.28;

export const NPC_COUNT = 8;
export const NPC_WALK_SPEED = 1.6;
export const NPC_FLEE_SPEED = 4.5;
export const NPC_FLEE_TIME_MS = 5000;

export const CHAT_MAX_LEN = 120;
export const CHAT_TTL_MS = 4000;

export const HOWL_GROUP_RADIUS = 15; // dogs howling together within this radius
export const HOWL_GROUP_WINDOW_MS = 3000;

// Squirrels
export const SQUIRREL_COUNT = 7;
export const SQUIRREL_ALERT_RADIUS = 7; // dog this close → squirrel bolts
export const SQUIRREL_TAG_RADIUS = 1.8; // dog this close mid-flee → chased off!
export const SQUIRREL_FLEE_SPEED = 6.8;
export const SQUIRREL_HIDE_MS = 18_000; // time spent hiding up the tree
export const SQUIRREL_FORAGE_SPEED = 1.3;

// Buried treasure
export const DIG_RADIUS = 2.4; // dig within this of a mound
export const DIG_TIME_MS = 2200; // keep digging this long to unearth
export const DIG_RESPAWN_MS = 45_000; // mound refills with a new treasure

export const LEADERBOARD_MS = 3000; // broadcast cadence

// Day/night cycle
export const DAY_LENGTH_MS = 480_000; // one full day = 8 minutes

// Howl Rock: howl at the summit → park-wide echo bonus
export const HOWL_ROCK_RADIUS = 6;
export const HOWL_ROCK_COOLDOWN_MS = 60_000;

// Trick combos: 3 distinct emotes within the window, near a human
export const TRICK_WINDOW_MS = 6000;
export const TRICK_EMOTES_NEEDED = 3;
export const TRICK_NPC_RANGE = 8;
export const TRICK_COOLDOWN_MS = 20_000;

// Scoring
export const POINTS = {
  PICKUP: 2, // grab a free ball off the ground
  CATCH: 5, // grab a ball mid-air that someone threw
  RETURN: 10, // bring a ball back to a spawner pad
  GROUP_HOWL: 10, // synced howl bonus
  PET: 5, // NPC pets you
  CHASE: 8, // chase a squirrel up a tree
  ECHO: 5, // howl from Howl Rock — heard across the park
  TRICK: 5, // trick show for a human (also +1 treat)
  DISCOVERY: 8, // first sniff discovery per session
  PARK_EVENT: 20, // reward for contributing to a completed community event
};

/** Treasure table: label, weight, zoomies payout (treats always +1). */
export const TREASURES = [
  { loot: "bone", w: 5, zoomies: 10 },
  { loot: "stick", w: 3, zoomies: 15 },
  { loot: "shiny", w: 1, zoomies: 30 },
];

export const REP = {
  MIN: -50,
  MAX: 50,
  PET: +2,
  FEED: +2,
  SCARE: -3,
  GOOD_BOY: 10, // ≥ this → "Good Boy"
  MENACE: -10, // ≤ this → "Menace"
};

export const HAPPINESS_MAX = 100;
export const HAPPINESS_DECAY_PER_MIN = 4;
