# Platform SVG Readability Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the 3 hard-to-read SVG visualizations on `/platform` (HallucinationControl, DeterminismProof, ScaleAtVolume) to HTML/CSS card layouts with ≥13px readable text, plus one storytelling framer-motion animation per section.

**Architecture:** Single file rewrite of 3 exported functions in `src/components/PlatformStory.tsx`. Each section keeps its current public API (`<HallucinationControl />` etc. with no props), its headlines, and its section background. Internal implementation swaps SVG for HTML/CSS cards and layers on scroll-triggered framer-motion animations. Existing `useInView` + `sr`/`is-in` CSS-reveal pattern is kept for basic reveals; framer-motion is added for the sequenced storytelling animations.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + framer-motion (12.38.0, already installed) + lucide-react (1.8.0, already installed) + existing `useInView` hook at `src/hooks/useInView.ts`.

**Design doc:** `docs/plans/2026-04-18-platform-svg-readability-design.md` (commit `f77653f`)

---

## Pre-flight: What you need to know about this codebase

Before starting, read:
- `src/components/PlatformStory.tsx` lines 1–46 (file header + shared CSS keyframes) and the 3 target functions:
  - `HallucinationControl` — lines 424–577
  - `DeterminismProof` — lines 582–672
  - `ScaleAtVolume` — lines 675–810
- `src/hooks/useInView.ts` — the hook signature. One-shot reveal. Returns `[ref, inView]`.
- `src/index.css` lines 88 (`.micro-upper`), 166–167 (`.sr` / `.is-in`), 190–200 (`.d-1..d-n` stagger delays), 215 (`prefers-reduced-motion` reset), 384+ (`.capsule-light`).
- `src/pages/PlatformPage.tsx` — confirms `<HallucinationControl />`, `<DeterminismProof />`, `<ScaleAtVolume />` are consumed with zero props. **Do not change the export signatures.**

**Conventions already in use that you must match:**
- `useInView<HTMLElement>(0.15)` — threshold 0.15 for these sections (not 0.25 — matches existing pattern in PlatformStory)
- CSS-reveal pattern: `className={`sr d-1 ${inView ? 'is-in' : ''}`}`. Stagger with `d-1` through `d-6`.
- Card shell: `rounded-[24px]`, `background: 'rgba(0,0,0,0.03)'`, `border: '1px solid rgba(0,0,0,0.06)'`
- Section wrapper: `<section ref={ref} className="py-24" style={{ background: 'var(--bg-sN)' }}>` where N is 3, 4, or 5
- Headlines use `display-2` class + `<span className="italic">` for accent — preserve these exactly.
- framer-motion reduced-motion: call `useReducedMotion()` from `'framer-motion'` at the top of any component using `<motion.*>`. If it returns `true`, render the static final state instead of animating.
- **Do NOT** remove the `<style>` block at lines 14–34 of `PlatformStory.tsx` — it's used by `AgentFamilies` and `ContextMatters` which aren't in scope.

**Text size floor:** every rendered text node in these 3 sections must be ≥13px actual pixels. Use DevTools inspection to verify, not trust CSS.

---

## Task 1: Baseline capture + branch hygiene

**Files:**
- Read-only: all 3 target functions in `src/components/PlatformStory.tsx`

**Step 1: Verify clean working tree**

```bash
cd /Users/puneet/website-attentions-miro/app
git status --short
```

Expected: shows only pre-existing unrelated files. If there are uncommitted changes to `PlatformStory.tsx`, stop and ask the user.

**Step 2: Boot dev server**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run dev
```

Expected: Vite dev server starts at `http://localhost:5173` (or similar). Keep it running in the background for subsequent tasks.

**Step 3: Capture baseline screenshots**

Navigate to `http://localhost:5173/platform` and capture screenshots of each of the 3 target sections at 1440px viewport width. Save to a temp scratch dir (e.g. `/tmp/platform-before/`):
- `hallucination-before.png`
- `determinism-before.png`
- `scale-before.png`

These are the "failing test" — they visually document the unreadable text that this plan fixes. Keep them until the final verification task passes.

**Step 4: Confirm build is green before starting**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0 with zero TypeScript errors and zero Vite warnings. If it fails before any of my changes, stop and ask the user.

**Step 5: No commit for this task** — it's setup-only.

---

## Task 2: HallucinationControl — layout rewrite (SVG → HTML cards)

**Files:**
- Modify: `src/components/PlatformStory.tsx` lines 424–577 (the entire `HallucinationControl` function)

**Step 1: Verify you can render the current version**

Navigate to `http://localhost:5173/platform`, scroll to "Four walls, not four prompts." Confirm you see the cramped 4-wall SVG. Open DevTools → Inspect one of the inner text elements. Verify `font-size: 10px` or similar. **This is the defect being fixed.**

**Step 2: Replace the function body**

