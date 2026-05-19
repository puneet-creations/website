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
  // Per-route accent color — drives the eyebrow ink, the compliance
  // pill tint, and the "Certified & audited" eyebrow. Should match the
  // corresponding PageHero accent for visual continuity from hero to
  // footer. Defaults to mint (#8af5c0) when omitted.
  accent?: string;
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
      eyebrow: 'EXPERTS IN SOVEREIGN AI',
      headline: 'Sovereign AI agents for enterprise.',
      headlineAccent: 'Live in weeks.',
      pills: ['Cost-optimized', 'Secure · on-prem', 'Scalable · millions'],
      tagline: 'Experts in Sovereign AI for Enterprise.',
      ctaLabel: 'Book a founder call',
      ctaHref: 'mailto:sales@attentions.ai?subject=Founder%20Call',
      accent: '#8af5c0',
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
      accent: '#5b76fe',
    },
  },
  {
    matches: '/agents',
    message: {
      id: 'agents',
      eyebrow: 'AGENTS IN PRODUCTION',
      headline: 'Fifteen shipped.',
      headlineAccent: 'Yours next.',
      pills: ['3 regulated industries', '4-week agent builds', 'Cited \u00b7 auditable'],
      tagline: 'Your fine-tuned weights. Never uploaded.',
      ctaLabel: 'Start your assessment',
      ctaHref: '/pricing#assessment',
      accent: '#8af5c0',
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
      ctaHref: 'mailto:sales@attentions.ai?subject=Security%20Review',
      accent: '#22c55e',
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
      ctaHref: 'mailto:sales@attentions.ai?subject=Assessment%20Kickoff',
      accent: '#5fdc86',
    },
  },
  {
    matches: '/solutions',
    message: {
      id: 'solutions',
      eyebrow: 'YOUR INDUSTRY',
      headline: 'Eleven industries.',
      headlineAccent: 'One sovereign base.',
      pills: ['11 industries', '7 use cases', '4 in production'],
      tagline: 'The same pattern ships in seven more.',
      ctaLabel: 'Find your use case',
      ctaHref: '/agents',
      accent: '#fbbf24',
    },
  },
  {
    matches: '/about',
    message: {
      id: 'about',
      eyebrow: 'DUBAI \u00b7 PUNE',
      headline: 'Eighteen experts.',
      headlineAccent: 'Founders on the call.',
      pills: ['18 experts', 'Dubai \u00b7 Pune', 'Founders reply'],
      tagline: 'No sales funnel. Reply in 4 business hours.',
      ctaLabel: 'Talk to a founder',
      ctaHref: '/contact',
      accent: '#94a3b8',
    },
  },
  {
    matches: '/competitors',
    message: {
      id: 'competitors',
      eyebrow: 'PAST THE ALTERNATIVES',
      headline: 'They licence a wrapper.',
      headlineAccent: 'You ship sovereign.',
      pills: ['Own your weights', 'Own your data', 'Own the audit trail'],
      tagline: 'Pick the architecture, not the SaaS.',
      ctaLabel: 'Compare your options',
      ctaHref: '/pricing',
      accent: '#f97316',
    },
  },
  {
    matches: '/why-generic-fail',
    message: {
      id: 'why-generic-fail',
      eyebrow: 'WHY GENERIC FAILS',
      headline: 'Generic guesses.',
      headlineAccent: 'Sovereign cites.',
      pills: ['Hallucination-controlled', 'Page + line cited', 'On your servers'],
      tagline: 'The wrong tool shipped fast is still the wrong tool.',
      ctaLabel: 'See the sovereign way',
      ctaHref: '/platform',
      accent: '#ef4444',
    },
  },
  {
    matches: '/faq',
    message: {
      id: 'faq',
      eyebrow: 'STILL A QUESTION',
      headline: 'Honest answers.',
      headlineAccent: 'From the founders.',
      pills: ['Reply in 4 hrs', 'No sales funnel', 'Direct to founders'],
      tagline: 'If it\u2019s not in the FAQ, ask us directly.',
      ctaLabel: 'Ask a founder',
      ctaHref: '/contact',
      accent: '#06b6d4',
    },
  },
  {
    matches: '/press',
    message: {
      id: 'press',
      eyebrow: 'PRESS \u00b7 MILESTONES',
      headline: 'On the record.',
      headlineAccent: 'Off the marketing.',
      pills: ['Reference customers', 'Audit-grade', 'No PR fog'],
      tagline: 'Reference under a confidentiality agreement.',
      ctaLabel: 'Press enquiries',
      ctaHref: 'mailto:sales@attentions.ai?subject=Press%20Enquiry',
      accent: '#a78bfa',
    },
  },
  {
    matches: '/agents/*',
    message: {
      id: 'agent-case',
      eyebrow: 'YOU SAW THE CASE',
      headline: 'Your agent next.',
      headlineAccent: 'Four weeks. Fixed fee.',
      pills: ['Scope in 2 wks', 'Live in 4 wks', 'On your servers'],
      tagline: 'The same pattern, scoped to your business.',
      ctaLabel: 'Scope your agent',
      ctaHref: '/pricing#assessment',
      accent: '#0066cc',
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
      ctaHref: 'mailto:sales@attentions.ai?subject=Founder%20Call',
      accent: '#8af5c0',
    },
  },
];

/**
 * Resolve the FooterMessage for a given pathname. First-match-wins over
 * FOOTER_MESSAGES; '*' always matches. The final entry MUST have
 * matches:'*' so this function can never return undefined.
 *
 * Match types supported:
 *   - '*'             — catch-all sentinel (always last)
 *   - '/exact/path'   — string equality
 *   - '/prefix/*'     — wildcard suffix; matches anything under /prefix/
 *                       (e.g. '/agents/*' matches '/agents/invoice-intelligence')
 *   - ['/a', '/b']    — any of these exact paths
 */
function matchesPath(matcher: string, pathname: string): boolean {
  if (matcher === '*') return true;
  if (matcher.endsWith('/*')) {
    return pathname.startsWith(matcher.slice(0, -1)); // keep the trailing slash
  }
  return matcher === pathname;
}

export function resolveFooterMessage(pathname: string): FooterMessage {
  for (const entry of FOOTER_MESSAGES) {
    if (entry.matches === '*') return entry.message;
    if (Array.isArray(entry.matches)) {
      if (entry.matches.some((m) => matchesPath(m, pathname))) return entry.message;
    } else if (matchesPath(entry.matches, pathname)) {
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
