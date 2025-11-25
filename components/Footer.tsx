import React from 'react';
import { Linkedin, Mail, ArrowUp, Cpu, Github } from 'lucide-react';

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
    <footer className="bg-[#020617] relative overflow-hidden border-t border-slate-800/50">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] pointer-events-none"></div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & CTA */}
          <div className="space-y-6">
            <div
              className="group cursor-pointer w-fit"
              onClick={scrollToTop}
            >
              <div className="w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-display font-bold text-white">Ready to Collaborate?</h5>
              <a
                href="#contact"
                onClick={(e) => handleNav(e, 'Contact')}
                className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan hover:text-white transition-colors group"
              >
                Get in Touch <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNav(e, item)}
                    className="text-sm font-mono text-slate-400 hover:text-brand-cyan transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-6">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:gmeal6889@gmail.com"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-brand-cyan" />
                  <span className="text-sm font-mono">Email</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/echia6889"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin size={16} className="text-brand-cyan" />
                  <span className="text-sm font-mono">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/EC6889"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                  <Github size={16} className="text-brand-cyan" />
                  <span className="text-sm font-mono">GitHub</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3">
                <Cpu size={12} /> Built With
              </div>
              <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
                <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="h-4 w-auto" />
                <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className="h-4 w-auto" />
                <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind" className="h-4 w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-600">
          <div>
            <span>&copy; 2025 Ethan C. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('terms')} className="hover:text-brand-cyan transition-colors">
              Terms
            </button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-brand-cyan transition-colors">
              Privacy
            </button>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 hover:text-brand-cyan transition-colors"
            >
              Back to Top
              <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
