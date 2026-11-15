// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import { remarkAlert } from 'remark-github-blockquote-alert';
import remarkMath from 'remark-math';

// Served from GitHub Pages at https://e5pe0n.github.io, the user site. For a custom
// domain, set SITE to it.
export default defineConfig({
  site: process.env.SITE ?? 'https://e5pe0n.github.io',
  base: process.env.BASE ?? '/',
  output: 'static',
  markdown: {
    // GitHub-style callouts (> [!NOTE] ...) and math ($...$) come from remark and
    // rehype plugins, so this uses the unified processor rather than Astro's
    // default Sätteri.
    processor: unified({ remarkPlugins: [remarkAlert, remarkMath], rehypePlugins: [rehypeKatex] }),
    // Mermaid blocks are drawn in the browser (see pages/articles/[...id].astro), so Shiki leaves them alone.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['math', 'mermaid'] },
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
