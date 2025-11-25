import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { InteractiveGrid } from './ui/InteractiveGrid';
import { GlitchText } from './ui/GlitchText';
import { MagneticButton } from './ui/MagneticButton';

const ROLES = [
  'CX_OPERATIONS_MANAGER',
  'TECH_IMPLEMENTATION_LEAD',
  'WORKFLOW_ARCHITECT',
  'SYSTEM_ADMINISTRATOR',
];

const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // === PARALLAX CONFIGURATION ===
  const bgY = useTransform(scrollY, [0, 1000], [0, 450]);
  const fgY = useTransform(scrollY, [0, 1000], [0, 150]);
  const fadeOut = useTransform(scrollY, [0, 600], [1, 0]);

  // Typewriter Logic
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % ROLES.length;
      const fullText = ROLES[i];

      setText(
        isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      id="home"
      className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col font-mono"
    >
      {/* === BACKGROUND LAYERS === */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <InteractiveGrid />
      </motion.div>

      <motion.div
        style={{ opacity: fadeOut }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 z-10"></div>
      </motion.div>

      <motion.div
        style={{ opacity: fadeOut, y: fgY }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        {/* HUD Elements (Scales, Anchors, Radar) */}
        <div className="absolute left-6 top-1/4 bottom-1/4 w-px bg-slate-800/50 hidden md:flex flex-col justify-between items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-3 h-px bg-slate-700/50" />
          ))}
          <div className="absolute top-0 -left-1 text-[8px] text-slate-600 -rotate-90 origin-center">
            ELEV_01
          </div>
        </div>
        <div className="absolute right-6 top-1/4 bottom-1/4 w-px bg-slate-800/50 hidden md:flex flex-col justify-between items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-3 h-px bg-slate-700/50" />
          ))}
          <div className="absolute bottom-0 -right-1 text-[8px] text-slate-600 -rotate-90 origin-center">
            AZIM_02
          </div>
        </div>
        <div className="absolute top-24 left-6 md:left-12 w-16 h-16 border-t border-l border-brand-cyan-deep/30 rounded-tl-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-24 right-6 md:right-12 w-16 h-16 border-t border-r border-brand-cyan-deep/30 rounded-tr-xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-24 left-6 md:left-12 w-16 h-16 border-b border-l border-brand-cyan-deep/30 rounded-bl-xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-24 right-6 md:right-12 w-16 h-16 border-b border-r border-brand-cyan-deep/30 rounded-br-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-800/20 animate-spin-slow opacity-20">
          <div className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-t from-brand-cyan-dim/20 to-transparent origin-bottom"></div>
        </div>
      </motion.div>

      {/* === MAIN HUD INTERFACE === */}
      <motion.div
        style={{ opacity: fadeOut, y: fgY }}
        className="relative z-20 flex-1 flex flex-col justify-between p-6 md:p-12 max-w-[1800px] mx-auto w-full h-full"
      >
        <div className="h-20 w-full" />

        {/* --- CENTER COMMAND STAGE --- */}
        <div className="flex-1 flex flex-col justify-center items-center text-center relative">
          {/* Sidebars Removed per user request */}

          {/* Main Content Block - Full Width Left Aligned */}
          <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-start justify-center h-full pb-20 px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.2 }}
              className="flex flex-col items-start text-left"
            >


              {/* Redesigned Title - Solid & Clear - Single Line */}
              <div className="relative mb-6 group">
                {/* Ambient Glow */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 bg-brand-cyan-deep/20 blur-[100px] w-96 h-96 rounded-full opacity-40 pointer-events-none"></div>

                {/* Main Title with Glitch Effect */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-none select-none relative z-20 text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] whitespace-nowrap">
                  <GlitchText text="ETHAN" /> <span className="text-brand-cyan">C.</span>
                </h1>

                {/* Depth Layer */}
                <h1 className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-cyan-deep opacity-50 tracking-tighter leading-none select-none z-10 translate-y-1 translate-x-1 pointer-events-none whitespace-nowrap">
                  ETHAN C.
                </h1>
              </div>

              {/* Subtitle - Bio */}
              <div className="mb-8 pl-2 border-l-2 border-brand-cyan/50 max-w-2xl">
                <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide leading-relaxed">
                  Building scalable, data-driven customer experience operations. I combine{' '}
                  <span className="text-brand-cyan font-bold">operational management</span> with{' '}
                  <span className="text-brand-blue font-bold">technical solutions</span> to reduce
                  friction and architect efficiency.
                </p>
              </div>

              {/* Stable Typewriter Container - Left Aligned */}
              <div className="h-10 flex items-center justify-start relative w-full max-w-xl mb-10">
                <div className="flex items-center gap-4 w-full px-4 justify-start border-l-2 border-brand-cyan/30 bg-slate-900/20 py-2 rounded-r">
                  <span className="text-brand-cyan text-[10px] md:text-xs font-bold font-mono tracking-widest whitespace-nowrap shrink-0">
                    ID :
                  </span>
                  <span className="text-sm md:text-lg text-slate-300 tracking-widest font-mono uppercase flex items-center whitespace-nowrap overflow-hidden">
                    {text}
                    <span className="w-2 h-4 md:w-2.5 md:h-5 bg-brand-cyan animate-pulse ml-1 shadow-[0_0_10px_cyan]"></span>
                  </span>
                </div>
              </div>

              {/* Action Buttons - Left Aligned */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-start gap-5"
              >
                <MagneticButton>
                  <a
                    href="#experience"
                    className="group relative px-8 py-4 bg-brand-cyan-deep/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-[0.2em] overflow-hidden hover:bg-brand-cyan/10 transition-all duration-300 hover:border-brand-cyan block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                    <span className="relative flex items-center gap-3">
                      Initialize_Protocol{' '}
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                    <div className="absolute top-0 left-0 w-1 h-1 bg-brand-cyan transition-all duration-300 group-hover:w-full"></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-brand-cyan transition-all duration-300 group-hover:w-full"></div>
                  </a>
                </MagneticButton>

                <MagneticButton strength={20}>
                  <a
                    href="#contact"
                    className="px-8 py-4 border border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-[0.2em] hover:text-white hover:border-slate-600 transition-all duration-300 hover:bg-slate-900/50 flex items-center gap-2 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Establish_Comms
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-green-500 transition-colors"></span>
                    </span>
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </a>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --- FOOTER DASHBOARD WIDGETS REMOVED --- */}
      </motion.div>

      {/* Gradient Fade for Section Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
