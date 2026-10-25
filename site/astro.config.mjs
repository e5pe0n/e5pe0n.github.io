// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import { remarkAlert } from 'remark-github-blockquote-alert';

// Served from GitHub Pages at https://e5pe0n.github.io/stuck-trace. For a custom
// domain, set SITE to it and BASE to "/".
export default defineConfig({
  site: process.env.SITE ?? 'https://e5pe0n.github.io',
  base: process.env.BASE ?? '/stuck-trace',
  output: 'static',
  markdown: {
    // GitHub-style callouts (> [!NOTE] ...) come from a remark plugin, so this uses
    // the unified processor rather than Astro's default Sätteri.
    processor: unified({ remarkPlugins: [remarkAlert] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
