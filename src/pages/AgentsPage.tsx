import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { scrollToTarget } from '../lib/lenis';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import ClientsStrip from '../components/ClientsStrip';
import PlatformFlow from '../components/PlatformFlow';
import AgentDeepDiveScroll from '../components/AgentDeepDiveScroll';
import MoreAgentsStrip from '../components/agents/MoreAgentsStrip';
import WhyUsTriad from '../components/agents/WhyUsTriad';
import ProductionProof from '../components/landing/ProductionProof';
import AgentsCloser from '../components/landing/AgentsCloser';
import SevenAgentsGrid from '../components/landing/SevenAgentsGrid';

/**
 * AgentsPage v2 — redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip (social proof) → PlatformFlow (the pattern) →
 *   [parallax] → AgentDeepDiveScroll (5-agent showcase) →
 *   [parallax] → ProductionProof (customer cards) → AgentsCloser
 *
 * Design: docs/plans/2026-04-15-agents-page-v2-design.md
 */
export default function AgentsPage() {
  usePageMeta({
    title: 'Agents · 15 in production today — Attentions AI',
    description:
      'Seven deep-dive sovereign AI agents in production today — Invoice Intelligence, Defect-report Intelligence, Doctor’s Notes, Patient Call Agent, Voucher Matching, Tender Intelligence, Fraud Intelligence. Plus 8 more shipping across pharma, banking, hospitality, legal, aviation, retail, insurance and manufacturing.',
    ogUrl: 'https://attentions.ai/agents',
  });
  const { hash } = useLocation();

  // Preserve hash-scroll behavior for footer jump-links like /agents#agent-deep-dive.
  // Uses Lenis (scrollToTarget) — native scrollIntoView is hijacked by Lenis.
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        scrollToTarget(hash);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/*
          Cinematic hero — editorial backdrop of real engineers in a
          data center. Mirrors the /platform treatment (same family of
          editorial footage) and gives the "Fifteen agents on one
          sovereign base" headline visual evidence of the
          infrastructure underneath every agent.
        */}
        <PageHero
          label="Live production agents"
          title="Fifteen agents."
          titleAccent="One sovereign base."
          description="Each runs on the same platform. Scroll through to see inputs, live motion stories, workflows, and outcomes."
          accent="#8af5c0"
          orbColor="#c0f5e0"
          pills={['15 agents live', '7 deep-dive use cases', '3 regulated industries', '0 security incidents', '88% no-touch']}
          videoSrc="/video/agents-hero.mp4"
          videoOpacity={0.28}
          videoTintOpacity={0.78}
        />

        <ClientsStrip />

        <PlatformFlow />

        {/*
          The 7 deck-faithful use cases — same SevenAgentsGrid that
          ships on / and /solutions. Each arched card links to the
          full deck-style detail at /agents/<slug>. Lives ABOVE the
          AgentDeepDiveScroll horizontal experience so a buyer can:
          1) browse all 7 quickly and click into the one they care
          about, or 2) keep scrolling for the immersive scroll-jack.
        */}
        <SevenAgentsGrid />

        <ParallaxHero
          imageSrc="/img/photo-1558494949-ef010cbdcc31.webp"
          headline="Fifteen agents."
          headlineAccent="Live today."
          subline="Handwritten invoices. Voice consultations. Knowledge graphs across millions of reports. Each running on your hardware right now."
          label="In production"
          height="70vh"
          clipRadius={24}
        />

        <div id="agent-deep-dive">
          <AgentDeepDiveScroll />
        </div>

        <MoreAgentsStrip />

        <ParallaxHero
          imageSrc="/img/photo-1486406146926-c627a92ad1ab.webp"
          headline="Production proof."
          headlineAccent="In your industry."
          subline="Not a pilot. Not a POC. These are the teams running artiGen in production today, across regulated workflows."
          label="Proof"
          height="60vh"
          clipRadius={24}
        />

        <ProductionProof />

        <WhyUsTriad />

        <AgentsCloser />
      </main>
    </MotionConfig>
  );
}
