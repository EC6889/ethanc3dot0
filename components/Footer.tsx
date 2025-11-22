
import React from 'react';
import { Hexagon, Linkedin, Mail, ArrowUp, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020617] border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-900/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer w-fit" onClick={scrollToTop}>
              <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-sm group-hover:border-cyan-500/50 transition-colors">
                 <Hexagon className="w-5 h-5 text-cyan-500 relative z-10 group-hover:rotate-90 transition-transform duration-500" strokeWidth={1.5} />
              </div>
              <div>
                 <h3 className="text-lg font-display font-bold text-white tracking-tight leading-none group-hover:text-cyan-400 transition-colors">ETHAN C.</h3>
                 <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">// Operational_Architect</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Bridging the gap between complex strategy and daily execution. 
              Building scalable systems for high-performance teams.
            </p>
            
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-wider">System Online</span>
               </div>
               <span className="text-[10px] font-mono text-slate-600">V.3.0.1 // STABLE</span>
            </div>

            {/* Tech Stack / Colophon */}
            <div className="pt-6 mt-6 border-t border-slate-800/50 max-w-sm">
               <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Cpu size={12} /> Interface_Architecture
               </div>
               <div className="flex items-center gap-5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <a href="https://react.dev" target="_blank" rel="noreferrer" title="React">
                    <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="h-5 w-auto" />
                  </a>
                  <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer" title="TypeScript">
                    <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className="h-5 w-auto" />
                  </a>
                  <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" title="Tailwind CSS">
                    <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" className="h-5 w-auto" />
                  </a>
                  <a href="https://www.framer.com/motion/" target="_blank" rel="noreferrer" title="Framer Motion">
                    <img src="https://cdn.simpleicons.org/framer/0055FF" alt="Framer Motion" className="h-5 w-auto" />
                  </a>
                  <a href="https://lucide.dev" target="_blank" rel="noreferrer" title="Lucide Icons">
                     <img src="https://cdn.simpleicons.org/lucide/F7F7F7" alt="Lucide" className="h-5 w-auto" />
                  </a>
               </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2">
               <span className="w-1 h-4 bg-cyan-500"></span> Navigation
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2 group w-fit"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-cyan-500 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-2">
               <span className="w-1 h-4 bg-blue-500"></span> Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:gmeal6889@gmail.com" className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm font-mono">Email</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/echia6889" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                    <Linkedin size={14} />
                  </div>
                  <span className="text-sm font-mono">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="text-[10px] font-mono text-slate-600 flex flex-col md:flex-row gap-1 md:gap-4">
              <span>&copy; 2025 ETHAN C. OPERATIONS.</span>
              <span className="hidden md:inline text-slate-800">|</span>
              <span>ALL RIGHTS RESERVED.</span>
           </div>
           <button 
             onClick={scrollToTop}
             className="text-[10px] font-mono text-slate-500 hover:text-cyan-400 flex items-center gap-2 transition-colors uppercase tracking-wider group"
           >
             Return_To_Top <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
