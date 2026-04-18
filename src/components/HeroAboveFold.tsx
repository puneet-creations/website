import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroGallery } from './ui/hero-gallery';

/**
 * HeroAboveFold — v5: animated card gallery + value headline.
 *
 * Two gallery rows: 3 GTM cards (Sovereign, Production, Secure) fanning out,
 * then 5 Agent cards below. Cards are draggable with spring physics.
 * Aurora glow background, staggered entrance animations.
 */

/* ── SVG icons for cards — darker outlines for readability on white cards ── */
/* eslint-disable @typescript-eslint/no-unused-vars */
function InvoiceIcon({ accent: _a }: { accent: string }) {
  return (<svg className="w-full h-full" viewBox="0 0 120 120" fill="none"><rect x="26" y="16" width="68" height="88" rx="6" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.55)" strokeWidth="2"/><line x1="40" y1="40" x2="80" y2="40" stroke="rgba(0,0,0,0.45)" strokeWidth="2"/><line x1="40" y1="52" x2="72" y2="52" stroke="rgba(0,0,0,0.40)" strokeWidth="2"/><line x1="40" y1="64" x2="66" y2="64" stroke="rgba(0,0,0,0.35)" strokeWidth="2"/><path d="M55 78L62 85L76 71" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>);
}
function GraphIcon({ accent: _a }: { accent: string }) {
  return (<svg className="w-full h-full" viewBox="0 0 120 120" fill="none"><circle cx="40" cy="38" r="10" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.55)" strokeWidth="1.8"/><circle cx="86" cy="34" r="10" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.55)" strokeWidth="1.8"/><circle cx="60" cy="80" r="10" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.55)" strokeWidth="1.8"/><circle cx="92" cy="84" r="8" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8"/><line x1="48" y1="46" x2="54" y2="72" stroke="rgba(0,0,0,0.50)" strokeWidth="1.8"/><line x1="80" y1="42" x2="66" y2="72" stroke="rgba(0,0,0,0.50)" strokeWidth="1.8"/><line x1="70" y1="80" x2="84" y2="82" stroke="rgba(0,0,0,0.40)" strokeWidth="1.8"/></svg>);
}
function MicIcon({ accent: _a }: { accent: string }) {
  return (<svg className="w-full h-full" viewBox="0 0 120 120" fill="none"><rect x="46" y="22" width="28" height="44" rx="14" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.60)" strokeWidth="2.2"/><path d="M34 60C34 74 46 84 60 84C74 84 86 74 86 60" stroke="rgba(0,0,0,0.50)" strokeWidth="2.2" fill="none"/><line x1="60" y1="84" x2="60" y2="98" stroke="rgba(0,0,0,0.45)" strokeWidth="2.2"/><line x1="46" y1="98" x2="74" y2="98" stroke="rgba(0,0,0,0.45)" strokeWidth="2.2" strokeLinecap="round"/></svg>);
}
function PhoneIcon({ accent: _a }: { accent: string }) {
  return (<svg className="w-full h-full" viewBox="0 0 120 120" fill="none"><rect x="34" y="16" width="52" height="88" rx="10" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.55)" strokeWidth="2.2"/><circle cx="60" cy="88" r="6" fill="rgba(0,0,0,0.06)" stroke="rgba(0,0,0,0.50)" strokeWidth="1.8"/><rect x="42" y="30" width="36" height="40" rx="4" fill="rgba(0,0,0,0.05)"/><text x="60" y="55" textAnchor="middle" fontFamily="var(--mono)" fontSize="16" fontWeight="700" fill="#000000">24/7</text></svg>);
}
function MatchIcon({ accent: _a }: { accent: string }) {
  return (<svg className="w-full h-full" viewBox="0 0 120 120" fill="none"><rect x="12" y="28" width="40" height="26" rx="5" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.50)" strokeWidth="1.8"/><rect x="12" y="66" width="40" height="26" rx="5" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.50)" strokeWidth="1.8"/><rect x="68" y="47" width="40" height="26" rx="5" fill="rgba(0,0,0,0.05)" stroke="rgba(0,0,0,0.60)" strokeWidth="2.2"/><line x1="52" y1="41" x2="68" y2="56" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8"/><line x1="52" y1="79" x2="68" y2="64" stroke="rgba(0,0,0,0.45)" strokeWidth="1.8"/><path d="M78 56L85 63L99 49" stroke="#000000" strokeWidth="2.8" strokeLinecap="round" fill="none"/></svg>);
}

const gtmCards = [
  {
    id: 1, order: 0, x: '-460px', y: '10px', zIndex: 30, direction: 'left' as const,
    label: 'Agents in Production', sublabel: '5 agents · 3 industries', metric: '88%',
    details: 'Zero hallucination incidents. Live at Thomson Group, Daimler Asia, Qira Labs.',
    accent: '#8af5c0',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&h=800&fit=crop',
  },
  {
    id: 2, order: 1, x: '0px', y: '0px', zIndex: 40, direction: 'right' as const,
    label: 'Sovereign AI', sublabel: 'On-prem · Zero data out', metric: '0 bytes',
    details: 'No data to external LLMs. Custom-trained models. IP stays with you.',
    accent: '#5b76fe',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&h=800&fit=crop',
  },
  {
    id: 3, order: 2, x: '460px', y: '15px', zIndex: 20, direction: 'right' as const,
    label: 'Enterprise Context', sublabel: 'SLMs · Integrations · Workflow', metric: '6 layers',
    details: 'Domain-tuned models. ERP/CRM connectors. Workflow-aligned agents.',
    accent: '#ffd080',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=800&fit=crop',
  },
];

