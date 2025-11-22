
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border border-slate-800 
        bg-[#0f172a]/80 backdrop-blur-xl shadow-xl
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.15)] hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Subtle top highlight for 3D effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};
