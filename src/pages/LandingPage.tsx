import HeroAboveFold from '../components/HeroAboveFold';
import ClientsStrip from '../components/ClientsStrip';
import IsThisYou from '../components/IsThisYou';
import ParallaxHero from '../components/ParallaxHero';
import AgentFamilies from '../components/landing/AgentFamilies';
import ContextKing from '../components/landing/ContextKing';
import GTMPath from '../components/GTMPath';
import LandingCloser from '../components/landing/LandingCloser';

/**
 * LandingPage v4 — 9-section v2 rhythm.
 *
 * Story arc:
 *   Hero → ClientsStrip → IsThisYou → [parallax] → AgentFamilies →
 *   [parallax] → ContextKing → GTMPath → LandingCloser (black orb + thesis)
 *
 * Design: docs/plans/2026-04-18-landing-agents-v2-design.md
 */
export default function LandingPage() {
  return (
    <main>
      <HeroAboveFold />
      <ClientsStrip />
      <IsThisYou />
      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
        headline="Your data never leaves"
        headlineAccent="your building."
        subline="On-prem by architecture, not by contract. Air-gapped deployment available on request."
        label="Sovereign by default"
        height="80vh"
        clipRadius={24}
      />
      <AgentFamilies />
      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop"
        headline="Context is"
        headlineAccent="everything."
        subline="A demo that guesses vendor names is not production software. Your masters, your taxonomy, your rules."
        label="Why context matters"
        height="60vh"
        clipRadius={24}
      />
      <ContextKing />
      <GTMPath />
      <LandingCloser />
    </main>
  );
}
