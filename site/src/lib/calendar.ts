// Date helpers for the article list and the contribution graph.
//
// Everything is bucketed in Japan Standard Time (UTC+9, no DST), so a post
// dated "2026-10-25" and an instant at 2026-10-25T23:30+09:00 land on the same day
// no matter where the site is built or viewed.

export const TZ_OFFSET_MINUTES = 540;

export type Period = 'day' | 'week' | 'month' | 'year';
export const PERIODS: readonly Period[] = ['day', 'week', 'month', 'year'];

/** Year, month (1–12) and day of `date` in JST. */
export function jstParts(date: Date): { year: number; month: number; day: number } {
  const shifted = new Date(date.getTime() + TZ_OFFSET_MINUTES * 60_000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
}

const pad = (n: number, width = 2) => String(n).padStart(width, '0');

/** `YYYY-MM-DD` of `date` in JST. */
export function dayKey(date: Date): string {
  const { year, month, day } = jstParts(date);
  return `${year}-${pad(month)}-${pad(day)}`;
}

/** Midnight UTC of a `YYYY-MM-DD` key, for calendar arithmetic only. */
function keyToUtc(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function utcToKey(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** `day` shifted by `days` days. */
export function addDays(day: string, days: number): string {
  const date = keyToUtc(day);
  date.setUTCDate(date.getUTCDate() + days);
  return utcToKey(date);
}

/** ISO 8601 week-numbering year and week (weeks start on Monday). */
export function isoWeek(day: string): { year: number; week: number } {
  const date = keyToUtc(day);
  const weekday = date.getUTCDay() || 7;
  // The Thursday of this week decides which year the week belongs to.
  date.setUTCDate(date.getUTCDate() + 4 - weekday);
  const year = date.getUTCFullYear();
  const week = Math.ceil(((date.getTime() - Date.UTC(year, 0, 1)) / 86_400_000 + 1) / 7);
  return { year, week };
}

/** Monday of ISO week `week` of `year`, as `YYYY-MM-DD`. */
export function isoWeekStart(year: number, week: number): string {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const monday = addDays(utcToKey(jan4), 1 - (jan4.getUTCDay() || 7));
  return addDays(monday, (week - 1) * 7);
}

/** The key of the period containing `date`: `2026-10-25`, `2026-W43`, `2026-10` or `2026`. */
export function periodKey(period: Period, date: Date | string): string {
  const day = typeof date === 'string' ? date : dayKey(date);
  switch (period) {
    case 'day':
      return day;
    case 'week': {
      const { year, week } = isoWeek(day);
      return `${year}-W${pad(week)}`;
    }
    case 'month':
      return day.slice(0, 7);
    case 'year':
      return day.slice(0, 4);
  }
}

/** First and last day (inclusive) of a period. */
export function periodRange(period: Period, key: string): { from: string; to: string } {
  switch (period) {
    case 'day':
      return { from: key, to: key };
    case 'week': {
      const [year, week] = key.split('-W').map(Number);
      const from = isoWeekStart(year, week);
      return { from, to: addDays(from, 6) };
    }
    case 'month': {
      const [year, month] = key.split('-').map(Number);
      const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
      return { from: `${key}-01`, to: `${key}-${pad(last)}` };
    }
    case 'year':
      return { from: `${key}-01-01`, to: `${key}-12-31` };
  }
}

/** The period `delta` periods after (or before, if negative) `key`. */
export function shiftPeriod(period: Period, key: string, delta: number): string {
  const { from } = periodRange(period, key);
  switch (period) {
    case 'day':
      return addDays(key, delta);
    case 'week':
      return periodKey('week', addDays(from, delta * 7));
    case 'month': {
      const [year, month] = key.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1 + delta, 1));
      return utcToKey(date).slice(0, 7);
    }
    case 'year':
      return String(Number(key) + delta);
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** A human label: `Sun, Oct 25, 2026`, `Week 43, 2026 (Oct 19 – Oct 25)`, `October 2026`, `2026`. */
export function periodLabel(period: Period, key: string): string {
  const short = (day: string) => {
    const date = keyToUtc(day);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
  };
  switch (period) {
    case 'day': {
      const date = keyToUtc(key);
      return `${WEEKDAYS[date.getUTCDay()]}, ${short(key)}, ${date.getUTCFullYear()}`;
    }
    case 'week': {
      const [year, week] = key.split('-W');
      const { from, to } = periodRange('week', key);
      return `Week ${Number(week)}, ${year} (${short(from)} – ${short(to)})`;
    }
    case 'month': {
      const date = keyToUtc(`${key}-01`);
      return date.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    }
    case 'year':
      return key;
  }
}

/** Items grouped by the period their date falls in, latest group first, items latest first. */
export function groupBy<T>(items: T[], getDate: (item: T) => Date, period: Period): [string, T[]][] {
  const groups = new Map<string, T[]>();
  const sorted = [...items].sort((a, b) => getDate(b).getTime() - getDate(a).getTime());
  for (const item of sorted) {
    const key = periodKey(period, getDate(item));
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }
  return [...groups].sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0));
}

/** Columns of 7 days (Sunday first, like GitHub's contribution graph) covering a year. */
export function yearGrid(year: string): (string | null)[][] {
  const { from, to } = periodRange('year', year);
  const columns: (string | null)[][] = [];
  let day = addDays(from, -keyToUtc(from).getUTCDay());
  while (day <= to) {
    const column: (string | null)[] = [];
    for (let i = 0; i < 7; i++) {
      column.push(day >= from && day <= to ? day : null);
      day = addDays(day, 1);
    }
    columns.push(column);
  }
  return columns;
}

/**
 * Like GitHub's contribution graph: the year up to `today` in Sunday-first columns.
 * Days before the year or after `today` are null.
 */
export function trailingYearGrid(today: string): { from: string; columns: (string | null)[][] } {
  const from = addDays(today, -364);
  const columns: (string | null)[][] = [];
  let day = addDays(from, -keyToUtc(from).getUTCDay());
  while (day <= today) {
    const column: (string | null)[] = [];
    for (let i = 0; i < 7; i++) {
      column.push(day >= from && day <= today ? day : null);
      day = addDays(day, 1);
    }
    columns.push(column);
  }
  return { from, columns };
}
