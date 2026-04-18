import { Truck, Car, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * ProductionProof — 3 white cards with real production clients.
 * Matches IsThisYou pattern: black top strip, Lucide icon, serif heading,
 * ✓ checklist, capsule-light proof chip.
 * Middle card animates in first from below, sides slide in from left/right.
 */

const clients = [
  {
    icon: Truck,
    label: 'Thomson Group · Logistics · Dubai',
    title: 'Eighteen thousand vouchers.',
    titleAccent: 'Every month.',
    metric: '88%',
    metricLabel: 'no-touch processing',
    bullets: [
      'Invoice Intelligence · 6× ROI week one',
      'Voucher Matching · 5 min vs 2 hours',
      'SAP S/4HANA · posted with full audit trail',
    ],
    quote: 'We reassigned two headcount within 6 weeks. The board asked what else we could do.',
    attribution: 'CFO · Thomson Group',
    proof: '18,000 vouchers / mo',
  },
  {
    icon: Car,
    label: 'Daimler Asia · Auto OEM · SE Asia',
    title: 'One point two million reports.',
    titleAccent: 'One knowledge graph.',
    metric: '1.2M',
    metricLabel: 'PCR reports indexed',
    bullets: [
      'PCR Intelligence · cross-format (PDF · XLS · DMS)',
      'Root cause traced in hours, not weeks',
      '8D report · D1–D8 auto-drafted with citations',
    ],
    quote: 'The same turbocharger failure described three ways by three teams — we never connected them before.',
    attribution: 'Quality Director · Daimler Asia',
    proof: '1.2M reports indexed',
  },
  {
    icon: Stethoscope,
    label: 'Qira Labs · Dental · 38 clinics',
    title: 'Every consult.',
    titleAccent: 'SOAP done in 30 seconds.',
    metric: '$400K+',
    metricLabel: 'recovered per location / year',
    bullets: [
      'Voice AI · on-prem ASR · ICD-10 synced to Dentrix',
      'Patient Experience OS · every call answered 24/7',
      '50% of physician admin time reclaimed',
    ],
    quote: 'We cleared CISO and DPO review in one meeting. Nothing we do ever leaves the data centre.',
    attribution: 'CISO · Qira Labs',
    proof: '38 clinics · 2,400 consults/wk',
  },
];

export default function ProductionProof() {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="production"
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-s2)', padding: 'clamp(80px, 12vw, 140px) 24px' }}
    >
      <div className="cf-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-[1320px] mx-auto">

        {/* Section header */}
        <div className="text-center mb-16 max-w-[720px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.65)' }}>
            Production proof
          </div>
          <h2
            className={`sr d-1 ${inView ? 'is-in' : ''}`}
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 56px)',
              letterSpacing: '-0.025em',
              color: '#000000',
              lineHeight: 1.1,
            }}
          >
            Not a pilot. Not a POC.{' '}
            <span style={{ fontStyle: 'italic' }}>Production. Named.</span>
          </h2>
        </div>

        {/* 3 client cards — middle enters first from below */}
        <div className="grid md:grid-cols-3 gap-8">
          {clients.map((c, i) => {
            const isMiddle = i === 1;
            const delay = isMiddle ? 0 : 0.45;
            const initialX = i === 0 ? -60 : i === 2 ? 60 : 0;
            const initialY = isMiddle ? 80 : 0;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: initialY, x: initialX }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 55, damping: 15, delay }}
                className="group"
              >
                <div
                  className="relative rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                    minHeight: 620,
                  }}
                >
                  {/* Top strip */}
                  <div className="h-1 w-full" style={{ background: '#000000' }} />

                  <div className="p-10 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
                    >
                      <c.icon className="w-9 h-9" style={{ color: '#000000' }} strokeWidth={1.5} />
                    </div>

                    {/* Label */}
                    <div
                      className="mb-3"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(0,0,0,0.50)',
                      }}
                    >
                      {c.label}
                    </div>

                    {/* Heading */}
                    <h3
                      className="mb-5"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(22px, 2vw, 28px)',
                        fontWeight: 600,
                        lineHeight: 1.15,
                        color: '#000000',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {c.title}{' '}
                      <span style={{ fontStyle: 'italic' }}>{c.titleAccent}</span>
                    </h3>

                    {/* Metric */}
                    <div className="flex items-baseline gap-3 mb-5 pb-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <span
                        className="leading-none"
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize: 'clamp(36px, 3.5vw, 48px)',
                          fontWeight: 600,
                          fontStyle: 'italic',
                          color: '#000000',
                        }}
                      >
                        {c.metric}
                      </span>
                      <span
                        className="text-[14px] uppercase tracking-wider leading-tight"
                        style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--mono)' }}
                      >
                        {c.metricLabel}
                      </span>
                    </div>

                    {/* Checklist */}
                    <ul className="space-y-3 mb-6 text-left">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-semibold text-white mt-0.5"
                            style={{ background: '#000000' }}
                          >
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Quote */}
                    <blockquote
                      className="text-[15px] leading-relaxed mb-2"
                      style={{ color: 'rgba(0,0,0,0.70)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}
                    >
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    <div className="text-[13px] mb-6" style={{ color: 'rgba(0,0,0,0.45)', fontFamily: 'var(--mono)' }}>
                      {c.attribution}
                    </div>

                    {/* Proof capsule */}
                    <div
                      className="capsule-light self-start"
                      style={{ padding: '8px 16px', fontSize: 12 }}
                    >
                      {c.proof}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
