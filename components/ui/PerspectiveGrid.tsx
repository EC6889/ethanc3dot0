
import React from "react";
import { motion } from "framer-motion";

export const PerspectiveGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. The Infinite Grid Floor */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 40] }} // Moves 1 grid square size then resets
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
          style={{
            transform: "rotateX(60deg) scale(2.5)",
            transformOrigin: "50% 0%", // Pivot from horizon
          }}
          className="w-full h-[200%] opacity-[0.2]"
        >
           {/* CSS Grid Pattern defined inline for simplicity */}
           <div 
             className="w-full h-full" 
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(34, 211, 238, 0.2) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(34, 211, 238, 0.2) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }}
           />
        </motion.div>
      </div>

      {/* 2. Horizon Fade Gradient (The "Fog") */}
      {/* Masks the top of the grid so it fades into the distance */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-transparent h-1/2 z-10" />
      
      {/* 3. Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#020617] to-transparent z-10" />

      {/* 4. Subtle Floating Particles for Atmosphere */}
      <div className="absolute inset-0 overflow-hidden z-20">
         {[...Array(15)].map((_, i) => (
            <motion.div
               key={i}
               className="absolute bg-cyan-500/30 w-0.5 h-0.5 rounded-full"
               initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%", 
                  opacity: 0 
               }}
               animate={{ 
                  y: [null, Math.random() * -100], // Float up
                  opacity: [0, 0.8, 0] 
               }}
               transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5
               }}
            />
         ))}
      </div>
    </div>
  );
};
