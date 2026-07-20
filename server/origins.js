export function parseAllowedOrigins(value = "") {
  return new Set(String(value).split(",").map(normalizeOrigin).filter(Boolean));
}

export function isOriginAllowed(origin, allowedOrigins) {
  if (!allowedOrigins.size) return true;
  const normalized = normalizeOrigin(origin);
  return normalized !== null && allowedOrigins.has(normalized);
}

function normalizeOrigin(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}
