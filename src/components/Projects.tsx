import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { ExternalLink } from 'lucide-react';

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function MockupScreen({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <Float speed={hovered ? 3 : 1.5} rotationIntensity={hovered ? 0.8 : 0.2} floatIntensity={hovered ? 1 : 0.4}>
      <group scale={hovered ? 1.05 : 1}>
        {/* Screen body */}
        <RoundedBox args={[3.2, 2, 0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        {/* Screen face */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.9, 1.7]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.4 : 0.15} roughness={0.1} />
        </mesh>
        {/* Camera dot */}
        <mesh position={[0, 1.08, 0.06]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#333" />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -1.1, 0]}>
          <boxGeometry args={[0.6, 0.15, 0.1]} />
          <meshStandardMaterial color="#222" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, -1.3, 0]}>
          <boxGeometry args={[1.4, 0.08, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

const projects = [
  {
    id: 'llm-chat',
    title: 'AI Chat Platform',
    subtitle: 'LLM API Integration',
    description: 'A full-stack AI chat assistant with real-time streaming completions, document parsing, and multi-model support using OpenAI and Anthropic APIs.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'LLM APIs', 'MongoDB', 'TailwindCSS'],
    color: '#1a3a4a',
    accentColor: '#63b3ed',
    status: 'Production',
    github: 'https://github.com/umerrauf6',
    live: '#',
  },
  {
    id: 'b2b-platform',
    title: 'B2B SaaS Dashboard',
    subtitle: 'Full-Stack Web Application',
    description: 'Highly responsive dashboard built for B2B clients featuring complex data visualizations, role-based access control, and real-time analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Agile'],
    color: '#1a1a3a',
    accentColor: '#b794f4',
    status: 'Client Project',
    github: 'https://github.com/umerrauf6',
    live: '#',
  },
  {
    id: 'nestjs-api',
    title: 'RESTful API Backend',
    subtitle: 'NestJS & TypeScript',
    description: 'Scalable NestJS backend with TypeScript, JWT authentication, MongoDB integration, input validation, and comprehensive API documentation.',
    tech: ['NestJS', 'TypeScript', 'MongoDB', 'JWT', 'REST APIs'],
    color: '#2a1a1a',
    accentColor: '#f687b3',
    status: 'Open Source',
    github: 'https://github.com/umerrauf6',
    live: '#',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="projects" className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(183,148,244,0.03) 50%, transparent)' }}>
      <div className="section-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/40 max-w-lg text-base">
            Real-world applications built with modern full-stack technologies and production-grade engineering practices.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => {
            const isHovered = hovered === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`glass rounded-3xl border overflow-hidden shine-effect glow-border group`}
                style={{ borderColor: isHovered ? `${project.accentColor}33` : 'rgba(255,255,255,0.07)' }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* 3D mockup canvas */}
                  <div className="lg:w-2/5 h-56 lg:h-72 relative overflow-hidden flex-shrink-0"
                    style={{ background: `radial-gradient(ellipse at center, ${project.color}CC, #0a0a0a)` }}
                  >
                    <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
                      <ambientLight intensity={0.4} />
                      <pointLight position={[3, 3, 3]} intensity={3} color={project.accentColor} />
                      <pointLight position={[-3, -2, 2]} intensity={1.5} color={project.accentColor} />
                      <MockupScreen color={project.accentColor} hovered={isHovered} />
                    </Canvas>

                    {/* Status badge overlay */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold glass border"
                        style={{ color: project.accentColor, borderColor: `${project.accentColor}33` }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <p className="text-xs font-semibold tracking-widest uppercase mb-2"
                        style={{ color: project.accentColor }}>
                        {project.subtitle}
                      </p>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-white/90 leading-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-white/50 text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
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
            );
          })}
        </div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/umerrauf6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg> View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
