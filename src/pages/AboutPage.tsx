import { MotionConfig } from 'framer-motion';
import PageHero from '../components/PageHero';
import ClientsStrip from '../components/ClientsStrip';
import ParallaxHero from '../components/ParallaxHero';
import CertificationsStrip from '../components/about/CertificationsStrip';
import StatRow from '../components/about/StatRow';
import SuccessStories from '../components/about/SuccessStories';
import TeamGrid from '../components/about/TeamGrid';

/**
 * AboutPage v2 — credibility-lead redesign.
 *
 * Story arc:
 *   Hero → ClientsStrip → Certifications → Stats → Success stories →
 *   [parallax] → Team → How we work → Timeline → Closer
 *
 * Design: docs/plans/2026-04-18-about-page-design.md
 */
export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <PageHero
          label="About"
          title="Built to ship."
          titleAccent="Certified to scale."
          description="18 experts. Five production agents. Three enterprise clients. Zero hallucination incidents since day one. SOC 2 Type 1, HIPAA, GDPR, ISO 27001 — all certified."
          accent="#475569"
          orbColor="#c8d0dc"
          pills={[
            '18 experts',
            '5 agents live',
            '3 enterprise clients',
            '0 incidents',
            '4 certifications',
          ]}
        />

        <ClientsStrip />

        <CertificationsStrip />

        <StatRow />

        <SuccessStories />

        <ParallaxHero
          imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          headline="Shipped. Audited."
          headlineAccent="Live."
          subline="Three enterprise clients in regulated industries. Zero hallucination incidents since day one. Four certifications on file."
          label="The track record"
          height="60vh"
          clipRadius={24}
        />

        <TeamGrid />

        {/* TEMPORARY placeholders — replaced in Tasks 8–10 */}
        {['how', 'timeline', 'closer'].map((id) => (
          <section
            key={id}
            id={id}
            style={{
              minHeight: '30vh',
              padding: '60px 24px',
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <h2 className="font-display text-3xl text-center">{id} (placeholder)</h2>
          </section>
        ))}
      </main>
    </MotionConfig>
  );
}
