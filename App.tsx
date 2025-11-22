
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#030712] min-h-screen text-slate-50 selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      
      {/* Global Background: Clean, High-Contrast Tech Grid */}
      {/* Replaces the muddy colored blobs with a crisp, monochromatic texture */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712]">
         {/* Subtle Dot Matrix Pattern */}
         <div 
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
         ></div>
         
         {/* Vignette to focus center */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)]"></div>
      </div>
    </div>
  );
}

export default App;
