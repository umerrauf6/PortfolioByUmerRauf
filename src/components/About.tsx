import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, Award, Globe } from 'lucide-react';
import { Reveal3D } from './Reveal3D';

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const timeline = [
  {
    year: '2024',
    title: 'M.Sc. Computer Science',
    org: 'University of Siegen',
    location: 'Siegen, Germany',
    period: 'Apr 2024 — Jul 2026 (Expected)',
    description: "Master's degree focusing on advanced software engineering, distributed systems, and AI/ML applications.",
    tags: ['Computer Science', 'AI/ML', 'Distributed Systems'],
    Icon: GraduationCap,
    color: '#D4AF37',
    borderColor: 'rgba(212,175,55,0.3)',
  },
  {
    year: '2023',
    title: 'Associate Software Engineer',
    org: 'Allied Consultants',
    location: 'Lahore, Pakistan',
    period: 'Apr 2023 — Jan 2024',
    description: 'Built full-stack B2B web applications using React, Node.js, and MongoDB. Code reviews, testing, and feature delivery end-to-end in an Agile team.',
    tags: ['React', 'Node.js', 'MongoDB', 'Agile'],
    Icon: Briefcase,
    color: '#F5D67B',
    borderColor: 'rgba(245,214,123,0.3)',
  },
  {
    year: '2018',
    title: 'B.Sc. Software Engineering',
    org: 'University of Gujrat',
    location: 'Gujrat, Pakistan',
    period: 'Sep 2018 — Nov 2022',
    description: "Bachelor's in Software Engineering covering design patterns, databases, algorithms, and full-stack development fundamentals.",
    tags: ['Software Engineering', 'Databases', 'Algorithms'],
    Icon: GraduationCap,
    color: '#B8960C',
    borderColor: 'rgba(184,150,12,0.3)',
  },
];

const certifications = [
  { title: 'Full-Stack Web Development (React & Node.js)', issuer: 'Udemy' },
  { title: 'TypeScript & Backend Development (NestJS)', issuer: 'Coursera' },
];

const languages = [
  { lang: 'English', level: 'C1 — Fluent', pct: 85 },
  { lang: 'German', level: 'A2 — Improving', pct: 25 },
];