Replace lines 424–577 entirely (the whole `export function HallucinationControl() { ... }`) with:

```tsx
export function HallucinationControl() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  const walls = [
    {
      n: '01',
      title: 'Grounding',
      desc: 'Must cite a chunk from your private index.',
      gate: 'no source → reject',
      evidence: (
        <div className="space-y-2">
          <StatRow label="Rejected today" value="14" />
          <StatRow label="Passed" value="8,204" />
        </div>
      ),
    },
    {
      n: '02',
      title: 'Confidence',
      desc: 'Every field scored. Below θ → human review.',
      gate: 'low score → escalate',
      evidence: (
        <div className="space-y-2">
          <ScoreBar label="vendor" pct={99} />
          <ScoreBar label="gl" pct={95} />
          <ScoreBar label="amount" pct={72} flag />
        </div>
      ),
    },
    {
      n: '03',
      title: 'Cross-verify',
      desc: '2nd model validates the first. Disagree → escalate.',
      gate: 'agreement < θ → escalate',
      evidence: (
        <div className="space-y-2">
          <ModelChip name="Llama-70" role="primary" />
          <ModelChip name="Mistral-8x" role="verifier" />
          <StatRow label="Agreement" value="97.8%" />
          <StatRow label="Escalated" value="2.2%" />
        </div>
      ),
    },
    {
      n: '04',
      title: 'Schema lock',
      desc: 'Typed JSON. Invalid → rejected at runtime.',
      gate: 'schema fail → reject',
      evidence: (
        <pre className="text-[13px] leading-[1.5] font-mono text-black bg-[rgba(0,0,0,0.04)] rounded-[8px] p-3 overflow-x-auto">
{`{
  "vendor_id": "V-472",
  "amount": 13503.00,
  "gl": "6100-2340",
  "cite": ["inv:p2"],
  "conf": 0.98
}`}
        </pre>
      ),
    },
  ];

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s3)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>
            Hallucination control
          </div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Four walls, <span className="italic">not four prompts.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            A regulated workflow can't survive a 3% hallucination rate. Every artiGen output passes the same 4-layer gauntlet before it leaves the runtime.
          </p>
        </div>

        {/* Gauntlet row */}
        <div
          className={`flex flex-col lg:flex-row items-stretch gap-3 sr d-3 ${inView ? 'is-in' : ''}`}
        >
          <EndCard variant="candidate" />
          {walls.map((w, i) => (
            <div key={w.n} className="flex items-stretch gap-3 lg:contents">
              <Chevron />
              <WallCard {...w} />
            </div>
          ))}
          <Chevron />
          <EndCard variant="approved" />
        </div>

        {/* Metric strip — unchanged */}
        <div
          className={`max-w-[900px] mx-auto mt-10 rounded-[24px] p-8 grid grid-cols-3 gap-6 text-center sr d-4 ${inView ? 'is-in' : ''}`}
          style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          <div>
            <div className="font-display text-[48px] text-black">0.04<span className="text-[28px] text-[rgba(0,0,0,0.65)]">%</span></div>
            <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-1">silent error rate</div>
            <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">vs 3.2% on GPT-4 baseline</div>
          </div>
          <div>
            <div className="font-display text-[48px] text-black">100<span className="text-[28px] text-[rgba(0,0,0,0.65)]">%</span></div>
            <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-1">cited outputs</div>
            <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">zero ungrounded answers</div>
          </div>
          <div>
            <div className="font-display text-[48px] text-black">12<span className="text-[28px] text-[rgba(0,0,0,0.65)]">mo</span></div>
            <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-1">in regulated prod</div>
            <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">dental · auto · logistics</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Subcomponents for HallucinationControl --- */

function WallCard({
  n,
  title,
  desc,
  gate,
  evidence,
}: {
  n: string;
  title: string;
  desc: string;
  gate: string;
  evidence: React.ReactNode;
}) {
  return (
    <div
      className="flex-1 min-w-0 rounded-[20px] p-5"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold text-black"
          style={{ background: 'rgba(0,0,0,0.04)' }}
        >
          {n}
        </div>
        <div className="font-display text-[18px] text-black leading-tight">{title}</div>
      </div>
      <div className="text-[14px] text-[rgba(0,0,0,0.70)] leading-snug mb-3">{desc}</div>
      <div className="flex items-baseline gap-2 mb-3">
        <div className="micro-upper text-[11px]" style={{ color: 'rgba(0,0,0,0.50)' }}>
          Gate
        </div>
        <div className="text-[14px] text-black font-medium">{gate}</div>
      </div>
      <div>{evidence}</div>
    </div>
  );
}

function EndCard({ variant }: { variant: 'candidate' | 'approved' }) {
  const isCandidate = variant === 'candidate';
  return (
    <div
      className="lg:w-[140px] rounded-[20px] p-5 flex flex-col justify-center"
      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="micro-upper text-[11px] mb-2" style={{ color: 'rgba(0,0,0,0.50)' }}>
        {isCandidate ? 'Candidate' : 'Approved'}
      </div>
      <div className="font-display text-[18px] text-black leading-tight mb-1">
        {isCandidate ? 'raw answer' : '✓ safe'}
      </div>
      <div className="text-[14px] text-[rgba(0,0,0,0.50)]">
        {isCandidate ? 'untrusted · unchecked' : 'safe to emit'}
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <div className="hidden lg:flex items-center text-[rgba(0,0,0,0.30)]" aria-hidden>
      <ChevronRight size={24} />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-baseline justify-between rounded-[8px] px-3 py-2"
      style={{ background: 'rgba(0,0,0,0.04)' }}
    >
      <div className="text-[13px] text-[rgba(0,0,0,0.60)]">{label}</div>
      <div className="text-[14px] font-bold text-black">{value}</div>
    </div>
  );
}

function ScoreBar({ label, pct, flag }: { label: string; pct: number; flag?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <div className="text-[13px] text-[rgba(0,0,0,0.60)] flex items-center gap-1">
          {label}
          {flag && <Flag size={12} className="text-[rgba(0,0,0,0.60)]" />}
        </div>
        <div className="text-[13px] font-bold text-black">{pct}%</div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'rgba(0,0,0,0.30)' }} />
      </div>
    </div>
  );
}

function ModelChip({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="flex items-baseline justify-between rounded-[8px] px-3 py-2"
      style={{ background: 'rgba(0,0,0,0.04)' }}
    >
      <div className="text-[14px] font-bold text-black">{name}</div>
      <div className="text-[13px] text-[rgba(0,0,0,0.50)]">{role}</div>
    </div>
  );
}
```

