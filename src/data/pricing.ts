/**
 * pricing.ts — data source for the /pricing page.
 *
 * Three doors (Assessment / Agent / Platform — deck commitment ladder), each with:
 *   - tier name, icon, headline, pitch
 *   - contrast pill (typical vs. us — qualitative)
 *   - explicit deck-canon price (priceDisplay + priceFootnote + timing)
 *   - 5 accordion panels (HOW / WHAT / WHY / ROI / TIMELINE)
 *   - per-tier OUTCOME callout (deck wording)
 *   - CTA label + href
 *
 * Prices are now explicit per Attentions AI Capability Deck v2 (2026).
 * Page components are pure consumers.
 */

export type DoorId = 'assessment' | 'platform' | 'agents';
export type PanelId = 'how' | 'what' | 'why' | 'roi' | 'timeline';

export type ContrastPair = {
  typicalLabel: string;
  typicalText: string;
  usLabel: string;
  usText: string;
};

export type DoorPanel = {
  id: PanelId;
  label: string;
  body: string;
};

export type Door = {
  id: DoorId;
  iconName: string;
  tierName: string;
  headline: string;
  headlineAccent: string;
  pitch: string;
  contrast: ContrastPair;
  panels: DoorPanel[];
  ctaLabel: string;
  ctaHref: string;
  // Deck-canon pricing fields (Capability Deck v2)
  priceDisplay: string;      // e.g., "$5,000 USD"
  priceFootnote: string;     // e.g., "Fixed · one time"
  timing: string;            // e.g., "2 weeks · fixed fee"
  outcome: string;           // one-line deck OUTCOME wording
};

const ASSESSMENT: Door = {
  id: 'assessment',
  iconName: 'SearchCheck',
  tierName: 'Enterprise AI Assessment',
  headline: 'A board-ready business case',
  headlineAccent: 'in two weeks.',
  pitch:
    'One senior architect, working with your team for two weeks. Two to three candidate processes audited and scored. Named success measure agreed in writing. Board-ready business case and agent specification at the end.',
  contrast: {
    typicalLabel: 'Typical',
    typicalText: '6-month research + PDF deck that gets shelved.',
    usLabel: 'Us',
    usText: '2-week scoping + working POC on your data.',
  },
  panels: [
    {
      id: 'how',
      label: 'How it works',
      body: 'Two weeks, structured. Week 1: document + workflow + tech-stack audit across 2\u20133 target processes. We read your actual documents, talk to your ops team, map your existing systems. Week 2: ROI model for top candidates, platform-vs-build decision memo, pilot scope draft. Senior architects throughout \u2014 not a rotating team of juniors.',
    },
    {
      id: 'what',
      label: 'What you get',
      body: 'A ranked list of AI opportunities across your organization (by ROI, feasibility, risk) \u00b7 quantified business case for the top 2\u20133 use cases \u00b7 a ready-to-execute pilot plan for one of them \u00b7 a platform-or-build decision memo \u00b7 a 60-minute board-presentation deck \u00b7 a named, contactable assessment lead.',
    },
    {
      id: 'why',
      label: 'Why us',
      body: 'A typical consulting assessment runs 4\u20136 months, dozens of consultants, and ends in a strategy deck that gets shelved because the assumptions don\u2019t match your reality. The team who assesses us is the team who\u2019ll build. Every ROI assumption is grounded in your actual documents, not industry benchmarks. Every pilot recommendation is something we can already point to running live somewhere close.',
    },
    {
      id: 'roi',
      label: 'ROI pattern',
      body: 'The assessment itself pays back as a board-approvable business case. First real operating ROI lands ~90\u2013120 days later when the pilot ships. Typical outcome: 2\u20133 automation opportunities surface worth multiples of the engagement cost to scope, and 1 is ready to pilot within the quarter.',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      body: 'Fixed 2-week window. Week 0: kickoff, NDA, document access, stakeholder interviews scheduled. Week 1: deep-dive. Week 2: ROI model + pilot scoping + decision point. We\u2019re in, we assess, we\u2019re out. No scope creep.',
    },
  ],
  ctaLabel: 'Start the 2-week assessment',
  ctaHref: 'mailto:sales@attentions.ai?subject=Enterprise%20AI%20Assessment',
  priceDisplay: '$5,000 USD',
  priceFootnote: 'Fixed · one time',
  timing: '2 weeks · fixed fee',
  outcome: 'A signed business case and a target go-live date for your first agent.',
};

