import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GA_MEASUREMENT_ID = 'G-1VVP38P0F9';

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
    } else {
      loadGoogleAnalytics();
    }
  }, []);

  const loadGoogleAnalytics = () => {
    if (window.dataLayer) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    loadGoogleAnalytics();
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'false');
    loadGoogleAnalytics();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-lg font-semibold text-white">We value your privacy</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze our traffic. By
                  clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleReject}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200 border border-transparent hover:border-white/10"
                >
                  Reject Optional
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-black bg-white hover:bg-gray-100 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:-translate-y-0.5"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CookieConsent);
