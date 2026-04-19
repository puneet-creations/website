# Production Review — Issue Log

## Review Date: 2026-04-11
## Reviewers: UX/Design Agent, Code Architecture Agent, Story Flow Advisor

---

## CRITICAL (Must fix before production)

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| C1 | Nav dropdown uses `<a href>` instead of `<Link>` — causes full page reloads on every nav click | `dropdown-navigation.tsx:57,105` | Replace `<a href>` with `<Link to>` from react-router-dom |
| C2 | "Two doors" vs "Three doors" messaging conflict across 7 files | `EngagementCard:16,20`, `ContactPage:42`, `SiteNav:96`, `EngageDoorMotion:8` | Update all to "Three doors" |
| C3 | Dead files `FinalCTA.tsx` and `SiteFooter.tsx` shipped with stale messaging | `FinalCTA.tsx`, `SiteFooter.tsx` | Delete both files |
| C4 | `SectionBackdrop` dust animation missing on non-landing pages — `.dust` CSS only in HeroAboveFold inline style | `SectionBackdrop.tsx:40`, `HeroAboveFold.tsx:52` | Move `dustFloat` keyframe + `.dust` class to `index.css` |
| C5 | `CinematicFooter` uses `position:fixed` inside `clipPath` — broken on iOS Safari | `CinematicFooter.tsx:100-101` | Use `position: sticky` + `translateY` pattern instead |
| C6 | Hero doesn't explain what the product does — "AI agents that ship to production" is developer jargon | `HeroAboveFold.tsx:177` | Rewrite to business-outcome headline |
| C7 | All CTAs use `mailto:` — no calendar booking, no lead capture, no tracking | Multiple (hero, MicroCTA, footer) | Replace with Calendly/Cal.com booking links |

## HIGH (Should fix before launch)

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| H1 | "14 days" vs "2 weeks" inconsistency across 10+ files | Multiple | Standardize to "14 days" everywhere |
| H2 | ICP persona label inconsistency — "IP & compliance risk" vs "IP & compliance" | `ICPSelector.tsx`, `MicroCTA.tsx`, `CinematicFooter.tsx` | Standardize to "IP & compliance risk" |
| H3 | Testimonial quote divergence — Tanaka quote truncated in strip vs full grid | `TestimonialStrip.tsx:7`, `testimonial.tsx:35` | Use identical text in both |
| H4 | `GradientCard` has 8 nested `motion.div` layers per card — heavy on mobile | `gradient-card.tsx` | Convert inner decorative overlays to CSS-only, keep framer-motion only on outer wrapper |
| H5 | `SvgDefs` renders 29 duplicate filter ID sets in DOM | `SvgDefs.tsx` (29 imports) | Render once in `App.tsx` root `<svg>`, remove per-component imports |
| H6 | `color-mix(in oklab)` unsupported in Safari 15 and below | `DeepDiveScrollLayout.tsx:157` | Use pre-computed hex fallback values |
| H7 | No `:focus-visible` styles — keyboard navigation invisible sitewide | `index.css` | Add global focus ring rule |
| H8 | ContactPage hero says "Two doors" but shows four intent cards | `ContactPage.tsx:42` | Fix to "Three doors" or restructure to match |
| H9 | Hero pill badge `fontSize: 22` in uppercase — overshadows H1 headline | `HeroAboveFold.tsx:162` | Reduce to 16px |
| H10 | "Sovereign" is unexplained jargon — never defined on the page | `HeroAboveFold.tsx` | Add definition in hero or sub-headline |
| H11 | "0 hallucination incidents" unsubstantiated — no methodology, no sample size | `ClientsStrip.tsx` | Add specifics or rephrase to "99.1% factual accuracy (n=12.4K)" |
| H12 | ICP selector appears AFTER 3 competing CTAs — visitors confused which to click first | `HeroAboveFold.tsx:210-236` | Move ICP selector above CTAs |
| H13 | `motion` package in `package.json` never imported — duplicate of `framer-motion` | `package.json:22` | Remove `"motion"` dependency |
| H14 | `@types/three` in `dependencies` not `devDependencies` | `package.json:17` | Move to devDependencies |

