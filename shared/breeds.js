// ─── PAWVERSE breed definitions ──────────────────────────────────────────────
// Gameplay params (speed/scale) matter to the server; `build` drives the
// client's procedural dog factory. Colors are defaults — players can recolor.

export const CHARACTER_PRESETS = [
  {
    id: "husky",
    name: "Husky",
    species: "dog",
    premium: false,
    speed: 1.08,
    scale: 1.05,
    primary: "#8a93a3",
    secondary: "#f2f4f7",
    pattern: "mask",
    build: {
      bodyLen: 1.15,
      bodyH: 0.62,
      legLen: 0.55,
      headR: 0.3,
      snoutLen: 0.28,
      ear: "pointy",
      tail: "curled",
      fur: "fluffy",
    },
  },
  {
    id: "shiba",
    name: "Shiba Inu",
    species: "dog",
    premium: false,
    speed: 1.05,
    scale: 0.9,
    primary: "#d98e4a",
    secondary: "#f7ead9",
    pattern: "socks",
    build: {
      bodyLen: 0.95,
      bodyH: 0.55,
      legLen: 0.48,
      headR: 0.3,
      snoutLen: 0.24,
      ear: "pointy",
      tail: "curled",
      fur: "short",
    },
  },
  {
    id: "golden",
    name: "Golden Retriever",
    species: "dog",
    premium: false,
    speed: 1.0,
    scale: 1.1,
    primary: "#d9a45b",
    secondary: "#f2d8a7",
    pattern: "none",
    build: {
      bodyLen: 1.25,
      bodyH: 0.65,
      legLen: 0.55,
      headR: 0.32,
      snoutLen: 0.3,
      ear: "floppy",
      tail: "flag",
      fur: "fluffy",
    },
  },
  {
    id: "corgi",
    name: "Corgi",
    species: "dog",
    premium: false,
    speed: 0.92,
    scale: 0.8,
    primary: "#d98e4a",
    secondary: "#ffffff",
    pattern: "socks",
    build: {
      bodyLen: 1.15,
      bodyH: 0.5,
      legLen: 0.25,
      headR: 0.32,
      snoutLen: 0.24,
      ear: "pointy",
      tail: "bob",
      fur: "short",
    },
  },
  {
    id: "dachshund",
    name: "Dachshund",
    species: "dog",
    premium: false,
    speed: 0.9,
    scale: 0.75,
    primary: "#7a4a2b",
    secondary: "#c98d5e",
    pattern: "none",
    build: {
      bodyLen: 1.45,
      bodyH: 0.42,
      legLen: 0.22,
      headR: 0.28,
      snoutLen: 0.34,
      ear: "floppy",
      tail: "straight",
      fur: "short",
    },
  },
  {
    id: "collie",
    name: "Border Collie",
    species: "dog",
    premium: false,
    speed: 1.15,
    scale: 1.0,
    primary: "#2b2b30",
    secondary: "#ffffff",
    pattern: "mask",
    build: {
      bodyLen: 1.15,
      bodyH: 0.6,
      legLen: 0.55,
      headR: 0.3,
      snoutLen: 0.28,
      ear: "floppy",
      tail: "flag",
      fur: "fluffy",
    },
  },
  {
    id: "doberman",
    name: "Doberman",
    species: "dog",
    premium: true,
    speed: 1.18,
    scale: 1.15,
    primary: "#26262b",
    secondary: "#b0713c",
    pattern: "mask",
    build: {
      bodyLen: 1.3,
      bodyH: 0.7,
      legLen: 0.65,
      headR: 0.28,
      snoutLen: 0.34,
      ear: "pointy",
      tail: "straight",
      fur: "short",
    },
  },
  {
    id: "poodle",
    name: "Poodle",
    species: "dog",
    premium: true,
    speed: 1.0,
    scale: 0.95,
    primary: "#e8e2da",
    secondary: "#ffffff",
    pattern: "none",
    build: {
      bodyLen: 1.0,
      bodyH: 0.6,
      legLen: 0.55,
      headR: 0.3,
      snoutLen: 0.22,
      ear: "floppy",
      tail: "bob",
      fur: "curly",
    },
  },
  {
    id: "pug",
    name: "Pug",
    species: "dog",
    premium: true,
    speed: 0.88,
    scale: 0.7,
    primary: "#d9c2a0",
    secondary: "#3a3230",
    pattern: "mask",
    build: {
      bodyLen: 0.85,
      bodyH: 0.5,
      legLen: 0.3,
      headR: 0.36,
      snoutLen: 0.1,
      ear: "button",
      tail: "curled",
      fur: "short",
    },
  },
  {
    id: "mutt",
    name: "Mutt (random)",
    species: "dog",
    premium: false,
    speed: 1.0,
    scale: 1.0,
    primary: "#a0855b",
    secondary: "#e5d8c3",
    pattern: "spots",
    build: {
      bodyLen: 1.1,
      bodyH: 0.58,
      legLen: 0.45,
      headR: 0.31,
      snoutLen: 0.27,
      ear: "floppy",
      tail: "straight",
      fur: "short",
    },
  },
  {
    id: "tabby",
    name: "Tabby Cat",
    species: "cat",
    premium: false,
    speed: 1.12,
    scale: 0.82,
    primary: "#9b7653",
    secondary: "#4f3b2b",
    pattern: "stripes",
    build: {
      bodyLen: 1.08,
      bodyH: 0.48,
      legLen: 0.48,
      headR: 0.28,
      snoutLen: 0.1,
      ear: "pointy",
      tail: "long",
      fur: "short",
    },
  },
  {
    id: "tuxedo",
    name: "Tuxedo Cat",
    species: "cat",
    premium: false,
    speed: 1.08,
    scale: 0.84,
    primary: "#25262b",
    secondary: "#f4f1e8",
    pattern: "socks",
    build: {
      bodyLen: 1.05,
      bodyH: 0.5,
      legLen: 0.5,
      headR: 0.29,
      snoutLen: 0.1,
      ear: "pointy",
      tail: "long",
      fur: "short",
    },
  },
  {
    id: "siamese",
    name: "Siamese Cat",
    species: "cat",
    premium: false,
    speed: 1.14,
    scale: 0.8,
    primary: "#e4d4b8",
    secondary: "#59453b",
    pattern: "mask",
    build: {
      bodyLen: 1.08,
      bodyH: 0.46,
      legLen: 0.54,
      headR: 0.27,
      snoutLen: 0.09,
      ear: "pointy",
      tail: "long",
      fur: "short",
    },
  },
  {
    id: "calico",
    name: "Calico Cat",
    species: "cat",
    premium: false,
    speed: 1.06,
    scale: 0.85,
    primary: "#f0e7d8",
    secondary: "#d77b3d",
    pattern: "spots",
    build: {
      bodyLen: 1.05,
      bodyH: 0.5,
      legLen: 0.48,
      headR: 0.3,
      snoutLen: 0.1,
      ear: "pointy",
      tail: "long",
      fur: "fluffy",
    },
  },
  {
    id: "raccoon",
    name: "Woodland Raccoon",
    species: "raccoon",
    premium: false,
    speed: 1.02,
    scale: 0.88,
    primary: "#777b7d",
    secondary: "#272a2d",
    pattern: "mask",
    build: {
      bodyLen: 1.05,
      bodyH: 0.56,
      legLen: 0.38,
      headR: 0.31,
      snoutLen: 0.16,
      ear: "button",
      tail: "ringed",
      fur: "fluffy",
    },
  },
  {
    id: "silver-raccoon",
    name: "Silver Raccoon",
    species: "raccoon",
    premium: false,
    speed: 1.0,
    scale: 0.9,
    primary: "#a8adb3",
    secondary: "#363b42",
    pattern: "mask",
    build: {
      bodyLen: 1.08,
      bodyH: 0.58,
      legLen: 0.4,
      headR: 0.32,
      snoutLen: 0.16,
      ear: "button",
      tail: "ringed",
      fur: "fluffy",
    },
  },
  {
    id: "cinnamon-raccoon",
    name: "Cinnamon Raccoon",
    species: "raccoon",
    premium: false,
    speed: 1.04,
    scale: 0.86,
    primary: "#9a694f",
    secondary: "#3f302d",
    pattern: "mask",
    build: {
      bodyLen: 1.02,
      bodyH: 0.54,
      legLen: 0.39,
      headR: 0.3,
      snoutLen: 0.15,
      ear: "button",
      tail: "ringed",
      fur: "fluffy",
    },
  },
];

