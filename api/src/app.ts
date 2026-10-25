import { Hono, type MiddlewareHandler } from "hono";
import { cors } from "hono/cors";
import { parseRange, type Range } from "./dates.js";
import type { ReadsSource, UpstreamRead } from "./upstream.js";

/** An item read, as this API returns it: only what the blog shows. */
export interface Read {
  title: string;
  url: string | null;
  feed_title: string;
  read_at: string;
}

export const CACHE_TTL_MS = 5 * 60 * 1000;
/** Bounds memory, since anyone can ask for any range. */
const CACHE_MAX_ENTRIES = 256;
export const RATE_LIMIT_PER_MINUTE = 30;
/** Buckets for this many IPs at most; the fullest are dropped first. */
const RATE_LIMIT_MAX_IPS = 10_000;

export interface AppOptions {
  source: ReadsSource;
  allowedOrigins: string[];
  tzOffset: number;
  now?: () => number;
  log?: (message: string, fields: Record<string, unknown>) => void;
}

export function createApp(opts: AppOptions): Hono {
  const now = opts.now ?? Date.now;
  const log = opts.log ?? defaultLog;
  const allowed = new Set(opts.allowedOrigins);
  const reads = cachedReads(opts.source, now);
  const limiter = rateLimiter(RATE_LIMIT_PER_MINUTE, now);

  const app = new Hono();

  app.onError((err, c) => {
    log("unhandled error", { error: String(err) });
    return c.json({ error: "internal error" }, 500);
  });
  app.notFound((c) => c.json({ error: "not found" }, 404));

  app.get("/healthz", (c) => c.text("ok"));

  app.use("*", async (c, next) => {
    if (c.req.method !== "GET" && c.req.method !== "OPTIONS") {
      c.header("Allow", "GET, OPTIONS");
      return c.json({ error: "method not allowed" }, 405);
    }
    await next();
  });
  app.use("*", originGuard(allowed));
  app.use(
    "*",
    cors({
      origin: (origin) => (allowed.has(origin) ? origin : null),
      allowMethods: ["GET", "OPTIONS"],
      maxAge: 86400,
    }),
  );
  app.use("*", async (c, next) => {
    if (!limiter(clientIp(c.req.header("x-forwarded-for")))) {
      c.header("Retry-After", "2");
      return c.json({ error: "too many requests" }, 429);
    }
    await next();
  });

  app.get("/reads", async (c) => {
    const range = parseRange(c.req.query("from"), c.req.query("to"), new Date(now()), opts.tzOffset);
    if ("error" in range) return c.json({ error: range.error }, 400);

    let result: Read[];
    try {
      result = await reads(range);
    } catch (err) {
      log("upstream failed", { error: String(err), from: range.from, to: range.to });
      return c.json({ error: "could not reach the reading log" }, 502);
    }
    c.header("Cache-Control", "public, max-age=300");
    return c.json({ reads: result });
  });

  return app;
}

/**
 * Turns away requests from pages on other sites. Anyone can still call the
 * API without a browser; this only stops other sites embedding it.
 */
function originGuard(allowed: Set<string>): MiddlewareHandler {
  return async (c, next) => {
    const origin = c.req.header("origin");
    const referer = c.req.header("referer");
    let from: string | undefined;
    if (origin !== undefined) {
      from = origin;
    } else if (referer !== undefined) {
      try {
        from = new URL(referer).origin;
      } catch {
        from = "invalid";
      }
    }
    if (from !== undefined && !allowed.has(from)) {
      return c.json({ error: "forbidden" }, 403);
    }
    await next();
  };
}

/** The client's IP: the first entry of X-Forwarded-For, as Cloud Run sets it. */
function clientIp(forwardedFor: string | undefined): string {
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

/** Shapes shushu's reads for the blog: only the fields it shows, newest first. */
export function toReads(items: UpstreamRead[]): Read[] {
  return items
    .map((r) => ({ title: r.title, url: r.url ?? null, feed_title: r.feed_title, read_at: r.read_at }))
    .sort((a, b) => Date.parse(b.read_at) - Date.parse(a.read_at));
}

/**
 * Reads for a range, cached for CACHE_TTL_MS. Concurrent requests for the same
 * range share one upstream call; failures aren't cached.
 */
function cachedReads(source: ReadsSource, now: () => number): (range: Range) => Promise<Read[]> {
  const cache = new Map<string, { expires: number; value: Promise<Read[]> }>();
  return (range) => {
    const key = `${range.from}|${range.to}`;
    const hit = cache.get(key);
    if (hit && hit.expires > now()) return hit.value;
    cache.delete(key);

    const value = source(range).then(toReads);
    cache.set(key, { expires: now() + CACHE_TTL_MS, value });
    value.catch(() => {
      if (cache.get(key)?.value === value) cache.delete(key);
    });
    // Maps iterate in insertion order, so the first key is the oldest.
    while (cache.size > CACHE_MAX_ENTRIES) cache.delete(cache.keys().next().value!);
    return value;
  };
}

/** A token bucket per IP: `perMinute` requests a minute, in bursts of up to as many. */
function rateLimiter(perMinute: number, now: () => number): (ip: string) => boolean {
  const buckets = new Map<string, { tokens: number; at: number }>();
  const refillPerMs = perMinute / 60_000;
  return (ip) => {
    const t = now();
    const b = buckets.get(ip) ?? { tokens: perMinute, at: t };
    b.tokens = Math.min(perMinute, b.tokens + (t - b.at) * refillPerMs);
    b.at = t;
    // Re-insert so the map stays ordered by last use.
    buckets.delete(ip);
    buckets.set(ip, b);
    if (buckets.size > RATE_LIMIT_MAX_IPS) buckets.delete(buckets.keys().next().value!);
    if (b.tokens < 1) return false;
    b.tokens -= 1;
    return true;
  };
}

function defaultLog(message: string, fields: Record<string, unknown>): void {
  // Cloud Run turns JSON lines on stderr into structured log entries.
  console.error(JSON.stringify({ severity: "ERROR", message, ...fields }));
}
