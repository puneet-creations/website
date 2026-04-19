// src/components/landing/AgentPlatformStack.tsx
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { FileText, GitBranch, Mic, Phone, Receipt, Plus, Sparkles, ArrowRight } from 'lucide-react';
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

const ICON_MAP = { FileText, GitBranch, Mic, Phone, Receipt, Plus } as const;

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
    <div className="h-full flex flex-col justify-center px-14 py-12 relative z-10">
      <motion.div
        key={activeBeat.id}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div
          className="mb-6"
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
            fontSize: 'clamp(36px, 4vw, 64px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
          // SAFETY: copy.headline is always a hardcoded literal from getBeatCopy.
          // Never pass user/CMS input here without sanitizing <em>-only markup.
          dangerouslySetInnerHTML={{ __html: copy.headline }}
        />

        <p
          className="max-w-[500px]"
          style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {copy.subline}
        </p>
      </motion.div>

      <div
        className="absolute bottom-8 left-14"
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
    <div className="h-full relative px-8 py-12 flex flex-col gap-3 z-10">
      <motion.div style={{ y: industryY, height: '30%' }} className="flex gap-2">
        {INDUSTRIES.map((ind) => (
          <IndustryTile key={ind.id} industry={ind} isActive={activeBeat.id === ind.id} />
        ))}
      </motion.div>

      <motion.div style={{ y: agentY, height: '36%' }} className="flex gap-3">
        {AGENTS.map((a) => (
          <AgentCard key={a.id} agent={a} isActive={activeBeat.id === a.id} />
        ))}
      </motion.div>

      <motion.div style={{ y: layerY, height: '34%' }} className="flex flex-col gap-1.5 justify-end">
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

  return (
    <motion.div
      className="relative flex-1 rounded-[14px] p-3 flex flex-col gap-1.5"
      animate={{
        scale: isActive ? 1.08 : 0.94,
        opacity: isActive || isBuildPlaceholder ? 1 : 0.55,
      }}
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
    </motion.div>
  );
}

