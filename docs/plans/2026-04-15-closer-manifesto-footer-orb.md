# Closing Manifesto + Enhanced Footer with Orb — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the redundant `HowToStart` CTA section on the landing page with a philosophical manifesto, and rebuild `CinematicFooter` with a large animated black glass orb + a 5-column jump-link navigation.

**Architecture:** One self-contained rewrite of `HowToStart` (pure type, no CTAs). One rewrite of `CinematicFooter` — remove the duplicate "Three doors" content, swap the giant "ATTENTIONS" text for a lazy-loaded `HeroOrb`, and replace the 3 nav columns with a 5-column grid that includes deep-link anchors. Anchor `id=` attributes added to referenced sections.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS, framer-motion, existing `HeroOrb` three.js component, existing `useInView` hook.

**Verification:** No unit tests — this is pure frontend presentation work. Each task is verified by running `npm run build` (zero errors) and visually confirming in the live preview at `http://localhost:5174`.

---

## Task 1: Rewrite `HowToStart` as closing manifesto

**Files:**
- Modify: `src/components/landing/HowToStart.tsx` (full rewrite)

**Step 1: Replace file content**

Write the full file:

```tsx
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * HowToStart — closing manifesto for the landing page.
 * Pure type, no CTAs. CTAs live in the footer.
 *
 * Angle: sovereignty + regulated reality (combined per design 2026-04-15).
 */

export default function HowToStart() {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(96px, 14vw, 180px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="micro-upper mb-8"
          style={{ color: 'rgba(0,0,0,0.55)' }}
        >
          The thesis
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: '#000000',
          }}
        >
          Sovereign AI isn&rsquo;t borrowed.{' '}
          <span style={{ fontStyle: 'italic' }}>It&rsquo;s built.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-10"
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 1.5vw, 22px)',
            lineHeight: 1.55,
            color: 'rgba(0,0,0,0.65)',
            maxWidth: 640,
          }}
        >
          You rented your cloud for a decade. You won&rsquo;t rent your intelligence.
          The agents your regulator asks about &mdash; the ones that decide what gets
          posted to SAP, booked at 9 AM, approved by the CFO &mdash; belong inside
          your building. Your hardware. Your weights. Your audit trail.
        </motion.p>
      </div>
    </section>
  );
}
```

**Step 2: Build check**

Run: `cd /Users/puneet/website-attentions-miro/app && npm run build`
Expected: `✓ built` with no errors.

**Step 3: Visual check**

Navigate in preview to `/`, scroll to the bottom (just before the footer). Expected:
- No "Three doors. One phone call." heading.
- No 3 persona cards.
- A clean manifesto: label "THE THESIS" → giant headline "Sovereign AI isn't borrowed. *It's built.*" → italic supporting paragraph about renting cloud vs. renting intelligence.
- Fully scroll-revealed (label + headline + paragraph stagger in).

**Step 4: Commit**

```bash
cd /Users/puneet/website-attentions-miro/app
git add src/components/landing/HowToStart.tsx
git commit -m "feat(landing): replace HowToStart CTA with closing manifesto"
```

---

## Task 2: Add anchor IDs for footer jump-links

Add `id` attributes to sections that the footer will link to.

**Files:**
- Modify: `src/components/landing/AgentFamilies.tsx` (add per-card `id` attributes OR a single `id="families"`)
- Modify: `src/components/OwnershipBand.tsx` (add `id="ownership"`)
- Modify: `src/components/PlatformStack.tsx` (add `id="layers"`)
- Modify: `src/components/ProductionProof.tsx` or `src/components/landing/ProductionProof.tsx` (add `id="production"`)

**Step 1: AgentFamilies — add `id="families"` to the outer section**

Find the outer `<section ref={ref} ...>` element in `AgentFamilies.tsx`. Add `id="families"`:

```tsx
<section ref={ref} id="families" className="py-28 ...
```

