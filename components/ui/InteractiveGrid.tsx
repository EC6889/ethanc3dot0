
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
    
    // 3D Configuration
    const GLOBE_RADIUS = 450; // Size of the sphere
    const DOT_COUNT = 400; // Number of nodes
    const DOT_RADIUS = 2;
    const CONNECTION_DISTANCE = 90; // Max distance to draw line
    const FOCAL_LENGTH = 600; // Camera depth

    // State
    let cx = width / 2;
    let cy = height / 2;
    let mouseX = 0;
    let mouseY = 0;
    
    // Rotation State
    let rotationX = 0;
    let rotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Colors
    const COLORS = ['#22d3ee', '#3b82f6', '#a855f7', '#ffffff'];

    interface Point3D {
      x: number;
      y: number;
      z: number;
      color: string;
      baseX: number;
      baseY: number;
      baseZ: number;
      projectedX: number;
      projectedY: number;
      scale: number;
      alpha: number;
    }

    let points: Point3D[] = [];

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cx = width / 2;
      cy = height / 2;
      points = [];

      // Generate points on a sphere
      for (let i = 0; i < DOT_COUNT; i++) {
        // Golden Angle distribution for even sphere coverage
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
        const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

        const x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi);
        const y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi);
        const z = GLOBE_RADIUS * Math.cos(phi);

        points.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          projectedX: 0, projectedY: 0, scale: 1, alpha: 1
        });
      }
    };

    const rotate = (p: Point3D, rotX: number, rotY: number) => {
      // Rotate around Y axis
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.baseX * cosY - p.baseZ * sinY;
      const z1 = p.baseZ * cosY + p.baseX * sinY;

      // Rotate around X axis
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.baseY * cosX - z1 * sinX;
      const z2 = z1 * cosX + p.baseY * sinX;

      p.x = x1;
      p.y = y2;
      p.z = z2;
    };

    const project = (p: Point3D) => {
      // Perspective projection
      const scale = FOCAL_LENGTH / (FOCAL_LENGTH + p.z);
      p.scale = scale;
      p.projectedX = cx + p.x * scale;
      p.projectedY = cy + p.y * scale;
      
      // Calculate alpha based on depth (z-buffer simulation)
      // Points closer are brighter, points further back fade out
      p.alpha = Math.max(0, (scale - 0.5) * 1.5);
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth Rotation Interpolation
      // Add a constant slow rotation + mouse influence
      targetRotationY += 0.002 + (mouseX * 0.00005); 
      targetRotationX += (mouseY * 0.00005);

      // Ease into the target rotation
      rotationY += (targetRotationY - rotationY) * 0.1;
      rotationX += (targetRotationX - rotationX) * 0.1;

      // Update Points
      points.forEach(p => {
        rotate(p, rotationX, rotationY);
        project(p);
      });

      // Sort points by Z depth (Painters Algorithm) so lines drawn behind don't cover front points improperly
      // Actually for this style, sorting isn't strictly necessary for "additive" look, but helps logic.
      points.sort((a, b) => b.z - a.z);

      // Draw Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        if (p1.alpha <= 0.1) continue; // Skip invisible points

        // Check neighbors (optimization: only check a subset or spatial grid, but loop is fine for <500 points)
        for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            if (p2.alpha <= 0.1) continue;

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dz = p1.z - p2.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < CONNECTION_DISTANCE) {
                const alpha = Math.min(p1.alpha, p2.alpha) * (1 - dist / CONNECTION_DISTANCE);
                ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 0.3})`; // Slate-400
                ctx.beginPath();
                ctx.moveTo(p1.projectedX, p1.projectedY);
                ctx.lineTo(p2.projectedX, p2.projectedY);
                ctx.stroke();
            }
        }
      }

      // Draw Points
      points.forEach(p => {
        if (p.alpha <= 0.01) return;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        
        const radius = DOT_RADIUS * p.scale;
        
        ctx.beginPath();
        ctx.arc(p.projectedX, p.projectedY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect for points close to camera
        if (p.z < -100) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      });
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX - rect.left) - cx;
      const y = (e.clientY - rect.top) - cy;
      
      mouseX = x;
      mouseY = y;
    };

    const handleResize = () => {
      init();
    };

    init();
    update();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />
    </div>
  );
};
