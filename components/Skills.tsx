import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TECH_STACK } from '../constants';
import { GlassCard } from './ui/GlassCard';
import { TechLogo } from './ui/TechLogo';
import { Layers, Database, Cpu, Command, Workflow, ShieldCheck, Code } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// Define relationships between specific tools (Left) and skills (Right)
const RELATIONSHIPS: Record<string, string[]> = {
  // Tech Name (Must match TECH_STACK names exactly) : [Skill Keywords]
  Zendesk: ['Omnichannel Routing', 'SOP Development', 'Journey Mapping'],
  Salesforce: ['Journey Mapping', 'Real-time Dashboards', 'Access Governance'],
  Genesys: ['Omnichannel Routing', 'Capacity Planning', 'Voice of Customer (VoC)'],
  'Cisco UCCX': ['Capacity Planning', 'Voice of Customer (VoC)'],
  Zapier: ['Workflow Automation', 'API Integration'],
  Webhook: ['API Integration', 'System Migration'],
  'REST API': ['API Integration', 'System Migration', 'Schema Design'],
  'Google Apps Script': ['Workflow Automation', 'SOP Development'],
  'Google Looker': ['Real-time Dashboards', 'Forecasting'],
  'Google Workspace': ['SOP Development', 'Access Governance'],
  Lark: ['Workflow Automation', 'Crisis Response'],
  Slack: ['Crisis Response', 'Business Continuity'],
  SiteMinder: ['Schema Design', 'API Integration'],
  SISTIC: ['Capacity Planning'],
};

