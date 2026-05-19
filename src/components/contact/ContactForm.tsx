import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

/**
 * ContactForm — sales@attentions.ai capture form, deck-aligned look.
 *
 * Static React form (no backend). On submit, builds a structured mailto: link
 * with the form payload as the email body and opens the user's mail client.
 * That's deliberate: it keeps the page static (no server, no third-party form
 * service), preserves the founder-led handoff promise, and the user still
 * sees a confirmation banner without leaving the page.
 *
 * Field set mirrors the procurement intake we'd ask anyway during the
 * 2-week assessment kickoff:
 *   - name (signed lead name)
 *   - workEmail (validated, used as reply-to)
 *   - company (qualifies the prospect)
 *   - role (helps route to the right architect)
 *   - intent (Assessment / Agent / Platform / Other — deck-canon offerings)
 *   - message (free-form context — workflow, regulator, timeline)
 */

const INTENTS = [
  { value: 'assessment', label: '$5K · 2-week assessment' },
  { value: 'agent',      label: 'From $10K · agent in 4 weeks' },
  { value: 'platform',   label: '$20K/yr · platform + 3 agents' },
  { value: 'security',   label: 'Security briefing' },
  { value: 'other',      label: 'Something else' },
] as const;

type IntentValue = (typeof INTENTS)[number]['value'];

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';
const ICE = '#E8E8E8';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [intent, setIntent] = useState<IntentValue>('assessment');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const intentLabel = INTENTS.find((i) => i.value === intent)?.label ?? '';

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Browser-native validation covers most cases via `required` + `type=email`.
    // This is a defensive belt-and-suspenders check for trimmed-empty inputs.
    if (!name.trim() || !workEmail.trim() || !company.trim() || !message.trim()) {
      setError('Please fill name, work email, company and message.');
      return;
    }

    const subject = `[${intentLabel}] ${company} — ${name}`;
    const body = [
      `Name: ${name}`,
      `Work email: ${workEmail}`,
      `Company: ${company}`,
      role.trim() ? `Role: ${role}` : null,
      `Intent: ${intentLabel}`,
      '',
      'Context:',
      message,
      '',
      '— Sent from attentions.ai/contact',
    ]
      .filter(Boolean)
      .join('\n');

    const href = `mailto:sales@attentions.ai?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // Open the mail client in the same tab. Most browsers handle this gracefully
    // even when the OS has no default mail handler (they show a prompt).
    window.location.href = href;
    setSubmitted(true);
  };

  // Shared input styling — calm brochure, deck palette
  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    fontSize: 15,
    fontFamily: 'var(--sans, "Plus Jakarta Sans")',
    background: '#FFFFFF',
    color: INK,
    border: `1px solid ${RULE}`,
    borderRadius: 8,
    lineHeight: 1.4,
    outline: 'none',
    transition: 'border-color 0.15s ease',
  };

  const labelBase: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--mono)',
    fontSize: 11,
    fontWeight: 700,
    color: STEEL,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    marginBottom: 6,
  };

  return (
    <section
      id="contact-form"
      className="relative scroll-mt-20"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(72px, 10vw, 128px) clamp(16px, 3vw, 32px)',
      }}
    >
      <div className="max-w-[920px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12 text-center">
          <div
            className="mb-4"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: STEEL,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Send sales · sales@attentions.ai · reply in 4 business hours
          </div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(28px, 3.4vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: INK,
            }}
          >
            Tell us what you need.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              We map it to the right engagement.
            </span>
          </h2>
          <p
            className="mt-4 max-w-[640px] mx-auto"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              lineHeight: 1.55,
              color: CHARCOAL,
            }}
          >
            One senior architect reads every submission. No SDRs, no auto-replies.
            If your timeline is tight, say so — we’ll get back inside the same business day.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-[640px]"
            style={{
              background: ICE,
              border: `1px solid ${RULE}`,
              borderRadius: 16,
              padding: '32px 28px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: INK,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Mail client opened
            </div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(22px, 2.2vw, 30px)',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: 10,
              }}
            >
              Your draft is ready to send.
            </h3>
            <p style={{ fontSize: 15, color: CHARCOAL, lineHeight: 1.55, marginBottom: 16 }}>
              We’ve pre-filled the message to{' '}
              <a
                href="mailto:sales@attentions.ai"
                style={{
                  color: INK,
                  fontWeight: 600,
                  borderBottom: `1px solid ${INK}`,
                  textDecoration: 'none',
                }}
              >
                sales@attentions.ai
              </a>
              . Hit send in your mail client and a senior architect will reply within 4 business hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="inline-flex items-center justify-center gap-2"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: STEEL,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
              }}
            >
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            noValidate={false}
          >
            <div>
              <label htmlFor="cf-name" style={labelBase}>Name</label>
              <input
                id="cf-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Jane Doe"
                style={inputBase}
                onFocus={(e) => (e.currentTarget.style.borderColor = INK)}
                onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
              />
            </div>

            <div>
              <label htmlFor="cf-email" style={labelBase}>Work email</label>
              <input
                id="cf-email"
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="jane@yourcompany.com"
                style={inputBase}
                onFocus={(e) => (e.currentTarget.style.borderColor = INK)}
                onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
              />
            </div>

            <div>
              <label htmlFor="cf-company" style={labelBase}>Company</label>
              <input
                id="cf-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                autoComplete="organization"
                placeholder="Your company"
                style={inputBase}
                onFocus={(e) => (e.currentTarget.style.borderColor = INK)}
                onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
              />
            </div>

            <div>
              <label htmlFor="cf-role" style={labelBase}>Role <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500, color: STEEL }}>(optional)</span></label>
              <input
                id="cf-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                autoComplete="organization-title"
                placeholder="CIO, Head of Procurement, …"
                style={inputBase}
                onFocus={(e) => (e.currentTarget.style.borderColor = INK)}
                onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="cf-intent" style={labelBase}>What you want to scope</label>
              <select
                id="cf-intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value as IntentValue)}
                style={{
                  ...inputBase,
                  appearance: 'none',
                  paddingRight: 40,
                  // Single chevron via inline SVG, drawn in steel color
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%236B6B6B%27 stroke-width=%271.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = INK)}
                onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
              >
                {INTENTS.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="cf-msg" style={labelBase}>Context — workflow, regulator, timeline</label>
              <textarea
                id="cf-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder={
                  'Example: We process ~14k payment vouchers/month across 20+ business units. Looking to scope an AP automation pilot in Q1, board sign-off needed by March.'
                }
                style={{ ...inputBase, resize: 'vertical', minHeight: 140, fontFamily: 'inherit' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = INK)}
                onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
              />
            </div>

            {error && (
              <div
                className="md:col-span-2"
                role="alert"
                style={{
                  fontSize: 13,
                  color: '#B91C1C',
                  background: 'rgba(185,28,28,0.06)',
                  border: '1px solid rgba(185,28,28,0.18)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontFamily: 'var(--mono)',
                }}
              >
                {error}
              </div>
            )}

            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p
                style={{
                  fontSize: 12,
                  color: STEEL,
                  lineHeight: 1.45,
                  fontFamily: 'var(--sans)',
                }}
              >
                By submitting you agree we may contact you about your enquiry.
                We do not sell your data or use it for marketing — period.
              </p>
              {/* Submit — Apple-design-skill polish: action-blue pill, SF Pro stack.
                  Primary conversion action; the only Action-Blue on the page. */}
              <button type="submit" className="apple-pill" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                Send to sales <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
