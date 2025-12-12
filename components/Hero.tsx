import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { InteractiveGrid } from './ui/InteractiveGrid';
import { MagneticButton } from './ui/MagneticButton';
import { HERO_CONTENT } from '../constants'; // Import constants

interface HeroProps {
  animationPhases: {
    showHeroBackground: boolean;
    showHeroTitle: boolean;
    showHeroSubtitle: boolean;
    showHeroTypewriter: boolean;
    showHeroCTA: boolean;
  };
}

const Hero: React.FC<HeroProps> = ({ animationPhases }) => {
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
      const i = loopNum % HERO_CONTENT.roles.length; // Use roles from constants
      const fullText = HERO_CONTENT.roles[i];

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
      className="relative w-full h-dvh bg-slate-950 overflow-hidden flex flex-col font-mono"
    >
      {/* === BACKGROUND LAYERS === */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
        initial={{ opacity: 0 }}
        animate={animationPhases.showHeroBackground ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
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
        { }
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
            <div className="flex flex-col items-start text-left">


              {/* Chromatic Shift Wordmark - High Brightness Version */}
              {animationPhases.showHeroTitle && (
                <div className="relative mb-6 group cursor-default w-full z-50">
                  <div className="relative flex justify-start">

                    {/* Main Text - Radiant Brand Gradient (White -> Cyan -> Blue) */}
                    {/* Main Text - Solid White with 3D Floating Effect */}
                    <motion.h1
                      className="relative whitespace-nowrap font-black text-[clamp(3rem,5vw+1rem,5.5rem)] leading-none tracking-tighter text-white"
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0px)',
                        y: [-10, 10] // Floating range
                      }}
                      transition={{
                        // Entrance
                        opacity: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
                        scale: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
                        filter: { duration: 0.8 },
                        // Floating Loop
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }
                      }}
                      style={{
                        // 3D Depth Stack + Glow
                        textShadow: `
                          0 0 20px rgba(34, 211, 238, 0.6),
                          0 0 40px rgba(34, 211, 238, 0.4),
                          1px 1px 0px #06b6d4,
                          2px 2px 0px #06b6d4,
                          3px 3px 0px #06b6d4,
                          4px 4px 0px #0891b2
                        `,
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                      }}
                    >
                      {Array.from(HERO_CONTENT.name).map((char, i) => ( // Use dynamic name
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 40, rotateX: 90 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            rotateX: 0
                          }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.05,
                            type: "spring",
                            stiffness: 100,
                            damping: 10
                          }}
                          className={`relative inline-block ${char === ' ' ? 'w-[0.2em]' : ''}`}
                        >
                          {char === ' ' ? '\u00A0' : char}

                          {/* Sheen Effect */}
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-200 to-transparent opacity-0"
                            animate={{
                              x: ['-100%', '100%'],
                              opacity: [0, 0.8, 0]
                            }}
                            transition={{
                              duration: 2,
                              delay: 1 + (i * 0.1),
                              repeat: Infinity,
                              repeatDelay: 4
                            }}
                            style={{
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                              color: 'transparent'
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        </motion.span>
                      ))}
                    </motion.h1>
                  </div>

                  {/* Reflection/Ground Glow - Breathing with the float */}
                  <motion.div
                    className="absolute -bottom-4 left-0 w-full max-w-md h-12 bg-gradient-to-b from-cyan-400/20 to-transparent blur-xl opacity-40"
                    animate={{
                      scaleX: [0.9, 1.1],
                      opacity: [0.3, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                </div>
              )}

              {/* Subtitle - Electromagnetic Ripple */}
              <motion.div
                className="mb-8 pl-2 border-l-2 border-brand-cyan/50 max-w-2xl relative"
                initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                animate={animationPhases.showHeroSubtitle ?
                  { opacity: 1, x: 0, filter: 'blur(0px)' } :
                  { opacity: 0, x: -40, filter: 'blur(10px)' }
                }
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Electromagnetic pulse on entrance */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/50 rounded"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={animationPhases.showHeroSubtitle ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 0, 0]
                  } : { scale: 1, opacity: 0 }}
                  transition={{ duration: 0.8, times: [0, 0.5, 1] }}
                />
                <p className="text-xs md:text-sm text-slate-400 font-mono tracking-wide leading-relaxed relative z-10">
                  {HERO_CONTENT.bio} {/* Use dynamic bio */}
                </p>
              </motion.div>

              {/* Typewriter - With Glitch Artifact */}
              <motion.div
                className="h-10 flex items-center justify-start relative w-full max-w-xl mb-10"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                animate={animationPhases.showHeroTypewriter ?
                  { opacity: 1, scale: 1, filter: 'blur(0px)' } :
                  { opacity: 0, scale: 0.9, filter: 'blur(8px)' }
                }
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Glitch scanline */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-1"
                  initial={{ y: 0 }}
                  animate={animationPhases.showHeroTypewriter ? {
                    y: ['0%', '100%'],
                    opacity: [0, 0.5, 0]
                  } : { y: 0, opacity: 0 }}
                  transition={{ duration: 0.4, times: [0, 0.5, 1] }}
                />
                <div className="flex items-center gap-4 w-full px-4 justify-start border-l-2 border-brand-cyan/30 bg-slate-900/20 py-2 rounded-r relative z-10">
                  <span className="text-brand-cyan text-[10px] md:text-xs font-bold font-mono tracking-widest whitespace-nowrap shrink-0">
                    ID :
                  </span>
                  <span className="text-sm md:text-lg text-slate-300 tracking-widest font-mono uppercase flex items-center whitespace-nowrap overflow-hidden">
                    {text}
                    <span className="w-2 h-4 md:w-2.5 md:h-5 bg-brand-cyan animate-pulse ml-1 shadow-[0_0_15px_cyan]"></span>
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons - Electromagnetic Pulse */}
              <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(15px)' }}
                animate={animationPhases.showHeroCTA ?
                  { opacity: 1, y: 0, filter: 'blur(0px)' } :
                  { opacity: 0, y: 50, filter: 'blur(15px)' }
                }
                transition={{
                  duration: 0.7,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="flex flex-col sm:flex-row items-start gap-5 relative"
              >
                {/* Pulse ring on entrance */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded blur-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={animationPhases.showHeroCTA ? {
                    scale: [0.8, 1.3, 1],
                    opacity: [0.6, 0, 0]
                  } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 1, times: [0, 0.6, 1] }}
                />
                <MagneticButton>
                  <a
                    href="#experience"
                    className="group relative px-8 py-4 bg-brand-cyan-deep/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-[0.2em] overflow-hidden hover:bg-brand-cyan/10 transition-all duration-300 hover:border-brand-cyan block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                    <span className="relative flex items-center gap-3">
                      View Experience{' '}
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
                      Contact Me
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-green-500 transition-colors"></span>
                    </span>
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </a>
                </MagneticButton>
              </motion.div>
            </div>
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
