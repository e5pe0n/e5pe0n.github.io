# stuck-trace

My engineering blog: notes on where I got stuck, and how I got out. Served at https://e5pe0n.github.io/stuck-trace.

- **Articles** in Markdown, with tags, GitHub-style callouts (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`), highlighted code and a table of contents.
- **Calendar**: a contribution-style heatmap per year, and articles by year, month, ISO week and day.
- **Search**: full-text, with tag filters, by [Pagefind](https://pagefind.app), built at build time and run in the browser.
- **Reading**: what I've read in [shushu](https://github.com/e5pe0n/shushu), my RSS reader, live, by day, week, month or year.
- **RSS** at `/rss.xml`.

| Path           | What                                                                                    | Hosted on      |
| -------------- | --------------------------------------------------------------------------------------- | -------------- |
| [site](site)   | The blog: [Astro](https://astro.build), fully static                                     | GitHub Pages   |
| [api](api)     | The reads proxy: calls shushu through IAP and returns only what the Reading page shows   | Cloud Run      |

shushu sits behind IAP, so the browser can't call it. The Reading page calls the reads proxy instead, which holds a Google identity that IAP lets through. See [api/README.md](api/README.md) for what it exposes and how it limits abuse.

## Writing

Add a Markdown file to [site/src/content/articles](site/src/content/articles). Its name is its URL:

```yaml
---
title: Calling an IAP-protected Cloud Run service
description: One sentence for lists, search and RSS.
date: 2026-10-18 # JST; decides where it goes in the calendar
updated: 2026-10-20 # optional
tags: [gcp, iap]
draft: true # optional: shown by `pnpm dev`, left out of the build
---
```

Dates, the calendar and the Reading page all use Japan Standard Time.

## Development

Requires Node.js 24 ([mise.toml](mise.toml)) and pnpm.

```sh
pnpm install
```

Run the reads proxy on sample data, then the blog on http://localhost:4321/stuck-trace/:

```sh
FIXTURES=1 pnpm --dir api dev
```

```sh
cp site/.env.example site/.env && pnpm --dir site dev
```

Search only works on a build, since its index is generated from the built pages:

```sh
pnpm --dir site build && pnpm --dir site preview
```

Checks (the same ones CI runs):

```sh
pnpm -r test && pnpm -r build
```

## Deploying

The Cloud Run service, its service accounts and the deploy permissions are defined in [e5pe0n/infra](https://github.com/e5pe0n/infra) (the `stuck-trace` stack), along with the IAP access to shushu. Once it is applied, its outputs are set as repository variables (`GCP_PROJECT_ID`, `GCP_REGION`, `GCP_WIF_PROVIDER`, `GCP_DEPLOY_SA`, `READS_API_URL`), and Pages is set to deploy from GitHub Actions:

- [Deploy site](.github/workflows/pages.yml) builds `site/` with `PUBLIC_READS_API=$READS_API_URL` and publishes it to Pages, on every push to `main` that changes it.
- [Deploy API](.github/workflows/api-deploy.yml) builds `api/`, pushes the image to Artifact Registry and rolls it out to Cloud Run, on every push to `main` that changes it.

For a custom domain, set `SITE` (e.g. `https://blog.example.com`) and `BASE=/` in the Pages build, and add the domain to the proxy's `allowed_origin`.