**Step 3: Add the lucide-react imports**

At the top of `src/components/PlatformStory.tsx` (after the existing `useInView` import on line 1), add:

```tsx
import { ChevronRight, Flag } from 'lucide-react';
```

**Step 4: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0. No TypeScript errors. The helper subcomponents (`WallCard`, `EndCard`, etc.) are defined inside the file and consumed only by `HallucinationControl` — they don't need to be exported.

**Step 5: Visually verify readability**

Dev server is still running. Reload `http://localhost:5173/platform` and scroll to the section. Inspect any text node in a wall via DevTools → Computed → Font size. Confirm the smallest body text is 13px or larger. Confirm the JSON in wall 4 is readable without zooming at 1440px viewport width.

Capture an "after" screenshot to `/tmp/platform-after/hallucination-layout.png` for comparison.

**Step 6: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
refactor(platform): hallucination-control SVG → HTML cards

Rewrites HallucinationControl as a 6-card horizontal flow (candidate →
4 walls → approved) with readable 13–18px text, lucide ChevronRight
connectors, and evidence panels rebuilt as real HTML (score bars,
model chips, JSON pre-block). Headline, subline, and metric strip
unchanged. Motion still limited to the existing sr/is-in reveal —
dot traversal animation lands in the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: HallucinationControl — dot traversal motion

**Files:**
- Modify: `src/components/PlatformStory.tsx` — `HallucinationControl` and its subcomponents

**Step 1: Add framer-motion imports**

At the top of `src/components/PlatformStory.tsx`, add (or extend an existing import if one exists):

```tsx
import { motion, useReducedMotion } from 'framer-motion';
```

**Step 2: Wrap each `WallCard` and `EndCard` in a `motion.div` that accepts an `active` prop**

Modify `WallCard` and `EndCard` to accept an optional `active: boolean` prop. When `active` is true, apply a blue ring:

```tsx
// In both WallCard and EndCard, replace the outermost div with:
<motion.div
  animate={active ? { boxShadow: '0 0 0 2px #5b76fe', transition: { duration: 0.2 } }
                  : { boxShadow: '0 0 0 0px rgba(91,118,254,0)', transition: { duration: 0.4 } }}
  className="..."  /* keep existing classes */
  style={{ ... }}  /* keep existing style */
>
  {/* ... existing content ... */}
</motion.div>
```

**Step 3: Add traversal state to `HallucinationControl`**

Inside `HallucinationControl`, above the `return`, add:

```tsx
const reduced = useReducedMotion();
const [activeIdx, setActiveIdx] = useState<number>(-1);
// indices: -1 = not started, 0 = candidate, 1..4 = walls, 5 = approved, 6 = done

useEffect(() => {
  if (!inView) return;
  if (reduced) {
    // Light up all cards statically, no traversal
    setActiveIdx(6);
    return;
  }
  const timeline = [0, 1, 2, 3, 4, 5, 6];
  const stepMs = 400;
  const timers = timeline.map((idx, i) =>
    window.setTimeout(() => setActiveIdx(idx), i * stepMs)
  );
  return () => timers.forEach(clearTimeout);
}, [inView, reduced]);
```

