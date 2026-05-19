import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Server, Router, ShieldCheck, Plug, Eye, Lock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * PlatformLayers — calm-brochure replacement for the old dark scroll-driven
 * AgentPlatformStack section. Same "the platform under every agent" story
 * told in the deck arched-card language: light parchment background, ink
 * type, hairline borders, no dark surfaces fighting the surrounding
 * SevenAgentsGrid / ThreeOfferings / WhyUsBuyersAsk panels.
 *
 * Visual is consistent with SevenAgentsGrid: arched card top (70px), circle
 * marker, mono "NN · Layer" eyebrow, display name, body, dashed-bordered
 * flow chip strip showing what the layer actually does in production.
 */

type Layer = {
  n: string;
  name: string;
  tag: string;
  body: React.ReactNode;
  chips: string[];
  icon: LucideIcon;
};

const LAYERS: Layer[] = [
  {
    n: '01',
    name: 'Sovereign runtime',
    tag: 'On-prem · air-gapped · your hardware.',
    body: (
      <>
        Every agent runs inside <strong>your network</strong>. Bare-metal, VM, or air-gapped on request. Data never leaves the perimeter; model weights never leave with it.
      </>
    ),
    chips: ['On-prem', 'Air-gapped', 'Your hardware'],
    icon: Server,
  },
  {
    n: '02',
    name: 'Model router',
    tag: 'Right model per task — small to frontier.',
    body: (
      <>
        Routes each step to the <strong>cheapest model that can answer correctly</strong> — small fine-tuned LMs for structured extraction, mid-tier for reasoning, frontier only when warranted.
      </>
    ),
    chips: ['Open-weight', 'Fine-tuned', 'Cost-aware'],
    icon: Router,
  },
  {
    n: '03',
    name: 'Hallucination control',
    tag: 'Four-layer citation · grounding · confidence gates.',
    body: (
      <>
        Every output is <strong>cited back to source page and line</strong>. Confidence below threshold routes to human review. Same architecture every agent inherits.
      </>
    ),
    chips: ['Cited', 'Grounded', 'Gate-reviewed'],
    icon: ShieldCheck,
  },
  {
    n: '04',
    name: 'Enterprise connectors',
    tag: 'SAP · Epic · Salesforce · DMS · Oracle.',
    body: (
      <>
        Production-proven integrations to the <strong>systems of record your business actually runs on</strong>. New connectors take roughly a week; every future agent reuses them.
      </>
    ),
    chips: ['SAP', 'Epic', 'Salesforce', 'Oracle', 'DMS'],
    icon: Plug,
  },
  {
    n: '05',
    name: 'Governance',
    tag: 'Audit trail · approvals · RBAC · reversible.',
    body: (
      <>
        Every action is <strong>logged, reviewable, and reversible</strong>. Role-based access. Approval workflows you can hand to your regulator on day one.
      </>
    ),
    chips: ['Audit trail', 'RBAC', 'Approvals', 'Reversible'],
    icon: Eye,
  },
  {
    n: '06',
    name: 'Security & compliance',
    tag: 'GDPR · HIPAA · SOC 2 Type II · ISO 27001 · PCI DSS.',
    body: (
      <>
        Compliance is <strong>structural, not contractual</strong>. The architecture makes data exfiltration impossible by design; certifications are documentation of what is already true.
      </>
    ),
    chips: ['GDPR', 'HIPAA', 'SOC 2 Type II', 'ISO 27001', 'PCI DSS'],
    icon: Lock,
  },
];

const INK = '#0A0A0A';
const CHARCOAL = '#2B2B2B';
const STEEL = '#6B6B6B';
const RULE = '#D9D9D9';
const ICE = '#E8E8E8';

