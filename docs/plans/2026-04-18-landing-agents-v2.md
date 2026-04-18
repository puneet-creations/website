# Landing + Agents v2 Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply full v2 rhythm to the Landing page (10 → 9 sections, 4 orbs → 1, rewrite 2 legacy components + create a new brand-neutral LandingCloser) and fix the 1 remaining legacy component on Agents (`PlatformFlow` emoji-icon swap).

**Architecture:** 8 Landing-side changes (1 hero CTA edit, 1 minor modernization, 2 full rewrites, 1 new component, 1 page composition change, 2 file deletions) + 1 Agents-side modernization. All new card shells use the `whiteCardStyle` + `AccentStrip` primitive already shipped. Closer uses existing `HeroOrb` with a new brand-neutral black-glass palette.

**Tech Stack:** Vite + React 19 + TypeScript + Tailwind · `framer-motion` for entrance + MotionConfig · `lucide-react` for icons · Three.js (via lazy `HeroOrb`) for closer orb · existing utilities (`whiteCardStyle`, `AccentStrip`, `.micro-upper`, `.capsule-light`, `.cf-grid`) · existing CSS vars (`--serif`, `--mono`, `--bg-s2`, `--bg-s4`, `--bg-s5`).

**Design doc:** `docs/plans/2026-04-18-landing-agents-v2-design.md`

---

## Pre-implementation checklist

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
# Expected: "✓ built in ..." zero errors

git log --oneline -3
# Expected HEAD: 239a198 docs(landing+agents): add v2 redesign review + design doc
```

---

## Task 1: HeroAboveFold — drop `$5K` from CTA

**File:**
- Modify: `src/components/HeroAboveFold.tsx` (around lines 163-169)

**Step 1:** Read the current CTA block at lines 163-169. Apply two edits:

```diff
   <a
