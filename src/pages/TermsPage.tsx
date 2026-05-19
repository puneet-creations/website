import { usePageMeta } from '../hooks/usePageMeta';

/**
 * TermsPage — placeholder terms of service. Like PrivacyPage, this is a
 * good-faith outline that mirrors the actual deck-canon commercial posture
 * (fixed scope, fixed fee, no scope creep). Replace with counsel-reviewed
 * MSA / service-agreement language before legal-binding distribution.
 */

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';

const SECTIONS = [
  {
    id: 'engagement-shape',
    h: 'Engagement shape',
    body: (
      <>
        Three ways to start, listed in order of commitment — a 2-week paid
        assessment ($5,000 USD fixed), a single sovereign agent live in
        four weeks (from $10,000 USD per agent, up to $50K for a complex
        workflow), or the full platform deployed in six weeks ($20,000 USD/year
        + $10,000 USD per custom agent). Each engagement begins with a signed
        statement of work that names the success measure and the contract
        numbers.
      </>
    ),
  },
  {
    id: 'fixed-scope-fee',
    h: 'Fixed scope, fixed fee',
    body: (
      <>
        The numbers in the assessment are the numbers on the contract. No
        time-and-materials, no change orders, no mid-flight rewrites without
        a co-signed amendment. If the named success measure is not hitting
        post-go-live, we revisit scope before we invoice the next milestone.
      </>
    ),
  },
  {
    id: 'data-ownership',
    h: 'Your data, your IP',
    body: (
      <>
        Customer data, the fine-tuned model weights derived from it, the
        agent code and connectors, audit logs, and the production runbook
        are all owned by the customer. Attentions AI retains the right to
        reuse the platform layers (runtime, model router, hallucination
        control, generic connectors, governance, security) across engagements.
        Nothing customer-specific is reused.
      </>
    ),
  },
  {
    id: 'sla',
    h: 'Service level',
    body: (
      <>
        For production engagements, default response times: <strong>P1 (production
        down) — 1 business hour</strong>; P2 (degraded) — 4 business hours;
        P3 (advisory) — 1 business day. Coverage is 09:00–22:00 GST + on-call
        rotation; 24×7 is available on request.
      </>
    ),
  },
  {
    id: 'acceptable-use',
    h: 'Acceptable use',
    body: (
      <>
        Don't use our platform or agents to violate applicable law, infringe
        third-party rights, generate disinformation, or produce content that
        breaches the customer's own AI-use policy. We may refuse to ship an
        agent for use cases we judge to be high-harm or non-compliant.
      </>
    ),
  },
  {
    id: 'warranties-liability',
    h: 'Warranties &amp; liability',
    body: (
      <>
        Attentions AI warrants that delivered agents perform against the
        named success measure agreed at kickoff. Beyond that named measure,
        the services are provided "as is" — agents are tools, not insurance.
        Aggregate liability is capped at fees paid in the preceding 12 months.
        Carve-outs for IP indemnity, confidentiality breaches, and gross
        negligence are negotiated in the MSA.
      </>
    ),
  },
  {
    id: 'termination',
    h: 'Termination',
    body: (
      <>
        Either party may terminate for cause with 30 days' notice. On
        termination we hand over: model weights, agent code, connectors,
        audit logs, runbooks. There is no proprietary lock-in — every agent
        we ship can be operated by the customer's team or a third party
        without us in the loop.
      </>
    ),
  },
  {
    id: 'governing-law',
    h: 'Governing law',
    body: (
      <>
        Engagement-specific governing law and venue are agreed in the MSA per
        customer (typically Dubai, Mumbai, Singapore, or the customer's home
        jurisdiction). Disputes are resolved by good-faith negotiation, then
        mediation, then arbitration as specified in the MSA.
      </>
    ),
  },
  {
    id: 'contact',
    h: 'Contact',
    body: (
      <>
        Commercial questions:{' '}
        <a href="mailto:sales@attentions.ai" className="apple-link">sales@attentions.ai</a>.
        Postal: Attentions AI Labs · Dubai · Pune.
      </>
    ),
  },
];

export default function TermsPage() {
  usePageMeta({
    title: 'Terms · Fixed scope, fixed fee — Attentions AI',
    description:
      'Three engagement shapes, fixed scope, fixed fee. Your data and IP stay yours. SLA, acceptable use, liability, termination — the commercial posture behind the sovereign-AI promise.',
    ogUrl: 'https://attentions.ai/terms',
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
            Terms · effective 2026
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
            Terms.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Fixed scope, fixed fee.
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
            <strong style={{ color: INK, fontWeight: 600 }}>
              The numbers in the assessment are the numbers on the contract.
            </strong>{' '}
            The pages below restate that commitment in operational detail —
            engagement shape, ownership, service level, liability, termination.
            For binding terms, the signed MSA wins; this page is the public
            statement of our commercial posture.
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
