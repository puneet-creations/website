import { MotionConfig } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import ClientsStrip from '../components/ClientsStrip';
import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import IndustrySwitcher from '../components/solutions/IndustrySwitcher';
import IndustryAnchorSection from '../components/solutions/IndustryAnchorSection';
import AgentIndustryMatrix from '../components/solutions/AgentIndustryMatrix';
import AdjacentIndustries from '../components/solutions/AdjacentIndustries';
import SolutionsCloser from '../components/solutions/SolutionsCloser';
import SevenAgentsGrid from '../components/landing/SevenAgentsGrid';
import { ANCHOR_INDUSTRIES } from '../data/solutions';

/**
 * SolutionsPage — industry-first landing.
 *
 * Story arc:
 *   Hero → ClientsStrip → IndustrySwitcher (sticky) → 3 anchor industries →
 *   [parallax] → Agent×Industry matrix → 7 adjacent industry cards →
 *   [parallax] → SolutionsCloser
 *
 * Design: docs/plans/2026-04-18-solutions-page-design.md
 */
export default function SolutionsPage() {
  usePageMeta({
    title: 'Solutions by industry · 11 verticals — Attentions AI',
    description:
      'Fifteen agents live across four industries today — finance & logistics, healthcare, manufacturing, real estate. The same sovereign-AI pattern ships in seven more: insurance, banking, hospitality, legal, pharma, aviation, retail.',
    ogUrl: 'https://attentions.ai/solutions',
  });
  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/*
          Cinematic hero — aerial editorial of a city full of corporate
          buildings at night. Reinforces the "your industry" framing
          with visual evidence of the diversity of enterprises the
          platform serves — every glass tower in the shot is a
          different industry, and we ship into all of them.
        */}
        <PageHero
          label="Solutions by industry"
          title="Your industry."
          titleAccent="Your agents."
          description="Fifteen agents live. Four industries in production. Seven more where the same pattern ships. Pick yours."
          accent="#d97706"
          orbColor="#e0c080"
          pills={[
            '11 industries',
            '7 sovereign agents',
            '4 in production',
            '0 hallucination incidents',
            'On-prem by default',
          ]}
          videoSrc="/video/solutions-hero.mp4"
          videoOpacity={0.3}
          videoTintOpacity={0.76}
        />

        <ClientsStrip />

        <IndustrySwitcher />

        {/*
          All 7 use cases — deck-faithful S04/S06-S12 detail.
          Each arched card surfaces the case number, agent name,
          tagline, big outcome metric, and links to the full
          /agents/<slug> deck-style case study. This guarantees that
          buyers landing on /solutions see every use case in
          production (not just the four anchor industries below)
          and can click into the full deck content for any one.
        */}
        <SevenAgentsGrid />

        {ANCHOR_INDUSTRIES.map((a) => (
          <IndustryAnchorSection key={a.id} data={a} />
        ))}

        <ParallaxHero
          imageSrc="/img/photo-1487958449943-2429e8be8625.webp"
          headline="The same agent."
          headlineAccent="A different industry."
          subline="Fifteen agents are live across four industries today. The same pattern ships in seven more."
          label="Extend the pattern"
          height="60vh"
          clipRadius={24}
        />

        <AgentIndustryMatrix />

        <AdjacentIndustries />

        <ParallaxHero
          imageSrc="/img/photo-1473091534298-04dcbce3278c.webp"
          headline="Is your industry"
          headlineAccent="here?"
          subline="If your workflow has mixed-format docs, regulated reporting, real-time voice, or multi-tool orchestration — we've seen the pattern before."
          label="Not listed?"
          height="60vh"
          clipRadius={24}
        />

        <SolutionsCloser />
      </main>
    </MotionConfig>
  );
}
