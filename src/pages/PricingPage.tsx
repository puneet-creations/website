import { MotionConfig } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import ClientsStrip from '../components/ClientsStrip';
import PricingDoor from '../components/pricing/PricingDoor';
import { DOORS } from '../data/pricing';
import ParallaxHero from '../components/ParallaxHero';
import PricingCloser from '../components/pricing/PricingCloser';

/**
 * PricingPage v2 — three-doors redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip → 3 Door cards → [parallax] → PricingCloser
 *
 * Design: docs/plans/2026-04-18-pricing-page-design.md
 */
export default function PricingPage() {
  usePageMeta({
    title: 'Pricing · $5K assessment · From $10K agent · $20K/yr platform — Attentions AI',
    description:
      'Three ways to start, listed in order of commitment. $5,000 USD fixed for a 2-week assessment. From $10,000 USD per agent in 4 weeks. $20,000 USD/year platform + three custom agents in 6 weeks. The numbers on this page are the numbers on the contract.',
    ogUrl: 'https://attentions.ai/pricing',
  });
  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/*
          Cinematic hero — close-up of a hand signing a business
          contract. Direct narrative match: the page is the
          "commitment ladder" and the entire framing is "the numbers
          on this page are the numbers on the contract". Visual
          evidence of the literal moment of commitment.
        */}
        <PageHero
          label="Pricing"
          title="Three ways to start,"
          titleAccent="listed in order of commitment."
          description="Two-week assessment, single agent live in four weeks, or the full platform deployed in six. The numbers on this page are the numbers on the contract."
          accent="#3a7d44"
          orbColor="#a0d0a8"
          pills={[
            '$5K · 2-week assessment',
            'From $10K · agent in 4 weeks',
            '$20K/yr platform + $10K/agent',
            'Own what you build',
            'Live on your servers',
          ]}
          videoSrc="/video/pricing-hero.mp4"
          videoOpacity={0.3}
          videoTintOpacity={0.74}
        />

        <ClientsStrip />

        {DOORS.map((d) => (
          <PricingDoor key={d.id} data={d} />
        ))}

        <ParallaxHero
          imageSrc="/img/photo-1559526324-4b87b5e36e44.webp"
          headline="Start anywhere."
          headlineAccent="Compound over time."
          subline="A door you start with today becomes the foundation for the next. Every engagement is scoped to pay back in months, not years."
          label="The compound effect"
          height="60vh"
          clipRadius={24}
        />

        <PricingCloser />
      </main>
    </MotionConfig>
  );
}
