import { useRef, useMemo, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Reveal3D } from './Reveal3D';
import * as THREE from 'three';

function SkillGem({ color, hovered }: { color: string; hovered: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outer.current) { outer.current.rotation.y = t * (hovered ? 0.9 : 0.35); outer.current.rotation.x = t * (hovered ? 0.4 : 0.15); }
    if (inner.current) { inner.current.rotation.y = -t * 0.6; inner.current.rotation.z = t * 0.3; }
  });
  const threeColor = useMemo(() => new THREE.Color(color), [color]);
  return (
    <group scale={hovered ? 1.12 : 1}>
      <mesh ref={outer}><icosahedronGeometry args={[1.3, 1]} /><meshBasicMaterial color={threeColor} wireframe transparent opacity={hovered ? 0.6 : 0.35} /></mesh>
      <mesh ref={inner}><icosahedronGeometry args={[0.7, 0]} /><meshStandardMaterial color="#020820" emissive={threeColor} emissiveIntensity={hovered ? 1.2 : 0.6} roughness={0.05} metalness={0.95} /></mesh>
      <mesh><sphereGeometry args={[1.7, 16, 16]} /><meshBasicMaterial color={threeColor} transparent opacity={hovered ? 0.06 : 0.02} /></mesh>
    </group>
  );
}

const skillGroups = [
  { category:'FRONTEND', color:'#00d4ff', accentRgb:'0,212,255', skills:[{name:'React',level:95},{name:'Next.js',level:90},{name:'TypeScript',level:90},{name:'JavaScript',level:95},{name:'Tailwind CSS',level:88},{name:'HTML5 / CSS3',level:95}] },
  { category:'BACKEND',  color:'#a855f7', accentRgb:'168,85,247', skills:[{name:'Node.js',level:88},{name:'NestJS',level:82},{name:'REST APIs',level:92},{name:'MongoDB',level:85},{name:'Express',level:85},{name:'PostgreSQL',level:70}] },
  { category:'AI & TOOLS', color:'#e879f9', accentRgb:'232,121,249', skills:[{name:'LLM APIs',level:85},{name:'GitHub Copilot',level:90},{name:'Claude Code',level:85},{name:'Git / GitHub',level:92},{name:'Agile / Scrum',level:88},{name:'CI/CD',level:72}] },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  // 3D flip directions per card
  const flipDirs = ['left', 'up', 'right'] as const;

  return (
    <section id="skills" className="section" style={{ background:'linear-gradient(180deg,transparent,rgba(0,212,255,0.02) 50%,transparent)' }}>
      <div className="section-inner" ref={ref}>

        {/* Header — zoom from 3D depth */}
        <Reveal3D direction="zoomIn" delay={0} className="mb-10">
          <p className="section-label">What I Work With</p>
          <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
          <p className="text-sm max-w-lg" style={{ color:'rgba(160,195,220,0.65)' }}>
            Full-stack toolkit refined through B2B projects and academic research.
          </p>
        </Reveal3D>

        {/* Cards — each flips in from a different direction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => {
            const isHovered = hovered === i;
            return (
              <Reveal3D key={group.category} direction={flipDirs[i]} delay={0.1 + i * 0.15} duration={0.85}>
                <motion.div
                  className="shine-effect bracket-corners bracket-corners-inner relative h-full"
                  style={{
                    background:'rgba(4,10,30,0.85)',
                    border:`1px solid rgba(${group.accentRgb},0.2)`,
                    backdropFilter:'blur(20px)',
                    clipPath:'polygon(0 12px,12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px))',
                    boxShadow: isHovered ? `0 0 40px rgba(${group.accentRgb},0.15),inset 0 0 20px rgba(${group.accentRgb},0.05)` : 'none',
                    transition:'box-shadow 0.3s',
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y:-8, rotateX:4, scale:1.02 }}
                  transition={{ duration:0.3, type:'spring', stiffness:200, damping:20 }}
                >
                  {/* 3D gem canvas */}
                  <div className="relative h-36">
                    <Canvas camera={{ position:[0,0,4.5], fov:50 }}>
                      <ambientLight intensity={0.3} />
                      <pointLight position={[3,3,3]} intensity={4} color={group.color} />
                      <pointLight position={[-3,-2,2]} intensity={2} color={group.color} />
                      <SkillGem color={group.color} hovered={isHovered} />
                    </Canvas>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-display font-black text-xl tracking-widest" style={{ color:group.color, textShadow:`0 0 20px ${group.color}` }}>{group.category}</span>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${group.color}40,transparent)` }} />
                  </div>

                  {/* Skill bars */}
                  <div className="p-5 pt-2 space-y-2.5">
                    {group.skills.map(({ name, level }, si) => (
                      <Reveal3D key={name} direction="up" delay={0.2 + i * 0.15 + si * 0.05} duration={0.5}>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm" style={{ color:'rgba(220,235,255,0.85)' }}>{name}</span>
                            <span className="text-xs font-semibold" style={{ color:group.color }}>{level}%</span>
                          </div>
                          <div className="h-px rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
                            <motion.div className="h-full rounded-full"
                              style={{ background:`linear-gradient(90deg,rgba(${group.accentRgb},0.5),${group.color})` }}
                              initial={{ width:0 }} animate={inView ? { width:`${level}%` } : {}}
                              transition={{ duration:1, delay:0.3 + i * 0.15 + si * 0.05, ease:'easeOut' as const }} />
                          </div>
                        </div>
                      </Reveal3D>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${group.color}30,transparent)` }} />
                </motion.div>
              </Reveal3D>
            );
          })}
        </div>

        {/* Tech tags — staggered zoom-in */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {['React','Next.js','TypeScript','JavaScript','Node.js','NestJS','MongoDB','REST APIs','Tailwind CSS','Git','Agile','LLM APIs','GitHub Copilot','Claude Code'].map((tag, i) => (
            <Reveal3D key={tag} direction="zoomIn" delay={0.4 + i * 0.04} duration={0.5}>
              <motion.span className="tech-tag" whileHover={{ scale:1.1, y:-3, rotateZ:1 }}>{tag}</motion.span>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}
