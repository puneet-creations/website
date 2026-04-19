import { useState, type ReactNode } from 'react';

/**
 * DeepDiveLayout — reusable layout matching the AgentDeepDive pattern.
 *
 * Structure:
 *   Tab bar → Headline + metric → Motion story → 4-step workflow → Outcome
 *
 * Used by all 5 landing cards (Pain, Proof, Platform, Agents, Engagement).
 */

export type Tab = {
  id: string;
  label: string;
  color: string;       // pastel bg
  ink: string;         // dark text/border
  metric: string;      // hero number ("88%", "$5K", "3.2%")
  metricLabel: string;
  headline: string;
  description: string;
  motion: ReactNode;   // the StepShell-wrapped motion story
  steps: { n: string; title: string; sub: string }[];
  outcome: string;
  outcomeSub?: string;
};

type Props = {
  sectionLabel: string;    // "01 · PAIN"
  sectionAccent: string;   // micro-upper color
  tabs: Tab[];
  defaultTab?: number;
};

export default function DeepDiveLayout({ sectionLabel, sectionAccent, tabs, defaultTab = 0 }: Props) {
  const [active, setActive] = useState(defaultTab);
  const t = tabs[active];

  return (
    <section className="min-h-screen py-10 px-4 md:px-6" style={{ background: 'var(--warm-white)' }}>
      <div className="max-w-[1320px] mx-auto">
        {/* Section label + tab bar — prominent, matching hero badge style */}
        <div className="flex items-center gap-2.5 mb-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          <span
            className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark-glass mr-1"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: sectionAccent }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: '#ffffff' }}>
              {sectionLabel}
            </span>
          </span>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(i)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full font-display transition-all duration-300"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.04em',
                background: i === active ? tab.color : 'rgba(28,28,30,0.04)',
                color: i === active ? tab.ink : 'var(--slate)',
                border: `1.5px solid ${i === active ? tab.ink : 'var(--ring)'}`,
                transform: i === active ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: i === active ? `0 8px 24px ${tab.ink}18` : 'none',
              }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center font-bold"
                style={{
                  fontSize: 10,
                  background: i === active ? tab.ink : 'var(--ring)',
                  color: i === active ? '#ffffff' : 'var(--ink)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main panel */}
        <div
          className="rounded-[32px] overflow-hidden shadow-ring"
          style={{ background: t.color, border: `1px solid ${t.ink}18` }}
        >
          {/* Header: headline + metric */}
          <div className="px-8 lg:px-10 pt-8 pb-5 flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <div className="micro-upper mb-2" style={{ color: t.ink }}>
                {t.label}
              </div>
              <h2
                className="font-display leading-[1.05] text-ink mb-3"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                {t.headline}
              </h2>
              <p className="text-[17px] lg:text-[19px] text-ink/75 leading-relaxed max-w-[620px]">
                {t.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div
                className="font-display italic font-semibold leading-none"
                style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: t.ink }}
              >
                {t.metric}
              </div>
              <div className="micro-upper mt-2" style={{ color: t.ink }}>
                {t.metricLabel}
              </div>
            </div>
          </div>

          {/* Motion story container */}
          <div className="px-6 lg:px-10 pb-5">
            <div className="bg-white/70 rounded-3xl p-4 lg:p-6 shadow-ring overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {t.motion}
            </div>
          </div>

          {/* Workflow strip + outcome */}
          <div className="px-6 lg:px-10 pb-8 grid lg:grid-cols-[1fr_220px] gap-6">
            {/* 4-step workflow */}
            <div>
              <div className="micro-upper mb-3" style={{ color: t.ink }}>
                The 4-step workflow
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {t.steps.map((s) => (
                  <div
                    key={s.n}
                    className="bg-white/80 rounded-2xl p-4 shadow-ring"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold mb-2"
                      style={{ background: t.ink, color: '#ffffff' }}
                    >
                      {s.n}
                    </div>
                    <div className="font-display text-[16px] text-ink leading-tight mb-1">
                      {s.title}
                    </div>
                    <div className="text-[13px] text-ink/60">
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome card */}
            <div className="bg-white/80 rounded-2xl p-5 shadow-ring flex flex-col justify-center">
              <div className="micro-upper mb-2" style={{ color: t.ink }}>
                Outcome
              </div>
              <div className="font-display text-[17px] text-ink leading-snug">
                {t.outcome}
              </div>
              {t.outcomeSub && (
                <div className="text-[13px] text-ink/55 mt-2 italic">
                  {t.outcomeSub}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
