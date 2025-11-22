import React from 'react';
import { Settings, ShieldAlert } from 'lucide-react';

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan animate-scanline"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full text-center border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 md:p-12 rounded-sm">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse"></div>
            <Settings size={48} className="text-amber-500 relative z-10 animate-spin-slow" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          System Maintenance
        </h1>

        <div className="flex items-center justify-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest mb-6">
          <ShieldAlert size={14} />
          <span>Protocols Active</span>
        </div>

        <p className="text-slate-400 mb-8 leading-relaxed">
          The system is currently undergoing scheduled maintenance and upgrades. Operations will
          resume shortly.
        </p>

        <div className="w-full bg-slate-800 h-1 mb-2 overflow-hidden rounded-full">
          <div className="h-full bg-amber-500 w-2/3 animate-pulse rounded-full"></div>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
          <span>Progress</span>
          <span className="animate-pulse">Updating...</span>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-[10px] font-mono text-slate-600">
          ESTIMATED_RESUMPTION: T-MINUS_UNKNOWN
        </div>
      </div>
    </div>
  );
};

export default React.memo(Maintenance);
