# CinematicFooter Motion Background — Design Document

**Date:** 2026-04-18
**Scope:** Swap the static aurora + grid backdrop in `CinematicFooter.tsx` for a motion background (video) while keeping the rest of the footer's structure and content unchanged.
**Author:** Brainstorm with Puneet (Sections 1, 2, 3 approved)

## Context

User asked to "enhance the footer with motion design" using the Neuralyn SaaS landing-page reference as inspiration — specifically the dark-themed video backdrop pattern. After brainstorming, scope narrowed to:

- **Decision 1 (backdrop kind):** Stock video loop (option A) — not WebGL shader, not CSS-only.
- **Decision 2 (layering):** Video replaces the current aurora glow + grid-pattern backdrop (option A2). The 3D `HeroOrb` centerpiece, headline, callouts, CTA, marquee, 5-column link grid, and legal row all stay unchanged on top.
- **Decision 3 (mood):** Mood A — dark abstract particles drift. Closest to the Neuralyn reference; enterprise/sovereign-feeling, doesn't fight the 3D orb's visual identity.

The current `src/components/CinematicFooter.tsx` (289 lines) renders on every page via `SiteNav` or the site's routing shell. The footer uses `#060a12` as its base, with a radial teal/blue aurora glow div and a grid-pattern div as decorative backdrop layers. This change keeps the base color and replaces the two decorative layers.

## Section 1 — Architecture + file changes

### Files

**Create (2):**
- `public/footer-bg.mp4` — dark-particles-drift video loop, ~2-4 MB, 10-15s seamless loop, 1080p, self-hosted
- `public/footer-bg-poster.webp` — single-frame fallback for autoplay-blocked / reduced-motion / preloading states, ~20 KB

**Modify (1):**
- `src/components/CinematicFooter.tsx` — swap two decorative divs for `<video>` + gradient-overlay, add `IntersectionObserver` + reduced-motion handling

### Why self-host the video

- Pexels/Pixabay CDNs aren't hotlink-friendly (TOS + rate-limit risk)
- Asset lives in the repo, versioned with code, no runtime network dependency beyond our own origin
- 2-4 MB MP4 is tolerable for a below-fold asset because `preload="metadata"` defers the body download until the user nears the footer
- `IntersectionObserver` pause keeps the video idle when scrolled off-screen

### Video sourcing

During implementation, evaluate these Pexels CC0 candidates:
- Pexels video 3129977 (dark particles drift)
- Pexels video 3129957 (glowing grid abstract)
- Pexels video 3129595 (particle field)

Criteria:
- Dark palette (fits `#060a12` backdrop)
- Under 5 MB at 1080p, 10-15s loop
- Seamless loop (start frame ≈ end frame)
- CC0 / Pexels license (free commercial)
- Slow frequency — drift, not stutter

Pick one. If none of the three feel right, widen to Pixabay. Document the final chosen clip + license attribution in the commit message.

### Conceptual component diff

```diff
  <footer ...>
-   {/* Aurora glow */}
-   <div className="... cf-aurora ..." />
-   {/* Grid */}
-   <div className="... cf-grid ..." />
+   {/* Motion background video — dark particles drift */}
+   <video ref={videoRef} src="/footer-bg.mp4" ... />
+   {/* Dark gradient overlay — readability guarantee */}
+   <div className="absolute inset-0 z-[1] ..." />
    {/* Diagonal marquee — unchanged */}
    {/* Main content (orb + headline + CTA) — unchanged */}
    {/* 5-column link grid — unchanged */}
    {/* Legal row — unchanged */}
  </footer>
```

### What stays exactly the same

- 3D `HeroOrb` centerpiece with its current props
- 2-col layout: orb left, headline + 3 value callouts + "Book a founder call" CTA right
- Diagonal marquee band (with `cf-marquee` keyframe)
- 5-column link grid (Product / Solutions / Proof / Company / Connect)
- Legal row with copyright + tagline
- Headline GSAP entrance animation

## Section 2 — Visual layering + video treatment

### Stack (bottom-up)

| z-index | Layer | Purpose |
|---|---|---|
| `z-0` | `<video>` background | Motion — dark particles drift |
| `z-[1]` | Dark gradient overlay | Readability guarantee |
| `z-10` | Diagonal marquee band | Horizontal strip |
| `z-10` | Main content (orb + headline + CTA + links + legal) | The content |

### Video element

```tsx
<video
  ref={videoRef}
  src="/footer-bg.mp4"
  poster="/footer-bg-poster.webp"
  autoPlay={!prefersReducedMotion}
  loop
  muted
  playsInline
  preload="metadata"
  aria-hidden="true"
  className="absolute inset-0 w-full h-full object-cover z-0"
  style={{
    opacity: 0.55,
    mixBlendMode: 'screen',
    filter: 'brightness(0.85) saturate(0.9)',
  }}
/>
```

Rationale for each attribute:
- `opacity: 0.55` — video contributes motion, not full brightness. Subservient to the orb.
- `mix-blend-mode: screen` — additive on dark backdrops. Particle highlights pop through without looking pasted-on. Dark video regions become effectively transparent.
- `filter: brightness(0.85) saturate(0.9)` — desaturates slightly so any color drift in the video doesn't fight the teal/blue/amber accent palette used elsewhere on the site.
- `aria-hidden="true"` — decorative, not announced to screen readers.
- `playsInline` — critical on iOS; without it, mobile Safari would fullscreen the video on play.
- `muted` — required for autoplay in every modern browser.
- `preload="metadata"` — only fetches headers + poster, body downloads lazily when the user nears the footer.
- `poster="/footer-bg-poster.webp"` — fallback frame; also shows while video is still downloading.

