# 🚀 BOOSTER — $BOOSTER

**One tower. One summit. The first blob to reach the 5,000 m top takes the
entire $BOOSTER creator-reward pool for the cycle. Send it.**

Drop into a live, persistent tower at any moment as a squishy googly-eyed blob.
Your altitude is your score, ticking live above your head. Climb the platform
helix from the meadow through the cloud layer, the honey sunset, the dusk
crystals, deep space, the nebula, and the white-gold summit approach. Ride
**booster pads** for rocket launches, bank **checkpoint rest rings**, bump and
shove other blobs off ledges — and when you fall (you will fall), everyone
hears about it.

- **The prize** — reaching the Summit wins the cycle's creator rewards. Join
  with a Solana wallet address to be reward-eligible; without one it's free
  play — you can climb, but you can't win. Press **ESC** in game for the full
  standings with every player's public wallet (one-click copy).
- **No rounds, no lobbies** — the world never resets; you join mid-chaos and
  the screen explains itself: higher = winning.
- **Booster pads** — the signature $BOOSTER mechanic: orange rocket pads that
  launch you ~5 platforms of altitude in one screaming whoosh.
- **Checkpoints** — every rest ring you land on is banked; falling into the
  cloud sea rescues you to your last ring, not the bottom. Progress sticks.
- **The crown** — the current highest blob wears a crown and casts a golden
  beacon visible across the whole tower. Go take it.
- **Falls are content** — big falls are broadcast (`💀 Wobbles fell 214m`),
  landings squash, the cloud sea catches anyone who drops off the island.
- **Highscores, not matches** — live "highest now" board plus a persistent
  all-time top-10; new tower records are announced to everyone.

## Quick start

```bash
npm install
npm run dev
```

- Game client → http://localhost:5173
- Authoritative server → http://localhost:8080 (`/api/health`, WS at `/ws`)

Open **two browser tabs** to see real-time multiplayer: climb, bump, shove and
chat — each tab sees the other blob live.

No accounts, no assets — characters, tower, sky, and audio are all generated
procedurally at runtime.

## Controls

| Input        | Action                                       |
| ------------ | -------------------------------------------- |
| Click canvas | Pointer lock / mouse-look                    |
| WASD         | Move (relative to camera)                    |
| Shift        | Sprint                                       |
| Space        | Jump (coyote time + edge grace, no auto-hop) |
| F            | Shove the blob in front of you (1.5 s cd)    |
| Enter        | Chat bubble                                  |
| M            | Mute / unmute                                |

## Game systems

- **The tower** — a deterministic platform helix generated from a fixed seed at
  module load, identical on server and client. Every consecutive hop is
  verified against the jump envelope (max rise 1.6 m vs. a 1.76 m apex, capped
  edge gaps), so nothing is ever unreachable — the test suite asserts this for
  all ~4,300 platforms up to the 5,000 m Summit flag.
- **A real difficulty curve** — every hop has a REQUIRED edge gap that ramps
  with altitude: ~0.6 m on the island, ~1.8 m mid-tower, ~2.7 m up high —
  right against the 3.1 m sprint-jump limit. Platforms shrink, side routes
  thin out, and rest rings spread apart the higher you climb; reading each
  gap and choosing walk vs. sprint IS the game.
- **Platform shapes with real collision** — round discs, hexagonal slabs
  (honeycomb in the honey band), and long rotated plank bridges; the same
  shape math runs in server physics and client prediction.
- **Platform types** — normal, **bouncy pads** (small hop), **booster pads**
  (🚀 rocket launch worth ~5 platforms, appear above 140 m; any pad shadowed
  by an overhang is demoted at generation so a launch never hits a ceiling),
  **honey** (sticky and slow, the sunset band's signature), **ice** (barely
  any grip, above ~500 m), and big **rest rings** every ~60 m that double as
  **checkpoints** — fall into the cloud sea and you're rescued to your last
  ring.
- **Altitude zones** — sky, fog, lighting, platform palette, decor, and the
  ambient music chord all shift with height: meadow (flowers) → cloud layer →
  honey sunset → dusk crystals → deep space neon → golden reach → nebula
  (procedural two-tone dust in the sky shader) → white-gold summit approach.
  Entering a new zone is announced on screen.
- **Movement feel** — momentum on the ground, floatier air steering, coyote
  time off ledges, one-way platforms (jump up through, land on top),
  squash-and-stretch landings with dust, camera FOV kick and screen shake on
  hard impacts, a fall whistle when you're really plummeting.
- **Blob vs blob** — server-authoritative body bumps with comedic restitution
  and an aimed **shove** (cone check, lift, recoil, cooldown). The island base
  below 4 m is a truce zone so spawns can't be bullied.
- **Fall drama** — the server tracks each blob's high-water mark; landing 25 m+
  below it emits a local fall event, 60 m+ is broadcast tower-wide. Falling
  into the cloud sea poofs you back to the island.
- **Crown & beacon** — leaderboard every 2 s picks the live leader (above
  20 m); crown changes are announced, and the leader's position carries a
  golden light beam everyone can navigate by.
