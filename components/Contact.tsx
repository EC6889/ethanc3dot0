import React, { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  Download,
  Mail,
  Linkedin,
  Calendar,
  Send,
  CheckCircle,
  ExternalLink,
  FileCheck,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const Motion = motion as any;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const turnstileRef = useRef<any>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security Check: Stop if no CAPTCHA token
    if (!token) {
      alert('Please verify that you are human.');
      return;
    }
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setError(false);

    try {
      // Use the Cloudflare Worker URL from .env.local
      const workerUrl = import.meta.env.VITE_WORKER_URL;

      if (!workerUrl) {
        console.error("Worker URL missing");
        throw new Error("Configuration Error");
      }

      const res = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          token: token, // Sending the verification token
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      // Success Handling
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setToken(null);
      turnstileRef.current?.reset(); // Reset CAPTCHA for next use

      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- Animation Logic ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'start center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);

  const springConfig = { stiffness: 60, damping: 20 };
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <Motion.section
      id="contact"
      ref={containerRef}
      style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
      className="relative overflow-hidden py-[min(8rem,12vh)]"
    >
      {/* === BACKGROUND: Signal Uplink === */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-cyan/5"
            style={{ width: `${(i + 1) * 30}%`, height: `${(i + 1) * 80}%` }}
          />
        ))}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyan-900/5 to-transparent"></div>

        {/* TOP Gradient Transition */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent z-10"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-[min(1.5rem,5vw)] relative z-10">
        {/* Section Header */}
        <Motion.div
          initial={{ opacity: 0, y: -150, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1.2 }}
          viewport={{ once: false, margin: '-100px' }}
          className="mb-14 md:mb-20 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="h-px w-8 bg-brand-cyan/50"></div>
            <h2 className="text-[10px] font-mono text-brand-cyan tracking-[0.2em] uppercase">
              06. CONTACT
            </h2>
          </div>
          <h3 className="text-display-1xl font-display font-bold text-white tracking-tight">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
              Touch
            </span>
          </h3>
        </Motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start perspective-1000">
          {/* Left Column: Signal Hub */}
          <Motion.div
            initial={{ opacity: 0, x: -300, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
            viewport={{ once: false, margin: '-50px' }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-display-sm md:text-display-md font-display font-bold text-white leading-[1.3]">
                Open for <br />
                <span className="text-brand-cyan">New Opportunities</span>
              </h3>
              <p className="text-slate-400 text-body-md mt-6 leading-loose max-w-md">
                Looking for the next challenge in operations management or consulting. Whether you want to explore collaboration,
                discuss a role, or just say hi—I'd love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-4 max-w-lg w-full">
              {/* Resume Download */}
              <a href="/Ethan_C_Resume.pdf" download="Ethan_C_Resume.pdf" className="block w-full">
                <GlassCard className="p-0 group relative overflow-hidden transition-all border-slate-800 hover:border-brand-purple/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] cursor-pointer bg-[#0f172a]/80">
                  <div className="p-5 flex items-center gap-5 relative z-10">
                    <div className="h-12 w-12 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-purple group-hover:text-white group-hover:scale-110 group-hover:bg-brand-purple group-hover:border-brand-purple transition-all duration-300 shadow-lg">
                      <FileCheck size={22} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-bold text-white group-hover:text-brand-purple transition-colors font-display tracking-wide">
                          Ethan_C_Resume.pdf
                        </h5>
                        <span className="px-1.5 py-0.5 rounded bg-brand-purple/20 border border-brand-purple/30 text-brand-purple text-[8px] font-mono font-bold uppercase">Latest</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 group-hover:text-brand-purple/70 transition-colors">
                        <span>142 KB</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full group-hover:bg-brand-purple"></span>
                        <span>SECURE_FILE</span>
                      </div>
                    </div>
                    <div className="h-9 w-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-brand-purple group-hover:text-brand-purple transition-all">
                      <Download size={16} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </GlassCard>
              </a>

              {/* GoodTime Schedule Module */}
              <a
                href="https://meet.goodtime.io/u/gmeal6889-100/letschat"
                target="_blank"
                rel="noreferrer"
                className="block w-full"
              >
                <GlassCard
                  className="p-0 group relative overflow-hidden transition-all border-slate-800 hover:border-brand-cyan/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] bg-[#0f172a]/80"
                  hoverEffect={false} // Disabling default to use custom fill
                >
                  <div className="p-5 flex items-center gap-5 relative z-10">
                    <div className="h-12 w-12 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-cyan group-hover:text-white group-hover:border-brand-cyan/50 transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                      <Calendar size={20} />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors font-display tracking-wide">
                        Schedule Briefing
                      </h5>
                      <p className="text-[10px] font-mono text-slate-500 mt-1 group-hover:text-brand-cyan/70">
                        SYNC_CALENDAR
                      </p>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-slate-600 group-hover:text-brand-cyan transition-colors"
                    />
                  </div>

                  {/* Progress Bar Animation */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-cyan to-brand-blue w-0 group-hover:w-full transition-all duration-700 ease-out"></div>

                  {/* Hover Background Fill */}
                  <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </GlassCard>
              </a>

              {/* Social Grid (Mail / LinkedIn) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <a href="mailto:gmeal6889@gmail.com" className="block h-full w-full">
                  <GlassCard className="p-0 h-full group relative overflow-hidden transition-all border-slate-800 hover:border-brand-blue/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] bg-[#0f172a]/80" hoverEffect={false}>
                    <div className="p-5 h-full flex flex-col justify-between gap-4 relative z-10">
                      <Mail size={20} className="text-brand-blue group-hover:text-white transition-colors" />
                      <div>
                        <h5 className="text-xs font-bold text-white mb-1 font-display">Email</h5>
                        <p className="text-[9px] font-mono text-slate-500 truncate group-hover:text-brand-blue/70">gmeal6889</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </GlassCard>
                </a>

                <a href="https://linkedin.com/in/echia6889" target="_blank" rel="noreferrer" className="block h-full w-full">
                  <GlassCard className="p-0 h-full group relative overflow-hidden transition-all border-slate-800 hover:border-brand-blue/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] bg-[#0f172a]/80" hoverEffect={false}>
                    <div className="p-5 h-full flex flex-col justify-between gap-4 relative z-10">
                      <Linkedin size={20} className="text-brand-blue group-hover:text-white transition-colors" />
                      <div>
                        <h5 className="text-xs font-bold text-white mb-1 font-display">LinkedIn</h5>
                        <p className="text-[9px] font-mono text-slate-500 group-hover:text-brand-blue/70">/in/echia6889</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </GlassCard>
                </a>
              </div>
            </div>
          </Motion.div>

          {/* Right Column: Form Terminal */}
          <Motion.div
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.4 }}
            viewport={{ once: false, margin: '-50px' }}
          >
            <GlassCard className="border-slate-800 bg-[#0f172a]/90 relative overflow-hidden flex flex-col h-full shadow-2xl p-0">
              {/* Terminal Decorative Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="w-6 h-0.5 bg-brand-cyan"></div>
                    <div className="w-3 h-0.5 bg-brand-cyan/50"></div>
                  </div>
                  <span className="text-[10px] font-mono text-brand-cyan font-bold uppercase tracking-widest">
                    Uplink_Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)] ${token ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <span className="text-[9px] font-mono text-slate-400">
                    {token ? 'SECURE' : 'AUTH_PENDING'}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex-grow flex flex-col relative z-10">
                <div className="mb-6 border-l-2 border-brand-cyan/20 pl-4">
                  <h4 className="text-xl font-display font-bold text-white mb-1">
                    Initialize Transmission
                  </h4>
                  <p className="text-xs font-mono text-slate-500">
                    &gt; Status: {token ? 'Ready to Transmit' : 'Awaiting Verification'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                  {/* Name & Email - Two Column Layout */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="group space-y-3 relative">
                      <label htmlFor="name" className="text-[10px] font-mono text-slate-500 group-focus-within:text-brand-cyan uppercase tracking-wider flex justify-between">
                        <span>01 // User_ID</span>
                        <span className="opacity-0 group-focus-within:opacity-100 transition-opacity text-brand-cyan/50">
                          ACTIVE
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full bg-slate-900/50 border border-slate-800 rounded px-4 py-4 text-sm text-white focus:outline-none focus:border-brand-cyan focus:bg-slate-900/80 transition-all placeholder:text-slate-600 font-mono hover:border-slate-700"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group space-y-3 relative">
                      <label htmlFor="email" className="text-[10px] font-mono text-slate-500 group-focus-within:text-brand-cyan uppercase tracking-wider flex justify-between">
                        <span>02 // Return_Address</span>
                        <span className="opacity-0 group-focus-within:opacity-100 transition-opacity text-brand-cyan/50">
                          ACTIVE
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full bg-slate-900/50 border border-slate-800 rounded px-4 py-4 text-sm text-white focus:outline-none focus:border-brand-cyan focus:bg-slate-900/80 transition-all placeholder:text-slate-600 font-mono hover:border-slate-700"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message - Full Width */}
                  <div className="group space-y-3 relative">
                    <label htmlFor="message" className="text-[10px] font-mono text-slate-500 group-focus-within:text-brand-cyan uppercase tracking-wider flex justify-between">
                      <span>03 // Data_Payload</span>
                      <span className="opacity-0 group-focus-within:opacity-100 transition-opacity text-brand-cyan/50">
                        ACTIVE
                      </span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded px-4 py-4 text-sm text-white focus:outline-none focus:border-brand-cyan focus:bg-slate-900/80 transition-all placeholder:text-slate-600 resize-none font-mono leading-relaxed hover:border-slate-700"
                        placeholder="Type your message here..."
                        required
                      />
                    </div>
                  </div>

                  {/* CAPTCHA Widget */}
                  <div className="pt-4 flex justify-center">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || ''}
                      onSuccess={(token) => setToken(token)}
                      options={{ theme: 'dark', action: 'contact-form' }}
                    />
                  </div>

                  {/* Submit Button */}
                  {/* Submit Button - The Transmission Trigger */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted || !token}
                    className={`
                      w-full py-4 font-bold font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all mt-auto group relative overflow-hidden
                      ${!token
                        ? 'bg-slate-800/50 border border-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-brand-cyan/5 border border-brand-cyan/50 text-brand-cyan cursor-pointer'}
                    `}
                  >
                    {/* Background Fills */}
                    {!token && <div className="absolute inset-0 bg-stripes opacity-5"></div>}

                    {/* Hover Fill Effect (Only when active) */}
                    {token && !isSubmitting && !isSubmitted && (
                      <div className="absolute inset-0 bg-brand-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    )}

                    {/* Progress Bar (Uploading) */}
                    {isSubmitting && (
                      <Motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute inset-0 bg-brand-cyan/20"
                      />
                    )}

                    {/* Success Fill */}
                    {isSubmitted && (
                      <Motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="absolute inset-0 bg-emerald-500/20 origin-left"
                      />
                    )}

                    {/* Error Fill */}
                    {error && (
                      <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-red-500/20"
                      />
                    )}

                    {/* Button Content */}
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <Motion.span
                          key="success"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-2 relative z-10 text-emerald-400"
                        >
                          <span className="text-emerald-400">[ TRANSMISSION_COMPLETE ]</span> <CheckCircle size={16} />
                        </Motion.span>
                      ) : error ? (
                        <Motion.span
                          key="error"
                          initial={{ x: 0 }}
                          animate={{ x: [-5, 5, -5, 5, 0] }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center gap-2 relative z-10 text-red-400"
                        >
                          [ CONNECTION_REFUSED ] <AlertCircle size={16} />
                        </Motion.span>
                      ) : isSubmitting ? (
                        <Motion.span
                          key="loading"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-2 relative z-10 text-brand-cyan"
                        >
                          <span className="font-mono">UPLOADING_PACKET...</span>
                        </Motion.span>
                      ) : !token ? (
                        <Motion.span
                          key="locked"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          LOCKED // VERIFY HUMAN <Lock size={12} />
                        </Motion.span>
                      ) : (
                        <Motion.span
                          key="idle"
                          initial={{ y: 0 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-2 relative z-10 group-hover:text-white transition-colors"
                        >
                          <span className="group-hover:hidden">&gt; INITIALIZE_UPLOAD</span>
                          <span className="hidden group-hover:inline-block text-brand-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                            &gt;&gt; EXECUTE_TRANSMISSION
                          </span>
                          <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </Motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </div>
            </GlassCard>
          </Motion.div>
        </div>
      </div>
    </Motion.section >
  );
};

export default Contact;
