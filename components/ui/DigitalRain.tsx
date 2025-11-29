import React, { useEffect, useRef } from 'react';

interface DigitalRainProps {
    opacity?: number;
    speed?: number;
    color?: string;
}

export const DigitalRain: React.FC<DigitalRainProps> = ({
    opacity = 0.6,
    speed = 1,
    color = '#22d3ee' // cyan
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Matrix characters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        // Array to track y position of each column
        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; // Start at random negative positions
        }

        let animationFrameId: number;

        const draw = () => {
            // Create fade trail effect
            ctx.fillStyle = 'rgba(2, 6, 23, 0.05)'; // Slate-950 with alpha
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color;
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Draw character with slight opacity variation
                const charOpacity = Math.random() * 0.5 + 0.5;
                ctx.globalAlpha = charOpacity * opacity;
                ctx.fillText(char, x, y);

                // Reset drop to top randomly
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Increment Y coordinate
                drops[i] += speed * 0.5;
            }

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [opacity, speed, color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity }}
        />
    );
};
