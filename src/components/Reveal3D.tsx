import { useRef, type ReactNode } from 'react';
import { motion, useInView, type TargetAndTransition } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'flipX' | 'flipY' | 'zoomIn';

interface Reveal3DProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

const hiddenVariants: Record<Direction, TargetAndTransition> = {
  up:     { opacity: 0, y: 70,  rotateX:  22, scale: 0.92 },
  down:   { opacity: 0, y: -70, rotateX: -22, scale: 0.92 },
  left:   { opacity: 0, x: -80, rotateY:  35, scale: 0.92 },
  right:  { opacity: 0, x:  80, rotateY: -35, scale: 0.92 },
  flipX:  { opacity: 0, rotateX: -90, scale: 0.88 },
  flipY:  { opacity: 0, rotateY:  90, scale: 0.88 },
  zoomIn: { opacity: 0, scale: 0.6, rotateX: 15 },
};

const visibleVariant: TargetAndTransition = {
  opacity: 1, y: 0, x: 0, rotateX: 0, rotateY: 0, scale: 1,
};

export function Reveal3D({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.75,
  className,
  style,
  once = true,
}: Reveal3DProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={hiddenVariants[direction]}
      animate={inView ? visibleVariant : hiddenVariants[direction]}
      transition={{ duration, delay, type: 'spring', stiffness: 80, damping: 18 }}
      style={{ transformPerspective: 1200, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
