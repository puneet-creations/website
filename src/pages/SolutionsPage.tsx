import PageHero from '../components/PageHero';
import IndustrySwitcher from '../components/solutions/IndustrySwitcher';
import IndustryAnchorSection from '../components/solutions/IndustryAnchorSection';
import { INDUSTRIES, ANCHOR_INDUSTRIES } from '../data/solutions';

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

      {/* 3 proven industries */}
      {ANCHOR_INDUSTRIES.map((a) => (
        <IndustryAnchorSection key={a.id} data={a} />
      ))}

      {/* TEMPORARY placeholder sections for the 7 adjacent (replaced in Task 6) */}
      {INDUSTRIES.filter((i) => !i.proven).map((i) => (
        <section
          key={i.id}
          id={i.id}
          style={{ minHeight: '50vh', padding: '80px 24px', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-display text-3xl text-center">{i.name} (placeholder)</h2>
        </section>
      ))}
    </main>
  );
}
