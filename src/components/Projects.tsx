import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Reveal3D } from './Reveal3D';

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/* ── CSS Laptop Mockup ─── */
function LaptopMockup({
  accentColor,
  hovered,
  screenContent,
}: {
  accentColor: string;
  hovered: boolean;
  screenContent: React.ReactNode;
}) {
  return (
    <div
      className="w-full max-w-sm mx-auto transition-all duration-500"
      style={{ transform: hovered ? 'perspective(1000px) rotateX(-6deg) translateY(-6px)' : 'perspective(1000px) rotateX(-2deg)' }}
    >
      {/* Screen */}
      <div className="laptop-screen" style={{ paddingTop: '62%', border: `1.5px solid ${accentColor}30` }}>
        {/* Camera notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700" />
        {/* Screen content */}
        <div className="absolute inset-0 top-6 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #111, #0a0a0a)' }}>
          {screenContent}
          {/* Reflection sweep */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)',
              transform: hovered ? 'translateX(200%)' : 'translateX(-200%)',
              transition: 'transform 0.8s ease',
            }}
          />
        </div>
      </div>
      {/* Base */}
      <div className="laptop-base" />
      {/* Stand */}
      <div className="laptop-stand" />
    </div>
  );
}

const projects = [
  {
    id: 'llm-chat',
    title: 'AI Chat Platform',
    subtitle: 'LLM API Integration',
    description: 'Full-stack AI chat assistant with real-time streaming completions, document parsing, and multi-model support using OpenAI and Anthropic APIs.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'LLM APIs', 'MongoDB'],
    accentColor: '#D4AF37',
    status: 'Production',
    github: 'https://github.com/umerrauf6',
    live: '#',
    screenEmoji: '🤖',
    screenLabel: 'AI Chat Platform',
  },
  {
    id: 'b2b-platform',
    title: 'B2B SaaS Dashboard',
    subtitle: 'Full-Stack Web Application',
    description: 'Highly responsive dashboard built for B2B clients featuring complex data visualizations, role-based access control, and real-time analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Agile'],
    accentColor: '#F5D67B',
    status: 'Client Project',
    github: 'https://github.com/umerrauf6',
    live: '#',
    screenEmoji: '📊',
    screenLabel: 'SaaS Dashboard',
  },
  {
    id: 'nestjs-api',
    title: 'RESTful API Backend',
    subtitle: 'NestJS & TypeScript',
    description: 'Scalable NestJS backend with TypeScript, JWT authentication, MongoDB integration, input validation, and comprehensive API documentation.',
    tech: ['NestJS', 'TypeScript', 'MongoDB', 'JWT', 'REST APIs'],
    accentColor: '#B8960C',
    status: 'Open Source',
    github: 'https://github.com/umerrauf6',
    live: '#',
    screenEmoji: '⚡',
    screenLabel: 'REST API',
  },
];

export default function Projects() {
  const ref     = useRef(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="projects" className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.02) 50%, transparent)' }}>
      <div className="section-inner" ref={ref}>

        <Reveal3D direction="zoomIn" delay={0} className="mb-12">
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-lg text-base" style={{ color: 'var(--text-muted)' }}>
            Real-world applications built with modern full-stack technologies and production-grade engineering practices.
          </p>
        </Reveal3D>

        <div className="space-y-8">
          {projects.map((project, i) => {
            const isHovered = hovered === project.id;
            return (
              <Reveal3D
                key={project.id}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 0.18}
                duration={0.9}
              >
                <motion.div
                  className="project-card shine-effect group"
                  style={{ borderColor: isHovered ? `${project.accentColor}40` : 'rgba(212,175,55,0.12)' }}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35, type: 'spring', stiffness: 180, damping: 22 }}
                >
                  <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                    {/* Laptop mockup panel */}
                    <div
                      className="lg:w-2/5 relative overflow-hidden flex-shrink-0 flex items-center justify-center p-8"
                      style={{
                        background: `radial-gradient(ellipse at center, rgba(${project.accentColor === '#D4AF37' ? '212,175,55' : project.accentColor === '#F5D67B' ? '245,214,123' : '184,150,12'},0.08), transparent 70%), #0d0d0f`,
                        minHeight: 260,
                      }}
                    >
                      {/* Status badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: `rgba(${project.accentColor === '#D4AF37' ? '212,175,55' : project.accentColor === '#F5D67B' ? '245,214,123' : '184,150,12'},0.12)`,
                            border: `1px solid ${project.accentColor}40`,
                            color: project.accentColor,
                          }}>
                          {project.status}
                        </span>
                      </div>
                      <LaptopMockup
                        accentColor={project.accentColor}
                        hovered={isHovered}
                        screenContent={
                          <div className="flex flex-col items-center justify-center gap-2 text-center">
                            <span style={{ fontSize: 32 }}>{project.screenEmoji}</span>
                            <span className="text-xs font-semibold" style={{ color: project.accentColor, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                              {project.screenLabel}
                            </span>
                            {/* Fake UI lines */}
                            <div className="flex flex-col gap-1 mt-1 w-24">
                              {[100, 80, 60].map((w, i) => (
                                <div key={i} className="h-1 rounded-full"
                                  style={{ width: `${w}%`, background: `rgba(${project.accentColor === '#D4AF37' ? '212,175,55' : project.accentColor === '#F5D67B' ? '245,214,123' : '184,150,12'},0.3)` }} />
                              ))}
                            </div>
                          </div>
                        }
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 flex flex-col justify-center">
                      <div className="mb-5">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: project.accentColor }}>
                          {project.subtitle}
                        </p>
                        <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-3" style={{ color: '#F5F5F5' }}>
                          {project.title}
                        </h3>
                        <p className="text-base leading-relaxed" style={{ color: 'rgba(245,245,245,0.6)' }}>
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                      <div className="flex gap-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary py-2.5 px-5 text-sm"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <GitHubIcon size={15} /> Code
                        </motion.a>
                        {project.live !== '#' && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary py-2.5 px-5 text-sm"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <ExternalLink size={15} /> Live Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal3D>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal3D direction="up" delay={0.3} className="text-center mt-12">
          <a href="https://github.com/umerrauf6" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
            <GitHubIcon size={17} />
            View All Projects on GitHub
          </a>
        </Reveal3D>
      </div>
    </section>
  );
}
