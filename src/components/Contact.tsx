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
  {
    id: 'github-link',
    Icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/umerrauf6',
    href: 'https://github.com/umerrauf6',
    accentColor: 'rgba(255,255,255,0.8)',
    borderColor: 'rgba(255,255,255,0.1)',
    hoverBorderColor: 'rgba(255,255,255,0.3)',
  },
  {
    id: 'linkedin-link',
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/umer-rauf-953689176',
    href: 'https://linkedin.com/in/umer-rauf-953689176',
    accentColor: '#63b3ed',
    borderColor: 'rgba(99,179,237,0.15)',
    hoverBorderColor: 'rgba(99,179,237,0.5)',
  },
  {
    id: 'email-link',
    Icon: Mail,
    label: 'Email',
    value: 'umerrauf6@gmail.com',
    href: 'mailto:umerrauf6@gmail.com',
    accentColor: '#b794f4',
    borderColor: 'rgba(183,148,244,0.15)',
    hoverBorderColor: 'rgba(183,148,244,0.5)',
  },
  {
    id: 'phone-link',
    Icon: Phone,
    label: 'Phone',
    value: '+49 172 591 4540',
    href: 'tel:+4917259145400',
    accentColor: '#f687b3',
    borderColor: 'rgba(246,135,179,0.15)',
    hoverBorderColor: 'rgba(246,135,179,0.5)',
  },
  {
    id: 'location-info',
    Icon: MapPin,
    label: 'Location',
    value: 'Siegen, Germany 🇩🇪',
    href: 'https://maps.google.com/?q=Siegen,Germany',
    accentColor: 'rgba(255,255,255,0.5)',
    borderColor: 'rgba(255,255,255,0.07)',
    hoverBorderColor: 'rgba(255,255,255,0.2)',
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '12px 16px',
  fontSize: '14px',
  color: 'rgba(255,255,255,0.85)',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.35)',
  marginBottom: '8px',
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build a mailto link pre-filled with the form data — opens the user's email client
    const to = 'umerrauf6@gmail.com';
    const subject = encodeURIComponent(
      formData.subject || `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const getFocusedStyle = (field: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === field ? 'rgba(99,179,237,0.5)' : 'rgba(255,255,255,0.1)',
    boxShadow: focused === field ? '0 0 0 3px rgba(99,179,237,0.08)' : 'none',
  });

  return (
    <section id="contact" className="section">
      <div className="section-inner" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Whether you have a project in mind, want to discuss opportunities, or just want to say hello — I'd love to hear from you.
          </p>
        </motion.div>

        {/* Equal two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT — Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden"
          >
            {/* Glow accent */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(183,148,244,0.07), transparent)', filter: 'blur(50px)' }} />

            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Contact Info
              </h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Feel free to reach out through any of these channels.
              </p>

              <div className="flex flex-col gap-3">
                {contactLinks.map(({ id, Icon, label, value, href, accentColor, borderColor }, i) => (
                  <motion.a
                    key={id}
                    id={id}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${borderColor}`,
                      color: accentColor,
                    }}
                    whileHover={{ x: 5, scale: 1.01 }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${borderColor}` }}
                    >
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {label}
                      </p>
                      <p className="text-sm font-medium truncate">{value}</p>
                    </div>
                    <ExternalLink size={13} className="flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
                  </motion.a>
                ))}
              </div>

              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-6 flex items-center gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(99,179,237,0.06)', border: '1px solid rgba(99,179,237,0.15)' }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#63b3ed' }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#63b3ed' }} />
                </span>
                <span className="text-sm font-medium" style={{ color: '#63b3ed' }}>
                  Available for new opportunities
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-2xl p-8 flex flex-col relative overflow-hidden"
          >
            {/* Glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(99,179,237,0.07), transparent)', filter: 'blur(50px)' }} />

            <div className="relative z-10 flex flex-col flex-1">
              <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Send a Message
              </h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Fill in the form below — it will open your email client with the message ready to send.
              </p>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col flex-1 gap-5"
                  >
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" style={labelStyle}>Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          style={getFocusedStyle('name')}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" style={labelStyle}>Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          style={getFocusedStyle('email')}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" style={labelStyle}>Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={e => setFormData(d => ({ ...d, subject: e.target.value }))}
                        onFocus={() => setFocused('subject')}
                        onBlur={() => setFocused(null)}
                        style={getFocusedStyle('subject')}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex-1 flex flex-col">
                      <label htmlFor="contact-message" style={labelStyle}>Message</label>
                      <textarea
                        id="contact-message"
                        required
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        value={formData.message}
                        onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        style={{ ...getFocusedStyle('message'), resize: 'none', flex: 1 }}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      id="submit-contact-form"
                      type="submit"
                      className="btn-primary w-full justify-center"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={16} />
                      Send via Email Client
                    </motion.button>

                    <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      Clicking Send will open your email app pre-filled with this message.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center flex-1 gap-5 text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle2 size={60} style={{ color: '#63b3ed' }} />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Email Client Opened!
                      </h3>
                      <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Your email app should be open with the message pre-filled. Just hit send!
                      </p>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                      className="btn-secondary text-sm py-2 px-6"
                    >
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
