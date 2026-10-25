export interface Config {
  port: number;
  /** shushu's base URL, e.g. https://shushu-xxxx.a.run.app (no trailing slash). */
  shushuUrl: string;
  /** The IAP OAuth client id that shushu's ID tokens must be issued for. */
  iapAudience: string;
  /** UTC offset in minutes (east positive) that days start at. */
  tzOffset: number;
  allowedOrigins: string[];
  /** Serve fixtures/reads.json instead of calling shushu. */
  fixtures: boolean;
}

const DEV_ORIGIN = "http://localhost:4321";
/** UTC offsets range from -12:00 to +14:00. */
const MAX_OFFSET_MINUTES = 14 * 60;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const fixtures = env.FIXTURES === "1";
  const shushuUrl = (env.SHUSHU_URL ?? "").replace(/\/+$/, "");
  const iapAudience = env.IAP_AUDIENCE ?? "";
  if (!fixtures && (!shushuUrl || !iapAudience)) {
    throw new Error("SHUSHU_URL and IAP_AUDIENCE are required unless FIXTURES=1");
  }

  const tzOffset = Number(env.TZ_OFFSET || 540);
  if (!Number.isInteger(tzOffset) || Math.abs(tzOffset) > MAX_OFFSET_MINUTES) {
    throw new Error("TZ_OFFSET must be a whole number of minutes between -840 and 840");
  }

  const allowedOrigins = (env.ALLOWED_ORIGIN ?? "")
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, ""))
    .filter(Boolean);
  if (env.NODE_ENV !== "production" && !allowedOrigins.includes(DEV_ORIGIN)) {
    allowedOrigins.push(DEV_ORIGIN);
  }

  return {
    port: Number(env.PORT || 8080),
    shushuUrl,
    iapAudience,
    tzOffset,
    allowedOrigins,
    fixtures,
  };
}
