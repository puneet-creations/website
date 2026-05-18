// src/components/landing/AgentPlatformStack.tsx
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { FileText, GitBranch, Mic, Phone, Receipt, Award, ShieldAlert, Plus, Sparkles, ArrowRight } from 'lucide-react';
import {
  BEATS,
  INDUSTRIES,
  AGENTS,
  PLATFORM_LAYERS,
  ENGAGEMENT_OPTIONS,
  activeBeatForProgress,
  type Beat,
  type BeatId,
} from '../../data/agentPlatformStack';
import { useSplitText } from '../../hooks/useSplitText';
import AgentPlatformStackMobile from './AgentPlatformStackMobile';

const ICON_MAP = { FileText, GitBranch, Mic, Phone, Receipt, Award, ShieldAlert, Plus } as const;

export default function AgentPlatformStack() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const reduced = useReducedMotion() ?? false;

  const [activeBeat, setActiveBeat] = useState<Beat>(BEATS[0]);
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = activeBeatForProgress(p);
    setActiveBeat((prev) => (prev.id === next.id ? prev : next));
  });

  const industryY = useTransform(scrollYProgress, [0, 1], reduced ? ['0px', '0px'] : ['-48px', '48px']);
  const agentY    = useTransform(scrollYProgress, [0, 1], reduced ? ['0px', '0px'] : ['-20px', '20px']);
  const layerY    = useTransform(scrollYProgress, [0, 1], reduced ? ['0px', '0px'] : ['-8px',  '8px']);

  return (
    <section
      ref={containerRef}
      className="relative wow-section-outer"
      style={{ background: 'var(--wow-bg, #0a0e18)' }}
    >
      <div
        className="w-full overflow-hidden h-auto lg:h-screen wow-section-inner"
        style={{ top: 0 }}
      >
        <BackgroundLayers />

        <div className="hidden lg:grid h-full grid-cols-[40fr_60fr]">
          <CopyPanel activeBeat={activeBeat} reduced={reduced} />
          <IllustrationPanel
            activeBeat={activeBeat}
            industryY={industryY}
            agentY={agentY}
            layerY={layerY}
            scrollYProgress={scrollYProgress}
          />
        </div>

        <div className="lg:hidden">
          <AgentPlatformStackMobile />
        </div>
      </div>
    </section>
  );
}

