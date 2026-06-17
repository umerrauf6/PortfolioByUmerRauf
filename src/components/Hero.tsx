import { useRef, useMemo, Suspense, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

/* ─── Mouse-reactive Camera ─── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current[0] * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current[1] * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Morphing Central Sphere ─── */
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 4);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const count = pos.count;
    for (let i = 0; i < count; i++) {
      const ix = pos.getX(i);
      const iy = pos.getY(i);
      const iz = pos.getZ(i);
      const r = Math.sqrt(ix * ix + iy * iy + iz * iz);
      const nx = ix / r, ny = iy / r, nz = iz / r;
      const wave = Math.sin(t * 1.1 + ix * 0.9 + iy * 0.7) * 0.18
                 + Math.sin(t * 0.7 + iz * 1.1) * 0.12;
      const d = 2.2 + wave;
      pos.setXYZ(i, nx * d, ny * d, nz * d);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    if (meshRef.current) { meshRef.current.rotation.y = t * 0.15; meshRef.current.rotation.x = t * 0.06; }
    if (wireRef.current) { wireRef.current.rotation.y = -t * 0.12; wireRef.current.rotation.z = t * 0.05; }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#1a0f00"
          emissive="#D4AF37"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh ref={wireRef} geometry={geometry}>
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.18} />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.2} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ─── DNA Double Helix ─── */
function DNAHelix() {
  const group = useRef<THREE.Group>(null);
  const { points1, points2, connections } = useMemo(() => {
    const N = 60;
    const p1: [number, number, number][] = [];
    const p2: [number, number, number][] = [];
    const conns: number[] = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 6 - Math.PI * 3;
      const y = (i / N) * 20 - 10;
      const r = 3.5;
      p1.push([Math.cos(t) * r, y, Math.sin(t) * r]);
      p2.push([Math.cos(t + Math.PI) * r, y, Math.sin(t + Math.PI) * r]);
      if (i % 4 === 0) conns.push(i);
    }
    return { points1: p1, points2: p2, connections: conns };
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.08;
  });

  const strand1Geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points1.map(p => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 200, 0.04, 8, false);
  }, [points1]);

  const strand2Geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points2.map(p => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 200, 0.04, 8, false);
  }, [points2]);

  return (
    <group ref={group} position={[6, 0, -4]}>
      <mesh geometry={strand1Geo}>
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh geometry={strand2Geo}>
        <meshStandardMaterial color="#F5D67B" emissive="#F5D67B" emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
      {connections.map((i) => {
        const p1 = new THREE.Vector3(...points1[i]);
        const p2 = new THREE.Vector3(...points2[i]);
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        const len = p1.distanceTo(p2);
        const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return (
          <mesh key={i} position={[mid.x, mid.y, mid.z]} quaternion={quat}>
            <cylinderGeometry args={[0.02, 0.02, len, 6]} />
            <meshStandardMaterial color="#B8960C" emissive="#B8960C" emissiveIntensity={0.4} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Orbiting Rings ─── */
function OrbitingRings() {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const g3 = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (g1.current) { g1.current.rotation.z = t * 0.3; g1.current.rotation.x = t * 0.1; }
    if (g2.current) { g2.current.rotation.x = t * 0.22; g2.current.rotation.z = -t * 0.14; }
    if (g3.current) { g3.current.rotation.y = t * 0.18; g3.current.rotation.x = Math.PI / 4 + t * 0.07; }
  });
  return (
    <group>
      <group ref={g1}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4.2, 0.02, 16, 200]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.7} metalness={0.9} roughness={0.1} transparent opacity={0.8} />
        </mesh>
      </group>
      <group ref={g2}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[5.5, 0.015, 16, 200]} />
          <meshStandardMaterial color="#F5D67B" emissive="#F5D67B" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} transparent opacity={0.5} />
        </mesh>
      </group>
      <group ref={g3}>
        <mesh>
          <torusGeometry args={[6.8, 0.01, 16, 200]} />
          <meshBasicMaterial color="#B8960C" transparent opacity={0.25} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Interactive Floating Particles ─── */
function Particles({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const ref = useRef<THREE.Points>(null);
  const N = 4000;
  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const velocities = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 8 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3]     = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      const g = Math.random();
      if (g < 0.6) { colors[i*3]=0.83; colors[i*3+1]=0.69; colors[i*3+2]=0.22; }
      else         { colors[i*3]=0.96; colors[i*3+1]=0.84; colors[i*3+2]=0.48; }
    }
    return { positions, velocities, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const t = clock.elapsedTime;
    const mx = mouse.current[0] * 0.5;
    const my = mouse.current[1] * 0.5;
    for (let i = 0; i < N; i++) {
      arr[i*3]     += velocities[i*3]     + Math.sin(t * 0.3 + i) * 0.0008;
      arr[i*3 + 1] += velocities[i*3 + 1] + Math.cos(t * 0.2 + i * 0.7) * 0.0008;
      arr[i*3 + 2] += velocities[i*3 + 2];
      // Pull slightly toward mouse
      arr[i*3]     += (mx - arr[i*3])     * 0.0003;
      arr[i*3 + 1] += (my - arr[i*3+1])   * 0.0003;
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = t * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ─── Constellation Lines ─── */
function ConstellationLines() {
  const ref = useRef<THREE.LineSegments>(null);
  const { positions, indices } = useMemo(() => {
    const N = 30;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12 - 4,
      ));
    }
    const segs: number[] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (pts[i].distanceTo(pts[j]) < 7) {
          segs.push(i, j);
        }
      }
    }
    const positions = new Float32Array(N * 3);
    pts.forEach((p, i) => { positions[i*3] = p.x; positions[i*3+1] = p.y; positions[i*3+2] = p.z; });
    return { positions, indices: new Uint16Array(segs) };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setIndex(new THREE.BufferAttribute(indices, 1));
    return g;
  }, [positions, indices]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.015;
  });

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#D4AF37" transparent opacity={0.12} />
    </lineSegments>
  );
}

