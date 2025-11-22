
import React, { useEffect, useState, useRef } from 'react';
import { TECH_STACK } from '../constants';
import { GlassCard } from './ui/GlassCard';
import { TechLogo } from './ui/TechLogo';
import { Zap, Layers, Database, Cpu, Command, Workflow, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Motion = motion as any;

const Skills: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const containerRef = useRef<HTMLElement>(null);

  // Section Lifecycle Animation:
  // Controls the global Opacity/Scale of the entire section based on scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll range to opacity/scale
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  // Categorize Tech Stack for "Infrastructure Layer"
  const techCategories = [
    {
      id: 'core',
      label: 'Core Platforms',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      items: ['Zendesk', 'Salesforce', 'Genesys', 'Cisco UCCX']
    },
    {
      id: 'auto',
      label: 'Automation & API',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      items: ['Zapier', 'Webhook', 'REST API', 'Google Apps Script']
    },
    {
      id: 'data',
      label: 'Data & Analytics',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      items: ['Google Looker', 'Google Workspace']
    },
    {
      id: 'collab',
      label: 'Ecosystem',
      color: 'text-slate-400',
      bg: 'bg-slate-800/50',
      border: 'border-slate-700/50',
      items: ['Lark', 'Slack', 'SiteMinder', 'SISTIC']
    }
  ];

  // Concrete Competencies for "Functional Layer"
  const competencyModules = [
    {
      title: 'Strategic Operations',
      icon: <Command size={18} />,
      accent: 'cyan',
      skills: ['Journey Mapping', 'Voice of Customer (VoC)', 'Omnichannel Routing', 'Capacity Planning']
    },
    {
      title: 'Technical Config',
      icon: <Cpu size={18} />,
      accent: 'blue',
      skills: ['System Migration', 'Schema Design', 'API Integration', 'Access Governance']
    },
    {
      title: 'Process Engineering',
      icon: <Workflow size={18} />,
      accent: 'purple',
      skills: ['Workflow Automation', 'SOP Development', 'QA Frameworks', 'SLA Optimization']
    },
    {
      title: 'Resilience & Data',
      icon: <ShieldCheck size={18} />,
      accent: 'emerald',
      skills: ['Business Continuity', 'Crisis Response', 'Real-time Dashboards', 'Forecasting']
    }
  ];

  return (
    <Motion.section 
      id="skills" 
      ref={containerRef}
      style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
      className="relative overflow-hidden min-h-screen flex items-center py-48 md:py-96"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Section Header - Standardized */}
        <Motion.div 
          initial={{ opacity: 0, y: -50, scale: 1.2 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom "Slam" curve
          viewport={{ once: false, amount: 0.8 }}
          className="mb-14 md:mb-20"
        >
           <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">04. TOOLKIT</h2>
           <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Tools & Expertise</h3>
        </Motion.div>
        
        {/* Section Narrative - Fade In */}
        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.8 }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
            <div className="flex items-center gap-2 text-blue-400 mb-4">
                <Zap size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Practical Skills</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-6">
                From <span className="text-cyan-400">Team Management</span> to <br/>
                <span className="text-blue-500">System Configuration</span>.
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-loose">
                I manage both the people and the platforms they use. My proficiency spans the entire CX stack, ensuring that the operational tools (Left) actually help the team deliver results (Right).
            </p>
        </Motion.div>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: INFRASTRUCTURE LAYER (Tech Stack) */}
          <div className="md:col-span-5 flex flex-col gap-8">
             <Motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
                className="flex items-center justify-between border-b border-slate-800 pb-2"
             >
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Database size={14} /> Tech Stack
                </h4>
                <span className="text-[9px] font-mono text-slate-600">VERIFIED</span>
             </Motion.div>

             <div className="space-y-6">
                {techCategories.map((cat, index) => (
                   <Motion.div 
                      key={cat.id}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: false, margin: "-50px" }}
                   >
                      <h5 className={`text-[10px] font-bold font-mono uppercase tracking-wider mb-3 ${cat.color} flex items-center gap-2`}>
                         <span className={`w-1.5 h-1.5 rounded-sm ${cat.bg.replace('/10', '')}`}></span>
                         {cat.label}
                      </h5>
                      
                      <div className="grid grid-cols-5 gap-2">
                         {cat.items.map((itemName, i) => {
                            const tech = TECH_STACK.find(t => t.name === itemName);
                            if (!tech) return null;
                            return (
                               <Motion.div
                                  key={itemName}
                                  initial={{ scale: 0, opacity: 0, rotate: -90 }} // Mechanical "Lock-in" rotation
                                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                                  transition={{ 
                                    type: "spring", 
                                    stiffness: 300, // Snappy
                                    damping: 20, 
                                    delay: (index * 0.1) + (i * 0.05) 
                                  }}
                                  viewport={{ once: false }}
                               >
                                 <GlassCard className="p-1.5 aspect-square bg-[#0f172a]/80 hover:bg-slate-800/90 group transition-all cursor-default hover:border-slate-600 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                      <div className="w-9 h-9 relative flex items-center justify-center shrink-0">
                                          <TechLogo 
                                            name={tech.name} 
                                            logo={tech.logo} 
                                            localLogo={tech.localLogo}
                                            className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                                          />
                                      </div>
                                      <span className="text-[8px] font-mono text-slate-500 text-center leading-tight group-hover:text-white transition-colors w-full break-words">
                                        {tech.name}
                                      </span>
                                    </div>
                                 </GlassCard>
                               </Motion.div>
                            );
                         })}
                      </div>
                   </Motion.div>
                ))}
             </div>
          </div>

          {/* RIGHT COLUMN: FUNCTIONAL LAYER (Competencies) */}
          <div className="md:col-span-7 perspective-1000">
              <Motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5 }}
                 viewport={{ once: false }}
                 className="flex items-center justify-between border-b border-slate-800 pb-2 mb-8"
              >
                 <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} /> Core Skills
                 </h4>
                 <span className="text-[9px] font-mono text-slate-600">OPERATIONS</span>
              </Motion.div>

              <div className="grid sm:grid-cols-2 gap-5">
                 {competencyModules.map((mod, index) => {
                    const borderColor = mod.accent === 'cyan' ? 'group-hover:border-cyan-500/50' : 
                                      mod.accent === 'blue' ? 'group-hover:border-blue-500/50' :
                                      mod.accent === 'purple' ? 'group-hover:border-purple-500/50' : 
                                      'group-hover:border-emerald-500/50';
                    
                    const iconColor = mod.accent === 'cyan' ? 'text-cyan-400' : 
                                    mod.accent === 'blue' ? 'text-blue-400' :
                                    mod.accent === 'purple' ? 'text-purple-400' : 
                                    'text-emerald-400';

                    return (
                        <Motion.div
                           key={mod.title}
                           initial={{ opacity: 0, x: 100, rotateY: 45, scale: 0.9 }} // 3D Fly-in "Swing"
                           whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                           transition={{ 
                             type: "spring", 
                             stiffness: 100, 
                             damping: 12, // Bouncy arrival
                             delay: index * 0.15 
                           }}
                           viewport={{ once: false, margin: "-50px" }}
                        >
                           <GlassCard className={`h-full p-6 bg-[#0f172a]/80 ${borderColor} transition-colors group hover:-translate-y-1 hover:shadow-[0_5px_30px_rgba(0,0,0,0.5)]`}>
                               <div className="flex items-start gap-4 mb-6">
                                   <div className={`p-2.5 rounded bg-slate-900 border border-slate-800 ${iconColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                       {mod.icon}
                                   </div>
                                   <div>
                                       <h4 className="text-sm font-bold text-white font-display tracking-wide">{mod.title}</h4>
                                       <div className={`h-0.5 w-8 mt-2 bg-${mod.accent}-500/50 rounded-full group-hover:w-full transition-all duration-500`}></div>
                                   </div>
                               </div>

                               <ul className="space-y-3">
                                   {mod.skills.map((skill, i) => (
                                       <Motion.li 
                                          key={skill} 
                                          initial={{ opacity: 0, x: 10 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 0.4 + (index * 0.1) + (i * 0.05) }}
                                          className="text-xs text-slate-400 font-mono flex items-center gap-2.5 group/item"
                                       >
                                           <span className={`w-1 h-1 rounded-full bg-slate-600 group-hover/item:bg-${mod.accent}-400 transition-colors group-hover/item:scale-150`}></span>
                                           <span className="group-hover/item:text-slate-200 transition-colors">{skill}</span>
                                       </Motion.li>
                                   ))}
                               </ul>
                           </GlassCard>
                        </Motion.div>
                    );
                 })}
              </div>
          </div>

        </div>
      </div>
    </Motion.section>
  );
};

export default Skills;
