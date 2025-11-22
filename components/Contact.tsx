
import React, { useState, useRef } from 'react';
import { Download, Mail, Linkedin, Calendar, Send, User, MessageSquare, CheckCircle, FileText, ExternalLink, Terminal, FileCheck } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { jsPDF } from "jspdf";
import { RESUME_CONTENT } from '../constants';

const Motion = motion as any;

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownload = () => {
    const doc = new jsPDF();
    
    doc.setFont("courier");
    doc.setFontSize(10);
    
    // Split text to fit page width
    const splitText = doc.splitTextToSize(RESUME_CONTENT, 180);
    
    let cursorY = 20;
    const pageHeight = doc.internal.pageSize.height;
    
    splitText.forEach((line: string) => {
        if (cursorY > pageHeight - 20) {
            doc.addPage();
            cursorY = 20;
        }
        doc.text(line, 15, cursorY);
        cursorY += 5;
    });
    
    doc.save("Ethan_C_Resume.pdf");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const containerRef = useRef<HTMLElement>(null);

  // 1. Section Ascension Logic
  // "start 90%" -> When the top of the section hits the bottom 10% of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start center"] 
  });

  // Map scroll to "Rise from the Depths" effect
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);

  const springConfig = { stiffness: 60, damping: 20 };
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <Motion.section 
      id="contact" 
      ref={containerRef}
      style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
      className="border-t border-slate-900 relative overflow-hidden py-48 md:py-96"
    >
       {/* Background Visuals - Horizon Line */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header - Standardized */}
        <Motion.div 
           initial={{ opacity: 0, filter: "blur(20px)", letterSpacing: "0.5em" }}
           whileInView={{ opacity: 1, filter: "blur(0px)", letterSpacing: "normal" }}
           transition={{ duration: 1, ease: "circOut" }}
           viewport={{ once: false }}
           className="mb-14 md:mb-20 text-center md:text-left"
        >
            <h2 className="text-[10px] font-mono text-cyan-400 tracking-[0.2em] uppercase mb-4">06. CONTACT</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
            </h3>
        </Motion.div>

        {/* 3D Perspective Container for Grand Finale */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start perspective-1000">

          {/* Left Column: Signal Hub - "3D Door Swing In Left" */}
          <Motion.div 
             initial={{ opacity: 0, x: -100, rotateY: 30 }}
             whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
             transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
             viewport={{ once: false }}
             className="space-y-10"
          >
              <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-[1.3]">
                      Open for <br/><span className="text-cyan-400">Collaboration</span>
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base mt-6 leading-loose max-w-md">
                      Available for operations management and consulting roles. If you need someone to organize your support team, improve your workflows, or configure your CX platforms, let's talk.
                  </p>
              </div>

              {/* Replaced grid with flex-col to ensure clean vertical stacking and no overlaps */}
              <div className="flex flex-col gap-4 max-w-lg w-full">
                  
                  {/* High-Tech Resume Download Module */}
                  <GlassCard 
                    className="p-0 group relative overflow-hidden transition-all border-slate-800 hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] cursor-pointer bg-[#0f172a]/80" 
                    onClick={handleDownload} 
                  >
                       <div className="p-5 flex items-center gap-5 relative z-10">
                           {/* Icon Box */}
                           <div className="h-12 w-12 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 group-hover:text-white group-hover:scale-110 group-hover:bg-purple-500 group-hover:border-purple-400 transition-all duration-300 shadow-lg">
                               <FileCheck size={22} />
                           </div>
                           
                           {/* File Metadata */}
                           <div className="flex-1 space-y-1">
                               <div className="flex items-center gap-2">
                                  <h5 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors font-display tracking-wide">
                                    Ethan_C_Resume.pdf
                                  </h5>
                                  <span className="px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[8px] font-mono font-bold uppercase">Latest</span>
                               </div>
                               <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 group-hover:text-purple-400/70 transition-colors">
                                  <span>142 KB</span>
                                  <span className="w-1 h-1 bg-slate-700 rounded-full group-hover:bg-purple-500"></span>
                                  <span>SECURE_FILE</span>
                               </div>
                           </div>

                           {/* Action Button */}
                           <div className="h-9 w-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-purple-500 group-hover:text-purple-400 transition-all">
                              <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                           </div>
                       </div>

                       {/* Progress Bar Animation */}
                       <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                       
                       {/* Hover Background Fill */}
                       <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </GlassCard>

                  {/* GoodTime Schedule Module */}
                  <a href="https://meet.goodtime.io/u/gmeal6889-100/letschat" target="_blank" rel="noreferrer" className="block w-full">
                      <GlassCard 
                        className="p-0 group relative overflow-hidden transition-all border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] bg-[#0f172a]/80" 
                        hoverEffect={false} // Disabling default to use custom fill
                      >
                          <div className="p-5 flex items-center gap-5 relative z-10">
                              <div className="h-12 w-12 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:border-cyan-500/50 transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                  <Calendar size={20} />
                              </div>
                              <div className="flex-1">
                                  <h5 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-display tracking-wide">Schedule Briefing</h5>
                                  <p className="text-[10px] font-mono text-slate-500 mt-1 group-hover:text-cyan-400/70">SYNC_CALENDAR</p>
                              </div>
                              <ExternalLink size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                          </div>

                          {/* Progress Bar Animation */}
                          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                          
                          {/* Hover Background Fill */}
                          <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </GlassCard>
                  </a>

                  {/* Small Modules Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <a href="mailto:gmeal6889@gmail.com" className="block h-full w-full">
                          <GlassCard className="p-0 h-full group relative overflow-hidden transition-all border-slate-800 hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] bg-[#0f172a]/80" hoverEffect={false}>
                               <div className="p-5 h-full flex flex-col justify-between gap-4 relative z-10">
                                   <Mail size={20} className="text-blue-400 group-hover:text-white transition-colors" />
                                   <div>
                                       <h5 className="text-xs font-bold text-white mb-1 font-display">Email Protocol</h5>
                                       <p className="text-[9px] font-mono text-slate-500 truncate group-hover:text-blue-400/70">gmeal6889</p>
                                   </div>
                               </div>

                               {/* Progress Bar Animation */}
                               <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                               {/* Hover Background Fill */}
                               <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </GlassCard>
                      </a>

                      <a href="https://linkedin.com/in/echia6889" target="_blank" rel="noreferrer" className="block h-full w-full">
                          <GlassCard className="p-0 h-full group relative overflow-hidden transition-all border-slate-800 hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] bg-[#0f172a]/80" hoverEffect={false}>
                               <div className="p-5 h-full flex flex-col justify-between gap-4 relative z-10">
                                   <Linkedin size={20} className="text-blue-400 group-hover:text-white transition-colors" />
                                   <div>
                                       <h5 className="text-xs font-bold text-white mb-1 font-display">LinkedIn</h5>
                                       <p className="text-[9px] font-mono text-slate-500 group-hover:text-blue-400/70">/in/echia6889</p>
                                   </div>
                               </div>
                               
                               {/* Progress Bar Animation */}
                               <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                               {/* Hover Background Fill */}
                               <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </GlassCard>
                      </a>
                  </div>
              </div>
          </Motion.div>

          {/* Right Column: Form Terminal - "3D Door Swing In Right" */}
          <Motion.div 
             initial={{ opacity: 0, x: 100, rotateY: -30 }}
             whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
             transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
             viewport={{ once: false }}
          >
             <GlassCard className="border-slate-800 bg-[#0f172a]/80 relative overflow-hidden flex flex-col h-full shadow-2xl p-0">
                {/* Terminal Header Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></div>
                        </div>
                        <div className="h-4 w-px bg-slate-800 mx-2"></div>
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-2 uppercase tracking-wider">
                           <Terminal size={10} /> MESSAGE_LINK
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-cyan-500/70 tracking-wider">
                        SECURE_CONNECTION
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="p-6 md:p-8 flex-grow flex flex-col">
                     <div className="mb-8">
                        <h4 className="text-xl font-display font-bold text-white mb-2">Initialize Transmission</h4>
                        <p className="text-xs font-mono text-slate-500">
                           > Awaiting input parameters...
                        </p>
                     </div>

                     <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
                        <div className="grid md:grid-cols-2 gap-5">
                           {/* Name Input */}
                           <div className="group space-y-1.5">
                               <label htmlFor="name" className="text-[9px] font-mono text-slate-500 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2 uppercase tracking-wider">
                                  // User_ID
                               </label>
                               <div className="relative">
                                  <input 
                                     type="text" 
                                     id="name"
                                     name="name"
                                     value={formState.name}
                                     onChange={handleChange}
                                     className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950 transition-all placeholder:text-slate-800 font-mono"
                                     placeholder="ENTER_NAME"
                                     required
                                  />
                               </div>
                           </div>

                           {/* Email Input */}
                           <div className="group space-y-1.5">
                               <label htmlFor="email" className="text-[9px] font-mono text-slate-500 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2 uppercase tracking-wider">
                                  // Contact_Node
                               </label>
                               <div className="relative">
                                  <input 
                                     type="email" 
                                     id="email"
                                     name="email"
                                     value={formState.email}
                                     onChange={handleChange}
                                     className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950 transition-all placeholder:text-slate-800 font-mono"
                                     placeholder="ENTER_EMAIL"
                                     required
                                  />
                               </div>
                           </div>
                        </div>

                        {/* Message Input */}
                        <div className="group space-y-1.5">
                           <label htmlFor="message" className="text-[9px] font-mono text-slate-500 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2 uppercase tracking-wider">
                              // Payload_Data
                           </label>
                           <div className="relative">
                              <textarea 
                                 id="message"
                                 name="message"
                                 value={formState.message}
                                 onChange={handleChange}
                                 rows={6}
                                 className="w-full bg-slate-950 border border-slate-800 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950 transition-all placeholder:text-slate-800 resize-none font-mono leading-relaxed"
                                 placeholder="> TYPE_MESSAGE..."
                                 required
                              />
                           </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting || isSubmitted}
                          className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs rounded-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-70 disabled:cursor-not-allowed mt-auto group relative overflow-hidden"
                        >
                           <AnimatePresence mode="wait">
                              {isSubmitted ? (
                                 <Motion.span 
                                    key="success"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    className="flex items-center gap-2 relative z-10"
                                 >
                                    [ TRANSMISSION_COMPLETE ] <CheckCircle size={14} />
                                 </Motion.span>
                              ) : isSubmitting ? (
                                 <Motion.span 
                                    key="loading"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    className="flex items-center gap-2 relative z-10"
                                 >
                                    [ UPLOADING... ]
                                 </Motion.span>
                              ) : (
                                 <Motion.span 
                                    key="idle"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    className="flex items-center gap-2 relative z-10"
                                 >
                                    EXECUTE_SEND <Send size={12} className="group-hover:translate-x-1 transition-transform" />
                                 </Motion.span>
                              )}
                           </AnimatePresence>
                           
                           {/* Subtle white gloss overlay on hover */}
                           <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </button>
                     </form>
                </div>
             </GlassCard>
          </Motion.div>

        </div>
      </div>
    </Motion.section>
  );
};

export default Contact;
