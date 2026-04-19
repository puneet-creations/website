# Post-Phase-2 Cohesion Pass — Design Document

**Date:** 2026-04-18
**Scope:** Close the visual-consistency gap that Phase 2 (AgentPlatformStack wow section + motion footer) opened between the new dark-cinematic sections and the older light-themed cards on the landing page, plus tighten the footer's dense right column, add a compliance strip + target anchor, and audit link integrity.
**Author:** Brainstorm with Puneet (Sections 1-4 approved)

## Context

After Phase 2 shipped (commits `7f880b8` agent-card clickability + `db626ef` lint sweep + `612660e` motion footer), the user reviewed the live site and flagged:

1. Footer orb is dark on a now-dark motion backdrop → no contrast
2. Footer right column (headline + 3 callouts + tagline + CTA + email line) feels dense and "really bad" over the new video
3. Four older card sections look "off from the rest" — same era as pre-Phase-2, now sitting next to the new cardiatec-inspired centerpiece:
   - `AgentFamilies` (on `/platform`, exported from `src/components/PlatformStory.tsx`)
   - `FlowDiagram` (on `/platform`, `src/components/FlowDiagram.tsx`)
   - `ContextKing` (on `/`, `src/components/landing/ContextKing.tsx`)
   - `GTMPath` (on `/`, `src/components/GTMPath.tsx`)
4. Footer needs a certification + compliance strip that links to `/security#compliance`
5. Footer + SiteNav + SVG-visualization CTAs need a link-integrity audit

All 5 asks share the same root problem: **the visual language Phase 2 established isn't carried through, and a few loose ends (link anchors, compliance trust signals) haven't been closed**.

### Direction decision — Approach 3 confirmed

Of three candidate approaches, the user approved **Approach 3 — per-page context**:
- Landing (`ContextKing`, `GTMPath`, footer) goes dark-cinematic to match `AgentPlatformStack` above
- `/platform` (AgentFamilies, FlowDiagram) stays light-themed — `/platform` is a light-themed page end-to-end; making two middle sections dark would break rhythm in reverse

## Section 1 — Shared tokens + orb color swap

### Orb color (shipped first as micro-polish)

`CinematicFooter.tsx`'s `HeroOrb` instance currently:

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

Dark orb on a now-dark motion video → near-zero contrast. Change to:

```tsx
<HeroOrb
  baseColor="#ffffff"
  attenuationColor="#e8e8e8"
  envColor="#f5f5f5"
  attenuationDistance={0.6}   // unchanged
  breatheAmp={0.12}           // unchanged
  floatAmp={0.22}             // unchanged
/>
```

Rationale:
- `baseColor` pure white for maximum backdrop contrast
- `attenuationColor` slightly off-white (`#e8e8e8`) preserves glass refraction depth so the orb reads 3D, not flat
- `envColor` soft-white (`#f5f5f5`) — HDR environment reflection stays slightly warmer than pure white to avoid clinical look

### Dark-cinematic token set (applied to landing dark sections + footer)

| Token | Value | Use |
|---|---|---|
| `--dark-bg` | `#0a0e18` | Section background (matches `AgentPlatformStack`) |
| `--dark-bg-alt` | `#060a12` | Footer deepest bg (existing) |
| `--dark-ink` | `rgba(255,255,255,0.95)` | Primary text |
| `--dark-ink-2` | `rgba(255,255,255,0.65)` | Body copy |
| `--dark-ink-3` | `rgba(255,255,255,0.40)` | Meta, eyebrows |
| `--dark-border` | `rgba(255,255,255,0.08)` | Card borders |
| `--teal-accent` | `#8af5c0` | Active highlights, eyebrows, CTA accents |
| `--teal-dim` | `rgba(138,245,192,0.12)` | Teal backgrounds |

Tokens inlined per callsite (matching AgentPlatformStack pattern — not added to `index.css` as CSS variables; the values are already in use site-wide via hardcoded strings). Consistency with Phase 2 is the goal, not centralization.

### Typography

- Eyebrows: `var(--mono)` (Plus Jakarta Mono), 12px, uppercase, `letter-spacing: 0.12em`, color `--teal-accent`
- Headlines: `var(--serif)` (Fraunces), `clamp(32px, 4vw, 56px)`, weight 500, `letter-spacing: -0.02em`; italic `<em>` accent words
- Body: `var(--body)` (Plus Jakarta Sans), 14-18px, line-height 1.5

