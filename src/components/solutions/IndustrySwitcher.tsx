import { useEffect, useRef, useState } from 'react';
import { INDUSTRIES } from '../../data/solutions';

/**
 * IndustrySwitcher — sticky 10-pill segmented control under the SiteNav.
 * Tracks the industry section currently in view and smooth-scrolls on click.
 * Mobile: horizontal overflow scroll; active pill auto-centers.
 */
export default function IndustrySwitcher() {
  const [activeId, setActiveId] = useState<string>(INDUSTRIES[0].id);
  const stripRef = useRef<HTMLDivElement>(null);

  // Track which industry section is currently in view
  useEffect(() => {
    const ids = INDUSTRIES.map((i) => i.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible section still within the narrow activation
        // band. Using rect geometry (not intersectionRatio) avoids jitter when
        // multiple adjacent cards share similar ratios in the 4-col grid row.
        const candidates = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);
        if (candidates.length > 0) {
          setActiveId(candidates[0].target.id);
        }
      },
      {
        // Narrow 15%-tall activation band at top of viewport
        // (below sticky nav + switcher).
        rootMargin: '-120px 0px -85% 0px',
        threshold: 0,
      }
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  // When active pill changes on mobile, center it in the scrollable strip
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const activePill = strip.querySelector<HTMLAnchorElement>(
      `[data-industry-pill="${activeId}"]`
    );
    if (activePill) {
      activePill.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const proven = INDUSTRIES.filter((i) => i.proven);
  const adjacent = INDUSTRIES.filter((i) => !i.proven);

  return (
    <div
      className="sticky top-[64px] z-40"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div
        ref={stripRef}
        className="max-w-[1400px] mx-auto flex items-center gap-3 px-6 py-3 overflow-x-auto no-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        <span className="micro-upper flex-shrink-0" style={{ color: 'rgba(0,0,0,0.45)' }}>
          Jump to
        </span>

        {/* Proven group */}
        <span
          className="micro-upper flex-shrink-0 px-2"
          style={{ color: 'rgba(0,0,0,0.35)', fontSize: 10 }}
        >
          · IN PRODUCTION ·
        </span>
        {proven.map((i) => (
          <Pill key={i.id} id={i.id} active={activeId === i.id} onClick={onClick}>
            {i.name}
          </Pill>
        ))}

        {/* Adjacent group */}
        <span
          className="micro-upper flex-shrink-0 px-2"
          style={{ color: 'rgba(0,0,0,0.35)', fontSize: 10 }}
        >
          · ADJACENT ·
        </span>
        {adjacent.map((i) => (
          <Pill key={i.id} id={i.id} active={activeId === i.id} onClick={onClick}>
            {i.name}
          </Pill>
        ))}
      </div>
    </div>
  );
}

function Pill({
  id,
  active,
  onClick,
  children,
}: {
  id: string;
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`#${id}`}
      data-industry-pill={id}
      aria-current={active ? 'location' : undefined}
      onClick={(e) => onClick(e, id)}
      className="flex-shrink-0 inline-flex items-center rounded-full transition-all duration-150 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      style={{
        padding: '6px 14px',
        fontFamily: 'var(--mono)',
        fontSize: 12,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        background: active ? '#000000' : 'transparent',
        color: active ? '#ffffff' : 'rgba(0,0,0,0.60)',
        border: active ? '1px solid #000000' : '1px solid rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.20)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
      }}
    >
      {children}
    </a>
  );
}
