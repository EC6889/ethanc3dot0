import React from 'react';
import { AlertTriangle, ArrowLeft, WifiOff } from 'lucide-react';

interface NotFoundProps {
    onBack: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Glitch Effect Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none"></div>

            <div className="relative z-10 max-w-md w-full text-center">
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-brand-cyan/20 blur-xl rounded-full animate-pulse"></div>
                    <WifiOff size={64} className="text-brand-cyan relative z-10 mx-auto" />
                </div>

                <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-2 tracking-tighter">
                    4<span className="text-brand-cyan">0</span>4
                </h1>

                <div className="h-px w-24 bg-gradient-to-r from-transparent via-brand-cyan to-transparent mx-auto mb-6"></div>

                <h2 className="text-xl font-mono text-brand-cyan mb-4 uppercase tracking-widest">Signal Lost</h2>

                <p className="text-slate-400 mb-8 leading-relaxed">
                    The sector you are trying to access does not exist or has been redacted.
                    Please return to the command center.
                </p>

                <button
                    onClick={onBack}
                    className="group relative inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-brand-cyan/30 text-brand-cyan font-mono text-sm uppercase tracking-wider hover:bg-brand-cyan/10 transition-all duration-300"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Return_To_Base</span>
                    <div className="absolute inset-0 border border-brand-cyan/0 group-hover:border-brand-cyan/50 transition-colors duration-500"></div>
                </button>

                <div className="mt-12 text-[10px] font-mono text-slate-600">
                    ERROR_CODE: SECTOR_NOT_FOUND // 0x404
                </div>
            </div>
        </div>
    );
};

export default NotFound;
