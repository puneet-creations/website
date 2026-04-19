// src/data/footerMessages.ts
//
// Per-route message content for CinematicFooter. The footer resolves
// the active variant by pathname — everything below the message block
// (compliance strip, 5-column link grid, legal row) is NOT covered
// here, that stays identical across routes.
//
// Readability guardrails — DO NOT exceed these on edits:
//   eyebrow         ≤ 22 chars  (12px mono uppercase, 0.12em track)
//   headline + accent combined ≤ 60 chars (Fraunces clamp(36-72px))
//   each pill       ≤ 22 chars  (13px, 3-up flex row)
//   tagline         ≤ 55 chars  (15px Fraunces italic, one line)
//   ctaLabel        ≤ 28 chars  (14px mono uppercase)
//
// Pills are typed as a 3-tuple so the layout can't silently drift
// to 2 or 4. If you need a different count, change the component,
// not the type.

export type FooterMessage = {
  id: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  pills: [string, string, string];
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
};

type FooterMessageEntry = {
  matches: string | string[] | '*';
  message: FooterMessage;
};

// Ordered — first match wins. The '*' entry is the fallback default
// and must be last.
export const FOOTER_MESSAGES: readonly FooterMessageEntry[] = [
  {
    matches: '/',
    message: {
      id: 'landing',
      eyebrow: 'FOUNDER FIRST',
      headline: 'Sovereign AI and production agents on the',
      headlineAccent: 'artiGen Platform.',
      pills: ['Secure by architecture', 'Fixed low cost', 'ROI in weeks'],
      tagline: "Don't hand your IP to public AI.",
      ctaLabel: 'Book a founder call',
      ctaHref: 'mailto:hello@attentions.ai?subject=Founder%20Call',
    },
  },
  {
    matches: '/platform',
    message: {
      id: 'platform',
      eyebrow: 'PLATFORM',
      headline: 'Six shared layers.',
      headlineAccent: 'Your agents on top.',
      pills: ['Deterministic', 'Cited outputs', 'On your hardware'],
      tagline: 'Architectural, not contractual.',
      ctaLabel: 'See agents in production',
      ctaHref: '/agents#agent-deep-dive',
    },
  },
  {
    matches: '/agents',
    message: {
      id: 'agents',
      eyebrow: 'AGENTS IN PRODUCTION',
      headline: 'Five shipped.',
      headlineAccent: 'Yours next.',
      pills: ['Live at 3 clients', '4\u20138 week builds', 'Signed & versioned'],
      tagline: 'Your fine-tuned weights. Never uploaded.',
      ctaLabel: 'Start your assessment',
      ctaHref: '/pricing#assessment',
    },
  },
  {
    matches: '/security',
    message: {
      id: 'security',
      eyebrow: 'SOVEREIGN BY DESIGN',
      headline: 'The data never leaves.',
      headlineAccent: 'Period.',
      pills: ['On-prem default', 'Air-gapped option', 'Zero incidents'],
      tagline: 'Compliance is structural \u2014 not retrofitted.',
      ctaLabel: 'Request a security review',
      ctaHref: 'mailto:hello@attentions.ai?subject=Security%20Review',
    },
  },
  {
    matches: ['/pricing', '/contact'],
    message: {
      id: 'conversion',
      eyebrow: 'READY TO SHIP',
      headline: 'Fixed cost.',
      headlineAccent: 'Production in 4\u20138 weeks.',
      pills: ['No seat licenses', 'No data leaves', 'ROI in weeks'],
      tagline: 'Pilot \u2192 Production \u2192 Yours.',
      ctaLabel: 'Kick off the assessment',
      ctaHref: 'mailto:hello@attentions.ai?subject=Assessment%20Kickoff',
    },
  },
  {
    matches: '*',
    message: {
      id: 'default',
      eyebrow: 'FOUNDER FIRST',
      headline: 'Questions worth asking.',
      headlineAccent: 'Answered in 30 minutes.',
      pills: ['Direct to founders', 'No sales funnel', 'Reply in 4 hrs'],
      tagline: "Don't hand your IP to public AI.",
      ctaLabel: 'Book a founder call',
      ctaHref: 'mailto:hello@attentions.ai?subject=Founder%20Call',
    },
  },
];

/**
 * Resolve the FooterMessage for a given pathname. First-match-wins over
 * FOOTER_MESSAGES; '*' always matches. The final entry MUST have
 * matches:'*' so this function can never return undefined.
 */
export function resolveFooterMessage(pathname: string): FooterMessage {
  for (const entry of FOOTER_MESSAGES) {
    // '*' is our sentinel for "always matches", not a real pathname —
    // React Router pathnames are always '/'-prefixed, never literally '*'.
    if (entry.matches === '*') return entry.message;
    if (Array.isArray(entry.matches)) {
      if (entry.matches.includes(pathname)) return entry.message;
    } else if (entry.matches === pathname) {
      return entry.message;
    }
  }
  // Unreachable — '*' entry always matches. TS narrows on the loop
  // so we need this for exhaustiveness.
  return FOOTER_MESSAGES[FOOTER_MESSAGES.length - 1].message;
}

// ---------------------------------------------------------------------
// Dev-time invariants. Runs once at module load in development builds
// to catch the easy mistakes (wildcard entry missing, wrong position).
// Stripped from production by Vite's dead-code elimination on the
// `import.meta.env.DEV` constant.
// ---------------------------------------------------------------------
if (import.meta.env.DEV) {
  const last = FOOTER_MESSAGES[FOOTER_MESSAGES.length - 1];
  if (!last || last.matches !== '*') {
    throw new Error(
      "footerMessages: the last entry in FOOTER_MESSAGES must have matches:'*' " +
      "(the catch-all sentinel). Move it to the bottom or add one — otherwise " +
      "resolveFooterMessage() can return undefined at runtime."
    );
  }
}