function BackgroundLayers() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div
        className="wow-teal-pulse absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(138,245,192,0.04), transparent 70%)',
          animation: 'wowTealPulse 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <style>{`
        @keyframes wowTealPulse {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
        .wow-section-outer { height: auto; }
        .wow-section-inner { position: static; }
        @media (min-width: 1024px) {
          .wow-section-outer { height: 310vh; }
          .wow-section-inner { position: sticky; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wow-teal-pulse { animation: none !important; }
          .wow-section-outer { height: auto; }
          .wow-section-inner { position: static; }
        }
      `}</style>
    </div>
  );
}

function CopyPanel({ activeBeat, reduced }: { activeBeat: Beat; reduced: boolean }) {
  const beatIdx = BEATS.findIndex((b) => b.id === activeBeat.id);
  const totalBeats = BEATS.length;
  const copy = getBeatCopy(activeBeat.id);
  const headlineRef = useSplitText<HTMLHeadingElement>([activeBeat.id, reduced]);

  return (
    <div className="h-full flex flex-col justify-center px-10 lg:px-12 py-10 relative z-10">
      <motion.div
        key={activeBeat.id}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div
          className="mb-5"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--wow-teal, #8af5c0)',
          }}
        >
          {copy.eyebrow}
        </div>

        <h2
          ref={headlineRef}
          className="mb-5 text-white"
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.4vw, 68px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
          // SAFETY: copy.headline is always a hardcoded literal from getBeatCopy.
          // Never pass user/CMS input here without sanitizing <em>-only markup.
          dangerouslySetInnerHTML={{ __html: copy.headline }}
        />

        <p
          className="mb-7 max-w-[540px]"
          style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.70)',
          }}
        >
          {copy.subline}
        </p>

        {/* Big metric block — fills empty vertical space, matches deck case-study cadence */}
        {copy.metric && (
          <div
            className="flex items-baseline gap-4 pt-6 mb-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
          >
            <span
              className="leading-none"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(48px, 5.5vw, 84px)',
                fontWeight: 600,
                fontStyle: 'italic',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {copy.metric}
            </span>
            <span
              className="max-w-[260px]"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.35,
              }}
            >
              {copy.metricLabel}
            </span>
          </div>
        )}

        {/* Four-promises chip-row reminder — anchors the deck pillars without consuming much space */}
        {copy.metric && (
          <div className="flex flex-wrap gap-2 max-w-[520px]">
            {['Sovereign', 'Deterministic', 'Cost-effective', 'Scalable'].map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(138,245,192,0.20)',
                  color: 'rgba(255,255,255,0.70)',
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '5px 11px',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      <div
        className="absolute bottom-8 left-10 lg:left-12"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 12,
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        {String(beatIdx + 1).padStart(2, '0')} / {String(totalBeats).padStart(2, '0')}
      </div>
    </div>
  );
}

type IllustrationPanelProps = {
  activeBeat: Beat;
  industryY: MotionValue<string>;
  agentY: MotionValue<string>;
  layerY: MotionValue<string>;
  scrollYProgress: MotionValue<number>;
};

function IllustrationPanel({
  activeBeat,
  industryY,
  agentY,
  layerY,
  scrollYProgress,
}: IllustrationPanelProps) {
  if (activeBeat.id === 'synthesis') {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-12 relative z-10 gap-5">
        <div className="grid grid-cols-3 gap-4">
          {ENGAGEMENT_OPTIONS.map((opt, i) => (
            <EngagementCard key={opt.id} option={opt} delayIndex={i} />
          ))}
        </div>
        {/* Platform-layer reminder strip — keeps "platform underneath everything" visible in synthesis */}
        <div className="flex gap-2">
          {PLATFORM_LAYERS.map((layer) => (
            <div
              key={layer.n}
              className="flex-1 rounded-[8px] px-2 py-1.5 flex items-center gap-2 min-w-0"
              style={{ background: layer.tint, border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', fontFamily: 'var(--mono)' }}
              >
                {String(layer.n).padStart(2, '0')}
              </span>
              <span className="text-white text-[10px] font-bold leading-tight">{layer.title}</span>
            </div>
          ))}
        </div>
        <div
          className="text-[rgba(255,255,255,0.40)] text-[11px] text-center tracking-wider uppercase"
          style={{ fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}
        >
          All agents share the same 6-layer sovereign platform · on your hardware
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative px-6 py-10 flex flex-col gap-3 z-10">
      {/* 7 industries — single row */}
      <motion.div style={{ y: industryY, height: '22%' }} className="grid grid-cols-7 gap-1.5">
        {INDUSTRIES.map((ind) => (
          <IndustryTile key={ind.id} industry={ind} isActive={activeBeat.id === ind.id} />
        ))}
      </motion.div>

      {/* 7 agents + Build — 4-column wrap (2 rows × 4) so each card has breathing room */}
      <motion.div style={{ y: agentY, height: '46%' }} className="grid grid-cols-4 gap-2">
        {AGENTS.map((a) => (
          <AgentCard key={a.id} agent={a} isActive={activeBeat.id === a.id} />
        ))}
      </motion.div>

      <motion.div style={{ y: layerY, height: '32%' }} className="flex flex-col gap-1.5 justify-end">
        {PLATFORM_LAYERS.map((layer) => (
          <PlatformLayerBand key={layer.n} layer={layer} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
    </div>
  );
}

function IndustryTile({ industry, isActive }: { industry: typeof INDUSTRIES[number]; isActive: boolean }) {
  return (
    <motion.div
      className="relative flex-1 rounded-[14px] overflow-hidden"
      animate={{
        scale: isActive ? 1.0 : 0.88,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        outline: isActive ? '2px solid rgba(138,245,192,0.6)' : '2px solid transparent',
        boxShadow: isActive ? '0 0 40px rgba(138,245,192,0.15)' : 'none',
      }}
    >
      <img
        src={industry.photoUrl}
        alt=""
        role="presentation"
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        style={{
          filter: `grayscale(${isActive ? '0%' : '60%'}) contrast(1.05) brightness(0.85)`,
          transition: 'filter 500ms ease',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 p-2"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
        }}
      >
        <div
          className="text-white text-[11px] font-bold uppercase tracking-wider leading-tight"
          style={{ fontFamily: 'var(--mono)' }}
        >
          {industry.name}
        </div>
      </div>
    </motion.div>
  );
}

function AgentCard({ agent, isActive }: { agent: typeof AGENTS[number]; isActive: boolean }) {
  const Icon = ICON_MAP[agent.iconKey] ?? Plus;
  const isBuildPlaceholder = agent.id === 'build';
  const href = isBuildPlaceholder ? '/pricing#assessment' : '/agents#agent-deep-dive';

  return (
    <motion.a
      href={href}
      aria-label={`${agent.name} — ${agent.domainLabel}`}
      className="relative flex-1 rounded-[14px] p-3 flex flex-col gap-1.5 no-underline cursor-pointer"
      animate={{
        scale: isActive ? 1.08 : 0.94,
        opacity: isActive || isBuildPlaceholder ? 1 : 0.55,
      }}
      whileHover={{ scale: isActive ? 1.12 : 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: isBuildPlaceholder
          ? '2px dashed rgba(138,245,192,0.5)'
          : `2px solid ${isActive ? 'rgba(138,245,192,0.7)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isActive ? '0 0 40px rgba(138,245,192,0.15)' : 'none',
      }}
    >
      <div className="flex items-center justify-between">
        <Icon size={18} style={{ color: isActive || isBuildPlaceholder ? '#8af5c0' : 'rgba(255,255,255,0.55)' }} />
        {isActive && !isBuildPlaceholder ? (
          <MotionPreview agentId={agent.id} />
        ) : isBuildPlaceholder ? (
          <Sparkles size={12} style={{ color: 'rgba(138,245,192,0.7)' }} />
        ) : (
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              color: '#8af5c0',
              background: 'rgba(138,245,192,0.12)',
              fontFamily: 'var(--mono)',
              letterSpacing: '0.1em',
            }}
          >
            LIVE
          </span>
        )}
      </div>
      <div
        className="text-[rgba(138,245,192,0.70)] text-[10px] font-bold uppercase leading-tight"
        style={{ fontFamily: 'var(--mono)', letterSpacing: '0.08em' }}
      >
        {agent.domainLabel}
      </div>
      <div
        className="text-white text-[13px] font-bold leading-tight"
        style={{ letterSpacing: '-0.01em' }}
      >
        {agent.name}
      </div>
      <div className="text-[12px] text-[rgba(255,255,255,0.55)] leading-snug">
        {agent.flow}
      </div>
    </motion.a>
  );
}

