---
title: SQLite on Cloud Run with Litestream
description: Running a single-writer SQLite app on a serverless platform, and the sharp edges.
date: 2026-09-27
tags: [gcp, cloud-run, sqlite]
pinned: true
---

Cloud Run scales to zero and has no persistent disk, which sounds like the worst possible home for SQLite. With [Litestream](https://litestream.io) it works well for a personal app.

## How it fits together

1. On start, Litestream restores the database from Cloud Storage.
2. While running, it streams every WAL change back to the bucket.
3. On shutdown, it does a final sync.

> [!WARNING]
> Litestream supports one writer. Set `max_instance_count = 1`, or two instances will overwrite each other's changes.

## Idle instances get no CPU

Background work like a feed refresh stops when no request is in flight. A Cloud Scheduler job that calls a refresh endpoint every hour keeps it going.

> [!CAUTION]
> During a rollout the old and new revisions overlap for a few seconds. Writes to the old one in that window can be lost.
