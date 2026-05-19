import { MotionConfig } from 'framer-motion';
import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import WhyNowTriad from '../components/landing/WhyNowTriad';
import SevenAgentsGrid from '../components/landing/SevenAgentsGrid';
import ThreeOfferings from '../components/landing/ThreeOfferings';
import AgentPlatformStack from '../components/landing/AgentPlatformStack';
import WhyUsBuyersAsk from '../components/landing/WhyUsBuyersAsk';
import LandingCloser from '../components/landing/LandingCloser';

/**
 * LandingPage — deck-aligned rhythm.
 *
 * Story arc (matches Attentions AI Capability Deck v2):
 *   Hero (S01) → ClientsStrip (proof) →
 *   WhyNowTriad (deck S02 · Privacy/Cost/Outcomes) →
 *   ThreeOfferings (deck S03 · Assessment/Agent/Platform with prices) →
 *   SevenAgentsGrid (deck S04 · seven agents in production) →
 *   AgentPlatformStack (centerpiece scroll-driven) →
 *   WhyUsBuyersAsk (deck S16 · Outcome-owned / Cited / Tuned) →
 *   LandingCloser.
 *
 * Replaced: ContextKing ("An agent without your context is not production
 * software") → WhyUsBuyersAsk (deck-canon three-reason card grid).
 * Removed: GTMPath ("The engagement path / Three steps from curious to live
 * in production") — already covered upstream by ThreeOfferings' commitment
 * ladder, and the deck has no equivalent slide.
 */
export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <HeroAboveFold />
        <ClientsStrip />
        <WhyNowTriad />
        <ThreeOfferings />
        <SevenAgentsGrid />
        <AgentPlatformStack />
        <WhyUsBuyersAsk />
        <LandingCloser />
      </main>
    </MotionConfig>
  );
}