function MotionPreview({ agentId }: { agentId: string }) {
  const color = '#8af5c0';
  // Respect prefers-reduced-motion — SMIL <animate>/<animateTransform> children
  // ignore the media query on their own, so we gate them here at render-time.
  // Shapes stay visible; only the motion is stripped.
  const reduced = useReducedMotion() ?? false;
  switch (agentId) {
    case 'invoice':
      return (
        <svg width={40} height={20} aria-hidden>
          <rect x="2" y="4" width="36" height="12" rx="2" fill="rgba(138,245,192,0.08)" stroke={color} strokeWidth="0.8" />
          <rect x="4" y="4" width="36" height="2" fill={color} opacity="0.4">
            {!reduced && <animate attributeName="y" from="4" to="14" dur="1.6s" repeatCount="indefinite" />}
          </rect>
        </svg>
      );
    case 'pcr':
      return (
        <svg width={40} height={20} aria-hidden>
          <circle cx="8" cy="10" r="2.5" fill={color} opacity="0.7">
            {!reduced && <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />}
          </circle>
          <line x1="8" y1="10" x2="20" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <circle cx="20" cy="10" r="2" fill={color} opacity="0.7" />
          <line x1="20" y1="10" x2="32" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <circle cx="32" cy="10" r="2.5" fill={color} opacity="0.7">
            {!reduced && <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.4s" repeatCount="indefinite" />}
          </circle>
        </svg>
      );
    case 'voice':
      return (
        <svg width={40} height={20} aria-hidden>
          {[4, 10, 16, 22, 28, 34].map((x, i) => (
            <rect key={i} x={x} y="6" width="2" height="8" fill={color} opacity="0.7">
              {!reduced && (
                <>
                  <animate attributeName="height" values={`4;${8 + (i % 3) * 3};4`} dur={`${1 + (i % 3) * 0.2}s`} repeatCount="indefinite" />
                  <animate attributeName="y" values={`8;${6 - (i % 3)};8`} dur={`${1 + (i % 3) * 0.2}s`} repeatCount="indefinite" />
                </>
              )}
            </rect>
          ))}
        </svg>
      );
    case 'patient':
      return (
        <svg width={40} height={20} aria-hidden>
          <line x1="2" y1="10" x2="38" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          {[8, 16, 24, 32].map((x, i) => (
            <circle key={i} cx={x} cy="10" r="1.5" fill={color}>
              {!reduced && <animate attributeName="r" values="1.5;3;1.5" dur="1.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </svg>
      );
    case 'voucher':
      return (
        <svg width={40} height={20} aria-hidden>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={8 + i * 8} y={3 + i * 1.5} width="18" height="10" rx="1" fill="rgba(138,245,192,0.08)" stroke={color} strokeWidth="0.6">
              {!reduced && <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="1.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" />}
            </rect>
          ))}
        </svg>
      );
    case 'tender':
      return (
        <svg width={40} height={20} aria-hidden>
          {/* Three quote bars converging to one landed-cost line */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={3} y={3 + i * 5} width={10 + i * 4} height="3" rx="1" fill={color} opacity={0.45 + i * 0.18}>
              {!reduced && <animate attributeName="width" values={`${8 + i * 3};${10 + i * 4};${8 + i * 3}`} dur="1.6s" begin={`${i * 0.18}s`} repeatCount="indefinite" />}
            </rect>
          ))}
          <line x1="22" y1="10" x2="30" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <rect x="30" y="6" width="8" height="8" rx="1.5" fill={color} opacity="0.85">
            {!reduced && <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />}
          </rect>
        </svg>
      );
    case 'fraud':
      return (
        <svg width={40} height={20} aria-hidden>
          {/* Shield + radar sweep pattern */}
          <path d="M20 2 L34 6 L34 12 Q34 16 20 18 Q6 16 6 12 L6 6 Z" fill="rgba(138,245,192,0.10)" stroke={color} strokeWidth="0.9" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="20" cy="10" r={3 + i * 3} fill="none" stroke={color} strokeWidth="0.5" opacity={0.6 - i * 0.18}>
              {!reduced && <animate attributeName="opacity" values={`0;${0.6 - i * 0.18};0`} dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />}
            </circle>
          ))}
          <circle cx="20" cy="10" r="1.4" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

