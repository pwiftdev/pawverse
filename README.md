# 🐕 PAWVERSE

An open-world multiplayer dog simulator on Solana. Run around a stylized park as a
custom dog, fetch balls, bark at NPC humans, sit for pets, chase squirrels, dig up
buried treasure, howl with the pack — all synced in real time, with wallet-based
identity and premium cosmetics.

## Quick start

```bash
npm install
npm run dev
```

- Game client → http://localhost:5173
- Authoritative server → http://localhost:8080 (`/api/health`, WS at `/ws`)

Open **two browser tabs** to see real-time multiplayer: move, fetch, bark, bite,
and chat — each tab sees the other dog live.

No wallet, no NFTs, no external assets required. Everything (dogs, world, audio)
is generated procedurally at runtime.

## Controls

| Input                  | Action                                                           |
| ---------------------- | ---------------------------------------------------------------- |
| Click canvas           | Pointer lock / mouse-look                                        |
| WASD                   | Move (relative to camera)                                        |
| Shift                  | Sprint                                                           |
| Space                  | Jump (real arc physics)                                          |
| B                      | Bark (3D positional sound + ripple, scares NPCs, 1.5 s cooldown) |
| F                      | Play-bite nearest dog (purely social, no damage)                 |
| C                      | Sit (near an NPC → they pet & feed you)                          |
| X / V / R / G / H      | Lay down / wag tail / roll over / dig / howl                     |
| M                      | Mute / unmute sound                                              |
| N                      | Sniff for scent trails and nearby discoveries                    |
| J                      | Open the persistent Trail Journal                                |
| E                      | Grab / drop ball                                                 |
| Hold LMB or Q, release | Aim & charge-throw ball (power bar)                              |
| Enter                  | Chat bubble                                                      |
| Swim                   | Just walk into the sea or the fountain                           |

## Game systems

- **Terrain** — real highground: rolling lawns plus two landmark hills (Sunset
  Hill in the south with the Howl Rock stone circle on its summit, and the
  North Meadow rise), rock-shaded steep faces, all masked flat around gameplay
  areas. The height field is shared code, so the server simulates exactly the
  slopes you see.
- **Day/night cycle** — a full day every 8 minutes, synced from the server
  clock: the sun arcs over the sea, sunsets tint the sky and water, then stars,
  a cratered moon, glowing lamp posts, fireflies, and cricket song take over
  (birdsong and butterflies by day).
- **Living Park** — rotating community events ask everyone in the park to fetch,
  howl, dig, chase, or perform tricks together. Contributors share a completion
  reward, while wind, wildlife, foliage, petals, and water wakes react to play.
- **Sniff exploration** — dog-sense pulses reveal scent trails leading to eight
  server-validated landmarks and vistas. Discoveries persist in the local Trail
  Journal alongside earned XP, explorer levels, goals, and completed park events.
- **NPC memory and routines** — joggers, walkers, trainers, and picnickers move
  at different rhythms. Humans remember dogs that treated them well or scared
  them and greet familiar friendly dogs on later encounters.
- **Howl Rock** — howl from the summit stone circle and your howl echoes across
  the whole park (+5 Zoomies, park-wide event, 60 s cooldown).
- **Trick shows** — perform 3 _different_ emotes within 6 s while a human is
  within 8 m: applause, +5 Zoomies, +1 treat, +rep.
- **Movement feel** — momentum-based acceleration (deterministic, shared with
  prediction), a bounding gallop at sprint, lean into turns, landing
  squash-and-stretch with dust + thud, fading paw print trails, water wakes,
  reactive ears, and attention tracking toward nearby animals.

- **Fetch** — balls spawn on colored pads. Grab (+2 Zoomies), catch mid-air (+5),
  return to a pad (+10). Throw with charged aim. Balls bounce off trees and
  furniture with real reflection physics.
- **Social** — sit/lay/wag near an NPC human and they'll walk over, pet you, and
  feed you treats (+happiness, +treats, +rep). Bark at or bite near them and they
  flee (−rep). Reputation meter runs **Good Boy ↔ Menace**.
