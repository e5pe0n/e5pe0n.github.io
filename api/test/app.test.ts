import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { createApp, RATE_LIMIT_PER_MINUTE, type AppOptions } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { fixturesSource, shushuSource, type UpstreamRead } from "../src/upstream.js";

const ORIGIN = "https://e5pe0n.github.io";
// 2026-10-25 09:00 in Tokyo.
const NOW = Date.parse("2026-10-25T00:00:00Z");

const items: UpstreamRead[] = [
  { id: 1, feed_id: 10, feed_title: "Rust Blog", url: "https://blog.rust-lang.org/a/", title: "Older", read_at: "2026-10-01T12:00:00Z" },
  { id: 2, feed_id: 11, feed_title: "LWN.net", url: null, title: "Newer", read_at: "2026-10-20T12:00:00Z" },
];

function setup(overrides: Partial<AppOptions> = {}) {
  const source = vi.fn(async () => items);
  const log = vi.fn();
  let now = NOW;
  const app = createApp({
    source,
    allowedOrigins: [ORIGIN],
    tzOffset: 540,
    now: () => now,
    log,
    ...overrides,
  });
  return { app, source, log, advance: (ms: number) => (now += ms) };
}

describe("GET /reads", () => {
  it("defaults to the last 30 days in Tokyo", async () => {
    const { app, source } = setup();
    const res = await app.request("/reads");
    expect(res.status).toBe(200);
    expect(source).toHaveBeenCalledWith({ from: "2026-09-26", to: "2026-10-25" });
  });

  it("returns only the public fields, newest first", async () => {
    const { app } = setup();
    const res = await app.request("/reads?from=2026-10-01&to=2026-10-25");
    expect(res.headers.get("cache-control")).toBe("public, max-age=300");
    expect(await res.json()).toEqual({
      reads: [
        { title: "Newer", url: null, feed_title: "LWN.net", read_at: "2026-10-20T12:00:00Z" },
        { title: "Older", url: "https://blog.rust-lang.org/a/", feed_title: "Rust Blog", read_at: "2026-10-01T12:00:00Z" },
      ],
    });
  });

  it.each([
    ["from=2026-13-01&to=2026-10-25"],
    ["from=2026-02-30&to=2026-03-05"],
    ["from=20261001&to=2026-10-25"],
    ["from=2026-10-01&to=yesterday"],
    ["from=2026-10-26&to=2026-10-25"],
    ["from=2025-10-24&to=2026-10-25"],
  ])("rejects %s", async (query) => {
    const { app, source } = setup();
    const res = await app.request(`/reads?${query}`);
    expect(res.status).toBe(400);
    expect(await res.json()).toHaveProperty("error");
    expect(source).not.toHaveBeenCalled();
  });

  it("accepts a range of exactly 366 days", async () => {
    const { app } = setup();
    const res = await app.request("/reads?from=2025-10-25&to=2026-10-25");
    expect(res.status).toBe(200);
  });

  it("serves repeat requests from the cache for 5 minutes", async () => {
    const { app, source, advance } = setup();
    const url = "/reads?from=2026-10-01&to=2026-10-25";
    await app.request(url);
    await app.request(url);
    expect(source).toHaveBeenCalledTimes(1);

    await app.request("/reads?from=2026-10-02&to=2026-10-25");
    expect(source).toHaveBeenCalledTimes(2);

    advance(5 * 60 * 1000 + 1);
    await app.request(url);
    expect(source).toHaveBeenCalledTimes(3);
  });

  it("responds 502 when shushu fails, and doesn't cache the failure", async () => {
    const source = vi.fn().mockRejectedValueOnce(new Error("boom")).mockResolvedValue(items);
    const { app, log } = setup({ source });
    const res = await app.request("/reads?from=2026-10-01&to=2026-10-25");
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: expect.any(String) });
    expect(res.headers.get("cache-control")).toBeNull();
    expect(log).toHaveBeenCalled();

    const retry = await app.request("/reads?from=2026-10-01&to=2026-10-25");
    expect(retry.status).toBe(200);
  });
});

describe("origins", () => {
  it("allows the blog and sets CORS headers", async () => {
    const { app } = setup();
    const res = await app.request("/reads", { headers: { Origin: ORIGIN } });
    expect(res.status).toBe(200);
    expect(res.headers.get("access-control-allow-origin")).toBe(ORIGIN);
  });

  it("answers preflights from the blog", async () => {
    const { app } = setup();
    const res = await app.request("/reads", {
      method: "OPTIONS",
      headers: { Origin: ORIGIN, "Access-Control-Request-Method": "GET" },
    });
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-origin")).toBe(ORIGIN);
    expect(res.headers.get("access-control-allow-methods")).toBe("GET,OPTIONS");
  });

  it("allows requests with neither Origin nor Referer", async () => {
    const { app } = setup();
    expect((await app.request("/reads")).status).toBe(200);
  });

  it("allows a Referer on the blog", async () => {
    const { app } = setup();
    const res = await app.request("/reads", { headers: { Referer: `${ORIGIN}/stuck-trace/reads/` } });
    expect(res.status).toBe(200);
  });

  it.each([
    [{ Origin: "https://evil.example" }],
    [{ Origin: "null" }],
    [{ Referer: "https://evil.example/page" }],
    [{ Referer: "not a url" }],
    [{ Origin: "https://evil.example", Referer: `${ORIGIN}/` }],
  ])("forbids %o", async (headers) => {
    const { app, source } = setup();
    const res = await app.request("/reads", { headers });
    expect(res.status).toBe(403);
    expect(res.headers.get("access-control-allow-origin")).toBeNull();
    expect(source).not.toHaveBeenCalled();
  });

  it("allows localhost:4321 outside production only", () => {
    const base = { FIXTURES: "1", ALLOWED_ORIGIN: `${ORIGIN}, https://other.example/` };
    expect(loadConfig({ ...base, NODE_ENV: "development" }).allowedOrigins).toEqual([
      ORIGIN,
      "https://other.example",
      "http://localhost:4321",
    ]);
    expect(loadConfig({ ...base, NODE_ENV: "production" }).allowedOrigins).toEqual([
      ORIGIN,
      "https://other.example",
    ]);
  });
});

