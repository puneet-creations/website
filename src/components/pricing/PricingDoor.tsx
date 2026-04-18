import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import type { Door, PanelId } from '../../data/pricing';

const ACCENT = '#3a7d44';

/**
 * PricingDoor — one of the 3 door cards on the /pricing page.
 *
 * Contrast pill + 5 accordion Q&A panels (HOW open by default). Each
 * door is self-contained; visitors pick one (or read all three).
 */
export default function PricingDoor({ data }: { data: Door }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const [openPanels, setOpenPanels] = useState<Set<PanelId>>(new Set(['how']));

  const Icon: LucideIcon =
    (Lucide as unknown as Record<string, LucideIcon>)[data.iconName] ??
    Lucide.HelpCircle;

  const togglePanel = (id: PanelId) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.section
      ref={ref}
      id={data.id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(40px, 6vw, 80px) 24px' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <article
          className="flex flex-col"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          {/* Forest-green top accent strip */}
          <div style={{ height: 1, background: ACCENT }} />

          <div className="p-8 md:p-10 flex flex-col gap-6">
            {/* Header: icon + tier name */}
            <div className="flex items-center gap-4">
              <div
                className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${ACCENT}10`,
                  border: `1px solid ${ACCENT}20`,
                }}
              >
                <Icon size={32} style={{ color: ACCENT }} aria-hidden="true" />
              </div>
              <div
                className="micro-upper"
                style={{ color: 'rgba(0,0,0,0.55)' }}
              >
                {data.tierName}
              </div>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#000000',
              }}
            >
              {data.headline}{' '}
              <span style={{ fontStyle: 'italic', color: ACCENT }}>
                {data.headlineAccent}
              </span>
            </h2>

            {/* Pitch */}
            <p
              className="text-[17px] leading-relaxed max-w-[800px]"
              style={{ color: 'rgba(0,0,0,0.70)' }}
            >
              {data.pitch}
            </p>

            {/* Contrast pill */}
            <div
              className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6 rounded-2xl p-5 md:p-6"
              style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div>
                <div
                  className="micro-upper mb-1"
                  style={{ color: 'rgba(0,0,0,0.45)' }}
                >
                  {data.contrast.typicalLabel}
                </div>
                <div
                  className="text-[15px] leading-snug"
                  style={{ color: 'rgba(0,0,0,0.60)' }}
                >
                  {data.contrast.typicalText}
                </div>
              </div>
              <div
                className="hidden md:block text-[18px] font-light"
                style={{ color: ACCENT }}
                aria-hidden="true"
              >
                &rarr;
              </div>
              <div>
                <div
                  className="micro-upper mb-1"
                  style={{ color: ACCENT }}
                >
                  {data.contrast.usLabel}
                </div>
                <div
                  className="text-[15px] leading-snug font-medium"
                  style={{ color: '#000000' }}
                >
                  {data.contrast.usText}
                </div>
              </div>
            </div>

            {/* Accordion panels */}
            <div className="flex flex-col gap-2">
              {data.panels.map((panel) => {
                const isOpen = openPanels.has(panel.id);
                return (
                  <div
                    key={panel.id}
                    style={{
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: 14,
                      overflow: 'hidden',
                      background: isOpen
                        ? 'rgba(58,125,68,0.03)'
                        : 'transparent',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => togglePanel(panel.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 transition-colors"
                      style={{
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        className="micro-upper"
                        style={{
                          color: isOpen ? ACCENT : 'rgba(0,0,0,0.65)',
                          fontSize: 12,
                        }}
                      >
                        {panel.label}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[14px] flex-shrink-0"
                        style={{
                          color: isOpen ? ACCENT : 'rgba(0,0,0,0.35)',
                        }}
                        aria-hidden="true"
                      >
                        &rsaquo;
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p
                            className="px-5 pb-5 text-[15px] leading-relaxed"
                            style={{ color: 'rgba(0,0,0,0.70)' }}
                          >
                            {panel.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href={data.ctaHref}
              className="capsule-dark self-start inline-flex items-center gap-2 rounded-full transition-transform hover:scale-[1.03]"
              style={{
                padding: '10px 20px',
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              {data.ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </article>
      </div>
    </motion.section>
  );
}
