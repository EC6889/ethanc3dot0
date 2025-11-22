
import React, { useRef, useState } from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { MapPin, Calendar, ChevronRight, Layers, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';

const Motion = motion as any;

const THEME_COLORS = {
  cyan: {
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    bullet: 'bg-cyan-400',
  },
  blue: {
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    bullet: 'bg-blue-400',
  },
  purple: {
    accent: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    bullet: 'bg-purple-400',
  }
};

const Experience: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCE_DATA[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = EXPERIENCE_DATA.find(item => item.id === selectedId) || EXPERIENCE_DATA[0];
  const activeIndex = EXPERIENCE_DATA.findIndex(item => item.id === selectedId);
  
  const colorKeys: (keyof typeof THEME_COLORS)[] = ['cyan', 'blue', 'purple'];
  const colorKey = colorKeys[activeIndex % colorKeys.length];
  const theme = THEME_COLORS[colorKey];

  return (
    <Motion.section 
      id="experience" 
      className="bg-slate-950 relative min-h-screen flex flex-col justify-center py-16 md:py-20"
    >
      <div ref={containerRef} className="max-w-[1100px] mx-auto px-4 md:px-8 w-full relative z-10">
        
        {/* Compact Section Header */}
        <div className="mb-8 md:mb-10">
           <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase mb-2">03. WORK_HISTORY</h2>
           <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
             Professional Experience
           </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 items-start">
          
          {/* LEFT COLUMN: Navigation */}
          <div className="lg:col-span-4 relative">
             <div className="flex flex-col space-y-1">
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
                        className={`group w-full text-left px-3 py-2.5 border-l-[3px] transition-all duration-200 relative overflow-hidden rounded-r-md ${
                          isSelected 
                            ? `border-${colorKeys[index % 3]}-400 bg-slate-900` 
                            : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/30'
                        }`}
                     >
                        {isSelected && (
                           <div className={`absolute inset-0 ${itemTheme.bg} opacity-40`} />
                        )}

                        <div className="relative z-10">
                           <div className="flex items-center justify-between mb-0.5">
                              <span className={`text-xs md:text-sm font-bold font-display tracking-wide ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                                {item.company}
                              </span>
                              {isSelected && <ChevronRight size={12} className={itemTheme.accent} />}
                           </div>
                           <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                               {item.positions[0].period.split('–')[0]} — {item.positions[0].period.split('–')[1] || 'Now'}
                           </div>
                        </div>
                     </button>
                   );
                })}
             </div>
          </div>

          {/* RIGHT COLUMN: Content Display */}
          <div className="lg:col-span-8">
             <AnimatePresence mode='wait'>
                <Motion.div
                   key={activeItem.id}
                   initial={{ opacity: 0, x: 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   transition={{ duration: 0.2 }}
                >
                   <GlassCard className="p-0 overflow-hidden border-slate-800 bg-[#0f172a]/80 shadow-2xl">
                      
                      {/* Header Banner */}
                      <div className="relative px-5 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center p-2 shadow-md shrink-0`}>
                                  {activeItem.logo ? (
                                    <img src={activeItem.logo} alt={activeItem.company} className="w-full h-full object-contain opacity-90" />
                                  ) : (
                                    <span className="font-display font-bold text-lg text-slate-500">{activeItem.logoInitials}</span>
                                  )}
                              </div>
                              <div>
                                  <h2 className="text-lg md:text-xl font-display font-bold text-white tracking-tight leading-none">
                                    {activeItem.company}
                                  </h2>
                                  <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-slate-500">
                                     <span className="flex items-center gap-1">
                                        <MapPin size={10} /> {activeItem.location}
                                     </span>
                                  </div>
                              </div>
                          </div>
                          <div className={`hidden md:block text-3xl font-display font-bold opacity-[0.03] ${theme.accent} select-none`}>
                               {activeItem.logoInitials}
                          </div>
                      </div>

                      {/* Content Body */}
                      <div className="px-5 py-4 space-y-5 bg-gradient-to-b from-slate-900/0 to-slate-900/20 max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
                         {activeItem.positions.map((pos, idx) => (
                            <div key={idx} className="relative">
                               {/* Vertical line connecting positions */}
                               {idx !== activeItem.positions.length - 1 && (
                                  <div className="absolute left-[2px] top-7 bottom-[-20px] w-[1px] bg-slate-800/50" />
                               )}

                               <div className="mb-2">
                                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                     <h3 className="text-sm md:text-base font-bold text-white font-display">
                                       {pos.title}
                                     </h3>
                                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide ${theme.bg} ${theme.accent} border ${theme.border}`}>
                                        <Calendar size={9} />
                                        {pos.period}
                                     </span>
                                  </div>
                                  {pos.companyOverride && (
                                     <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 mb-1">
                                        <Briefcase size={10} />
                                        Deployed @ {pos.companyOverride}
                                     </div>
                                  )}
                               </div>

                               <div className="space-y-3 pl-1">
                                  {pos.content.map((block, bIdx) => (
                                     <div key={bIdx}>
                                        {block.category && (
                                           <h4 className="text-[9px] font-mono text-slate-500/80 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                              <Layers size={10} />
                                              {block.category}
                                           </h4>
                                        )}
                                        <ul className="space-y-1.5">
                                           {block.bullets.map((bullet, i) => (
                                              <li key={i} className="relative pl-3.5 text-xs md:text-sm text-slate-400 leading-relaxed">
                                                 <span className={`absolute left-0 top-[6px] w-1 h-1 rounded-full ${theme.bullet} opacity-70`} />
                                                 {bullet}
                                              </li>
                                           ))}
                                        </ul>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         ))}
                      </div>

                      {/* Footer */}
                      {activeItem.techStack && activeItem.techStack.length > 0 && (
                         <div className="bg-slate-950/30 border-t border-slate-800/50 px-5 py-3">
                            <div className="flex flex-wrap items-center gap-2">
                               <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mr-1">
                                  Tools ::
                               </span>
                               {activeItem.techStack.map((tech) => (
                                  <span 
                                     key={tech}
                                     className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800/60 hover:text-slate-200 transition-colors"
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
