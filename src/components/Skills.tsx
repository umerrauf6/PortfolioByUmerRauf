import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal3D } from './Reveal3D';

const skillGroups = [
  {
    category: 'FRONTEND',
    color1: '#D4AF37', color2: '#F5D67B',
    skills: [
      { name: 'React',        level: 95 },
      { name: 'Next.js',      level: 90 },
      { name: 'TypeScript',   level: 90 },
      { name: 'JavaScript',   level: 95 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'HTML5 / CSS3', level: 95 },
    ],
  },
  {
    category: 'BACKEND',
    color1: '#C8A020', color2: '#E8C840',
    skills: [
      { name: 'Node.js',    level: 88 },
      { name: 'NestJS',     level: 82 },
      { name: 'REST APIs',  level: 92 },
      { name: 'MongoDB',    level: 85 },
      { name: 'Express',    level: 85 },
      { name: 'PostgreSQL', level: 70 },
    ],
  },
  {
    category: 'AI & TOOLS',
    color1: '#B8960C', color2: '#D4AF37',
    skills: [
      { name: 'LLM APIs',       level: 85 },
      { name: 'GitHub Copilot', level: 90 },
      { name: 'Claude Code',    level: 85 },
      { name: 'Git / GitHub',   level: 92 },
      { name: 'Agile / Scrum',  level: 88 },
      { name: 'CI/CD',          level: 72 },
    ],
  },
];

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);
  const dirs = ['left', 'up', 'right'] as const;

  return (
    <section id="skills" className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.02) 50%, transparent)' }}>
      <div className="section-inner" ref={ref}>

        {/* Header */}
        <Reveal3D direction="zoomIn" delay={0} className="mb-14">
          <p className="section-label">What I Work With</p>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-sm max-w-lg" style={{ color: 'var(--text-muted)' }}>
            Full-stack toolkit refined through B2B projects and academic research — building excellent products end-to-end.
          </p>
        </Reveal3D>

        {/* Skill cards with CSS decorative headers (replaced Canvas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => {
            const isHovered = hovered === i;
            return (
              <Reveal3D key={group.category} direction={dirs[i]} delay={0.1 + i * 0.15} duration={0.85}>
                <motion.div
                  className="shine-effect relative flex flex-col"
                  style={{
                    background: 'rgba(14,14,22,0.55)',
                    border: `1px solid ${isHovered ? `rgba(212,175,55,0.6)` : 'rgba(212,175,55,0.18)'}`,
                    borderRadius: 16,
                    backdropFilter: 'blur(20px)',
                    boxShadow: isHovered
                      ? `0 0 60px rgba(212,175,55,0.18), inset 0 0 40px rgba(212,175,55,0.05)`
                      : 'none',
                    transition: 'box-shadow 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 22 }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(212,175,55,${isHovered ? 0.8 : 0.3}), transparent)` }} />

                  {/* CSS decorative header (replaces Canvas) */}
                  <div style={{ height: 150, position: 'relative', overflow: 'hidden' }}>
                    {/* Animated nebula orb */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="nebula-orb" style={{
                        width: isHovered ? 70 : 55,
                        height: isHovered ? 70 : 55,
                        background: `radial-gradient(ellipse, ${group.color1}, ${group.color2}40, transparent)`,
                        transition: 'width 0.4s, height 0.4s',
                      }} />
                    </div>
                    {/* Orbiting rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="css-orbit-ring" style={{
                        width: 100,
                        height: 100,
                        borderColor: `${group.color1}40`,
                        animationDuration: isHovered ? '4s' : '8s',
                      }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="css-orbit-ring" style={{
                        width: 130,
                        height: 130,
                        borderColor: `${group.color2}25`,
                        animationDuration: isHovered ? '6s' : '12s',
                        animationDirection: 'reverse',
                      }} />
                    </div>
                    {/* Inner glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse, ${group.color1}25, transparent 70%)`,
                        filter: 'blur(15px)',
                        animation: 'nebulaPulse 3s ease-in-out infinite',
                        animationDelay: `${i * 0.5}s`,
                      }} />
                    </div>

                    {/* Category label overlay */}
                    <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                      <span className="font-display font-black text-xs tracking-widest"
                        style={{ color: group.color1, letterSpacing: '0.22em', textShadow: `0 0 14px ${group.color1}55` }}>
                        {group.category}
                      </span>
                    </div>
                  </div>

                  {/* Skill bars */}
                  <div className="p-5 pt-2 space-y-2.5 flex-1">
                    {group.skills.map(({ name, level }, si) => (
                      <Reveal3D key={name} direction="up" delay={0.2 + i * 0.15 + si * 0.04} duration={0.5}>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm" style={{ color: 'rgba(245,245,245,0.85)' }}>{name}</span>
                            <span className="text-xs font-semibold" style={{ color: group.color1 }}>{level}%</span>
                          </div>
                          <div className="h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, rgba(212,175,55,0.4), ${group.color1})` }}
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${level}%` } : {}}
                              transition={{ duration: 1, delay: 0.3 + i * 0.15 + si * 0.04, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </Reveal3D>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(212,175,55,${isHovered ? 0.5 : 0.12}), transparent)` }} />
                </motion.div>
              </Reveal3D>
            );
          })}
        </div>

        {/* Tech tags */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'Git', 'Agile', 'LLM APIs', 'GitHub Copilot', 'Claude Code'].map((tag, i) => (
            <Reveal3D key={tag} direction="zoomIn" delay={0.4 + i * 0.04} duration={0.5}>
              <motion.span className="tech-tag" whileHover={{ scale: 1.1, y: -3 }}>{tag}</motion.span>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}
