
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Menu, X, Hexagon, FileText } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const Motion = motion as any;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map(link => link.href.substring(1));

      // Special check for top of page
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          // Consider a section active if it's near the middle of the viewport
          if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 3) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setMobileMenuOpen(false);
    }
  };



  return (
    <>
      <Motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
          ${isScrolled
            ? 'h-[70px] bg-slate-950/90 backdrop-blur-md border-brand-cyan-deep/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'h-[90px] bg-transparent border-transparent'
          }
        `}
      >
        {/* Tech Decoration Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan-deep/50 to-transparent opacity-50"></div>

        {/* Scroll Progress Line - Styled as Data Stream */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-800/50">
          <Motion.div
            className="h-full bg-brand-cyan shadow-[0_0_10px_cyan]"
            style={{ scaleX, transformOrigin: "0%" }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between w-full h-full relative">

          {/* Logo Section */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900/50 border border-slate-700 group-hover:border-brand-cyan-deep/50 transition-colors rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-brand-cyan-deep/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Hexagon className="w-5 h-5 text-brand-cyan relative z-10 group-hover:rotate-90 transition-transform duration-500" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-display font-bold text-white tracking-tight leading-none group-hover:text-brand-cyan transition-colors">
                ETHAN C.
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-brand-cyan/70 transition-colors mt-1">
                 // Ops_Architect
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  onMouseEnter={() => setHoveredTab(link.label)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`
                        relative px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] transition-colors duration-300
                        ${isActive ? 'text-brand-cyan' : 'text-slate-400 hover:text-slate-200'}
                      `}
                >
                  {/* Active Indicator: Brackets */}
                  <span className="relative z-10 flex items-center gap-1">
                    <span className={`transition-opacity duration-300 ${isActive || hoveredTab === link.label ? 'opacity-100 text-brand-cyan' : 'opacity-0'}`}>[</span>
                    {link.label}
                    <span className={`transition-opacity duration-300 ${isActive || hoveredTab === link.label ? 'opacity-100 text-brand-cyan' : 'opacity-0'}`}>]</span>
                  </span>

                  {/* Background Glow for Active */}
                  {isActive && (
                    <Motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-cyan/5 border-b border-brand-cyan/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Divider */}
            <div className="h-6 w-px bg-slate-800 mx-4"></div>

            {/* Resume Button */}
            <a
              href="/Ethan_C_Resume.pdf"
              download="Ethan_C_Resume.pdf"
              className="group relative px-5 py-2 bg-slate-900/50 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest border border-slate-700 hover:border-brand-cyan/50 hover:text-brand-cyan transition-all overflow-hidden flex items-center"
            >
              <div className="absolute inset-0 bg-brand-cyan/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <FileText size={12} /> RESUME_V3.0
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden group p-2 text-slate-400 hover:text-brand-cyan border border-transparent hover:border-slate-800 transition-all bg-slate-900/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Motion.nav>

      {/* Mobile Menu Overlay - Sci-Fi Style */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-slate-950 md:hidden flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="h-[70px] border-b border-slate-800 flex items-center justify-between px-6">
              <span className="text-xs font-mono text-brand-cyan">// NAVIGATION_PROTOCOL</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="flex flex-col items-start justify-center flex-1 px-8 gap-6 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <Motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className={`text-3xl font-display font-bold tracking-tight flex items-center gap-4 group ${activeSection === link.href.substring(1) ? 'text-brand-cyan' : 'text-slate-500'}`}
                >
                  <span className="text-sm font-mono text-slate-700 group-hover:text-brand-cyan/50 transition-colors">0{i + 1}</span>
                  {link.label}
                </Motion.a>
              ))}

              <div className="w-full h-px bg-slate-800 my-4"></div>

              <Motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href="/Ethan_C_Resume.pdf"
                download="Ethan_C_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan font-bold font-mono uppercase tracking-widest hover:bg-brand-cyan/10 transition-colors"
              >
                <FileText size={16} /> ACCESS_RESUME_FILE
              </Motion.a>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