Add `useEffect`, `useState` to the React import at the top of the file if they're not already present.

**Step 4: Pass `active` prop to each card**

In the render, pass `active` based on whether that card is ≤ `activeIdx` (so earlier cards stay lit once the dot has passed):

```tsx
<EndCard variant="candidate" active={activeIdx >= 0 && (reduced || activeIdx >= 0)} />
{walls.map((w, i) => (
  <div key={w.n} className="flex items-stretch gap-3 lg:contents">
    <Chevron />
    <WallCard {...w} active={activeIdx >= i + 1} />
  </div>
))}
<Chevron />
<EndCard variant="approved" active={activeIdx >= 5} />
```

**Step 5: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 6: Visually verify the motion**

Reload `http://localhost:5173/platform`, scroll to the section from above (fresh reveal). Expected: candidate card flashes blue, then walls 1 → 2 → 3 → 4 light up sequentially at ~400ms intervals, then approved card lights up. Total ~2.4s. Each card stays lit once reached.

Verify `prefers-reduced-motion: reduce` fallback: DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload. Expected: all cards lit from the start, no sequential animation.

**Step 7: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
feat(platform): hallucination-control dot-traversal motion

Sequenced blue-ring highlight across candidate → 4 walls → approved
at 400ms/step when the section enters view. useReducedMotion falls
back to all-cards-lit static state. Ring color matches platform
accent #5b76fe.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: DeterminismProof — layout rewrite (SVG → 3-act HTML story)

**Files:**
- Modify: `src/components/PlatformStory.tsx` — replace the entire `DeterminismProof` function (lines 582–672)

**Step 1: Baseline check**

Reload the section at `http://localhost:5173/platform#same-input` (or scroll). Confirm current SVG text is ~10px and cramped.

**Step 2: Replace the function body**

Replace the entire `export function DeterminismProof() { ... }` with:

```tsx
export function DeterminismProof() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  const runs = [
    { idx: '01', time: '09:14 AM' },
    { idx: '02', time: '11:47 AM' },
    { idx: '03', time: '02:22 PM' },
    { idx: '04', time: '06:08 PM' },
  ];

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s4)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>
            Deterministic by design
          </div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Same input. <span className="italic">Same output. Every time.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            Public LLMs are non-deterministic by default — run the same prompt twice, get two different answers. artiGen pins seeds, temperature, retrievers, and schemas so the same document produces the same voucher at 9 AM, noon, and midnight.
          </p>
        </div>

        {/* 3-act story container */}
        <div
          className={`max-w-[1200px] mx-auto rounded-[24px] p-10 sr d-3 ${inView ? 'is-in' : ''}`}
          style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          {/* Act 1 + Act 2 — side by side on desktop, stacked on mobile */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {/* Act 1: Input */}
            <div
              className="rounded-[20px] p-6"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="micro-upper text-[11px] mb-3" style={{ color: 'rgba(0,0,0,0.50)' }}>
                Input · IN-8892
              </div>
              <div className="font-display text-[22px] text-black leading-tight mb-1">Global Logistics LLC</div>
              <div className="text-[16px] text-[rgba(0,0,0,0.65)] mb-3">USD 13,503.00</div>
              <div
                className="inline-block text-[13px] font-mono text-black rounded-[8px] px-3 py-1.5"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                sha256: 7a2f…0e19
              </div>
              <div className="text-[13px] italic text-[rgba(0,0,0,0.50)] mt-3">fed 4× throughout the day</div>
            </div>

            {/* Act 2: Pinning layer */}
            <div
              className="rounded-[20px] p-6"
              style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="micro-upper text-[11px] mb-3" style={{ color: 'rgba(0,0,0,0.50)' }}>
                Pinning layer
              </div>
              <pre
                className="text-[13px] leading-[1.6] font-mono text-black rounded-[8px] p-3 overflow-x-auto"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
{`temperature = 0
seed = 42
top_p = 1.0
retriever = idx_v12
model = llama-70-v4.2
schema = invoice.v3
replay_enabled = true`}
              </pre>
            </div>
          </div>

          {/* Act 3: 4 identical runs */}
          <div className="relative space-y-3">
            {runs.map((r) => (
              <RunCard key={r.idx} idx={r.idx} time={r.time} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 border-t border-[rgba(0,0,0,0.06)] pt-5">
            <div className="text-[16px] text-[rgba(0,0,0,0.65)]">
              <b className="text-black">All four runs hash-identical.</b> Replay harness runs last month's vouchers against today's build before every promote — regression caught pre-prod, never in prod.
            </div>
            <code className="capsule-light rounded-full whitespace-nowrap text-[13px]">
              4 / 4 identical · 0 drift
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

function RunCard({ idx, time }: { idx: string; time: string }) {
  return (
    <div
      className="rounded-[12px] px-5 py-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-4"
      style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="font-display text-[16px] text-black whitespace-nowrap">
        Run {idx} · <span className="text-[rgba(0,0,0,0.60)]">{time}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-[13px] font-mono text-black rounded-[6px] px-2 py-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
          vendor_id: V-472
        </span>
        <span className="text-[13px] font-mono text-black rounded-[6px] px-2 py-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
          amount: 13503.00
        </span>
        <span className="text-[13px] font-mono text-black rounded-[6px] px-2 py-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
          gl: 6100-2340
        </span>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-[13px] font-mono text-black">sha256: 4a2f…0e19</span>
        <span className="text-[13px] font-bold text-[#2a8f5c] rounded-full px-2 py-0.5" style={{ background: 'rgba(42,143,92,0.10)' }}>
          ✓ identical
        </span>
      </div>
    </div>
  );
}
```

