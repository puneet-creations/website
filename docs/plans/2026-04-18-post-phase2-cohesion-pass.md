# Post-Phase-2 Cohesion Pass Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close the visual-consistency gap Phase 2 opened — flip the dark footer orb to white, redesign `ContextKing` + `GTMPath` to the dark-cinematic language, tighten the footer's right column, add a new compliance strip linking to `/security#compliance`, polish `AgentFamilies` + `FlowDiagram` on `/platform`, and audit/add the anchor ids the footer + SiteNav link to.

**Architecture:** 8 tasks across 4 phases (quick wins → landing dark cards → footer redesign → /platform polish → verification). Each task atomic and independently revertible. Zero new npm deps; one new data module (`src/data/compliance.ts`) to dedupe the compliance list between `SecurityPage` + footer. All visual tokens inline per Phase 2 pattern.

**Tech Stack:** Existing React 19 + TypeScript + Vite + Tailwind + framer-motion + lucide-react + react-router-dom. No new tools.

**Design doc:** `docs/plans/2026-04-18-post-phase2-cohesion-pass-design.md` (commit `93ef851`)

---

## Pre-flight: What you need to know

Before starting, read:
- `docs/plans/2026-04-18-post-phase2-cohesion-pass-design.md` — the 4-section design
- `src/components/landing/AgentPlatformStack.tsx` — the Phase 2 centerpiece that defines the dark-cinematic language we're matching
- `src/components/CinematicFooter.tsx` — the footer you'll be editing in Phase A + C
- `src/components/landing/ContextKing.tsx` — the landing card to rewrite in Phase B
- `src/components/GTMPath.tsx` — the landing card to rewrite in Phase B
- `src/pages/SecurityPage.tsx` — contains `COMPLIANCE = ['GDPR', 'HIPAA', 'SOC 2 Type II', 'ISO 27001', 'PCI DSS', 'Air-gapped']` at line 18; compliance section at line 114 needs `id="compliance"` added