export const CHARACTER_MAP = Object.fromEntries(
  CHARACTER_PRESETS.map((preset) => [preset.id, preset]),
);

export const SPECIES = ["dog", "cat", "raccoon"];
export const PATTERNS = ["none", "mask", "socks", "spots", "saddle", "stripes"];
export const ACCESSORIES = ["none", "bandana", "hat", "glasses"];

/** Deterministic RNG from a string seed (used for the Mutt mixer). */
export function seedRng(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

const MUTT_COLORS = [
  "#a0855b",
  "#6b5b4a",
  "#c9a96e",
  "#8a8a8a",
  "#b0713c",
  "#4a4038",
  "#e0d5c0",
];
const EARS = ["pointy", "floppy", "button"];
const TAILS = ["curled", "straight", "bob", "flag"];
const FURS = ["short", "fluffy"];

/**
 * Mutt mixer — deterministically blends breed traits from a seed (player name),
 * so your random mutt looks the same every session.
 */
export function makeMutt(seedStr) {
  const rng = seedRng(seedStr || "mutt");
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const primary = pick(MUTT_COLORS);
  const secondary = pick(MUTT_COLORS);
  return {
    ...CHARACTER_MAP.mutt,
    primary,
    secondary,
    pattern: pick(PATTERNS),
    speed: 0.95 + rng() * 0.2,
    scale: 0.8 + rng() * 0.4,
    build: {
      bodyLen: 0.9 + rng() * 0.5,
      bodyH: 0.45 + rng() * 0.25,
      legLen: 0.25 + rng() * 0.35,
      headR: 0.26 + rng() * 0.1,
      snoutLen: 0.15 + rng() * 0.2,
      ear: pick(EARS),
      tail: pick(TAILS),
      fur: pick(FURS),
    },
  };
}

/** Resolve a customization's breed def (mutts are mixed from the dog's name). */
export function resolveCharacter(custom) {
  if (custom.breed === "mutt") return makeMutt(custom.name || "mutt");
  return CHARACTER_MAP[custom.breed] || CHARACTER_MAP.shiba;
}

export function defaultCustomization() {
  return {
    breed: "shiba",
    primary: "#d98e4a",
    secondary: "#f7ead9",
    pattern: "socks",
    size: 1.0,
    collar: "#d23b3b",
    accessory: "none",
    name: "",
  };
}
