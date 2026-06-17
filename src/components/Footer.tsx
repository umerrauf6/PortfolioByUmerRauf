import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

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

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { href: 'https://github.com/umerrauf6',                Icon: GitHubIcon,  label: 'GitHub' },
    { href: 'https://linkedin.com/in/umer-rauf-953689176', Icon: LinkedInIcon, label: 'LinkedIn' },
    { href: 'mailto:umerrauf6@gmail.com',                  Icon: Mail,        label: 'Email' },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>

      {/* CSS gold ring particle decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Spinning outer ring */}
        <div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: 400,
            height: 400,
            border: '1px solid rgba(212,175,55,0.08)',
            transform: 'translate(-50%, -50%)',
            animation: 'footerRing 40s linear infinite',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: 280,
            height: 280,
            border: '1px solid rgba(212,175,55,0.06)',
            transform: 'translate(-50%, -50%)',
            animation: 'footerRing 28s linear infinite reverse',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: 160,
            height: 160,
            border: '1px solid rgba(212,175,55,0.05)',
            transform: 'translate(-50%, -50%)',
            animation: 'footerRing 18s linear infinite',
          }}
        />
        {/* Ambient gold glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04), transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      <div className="section-inner relative z-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-black text-xl gradient-text">Umer Rauf</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Full-Stack Developer · Siegen, Germany
            </span>
          </div>

          {/* Built with */}
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>Built with</span>
            <Heart size={11} className="text-yellow-500 fill-yellow-500" />
            <span>React · Three.js · Framer Motion</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {links.map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 gold-border"
                style={{ background: 'rgba(212,175,55,0.06)', color: 'rgba(212,175,55,0.7)' }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

        </div>

        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(212,175,55,0.06)' }}>
          <p className="text-xs" style={{ color: 'rgba(212,175,55,0.25)', fontFamily: 'var(--font-mono)' }}>
            © {year} Umer Rauf · All rights reserved · Siegen, Germany
          </p>
        </div>
      </div>
    </footer>
  );
}