- **Squirrels** — 7 of them forage under the trees. Get close and they freeze,
  then bolt. Tag one mid-flee (+8 Zoomies) and it escapes up a tree, reappearing
  elsewhere later.
- **Buried treasure** — sparkling dirt mounds hide loot. Dig (G) on one for a
  couple of seconds to unearth a bone (+10), a great stick (+15), or something
  shiny (+30). Mounds refill on a 45 s cooldown.
- **Group howl** — two or more dogs howling near each other within 3 s each get
  +10 Zoomies and a synced chorus.
- **Collisions** — trees, benches, treat stands, the dog house, and the yard
  fence are all solid, resolved by the same shared code on server and client so
  prediction never fights the server. Benches are low: jump over them. The yard
  fence isn't: use the gate.
- **Leaderboard & goals** — live Top Dogs board (by Zoomies) broadcast every 3 s,
  plus a "Pup Goals" checklist (bark, fetch, mid-air catch, get petted, swim,
  group howl, squirrel chase, treasure dig) tracked on the HUD.
- **Multiplayer** — authoritative Node server at 30 Hz, 15 Hz snapshots with
  interest management (70 m radius culling, 50+ dogs per zone), client-side
  prediction + server reconciliation for your own dog, 150 ms interpolation for
  everyone else.
- **Customization** — a full creator screen: breed cards with stat bars (10
  breeds incl. a deterministic Mutt mixer), coat palettes + custom colors,
  patterns, size, collar colors, accessories, drag-to-rotate preview with poses,
  and a one-click randomizer. Saved to localStorage, and to your wallet address
  when connected.
- **HUD** — minimap with live positions of dogs and squirrels, leaderboard,
  objectives, rotating park-event progress, mood needs, persistent Trail Journal,
  clickable emote bar, toasts, and chat bubbles.

## Solana

- **Connect Wallet** supports Phantom / Backpack / any injected `window.solana`
  provider via `@solana/web3.js` (no auto-approvals — every transaction requires
  explicit wallet confirmation; the stub mint flow only _signs_ when you click).
- Wallet address = persistent dog identity (loadout saved per address).
- **Premium gate** — set `VITE_PREMIUM_MINT` to an SPL token mint; holders unlock
  premium breeds (Doberman, Poodle, Pug). Unset = everything unlocked.
- **Dog NFT skins** — `fetchDogNfts()` is a clean mock (returns `[]`, works with
  zero NFTs) with the Metaplex/indexer extension point marked in the code.
- **`mintDog()`** — devnet stub that builds a transaction embedding your dog's
  metadata and asks the wallet to sign. Clearly commented as the future mint.

## Configuration

Copy `.env.example` to `.env` (server) and set `VITE_*` vars for the client:

| Var                   | Purpose                                                   |
| --------------------- | --------------------------------------------------------- |
| `PORT`                | Server port (default 8080)                                |
| `ALLOWED_ORIGINS`     | Comma-separated browser origins allowed on `/ws`          |
| `VITE_SOLANA_NETWORK` | `devnet` (default), `testnet`, `mainnet-beta`             |
| `VITE_SOLANA_RPC`     | RPC endpoint (default public devnet)                      |
| `VITE_PREMIUM_MINT`   | SPL mint that unlocks premium content (empty = off)       |
| `VITE_WS_URL`         | Override WS endpoint, e.g. `wss://your-server.fly.dev/ws` |

## Architecture