Note: The plan mentioned deep per-card anchors (`#document`, `#voice`, `#multimodal`). A single `#families` anchor is simpler and still useful. If per-card anchors become necessary later, add `id` to each card's outer `<motion.div>`.

**Step 2: OwnershipBand — add `id="ownership"`**

Find the outer `<section ref={ref} ...>` and add `id="ownership"`:

```tsx
<section ref={ref} id="ownership" className="py-24" ...
```

**Step 3: PlatformStack — add `id="layers"`**

Find the outer `<section ref={ref} id="platform" ...>` (it already has id="platform"). Change to `id="layers"` OR keep both IDs. Simpler: change to `id="layers"`:

```tsx
<section id="layers" className="py-24" ref={ref} ...
```

**Step 4: ProductionProof — add `id="production"`**

Read `src/components/landing/ProductionProof.tsx`. Find the outer `<section>` and add `id="production"`:

```tsx
<section id="production" ...
```

**Step 5: Build check**

Run: `npm run build`
Expected: `✓ built`, zero errors.

**Step 6: Commit**

```bash
git add src/components/landing/AgentFamilies.tsx src/components/OwnershipBand.tsx src/components/PlatformStack.tsx src/components/landing/ProductionProof.tsx
git commit -m "feat(anchors): add id attributes for footer jump-links"
```

---

## Task 3: Rewrite `CinematicFooter` — orb centerpiece + 5-column links

This is the largest task. Replace the "Three doors" CTA section with a large animated black orb, replace the giant "ATTENTIONS" text, and expand the 3-column link grid to 5 columns with jump-links.

**Files:**
- Modify: `src/components/CinematicFooter.tsx` (major rewrite of layout, keeping dark-mode theming)

**Step 1: Read the current file**

```bash
sed -n '1,250p' src/components/CinematicFooter.tsx
```

Expected: see the existing 3 ICP door cards (lines ~128-200), giant "ATTENTIONS" text (lines ~106-108), and the 3 nav sections (product / proof / company).

**Step 2: Replace the entire file with the new implementation**

Write the full file:

