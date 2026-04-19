// src/components/landing/AgentPlatformStackMobile.tsx
import { useInView } from '../../hooks/useInView';
import { FileText, GitBranch, Mic, Phone, Receipt, Plus, ArrowRight, Sparkles } from 'lucide-react';
import {
  INDUSTRIES,
  AGENTS,
  PLATFORM_LAYERS,
  ENGAGEMENT_OPTIONS,
} from '../../data/agentPlatformStack';

const ICON_MAP = { FileText, GitBranch, Mic, Phone, Receipt, Plus } as const;

export default function AgentPlatformStackMobile() {
  return (
    <section
      className="relative"
      style={{ background: 'var(--wow-bg, #0a0e18)' }}
    >
      <IntroBlock />
      <IndustriesStrip />
      <AgentsStack />
      <PlatformStackBlock />
      <SynthesisBlock />
      <EngagementStack />
    </section>
  );
}

function IntroBlock() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="px-6 py-20 max-w-[560px] mx-auto">
      <div
        className={`mb-5 opacity-0 transition-opacity duration-700 ${inView ? 'opacity-100' : ''}`}
        style={{
          fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8af5c0',
        }}
      >
        SOVEREIGN AI
      </div>
      <h2
        className={`text-white mb-5 opacity-0 translate-y-3 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : ''}`}
        style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.02em' }}
      >
        The sovereign AI stack. <em>Industry → agents → platform.</em> End to end.
      </h2>
      <p
        className={`text-[rgba(255,255,255,0.65)] text-[15px] opacity-0 transition-opacity duration-700 delay-200 ${inView ? 'opacity-100' : ''}`}
      >
        A complete picture. Scroll through to see the industries we serve, the agents shipped in production, and the platform that holds them up.
      </p>
    </div>
  );
}

function IndustriesStrip() {
  return (
    <div className="py-10">
      <div
        className="px-6 mb-4"
        style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}
      >
        INDUSTRIES
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-6 pb-4 snap-x snap-mandatory">
        {INDUSTRIES.map((ind) => (
          <div
            key={ind.id}
            className="relative snap-start flex-shrink-0 rounded-[14px] overflow-hidden"
            style={{ width: 260, height: 180 }}
          >
            <img src={ind.photoUrl} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ filter: 'grayscale(30%) contrast(1.05) brightness(0.85)' }} />
            <div
              className="absolute inset-x-0 bottom-0 p-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
            >
              <div className="text-white text-[12px] font-bold uppercase tracking-wider leading-tight mb-1" style={{ fontFamily: 'var(--mono)' }}>
                {ind.name}
              </div>
              <div className="text-[rgba(255,255,255,0.85)] text-[13px] leading-snug">
                {ind.tagline}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentsStack() {
  return (
    <div className="px-6 py-10 max-w-[560px] mx-auto">
      <div className="mb-4" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}>
        AGENTS · 5 LIVE + BUILD YOURS
      </div>
      <div className="flex flex-col gap-3">
        {AGENTS.map((agent) => {
          const Icon = ICON_MAP[agent.iconKey] ?? Plus;
          const isBuild = agent.id === 'build';
          return (
            <div
              key={agent.id}
              className="rounded-[14px] p-4 flex items-center gap-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: isBuild ? '2px dashed rgba(138,245,192,0.5)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(138,245,192,0.1)' }}>
                <Icon size={18} color="#8af5c0" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[14px] font-bold leading-tight">{agent.name}</div>
                <div className="text-[rgba(255,255,255,0.55)] text-[12px] mt-1 leading-snug">{agent.flow}</div>
              </div>
              {isBuild && <Sparkles size={16} color="#8af5c0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlatformStackBlock() {
  return (
    <div className="px-6 py-10 max-w-[560px] mx-auto">
      <div className="mb-4" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}>
        PLATFORM · SIX SHARED LAYERS
      </div>
      <div className="flex flex-col gap-2">
        {PLATFORM_LAYERS.map((layer) => (
          <div
            key={layer.n}
            className="rounded-[10px] p-3 flex items-center gap-3"
            style={{ background: layer.tint, border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--mono)' }}
            >
              {String(layer.n).padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[13px] font-bold leading-tight">{layer.title}</div>
              <div className="text-[rgba(255,255,255,0.55)] text-[11.5px] leading-snug mt-0.5">{layer.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SynthesisBlock() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="px-6 py-14 max-w-[560px] mx-auto">
      <div
        className={`mb-4 opacity-0 transition-opacity duration-700 ${inView ? 'opacity-100' : ''}`}
        style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#8af5c0' }}
      >
        SOVEREIGN AI
      </div>
      <h3
        className={`text-white mb-2 opacity-0 translate-y-3 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : ''}`}
        style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em' }}
      >
        Platform. Agents. <em>Sovereign AI,</em> end-to-end.
      </h3>
      <p className={`text-[rgba(255,255,255,0.65)] text-[14px] opacity-0 transition-opacity duration-700 delay-200 ${inView ? 'opacity-100' : ''}`}>
        Three ways to start. Pick the commitment level that fits where you are.
      </p>
    </div>
  );
}

function EngagementStack() {
  return (
    <div className="px-6 pb-20 max-w-[560px] mx-auto flex flex-col gap-3">
      {ENGAGEMENT_OPTIONS.map((opt) => (
        <a
          key={opt.id}
          href={opt.href}
          className="group rounded-[20px] p-5 flex flex-col gap-2"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderTop: '2px solid rgba(138,245,192,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ background: 'rgba(138,245,192,0.12)', color: '#8af5c0', fontFamily: 'var(--mono)' }}
            >
              {opt.num}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[rgba(255,255,255,0.55)]" style={{ fontFamily: 'var(--mono)' }}>
              Option
            </div>
          </div>
          <div className="text-white text-[18px] font-medium" style={{ fontFamily: 'var(--serif)' }}>
            {opt.label}
          </div>
          <div className="text-[13px] text-[rgba(255,255,255,0.70)] leading-snug">
            {opt.pitch}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[13px] font-bold" style={{ color: '#8af5c0' }}>
            {opt.ctaText}
            <ArrowRight size={13} />
          </div>
        </a>
      ))}
    </div>
  );
}
