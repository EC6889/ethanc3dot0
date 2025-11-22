
import React, { useState, useEffect } from 'react';
import { NAV_LINKS, RESUME_CONTENT } from '../constants';
import { Menu, X, Hexagon, FileText, ChevronRight } from 'lucide-react';
import { jsPDF } from "jspdf";
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

  const handleResumeDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.setFont("courier");
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(RESUME_CONTENT, 180);
    let cursorY = 20;
    const pageHeight = doc.internal.pageSize.height;
    splitText.forEach((line: string) => {
        if (cursorY > pageHeight - 20) {
            doc.addPage();
            cursorY = 20;
        }
        doc.text(line, 15, cursorY);
        cursorY += 5;
    });
    doc.save("Ethan_C_Resume.pdf");
  };

  return (
    <>
      <Motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${isScrolled 
            ? 'h-[72px] bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'h-[96px] bg-transparent border-b border-transparent'
          }
        `}
      >
        {/* Scroll Progress Line */}
        <Motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-cyan-500 origin-left shadow-[0_0_10px_cyan]"
          style={{ scaleX }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between w-full h-full relative">
          
          {/* Logo Section - Dynamic Group */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group relative py-2 pr-4 z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Motion.div 
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative bg-slate-900 border border-slate-700 rounded-lg p-2 group-hover:border-cyan-500/50 transition-colors"
              >
                 <Hexagon className="w-6 h-6 text-cyan-500" />
              </Motion.div>
            </div>
            <div className="flex flex-col">
               <span className="text-lg font-display font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">ETHAN C.</span>
               <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-cyan-500/70 transition-colors">Ops Architect</span>
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
                      className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                   >
                      {isActive && (
                         <Motion.div 
                            layoutId="activeTab"
                            className="absolute inset-0 bg-slate-800/50 rounded border border-slate-700/50"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                         />
                      )}
                      {hoveredTab === link.label && !isActive && (
                          <Motion.div 
                            layoutId="hoverTab"
                            className="absolute inset-0 bg-slate-800/20 rounded"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                         />
                      )}
                      <span className="relative z-10">{link.label}</span>
                   </a>
                );
             })}

             {/* Resume Button */}
             <button 
               onClick={handleResumeDownload}
               className="ml-4 group relative px-5 py-2.5 bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider border border-slate-700 rounded overflow-hidden hover:border-cyan-500/50 transition-colors"
             >
                <div className="absolute inset-0 w-full h-full bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                   <FileText size={14} className="text-cyan-500" /> Resume
                </span>
             </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
          >
             <div className="flex flex-col items-center gap-8">
                {NAV_LINKS.map((link, i) => (
                   <Motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, link.href)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className={`text-2xl font-display font-bold tracking-tight ${activeSection === link.href.substring(1) ? 'text-cyan-400' : 'text-white'}`}
                   >
                      {link.label}
                   </Motion.a>
                ))}

                <Motion.button 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   onClick={handleResumeDownload}
                   className="mt-8 flex items-center gap-2 px-8 py-3 bg-cyan-500 text-slate-950 font-bold font-mono uppercase tracking-widest rounded hover:bg-cyan-400"
                >
                   <FileText size={16} /> Download Resume
                </Motion.button>
             </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
