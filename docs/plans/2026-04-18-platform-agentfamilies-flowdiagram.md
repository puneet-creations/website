# /platform AgentFamilies + FlowDiagram Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix AgentFamilies readability (10px SVG → 13-16px HTML, 3 cards) and add GSAP ScrollTrigger motion to FlowDiagram on `/platform`.

**Architecture:** 3 atomic commits. 2 files touched (`PlatformStory.tsx`, `FlowDiagram.tsx`). Zero new deps — GSAP + ScrollTrigger already imported site-wide. `/platform` stays light-themed; only the SVG internals of AgentFamilies cards change. FlowDiagram gains a sequential stage slide-in + chevron draw-in + traveling "document" pill.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind + existing GSAP 3.14 + existing lucide-react.

**Design doc:** `docs/plans/2026-04-18-platform-agentfamilies-flowdiagram-design.md` (commit `5f24ad0`)

---

## Pre-flight: What you need to know

Before starting, read:
- `docs/plans/2026-04-18-platform-agentfamilies-flowdiagram-design.md` — the design this plan executes
- `src/components/PlatformStory.tsx` lines ~56-292 — the `AgentFamilies` function (currently exports 3 cards)
- `src/components/FlowDiagram.tsx` — the 44-line 4-stage flow component
- `src/lib/lenis.ts` — reference for how GSAP + ScrollTrigger are already wired in this codebase (`gsap.registerPlugin(ScrollTrigger)` plus `lenis.on('scroll', ScrollTrigger.update)`)
- `src/components/CinematicFooter.tsx` lines 1-11 — reference for the GSAP import pattern + SSR-safe registerPlugin guard

**Conventions:**
- Light palette preserved on `/platform` (no dark treatment)
- Text floor 13px (nothing smaller)
- `aria-hidden="true"` on purely decorative SVG/divs
- `prefers-reduced-motion: reduce` → skip timeline, show final state
- Cleanup GSAP timelines + ScrollTriggers on unmount via `return () => ctx.revert()` inside `useEffect`

**Branch:** `main`. User has approved main throughout this session.

---

## Task 1: AgentFamilies — Document card SVG → HTML rewrite

**Files:** Modify `src/components/PlatformStory.tsx` — `AgentFamilies` function, Document card only

### Step 1: Locate the Document card's SVG block

In `src/components/PlatformStory.tsx`, find `export function AgentFamilies()`. Inside, there's a `{/* DOCUMENT AGENT */}` card block (roughly lines 64-110). Inside that card, find:

```tsx
{/* Visual flow */}
<div className="motion-card mb-4">
  <svg viewBox="0 0 320 140" className="w-full h-[180px]">
    {/* ...many <rect>, <text>, <line> children... */}
  </svg>
</div>
```

### Step 2: Add lucide-react import if not present

At the top of `PlatformStory.tsx`, check the existing imports. If `ChevronRight` isn't imported from `lucide-react`, add it:

```tsx
import { ChevronRight } from 'lucide-react';
```

(If a `lucide-react` import already exists for other icons, add `ChevronRight` to its named list.)

### Step 3: Replace the Document card's SVG block with HTML 3-segment flow

Replace the entire `<div className="motion-card mb-4">...</div>` block on the Document card with:

```tsx
{/* Mini-flow — HTML replacement of the prior SVG (readability ≥13px) */}
<div
  className="motion-card mb-4 rounded-[14px] p-4"
  style={{
    background: 'rgba(24,117,116,0.04)',
    border: '1px solid rgba(24,117,116,0.10)',
  }}
>
  <div
    className="grid items-center gap-3"
    style={{ gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.2fr)' }}
  >
    {/* INPUT */}
    <div className="min-w-0">
      <div className="text-[14px] font-bold text-black leading-tight">INV · PO · GRN</div>
      <div className="text-[12.5px] text-[rgba(0,0,0,0.55)] mt-0.5 leading-snug">mixed PDFs</div>
    </div>

    <ChevronRight size={20} aria-hidden className="text-[rgba(0,0,0,0.30)] flex-shrink-0" />

    {/* PROCESS */}
    <div
      className="min-w-0 rounded-[10px] px-3 py-2.5"
      style={{ background: 'rgba(24,117,116,0.08)', border: '1px solid rgba(24,117,116,0.14)' }}
    >
      <div className="text-[14px] font-bold text-black leading-tight">OCR + layout · artiGen</div>
      <div className="text-[12px] text-[rgba(0,0,0,0.55)] mt-0.5 leading-snug">on-prem · auto-routed</div>
    </div>

    <ChevronRight size={20} aria-hidden className="text-[rgba(0,0,0,0.30)] flex-shrink-0" />

    {/* OUTPUT */}
    <div
      className="min-w-0 rounded-[10px] px-3 py-2.5"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
    >
      <div className="text-[11px] font-bold uppercase tracking-wider text-[rgba(0,0,0,0.55)] mb-1.5" style={{ fontFamily: 'var(--mono)' }}>
        Structured
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5" style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>
        <span className="text-[rgba(0,0,0,0.50)]">vendor:</span><span className="text-black font-medium">V-472</span>
        <span className="text-[rgba(0,0,0,0.50)]">amount:</span><span className="text-black font-medium">$13,503</span>
        <span className="text-[rgba(0,0,0,0.50)]">gl:</span><span className="text-black font-medium">6100-2340</span>
        <span className="text-[rgba(0,0,0,0.50)]">conf:</span><span className="text-black font-medium">99.2%</span>
      </div>
      <div
        className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
        style={{ background: 'rgba(24,117,116,0.12)', color: '#187574', fontFamily: 'var(--mono)' }}
      >
        → SAP
      </div>
    </div>
  </div>
</div>
```

This preserves the 3-segment narrative (input → process → output) that the SVG conveyed, with readable text. The accent color `#187574` (teal for document family) stays the same — only the container changes from SVG to HTML.

### Step 4: Verify build + lint

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build && npm run lint
```

Both must exit 0.

### Step 5: Smoke-check in dev (optional if browser automation unavailable)

```bash
npm run dev
```

Navigate to `/platform`. Scroll to the AgentFamilies section. Expected:
- Document card's mini-flow is now an HTML 3-segment row with readable text (no more 10px SVG)
- The other 2 cards (Voice, Multimodal) still have their OLD SVGs — that's expected; Task 2 handles those
- Card's 3 bullets below + customer caption unchanged

### Step 6: Commit

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
refactor(platform): AgentFamilies Document card — SVG mini-flow → HTML

Replaces the 10px-text SVG mini-flow inside the Document agents card
with a 3-segment HTML flow (INPUT pills → PROCESS chip → OUTPUT panel).
All text now ≥13px, readable without zooming.

Matches Phase 1's readability treatment for HallucinationControl /
DeterminismProof / ScaleAtVolume. Light palette preserved — the card's
teal accent (#187574) stays; only the inner visualization changes from
SVG to HTML.

Voice + Multimodal cards get the same treatment in the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: AgentFamilies — Voice + Multimodal cards rewrite

**Files:** Modify `src/components/PlatformStory.tsx` — `AgentFamilies`'s Voice card + Multimodal card

### Step 1: Voice card replacement

Find the `{/* VOICE AGENT */}` card block. Inside it, the SVG block wrapped in `<div className="motion-card mb-4">...</div>`. Replace with:

```tsx
{/* Mini-flow — HTML replacement (readability ≥13px) */}
<div
  className="motion-card mb-4 rounded-[14px] p-4"
  style={{
    background: 'rgba(245,168,212,0.04)',
    border: '1px solid rgba(245,168,212,0.12)',
  }}
