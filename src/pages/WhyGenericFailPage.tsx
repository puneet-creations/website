import SplitVerdict from '../components/SplitVerdict';
import FailureModesWall from '../components/FailureModesWall';
import PageHero from '../components/PageHero';
import PageCinematicWrap from '../components/PageCinematicWrap';
import { usePageMeta } from '../hooks/usePageMeta';

export default function WhyGenericFailPage() {
  usePageMeta({
    title: 'Why now · Privacy · Cost · Outcomes — Attentions AI',
    description:
      'Three things changed in the last year. Sending your data to an outside cloud is no longer safe or legal. AI cloud bills are unpredictable and unusually high. And the board has stopped buying demos. Sovereign AI — on your own servers — is the only option that scales.',
    ogUrl: 'https://attentions.ai/why-generic-fail',
  });
  return (
    <main>
      <PageHero
        label="Why now · privacy · cost · outcomes"
        title="Three things changed."
        titleAccent="Public AI no longer scales."
        description="Sending your data to an outside cloud is no longer safe or legal. AI cloud bills are unpredictable and unusually high. And the board has stopped buying demos. Together they make sovereign AI — running on your own servers — the only option that scales."
        accent="#c0392b"
        orbColor="#f5c0c0"
        pills={[
          'Privacy · data no longer allowed to leave',
          'Cost · cloud bills unpredictable',
          'Outcomes · the board stopped buying demos',
        ]}
        dustCount={10}
      />
      <PageCinematicWrap auroraColor="#c0392b" auroraSecondary="#ff9090" giantText="FAILS">
        <SplitVerdict />
        <FailureModesWall />
      </PageCinematicWrap>
    </main>
  );
}
