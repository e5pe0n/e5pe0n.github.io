# @stuck-trace/api

A tiny public proxy that serves the blog the items I've read recently, live
from [shushu](https://github.com/e5pe0n/shushu). shushu sits behind IAP, so
this service calls it with an ID token from its own Cloud Run service account
and passes on only what the blog shows.

Visitors are anonymous, so this can't truly restrict who calls it. Instead it:

- returns only `title`, `url`, `feed_title` and `read_at` (no shushu ids);
- only ever calls shushu's `/api/stats/read` with validated dates, never
  anything from the request's path;
- answers 403 to requests whose `Origin` or `Referer` isn't an allowed origin
  (requests with neither, like curl, are allowed);
- rate-limits each IP to 30 requests a minute, caches each range for 5 minutes,
  and gives up on shushu after 8 seconds.

## API

### `GET /reads?from=YYYY-MM-DD&to=YYYY-MM-DD`

Both default to the last 30 days, counted in `TZ_OFFSET`. The range may span
at most 366 days, counting both ends.

```json
{
  "reads": [
    {
      "title": "Announcing Rust 1.94.0",
      "url": "https://blog.rust-lang.org/announcing-rust-1-94-0/",
      "feed_title": "Rust Blog",
      "read_at": "2026-10-23T13:35:05Z"
    }
  ]
}
```

Newest first; `url` may be `null`. Errors are `{"error": "..."}` with 400
(bad dates), 403 (origin), 404, 405 (method other than GET/OPTIONS), 429
(rate limit) or 502 (shushu unreachable).

### `GET /healthz`

`ok`.

## Environment

| Variable         | Default   | Meaning                                                                                                   |
| ---------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `PORT`           | `8080`    | Port to listen on.                                                                                        |
| `SHUSHU_URL`     |           | shushu's base URL, e.g. `https://shushu-….run.app`. Required unless `FIXTURES=1`.                         |
| `IAP_AUDIENCE`   |           | The IAP OAuth client id shushu's ID tokens are issued for. Required unless `FIXTURES=1`.                  |
| `TZ_OFFSET`      | `540`     | UTC offset in minutes (east positive) days start at; 540 is Asia/Tokyo.                                   |
| `ALLOWED_ORIGIN` |           | Comma-separated origins allowed to call it, e.g. `https://e5pe0n.github.io`.                              |
| `NODE_ENV`       |           | Unless `production`, `http://localhost:4321` (the Astro dev server) is allowed too.                       |
| `FIXTURES`       |           | `1` serves [`fixtures/reads.json`](fixtures/reads.json) instead of calling shushu.                        |

The service account it runs as needs `roles/iap.httpsResourceAccessor` on
shushu (granted in e5pe0n/infra).

## Running locally

With sample data:

```bash
FIXTURES=1 pnpm --dir api dev
```

```bash
curl 'http://localhost:8080/reads?from=2026-08-01&to=2026-10-31'
```

Against the real shushu, with your own credentials (`gcloud auth
application-default login` gives user credentials, which can't mint ID tokens
for an arbitrary audience, so impersonate a service account that can call
shushu):

```bash
gcloud auth application-default login --impersonate-service-account=SA_EMAIL
```

```bash
SHUSHU_URL=https://… IAP_AUDIENCE=….apps.googleusercontent.com pnpm --dir api dev
```

## Scripts

- `pnpm dev` — run with reload on change
- `pnpm test` — vitest
- `pnpm build` — compile to `dist/`
- `pnpm start` — run `dist/`

## Deploying

[`.github/workflows/api-deploy.yml`](../.github/workflows/api-deploy.yml)
tests, builds [`Dockerfile`](Dockerfile) and deploys it to the
`stuck-trace-api` Cloud Run service on every push to main that touches `api/`.
