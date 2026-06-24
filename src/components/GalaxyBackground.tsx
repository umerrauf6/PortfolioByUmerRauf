import { useRef, useMemo, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGalaxyStore, type SectionId } from '../store/useGalaxyStore';

/* ═══════════════════════════════════════════════════════════════════
   Camera Waypoints — position + lookAt target for each section
   ═══════════════════════════════════════════════════════════════════ */
const WAYPOINTS: Record<SectionId, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  hero:     { pos: [0, 2, 30],      lookAt: [0, 0, 0] },
  about:    { pos: [40, 10, 15],    lookAt: [45, 8, 0] },
  skills:   { pos: [-30, -5, 20],   lookAt: [-35, -8, 5] },
  projects: { pos: [20, -20, 25],   lookAt: [25, -22, 10] },
  contact:  { pos: [-15, 15, 10],   lookAt: [-20, 18, -5] },
};

/* ═══════════════════════════════════════════════════════════════════
   Custom Starfield Shaders
   ═══════════════════════════════════════════════════════════════════ */
const starVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWarpFactor;
  uniform vec3  uCameraVelocity;

  attribute float aSize;
  attribute float aPhase;
  attribute vec3  aColor;

  varying vec3  vColor;
  varying float vAlpha;
  varying float vDist;

  void main() {
    vColor = aColor;

    // Subtle drift animation
    vec3 pos = position;
    pos.x += sin(uTime * 0.08 + aPhase * 6.28) * 0.3;
    pos.y += cos(uTime * 0.06 + aPhase * 4.17) * 0.25;
    pos.z += sin(uTime * 0.05 + aPhase * 3.14) * 0.2;

    // Warp stretch — elongate stars along camera velocity during transitions
    float warpStretch = uWarpFactor * 2.0;
    vec3 velocityDir = length(uCameraVelocity) > 0.001 ? normalize(uCameraVelocity) : vec3(0.0, 0.0, 1.0);
    float alignment = dot(normalize(pos - cameraPosition), velocityDir);
    pos += velocityDir * alignment * warpStretch * 3.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mvPosition.z;
    vDist = dist;

    // Size attenuation + warp scaling
    float baseSize = aSize * (200.0 / dist);
    float warpSize = 1.0 + uWarpFactor * abs(alignment) * 4.0;
    gl_PointSize = baseSize * warpSize;

    // Fade out very distant stars
    vAlpha = smoothstep(300.0, 100.0, dist) * smoothstep(0.5, 3.0, dist);
    // Brighten during warp
    vAlpha *= 1.0 + uWarpFactor * 0.5;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;
  varying float vDist;

  void main() {
    // Soft radial gradient glow
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    glow = pow(glow, 1.8);

    // Core brightness
    float core = 1.0 - smoothstep(0.0, 0.12, d);

    vec3 color = vColor * (glow + core * 0.6);
    float alpha = glow * vAlpha * 0.85;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   Starfield — single BufferGeometry with 18k particles
   ═══════════════════════════════════════════════════════════════════ */
function Starfield({ warpRef }: { warpRef: React.MutableRefObject<{ factor: number; velocity: THREE.Vector3 }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const N = 18000;

  const { positions, sizes, phases, colors } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const phases = new Float32Array(N);
    const colors = new Float32Array(N * 3);

    // Gold palette
    const palette = [
      new THREE.Color('#D4AF37'),
      new THREE.Color('#F5D67B'),
      new THREE.Color('#B8960C'),
      new THREE.Color('#E8C840'),
      new THREE.Color('#FFE4A0'),
      new THREE.Color('#C8A020'),
    ];

    for (let i = 0; i < N; i++) {
      // Galaxy disc distribution + spherical halo
      const isHalo = Math.random() < 0.25;

      if (isHalo) {
        // Spherical halo — sparse, distant
        const r = 40 + Math.random() * 160;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      } else {
        // Flattened galaxy disc with spiral arms
        const arm = Math.floor(Math.random() * 4);
        const armAngle = (arm / 4) * Math.PI * 2;
        const r = 3 + Math.pow(Math.random(), 0.6) * 150;
        const spiralAngle = armAngle + r * 0.03 + (Math.random() - 0.5) * 0.8;
        const heightSpread = (1 - r / 200) * 15 + 2;

        positions[i * 3]     = Math.cos(spiralAngle) * r + (Math.random() - 0.5) * 8;
        positions[i * 3 + 1] = (Math.random() - 0.5) * heightSpread;
        positions[i * 3 + 2] = Math.sin(spiralAngle) * r + (Math.random() - 0.5) * 8;
      }

      sizes[i] = 1.5 + Math.random() * 4.0;
      phases[i] = Math.random();

      const c = palette[Math.floor(Math.random() * palette.length)];
      // Slight brightness variation
      const brightness = 0.6 + Math.random() * 0.4;
      colors[i * 3]     = c.r * brightness;
      colors[i * 3 + 1] = c.g * brightness;
      colors[i * 3 + 2] = c.b * brightness;
    }

    return { positions, sizes, phases, colors };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWarpFactor: { value: 0 },
    uCameraVelocity: { value: new THREE.Vector3() },
  }), []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uWarpFactor.value = warpRef.current.factor;
    mat.uniforms.uCameraVelocity.value.copy(warpRef.current.velocity);
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Star Cluster — decorative nebula at each section waypoint
   ═══════════════════════════════════════════════════════════════════ */
function StarCluster({
  position,
  color,
  count = 600,
  spread = 12,
}: {
  position: [number, number, number];
  color: string;
  count?: number;
  spread?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const baseColor = useMemo(() => new THREE.Color(color), [color]);

  const { positions: clusterPositions, clusterSizes, clusterColors, clusterPhases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const clusterSizes = new Float32Array(count);
    const clusterColors = new Float32Array(count * 3);
    const clusterPhases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Gaussian-like distribution around cluster center
      const r = Math.pow(Math.random(), 0.5) * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // Flattened
      positions[i * 3 + 2] = r * Math.cos(phi);

      clusterSizes[i] = 2 + Math.random() * 5;
      clusterPhases[i] = Math.random();

      const brightness = 0.5 + Math.random() * 0.5;
      clusterColors[i * 3]     = baseColor.r * brightness;
      clusterColors[i * 3 + 1] = baseColor.g * brightness;
      clusterColors[i * 3 + 2] = baseColor.b * brightness;
    }

    return { positions, clusterSizes, clusterColors, clusterPhases };
  }, [count, spread, baseColor]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWarpFactor: { value: 0 },
    uCameraVelocity: { value: new THREE.Vector3() },
  }), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref} position={position} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[clusterPositions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[clusterSizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[clusterPhases, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[clusterColors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Ambient Nebula — large billboard planes with gold radial gradients
   ═══════════════════════════════════════════════════════════════════ */
function AmbientNebula() {
  const groupRef = useRef<THREE.Group>(null);

  const nebulae = useMemo(() => [
    { pos: [0, 0, -20] as [number, number, number], scale: 60, color: '#D4AF37', opacity: 0.03 },
    { pos: [45, 8, -10] as [number, number, number], scale: 40, color: '#F5D67B', opacity: 0.025 },
    { pos: [-35, -8, -5] as [number, number, number], scale: 45, color: '#B8960C', opacity: 0.02 },
    { pos: [25, -22, 0] as [number, number, number], scale: 50, color: '#D4AF37', opacity: 0.025 },
    { pos: [-20, 18, -15] as [number, number, number], scale: 35, color: '#F5D67B', opacity: 0.03 },
  ], []);

  const textures = useMemo(() => {
    return nebulae.map((n) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      const c = new THREE.Color(n.color);
      grad.addColorStop(0, `rgba(${Math.floor(c.r * 255)},${Math.floor(c.g * 255)},${Math.floor(c.b * 255)},0.6)`);
      grad.addColorStop(0.4, `rgba(${Math.floor(c.r * 255)},${Math.floor(c.g * 255)},${Math.floor(c.b * 255)},0.2)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    });
  }, [nebulae]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * 0.1 + i * 1.5) * 0.003;
    });
  });

  return (
    <group ref={groupRef}>
      {nebulae.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <planeGeometry args={[n.scale, n.scale]} />
          <meshBasicMaterial
            map={textures[i]}
            transparent
            opacity={n.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GalaxyCamera — GSAP-animated camera controller
   ═══════════════════════════════════════════════════════════════════ */
function GalaxyCamera({
  warpRef,
  mouseRef,
}: {
  warpRef: React.MutableRefObject<{ factor: number; velocity: THREE.Vector3 }>;
  mouseRef: React.MutableRefObject<[number, number]>;
}) {
  const { camera } = useThree();
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const tweenRef = useRef<gsap.core.Tween[]>([]);
  const currentSection = useGalaxyStore((s) => s.currentSection);
  const setTransitioning = useGalaxyStore((s) => s.setTransitioning);

  // Animate camera when section changes
  useEffect(() => {
    const wp = WAYPOINTS[currentSection];
    if (!wp) return;

    // Kill previous tweens
    tweenRef.current.forEach((t) => t.kill());
    tweenRef.current = [];

    setTransitioning(true);

    // Animate warp factor up and back down
    const warpObj = warpRef.current;
    const warpUp = gsap.to(warpObj, {
      factor: 1,
      duration: 0.6,
      ease: 'power2.in',
    });
    const warpDown = gsap.to(warpObj, {
      factor: 0,
      duration: 0.8,
      delay: 1.0,
      ease: 'power2.out',
    });

    // Calculate velocity direction for warp stretch
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(...wp.pos);
    warpObj.velocity.copy(endPos).sub(startPos).normalize();

    // Animate camera position
    const posTween = gsap.to(camera.position, {
      x: wp.pos[0],
      y: wp.pos[1],
      z: wp.pos[2],
      duration: 1.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setTransitioning(false);
      },
    });

    // Animate lookAt target
    const lookTween = gsap.to(lookAtTarget.current, {
      x: wp.lookAt[0],
      y: wp.lookAt[1],
      z: wp.lookAt[2],
      duration: 1.8,
      ease: 'power2.inOut',
    });

    tweenRef.current = [warpUp, warpDown, posTween, lookTween];

    return () => {
      tweenRef.current.forEach((t) => t.kill());
    };
  }, [currentSection, camera, setTransitioning, warpRef]);

  // Apply lookAt + mouse parallax each frame
  useFrame(() => {
    // Mouse parallax (very subtle)
    const mx = mouseRef.current[0] * 0.3;
    const my = mouseRef.current[1] * 0.2;

    const target = lookAtTarget.current.clone();
    target.x += mx;
    target.y += my;

    camera.lookAt(target);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════════════
   GalaxyBackground — The root component, renders the fixed Canvas
   ═══════════════════════════════════════════════════════════════════ */
export default function GalaxyBackground() {
  const mouseRef = useRef<[number, number]>([0, 0]);
  const warpRef = useRef({ factor: 0, velocity: new THREE.Vector3(0, 0, 1) });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = [
      (e.clientX / window.innerWidth - 0.5) * 2,
      -(e.clientY / window.innerHeight - 0.5) * 2,
    ];
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      id="galaxy-background"
      style={{
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 30], fov: 55, near: 0.1, far: 500 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'auto' }}
      >
        <color attach="background" args={['#05050f']} />

        <Suspense fallback={null}>
          {/* Starfield */}
          <Starfield warpRef={warpRef} />

          {/* Section clusters */}
          <StarCluster position={[0, 0, 0]}       color="#D4AF37" count={800}  spread={15} />
          <StarCluster position={[45, 8, 0]}      color="#F5D67B" count={600}  spread={12} />
          <StarCluster position={[-35, -8, 5]}    color="#B8960C" count={700}  spread={10} />
          <StarCluster position={[25, -22, 10]}   color="#E8C840" count={650}  spread={14} />
          <StarCluster position={[-20, 18, -5]}   color="#D4AF37" count={500}  spread={10} />

          {/* Nebula fog */}
          <AmbientNebula />

          {/* Camera controller */}
          <GalaxyCamera warpRef={warpRef} mouseRef={mouseRef} />
        </Suspense>

        {/* Subtle ambient lighting for any meshes */}
        <ambientLight intensity={0.05} />
      </Canvas>
    </div>
  );
}
