import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/* ── Progress dot ── */
function ProgressDot({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const mid        = index / (total - 1);
  const band       = 0.35 / (total - 1);
  const dotScale   = useTransform(progress, [mid - band, mid, mid + band], [1, 1.8, 1]);
  const dotOpacity = useTransform(progress, [mid - band, mid, mid + band], [0.2, 1, 0.2]);
  return (
    <motion.div style={{
      width: 7, height: 7, borderRadius: '50%',
      background: 'linear-gradient(135deg, #D4AF37, #F5D67B)',
      scale: dotScale, opacity: dotOpacity,
    }} />
  );
}

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const projects = [
  {
    id: 'llm-chat',
    title: 'AI Chat Platform',
    subtitle: 'LLM API Integration',
    description: 'Full-stack AI chat assistant with real-time streaming completions, document parsing, and multi-model support using OpenAI and Anthropic APIs.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'LLM APIs', 'MongoDB'],
    accentColor: '#D4AF37', accentRGB: '212,175,55',
    status: 'Production', github: 'https://github.com/umerrauf6',
    screenEmoji: '🤖', screenLabel: 'AI Chat Platform', year: '2024',
  },
  {
    id: 'b2b-platform',
    title: 'B2B SaaS Dashboard',
    subtitle: 'Full-Stack Web Application',
    description: 'Highly responsive dashboard built for B2B clients featuring complex data visualizations, role-based access control, and real-time analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Agile'],
    accentColor: '#F5D67B', accentRGB: '245,214,123',
    status: 'Client Project', github: 'https://github.com/umerrauf6',
    screenEmoji: '📊', screenLabel: 'SaaS Dashboard', year: '2024',
  },
  {
    id: 'nestjs-api',
    title: 'RESTful API Backend',
    subtitle: 'NestJS & TypeScript',
    description: 'Scalable NestJS backend with TypeScript, JWT authentication, MongoDB integration, input validation, and comprehensive API documentation.',
    tech: ['NestJS', 'TypeScript', 'MongoDB', 'JWT', 'REST APIs'],
    accentColor: '#D4AF37', accentRGB: '212,175,55',
    status: 'Open Source', github: 'https://github.com/umerrauf6',
    screenEmoji: '⚡', screenLabel: 'REST API', year: '2023',
  },
];