function MotionPreview({ agentId }: { agentId: string }) {
  const color = '#8af5c0';
  switch (agentId) {
    case 'invoice':
      return (
        <svg width={40} height={20} aria-hidden>
          <rect x="2" y="4" width="36" height="12" rx="2" fill="rgba(138,245,192,0.08)" stroke={color} strokeWidth="0.8" />
          <rect x="4" y="4" width="36" height="2" fill={color} opacity="0.4">
            <animate attributeName="y" from="4" to="14" dur="1.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    case 'pcr':
      return (
        <svg width={40} height={20} aria-hidden>
          <circle cx="8" cy="10" r="2.5" fill={color}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <line x1="8" y1="10" x2="20" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <circle cx="20" cy="10" r="2" fill={color} opacity="0.7" />
          <line x1="20" y1="10" x2="32" y2="10" stroke={color} strokeWidth="0.8" opacity="0.5" />
          <circle cx="32" cy="10" r="2.5" fill={color}>
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'voice':
      return (
        <svg width={40} height={20} aria-hidden>
          {[4, 10, 16, 22, 28, 34].map((x, i) => (
            <rect key={i} x={x} y="6" width="2" height="8" fill={color} opacity="0.7">
              <animate attributeName="height" values={`4;${8 + (i % 3) * 3};4`} dur={`${1 + (i % 3) * 0.2}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`8;${6 - (i % 3)};8`} dur={`${1 + (i % 3) * 0.2}s`} repeatCount="indefinite" />
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
              <animate attributeName="r" values="1.5;3;1.5" dur="1.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      );
    case 'voucher':
      return (
        <svg width={40} height={20} aria-hidden>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={8 + i * 8} y={3 + i * 1.5} width="18" height="10" rx="1" fill="rgba(138,245,192,0.08)" stroke={color} strokeWidth="0.6">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="1.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </rect>
          ))}
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
function getBeatCopy(id: BeatId): { eyebrow: string; headline: string; subline: string } {
  switch (id) {
    case 'intro':
      return {
        eyebrow: 'SOVEREIGN AI',
        headline: 'The sovereign AI stack. <em>Industry → agents → platform.</em> End to end.',
        subline: 'A complete picture of what runs in regulated enterprises today. Scroll through to see the industries we serve, the agents shipped in production, and the platform that holds them up.',
      };
    case 'synthesis':
      return {
        eyebrow: 'SOVEREIGN AI',
        headline: 'Platform. Agents. <em>Sovereign AI,</em> end-to-end.',
        subline: 'Three ways to start. Pick the commitment level that fits where you are.',
      };
    case 'build':
      return {
        eyebrow: 'AGENT · + BUILD YOUR OWN',
        headline: 'Your workflow. <em>4–8 weeks.</em> Production-live.',
        subline: 'Same platform. Same grounding. Same audit trail. We scope with you, build the agent, and ship it into your environment in 4–8 weeks — fixed.',
      };
    default: {
      const industry = INDUSTRIES.find((i) => i.id === id);
      if (industry) {
        return {
          eyebrow: industry.name.toUpperCase(),
          headline: industry.tagline,
          subline: getIndustrySubline(industry.id),
        };
      }
      const agent = AGENTS.find((a) => a.id === id);
      if (agent) {
        return {
          eyebrow: `AGENT · ${agent.name.toUpperCase()}`,
          headline: getAgentHeadline(agent.id),
          subline: getAgentSubline(agent.id),
        };
      }
      return { eyebrow: '', headline: '', subline: '' };
    }
  }
}

function getIndustrySubline(id: string): string {
  const map: Record<string, string> = {
    logistics:  'Handwritten invoices, 3-way matched, posted to SAP before your first coffee. Thomson Group UAE runs this on 14,200 vouchers every Monday.',
    pharma:     'Millions of lab reports distilled into a knowledge graph your researchers can query. Findings are cited and reversible — every claim traces back to source.',
    dental:     'Every multilingual patient call transcribed, coded, and synced to your EHR. No missed follow-ups, no coding backlog.',
    auto:       'Handwritten warranty claims read, validated against policy, posted to SAP — with a full citation trail your compliance team can replay.',
    healthcare: 'Patient history compressed into SOAP notes in seconds. Every inference cited back to the source document, reversible on review.',
    banking:    'KYC documents extracted, cross-verified, and stamped with a full audit trail. Regulators get the paper they need; analysts stop ctrl-F-ing PDFs.',
  };
  return map[id] ?? '';
}

function getAgentHeadline(id: string): string {
  const map: Record<string, string> = {
    invoice: 'Reads it. <em>Cites it.</em> Posts it.',
    pcr:     'Graphs millions of reports. <em>Cites every edge.</em>',
    voice:   'Hears the call. <em>Structures it.</em> Syncs it.',
    patient: '30-second SOAP. <em>Every claim sourced.</em>',
    voucher: 'Handwritten in. <em>SAP out.</em> Reversible.',
  };
  return map[id] ?? '';
}

function getAgentSubline(id: string): string {
  const map: Record<string, string> = {
    invoice: '88% no-touch. 6× ROI week 1. <30s per invoice. Running at Thomson Group UAE on 14,200 vouchers every Monday.',
    pcr:     'Lab reports → structured knowledge graph with cited edges. Reversible. Used across pharma research teams to shrink lit-review from weeks to hours.',
    voice:   'Multilingual call audio → structured transcripts with extracted action items. Dental clinic networks use this across 30+ languages.',
    patient: 'Patient call → SOAP note in 30 seconds. Every claim cited to source. Reversible until approval. Hospital systems use this for follow-up triage.',
    voucher: 'Warranty claims handwritten by dealerships → SAP vouchers with full audit trail. Auto aftermarket uses this at scale across 200+ dealer networks.',
  };
  return map[id] ?? '';
}
