import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Threads from './Threads';
import { GravityStarsBackground } from '@/components/animate-ui/components/backgrounds/gravity-stars';

type BackgroundVariant = 'skills' | 'projects' | 'contact';

interface CyberBackgroundProps {
    variant?: BackgroundVariant;
}

const THREADS_COLOR: [number, number, number] = [0.13, 0.83, 0.93]; // Brand Cyan (#22d3ee)

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ variant = 'skills' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse interaction for subtle parallax/glow
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Removed internal scroll opacity to avoid conflicts with parent section transitions
    // The parent section (Skills, Projects, etc.) already handles entry/exit fades.

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950"
        >
            {/* === 1. Interactive Glow Follower (Common) === */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full bg-brand-cyan/5 blur-[80px] transition-transform duration-1000 ease-out opacity-50"
                style={{
                    left: `${mousePosition.x * 100}%`,
                    top: `${mousePosition.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* === 2. Variant-Specific Animations === */}
            {variant === 'skills' && (
                // Gravity Stars: Interactive particle background from Animate UI
                <div className="absolute inset-0 text-brand-cyan">
                    <GravityStarsBackground className="absolute inset-0" />
                </div>
            )}

            {variant === 'projects' && (
                // Perspective Grid: 3D floor grid moving towards viewer
                <div className="absolute inset-0 flex items-end justify-center perspective-1000">
                    <motion.div
                        className="w-[200%] h-[100%] origin-bottom"
                        style={{
                            backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.3) 2px, transparent 2px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.3) 2px, transparent 2px)
              `,
                            backgroundSize: '80px 80px',
                            transform: 'rotateX(60deg) translateY(0%)',
                        }}
                        animate={{
                            backgroundPosition: ['0px 0px', '0px 80px']
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
                    </motion.div>
                </div>
            )}

            {variant === 'contact' && (
                // Threads: Animated fluid lines from React Bits
                <div className="absolute inset-0 opacity-40">
                    <Threads
                        color={THREADS_COLOR}
                        amplitude={1.5}
                        distance={0}
                        enableMouseInteraction={true}
                    />
                </div>
            )}

            {/* === 3. Vignette & Gradient Overlays (Common) === */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none opacity-80" />
        </div>
    );
};