function PlatformLayerBand({
  layer,
  scrollYProgress,
}: {
  layer: typeof PLATFORM_LAYERS[number];
  scrollYProgress: MotionValue<number>;
}) {
  const start = (layer.n - 1) * 0.05;
  const end = layer.n * 0.05;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      className="flex-1 rounded-[10px] px-3 py-2 flex items-center gap-3"
      style={{
        opacity,
        background: layer.tint,
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--mono)' }}
      >
        {String(layer.n).padStart(2, '0')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-[12px] font-bold leading-tight">{layer.title}</div>
        <div className="text-[rgba(255,255,255,0.55)] text-[10.5px] leading-tight mt-0.5 truncate">{layer.sub}</div>
      </div>
    </motion.div>
  );
}

function EngagementCard({ option, delayIndex }: { option: typeof ENGAGEMENT_OPTIONS[number]; delayIndex: number }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.a
      href={option.href}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduced ? 0 : 0.5 + delayIndex * 0.12, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group rounded-[20px] p-6 flex flex-col gap-3"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderTop: '2px solid rgba(138,245,192,0.5)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold"
          style={{ background: 'rgba(138,245,192,0.12)', color: '#8af5c0', fontFamily: 'var(--mono)' }}
        >
          {option.num}
        </div>
        <div
          className="text-[11px] font-bold uppercase tracking-wider text-[rgba(255,255,255,0.55)]"
          style={{ fontFamily: 'var(--mono)' }}
        >
          Option
        </div>
      </div>
      <div
        className="text-white text-[22px] font-medium leading-tight"
        style={{ fontFamily: 'var(--serif)' }}
      >
        {option.label}
      </div>
      <div className="text-[14px] text-[rgba(255,255,255,0.70)] flex-1 leading-snug">
        {option.pitch}
      </div>
      <div
        className="flex items-center gap-1.5 mt-2 text-[13px] font-bold"
        style={{ color: '#8af5c0' }}
      >
        {option.ctaText}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.a>
  );
}

