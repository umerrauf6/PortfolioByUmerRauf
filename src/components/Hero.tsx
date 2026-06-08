import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { ArrowDown, Phone, Mail, MapPin } from 'lucide-react';
import * as THREE from 'three';

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── 3D Scene components ─────────────────────────────────────────────── */
function GridFloor() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(80, 80, '#003050', '#001525');
    (g.material as THREE.LineBasicMaterial).transparent = true;
    (g.material as THREE.LineBasicMaterial).opacity = 0.5;
    return g;
  }, []);
  useFrame(({ clock }) => { grid.position.z = (clock.elapsedTime * 0.4) % 1; });
  return <primitive object={grid} position={[0, -4, -5]} />;
}

function CentralCore() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const glow  = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outer.current) { outer.current.rotation.y = t * 0.25; outer.current.rotation.x = t * 0.12; }
    if (inner.current) { inner.current.rotation.y = -t * 0.4;  inner.current.rotation.z = t * 0.18; }
    if (glow.current)  { glow.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.04); }
  });
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial color="#020820" emissive="#00d4ff" emissiveIntensity={0.7} roughness={0.05} metalness={0.95} transparent opacity={0.9} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.022} />
      </mesh>
    </group>
  );
}

function OrbitingRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (r1.current) { r1.current.rotation.z = t * 0.5; }
    if (r2.current) { r2.current.rotation.x = t * 0.35; r2.current.rotation.z = t * 0.15; }
    if (r3.current) { r3.current.rotation.y = t * 0.4;  r3.current.rotation.x = Math.PI / 3 + t * 0.1; }
  });
  return (
    <group>
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.9, 0.013, 16, 120]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.5} /></mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0, 0]}><torusGeometry args={[3.5, 0.01, 16, 120]} /><meshBasicMaterial color="#a855f7" transparent opacity={0.4} /></mesh>
      <mesh ref={r3} rotation={[0, Math.PI / 4, 0]}><torusGeometry args={[4.1, 0.007, 16, 120]} /><meshBasicMaterial color="#e879f9" transparent opacity={0.28} /></mesh>
    </group>
  );
}

function FloatingCrystals() {
  const data = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    angle: (i / 10) * Math.PI * 2, radius: 4 + (i % 3) * 1.2,
    y: (((i * 7) % 5) - 2.5) * 0.8, speed: 0.18 + (i % 5) * 0.06,
    size: 0.08 + (i % 4) * 0.05, color: ['#00d4ff','#a855f7','#e879f9','#00ff88'][i % 4],
  })), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      mesh.position.x = Math.cos(t * d.speed + d.angle) * d.radius;
      mesh.position.z = Math.sin(t * d.speed + d.angle) * d.radius;
      mesh.position.y = d.y + Math.sin(t * 0.6 + i) * 0.4;
      mesh.rotation.y = t * d.speed * 3;
    });
  });
  return (
    <group>
      {data.map((d, i) => (
        <mesh key={i} ref={el => { refs.current[i] = el; }}>
          <octahedronGeometry args={[d.size, 0]} />
          <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={1.5} roughness={0.05} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i*3] = (Math.random()-.5)*35; positions[i*3+1] = (Math.random()-.5)*25; positions[i*3+2] = (Math.random()-.5)*35;
      const t = Math.random();
      if (t < 0.5)      { colors[i*3]=0; colors[i*3+1]=0.83; colors[i*3+2]=1; }
      else if (t < 0.8) { colors[i*3]=0.66; colors[i*3+1]=0.33; colors[i*3+2]=0.97; }
      else               { colors[i*3]=0.91; colors[i*3+1]=0.47; colors[i*3+2]=0.98; }
    }
    return { positions, colors };
  }, []);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.015; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1, 9], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0,  5,  5]} intensity={4}   color="#00d4ff" />
          <pointLight position={[5, -3, -5]} intensity={2}   color="#a855f7" />
          <pointLight position={[-5, 2, -3]} intensity={1.5} color="#e879f9" />
          <Stars radius={120} depth={60} count={3500} factor={3} saturation={0} fade speed={0.3} />
          <GridFloor />
          <CentralCore />
          <OrbitingRings />
          <FloatingCrystals />
          <ParticleField />
        </Canvas>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07), transparent 70%)', filter: 'blur(40px)' }} />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center section-inner flex flex-col items-center">
        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } }}
          className="flex flex-col items-center gap-6"
        >
          {/* Status badge — monospace decoration */}
          <motion.div variants={{ hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase"
              style={{ fontFamily:'var(--font-mono)', background:'rgba(0,212,255,0.08)', border:'1px solid rgba(0,212,255,0.25)', color:'#5dd5f0', borderRadius: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name — large, bold, readable */}
          <motion.div variants={{ hidden: { opacity:0, y:30 }, visible: { opacity:1, y:0, transition:{ duration:0.8 } } }}>
            <h1 className="font-display font-black leading-none tracking-tight"
              style={{ fontSize:'clamp(60px, 11vw, 114px)', letterSpacing:'-0.03em' }}>
              <span className="gradient-text">Umer</span>
              <br />
              <span style={{ color: '#f0f6ff' }}>Rauf</span>
            </h1>
          </motion.div>

          {/* Role — clear, readable Inter */}
          <motion.div variants={{ hidden: { opacity:0, y:16 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}>
            <p className="font-display text-xl md:text-2xl font-semibold" style={{ color: 'rgba(220,235,255,0.85)' }}>
              Full-Stack Developer &amp; CS Graduate Student
            </p>
            <p className="mt-1 text-sm flex items-center justify-center gap-1.5" style={{ color: 'rgba(160,195,220,0.6)' }}>
              <MapPin size={13} /> University of Siegen, Germany
            </p>
          </motion.div>

          {/* Description — fully readable body text */}
          <motion.p
            variants={{ hidden: { opacity:0 }, visible: { opacity:1, transition:{ duration:0.8 } } }}
            className="max-w-xl text-base leading-relaxed"
            style={{ color: 'rgba(200,225,245,0.7)' }}
          >
            Crafting high-performance web applications and LLM integrations with React, Next.js, TypeScript, Node.js and NestJS. Passionate about clean code, great UX, and pushing the boundaries of what the web can do.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact"  className="btn-secondary">Get in Touch</a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={{ hidden: { opacity:0 }, visible: { opacity:1, transition:{ duration:0.6 } } }}
            className="flex gap-3"
          >
            {[
              { href: 'https://github.com/umerrauf6',                    Icon: GitHubIcon,   label: 'GitHub' },
              { href: 'https://linkedin.com/in/umer-rauf-953689176',     Icon: LinkedInIcon, label: 'LinkedIn' },
              { href: 'mailto:umerrauf6@gmail.com',                      Icon: Mail,         label: 'Email' },
              { href: 'tel:+4917259145400',                              Icon: Phone,        label: 'Phone' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-11 h-11 flex items-center justify-center bracket-corners transition-all duration-300"
                style={{ background:'rgba(0,212,255,0.06)', border:'1px solid rgba(0,212,255,0.2)', color:'rgba(160,215,235,0.8)' }}
                whileHover={{ scale:1.1, y:-3 }}
                whileTap={{ scale:0.95 }}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.5, duration:1 }}
      >
        <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(0,212,255,0.4)', letterSpacing:'0.4em' }}>SCROLL</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.5 }}>
          <ArrowDown size={14} style={{ color:'rgba(0,212,255,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
