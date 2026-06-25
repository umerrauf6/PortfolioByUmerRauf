import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useAnimation, type Variants } from 'framer-motion';
import { ArrowDown, Phone, Mail, MapPin } from 'lucide-react';
import { useGalaxyStore } from '../store/useGalaxyStore';

/* ─── Animated Hero Name ─── */
function AnimatedHeroName() {
  const controls = useAnimation();
  const setAppLoaded = useGalaxyStore(s => s.setAppLoaded);
  
  useEffect(() => {
    async function sequence() {
      // 1. Drop letters one by one
      await controls.start("visible");
      // 2. Pause slightly
      await new Promise(r => setTimeout(r, 400));
      // 3. Fill letters
      await controls.start("filled");
      // 4. Trigger app load
      setAppLoaded(true);
    }
    sequence();
  }, [controls, setAppLoaded]);

  const name1 = "Umer".split('');
  const name2 = "Rauf".split('');

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    },
    filled: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const letter = {
    hidden: { 
      opacity: 0, 
      y: -60, 
      color: 'transparent', 
      WebkitTextStroke: '1.5px #D4AF37'
    },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, damping: 12, stiffness: 100 }
    },
    filled: {
      color: '#F5D67B',
      WebkitTextStroke: '0px #D4AF37',
      transition: { duration: 0.4 }
    }
  } as unknown as Variants;

  return (
    <motion.h1 
      className="font-display font-black leading-none tracking-tight flex flex-col items-center"
      style={{ fontSize:'clamp(52px, 14vw, 115px)', letterSpacing:'-0.03em' }}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      <div className="flex">
        {name1.map((char, i) => <motion.span key={i} variants={letter}>{char}</motion.span>)}
      </div>
      <div className="flex" style={{ marginTop: '-0.2em' }}>
        {name2.map((char, i) => <motion.span key={i} variants={letter}>{char}</motion.span>)}
      </div>
    </motion.h1>
  );
}

/* ─── Typewriter Effect ─── */
const ROLES = [
  'Full-Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'TypeScript Enthusiast',
  'AI Integration Dev',
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = ROLES[roleIndex];
  const displayed = currentRole.slice(0, charIndex);

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (charIndex < currentRole.length) {
        setCharIndex((c) => c + 1);
      } else {
        // Pause at end, then start deleting
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex((r) => (r + 1) % ROLES.length);
      }
    }
  }, [charIndex, isDeleting, currentRole]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-[3px] ml-1 rounded-sm"
        style={{
          height: '1em',
          verticalAlign: 'text-bottom',
          background: 'linear-gradient(180deg, #D4AF37, #F5D67B)',
          animation: 'cursorBlink 0.8s step-end infinite',
        }}
      />
    </span>
  );
}

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

const techOrbit = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AI / LLM'];

export default function Hero() {
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const appLoaded = useGalaxyStore(s => s.appLoaded);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Ambient glow — visible on top of the galaxy */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.07), transparent 70%)', filter: 'blur(60px)', zIndex: 2 }} />

      {/* Content */}
      <motion.div style={{ y, opacity, zIndex: 10 }} className="relative text-center flex flex-col items-center pt-20 pb-8 px-5">
        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full max-w-2xl">
          <AnimatedHeroName />

          <motion.div
            initial="hidden"
            animate={appLoaded ? "visible" : "hidden"}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
            className="flex flex-col items-center gap-5 sm:gap-6 w-full"
          >
            {/* Badge */}
            <motion.div variants={{ hidden: { opacity:0, y:20 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs tracking-widest uppercase"
                style={{ fontFamily:'var(--font-mono)', background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.3)', color:'#F5D67B', borderRadius: 4 }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

          {/* Role */}
          <motion.div variants={{ hidden: { opacity:0, y:16 }, visible: { opacity:1, y:0, transition:{ duration:0.6 } } }}>
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#F5D67B', letterSpacing: '-0.01em', minHeight: '1.4em' }}>
              <TypewriterRole />
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
        </div>
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
