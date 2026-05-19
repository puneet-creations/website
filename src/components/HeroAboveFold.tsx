import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroGallery } from './ui/hero-gallery';
import { scrollToTarget } from '../lib/lenis';

/**
 * HeroAboveFold — v6: value headline + 3-card GTM gallery.
 *
 * The 7-agent showcase used to live here as a draggable gallery; it has
 * been promoted to its own deck-faithful section <SevenAgentsGrid />
 * rendered immediately below by LandingPage. This component now just
 * carries the hero value prop + 3 large GTM capability cards fanning out.
 */

const gtmCards = [
  {
    id: 1, order: 0, x: '-460px', y: '10px', zIndex: 30, direction: 'left' as const,
    label: 'Agents in Production', sublabel: '15 agents · 3 industries', metric: '88%',
    details: 'Zero security incidents on record. Live in logistics, automotive, and healthcare.',
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

// (7-agent showcase moved to <SevenAgentsGrid /> — see LandingPage.)

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

          {/* CTAs
              Primary → /pricing#assessment (deck S03 assessment door, with explicit $5K price)
              Secondary → smooth-scroll to the SevenAgentsGrid section on this page */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <Link
              to="/pricing#assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-[14px] hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ background: '#000000', color: '#ffffff', fontFamily: 'var(--mono)', letterSpacing: '0.04em', textDecoration: 'none' }}
            >
              Get an assessment →
            </Link>
            <button
              type="button"
              onClick={() => scrollToTarget('#seven-agents')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-[14px] hover:bg-white/[0.08] transition-colors"
              style={{ background: 'rgba(0,0,0,0.04)', backdropFilter: 'blur(8px)', color: 'rgba(0,0,0,0.85)', fontFamily: 'var(--mono)', letterSpacing: '0.04em', border: '1px solid rgba(0,0,0,0.12)' }}
            >
              See how it works ↓
            </button>
          </motion.div>

          {/* GTM Gallery — 3 capability cards */}
          <HeroGallery cards={gtmCards} animationDelay={0.6} large />
          {/*
            Note: the 7-agent showcase formerly lived here as a draggable
            HeroGallery. It has been promoted to its own deck-faithful
            section <SevenAgentsGrid /> rendered by LandingPage right after
            HeroAboveFold — arched cards, deck-canon content, foundation
            strip. The trust row was redundant with the SevenAgentsGrid's
            domain labels + ClientsStrip's metrics, so it has been removed.
          */}
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