**Step 3: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 4: Visually verify**

Reload `http://localhost:5173/platform`, scroll to "Same input. Same output. Every time." Confirm:
- Input card (left) and Pinning layer (right) side by side on desktop
- Pinning layer config readable at 13px — all 7 lines fit without horizontal scroll
- 4 run cards below, each showing timestamp + 3 value chips + hash + ✓ identical badge
- Every text node ≥13px

Capture `/tmp/platform-after/determinism-layout.png`.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
refactor(platform): determinism-proof SVG → HTML 3-act story

Rewrites DeterminismProof as a 3-act vertical narrative: Input card +
Pinning-layer code block (side by side on desktop), then 4 identical
RunCards stacked. All monospace configs now readable 13px with proper
line-height. Headline, subline, and footer bar unchanged. Stamping
animation lands in next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: DeterminismProof — stamping motion + connector line

**Files:**
- Modify: `src/components/PlatformStory.tsx` — `DeterminismProof` and `RunCard`

**Step 1: Make `RunCard` accept a `delay` prop + use framer-motion**

Replace the `RunCard` function with:

```tsx
function RunCard({ idx, time, delay, reduced }: { idx: string; time: string; delay: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 60 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      className="rounded-[12px] px-5 py-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-4"
      style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="font-display text-[16px] text-black whitespace-nowrap">
        Run {idx} · <span className="text-[rgba(0,0,0,0.60)]">{time}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-[13px] font-mono text-black rounded-[6px] px-2 py-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
          vendor_id: V-472
        </span>
        <span className="text-[13px] font-mono text-black rounded-[6px] px-2 py-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
          amount: 13503.00
        </span>
        <span className="text-[13px] font-mono text-black rounded-[6px] px-2 py-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
          gl: 6100-2340
        </span>
      </div>
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-[13px] font-mono text-black">sha256: 4a2f…0e19</span>
        <motion.span
          initial={reduced ? false : { scale: 0.8, background: 'rgba(42,143,92,0.30)' }}
          whileInView={reduced ? undefined : {
            scale: [0.8, 1.15, 1],
            background: ['rgba(42,143,92,0.30)', 'rgba(42,143,92,0.30)', 'rgba(42,143,92,0.10)'],
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
          className="text-[13px] font-bold text-[#2a8f5c] rounded-full px-2 py-0.5"
          style={{ background: 'rgba(42,143,92,0.10)' }}
        >
          ✓ identical
        </motion.span>
      </div>
    </motion.div>
  );
}
```

**Step 2: Update `DeterminismProof` to pass `delay` + add connector line**

In `DeterminismProof`, replace the `reduced` declaration and the runs mapping:

```tsx
// Near the top of DeterminismProof, after `const [ref, inView] = useInView...`:
const reduced = useReducedMotion() ?? false;

// Replace the runs mapping block:
<div className="relative space-y-3">
  {/* Vertical connector line — anchored to the sha chips column on desktop only */}
  <motion.div
    aria-hidden
    className="absolute right-[140px] top-8 bottom-8 w-px hidden lg:block"
    initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
    whileInView={{ scaleY: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay: reduced ? 0 : 1.6, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    style={{ background: 'rgba(42,143,92,0.40)', transformOrigin: 'top' }}
  />
  {runs.map((r, i) => (
    <RunCard key={r.idx} idx={r.idx} time={r.time} delay={reduced ? 0 : 0.3 + i * 0.25} reduced={reduced} />
  ))}
</div>
```

**Step 3: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 4: Visually verify motion**

Scroll to the section fresh. Expected: 4 run cards slide in from the right at 250ms intervals. Each card's `✓ identical` badge pulses-scale as it lands. After the 4th card settles, a thin green vertical line grows from the top of Run 01's hash chip down to Run 04's.

Verify `prefers-reduced-motion: reduce`: all cards visible from start, green connector line drawn statically. No entry animation.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
feat(platform): determinism-proof stamping motion + hash connector

4 RunCards slide in right-to-left with 250ms stagger. Each card's
identical badge does a scale+flash on arrival. After all 4 settle, a
thin green vertical line grows between the hash chips, visually
connecting the 4 identical sha256 values. useReducedMotion falls
back to all-visible static state.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: ScaleAtVolume — layout rewrite (router fanout SVG → CSS sankey)

