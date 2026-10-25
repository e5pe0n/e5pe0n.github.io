const DAY_MS = 24 * 60 * 60 * 1000;
/** The longest range shushu serves, counting both ends. */
export const MAX_DAYS = 366;
export const DEFAULT_DAYS = 30;

export interface Range {
  from: string;
  to: string;
}

/** The day `date` falls on at `tzOffset` minutes east of UTC, as YYYY-MM-DD. */
export function dayAt(date: Date, tzOffset: number): string {
  return new Date(date.getTime() + tzOffset * 60_000).toISOString().slice(0, 10);
}

/** Days since the epoch, if `s` is a real calendar date in YYYY-MM-DD form. */
function parseDay(s: string): number | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return undefined;
  const ms = Date.parse(`${s}T00:00:00Z`);
  // Date.parse rolls 2026-02-30 over to March; reject anything that doesn't round-trip.
  if (Number.isNaN(ms) || new Date(ms).toISOString().slice(0, 10) !== s) return undefined;
  return ms / DAY_MS;
}

function formatDay(days: number): string {
  return new Date(days * DAY_MS).toISOString().slice(0, 10);
}

/**
 * The range a request asks for: `from` and `to` if given, otherwise the last
 * DEFAULT_DAYS days up to today. Returns an error message if it isn't valid.
 */
export function parseRange(
  from: string | undefined,
  to: string | undefined,
  now: Date,
  tzOffset: number,
): Range | { error: string } {
  const toDay = to === undefined ? parseDay(dayAt(now, tzOffset)) : parseDay(to);
  if (toDay === undefined) return { error: "to must be a date in YYYY-MM-DD form" };
  const fromDay = from === undefined ? toDay - (DEFAULT_DAYS - 1) : parseDay(from);
  if (fromDay === undefined) return { error: "from must be a date in YYYY-MM-DD form" };

  const span = toDay - fromDay + 1;
  if (span < 1) return { error: "from must be on or before to" };
  if (span > MAX_DAYS) return { error: `from and to must be at most ${MAX_DAYS} days apart` };
  return { from: formatDay(fromDay), to: formatDay(toDay) };
}

/** The instants `range` starts and ends (exclusive) at `tzOffset`. */
export function bounds(range: Range, tzOffset: number): [number, number] {
  const offsetMs = tzOffset * 60_000;
  const start = Date.parse(`${range.from}T00:00:00Z`) - offsetMs;
  const end = Date.parse(`${range.to}T00:00:00Z`) + DAY_MS - offsetMs;
  return [start, end];
}
