import { useEffect, useRef, useState } from 'react';
import type { Tab } from './DeepDiveLayout';
import SectionOrb, { type OrbVariant } from '../SectionOrb';

/**
 * DeepDiveScrollLayout — horizontal-scroll version of DeepDiveLayout.
 *
 * Each tab becomes a full-viewport frame that scrolls horizontally as
 * the user scrolls vertically (same pattern as the original PainCard
 * 600vh horizontal scrolly). Each frame contains the complete panel:
 * headline + metric + motion story + 4-step workflow + outcome card.
 *
 * The tab bar at top highlights the active frame as a visual indicator.
 * Progress dots + chapter label at bottom.
 */

type Props = {
  sectionLabel: string;
  sectionAccent: string;
  tabs: Tab[];
  dark?: boolean;
  orbVariants?: string[];  // one orb variant per tab (e.g. ['pain','pain','pain',...])
};

export default function DeepDiveScrollLayout({ sectionLabel, sectionAccent, tabs, dark = false, orbVariants }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440));

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      setProgress(Math.min(Math.max(-rect.top / total, 0), 1));
    };
    const onResize = () => { setVw(window.innerWidth); onScroll(); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  const N = tabs.length;
  const trackPx = N * vw;
  const maxOffset = Math.max(trackPx - vw, 0);
  const translateX = -progress * maxOffset;
  const activeIdx = Math.min(Math.floor(progress * N + 0.001), N - 1);

  return (
    <section ref={wrapRef} className="relative" style={{ height: `${N * 100}vh` }}>
      <div
        className="sticky top-[72px] w-full overflow-hidden"
        style={{ height: 'calc(100vh - 72px)', background: dark ? 'var(--bg-hero)' : 'var(--bg-s1)' }}
      >
        {/* Background heading — large serif like hero, shows active tab headline */}
        <div className="absolute top-3 left-6 right-6 z-[1] pointer-events-none flex items-start justify-between">
          <span className="capsule-dark inline-flex items-center gap-2 rounded-full z-10">
            <span className="w-2 h-2 rounded-full" style={{ background: sectionAccent }} />
            <span>
              {sectionLabel} · {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
          </span>
        </div>

        {/* Horizontal track */}
        <div
          className="absolute left-0 top-0 h-full flex"
          style={{
            width: `${trackPx}px`,
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.08s linear',
            willChange: 'transform',
          }}
        >
          {tabs.map((t, i) => (
            <Frame key={t.id} tab={t} active={activeIdx === i} width={vw} dark={dark} orbVariant={orbVariants?.[i]} />
          ))}
        </div>

        {/* Progress dots + label at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 pointer-events-none">
          <div className="flex items-center gap-1.5">
            {tabs.map((_, i) => (
              <span
                key={i}
                className="transition-all duration-300"
                style={{
                  height: 3,
                  width: i === activeIdx ? 36 : 14,
                  borderRadius: 100,
                  background: i <= activeIdx ? sectionAccent : (dark ? 'rgba(255,255,255,0.2)' : 'var(--ring)'),
                }}
              />
            ))}
          </div>
          <div className="micro-upper" style={{ color: dark ? 'rgba(255,255,255,0.80)' : 'var(--slate)' }}>
            {String(activeIdx + 1).padStart(2, '0')} · {tabs[activeIdx].label}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Each frame — Pelmatech-inspired gradient + frosted glass + floating orb. */
function Frame({ tab: t, active, width, dark, orbVariant }: { tab: Tab; active: boolean; width: number; dark: boolean; orbVariant?: string }) {
  return (
    <div
      className="relative h-full flex items-center justify-center px-3 md:px-6"
      style={{
        width: `${width}px`,
        flexShrink: 0,
        background: dark ? '#0b1220' : 'var(--bg-s1)',
        scrollbarWidth: 'none',
        opacity: active ? 1 : 0.35,
        transition: 'opacity 0.5s ease',
        contentVisibility: active ? 'visible' : 'auto',
        containIntrinsicSize: active ? undefined : '0 500px',
      }}
    >
      {/* Orb + label — centered above the card, inline horizontal */}
      {orbVariant && (
        <div
          className="absolute z-20 hidden lg:flex items-center gap-4"
          style={{
            top: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: active ? 1 : 0.15,
            transition: 'opacity 0.6s ease',
          }}
        >
          <SectionOrb variant={orbVariant as OrbVariant} size={48} />
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 500,
              fontStyle: 'italic',
              color: dark ? '#ffffff' : '#000000',
              letterSpacing: '-0.01em',
              textShadow: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </span>
        </div>
      )}

      {/* Dashboard frame — gradient bg derived from tab color */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 1320,
          background: `linear-gradient(135deg, ${t.color} 0%, #2a3a5c 50%, #1a2545 100%)`,
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
          maxHeight: 'calc(100vh - 120px)',
        }}
      >
        {/* Vertical stripe texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[24px]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 5px)',
          }}
        />

        {/* Top bar — frosted glass */}
        <div className="relative flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffffff' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: '#ffffff' }}>
              {t.label}
            </span>
          </div>
          <div className="font-display italic font-semibold" style={{ fontSize: 32, color: '#ffffff', lineHeight: 1 }}>
            {t.metric}
          </div>
        </div>

        {/* Main content: sidebar + central hero */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-3 px-4 py-3">
          {/* Left sidebar */}
          <div className="flex flex-col gap-3">
            {/* Headline card — dark frosted glass for readable white text */}
            <div
              className="rounded-[16px] p-5"
              style={{
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                borderLeft: `3px solid rgba(255,255,255,0.35)`,
              }}
            >
              <div className="font-display text-[20px] leading-tight mb-3" style={{ color: '#ffffff' }}>
                {t.headline}
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.90)' }}>
                {t.description}
              </p>
            </div>

            {/* Outcome card — dark frosted glass */}
            <div
              className="rounded-[16px] p-5"
              style={{
                background: 'rgba(0,0,0,0.40)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ background: '#8af5c0' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
                  Outcome
                </span>
              </div>
              <div className="font-display text-[16px] leading-snug" style={{ color: '#ffffff' }}>
                {t.outcome}
              </div>
              {t.outcomeSub && (
                <div className="text-[13px] mt-2 italic" style={{ color: 'rgba(255,255,255,0.70)' }}>{t.outcomeSub}</div>
              )}
            </div>
          </div>

          {/* Central hero: motion story — dark cosmic card */}
          <div
            className="rounded-[16px] overflow-hidden"
            style={{
              background: 'rgba(15,21,37,0.88)',
              border: '1px solid rgba(138,245,192,0.10)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            }}
          >
            {t.motion}
          </div>
        </div>

        {/* Bottom workflow strip — dark frosted glass tiles */}
        <div className="relative grid grid-cols-4 gap-2 px-5 pb-4">
          {t.steps.map((s) => (
            <div
              key={s.n}
              className="rounded-[12px] px-3.5 py-2.5 flex items-center gap-2.5"
              style={{
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: '#8af5c0', color: '#0b1220' }}
              >
                {s.n}
              </span>
              <div className="min-w-0">
                <div className="font-display text-[14px] leading-tight truncate" style={{ color: '#ffffff' }}>{s.title}</div>
                <div className="text-[12px] truncate" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

