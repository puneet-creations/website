import PageHero from '../components/PageHero';

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
    </main>
  );
}
