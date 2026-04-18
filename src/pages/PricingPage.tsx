import { MotionConfig } from 'framer-motion';
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
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <PageHero
          label="Pricing"
          title="Three doors."
          titleAccent="Every door a great strategy."
          description="Pick where you are. Each door delivers standalone. Scope-dependent — we price to your business, not to a rate card."
          accent="#3a7d44"
          orbColor="#a0d0a8"
          pills={[
            '3 engagement shapes',
            'Scope-dependent · no rate card',
            'ROI in months, not years',
            '2-week assessment start',
            'Own what you build',
          ]}
        />

        <ClientsStrip />

        {DOORS.map((d) => (
          <PricingDoor key={d.id} data={d} />
        ))}

        <ParallaxHero
          imageSrc="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=1080&fit=crop"
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
