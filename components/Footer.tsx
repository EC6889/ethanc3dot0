import React from 'react';
import { Linkedin, Mail, ArrowUp, Cpu } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'terms' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    onNavigate('home');
    setTimeout(() => {
      const element = document.getElementById(item.toLowerCase());
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#020617] relative overflow-hidden border-t border-brand-cyan/20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] pointer-events-none"></div>

      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 pt-16 pb-8">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand Module (Col 1-4) */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <div
                className="group cursor-pointer w-fit mb-6"
                onClick={scrollToTop}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 flex items-center justify-center bg-slate-900/50 border border-slate-700/50 rounded-sm overflow-hidden group-hover:border-brand-cyan/50 transition-colors duration-300">
                    <div className="absolute inset-0 bg-brand-cyan/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <img
                      src="/assets/logo.png"
                      alt="Logo"
                      className="w-full h-full object-contain relative z-10 p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-[0.2em]">
                      // Operational_Architect
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed font-mono border-l-2 border-slate-800 pl-4 py-1">
                Architecting scalable operations and technical solutions for high-performance ecosystems.
              </p>
            </div>
          </div>

          {/* Navigation Module (Col 5-7) */}
          <div className="md:col-span-3">
            <div className="relative p-6 border border-slate-800 bg-slate-900/20 backdrop-blur-sm h-full">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-cyan/30"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-cyan/30"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-cyan/30"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-cyan/30"></div>

              <h4 className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-1 bg-brand-cyan rounded-full"></span>
                System_Nav
              </h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, i) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => handleNav(e, item)}
                      className="group flex items-center justify-between text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      <span>{item}</span>
                      <span className="text-[9px] text-slate-700 group-hover:text-brand-cyan transition-colors">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect Module (Col 8-10) */}
          <div className="md:col-span-3">
            <div className="relative p-6 border border-slate-800 bg-slate-900/20 backdrop-blur-sm h-full">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-cyan/30"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-cyan/30"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-cyan/30"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-cyan/30"></div>

              <h4 className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1 h-1 bg-brand-cyan rounded-full"></span>
                Ext_Comms
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:gmeal6889@gmail.com"
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-sm border border-transparent hover:border-slate-700"
                  >
                    <Mail size={14} className="text-brand-cyan" />
                    <span className="text-xs font-mono">gmeal6889@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/echia6889"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-sm border border-transparent hover:border-slate-700"
                  >
                    <Linkedin size={14} className="text-brand-cyan" />
                    <span className="text-xs font-mono">linkedin.com/in/echia6889</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Status Module (Col 11-12) */}
          <div className="md:col-span-2">
            <div className="flex flex-col justify-between h-full border-l border-slate-800 pl-6 md:pl-8">
              <div>
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
                  System_Status
                </h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-emerald-500 font-bold tracking-wider">
                    ONLINE
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-600">
                  Latency: 24ms
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Stack
                </h4>
                <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="h-4 w-auto" />
                  <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className="h-4 w-auto" />
                  <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind" className="h-4 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-mono text-slate-600">
            <span>&copy; 2025 ETHAN C. OPERATIONS. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono text-slate-600">
            <button onClick={() => onNavigate('terms')} className="hover:text-brand-cyan transition-colors">TERMS_OF_SERVICE</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-brand-cyan transition-colors">PRIVACY_PROTOCOL</button>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-mono text-brand-cyan/50 hover:text-brand-cyan transition-colors uppercase tracking-wider"
          >
            INIT_SCROLL_TOP
            <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
