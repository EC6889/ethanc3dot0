
import React, { useState, useRef } from 'react';
import { PROJECTS_DATA } from '../constants';
import { GlassCard } from './ui/GlassCard';
import { Zap, MapPin, Calendar, FolderOpen, FileCode, Layers, ChevronRight, MousePointerClick } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const Motion = motion as any;

const Projects: React.FC = () => {
  const companies = Array.from(new Set(PROJECTS_DATA.map(p => p.company)));
  
  const [selectedCompany, setSelectedCompany] = useState<string>(companies[0]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Derived state
  const companyProjects = PROJECTS_DATA.filter(p => p.company === selectedCompany);
  const activeProject = selectedProjectId 
    ? companyProjects.find(p => p.id === selectedProjectId) || companyProjects[0]
    : companyProjects[0];

  // Dynamic Color Selection based on Project Index for variety
  // Maps index 0->Cyan, 1->Blue, 2->Purple loop
  const getProjectColor = (id: string) => {
      const index = PROJECTS_DATA.findIndex(p => p.id === id);
      const colors = ['cyan', 'blue', 'purple'];
      return colors[index % colors.length] || 'cyan';
  };

  const activeColor = getProjectColor(activeProject.id);

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
    setSelectedProjectId(null); // Reset to first project of new company
  };

  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const KEYPOINTS = [0, 0.3, 0.8, 1];
  const opacity = useTransform(scrollYProgress, KEYPOINTS, [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, KEYPOINTS, [0.9, 1, 1, 0.95]);
  const leftColX = useTransform(scrollYProgress, KEYPOINTS, [-150, 0, 0, -150]);
  const rightColX = useTransform(scrollYProgress, KEYPOINTS, [150, 0, 0, 150]);
  const blurEffect = useTransform(scrollYProgress, KEYPOINTS, ["10px", "0px", "0px", "10px"]);

  const springConfig = { stiffness: 40, damping: 15, mass: 1.2 };
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothLeft = useSpring(leftColX, springConfig);
  const smoothRight = useSpring(rightColX, springConfig);
  const smoothBlur = useSpring(blurEffect, springConfig);

  return (
    <Motion.section 
      id="projects" 
      ref={containerRef}
      style={{ opacity: smoothOpacity, scale: smoothScale }}
      className="bg-slate-950 relative border-t border-slate-900 overflow-hidden min-h-screen py-48 md:py-96"
    >
       <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <Motion.div 
           style={{ y: useTransform(scrollYProgress, [0, 0.3], [50, 0]) }}
           className="mb-14 md:mb-20"
        >
           <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">05. CASE_STUDIES</h2>
           <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">Key Projects</h3>
        </Motion.div>

        {/* Intro Description */}
        <Motion.div 
           style={{ opacity: smoothOpacity }}
           className="mb-12 max-w-3xl"
        >
           <p className="text-slate-400 text-sm md:text-base leading-loose">
              Solving specific operational problems with better processes and automation. Below is a selection of key initiatives where I leveraged <span className="text-white font-bold">technology and process re-engineering</span> to deliver measurable improvements.
           </p>
        </Motion.div>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-start">
           
           {/* LEFT COLUMN: Directory */}
           <Motion.div 
              style={{ x: smoothLeft, filter: smoothBlur }}
              className="md:col-span-4 lg:col-span-3 relative"
           >
              {/* Sticky wrapper */}
              <div className="sticky top-32">
                 <h4 className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2 pl-1">
                    <FolderOpen size={12} /> Project List
                 </h4>
                 
                 <div className="space-y-2">
                   {companies.map((company, index) => {
                     const companyInfo = PROJECTS_DATA.find(p => p.company === company);
                     const isSelected = selectedCompany === company;
                     return (
                       <button
                         key={company}
                         onClick={() => handleCompanyChange(company)}
                         className={`
                           w-full text-left p-4 rounded border transition-all duration-300 group relative overflow-hidden
                           ${isSelected 
                             ? 'bg-slate-900/80 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                             : 'bg-slate-900/20 border-slate-800/50 text-slate-400 hover:border-slate-700'}
                         `}
                       >
                         {/* Bottom Line Animation - Consistent with Resume CTA */}
                         {!isSelected && (
                            <>
                               <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                               <div className="absolute inset-0 bg-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </>
                         )}

                         {isSelected && (
                            <Motion.div 
                              layoutId="activeIndicator"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_cyan] z-20"
                            />
                         )}

                         <div className="relative z-10 pl-3">
                           <span className={`font-display font-bold text-xs uppercase tracking-wider block mb-2 ${isSelected ? 'text-cyan-100' : 'group-hover:text-slate-200'}`}>
                              {company}
                           </span>
                           
                           <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                                 <MapPin size={10} className={isSelected ? 'text-cyan-500' : ''} />
                                 {companyInfo?.location}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                                 <Calendar size={10} className={isSelected ? 'text-cyan-500' : ''} />
                                 {companyInfo?.period}
                              </div>
                           </div>
                         </div>
                       </button>
                     );
                   })}
                 </div>
              </div>
           </Motion.div>

           {/* RIGHT COLUMN: Viewer */}
           <Motion.div 
              style={{ x: smoothRight, filter: smoothBlur }}
              className="md:col-span-8 lg:col-span-9 flex flex-col"
           >
              
              {/* Project Tabs */}
              <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3 pl-1">
                      <MousePointerClick size={12} className={`text-${activeColor}-500 animate-bounce`} />
                      <h4 className={`text-[10px] font-mono text-${activeColor}-500 uppercase tracking-widest`}>Select Project:</h4>
                  </div>

                  <div className="flex flex-wrap gap-3">
                      {companyProjects.map((project, index) => {
                          const isActive = activeProject.id === project.id;
                          const pColor = getProjectColor(project.id);
                          return (
                              <Motion.button
                                  key={project.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.1 + (index * 0.05) }}
                                  onClick={() => setSelectedProjectId(project.id)}
                                  className={`
                                      flex items-center gap-4 px-5 py-4 rounded border transition-all duration-300 group relative overflow-hidden flex-1 md:flex-none min-w-[160px]
                                      ${isActive 
                                          ? `bg-${pColor}-500/10 border-${pColor}-500 text-white shadow-[0_0_20px_rgba(0,0,0,0.3)]` 
                                          : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'}
                                  `}
                              >
                                  {/* Bottom Line Animation */}
                                  {!isActive && (
                                     <>
                                        <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-${pColor}-500 to-white w-0 group-hover:w-full transition-all duration-500 ease-out`}></div>
                                        <div className={`absolute inset-0 bg-${pColor}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                     </>
                                  )}

                                  {/* Active Indicator Dot */}
                                  <div className={`w-2 h-2 rounded-full transition-colors shrink-0 relative z-10 ${isActive ? `bg-${pColor}-400 shadow-[0_0_5px_${pColor}] animate-pulse` : 'bg-slate-700 group-hover:bg-slate-600'}`}></div>
                                  
                                  <div className="flex flex-col items-start text-left relative z-10">
                                      <span className={`text-[9px] font-mono uppercase tracking-widest mb-1 ${isActive ? `text-${pColor}-300` : 'opacity-60'}`}>
                                        CASE_{String(index + 1).padStart(2, '0')}
                                      </span>
                                      <span className={`text-xs font-bold font-display tracking-wide ${isActive ? 'text-white' : ''}`}>
                                        {project.title}
                                      </span>
                                  </div>
                              </Motion.button>
                          );
                      })}
                  </div>
              </div>

              {/* Active Project Card */}
              <div className="relative">
                 <AnimatePresence mode='wait'>
                     <Motion.div
                       key={activeProject.id}
                       initial={{ opacity: 0, x: 50, filter: "blur(5px)" }}
                       animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                       exit={{ opacity: 0, x: -50, filter: "blur(5px)" }}
                       transition={{ duration: 0.3, ease: "easeOut" }}
                     >
                       <GlassCard className={`group p-0 overflow-hidden border-slate-800 bg-slate-900/40 flex flex-col shadow-2xl hover:border-${activeColor}-500/30 transition-colors duration-500`}>
                          
                          {/* Card Header */}
                          <div className="px-6 py-5 border-b border-slate-800/50 bg-slate-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                             <div className="flex items-center gap-4">
                                <div className={`p-2.5 rounded bg-${activeColor}-500/10 text-${activeColor}-400 border border-${activeColor}-500/20 shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.15)]`}>
                                   <FileCode size={20} />
                                </div>
                                <div>
                                   <h4 className="text-lg md:text-xl font-bold text-white font-display tracking-tight">
                                     {activeProject.title}
                                   </h4>
                                   <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                                        ID: {activeProject.id.toUpperCase()}
                                      </span>
                                      <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                      <span className={`text-[9px] font-mono text-${activeColor}-400 uppercase tracking-widest`}>
                                        {activeProject.category}
                                      </span>
                                   </div>
                                </div>
                             </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-6 md:p-8 flex flex-col gap-8">
                             <div className="grid lg:grid-cols-3 gap-8">
                                 {/* Operational Scope */}
                                 <div className="lg:col-span-2 space-y-3">
                                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                      <Layers size={12} /> Scope of Work
                                    </h5>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                      {activeProject.description}
                                    </p>
                                 </div>

                                 {/* Performance Delta (Metrics) */}
                                 <div className="lg:col-span-1">
                                    <div className={`bg-slate-950/50 rounded border border-slate-800/50 p-5 h-full hover:border-${activeColor}-500/30 transition-colors`}>
                                        <h5 className={`text-[10px] font-bold text-${activeColor}-500 uppercase tracking-widest mb-4 flex items-center gap-2`}>
                                           <Zap size={12} /> Results
                                        </h5>
                                        <ul className="space-y-3">
                                           {activeProject.metrics.map((metric, i) => (
                                             <li key={i} className="text-xs text-slate-200 flex items-start gap-3 font-mono group/metric">
                                                <ChevronRight size={12} className={`mt-0.5 text-${activeColor}-500/50 group-hover/metric:text-${activeColor}-400 transition-colors`} />
                                                {metric}
                                             </li>
                                           ))}
                                        </ul>
                                    </div>
                                 </div>
                             </div>
                          </div>
                       </GlassCard>
                     </Motion.div>
                 </AnimatePresence>
              </div>
           </Motion.div>
        </div>
       </div>
    </Motion.section>
  );
};

export default Projects;
