import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { scrollToTarget } from '../lib/lenis';

/**
 * HeroAboveFold — v6: value headline + 3-card GTM gallery.
 *
 * The 7-agent showcase used to live here as a draggable gallery; it has
 * been promoted to its own deck-faithful section <SevenAgentsGrid />
 * rendered immediately below by LandingPage. This component now just
 * carries the hero value prop + 3 large GTM capability cards fanning out.
 */

// Hero proof strip — 4 stats + agent-flow diagram + compliance row.
// Replaces the old stock-photo GTM gallery (Unsplash imagery felt generic
// and didn't reflect the sovereign-AI brand).
const HERO_STATS = [
  { n: '15', label: 'agents live in production' },
  { n: '88%', label: 'no-touch processing rate' },
  { n: '~80%', label: 'cheaper per task vs public AI' },
  { n: '4 wks', label: 'to live · on your servers' },
] as const;

const HERO_COMPLIANCE = ['SOC 2 Type II', 'HIPAA', 'GDPR', 'ISO 27001', 'PCI DSS'] as const;

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

          {/* Live-in-production badge */}
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
              Live in production · 15 agents · Dubai · Pune
            </span>
          </motion.div>

          {/* Eyebrow — brand positioning, anchored to the rest of the site
              (matches /platform · /about · footer "Experts in Sovereign AI for Enterprise") */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-5"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(11px, 1vw, 14px)',
              color: 'rgba(0,0,0,0.55)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Experts in Sovereign AI for Enterprise
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

          {/* Sub-headline — deck-canon positioning, ties the poetic hero to
              the procurement-friendly content below. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="max-w-[680px] mx-auto mb-8"
            style={{
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              lineHeight: 1.55,
              color: 'rgba(0,0,0,0.65)',
              fontFamily: 'var(--apple-sf)',
            }}
          >
            Cost-optimized, secure on-prem, and scalable to millions of documents.{' '}
            <strong style={{ color: '#000000', fontWeight: 600 }}>
              Live in four weeks on your servers
            </strong>{' '}
            — with the numbers in the assessment matching the numbers on the contract.
          </motion.p>

          {/* CTAs — Apple-design-skill polish layer.
              Primary (.apple-pill, Action Blue #0066cc) → /pricing#assessment
              Secondary (.apple-pill-ghost) → smooth-scroll to SevenAgentsGrid
              Pill geometry, SF Pro stack, single-accent interaction model
              all per .design-references/apple-DESIGN.md. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
          >
            <Link to="/pricing#assessment" className="apple-pill">
              Get an assessment <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => scrollToTarget('#seven-agents')}
              className="apple-pill-ghost"
            >
              See how it works <span aria-hidden="true">↓</span>
            </button>
          </motion.div>

          {/*
            Hero proof strip — replaces the old draggable 3-card GTM gallery.
            Deck-faithful: clean mono labels, big Fraunces stat numbers,
            arched-card silhouette + subtle SVG pulse flow for motion.
            Reads in <1s — gives procurement the proof while the rest of
            the page tells the long story.
          */}
          <HeroProofStrip />
        </div>
      </motion.div>
    </section>
  );
}

function HeroProofStrip() {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
      className="mx-auto mt-4 w-full max-w-[1100px]"
    >
      {/* 4-stat row — Fraunces big numbers, mono labels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-8 md:gap-y-0 mb-10">
        {HERO_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.6 + i * 0.08 }}
            className="text-center"
          >
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 600,
                fontStyle: 'italic',
                color: '#0A0A0A',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}
            >
              {s.n}
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11.5,
                color: 'rgba(0,0,0,0.55)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                lineHeight: 1.4,
                maxWidth: 180,
                margin: '0 auto',
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agent-flow diagram — subtle motion, signals "this is software running" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.95 }}
        className="mx-auto mb-7 w-full max-w-[720px]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 720 90" className="w-full h-auto block">
          {/* Soft baseline rule */}
          <line x1="0" y1="55" x2="720" y2="55" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

          {/* 4 nodes — handwritten doc → match → post → cited */}
          {[
            { x: 70,  label: 'Read',  sub: 'any format' },
            { x: 260, label: 'Match', sub: 'three-way' },
            { x: 450, label: 'Post',  sub: '<30s' },
            { x: 640, label: 'Cite',  sub: 'page + line' },
          ].map((n, i) => (
            <g key={n.label}>
              <circle
                cx={n.x}
                cy={55}
                r={i === 2 ? 14 : 11}
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth="1.5"
              />
              {i === 2 && (
                <circle
                  cx={n.x}
                  cy={55}
                  r={6}
                  fill="#0066CC"
                  opacity="0.85"
                />
              )}
              <text
                x={n.x}
                y={20}
                textAnchor="middle"
                fontFamily="var(--serif)"
                fontSize="15"
                fontWeight="600"
                fill="#0A0A0A"
                letterSpacing="-0.01em"
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={85}
                textAnchor="middle"
                fontFamily="var(--mono)"
                fontSize="9.5"
                fontWeight="600"
                fill="rgba(0,0,0,0.50)"
                letterSpacing="1.5"
              >
                {n.sub.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Connecting arrows with a traveling pulse — animates the
              "agent at work" feeling without being decorative noise */}
          {[
            { x1: 81,  x2: 249 },
            { x1: 271, x2: 439 },
            { x1: 464, x2: 629 },
          ].map((seg, i) => (
            <g key={i}>
              <line
                x1={seg.x1}
                y1={55}
                x2={seg.x2}
                y2={55}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth="1.2"
                strokeDasharray="3 4"
              />
              {!reduced && (
                <circle r="2.2" fill="#0066CC">
                  <animate
                    attributeName="cx"
                    from={seg.x1}
                    to={seg.x2}
                    dur="3.4s"
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="55;55;55"
                    dur="3.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="3.4s"
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Compliance pill row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {HERO_COMPLIANCE.map((c) => (
          <span
            key={c}
            className="inline-flex items-center"
            style={{
              background: '#F4F2EE',
              border: '1px solid rgba(0,0,0,0.08)',
              color: '#2B2B2B',
              fontFamily: 'var(--mono)',
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 11px',
              borderRadius: 9999,
            }}
          >
            {c}
          </span>
        ))}
      </motion.div>
    </motion.div>
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
