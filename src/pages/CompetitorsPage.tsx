import CompetitorsRadar from '../components/CompetitorsRadar';
import Differentiators5 from '../components/Differentiators5';
import PageHero from '../components/PageHero';
import PageCinematicWrap from '../components/PageCinematicWrap';

export default function CompetitorsPage() {
  return (
    <main>
      <PageHero
        label="How we compare"
        title="artiGen vs"
        titleAccent="the alternatives."
        description="See how artiGen stacks up against foundation models, MBB consulting, RPA, copilots, agentic startups, and DIY builds."
        accent="#c0392b"
        orbColor="#f5c0c0"
        dustCount={10}
      />
      <PageCinematicWrap auroraColor="#c0392b" auroraSecondary="#ff6b6b" giantText="COMPARE">
        <CompetitorsRadar />
        <Differentiators5 />
      </PageCinematicWrap>
    </main>
  );
}