**Files:**
- Modify: `src/components/PlatformStory.tsx` — replace the entire `ScaleAtVolume` function (lines 675–810)

**Step 1: Baseline check**

Scroll to "From one document to thousands per hour." Confirm the current router fanout SVG has unreadable 10px text.

**Step 2: Replace the function body**

Replace the entire `export function ScaleAtVolume() { ... }` with:

```tsx
export function ScaleAtVolume() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  const metrics = [
    { n: '12,400', label: 'docs / hour', sub: 'peak · 1 rack' },
    { n: '< 2.4s', label: 'p95 latency', sub: 'end-to-end' },
    { n: '3.1M', label: 'docs / month', sub: '3 tenants' },
    { n: '99.94%', label: 'uptime SLA', sub: 'trailing 12mo' },
  ];

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s5)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.50)' }}>
            Scale
          </div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            From one document <span className="italic">to thousands per hour.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            A demo that handles one PDF is a parlor trick. Production means a Monday-morning backlog of 14,000 vouchers and an SLA that doesn't care about your weekend.
          </p>
        </div>

        {/* Top metric cards — unchanged */}
        <div className="grid md:grid-cols-4 gap-4 max-w-[1400px] mx-auto mb-10">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`rounded-[20px] p-6 text-center sr ${inView ? 'is-in' : ''}`}
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)', transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-[44px] text-black leading-none">{m.n}</div>
              <div className="micro-upper text-[rgba(0,0,0,0.65)] mt-2">{m.label}</div>
              <div className="text-[16px] text-[rgba(0,0,0,0.50)] mt-1">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Pipeline visual */}
        <div
          className={`max-w-[1400px] mx-auto rounded-[24px] p-10 sr d-3 ${inView ? 'is-in' : ''}`}
          style={{ background: 'white', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          {/* Header row */}
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <div className="micro-upper mb-1" style={{ color: 'rgba(0,0,0,0.50)' }}>Monday backlog · Thomson Group</div>
              <div className="font-display text-[28px] text-black">14,200 vouchers</div>
            </div>
            <div className="text-right">
              <div className="micro-upper mb-1" style={{ color: 'rgba(0,0,0,0.50)' }}>Cleared by</div>
              <div className="font-display text-[28px] text-black">10:42 AM</div>
            </div>
          </div>

          {/* Sankey bar + lane labels */}
          <SankeyBar inView={inView} />

          {/* QUEUE → ROUTER → SAP chip row */}
          <div className="flex items-center justify-between gap-4 mt-8 flex-wrap md:flex-nowrap">
            <PipelineChip label="QUEUE" value="14,200 in" />
            <span className="text-[rgba(0,0,0,0.30)] hidden md:block"><ChevronRight size={20} /></span>
            <PipelineChip label="ROUTER" value="cost + complexity" />
            <span className="text-[rgba(0,0,0,0.30)] hidden md:block"><ChevronRight size={20} /></span>
            <PipelineChip label="POSTED TO SAP" value="14,200 · 0 errors" highlight />
          </div>

          {/* Throughput progress bar — unchanged */}
          <div className="relative h-5 rounded-full overflow-hidden mb-2 mt-8" style={{ background: 'rgba(0,0,0,0.05)' }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: inView ? '100%' : '0%',
                background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 100%)',
                transition: 'width 2.4s ease-out',
              }}
            />
          </div>
          <div className="grid grid-cols-5 text-[14px] text-[rgba(0,0,0,0.50)]">
            <div>06:00</div>
            <div>07:30</div>
            <div>09:00</div>
            <div>10:30</div>
            <div className="text-right text-[#000000]">done 10:42</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SankeyBar({ inView }: { inView: boolean }) {
  const reduced = useReducedMotion() ?? false;

  const lanes = [
    { key: 'small', label: 'Small model · 7B on-prem', detail: 'invoices · simple vouchers · receipts', pct: 83, volume: '11,820', rate: '$0.0002/doc', fill: 'rgba(91,118,254,0.22)' },
    { key: 'frontier', label: 'Frontier · Llama-70 / Mistral', detail: 'cross-doc matches · handwritten · edge', pct: 14, volume: '1,960', rate: '$0.004/doc', fill: 'rgba(91,118,254,0.45)' },
    { key: 'human', label: 'Human review', detail: 'confidence < θ · exceptions · flagged', pct: 3, volume: '420', rate: '90s avg', fill: 'rgba(91,118,254,0.70)' },
  ];

  // Delay each lane's grow so they animate sequentially, not simultaneously
  const laneDelays = [0, 0.9, 1.3];
  const laneDurations = [0.9, 0.4, 0.3];

  return (
    <div>
      {/* Desktop: horizontal sankey bar */}
      <div className="hidden md:block">
        <div className="flex h-[80px] rounded-[12px] overflow-hidden" style={{ background: 'rgba(0,0,0,0.03)' }}>
          {lanes.map((lane, i) => (
            <motion.div
              key={lane.key}
              initial={reduced ? false : { width: 0 }}
              animate={reduced ? { width: `${lane.pct}%` } : inView ? { width: `${lane.pct}%` } : { width: 0 }}
              transition={{ delay: reduced ? 0 : laneDelays[i], duration: laneDurations[i], ease: [0.22, 0.61, 0.36, 1] }}
              style={{ background: lane.fill, minWidth: lane.pct < 5 ? '48px' : 0 }}
              className="flex items-center px-3 overflow-hidden whitespace-nowrap"
            >
              <span className="text-[14px] font-bold text-black">{lane.pct}%</span>
            </motion.div>
          ))}
        </div>
        {/* Lane labels under the bar */}
        <div className="grid grid-cols-[83fr_14fr_3fr] gap-0 mt-3">
          {lanes.map((lane, i) => (
            <motion.div
              key={lane.key}
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? { opacity: 1 } : inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: reduced ? 0 : laneDelays[i] + laneDurations[i] + 0.15, duration: 0.4 }}
              className="pr-4 last:pr-0"
            >
              <div className="text-[14px] font-bold text-black leading-tight">{lane.label}</div>
              <div className="text-[13px] text-[rgba(0,0,0,0.60)] mt-0.5 leading-snug">{lane.detail}</div>
              <div className="flex items-baseline gap-2 mt-1.5 flex-wrap">
                <span className="text-[18px] font-display text-black">{lane.volume}</span>
                <span className="text-[13px] text-[rgba(0,0,0,0.50)]">{lane.rate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: 3 stacked bars, heights proportional */}
      <div className="md:hidden space-y-3">
        {lanes.map((lane, i) => (
          <motion.div
            key={lane.key}
            initial={reduced ? false : { opacity: 0, x: -20 }}
            animate={reduced ? { opacity: 1, x: 0 } : inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: reduced ? 0 : 0.2 + i * 0.15, duration: 0.4 }}
          >
            <div
              className="rounded-[8px] flex items-center justify-center px-3"
              style={{
                background: lane.fill,
                height: i === 0 ? 80 : i === 1 ? 40 : 20,
              }}
            >
              <span className="text-[14px] font-bold text-black">{lane.pct}%</span>
            </div>
            <div className="mt-2">
              <div className="text-[14px] font-bold text-black">{lane.label}</div>
              <div className="text-[13px] text-[rgba(0,0,0,0.60)]">{lane.detail}</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-[18px] font-display text-black">{lane.volume}</span>
                <span className="text-[13px] text-[rgba(0,0,0,0.50)]">{lane.rate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PipelineChip({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className="rounded-[12px] px-4 py-3 flex-1 min-w-0"
      style={{
        background: highlight ? 'rgba(91,118,254,0.08)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${highlight ? 'rgba(91,118,254,0.20)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <div className="micro-upper text-[11px] mb-1" style={{ color: 'rgba(0,0,0,0.50)' }}>{label}</div>
      <div className="text-[14px] font-bold text-black truncate">{value}</div>
    </div>
  );
}
```

