import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

import Footer from './components/Footer';
import Terms from './components/legal/Terms';
import Privacy from './components/legal/Privacy';
import NotFound from './components/NotFound';
import Maintenance from './components/Maintenance';
import { Preloader } from './components/Preloader';
import { useEntranceAnimation } from './hooks/useEntranceAnimation';
import { DigitalRain } from './components/ui/DigitalRain';
import { AnimatePresence, motion } from 'framer-motion';

import CookieConsent from './components/CookieConsent';

type ViewState = 'home' | 'terms' | 'privacy' | '404' | 'maintenance';

// Toggle this to true to enable maintenance mode manually
const MAINTENANCE_MODE = false;

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  // Orchestrated animation phases
  const animationPhases = useEntranceAnimation(triggerAnimation);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Trigger the animation sequence
    setTimeout(() => setTriggerAnimation(true), 100);
  };

  // Handle initial load and browser back button
  useEffect(() => {
    if (MAINTENANCE_MODE) {
      setView('maintenance');
      return;
    }

    const handleLocation = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setView('home');
      } else if (path === '/terms') {
        setView('terms');
      } else if (path === '/privacy') {
        setView('privacy');
      } else {
        setView('404');
      }
    };

    // Check on mount
    handleLocation();

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        handleLocation();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (newView: ViewState) => {
    if (MAINTENANCE_MODE) return;

    setView(newView);
    const path = newView === 'home' ? '/' : `/${newView}`;
    window.history.pushState({ view: newView }, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'maintenance') {
    return <Maintenance />;
  }

  if (view === '404') {
    return <NotFound onBack={() => navigateTo('home')} />;
  }

  return (
    <div className="bg-[#030712] min-h-screen text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} duration={2500} />}

      {/* Digital Rain Overlay - Cyberpunk Matrix Effect (fades out after logo) */}
      <AnimatePresence>
        {animationPhases.showDigitalRain && !animationPhases.showNav && !isLoading && (
          <motion.div
            className="fixed inset-0 z-[45] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhases.showLogo ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DigitalRain opacity={0.4} speed={1.5} />
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'home' && (
        <Navbar
          showLogo={animationPhases.showLogo}
          showNav={animationPhases.showNav}
        />
      )}

      <main className="relative z-10">
        {view === 'home' ? (
          <>
            <Hero animationPhases={animationPhases} />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </>
        ) : view === 'terms' ? (
          <Terms onBack={() => navigateTo('home')} />
        ) : (
          <Privacy onBack={() => navigateTo('home')} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <CookieConsent />

      {/* Global Background: Reduced opacity to allow section-specific backgrounds to be visible */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]">
        {/* Very subtle noise texture for coherence */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Vignette to focus center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)]"></div>
      </div>
    </div>
  );
}

export default App;