-    href="mailto:hello@attentions.ai?subject=$5K%20Assessment"
+    href="mailto:hello@attentions.ai?subject=Assessment"
     className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[14px] hover:scale-[1.02] active:scale-[0.98] transition-all"
     style={{ background: '#000000', color: '#ffffff', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}
   >
-    Get a $5K assessment →
+    Get an assessment →
   </a>
```

Nothing else changes.

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/HeroAboveFold.tsx
git commit -m "$(cat <<'EOF'
polish(landing): drop \$5K from HeroAboveFold CTA

Consistent with Pricing's no-fixed-numbers stance. Mailto subject
and button copy both sanitized. No other changes to hero.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: AgentFamilies — modernize (drop legacy classes, migrate to WhiteCard primitive)

**File:**
- Modify: `src/components/landing/AgentFamilies.tsx`

**Purpose:** Replace the `.sr d-1` + `display-` class-based entrance + inline card-shell style with v2 pattern (motion.div entrance + `whiteCardStyle`/`AccentStrip` primitive). Content untouched.

**Step 1:** Replace the entire contents of `src/components/landing/AgentFamilies.tsx` with:

```tsx
import { FileText, Mic, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { whiteCardStyle, AccentStrip } from '../common/whiteCard';

/**
 * AgentFamilies — 3 agent family cards (Document / Voice / Multimodal).
 * White cards with black top strip, Lucide icon square, Fraunces heading
 * with italic accent, checklist bullets, and a proof capsule chip.
 * Middle card animates in first from below, then sides slide in.
 */

const families = [
  {
    icon: FileText,
    label: 'Document Agents',
    title: 'Read anything.',
    titleAccent: 'Cite everything.',
    bullets: [
      'Cross-doc reconciliation (PO ↔ GRN ↔ Invoice)',
      'Field-level confidence + provenance citation',
      'Writes to SAP · Oracle · Dynamics · NetSuite',
    ],
    proof: 'Thomson Group · 18,000 vouchers/mo',
  },
  {
    icon: Mic,
    label: 'Voice Agents',
    title: 'Listen. Structure.',
    titleAccent: 'Route.',
    bullets: [
      'On-prem ASR (no audio leaves your VPC)',
      'Domain NER — dental · radiology · legal',
      'Writes to Dentrix · Epic · Salesforce',
    ],
    proof: 'Qira Labs · 2,400 consults/week',
  },
  {
    icon: Layers,
    label: 'Multimodal Agents',
    title: 'Docs + voice + images,',
    titleAccent: 'fused.',
    bullets: [
      'Vision + speech + text fused at runtime',
      'Cross-modal citations — "from the photo"',
      'Image forensics (stamps · signatures)',
    ],
    proof: 'Daimler Asia · warranty claims',
  },
];

export default function AgentFamilies() {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="families"
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(80px, 10vw, 140px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-[1320px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-[760px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
            Three families. One platform.
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 56px)',
              letterSpacing: '-0.025em',
              color: '#000000',
              lineHeight: 1.1,
            }}
          >
            Document, voice, multimodal.{' '}
            <span style={{ fontStyle: 'italic' }}>One platform underneath.</span>
          </h2>
        </motion.div>

        {/* 3 family cards — middle enters first from below */}
        <div className="grid md:grid-cols-3 gap-8">
          {families.map((f, i) => {
            const isMiddle = i === 1;
            const delay = isMiddle ? 0 : 0.45;
            const initialX = i === 0 ? -60 : i === 2 ? 60 : 0;
            const initialY = isMiddle ? 80 : 0;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: initialY, x: initialX }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 55, damping: 15, delay }}
                className="group"
              >
                <div
                  className="relative flex flex-col transition-shadow duration-300 hover:shadow-xl"
                  style={{ ...whiteCardStyle({ shadow: 'md' }), minHeight: 560 }}
                >
                  <AccentStrip color="#000000" thickness={4} />
                  <div className="p-10 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
                    >
                      <f.icon className="w-9 h-9" style={{ color: '#000000' }} strokeWidth={1.5} aria-hidden="true" />
                    </div>

                    {/* Label */}
                    <div
                      className="mb-3"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(0,0,0,0.50)',
                      }}
                    >
                      {f.label}
                    </div>

                    {/* Heading */}
                    <h3
                      className="mb-6"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(24px, 2.3vw, 30px)',
                        fontWeight: 600,
                        lineHeight: 1.15,
                        color: '#000000',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {f.title}{' '}
                      <span style={{ fontStyle: 'italic' }}>{f.titleAccent}</span>
                    </h3>

                    {/* Checklist */}
                    <ul className="space-y-3 mb-8 text-left">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[17px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
                          <span
                            aria-hidden="true"
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5"
                            style={{ background: '#000000' }}
                          >
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Proof capsule */}
                    <div
                      className="capsule-light self-start"
                      style={{ padding: '8px 16px', fontSize: 12 }}
                    >
                      {f.proof}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Key diffs:**
- Added `import { motion } from 'framer-motion'` (was already in import list).
- Added `import { whiteCardStyle, AccentStrip } from '../common/whiteCard';`.
- Section heading: swapped `<div className="sr ... is-in">` + `<h2 className="sr d-1 ...">` for a single `<motion.div initial animate>` wrapper — removes `.sr` / `display-` patterns.
- Section padding: swapped `py-28 px-6` for `padding: 'clamp(80px, 10vw, 140px) 24px'` consistent with v2 section pattern.
- Card outer style: swapped the explicit `{background, border, boxShadow, borderRadius, overflow}` object for `...whiteCardStyle({ shadow: 'md' }), minHeight: 560`.
- Top strip: replaced `<div className="h-1 w-full" style={{ background: '#000000' }} />` with `<AccentStrip color="#000000" thickness={4} />`.
- Added `aria-hidden="true"` on icons + bullet checkmarks.

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/landing/AgentFamilies.tsx
git commit -m "$(cat <<'EOF'
refactor(landing): modernize AgentFamilies to v2 pattern

Drops .sr d-1 + display-* entrance classes in favor of motion.div +
inline Fraunces typography (matches other v2 components). Migrates
card shell to whiteCardStyle + AccentStrip primitive (4px black top
strip, shadow 'md'). Content, per-card bullets, proof chips all
preserved verbatim.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: ContextKing — full rewrite (WhiteCard pattern, no orbs, Lucide X/Check)

**File:**
- Modify (full rewrite): `src/components/landing/ContextKing.tsx`

**Purpose:** Drop the 2 orbs. Replace with 2 WhiteCards side-by-side — left (red accent, "Generic LLM") and right (black accent, "artiGen + context"). Preserve the terminal-style code-diff block and 3-bullet contrast. Icons `✗` / `✓` become Lucide `X` / `Check` in colored circles.

**Step 1:** Replace the entire contents of `src/components/landing/ContextKing.tsx` with:

```tsx
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { whiteCardStyle, AccentStrip } from '../common/whiteCard';

/**
 * ContextKing — two WhiteCards comparing Generic LLM vs artiGen+context.
 * Terminal-style code-diff blocks and 3-bullet contrast per card.
 * No orbs (dropped from prior design to reduce landing-page orb count).
 */

const BAD_BULLETS = [
  'Guesses vendor names, fabricates GL codes',
  'No tolerance rules, no approval ladder',
  'No audit trail \u2014 undefendable',
];

const GOOD_BULLETS = [
  'Your masters, your taxonomy, your rules',
  'Every field traceable to a source chunk',
  'Full audit trail \u2014 reversible, defensible',
];

const RED = '#d94a4a';

export default function ContextKing() {
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s4)', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-[760px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The question buyers ask
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            An agent without your context{' '}
            <span style={{ fontStyle: 'italic' }}>is not production software.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT: Generic LLM (bad) */}
          <motion.article
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ ...whiteCardStyle({ shadow: 'md' }) }}
          >
            <AccentStrip color={RED} />
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div className="micro-upper" style={{ color: RED }}>
                Generic LLM
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                }}
              >
                The demo that{' '}
                <span style={{ fontStyle: 'italic' }}>dies in UAT.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    vendor: <span style={{ color: '#000000' }}>&ldquo;Global Logistics Inc.&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; wrong</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    gl: <span style={{ color: '#000000' }}>&ldquo;AP 2000&rdquo;</span>
                    <span className="ml-2" style={{ color: RED }}>&larr; guessed</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    approver: <span style={{ color: '#000000' }}>&ldquo;system admin&rdquo;</span>
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
                      <X size={14} style={{ color: '#ffffff' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          {/* RIGHT: artiGen + context (good) */}
          <motion.article
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ ...whiteCardStyle({ shadow: 'md' }) }}
          >
            <AccentStrip color="#000000" />
            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div className="micro-upper" style={{ color: '#000000' }}>
                artiGen + context
              </div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2vw, 28px)',
                  fontWeight: 500,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#000000',
                }}
              >
                The agent that{' '}
                <span style={{ fontStyle: 'italic' }}>actually ships.</span>
              </h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <div className="space-y-3" style={{ fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    vendor: <span style={{ color: '#000000', fontWeight: 500 }}>Global Logistics LLC</span>
                    <span className="ml-2" style={{ color: '#000000' }}>V-472 \u2713</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    gl: <span style={{ color: '#000000', fontWeight: 500 }}>Freight \u00b7 6100-2340</span>
                    <span className="ml-2" style={{ color: '#000000' }}>cited \u2713</span>
                  </div>
                  <div style={{ color: 'rgba(0,0,0,0.75)' }}>
                    approver: <span style={{ color: '#000000', fontWeight: 500 }}>CFO \u00b7 Named</span>
                    <span className="ml-2" style={{ color: '#000000' }}>audit \u2713</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3">
                {GOOD_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: '#000000' }}
                    >
                      <Check size={14} style={{ color: '#ffffff' }} strokeWidth={3} />
                    </span>
                    <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
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

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/landing/ContextKing.tsx
git commit -m "$(cat <<'EOF'
refactor(landing): rewrite ContextKing as 2 WhiteCards (no orbs)

Drops 2 orbs (part of landing-page orb-count reduction from 4 → 1).
2-card grid (md:grid-cols-2): Left card = Generic LLM (red accent,
"demo that dies in UAT"), right card = artiGen + context (black
accent, "agent that actually ships"). Terminal-style code-diff
blocks + 3-bullet contrast preserved verbatim. Lucide X/Check icons
replace unicode ✗/✓ in colored-circle bullet markers.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: GTMPath — full rewrite (3 WhiteCard steps, no station circles, no `$5K`)

**File:**
- Modify (full rewrite): `src/components/GTMPath.tsx`

**Step 1:** Replace the entire contents of `src/components/GTMPath.tsx` with:

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { whiteCardStyle, AccentStrip } from './common/whiteCard';

const SLATE = '#475569';

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
 * GTMPath — the 3-step customer journey.
 * Assessment → Pilot → Platform.
 * WhiteCard grid (no station circles). Effort-based chips (not dollar).
 */
export default function GTMPath() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s4)', padding: 'clamp(96px, 12vw, 160px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-[760px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The engagement path
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            Three steps from curious{' '}
            <span style={{ fontStyle: 'italic' }}>to live in production.</span>
          </h2>
          <p
            className="mt-4 text-[18px]"
            style={{ color: 'rgba(0,0,0,0.65)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}
          >
            No surprises. No rewrites.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-6">
          <div
            className="hidden md:block absolute left-[16%] right-[16%] top-[96px] h-[1px] pointer-events-none"
            style={{ borderTop: `1px dashed ${SLATE}40` }}
          />

          {STEPS.map((s, idx) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
              className="relative"
              style={{ ...whiteCardStyle({ shadow: 'md' }) }}
            >
              <AccentStrip color={SLATE} />
              <div className="p-8 md:p-10 flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span
                    style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: 28,
                      fontWeight: 600,
                      color: SLATE,
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="micro-upper" style={{ color: 'rgba(0,0,0,0.50)' }}>
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
                    color: '#000000',
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: 'rgba(0,0,0,0.70)' }}
                >
                  {s.body}
                </p>
                <span className="capsule-light rounded-full self-start mt-2">
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

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/GTMPath.tsx
git commit -m "$(cat <<'EOF'
refactor(landing): rewrite GTMPath as 3 WhiteCard steps (no $5K)

Drops the 240x240 station circles + dashed line + hardcoded \$5K
price chips. New 3-card grid (md:grid-cols-3) with slate accent top
strip, italic step number + week range label + italic Fraunces step
name + body + effort chip. Effort chips replace dollar figures —
"2-week engagement" / "4-week deployment" / "Ongoing ownership" —
consistent with Pricing's no-fixed-numbers stance. Dashed horizontal
connector line preserved on desktop only.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: LandingCloser — new component

**File:**
- Create: `src/components/landing/LandingCloser.tsx`

**Step 1:** Create `src/components/landing/LandingCloser.tsx` with the following exact content:

```tsx
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const HeroOrb = lazy(() => import('../HeroOrb'));

const OWNERSHIP_BULLETS = [
  {
    title: 'You own the weights.',
    body: 'The small language model trained on your data \u2014 yours forever, on your hardware.',
  },
  {
    title: 'You own the agent.',
    body: 'Code, connectors, prompts, policies \u2014 your IP, in your repo.',
  },
  {
    title: 'You own the proof.',
    body: 'Audit trail, evaluation harness, production runbook \u2014 all handed over.',
  },
];

/**
 * LandingCloser — landing page closing manifesto.
 * Black glass orb on the left, "Sovereign AI isn't borrowed. It's built."
 * manifesto on the right plus 3 ownership bullets absorbed from the
 * (now-dissolved) OwnershipBand. Brand-neutral palette distinct from
 * the 5 sub-page accents (blue / teal / amber / forest / slate).
 */
export default function LandingCloser() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(96px, 14vw, 160px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Black glass orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div
              className="relative"
              style={{
                width: 'clamp(280px, 32vw, 420px)',
                height: 'clamp(280px, 32vw, 420px)',
              }}
            >
              {inView && (
                <Suspense fallback={null}>
                  <HeroOrb
                    baseColor="#0a0a0a"
                    attenuationColor="#1a1a1a"
                    envColor="#3a3a3a"
                    attenuationDistance={0.9}
                    breatheAmp={0.14}
                    floatAmp={0.25}
                  />
                </Suspense>
              )}
            </div>
          </motion.div>

          {/* Manifesto + ownership bullets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div
              className="micro-upper mb-6"
              style={{ color: 'rgba(0,0,0,0.55)' }}
            >
              The thesis
            </div>
            <h2
              className="mb-8"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#000000',
              }}
            >
              Sovereign AI isn&rsquo;t borrowed.{' '}
              <span style={{ fontStyle: 'italic' }}>It&rsquo;s built.</span>
            </h2>
            <p
              className="max-w-[560px] mx-auto md:mx-0 mb-10"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              You rented your cloud for a decade. You won&rsquo;t rent your
              intelligence. The agents your regulator asks about &mdash; the
              ones that decide what gets posted to SAP, booked at 9 AM,
              approved by the CFO &mdash; belong inside your building.
            </p>

            {/* 3 ownership bullets */}
            <ul className="space-y-4 max-w-[560px] mx-auto md:mx-0 text-left">
              {OWNERSHIP_BULLETS.map((b) => (
                <li key={b.title} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: '#000000' }}
                  >
                    <Check size={14} style={{ color: '#ffffff' }} strokeWidth={3} />
                  </span>
                  <span className="text-[16px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.80)' }}>
                    <strong style={{ color: '#000000', fontWeight: 600 }}>{b.title}</strong>{' '}
                    <span style={{ color: 'rgba(0,0,0,0.65)' }}>{b.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/landing/LandingCloser.tsx
git commit -m "$(cat <<'EOF'
feat(landing): add LandingCloser with black glass orb + ownership bullets

Brand-neutral palette (#0a0a0a / #1a1a1a / #3a3a3a) distinct from all
5 sub-page orb accents. Two-column: orb left, THE THESIS manifesto +
3 ownership bullets right. Absorbs content from the (soon-to-be-
dissolved) OwnershipBand (IP column 3 bullets) and HowToStart (thesis
manifesto + supporting paragraph). Lazy-mounts orb on useInView.
No CTA (footer handles it).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Update LandingPage.tsx — swap OwnershipBand+HowToStart for LandingCloser

**File:**
- Modify: `src/pages/LandingPage.tsx`

**Step 1:** Replace the entire contents of `src/pages/LandingPage.tsx` with:

```tsx
import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import IsThisYou from '../components/IsThisYou';
import ParallaxHero from '../components/ParallaxHero';
import AgentFamilies from '../components/landing/AgentFamilies';
import ContextKing from '../components/landing/ContextKing';
import GTMPath from '../components/GTMPath';
import LandingCloser from '../components/landing/LandingCloser';

/**
 * LandingPage v4 — 9-section v2 rhythm.
 *
 * Story arc:
 *   Hero → ClientsStrip → IsThisYou → [parallax] → AgentFamilies →
 *   [parallax] → ContextKing → GTMPath → LandingCloser (black orb + thesis)
 *
 * Design: docs/plans/2026-04-18-landing-agents-v2-design.md
 */
export default function LandingPage() {
  return (
    <main>
      <HeroAboveFold />
      <ClientsStrip />
      <IsThisYou />
      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
        headline="Your data never leaves"
        headlineAccent="your building."
        subline="On-prem by architecture, not by contract. Air-gapped deployment available on request."
        label="Sovereign by default"
        height="80vh"
        clipRadius={24}
      />
      <AgentFamilies />
      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop"
        headline="Context is"
        headlineAccent="everything."
        subline="A demo that guesses vendor names is not production software. Your masters, your taxonomy, your rules."
        label="Why context matters"
        height="60vh"
        clipRadius={24}
      />
      <ContextKing />
      <GTMPath />
      <LandingCloser />
    </main>
  );
}
```

**Key diffs vs. prior:**
- Removed imports: `OwnershipBand`, `HowToStart`.
- Added import: `LandingCloser` from `'../components/landing/LandingCloser'`.
- JSX: Removed `<OwnershipBand />` and `<HowToStart />` calls. Added `<LandingCloser />` as the final section.
- Updated top-of-file JSDoc to v4 + 9-section arc.

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/pages/LandingPage.tsx
git commit -m "$(cat <<'EOF'
feat(landing): compose LandingPage as 9 sections with LandingCloser

Drops OwnershipBand + HowToStart imports and renders. Adds
LandingCloser as final section. New 9-section arc: Hero → Clients →
IsThisYou → Parallax → AgentFamilies → Parallax → ContextKing →
GTMPath → LandingCloser. OwnershipBand and HowToStart files deleted
in a subsequent commit after confirming zero imports remain.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Delete OwnershipBand and HowToStart

**Files:**
- Delete: `src/components/OwnershipBand.tsx`
- Delete: `src/components/landing/HowToStart.tsx`

**Step 1:** Verify nothing imports them:

```bash
cd /Users/puneet/website-attentions-miro/app && grep -rn "OwnershipBand\|HowToStart" src/
```

Expected: zero matches (Task 6 removed the two imports from LandingPage). If any result appears, STOP and investigate.

**Step 2:** Delete the files:

```bash
cd /Users/puneet/website-attentions-miro/app
rm src/components/OwnershipBand.tsx src/components/landing/HowToStart.tsx
```

**Step 3:** Build:

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 4:** Commit. Check git status first — these files may be untracked (this repo has the mid-workflow git init quirk):

```bash
cd /Users/puneet/website-attentions-miro/app && git status --short | grep -E "OwnershipBand|HowToStart"
```

- **If empty:** files were untracked; `rm` just removed them; NO commit needed. Report this case.
- **If `D` entries:** files were tracked; commit:
  ```bash
  git add src/components/OwnershipBand.tsx src/components/landing/HowToStart.tsx
  git commit -m "$(cat <<'EOF'
  chore(landing): remove OwnershipBand + HowToStart (absorbed into LandingCloser)

  Content migrated:
  - HowToStart manifesto headline + supporting paragraph → LandingCloser
    THE THESIS block.
  - OwnershipBand IP column 3 bullets → LandingCloser ownership bullets
    (reframed as "You own X" commitments).
  - OwnershipBand "Why this isn't consulting" column + "you don't pay"
    line → NOT preserved (commercial-model message lives on /pricing;
    "you don't pay" framing was explicitly removed in About redesign).

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  EOF
  )"
  ```

Report outcome (commit SHA or "no commit needed — files untracked").

---

## Task 8: PlatformFlow (Agents page) — modernize

**File:**
- Modify: `src/components/PlatformFlow.tsx`

**Step 1:** Replace the entire contents of `src/components/PlatformFlow.tsx` with:

```tsx
import { Eye, Brain, Zap, Quote, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

type Step = {
  verb: string;
  Icon: LucideIcon;
  detail: string;
  bg: string;   // tint for icon square background
  ink: string;  // icon color
};

const STEPS: Step[] = [
  { verb: 'Reads', Icon: Eye, detail: 'Any format. PDF, audio, email, API.', bg: 'rgba(255,120,120,0.06)', ink: '#ff9090' },
  { verb: 'Thinks', Icon: Brain, detail: 'Routes to the right model. On your servers.', bg: 'rgba(245,168,212,0.06)', ink: '#f5a8d4' },
  { verb: 'Does', Icon: Zap, detail: 'Posts to SAP. Writes to Epic. Syncs to DMS.', bg: 'rgba(138,245,192,0.06)', ink: '#8af5c0' },
  { verb: 'Cites', Icon: Quote, detail: 'Every answer traceable to page and line.', bg: 'rgba(255,180,80,0.06)', ink: '#ffd080' },
];

/**
 * PlatformFlow — the 4-verb promise of every agent.
 * "It reads. It thinks. It does. On your servers."
 * Horizontal 4-station flow with Lucide icons in colored-tint squares.
 */
export default function PlatformFlow() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s5)', padding: 'clamp(80px, 10vw, 120px) 24px' }}
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-[780px] mx-auto"
        >
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            It reads. It thinks. It does.{' '}
            <span style={{ fontStyle: 'italic' }}>On your servers.</span>
          </h2>
          <p className="mt-4 text-[18px]" style={{ color: 'rgba(0,0,0,0.65)' }}>
            Every agent is a four-step promise. Same on-prem runtime every time.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
          {STEPS.map((s, i) => (
            <div key={s.verb} className="flex items-center gap-4 flex-1">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center justify-center text-center flex-1"
              >
                <div
                  className="w-[120px] h-[120px] rounded-full flex items-center justify-center mb-4"
                  style={{ background: s.bg, border: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <s.Icon size={44} style={{ color: s.ink }} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="font-display text-[24px] leading-none mb-2" style={{ color: '#000000' }}>
                  {s.verb}.
                </div>
                <div className="text-[14px] max-w-[170px]" style={{ color: 'rgba(0,0,0,0.65)' }}>
                  {s.detail}
                </div>
              </motion.div>
              {i < STEPS.length - 1 && (
                <div
                  className="text-4xl font-light hidden lg:block"
                  style={{ color: 'rgba(0,0,0,0.15)' }}
                  aria-hidden="true"
                >
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-14 text-center"
        >
          <span className="capsule-light inline-flex items-center gap-2 rounded-full">
            <span className="w-2 h-2 rounded-full" style={{ background: '#00b473' }} />
            Zero hallucination incidents in production
          </span>
        </motion.div>
      </div>
    </section>
  );
}
```

**Key diffs vs. prior:**
- Replaced emoji icons `👁 🧠 ⚡ 📎` with Lucide `Eye` / `Brain` / `Zap` / `Quote`.
- `color` field renamed to `bg` (background tint for icon circle); added `ink` (icon color).
- Dropped `.sr d-1` + `display-2` + `comet-stagger` entrance classes.
- Wrapped heading + each step + status chip in `motion.div` / `motion.div` for staggered entrance.
- Renamed `steps` → `STEPS`; added `Step` type with `LucideIcon`.
- Section padding: swapped `py-24` for `padding: 'clamp(80px, 10vw, 120px) 24px'` v2 pattern.
- Decorative icons and the horizontal arrow `→` get `aria-hidden="true"`.

**Step 2: Build + commit**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
git add src/components/PlatformFlow.tsx
git commit -m "$(cat <<'EOF'
refactor(agents): modernize PlatformFlow — Lucide icons, drop legacy classes

Replaces emoji icons (👁 🧠 ⚡ 📎) with Lucide (Eye/Brain/Zap/Quote)
in colored-tint 120px circles. Drops .sr d-1 + display-2 + comet-stagger
entrance patterns in favor of motion.div staggered entrance. Section
padding migrated to v2 clamp pattern. Content (verbs, detail text,
status chip "Zero hallucination incidents") preserved verbatim. aria-
hidden on decorative icons + arrow.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Final verification pass

**No files changed.**

**Step 1: Full build**

```bash
cd /Users/puneet/website-attentions-miro/app && npm run build
```

Expected: zero errors.

**Step 2: Legacy-class audit (must return ZERO matches)**

```bash
cd /Users/puneet/website-attentions-miro/app && grep -rn "display-hero\|display-2\|sr d-\|PageCinematicWrap\|giantText" \
  src/pages/LandingPage.tsx src/pages/AgentsPage.tsx \
  src/components/landing/ src/components/HeroAboveFold.tsx \
  src/components/GTMPath.tsx src/components/PlatformFlow.tsx \
  src/components/AgentFamilies.tsx 2>&1 | grep -v "No such file"
```

Expected: ZERO matches.

**Step 3: Emoji audit on PlatformFlow**

```bash
cd /Users/puneet/website-attentions-miro/app && grep -n "👁\|🧠\|⚡\|📎" src/components/PlatformFlow.tsx
```

Expected: ZERO matches.

**Step 4: `$5K` + `you don't pay` audit on landing**

```bash
cd /Users/puneet/website-attentions-miro/app && grep -rn "\\$5K\|don.t pay" \
  src/pages/LandingPage.tsx src/components/HeroAboveFold.tsx \
  src/components/GTMPath.tsx src/components/landing/ 2>&1 | grep -v "No such file"
```

Expected: ZERO matches.

**Step 5: Orb count on landing — exactly 1**

```bash
cd /Users/puneet/website-attentions-miro/app && grep -rn "HeroOrb" \
  src/pages/LandingPage.tsx src/components/landing/ \
  src/components/HeroAboveFold.tsx src/components/GTMPath.tsx 2>&1 | grep -v "No such file"
```

Expected: exactly 1 match — the `lazy(() => import('../HeroOrb'))` in `LandingCloser.tsx`. (Down from 4 matches previously — 2 in OwnershipBand + 2 in ContextKing — both now removed.)

**Step 6: Dead-file audit**

```bash
cd /Users/puneet/website-attentions-miro/app && ls src/components/OwnershipBand.tsx src/components/landing/HowToStart.tsx 2>&1
```

Expected: both errors "No such file or directory".

**Step 7: Cross-page audit — other pages unaffected**

```bash
cd /Users/puneet/website-attentions-miro/app && git log --oneline --all -- \
  src/pages/PlatformPage.tsx src/pages/SolutionsPage.tsx \
  src/pages/PricingPage.tsx src/pages/AboutPage.tsx | head -20
```

Expected: none of these pages' latest commits should be from this series (confirm they're older).

**Step 8: Preview QA checklist — `http://localhost:5174/`**

- [ ] Hero CTA reads "Get an assessment →" (not "Get a $5K assessment →").
- [ ] Mailto subject on the CTA button is `Assessment` (check by hovering or clicking — should open mail client with subject "Assessment").
- [ ] ClientsStrip, IsThisYou, Parallax #1, AgentFamilies, Parallax #2 render in order.
- [ ] ContextKing: 2 side-by-side white cards (red accent on left, black on right), terminal-style diff blocks present, Lucide X (red) and Check (black) icons in bullet circles. No orbs.
- [ ] GTMPath: 3 white cards with slate accent, italic step numbers (01/02/03), effort chips (2-week engagement / 4-week deployment / Ongoing ownership). No station circles. No `$5K`.
- [ ] LandingCloser: black glass orb on left animating (breathing + floating), "THE THESIS" label, "Sovereign AI isn't borrowed. *It's built.*" headline, italic supporting paragraph, 3 ownership bullets ("You own the weights / agent / proof").
- [ ] Page has NO sections after LandingCloser (was previously HowToStart after OwnershipBand).
- [ ] `prefers-reduced-motion: reduce` users get static transitions (MotionConfig at page root — already on `LandingPage`; may need to add if LandingPage doesn't have it).

**Step 9: Preview `/agents`**

- [ ] PlatformFlow: 4 Lucide icons in colored-tint circles (Eye red / Brain pink / Zap teal / Quote gold) with arrows between on desktop. Heading "It reads. It thinks. It does. *On your servers.*". No emoji, no station circles changed.
- [ ] Other Agents sections (PageHero, ClientsStrip, ParallaxHero, AgentDeepDiveScroll, ProductionProof, AgentsCloser) unchanged.

**Step 10: No commit needed unless fixes surfaced.** If a fix was needed, commit under `fix(landing): ...` or `fix(agents): ...`.

---

## Summary of files touched

**Created:**
- `src/components/landing/LandingCloser.tsx`
- `docs/plans/2026-04-18-landing-agents-v2.md` (this plan)

**Modified:**
- `src/components/HeroAboveFold.tsx` (2-char edit)
- `src/components/landing/AgentFamilies.tsx` (modernization)
- `src/components/landing/ContextKing.tsx` (full rewrite)
- `src/components/GTMPath.tsx` (full rewrite)
- `src/pages/LandingPage.tsx` (swap imports)
- `src/components/PlatformFlow.tsx` (modernization)

**Deleted:**
- `src/components/OwnershipBand.tsx`
- `src/components/landing/HowToStart.tsx`

**Total:** 7 modified + 1 new + 2 deleted = 10 file touches across 8 commits (Task 7 may be a no-op).

---

## If something goes wrong

**Build fails on `whiteCardStyle` import path:** check the relative path. From `src/components/landing/*.tsx` it's `'../common/whiteCard'`. From `src/components/*.tsx` (like GTMPath, HeroAboveFold at root of components) it's `'./common/whiteCard'`.

**LandingCloser orb doesn't render:** verify the `{inView && <Suspense>...}` gate wraps HeroOrb. `useInView` is one-shot so once mounted it stays — that's fine.

**PlatformFlow layout breaks:** the horizontal 4-step flow uses `flex-wrap lg:flex-nowrap` so it wraps on narrow viewports. Verify the per-step column widths still read cleanly on tablet.

**Reduced-motion doesn't apply on landing:** LandingPage may not have `<MotionConfig reducedMotion="user">` at root. Check `src/pages/LandingPage.tsx` — if missing, wrap `<main>` with it (same pattern as AboutPage / PricingPage / SolutionsPage).

**Mailto CTA opens blank:** browser may block mailto without a default mail client configured. This is unchanged behavior; not a regression from this work.
