import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * PlatformWhySection — replaces the 3-tab PlatformCard on the Platform page.
 * Two-column layout: manifesto text on the left, before/after glyph on the right.
 * ~600px tall instead of the previous 3,400px.
 */

export default function PlatformWhySection() {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s1)', padding: 'clamp(80px, 12vw, 140px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: manifesto text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="micro-upper mb-5" style={{ color: 'rgba(0,0,0,0.55)' }}>
              Why a platform
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#000000',
              }}
            >
              Prompt-wrapping makes demos.{' '}
              <span style={{ fontStyle: 'italic' }}>A platform ships agents.</span>
            </h2>
            <p
              className="max-w-[520px]"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.4vw, 20px)',
                lineHeight: 1.55,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              Six teams stitching prompts into five different LLMs isn&rsquo;t a strategy &mdash;
              it&rsquo;s a bill. One sovereign base. Six shared layers. Every new agent
              compounds on what the last one built.
            </p>
          </motion.div>

          {/* Right: before/after glyph */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <BeforeAfterGlyph />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function BeforeAfterGlyph() {
  return (
    <svg viewBox="0 0 480 360" fill="none" className="w-full max-w-[520px] h-auto">
      {/* LEFT side: BEFORE — 5 scattered disconnected circles */}
      <g>
        <text x="100" y="40" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="0.1em" fill="rgba(0,0,0,0.50)">BEFORE</text>
        <text x="100" y="58" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(0,0,0,0.40)">5 teams · 5 stacks</text>

        {[
          { cx: 55, cy: 120 }, { cx: 140, cy: 115 }, { cx: 95, cy: 175 },
          { cx: 45, cy: 225 }, { cx: 155, cy: 235 },
        ].map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r="22" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
        ))}

        <text x="100" y="295" textAnchor="middle" fontFamily="'Fraunces', serif" fontSize="14" fontStyle="italic" fill="rgba(0,0,0,0.55)">disconnected</text>
      </g>

      {/* Arrow */}
      <g transform="translate(215, 175)">
        <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
        <polygon points="40,0 34,-5 34,5" fill="rgba(0,0,0,0.45)" />
      </g>

      {/* RIGHT side: AFTER — 5 circles stacked on one base */}
      <g transform="translate(280, 0)">
        <text x="100" y="40" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" letterSpacing="0.1em" fill="#000000">AFTER</text>
        <text x="100" y="58" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="rgba(0,0,0,0.45)">1 base · shared</text>

        {/* 5 connected circles */}
        {[
          { cx: 45, cy: 125 }, { cx: 80, cy: 100 }, { cx: 120, cy: 100 },
          { cx: 155, cy: 125 }, { cx: 100, cy: 80 },
        ].map((c, i) => (
          <g key={i}>
            <line x1={c.cx} y1={c.cy} x2="100" y2="215" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            <circle cx={c.cx} cy={c.cy} r="18" fill="#ffffff" stroke="#000000" strokeWidth="1.8" />
          </g>
        ))}

        {/* Base platform */}
        <rect x="25" y="215" width="150" height="36" rx="8" fill="#000000" />
        <text x="100" y="238" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="13" fontWeight="700" fill="#ffffff" letterSpacing="0.08em">ARTIGEN</text>

        <text x="100" y="295" textAnchor="middle" fontFamily="'Fraunces', serif" fontSize="14" fontStyle="italic" fill="#000000">6 layers · shared</text>
      </g>
    </svg>
  );
}
