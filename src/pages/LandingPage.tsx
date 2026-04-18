import { MotionConfig } from 'framer-motion';
import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import IsThisYou from '../components/IsThisYou';
import AgentPlatformStack from '../components/landing/AgentPlatformStack';
import ContextKing from '../components/landing/ContextKing';
import GTMPath from '../components/GTMPath';
import LandingCloser from '../components/landing/LandingCloser';

/**
 * LandingPage v5 — wow-section rhythm.
 *
 * Story arc:
 *   Hero → ClientsStrip → IsThisYou → AgentPlatformStack (centerpiece) →
 *   ContextKing → GTMPath → LandingCloser
 *
 * Design: docs/plans/2026-04-18-agent-platform-stack-design.md
 */
export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <HeroAboveFold />
        <ClientsStrip />
        <IsThisYou />
        <AgentPlatformStack />
        <ContextKing />
        <GTMPath />
        <LandingCloser />
      </main>
    </MotionConfig>
  );
}