### Dark gradient overlay

```tsx
<div
  aria-hidden="true"
  className="absolute inset-0 z-[1] pointer-events-none"
  style={{
    background:
      'linear-gradient(180deg, rgba(6,10,18,0.45) 0%, rgba(6,10,18,0.70) 50%, rgba(6,10,18,0.85) 100%)',
  }}
/>
```

- Top (0.45 opacity) lighter → marquee band reads clearly over motion
- Middle (0.70) darker → orb + headline region; guarantees WCAG AA on white text
- Bottom (0.85) darkest → 5-column links + legal; dimmer motion keeps focus on hover states

### Interaction with the orb

The `HeroOrb` runs in a separate `<canvas>` — it's NOT affected by the video's `mix-blend-mode` since `mix-blend` only composites with siblings beneath, not with the canvas above. The orb keeps:
- Its own internal lighting via `envColor: '#666666'`
- Its glass refraction + breathing animation
- Its soft glow shadow

Net: orb stays the visual anchor; video provides ambient motion around it.

### Brand fit

Base color `#060a12` stays. Video adds particles in the same dark space. Gradient re-asserts the darkness where text sits. No new color introduced.

## Section 3 — Motion behavior + fallbacks + testing

### Reduced-motion

```tsx
const [prefersReducedMotion] = useState(
  () => typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
);
```

When `prefers-reduced-motion: reduce`:
- `autoPlay` is false → video never plays
- `poster` renders the single-frame `.webp`
- Net: static dark backdrop, same dark-mood aesthetic, zero motion

### Off-screen pause via IntersectionObserver

```tsx
useEffect(() => {
  const video = videoRef.current;
  if (!video || prefersReducedMotion) return;

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => { /* autoplay blocked — silent */ });
      } else {
        video.pause();
      }
    },
    { threshold: 0.01 }
  );
  io.observe(video);
  return () => io.disconnect();
}, [prefersReducedMotion]);
```

- Plays only when ≥1% of the footer is in view
- Pauses cleanly when off-screen
- Silently swallows the autoplay-blocked promise rejection (browser shows poster instead)

### Mobile autoplay compliance

`muted + playsInline + loop + autoPlay` is the canonical combo that works on iOS Safari + Chrome Android. All four are in our spec. If Low Power Mode or data saver blocks autoplay, the poster frame shows instead.

### Poster frame generation

Single command during implementation (requires `ffmpeg` + `cwebp` locally):

```bash
ffmpeg -i public/footer-bg.mp4 -ss 00:00:03 -vframes 1 -vf "scale=1920:-1" /tmp/footer-bg-poster.png
cwebp -q 70 /tmp/footer-bg-poster.png -o public/footer-bg-poster.webp
```

~20 KB WebP. If `cwebp` unavailable, fall back to PNG (~80 KB) — still fine for a below-fold decorative asset.

### Testing

**Build:**
- `npm run build` — zero errors, no new Vite warnings
- Confirm `public/footer-bg.mp4` and `public/footer-bg-poster.webp` are copied into `dist/` after build

**Visual:**
- Desktop 1440×900 — video plays, overlay keeps text readable, orb still the anchor
- Mobile 375×667 — video autoplays (iOS/Chrome Android) OR poster renders silently if blocked
- No horizontal scrollbar introduced

**Motion:**
- DevTools → Rendering → `prefers-reduced-motion: reduce` → video doesn't play, poster renders
- Scroll page to top → confirm footer off-screen → `document.querySelector('footer video').paused === true`
- Scroll back to footer → video resumes

**Performance:**
- DevTools Performance profile during footer scroll-in → no GPU/CPU spikes
- Lighthouse → ≤ 3-point regression tolerated (video `preload="metadata"` keeps initial body download small)
- Slow 3G throttle → poster renders immediately, video streams progressively

### Edge cases handled

| Case | Behavior |
|---|---|
| Autoplay blocked (iOS LPM, Data Saver) | Poster renders silently; no JS error |
| Navigation mid-load | IntersectionObserver cleanup disconnects cleanly |
| `prefers-reduced-motion: reduce` | Autoplay false, poster renders |
| Tab backgrounded | Browser pauses on its own; IO doesn't interfere |
| Slow network | Video streams progressively behind the poster |
| Ad-blocker blocking `/footer-bg.mp4` | Poster stays, no broken layout |
| Video file 404 | `<video>` shows poster, no console error |

### Explicit non-goals (YAGNI)

- No video controls (decorative, not a media element)
- No aurora+grid fallback if video fails — the poster is enough
- No route- or viewport-specific video sources
- No `MediaSource` / streaming — just a regular `<video src>` element
- No preload="auto" — wastes bandwidth on first paint

## Summary

- **Files:** 2 created (`public/footer-bg.mp4`, `public/footer-bg-poster.webp`), 1 modified (`src/components/CinematicFooter.tsx`)
- **Net lines:** ~-20 (remove aurora + grid divs) / ~+30 (video + overlay + IO effect + reduced-motion state) = +10 lines in `CinematicFooter.tsx`
- **Binary weight:** ~2-4 MB mp4 + ~20 KB webp added to `/public`
- **Deferred load:** video only starts downloading when user nears the footer (thanks to `preload="metadata"` + IntersectionObserver)
- **No new npm deps**
- **No regressions to other pages** — change is scoped to `CinematicFooter.tsx` which is a single shared footer component
