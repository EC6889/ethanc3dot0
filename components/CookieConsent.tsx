import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



// Declare global Window dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
  }
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'circOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
            {/* Tech decoration line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent"></div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Header with icon */}
              <div className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-cyan mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <h3 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
                    // Cookie_Protocol
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    We use cookies to improve your experience.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  className="flex-1 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 bg-brand-cyan hover:bg-brand-cyan-dim border border-brand-cyan hover:border-brand-cyan-dim transition-all shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                >
                  Accept
                </button>
              </div>
            </div>

            {/* Bottom tech line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CookieConsent);