/* ─── Floating Orbs ─── */
function FloatingOrbs() {
  const orbs = useRef<(THREE.Mesh | null)[]>([]);
  const data = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    pos: [
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6 - 3,
    ] as [number, number, number],
    speed: 0.3 + Math.random() * 0.5,
    offset: Math.random() * Math.PI * 2,
    size: 0.15 + Math.random() * 0.25,
    color: i % 2 === 0 ? '#D4AF37' : '#F5D67B',
  })), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    orbs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.y = data[i].pos[1] + Math.sin(t * data[i].speed + data[i].offset) * 0.6;
      mesh.position.x = data[i].pos[0] + Math.cos(t * data[i].speed * 0.6 + data[i].offset) * 0.3;
    });
  });

  return (
    <group>
      {data.map((d, i) => (
        <mesh key={i} ref={el => { orbs.current[i] = el; }} position={d.pos}>
          <sphereGeometry args={[d.size, 16, 16]} />
          <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

const techOrbit = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AI / LLM'];

export default function Hero() {
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const mouse   = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0B0B0D' }}>

      {/* Full-screen 3D Canvas */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 12], fov: 55 }} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={['#0B0B0D']} />
          <ambientLight intensity={0.15} />
          <pointLight position={[0,  6,  6]}  intensity={8}  color="#D4AF37" />
          <pointLight position={[8, -4, -6]}  intensity={4}  color="#F5D67B" />
          <pointLight position={[-8, 3, -4]}  intensity={3}  color="#B8960C" />
          <pointLight position={[0,  0,  0]}  intensity={2}  color="#D4AF37" distance={10} />
          <Suspense fallback={null}>
            <CameraRig mouse={mouse} />
            <MorphingSphere />
            <OrbitingRings />
            <DNAHelix />
            <Particles mouse={mouse} />
            <ConstellationLines />
            <FloatingOrbs />
          </Suspense>
        </Canvas>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.07), transparent 70%)', filter: 'blur(60px)', zIndex: 2 }} />

      {/* Content */}
      <motion.div style={{ y, opacity, zIndex: 10 }} className="relative text-center flex flex-col items-center pt-20 pb-8 px-5">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
          className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={{ hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase"
              style={{ fontFamily:'var(--font-mono)', background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.3)', color:'#F5D67B', borderRadius: 4 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={{ hidden: { opacity:0, y:30 }, visible: { opacity:1, y:0, transition:{ duration:0.8 } } }}>
            <h1 className="font-display font-black leading-none tracking-tight"
              style={{ fontSize:'clamp(52px, 14vw, 115px)', letterSpacing:'-0.03em' }}>
              <span className="gradient-text">Umer</span>
              <br />
              <span style={{ color: '#F5F5F5' }}>Rauf</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div variants={{ hidden: { opacity:0, y:16 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}>
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#F5D67B', letterSpacing: '-0.01em' }}>
              Full-Stack Developer
            </p>
            <p className="mt-2 text-sm sm:text-base" style={{ color: 'rgba(245,245,245,0.55)', fontFamily:'var(--font-mono)', letterSpacing:'0.05em' }}>
              React · TypeScript · Node.js · AI
            </p>
            <p className="mt-1 text-xs sm:text-sm flex items-center justify-center gap-1.5" style={{ color: 'rgba(212,175,55,0.55)' }}>
              <MapPin size={12} /> University of Siegen, Germany
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
          >
            <a href="#projects" className="btn-primary justify-center">View Projects</a>
            <a href="#contact"  className="btn-secondary justify-center">Hire Me</a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={{ hidden: { opacity:0 }, visible: { opacity:1, transition:{ duration:0.6 } } }}
            className="flex gap-2 sm:gap-3"
          >
            {[
              { href: 'https://github.com/umerrauf6',                Icon: GitHubIcon,   label: 'GitHub' },
              { href: 'https://linkedin.com/in/umer-rauf-953689176', Icon: LinkedInIcon, label: 'LinkedIn' },
              { href: 'mailto:umerrauf6@gmail.com',                  Icon: Mail,         label: 'Email' },
              { href: 'tel:+4917259145400',                          Icon: Phone,        label: 'Phone' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg transition-all duration-300 gold-border"
                style={{ background:'rgba(212,175,55,0.06)', color:'rgba(212,175,55,0.8)' }}
                whileHover={{ scale:1.1, y:-3 }} whileTap={{ scale:0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating tech orbit badges */}
        <motion.div
          className="absolute hidden lg:flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ right: '-180px', top: '50%', transform: 'translateY(-50%)', width: 280, height: 280 }}
        >
          {techOrbit.map((label, i) => {
            const angle = (i / techOrbit.length) * 360;
            const rad = (angle * Math.PI) / 180;
            const r = 120;
            return (
              <motion.div
                key={label}
                className="absolute"
                style={{ left: '50%', top: '50%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18 + i * 3, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: Math.cos(rad) * r - 40,
                    top:  Math.sin(rad) * r - 14,
                    transform: `rotate(-${angle}deg)`,
                  }}
                >
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.25)', color:'#F5D67B', whiteSpace:'nowrap' }}
                  >{label}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.5, duration:1 }}
      >
        <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'rgba(212,175,55,0.4)', letterSpacing:'0.4em' }}>SCROLL</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.5 }}>
          <ArrowDown size={14} style={{ color:'rgba(212,175,55,0.4)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
