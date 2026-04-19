import * as Accordion from '@radix-ui/react-accordion';
import { useInView } from '../hooks/useInView';
import PageHero from '../components/PageHero';
import PageCinematicWrap from '../components/PageCinematicWrap';

const FAQS = [
  {
    q: 'How fast can you ship a new agent?',
    a: "Four weeks from the first call. Week 1 — discovery + ROI model. Week 2 — agent spec + pilot scoping. Week 3 — build + integrate on your hardware. Week 4 — go live. Every new agent reuses the six shared platform layers, so no layer is rebuilt.",
  },
  {
    q: 'Where does the data live?',
    a: 'On your servers. The platform runs on-prem or air-gapped. Air-gapped deployments are supported on request. Your data never leaves your network and no model weights leave with it either.',
  },
  {
    q: 'Do you support [SAP / Epic / Salesforce / DMS]?',
    a: 'Yes. The enterprise-connectors layer has production-proven integrations to SAP S/4HANA, Epic, Dentrix, Salesforce, Oracle, and major dealer DMS platforms. New connectors take about a week.',
  },
  {
    q: 'What does pricing look like?',
    a: 'Two engagement shapes: a 2-week paid assessment at $5,000 that maps your workflows and scopes a pilot, and a 4-week production deployment of your first agent priced per scope. After the first agent ships, new agents on the same platform are fractionally cheaper because they reuse the base.',
  },
  {
    q: 'How do I know it is not hallucinating?',
    a: 'Every field traces back to an exact page and line in the source document. The 4-layer hallucination control pipeline gates outputs below a confidence threshold to human review. Three live clients in regulated industries — zero hallucination incidents.',
  },
];

const INTENTS = [
  { icon: '📅', label: 'Book a live demo', sub: 'See artiGen run on a real document in under 10 minutes.' },
  { icon: '🧪', label: 'Book the 14-day assessment', sub: 'One senior expert maps your workflows and scopes a pilot.' },
  { icon: '🔒', label: 'Request a security briefing', sub: 'On-prem architecture, compliance, data residency.' },
  { icon: '💬', label: 'Just ask a question', sub: "We respond personally, usually within 24 hours." },
];

export default function ContactPage() {
  const [heroRef, heroIn] = useInView();
  return (
    <main>
      <PageHero
        label="Contact"
        title="Three doors."
        titleAccent="One phone call."
        description="A founder answers the phone. Not an SDR, not a pre-sales engineer. 30 minutes. Technical. Fast."
        accent="#8af5c0"
        pills={['$5K assessment', 'Migrate from public AI', 'hello@attentions.ai']}
        orbColor="#c0f5d8"
      />
      <PageCinematicWrap auroraColor="#8af5c0" auroraSecondary="#5b76fe" giantText="CONTACT">
      <section ref={heroRef} className="max-w-[1280px] mx-auto px-6 pt-20 pb-12 text-center">
        <div className={`micro-upper text-blue-450 mb-4 sr ${heroIn ? 'is-in' : ''}`}>Contact</div>
        <h1 className={`display-hero sr d-1 ${heroIn ? 'is-in' : ''}`}>
          Pick a door. <span className="italic">We respond personally.</span>
        </h1>
        <p className={`mt-5 text-[19px] text-[rgba(0,0,0,0.65)] max-w-[620px] mx-auto sr d-2 ${heroIn ? 'is-in' : ''}`}>
          Tell us what you need. We map it to the right engagement — assessment, pilot, or production — within one call.
        </p>
      </section>

      {/* Visual intent picker — horizontal labeled doors, not a text form */}
      <section className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-4 gap-4 mb-16">
        {INTENTS.map((intent, i) => (
          <a
            key={intent.label}
            href="mailto:hello@attentions.ai"
            className={`p-6 transition-all hover:-translate-y-1 hover:shadow-lift sr d-${i + 1}`}
            style={{
              background: ['rgba(138,245,192,0.06)', 'rgba(245,168,212,0.06)', 'rgba(160,220,140,0.06)', 'rgba(255,180,80,0.06)'][i],
              border: '1px solid rgba(0,0,0,0.04)',
              borderRadius: 24,
              display: 'block',
            }}
          >
            <div className="text-[34px] mb-3">{intent.icon}</div>
            <div className="font-display text-[18px] text-black leading-tight mb-2">{intent.label}</div>
            <div className="text-[13px] text-[rgba(0,0,0,0.65)]">{intent.sub}</div>
          </a>
        ))}
      </section>

      {/* FAQ — Radix Accordion */}
      <section className="max-w-[820px] mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <div className="micro-upper text-blue-450 mb-3">Before you book</div>
          <h2 className="display-2">
            Things people usually <span className="italic">ask first.</span>
          </h2>
        </div>
        <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <Accordion.Item
              key={f.q}
              value={`item-${i}`}
              className="overflow-hidden"
              style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 16 }}
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between gap-4 px-6 py-5 font-display text-[17px] text-black text-left group hover:bg-[rgba(0,0,0,0.03)]">
                  <span>{f.q}</span>
                  <span className="text-blue-450 text-2xl font-light transition-transform group-data-[state=open]:rotate-45">+</span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-5 text-[15px] text-[rgba(0,0,0,0.65)] leading-relaxed">
                {f.a}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
      </PageCinematicWrap>
    </main>
  );
}
