# e5pe0n.github.io

https://e5pe0n.github.io

## Writing

Add a Markdown file to [site/src/content/articles](site/src/content/articles). Its path is its URL (`algorithms/trees.md` → `/articles/algorithms/trees`), and images can sit beside it:

```yaml
---
title: Calling an IAP-protected Cloud Run service
description: One sentence for lists, search and RSS. # optional
date: 2026-10-18 # JST; decides where it goes in the article list
updated: 2026-10-20 # optional
tags: [gcp, iap]
draft: true # optional: shown by `pnpm dev`, left out of the build
pinned: true # optional: shown as a card on the Overview (the newest articles if none are)
---
```

Dates in the article list use Japan Standard Time.

## Development

Requires Node.js 24 ([mise.toml](mise.toml)) and pnpm.

```sh
pnpm install
```

Run the blog on http://localhost:4321/:

```sh
pnpm --dir site dev
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

Pages is set to deploy from GitHub Actions: [Deploy site](.github/workflows/pages.yml) builds `site/` and publishes it to Pages, on every push to `main` that changes it.

For a custom domain, set `SITE` (e.g. `https://blog.example.com`) in the Pages build.
