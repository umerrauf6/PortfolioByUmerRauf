import { useEffect, useRef, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  return (
    <div className="relative min-h-screen antialiased overflow-x-hidden" style={{ background: '#0B0B0D' }}>
      <GoldCursor />
      <Spotlight />

      {/* Ambient gold orbs (fixed) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06), transparent 70%)',
            filter: 'blur(120px)',
            animation: 'orbFloat 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04), transparent 70%)',
            filter: 'blur(100px)',
            animation: 'orbFloat 11s ease-in-out infinite 4s',
          }}
        />
        <div
          className="absolute top-2/3 left-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(245,214,123,0.03), transparent 70%)',
            filter: 'blur(90px)',
            animation: 'orbFloat 16s ease-in-out infinite 8s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
