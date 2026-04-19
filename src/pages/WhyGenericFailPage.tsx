import SplitVerdict from '../components/SplitVerdict';
import FailureModesWall from '../components/FailureModesWall';
import PageHero from '../components/PageHero';
import PageCinematicWrap from '../components/PageCinematicWrap';

export default function WhyGenericFailPage() {
  return (
    <main>
      <PageHero
        label="Why generic AI fails"
        title="Built for the internet."
        titleAccent="Breaks in your enterprise."
        description="Public LLMs hallucinate, leak PII, cost exponentially, and produce zero audit trail. Here is exactly where each one fails."
        accent="#c0392b"
        orbColor="#f5c0c0"
        dustCount={10}
      />
      <PageCinematicWrap auroraColor="#c0392b" auroraSecondary="#ff9090" giantText="FAILS">
        <SplitVerdict />
        <FailureModesWall />
      </PageCinematicWrap>
    </main>
  );
}
