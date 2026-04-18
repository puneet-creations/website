import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import ClientsStrip from '../components/ClientsStrip';
import PlatformFlow from '../components/PlatformFlow';
import AgentDeepDiveScroll from '../components/AgentDeepDiveScroll';
import ProductionProof from '../components/landing/ProductionProof';
import AgentsCloser from '../components/landing/AgentsCloser';

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
  const { hash } = useLocation();

  // Preserve hash-scroll behavior for footer jump-links like /agents#production
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
      <main>
        <PageHero
          label="Live production agents"
          title="Five agents."
          titleAccent="One sovereign base."
          description="Each runs on the same platform. Scroll through to see inputs, live motion stories, workflows, and outcomes."
          accent="#8af5c0"
          orbColor="#c0f5e0"
          pills={['5 agents live', '3 regulated industries', '0 hallucination incidents', '88% no-touch', '12,400 docs/hr']}
        />

        <ClientsStrip />

        <PlatformFlow />

        <ParallaxHero
          imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
          headline="Five agents."
          headlineAccent="Live today."
          subline="Handwritten invoices. Voice consultations. Knowledge graphs across millions of reports. Each running on your hardware right now."
          label="In production"
          height="70vh"
          clipRadius={24}
        />

        <div id="agent-deep-dive">
          <AgentDeepDiveScroll />
        </div>

        <ParallaxHero
          imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
          headline="Production proof."
          headlineAccent="In your industry."
          subline="Not a pilot. Not a POC. These are the teams running artiGen in production today, across regulated workflows."
          label="Proof"
          height="60vh"
          clipRadius={24}
        />

        <ProductionProof />

        <AgentsCloser />
      </main>
    </MotionConfig>
  );
}
