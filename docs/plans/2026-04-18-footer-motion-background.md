# Footer Motion Background Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Swap the aurora-glow + grid-pattern backdrop in `CinematicFooter.tsx` for a dark-particles-drift video loop with a gradient overlay, preserving the orb, headline, CTA, marquee, links, and legal row unchanged.

**Architecture:** Three tasks — (1) source and vet a CC0 video + poster asset into `public/`, (2) rewrite `CinematicFooter.tsx` to use `<video>` + gradient overlay + IntersectionObserver pause + reduced-motion fallback, (3) cross-device verification. Framer-motion and GSAP are already in the bundle; no new deps. Net ~+10 LOC in the component plus ~2-4 MB binary.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind + existing framer-motion 12.38 + existing GSAP 3.14 + existing `react-router-dom` v7. HTML5 `<video>` element + IntersectionObserver API.

**Design doc:** `docs/plans/2026-04-18-footer-motion-background-design.md` (commit `da4827f`)

---

## Pre-flight: What you need to know

Before starting, read:
- `src/components/CinematicFooter.tsx` — the entire 289-line file. The two divs to remove are labeled `{/* Aurora glow */}` and `{/* Grid */}` at lines 141-144.
- `public/` — existing static assets directory; your new files go here.
- `vite.config.ts` — confirm `publicDir` uses default `public/` (it does).
- `src/index.css` — find the `cf-aurora` and `cf-grid` CSS class definitions (search for them). After this change they're orphaned; leave them in CSS (they may be used elsewhere; confirm via grep). Don't delete CSS classes in this plan's scope.

**Pre-existing unrelated state on `main`:**
- `src/components/CinematicFooter.tsx` has ~57 lines of unstaged modifications that predate this workstream. Your edits will land ON TOP of those unstaged changes. READ the current file state first, adapt your diffs to what's actually there, and expect your commit to include both the unstaged pre-existing work AND your new changes. (This is a deliberate inherited state — do not revert the pre-existing diff; commit it with your changes as a cohesive footer update.)

**Conventions to match:**
- Footer backdrop `#060a12` stays unchanged
- No new colors introduced — use existing tokens
- `aria-hidden="true"` on every decorative layer
- No external dep additions; use platform APIs (`IntersectionObserver`, `matchMedia`)

---

## Task 1: Source, vet, and add the video + poster assets

**Files:**
- Create: `public/footer-bg.mp4` (~2-4 MB, downloaded)
- Create: `public/footer-bg-poster.webp` (~20 KB, generated)
- Reference: design doc Section 1 for candidate source list

### Step 1: Identify a CC0 video candidate

Pick ONE from this short list (in priority order):

1. Pexels video 3129977 — dark particles drift
2. Pexels video 3129957 — glowing grid abstract
3. Pexels video 3129595 — particle field