const agentCards = [
  {
    id: 11, order: 0, x: '-744px', y: '8px', zIndex: 50, direction: 'left' as const,
    label: 'Invoice Intelligence', sublabel: 'Thomson Group · Dubai', metric: '88%',
    details: 'Reads any format. Matches the PO, posts to SAP in under 30 seconds.',
    accent: '#8af5c0', icon: InvoiceIcon,
  },
  {
    id: 12, order: 1, x: '-372px', y: '20px', zIndex: 40, direction: 'left' as const,
    label: 'PCR Intelligence', sublabel: 'Daimler Asia', metric: '1.2M',
    details: 'Knowledge graph across 1.2M+ reports. Root cause in hours.',
    accent: '#8ea6ff', icon: GraphIcon,
  },
  {
    id: 13, order: 2, x: '0px', y: '5px', zIndex: 30, direction: 'right' as const,
    label: 'Voice AI · SOAP', sublabel: 'Qira Labs · 38 clinics', metric: '~30s',
    details: 'Listens on-prem. Audio discarded. SOAP + ICD-10 synced to EHR.',
    accent: '#f5a8d4', icon: MicIcon,
  },
  {
    id: 14, order: 3, x: '372px', y: '25px', zIndex: 20, direction: 'right' as const,
    label: 'Patient Experience OS', sublabel: 'Qira Labs · 24/7', metric: '$400K+',
    details: 'Every call answered 24/7. Orchestrates 6-12 tools without replacing any.',
    accent: '#ffd080', icon: PhoneIcon,
  },
  {
    id: 15, order: 4, x: '744px', y: '12px', zIndex: 10, direction: 'left' as const,
    label: 'Voucher Matching', sublabel: 'Thomson Group · Dubai', metric: '5 min',
    details: '6 doc types per packet. Cross-matched, flagged before payment.',
    accent: '#a0dc8c', icon: MatchIcon,
  },
];

export default function HeroAboveFold() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#ffffff' }}
    >
      {/* Background */}
      <div className="cf-grid absolute inset-0 pointer-events-none" />

      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[80vw] h-[50vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(138,245,192,0.08) 0%, rgba(91,118,254,0.06) 40%, transparent 70%)', filter: 'blur(80px)', animation: 'cf-breathe 8s ease-in-out infinite alternate' }} />
        <div className="absolute left-[10%] bottom-[5%] w-[40vw] h-[30vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(91,118,254,0.05) 0%, transparent 60%)', filter: 'blur(60px)', animation: 'cf-breathe 12s ease-in-out infinite alternate-reverse' }} />
        <div className="absolute right-[10%] top-[60%] w-[30vw] h-[25vh] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,168,212,0.04) 0%, transparent 60%)', filter: 'blur(50px)', animation: 'cf-breathe 10s ease-in-out infinite alternate' }} />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <Dust />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12"
        style={{ minHeight: '100vh', y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[1000px] mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{ background: 'rgba(138,245,192,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(138,245,192,0.15)' }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" style={{ background: '#4ade80' }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: '#4ade80' }} />
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, color: '#000000' }}>
              Live in production
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="leading-[0.95] mb-6"
            style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(40px, 6.5vw, 84px)', letterSpacing: '-0.03em', color: '#000000' }}
          >
            Agentic AI. Total Sovereignty.
            <br />
            <span className="italic" style={{ color: '#000000' }}>Zero Concessions.</span>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <a
              href="mailto:hello@attentions.ai?subject=Assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[14px] hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ background: '#000000', color: '#ffffff', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}
            >
              Get an assessment →
            </a>
            <button
              type="button"
              onClick={() => document.getElementById('production-proof')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-[14px] hover:bg-white/[0.08] transition-colors"
              style={{ background: 'rgba(0,0,0,0.04)', backdropFilter: 'blur(8px)', color: 'rgba(0,0,0,0.85)', fontFamily: 'var(--mono)', letterSpacing: '0.04em', border: '1px solid rgba(0,0,0,0.12)' }}
            >
              See how it works ↓
            </button>
          </motion.div>

          {/* GTM Gallery — 3 capability cards */}
          <HeroGallery cards={gtmCards} animationDelay={0.6} large />

          {/* Section headline between galleries */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="leading-[0.95] mt-16 mb-8"
            style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(36px, 5.5vw, 72px)', letterSpacing: '-0.03em', color: '#000000' }}
          >
            Agents live in{' '}
            <span className="italic">Production.</span>
          </motion.h2>

          {/* Agent Gallery — 5 cards */}
          <HeroGallery cards={agentCards} animationDelay={1.2} dropIn />

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-4"
          >
            {[
              { name: 'Thomson Group', industry: 'Logistics · Dubai', color: '#000000' },
              { name: 'Daimler Asia', industry: 'Auto OEM · SE Asia', color: '#8ea6ff' },
              { name: 'Qira Labs', industry: '38 Clinics · SF', color: '#f5a8d4' },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className="text-[14px] font-medium text-black">{c.name}</span>
                <span className="text-[14px]" style={{ color: 'rgba(0,0,0,0.60)' }}>{c.industry}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Dust() {
  const p = Array.from({ length: 18 }).map((_, i) => ({
    left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`, size: 1.5 + (i % 3),
    dx: ((i * 13) % 60) - 30, dy: -40 - ((i * 17) % 80), dur: 16 + (i % 10),
    delay: (i * 1.1) % 16, opacity: 0.25 + ((i * 11) % 30) / 100,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      {p.map((d, i) => (
        <span key={i} className="dust" style={{ left: d.left, top: d.top, width: d.size, height: d.size,
          '--dx': `${d.dx}px`, '--dy': `${d.dy}px`, '--dur': `${d.dur}s`, '--delay': `${d.delay}s`, '--o': d.opacity,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}
