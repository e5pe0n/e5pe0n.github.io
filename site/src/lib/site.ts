import { getCollection, type CollectionEntry } from 'astro:content';
import { groupBy, type Period } from './calendar';

export const SITE_TITLE = 'stuck-trace';
export const SITE_DESCRIPTION = 'Notes from where I got stuck, and how I got out.';

export type Article = CollectionEntry<'articles'>;

/** `path` under the site's base, e.g. `url('articles/foo')` → `/stuck-trace/articles/foo`. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = path.replace(/^\//, '');
  return rest ? `${base}/${rest}` : `${base}/`;
}

/** Published articles, newest first. Drafts show up in `astro dev` only. */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Tags with how many articles use them, most used first. */
export function tagCounts(articles: Article[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts].sort(([a, x], [b, y]) => y - x || a.localeCompare(b));
}

/** Minutes to read: ~200 English words or ~500 Japanese characters a minute. */
export function readingMinutes(body = ''): number {
  const cjk = body.match(/[　-鿿＀-￯]/g)?.length ?? 0;
  const words = body.replace(/[　-鿿＀-￯]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200 + cjk / 500));
}

/** The calendar page of a period: `calendar/2026`, `calendar/2026/10`, `calendar/week/2026-W43`, `calendar/2026/10/25`. */
export function calendarUrl(period: Period, key: string): string {
  return url(period === 'week' ? `calendar/week/${key}` : `calendar/${key.replaceAll('-', '/')}`);
}

/** Static paths for every period of the given kind that has an article. */
export async function calendarPaths(period: Period) {
  const articles = await getArticles();
  const groups = groupBy(articles, (a) => a.data.date, period);
  const keys = groups.map(([key]) => key);
  return groups.map(([key, group], i) => ({
    params: periodParams(period, key),
    props: { period, periodKey: key, articles: group, newer: keys[i - 1], older: keys[i + 1] },
  }));
}

function periodParams(period: Period, key: string): Record<string, string> {
  const [year, month, day] = key.split('-');
  switch (period) {
    case 'year':
      return { year };
    case 'month':
      return { year, month };
    case 'day':
      return { year, month, day };
    case 'week':
      return { week: key };
  }
}

export interface CalendarProps {
  period: Period;
  periodKey: string;
  articles: Article[];
  /** Adjacent periods that have articles. */
  newer?: string;
  older?: string;
}
