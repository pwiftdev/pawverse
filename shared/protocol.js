// ─── PAWVERSE wire protocol ──────────────────────────────────────────────────
// JSON messages over a single WebSocket at path /ws.

export const C2S = {
  JOIN: "join", // { t, name, dog }                    dog = customization object
  INPUT: "in", // { t, seq, f,b,l,r, sprint, jump, yaw, dt }
  BARK: "bark", // { t }
  BITE: "bite", // { t, target }                       target player id
  EMOTE: "emote", // { t, emote }                        sit|lay|wag|roll|dig|howl|none
  GRAB: "grab", // { t, ball }                         ball id
  DROP: "drop", // { t }
  THROW: "throw", // { t, dir:[x,y,z], power }           power 0..1
  CHAT: "chat", // { t, text }
  SNIFF: "sniff", // { t }                               discover nearby scent
};

export const S2C = {
  WELCOME: "welcome", // { t, id, tick, you, dogs, balls, npcs, raccoons, digs, settings }
  STATE: "state", // { t, tick, ack, dogs, balls, npcs, raccoons, digs }  interest-filtered
  JOIN: "join", // { t, dog }                          a dog entered your radius
  LEAVE: "leave", // { t, id }
  EVENT: "ev", // { t, kind, ... }                    see EVENTS
  SCORE: "score", // { t, zoomies, happiness, treats, rep, life, maxLife }
  LEADERBOARD: "lb", // { t, top: [{n, z}...], rank }       every few seconds
  PARK: "park", // { t, event }                         community event state
};

export const EVENTS = {
  BARK: "bark", // { id, p:[x,y,z] }
  YELP: "yelp", // { id, p }
  BITE: "bite", // { from, to, p, life, maxLife }
  CAUGHT: "caught", // { by, target, p, respawn, protectedUntil }
  HOWL: "howl", // { id, p }
  GROUP_HOWL: "grouphowl", // { ids, p }
  PICKUP: "pickup", // { dog, ball, caught }  caught = mid-air catch
  DROP: "drop", // { dog, ball, p }
  THROW: "throw", // { dog, ball }
  PET: "pet", // { npc, dog }
  FEED: "feed", // { npc, dog, treats }
  SCARE: "scare", // { npc, p }
  CHAT: "chat", // { id, text }
  SPLASH: "splash", // { p }
  CHASE: "chase", // { dog, p }            raccoon chased up a tree
  TREASURE: "treasure", // { dog, spot, loot, zoomies, p }  dug up a treasure
  ECHO: "echo", // { id, p }             howl from Howl Rock (park-wide)
  TRICK: "trick", // { dog, npc, p }       trick show for a human
  SNIFF: "sniff", // { dog, p }            sniff pulse
  DISCOVERY: "discovery", // { dog, spot, label, kind, p }
  GREET: "greet", // { dog, npc, p }        familiar human greeting
  PARK_COMPLETE: "parkcomplete", // { event, ids, p }
};

// ─── Entity shapes (plain JSON) ──────────────────────────────────────────────
// dog:  { id, n:name, c:customization, p:[x,y,z], ry, v:[vx,vy,vz],
//         anim, ball:ballId|null, chat:{text,until}|null }
// ball: { id, spawner, p:[x,y,z], v:[vx,vy,vz], holder:dogId|null, thrownBy }
// npc:  { id, p:[x,y,z], ry, st:'idle'|'walk'|'pet'|'flinch'|'flee' }
//
// customization: { breed, primary, secondary, pattern, size, collar, accessory, name }
//   breed:    a CHARACTER_PRESETS id (dogs, cats, and raccoons)
//   pattern:  none|mask|socks|spots|saddle|stripes
//   accessory: none|bandana|hat|glasses
//   collar:   '#rrggbb' | null
//   size:     0.7 .. 1.4
