import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import GradientMesh, { MESHES } from './components/GradientMesh';
import SvgDefs from './components/motions/SvgDefs';
import SiteNav from './components/SiteNav';
import CinematicFooter from './components/CinematicFooter';
import LandingPage from './pages/LandingPage';
import AgentsPage from './pages/AgentsPage';
import PlatformPage from './pages/PlatformPage';
import ContactPage from './pages/ContactPage';
import WhyGenericFailPage from './pages/WhyGenericFailPage';
import PricingPage from './pages/PricingPage';
import SolutionsPage from './pages/SolutionsPage';
import CompetitorsPage from './pages/CompetitorsPage';
import FaqPage from './pages/FaqPage';
import SecurityPage from './pages/SecurityPage';
import AboutPage from './pages/AboutPage';

const ROUTE_TO_MESH: Record<string, string> = {
  '/': 'landing',
  '/platform': 'platform',
  '/agents': 'agents',
  '/pricing': 'pricing',
  '/solutions': 'solutions',
  '/competitors': 'competitors',
  '/why-generic-fail': 'whyGenericFail',
  '/security': 'security',
  '/about': 'about',
  '/contact': 'contact',
  '/faq': 'faq',
};

/**
 * Scroll to top on route change — unless the URL has a `#hash`, in which
 * case scroll the matching element into view so cross-page hash links
 * (e.g. footer "See security architecture →" → /security#compliance)
 * land at their anchor instead of the page top.
 * Fallback to top if the target id isn't in the DOM yet.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Defer one paint — give the newly-rendered page a chance to mount
      // the target element before we measure its position.
      const t = window.setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 50);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const meshPage = ROUTE_TO_MESH[pathname] || 'landing';

  return (
    <div className="relative" style={{ color: 'var(--text-primary)', minHeight: '100vh' }}>
      <ScrollToTop />
      {/* Global SVG defs — rendered once, referenced by all motion stories via url(#id) */}
      <svg aria-hidden className="absolute w-0 h-0 overflow-hidden"><SvgDefs /></svg>
      <GradientMesh page={meshPage as keyof typeof MESHES} />
      <div className="relative z-[1]">
        <div className="comet-grain" aria-hidden />
        <CursorGlow />
        <SiteNav />
        <Outlet />
        <CinematicFooter />
      </div>
    </div>
  );
}

/** Cursor glow — tracks mouse, sets CSS vars --cx/--cy for the glow div */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="comet-glow" aria-hidden />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/why-generic-fail" element={<WhyGenericFailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/case-studies" element={<Navigate to="/solutions" replace />} />
          <Route path="/competitors" element={<CompetitorsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
