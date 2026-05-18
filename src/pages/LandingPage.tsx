import { MotionConfig } from 'framer-motion';
import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import WhyNowTriad from '../components/landing/WhyNowTriad';
import SevenAgentsGrid from '../components/landing/SevenAgentsGrid';
import ThreeOfferings from '../components/landing/ThreeOfferings';
import AgentPlatformStack from '../components/landing/AgentPlatformStack';
import ContextKing from '../components/landing/ContextKing';
import GTMPath from '../components/GTMPath';
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
 *   ContextKing → GTMPath → LandingCloser.
 *
 * The old IsThisYou ("Where are you stuck?") section was replaced by
 * ThreeOfferings — slide 2 of the deck is a stronger lead than persona
 * pain since visitors get the price ladder upfront.
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
        <ContextKing />
        <GTMPath />
        <LandingCloser />
      </main>
    </MotionConfig>
  );
}
