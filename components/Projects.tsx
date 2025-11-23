import React, { useState, useRef, useMemo } from 'react';
import { PROJECTS_DATA, TECH_STACK } from '../constants';
import { GlassCard } from './ui/GlassCard';
import { TechLogo } from './ui/TechLogo';
import {
  Folder,
  FolderOpen,
  FileText,
  Terminal,
  ChevronRight,
  ChevronDown,
  Cpu,
  Activity,
  CheckCircle2,
  Database,
  Server,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const Motion = motion as any;

// --- Helper Components ---

const FileTreeItem: React.FC<{
  label: string;
  isOpen?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  type?: 'folder' | 'file';
  depth?: number;
}> = ({ label, isOpen, isSelected, onClick, type = 'folder', depth = 0 }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 py-2 px-3 rounded-sm transition-all duration-200 group relative
        ${isSelected
          ? 'bg-brand-cyan/10 text-brand-cyan'
          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
        }
      `}
      style={{ paddingLeft: `${depth * 16 + 12}px` }}
    >
      {/* Tree Line Guide */}
      {depth > 0 && <div className="absolute left-[18px] top-0 bottom-0 w-px bg-slate-800/50" />}

      {/* Icon */}
      <div
        className={`shrink-0 relative z-10 ${isSelected ? 'text-brand-cyan' : 'text-slate-600 group-hover:text-slate-400'}`}
      >
        {type === 'folder' ? (
          isOpen ? (
            <FolderOpen size={14} />
          ) : (
            <Folder size={14} />
          )
        ) : (
          <FileText size={14} />
        )}
      </div>

      {/* Label */}
      <span className={`text-xs font-mono truncate relative z-10 ${isSelected ? 'font-bold' : ''}`}>
        {label}
      </span>

      {/* Active Indicator */}
      {isSelected && (
        <Motion.div
          layoutId="activeFile"
          className="absolute left-0 w-[2px] top-0 bottom-0 bg-brand-cyan shadow-[0_0_8px_#00f3ff]"
        />
      )}
    </button>
  );
};

const Projects: React.FC = () => {
  const [openCompanies, setOpenCompanies] = useState<Record<string, boolean>>({});
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS_DATA[0].id);

  // Group projects by company
  const projectTree = useMemo(() => {
    const tree: Record<string, typeof PROJECTS_DATA> = {};
    PROJECTS_DATA.forEach((p) => {
      if (!tree[p.company]) tree[p.company] = [];
      tree[p.company].push(p);
    });
    // Initialize all folders as open
    const initialOpen: Record<string, boolean> = {};
    Object.keys(tree).forEach((c) => (initialOpen[c] = true));
    if (Object.keys(openCompanies).length === 0) setOpenCompanies(initialOpen);

    return tree;
  }, []);

  const activeProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];

  const toggleCompany = (company: string) => {
    setOpenCompanies((prev) => ({ ...prev, [company]: !prev[company] }));
  };

  // Find Tech Stack Logos for active project
  const activeTechStack = useMemo(() => {
    return activeProject.tech.map((techName) => {
      // Fuzzy match or direct match with TECH_STACK constants
      const found = TECH_STACK.find(
        (t) =>
          t.name.toLowerCase() === techName.toLowerCase() ||
          t.name.toLowerCase().includes(techName.toLowerCase())
      );
      return { name: techName, logo: found?.logo, localLogo: found?.localLogo };
    });
  }, [activeProject]);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Section-level fade in (subtle, just for overall visibility)
  const sectionOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0, 1]),
    { stiffness: 100, damping: 25 }
  );

  return (
    <Motion.section
      id="projects"
      ref={containerRef}
      style={{ opacity: sectionOpacity }}
      className="bg-[#030712] relative border-t border-slate-900 overflow-hidden min-h-[600px] py-32 md:py-48"
    >
      {/* === BACKGROUND: Blueprint Grid === */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header - Fades in first */}
        <Motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-cyan/50"></div>
              <h2 className="text-[10px] font-mono text-brand-cyan tracking-[0.2em] uppercase">
                05. ARCHIVE
              </h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Project <span className="text-slate-500">Highlight</span>
            </h3>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              System Status
            </div>
            <div className="flex items-center justify-end gap-2 text-emerald-400 text-xs font-mono font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ALL_SYSTEMS_OPTIMAL
            </div>
          </div>
        </Motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch min-h-[600px]">
          {/* LEFT COLUMN: File Directory - Slides in from left */}
          <Motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 flex flex-col"
          >
            <div className="bg-slate-950/50 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full backdrop-blur-sm">
              {/* Terminal Header */}
              <div className="h-9 bg-slate-900 border-b border-slate-800 flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 ml-2 flex items-center gap-1">
                  <Terminal size={10} /> root/projects
                </span>
              </div>

              {/* File Tree */}
              <div className="p-2 overflow-y-auto flex-1 custom-scrollbar">
                <div className="text-[10px] font-mono text-slate-600 mb-2 px-2 uppercase tracking-wider">
                  Directory Listing
                </div>

                <div className="pb-2">
                  {Object.entries(projectTree).map(([company, projects]) => (
                    <div key={company} className="mb-1">
                      <FileTreeItem
                        label={company.toUpperCase().replace(/\s/g, '_')}
                        type="folder"
                        isOpen={openCompanies[company]}
                        onClick={() => toggleCompany(company)}
                        isSelected={false}
                        depth={0}
                      />

                      <AnimatePresence>
                        {openCompanies[company] && (
                          <Motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col border-l border-slate-800/50 ml-[19px]">
                              {(projects as typeof PROJECTS_DATA).map((project) => (
                                <FileTreeItem
                                  key={project.id}
                                  label={`${project.title.replace(/\s/g, '_')}.log`}
                                  type="file"
                                  isSelected={selectedProjectId === project.id}
                                  onClick={() => setSelectedProjectId(project.id)}
                                  depth={1}
                                />
                              ))}
                            </div>
                          </Motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Info */}
              <div className="p-3 border-t border-slate-800 bg-slate-900/30 text-[9px] font-mono text-slate-500">
                {Object.values(projectTree).flat().length} FILES FOUND <br />
                LAST_INDEX: {new Date().toLocaleDateString()}
              </div>
            </div>
          </Motion.div>


          {/* RIGHT COLUMN: Mission Log Display - Flies in from right */}
          <Motion.div
            initial={{ opacity: 0, x: 100, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: 100, rotateY: 5 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.5 }
            }}
            className="lg:col-span-9"
          >
            <AnimatePresence mode="wait">
              <Motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full"
              >
                <GlassCard className="h-full p-0 border-slate-800 bg-[#0f172a]/80 relative overflow-hidden flex flex-col group hover:border-brand-cyan/30 transition-colors duration-500">
                  {/* Header Bar - Cascades in */}
                  <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="px-6 md:px-10 py-6 border-b border-slate-800/50 bg-slate-950/30 flex flex-col md:flex-row justify-between gap-4 relative z-10"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded bg-brand-cyan-deep/10 border border-brand-cyan-deep/30 text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-wider">
                          {activeProject.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          ID: {activeProject.id.toUpperCase()}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                        {activeProject.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-slate-300">
                          {activeProject.company}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {activeProject.period}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/80 border border-slate-700/50 shadow-inner">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]"></div>
                        <span className="text-[10px] font-mono font-bold text-emerald-500/90 uppercase tracking-widest">
                          Status: Deployed
                        </span>
                      </div>
                    </div>
                  </Motion.div>

                  {/* Body Content - Cascades in after header */}
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="p-6 md:p-10 grid md:grid-cols-3 gap-10 flex-grow relative z-10"
                  >
                    {/* Main Description & Stack */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Activity size={14} /> Mission Objective
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed font-light border-l-2 border-slate-800 pl-4">
                          {activeProject.description}
                        </p>
                      </div>

                      {/* Tech Stack Visualization */}
                      <div>
                        <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Cpu size={14} /> System Configuration
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {activeTechStack.map((tech, idx) => (
                            <Motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                              className="group/tech relative"
                            >
                              <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center gap-2 hover:border-brand-cyan/30 transition-colors">
                                <div className="w-4 h-4 relative">
                                  {tech.logo || tech.localLogo ? (
                                    <TechLogo
                                      name={tech.name}
                                      logo={tech.logo || ''}
                                      localLogo={tech.localLogo || ''}
                                      className="w-full h-full object-contain opacity-70 group-hover/tech:opacity-100 grayscale group-hover/tech:grayscale-0 transition-all"
                                    />
                                  ) : (
                                    <Server size={14} className="text-slate-500" />
                                  )}
                                </div>
                                <span className="text-[10px] font-mono text-slate-400 group-hover/tech:text-brand-cyan transition-colors">
                                  {tech.name}
                                </span>
                              </div>
                            </Motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metrics Dashboard */}
                    <div className="md:col-span-1 bg-slate-950/50 rounded border border-slate-800 p-5 flex flex-col gap-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.05),transparent_50%)] pointer-events-none"></div>

                      <h4 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Database size={14} /> Impact Analysis
                      </h4>

                      <div className="space-y-4">
                        {activeProject.metrics.map((metric, i) => (
                          <div key={`${activeProject.id}-metric-${i}`} className="relative">
                            <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-wider">
                              Metric 0{i + 1}
                            </div>
                            <Motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + i * 0.2, type: 'spring' }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-emerald-500 shrink-0 mt-0.5"
                              />
                              <span className="text-sm font-bold text-white leading-tight">
                                {metric}
                              </span>
                            </Motion.div>
                            {/* Animated Line */}
                            <Motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
                              className="h-px bg-gradient-to-r from-emerald-500/50 to-transparent mt-3"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-800">
                        <div className="flex justify-between items-center text-[9px] font-mono text-slate-600">
                          <span>VALIDATION:</span>
                          <span className="text-emerald-500">CONFIRMED</span>
                        </div>
                      </div>
                    </div>
                  </Motion.div>
                </GlassCard>
              </Motion.div>
            </AnimatePresence>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  );
};

export default Projects;
