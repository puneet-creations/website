import { useInView } from '../hooks/useInView';

/**
 * OutcomeTiles — "What we have done" grid for business buyers.
 * 6 tiles with CFO-ready business outcomes, named execs, and
 * time-to-value pills. This is the proof section that sits
 * directly after the regulated-pain hook and before the deep
 * case study stories. Scanning buyers walk away with a number
 * they can put in a board deck.
 */

type Tile = {
  client: string;
  industry: string;
  logoBg: string;
  logoInk: string;
  logoMark: string;
  pain: string;
  metric: string;
  metricSub: string;
  quote: string;
  attributedTo: string;
  ttv: string;
  accent: string;
};

const tiles: Tile[] = [
  {
    client: 'Thomson Group',
    industry: 'Logistics · Dubai HQ',
    logoBg: 'rgba(138,245,192,0.06)',
    logoInk: '#8af5c0',
    logoMark: 'TG',
    pain: 'A 14,000-voucher Monday backlog that took 4 AP clerks until Wednesday to clear.',
    metric: '10:42 AM',
    metricSub: 'Backlog cleared by',
    quote: '"We reassigned two headcount within 6 weeks. The board asked what else we could do."',
    attributedTo: 'CFO',
    ttv: 'Live in 4 weeks',
    accent: '#8af5c0',
  },
  {
    client: 'Daimler Asia',
    industry: 'Automotive · Jakarta',
    logoBg: 'rgba(142,166,255,0.06)',
    logoInk: '#8ea6ff',
    logoMark: 'DA',
    pain: 'Tracing a turbo fault to a supplier batch took 3 teams, 6 weeks, and a Stuttgart flight.',
    metric: '4 hours',
    metricSub: 'Root cause + 8D draft',
    quote: '"We caught a 1,284-unit stop-ship before it hit customers. That is a ¥ 9-figure recall avoided."',
    attributedTo: 'Head of QE',
    ttv: 'Live in 5 weeks',
    accent: '#8ea6ff',
  },
  {
    client: 'Qira Labs',
    industry: 'Dental · 38 clinics · SF',
    logoBg: 'rgba(245,168,212,0.06)',
    logoInk: '#f5a8d4',
    logoMark: 'Q',
    pain: 'Missed after-hours calls were leaking $18K/week in unbooked crowns and fillings.',
    metric: '$1,945',
    metricSub: 'Recovered on day one',
    quote: '"The AI answers in one ring and books on the right chair. My front desk stopped hating Mondays."',
    attributedTo: 'Founder',
    ttv: 'Live in 3 weeks',
    accent: '#f5a8d4',
  },
  {
    client: 'Thomson Group',
    industry: 'Logistics · Dubai HQ',
    logoBg: 'rgba(255,180,80,0.06)',
    logoInk: '#ffd080',
    logoMark: 'TG',
    pain: 'Public LLM token bills grew 340% YoY on a workflow a small model could handle.',
    metric: '−92%',
    metricSub: 'Per-document cost',
    quote: '"We stopped paying frontier rates to classify freight invoices. Fixed infra cost, fixed per month."',
    attributedTo: 'CIO',
    ttv: 'Fixed monthly cost',
    accent: '#ffd080',
  },
  {
    client: 'Daimler Asia',
    industry: 'Automotive · Jakarta',
    logoBg: 'rgba(255,120,120,0.06)',
    logoInk: '#ff9090',
    logoMark: 'DA',
    pain: 'GDPR + supply-chain IP risk blocked any model from leaving the internal VPC.',
    metric: '0',
    metricSub: 'Bytes left your servers',
    quote: '"We cleared CISO and DPO review in one meeting. Nothing we do ever leaves the data centre."',
    attributedTo: 'CISO',
    ttv: 'On-prem · air-gapped',
    accent: '#ff9090',
  },
  {
    client: 'Qira Labs',
    industry: 'Dental · 38 clinics · SF',
    logoBg: 'rgba(138,245,192,0.06)',
    logoInk: '#8af5c0',
    logoMark: 'Q',
    pain: 'Billing rejections from inconsistent ICD / CDT codes across 42 dentists.',
    metric: '99.2%',
    metricSub: 'First-pass claim acceptance',
    quote: '"Same patient, same visit — the code is identical every time. Our biller got her evenings back."',
    attributedTo: 'Operations Lead',
    ttv: 'Deterministic by design',
    accent: '#8af5c0',
  },
];

export default function OutcomeTiles() {
  const [ref, inView] = useInView<HTMLElement>(0.12);

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--bg-s4)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-[760px] mx-auto">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>
            What we have already done
          </div>
          <h2 className={`display-2 sr d-1 ${inView ? 'is-in' : ''}`}>
            Six outcomes. <span className="italic">All live this quarter.</span>
          </h2>
          <p className={`mt-4 text-[18px] text-[rgba(0,0,0,0.65)] sr d-2 ${inView ? 'is-in' : ''}`}>
            Not pilots. Not slideware. Regulated production workflows running on sovereign AI today — each with the named executive who brought it home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiles.map((t, i) => (
            <article
              key={i}
              className={`rounded-[24px] p-7 sr ${inView ? 'is-in' : ''}`}
              style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: 'rgba(0,0,0,0.04) 0 0 0 1px',
                transitionDelay: `${(i % 3) * 120 + Math.floor(i / 3) * 60}ms`,
              }}
            >
              {/* Header — logo + client */}
              <header className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-display font-semibold text-[14px] flex-shrink-0"
                  style={{ background: t.logoBg, color: t.logoInk, border: '1px solid rgba(0,0,0,0.06)' }}
                >
                  {t.logoMark}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[15px] text-black leading-tight">{t.client}</div>
                  <div className="text-[12px] text-[rgba(0,0,0,0.65)]">{t.industry}</div>
                </div>
              </header>

              {/* Pain — small, muted */}
              <div className="text-[13px] text-[rgba(0,0,0,0.65)] mb-4 italic leading-snug">
                "{t.pain}"
              </div>

              {/* Metric — hero number */}
              <div className="mb-5 pb-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div
                  className="font-display text-[44px] leading-none mb-1"
                  style={{ color: t.accent }}
                >
                  {t.metric}
                </div>
                <div className="micro-upper text-[rgba(0,0,0,0.65)]">{t.metricSub}</div>
              </div>

              {/* Quote */}
              <blockquote className="text-[13.5px] text-[rgba(0,0,0,0.75)] leading-relaxed mb-3">
                {t.quote}
              </blockquote>
              <div className="text-[12px] text-[rgba(0,0,0,0.65)] mb-5">— {t.attributedTo}</div>

              {/* Time-to-value pill */}
              <div
                className="capsule-light inline-flex items-center gap-2 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />
                {t.ttv}
              </div>
            </article>
          ))}
        </div>

        {/* CTA row */}
        <div className={`text-center mt-12 sr d-4 ${inView ? 'is-in' : ''}`}>
          <a href="/solutions" className="btn-outline">
            See solutions →
          </a>
        </div>
      </div>
    </section>
  );
}
