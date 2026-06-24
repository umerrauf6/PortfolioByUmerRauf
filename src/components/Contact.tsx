import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

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

const contactLinks = [
  { id: 'github-link',   Icon: GitHubIcon,  label: 'GitHub',   value: 'github.com/umerrauf6',                href: 'https://github.com/umerrauf6' },
  { id: 'linkedin-link', Icon: LinkedInIcon, label: 'LinkedIn', value: 'linkedin.com/in/umer-rauf-953689176', href: 'https://linkedin.com/in/umer-rauf-953689176' },
  { id: 'email-link',    Icon: Mail,         label: 'Email',    value: 'umerrauf6@gmail.com',                 href: 'mailto:umerrauf6@gmail.com' },
  { id: 'phone-link',    Icon: Phone,        label: 'Phone',    value: '+49 172 591 4540',                    href: 'tel:+4917259145400' },
  { id: 'location-info', Icon: MapPin,       label: 'Location', value: 'Siegen, Germany 🇩🇪',                href: 'https://maps.google.com/?q=Siegen,Germany' },
];

export default function Contact() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
    const body    = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:umerrauf6@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* CSS gold ring decoration (replaces Canvas GoldRings) */}
      <div className="absolute right-0 top-0 bottom-0 w-96 pointer-events-none overflow-hidden" style={{ zIndex: 0, opacity: 0.35 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Core orb */}
          <div className="nebula-orb" style={{ width: 60, height: 60 }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="css-orbit-ring" style={{ width: 160, height: 160, animationDuration: '7s' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="css-orbit-ring" style={{ width: 230, height: 230, animationDuration: '11s', animationDirection: 'reverse', borderColor: 'rgba(245,214,123,0.15)' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="css-orbit-ring" style={{ width: 300, height: 300, animationDuration: '16s', borderColor: 'rgba(184,150,12,0.1)' }} />
        </div>
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(212,175,55,0.12), transparent 70%)',
            filter: 'blur(30px)',
            animation: 'nebulaPulse 4s ease-in-out infinite',
          }} />
        </div>
      </div>

      <div className="section-inner" ref={ref} style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="section-label justify-center">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--text-muted)' }}>
            Whether you have a project in mind, want to discuss opportunities, or just want to say hello — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden gold-border"
          >
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06), transparent)', filter: 'blur(50px)' }} />
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: '#F5D67B' }}>Contact Info</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Feel free to reach out through any of these channels.</p>

              <div className="flex flex-col gap-3">
                {contactLinks.map(({ id, Icon, label, value, href }, i) => (
                  <motion.a
                    key={id} id={id} href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                    style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.12)', color: '#F5D67B' }}
                    whileHover={{ x: 5, scale: 1.01 } as any}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                      style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                    >
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                      <p className="text-sm font-medium truncate" style={{ color: '#F5F5F5' }}>{value}</p>
                    </div>
                    <ExternalLink size={13} className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                  </motion.a>
                ))}
              </div>

              {/* Available indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-5 flex items-center gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-sm font-medium" style={{ color: '#D4AF37' }}>Available for new opportunities</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-2xl p-8 flex flex-col relative overflow-hidden gold-border"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.05), transparent)', filter: 'blur(40px)' }} />
            <div className="relative z-10 flex flex-col flex-1">
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: '#F5D67B' }}>Send a Message</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Fill in the form — it will open your email client ready to send.</p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form" onSubmit={handleSubmit}
                    initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col flex-1 gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-widest mb-2"
                          style={{ color: 'var(--text-muted)' }}>Name</label>
                        <input id="contact-name" type="text" required placeholder="Your name"
                          className="gold-input" value={formData.name}
                          onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-widest mb-2"
                          style={{ color: 'var(--text-muted)' }}>Email</label>
                        <input id="contact-email" type="email" required placeholder="you@example.com"
                          className="gold-input" value={formData.email}
                          onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: 'var(--text-muted)' }}>Subject</label>
                      <input id="contact-subject" type="text" placeholder="What's this about?"
                        className="gold-input" value={formData.subject}
                        onChange={e => setFormData(d => ({ ...d, subject: e.target.value }))} />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-widest mb-2"
                        style={{ color: 'var(--text-muted)' }}>Message</label>
                      <textarea id="contact-message" required rows={5}
                        placeholder="Tell me about your project or opportunity..."
                        className="gold-input flex-1" value={formData.message}
                        onChange={e => setFormData(d => ({ ...d, message: e.target.value }))} />
                    </div>
                    <motion.button id="submit-contact-form" type="submit"
                      className="btn-primary w-full justify-center"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                      <Send size={15} /> Send via Email Client
                    </motion.button>
                    <p className="text-center text-xs" style={{ color: 'rgba(212,175,55,0.35)' }}>
                      Opens your email app with message pre-filled.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center flex-1 gap-5 text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}>
                      <CheckCircle2 size={60} style={{ color: '#D4AF37' }} />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-2" style={{ color: '#F5D67B' }}>Email Client Opened!</h3>
                      <p className="text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
                        Your email app should be open. Just hit send!
                      </p>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                      className="btn-secondary text-sm py-2 px-6">
                      Write Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
