import { getCollection, type CollectionEntry } from 'astro:content';
import { groupBy, periodKey, shiftPeriod, type Period } from './calendar';

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

/** Activity is organized by year, month and day. */
export type ActivityPeriod = Exclude<Period, 'week'>;

/** The activity page of a year, month or day key: `activity/2026`, `activity/2026/10` or `activity/2026/10/25`. */
export function activityUrl(key: string): string {
  return url(`activity/${key.replaceAll('-', '/')}`);
}

/**
 * Every month from the first article's to the current one (JST, at build time), oldest
 * first, so any month can be picked even if nothing was written in it.
 */
export function activityMonths(articles: Article[]): string[] {
  const current = periodKey('month', new Date());
  const first = articles.length ? periodKey('month', articles[articles.length - 1].data.date) : current;
  const months: string[] = [];
  for (let month = first < current ? first : current; month <= current; month = shiftPeriod('month', month, 1)) {
    months.push(month);
  }
  return months;
}

/** Static paths for every month (see `activityMonths`), and every year and day that has an article. */
export async function activityPaths(period: ActivityPeriod) {
  const articles = await getArticles();
  const groups =
    period === 'month'
      ? (() => {
          const byMonth = new Map(groupBy(articles, (a) => a.data.date, 'month'));
          return activityMonths(articles)
            .reverse()
            .map((month): [string, Article[]] => [month, byMonth.get(month) ?? []]);
        })()
      : groupBy(articles, (a) => a.data.date, period);
  const keys = groups.map(([key]) => key);
  return groups.map(([key, group], i) => {
    const [year, month, day] = key.split('-');
    return {
      params: day ? { year, month, day } : month ? { year, month } : { year },
      props: { period, periodKey: key, articles: group, newer: keys[i - 1], older: keys[i + 1] },
    };
  });
}

export interface ActivityProps {
  period: ActivityPeriod;
  periodKey: string;
  articles: Article[];
  /** Adjacent periods: months always, years and days that have articles. */
  newer?: string;
  older?: string;
}