// ============================================================
// Beat copy — centralized so content edits stay in one place.
// ============================================================
type BeatCopy = {
  eyebrow: string;
  headline: string;
  subline: string;
  metric?: string;
  metricLabel?: string;
};

function getBeatCopy(id: BeatId): BeatCopy {
  switch (id) {
    case 'intro':
      return {
        eyebrow: 'SOVEREIGN AI · 2026 CAPABILITY DECK',
        headline: 'The sovereign AI stack. <em>Industry → agents → platform.</em> End to end.',
        subline: 'A complete picture of what runs in regulated enterprises today. Scroll through to see the industries we serve, the agents shipped in production, and the platform that holds them up.',
        metric: '15 / 7 / 6',
        metricLabel: 'agents live · deep-dives shown · platform layers',
      };
    case 'synthesis':
      return {
        eyebrow: 'SOVEREIGN AI · THREE WAYS TO START',
        headline: 'Three ways to start, <em>listed in order of commitment.</em>',
        subline: 'Two-week assessment. Single agent live in four weeks. Or the full platform deployed in six. The numbers on the right are the numbers on the contract.',
        metric: '$5K / $10K / $20K',
        metricLabel: 'assessment · agent (from) · platform / year',
      };
    case 'build':
      return {
        eyebrow: 'AGENT · + BUILD YOUR OWN',
        headline: 'Your workflow. <em>4 weeks.</em> Production-live.',
        subline: 'Same platform. Same grounding. Same audit trail. We scope with you, build the agent, and ship it into your environment in four weeks — fixed scope, fixed fee.',
        metric: '4 wks',
        metricLabel: 'scope · build · cutover · measured',
      };
    default: {
      const industry = INDUSTRIES.find((i) => i.id === id);
      if (industry) {
        const pairedAgent = AGENTS.find((a) => a.id === industry.pairedAgentId);
        return {
          eyebrow: industry.name.toUpperCase(),
          headline: industry.tagline,
          subline: getIndustrySubline(industry.id),
          metric: pairedAgent ? getAgentMetric(pairedAgent.id).metric : undefined,
          metricLabel: pairedAgent
            ? `${pairedAgent.name.toLowerCase()} · ${getAgentMetric(pairedAgent.id).label}`
            : undefined,
        };
      }
      const agent = AGENTS.find((a) => a.id === id);
      if (agent) {
        const m = getAgentMetric(agent.id);
        return {
          eyebrow: `AGENT · ${agent.name.toUpperCase()}`,
          headline: getAgentHeadline(agent.id),
          subline: getAgentSubline(agent.id),
          metric: m.metric,
          metricLabel: m.label,
        };
      }
      return { eyebrow: '', headline: '', subline: '' };
    }
  }
}

