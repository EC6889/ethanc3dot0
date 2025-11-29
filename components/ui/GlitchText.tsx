import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    children: React.ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
    show?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    children,
    className = '',
    intensity = 'medium',
    show = true
}) => {
    // Chromatic aberration offsets based on intensity
    const offsets = {
        low: 2,
        medium: 4,
        high: 8
    };

    const offset = offsets[intensity];

    return (
        <div className={`relative ${className}`}>
            {/* Main text */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : { opacity: 0 }}
            >
                {children}
            </motion.div>

            {/* Red channel - shifted right */}
            <motion.div
                className="absolute inset-0 text-red-500 mix-blend-screen pointer-events-none"
                initial={{ x: 0, opacity: 0 }}
                animate={show ? {
                    x: [0, offset, -offset, offset, 0],
                    opacity: [0, 0.7, 0.7, 0.7, 0]
                } : { x: 0, opacity: 0 }}
                transition={{
                    duration: 0.6,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>

            {/* Cyan channel - shifted left */}
            <motion.div
                className="absolute inset-0 text-cyan-400 mix-blend-screen pointer-events-none"
                initial={{ x: 0, opacity: 0 }}
                animate={show ? {
                    x: [0, -offset, offset, -offset, 0],
                    opacity: [0, 0.7, 0.7, 0.7, 0]
                } : { x: 0, opacity: 0 }}
                transition={{
                    duration: 0.6,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    ease: "easeInOut",
                    delay: 0.05
                }}
            >
                {children}
            </motion.div>

            {/* Glitch bars */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : { opacity: 0 }}
            >
                <motion.div
                    className="absolute w-full h-[2px] bg-cyan-400/50"
                    initial={{ y: '0%' }}
                    animate={show ? {
                        y: ['0%', '50%', '100%', '0%'],
                        opacity: [0, 1, 1, 0]
                    } : { y: '0%', opacity: 0 }}
                    transition={{
                        duration: 0.4,
                        times: [0, 0.3, 0.7, 1],
                        ease: "linear"
                    }}
                />
            </motion.div>
        </div>
    );
};
