// Shared data for exploration and rotating community activities.

import { DOG_HOUSE, FENCED_YARD, FOUNTAIN, HOWL_ROCK } from "./world.js";

export const SCENT_SPOTS = [
  {
    id: "fountain",
    label: "Fountain Wishes",
    kind: "landmark",
    x: FOUNTAIN.x,
    z: FOUNTAIN.z,
  },
  {
    id: "howl-rock",
    label: "Ancient Howl Rock",
    kind: "landmark",
    x: HOWL_ROCK.x,
    z: HOWL_ROCK.z,
  },
  {
    id: "yard-gate",
    label: "Paw Park Gate",
    kind: "place",
    x: FENCED_YARD.x + FENCED_YARD.w / 2,
    z: FENCED_YARD.z,
  },
  {
    id: "dog-house",
    label: "Cozy Dog House",
    kind: "place",
    x: DOG_HOUSE.x,
    z: DOG_HOUSE.z,
  },
  { id: "sea-shells", label: "Salty Seashells", kind: "nature", x: 66, z: 23 },
  { id: "old-oak", label: "The Old Oak", kind: "nature", x: 18, z: -42 },
  {
    id: "sunset-view",
    label: "Sunset Lookout",
    kind: "vista",
    x: HOWL_ROCK.x,
    z: HOWL_ROCK.z + 9,
  },
  {
    id: "north-meadow",
    label: "North Meadow Breeze",
    kind: "vista",
    x: -15,
    z: 70,
  },
];

export const PARK_EVENT_DEFS = [
  { kind: "fetch", label: "Pack Fetch Frenzy", target: 6 },
  { kind: "howl", label: "Moon Chorus", target: 3 },
  { kind: "treasure", label: "Treasure Trail", target: 3 },
  { kind: "chase", label: "Squirrel Patrol", target: 4 },
  { kind: "trick", label: "Park Talent Show", target: 3 },
];

export const SCENT_DISCOVERY_RADIUS = 4.5;
export const SCENT_REVEAL_RADIUS = 36;
export const PARK_EVENT_DURATION_MS = 120_000;
export const PARK_EVENT_CELEBRATION_MS = 10_000;
