// Client for the reads proxy (api/), which serves what I read in shushu.

import { dayKey } from './calendar';

export interface Read {
  title: string;
  url: string | null;
  feed_title: string;
  read_at: string;
}

const API = (import.meta.env.PUBLIC_READS_API ?? '').replace(/\/$/, '');

/** Items read from `from` to `to` (inclusive `YYYY-MM-DD` days in JST), newest first. */
export async function fetchReads(from: string, to: string, signal?: AbortSignal): Promise<Read[]> {
  if (!API) throw new Error('PUBLIC_READS_API is not set');
  const res = await fetch(`${API}/reads?${new URLSearchParams({ from, to })}`, { signal });
  if (!res.ok) throw new Error(`reads: ${res.status}`);
  const body: { reads: Read[] } = await res.json();
  return body.reads;
}

/** The host of a URL, for showing where a link goes. */
export function hostOf(url: string | null): string {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/** `HH:MM` in JST. */
export function timeOf(readAt: string): string {
  const shifted = new Date(new Date(readAt).getTime() + 9 * 3_600_000);
  return shifted.toISOString().slice(11, 16);
}

/** A list item for a read, built with DOM APIs so titles are never parsed as HTML. */
export function readItem(read: Read, { showDay = false } = {}): HTMLLIElement {
  const li = document.createElement('li');
  const title = document.createElement(read.url ? 'a' : 'span');
  title.className = 'entry-title';
  title.textContent = read.title || '(untitled)';
  if (read.url && title instanceof HTMLAnchorElement) {
    title.href = read.url;
    title.target = '_blank';
    title.rel = 'noopener noreferrer';
  }
  const meta = document.createElement('div');
  meta.className = 'entry-meta';
  const when = document.createElement('time');
  when.className = 'mono';
  when.dateTime = read.read_at;
  when.textContent = showDay ? `${dayKey(new Date(read.read_at))} ${timeOf(read.read_at)}` : timeOf(read.read_at);
  const feed = document.createElement('span');
  feed.textContent = read.feed_title;
  meta.append(when, feed);
  const host = hostOf(read.url);
  if (host) {
    const h = document.createElement('span');
    h.className = 'mono';
    h.textContent = host;
    meta.append(h);
  }
  li.append(title, meta);
  return li;
}