**Conventions to match (from Phase 2's `AgentPlatformStack`):**
- Dark bg: `#0a0e18` (sections) or `#060a12` (footer)
- Teal accent: `#8af5c0` (active elements, eyebrows, links)
- Teal dim bg: `rgba(138,245,192,0.12)`
- Dark border: `1px solid rgba(255,255,255,0.08)`
- Text: `rgba(255,255,255,0.95)` primary / `0.65` body / `0.40` meta
- Eyebrows: `var(--mono)` 12px uppercase `letter-spacing: 0.12em`
- Headlines: `var(--serif)` with `<em>` italic accents, weight 500, `letter-spacing: -0.02em`
- Body: `var(--body)`

**Branch:** `main`. User approved main-with-atomic-commits throughout this session.

---

# Phase A — Quick wins

## Task 1: Orb color swap

**Files:** Modify `src/components/CinematicFooter.tsx` — the `HeroOrb` props block only

**Step 1: Find the `HeroOrb` usage.** Search the file for `<HeroOrb` (currently around lines 162-169). It looks like:

```tsx
<HeroOrb
  baseColor="#1a1a1a"
  attenuationColor="#000000"
  envColor="#666666"
  attenuationDistance={0.6}
  breatheAmp={0.12}
  floatAmp={0.22}
/>
```

**Step 2: Swap the 3 color props** (keep the other 3 untouched):

```tsx
<HeroOrb
  baseColor="#ffffff"
  attenuationColor="#e8e8e8"
  envColor="#f5f5f5"
  attenuationDistance={0.6}
  breatheAmp={0.12}
  floatAmp={0.22}
/>
```

**Step 3: Verify build**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build
```

Expected: exits 0, no new warnings.

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/CinematicFooter.tsx
git commit -m "$(cat <<'EOF'
polish(footer): flip HeroOrb to white for contrast on motion video

The dark orb (#1a1a1a) disappeared into the new dark-particles-drift
video backdrop (commit 612660e). Flipping baseColor to #ffffff with
slightly-off-white attenuation (#e8e8e8) and env (#f5f5f5) restores
contrast while preserving glass refraction depth.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Anchor ids — audit + add

**Files:**
- Modify: `src/pages/SecurityPage.tsx` (add `id="compliance"`)
- Possibly modify: `src/components/PlatformStack.tsx`, `src/pages/PricingPage.tsx`, `src/pages/SolutionsPage.tsx`, landing sections — only if a needed anchor is missing

**Step 1: Verify which anchors already exist**

```bash
cd /Users/puneet/website-attentions-miro/app
grep -rn 'id="layers"\|id="compliance"\|id="pilot"\|id="ownership"\|id="finance-logistics"\|id="healthcare"\|id="manufacturing"' src/
```

Expected (as of design doc): `id="layers"` exists in `PlatformStack.tsx` — verified. The other 5 need verification or addition.

Expected NOT to find: `id="compliance"` (confirmed in design doc — SecurityPage line 114 has no id).

**Step 2: Add `id="compliance"` to SecurityPage compliance section**

`src/pages/SecurityPage.tsx` line 114 currently:

```tsx
<section className="max-w-[900px] mx-auto px-6 text-center">
  <div className="micro-upper text-[rgba(0,0,0,0.65)] mb-5">Compliance</div>
```

Change to:

```tsx
<section id="compliance" className="max-w-[900px] mx-auto px-6 text-center">
  <div className="micro-upper text-[rgba(0,0,0,0.65)] mb-5">Compliance</div>
```

**Step 3: Verify `#pilot` on PricingPage**

```bash
grep -n 'id="pilot"' src/pages/PricingPage.tsx
```

If missing: read `PricingPage.tsx`, find the section that represents the 4-week pilot engagement, and add `id="pilot"` to its outermost element. If the page doesn't have a distinct "pilot" section (just a pricing grid), pick the first pricing tier that maps to "pilot" and add the id there. If no mapping is obvious, flag and change the footer / AgentPlatformStack link targets to `/pricing` (no hash).

**Step 4: Verify `#ownership` on landing**

Footer link `/#ownership` targets a section on `/`. Search:

```bash
grep -rn 'id="ownership"' src/components/landing/ src/pages/LandingPage.tsx
```

If missing: the footer link is broken. Options:
- Find a landing section that talks about IP / ownership (likely `IsThisYou` or `LandingCloser`) and add `id="ownership"` there
- If no such section exists, remove the `#ownership` hash from the footer link (change `/` or point elsewhere)

Pick the simpler path: if `IsThisYou` or `LandingCloser` has ownership content, add the id there. Otherwise change footer `proof` link from `/#ownership` to just `/solutions` or `/platform` that already exists.

**Step 5: Verify solution-industry anchors**

```bash
grep -n 'id="finance-logistics"\|id="healthcare"\|id="manufacturing"' src/components/solutions/ src/pages/SolutionsPage.tsx
```

`IndustryAnchorSection` likely emits `id={industry.id}` on each section. If industry.id values include `finance-logistics`, `healthcare`, `manufacturing` — ✓. If they're differently named, adjust the SiteNav dropdown link targets to match actual ids.

**Step 6: Verify build**

```bash
npm run build
```

**Step 7: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add -p  # interactive — only stage the id additions, nothing else
git commit -m "$(cat <<'EOF'
chore(anchors): audit + add missing link-target ids

- Adds id="compliance" to SecurityPage's compliance section so the
  upcoming footer compliance-strip "See security architecture" link
  lands at the right place
- [document any other ids added or any link-target fixes made]

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Fill the bracket with the actual audit outcome.

---

# Phase B — Landing dark-cinematic rewrites

## Task 3: `ContextKing` — dark rewrite

**Files:** Modify `src/components/landing/ContextKing.tsx`

**Step 1: Read current state.** The file is 189 lines, uses `WhiteCard` + `AccentStrip` primitives, compares Generic LLM vs artiGen+context with terminal-style code-diff blocks and 3 bullets per side. Two colored cards: red (`#d94a4a`) for bad, black for good.

**Step 2: Replace the entire file** with this dark-cinematic rewrite:

```tsx
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * ContextKing — dark-cinematic comparison (post-Phase-2 cohesion pass).
 * Generic LLM vs artiGen+context, code-diff blocks + 3 bullets each.
 * Matches AgentPlatformStack's palette: #0a0e18 bg, teal accents, serif
 * italic headlines.
 */

const BAD_BULLETS = [
  'Guesses vendor names, fabricates GL codes',
  'No tolerance rules, no approval ladder',
  'No audit trail — undefendable',
];

const GOOD_BULLETS = [
  'Your masters, your taxonomy, your rules',
  'Every field traceable to a source chunk',
  'Full audit trail — reversible, defensible',
];

const RED = '#ff7a7a'; // brighter red for dark bg (vs light-bg #d94a4a)
const TEAL = '#8af5c0';

export default function ContextKing() {
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0a0e18', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      {/* Subtle teal radial pulse + dot grid, matching AgentPlatformStack */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(138,245,192,0.04), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-[760px] mx-auto"
        >
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: TEAL,
            }}
          >
            The question buyers ask
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            An agent without your context{' '}
            <span style={{ fontStyle: 'italic' }}>is not production software.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left — Generic LLM (red accent) */}
          <motion.article
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-[20px] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,122,122,0.20)',
              borderTop: `3px solid ${RED}`,
            }}
          >
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: RED,
                }}
              >
                Generic LLM
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.95)',
                }}
              >
                The demo that{' '}
                <span style={{ fontStyle: 'italic' }}>dies in UAT.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    vendor: <span style={{ color: 'rgba(255,255,255,0.95)' }}>&ldquo;Global Logistics Inc.&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; wrong</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    gl: <span style={{ color: 'rgba(255,255,255,0.95)' }}>&ldquo;AP 2000&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; guessed</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    approver: <span style={{ color: 'rgba(255,255,255,0.95)' }}>&ldquo;system admin&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; invented</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {BAD_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: RED }}
                    >
                      <X size={14} style={{ color: '#0a0e18' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          {/* Right — artiGen + context (teal accent) */}
          <motion.article
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-[20px] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(138,245,192,0.25)',
              borderTop: `3px solid ${TEAL}`,
            }}
          >
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: TEAL,
                }}
              >
                artiGen + context
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.95)',
                }}
              >
                The agent that{' '}
                <span style={{ fontStyle: 'italic' }}>actually ships.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    vendor: <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>Global Logistics LLC</span>
                    <span className="ml-2" style={{ color: TEAL }}>V-472 ✓</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    gl: <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>Freight · 6100-2340</span>
                    <span className="ml-2" style={{ color: TEAL }}>cited ✓</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.70)' }}>
                    approver: <span style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>CFO · Named</span>
                    <span className="ml-2" style={{ color: TEAL }}>audit ✓</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {GOOD_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: TEAL }}
                    >
                      <Check size={14} style={{ color: '#0a0e18' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Verify build + lint**

```bash
cd /Users/puneet/website-attentions-miro/app
npm run build && npm run lint
```

Both must exit 0.

**Step 4: Commit**

```bash
git add src/components/landing/ContextKing.tsx
git commit -m "$(cat <<'EOF'
refactor(landing): ContextKing → dark-cinematic

Matches the AgentPlatformStack palette (#0a0e18 bg, teal accents,
serif italic headlines) so the landing page's middle stretch reads
as one cohesive dark section instead of a dark/light/dark sandwich.

Drops WhiteCard + AccentStrip primitives for inline dark-tinted cards
with red-dim (left) + teal-dim (right) top accents. Text colors bumped
to white variants with matching contrast. Code-diff blocks, bullet
lists, and copy all unchanged.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: `GTMPath` — dark rewrite

**Files:** Modify `src/components/GTMPath.tsx`

**Step 1: Read current state.** 139 lines, 3 step cards (Assessment / Pilot / Platform), uses `WhiteCard` + `AccentStrip`, slate (`#475569`) accent color, dashed connector line between steps.

**Step 2: Replace entire file:**

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const TEAL = '#8af5c0';

const STEPS = [
  {
    num: '01',
    week: 'Weeks 1-2',
    name: 'Assessment',
    body: 'One senior expert maps your workflows, scores them by AI leverage, and returns with a pilot spec.',
    effort: '2-week engagement',
  },
  {
    num: '02',
    week: 'Weeks 3-6',
    name: 'Pilot',
    body: 'We ship one agent into production on your hardware. Real document, real workflow, real users.',
    effort: '4-week deployment',
  },
  {
    num: '03',
    week: 'Month 2+',
    name: 'Platform',
    body: 'The agent you shipped becomes the first node on the shared base. New agents reuse every layer.',
    effort: 'Ongoing ownership',
  },
];

/**
 * GTMPath — 3-step customer journey (Assessment → Pilot → Platform).
 * Dark-cinematic palette matches ContextKing + AgentPlatformStack.
 */
export default function GTMPath() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#0a0e18', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      {/* Subtle backdrop matching ContextKing */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-[760px] mx-auto"
        >
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: TEAL,
            }}
          >
            The engagement path
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            Three steps from curious{' '}
            <span style={{ fontStyle: 'italic' }}>to live in production.</span>
          </h2>
          <p
            className="mt-4 text-[18px]"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}
          >
            No surprises. No rewrites.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Teal dashed connector on desktop */}
          <div
            className="hidden md:block absolute left-[16%] right-[16%] top-[96px] h-[1px] pointer-events-none"
            style={{ borderTop: `1px dashed ${TEAL}30` }}
          />

          {STEPS.map((s, idx) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
              className="relative rounded-[20px] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `3px solid ${TEAL}`,
              }}
            >
              <div className="p-8 md:p-10 flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(138,245,192,0.12)',
                      color: TEAL,
                      fontFamily: 'var(--mono)',
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="ml-2"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.50)',
                    }}
                  >
                    {s.week}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(28px, 2.8vw, 36px)',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'rgba(255,255,255,0.95)',
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {s.body}
                </p>
                <span
                  className="rounded-full self-start mt-2 px-3 py-1 text-[12px] font-semibold"
                  style={{
                    background: 'rgba(138,245,192,0.08)',
                    color: TEAL,
                    border: `1px solid ${TEAL}25`,
                    fontFamily: 'var(--mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {s.effort}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Verify build + lint**

```bash
npm run build && npm run lint
```

**Step 4: Commit**

```bash
git add src/components/GTMPath.tsx
git commit -m "$(cat <<'EOF'
refactor(landing): GTMPath → dark-cinematic

Matches ContextKing + AgentPlatformStack palette. 3 step cards become
dark-tinted with teal top accent strip, teal number badges, teal effort
chips. Dashed connector line between desktop steps is teal-dim.

Landing middle stretch is now AgentPlatformStack → ContextKing → GTMPath,
all on #0a0e18 — one cohesive dark run instead of the prior
dark/light/light/dark sandwich.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

# Phase C — Footer redesign

## Task 5: Footer right column — redesign

**Files:** Modify `src/components/CinematicFooter.tsx` — only the right-column block inside the 2-col grid

**Step 1: Locate the block.** In `CinematicFooter.tsx`, find the `<div className="text-center md:text-left">` (currently around line 175) that contains the H2 headline, the 3 value callouts with orb badges, the italic tagline, the CTA, and the email line.

**Step 2: Replace the block** with this denser version:

```tsx
            {/* Headline + 3-pill row + tagline + CTA + email */}
            <div className="text-center md:text-left">
              {/* Eyebrow */}
              <div
                className="mb-4"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#8af5c0',
                }}
              >
                Founder first
              </div>
              <h2
                ref={headingRef}
                className="mb-6"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(36px, 5.5vw, 72px)',
                  fontWeight: 500,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                }}
              >
                Sovereign AI and production agents on the{' '}
                <span style={{ fontStyle: 'italic' }}>artiGen Platform.</span>
              </h2>

              {/* 3-pill row (replaces the 3 orb-badge callouts) */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                {[
                  'Secure by architecture',
                  'Fixed low cost',
                  'ROI in weeks',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 rounded-full text-[13px] font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: "'Noto Sans', sans-serif",
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <p
                className="mb-8 max-w-[500px] mx-auto md:mx-0 italic"
                style={{ fontSize: 15, color: 'rgba(255,255,255,0.50)', fontFamily: "'Fraunces', serif" }}
              >
                Don&rsquo;t hand your IP to public AI.
              </p>
              <motion.a
                href="mailto:hello@attentions.ai?subject=Founder%20Call"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full"
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Book a founder call <span>→</span>
              </motion.a>
              <div
                className="mt-5 text-[13px]"
                style={{ color: 'rgba(255,255,255,0.50)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                hello@attentions.ai · Response within 4 business hours
              </div>
            </div>
```

**What changed:**
- Removed the 3 `.map()`-driven callout rows with white-glass orb badges
- Added a `FOUNDER FIRST` teal eyebrow at the top
- 3 callouts compressed to title-only pills in one horizontal wrap-row
- Everything else (headline, tagline, CTA, email line) unchanged

**Step 3: Verify build + visual**

```bash
npm run build
npm run dev
```

Scroll to footer. Expected: orb on left is white (Task 1 landed), right column is denser with eyebrow + headline + pill row + tagline + CTA + email. No longer visually chaotic over the video.

**Step 4: Commit**

```bash
git add src/components/CinematicFooter.tsx
git commit -m "$(cat <<'EOF'
refactor(footer): compress right column — drop orb badges, add pill row

Dropped the 3 white-glass orb badges (48×48 radial gradients) from the
value callouts — they were competing with the 3D HeroOrb centerpiece
on the left. The 3 callouts collapse to title-only pills in one
horizontal wrap-row. Added a teal 'FOUNDER FIRST' eyebrow above the
headline to anchor the section in Phase 2's dark-cinematic language.

Net: 6 stacked text blocks → 5 tighter ones with clearer hierarchy.
Headline, tagline, CTA, email row all unchanged in copy and position.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Compliance strip + data extraction

**Files:**
- Create: `src/data/compliance.ts`
- Modify: `src/pages/SecurityPage.tsx` (import from new module, remove inline constant)
- Modify: `src/components/CinematicFooter.tsx` (add new compliance strip section)

**Step 1: Create `src/data/compliance.ts`**

```ts
// src/data/compliance.ts
// Shared compliance certifications list. Used by SecurityPage's
// compliance band and CinematicFooter's compliance strip.

export const COMPLIANCE = [
  'GDPR',
  'HIPAA',
  'SOC 2 Type II',
  'ISO 27001',
  'PCI DSS',
  'Air-gapped',
] as const;

export type Compliance = typeof COMPLIANCE[number];
```

**Step 2: Update `src/pages/SecurityPage.tsx`** to import from the new module instead of the inline `const COMPLIANCE = [...]`.

Find line 18:

```tsx
const COMPLIANCE = ['GDPR', 'HIPAA', 'SOC 2 Type II', 'ISO 27001', 'PCI DSS', 'Air-gapped'];
```

Delete it. Add an import at the top (after the existing imports):

```tsx
import { COMPLIANCE } from '../data/compliance';
```

**Step 3: Add compliance strip to `CinematicFooter.tsx`**

Find the existing border-t block that wraps the 5-column link grid (around line 269-277). Just BEFORE that block, insert this new section:

```tsx
        {/* Compliance strip — certifications + link to /security#compliance */}
        <div
          className="relative z-10 border-t px-6 py-10"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="max-w-[1200px] mx-auto text-center">
            <div
              className="mb-5"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8af5c0',
              }}
            >
              Certified &amp; audited
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {COMPLIANCE.map((c) => (
                <span
                  key={c}
                  className="px-5 py-2.5 rounded-full text-[13px] font-semibold"
                  style={{
                    background: 'rgba(138,245,192,0.08)',
                    border: '1px solid rgba(138,245,192,0.20)',
                    color: '#8af5c0',
                    fontFamily: "'Noto Sans', sans-serif",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <Link
              to="/security#compliance"
              className="inline-flex items-center gap-1.5 mt-6 text-[13px] transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              See security architecture →
            </Link>
          </div>
        </div>
```

**Step 4: Add the import** to `CinematicFooter.tsx` (top of the file):

```tsx
import { COMPLIANCE } from '../data/compliance';
```

**Step 5: Verify build + visual**

```bash
npm run build && npm run dev
```

Scroll to footer → new strip appears between main content and link grid. Click "See security architecture" → navigates to `/security#compliance` → lands at the compliance band (requires Task 2's `id="compliance"` to be landed).

**Step 6: Commit**

```bash
git add src/data/compliance.ts src/components/CinematicFooter.tsx src/pages/SecurityPage.tsx
git commit -m "$(cat <<'EOF'
feat(footer): add certification + compliance strip

New section between main content and 5-column link grid. Shows 6
compliance badges (GDPR / HIPAA / SOC 2 / ISO 27001 / PCI DSS / Air-gapped)
as teal-tinted pills with a 'See security architecture →' link that
routes to /security#compliance.

Extracts the COMPLIANCE constant to src/data/compliance.ts so the
footer strip and SecurityPage's compliance band share one source
of truth. Deletes the inline constant on SecurityPage in favor of
the new module.

Requires /security#compliance anchor (landed earlier in Task 2).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

# Phase D — /platform polish

## Task 7: `AgentFamilies` tighten + `FlowDiagram` polish

**Files:**
- Modify: `src/components/PlatformStory.tsx` — the `AgentFamilies` function only
- Modify: `src/components/FlowDiagram.tsx` — tiny corner-radius bump

### 7A — AgentFamilies tighten

**Step 1: Locate `AgentFamilies`.** In `PlatformStory.tsx`, find `export function AgentFamilies()` (around line 56). It has 3 agent-family cards (Document / Voice / Multimodal).

**Step 2: Reduce card internal padding.** Find each card's outer div that uses `p-10`, change to `p-8`. Typical line:

```tsx
className={`rounded-[24px] p-10 sr ${inView ? 'is-in' : ''}`}
```

Change to:

```tsx
className={`rounded-[24px] p-8 sr ${inView ? 'is-in' : ''}`}
```

Three instances (one per family).

**Step 3: Sharpen SVG stroke widths.** In the Document / Voice / Multimodal card SVG visuals, find `strokeWidth="1.2"` occurrences and bump to `strokeWidth="1.5"` for better retina clarity. Apply to the lighter-stroke decorative lines, NOT to primary structural strokes (keep those as-is).

`grep -n 'strokeWidth="1.2"' src/components/PlatformStory.tsx` — find ones inside `AgentFamilies` only.

**Step 4: Unify inter-card spacing.** Confirm the outer grid has `gap-6` (already likely). No change if already consistent.

### 7B — FlowDiagram polish

**Step 5: Corner radius bump.** In `src/components/FlowDiagram.tsx`, find `borderRadius: 24` and change to `borderRadius: 28`.

**Step 6: Visual pass.** `npm run dev` → navigate to `/platform` → scroll to FlowDiagram → verify arrows render crisply at 100%/125%/150% browser zoom. If they look fine at default, no further changes needed.

**Step 7: Verify build + lint**

```bash
npm run build && npm run lint
```

**Step 8: Commit**

```bash
git add src/components/PlatformStory.tsx src/components/FlowDiagram.tsx
git commit -m "$(cat <<'EOF'
polish(platform): tighten AgentFamilies + bump FlowDiagram radius

AgentFamilies: card internal padding p-10 → p-8 (denser, less airspace
waste); SVG decorative stroke widths 1.2 → 1.5 for better retina clarity.
Palette unchanged — /platform is a light-themed page end-to-end, dark
treatment would break the rhythm.

FlowDiagram: card corner radius 24 → 28 to match newer WhiteCard token.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

If Step 6 shows nothing needs changing in FlowDiagram beyond the radius, this is a single commit. If the SVG needs crispness work, that can still go in the same commit as the radius bump.

---

# Phase E — Final verification

## Task 8: Cross-page QA (no commit)

**Files:** none

### Step 1: Desktop sanity pass

`npm run dev`. Load each of these routes at 1440×900 viewport:

- `/` — scroll through: Hero → ClientsStrip → IsThisYou → AgentPlatformStack (dark) → **ContextKing (now dark)** → **GTMPath (now dark)** → LandingCloser → **Footer (white orb + compressed right column + compliance strip)**. Confirm the 3 dark mid-page sections read as one coherent stretch.
- `/platform` — scroll through: PageHero → PlatformWhySection → ParallaxHero → PlatformStack → ParallaxHero → HallucinationControl → DeterminismProof → ScaleAtVolume → ParallaxHero → **AgentFamilies (tightened)** → **FlowDiagram (polished)** → closer. Light palette throughout; no sections feel out of place.
- `/security` — scroll to the Compliance band at bottom → confirm `id="compliance"` is on it (inspect via DevTools). Click footer's "See security architecture →" link and confirm it jumps smoothly here.

### Step 2: Link audit — every footer link + new compliance link

Click every footer link in order. Each should route correctly:
- Product section: Platform, Six shared layers (`/platform#layers`), Agent pattern, Pricing
- Solutions section: Document agents, Voice agents, Multimodal agents, Why generic fails, IP & ownership (`/#ownership`)
- Proof section: Solutions, Competitors, Live production (`/agents#production`), Why generic fails
- Company section: About, Contact, FAQ, Security & compliance
- Connect section: email, LinkedIn (placeholder), Privacy / Terms (placeholders, expected `#`)

Flag any link that lands on a blank area or 404.

Also: click the NEW compliance strip "See security architecture →" link. Should smooth-scroll to the compliance band on /security.

### Step 3: Mobile sanity pass

DevTools device toolbar → iPhone 15 Pro (390×844). Load `/` and `/platform`, scroll through. Verify no layout breakage on the redesigned sections.

### Step 4: Reduced-motion pass

DevTools → Rendering → `prefers-reduced-motion: reduce`. Reload `/`. Scroll through. Expected: AgentPlatformStack, ContextKing, GTMPath, footer — all render their static states (no framer-motion entry animations, no video autoplay, etc.). Content all legible.

### Step 5: Build + lint one more time

```bash
npm run build && npm run lint
```

Both must pass. No new warnings.

### Step 6: Report

Produce a short ship-readiness report:
1. All 7 commits landed cleanly on `main`
2. Landing middle stretch reads as cohesive dark block
3. /platform stays light-themed, AgentFamilies + FlowDiagram polished
4. Footer orb white, right column compressed, compliance strip added
5. All footer links route correctly
6. Reduced-motion + mobile + build + lint all pass
7. Any observations about performance or aesthetics worth flagging

If any must-fix defects surface, STOP and flag rather than fixing ad-hoc.

---

## Summary

| Task | Phase | Ships | Commits |
|------|-------|-------|---------|
| 1 | A | Footer orb → white | 1 |
| 2 | A | Anchor audit + adds (compliance + others as needed) | 1 |
| 3 | B | ContextKing → dark-cinematic | 1 |
| 4 | B | GTMPath → dark-cinematic | 1 |
| 5 | C | Footer right column redesign | 1 |
| 6 | C | New compliance strip + data extraction | 1 |
| 7 | D | AgentFamilies tighten + FlowDiagram polish | 1 |
| 8 | E | Cross-page QA | 0 |

**Total: 7 commits.**

**Files affected:**
- Create: `src/data/compliance.ts`
- Modify: `src/components/CinematicFooter.tsx` (Tasks 1, 5, 6)
- Modify: `src/components/landing/ContextKing.tsx`
- Modify: `src/components/GTMPath.tsx`
- Modify: `src/components/PlatformStory.tsx` (AgentFamilies only)
- Modify: `src/components/FlowDiagram.tsx`
- Modify: `src/pages/SecurityPage.tsx` (id + import swap)
- Plus small `id="..."` additions in 0-4 more files based on Task 2's audit results

**No new npm deps. No regressions to Phase 2 work. All commits atomic and independently revertible.**

## Non-goals (YAGNI guard)

- No SiteNav dropdown hash-anchoring rewrite (separate future pass)
- No legal pages (`/privacy`, `/terms`) — footer `#` placeholders stay
- No external LinkedIn URL update
- No `/platform` palette change (AgentFamilies / FlowDiagram keep their light pastels)
- No AgentPlatformStack industry-tile clickability
- No new CSS custom properties — inline values per Phase 2 pattern
- No copy rewrites on any card — only palette + layout polish

## If something goes wrong

- **Build fails after Task N:** `git revert HEAD` to undo, re-read spec, retry
- **Visual regression on /platform after Task 7:** revert just that commit; AgentFamilies + FlowDiagram can stay as-is if the polish introduces issues
- **Compliance strip alignment issue:** Task 6 is revertible; the data module stays (harmless) but the footer reverts
- **Missing anchor target surfaced during Task 8:** flag and either add the anchor or change the calling link

## Rollback

Each commit is atomic. Full rollback: `git revert <task7>..<task1>` in reverse order. Phase-level rollback: revert just the commits in that phase.