>
  <div
    className="grid items-center gap-3"
    style={{ gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.2fr)' }}
  >
    {/* INPUT */}
    <div className="min-w-0">
      <div className="text-[14px] font-bold text-black leading-tight">Dental · live audio</div>
      <div className="text-[12.5px] text-[rgba(0,0,0,0.55)] mt-0.5 leading-snug">on-prem ASR</div>
    </div>

    <ChevronRight size={20} aria-hidden className="text-[rgba(0,0,0,0.30)] flex-shrink-0" />

    {/* PROCESS */}
    <div
      className="min-w-0 rounded-[10px] px-3 py-2.5"
      style={{ background: 'rgba(245,168,212,0.10)', border: '1px solid rgba(245,168,212,0.18)' }}
    >
      <div className="text-[14px] font-bold text-black leading-tight">Domain NER</div>
      <div className="text-[12px] text-[rgba(0,0,0,0.55)] mt-0.5 leading-snug">SOAP + ICD mapping</div>
    </div>

    <ChevronRight size={20} aria-hidden className="text-[rgba(0,0,0,0.30)] flex-shrink-0" />

    {/* OUTPUT */}
    <div
      className="min-w-0 rounded-[10px] px-3 py-2.5"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
    >
      <div className="text-[11px] font-bold uppercase tracking-wider text-[rgba(0,0,0,0.55)] mb-1.5" style={{ fontFamily: 'var(--mono)' }}>
        SOAP · ICD
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5" style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>
        <span className="text-[rgba(0,0,0,0.50)]">S:</span><span className="text-black font-medium">cold sens 2w</span>
        <span className="text-[rgba(0,0,0,0.50)]">O:</span><span className="text-black font-medium">#3 Class II</span>
        <span className="text-[rgba(0,0,0,0.50)]">A:</span><span className="text-black font-medium">K02.51</span>
        <span className="text-[rgba(0,0,0,0.50)]">P:</span><span className="text-black font-medium">D2392 · 2-vst</span>
      </div>
      <div
        className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
        style={{ background: 'rgba(245,168,212,0.18)', color: '#c04a8f', fontFamily: 'var(--mono)' }}
      >
        → Dentrix
      </div>
    </div>
  </div>
</div>
```

### Step 2: Multimodal card replacement

Find the `{/* MULTIMODAL AGENT */}` card block. Inside it, the SVG block. Replace with:

```tsx
{/* Mini-flow — HTML replacement (readability ≥13px) */}
<div
  className="motion-card mb-4 rounded-[14px] p-4"
  style={{
    background: 'rgba(255,208,128,0.05)',
    border: '1px solid rgba(255,208,128,0.18)',
  }}
>
  <div
    className="grid items-center gap-3"
    style={{ gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1.2fr)' }}
  >
    {/* INPUT — 3 stacked mini-chips */}
    <div className="min-w-0 flex flex-col gap-1">
      <div className="text-[12.5px] text-black leading-tight">
        <span aria-hidden>🖼</span> <span className="font-semibold">Image:</span>{' '}
        <span className="text-[rgba(0,0,0,0.65)]">ins. card photo</span>
      </div>
      <div className="text-[12.5px] text-black leading-tight">
        <span aria-hidden>🎙</span> <span className="font-semibold">Voice:</span>{' '}
        <span className="text-[rgba(0,0,0,0.65)]">&ldquo;tooth hurts&rdquo;</span>
      </div>
      <div className="text-[12.5px] text-black leading-tight">
        <span aria-hidden>📄</span> <span className="font-semibold">Doc:</span>{' '}
        <span className="text-[rgba(0,0,0,0.65)]">chart history</span>
      </div>
    </div>

    <ChevronRight size={20} aria-hidden className="text-[rgba(0,0,0,0.30)] flex-shrink-0" />

    {/* PROCESS */}
    <div
      className="min-w-0 rounded-[10px] px-3 py-2.5"
      style={{ background: 'rgba(255,208,128,0.14)', border: '1px solid rgba(255,208,128,0.28)' }}
    >
      <div className="text-[14px] font-bold text-black leading-tight">Cross-modal fusion</div>
      <div className="text-[12px] text-[rgba(0,0,0,0.55)] mt-0.5 leading-snug">cited · reversible</div>
    </div>

    <ChevronRight size={20} aria-hidden className="text-[rgba(0,0,0,0.30)] flex-shrink-0" />

    {/* OUTPUT */}
    <div
      className="min-w-0 rounded-[10px] px-3 py-2.5"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
    >
      <div className="text-[11px] font-bold uppercase tracking-wider text-[rgba(0,0,0,0.55)] mb-1.5" style={{ fontFamily: 'var(--mono)' }}>
        Decision
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5" style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>
        <span className="text-[rgba(0,0,0,0.50)]">Plan:</span><span className="text-black font-medium">Delta PPO</span>
        <span className="text-[rgba(0,0,0,0.50)]">Proc:</span><span className="text-black font-medium">D2392</span>
        <span className="text-[rgba(0,0,0,0.50)]">Slot:</span><span className="text-black font-medium">Thu 9:00</span>
        <span className="text-[rgba(0,0,0,0.50)]">Cite:</span><span className="text-black font-medium">img+voice</span>
      </div>
      <div
        className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
        style={{ background: 'rgba(255,208,128,0.20)', color: '#9e6c1f', fontFamily: 'var(--mono)' }}
      >
        → booked
      </div>
    </div>
  </div>
</div>
```

### Step 3: Verify build + lint

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build && npm run lint
```

### Step 4: Smoke-check in dev

Navigate to `/platform`. All 3 AgentFamilies cards now show HTML 3-segment flows. Confirm:
- Document, Voice, Multimodal cards each have readable mini-flows
- Per-family accent colors preserved (teal / pink / amber)
- Text floor ≥13px everywhere
- Cards still fit the `md:grid-cols-3` layout without overflow at 1280px, 1440px, 1920px viewport widths

### Step 5: Commit

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
refactor(platform): AgentFamilies Voice + Multimodal cards — SVG → HTML

Applies the same 3-segment HTML treatment from Task 1 (Document card)
to the remaining two AgentFamilies cards. All SVG mini-flows on
/platform's AgentFamilies section are now HTML with ≥13px text.

Accent colors preserved per family: teal (#187574) for Document,
pink (#c04a8f) for Voice, amber (#9e6c1f) for Multimodal. Card
light-pastel palettes unchanged. Section headers, bullets below,
customer captions all untouched.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: FlowDiagram GSAP motion

**Files:** Modify `src/components/FlowDiagram.tsx` — add GSAP timeline, traveling pill, chevron draw-in

### Step 1: Replace the entire file

Replace `src/components/FlowDiagram.tsx` with:

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../hooks/useInView';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FlowDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<Array<SVGPathElement | null>>([]);

  const stages = [
    { n: '01', label: 'Document arrives', sub: 'PDF · email · audio · API',       color: 'rgba(255,120,120,0.06)', ink: '#ff9090' },
    { n: '02', label: 'artiGen reads & reasons', sub: 'Routes to right model · on-prem', color: 'rgba(138,245,192,0.06)', ink: '#8af5c0' },
    { n: '03', label: 'Acts on your systems',    sub: 'SAP · Epic · Salesforce · DMS',   color: 'rgba(160,220,140,0.06)', ink: '#a0dc8c' },
    { n: '04', label: 'Every answer cited',      sub: 'Audit trail · human approvals',   color: 'rgba(255,180,80,0.06)',  ink: '#ffd080' },
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pre-set chevron arrows to hidden (stroke-dashoffset === length)
      arrowRefs.current.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      // Pre-set pill to stage 01 position, invisible
      gsap.set(pillRef.current, { opacity: 0, x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      // Stages slide in from left sequentially
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.from(el, { x: -24, opacity: 0, duration: 0.4, ease: 'power2.out' }, i * 0.35);
      });

      // Chevron arrows draw in
      arrowRefs.current.forEach((path, i) => {
        if (!path) return;
        tl.to(path, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 0.2 + i * 0.15);
      });

      // Traveling document pill
      const pillTimeline = gsap.timeline();
      pillTimeline
        .set(pillRef.current, { opacity: 1 })
        .to(pillRef.current, {
          motionPath: undefined, // using x translate; no motion path needed
          xPercent: 0,
          duration: 0.1,
        })
        .to(pillRef.current, {
          x: '100%',
          duration: 2.8,
          ease: 'power1.inOut',
          onUpdate: function () {
            // Flash the stage whose center the pill just passed
            const pct = this.progress();
            const stageIdx = Math.min(3, Math.floor(pct * 4));
            const el = stageRefs.current[stageIdx];
            if (el && !el.dataset.flashed) {
              el.dataset.flashed = 'true';
              gsap.fromTo(
                el,
                { boxShadow: '0 0 0 0 rgba(138,245,192,0.0)' },
                {
                  boxShadow: '0 0 0 3px rgba(138,245,192,0.5)',
                  duration: 0.15,
                  ease: 'power2.out',
                  yoyo: true,
                  repeat: 1,
                }
              );
            }
          },
        })
        .to(pillRef.current, { opacity: 0, duration: 0.2 });

      tl.add(pillTimeline, 1.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="flow" className="py-24" ref={sectionRef} style={{ background: 'var(--bg-s5)' }}>
      <div ref={ref} className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[700px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>The flow</div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            From first document to <span className="italic">live action in your systems.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            One arrow, four stages, zero rewrites. Every agent follows the same path.
          </p>
        </div>

        {/* Stages + traveling pill container */}
        <div className="relative mt-12">
          {/* Pill — absolutely positioned, travels across the 4-stage row */}
          <div
            ref={pillRef}
            aria-hidden
            className="absolute z-10 pointer-events-none"
            style={{
              top: 4,
              left: 16,
              width: 'calc(100% - 120px)', // spans from stage 01 left to stage 04 left edge
              pointerEvents: 'none',
            }}
          >
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: '#5b76fe',
                color: '#ffffff',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 4px 12px rgba(91,118,254,0.35)',
              }}
            >
              <span aria-hidden>📄</span>
              INV-8892
            </div>
          </div>

          <div className="relative grid lg:grid-cols-4 gap-4 lg:gap-0 items-stretch">
            {stages.map((s, i) => (
              <div key={s.n} className="relative flex items-stretch">
                <div
                  ref={(el) => { stageRefs.current[i] = el; }}
                  className="flex-1 p-7 rounded-[24px]"
                  style={{ background: s.color, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 28 }}
                >
                  <div className="micro-upper mb-3" style={{ color: s.ink }}>Step {s.n}</div>
                  <div className="font-display text-[22px] leading-tight mb-2 text-black">{s.label}</div>
                  <div className="text-[14px] text-[rgba(0,0,0,0.65)] font-body">{s.sub}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className="hidden lg:flex items-center px-3 select-none" aria-hidden>
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                      <path
                        ref={(el) => { arrowRefs.current[i] = el; }}
                        d="M4 12 L34 12 M26 4 L34 12 L26 20"
                        stroke="#5b76fe"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Key patterns:**
- `gsap.context(() => { ... }, sectionRef)` — scopes GSAP selectors + ScrollTriggers for clean unmount via `ctx.revert()`
- `ScrollTrigger.create({ trigger, start: 'top 70%', once: true })` — fires timeline once on scroll-in, matches `CinematicFooter`'s existing pattern
- Reduced-motion guard at top of effect — short-circuits before any GSAP work
- Pill is absolutely-positioned full-width element; GSAP animates `x: '100%'` to move it across
- Stage flash on pass: `onUpdate` in the pill tween checks progress percentage, flashes each stage once (tracked via `el.dataset.flashed`)
- Chevron arrows: pre-set `strokeDasharray` = path length, then tween `strokeDashoffset` to 0 for draw-in effect

### Step 2: Verify build + lint

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build && npm run lint
```

### Step 3: Smoke-check in dev

Navigate to `/platform`. Scroll to the FlowDiagram section. Expected:
- On first scroll-in: 4 stages slide in from left sequentially (35ms apart)
- Chevron arrows draw in via stroke animation (staggered 150ms each)
- After stages settle: a teal pill labeled "📄 INV-8892" appears and travels horizontally across all 4 stages over ~2.8s
- As the pill passes each stage's horizontal midpoint, that stage's border briefly flashes teal
- Pill fades out at the end

Scrolling back up + down should NOT re-trigger the timeline (`once: true`).

### Step 4: Reduced-motion test

DevTools → Rendering → prefers-reduced-motion: reduce. Reload `/platform`. Expected:
- Stages render statically in their final state (existing `sr` / `is-in` CSS reveal may still fade them in; that's OK — it's content-fade, not full motion)
- No traveling pill
- No chevron draw-in (arrows render fully in place since `strokeDashoffset` is never pre-set in the reduced path)

Wait — actually one issue: if reduced-motion is set, the `useEffect` returns early BEFORE setting `strokeDasharray` on the arrows. So arrows render at their natural SVG-drawn state (fully visible). Good.

But for the pill: it's always in the DOM. In reduced motion it needs `opacity: 0` from the start so it doesn't visually appear. Add this to the JSX — the pill's outer div should start hidden via inline `style={{ opacity: 0 }}` in JSX, and GSAP overrides to `opacity: 1` only when the timeline runs.

Fix: the pill's `<div ref={pillRef}>` should have `style={{ ..., opacity: 0 }}` — the existing `gsap.set(pillRef.current, { opacity: 0, x: 0 })` at the start of the useEffect covers the animated path, but for reduced-motion the effect early-returns and the pill would be visible without this. Add `opacity: 0` to the JSX inline style.

Update the pill JSX:

```tsx
<div
  ref={pillRef}
  aria-hidden
  className="absolute z-10 pointer-events-none"
  style={{
    top: 4,
    left: 16,
    width: 'calc(100% - 120px)',
    pointerEvents: 'none',
    opacity: 0,  // hidden by default; GSAP timeline sets to 1 when playing
  }}
>
```

### Step 5: Commit

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/FlowDiagram.tsx
git commit -m "$(cat <<'EOF'
feat(platform): FlowDiagram GSAP motion — stages + chevrons + traveling pill

Adds a GSAP ScrollTrigger timeline that fires once when FlowDiagram
enters the viewport:

- 4 stages slide in from x: -24 sequentially (350ms stagger, 0.4s
  ease-out each)
- Chevron arrows between stages draw in via stroke-dashoffset tween
  (0.4s each, 150ms stagger starting at 0.2s)
- Traveling "📄 INV-8892" pill (teal, mono) animates horizontally
  across the 4-stage row over 2.8s
- As the pill passes each stage's midpoint, that stage's border
  flashes teal for ~300ms (tracked once per stage via dataset flag)
- Pill fades out over final 200ms

Reduced-motion guard at effect head short-circuits before any GSAP
work; stages render via existing sr/is-in CSS reveal, pill stays
invisible (inline style={{ opacity: 0 }}), arrows render at their
natural fully-drawn state.

GSAP already in bundle from prior commits — zero new deps.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Summary

| Task | Ships | Commits |
|---|---|---|
| 1 | AgentFamilies Document card SVG → HTML | 1 |
| 2 | AgentFamilies Voice + Multimodal cards SVG → HTML | 1 |
| 3 | FlowDiagram GSAP motion timeline | 1 |

**Total: 3 commits. 2 files changed. Zero new npm deps.**

## Non-goals (YAGNI)

- No palette change on /platform (stays light)
- No copy rewrites (all 3 AgentFamilies cards keep eyebrow / headline / bullets / caption)
- No changes to other PlatformStory sections (ContextMatters, HallucinationControl, DeterminismProof, ScaleAtVolume — all Phase 1 shipped, stay untouched)
- No FlowDiagram copy changes (4 stages keep their labels and sublines)
- No new motion-card effect styling (reuse existing `motion-card` class)
- No cross-page CSS additions (all styles inline per Phase 2 pattern)

## If something goes wrong

- **Build fails after Task 1:** revert with `git revert HEAD`; the 2nd + 3rd commits are blocked until Task 1's HTML shape typechecks cleanly
- **Visual regression in AgentFamilies:** revert Tasks 1+2; /platform's old SVG mini-flows come back
- **GSAP timeline doesn't fire or glitches:** revert Task 3. Tasks 1+2 remain shipped
- **Reduced-motion path broken:** ensure the pill inline `opacity: 0` is in place; pill should never be visible in reduced state regardless of timeline
- **Pill traveling path feels wrong at some breakpoint:** the `width: 'calc(100% - 120px)'` trick may need adjusting. Alternative: measure stage-01 and stage-04 positions at runtime and animate the pill's `x` between them in pixels. Flag if the simple approach doesn't look right.
