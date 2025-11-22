
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Terminal, ArrowDown, Power, Wifi } from 'lucide-react';
import { PerspectiveGrid } from './ui/PerspectiveGrid';

const Motion = motion as any;

const ROLES = [
  "CX Operations Manager",
  "Tech Implementation Lead",
  "Workflow Specialist",
  "Support Team Lead",
  "System Admin"
];

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax Effects for inside the monitor
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yCard = useTransform(scrollY, [0, 500], [0, -50]);

  // Typewriter Logic
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Mouse Movement for 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % ROLES.length;
      const fullText = ROLES[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Spring physics for smooth monitor rotation
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [2, -2]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-2, 2]), { stiffness: 100, damping: 20 });

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] perspective-2000"
    >
      {/* 1. THE ROOM (Physical Environment) */}
      {/* Ambient Glow behind monitor (Bias Lighting) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-cyan-500/20 blur-[120px] rounded-full opacity-40 pointer-events-none z-0"></div>
      
      {/* The Desk Surface */}
      <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-[#0f172a] to-[#020617] opacity-90 z-0 transform origin-bottom scale-x-150 translate-y-20 blur-xl"></div>

      {/* 2. THE HARDWARE (Monitor Setup) */}
      <Motion.div 
        style={{ rotateX, rotateY }}
        className="relative z-10 w-[90vw] max-w-[1400px] aspect-video max-h-[85vh] flex flex-col items-center"
      >
        {/* Monitor Bezel / Frame */}
        <div className="relative w-full h-full bg-[#111] rounded-2xl p-3 md:p-4 shadow-2xl border border-[#222] ring-1 ring-white/5 group">
            
            {/* Hardware Details (Bezel Text/Lights) */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                <span className="text-[8px] font-mono text-slate-600 tracking-[0.3em] uppercase">
                    OP_ARCH_DISPLAY_V3
                </span>
            </div>
            <div className="absolute bottom-2 right-6 flex items-center gap-2 z-20">
                <Power size={10} className="text-cyan-500 animate-pulse" />
                <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]"></div>
            </div>

            {/* THE SCREEN (Viewport for Content) */}
            <div className="relative w-full h-full bg-slate-950 overflow-hidden rounded-lg border border-slate-800/50 shadow-inner">
                
                {/* Screen Glare/Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-30 pointer-events-none z-50 rounded-lg"></div>
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[45] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

                {/* === CONTENT INSIDE THE MONITOR === */}
                <div className="relative w-full h-full overflow-hidden">
                    
                    <PerspectiveGrid />

                    <div className="w-full h-full px-6 md:px-12 relative z-10 flex flex-col justify-center pb-10">
                        
                        {/* ARCHITECTURAL TYPOGRAPHY LAYER */}
                        <Motion.div 
                        style={{ y: yText }}
                        className="relative z-0 select-none mt-[-5%]"
                        >
                        <Motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="relative"
                        >
                            {/* Technical Annotation Top */}
                            <div className="flex items-center gap-4 mb-2 ml-2 md:ml-4">
                                <Wifi size={12} className="text-cyan-500/80" />
                                <span className="text-[8px] md:text-[10px] font-mono text-cyan-500/80 tracking-widest uppercase">
                                [ SYSTEM_ONLINE :: CONNECTION_SECURE ]
                                </span>
                            </div>

                            {/* Main Name Block */}
                            <h1 className="font-display font-bold tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500/50 drop-shadow-2xl">
                                <span className="block text-[12vw] md:text-[10vw]">
                                ETHAN
                                </span>
                                
                                <div className="flex items-baseline gap-4 md:gap-8">
                                <span className="text-[12vw] md:text-[10vw] text-slate-800 font-light opacity-50 transform -translate-y-4">{`{`}</span>
                                
                                <span 
                                    className="block text-[12vw] md:text-[10vw] text-transparent relative"
                                    style={{ WebkitTextStroke: '1px rgba(34, 211, 238, 0.8)' }} 
                                >
                                    C.
                                    <span className="absolute bottom-[15%] right-[-10%] w-[10%] h-[10%] bg-cyan-400 rounded-full shadow-[0_0_20px_cyan] animate-pulse"></span>
                                </span>

                                <span className="text-[12vw] md:text-[10vw] text-slate-800 font-light opacity-50 transform -translate-y-4">{`}`}</span>
                                </div>
                            </h1>

                            {/* Technical Annotation Bottom */}
                            <div className="mt-4 ml-2 md:ml-4 flex flex-col gap-1">
                                <p className="text-[10px] md:text-xs font-mono text-slate-400 tracking-[0.5em] uppercase">
                                OPERATIONAL_EXCELLENCE
                                </p>
                            </div>
                        </Motion.div>
                        </Motion.div>

                        {/* FLOATING CONTENT CARD */}
                        <Motion.div 
                        style={{ y: yCard }}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="absolute bottom-8 right-6 md:bottom-12 md:right-12 w-full max-w-xs md:max-w-md z-20"
                        >
                        <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 p-5 md:p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500">
                            
                            {/* Top Shimmer */}
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-80"></div>
                            
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-mono text-cyan-500 font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                                    Protocol: Active
                                    </span>
                                    <div className="h-6 flex items-center">
                                    <span className="text-base md:text-lg font-mono font-medium text-white">
                                        {text}
                                        <span className="animate-pulse ml-1 inline-block w-0.5 h-4 bg-cyan-500 align-middle"></span>
                                    </span>
                                    </div>
                                </div>
                                <Terminal size={18} className="text-slate-600 group-hover:text-cyan-500 transition-colors duration-500" />
                            </div>

                            {/* Body */}
                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
                                Bridging <strong className="text-white">Operations</strong> & <strong className="text-white">Strategy</strong>. 
                                Architecting workflows and configuring ecosystems.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <a 
                                href="#experience" 
                                className="flex-1 group/btn relative px-4 py-2.5 bg-white text-slate-950 font-bold font-mono text-[10px] uppercase tracking-widest rounded hover:bg-cyan-50 transition-colors text-center flex items-center justify-center gap-2"
                                >
                                    Explore <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                </a>

                                <a 
                                href="#contact" 
                                className="flex-1 relative px-4 py-2.5 bg-transparent border border-slate-600 text-white font-bold font-mono text-[10px] uppercase tracking-widest rounded hover:border-cyan-500 hover:bg-cyan-950/30 transition-all text-center"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                        </Motion.div>

                    </div>
                </div>
                {/* === END CONTENT INSIDE MONITOR === */}
            </div>
        </div>
        
        {/* Monitor Stand */}
        <div className="relative z-0 mt-[-2px]">
            {/* Neck */}
            <div className="w-32 h-16 bg-[#1a1a1a] mx-auto border-x border-[#333] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>
            {/* Base */}
            <div className="w-64 h-4 bg-[#151515] rounded-t-xl mx-auto border-t border-[#333] shadow-2xl relative">
                 {/* Reflection on desk */}
                 <div className="absolute top-full left-0 w-full h-10 bg-gradient-to-b from-black/50 to-transparent blur-md"></div>
            </div>
        </div>

      </Motion.div>

      {/* Scroll Indicator (Outside the monitor, implying user should scroll the page) */}
      <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
         <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            LEAVE_TERMINAL
         </span>
         <ArrowDown size={14} className="text-slate-500" />
      </Motion.div>

    </section>
  );
};

export default Hero;
