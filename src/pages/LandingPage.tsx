import { MotionConfig } from 'framer-motion';
import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import WhyNowTriad from '../components/landing/WhyNowTriad';
import SevenAgentsGrid from '../components/landing/SevenAgentsGrid';
import ThreeOfferings from '../components/landing/ThreeOfferings';
import PlatformLayers from '../components/landing/PlatformLayers';
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
 *   PlatformLayers (the platform under every agent) →
 *   WhyUsBuyersAsk (deck S16 · Proof / ROI / Fixed scope) →
 *   LandingCloser.
 *
 * Retired: AgentPlatformStack — the dark scroll-driven section had low
 * contrast (white-on-#0a0e18) and broke the calm-brochure rhythm of the
 * surrounding light deck-faithful sections. Its core value (the 6 platform
 * layers + compound base story) is now told in PlatformLayers, a light
 * arched-card panel that matches SevenAgentsGrid / ThreeOfferings.
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
        <PlatformLayers />
        <WhyUsBuyersAsk />
        <LandingCloser />
      </main>
    </MotionConfig>
  );
}
