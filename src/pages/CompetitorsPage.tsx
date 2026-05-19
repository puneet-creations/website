import CompetitorsRadar from '../components/CompetitorsRadar';
import Differentiators5 from '../components/Differentiators5';
import PageHero from '../components/PageHero';
import PageCinematicWrap from '../components/PageCinematicWrap';
import { usePageMeta } from '../hooks/usePageMeta';

export default function CompetitorsPage() {
  usePageMeta({
    title: 'How we compare · Outcome-owned · Cited · Tuned — Attentions AI',
    description:
      'How artiGen stacks up against foundation models, MBB consulting, RPA, copilots, agentic startups, and DIY builds — on the three things that matter for regulated enterprise: outcome-owned, cited by default, tuned not generic.',
    ogUrl: 'https://attentions.ai/competitors',
  });
  return (
    <main>
      <PageHero
        label="How we compare · three things make this different"
        title="Outcome-owned. Cited by default."
        titleAccent="Tuned, not generic."
        description="See how artiGen stacks up against foundation models, MBB consulting, RPA, copilots, agentic startups, and DIY builds — on the three things that matter for regulated enterprise."
        accent="#c0392b"
        orbColor="#f5c0c0"
        pills={[
          'Outcome-owned · contract-tied success measure',
          'Cited by default · verify, don’t trust',
          'Tuned · your documents, not a one-size model',
        ]}
        dustCount={10}
      />
      <PageCinematicWrap auroraColor="#c0392b" auroraSecondary="#ff6b6b" giantText="COMPARE">
        <CompetitorsRadar />
        <Differentiators5 />
      </PageCinematicWrap>
    </main>
  );
}