**Step 3: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0.

**Step 4: Visually verify layout and motion**

Scroll to the section fresh. Expected:
- 4 metric cards on top (unchanged)
- "Monday backlog · 14,200 vouchers" / "Cleared by 10:42 AM" row
- Sankey bar: 83% blue-light + 14% blue-medium + 3% blue-dark, each segment shows its % inside
- Below the bar: 3 columns of label + detail + volume + rate, proportionally aligned to the bar
- QUEUE → ROUTER → POSTED TO SAP chip row
- Timeline progress bar at the bottom

Motion: on enter, segments grow sequentially (83% first, then 14%, then 3%). Lane labels fade in after each segment settles.

Mobile (375px): the 3 sankey segments should stack vertically with proportional heights (80 / 40 / 20 px).

Capture `/tmp/platform-after/scale-layout.png`.

**Step 5: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
refactor(platform): scale-at-volume SVG → CSS sankey

Replaces the router-fanout SVG (queue → router → 3 lanes → SAP) with
a CSS sankey bar. Widths encode 83% / 14% / 3% volume split; below-bar
label columns show lane names, volumes, and cost/doc at 13–18px.
QUEUE → ROUTER → SAP becomes 3 PipelineChips with lucide chevrons.
Mobile fallback: 3 stacked bars with proportional heights. Sequential
width-growth animation on scroll-in, useReducedMotion static fallback.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Final verification pass

**Files:**
- Read-only: `src/components/PlatformStory.tsx`

**Step 1: Full build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0. Zero TypeScript errors. Zero Vite warnings. If any warnings appear, read them — they may indicate dead code or type narrowing issues to fix.