```tsx
import { useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroOrb = lazy(() => import('./HeroOrb'));

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CinematicFooter — dark footer with a large animated black orb centerpiece,
 * 5-column link grid (with jump-link anchors), and a legal row.
 *
 * Design: docs/plans/2026-04-15-closer-manifesto-footer-orb-design.md
 */

const marqueeItems = [
  'Sovereign AI', 'On-prem Agents', 'Hallucination Control',
  'Audit Trail', 'Fixed Cost', 'Cited Outputs',
  'Regulated Ready', 'Founder First',
];

function MarqueeItem() {
  return (
    <>
      {marqueeItems.map((item, i) => (
        <span key={i} className="inline-flex items-center px-6 whitespace-nowrap">
          <span className="w-1 h-1 rounded-full bg-white/30 mr-4" />
          {item}
        </span>
      ))}
    </>
  );
}

export default function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Subtle GSAP on the headline
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 70%' },
      });
    });
    return () => ctx.revert();
  }, []);

  // 5-column link structure
  const product = [
    { to: '/platform', label: 'Platform overview' },
    { to: '/platform#layers', label: 'Six shared layers' },
    { to: '/platform', label: 'Agent pattern' },
    { to: '/pricing', label: 'Pricing' },
  ];
  const solutions = [
    { to: '/agents', label: 'Document agents' },
    { to: '/agents', label: 'Voice agents' },
    { to: '/agents', label: 'Multimodal agents' },
    { to: '/why-generic-fail', label: 'Why generic fails' },
    { to: '/#ownership', label: 'IP & ownership' },
  ];
  const proof = [
    { to: '/case-studies', label: 'Case studies' },
    { to: '/competitors', label: 'Competitors' },
    { to: '/agents#production', label: 'Live production' },
    { to: '/why-generic-fail', label: 'Why generic fails' },
  ];
  const company = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
    { to: '/security', label: 'Security & compliance' },
  ];
  const connect = [
    { href: 'mailto:hello@attentions.ai', label: 'hello@attentions.ai', external: true },
    { href: 'https://linkedin.com', label: 'LinkedIn', external: true },
    { to: '#', label: 'Privacy' },
    { to: '#', label: 'Terms' },
  ];

  return (
    <div ref={wrapperRef} className="relative h-auto w-full">
      <footer className="relative flex min-h-screen w-full flex-col overflow-hidden text-white" style={{ background: '#060a12' }}>

        {/* Aurora glow */}
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 cf-aurora rounded-[50%] blur-[80px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(138,245,192,0.06) 0%, rgba(91,118,254,0.05) 40%, transparent 70%)' }} />
        {/* Grid */}
        <div className="cf-grid absolute inset-0 z-[1] pointer-events-none" />

        {/* Diagonal marquee band */}
        <div className="relative z-10 border-y py-4 -rotate-1 scale-105 overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(6,10,18,0.70)', backdropFilter: 'blur(12px)' }}>
          <div className="flex w-max cf-marquee text-[13px] font-bold tracking-[0.20em] uppercase" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'JetBrains Mono', monospace" }}>
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* Main content: orb + headline + CTA */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24 w-full max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

            {/* Orb */}
            <div className="flex justify-center md:justify-end">
              <div className="relative" style={{ width: 'clamp(260px, 30vw, 420px)', height: 'clamp(260px, 30vw, 420px)' }}>
                <Suspense fallback={null}>
                  <HeroOrb
                    baseColor="#1a1a1a"
                    attenuationColor="#000000"
                    envColor="#666666"
                    attenuationDistance={0.6}
                    breatheAmp={0.12}
                    floatAmp={0.22}
                  />
                </Suspense>
              </div>
            </div>

            {/* Headline + CTA */}
            <div className="text-center md:text-left">
              <h2
                ref={headingRef}
                className="mb-6"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 500,
                  lineHeight: 1.02,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                }}
              >
                Ready to <span style={{ fontStyle: 'italic' }}>own</span> it?
              </h2>
              <p className="mb-8 max-w-[460px] mx-auto md:mx-0" style={{ fontSize: 18, color: 'rgba(255,255,255,0.70)', fontFamily: "'Noto Sans', sans-serif", lineHeight: 1.5 }}>
                30-minute founder call. No SDR, no slides. We discuss your stack,
                your regulator, your timeline.
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
              <div className="mt-5 text-[13px]" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: "'JetBrains Mono', monospace" }}>
                hello@attentions.ai · Response within 4 business hours
              </div>
            </div>
          </div>
        </div>

        {/* 5-column link grid */}
        <div className="relative z-10 border-t px-6 py-14" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            <FooterColumn title="Product" items={product} />
            <FooterColumn title="Solutions" items={solutions} />
            <FooterColumn title="Proof" items={proof} />
            <FooterColumn title="Company" items={company} />
            <FooterColumn title="Connect" items={connect} />
          </div>
        </div>

        {/* Legal row */}
        <div className="relative z-10 border-t px-6 py-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[13px]" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: "'JetBrains Mono', monospace" }}>
            <span>© {new Date().getFullYear()} attentions.ai · Built for regulated enterprise.</span>
            <span>artiGen · Sovereign AI Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

type LinkItem = { to?: string; href?: string; label: string; external?: boolean };

function FooterColumn({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div>
      <div
        className="mb-4 text-[11px]"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.40)',
        }}
      >
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i}>
            {item.external && item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.to ?? '#'}
                className="text-[14px] transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Step 3: Remove orphaned CSS references**

The file no longer uses `.cf-giant-text` or `.cf-heading-glow` classes. Those classes can remain in `index.css` for other use (non-destructive), but the references in `CinematicFooter.tsx` are gone.

No changes to `index.css` needed — the classes already exist and the new footer doesn't require new ones.

**Step 4: Build check**

Run: `npm run build`
Expected: `✓ built`, zero errors.

If any TS error about unused imports from the old file, clean them up. The rewrite removed `Link` old usage patterns; the new file uses `Link` for internal routes and `<a>` with `target="_blank"` for external.

**Step 5: Visual check on landing page**

Preview `/`. Scroll to the bottom. Expected:
- Marquee band (rotated) with services scrolling.
- Large animated black glass orb on the left (desktop) — breathing, floating.
- Headline "Ready to *own* it?" + paragraph + white "BOOK A FOUNDER CALL →" button + email response line to the right of the orb.
- 5 columns below with headers: PRODUCT / SOLUTIONS / PROOF / COMPANY / CONNECT.
- Each column has 4-5 link items.
- Hover on a link: turns bright white.
- Bottom legal row with copyright and brand tagline.

**Step 6: Visual check on another page**

Navigate to `/platform` or `/agents`. Scroll to footer. Expected: same footer appears (since it's the global shared footer), with the orb + links.

**Step 7: Test a jump-link**

From footer, click "Six shared layers" (`/platform#layers`). Expected: navigates to `/platform`, then scrolls to the PlatformStack section.

