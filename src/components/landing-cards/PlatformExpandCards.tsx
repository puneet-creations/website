import { useState } from 'react';
import type { Tab } from './DeepDiveLayout';

/**
 * PlatformExpandCards — case-study-style expandable cards for the Platform section.
 * Each of the 4 platform concepts is a tall panel that expands on click to reveal
 * the motion story, workflow steps, and outcome — matching the SolutionsPage design.
 */

type Props = {
  tabs: Tab[];
  sectionAccent: string;
};

export default function PlatformExpandCards({ tabs }: Props) {
  const [open, setOpen] = useState<string>(tabs[0]?.id || '');

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col gap-4">
      {tabs.map((t) => {
        const isOpen = open === t.id;
        const triggerId = `platform-expand-${t.id}-trigger`;
        const panelId = `platform-expand-${t.id}-panel`;
        return (
          <article
            key={t.id}
            className="overflow-hidden transition-all duration-300"
            onMouseEnter={() => setOpen(t.id)}
            style={{
              background: isOpen ? 'rgba(14,18,28,0.90)' : 'rgba(14,18,28,0.70)',
              borderRadius: 28,
              border: `1px solid ${isOpen ? `${t.ink}40` : 'rgba(255,255,255,0.06)'}`,
              boxShadow: isOpen
                ? `0 0 40px ${t.ink}15, 0 16px 48px rgba(0,0,0,0.3)`
                : '0 8px 24px rgba(0,0,0,0.2)',
              cursor: 'pointer',
            }}
          >
            {/* Header bar — always visible, hover or click to expand */}
            <button
              type="button"
              id={triggerId}
              onClick={() => setOpen(isOpen ? '' : t.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full grid md:grid-cols-[1fr_160px_40px] gap-4 items-center px-7 py-5 text-left"
              style={{
                border: 'none',
                font: 'inherit',
                color: 'inherit',
                appearance: 'none',
                background: 'transparent',
              }}
            >
              <div>
                <div
                  className="mb-1"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: t.ink,
                  }}
                >
                  {t.label}
                </div>
                <div className="font-display text-[20px] lg:text-[24px] leading-tight text-white">
                  {t.headline}
                </div>
                {!isOpen && (
                  <p className="text-[14px] text-[rgba(255,255,255,0.70)] mt-1.5 line-clamp-1">{t.description}</p>
                )}
              </div>
              <div className="text-right">
                <div
                  className="font-display italic font-semibold leading-none"
                  style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: t.ink, filter: `drop-shadow(0 0 12px ${t.ink}50)` }}
                >
                  {t.metric}
                </div>
                <div
                  className="mt-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: `${t.ink}90` }}
                >
                  {t.metricLabel}
                </div>
              </div>
              <div
                className="text-right text-[24px] transition-transform duration-300"
                style={{ color: t.ink, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ⌄
              </div>
            </button>

            {/* Expanded content */}
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="px-7 pb-8 pt-2 grid lg:grid-cols-[1fr_1fr] gap-6"
              >
                {/* LEFT — description + motion story */}
                <div>
                  <p className="text-[15px] text-[rgba(255,255,255,0.85)] leading-relaxed mb-5">
                    {t.description}
                  </p>

                  {/* Motion story */}
                  <div className="rounded-2xl overflow-hidden">
                    {t.motion}
                  </div>

                  {/* Outcome */}
                  {t.outcome && (
                    <div className="mt-4 pl-4 border-l-[3px] font-display italic text-[16px] text-white leading-snug" style={{ borderColor: t.ink }}>
                      {t.outcome}
                    </div>
                  )}
                  {t.outcomeSub && (
                    <div className="mt-2 pl-4 text-[13px] text-[rgba(255,255,255,0.65)]">{t.outcomeSub}</div>
                  )}
                </div>

                {/* RIGHT — workflow steps as KPI-style tiles */}
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {t.steps.map((s) => (
                      <div
                        key={s.n}
                        className="p-4 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        <div
                          className="flex items-center gap-2 mb-2"
                        >
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{ background: t.ink, color: '#0a0e18' }}
                          >
                            {s.n}
                          </span>
                          <span
                            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: `${t.ink}cc` }}
                          >
                            {s.title}
                          </span>
                        </div>
                        <div className="text-[14px] text-[rgba(255,255,255,0.75)] leading-relaxed">
                          {s.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
