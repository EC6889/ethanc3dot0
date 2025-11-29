import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    onComplete: () => void;
    duration?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, duration = 2500 }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Smooth progress animation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, duration / 50);

        // Complete after duration
        const timer = setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 600); // Wait for exit animation
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [duration, onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                  linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
                `,
                                backgroundSize: '50px 50px',
                            }}
                        />
                    </div>

                    {/* Glowing Orb */}
                    <motion.div
                        className="absolute w-96 h-96 rounded-full bg-cyan-500/20 blur-[100px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Main Content */}
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Logo/Name Animation */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-2">
                                ETHAN C<span className="text-cyan-400">.</span>
                            </h1>
                            <p className="text-xs md:text-sm font-mono text-slate-500 tracking-[0.3em] uppercase">
                                Initializing System
                            </p>
                        </motion.div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                            className="w-64 md:w-80"
                        >
                            {/* Progress Container */}
                            <div className="relative">
                                {/* Background Track */}
                                <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/30">
                                    {/* Progress Fill */}
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                                    </motion.div>
                                </div>

                                {/* Progress Percentage */}
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-[10px] font-mono text-slate-600 tracking-wider">
                                        LOADING
                                    </span>
                                    <span className="text-xs font-mono text-cyan-400 font-bold tabular-nums">
                                        {Math.floor(progress)}%
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Status Messages */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="flex items-center gap-2"
                        >
                            <motion.div
                                className="w-2 h-2 rounded-full bg-cyan-400"
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [0.8, 1, 0.8],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            <span className="text-[10px] md:text-xs font-mono text-slate-500 tracking-wide">
                                {progress < 30 && 'Establishing Connection...'}
                                {progress >= 30 && progress < 60 && 'Loading Resources...'}
                                {progress >= 60 && progress < 90 && 'Preparing Interface...'}
                                {progress >= 90 && 'Ready'}
                            </span>
                        </motion.div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg" />
                    <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg" />
                    <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg" />
                    <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
