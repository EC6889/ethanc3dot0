import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
    return (
        <motion.div className={`relative inline-block group ${className}`} whileHover="hover">
            {/* Main Text (White) */}
            <span className="relative z-10 block">{text}</span>

            {/* Cyan Layer (Top Left) */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-brand-cyan opacity-0 mix-blend-screen"
                variants={{
                    hover: {
                        opacity: 0.8,
                        x: -2,
                        y: -2,
                        transition: { repeat: Infinity, repeatType: "mirror", duration: 0.1, ease: "linear" }
                    }
                }}
            >
                {text}
            </motion.span>

            {/* Magenta Layer (Bottom Right) */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-brand-purple opacity-0 mix-blend-screen"
                variants={{
                    hover: {
                        opacity: 0.8,
                        x: 2,
                        y: 2,
                        transition: { repeat: Infinity, repeatType: "mirror", duration: 0.1, ease: "linear", delay: 0.05 }
                    }
                }}
            >
                {text}
            </motion.span>
        </motion.div>
    );
};
