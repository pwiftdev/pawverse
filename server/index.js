// ─── PAWVERSE authoritative server ───────────────────────────────────────────
// Express (HTTP API + optional static client) + WebSocket (/ws) on one HTTP
// server, driving the authoritative game loop at TICK_RATE.
//
// Exports createServer({ port }) for tests/embedding; only listens when run
// directly (`node server/index.js`).

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import { WebSocketServer } from "ws";
import { TICK_RATE } from "../shared/constants.js";
import { Game } from "./game.js";
import { isOriginAllowed, parseAllowedOrigins } from "./origins.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createServer({
  port = Number(process.env.PORT) || 8080,
  allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS),
} = {}) {
  const app = express();
  const game = new Game();

  // Health probe
  app.get("/api/health", (req, res) => {
    res.json({
      ok: true,
      players: game.players.size,
      uptime: process.uptime(),
    });
  });

  // Production mode: serve the built client with SPA fallback.
  const dist = path.resolve(__dirname, "../client/dist");
  if (fs.existsSync(path.join(dist, "index.html"))) {
    app.use(express.static(dist));
    app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html")));
  }

  const server = http.createServer(app);
  const wss = new WebSocketServer({
    server,
    path: "/ws",
    verifyClient: ({ origin }, done) => {
      if (isOriginAllowed(origin, allowedOrigins)) {
        done(true);
        return;
      }
      done(false, 403, "Origin not allowed");
    },
  });
  wss.on("connection", (ws) => game.handleConnection(ws));

  // Fixed-rate simulation loop (snapshots every Nth tick, see Game).
  const tickTimer = setInterval(() => game.step(), 1000 / TICK_RATE);
  tickTimer.unref?.();

  return {
    app,
    server,
    wss,
    game,
    port,
    /** Listen; resolves with the actual bound port. */
    listen: () =>
      new Promise((resolve) => {
        server.listen(port, () => resolve(server.address().port));
      }),
    /** Stop the loop and close everything (test teardown). */
    close: () =>
      new Promise((resolve) => {
        clearInterval(tickTimer);
        for (const client of wss.clients) client.terminate();
        wss.close();
        server.closeAllConnections?.();
        server.close(() => resolve());
      }),
  };
}

// Run directly → start the server.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const instance = createServer();
  instance.listen().then((port) => {
    console.log(`[pawverse] server listening on :${port} (ws: /ws)`);
  });

  let shuttingDown = false;
  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`[pawverse] ${signal} received, closing connections`);
    instance.close().finally(() => process.exit(0));
  };
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}