**Step 2: Screenshot the 3 sections at 4 breakpoints**

Load `http://localhost:5173/platform` and capture each of the 3 target sections at:
- 1440px viewport (desktop)
- 1024px viewport (tablet)
- 768px viewport (small tablet)
- 375px viewport (mobile)

Save to `/tmp/platform-after/` with names: `{section}-{width}.png`. Visual-compare each against the corresponding `/tmp/platform-before/` screenshot. Confirm:
- All text in the new versions is readable without zooming
- Layouts don't overlap or wrap weirdly at any breakpoint
- Motion animations complete in all 3 sections on scroll-in

**Step 3: Verify reducedMotion fallback**

In DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → select `reduce`. Reload `http://localhost:5173/platform`. Scroll through the 3 sections. Confirm:
- HallucinationControl: all 6 cards show blue ring from the start, no sequential traversal
- DeterminismProof: all 4 RunCards visible immediately, no slide-in, hash connector line drawn statically
- ScaleAtVolume: all 3 sankey segments at full width from the start, labels visible, no growth animation

**Step 4: Verify WCAG AA contrast on tricky spots**

Open DevTools → Elements → pick these specific elements and check the Accessibility panel's contrast ratio:
- HallucinationControl wall 2 score bars: `72%` text on its background
- DeterminismProof pinning layer code block: monospace text on `rgba(0,0,0,0.04)` background
- DeterminismProof `✓ identical` badge: green text on `rgba(42,143,92,0.10)` background — this is the tightest one
- ScaleAtVolume sankey 3% segment: `3%` label inside `rgba(91,118,254,0.70)` fill

All must be ≥4.5:1. If `✓ identical` fails, darken the green text to `#1f6b43` (still reads as success green) and re-verify.

**Step 5: Scroll cadence check**

Scroll from the top of `/platform` to the bottom at a normal reading pace. Confirm:
- Each of the 3 redesigned sections triggers its motion exactly once
- Scrolling back up doesn't re-trigger animations
- No jank or frame drops during any motion
- Total page feels cohesive, not like 3 different design eras

**Step 6: Final commit (if Step 4 required a color fix or any other polish)**

If any tweaks landed in Steps 4–5:

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/PlatformStory.tsx
git commit -m "$(cat <<'EOF'
polish(platform): SVG readability verification tweaks

Minor accessibility + cadence polish caught during final pass: [list
what specifically changed, e.g., "darken identical-badge green text
for WCAG AA contrast"]. No functional changes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

If no tweaks were needed, skip this step.

**Step 7: Clean up temporary screenshots**

```bash
rm -rf /tmp/platform-before /tmp/platform-after
```

**Step 8: Final state report**

Produce a short report of what shipped:
- 3 sections rewritten (HallucinationControl, DeterminismProof, ScaleAtVolume)
- N commits landed (expected: 6 — one layout + one motion per section, possibly +1 polish)
- Text size floor confirmed: all rendered text ≥13px at 1440px
- reducedMotion fallback: verified working on all 3 sections
- WCAG AA: verified on all tricky contrast spots
- Zero new files. Zero new dependencies. Zero exports changed.

---

## Summary

| Task | What ships | Commit count |
|------|-----------|--------------|
| 1 | Baseline capture | 0 |
| 2 | HallucinationControl layout (SVG → HTML) | 1 |
| 3 | HallucinationControl dot-traversal motion | 1 |
| 4 | DeterminismProof layout (SVG → 3-act HTML) | 1 |
| 5 | DeterminismProof stamping motion + connector | 1 |
| 6 | ScaleAtVolume layout (SVG → CSS sankey) | 1 |
| 7 | Final verification + optional polish | 0–1 |

**Total: 6–7 commits on main.**

## Non-goals (YAGNI guard — do not do any of these)

- No Lenis, SplitText, or any scroll-scrub library (Phase 2)
- No changes to `PlatformPage.tsx` — the 3 components keep their current zero-prop API
- No changes to `AgentFamilies`, `ContextMatters`, or the shared `<style>` block at the top of `PlatformStory.tsx`
- No copy/headline edits — body text and headings stay exactly as-is
- No new files (no `HallucinationControl.tsx` extraction) — keep everything in `PlatformStory.tsx` to match the existing file layout
- No new npm deps
- No unit tests — visual regression via screenshots is the right test for this scope

## If something goes wrong

- **Build fails after a task:** revert that task's commit with `git revert HEAD` and re-read the task spec carefully
- **Motion feels wrong:** check `useReducedMotion()` return value in DevTools console; if fallback works and normal mode doesn't, the timing/delay values are the issue
- **Text still too small on some device:** measure with DevTools Computed panel, not CSS inspector — `text-[13px]` compiles correctly but parent `font-size` inheritance can surprise you
- **Any section's export signature changed:** STOP. The plan requires zero prop changes. Revert and re-read the task.
