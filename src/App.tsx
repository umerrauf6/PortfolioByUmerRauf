import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSectionObserver } from './hooks/useSectionObserver';
import { useGalaxyStore } from './store/useGalaxyStore';

/* Lazy-load the Galaxy background so HTML paints first */
const GalaxyBackground = lazy(() => import('./components/GalaxyBackground'));

/* ── Custom Gold Cursor ─────────────────────────────────────────── */
function GoldCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let raf: number;
    let rx = 0, ry = 0, mx = 0, my = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top  = my + 'px';
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top  = ry + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterBtn = () => setHovering(true);
    const onLeaveBtn = () => setHovering(false);

    const addHover = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnterBtn);
        el.addEventListener('mouseleave', onLeaveBtn);
      });
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);
    addHover();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={`cursor-dot  ${hovering ? 'hovering' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
}

/* ── Mouse Spotlight ─────────────────────────────────────────────── */
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.setProperty('--mx', `${e.clientX}px`);
        ref.current.style.setProperty('--my', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return <div ref={ref} className="spotlight" />;
}

function App() {
  const appLoaded = useGalaxyStore(s => s.appLoaded);

  /* Attach the IntersectionObserver that syncs scroll → Zustand store */
  useSectionObserver();

  return (
    <>
      {/* ── LAYER 1: Fixed galaxy background — never scrolls ── */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#05050f' }} />}>
          <GalaxyBackground />
        </Suspense>
      </div>

      {/* ── Overlay helpers (cursor, spotlight — fixed, above bg, below content) ── */}
      <GoldCursor />
      <Spotlight />

      {/* ── LAYER 2: Scrollable content — transparent so galaxy shows through ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          // Transparent — galaxy visible underneath
          background: 'transparent',
        }}
      >
        {appLoaded && <Navbar />}
        <main>
          <Hero />
          {appLoaded && (
            <>
              <About />
              <Skills />
              <Projects />
              <Contact />
            </>
          )}
        </main>
        {appLoaded && <Footer />}
      </div>
    </>
  );
}

export default App;
