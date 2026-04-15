import { useInView } from '../../hooks/useInView';
import { GradientCard } from '../ui/gradient-card';

/**
 * ProductionProof — "Is this real?" section.
 *
 * Three premium GradientCards — one per named customer.
 * Each card has: accent glow, hero metric, agent workflow strip,
 * exec quote with photo, and a LIVE pulse indicator.
 * Cards use 3D tilt + glass reflection from GradientCard.
 */

type Customer = {
  mark: string;
  company: string;
  badge: string;
  accent: string;
  accentSecondary: string;
  agents: string;
  heroMetric: string;
  heroLabel: string;
  workflow: string[];
  quote: string;
  attr: string;
  attrRole: string;
  photo: string;
};

const customers: Customer[] = [
  {
    mark: 'TG',
    company: 'Thomson Group',
    badge: 'Fortune 500 Logistics \u00b7 Dubai',
    accent: '#8af5c0',
    accentSecondary: '#187574',
    agents: 'Invoice Intelligence + Voucher Matching',
    heroMetric: '88%',
    heroLabel: 'no-touch processing',
    workflow: ['Receive \u2192 OCR any format', 'Extract \u2192 Vendor, amount, GL', 'Match \u2192 PO + GRN, 3-way', 'Post \u2192 SAP S/4HANA'],
    quote: 'Before we\u2019ve had our morning coffee, it\u2019s done. Posted. Audited.',
    attr: 'CFO',
    attrRole: 'Thomson Group',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    mark: 'DA',
    company: 'Daimler Asia',
    badge: 'European Auto OEM \u00b7 SE Asia',
    accent: '#8ea6ff',
    accentSecondary: '#2e3b7f',
    agents: 'PCR Intelligence',
    heroMetric: '1.2M',
    heroLabel: 'reports \u2192 root cause in hours',
    workflow: ['Ingest \u2192 1.2M+ reports, all formats', 'Graph \u2192 Cross-team correlation', 'Trace \u2192 Supplier batch, cited', 'Draft \u2192 8D auto-filled'],
    quote: 'Three teams, three descriptions of the same failure. artiGen found the answer in hours.',
    attr: 'Head of Quality Engineering',
    attrRole: 'Daimler Asia',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  },
  {
    mark: 'Q',
    company: 'Qira Labs',
    badge: '38 Dental Clinics \u00b7 San Francisco',
    accent: '#f5a8d4',
    accentSecondary: '#8a2c6a',
    agents: 'Voice AI \u00b7 SOAP + Patient Experience OS',
    heroMetric: '$400K+',
    heroLabel: 'recovered per location/year',
    workflow: ['Listen \u2192 Real-time, on-device', 'Generate \u2192 SOAP + ICD-10', 'Answer \u2192 Every call, 24/7', 'Recover \u2192 No-shows, follow-ups'],
    quote: 'Patients actually get called back. Notes are written before the doctor walks out.',
    attr: 'Founder',
    attrRole: 'Qira Labs',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
  },
];

export default function ProductionProof() {
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section id="production" ref={ref} className="py-24 relative" style={{ background: 'var(--bg-s1)' }}>
      <div className="cf-grid absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-[760px] mx-auto">
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Not a pilot. Not a POC.{' '}
            <span className="italic">Production.</span> Named.
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {customers.map((c, i) => (
            <div
              key={c.company}
              className={`sr ${inView ? 'is-in' : ''}`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              <GradientCard accent={c.accent} accentSecondary={c.accentSecondary} radius={24}>
                <div className="p-7 flex flex-col" style={{ minHeight: 480 }}>

                  {/* ── Top: Company header + LIVE ── */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[14px] flex-shrink-0"
                        style={{
                          fontFamily: 'var(--mono)',
                          background: 'rgba(255,255,255,0.10)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        {c.mark}
                      </div>
                      <div>
                        <div className="text-[15px] text-white font-semibold" style={{ fontFamily: 'var(--serif)' }}>
                          {c.company}
                        </div>
                        <div className="text-[14px]" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--mono)' }}>
                          {c.badge}
                        </div>
                      </div>
                    </div>

                    {/* LIVE pulse */}
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                          style={{ background: '#4ade80' }}
                        />
                        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#4ade80' }} />
                      </span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: '#4ade80', letterSpacing: '0.08em', fontWeight: 700 }}>
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* ── Hero metric ── */}
                  <div className="mb-6">
                    <div
                      className="leading-none mb-1"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(48px, 5vw, 64px)',
                        fontWeight: 600,
                        fontStyle: 'italic',
                        color: '#ffffff',
                        filter: 'none',
                      }}
                    >
                      {c.heroMetric}
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 14, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase' }}>
                      {c.heroLabel}
                    </div>
                  </div>

                  {/* ── Agent name ── */}
                  <div
                    className="mb-4 text-[14px] font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'var(--mono)', color: '#ffffff' }}
                  >
                    {c.agents}
                  </div>

                  {/* ── Workflow strip — 4 steps in a compact row ── */}
                  <div
                    className="grid grid-cols-2 gap-1.5 mb-6 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {c.workflow.map((step, si) => (
                      <div
                        key={si}
                        className="flex items-center gap-2 text-[14px] leading-snug py-1.5"
                        style={{ color: 'rgba(255,255,255,0.70)', fontFamily: 'var(--mono)' }}
                      >
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                          style={{ background: 'rgba(255,255,255,0.10)', color: '#ffffff' }}
                        >
                          {si + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>

                  {/* ── Spacer to push quote to bottom ── */}
                  <div className="flex-1" />

                  {/* ── Quote + attribution ── */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} className="pt-5">
                    <blockquote
                      className="text-[15px] leading-relaxed mb-4"
                      style={{ color: 'rgba(255,255,255,0.88)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}
                    >
                      &ldquo;{c.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <img
                        src={c.photo}
                        alt={c.attr}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <div className="text-[14px] font-medium text-white">{c.attr}</div>
                        <div className="text-[14px]" style={{ color: 'rgba(255,255,255,0.65)' }}>{c.attrRole}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </GradientCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
