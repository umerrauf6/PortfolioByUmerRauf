import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Full-screen loading splash with "Umer Rauf" displayed as an animated
 * SVG stroke-outline that draws itself, then fills, then fades away.
 */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'drawing' | 'filling' | 'exit'>('drawing');

  useEffect(() => {
    // Phase 1: stroke draws (1.8s)
    const t1 = setTimeout(() => setPhase('filling'), 1800);
    // Phase 2: fill animates (1s)
    const t2 = setTimeout(() => setPhase('exit'), 2800);
    // Phase 3: exit (0.8s), then complete
    const t3 = setTimeout(() => onComplete(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        animate={phase === 'exit' ? { opacity: 0, scale: 1.1 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05050f',
          pointerEvents: phase === 'exit' ? 'none' : 'all',
        }}
      >
        {/* Ambient glow behind text */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(212,175,55,0.08), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* SVG outlined name */}
        <svg
          viewBox="0 0 600 140"
          style={{ width: 'min(80vw, 600px)', height: 'auto', position: 'relative' }}
        >
          {/* "Umer" */}
          <text
            x="300"
            y="65"
            textAnchor="middle"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              fill: phase === 'filling' || phase === 'exit' ? '#D4AF37' : 'transparent',
              stroke: '#D4AF37',
              strokeWidth: 1.5,
              strokeDasharray: 600,
              strokeDashoffset: phase === 'drawing' ? 600 : 0,
              transition: phase === 'drawing'
                ? 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'fill 0.6s ease-in-out, stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            Umer
          </text>

          {/* "Rauf" */}
          <text
            x="300"
            y="125"
            textAnchor="middle"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              fill: phase === 'filling' || phase === 'exit' ? '#F5F5F5' : 'transparent',
              stroke: '#F5D67B',
              strokeWidth: 1.5,
              strokeDasharray: 600,
              strokeDashoffset: phase === 'drawing' ? 600 : 0,
              transition: phase === 'drawing'
                ? 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                : 'fill 0.6s ease-in-out 0.15s, stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            Rauf
          </text>
        </svg>

        {/* Subtitle line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === 'filling' || phase === 'exit' ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 12,
            letterSpacing: '0.35em',
            color: 'rgba(212,175,55,0.5)',
            marginTop: 20,
            textTransform: 'uppercase',
          }}
        >
          Full-Stack Developer
        </motion.p>

        {/* Loading bar */}
        <div
          style={{
            marginTop: 32,
            width: 'min(50vw, 200px)',
            height: 2,
            borderRadius: 1,
            background: 'rgba(212,175,55,0.15)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #D4AF37, #F5D67B)',
              borderRadius: 1,
            }}
          />
        </div>

        {/* Corner decorative dots */}
        <div style={{ position: 'absolute', top: 40, left: 40, display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#D4AF37',
              }}
            />
          ))}
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.3em',
            color: '#D4AF37',
          }}
        >
          PORTFOLIO
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}