const achievements = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Projects Built' },
  { value: 10, suffix: '+', label: 'Technologies' },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const c0 = useCounter(achievements[0].value, inView);
  const c1 = useCounter(achievements[1].value, inView);
  const c2 = useCounter(achievements[2].value, inView);
  const counts = [c0, c1, c2];

  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Subtle gold radial bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(212,175,55,0.04), transparent)' }} />

      <div className="section-inner" ref={ref} style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <Reveal3D direction="up" delay={0} className="mb-12">
          <p className="section-label">Background</p>
          <h2 className="section-title">
            Experience &amp; <span className="gradient-text">Education</span>
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'rgba(245,245,245,0.6)' }}>
            A journey from Pakistan to Germany — driven by curiosity, engineering discipline, and a passion for building exceptional software.
          </p>
        </Reveal3D>

        {/* Achievement counters */}
        <Reveal3D direction="up" delay={0.1} className="mb-12">
          <div className="grid grid-cols-3 gap-4">
            {achievements.map(({ suffix, label }, i) => (
              <div key={label} className="counter-card">
                <p className="font-display font-black text-4xl gradient-text">
                  {counts[i]}{suffix}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
              </div>
            ))}
          </div>
        </Reveal3D>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT — Timeline */}
          <Reveal3D direction="left" delay={0.15} className="lg:col-span-2">
            <div className="glass rounded-2xl p-7 gold-border">
              <h3 className="font-display font-bold text-base mb-7 flex items-center gap-2" style={{ color: '#F5D67B' }}>
                <span className="w-1.5 h-5 rounded-full" style={{ background: 'var(--gold-gradient)' }} />
                Timeline
              </h3>
              <div className="relative">
                {/* Animated gold progress line */}
                <div className="timeline-line" style={{ height: '100%', left: 24 }}>
                  <motion.div
                    className="timeline-line-fill"
                    initial={{ height: 0 }}
                    animate={inView ? { height: '100%' } : {}}
                    transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
                  />
                </div>

                <div className="space-y-8">
                  {timeline.map((item, i) => {
                    const Icon = item.Icon;
                    return (
                      <Reveal3D key={i} direction="flipX" delay={0.2 + i * 0.15}>
                        <div className="relative flex gap-5 pl-2">
                          {/* Year + dot */}
                          <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <span className="font-mono text-xs font-bold" style={{ color: item.color }}>
                              {item.year}
                            </span>
                            <div className="timeline-dot" style={{ background: item.color, boxShadow: `0 0 14px ${item.color}60` }} />
                          </div>

                          {/* Card */}
                          <motion.div
                            className="flex-1 rounded-xl p-5 shine-effect"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: `1px solid ${item.borderColor}`,
                            }}
                            whileHover={{ x: 5, scale: 1.01 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{ background: `${item.color}18`, color: item.color }}>
                                    <Icon size={14} />
                                  </div>
                                  <h4 className="font-display font-bold text-sm leading-tight" style={{ color: '#F5F5F5' }}>
                                    {item.title}
                                  </h4>
                                </div>
                                <p className="text-xs font-semibold" style={{ color: item.color }}>{item.org}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="flex items-center gap-1 text-xs justify-end" style={{ color: 'rgba(245,245,245,0.4)' }}>
                                  <Calendar size={10} /> {item.period}
                                </span>
                                <span className="flex items-center gap-1 text-xs justify-end mt-0.5" style={{ color: 'rgba(245,245,245,0.35)' }}>
                                  <MapPin size={10} /> {item.location}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(245,245,245,0.65)' }}>
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {item.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-0.5 rounded"
                                  style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </Reveal3D>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal3D>

          {/* RIGHT sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-5">

            {/* CSS Decorative Crystal (replaces Canvas) */}
            <Reveal3D direction="right" delay={0.2}>
              <div
                className="rounded-2xl overflow-hidden gold-border relative"
                style={{ height: 220, background: 'rgba(5,5,15,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              >
                {/* Animated gold orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="nebula-orb" style={{ width: 100, height: 100 }} />
                </div>
                {/* Orbiting ring 1 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="css-orbit-ring" style={{ width: 160, height: 160, animationDuration: '8s' }} />
                </div>
                {/* Orbiting ring 2 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="css-orbit-ring" style={{ width: 200, height: 200, animationDuration: '12s', animationDirection: 'reverse', borderColor: 'rgba(245,214,123,0.2)' }} />
                </div>
                {/* Inner glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div style={{
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(212,175,55,0.15), transparent 70%)',
                    filter: 'blur(20px)',
                    animation: 'nebulaPulse 3s ease-in-out infinite',
                  }} />
                </div>
              </div>
            </Reveal3D>

            {/* Certifications */}
            <Reveal3D direction="right" delay={0.3}>
              <div className="glass rounded-2xl p-5 gold-border">
                <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2" style={{ color: '#F5D67B' }}>
                  <Award size={14} style={{ color: '#D4AF37' }} /> Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.14)' }}>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black"
                        style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37' }}>{i + 1}</div>
                      <div>
                        <p className="text-sm font-medium leading-snug" style={{ color: '#F5F5F5' }}>{cert.title}</p>
                        <p className="text-xs mt-1" style={{ color: 'rgba(245,245,245,0.45)' }}>{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal3D>

            {/* Languages */}
            <Reveal3D direction="right" delay={0.4}>
              <div className="glass rounded-2xl p-5 gold-border">
                <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2" style={{ color: '#F5D67B' }}>
                  <Globe size={14} style={{ color: '#D4AF37' }} /> Languages
                </h3>
                <div className="space-y-4">
                  {languages.map(({ lang, level, pct }, i) => (
                    <div key={lang}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold" style={{ color: '#F5F5F5' }}>{lang}</span>
                        <span className="text-xs" style={{ color: 'rgba(245,245,245,0.5)' }}>{level}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #D4AF37, #F5D67B)' }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${pct}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.7 + i * 0.15, ease: 'easeOut' as const }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal3D>

          </div>
        </div>
      </div>
    </section>
  );
}