For each, verify in a browser before downloading:
- Dark enough (average luminance should feel close to `#060a12`)
- Under 5 MB at 1080p (or be willing to re-encode below)
- 10-15s seamless loop (start frame ≈ end frame — check by scrubbing both ends)
- CC0 / Pexels free license on the page (Pexels clips are CC0 by default, but double-check the specific video's page)

If none of the three feel right, widen to Pixabay (also CC0-friendly) — search `abstract dark particles loop`.

**Record the final URL + attribution** in a temporary scratch note; you'll include it in the commit message.

### Step 2: Download the chosen video to `public/footer-bg.mp4`

```bash
cd /Users/puneet/website-attentions-miro/app
# Example using curl — replace with the actual direct-download URL from Pexels
curl -o public/footer-bg.mp4 "https://videos.pexels.com/video-files/3129977/3129977-hd_1920_1080_30fps.mp4"
```

Expected: file exists at `public/footer-bg.mp4`. Verify:

```bash
ls -lh public/footer-bg.mp4
```

Should show a reasonable size — anything between 1 MB and 5 MB is fine. If larger than 5 MB, re-encode with ffmpeg:

```bash
ffmpeg -i public/footer-bg.mp4 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart public/footer-bg.mp4.tmp
mv public/footer-bg.mp4.tmp public/footer-bg.mp4
```

(The `-an` strips audio — we won't play it anyway. `-crf 26` is a reasonable compression level. `-preset slow` prioritizes smaller file over encode speed. `+faststart` enables progressive streaming.)

### Step 3: Generate the poster frame

```bash
cd /Users/puneet/website-attentions-miro/app
# Grab a frame from ~3 seconds into the video
ffmpeg -i public/footer-bg.mp4 -ss 00:00:03 -vframes 1 -vf "scale=1920:-1" /tmp/footer-bg-poster.png
# Convert to WebP for smaller size
cwebp -q 70 /tmp/footer-bg-poster.png -o public/footer-bg-poster.webp
```

If `cwebp` isn't installed (mac: `brew install webp`, linux: `apt install webp`), fall back to PNG output:

```bash
cp /tmp/footer-bg-poster.png public/footer-bg-poster.webp  # misnamed but browsers sniff content type
```

Better fallback: export a PNG and update the component code to reference `.png`. Ideally install cwebp first.

Verify:

```bash
ls -lh public/footer-bg-poster.webp
```

Should be under 50 KB. If it's bigger, re-run cwebp with `-q 60`.

### Step 4: Visual sanity check

Open `public/footer-bg.mp4` in any media player. Confirm:
- Plays from start to end
- Loops seamlessly (no visible "cut" when it restarts)
- Dark enough
- Aesthetic matches "dark particles drift" mood

Open `public/footer-bg-poster.webp` in any image viewer. Confirm:
- Shows a representative frame of the video (not the very first black frame — if it did, use `-ss 00:00:05` for a later frame)

### Step 5: Commit the assets

```bash
cd /Users/puneet/website-attentions-miro/app
git add public/footer-bg.mp4 public/footer-bg-poster.webp
git commit -m "$(cat <<'EOF'
feat(footer): add dark-particles-drift video + poster assets

Source: Pexels video [ID] · CC0 license · attribution optional per Pexels TOS.
Download URL: [record here]
Re-encoded with ffmpeg libx264 crf 26 + faststart for progressive streaming.
Poster frame extracted at t=00:00:03, 1920px wide WebP q=70.

~[actual size] MB mp4 + ~[actual size] KB webp. Below-fold decorative
asset; loads only when the user nears the footer (via preload="metadata"
on the video element — landed in the next commit).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Replace `[ID]`, `[record here]`, and `[actual size]` placeholders with real values.

---

## Task 2: Rewrite `CinematicFooter.tsx` with motion backdrop

**Files:**
- Modify: `src/components/CinematicFooter.tsx`

### Step 1: Read the current file state

```bash
cd /Users/puneet/website-attentions-miro/app
cat src/components/CinematicFooter.tsx | head -5
git status src/components/CinematicFooter.tsx
```

You should see ` M src/components/CinematicFooter.tsx` — the file has pre-existing unstaged modifications that predate this workstream. Read the full file via the Read tool. The below spec assumes the file's current working-tree state matches commit `da4827f` version. If it's diverged materially (new imports/sections I didn't anticipate), adapt the edits; the INTENT is to swap the aurora+grid divs for video+overlay without touching anything else.

### Step 2: Add imports at the top of the file

Current imports (lines 1-7 in the committed version):

```tsx
import { useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroOrb = lazy(() => import('./HeroOrb'));
```

Modify the React import to also pull in `useState`:

```tsx
import { useEffect, useRef, useState, Suspense, lazy } from 'react';
```

No new library imports needed. Everything else uses browser platform APIs.

### Step 3: Add reduced-motion state + video ref + IntersectionObserver inside the component

At the very top of the `CinematicFooter` function body (just after `const wrapperRef = useRef<HTMLDivElement>(null);`), add:

```tsx
  const headingRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // prefers-reduced-motion is read once at mount; if the user toggles
  // their system preference mid-session, they must reload for it to
  // take effect — consistent with how the existing GSAP reduced-motion
  // guard below behaves.
  const [prefersReducedMotion] = useState<boolean>(
    () => typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Pause video playback when the footer scrolls off-screen so we don't
  // burn CPU on long scrolling sessions. IntersectionObserver's single
  // threshold:0.01 fires when ≥1% of the video is visible.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay may be blocked on iOS Low-Power-Mode / Data Saver;
          // if so the promise rejects silently and the poster frame shows.
          video.play().catch(() => { /* intentionally silent */ });
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

(The existing `useEffect` below, with the GSAP headline animation, stays untouched.)

### Step 4: Replace the two backdrop divs with `<video>` + gradient overlay

Find these lines (approximately 141-144 in the committed version):

```tsx
        {/* Aurora glow */}
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 cf-aurora rounded-[50%] blur-[80px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(138,245,192,0.06) 0%, rgba(91,118,254,0.05) 40%, transparent 70%)' }} />
        {/* Grid */}
        <div className="cf-grid absolute inset-0 z-[1] pointer-events-none" />
```

Replace with:

```tsx
        {/* Motion background — dark particles drift, self-hosted Pexels CC0 loop */}
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
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{
            opacity: 0.55,
            mixBlendMode: 'screen',
            filter: 'brightness(0.85) saturate(0.9)',
          }}
        />
        {/* Dark gradient overlay — guarantees WCAG AA on the white content on top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,10,18,0.45) 0%, rgba(6,10,18,0.70) 50%, rgba(6,10,18,0.85) 100%)',
          }}
        />
```

Everything after this (marquee, main content, link grid, legal row) stays exactly as-is.

### Step 5: Verify build

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0. No TypeScript errors (the new `videoRef` + `useState<boolean>` are fully typed). No new Vite warnings beyond the pre-existing chunk-size note. `dist/footer-bg.mp4` and `dist/footer-bg-poster.webp` should appear in the build output.

### Step 6: Verify lint

```bash
cd /Users/puneet/website-attentions-miro/app
npm run lint
```

Expected: silent exit (clean). If the `useEffect` complains about `exhaustive-deps` for `prefersReducedMotion`, note that it IS in the dep array — no fix needed.

### Step 7: Visual smoke test (dev server)

```bash
cd /Users/puneet/website-attentions-miro/app
npm run dev
```

Navigate to `http://localhost:5173/` (or the port Vite reports) in a browser. Scroll to the footer. Verify:

- Dark background with particles drifting behind the orb
- Orb still the visual anchor, not washed out by the video
- Headline, 3 value callouts, "Book a founder call" CTA all legible
- Marquee band above the main content is legible
- 5-column link grid is legible; hover states still work
- Legal row at the bottom is legible

If you can use browser automation (Claude Preview / Claude in Chrome / Playwright), grab a screenshot and do a quick visual diff against what the footer looked like before (describe the difference).

Then scroll back up to the top of the page. Open DevTools Network tab. Confirm `footer-bg.mp4` only requests when you scroll near the footer (thanks to `preload="metadata"` — actually the metadata request fires earlier, but the full body only fetches on interaction or when the video starts to play).

### Step 8: Commit

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/CinematicFooter.tsx
git commit -m "$(cat <<'EOF'
feat(footer): swap aurora+grid backdrop for motion video

Replaces the static aurora-glow and grid-pattern decorative layers in
CinematicFooter with a self-hosted video backdrop (public/footer-bg.mp4,
dark-particles-drift Pexels CC0 loop) + a dark gradient overlay that
guarantees WCAG AA readability for the white foreground content.

Everything else stays: 3D HeroOrb, 2-col headline + 3-value-callout + CTA,
diagonal marquee band, 5-column link grid, legal row.

Motion behavior:
- autoPlay muted loop playsInline preload=metadata (canonical iOS-compliant
  combo; the 3D orb's canvas isn't affected by the video's mix-blend-mode
  since blend only composites with siblings beneath)
- IntersectionObserver pauses the video when the footer scrolls off-screen
  (saves CPU on long scrolling sessions). Plays on ≥1% intersection
- prefers-reduced-motion: reduce → autoPlay=false, poster renders instead;
  same dark-mood aesthetic with zero motion
- Autoplay-blocked promise rejections (iOS Low-Power-Mode, data saver)
  silently fall back to the poster frame

Also picks up pre-existing unstaged modifications to CinematicFooter.tsx
that predated this workstream — a coherent footer update lands as a
single commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Cross-device verification (no commit)

**Files:** none (verification-only)

### Step 1: Desktop visual check

`npm run dev`. At 1440×900, 1920×1080, and 1280×800 viewports (DevTools device toolbar or browser resize):

- Video plays, particles drift
- Orb remains the visual anchor — not washed out, not competing with video
- All text above z-index 10 is WCAG-AA-legible on the darkest frames of the video
- No horizontal scrollbar introduced
- Marquee band (`.cf-marquee`) still animates

### Step 2: Mobile visual check

DevTools device toolbar → iPhone 15 Pro (390×844), iPhone SE (375×667), Pixel 7 (412×915).

Expected:
- Video autoplays on first page interaction — iOS Safari autoplay policy allows `muted + playsInline` but some flows still require a user gesture. If video is paused/static, that's the poster frame doing its job — acceptable.
- Layout doesn't break: orb sits above 2-col-to-1-col collapsed headline; marquee + 5-col-to-2-col link grid + legal row all reflow correctly.
- Touch-scroll past the footer — no jank.

### Step 3: Reduced-motion verification

DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → `reduce`.

Reload `/`. Scroll to footer. Expected:
- Video element still present in DOM, but `autoPlay` is false and `video.paused === true`
- Poster frame (`footer-bg-poster.webp`) renders as a static image
- Aesthetic: still dark, still moody, just no motion

Run this in DevTools console after scrolling to footer:

```js
const v = document.querySelector('footer video');
console.log({ paused: v.paused, src: v.currentSrc, posterVisible: v.paused });
```

Expected: `paused: true`.

### Step 4: Off-screen pause verification

With reduced-motion emulation OFF, scroll to footer, wait for video to start playing, then scroll all the way back to the top.

In DevTools console:

```js
const v = document.querySelector('footer video');
console.log({ paused: v.paused });  // expected: true — IntersectionObserver paused it
```

Scroll back down to footer:

```js
console.log({ paused: v.paused });  // expected: false — IO resumed it
```

### Step 5: Performance check

DevTools → Performance tab → record a 10-second trace of scrolling from top to bottom and back.

Expected:
- No CPU spike above ~20% during video playback
- No GPU stall spikes
- Frame rate stays at 60fps while scrolling, even over the footer

DevTools → Lighthouse → Performance (mobile emulation). Expected: ≤ 3-point regression from pre-Task-2 baseline. Record the actual number in your report.

### Step 6: Network check

DevTools → Network tab → clear network log → reload `/` → observe:
- `footer-bg.mp4` request fires with `Range: bytes=0-` or similar partial request (browser fetching metadata)
- No "full body" download of the video until user scrolls near the footer
- `footer-bg-poster.webp` loads as the `<video>` element's poster — small (~20 KB)

Throttle network to "Slow 3G" → hard reload. Scroll to footer. Expected: poster renders instantly; video streams in progressively.

### Step 7: Edge case — video asset blocked

In DevTools → Network → right-click `footer-bg.mp4` → "Block request URL" → reload. Scroll to footer. Expected:
- Video element's poster renders as a static fallback
- No console error
- Layout unchanged

### Step 8: Final report

No commit; verification-only. Produce a report with:

- Desktop viewport pass/fail per width
- Mobile autoplay behavior observed per device
- Reduced-motion verification result
- IntersectionObserver pause verification result
- Performance numbers (CPU %, Lighthouse score delta, LCP/CLS)
- Network throttling behavior
- Any edge cases or visual regressions flagged

If any blocker-class defects surface (layout broken, performance regresses >3 points, reduced-motion fails to bypass), STOP and flag rather than fixing ad-hoc — the controller decides whether to land a polish commit or revert.

---

## Summary

| Task | Ships | Commits |
|------|-------|---------|
| 1 | Video + poster assets (`public/footer-bg.mp4`, `public/footer-bg-poster.webp`) | 1 |
| 2 | `CinematicFooter.tsx` rewrite (video + overlay + IO + reduced-motion) | 1 |
| 3 | Cross-device verification | 0 |

**Total: 2 commits.**

**Files created: 2** (both in `public/`)
**Files modified: 1** (`src/components/CinematicFooter.tsx`)
**New npm deps: 0**
**Binary weight added: ~2-4 MB mp4 + ~20 KB webp**

## Non-goals (YAGNI guard)

- No video controls (it's decorative)
- No aurora+grid fallback if video fails — the poster is enough
- No route- or viewport-specific video sources
- No `MediaSource` / streaming — plain `<video src>`
- No `preload="auto"` — wastes bandwidth on first paint
- No deletion of `.cf-aurora` / `.cf-grid` CSS class definitions in `src/index.css` — leave them in case they're used elsewhere; they're dead weight after this but out of scope for this plan
- No changes to any other component, page, or route
- No changes to `vite.config.ts` or `public/` directory structure

## If something goes wrong

- **Build fails after Task 2:** revert the Task 2 commit with `git revert HEAD`. The video files stay on disk (Task 1 commit) but aren't consumed; zero user-visible regression.
- **Video file too large (>5 MB):** re-encode with ffmpeg per Task 1 Step 2 instructions; re-commit with an amended message.
- **Autoplay broken on a specific mobile browser:** check `playsInline` is on the element; that's the most common cause. No other fix — poster fallback is the product answer for when autoplay is blocked.
- **Video looks wrong tonally:** revert Task 1, pick a different candidate, restart.
- **Full revert of the feature:** `git revert <task2-sha> <task1-sha>` — two small commits, atomic.
