import { useRef, useState, Suspense, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Reveal3D } from './Reveal3D';
import * as THREE from 'three';

/* ─── Per-category 3D icon ─── */
function SkillGem({ hovered, color1, color2 }: { hovered: boolean; color1: string; color2: string }) {
  const outer  = useRef<THREE.Mesh>(null);
  const inner  = useRef<THREE.Mesh>(null);
  const ring   = useRef<THREE.Mesh>(null);
  const ring2  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const spd = hovered ? 1.8 : 0.8;
    if (outer.current)  { outer.current.rotation.y = t * spd * 0.3; outer.current.rotation.x = t * spd * 0.15; }
    if (inner.current)  { inner.current.rotation.y = -t * spd * 0.5; inner.current.rotation.z = t * spd * 0.2; }
    if (ring.current)   { ring.current.rotation.z = t * spd * 0.4; }
    if (ring2.current)  { ring2.current.rotation.x = t * spd * 0.35; ring2.current.rotation.z = -t * spd * 0.2; }
  });

  const scale = hovered ? 1.15 : 1;

  return (
    <group scale={[scale, scale, scale]}>
      {/* Outer wireframe */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color={color1} wireframe transparent opacity={hovered ? 0.55 : 0.28} />
      </mesh>
      {/* Metallic core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#0f0800"
          emissive={color1}
          emissiveIntensity={hovered ? 1.6 : 0.9}
          roughness={0.05}
          metalness={0.98}
        />
      </mesh>
      {/* Ring 1 */}
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.018, 16, 100]} />
        <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={0.6} metalness={0.9} roughness={0.1} transparent opacity={0.75} />
      </mesh>
      {/* Ring 2 */}
      <mesh ref={ring2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.3, 0.01, 16, 100]} />
        <meshBasicMaterial color={color2} transparent opacity={0.35} />
      </mesh>
      {/* Ambient inner glow */}
      <pointLight position={[0, 0, 0]} intensity={hovered ? 3.5 : 1.5} color={color1} distance={8} />
    </group>
  );
}

/* ─── Floating particles per card ─── */
function CardParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, phases } = useMemo(() => {
    const N = 60;
    const positions = new Float32Array(N * 3);
    const phases = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i*3]   = (Math.random() - 0.5) * 7;
      positions[i*3+1] = (Math.random() - 0.5) * 5;
      positions[i*3+2] = (Math.random() - 0.5) * 3;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < 60; i++) {
      arr[i*3+1] = positions[i*3+1] + Math.sin(t * 0.6 + phases[i]) * 0.4;
    }
    pos.needsUpdate = true;
  });

  const c = new THREE.Color(color);
  const cols = useMemo(() => {
    const a = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) { a[i*3]=c.r; a[i*3+1]=c.g; a[i*3+2]=c.b; }
    return a;
  }, [color]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[cols, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

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

        {/* Skill cards with real 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => {
            const isHovered = hovered === i;
            return (
              <Reveal3D key={group.category} direction={dirs[i]} delay={0.1 + i * 0.15} duration={0.85}>
                <motion.div
                  className="shine-effect relative flex flex-col"
                  style={{
                    background: 'rgba(21,21,24,0.9)',
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

                  {/* 3D canvas */}
                  <div style={{ height: 150, position: 'relative' }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
                      <ambientLight intensity={0.1} />
                      <pointLight position={[3, 3, 3]}   intensity={6} color={group.color1} />
                      <pointLight position={[-3, -2, 2]} intensity={3} color={group.color2} />
                      <Suspense fallback={null}>
                        <CardParticles color={group.color1} />
                        <SkillGem hovered={isHovered} color1={group.color1} color2={group.color2} />
                      </Suspense>
                    </Canvas>
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
