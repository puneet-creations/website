import { MotionConfig } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import ClientsStrip from '../components/ClientsStrip';
import ParallaxHero from '../components/ParallaxHero';
import CertificationsStrip from '../components/about/CertificationsStrip';
import StatRow from '../components/about/StatRow';
import SuccessStories from '../components/about/SuccessStories';
import TeamGrid from '../components/about/TeamGrid';
import HowWeWork from '../components/about/HowWeWork';
import TimelineStrip from '../components/about/TimelineStrip';
import AboutCloser from '../components/about/AboutCloser';

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
  usePageMeta({
    title: 'About · Experts in Sovereign AI for Enterprise — Attentions AI',
    description:
      'Experts in sovereign AI agents for enterprise. 18 experts in Dubai and Pune. 15 agents live in production across 3 regulated industries. Zero security incidents on record. SOC 2 Type II · HIPAA · GDPR · ISO 27001.',
    ogUrl: 'https://attentions.ai/about',
  });
  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/*
          Cinematic hero — aerial Downtown Dubai cityscape. Grounds the
          "Dubai · Pune" brand geography in real footage of one of the
          two HQ cities, not generic office stock. The mid-page
          ParallaxHero further reinforces with a golden-hour cityscape
          for "the track record" beat.
        */}
        <PageHero
          label="About · experts in sovereign AI for enterprise"
          title="Experts in Sovereign AI Agents"
          titleAccent="for Enterprise."
          description="Cost-optimized, secure on-prem, and scalable to enterprise volumes — millions of documents, your hardware, your regulator’s rules. 18 experts. 15 agents live in production across 3 regulated industries. Zero security incidents on record. SOC 2 Type II, HIPAA, GDPR, ISO 27001 — all certified. Offices in Dubai and Pune."
          accent="#475569"
          orbColor="#c8d0dc"
          pills={[
            'Cost-optimized',
            'Secure · on-prem',
            'Scalable · millions of docs',
            'Dubai · Pune',
            'SOC 2 Type II · HIPAA · GDPR · ISO 27001',
          ]}
          videoSrc="/video/about-hero.mp4"
          videoOpacity={0.3}
          videoTintOpacity={0.74}
        />

        <ClientsStrip />

        <CertificationsStrip />

        <StatRow />

        <SuccessStories />

        {/*
          Editorial backdrop — golden-hour cityscape. Local /img/ so
          page renders without external CDN. Grounds the "Dubai · Pune"
          brand geography in real urban-skyline imagery rather than
          generic office stock.
        */}
        <ParallaxHero
          imageSrc="/img/about-city-dusk.webp"
          headline="Shipped. Audited."
          headlineAccent="Live."
          subline="15 agents live in production across 3 regulated industries. Zero security incidents on record. Four certifications on file."
          label="The track record"
          height="60vh"
          clipRadius={24}
        />

        <TeamGrid />

        <HowWeWork />

        <TimelineStrip />

        <AboutCloser />
      </main>
    </MotionConfig>
  );
}
