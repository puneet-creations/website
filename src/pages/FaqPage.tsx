import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useInView } from '../hooks/useInView';
import PageHero from '../components/PageHero';
import PageCinematicWrap from '../components/PageCinematicWrap';

type Category = {
  id: string;
  label: string;
  color: string;
  ink: string;
  qas: { q: string; a: string }[];
};

const CATEGORIES: Category[] = [
  {
    id: 'platform',
    label: 'Platform',
    color: 'rgba(138,245,192,0.06)',
    ink: '#8af5c0',
    qas: [
      {
        q: 'What exactly is artiGen?',
        a: "artiGen is the sovereign execution platform that sits on your infrastructure. It's not a chatbot, not an API, not a consulting engagement — it's the shared base (runtime, hallucination control, connectors, governance, security) plus five production agents running on top of it at three enterprise clients today.",
      },
      {
        q: 'How is artiGen different from ChatGPT or Copilot?',
        a: 'ChatGPT and Copilot recommend. They write a draft. A human still has to do the actual work — post the invoice, code the diagnosis, assemble the 8D. artiGen executes: it posts to SAP, syncs to Epic, writes to your DMS. It reads, thinks, does, and cites. On your servers.',
      },
      {
        q: "What does 'sovereign' mean in practice?",
        a: 'Sovereign means architecturally, not contractually. Your data, your GPU, your network, your perimeter. No model weights leave with your data. No telemetry phones home. Air-gapped deployment is supported on request. When a regulator asks where your data lives, the answer is a rack in your facility.',
      },
      {
        q: 'What kinds of documents can artiGen read?',
        a: 'Handwritten scans, digital PDFs, Excel exports, dealer DMS files, audio recordings, email, and API payloads. The deep OCR + model-router combination handles multi-format, multi-language, multi-currency. Specific formats are tuned per agent against your real document mix during the pilot.',
      },
    ],
  },
  {
    id: 'hallucination',
    label: 'Hallucination',
    color: 'rgba(255,120,120,0.06)',
    ink: '#ff9090',
    qas: [
      {
        q: 'How do you know artiGen is not hallucinating?',
        a: 'Every field traces back to an exact page and line in the source document. The 4-layer hallucination control pipeline gates outputs below a confidence threshold to human review before any action. Three live clients in regulated industries — zero hallucination incidents since go-live.',
      },
      {
        q: 'What happens when confidence is low?',
        a: 'The action never executes automatically. The low-confidence item is routed to a human review queue with the specific field flagged, the candidate answer, the cited source span, and the confidence score. The human decides. Every decision feeds back into the audit trail.',
      },
      {
        q: 'Can I see the 4-layer hallucination control architecture?',
        a: 'Layer 1: grounding — every output must be traceable to a source span. Layer 2: confidence scoring — per-field probabilities. Layer 3: policy gates — domain rules applied before any action (e.g. never post an invoice above $X without approval). Layer 4: audit — every action logged with reasoning, reviewable forever.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security & data',
    color: 'rgba(245,168,212,0.06)',
    ink: '#f5a8d4',
    qas: [
      {
        q: 'Where does my data live?',
        a: "Entirely on your infrastructure. On-prem or in your own cloud VPC. Air-gapped deployments are available. No data — training, inference, or telemetry — leaves your network. Our team only has access during active implementation and only to what you grant.",
      },
      {
        q: 'What compliance does artiGen support?',
        a: 'GDPR, HIPAA, SOC 2 Type II, ISO 27001, PCI DSS. Because the architecture is sovereign, most compliance is achieved structurally rather than contractually — the data cannot leave, so most data-residency requirements are met by definition.',
      },
      {
        q: 'Do you train on my data?',
        a: 'Never. We fine-tune small language models on your data as part of your deployment, but those models belong to you and run on your hardware. We do not aggregate, mirror, or retrain any shared model on your content.',
      },
    ],
  },
  {
    id: 'implementation',
    label: 'Implementation',
    color: 'rgba(255,180,80,0.06)',
    ink: '#ffd080',
    qas: [
      {
        q: 'How fast can you ship a new agent?',
        a: 'Four weeks from the first call. Week 0 — discovery + ROI. Week 1 — design + security. Week 2 — build + fine-tune. Week 3 — integrate + UAT. Week 4 — go live. New agents on an existing platform are faster because they reuse all six shared layers.',
      },
      {
        q: 'How long does full production take?',
        a: 'The 14-day assessment produces a working prototype scoped for 4 weeks of production delivery. Thomson Group went from first call to live invoice processing in 6 weeks. Qira Labs went live with Voice AI in 4 weeks. We guarantee a live production agent — not a prototype — within the agreed timeline or you do not pay.',
      },
      {
        q: 'Do you support [SAP / Epic / Salesforce / DMS]?',
        a: 'Yes. The enterprise-connectors layer has production-proven integrations to SAP S/4HANA, Epic, Dentrix, Salesforce, Oracle, and major dealer DMS platforms. New connectors take about a week and are reusable by every future agent.',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    color: 'rgba(160,220,140,0.06)',
    ink: '#a0dc8c',
    qas: [
      {
        q: 'What does pricing look like?',
        a: 'Two engagement shapes. A 2-week paid assessment at $5,000 that maps your workflows and scopes the pilot. Then a 4-week production deployment priced per scope. After the first agent ships, new agents on the same platform are fractionally cheaper because they reuse the shared base.',
      },
      {
        q: 'Why is the assessment paid now instead of free?',
        a: 'Because we invest a senior resource full time for 14 days, and because paying clients ship. Free assessments become slideware. Paid assessments produce a workflow inventory, ROI model, security blueprint, pilot spec, and executive readout — every time.',
      },
    ],
  },
  {
    id: 'trust',
    label: 'About us',
    color: 'rgba(255,120,120,0.06)',
    ink: '#ff9090',
    qas: [
      {
        q: 'Who runs artiGen?',
        a: 'Attentions AI Labs, founded 2023 in Dubai + Pune by Puneet Kumar Ojha (CEO) and Ankit Agrahari (CTO) — ex-Deutsche Telekom Enterprise Architects. The team is 18 top experts in AI and product engineering.',
      },
      {
        q: 'Can I talk to a reference client?',
        a: 'Yes. Named references at Thomson Group UAE, Daimler Asia, and Qira Labs US are available on request for qualified enterprise prospects. We arrange it after the 14-day assessment is booked.',
      },
    ],
  },
];

export default function FaqPage() {
  const [ref, inView] = useInView<HTMLElement>();
  const [activeTab, setActiveTab] = useState<string>('platform');
  const current = CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <main className="pb-20" ref={ref}>
      <PageHero
        label="FAQ"
        title="Questions"
        titleAccent="we hear most."
        description="From pricing to deployment timeline to data residency — answered by the founders, not a chatbot."
        accent="#5b76fe"
        orbColor="#c0d0f5"
        dustCount={10}
      />
      <PageCinematicWrap auroraColor="#5b76fe" auroraSecondary="#8ea6ff" giantText="FAQ">
        <section className="max-w-[900px] mx-auto px-6 pt-16 pb-10 text-center">
          <div className={`micro-upper text-blue-450 mb-4 sr ${inView ? 'is-in' : ''}`}>Questions answered</div>
          <h1 className={`display-hero sr d-1 ${inView ? 'is-in' : ''}`}>
            Everything you need <span className="italic">to know about artiGen.</span>
          </h1>
          <p className={`mt-5 text-[18px] text-[rgba(0,0,0,0.65)] max-w-[620px] mx-auto sr d-2 ${inView ? 'is-in' : ''}`}>
            Pick a category, or ask us directly.
          </p>
        </section>

        {/* Category tabs as pastel pills */}
        <section className="max-w-[900px] mx-auto px-6 mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveTab(c.id)}
                className="px-5 py-2.5 rounded-full font-display text-[13px] transition-all border border-[rgba(0,0,0,0.06)]"
                style={{
                  background: activeTab === c.id ? c.color : 'rgba(0,0,0,0.03)',
                  color: activeTab === c.id ? c.ink : 'rgba(0,0,0,0.50)',
                  fontWeight: activeTab === c.id ? 600 : 500,
                  outline: activeTab === c.id ? `2px solid ${c.ink}` : 'none',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* Active category accordion */}
        <section className="max-w-[820px] mx-auto px-6" key={activeTab}>
          <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
            {current.qas.map((qa, i) => (
              <Accordion.Item
                key={qa.q}
                value={`item-${i}`}
                className="overflow-hidden border border-[rgba(0,0,0,0.04)]"
                style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 16, borderLeft: `4px solid ${current.ink}` }}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between gap-4 px-6 py-5 font-display text-[17px] text-black text-left group hover:bg-[rgba(0,0,0,0.03)]">
                    <span>{qa.q}</span>
                    <span className="text-[22px] font-light transition-transform group-data-[state=open]:rotate-45" style={{ color: current.ink }}>+</span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-5 text-[15px] text-[rgba(0,0,0,0.65)] leading-relaxed">
                  {qa.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </section>
      </PageCinematicWrap>
    </main>
  );
}
