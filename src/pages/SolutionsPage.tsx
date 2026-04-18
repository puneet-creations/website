import PageHero from '../components/PageHero';
import ParallaxHero from '../components/ParallaxHero';
import IndustrySwitcher from '../components/solutions/IndustrySwitcher';
import IndustryAnchorSection from '../components/solutions/IndustryAnchorSection';
import AgentIndustryMatrix from '../components/solutions/AgentIndustryMatrix';
import AdjacentIndustries from '../components/solutions/AdjacentIndustries';
import SolutionsCloser from '../components/solutions/SolutionsCloser';
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
  return (
    <main>
      <PageHero
        label="Solutions by industry"
        title="Your industry."
        titleAccent="Your agents."
        description="Five agents. Three industries in production. Seven more where the same pattern ships. Pick yours."
        accent="#d97706"
        orbColor="#e0c080"
        pills={[
          '10 industries',
          '5 sovereign agents',
          '3 in production',
          '0 hallucination incidents',
          'On-prem by default',
        ]}
      />

      <IndustrySwitcher />

      {ANCHOR_INDUSTRIES.map((a) => (
        <IndustryAnchorSection key={a.id} data={a} />
      ))}

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=1080&fit=crop"
        headline="The same agent."
        headlineAccent="A different industry."
        subline="Five agents are live in three industries today. The same pattern ships in seven more."
        label="Extend the pattern"
        height="60vh"
        clipRadius={24}
      />

      <AgentIndustryMatrix />

      <AdjacentIndustries />

      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=1920&h=1080&fit=crop"
        headline="Is your industry"
        headlineAccent="here?"
        subline="If your workflow has mixed-format docs, regulated reporting, real-time voice, or multi-tool orchestration — we've seen the pattern before."
        label="Not listed?"
        height="60vh"
        clipRadius={24}
      />

      <SolutionsCloser />
    </main>
  );
}