## MEDIUM (Fix before major demos)

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| M1 | Desktop nav dropdown not keyboard accessible — no `aria-haspopup`, no `aria-expanded` | `dropdown-navigation.tsx:44` | Add ARIA attributes + keyboard handlers |
| M2 | Play/pause button has `title` but no `aria-label` | `PainProofLayout.tsx:118` | Add `aria-label` + `aria-pressed` |
| M3 | QuadGrid expanded cards have no `aria-expanded` state | `QuadGridLayout.tsx:56` | Add `role="button"` + `aria-expanded` |
| M4 | CaseStudies accordion button has no `aria-expanded` | `CaseStudiesPage.tsx:150` | Add `aria-expanded` |
| M5 | SnapScroll dot indicators are `<span onClick>` — not keyboard accessible | `SnapScrollLayout.tsx:182` | Convert to `<button>` with `aria-label` |
| M6 | `rgba(255,255,255,0.45)` text on dark bg fails WCAG AA (3.5:1 ratio) | `CaseStudiesPage.tsx:158`, `TestimonialStrip.tsx:36` | Raise to `rgba(255,255,255,0.60)` minimum |
| M7 | `PageHero` description at 0.65 opacity — borderline contrast | `PageHero.tsx:113` | Raise to 0.75 |
| M8 | `fontSize: 10` on readable metadata — below minimum | `SnapScrollLayout.tsx:134`, `TimelineLayout.tsx:87` | Raise to 12px minimum |
| M9 | DeepDiveScrollLayout inactive frames still run full animations at opacity 0.35 | `DeepDiveScrollLayout.tsx:118` | Use `content-visibility: auto` or conditional render |
| M10 | "Watch demo" button routes to `/contact`, not a demo | `SiteNav.tsx:142` | Change label or route to actual demo |
| M11 | 11 dead component files never imported — creates developer confusion | See dead code list | Delete or archive |
| M12 | Testimonials shown twice (strip + grid) — page bloat | `LandingPage.tsx` | Remove strip, keep grid only |
| M13 | Page is 9 screens — CTA buried at bottom | `LandingPage.tsx` | Collapse to 5-6 screens |

## LOW (Polish)

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| L1 | FAQ tab active state uses `outline` — minor layout shift | `FaqPage.tsx:176` | Use `box-shadow` instead |
| L2 | `CinematicFooter` hardcodes `fontFamily` in 4 inline styles | `CinematicFooter.tsx:126` | Remove redundant overrides |
| L3 | Duplicate `@keyframes blobBreathe` in HeroAboveFold + index.css | `HeroAboveFold.tsx:97`, `index.css:706` | Remove from HeroAboveFold |
| L4 | `App.css` is Vite starter template — never imported | `App.css` | Delete |
| L5 | `SectionBackdrop` SVG filter ID `sectionBlur` duplicated across instances | `SectionBackdrop.tsx:92` | Use unique IDs or global defs |

---

## STORY FLOW ADVISOR RECOMMENDATIONS

1. **Rewrite hero headline** — "Deploy production AI in 14 days. Cut costs 92%. Zero vendor lock-in."
2. **Move ICP selector above CTAs** — let visitors self-identify before seeing buttons
3. **Replace `mailto:` with calendar booking** — Calendly/Cal.com with form capture
4. **Collapse to 1 testimonials section** — drop the strip, keep the grid
5. **Back up "0 hallucination incidents"** — add methodology or rephrase
6. **Name your customers** — or fully anonymize (current halfway approach creates distrust)
7. **Define "sovereign" in the hero** — add one sentence: "On your hardware. In your building. Your data never leaves."
8. **Cut page length from 9 to 5-6 screens** — merge Platform+Agents or remove one

---

## DEAD CODE TO DELETE

| File | Reason |
|------|--------|
| `src/components/SiteFooter.tsx` | Replaced by CinematicFooter |
| `src/components/FinalCTA.tsx` | Merged into CinematicFooter |
| `src/components/AgentDeepDive.tsx` | Replaced by AgentDeepDiveScroll |
| `src/components/WhiteboardHero.tsx` | Never imported |
| `src/components/ScrollyHero.tsx` | Never imported |
| `src/components/TwoDoors.tsx` | Never imported |
| `src/components/CinematicSection.tsx` | Never imported (different from PageCinematicWrap) |
| `src/components/landing-cards/PainCard.tsx` | Replaced by PainProofCard |
| `src/components/landing-cards/ProofCard.tsx` | Only used by dead GridLayout |
| `src/components/landing-cards/GridLayout.tsx` | Only used by dead ProofCard |
| `src/components/landing-cards/DeepDiveLayout.tsx` | Only `Tab` type imported (can be moved) |
| `src/App.css` | Vite starter template, never imported |
