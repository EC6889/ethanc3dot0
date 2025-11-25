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
    // Wait for state update then scroll
    setTimeout(() => {
      const element = document.getElementById(item.toLowerCase());
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#020617] relative overflow-hidden">
      {/* Top Separator - The "Scanning" Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent opacity-50"></div>
      <div className="w-full h-1 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 pt-16 pb-8">

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Identity */}
          <div className="space-y-6">
            <div
              className="group cursor-pointer w-fit"
              onClick={scrollToTop}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                  <img
                    src="/assets/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xs">
              Building scalable systems for high-performance teams. Bridging strategy and execution.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-display font-bold text-white uppercase tracking-widest mb-6">
              Directory
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, i) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNav(e, item)}
                    className="text-sm text-slate-500 hover:text-brand-cyan transition-colors flex items-center gap-3 group w-fit font-mono"
                  >
                    <span className="text-[10px] text-slate-800 group-hover:text-brand-cyan/50 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div>
            <h4 className="text-xs font-display font-bold text-white uppercase tracking-widest mb-6">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:gmeal6889@gmail.com"
                  className="group flex items-center gap-3 text-slate-500 hover:text-white transition-colors"
                >
                  <Mail size={16} className="group-hover:text-brand-cyan transition-colors" />
                  <span className="text-sm font-mono">Email</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/echia6889"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-slate-500 hover:text-white transition-colors"
                >
                  <Linkedin size={16} className="group-hover:text-brand-cyan transition-colors" />
                  <span className="text-sm font-mono">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Status */}
          <div>
            <h4 className="text-xs font-display font-bold text-white uppercase tracking-widest mb-6">
              Status
            </h4>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider">
                  System Online
                </span>
              </div>

              <div className="pt-6 border-t border-slate-900">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3">
                  <Cpu size={12} /> Powered_By
                </div>
                <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
                  <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="h-4 w-auto" />
                  <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className="h-4 w-auto" />
                  <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind" className="h-4 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-mono text-slate-600">
            <span>&copy; 2025 ETHAN C. OPERATIONS</span>
            <div className="hidden md:block w-px h-3 bg-slate-800"></div>
            <div className="flex gap-6">
              <button onClick={() => onNavigate('terms')} className="hover:text-slate-400 transition-colors">TERMS</button>
              <button onClick={() => onNavigate('privacy')} className="hover:text-slate-400 transition-colors">PRIVACY</button>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[10px] font-mono text-slate-600 hover:text-brand-cyan transition-colors uppercase tracking-wider"
          >
            RETURN_TO_TOP
            <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Large Watermark */}
      <div className="absolute -bottom-12 -right-12 text-[150px] font-display font-bold text-white/[0.02] pointer-events-none select-none leading-none">
        EC
      </div>
    </footer>
  );
};

export default React.memo(Footer);
