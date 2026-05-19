import { usePageMeta } from '../hooks/usePageMeta';

/**
 * PrivacyPage — placeholder privacy policy aligned with the sovereign-AI
 * promise (data never leaves the customer perimeter). Replace the prose with
 * counsel-reviewed text before legal-binding distribution; this is a
 * good-faith outline of the actual operational posture.
 */

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';

const SECTIONS = [
  {
    id: 'data-we-do-not-collect',
    h: 'Data we do not collect',
    body: (
      <>
        <strong>Customer data never leaves your network.</strong> Every Attentions AI
        agent we ship runs on your hardware, inside your VPC or on-prem.
        Document content, model outputs, audit trails, and fine-tuned model
        weights all stay within your perimeter. We do not have a copy.
      </>
    ),
  },
  {
    id: 'data-we-collect-website',
    h: 'Data we collect through this website',
    body: (
      <ul style={{ marginLeft: 20, listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>
          <strong>Contact-form submissions</strong> (name, work email, company,
          role, intent, message) — sent as a structured email to{' '}
          <a href="mailto:sales@attentions.ai" className="apple-link">sales@attentions.ai</a>.
        </li>
        <li>
          <strong>Aggregated analytics</strong> — page views, country, referrer,
          device class. Cookieless, no personal identifiers, no third-party
          advertising trackers.
        </li>
      </ul>
    ),
  },
  {
    id: 'how-we-use',
    h: 'How we use the information',
    body: (
      <>
        Contact-form submissions are read by a senior architect and used solely
        to respond to your enquiry, scope an engagement, or arrange a follow-up
        call. We do not sell, rent, or share your data with third-party marketing
        partners. We do not enrol you in marketing sequences without explicit
        opt-in.
      </>
    ),
  },
  {
    id: 'retention',
    h: 'Retention',
    body: (
      <>
        Enquiry data is retained for as long as our commercial relationship
        is active and for 18 months after the most recent contact, whichever
        is longer, then deleted. You can request earlier deletion by emailing{' '}
        <a href="mailto:sales@attentions.ai" className="apple-link">sales@attentions.ai</a>{' '}
        with the subject "Delete my data".
      </>
    ),
  },
  {
    id: 'rights',
    h: 'Your rights',
    body: (
      <>
        Under GDPR, UAE PDPL, Indian DPDP, and equivalent regulations, you have
        the right to access, correct, port, or delete your personal data, and
        to withdraw consent. Email{' '}
        <a href="mailto:sales@attentions.ai" className="apple-link">sales@attentions.ai</a>{' '}
        to exercise any of these rights — we acknowledge within 5 business days
        and complete within 30.
      </>
    ),
  },
  {
    id: 'sub-processors',
    h: 'Sub-processors',
    body: (
      <>
        For the website itself we use a single hosting provider (Vercel/Cloudflare
        at the CDN edge) and a single email service for transactional notifications.
        We publish a current list to enterprise prospects on request. <strong>None
        of our sub-processors receive or store customer agent data</strong> — that
        runs entirely inside your perimeter.
      </>
    ),
  },
  {
    id: 'compliance',
    h: 'Compliance',
    body: (
      <>
        SOC 2 Type II · HIPAA · GDPR · ISO 27001 · PCI DSS. Reports available
        under NDA. Most data-residency requirements are met{' '}
        <strong>by architecture</strong> rather than contract — the data
        cannot leave, so most residency rules are satisfied by definition.
      </>
    ),
  },
  {
    id: 'contact',
    h: 'Contact',
    body: (
      <>
        Privacy enquiries:{' '}
        <a href="mailto:sales@attentions.ai" className="apple-link">sales@attentions.ai</a>.
        Postal: Attentions AI Labs · Dubai · Pune.
      </>
    ),
  },
];

export default function PrivacyPage() {
  usePageMeta({
    title: 'Privacy · Sovereign by architecture — Attentions AI',
    description:
      'Customer data never leaves your network. We do not sell, rent, or share data. Cookieless analytics on this site. SOC 2 Type II · HIPAA · GDPR · ISO 27001 · PCI DSS — compliance by architecture, not contract.',
    ogUrl: 'https://attentions.ai/privacy',
  });

  return (
    <main style={{ background: '#FFFFFF' }}>
      <section
        className="relative scroll-mt-20"
        style={{ padding: 'clamp(64px, 9vw, 112px) clamp(16px, 4vw, 32px) clamp(48px, 7vw, 88px)' }}
      >
        <div className="max-w-[820px] mx-auto">
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
            Privacy · effective 2026
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
            Privacy.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Sovereign by architecture, not by contract.
            </span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: CHARCOAL,
              borderLeft: `2px solid ${INK}`,
              paddingLeft: 16,
              maxWidth: 720,
            }}
          >
            We make it{' '}
            <strong style={{ color: INK, fontWeight: 600 }}>structurally impossible</strong>{' '}
            for your data to reach our servers. The agents we build run inside
            your network; this site collects only what you submit through the
            contact form. The pages below explain exactly what that means.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 clamp(16px, 4vw, 32px) clamp(64px, 10vw, 128px)' }}>
        <div className="max-w-[820px] mx-auto flex flex-col gap-10">
          {SECTIONS.map((s, i) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <div
                className="mb-3"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: STEEL,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 2.1vw, 30px)',
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.2,
                  letterSpacing: '-0.012em',
                  marginBottom: 14,
                }}
              >
                {s.h}
              </h2>
              <div
                className="body-apple"
                style={{
                  color: CHARCOAL,
                  borderTop: `1px solid ${RULE}`,
                  paddingTop: 14,
                }}
              >
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
