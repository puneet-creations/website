import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * CardMotions — compact light-themed micro-animations that slot into the
 * SevenAgentsGrid card just above the dashed flow-pipe.
 *
 * Each motion is ~120×56 px, parchment-friendly, with Action Blue
 * (#0066CC) accents. They use `whileInView` (via Framer's `useInView`)
 * so they only render once on first scroll-in, then loop a small,
 * domain-specific gesture. All gestures respect `prefers-reduced-motion`
 * with a static fallback.
 *
 * NOT stock video. NOT reused from the deep-dive 1200×500 scenes —
 * those were dark-themed and wouldn't fit the card geometry.
 */

const INK = '#0A0A0A';
const RULE = '#D9D9D9';
const ACCENT = '#0066CC';
const SOFT = '#F4F2EE';

/** Wraps a child SVG with in-view triggered key (so animations re-run on enter). */
function InViewBox({ children, height = 60 }: { children: (active: boolean) => React.ReactNode; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} aria-hidden="true" style={{ width: '100%', height }}>
      {children(inView)}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* InvoiceFieldExtract — invoice page with fields lighting up one-by-one,
   topped by a scan line sweep. Used for Invoice Intelligence card.         */
/* ─────────────────────────────────────────────────────────────────── */
export function InvoiceFieldExtract() {
  const reduced = useReducedMotion() ?? false;

  return (
    <InViewBox>
      {(active) => (
        <svg viewBox="0 0 200 60" className="w-full h-full block" preserveAspectRatio="xMidYMid meet">
          {/* paper */}
          <rect x="62" y="6" width="76" height="48" rx="3" fill="#FFFFFF" stroke={RULE} strokeWidth="1" />
          {/* faded header lines */}
          <line x1="68" y1="13" x2="118" y2="13" stroke={INK} strokeOpacity="0.18" strokeWidth="1" />
          <line x1="68" y1="18" x2="100" y2="18" stroke={INK} strokeOpacity="0.10" strokeWidth="1" />

          {/* extracted field highlights */}
          {[
            { x: 68, y: 24, w: 30, label: 'Vendor', delay: 0.2 },
            { x: 68, y: 32, w: 22, label: 'Amount', delay: 0.7 },
            { x: 68, y: 40, w: 38, label: 'PO ref',  delay: 1.2 },
          ].map((f) => (
            <g key={f.label}>
              {/* base line */}
              <line x1={f.x} y1={f.y + 3} x2={f.x + f.w} y2={f.y + 3} stroke={INK} strokeOpacity="0.18" strokeWidth="1" />
              {/* highlight overlay */}
              {!reduced && (
                <motion.rect
                  x={f.x - 1}
                  y={f.y - 1}
                  width={f.w + 2}
                  height={7}
                  rx={1}
                  fill={ACCENT}
                  fillOpacity="0.18"
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                  transition={active ? { duration: 2.2, repeat: Infinity, repeatDelay: 1.4, delay: f.delay, times: [0, 0.2, 0.7, 1] } : undefined}
                />
              )}
            </g>
          ))}

          {/* scan line sweeping vertically */}
          {!reduced && (
            <motion.line
              x1="62"
              x2="138"
              y1={6}
              y2={6}
              stroke={ACCENT}
              strokeOpacity="0.55"
              strokeWidth="1.2"
              initial={{ y: 6 }}
              animate={active ? { y: [6, 54, 54, 6] } : { y: 6 }}
              transition={active ? { duration: 4.2, repeat: Infinity, ease: 'linear' } : undefined}
            />
          )}

          {/* side glyphs — input/output icons */}
          <g stroke={INK} strokeOpacity="0.35" strokeWidth="1" fill="none">
            {/* In glyph: stack of pages */}
            <rect x="20" y="22" width="22" height="18" rx="1" />
            <rect x="23" y="19" width="22" height="18" rx="1" />
            <rect x="26" y="16" width="22" height="18" rx="1" />
            {/* Out arrow + ledger */}
            <path d="M158 30 L178 30 M173 26 L178 30 L173 34" />
          </g>
          {/* dot pulse arriving at "ledger" */}
          {!reduced && (
            <motion.circle
              cx="172"
              cy="30"
              r={2}
              fill={ACCENT}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: [0, 1, 0] } : { opacity: 0 }}
              transition={active ? { duration: 2.2, repeat: Infinity, repeatDelay: 1.4, delay: 1.6 } : undefined}
            />
          )}
        </svg>
      )}
    </InViewBox>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* PatientWavePulse — voice waveform that pulses with periodic peaks,
   plus a tiny "ring" dot on one end. Used for Patient Call Agent card.    */
/* ─────────────────────────────────────────────────────────────────── */
export function PatientWavePulse() {
  const reduced = useReducedMotion() ?? false;

  // 32 vertical bars — pseudo-random heights, animated as a wave
  const bars = Array.from({ length: 28 }).map((_, i) => {
    const phase = (i * 0.5) % (Math.PI * 2);
    const baseH = 8 + Math.sin(phase) * 6 + ((i * 13) % 11);
    return { i, baseH };
  });

  return (
    <InViewBox>
      {(active) => (
        <svg viewBox="0 0 200 60" className="w-full h-full block" preserveAspectRatio="xMidYMid meet">
          {/* phone glyph left */}
          <g stroke={INK} strokeWidth="1.2" fill="none">
            <circle cx="20" cy="30" r="11" />
            <path d="M16 27c0-1.5 1-3 2.5-3.5l1.5 4-1.5 1.5c.5 1.5 1.5 2.5 3 3l1.5-1.5 4 1.5c-.5 1.5-2 2.5-3.5 2.5-3 0-7-3-7-7z" fill={INK} fillOpacity="0.85" stroke="none" />
          </g>
          {/* ring pulse on phone */}
          {!reduced && (
            <motion.circle
              cx="20"
              cy="30"
              r="11"
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.4"
              initial={{ scale: 1, opacity: 0 }}
              animate={active ? { scale: [1, 1.8], opacity: [0.7, 0] } : { scale: 1, opacity: 0 }}
              transition={active ? { duration: 1.8, repeat: Infinity, ease: 'easeOut' } : undefined}
              style={{ transformOrigin: '20px 30px' }}
            />
          )}

          {/* waveform — 28 vertical bars */}
          <g transform="translate(50, 30)">
            {bars.map(({ i, baseH }) => (
              <motion.rect
                key={i}
                x={i * 5}
                width={2.4}
                y={-baseH / 2}
                height={baseH}
                rx={1.2}
                fill={INK}
                fillOpacity={0.65}
                initial={{ scaleY: 0.4 }}
                animate={active && !reduced ? { scaleY: [0.4, 1.6, 0.6, 1.3, 0.5] } : { scaleY: 1 }}
                transition={
                  active && !reduced
                    ? { duration: 2.4, repeat: Infinity, delay: (i * 0.04) % 0.8, ease: 'easeInOut' }
                    : undefined
                }
                style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
              />
            ))}
          </g>

          {/* booked-slot tick right */}
          <g stroke={ACCENT} strokeWidth="1.6" fill="none">
            <rect x="174" y="20" width="18" height="20" rx="2" stroke={INK} strokeOpacity="0.4" />
            <path d="M178 31 l3 3 l6 -7" />
          </g>
        </svg>
      )}
    </InViewBox>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* FraudAnomalyFlash — grid of claim rows, one flashes red periodically
   while others stay calm. Used for Fraud Intelligence card.               */
/* ─────────────────────────────────────────────────────────────────── */
export function FraudAnomalyFlash() {
  const reduced = useReducedMotion() ?? false;
  const [flashIdx, setFlashIdx] = useState<number>(2);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setFlashIdx((n) => {
        const next = (n + 1 + Math.floor(Math.random() * 3)) % 6;
        return next === n ? (n + 1) % 6 : next;
      });
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  const rows = Array.from({ length: 6 });

  return (
    <InViewBox>
      {(active) => (
        <svg viewBox="0 0 200 60" className="w-full h-full block" preserveAspectRatio="xMidYMid meet">
          {/* container */}
          <rect x="6" y="6" width="188" height="48" rx="3" fill={SOFT} stroke={RULE} strokeWidth="1" />

          {/* header label */}
          <text x="12" y="14" fontFamily="var(--mono)" fontSize="5.4" fill={INK} fillOpacity="0.55" letterSpacing="0.4">
            CLAIM · SCORE · CITED
          </text>

          {/* 6 claim rows */}
          {rows.map((_, i) => {
            const y = 18 + i * 5.7;
            const isFlagged = active && i === flashIdx;
            const flagRed = '#C84A3F';
            return (
              <g key={i}>
                {/* row bg */}
                <motion.rect
                  x={10}
                  y={y}
                  width={180}
                  height={4.8}
                  rx={1}
                  initial={false}
                  animate={{ fill: isFlagged ? flagRed : '#FFFFFF', fillOpacity: isFlagged ? 0.85 : 1 }}
                  transition={{ duration: 0.35 }}
                  stroke={INK}
                  strokeOpacity={0.06}
                />
                {/* claim id */}
                <text x={13} y={y + 3.6} fontFamily="var(--mono)" fontSize="3.6" fill={isFlagged ? '#FFFFFF' : INK} fillOpacity={isFlagged ? 1 : 0.7} letterSpacing="0.4">
                  #2911{7 + i}
                </text>
                {/* fake bar */}
                <rect x={45} y={y + 1.3} width={28 + (i % 3) * 6} height={2.2} rx={1.1} fill={isFlagged ? '#FFFFFF' : INK} fillOpacity={isFlagged ? 0.85 : 0.25} />
                {/* score */}
                <text x={92} y={y + 3.6} fontFamily="var(--mono)" fontSize="3.6" fill={isFlagged ? '#FFFFFF' : INK} fillOpacity={isFlagged ? 1 : 0.7}>
                  {isFlagged ? '0.94' : (0.12 + i * 0.08).toFixed(2)}
                </text>
                {/* cited evidence chip */}
                <rect x={110} y={y + 0.6} width={72} height={3.5} rx={1} fill="none" stroke={isFlagged ? '#FFFFFF' : INK} strokeOpacity={isFlagged ? 0.9 : 0.25} strokeWidth="0.5" />
                <text x={113} y={y + 3.2} fontFamily="var(--mono)" fontSize="2.8" fill={isFlagged ? '#FFFFFF' : INK} fillOpacity={isFlagged ? 1 : 0.5}>
                  {isFlagged ? 'photo + history + invoice' : 'cite ·'}
                </text>
              </g>
            );
          })}

          {/* flash sweep accent — subtle */}
          {!reduced && active && (
            <motion.rect
              x={6}
              y={6}
              width={188}
              height={48}
              rx={3}
              fill="none"
              stroke={ACCENT}
              strokeWidth="0.8"
              strokeOpacity="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0 }}
            />
          )}
        </svg>
      )}
    </InViewBox>
  );
}
