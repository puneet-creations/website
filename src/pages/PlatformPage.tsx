import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import ClientsStrip from '../components/ClientsStrip';
import PlatformStack from '../components/PlatformStack';
import FlowDiagram from '../components/FlowDiagram';
import { AgentFamilies, HallucinationControl, DeterminismProof, ScaleAtVolume } from '../components/PlatformStory';
import PlatformWhySection from '../components/landing/PlatformWhySection';
import PlatformCloser from '../components/landing/PlatformCloser';

/**
 * PlatformPage v2 — architecture-first redesign.
 *
 * Story arc:
 *   Hero → Why a platform → [parallax] → 6 Layers →
 *   [parallax] → Hallucination · Determinism · Scale deep dives →
 *   [parallax] → Agent families → Read/Think/Do/Cites flow → Closer
 *
 * Design: docs/plans/2026-04-15-platform-page-v2-design.md
 */
export default function PlatformPage() {
  return (
    <main>
      <PageHero
        label="The platform"
        title="The sovereign AI platform"
        titleAccent="that ships agents to production."
        description="artiGen is the base. Document agents, voice agents, and the messy multimodal combinations of both — built on your hardware, grounded in your data, auditable by your regulators."
        accent="#5b76fe"
        orbColor="#c0d0f5"
        pills={['On-prem · sovereign', 'Hallucination-controlled', 'Deterministic', 'Cited · auditable', '12,400 docs/hr']}
      />

      <ClientsStrip />

      <PlatformWhySection />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop"
        headline="Six layers."
        headlineAccent="Solved once."
        subline="The hard parts — runtime, routing, hallucination control, connectors, governance, security — solved once for every agent that ships on artiGen."
        label="The base"
        height="70vh"
        clipRadius={24}
      />

      <PlatformStack />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop"
        headline="How the hardest layers"
        headlineAccent="actually work."
        subline="Hallucination control, determinism, and scale — the three properties your regulator asks about. Each shipped in production."
        label="How it holds"
        height="60vh"
        clipRadius={24}
      />

      <HallucinationControl />
      <DeterminismProof />
      <ScaleAtVolume />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop"
        headline="Documents. Voice."
        headlineAccent="Multimodal."
        subline="Three agent families on one platform. Custom-built for your workflow, not prompt-wrapped around ChatGPT."
        label="What you build"
        height="60vh"
        clipRadius={24}
      />

      <AgentFamilies />
      <FlowDiagram />

      <PlatformCloser />
    </main>
  );
}