const PLATFORM: Door = {
  id: 'platform',
  iconName: 'Layers',
  tierName: 'Sovereign AI Platform',
  headline: 'Full platform deployed,',
  headlineAccent: 'three custom agents live.',
  pitch:
    'Platform deployed inside your network. Three custom agents built and live in phase one. Every additional agent at the same flat fee. One foundation. Many agents. Compounding return.',
  contrast: {
    typicalLabel: 'Typical',
    typicalText: 'SaaS seat + shared models + their cloud + lock-in.',
    usLabel: 'Us',
    usText: 'Sovereign base + your models + your hardware, yours to own.',
  },
  panels: [
    {
      id: 'how',
      label: 'How it works',
      body: '6 weeks end-to-end. Weeks 1\u20132: hardware and connector audit. Weeks 3\u20134: core platform deployment \u2014 sovereign runtime, model router, 4-layer hallucination control. Weeks 5\u20136: governance rails and three custom agents live in phase one. Handover with runbooks, deployment topology, and audit-trail examples your team can run with.',
    },
    {
      id: 'what',
      label: 'What you get',
      body: 'Sovereign runtime on your hardware (bare-metal, VM, or air-gapped) \u00b7 model router configured across open-weight and fine-tuned models \u00b7 4-layer hallucination control \u00b7 enterprise connectors (SAP, Epic, Salesforce, or whatever your stack runs) \u00b7 governance layer (audit trail, RBAC, approval flows) \u00b7 one agent live on top \u00b7 infrastructure IP and model weights stay yours.',
    },
    {
      id: 'why',
      label: 'Why us',
      body: 'A typical enterprise AI platform is rented by the seat, runs in the vendor\u2019s cloud, uses the vendor\u2019s models. When their model changes, your outputs change. When their prices change, your budget changes. When regulators ask where the data went, you cite a third-party contract. Sovereign means your hardware, your models, your perimeter. The platform is a base you OWN, not a service you rent.',
    },
    {
      id: 'roi',
      label: 'ROI pattern',
      body: 'Platform alone doesn\u2019t generate ROI \u2014 agents do. But the platform reduces cost-to-ship for every future agent by ~80% because the shared layers (runtime, routing, hallucination, connectors, governance, security) are already in place. First agent ROI typically lands 3\u20136 months after platform go-live. Second agent: weeks. Sixth agent: mostly configuration.',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      body: '6 weeks to live, three custom agents inside. The $20K/yr keeps the platform supported, certified and current; every next agent ships at the same flat $10K. Upgrades on your schedule, not a vendor\u2019s.',
    },
  ],
  ctaLabel: 'Scope the platform',
  ctaHref: 'mailto:sales@attentions.ai?subject=Sovereign%20AI%20Platform',
  priceDisplay: '$20,000 USD / year',
  priceFootnote: '+ $10,000 USD per custom agent',
  timing: '6 weeks · platform + 3 agents',
  outcome: 'Three agents live, platform deployed — every next agent at the same flat fee.',
};

const AGENTS: Door = {
  id: 'agents',
  iconName: 'Workflow',
  tierName: 'Sovereign AI Agent',
  headline: 'One agent, live on your servers,',
  headlineAccent: 'in four weeks.',
  pitch:
    'One named business problem, solved end-to-end. Scope and fee fixed at the end of the assessment. No platform commitment required. Runs on your servers from day one.',
  contrast: {
    typicalLabel: 'Typical',
    typicalText: 'Generic LLM wrapper recommending, humans verify.',
    usLabel: 'Us',
    usText: 'Targeted automation executing, cited every field.',
  },
  panels: [
    {
      id: 'how',
      label: 'How it works',
      body: '4 weeks, on your servers. Week 1: workflow + document deep-dive on the named problem. Week 2: agent build \u2014 deep OCR calibrated to your document mix, a custom small language model fine-tuned on your vendor master or clinical codes or equivalent schema. Week 3: integration to your system of record + parallel run with humans. Week 4: cutover to autonomous execution. Named success measure tracked from day one.',
    },
    {
      id: 'what',
      label: 'What you get',
      body: 'One production agent on one workflow \u00b7 custom small LM fine-tuned on your data (not a prompt template) \u00b7 deep integration to your system of record \u00b7 citation on every field (every output traces back to source document + page + line) \u00b7 exception routing so humans only see the 10\u201315% that need judgment \u00b7 live KPI dashboard \u00b7 fixed scope, measured against KPIs defined at kickoff.',
    },
    {
      id: 'why',
      label: 'Why us',
      body: 'A typical "AI agent" in the market is a generic foundation-model wrapper with a prompt template. Works on general cases, fails on your handwritten, multi-language, or edge-case data. Outputs are recommendations for humans to verify \u2014 not executions. We build targeted agents \u2014 bespoke to your workflow, trained on your schema, integrated into your system of record. They don\u2019t recommend. They EXECUTE. The difference between "AI that shows insight" and "AI that closes the loop." Seven live today across logistics, automotive, and healthcare.',
    },
    {
      id: 'roi',
      label: 'ROI pattern',
      body: 'Typical ROI within 60\u201390 days post-go-live. Named success measure defined at kickoff \u2014 cost takeout, cycle time, recovery rate, depending on the workflow. Measured against it. If the business case isn\u2019t hitting, we know before you do \u2014 we revisit scope, not invoice. Shapes we\u2019ve shipped: 88% no-touch invoicing, $100K+ recovered per clinic per year, weeks-to-hours on root cause.',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      body: '4 weeks to live autonomous execution. Fixed scope, fixed fee, fixed timeline \u2014 all agreed at the end of the 2-week assessment. Live production, not a demo, not a POC. After go-live: a tuning cadence and the success-measure dashboard stay in place.',
    },
  ],
  ctaLabel: 'Scope an agent',
  ctaHref: 'mailto:sales@attentions.ai?subject=Sovereign%20AI%20Agent',
  priceDisplay: 'From $10,000 USD',
  priceFootnote: 'Up to $50K · complex workflow',
  timing: '4 weeks · per agent',
  outcome: 'One live agent on your servers, measured against the named success measure.',
};

// Deck commitment ladder: Assessment → Agent → Platform (lowest to highest commitment)
export const DOORS: Door[] = [ASSESSMENT, AGENTS, PLATFORM];

export const DOOR_BY_ID: Record<DoorId, Door> = Object.fromEntries(
  DOORS.map((d) => [d.id, d])
) as Record<DoorId, Door>;