const Skills: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerRef = useRef<HTMLElement>(null);
  const techRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const moduleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rafRef = useRef<number | null>(null);

  const [activeHighlight, setActiveHighlight] = useState<{
    type: 'tech' | 'module';
    id: string; // Name of the tech or the module title
    related: string[]; // List of related IDs (tech names or module titles)
  } | null>(null);

  const [lines, setLines] = useState<
    {
      id: string;
      d: string;
      startColor: string;
      endColor: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }[]
  >([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  // --- Data Definitions ---

  const techCategories = [
    {
      id: 'core',
      label: 'Core Platforms',
      color: 'text-brand-cyan',
      bg: 'bg-brand-cyan/10',
      border: 'border-brand-cyan/20',
      items: ['Zendesk', 'Salesforce', 'Genesys', 'Cisco UCCX'],
    },
    {
      id: 'auto',
      label: 'Automation & API',
      color: 'text-brand-blue',
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue/20',
      items: ['Zapier', 'Webhook', 'REST API', 'Google Apps Script'],
    },
    {
      id: 'data',
      label: 'Data & Analytics',
      color: 'text-brand-purple',
      bg: 'bg-brand-purple/10',
      border: 'border-brand-purple/20',
      items: ['Google Looker', 'Google Workspace'],
    },
    {
      id: 'collab',
      label: 'Ecosystem',
      color: 'text-brand-blue',
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue/20',
      items: ['Lark', 'Slack', 'SiteMinder', 'SISTIC'],
    },
  ];

  const competencyModules = [
    {
      title: 'Strategic Operations',
      icon: <Command size={18} />,
      accent: 'cyan',
      skills: [
        'Journey Mapping',
        'Voice of Customer (VoC)',
        'Omnichannel Routing',
        'Capacity Planning',
      ],
    },
    {
      title: 'Technical Config',
      icon: <Cpu size={18} />,
      accent: 'blue',
      skills: ['System Migration', 'Schema Design', 'API Integration', 'Access Governance'],
    },
    {
      title: 'Process Engineering',
      icon: <Workflow size={18} />,
      accent: 'purple',
      skills: ['Workflow Automation', 'SOP Development', 'QA Frameworks', 'SLA Optimization'],
    },
    {
      title: 'Resilience & Data',
      icon: <ShieldCheck size={18} />,
      accent: 'purple',
      skills: ['Business Continuity', 'Crisis Response', 'Real-time Dashboards', 'Forecasting'],
    },
  ];

  // --- Color Mapping Logic ---
  const BRAND_COLORS = {
    cyan: '#22d3ee',
    blue: '#3b82f6',
    purple: '#a855f7',
    default: '#94a3b8',
  };

  const getTechColor = (name: string): string => {
    const cat = techCategories.find((c) => c.items.includes(name));
    if (cat?.id === 'core') return BRAND_COLORS.cyan;
    if (cat?.id === 'auto') return BRAND_COLORS.blue;
    if (cat?.id === 'data') return BRAND_COLORS.purple;
    if (cat?.id === 'collab') return BRAND_COLORS.blue;
    return BRAND_COLORS.default;
  };

  const getModuleColor = (title: string): string => {
    const mod = competencyModules.find((m) => m.title === title);
    if (mod?.accent === 'cyan') return BRAND_COLORS.cyan;
    if (mod?.accent === 'blue') return BRAND_COLORS.blue;
    if (mod?.accent === 'purple') return BRAND_COLORS.purple;
    return BRAND_COLORS.default;
  };

  // --- Interaction Logic ---

  const getRelatedModules = (techName: string) => {
    const relatedSkills = RELATIONSHIPS[techName] || [];
    const modules = new Set<string>();
    competencyModules.forEach((mod) => {
      // If any skill in this module is powered by the tech
      if (mod.skills.some((skill) => relatedSkills.includes(skill))) {
        modules.add(mod.title);
      }
    });
    return Array.from(modules);
  };

  const getRelatedTechs = (moduleTitle: string) => {
    const module = competencyModules.find((m) => m.title === moduleTitle);
    if (!module) return [];

    return TECH_STACK.filter((tech) => {
      const techSkills = RELATIONSHIPS[tech.name] || [];
      // If this tech powers any skill in the module
      return techSkills.some((s) => module.skills.includes(s));
    }).map((t) => t.name);
  };

  const calculateLines = useCallback(
    (sourceId: string, targetIds: string[], type: 'tech' | 'module') => {
      if (!containerRef.current) return;

      // Cancel any pending frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const newLines: typeof lines = [];

        targetIds.forEach((targetId) => {
          // Determine Source and Target DOM elements
          const sourceEl =
            type === 'tech' ? techRefs.current[sourceId] : moduleRefs.current[sourceId];
          const targetEl =
            type === 'tech' ? moduleRefs.current[targetId] : techRefs.current[targetId];

          if (sourceEl && targetEl) {
            const srcRect = sourceEl.getBoundingClientRect();
            const tgtRect = targetEl.getBoundingClientRect();

            let startX, startY, endX, endY;

            if (type === 'tech') {
              // Tech (Left) -> Module (Right)
              startX = srcRect.right - containerRect.left;
              startY = srcRect.top + srcRect.height / 2 - containerRect.top;

              endX = tgtRect.left - containerRect.left;
              endY = tgtRect.top + tgtRect.height / 2 - containerRect.top;
            } else {
              // Module (Right) -> Tech (Left)
              startX = srcRect.left - containerRect.left;
              startY = srcRect.top + srcRect.height / 2 - containerRect.top;

              endX = tgtRect.right - containerRect.left;
              endY = tgtRect.top + tgtRect.height / 2 - containerRect.top;
            }

            // Bezier Control Points for smooth S-curve
            const cp1X = startX + (endX - startX) * 0.5;
            const cp1Y = startY;
            const cp2X = endX - (endX - startX) * 0.5;
            const cp2Y = endY;

            const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

            // Color Gradient Logic
            let startColor, endColor;
            if (type === 'tech') {
              startColor = getTechColor(sourceId);
              endColor = getModuleColor(targetId);
            } else {
              startColor = getModuleColor(sourceId);
              endColor = getTechColor(targetId);
            }

            newLines.push({
              id: targetId,
              d: path,
              startColor,
              endColor,
              x1: startX,
              y1: startY,
              x2: endX,
              y2: endY,
            });
          }
        });
        setLines(newLines);
      });
    },
    []
  );

  const handleTechHover = (techName: string) => {
    const relatedModules = getRelatedModules(techName);
    setActiveHighlight({
      type: 'tech',
      id: techName,
      related: relatedModules,
    });
    calculateLines(techName, relatedModules, 'tech');
  };

  const handleModuleHover = (moduleTitle: string) => {
    const relatedTechs = getRelatedTechs(moduleTitle);
    setActiveHighlight({
      type: 'module',
      id: moduleTitle,
      related: relatedTechs,
    });
    calculateLines(moduleTitle, relatedTechs, 'module');
  };

  const clearHighlight = () => {
    setActiveHighlight(null);
    setLines([]);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  return (
    <motion.section
      id="skills"
      ref={containerRef}
      style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
      className="relative overflow-hidden min-h-screen flex items-center py-48 md:py-60"
    >
      {/* === BACKGROUND: Simplified to prevent banding === */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* === SVG OVERLAY FOR DATA LINKS (Desktop Only) === */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-20">
        <svg className="w-full h-full overflow-visible">
          <defs>
            <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {lines.map((line, i) => (
              <linearGradient
                key={i}
                id={`gradient-${i}`}
                gradientUnits="userSpaceOnUse"
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
              >
                <stop offset="0%" stopColor={line.startColor} />
                <stop offset="100%" stopColor={line.endColor} />
              </linearGradient>
            ))}
          </defs>
          <AnimatePresence>
            {lines.map((line, i) => (
              <g key={line.id + line.d}>
                {/* Outer Glow Path */}
                <motion.path
                  d={line.d}
                  fill="none"
                  stroke={`url(#gradient-${i})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  filter="url(#glow-line)"
                />
                {/* Inner Bright Path */}
                <motion.path
                  d={line.d}
                  fill="none"
                  stroke={`url(#gradient-${i})`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Moving Data Packet */}
                <motion.circle r="3" fill="white">
                  <animateMotion
                    dur="1s"
                    repeatCount="indefinite"
                    path={line.d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  ></animateMotion>
                </motion.circle>
              </g>
            ))}
          </AnimatePresence>
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 1.1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-cyan-500/50"></div>
            <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase">
              04. TOOLKIT
            </h2>
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Technical Expertise
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.8 }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-2 text-blue-400 mb-4">
            <Code size={16} />
            <span className="text-[10px] font-mono uppercase tracking-widest">
              Operational Mapping
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-6">
            Connecting the <span className="text-cyan-400">Stack</span> to the <br />
            <span className="text-blue-500">Strategy</span>.
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-loose mb-6">
            Skilled in industry-standard tools such as Zendesk and Salesforce, utilizing automation and data analytics, while integrating essential competencies in strategic operations, technical configuration, and resilience planning to optimize efficiency and customer experience.
          </p>
          <p className="text-[10px] md:text-xs font-mono text-slate-500 flex items-center gap-2">
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-0 items-stretch relative">
          {/* LEFT COLUMN: INFRASTRUCTURE LAYER (Tech Stack) */}
          <div className="md:col-span-5 flex flex-col gap-8 relative z-10 pl-6 md:pl-0 pr-0 md:pr-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="flex items-center justify-between border-b border-slate-800 pb-2 relative"
            >
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Database size={14} /> Tech Stack
              </h4>
              <span className="text-[9px] font-mono text-slate-600">INPUT_NODES</span>

              <div className="hidden md:block absolute -right-[49px] top-1/2 -translate-y-1/2 w-[49px] h-px border-t border-dashed border-slate-700/50">
                <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-600"></div>
              </div>
            </motion.div>

            <div className="space-y-6">
              {techCategories.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false, margin: '-50px' }}
                >
                  <h5
                    className={`text-[10px] font-bold font-mono uppercase tracking-wider mb-3 ${cat.color} flex items-center gap-2`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-sm ${cat.bg.replace('/10', '')}`}></span>
                    {cat.label}
                  </h5>

                  <div className="grid grid-cols-5 gap-2">
                    {cat.items.map((itemName, i) => {
                      const tech = TECH_STACK.find((t) => t.name === itemName);
                      if (!tech) return null;

                      // Highlight Logic
                      const isHovered =
                        activeHighlight?.type === 'tech' && activeHighlight.id === itemName;
                      const isRelated =
                        activeHighlight?.type === 'module' &&
                        activeHighlight.related.includes(itemName);
                      const isDimmed = activeHighlight !== null && !isHovered && !isRelated;

                      return (
                        <motion.div
                          key={itemName}
                          // Ref attached for line calculation
                          ref={(el: HTMLDivElement | null) => {
                            techRefs.current[itemName] = el;
                          }}
                          initial={{ scale: 0, opacity: 0, rotate: -90 }}
                          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                            delay: index * 0.1 + i * 0.05,
                          }}
                          viewport={{ once: false }}
                          onMouseEnter={() => handleTechHover(itemName)}
                          onMouseLeave={clearHighlight}
                          className={`transition-all duration-300 ${isDimmed ? 'opacity-20 blur-[1px] scale-90' : 'opacity-100 scale-100'}`}
                        >
                          <GlassCard
                            className={`p-1.5 aspect-square bg-[#0f172a]/80 transition-all cursor-crosshair
                                      ${isHovered || isRelated
                                ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-110 z-30'
                                : 'hover:border-slate-600 hover:bg-slate-800/90'
                              }
                                    `}
                            hoverEffect={false} // Disable default hover to control manually
                          >
                            <div className="w-full h-full flex flex-col items-center justify-center gap-1 pointer-events-none">
                              <div className="w-9 h-9 relative flex items-center justify-center shrink-0">
                                <TechLogo
                                  name={tech.name}
                                  logo={tech.logo}
                                  localLogo={tech.localLogo}
                                  className={`w-full h-full object-contain transition-all filter
                                              ${isHovered || isRelated ? 'grayscale-0 opacity-100' : 'grayscale opacity-70'}
                                            `}
                                />
                              </div>
                              <span
                                className={`text-[8px] font-mono text-center leading-tight transition-colors w-full break-words
                                          ${isHovered || isRelated ? 'text-white font-bold' : 'text-slate-500'}
                                      `}
                              >
                                {tech.name}
                              </span>
                            </div>
                          </GlassCard>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* === CENTER SPINE (Desktop Only) - Spacer === */}
          <div className="hidden md:block md:col-span-1 relative h-full min-h-[600px]" />

          {/* RIGHT COLUMN: FUNCTIONAL LAYER (Competencies) */}
          <div className="md:col-span-6 perspective-1000 relative z-10 pl-6 md:pl-12 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
                className="flex items-center justify-between border-b border-slate-800 pb-2 mb-8 relative"
              >
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Layers size={14} /> Core Skills
                </h4>
                <span className="text-[9px] font-mono text-slate-600">OUTPUT_MODULES</span>

                <div className="hidden md:block absolute -left-[49px] top-1/2 -translate-y-1/2 w-[49px] h-px border-t border-dashed border-slate-700/50">
                  <div className="absolute left-0 -top-[3px] w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-600"></div>
                </div>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-5">
                {competencyModules.map((mod, index) => {
                  const isHovered =
                    activeHighlight?.type === 'module' && activeHighlight.id === mod.title;
                  const isRelated =
                    activeHighlight?.type === 'tech' && activeHighlight.related.includes(mod.title);
                  const isDimmed = activeHighlight !== null && !isHovered && !isRelated;

                  const borderColor =
                    mod.accent === 'cyan'
                      ? 'border-cyan-500/50'
                      : mod.accent === 'blue'
                        ? 'border-blue-500/50'
                        : 'border-purple-500/50';

                  const iconColor =
                    mod.accent === 'cyan'
                      ? 'text-cyan-400'
                      : mod.accent === 'blue'
                        ? 'text-blue-400'
                        : 'text-purple-400';

                  const activeBorder =
                    mod.accent === 'cyan'
                      ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                      : mod.accent === 'blue'
                        ? 'border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                        : 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]';

                  return (
                    <motion.div
                      key={mod.title}
                      // Attach Ref to whole card container
                      ref={(el: HTMLDivElement | null) => {
                        moduleRefs.current[mod.title] = el;
                      }}
                      onMouseEnter={() => handleModuleHover(mod.title)}
                      onMouseLeave={clearHighlight}
                      initial={{ opacity: 0, x: 100, rotateY: 45, scale: 0.9 }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 12,
                        delay: index * 0.15,
                      }}
                      viewport={{ once: false, margin: '-50px' }}
                      className={`h-full transition-all duration-500 ${isDimmed ? 'opacity-20 blur-[2px] scale-95' : 'opacity-100 scale-100'}`}
                    >
                      <GlassCard
                        className={`h-full p-6 bg-[#0f172a]/80 transition-all duration-300 group cursor-crosshair
                                ${isHovered || isRelated ? `${activeBorder} bg-slate-900` : 'hover:-translate-y-1 hover:shadow-lg'}
                             `}
                        hoverEffect={false}
                      >
                        <div className="flex items-start gap-4 mb-6 pointer-events-none">
                          <div
                            className={`p-2.5 rounded bg-slate-900 border border-slate-800 ${iconColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            {mod.icon}
                          </div>
                          <div>
                            <h4
                              className={`text-sm font-bold font-display tracking-wide transition-colors ${isHovered || isRelated ? 'text-white' : 'text-slate-200'}`}
                            >
                              {mod.title}
                            </h4>
                            <div
                              className={`h-0.5 w-8 mt-2 bg-${mod.accent}-500/50 rounded-full group-hover:w-full transition-all duration-500`}
                            ></div>
                          </div>
                        </div>

                        <ul className="space-y-3 pointer-events-none">
                          {mod.skills.map((skill, i) => (
                            <li
                              key={skill}
                              className="text-xs font-mono flex items-center gap-2.5 text-slate-400"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-${mod.accent}-400 transition-colors`}
                              ></span>
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
