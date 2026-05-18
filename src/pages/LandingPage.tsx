import { MotionConfig } from 'framer-motion';
import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import SevenAgentsGrid from '../components/landing/SevenAgentsGrid';
import IsThisYou from '../components/IsThisYou';
import AgentPlatformStack from '../components/landing/AgentPlatformStack';
import ContextKing from '../components/landing/ContextKing';
import GTMPath from '../components/GTMPath';
import LandingCloser from '../components/landing/LandingCloser';

/**
 * LandingPage v5 — wow-section rhythm.
 *
 * Story arc:
 *   Hero → ClientsStrip → SevenAgentsGrid (deck S04) → IsThisYou →
 *   AgentPlatformStack (centerpiece) → ContextKing → GTMPath → LandingCloser
 *
 * Design: docs/plans/2026-04-18-agent-platform-stack-design.md
 * SevenAgentsGrid: ported from Attentions-AI-Capability-Deck-v2.html slide S04.
 */
export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <HeroAboveFold />
        <ClientsStrip />
        <SevenAgentsGrid />
        <IsThisYou />
        <AgentPlatformStack />
        <ContextKing />
        <GTMPath />
        <LandingCloser />
      </main>
    </MotionConfig>
  );
}