- **Highscores** — per-run session best feeds a persistent all-time top-10
  (JSON on disk, best-effort), deduped by name; only a new #1 is announced as
  a tower record. Personal lifetime best also persists in the browser.
- **Multiplayer** — authoritative Node server at 30 Hz, 15 Hz snapshots with
  3D interest management (80 m radius culling — height separation culls too),
  client-side prediction + server reconciliation for your own blob (bumps and
  shoves arrive as smoothed corrections), 150 ms interpolation for everyone
  else.
- **HUD** — big live altitude readout with progress-to-best bar, live top-5 +
  all-time board with your rank, event feed, milestone flashes every 100 m,
  toasts, projected name/altitude labels with chat bubbles, and a
  drop-in-3-seconds join screen (name + colour, nothing else).

## Configuration

Set `VITE_*` vars for the client at build time:

| Var               | Purpose                                                   |
| ----------------- | --------------------------------------------------------- |
| `PORT`            | Server port (default 8080)                                |
| `ALLOWED_ORIGINS` | Comma-separated browser origins allowed on `/ws`          |
| `VITE_WS_URL`     | Override WS endpoint, e.g. `wss://your-server.fly.dev/ws` |

## Architecture

```
/client   Vite + three.js (vanilla ESM, no React)
  src/net.js         WS client, prediction ring buffer, reconciliation, interpolation
  src/blob.js        procedural blob characters (googly eyes, crown)
  src/animator.js    squash & stretch, waddle, flail, blink — no rigs, no assets
  src/tower-view.js  sky/star/sun shaders, altitude zones, instanced platform
                     window, island, cloud sea + sprites, leader beacon
  src/effects.js     pooled particles: dust, bump stars, confetti, poofs
  src/audio.js       100% procedural WebAudio (wind by altitude, zone chords,
                     boings, whistles, fanfares)
  src/hud.js         altitude readout, boards, feed, toasts, labels, chat
  src/main.js        orchestration: camera, fixed-rate input loop, events
/server   Express + ws, authoritative simulation
  game.js            the room: players, inputs, bumps, shoves, falls, crown
  highscores.js      persistent all-time top-10
  interest.js        3D interest filtering
  test/multiplayer.test.mjs  50 checks: sync, PvP, tower invariants, movement
/shared   The contract. Imported by BOTH sides (single source of truth):
  protocol.js        message shapes (C2S/S2C/EVENTS) and entity schemas
  movement.js        the exact platformer integrator — server steps it
                     authoritatively, client steps it for prediction
  tower.js           the deterministic tower: island dome, platform helix,
                     spatial index, landing/support queries
  constants.js       tick rates, physics, PvP tuning, scoring, palette
```

**Why this stack:** raw `ws` instead of a framework (one authoritative room;
the shared-integrator pattern gives prediction/reconciliation without one),
hand-rolled deterministic platformer physics instead of a physics engine (the
same integrator must run bit-for-bit on both sides — an engine can't be
mirrored this cheaply), DOM HUD instead of in-canvas UI (crisp text, free
layout). Everything is procedural, so the first paint needs zero asset fetches
— the whole game is one ~137 KB gzipped bundle.

## Testing

```bash
npm test
```

Spins up the real server and connects real WebSocket clients: movement
replication and dt clamping, acks, shove cone/cooldown/truce-zone, bump
separation, BIGFALL/VOIDED/CROWN/RECORD events, leaderboard shape, 3D interest
culling, origin allowlisting — plus unit sweeps of the tower generator
(reachability of every platform), the movement integrator (jump arcs, one-way
landings, bouncy pads, edge walk-offs, void rescue), and the highscore board.

## Deploy

The repository includes `client/vercel.json`, a Heroku `Procfile`, and pinned
Node/npm runtimes.

### Heroku server

1. Create a Heroku app from this repository (Basic+ dyno for an always-on
   server) and keep it at one dyno: the tower is intentionally one in-memory
   room. `heroku ps:scale web=1 -a <app>`.
2. Restrict WebSocket origins:

   ```bash
   heroku config:set ALLOWED_ORIGINS=https://<project>.vercel.app -a <app>
   ```

3. Deploy and verify `https://<app>.herokuapp.com/api/health`.

Heroku supplies `PORT`; don't set it manually. The server closes sockets on
`SIGTERM`. An empty `ALLOWED_ORIGINS` permits all origins for local
development, so always configure it in production. All-time highscores persist
to `server/data/highscores.json` (ephemeral on Heroku restarts; point it at a
mounted disk on hosts that have one).

### Vercel client

Import the repository, set Root Directory to `client` (keep "include files
outside root" enabled — the client imports from `shared/`), and add:

```text
VITE_WS_URL=wss://<app>.herokuapp.com/ws
```

Redeploy after changing a `VITE_*` value. The browser retries lost connections
with capped exponential backoff; a reconnect drops you back onto the island of
the live tower as a fresh run.

## Notes & limits (vertical slice)

- One global room; all-time highscores are name-keyed (no accounts yet).
- Shoves/bumps below 4 m altitude are disabled so the spawn island stays a
  truce zone.
- The tower ends at the 5,000 m Summit flag. Nobody has been there.
