import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroOrb = lazy(() => import('./HeroOrb'));

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CinematicFooter — dark footer with a large animated black orb centerpiece,
 * 5-column link grid (with jump-link anchors), and a legal row.
 *
 * Design: docs/plans/2026-04-15-closer-manifesto-footer-orb-design.md
 */

const marqueeItems = [
  'Sovereign AI', 'On-prem Agents', 'Hallucination Control',
  'Audit Trail', 'Fixed Cost', 'Cited Outputs',
  'Regulated Ready', 'Founder First',
];

function MarqueeItem() {
  return (
    <>
      {marqueeItems.map((item, i) => (
        <span key={i} className="inline-flex items-center px-6 whitespace-nowrap">
          <span className="w-1 h-1 rounded-full bg-white/30 mr-4" />
          {item}
        </span>
      ))}
    </>
  );
}

type LinkItem = { to?: string; href?: string; label: string; external?: boolean };

function FooterColumn({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <div>
      <div
        className="mb-4 text-[11px]"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.40)',
        }}
      >
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i}>
            {item.external && item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.to ?? '#'}
                className="text-[14px] transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // prefers-reduced-motion is read once at mount; if the user toggles their
  // system preference mid-session, they must reload for it to take effect —
  // consistent with how the existing GSAP reduced-motion guard (below) behaves.
  const [prefersReducedMotion] = useState<boolean>(
    () => typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Pause video playback when the footer scrolls off-screen so we don't burn
  // CPU on long scrolling sessions. Threshold:0.01 fires when ≥1% of the
  // video is visible.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay may be blocked on iOS Low-Power-Mode / Data Saver; if so,
          // the promise rejects silently and the poster frame shows instead.
          video.play().catch(() => { /* intentionally silent */ });
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  // Subtle GSAP on the headline
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 70%' },
      });
    });
    return () => ctx.revert();
  }, []);

  // 5-column link structure
  const product: LinkItem[] = [
    { to: '/platform', label: 'Platform overview' },
    { to: '/platform#layers', label: 'Six shared layers' },
    { to: '/platform', label: 'Agent pattern' },
    { to: '/pricing', label: 'Pricing' },
  ];
  const solutions: LinkItem[] = [
    { to: '/agents', label: 'Document agents' },
    { to: '/agents', label: 'Voice agents' },
    { to: '/agents', label: 'Multimodal agents' },
    { to: '/why-generic-fail', label: 'Why generic fails' },
    { to: '/#ownership', label: 'IP & ownership' },
  ];
  const proof: LinkItem[] = [
    { to: '/solutions', label: 'Solutions' },
    { to: '/competitors', label: 'Competitors' },
    { to: '/agents#production', label: 'Live production' },
    { to: '/why-generic-fail', label: 'Why generic fails' },
  ];
  const company: LinkItem[] = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/faq', label: 'FAQ' },
    { to: '/security', label: 'Security & compliance' },
  ];
  const connect: LinkItem[] = [
    { href: 'mailto:hello@attentions.ai', label: 'hello@attentions.ai', external: true },
    { href: 'https://linkedin.com', label: 'LinkedIn', external: true },
    { to: '#', label: 'Privacy' },
    { to: '#', label: 'Terms' },
  ];

  return (
    <div ref={wrapperRef} className="relative h-auto w-full">
      <footer className="relative flex min-h-screen w-full flex-col overflow-hidden text-white" style={{ background: '#060a12' }}>

        {/* Motion background — dark particles drift, self-hosted Pexels CC0 loop */}
        <video
          ref={videoRef}
          src="/footer-bg.mp4"
          poster="/footer-bg-poster.webp"
          autoPlay={!prefersReducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{
            opacity: 0.55,
            mixBlendMode: 'screen',
            filter: 'brightness(0.85) saturate(0.9)',
          }}
        />
        {/* Dark gradient overlay — guarantees WCAG AA on the white content on top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,10,18,0.45) 0%, rgba(6,10,18,0.70) 50%, rgba(6,10,18,0.85) 100%)',
          }}
        />

        {/* Diagonal marquee band */}
        <div className="relative z-10 border-y py-4 -rotate-1 scale-105 overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(6,10,18,0.70)', backdropFilter: 'blur(12px)' }}>
          <div className="flex w-max cf-marquee text-[13px] font-bold tracking-[0.20em] uppercase" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'JetBrains Mono', monospace" }}>
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* Main content: orb + headline + CTA */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-24 w-full max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

            {/* Orb */}
            <div className="flex justify-center md:justify-end">
              <div className="relative" style={{ width: 'clamp(260px, 30vw, 420px)', height: 'clamp(260px, 30vw, 420px)' }}>
                <Suspense fallback={null}>
                  <HeroOrb
                    baseColor="#1a1a1a"
                    attenuationColor="#000000"
                    envColor="#666666"
                    attenuationDistance={0.6}
                    breatheAmp={0.12}
                    floatAmp={0.22}
                  />
                </Suspense>
              </div>
            </div>

            {/* Headline + CTA */}
            <div className="text-center md:text-left">
              <h2
                ref={headingRef}
                className="mb-10"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(36px, 5.5vw, 72px)',
                  fontWeight: 500,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                }}
              >
                Sovereign AI and production agents on the{' '}
                <span style={{ fontStyle: 'italic' }}>artiGen Platform.</span>
              </h2>

              {/* 3 value callouts with white orb badges */}
              <div className="flex flex-col gap-5 mb-10 items-center md:items-start">
                {[
                  { title: 'Secure by architecture', sub: 'On-prem. Air-gapped if you need it.' },
                  { title: 'Fixed low cost', sub: 'No per-token surprise. Predictable.' },
                  { title: 'ROI in weeks', sub: 'Live agents in 4 weeks, not quarters.' },
                ].map((c) => (
                  <div key={c.title} className="flex items-center gap-4 text-left">
                    {/* White glass orb */}
                    <div
                      className="flex-shrink-0 rounded-full"
                      style={{
                        width: 48,
                        height: 48,
                        background:
                          'radial-gradient(circle at 35% 30%, #ffffff 0%, #e8e8e8 40%, #b8b8b8 100%)',
                        boxShadow:
                          'inset -4px -6px 10px rgba(0,0,0,0.15), inset 2px 3px 6px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.10)',
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: 20,
                          fontWeight: 500,
                          letterSpacing: '-0.01em',
                          color: '#ffffff',
                          lineHeight: 1.1,
                        }}
                      >
                        {c.title}
                      </div>
                      <div
                        className="mt-1"
                        style={{
                          fontFamily: "'Noto Sans', sans-serif",
                          fontSize: 14,
                          color: 'rgba(255,255,255,0.55)',
                          lineHeight: 1.4,
                        }}
                      >
                        {c.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mb-8 max-w-[500px] mx-auto md:mx-0 italic" style={{ fontSize: 15, color: 'rgba(255,255,255,0.50)', fontFamily: "'Fraunces', serif" }}>
                Don&rsquo;t hand your IP to public AI.
              </p>
              <motion.a
                href="mailto:hello@attentions.ai?subject=Founder%20Call"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full"
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Book a founder call <span>→</span>
              </motion.a>
              <div className="mt-5 text-[13px]" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: "'JetBrains Mono', monospace" }}>
                hello@attentions.ai · Response within 4 business hours
              </div>
            </div>
          </div>
        </div>

        {/* 5-column link grid */}
        <div className="relative z-10 border-t px-6 py-14" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            <FooterColumn title="Product" items={product} />
            <FooterColumn title="Solutions" items={solutions} />
            <FooterColumn title="Proof" items={proof} />
            <FooterColumn title="Company" items={company} />
            <FooterColumn title="Connect" items={connect} />
          </div>
        </div>

        {/* Legal row */}
        <div className="relative z-10 border-t px-6 py-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[13px]" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: "'JetBrains Mono', monospace" }}>
            <span>© {new Date().getFullYear()} attentions.ai · Built for regulated enterprise.</span>
            <span>artiGen · Sovereign AI Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
