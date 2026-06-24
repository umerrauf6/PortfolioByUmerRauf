import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { useGalaxyStore, type SectionId } from '../store/useGalaxyStore';

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}


const navLinks = [
  { href: '#hero',     label: 'Home',     num: '01' },
  { href: '#about',    label: 'About',    num: '02' },
  { href: '#skills',   label: 'Skills',   num: '03' },
  { href: '#projects', label: 'Projects', num: '04' },
  { href: '#contact',  label: 'Contact',  num: '05' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Read active section from galaxy store (synced by IntersectionObserver + camera)
  const activeSection = useGalaxyStore((s) => s.currentSection);
  const setSection    = useGalaxyStore((s) => s.setSection);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  /** Navigate to a section — set the store (triggers galaxy camera) + scroll */
  const handleNavClick = (sectionId: string) => {
    setSection(sectionId as SectionId);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(5,5,15,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.12)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between" style={{ height: 68 }}>

          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={() => handleNavClick('hero')}
            className="font-display font-black text-xl tracking-tight gradient-text relative z-10"
            whileHover={{ scale: 1.05 }}
          >
            UR<span style={{ color: 'rgba(212,175,55,0.4)' }}>.</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const id = href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={href} href={href}
                  onClick={() => handleNavClick(id)}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-200 group"
                  style={{ color: isActive ? '#F5D67B' : 'rgba(245,245,245,0.5)' }}
                >
                  <span className="relative z-10">{label}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #D4AF37, #F5D67B)', width: isActive ? '60%' : '0%' }} />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #D4AF37, #F5D67B)', width: '40%' }} />
                </a>
              );
            })}
          </nav>

          {/* Desktop Socials + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {[
              { href: 'https://github.com/umerrauf6', label: 'GitHub', Icon: GitHubIcon },
              { href: 'https://linkedin.com/in/umer-rauf-953689176', label: 'LinkedIn', Icon: LinkedInIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 gold-border"
                style={{ background: 'rgba(212,175,55,0.06)', color: 'rgba(212,175,55,0.7)' }}
                aria-label={label}>
                <Icon size={15} />
              </a>
            ))}
            <a href="mailto:umerrauf6@gmail.com" className="btn-primary py-2 px-5 text-sm">
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            id="mobile-menu-toggle"
            className="md:hidden relative z-[60] w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5"
            style={{
              background: mobileOpen ? 'rgba(212,175,55,0.12)' : 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.25)',
              color: 'rgba(212,175,55,0.9)',
            }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.92 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] md:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={closeMenu}
            />

            {/* Sidebar panel — slides from top-right corner */}
            <motion.div
              key="sidebar"
              initial={{ opacity: 0, x: '100%', scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: '100%', scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 z-[58] md:hidden flex flex-col"
              style={{
                width: 'min(85vw, 340px)',
                height: '100dvh',
                background: 'rgba(5,5,15,0.97)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderLeft: '1px solid rgba(212,175,55,0.18)',
                boxShadow: '-20px 0 80px rgba(0,0,0,0.6), -2px 0 0 rgba(212,175,55,0.1)',
              }}
            >
              {/* Corner gold accent */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top right, rgba(212,175,55,0.15), transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at bottom left, rgba(212,175,55,0.07), transparent 70%)' }} />

              {/* Header row */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4"
                style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                <span className="font-display font-black text-xl gradient-text">
                  UR<span style={{ color: 'rgba(212,175,55,0.35)' }}>.</span>
                </span>
                <motion.button
                  onClick={closeMenu}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: 'rgba(212,175,55,0.8)' }}
                  whileTap={{ scale: 0.9 }}>
                  <X size={16} />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col flex-1 px-5 py-6 gap-1 overflow-y-auto">
                {navLinks.map(({ href, label, num }, i) => {
                  const id = href.replace('#', '');
                  const isActive = activeSection === id;
                  return (
                    <motion.a
                      key={href} href={href}
                      onClick={() => { handleNavClick(id); closeMenu(); }}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.07, type: 'spring', stiffness: 300, damping: 30 }}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl relative group overflow-hidden"
                      style={{
                        background: isActive ? 'rgba(212,175,55,0.1)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(212,175,55,0.3)' : 'transparent'}`,
                        transition: 'all 0.2s',
                      }}
                      whileHover={{ x: 6 } as any}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Number */}
                      <span className="font-mono text-xs tabular-nums flex-shrink-0"
                        style={{ color: 'rgba(212,175,55,0.45)', fontFamily: 'var(--font-mono)' }}>
                        {num}
                      </span>
                      {/* Label */}
                      <span className="font-display font-bold text-lg"
                        style={{ color: isActive ? '#F5D67B' : 'rgba(245,245,245,0.8)' }}>
                        {label}
                      </span>
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full"
                          style={{ background: '#D4AF37', boxShadow: '0 0 8px #D4AF37' }}
                        />
                      )}
                      {/* Hover sweep */}
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(212,175,55,0.04)', borderRadius: 12 }} />
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom section */}
              <div className="px-5 pb-8 pt-4" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                {/* Social row */}
                <div className="flex gap-3 mb-4">
                  {[
                    { href: 'https://github.com/umerrauf6', label: 'GitHub', Icon: GitHubIcon },
                    { href: 'https://linkedin.com/in/umer-rauf-953689176', label: 'LinkedIn', Icon: LinkedInIcon },
                    { href: 'mailto:umerrauf6@gmail.com', label: 'Email', Icon: Mail },
                  ].map(({ href, label, Icon }, i) => (
                    <motion.a
                      key={label} href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      className="flex-1 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)', color: 'rgba(212,175,55,0.8)' }}
                      whileTap={{ scale: 0.93 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
                {/* CTA */}
                <motion.a
                  href="mailto:umerrauf6@gmail.com"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="btn-primary w-full justify-center text-sm py-3"
                  onClick={closeMenu}
                  whileTap={{ scale: 0.97 }}
                >
                  Hire Me
                </motion.a>
                {/* Mono label */}
                <p className="text-center mt-4 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(212,175,55,0.3)', letterSpacing: '0.15em' }}>
                  UMER RAUF · PORTFOLIO
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
