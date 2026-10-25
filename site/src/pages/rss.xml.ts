import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticles, SITE_DESCRIPTION, SITE_TITLE, url } from '../lib/site';

export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.date,
      categories: article.data.tags,
      link: url(`articles/${article.id}`),
    })),
  });
}
