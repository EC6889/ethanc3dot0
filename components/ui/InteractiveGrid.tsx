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
    let animationFrameId: number;
    let startTime = Date.now();

    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    // Configuration
    // Brand Spectrum Colors
    const COLORS = [
      'rgba(34, 211, 238, 0.5)', // Cyan-400
      'rgba(59, 130, 246, 0.5)', // Blue-500
      'rgba(168, 85, 247, 0.5)', // Purple-500
    ];
    // RGB values for lines (matching the above)
    const LINE_COLORS = [
      '34, 211, 238', // Cyan
      '59, 130, 246', // Blue
      '168, 85, 247', // Purple
    ];

    const PARTICLE_DENSITY = 4000; // Increased density (was 8000)
    const CONNECT_DISTANCE = 150;
    const MOUSE_DISTANCE = 200;
    const INTRO_DURATION = 1500; // ms

    interface Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      colorIndex: number;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const area = width * height;
      const particleCount = Math.min(Math.floor(area / PARTICLE_DENSITY), 400); // Cap increased to 400

      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particleCount; i++) {
        const targetX = Math.random() * width;
        const targetY = Math.random() * height;
        particles.push({
          x: centerX, // Start at center
          y: centerY,
          targetX: targetX,
          targetY: targetY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          colorIndex: Math.floor(Math.random() * COLORS.length),
        });
      }
      startTime = Date.now(); // Reset start time on resize/init
    };

    const resize = () => {
      if (!container || !canvas || !ctx) return;
      width = container.clientWidth;
      height = container.clientHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Easing function for smooth intro (EaseOutExpo)
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / INTRO_DURATION, 1);
      const ease = easeOutExpo(progress);

      particles.forEach((p, i) => {
        if (progress < 1) {
          // Intro Phase: Move from center to target
          const centerX = width / 2;
          const centerY = height / 2;

          // Interpolate current position
          p.x = centerX + (p.targetX - centerX) * ease;
          p.y = centerY + (p.targetY - centerY) * ease;
        } else {
          // Normal Phase: Drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        // Draw Particle Dot with assigned color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[p.colorIndex];
        ctx.fill();

        // Only draw connections if intro is mostly done to avoid clutter at center
        if (progress > 0.5) {
          // --- Interaction: Connect to Mouse ---
          const dxMouse = mouse.x - p.x;
          const dyMouse = mouse.y - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < MOUSE_DISTANCE) {
            const opacity = 1 - (distMouse / MOUSE_DISTANCE);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${LINE_COLORS[p.colorIndex]}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // "Magnetic" effect
            if (distMouse > 50) {
              p.x += dxMouse * 0.02;
              p.y += dyMouse * 0.02;
            }
          }

          // --- Interaction: Connect to Neighbors ---
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECT_DISTANCE) {
              const opacity = 1 - (dist / CONNECT_DISTANCE);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${LINE_COLORS[p.colorIndex]}, ${opacity * 0.3})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-[#020617] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none opacity-60" />
    </div>
  );
};