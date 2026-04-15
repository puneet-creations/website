import { FileText, Mic, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

/**
 * AgentFamilies — 3 agent family cards matching the landing page white theme.
 * Clean white cards with black top strip, icon, label, heading, checklist, proof.
 * Middle card animates in first from below, then sides slide in from left/right.
 */

const families = [
  {
    icon: FileText,
    label: 'Document Agents',
    title: 'Read anything.',
    titleAccent: 'Cite everything.',
    bullets: [
      'Cross-doc reconciliation (PO ↔ GRN ↔ Invoice)',
      'Field-level confidence + provenance citation',
      'Writes to SAP · Oracle · Dynamics · NetSuite',
    ],
    proof: 'Thomson Group · 18,000 vouchers/mo',
  },
  {
    icon: Mic,
    label: 'Voice Agents',
    title: 'Listen. Structure.',
    titleAccent: 'Route.',
    bullets: [
      'On-prem ASR (no audio leaves your VPC)',
      'Domain NER — dental · radiology · legal',
      'Writes to Dentrix · Epic · Salesforce',
    ],
    proof: 'Qira Labs · 2,400 consults/week',
  },
  {
    icon: Layers,
    label: 'Multimodal Agents',
    title: 'Docs + voice + images,',
    titleAccent: 'fused.',
    bullets: [
      'Vision + speech + text fused at runtime',
      'Cross-modal citations — "from the photo"',
      'Image forensics (stamps · signatures)',
    ],
    proof: 'Daimler Asia · warranty claims',
  },
];

export default function AgentFamilies() {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section ref={ref} id="families" className="py-28 px-6 relative overflow-hidden" style={{ background: 'var(--bg-s2)' }}>
      <div className="cf-grid absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-[1320px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 max-w-[760px] mx-auto">
          <div className={`micro-upper mb-4 sr ${inView ? 'is-in' : ''}`} style={{ color: 'rgba(0,0,0,0.65)' }}>
            Three families. One platform.
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
            Document, voice, multimodal.{' '}
            <span style={{ fontStyle: 'italic' }}>One platform underneath.</span>
          </h2>
        </div>

        {/* 3 family cards — middle card enters first from below */}
        <div className="grid md:grid-cols-3 gap-8">
          {families.map((f, i) => {
            const isMiddle = i === 1;
            const delay = isMiddle ? 0 : 0.45;
            const initialX = i === 0 ? -60 : i === 2 ? 60 : 0;
            const initialY = isMiddle ? 80 : 0;
            return (
              <motion.div
                key={f.label}
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
                    minHeight: 560,
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
                      <f.icon className="w-9 h-9" style={{ color: '#000000' }} strokeWidth={1.5} />
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
                      {f.label}
                    </div>

                    {/* Heading */}
                    <h3
                      className="mb-6"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(24px, 2.3vw, 30px)',
                        fontWeight: 600,
                        lineHeight: 1.15,
                        color: '#000000',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {f.title}{' '}
                      <span style={{ fontStyle: 'italic' }}>{f.titleAccent}</span>
                    </h3>

                    {/* Checklist */}
                    <ul className="space-y-3 mb-8 text-left">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[17px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.70)' }}>
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

                    {/* Proof capsule */}
                    <div
                      className="capsule-light self-start"
                      style={{ padding: '8px 16px', fontSize: 12 }}
                    >
                      {f.proof}
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