All match Phase 2's `AgentPlatformStack` typography exactly.

## Section 2 — Per-page card redesigns

### 2A. Landing — 2 sections go dark-cinematic

**`ContextKing` (`src/components/landing/ContextKing.tsx`):**

Current: white bg, lightly-tinted cards, serif headline with italic accent.

Become:
- Outer `<section>` bg: `#0a0e18`
- Eyebrow `THE QUESTION BUYERS ASK` — teal mono, matches AgentPlatformStack
- Headline: "An agent without your context is <em>not production software.</em>" — serif with italic accent, `--dark-ink` color
- Support area: current "Generic LLM" vs "artiGen agent" comparison → two dark-tinted cards side-by-side on desktop, stacked on mobile
  - Left "Generic LLM" card: `#0a0e18` bg with `1px solid rgba(255,120,120,0.20)` border + red-dim top accent strip
  - Right "artiGen agent" card: `#0a0e18` bg with `1px solid rgba(138,245,192,0.25)` border + teal top accent strip
  - Body text in `--dark-ink-2`
- Sits between `AgentPlatformStack` (dark) above and `GTMPath` (now dark) below → cohesive dark stretch

**`GTMPath` (`src/components/GTMPath.tsx`):**

Current: light bg, 3 step cards with numbered circles.

Become:
- Outer `<section>` bg: `#0a0e18`
- Eyebrow `THE ENGAGEMENT PATH` — teal mono
- Headline: "Three steps from <em>curious</em> to live in production." — serif with italic accent
- 3 step cards: dark-tinted bg (`rgba(255,255,255,0.03)`) + `--dark-border` + teal number badge (circle, `--teal-dim` bg, `--teal-accent` digit)
- Step title in `--dark-ink`, body in `--dark-ink-2`
- Subtle teal dashed connector line between the 3 steps (horizontal on desktop, vertical on mobile)
- Final-state check-mark or sparkle on step 3 in `--teal-accent`

### 2B. `/platform` — 2 sections get light polish only

**`AgentFamilies` in `PlatformStory.tsx`:**

No palette change (keep pastel bg `var(--bg-s1)`). Tightening pass:
- Card internal padding `p-10` → `p-8` (denser content, less airspace waste)
- Agent-family card SVG visuals (Document, Voice, Multimodal) — sharpen stroke widths from 1.2 → 1.5 for better retina clarity, bump icon contrast so they read on the tinted card bg
- Unify inter-card spacing gap to match sibling `PlatformStack` gap token

**`FlowDiagram` (`src/components/FlowDiagram.tsx`):**

Already audit-clean from Phase 1. Tiny polish:
- Card corner radius 24 → 28 to match newer `WhiteCard` standard
- Verify arrow glyphs render crisply at 125%/150% browser zoom
- If visual pass shows nothing needed, mark as NO-OP and move on

## Section 3 — Footer right column + compliance strip

### 3A. Right-column redesign

Current vertical stack:
- H2 headline (large Fraunces)
- 3 value-callout rows (white-glass-orb badge + title + sub)
- Italic tagline
- CTA button
- Email row

Over a now-dark motion backdrop, 6 stacked text blocks feel dense. Proposed new structure:

```
eyebrow:    FOUNDER FIRST
headline:   Sovereign AI and production agents on the artiGen Platform.
            (Fraunces, italic accent on "artiGen Platform")

[3 short pills in a horizontal row, gap-2, flex-wrap]
  · Secure by architecture
  · Fixed low cost
  · ROI in weeks

tagline:    Don't hand your IP to public AI.
            (Fraunces italic, smaller, dim)

[CTA]:      Book a founder call → (unchanged)
email:      hello@attentions.ai · Response within 4 business hours
```

Changes:
- **Drop the 3 white-glass orb badges** (were 48×48 radial-gradient orbs) — they competed with the 3D HeroOrb centerpiece
- **3 callouts → 3 pills in one horizontal row** — shorter title-only, sub-copies removed (each sub was near-duplicate of what the headline + tagline already say)
- **New eyebrow** `FOUNDER FIRST` in teal mono — anchors the section in the dark-cinematic language
- Headline, tagline, CTA, email row unchanged in copy and position

Visual hierarchy becomes: eyebrow → headline → compressed proof strip → tagline → CTA → email. Cleaner vertical rhythm.

