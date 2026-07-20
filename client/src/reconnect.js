export const SOCKET_STALE_MS = 10_000;
export const SOCKET_WATCHDOG_MS = 3_000;
export const SOCKET_CONNECT_TIMEOUT_MS = 10_000;

export function reconnectDelay(attempt, random = Math.random()) {
  const exponential = Math.min(15_000, 1_000 * 2 ** Math.min(attempt, 4));
  return Math.round(exponential * (0.8 + random * 0.4));
}
