import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE_TITLE = 'e5pe0n.github.io';
export const SITE_DESCRIPTION = "A software engineer's knowledge repo: articles, notes and monthly logs.";

export const AUTHOR = {
  name: 'e5pe0n',
  github: 'e5pe0n',
  avatar: 'https://avatars.githubusercontent.com/u/47216902?v=4&s=460',
  bio: "Software engineer working on backends, infrastructure and real-time media. This is where I write down what I got stuck on and how I got out.",
};

export type Article = CollectionEntry<'articles'>;

/** `path` under the site's base, e.g. `url('articles/foo')` → `/articles/foo`. */
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

/** The articles index, filtered to `tag`. */
export function tagUrl(tag: string): string {
  return url(`articles?${new URLSearchParams({ tags: tag })}`);
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
