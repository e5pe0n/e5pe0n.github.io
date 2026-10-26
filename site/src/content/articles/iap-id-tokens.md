---
title: Calling an IAP-protected Cloud Run service from a service account
description: Why the ID token's audience has to be the IAP OAuth client ID, not the service URL.
date: 2026-10-18
tags: [gcp, cloud-run, iap, auth]
pinned: true
---

I put Identity-Aware Proxy in front of a Cloud Run service, and my Cloud Scheduler job started failing with `401 Invalid IAP credentials`. It had worked fine without IAP.

## What changed

Without IAP, Cloud Run checks the ID token itself, and the audience is the service URL. With IAP enabled on the service, **IAP** checks the token first, and it only accepts tokens whose audience is its OAuth client ID.

> [!IMPORTANT]
> With IAP in front, set the OIDC token's `audience` to the IAP OAuth client ID, and grant the caller `roles/iap.httpsResourceAccessor`, not just `roles/run.invoker`.

## The fix

```hcl
oidc_token {
  service_account_email = google_service_account.scheduler.email
  audience              = var.iap_oauth_client_id
}
```

From Node, `google-auth-library` does the same with `getIdTokenClient(audience)`:

```ts
import { GoogleAuth } from 'google-auth-library';

const client = await new GoogleAuth().getIdTokenClient(process.env.IAP_AUDIENCE!);
const res = await client.fetch(`${process.env.SHUSHU_URL}/api/stats/read`);
```

> [!TIP]
> On Cloud Run the token comes from the metadata server, so no key file is needed.
