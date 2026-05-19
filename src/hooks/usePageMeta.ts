import { useEffect } from 'react';

/**
 * usePageMeta — set per-route <title>, meta description, and OG/Twitter
 * card tags from a React component.
 *
 * Static SPA (no SSR), so search-engine indexing is best-effort —
 * Googlebot does execute JS, but social-media crawlers (LinkedIn,
 * Slack, Twitter) usually do NOT. For those, the defaults in
 * index.html are what shows in shared previews. This hook ensures
 * the tab title + description update on client-side route changes
 * (so the browser tab + history reads correctly when the user
 * navigates between pages).
 *
 * Order of operations matches React's mount/unmount lifecycle, so the
 * effect runs once on mount and revives the title on dependency change.
 */

type PageMeta = {
  title: string;          // tab title — also used as og:title fallback
  description: string;    // ≤ 160 chars for SERP snippet
  ogTitle?: string;       // overrides title for og:title
  ogDescription?: string; // overrides description for og:description
  ogImage?: string;       // 1200×630 recommended; falls back to default
  ogUrl?: string;         // canonical URL
  ogType?: 'website' | 'article';
};

const DEFAULT_OG_IMAGE = '/og-cover.svg'; // see public/og-cover.svg (added in commit)

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (!content) return;
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    document.title = meta.title;
    setMeta('description', meta.description);

    // Open Graph — for LinkedIn, Slack, Facebook unfurls
    setMeta('og:title', meta.ogTitle ?? meta.title, 'property');
    setMeta('og:description', meta.ogDescription ?? meta.description, 'property');
    setMeta('og:image', meta.ogImage ?? DEFAULT_OG_IMAGE, 'property');
    setMeta('og:type', meta.ogType ?? 'website', 'property');
    if (meta.ogUrl) setMeta('og:url', meta.ogUrl, 'property');

    // Twitter Card (X uses the same payload)
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.ogTitle ?? meta.title);
    setMeta('twitter:description', meta.ogDescription ?? meta.description);
    setMeta('twitter:image', meta.ogImage ?? DEFAULT_OG_IMAGE);
  }, [
    meta.title,
    meta.description,
    meta.ogTitle,
    meta.ogDescription,
    meta.ogImage,
    meta.ogUrl,
    meta.ogType,
  ]);
}
