// ─── TOPPLE wire protocol ────────────────────────────────────────────────────
// JSON messages over a single WebSocket at path /ws.

export const C2S = {
  JOIN: "join", // { t, name, color, wallet }       color = BLOB_COLORS index;
  //                                                wallet = Solana address or
  //                                                '' (free play, no rewards)
  INPUT: "in", // { t, seq, f,b,l,r, sprint, jump, yaw, dt }
  SHOVE: "shove", // { t }                             shove nearest blob in front
  CHAT: "chat", // { t, text }
};

export const S2C = {
  WELCOME: "welcome", // { t, id, tick, you, players, best, settings }
  STATE: "state", // { t, tick, ack, players }         interest-filtered
  JOIN: "join", // { t, player }                       a blob entered the tower
  LEAVE: "leave", // { t, id }
  EVENT: "ev", // { t, kind, ... }                     see EVENTS
  LEADERBOARD: "lb", // { t, live, all, rank, leaderId, leaderPos }  every 2 s
};

export const EVENTS = {
  SHOVE: "shove", // { from, to, p }        a blob got launched
  BUMP: "bump", // { a, b, p }              two blobs collided hard
  BIGFALL: "bigfall", // { id, n, drop, alt, p }  someone lost serious height
  VOIDED: "voided", // { id, n, p }         someone fell into the cloud sea
  CROWN: "crown", // { id, n, alt }         a new leader took the top
  RECORD: "record", // { n, alt }           a new all-time highscore entry
  CHAT: "chat", // { id, text }
};

// ─── Entity shapes (plain JSON) ──────────────────────────────────────────────
// player: { id, n:name, col:colorIndex, p:[x,y,z], ry, v:[vx,vy,vz],
//           g:grounded(0|1), gt:groundType, cp:[cx,cy,cz] checkpoint,
//           anim, alt:currentAltitude, best:sessionBest,
//           chat:{text,until}|null }
// leaderboard rows: live [{ id, n, alt, w:wallet }], all [{ n, alt, w }]
