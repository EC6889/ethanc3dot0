
import React from 'react';
import { motion } from 'framer-motion';

interface DataPipelineProps {
  className?: string;
}

export const DataPipeline: React.FC<DataPipelineProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center pointer-events-none z-0 ${className}`}>
       {/* Main Bus Line */}
       <div className="w-full h-full bg-slate-800/40 relative overflow-hidden rounded-full">
          
          {/* Top Gradient Mask (Fade In Effect - Adjusted to allow line to extend visually higher) */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>

          {/* Primary Data Stream - Cyan */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear"
            }}
            style={{ opacity: 0.8 }}
          />
          
          {/* Secondary Data Stream - Purple (Adds complexity/rhythm) */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: 1.5
            }}
            style={{ opacity: 0.5 }}
          />

          {/* Bottom Gradient Mask (Fade out effect) */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
       </div>
    </div>
  );
};