function getAgentMetric(id: string): { metric: string; label: string } {
  const map: Record<string, { metric: string; label: string }> = {
    invoice: { metric: '88%',  label: 'no-touch post rate' },
    pcr:     { metric: '1.2M', label: 'reports cross-linked' },
    voice:   { metric: '~2h',  label: 'given back per doctor per day' },
    patient: { metric: '$100K+', label: 'recovered per clinic per year' },
    voucher: { metric: '5 min', label: 'per six-document payment packet' },
    tender:  { metric: '4–8%', label: 'saved on every PO awarded' },
    fraud:   { metric: '< 1s', label: 'to flag fraud at intake · 14 patterns' },
    build:   { metric: '4 wks', label: 'to live · fixed scope' },
  };
  return map[id] ?? { metric: '', label: '' };
}

function getIndustrySubline(id: string): string {
  const map: Record<string, string> = {
    logistics:    'Handwritten invoices three-way matched and posted to the finance system before the morning coffee. A global logistics group runs this on 14,200 vouchers every Monday.',
    pharma:       'Millions of adverse-event reports distilled into a cross-linked knowledge graph. Findings cited back to the exact source line, reviewable by your regulator.',
    dental:       'Every patient call answered 24/7. Every consult written into a structured note in seconds. Audio never leaves the clinic.',
    auto:         'Warranty fraud scored at the moment of upload — fourteen patterns checked simultaneously in under a second. Clean claims pay automatically.',
    healthcare:   'Patient context across six to twelve tools. Books, bills, reminds. Only the unusual calls reach a human.',
    banking:      'KYC and trade-finance documents extracted, cross-verified, and stamped with a full audit trail. Regulators get the paper they need; analysts stop ctrl-F-ing PDFs.',
    'real-estate':'Every quote in every format converted to one true landed cost — tax, freight, retention and payment terms included. Benchmarked against past paid and government rate cards.',
  };
  return map[id] ?? '';
}

function getAgentHeadline(id: string): string {
  const map: Record<string, string> = {
    invoice: 'Any format in. <em>Clean finance-system entry out.</em>',
    pcr:     'Cross-link millions of reports. <em>Cite the root cause.</em>',
    voice:   'Listen on the premises. Write the note. <em>Sync to records.</em>',
    patient: 'Answer every call. <em>Book. Bill. Remind.</em>',
    voucher: 'Six documents in. <em>Clean payment out.</em>',
    tender:  'Every quote, every spec, <em>every tax.</em>',
    fraud:   'Every claim, every pattern, <em>every reason.</em>',
  };
  return map[id] ?? '';
}

function getAgentSubline(id: string): string {
  const map: Record<string, string> = {
    invoice: '88% posted with zero human touch. Reads any format · matches against the PO and goods-received note · posts in under 30 seconds with full audit trail.',
    pcr:     '1.2M reports cross-linked across models, regions and suppliers. Same symptom, same supplier, same root cause — clustered in one view. Cited brief drafted in minutes.',
    voice:   '~2 hours given back to each doctor per day. Listens on the premises during the consult, writes the structured note with diagnosis codes filled in, syncs to records. Audio deleted after.',
    patient: '$100K+ recovered per clinic per year. Picks up every call 24/7 in the patient’s local language. Books, reschedules, checks insurance, sends reminders — only unusual calls go to staff.',
    voucher: '5 minutes per six-document payment packet. Reads sales order + delivery note + invoice + customs + payment instruction + internal approval. Match rate above 97%.',
    tender:  '4–8% saved on every PO awarded. Reads every quote in any format, standardises to one true landed cost, benchmarks against past paid + government rate cards. Live in real estate · Mumbai.',
    fraud:   '< 1 second to flag fraud at intake. 14 specialised models run simultaneously per claim, each flag cited to the exact photo, invoice or vehicle history that triggered it. Live across 700 dealers.',
  };
  return map[id] ?? '';
}
