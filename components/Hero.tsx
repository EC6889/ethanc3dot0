import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { InteractiveGrid } from './ui/InteractiveGrid';
import { GlitchText } from './ui/GlitchText';
import { MagneticButton } from './ui/MagneticButton';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const { ref, variants, isInView } = useScrollAnimation(true);

  // === PARALLAX CONFIGURATION ===
  const bgY = useTransform(scrollY, [0, 1000], [0, 450]);
  const fgY = useTransform(scrollY, [0, 1000], [0, 150]);
  const fadeOut = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section
      id="home"
      className="relative w-full h-dvh bg-slate-950 overflow-hidden flex flex-col font-mono"
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
          <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-start justify-center h-full pb-20 px-6 md:px-12"
          >
            {/* Redesigned Title - Solid & Clear - Single Line */}
            <motion.div variants={variants} className="relative mb-6 group">
              {/* Ambient Glow */}
              <div className="overflow-hidden mb-4 relative">
                <h1 className="text-[clamp(3rem,5vw+1rem,5.5rem)] font-display font-bold tracking-tighter leading-none select-none relative z-20 text-white drop-shadow-[0_0_25px_rgba(34,211,238,0.7)] whitespace-nowrap">
                  ETHAN <span className="text-brand-cyan">C.</span>
                </h1>
                {/* Depth Layer */}
                <h1 className="absolute inset-0 text-[clamp(3rem,5vw+1rem,5.5rem)] font-display font-bold text-brand-cyan-deep opacity-50 tracking-tighter leading-none select-none z-10 translate-y-1 translate-x-1 pointer-events-none whitespace-nowrap">
                  ETHAN C.
                </h1>
              </div>
            </motion.div>
            {/* Subtitle - Bio */}
            <motion.div
              variants={variants}
              className="mb-8 pl-2 border-l-2 border-brand-cyan/50 max-w-2xl"
            >
              <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide leading-relaxed">
                Transforming Experiences Through Data-Driven Insights and Innovative Solutions
              </p>
            </motion.div>
            {/* Stable Typewriter Container - Left Aligned */}
            <motion.div
              variants={variants}
              className="h-10 flex items-center justify-start relative w-full max-w-xl mb-10"
            >
              <GlitchText />
            </motion.div>
            {/* Action Buttons - Left Aligned */}
            <motion.div
              variants={variants}
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

      {/* Gradient Fade for Section Transition - Extended for seamless blend */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
