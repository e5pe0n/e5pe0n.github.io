import { readFile } from "node:fs/promises";
import { GoogleAuth, type IdTokenClient } from "google-auth-library";
import { bounds, type Range } from "./dates.js";

/** An item read, as shushu's `GET /api/stats/read` returns it. */
export interface UpstreamRead {
  id: number;
  feed_id: number;
  feed_title: string;
  url: string | null;
  title: string;
  read_at: string;
}

/** Fetches the items read over a range of days. */
export type ReadsSource = (range: Range) => Promise<UpstreamRead[]>;

export const UPSTREAM_TIMEOUT_MS = 8000;

export interface ShushuOptions {
  shushuUrl: string;
  tzOffset: number;
  /** The `Authorization` header value to call shushu with. */
  authorization: () => Promise<string>;
  fetch?: typeof fetch;
  timeoutMs?: number;
}

/** Reads from shushu, which sits behind IAP. */
export function shushuSource(opts: ShushuOptions): ReadsSource {
  const doFetch = opts.fetch ?? fetch;
  const timeoutMs = opts.timeoutMs ?? UPSTREAM_TIMEOUT_MS;
  return async (range) => {
    // Only the validated dates go upstream; nothing from the client's path or query.
    const url = new URL("/api/stats/read", opts.shushuUrl);
    url.searchParams.set("from", range.from);
    url.searchParams.set("to", range.to);
    url.searchParams.set("tz_offset", String(opts.tzOffset));

    const res = await doFetch(url, {
      headers: { Authorization: await opts.authorization(), Accept: "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) throw new Error(`shushu responded ${res.status}`);
    const body: unknown = await res.json();
    if (!Array.isArray(body)) throw new Error("shushu responded with something other than a list");
    return body as UpstreamRead[];
  };
}

/** An `Authorization` header with an ID token for IAP, from the service's own identity. */
export function iapAuthorization(audience: string): () => Promise<string> {
  const auth = new GoogleAuth();
  let client: Promise<IdTokenClient> | undefined;
  return async () => {
    client ??= auth.getIdTokenClient(audience).catch((err: unknown) => {
      client = undefined;
      throw err;
    });
    // The client caches the token and refreshes it before it expires.
    const headers = await (await client).getRequestHeaders();
    const value = headers.get("authorization");
    if (!value) throw new Error("no ID token for IAP");
    return value;
  };
}

/** Reads from a JSON file in shushu's format, for running without shushu. */
export function fixturesSource(path: string, tzOffset: number): ReadsSource {
  let all: Promise<UpstreamRead[]> | undefined;
  return async (range) => {
    all ??= readFile(path, "utf8").then((s) => JSON.parse(s) as UpstreamRead[]);
    const [start, end] = bounds(range, tzOffset);
    return (await all).filter((r) => {
      const t = Date.parse(r.read_at);
      return t >= start && t < end;
    });
  };
}
