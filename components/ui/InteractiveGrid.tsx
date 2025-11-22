
import React, { useEffect, useRef } from 'react';

export const InteractiveGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Configuration
    const STAR_COUNT = 800; // Dense field
    const SPEED = 0.3; // Very slow Z-axis movement
    const DEPTH = 1000; // How deep the field goes

    interface Star {
      x: number;
      y: number;
      z: number;
      color: string;
    }

    let stars: Star[] = [];
    let mouseX = 0;
    let mouseY = 0;
    
    // Smooth mouse tracking
    let targetX = 0;
    let targetY = 0;

    // Brand Colors for some stars
    const STAR_COLORS = ['#ffffff', '#ffffff', '#ffffff', '#22d3ee', '#a855f7', '#94a3b8'];

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      stars = [];

      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2, // Spread wide
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * DEPTH,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
        });
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Smooth parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Sort stars by depth so distant ones draw first
      stars.sort((a, b) => b.z - a.z);

      for (const star of stars) {
        // Move star towards viewer
        star.z -= SPEED;

        // Reset if it passes viewer
        if (star.z <= 0) {
          star.z = DEPTH;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Project 3D to 2D
        // Simple perspective projection
        const k = 128.0 / star.z; // Field of view factor
        const px = (star.x - targetX * 2) * k + centerX;
        const py = (star.y - targetY * 2) * k + centerY;

        // Draw only if within bounds (with some margin)
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = (1 - star.z / DEPTH) * 2.5; // Closer = Bigger
          const opacity = (1 - star.z / DEPTH); // Closer = Brighter
          
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.globalAlpha = opacity;
          ctx.arc(px, py, Math.max(0, size), 0, Math.PI * 2);
          ctx.fill();

          // Add a subtle glow to very close stars
          if (size > 2) {
             ctx.shadowBlur = 8;
             ctx.shadowColor = star.color;
             ctx.fill();
             ctx.shadowBlur = 0;
          }
        }
      }
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse from center (-0.5 to 0.5)
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left);
      const y = (e.clientY - rect.top);
      
      // Store raw offset from center
      mouseX = (x - width / 2) * 0.5; // Scale factor for sensitivity
      mouseY = (y - height / 2) * 0.5;
    };

    const handleResize = () => {
      init();
    };

    init();
    const animationFrame = requestAnimationFrame(update);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* Atmospheric Layers */}
      {/* 1. Deep Space Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none opacity-80" />
      
      {/* 2. Subtle Nebula Clouds (Static but adds depth) */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-900/10 mix-blend-screen pointer-events-none opacity-60"
      />
      
      {/* 3. Horizon Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
    </div>
  );
};
    