```
/client   Vite + three.js (vanilla ESM, no React)
  src/net.js         WS client, prediction ring buffer, reconciliation, interpolation
  src/dogfactory.js  procedural low-poly dogs/humans/squirrels (shared/breeds.js)
  src/animator.js    procedural gait/pose animation (no rigs, no assets)
  src/world.js       park visuals rendered FROM shared/world.js data (sky/water
                     shaders, terrain, trees, props, dig mounds, ambient life)
  src/effects.js     rings, bursts, hearts, loot popups
  src/audio.js       100% procedural WebAudio (barks, howls, birds, sea)
  src/hud.js         scorecards, minimap, leaderboard, goals, emote bar
  src/lobby.js       character creator (tabs, palettes, poses, randomizer)
  src/solana.js      wallet connect, premium gate, NFT mock, mint stub
/server   Express + ws, authoritative simulation
  game.js            the room: players, inputs, events, scoring, leaderboard
  balls.js           ball physics incl. collider bounces
  npcs.js            human AI (wander/pet/flee)
  squirrels.js       squirrel AI (forage/alert/flee/hide + chase rewards)
  digspots.js        buried-treasure state machine
  test/multiplayer.test.mjs  two-client sync + collision + systems tests
/shared   The contract. Imported by BOTH sides (single source of truth):
  protocol.js        message shapes (C2S/S2C/EVENTS) and entity schemas
  movement.js        the exact integrator (incl. obstacle push-out) — server
                     steps it authoritatively, client steps it for prediction
  world.js           terrain, water, tree/bench/prop placement, colliders,
                     walls, dig spots — collision and visuals share one dataset
  constants.js       tick rates, speeds, radii, cooldowns, scoring, loot table
  breeds.js          breed stats + procedural build params + Mutt mixer
```

**Why this stack:** raw `ws` instead of Colyseus (fewer moving parts for one
authoritative room; the shared-integrator pattern gives prediction/reconciliation
without a framework), hand-rolled arcade physics instead of cannon-es/rapier (the
movement model is deterministic and shared between both sides — a physics engine
can't be mirrored this cheaply, and jump arcs/ball bounces are fully covered),
injected wallet providers instead of `@solana/wallet-adapter` (no React in the
client; adapter would drag in the whole React tree). Everything else matches the
spec: three.js + WebGL, Express + WebSocket, Vite, devnet-by-default Solana.

## Testing

```bash
npm test
```

Spins up the real server and connects two WebSocket clients: asserts that
movement from A appears in B's snapshots, bark and chat events propagate, and the
interest-management filter culls out-of-range dogs.

## Deploy

The repository includes `vercel.json`, a Heroku `Procfile`, and pinned Node/npm
runtimes.

### Heroku server

1. Create a Heroku app from this repository and select a Basic or higher web
   dyno for an always-on game server.
2. Keep the process at one dyno: `heroku ps:scale web=1 -a <heroku-app>`. The
   current authoritative park is intentionally an in-memory single room.
3. Set the exact browser origins that may open WebSockets:

   ```bash
   heroku config:set \
     ALLOWED_ORIGINS=https://<vercel-project>.vercel.app,https://<custom-domain> \
     -a <heroku-app>
   ```

4. Deploy and verify `https://<heroku-app>.herokuapp.com/api/health`.

Heroku supplies `PORT`; do not configure it manually. The server handles
`SIGTERM` by closing active sockets before the dyno exits. An empty
`ALLOWED_ORIGINS` permits all origins for local development, so always configure
it on Heroku. Add every exact Vercel preview origin you intentionally support.

### Vercel client

Import the repository root. `vercel.json` runs `npm run build` and publishes
`client/dist`. Add these build-time environment variables for Production and any
Preview environments you use:

```text
VITE_WS_URL=wss://<heroku-app>.herokuapp.com/ws
VITE_SOLANA_NETWORK=devnet
VITE_SOLANA_RPC=https://api.devnet.solana.com
```

Redeploy after changing a `VITE_*` value. The browser automatically retries a
lost or stale game connection with capped exponential backoff; a reconnect joins
the current live park as a fresh server session.

## Notes & limits (vertical slice)

- NPC petting and greetings have per-dog cooldowns so rewards cannot be farmed.
- Journal progression is stored in the browser; account-level cloud persistence
  is still the natural follow-up for wallet identities.
- Server scores and live world state reset on a Heroku restart or deployment.
- All audio is synthesized; swap in real clips by replacing `client/src/audio.js`.
