import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import {
  AGENTS,
  INDUSTRIES,
  FIT_MATRIX,
  type AgentId,
  type IndustryId,
} from '../../data/solutions';

/**
 * AgentIndustryMatrix — 5 agents × 10 industries fit grid.
 *
 * Cells show proven (filled teal-halo dot), fits (open ring), or none
 * (tiny grey dot). Hover reveals a 1-sentence reasoning tooltip.
 * Mobile: horizontal scroll with sticky first column.
 */
export default function AgentIndustryMatrix() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const [hovered, setHovered] = useState<{ a: AgentId; i: IndustryId } | null>(null);

  const reason = hovered ? FIT_MATRIX[hovered.a][hovered.i].reason : '';

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: 'clamp(96px, 12vw, 160px) 24px', background: 'var(--bg-s2)' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center max-w-[720px] mx-auto"
        >
          <div className="micro-upper mb-4" style={{ color: 'rgba(0,0,0,0.55)' }}>
            The pattern, ten ways
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#000000',
            }}
          >
            Five agents. <span style={{ fontStyle: 'italic' }}>Ten industries.</span>
          </h2>
          <p
            className="mt-4 mx-auto max-w-[560px]"
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 1.3vw, 18px)',
              color: 'rgba(0,0,0,0.60)',
              lineHeight: 1.55,
            }}
          >
            Three cells are live in production today. Thirty-five more where
            the same pattern ships. Hover a cell for the one-line fit.
          </p>
        </motion.div>

        {/* Matrix — horizontal scroll on narrow viewports */}
        <div
          className="overflow-x-auto"
          role="region"
          aria-label="Agent to industry fit matrix"
        >
          <div
            role="grid"
            className="grid relative"
            style={{
              minWidth: 900,
              gridTemplateColumns: '180px repeat(10, minmax(72px, 1fr))',
              rowGap: 0,
              columnGap: 0,
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 16,
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            {/* Header row: empty corner + 10 industry columns */}
            <div role="row" style={{ display: 'contents' }}>
              <div
                role="columnheader"
                className="sticky left-0 z-[2]"
                style={{
                  background: '#fafafa',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  borderRight: '1px solid rgba(0,0,0,0.08)',
                }}
              />
              {INDUSTRIES.map((ind) => {
                const Icon = (Lucide as any)[ind.iconName] ?? Lucide.HelpCircle;
                return (
                  <div
                    key={ind.id}
                    role="columnheader"
                    className="flex flex-col items-center justify-end gap-1 px-1 py-3"
                    style={{
                      background: '#fafafa',
                      borderBottom: '1px solid rgba(0,0,0,0.08)',
                      borderRight: '1px solid rgba(0,0,0,0.04)',
                      minHeight: 72,
                    }}
                  >
                    <Icon aria-hidden="true" size={14} style={{ color: 'rgba(0,0,0,0.55)' }} />
                    <span
                      className="text-center leading-tight"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 10,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'rgba(0,0,0,0.65)',
                      }}
                    >
                      {ind.short}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 5 rows × (agent label + 10 cells) */}
            {AGENTS.map((agent, rowIdx) => (
              <div key={agent.id} role="row" style={{ display: 'contents' }}>
                {/* Row header (agent name) */}
                <div
                  role="rowheader"
                  className="sticky left-0 z-[1] flex items-center justify-end px-4 py-3 text-right"
                  style={{
                    background: '#ffffff',
                    borderBottom:
                      rowIdx === AGENTS.length - 1
                        ? 'none'
                        : '1px solid rgba(0,0,0,0.04)',
                    borderRight: '1px solid rgba(0,0,0,0.08)',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.80)',
                    minHeight: 48,
                  }}
                >
                  {agent.short}
                </div>

                {/* 10 fit cells for this agent */}
                {INDUSTRIES.map((ind, colIdx) => {
                  const cell = FIT_MATRIX[agent.id][ind.id];
                  const isHovered =
                    hovered?.a === agent.id && hovered?.i === ind.id;
                  return (
                    <motion.div
                      key={`${agent.id}-${ind.id}`}
                      role="gridcell"
                      tabIndex={cell.fit !== 'none' ? 0 : -1}
                      aria-label={`${agent.name} in ${ind.name}: ${cell.fit}${cell.reason ? '. ' + cell.reason : ''}`}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + colIdx * 0.05 }}
                      onMouseEnter={() =>
                        cell.fit !== 'none' && setHovered({ a: agent.id, i: ind.id })
                      }
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() =>
                        cell.fit !== 'none' && setHovered({ a: agent.id, i: ind.id })
                      }
                      onBlur={() => setHovered(null)}
                      className={`flex items-center justify-center ${cell.fit !== 'none' ? 'cursor-pointer' : 'cursor-default'}`}
                      style={{
                        borderBottom:
                          rowIdx === AGENTS.length - 1
                            ? 'none'
                            : '1px solid rgba(0,0,0,0.04)',
                        borderRight:
                          colIdx === INDUSTRIES.length - 1
                            ? 'none'
                            : '1px solid rgba(0,0,0,0.04)',
                        minHeight: 48,
                        background: isHovered ? 'rgba(138,245,192,0.08)' : 'transparent',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <CellGlyph fit={cell.fit} isHovered={isHovered} />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip — appears below the matrix, follows hovered cell */}
        <div
          className="mt-6 min-h-[48px] flex items-center justify-center text-center transition-opacity duration-200"
          style={{
            opacity: hovered ? 1 : 0,
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            color: 'rgba(0,0,0,0.75)',
            maxWidth: 720,
            margin: '24px auto 0',
          }}
        >
          {reason}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <LegendChip fit="proven" label="PROVEN · in production today" />
          <LegendChip fit="fits" label="FITS · same pattern, new vertical" />
          <LegendChip fit="none" label="NOT YET" />
        </div>
      </div>
    </section>
  );
}

function CellGlyph({ fit, isHovered }: { fit: 'proven' | 'fits' | 'none'; isHovered: boolean }) {
  if (fit === 'proven') {
    return (
      <span
        className="block rounded-full transition-transform duration-150"
        style={{
          width: 12,
          height: 12,
          background: '#000000',
          boxShadow: `0 0 0 4px rgba(138,245,192,0.35), 0 0 12px rgba(138,245,192,0.5)`,
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
        }}
      />
    );
  }
  if (fit === 'fits') {
    return (
      <span
        className="block rounded-full transition-transform duration-150"
        style={{
          width: 12,
          height: 12,
          background: 'transparent',
          border: '1.5px solid rgba(0,0,0,0.55)',
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
        }}
      />
    );
  }
  return (
    <span
      className="block rounded-full"
      style={{ width: 4, height: 4, background: 'rgba(0,0,0,0.15)' }}
    />
  );
}

function LegendChip({ fit, label }: { fit: 'proven' | 'fits' | 'none'; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 capsule-light rounded-full">
      <span className="inline-flex items-center justify-center" style={{ width: 12, height: 12 }}>
        <CellGlyph fit={fit} isHovered={false} />
      </span>
      <span>{label}</span>
    </span>
  );
}