### 3B. New compliance strip

Add a new strip between the main-content block and the 5-column link grid:

```tsx
<div className="relative z-10 border-t px-6 py-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
  <div className="max-w-[1200px] mx-auto text-center">
    <div className="micro-upper mb-5 text-[--teal-accent]">CERTIFIED & AUDITED</div>
    <div className="flex flex-wrap justify-center gap-3">
      {COMPLIANCE.map((c) => (
        <span
          key={c}
          className="px-5 py-2.5 rounded-full text-[13px] font-semibold"
          style={{
            background: 'rgba(138,245,192,0.08)',
            border: '1px solid rgba(138,245,192,0.20)',
            color: '#8af5c0',
          }}
        >
          {c}
        </span>
      ))}
    </div>
    <Link
      to="/security#compliance"
      className="inline-flex items-center gap-1.5 mt-6 text-[13px] text-[rgba(255,255,255,0.55)] hover:text-white transition-colors"
    >
      See security architecture
      <ArrowRight size={14} />
    </Link>
  </div>
</div>
```

Data: **reuse** `COMPLIANCE` constant from `SecurityPage.tsx` (currently `['GDPR', 'HIPAA', 'SOC 2 Type II', 'ISO 27001', 'PCI DSS', 'Air-gapped']`) — export from `SecurityPage.tsx` OR extract to `src/data/compliance.ts` to avoid circular import.

Decision: extract to `src/data/compliance.ts` (cleaner separation; SecurityPage imports it too). Small data-module refactor.

### 3C. Target anchor on SecurityPage

Current `SecurityPage.tsx:114`:

```tsx
<section className="max-w-[900px] mx-auto px-6 text-center">
  <div className="micro-upper text-[rgba(0,0,0,0.65)] mb-5">Compliance</div>
```

Add `id="compliance"` to the section element:

```tsx
<section id="compliance" className="max-w-[900px] mx-auto px-6 text-center">
```

Also update the inline `COMPLIANCE` constant at line 18 to import from the new `src/data/compliance.ts` module.

## Section 4 — Link audit

### 4A. Audit results (from reading SiteNav + Footer + AgentsPage)

**Footer 5-column grid** (all `react-router-dom` `Link`s):
| Link | Target | Status |
|---|---|---|
| `/platform` | Platform page | ✓ |
| `/platform#layers` | `PlatformStack` section | **Verify anchor exists** — check `PlatformStack.tsx` for `id="layers"` |
| `/agents` | Agents page | ✓ |
| `/pricing` | Pricing page | ✓ |
| `/why-generic-fail` | WhyGenericFailPage | ✓ |
| `/#ownership` | Landing section | **Verify anchor exists** — check landing for `id="ownership"` |
| `/solutions` | Solutions page | ✓ |
| `/competitors` | CompetitorsPage | ✓ |
| `/agents#production` | `ProductionProof` on AgentsPage | ✓ (verified during Phase 2 QA) |
| `/about` | AboutPage | ✓ |
| `/contact` | ContactPage | ✓ |
| `/faq` | FaqPage | ✓ |
| `/security` | SecurityPage | ✓ |
| `mailto:hello@attentions.ai` | External mail | ✓ |
| `https://linkedin.com` | External | Placeholder — leave as-is (real URL out of scope) |
| `#` (Privacy, Terms) | Placeholder | Leave as-is (no legal pages yet) |

**SiteNav dropdown items** (most point to `/platform` or `/agents` without hash):
- Dropdown labels are descriptive but land on the page-level route. Acceptable for now — dropdown is a discovery aid, page landing page is the content. Improving anchor targeting is out of scope (separate polish task).
- SiteNav hash-style items that DO exist: `/solutions#finance-logistics`, `/solutions#healthcare`, `/solutions#manufacturing` — **verify anchors exist** on `SolutionsPage.tsx` or are handled by `IndustrySwitcher` (they probably are, since IndustrySwitcher emits `id={industry.id}` on sections).

**SVG/card CTAs** (from Phase 2 work):
- `AgentPlatformStack` agent cards → `/agents#agent-deep-dive` — ✓ (verified during Phase 2 Task 7 QA; `AgentsPage.tsx:63` has `id="agent-deep-dive"`)
- `AgentPlatformStack` engagement cards → `/pricing#pilot`, `/platform`, `mailto:...` — all valid routes; `/pricing#pilot` anchor should be verified on `PricingPage.tsx` during implementation

