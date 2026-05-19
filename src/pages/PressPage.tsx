import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * PressPage — a low-key /press placeholder. Lists certifications, founding,
 * offices, and a "for press enquiries" line. Future use: company milestones
 * + LinkedIn cross-posts.
 */

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';

const TIMELINE = [
  { year: '2023', label: 'Founded', body: 'Attentions AI Labs founded in Dubai + Pune by Puneet Kumar Ojha and Ankit Agrahari — ex-Deutsche Telekom Enterprise Architects.' },
  { year: '2024', label: 'First production agents', body: 'Logistics, automotive and healthcare customers go live. Three industries · three document types · zero security incidents.' },
  { year: '2025', label: 'Sovereign platform GA', body: 'The six-layer sovereign-AI platform reaches general availability. Compound base — every next agent runs on the same foundation.' },
  { year: '2026', label: '15 agents live', body: 'Seven detailed in production, eight more shipping across pharma, banking, hospitality, legal, aviation, retail, insurance and manufacturing.' },
] as const;

const CERTIFICATIONS = ['SOC 2 Type II', 'HIPAA', 'GDPR', 'ISO 27001', 'PCI DSS'] as const;

export default function PressPage() {
  usePageMeta({
    title: 'Press & milestones — Attentions AI',
    description:
      'Founded 2023 in Dubai + Pune. 15 sovereign AI agents live in production across logistics, automotive, healthcare. Zero security incidents on record. SOC 2 Type II · HIPAA · GDPR · ISO 27001.',
    ogUrl: 'https://attentions.ai/press',
  });

  return (
    <main style={{ background: '#FFFFFF' }}>
      <section
        className="relative scroll-mt-20"
        style={{ padding: 'clamp(64px, 9vw, 112px) clamp(16px, 4vw, 32px) clamp(48px, 7vw, 80px)' }}
      >
        <div className="max-w-[1080px] mx-auto">
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 13,
              color: STEEL,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Press · milestones · enquiries
          </div>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(34px, 4.4vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: INK,
              marginBottom: 24,
            }}
          >
            Sovereign AI for enterprise.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              The short version.
            </span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: CHARCOAL,
              borderLeft: `2px solid ${INK}`,
              paddingLeft: 16,
              maxWidth: 820,
            }}
          >
            Attentions AI Labs builds sovereign AI agents that run inside the
            customer perimeter — your hardware, your regulator’s rules, your
            audit trail. Founded 2023 in Dubai and Pune. Fifteen agents live
            in production today.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 clamp(16px, 4vw, 32px) clamp(72px, 10vw, 120px)' }}>
        <div className="max-w-[1080px] mx-auto">
          <div
            className="mb-8"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: STEEL,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Timeline
          </div>
          <ol className="flex flex-col" style={{ listStyle: 'none', padding: 0, margin: 0, gap: 0 }}>
            {TIMELINE.map((t, i) => (
              <li
                key={t.year}
                className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-start gap-4 md:gap-10 py-8"
                style={{
                  borderTop: i === 0 ? `1px solid ${RULE}` : undefined,
                  borderBottom: `1px solid ${RULE}`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(28px, 3vw, 44px)',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    color: INK,
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.year}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(20px, 2vw, 26px)',
                      fontWeight: 600,
                      color: INK,
                      lineHeight: 1.25,
                      marginBottom: 8,
                    }}
                  >
                    {t.label}
                  </div>
                  <p className="body-apple" style={{ color: CHARCOAL, maxWidth: 720 }}>
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        style={{
          background: '#F4F2EE',
          padding: 'clamp(56px, 9vw, 96px) clamp(16px, 4vw, 32px)',
        }}
      >
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div
              className="mb-4"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: STEEL,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Certifications
            </div>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(22px, 2.2vw, 32px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Compliance by architecture.
            </h2>
            <p className="body-apple" style={{ color: CHARCOAL, marginBottom: 16 }}>
              The architecture makes data exfiltration impossible by design.
              Certifications are documentation of what is already true.
            </p>
            <div className="flex flex-wrap items-center" style={{ gap: 6 }}>
              {CERTIFICATIONS.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${RULE}`,
                    color: CHARCOAL,
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '6px 11px',
                    borderRadius: 9999,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div
              className="mb-4"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: STEEL,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Press enquiries
            </div>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(22px, 2.2vw, 32px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Talk to the founders.
            </h2>
            <p className="body-apple" style={{ color: CHARCOAL, marginBottom: 16 }}>
              For media, analyst briefings, or to schedule a deep-dive on the
              sovereign-AI architecture, email{' '}
              <a href="mailto:sales@attentions.ai" className="apple-link">sales@attentions.ai</a>{' '}
              with subject "Press". We respond within 4 business hours.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/contact" className="apple-pill">
                Contact <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://www.linkedin.com/company/attentions"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-pill-ghost"
              >
                Follow on LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
