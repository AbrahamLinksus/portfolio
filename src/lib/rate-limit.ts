/**
 * Sliding-window rate limit kept in memory.
 *
 * Good enough for a personal site: on Vercel each warm function instance
 * keeps its own window, so the effective limit is per instance. For a hard
 * global limit, swap this for a shared store such as Upstash Redis.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, { limit = 5, windowMs = 10 * 60_000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { ok: false as const, retryAfter };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing forever.
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return { ok: true as const };
}