// How many px of vertical scroll each card transition takes
const SCROLL_PER_CARD = 700;
const CARD_GAP        = 32;

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Responsive card width: mirrors CSS min(820px, 88vw)
  const [cardWidth, setCardWidth] = useState(() => Math.min(820, window.innerWidth * 0.88));
  useEffect(() => {
    const onResize = () => setCardWidth(Math.min(820, window.innerWidth * 0.88));
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 55, damping: 20, mass: 0.6 });

  // x goes from centerOfFirst → centerOfLast
  // At progress=0: first card centered → x = (vw - cardW) / 2
  // At progress=1: last card centered → x = (vw - cardW) / 2 - (n-1)*(cardW+gap)
  const xStart = useTransform(smoothProgress, (p) => {
    const vw = window.innerWidth;
    const cw = Math.min(820, vw * 0.88);
    const initialX = (vw - cw) / 2;
    const totalMove = (projects.length - 1) * (cw + CARD_GAP);
    return initialX - p * totalMove;
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolledInto = -rect.top;
      const scrollRange  = section.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;
      rawProgress.set(Math.max(0, Math.min(1, scrolledInto / scrollRange)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [rawProgress]);

  // Section height: enough for each card to scroll into center
  // Use a bit extra on mobile since cards are shorter but sticky bar eats space
  const sectionHeight = `calc(100dvh + ${SCROLL_PER_CARD * (projects.length - 1)}px)`;

  return (
    <section id="projects" ref={sectionRef} style={{ position: 'relative', height: sectionHeight }}>
      {/* Sticky frame */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100dvh',   // dvh = dynamic viewport height, accounts for mobile browser bars
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* Header — in normal flow above cards, no absolute */}
        <div style={{ textAlign: 'center', padding: '60px 16px 16px', flexShrink: 0, width: '100%' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Featured Work</p>
          <h2 className="section-title" style={{ marginBottom: 2 }}>
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>
            Scroll to navigate
          </p>
        </div>

        {/* Sliding row — fills remaining vertical space, vertically centered */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
          <motion.div
            style={{
              x: xStart,
              display: 'flex',
              alignItems: 'center',
              gap: CARD_GAP,
              width: 'max-content',
            }}
          >
          {projects.map((project, index) => {
            const isHovered = hoveredCard === index;
            const isMobile  = window.innerWidth < 640;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  width: `min(${cardWidth}px, 92vw)`,
                  flexShrink: 0,
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: `1px solid ${isHovered ? project.accentColor + '55' : 'rgba(212,175,55,0.15)'}`,
                  background: 'rgba(10,10,18,0.75)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow: isHovered
                    ? `0 0 60px rgba(${project.accentRGB},0.15), 0 30px 80px rgba(0,0,0,0.5)`
                    : '0 20px 60px rgba(0,0,0,0.4)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.35s',
                }}
              >
                {/* Accent top bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />

                {isMobile ? (
                  /* ── MOBILE: compact single column ── */
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

                    {/* Mobile header row: emoji + counter + status */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 32, filter: `drop-shadow(0 0 10px rgba(${project.accentRGB},0.5))` }}>
                          {project.screenEmoji}
                        </span>
                        <div>
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: project.accentColor, opacity: 0.85 }}>
                            {project.subtitle}
                          </p>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: '#F5F5F5', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: `rgba(${project.accentRGB},0.4)`, display: 'block' }}>
                          {String(index + 1).padStart(2,'0')}/{String(projects.length).padStart(2,'0')}
                        </span>
                        <span style={{ padding: '2px 7px', borderRadius: 10, fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: `rgba(${project.accentRGB},0.1)`, border: `1px solid ${project.accentColor}30`, color: project.accentColor }}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{ color: 'rgba(245,245,245,0.55)', fontSize: 12.5, lineHeight: 1.65, margin: 0 }}>
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: `linear-gradient(90deg, rgba(${project.accentRGB},0.25), transparent)` }} />

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="btn-secondary" style={{ padding: '8px 16px', fontSize: 11, flex: 1, justifyContent: 'center' }}
                        whileTap={{ scale: 0.96 }}>
                        <GitHubIcon size={12} /> Code
                      </motion.a>
                      <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="btn-primary" style={{ padding: '8px 16px', fontSize: 11, flex: 1, justifyContent: 'center' }}
                        whileTap={{ scale: 0.96 }}>
                        <ExternalLink size={12} /> Details
                      </motion.a>
                    </div>
                  </div>
                ) : (
                  /* ── DESKTOP: two-panel side-by-side ── */
                  <div style={{ display: 'flex' }}>
                    {/* Visual panel */}
                    <div style={{
                      flex: '0 0 260px', minHeight: 300,
                      background: `radial-gradient(ellipse at 60% 40%, rgba(${project.accentRGB},0.12), transparent 65%), rgba(8,8,14,0.8)`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      padding: 28, position: 'relative', gap: 14,
                    }}>
                      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: `rgba(${project.accentRGB},0.45)` }}>
                          {String(index + 1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
                        </span>
                        <span style={{ padding: '3px 9px', borderRadius: 20, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: `rgba(${project.accentRGB},0.1)`, border: `1px solid ${project.accentColor}30`, color: project.accentColor }}>
                          {project.status}
                        </span>
                      </div>
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
                        style={{ fontSize: 52, lineHeight: 1, filter: `drop-shadow(0 0 18px rgba(${project.accentRGB},0.5))` }}>
                        {project.screenEmoji}
                      </motion.div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: project.accentColor, opacity: 0.8 }}>
                        {project.screenLabel}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 90 }}>
                        {[100, 75, 50].map((w, i) => (
                          <div key={i} style={{ height: 3, borderRadius: 2, width: `${w}%`, background: `rgba(${project.accentRGB},${0.4 - i * 0.1})` }} />
                        ))}
                      </div>
                    </div>

                    {/* Content panel */}
                    <div style={{ flex: 1, minWidth: 0, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                      <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: project.accentColor, marginBottom: 7, opacity: 0.9 }}>
                          {project.subtitle}
                        </p>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, color: '#F5F5F5', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 10 }}>
                          {project.title}
                        </h3>
                        <p style={{ color: 'rgba(245,245,245,0.55)', fontSize: 13, lineHeight: 1.75 }}>
                          {project.description}
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                      <div style={{ height: 1, background: `linear-gradient(90deg, rgba(${project.accentRGB},0.2), transparent)` }} />
                      <div style={{ display: 'flex', gap: 10 }}>
                        <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="btn-secondary" style={{ padding: '9px 18px', fontSize: 12 }}
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                          <GitHubIcon size={13} /> View Code
                        </motion.a>
                        <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="btn-primary" style={{ padding: '9px 18px', fontSize: 12 }}
                          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                          <ExternalLink size={13} /> Details
                        </motion.a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </motion.div>
        </div>{/* end sliding row wrapper */}

        {/* Progress dots — anchored to bottom of sticky frame */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, alignItems: 'center', zIndex: 10 }}>
          {projects.map((_, i) => (
            <ProgressDot key={i} progress={smoothProgress} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