**Step 8: Commit**

```bash
git add src/components/CinematicFooter.tsx
git commit -m "feat(footer): add animated black orb centerpiece + 5-column jump-links"
```

---

## Task 4: Final build + full-page visual audit

**Step 1: Production build**

Run:
```bash
cd /Users/puneet/website-attentions-miro/app
npm run build 2>&1 | tail -20
```

Expected: `✓ built` with no TS errors. Bundle size similar to before (slight increase from added footer links, no change from removing old footer content).

**Step 2: Visual check — landing page end-to-end**

Preview `/`, scroll from top to bottom. Expected order:
1. HeroAboveFold
2. ClientsStrip
3. IsThisYou
4. ParallaxHero (Sovereign)
5. AgentFamilies
6. ParallaxHero (Context)
7. ContextKing (orbs)
8. OwnershipBand (orbs)
9. GTMPath
10. **Manifesto** ("THE THESIS / Sovereign AI isn't borrowed...")
11. **Footer** (orb + CTA + 5 columns + legal)

No "Three doors" section. No giant "ATTENTIONS" text in footer.

**Step 3: Visual check — other pages still work**

Visit `/platform`, `/agents`, `/case-studies`, `/pricing`. Each should render without layout break. Footer at bottom is the new orb+links footer.

**Step 4: Mobile responsive check**

Resize preview to 375px width (mobile). Expected:
- Manifesto: text still readable, font scales down.
- Footer: orb stacks above text, 5 columns collapse to 2 columns.
- All text remains readable, nothing overflows.

**Step 5: Final commit**

```bash
git add -A
git commit --allow-empty -m "chore: verify landing page closer + footer implementation complete"
```

---

## Notes for the implementer

- **DRY:** The `FooterColumn` component is reused 5 times. Don't inline the column markup 5 times.
- **YAGNI:** Don't add features not in the plan. No newsletter signup, no social icon strip beyond LinkedIn placeholder, no animated logo.
- **No unit tests:** This project doesn't have a test setup. Verify via browser preview after each task.
- **Commit after each task:** Granularity is by Task (1-4), not by step.
- **If a TS error appears:** Fix it before committing. Don't skip with `@ts-ignore`.
- **If the orb lag is visible:** That's expected behavior for three.js canvases — don't tweak the animation unless it's broken.
- **Anchor scrolling:** React Router's `Link` with `#hash` doesn't auto-scroll. The existing `ScrollToTop` in `App.tsx` scrolls to top on route change. To make hash links scroll to the anchor, we may need a small hash-scroll effect in `Shell`. Verify behavior; if broken, add 1-2 lines to `ScrollToTop` to also honor `hash` after mount.

---

## Out of scope

- Per-card anchors (`#document`, `#voice`, `#multimodal`) on AgentFamilies — using single `#families` anchor for simplicity.
- Adding a newsletter signup.
- Animating the footer orb differently per page.
- Translating copy.
- SEO meta updates.