describe("methods and paths", () => {
  it.each(["POST", "PUT", "DELETE", "HEAD"])("rejects %s", async (method) => {
    const { app } = setup();
    expect((await app.request("/reads", { method })).status).toBe(405);
  });

  it("serves /healthz", async () => {
    const { app } = setup();
    const res = await app.request("/healthz", { headers: { Origin: "https://evil.example" } });
    expect(res.status).toBe(200);
  });

  it("404s other paths", async () => {
    const { app } = setup();
    expect((await app.request("/api/stats/read")).status).toBe(404);
  });
});

describe("rate limit", () => {
  it(`allows ${RATE_LIMIT_PER_MINUTE} requests a minute per IP`, async () => {
    const { app, advance } = setup();
    const get = (ip: string) => app.request("/reads", { headers: { "X-Forwarded-For": `${ip}, 10.0.0.1` } });
    for (let i = 0; i < RATE_LIMIT_PER_MINUTE; i++) {
      expect((await get("203.0.113.7")).status).toBe(200);
    }
    const limited = await get("203.0.113.7");
    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).not.toBeNull();

    // Other IPs have their own buckets.
    expect((await get("198.51.100.2")).status).toBe(200);

    // A token comes back every 2 seconds.
    advance(2000);
    expect((await get("203.0.113.7")).status).toBe(200);
    expect((await get("203.0.113.7")).status).toBe(429);
  });
});

describe("shushuSource", () => {
  it("calls shushu with an ID token and only the validated query", async () => {
    const fetch = vi.fn(async (_url: URL | string | Request, _init?: RequestInit) => Response.json(items));
    const authorization = vi.fn(async () => "Bearer id-token");
    const source = shushuSource({ shushuUrl: "https://shushu.example", tzOffset: 540, authorization, fetch });

    expect(await source({ from: "2026-10-01", to: "2026-10-25" })).toEqual(items);
    const [url, init] = fetch.mock.calls[0]!;
    expect(String(url)).toBe("https://shushu.example/api/stats/read?from=2026-10-01&to=2026-10-25&tz_offset=540");
    expect(new Headers(init?.headers).get("authorization")).toBe("Bearer id-token");
  });

  it("fails on non-2xx responses", async () => {
    const fetch = vi.fn(async () => new Response("denied", { status: 403 }));
    const source = shushuSource({ shushuUrl: "https://shushu.example", tzOffset: 540, authorization: async () => "Bearer x", fetch });
    await expect(source({ from: "2026-10-01", to: "2026-10-25" })).rejects.toThrow("403");
  });

  it("fails when getting a token fails", async () => {
    const fetch = vi.fn();
    const authorization = async () => {
      throw new Error("no credentials");
    };
    const source = shushuSource({ shushuUrl: "https://shushu.example", tzOffset: 540, authorization, fetch });
    await expect(source({ from: "2026-10-01", to: "2026-10-25" })).rejects.toThrow("no credentials");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("times out", async () => {
    const fetch = vi.fn(
      (_url: URL | string | Request, init?: RequestInit) =>
        new Promise<Response>((_, reject) => init?.signal?.addEventListener("abort", () => reject(init.signal!.reason))),
    );
    const source = shushuSource({ shushuUrl: "https://shushu.example", tzOffset: 540, authorization: async () => "Bearer x", fetch, timeoutMs: 20 });
    await expect(source({ from: "2026-10-01", to: "2026-10-25" })).rejects.toThrow();
  });

  it("surfaces as a 502 through the app", async () => {
    const fetch = vi.fn(async () => new Response("bad gateway", { status: 500 }));
    const source = shushuSource({ shushuUrl: "https://shushu.example", tzOffset: 540, authorization: async () => "Bearer x", fetch });
    const { app } = setup({ source });
    expect((await app.request("/reads")).status).toBe(502);
  });
});

describe("fixturesSource", () => {
  it("filters the sample reads to the range in the configured time zone", async () => {
    const path = fileURLToPath(new URL("../fixtures/reads.json", import.meta.url));
    const source = fixturesSource(path, 540);
    const all = await source({ from: "2026-01-01", to: "2026-12-31" });
    expect(all.length).toBeGreaterThanOrEqual(30);

    // 2026-08-01T13:57:48Z is 22:57 on 1 August in Tokyo.
    const aug1 = await source({ from: "2026-08-01", to: "2026-08-01" });
    expect(aug1.map((r) => r.read_at)).toContain("2026-08-01T13:57:48Z");
    const aug2 = await source({ from: "2026-08-02", to: "2026-08-02" });
    expect(aug2.map((r) => r.read_at)).not.toContain("2026-08-01T13:57:48Z");
  });
});
