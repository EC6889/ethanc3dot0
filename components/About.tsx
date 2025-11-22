
import React, { useRef } from 'react';
import { GlassCard } from './ui/GlassCard';
import { Users, Cpu, TrendingUp, Globe, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Motion = motion as any;

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Extended Scroll Offset for "Distance" Effect on the CONTAINER ONLY
  // We keep the global container fade/scale logic but decouple the inner content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // ANIMATION PHASES for Container Background/Structure
  const PHASE_ENTRY = 0.3;
  const PHASE_EXIT = 0.7;

  // Section Container Physics (Zoom & Fade)
  const scale = useTransform(scrollYProgress, [0, PHASE_ENTRY, PHASE_EXIT, 1], [0.85, 1, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, PHASE_ENTRY, PHASE_EXIT, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, PHASE_ENTRY, PHASE_EXIT, 1], ["10px", "0px", "0px", "10px"]);

  const springConfig = { stiffness: 50, damping: 20 };
  const smoothScale = useSpring(scale, springConfig);

  const languages = [
    { name: 'English', code: 'EN_US', level: 'Native', score: 4, color: 'cyan' },
    { name: 'Cantonese', code: 'ZH_HK', level: 'Native', score: 4, color: 'cyan' },
    { name: 'Mandarin', code: 'ZH_CN', level: 'Intermediate', score: 3, color: 'blue' },
    { name: 'Bahasa', code: 'MS_MY', level: 'Intermediate', score: 2, color: 'purple' },
    { name: 'French', code: 'FR_FR', level: 'Beginner', score: 1, color: 'slate' },
  ];

  return (
    <Motion.section 
      id="about" 
      ref={containerRef}
      style={{ opacity, scale: smoothScale, filter: blur }}
      className="relative min-h-screen flex items-center py-48 md:py-96 overflow-hidden"
    >
      {/* Content Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Section Header */}
        <Motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [50, 0]) }}
          className="mb-14 md:mb-20"
        >
            <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">02. PROFILE</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Professional Profile</h3>
        </Motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content & Languages */}
          <div className="flex flex-col gap-12">
            
            {/* Intro Block */}
            <Motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               viewport={{ once: false, margin: "-100px" }}
            >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 leading-[1.3]">
                  Connecting Daily Operations <br />
                  with <span className="text-cyan-400">Technical Solutions</span>.
                </h2>

                <div className="space-y-6 text-sm md:text-base text-slate-400 leading-loose max-w-lg">
                  <p>
                    I am a <strong className="text-white">Hands-on CX Operations Manager with 15+ years of experience</strong> running contact centers in the Hospitality and Logistics sectors. My approach is straightforward: I find out what is slowing the team down, and I fix it using better processes or automation.
                  </p>
                  <p>
                    I act as the bridge between the support team and the technical department. I specialize in configuring enterprise tools (Zendesk, Genesys, Salesforce) so they actually work for the agents using them, ultimately driving cost efficiency and smoother operations.
                  </p>
                </div>
            </Motion.div>

            {/* Language Block - "Server Status" Redesign */}
            <div>
               <Motion.h4 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-2"
               >
                 <Terminal size={10} />
                 LANGUAGES
               </Motion.h4>

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
                        className="group relative flex items-center justify-between p-3 bg-slate-900/40 border-l-2 border-slate-800 hover:border-l-cyan-400 transition-all overflow-hidden"
                      >
                          {/* Scanline Hover Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
                          <div className="absolute inset-0 bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                          <div className="flex items-center gap-4 relative z-10">
                             <span className="font-mono text-[9px] text-slate-600">0{index + 1}</span>
                             <div className="flex flex-col">
                                <span className="font-display font-bold text-slate-200 text-sm group-hover:text-white transition-colors">{lang.name}</span>
                                <span className="font-mono text-[8px] text-slate-600 tracking-wider uppercase">[{lang.code}]</span>
                             </div>
                          </div>

                          <div className="flex items-center gap-4 relative z-10">
                              <span className={`font-mono text-[9px] uppercase tracking-wider ${textColor}`}>
                                {lang.level}
                              </span>
                              
                              {/* LED Signal Nodes */}
                              <div className="flex gap-1.5">
                                 {[1, 2, 3, 4].map((node) => (
                                    <Motion.div 
                                      key={node}
                                      initial={{ scale: 0 }}
                                      whileInView={{ scale: 1 }}
                                      transition={{ 
                                          delay: 0.4 + (index * 0.1) + (node * 0.1), 
                                          type: "spring", stiffness: 300, damping: 20 
                                      }}
                                      className={`w-1.5 h-1.5 rounded-full ${node <= lang.score ? isActiveColor : 'bg-slate-800'} transition-all duration-300`} 
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

          {/* Right Column: Cards Grid - Active 3D Fly-Ins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 perspective-1000">
            {[
              { icon: Users, title: "Team Leadership", desc: "Managing multi-tier teams & driving stakeholder alignment.", color: "blue" },
              { icon: Cpu, title: "System Configuration", desc: "Setup & maintenance of Zendesk, Genesys & AI tools.", color: "cyan" },
              { icon: TrendingUp, title: "Process Optimization", desc: "Removing friction to improve SLA performance.", color: "purple" },
              { icon: Globe, title: "Omnichannel Ops", desc: "Unified strategy across Voice, Chat, Email & Social.", color: "emerald" }
            ].map((card, index) => (
                 <Motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 50, y: 50, rotateX: -20, scale: 0.9 }} // Diagonal 3D Start
                    whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, scale: 1 }} // Snap to place
                    transition={{ 
                        type: "spring", 
                        stiffness: 80, 
                        damping: 15, 
                        delay: index * 0.15 // Staggered
                    }}
                    viewport={{ once: false, margin: "-100px" }}
                 >
                     <GlassCard className="p-6 flex flex-col justify-start group bg-[#0f172a]/60 h-full min-h-[180px]" hoverEffect>
                        <div className={`w-10 h-10 rounded-lg bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300 border border-${card.color}-500/20`}>
                          <card.icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </GlassCard>
                 </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </Motion.section>
  );
};

export default About;
