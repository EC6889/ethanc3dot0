import React, { useState, useRef, useMemo } from 'react';
import { EXPERIENCE_DATA } from '../constants';
import { GlassCard } from './ui/GlassCard';
import {
  Folder,
  FolderOpen,
  FileText,
  Terminal,
  MapPin,
  Calendar,
  CheckCircle2,
  Cpu,
  Server,
  Activity,
  Database,
  Radio,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const Motion = motion as any;

// --- Helper Components (Reused/Adapted from Projects.tsx) ---

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
          layoutId="activeExperienceFile"
          className="absolute left-0 w-[2px] top-0 bottom-0 bg-brand-cyan shadow-[0_0_8px_#00f3ff]"
        />
      )}
    </button>
  );
};

const Experience: React.FC = () => {
  const [openCompanies, setOpenCompanies] = useState<Record<string, boolean>>({});
  // Default to first company, first position
  const [selectedPositionId, setSelectedPositionId] = useState<string>(`${EXPERIENCE_DATA[0].id}-0`);

  // Flatten positions for easier access
  const allPositions = useMemo(() => {
    return EXPERIENCE_DATA.flatMap((company) =>
      company.positions.map((pos, posIndex) => ({
        ...pos,
        companyId: company.id,
        companyName: pos.companyOverride || company.company,
        companyLocation: pos.locationOverride || company.location,
        companyLogo: company.logo,
        companyLocalLogo: pos.localLogoOverride || company.localLogo,
        companyTechStack: pos.techStackOverride || company.techStack,
        companyChannels: company.channels,
        uniqueId: `${company.id}-${posIndex}`,
        displayIdSuffix: pos.idSuffix || posIndex.toString(),
        isCurrent: pos.period.toLowerCase().includes('present') || pos.period.toLowerCase().includes('now'),
      }))
    );
  }, []);

  const activePosition = allPositions.find((p) => p.uniqueId === selectedPositionId) || allPositions[0];

  // Initialize folders as open
  useMemo(() => {
    const initialOpen: Record<string, boolean> = {};
    EXPERIENCE_DATA.forEach((c) => (initialOpen[c.id] = true));
    if (Object.keys(openCompanies).length === 0) setOpenCompanies(initialOpen);
  }, [openCompanies]);

  const toggleCompany = (companyId: string) => {
    setOpenCompanies((prev) => ({ ...prev, [companyId]: !prev[companyId] }));
  };

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [0, 1]),
    { stiffness: 100, damping: 25 }
  );

  return (
    <Motion.section
      id="experience"
      ref={containerRef}
      style={{ opacity: sectionOpacity }}
      className="relative overflow-hidden min-h-[600px] py-[min(12rem,15vh)]"
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />

        {/* Animated Floating Particles - Enhanced visibility & On Top */}
        <div className="absolute inset-0 z-[1]">
          {[...Array(50)].map((_, i) => (
            <Motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 3 === 0 ? '4px' : '3px',
                height: i % 3 === 0 ? '4px' : '3px',
                backgroundColor: i % 2 === 0 ? 'rgba(34, 211, 238, 0.9)' : 'rgba(96, 165, 250, 0.8)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: i % 3 === 0 ? '0 0 8px rgba(34, 211, 238, 0.6)' : '0 0 4px rgba(96, 165, 250, 0.4)',
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* TOP Gradient Transition */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-950 via-slate-950/90 to-transparent z-10"></div>

        {/* BOTTOM Gradient Transition */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-[min(3rem,6vw)] relative z-10">
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
                03. WORK_HISTORY
              </h2>
            </div>
            <h3 className="text-display-1xl font-display font-bold text-white tracking-tight mb-6">
              Career <span className="text-slate-500">Log</span>
            </h3>
            <p className="text-body-lg text-slate-300 font-light max-w-2xl leading-relaxed">
              A timeline of <span className="text-brand-cyan">strategic growth</span> and <span className="text-brand-purple">technical mastery</span>.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              Career Status
            </div>
            <div className="flex items-center justify-end gap-2 text-emerald-400 text-xs font-mono font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ACTIVE_PROGRESSION
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
                  <Terminal size={10} /> root/experience
                </span>
              </div>

              {/* File Tree */}
              <div className="p-2 overflow-y-auto flex-1 custom-scrollbar">
                <div className="text-[10px] font-mono text-slate-600 mb-2 px-2 uppercase tracking-wider">
                  Directory Listing
                </div>

                <div className="pb-2">
                  {EXPERIENCE_DATA.map((company) => (
                    <div key={company.id} className="mb-1">
                      <FileTreeItem
                        label={company.company.toUpperCase().replace(/\s/g, '_')}
                        type="folder"
                        isOpen={openCompanies[company.id]}
                        onClick={() => toggleCompany(company.id)}
                        isSelected={false}
                        depth={0}
                      />

                      <AnimatePresence>
                        {openCompanies[company.id] && (
                          <Motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col border-l border-slate-800/50 ml-[19px]">
                              {company.positions.map((pos, index) => {
                                const uniqueId = `${company.id}-${index}`;
                                return (
                                  <FileTreeItem
                                    key={uniqueId}
                                    label={`${pos.title.replace(/\s/g, '_')}.log`}
                                    type="file"
                                    isSelected={selectedPositionId === uniqueId}
                                    onClick={() => setSelectedPositionId(uniqueId)}
                                    depth={1}
                                  />
                                );
                              })}
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
                {allPositions.length} LOGS FOUND <br />
                LAST_UPDATE: {new Date().toLocaleDateString()}
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
                key={activePosition.uniqueId}
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
                    <div className="flex items-start justify-between gap-4 w-full">
                      <div className="flex items-center gap-4">
                        {/* Company Logo - Standardized Size */}
                        <Motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                          className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/95 p-2.5 flex items-center justify-center shadow-lg shadow-black/20 ring-1 ring-white/50 shrink-0"
                        >
                          <img
                            src={activePosition.companyLocalLogo || activePosition.companyLogo}
                            alt={activePosition.companyName}
                            className="w-full h-full object-contain"
                          />
                        </Motion.div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                              CAREER_LOG
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              ID: {activePosition.companyId.toUpperCase()}-{activePosition.displayIdSuffix}
                            </span>
                          </div>
                          <h2 className="text-lg md:text-xl font-display font-bold text-white tracking-tight">
                            {activePosition.title}
                          </h2>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-center gap-1 shrink-0 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <h3 className="text-sm md:text-base font-semibold text-slate-200 leading-tight">{activePosition.companyName}</h3>
                          {/* Status Badge */}
                          <span className={`shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${activePosition.isCurrent ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/50 text-slate-400 border-slate-700'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${activePosition.isCurrent ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                            {activePosition.isCurrent ? 'ACTIVE' : 'ARCHIVED'}
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-2.5 text-xs font-mono text-slate-400">
                          <div className="flex items-center gap-1">
                            <MapPin size={11} className="text-slate-500" />
                            <span>{activePosition.companyLocation}</span>
                          </div>
                          <span className="text-slate-600">•</span>
                          <span>{activePosition.period}</span>
                        </div>
                      </div>
                    </div>
                  </Motion.div>

                  <div className="flex-1 flex flex-col relative z-10">
                    {/* Main Content Area */}
                    <div className="flex-1 p-6 md:p-10 space-y-8">

                      {/* Mission Objective */}
                      <div>
                        <div className="flex items-center gap-2 mb-4 text-brand-purple">
                          <Activity size={16} />
                          <h4 className="text-xs font-mono font-bold tracking-wider uppercase">Key Responsibilities</h4>
                        </div>
                        <div className="space-y-6">
                          {activePosition.content.map((section, idx) => (
                            <div key={idx} className="relative pl-4 border-l border-slate-800">
                              <h5 className="text-sm font-bold text-slate-300 mb-2">{section.category}</h5>
                              <ul className="space-y-2">
                                {section.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="text-sm text-slate-400 leading-relaxed flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-cyan/50 shrink-0" />
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* System Configuration (Tech Stack) */}
                        {activePosition.companyTechStack && activePosition.companyTechStack.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4 text-brand-cyan">
                              <Cpu size={16} />
                              <h4 className="text-xs font-mono font-bold tracking-wider uppercase">Tag</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {activePosition.companyTechStack.map((tech, idx) => (
                                <div
                                  key={idx}
                                  className="px-3 py-1.5 rounded border border-slate-800 bg-slate-900/50 text-xs font-mono text-slate-300 flex items-center gap-2 hover:border-brand-cyan/30 hover:bg-slate-900/80 transition-all duration-300"
                                >
                                  <Server size={12} className="text-slate-500" />
                                  {tech}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Channels */}
                        {activePosition.companyChannels && activePosition.companyChannels.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4 text-emerald-400">
                              <Radio size={16} />
                              <h4 className="text-xs font-mono font-bold tracking-wider uppercase">Channels</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {activePosition.companyChannels.map((channel, idx) => (
                                <div
                                  key={idx}
                                  className="px-3 py-1.5 rounded border border-slate-800 bg-slate-900/50 text-xs font-mono text-slate-300 flex items-center gap-2 hover:border-emerald-500/30 hover:bg-slate-900/80 transition-all duration-300"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  {channel}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Motion.div>
            </AnimatePresence>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  );
};

export default Experience;
