
import React, { useRef, useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { PerspectiveGrid } from './ui/PerspectiveGrid';
import { DataPipeline } from './ui/DataPipeline';
import { Users, Cpu, TrendingUp, Globe, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Motion = motion as any;

// Sub-component for individual Module Cards to handle independent hover states and connections
const ModuleCard = ({ card, index }: { card: any, index: number }) => {
  const [isLit, setIsLit] = useState(false);
  const isEven = index % 2 === 0; // Left column on desktop
  
  // Calculate row delay for synchronized animation (Top row earlier, bottom row later)
  const rowDelay = Math.floor(index / 2) * 0.5; 

  // Dynamic color classes based on props
  const borderColor = card.color === 'cyan' ? 'group-hover:border-cyan-500/50' : 
                      card.color === 'blue' ? 'group-hover:border-blue-500/50' : 
                      'group-hover:border-purple-500/50';
  const textColor = card.color === 'cyan' ? 'group-hover:text-cyan-300' :
                    card.color === 'blue' ? 'group-hover:text-blue-300' :
                    'group-hover:text-purple-300';
  const busColor = card.color === 'cyan' ? 'bg-cyan-500' : 
                   card.color === 'blue' ? 'bg-blue-500' : 
                   'bg-purple-500';
  
  // Base Icon Style
  let iconStyle = card.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                  card.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-purple-500/10 text-purple-400 border-purple-500/20';

  if (isLit) {
    iconStyle = card.color === 'cyan' ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)] scale-110' :
                card.color === 'blue' ? 'bg-blue-500 text-white border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-110' :
                'bg-purple-500 text-white border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-110';
  }

  return (
    <Motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30, rotateY: isEven ? 10 : -10 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ 
          type: "spring", 
          stiffness: 60, 
          damping: 15, 
          delay: index * 0.1 
      }}
      viewport={{ once: false, margin: "-50px" }}
      onMouseEnter={() => setIsLit(true)}
      onMouseLeave={() => setIsLit(false)}
      className="cursor-default relative"
    >
        {/* === DESKTOP CONNECTORS (Center Spine) === */}
        <div className="hidden md:block">
            {/* Connector Line: Aligned to Icon Center (38px from top) */}
            {/* Line is 2px high, so top 37px centers it at 38px */}
            <div 
                className={`absolute top-[37px] h-[2px] bg-slate-800/80 overflow-hidden
                ${isEven ? 'right-[-48px] w-[48px]' : 'left-[-48px] w-[48px]'} 
                `}
            >
                {/* Animated Data Packet - Flows from Spine to Card */}
                <Motion.div 
                   className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-${card.color}-500 to-transparent opacity-60`}
                   initial={{ x: isEven ? '100%' : '-100%' }}
                   animate={{ x: isEven ? '-200%' : '200%' }}
                   transition={{
                       duration: 2,
                       repeat: Infinity,
                       ease: "easeInOut",
                       delay: rowDelay, // Sync with vertical flow
                       repeatDelay: 1
                   }}
                />
            </div>

            {/* Spine Junction Node (At the center line) */}
            {/* Node is 8px (h-2), Center should be 38px. Top = 34px */}
            <div 
                className={`absolute top-[34px] w-2 h-2 rounded-full bg-slate-950 border border-slate-700 z-10
                ${isEven ? 'right-[-52px]' : 'left-[-52px]'}
                `}
            >
                <div className={`w-full h-full rounded-full ${busColor} opacity-50 animate-ping`}></div>
            </div>

            {/* Card Input Node */}
            {/* Node is 6px (h-1.5), Center should be 38px. Top = 35px */}
            <div 
                className={`absolute top-[35px] w-1.5 h-1.5 rounded-full ${busColor} transition-all duration-300 z-10
                ${isEven ? 'right-[-3px]' : 'left-[-3px]'}
                ${isLit ? 'shadow-[0_0_10px_currentColor] scale-150' : 'opacity-50'}
                `}
            />
        </div>

        {/* === MOBILE CONNECTORS (Left Spine) === */}
        <div className="md:hidden">
             {/* Line Center 38px. Top 37px */}
             <div className="absolute left-[-24px] top-[37px] w-[24px] h-[2px] bg-slate-800/80 overflow-hidden">
                 <Motion.div 
                   className={`absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-${card.color}-500 to-transparent opacity-60`}
                   initial={{ x: '-100%' }}
                   animate={{ x: '200%' }}
                   transition={{
                       duration: 2,
                       repeat: Infinity,
                       ease: "easeInOut",
                       delay: index * 0.5,
                       repeatDelay: 1
                   }}
                />
             </div>
             {/* Card Input Node. Center 38px. h-1.5 (6px). Top 35px */}
             <div className={`absolute left-[-3px] top-[35px] w-1.5 h-1.5 rounded-full ${busColor} ${isLit ? 'scale-150 shadow-lg' : 'opacity-50'} transition-all`}></div>
             {/* Spine Junction Node. Center 38px. h-1.5 (6px). Top 35px */}
             <div className="absolute left-[-27px] top-[35px] w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-700"></div>
        </div>

        <div className="relative group h-full">
           {/* Glow Effect behind card */}
           <div className={`absolute inset-0 bg-${card.color}-500/${isLit ? '30' : '10'} blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none`}></div>
           
           <GlassCard 
               className={`h-full p-5 flex flex-col bg-[#0f172a] border-slate-800 ${borderColor} transition-all duration-300 hover:shadow-lg ${isLit ? 'border-' + card.color + '-500/50 translate-y-[-2px]' : ''}`}
               hoverEffect={false} 
           >
               <div className="flex justify-between items-start mb-5 border-b border-slate-800/50 pb-4">
                    {/* Icon Box - 18px icon + p-2 (8px*2) = 34px content + borders ~ 36px. Center approx 38px from card top */}
                    <div className={`p-2 rounded-sm border transition-all duration-300 ease-out ${iconStyle}`}>
                        <card.icon size={18} />
                    </div>
                    <div className="text-right">
                        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">SYS_ID</div>
                        <div className={`text-xs font-bold font-display text-${card.color}-500`}>MOD_0{index + 1}</div>
                    </div>
               </div>

               <div className="flex-grow">
                   <h3 className={`text-sm font-bold text-white font-display uppercase tracking-wider mb-3 ${textColor} transition-colors`}>
                       {card.title}
                   </h3>
                   <div className={`pl-3 border-l-2 border-slate-800 ${borderColor.replace('border', 'border-l')} transition-colors`}>
                       <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                           {card.desc}
                       </p>
                   </div>
               </div>

               <div className="mt-5 pt-3 border-t border-slate-800/50 flex items-center justify-between">
                    <span className={`text-[8px] font-mono text-slate-600 ${textColor.replace('text', 'text-opacity-70')} transition-colors`}>
                       STATUS: {isLit ? 'EXECUTING...' : 'ACTIVE'}
                    </span>
                    <div className="flex gap-0.5">
                        {[...Array(4)].map((_, i) => (
                            <div 
                               key={i} 
                               className={`w-1 h-1 rounded-full ${i < 3 || isLit ? `bg-${card.color}-500` : 'bg-slate-800'} ${isLit ? 'opacity-100 animate-pulse' : 'opacity-40 group-hover:opacity-100'} transition-opacity`}
                            ></div>
                        ))}
                    </div>
               </div>
           </GlassCard>
        </div>
    </Motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.95, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  
  const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });

  // Scanner Beam Effect
  const scanLineY = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const scanOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.5], [0, 1, 0]);

  const languages = [
    { name: 'English', code: 'EN_US', level: 'Native', score: 4, color: 'cyan' },
    { name: 'Cantonese', code: 'ZH_HK', level: 'Native', score: 4, color: 'cyan' },
    { name: 'Mandarin', code: 'ZH_CN', level: 'Intermediate', score: 3, color: 'blue' },
    { name: 'Bahasa', code: 'MS_MY', level: 'Intermediate', score: 2, color: 'blue' },
    { name: 'French', code: 'FR_FR', level: 'Beginner', score: 1, color: 'purple' },
  ];

  const modules = [
    { icon: Users, title: "Team Leadership", desc: "Managing multi-tier teams & driving stakeholder alignment.", color: "blue" },
    { icon: Cpu, title: "System Config", desc: "Setup & maintenance of Zendesk, Genesys & AI tools.", color: "cyan" },
    { icon: TrendingUp, title: "Process Opt.", desc: "Removing friction to improve SLA performance.", color: "purple" },
    { icon: Globe, title: "Omnichannel", desc: "Unified strategy across Voice, Chat, Email & Social.", color: "blue" }
  ];

  return (
    <Motion.section 
      id="about" 
      ref={containerRef}
      style={{ opacity, scale: smoothScale }}
      className="relative min-h-screen flex items-center py-32 md:py-48 overflow-hidden"
    >
      {/* === DYNAMIC BACKGROUND === */}
      <PerspectiveGrid />
      
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#020617] to-transparent z-10 pointer-events-none"></div>

      <Motion.div 
        style={{ top: scanLineY, opacity: scanOpacity }}
        className="absolute left-0 w-full h-px bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.5)] z-20 pointer-events-none"
      >
         <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-cyan-400 font-mono px-2 bg-[#020617]/50 backdrop-blur">
            SCANNING_SECTOR...
         </div>
      </Motion.div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-20 w-full">
        
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-cyan-500/50"></div>
                <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase">02. PROFILE_DATA</h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Profile</span>
            </h3>
        </Motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Text Content & Languages */}
          <div className="flex flex-col gap-12">
            <Motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               viewport={{ once: false, margin: "-100px" }}
               className="relative"
            >
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-transparent to-transparent"></div>
                <div className="pl-6">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6 leading-[1.4]">
                      Bridging <span className="text-cyan-400 border-b border-cyan-500/30 pb-1">Operations</span> <br />
                      with <span className="text-blue-500 border-b border-blue-500/30 pb-1">Technical Strategy</span>.
                    </h2>

                    <div className="space-y-6 text-sm md:text-base text-slate-400 leading-loose max-w-lg font-light">
                      <p>
                        I am a <strong className="text-white font-medium">CX Operations Manager with 15+ years of experience</strong> running contact centers in the Hospitality and Logistics sectors. My operational philosophy is simple: Identify the bottleneck, then engineer the solution.
                      </p>
                      <p>
                        Acting as the translator between support agents and technical teams, I specialize in configuring enterprise ecosystems (Zendesk, Salesforce, Genesys) to ensure tools serve the people, not the other way around.
                      </p>
                    </div>
                </div>
            </Motion.div>

            <div>
               <Motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="flex items-center justify-between border-b border-slate-800 pb-2 mb-6"
               >
                 <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <Terminal size={12} /> LINGUISTIC_MODULES
                 </h4>
                 <span className="text-[8px] font-mono text-slate-600 animate-pulse">ONLINE</span>
               </Motion.div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {languages.map((lang, index) => {
                    const isActiveColor = lang.color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_8px_cyan]' :
                                          lang.color === 'blue' ? 'bg-blue-500 shadow-[0_0_8px_blue]' :
                                          lang.color === 'purple' ? 'bg-purple-500 shadow-[0_0_8px_purple]' :
                                          'bg-slate-500';
                    
                    const textColor = lang.color === 'cyan' ? 'text-cyan-400' :
                                      lang.color === 'blue' ? 'text-blue-400' :
                                      lang.color === 'purple' ? 'text-purple-400' :
                                      'text-slate-400';

                    return (
                      <Motion.div 
                        key={lang.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (index * 0.1), duration: 0.4 }}
                        viewport={{ once: false, margin: "-50px" }}
                        className="group relative flex items-center justify-between p-3 bg-[#0f172a]/60 border border-slate-800/50 hover:border-cyan-500/30 transition-all overflow-hidden rounded-sm"
                      >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
                          <div className="flex items-center gap-4 relative z-10">
                             <span className="font-mono text-[9px] text-slate-600">0{index + 1}</span>
                             <div className="flex flex-col">
                                <span className="font-display font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{lang.name}</span>
                                <span className="font-mono text-[8px] text-slate-600 tracking-wider uppercase">[{lang.code}]</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 relative z-10">
                              <span className={`font-mono text-[9px] uppercase tracking-wider ${textColor} hidden sm:block`}>
                                {lang.level}
                              </span>
                              <div className="flex gap-1">
                                 {[1, 2, 3, 4].map((node) => (
                                    <Motion.div 
                                      key={node}
                                      className={`w-1 h-2 rounded-[1px] ${node <= lang.score ? isActiveColor : 'bg-slate-800'} transition-colors duration-300`} 
                                    />
                                 ))}
                              </div>
                          </div>
                      </Motion.div>
                    );
                  })}
               </div>
            </div>
          </div>

          {/* Right Column: System Modules Grid with Data Pipeline */}
          <div className="relative pl-6 md:pl-0 pb-24 md:pb-48">
            {/* Desktop Center Spine */}
            <DataPipeline className="absolute hidden md:flex left-1/2 -top-32 bottom-0 -translate-x-1/2 w-[2px] z-0" />
            
            {/* Mobile Left Spine */}
            <DataPipeline className="absolute md:hidden left-0 top-0 bottom-0 w-[2px] z-0" />
            
            {/* Increased gap-x to 24 (96px) to allow space for central connectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-24 perspective-1000 relative z-20">
                {modules.map((card, index) => (
                    <ModuleCard key={card.title} card={card} index={index} />
                ))}
            </div>
          </div>

        </div>
      </div>
    </Motion.section>
  );
};

export default About;