export default function PlatformLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Vertical connector hairline grows as the section scrolls through view —
  // "the stack assembling itself" visual. Capped at 100% so it never overshoots.
  const connectorScale = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="platform-layers"
      className="relative scroll-mt-20"
      style={{
        background: '#F4F2EE',          // --stone, alternates with adjacent white sections
        padding: 'clamp(72px, 10vw, 128px) clamp(16px, 3vw, 32px)',
        perspective: '1400px',
      }}
    >
      {/* Scroll-tied connector hairline — left margin, grows downward as
          the user scrolls. Hidden on small screens (would be off-edge). */}
      <motion.div
        aria-hidden="true"
        className="hidden lg:block absolute"
        style={{
          left: 'clamp(24px, 3vw, 52px)',
          top: '12%',
          bottom: '12%',
          width: 1,
          background: INK,
          opacity: 0.18,
          scaleY: connectorScale,
          transformOrigin: 'top center',
        }}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Header — deck-faithful framing */}
        <div className="mb-10 md:mb-14">
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
            The platform · one foundation, many agents
          </div>

          <h2
            className="mb-5"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(34px, 4.4vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: INK,
            }}
          >
            The sovereign AI stack.{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Six shared layers. Yours.
            </span>
          </h2>

          <p
            className="max-w-[1100px]"
            style={{
              fontSize: 'clamp(15px, 1.3vw, 19px)',
              lineHeight: 1.55,
              color: CHARCOAL,
              borderLeft: `2px solid ${INK}`,
              paddingLeft: 16,
              fontWeight: 400,
            }}
          >
            Every agent ships on the same base — runtime, routing, hallucination control, connectors, governance, security.{' '}
            <strong style={{ color: INK, fontWeight: 600 }}>
              Solve them once. Reuse them forever.
            </strong>{' '}
            The first agent is expensive; every next agent is mostly settings.
          </p>
        </div>

        {/* 6 arched layer cards — 3-col on lg, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {LAYERS.map((l, i) => (
            <motion.article
              key={l.n}
              initial={{ opacity: 0, y: 60, rotateX: 14, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 0.84, 0.24, 1] }}
              className="flex flex-col"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${RULE}`,
                borderRadius: '60px 60px 4px 4px',
                padding: '32px 26px 24px',
                gap: 12,
                minHeight: 320,
                transformOrigin: 'top center',
                willChange: 'transform, opacity',
              }}
            >
              {/* Icon + number badge */}
              <div className="flex items-center gap-3" style={{ marginBottom: 4 }}>
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 44,
                    height: 44,
                    border: `1.5px solid ${INK}`,
                    borderRadius: '50%',
                    color: INK,
                  }}
                  aria-hidden="true"
                >
                  <l.icon size={20} strokeWidth={1.8} />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    color: STEEL,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  {l.n} · Layer
                </div>
              </div>

              {/* Name */}
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(20px, 1.9vw, 26px)',
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {l.name}
              </h3>

              {/* Tag */}
              <div
                style={{
                  fontSize: 'clamp(14px, 1.1vw, 16px)',
                  color: CHARCOAL,
                  lineHeight: 1.45,
                  fontStyle: 'italic',
                  fontFamily: 'var(--serif)',
                }}
              >
                {l.tag}
              </div>

              {/* Body */}
              <div
                style={{
                  fontSize: 14.5,
                  color: STEEL,
                  lineHeight: 1.55,
                  flex: 1,
                }}
              >
                {l.body}
              </div>

              {/* Chips row */}
              <div
                className="flex flex-wrap items-center"
                style={{
                  gap: 6,
                  paddingTop: 14,
                  borderTop: `1px dashed ${RULE}`,
                  marginTop: 4,
                }}
              >
                {l.chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center"
                    style={{
                      background: ICE,
                      color: CHARCOAL,
                      fontFamily: 'var(--mono)',
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '5px 9px',
                      borderRadius: 999,
                      border: `1px solid ${RULE}`,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Compound-base callout — closes the section with the value prop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 items-center gap-y-4 gap-x-6"
          style={{
            background: '#FFFFFF',
            border: `1px solid ${RULE}`,
            borderRadius: 6,
            padding: '24px 28px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: INK,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            The compound base
            <span style={{ display: 'block', color: STEEL, fontWeight: 500, fontSize: 11, marginTop: 4 }}>
              one foundation, many agents
            </span>
          </div>

          <div
            className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4"
            style={{
              fontFamily: 'var(--sans, "Plus Jakarta Sans")',
              fontSize: 13.5,
              color: CHARCOAL,
              lineHeight: 1.5,
            }}
          >
            <div>
              <strong style={{ color: INK, fontSize: 15, display: 'block', marginBottom: 2 }}>
                Agent 1
              </strong>
              4 weeks · the platform pays its installation cost.
            </div>
            <div>
              <strong style={{ color: INK, fontSize: 15, display: 'block', marginBottom: 2 }}>
                Agent 2–3
              </strong>
              Weeks · most layers are reused.
            </div>
            <div>
              <strong style={{ color: INK, fontSize: 15, display: 'block', marginBottom: 2 }}>
                Agent 4–N
              </strong>
              Mostly configuration · ~80% cheaper per task.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
