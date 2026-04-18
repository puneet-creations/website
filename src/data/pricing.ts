/**
 * pricing.ts — data source for the /pricing page.
 *
 * Three doors (Assessment / Platform / Agents), each with:
 *   - tier name, icon, headline, pitch
 *   - contrast pill (typical vs. us — qualitative, no numbers)
 *   - 5 accordion panels (HOW / WHAT / WHY / ROI / TIMELINE)
 *   - CTA label + href
 *
 * No dollar figures anywhere. Page components are pure consumers.
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
};

const ASSESSMENT: Door = {
  id: 'assessment',
  iconName: 'SearchCheck',
  tierName: 'Assessment',
  headline: 'Scope the fit.',
  headlineAccent: 'Plan the pilot.',
  pitch:
    'A 2-week senior-architect-led engagement that delivers a board-ready business case and a ready-to-execute pilot plan — not a 200-page PDF.',
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
  ctaLabel: 'Scope this door',
  ctaHref: 'mailto:hello@attentions.ai?subject=Assessment%20Scoping',
};

const PLATFORM: Door = {
  id: 'platform',
  iconName: 'Layers',
  tierName: 'Platform',
  headline: 'Own the base.',
  headlineAccent: 'Every agent compounds.',
  pitch:
    'Sovereign artiGen runtime deployed on your hardware in 4\u20136 weeks. Every agent after the first costs ~80% less \u2014 the shared layers are already paid for.',
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
      body: '4\u20136 weeks end-to-end. Weeks 1\u20132: hardware and connector audit. Weeks 3\u20134: core platform deployment \u2014 sovereign runtime, model router, 4-layer hallucination control. Weeks 5\u20136: governance rails and first agent integration. Handover with runbooks, deployment topology, and audit-trail examples your team can run with.',
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
      body: '4\u20136 weeks to live. Owned forever. No annual renewal. Upgrades on your schedule, not a vendor\u2019s.',
    },
  ],
  ctaLabel: 'Scope this door',
  ctaHref: 'mailto:hello@attentions.ai?subject=Platform%20Scoping',
};

const AGENTS: Door = {
  id: 'agents',
  iconName: 'Workflow',
  tierName: 'Agents',
  headline: 'Targeted automation.',
  headlineAccent: 'Live in weeks.',
  pitch:
    'A production agent built to your workflow, trained on your data, integrated into your system of record. Executes \u2014 doesn\u2019t recommend. KPI-measured from day one.',
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
      body: '8\u201312 weeks. Weeks 1\u20132: workflow and document deep-dive. Weeks 3\u20136: agent build \u2014 deep OCR calibrated to your document mix, a custom small language model fine-tuned on your vendor master or clinical codes or equivalent schema, integration to your system of record. Weeks 7\u201310: parallel run with humans, exception-routing tuning, audit-trail validation. Weeks 11\u201312: cutover to autonomous execution. KPI dashboard live.',
    },
    {
      id: 'what',
      label: 'What you get',
      body: 'One production agent on one workflow \u00b7 custom small LM fine-tuned on your data (not a prompt template) \u00b7 deep integration to your system of record \u00b7 citation on every field (every output traces back to source document + page + line) \u00b7 exception routing so humans only see the 10\u201315% that need judgment \u00b7 live KPI dashboard \u00b7 fixed scope, measured against KPIs defined at kickoff.',
    },
    {
      id: 'why',
      label: 'Why us',
      body: 'A typical "AI agent" in the market is a generic foundation-model wrapper with a prompt template. Works on general cases, fails on your handwritten, multi-language, or edge-case data. Outputs are recommendations for humans to verify \u2014 not executions. We build targeted agents \u2014 bespoke to your workflow, trained on your schema, integrated into your system of record. They don\u2019t recommend. They EXECUTE. The difference between "AI that shows insight" and "AI that closes the loop." Three live today: Thomson, Qira, Daimler.',
    },
    {
      id: 'roi',
      label: 'ROI pattern',
      body: 'Typical ROI within 60\u201390 days post-go-live. KPI defined at kickoff \u2014 cost takeout, cycle time, recovery rate, depending on the workflow. Measured against it. If the business case isn\u2019t hitting, we know before you do \u2014 we revisit scope, not invoice. Shapes we\u2019ve shipped: 88% no-touch invoicing, $400K+ recovered per clinic per year, weeks-to-hours on root cause.',
    },
    {
      id: 'timeline',
      label: 'Timeline',
      body: '8\u201312 weeks to live autonomous execution. Fixed-scope. KPI-measured. Live production, not a demo, not a POC. After go-live: a tuning cadence and the KPI dashboard stay in place.',
    },
  ],
  ctaLabel: 'Scope this door',
  ctaHref: 'mailto:hello@attentions.ai?subject=Agent%20Scoping',
};

export const DOORS: Door[] = [ASSESSMENT, PLATFORM, AGENTS];

export const DOOR_BY_ID: Record<DoorId, Door> = Object.fromEntries(
  DOORS.map((d) => [d.id, d])
) as Record<DoorId, Door>;
