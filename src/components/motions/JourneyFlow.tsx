import { useRef } from 'react';

/**
 * JourneyFlow — horizontal snap-scroll slider.
 * Each scene is a full-width slide. Swipe/scroll to navigate.
 * Responsive: works on mobile (touch swipe) and desktop (scroll/arrows).
 */

type Props = {
  stepLabels: string[];
  genericFail: string;
  scenes: React.ReactNode[];
};

export default function JourneyFlow({ stepLabels, genericFail, scenes }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const w = trackRef.current.offsetWidth;
    trackRef.current.scrollBy({ left: dir === 'right' ? w : -w, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Slider */}
      <div className="relative">
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {scenes.map((scene, i) => (
            <div
              key={i}
              className="snap-center flex-shrink-0"
              style={{ width: 'min(84vw, 1028px)' }}
            >
              {/* Step label */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold flex-shrink-0"
                  style={{ background: 'rgba(138,245,192,0.15)', color: '#8af5c0', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-[15px] font-semibold uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.80)', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {stepLabels[i]}
                </span>
              </div>
              {/* Scene */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {scene}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-white/10 transition-colors"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.10)' }}
          aria-label="Previous step"
        >
          <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-white/10 transition-colors"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.10)' }}
          aria-label="Next step"
        >
          <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {scenes.map((_, i) => (
          <span key={i} className="w-2 h-2 rounded-full" style={{ background: i === 0 ? '#8af5c0' : 'rgba(255,255,255,0.20)' }} />
        ))}
      </div>

      {/* Generic AI ✗ */}
      {genericFail && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mt-4" style={{ background: 'rgba(192,57,43,0.06)', borderLeft: '3px solid rgba(255,107,107,0.40)' }}>
          <span className="flex-shrink-0 text-[14px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)', color: '#ff9090', fontFamily: "'JetBrains Mono', monospace" }}>
            Generic AI ✗
          </span>
          <span className="text-[14px] leading-relaxed" style={{ color: '#ff9090' }}>{genericFail}</span>
        </div>
      )}
    </div>
  );
}
