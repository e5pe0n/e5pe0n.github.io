---
title: Hello, stuck-trace
description: What this blog is for, and a tour of the Markdown it supports.
date: 2026-10-25
tags: [meta, markdown]
---

This blog is a trace of the places I got stuck: the error message that made no sense, the config flag nobody mentions, the fix that took two days and one line. Writing them down is how I make sure I only get stuck on each of them once.

## Writing an article

Articles live in `site/src/content/articles/` as Markdown. The front matter holds the metadata:

```yaml
---
title: Hello, stuck-trace
description: One sentence for lists, search and RSS.
date: 2026-10-25
tags: [meta, markdown]
draft: false # true keeps it out of the build
---
```

The date decides where the article goes in the article list, which is organized by year and month, and its tags let readers filter it.

## Callouts

GitHub-style alerts work as they do on GitHub:

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

## Code

```ts
// Bucket a timestamp into a JST day.
export function dayKey(date: Date): string {
  const shifted = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return shifted.toISOString().slice(0, 10);
}
```

Plain blockquotes still look like quotes:

> Debugging is twice as hard as writing the code in the first place.
