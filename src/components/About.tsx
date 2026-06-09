import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, Award, Globe } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── 3D background: floating DNA helix ──────────────────────────────── */
function HelixBg() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.18;
      group.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.12;
    }
  });

  const points = Array.from({ length: 28 }, (_, i) => {
    const t = (i / 27) * Math.PI * 4;
    const r = 1.0;
    return {
      a: new THREE.Vector3(Math.cos(t) * r, (i / 27) * 5 - 2.5, Math.sin(t) * r),
      b: new THREE.Vector3(Math.cos(t + Math.PI) * r, (i / 27) * 5 - 2.5, Math.sin(t + Math.PI) * r),
      color: i % 2 === 0 ? '#00d4ff' : '#a855f7',
    };
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <group key={i}>
          {/* Strand A node */}
          <mesh position={p.a.toArray()}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={1.2} />
          </mesh>
          {/* Strand B node */}
          <mesh position={p.b.toArray()}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#e879f9' : '#00ff88'} emissive={i % 2 === 0 ? '#e879f9' : '#00ff88'} emissiveIntensity={1.2} />
          </mesh>
          {/* Rung connecting A to B */}
          {i % 3 === 0 && (
            <mesh position={[0, (i / 27) * 5 - 2.5, 0]}>
              <cylinderGeometry args={[0.015, 0.015, p.a.distanceTo(p.b), 6]} />
              <meshBasicMaterial color="rgba(255,255,255,0.15)" transparent opacity={0.3} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

const timeline = [
  {
    title: 'Associate Software Engineer',
    org: 'Allied Consultants',
    location: 'Lahore, Pakistan',
    period: 'Apr 2023 — Jan 2024',
    description: 'Built and maintained full-stack web applications for B2B clients using React, Node.js, and MongoDB in an Agile team. Participated in code reviews, testing, and feature delivery end-to-end.',
    tags: ['React', 'Node.js', 'MongoDB', 'Agile'],
    Icon: Briefcase,
    color: '#00d4ff',
    borderColor: 'rgba(0,212,255,0.3)',
  },
  {
    title: 'M.Sc. Computer Science',
    org: 'University of Siegen',
    location: 'Siegen, Germany',
    period: 'Apr 2024 — Jul 2026 (Expected)',
    description: "Master's degree in Computer Science focusing on advanced software engineering, distributed systems, and AI/ML applications.",
    tags: ['Computer Science', 'AI/ML', 'Distributed Systems'],
    Icon: GraduationCap,
    color: '#a855f7',
    borderColor: 'rgba(168,85,247,0.3)',
  },
  {
    title: 'B.Sc. Software Engineering',
    org: 'University of Gujrat',
    location: 'Gujrat, Pakistan',
    period: 'Sep 2018 — Nov 2022',
    description: "Bachelor's degree in Software Engineering covering design patterns, databases, algorithms, and full-stack development fundamentals.",
    tags: ['Software Engineering', 'Databases', 'Algorithms'],
    Icon: GraduationCap,
    color: '#e879f9',
    borderColor: 'rgba(232,121,249,0.3)',
  },
];

const certifications = [
  { title: 'Full-Stack Web Development (React & Node.js)', issuer: 'Udemy' },
  { title: 'TypeScript & Backend Development (NestJS)',    issuer: 'Coursera' },
];

const languages = [
  { lang: 'English', level: 'C1 — Fluent',    pct: 85 },
  { lang: 'German',  level: 'A2 — Improving', pct: 25 },
];

const quickFacts = [
  { icon: '📍', text: 'Siegen, Germany' },
  { icon: '🎓', text: 'Expected Jul 2026' },
  { icon: '💼', text: '1+ year industry experience' },
  { icon: '🌐', text: 'umer-rauf-portfolio.netlify.app' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* 3D background helix (absolutely positioned, behind content) */}
      <div className="absolute right-0 top-0 bottom-0 w-72 opacity-25 pointer-events-none" style={{ zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 3, 3]} intensity={3} color="#00d4ff" />
          <pointLight position={[-2, -2, 2]} intensity={2} color="#a855f7" />
          <HelixBg />
        </Canvas>
      </div>

      <div className="section-inner" ref={ref} style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }} className="mb-10">
          <p className="section-label">Background</p>
          <h2 className="section-title">Experience &amp; <span className="gradient-text">Education</span></h2>
          <p className="text-base max-w-xl" style={{ color:'rgba(200,225,245,0.65)' }}>
            A journey from Pakistan to Germany — driven by curiosity, engineering discipline, and a passion for building exceptional software.
          </p>
        </motion.div>

        {/* 3-col grid: timeline 2/3, sidebar 1/3, equal height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* LEFT — Timeline */}
          <motion.div
            initial={{ opacity:0, x:-24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.1 }}
            className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col holo-border"
          >
            <h3 className="font-display font-bold text-base mb-5 flex items-center gap-2" style={{ color:'rgba(240,246,255,0.85)' }}>
              <span className="w-1.5 h-4 rounded-full" style={{ background:'linear-gradient(#00d4ff,#a855f7)' }} />
              Timeline
            </h3>

            <div className="relative flex-1">
              <div className="absolute top-0 bottom-0 w-px" style={{ left:19, background:'linear-gradient(to bottom,rgba(0,212,255,0.4),rgba(168,85,247,0.3),rgba(232,121,249,0.1))' }} />
              <div className="space-y-5">
                {timeline.map((item, i) => {
                  const Icon = item.Icon;
                  return (
                    <motion.div key={i} initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.5, delay:0.2 + i * 0.12 }} className="relative flex gap-4">
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background:`${item.color}18`, border:`1px solid ${item.borderColor}`, color:item.color }}>
                        <Icon size={16} />
                      </div>
                      <motion.div className="flex-1 rounded-xl p-4 shine-effect"
                        style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}
                        whileHover={{ x:3, borderColor: item.borderColor }} transition={{ duration:0.2 }}>
                        <div className="flex flex-wrap items-start justify-between gap-1 mb-2">
                          <div>
                            <h4 className="font-display font-bold text-sm leading-tight" style={{ color:'rgba(240,246,255,0.95)' }}>{item.title}</h4>
                            <p className="text-xs font-semibold mt-0.5" style={{ color:item.color }}>{item.org}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="flex items-center gap-1 text-xs justify-end" style={{ color:'rgba(200,225,245,0.5)' }}><Calendar size={10} /> {item.period}</span>
                            <span className="flex items-center gap-1 text-xs justify-end mt-0.5" style={{ color:'rgba(200,225,245,0.4)' }}><MapPin size={10} /> {item.location}</span>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color:'rgba(200,225,245,0.7)' }}>{item.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background:`${item.color}15`, color:item.color, border:`1px solid ${item.color}30` }}>{tag}</span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-4">

            <motion.div initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.2 }}
              className="glass rounded-2xl p-5 flex-1 holo-border">
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2" style={{ color:'rgba(240,246,255,0.85)' }}>
                <Award size={14} style={{ color:'#a855f7' }} /> Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.div key={i} initial={{ opacity:0, y:8 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.4, delay:0.3 + i * 0.08 }}
                    className="flex gap-3 p-3 rounded-xl" style={{ background:'rgba(168,85,247,0.06)', border:'1px solid rgba(168,85,247,0.14)' }}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background:'rgba(168,85,247,0.2)', color:'#a855f7' }}>{i+1}</div>
                    <div>
                      <p className="text-sm font-medium leading-snug" style={{ color:'rgba(240,246,255,0.85)' }}>{cert.title}</p>
                      <p className="text-xs mt-1" style={{ color:'rgba(200,225,245,0.5)' }}>{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.3 }}
              className="glass rounded-2xl p-5 flex-1 holo-border">
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2" style={{ color:'rgba(240,246,255,0.85)' }}>
                <Globe size={14} style={{ color:'#00d4ff' }} /> Languages
              </h3>
              <div className="space-y-4">
                {languages.map(({ lang, level, pct }, i) => (
                  <div key={lang}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold" style={{ color:'rgba(240,246,255,0.9)' }}>{lang}</span>
                      <span className="text-xs" style={{ color:'rgba(200,225,245,0.6)' }}>{level}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.07)' }}>
                      <motion.div className="h-full rounded-full" style={{ background:'linear-gradient(90deg,#00d4ff,#a855f7)' }}
                        initial={{ width:0 }} animate={inView ? { width:`${pct}%` } : {}}
                        transition={{ duration:1, delay:0.5 + i * 0.1, ease:'easeOut' as const }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.4 }}
              className="glass rounded-2xl p-5 flex-1 holo-border">
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2" style={{ color:'rgba(240,246,255,0.85)' }}>
                <span className="w-1.5 h-4 rounded-full" style={{ background:'linear-gradient(#00d4ff,#e879f9)' }} /> Quick Facts
              </h3>
              <div className="space-y-2">
                {quickFacts.map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 p-2.5 rounded-lg text-sm"
                    style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', color:'rgba(200,225,245,0.75)' }}>
                    <span className="flex-shrink-0">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
