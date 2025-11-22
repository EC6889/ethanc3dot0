
import React, { useRef, useState, useEffect } from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { MapPin, Calendar, ChevronRight, Layers, Briefcase, RefreshCw, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';

const Motion = motion as any;

const THEME_COLORS = {
  cyan: {
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    bullet: 'bg-cyan-400',
    shadow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    line: 'bg-cyan-400'
  },
  blue: {
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    bullet: 'bg-blue-400',
    shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    line: 'bg-blue-400'
  },
  purple: {
    accent: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    bullet: 'bg-purple-400',
    shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    line: 'bg-purple-400'
  }
};

const Experience: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCE_DATA[0].id);
  const [logoError, setLogoError] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const activeItem = EXPERIENCE_DATA.find(item => item.id === selectedId) || EXPERIENCE_DATA[0];
  const activeIndex = EXPERIENCE_DATA.findIndex(item => item.id === selectedId);
  
  const colorKeys: (keyof typeof THEME_COLORS)[] = ['cyan', 'blue', 'purple'];
  const colorKey = colorKeys[activeIndex % colorKeys.length];
  const theme = THEME_COLORS[colorKey];

  useEffect(() => {
    setLogoError(false);
  }, [selectedId]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const springConfig = { stiffness: 50, damping: 20 };
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <Motion.section 
      id="experience" 
      ref={containerRef}
      style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
      className="relative min-h-screen flex flex-col justify-center py-32 md:py-40 overflow-hidden"
    >
      {/* === BACKGROUND: Horizontal Data Flow === */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {/* Tech Grid Background */}
         <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
               backgroundImage: 'linear-gradient(90deg, #334155 1px, transparent 1px), linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
            }}
         />
         
         {/* Vignette - Kept subtle to match global bg */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/0 via-[#030712]/50 to-[#030712]/0" />
         
         {/* Moving Data Lines */}
         {[25, 50, 75].map((pos, i) => (
             <div key={i} className="absolute left-0 w-full h-px bg-slate-800/20" style={{ top: `${pos}%` }}>
                 <Motion.div 
                    className="w-32 h-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                    animate={{ x: ['-100vw', '100vw'] }}
                    transition={{ duration: 8 + i*2, repeat: Infinity, ease: "linear" }}
                 />
             </div>
         ))}
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-8 w-full relative z-10">
        
        {/* Compact Section Header */}
        <Motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
           <div className="flex items-center gap-3 mb-4">
               <div className="h-px w-8 bg-cyan-500/50"></div>
               <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase">03. WORK_HISTORY</h2>
           </div>
           <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
             Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">History</span>
           </h3>
        </Motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Navigation */}
          <div className="lg:col-span-3 relative z-10">
             <div className="flex flex-col space-y-2">
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 pl-3">
                  // Select_Role
                </div>
                
                {EXPERIENCE_DATA.map((item, index) => {
                   const isSelected = item.id === selectedId;
                   const itemTheme = THEME_COLORS[colorKeys[index % colorKeys.length]];
                   
                   return (
                     <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`group w-full text-left px-4 py-4 border border-slate-800 transition-all duration-300 relative overflow-hidden rounded-md ${
                          isSelected 
                            ? `bg-slate-900/80 border-${colorKeys[index % 3]}-500/50` 
                            : 'hover:border-slate-600 hover:bg-slate-900/40'
                        }`}
                     >
                        {/* Active Glow Background */}
                        {isSelected && (
                           <div className={`absolute inset-0 ${itemTheme.bg} opacity-20`} />
                        )}

                        <div className="relative z-10 w-full">
                           <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs md:text-sm font-bold font-display tracking-wide transition-colors ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                {item.company}
                              </span>
                              
                              {/* Selection Indicator */}
                              {isSelected ? (
                                <div className="flex items-center gap-2">
                                    <span className={`hidden md:block text-[8px] font-mono uppercase tracking-widest ${itemTheme.accent} animate-pulse`}>
                                        SYNC
                                    </span>
                                    <div className="flex items-end gap-0.5 h-3">
                                        {[0, 1, 2].map((bar) => (
                                            <Motion.div
                                                key={bar}
                                                className={`w-0.5 rounded-full ${itemTheme.line}`}
                                                initial={{ height: '20%' }}
                                                animate={{ height: ['20%', '100%', '20%'] }}
                                                transition={{ 
                                                    duration: 0.6, 
                                                    repeat: Infinity, 
                                                    ease: "easeInOut",
                                                    delay: bar * 0.15 
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                              ) : (
                                <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                              )}
                           </div>
                           
                           <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                               {item.positions[0].period.split('–')[0]} — {item.positions[0].period.split('–')[1] || 'Now'}
                           </div>
                        </div>
                        
                        {/* Background Scan Effect for Active Item */}
                        {isSelected && (
                            <Motion.div
                                className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colorKeys[index % 3]}-400/10 to-transparent`}
                                initial={{ x: '-100%' }}
                                animate={{ x: '200%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        )}
                     </button>
                   );
                })}
             </div>
          </div>

          {/* RIGHT COLUMN: Content Display */}
          <div className="lg:col-span-9 relative z-10">
             <AnimatePresence mode='wait'>
                <Motion.div
                   key={activeItem.id}
                   initial={{ opacity: 0, x: 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   transition={{ duration: 0.3 }}
                >
                   <GlassCard className={`p-0 overflow-hidden border-slate-800 bg-[#0f172a]/90 shadow-2xl relative border-l-2 border-l-${colorKey}-500/50`}>
                      
                      {/* Background Decoration */}
                      <div className={`absolute top-0 right-0 w-64 h-64 ${theme.bg} rounded-full blur-[100px] opacity-20 pointer-events-none`} />

                      {/* Header Banner */}
                      <div className="relative px-6 py-5 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center p-2 shadow-lg shrink-0`}>
                                  {activeItem.logo && !logoError ? (
                                    <img 
                                        src={activeItem.logo} 
                                        alt={activeItem.company} 
                                        className="w-full h-full object-contain opacity-90" 
                                        onError={() => setLogoError(true)}
                                    />
                                  ) : (
                                    <span className="font-display font-bold text-lg text-slate-500">{activeItem.logoInitials}</span>
                                  )}
                              </div>
                              <div>
                                  <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight leading-none">
                                    {activeItem.company}
                                  </h2>
                                  <div className="flex items-center gap-4 mt-1.5 text-[10px] font-mono text-slate-500">
                                     <span className="flex items-center gap-1.5">
                                        <MapPin size={12} /> {activeItem.location}
                                     </span>
                                     <span className="w-1 h-1 rounded-full bg-slate-700" />
                                     <span className={theme.accent}>{activeItem.id.toUpperCase()}</span>
                                  </div>
                              </div>
                          </div>
                          
                          {/* Large Watermark */}
                          <div className={`hidden md:block text-6xl font-display font-bold opacity-[0.02] ${theme.accent} select-none absolute right-4 top-1/2 -translate-y-1/2`}>
                               {activeItem.logoInitials}
                          </div>
                      </div>

                      {/* Content Body */}
                      <div className="px-6 py-6 space-y-8 bg-gradient-to-b from-slate-900/0 to-slate-900/20 max-h-[60vh] md:max-h-[70vh] overflow-y-auto custom-scrollbar">
                         {activeItem.positions.map((pos, idx) => (
                            <div key={idx} className="relative group/pos">
                               <div className={`absolute left-0 top-2 bottom-0 w-px bg-slate-800 group-last/pos:bottom-auto group-last/pos:h-full`} />
                               
                               <div className="pl-6 relative">
                                  <div className={`absolute left-[-4px] top-2.5 w-2 h-2 rounded-full border-2 border-slate-900 ${theme.bullet}`} />

                                  <div className="mb-3">
                                     <div className="flex flex-wrap items-baseline gap-3 mb-1">
                                        <h3 className="text-base md:text-lg font-bold text-white font-display">
                                          {pos.title}
                                        </h3>
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide ${theme.bg} ${theme.accent} border ${theme.border}`}>
                                           <Calendar size={10} />
                                           {pos.period}
                                        </span>
                                     </div>
                                     {pos.companyOverride && (
                                        <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 mb-1">
                                           <Briefcase size={12} />
                                           Deployed via {pos.companyOverride}
                                        </div>
                                     )}
                                  </div>

                                  <div className="space-y-5">
                                     {pos.content.map((block, bIdx) => (
                                        <div key={bIdx} className="bg-slate-900/30 rounded border border-slate-800/50 p-4 hover:border-slate-700 transition-colors">
                                           {block.category && (
                                              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 pb-2 border-b border-slate-800/50">
                                                 <Layers size={12} />
                                                 {block.category}
                                              </h4>
                                           )}
                                           <ul className="space-y-2.5">
                                              {block.bullets.map((bullet, i) => (
                                                 <li key={i} className="relative pl-4 text-xs md:text-sm text-slate-400 leading-relaxed">
                                                    <span className={`absolute left-0 top-[8px] w-1 h-1 rounded-full ${theme.bullet} opacity-50`} />
                                                    {bullet}
                                                 </li>
                                              ))}
                                           </ul>
                                        </div>
                                     ))}
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>

                      {/* Footer */}
                      {activeItem.techStack && activeItem.techStack.length > 0 && (
                         <div className="bg-slate-950/50 border-t border-slate-800/50 px-6 py-4">
                            <div className="flex flex-wrap items-center gap-2">
                               <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mr-2">
                                  Tech_Stack ::
                               </span>
                               {activeItem.techStack.map((tech) => (
                                  <span 
                                     key={tech}
                                     className="px-2.5 py-1 rounded text-[10px] font-mono font-medium text-slate-400 bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-default"
                                  >
                                     {tech}
                                  </span>
                               ))}
                            </div>
                         </div>
                      )}
                   </GlassCard>
                </Motion.div>
             </AnimatePresence>
          </div>

        </div>
      </div>

    </Motion.section>
  );
}

export default Experience;