### 4B. Fixes planned

1. **Add `id="compliance"`** to `SecurityPage.tsx` compliance section — REQUIRED for footer compliance strip's "See security architecture" link (Section 3B)
2. **Verify `id="layers"`** on `PlatformStack.tsx` — if missing, add. Footer link `/platform#layers` needs this target.
3. **Verify `id="ownership"`** somewhere on landing — if missing, either add to `LandingCloser` / `IsThisYou` (whichever makes sense) OR change the footer link to a route that exists.
4. **Verify `id="finance-logistics"`, `id="healthcare"`, `id="manufacturing"`** on `SolutionsPage.tsx` — these are hit from SiteNav dropdown.
5. **Verify `id="pilot"`** on `PricingPage.tsx` — hit from AgentPlatformStack engagement card.

All 5 items are additions-or-verifications of `id` attributes. No destructive changes. If any section is missing, add it; if change needed to a section name (e.g., rename id for clarity), flag before changing.

## Files affected

### Create
- `src/data/compliance.ts` — shared COMPLIANCE constant (6 badges + optional blurb)

### Modify
- `src/components/CinematicFooter.tsx` — orb color swap + right-column redesign + new compliance strip + audit link correctness
- `src/components/landing/ContextKing.tsx` — dark-cinematic rewrite
- `src/components/GTMPath.tsx` — dark-cinematic rewrite
- `src/components/PlatformStory.tsx` — tighten `AgentFamilies` (light polish only)
- `src/components/FlowDiagram.tsx` — tiny corner-radius polish (or NO-OP if visual audit is fine)
- `src/pages/SecurityPage.tsx` — add `id="compliance"`, import COMPLIANCE from new data module
- `src/components/PlatformStack.tsx` — verify/add `id="layers"`
- `src/pages/LandingPage.tsx` OR one of its children — verify/add `id="ownership"` (location TBD)
- `src/pages/SolutionsPage.tsx` — verify/add the 3 industry anchors
- `src/pages/PricingPage.tsx` — verify/add `id="pilot"`

## Non-goals (YAGNI guard)

- No SiteNav dropdown-item hash-anchoring rewrite (separate pass if needed)
- No legal pages (`/privacy`, `/terms`) — footer `#` placeholders stay
- No external LinkedIn URL update
- No `/platform` going dark (preserve page palette)
- No AgentFamilies / FlowDiagram palette changes (light polish only)
- No new CSS custom properties — inline values per Phase 2 pattern
- No copy rewrites on the 4 "off" cards — only palette + layout + motion polish
- No AgentPlatformStack industry-tile clickability changes (Phase 2 polish task if demanded)

## Shipping order

Suggested phase split for implementation:

**Phase A — Quick wins (2 commits)**
1. Orb color swap on CinematicFooter — 3-value prop change
2. Anchor additions across pages (compliance, layers, ownership, industries, pilot) — all `id` attribute additions

**Phase B — Landing dark cards (2 commits)**
3. `ContextKing` dark-cinematic rewrite
4. `GTMPath` dark-cinematic rewrite

**Phase C — Footer right column + compliance strip (2 commits)**
5. Right-column redesign (eyebrow + 3-pill row + drop glass badges)
6. New compliance strip + COMPLIANCE data extraction

**Phase D — `/platform` polish (1 commit)**
7. `AgentFamilies` tightening + `FlowDiagram` corner radius

Each commit atomic and revertible. 7 commits total.

## Testing

- Build must pass after every commit
- Lint clean (codebase is currently lint-clean per commit `db626ef`)
- Visual verification per section at 1440px desktop + 390px mobile
- Reduced-motion verification for any new framer-motion additions
- Hash-nav verification for the 5 anchor targets (footer + SiteNav dropdown items that use hashes)
- No regressions to existing Phase 2 work (AgentPlatformStack, motion footer)
- WCAG AA contrast for dark-cinematic text-on-teal-accent and text-on-dark-bg combinations (should comfortably pass — teal on `#0a0e18` is ~10:1)

## Rollback strategy

- Each phase revertible independently (`git revert` per commit)
- Phase A commits are tiny and near-zero-risk
- Phase B + C commits touch presentational-only components; reverting restores prior look
- Phase D is purely cosmetic tightening; reverting is a no-op on content/behavior
