
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Clock, Activity, Cpu, ChevronRight, Wifi, Battery, Monitor, Loader2, Scan, Hash, ArrowDown } from 'lucide-react';
import { InteractiveGrid } from './ui/InteractiveGrid';

const Motion = motion as any;

const ROLES = [
  "CX_OPERATIONS_MANAGER",
  "TECH_IMPLEMENTATION_LEAD",
  "WORKFLOW_ARCHITECT",
  "SYSTEM_ADMINISTRATOR"
];

const SYSTEM_LOGS = [
  "INIT_CORE...",
  "UPLINK_OK",
  "DECRYPTING...",
  "OPT_ALGO...",
  "SYS_NOMINAL",
  "SECURE_CONN...",
  "LOAD_ASSETS..."
];

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // === PARALLAX CONFIGURATION ===
  const bgY = useTransform(scrollY, [0, 1000], [0, 450]);
  const fgY = useTransform(scrollY, [0, 1000], [0, 150]);
  const fadeOut = useTransform(scrollY, [0, 600], [1, 0]);

  // --- REAL-TIME TELEMETRY STATE ---
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const [telemetry, setTelemetry] = useState({
    lat: 'SCANNING...',
    long: '',
    city: 'UNKNOWN_SECTOR',
    networkType: 'DETECTING',
    downlink: 0,
    rtt: 0,
    battery: 100,
    charging: true,
    cores: 4,
    platform: 'UNKNOWN_TERMINAL'
  });

  useEffect(() => {
    setMounted(true);
    const nav = navigator as any;
    const platform = nav.userAgentData?.platform || nav.platform || "UNKNOWN";
    const cores = nav.hardwareConcurrency || 4;

    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    const updateNetwork = () => {
       const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
       if (connection) {
         setTelemetry(prev => ({
           ...prev,
           networkType: connection.effectiveType?.toUpperCase() || 'WIFI',
           downlink: connection.downlink || 10,
           rtt: connection.rtt || 20
         }));
       }
    };

    const updateBattery = async () => {
      if (nav.getBattery) {
        try {
          const battery = await nav.getBattery();
          const updateCharge = () => {
            setTelemetry(prev => ({
              ...prev,
              battery: Math.round(battery.level * 100),
              charging: battery.charging
            }));
          };
          updateCharge();
          battery.addEventListener('levelchange', updateCharge);
          battery.addEventListener('chargingchange', updateCharge);
        } catch (e) { /* Ignore */ }
      }
    };

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
             setTelemetry(prev => ({
                ...prev,
                lat: position.coords.latitude.toFixed(4) + '° N',
                long: position.coords.longitude.toFixed(4) + '° E',
                city: 'COORDS_LOCKED'
             }));
          }, 
          () => {
             setTelemetry(prev => ({ ...prev, lat: 'ACCESS_DENIED', long: '', city: 'TRACE_BLOCKED' }));
          }
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    setTelemetry(prev => ({ ...prev, platform: platform.toUpperCase(), cores }));
    updateNetwork();
    updateBattery();
    updateLocation();
    
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    if (connection) connection.addEventListener('change', updateNetwork);

    return () => {
      clearInterval(interval);
      if (connection) connection.removeEventListener('change', updateNetwork);
    };
  }, []);

  // Typewriter Logic
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % ROLES.length;
      const fullText = ROLES[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="relative w-full h-screen bg-slate-950 overflow-hidden flex flex-col font-mono">
        
        {/* === BACKGROUND LAYERS === */}
        <Motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
             <InteractiveGrid /> 
        </Motion.div>
        
        <Motion.div style={{ opacity: fadeOut }} className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 z-10"></div>
        </Motion.div>

        <Motion.div style={{ opacity: fadeOut, y: fgY }} className="absolute inset-0 z-10 pointer-events-none">
            {/* HUD Elements (Scales, Anchors, Radar) */}
            <div className="absolute left-6 top-1/4 bottom-1/4 w-px bg-slate-800/50 hidden md:flex flex-col justify-between items-center">
                 {[...Array(10)].map((_, i) => (<div key={i} className="w-3 h-px bg-slate-700/50" />))}
                 <div className="absolute top-0 -left-1 text-[8px] text-slate-600 -rotate-90 origin-center">ELEV_01</div>
            </div>
            <div className="absolute right-6 top-1/4 bottom-1/4 w-px bg-slate-800/50 hidden md:flex flex-col justify-between items-center">
                 {[...Array(10)].map((_, i) => (<div key={i} className="w-3 h-px bg-slate-700/50" />))}
                 <div className="absolute bottom-0 -right-1 text-[8px] text-slate-600 -rotate-90 origin-center">AZIM_02</div>
            </div>
            <div className="absolute top-24 left-6 md:left-12 w-16 h-16 border-t border-l border-cyan-900/30 rounded-tl-xl opacity-50 animate-pulse"></div>
            <div className="absolute top-24 right-6 md:right-12 w-16 h-16 border-t border-r border-cyan-900/30 rounded-tr-xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-24 left-6 md:left-12 w-16 h-16 border-b border-l border-cyan-900/30 rounded-bl-xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-24 right-6 md:right-12 w-16 h-16 border-b border-r border-cyan-900/30 rounded-br-xl opacity-50 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-slate-800/20 animate-spin-slow opacity-20">
                 <div className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-t from-cyan-500/20 to-transparent origin-bottom"></div>
            </div>
        </Motion.div>

        {/* === MAIN HUD INTERFACE === */}
        <Motion.div 
            style={{ opacity: fadeOut, y: fgY }}
            className="relative z-20 flex-1 flex flex-col justify-between p-6 md:p-12 max-w-[1800px] mx-auto w-full h-full"
        >
            <div className="h-20 w-full" />

            {/* --- CENTER COMMAND STAGE --- */}
            <div className="flex-1 flex flex-col justify-center items-center text-center relative">
                
                <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 w-48 text-left">
                    <div className="border-l-2 border-cyan-900/30 pl-4 py-2">
                        <h4 className="text-[9px] text-cyan-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Activity size={10} className="animate-pulse" /> Sys_Log
                        </h4>
                        <div className="space-y-1.5">
                            {SYSTEM_LOGS.map((log, i) => (
                                <div key={i} className="text-[8px] text-slate-500 font-mono truncate flex items-center gap-2">
                                    <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 w-48 text-right items-end">
                     <div className="border-r-2 border-cyan-900/30 pr-4 py-2 w-full">
                        <h4 className="text-[9px] text-blue-500 uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                           Modules <Cpu size={10} className="animate-spin-slow" />
                        </h4>
                        <div className="space-y-1.5 flex flex-col items-end">
                            {['ZENDESK', 'SALESFORCE', 'GENESYS', 'LOOKER'].map((mod) => (
                                <div key={mod} className="flex items-center gap-2 text-[8px] text-slate-500 uppercase">
                                    {mod} <div className="w-1 h-1 bg-emerald-900/50 border border-emerald-500/50 rounded-full animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Block */}
                <Motion.div 
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="relative z-10 max-w-5xl w-full flex flex-col items-center"
                >
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 border border-dashed border-slate-800/50 rounded-full animate-spin-slow opacity-30 -z-10"></div>
                    
                    <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
                        <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                        <span className="text-[10px] md:text-[11px] text-cyan-400/90 tracking-[0.3em] uppercase font-bold font-mono px-2 border border-cyan-500/20 rounded bg-cyan-950/30 backdrop-blur-sm py-1">
                            Operational_Architect
                        </span>
                        <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                    </div>

                    {/* Redesigned Title */}
                    <div className="relative mb-6 group">
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full scale-75 opacity-50 pointer-events-none"></div>

                        {/* Main Gradient Title */}
                        <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-display font-bold tracking-tighter leading-[0.85] select-none relative z-20">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-cyan-100 to-cyan-500 filter drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                                ETHAN C.
                            </span>
                        </h1>
                        
                        {/* Reflection / Depth Layer */}
                        <h1 className="absolute inset-0 text-7xl md:text-9xl lg:text-[10rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 opacity-10 tracking-tighter leading-[0.85] select-none z-30 mix-blend-overlay">
                            ETHAN C.
                        </h1>

                        {/* Glitch/Ghost Layer (Cyan) */}
                        <h1 className="absolute inset-0 text-7xl md:text-9xl lg:text-[10rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-transparent to-cyan-600 opacity-30 tracking-tighter leading-[0.85] select-none z-10 blur-[2px] translate-y-1 scale-[1.01] origin-bottom">
                            ETHAN C.
                        </h1>

                        {/* Glitch/Ghost Layer (Blue) */}
                         <h1 className="absolute inset-0 text-7xl md:text-9xl lg:text-[10rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-transparent to-blue-600 opacity-20 tracking-tighter leading-[0.85] select-none z-0 blur-[4px] -translate-y-1 scale-[1.02] origin-top">
                            ETHAN C.
                        </h1>

                        {/* Tech Accents */}
                        <div className="absolute -right-6 top-2 text-[9px] font-mono text-cyan-500/70 font-bold tracking-widest rotate-90 origin-top-left flex items-center gap-2">
                             <span>V3.0</span> <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
                        </div>
                    </div>

                    {/* Stable Typewriter Container */}
                    <div className="h-10 flex items-center justify-center relative w-full max-w-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none"></div>
                        
                        {/* Flex container with fixed width to ensure left alignment stability */}
                        <div className="flex items-center gap-4 w-full md:w-auto md:min-w-[550px] px-4 justify-start border-l-2 border-cyan-500/30 bg-slate-900/20 py-2 rounded-r">
                             <span className="text-cyan-500 text-[10px] md:text-xs font-bold font-mono tracking-widest whitespace-nowrap shrink-0">
                                ID: USER_ADMIN //
                             </span>
                             <span className="text-sm md:text-lg text-slate-300 tracking-widest font-mono uppercase flex items-center whitespace-nowrap overflow-hidden">
                                {text}
                                <span className="w-2 h-4 md:w-2.5 md:h-5 bg-cyan-400 animate-pulse ml-1 shadow-[0_0_10px_cyan]"></span>
                             </span>
                        </div>
                    </div>

                    <Motion.div 
                       initial={{ opacity: 0, y: 30 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.8 }}
                       className="mt-16 flex flex-col md:flex-row items-center justify-center gap-5"
                    >
                        <a 
                            href="#experience" 
                            className="group relative px-8 py-4 bg-cyan-950/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] overflow-hidden hover:bg-cyan-500/10 transition-all duration-300 hover:border-cyan-400"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                            <span className="relative flex items-center gap-3">
                                Initialize_Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400 transition-all duration-300 group-hover:w-full"></div>
                            <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400 transition-all duration-300 group-hover:w-full"></div>
                        </a>
                        <a 
                            href="#contact" 
                            className="px-8 py-4 border border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-[0.2em] hover:text-white hover:border-slate-600 transition-all duration-300 hover:bg-slate-900/50 flex items-center gap-2"
                        >
                            Establish_Comms
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-green-500 transition-colors"></span>
                        </a>
                    </Motion.div>
                </Motion.div>
            </div>

            {/* --- FOOTER DASHBOARD WIDGETS --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-800/40 mt-4 relative">
                <div className="absolute top-0 left-0 h-px bg-cyan-500/50 w-0 animate-[shine_4s_ease-in-out_infinite]"></div>

                {/* TELEMETRY WIDGETS */}
                <div className="flex flex-col gap-1.5 border-r border-slate-800/30">
                    <h5 className="text-[9px] text-slate-600 uppercase tracking-widest flex items-center gap-2">
                         <Wifi size={10} /> Uplink_Status
                    </h5>
                    <div className="flex flex-col">
                       <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold font-mono">
                          {telemetry.networkType === 'DETECTING' ? (
                              <span className="animate-pulse">ESTABLISHING...</span>
                          ) : (
                              <span>{telemetry.networkType} // {telemetry.downlink}Mbps</span>
                          )}
                       </div>
                       <div className="flex items-center gap-2 text-[8px] text-slate-500 font-mono mt-0.5">
                          PING: {telemetry.rtt}ms <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
                       </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 border-r border-slate-800/30 pl-4">
                    <h5 className="text-[9px] text-slate-600 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={10} /> Geo_Tag
                    </h5>
                    <div className="flex flex-col">
                       <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold font-mono">
                          <span>{telemetry.lat} {telemetry.long}</span>
                       </div>
                       <div className="flex items-center gap-2 text-[8px] text-slate-500 font-mono mt-0.5">
                          {telemetry.city === 'SCANNING...' ? <Loader2 size={8} className="animate-spin" /> : <Scan size={8} />}
                          {telemetry.city}
                       </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 pl-4 border-r border-slate-800/30">
                     <h5 className="text-[9px] text-slate-600 uppercase tracking-widest flex items-center gap-2">
                        <Monitor size={10} /> Terminal
                     </h5>
                     <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-[10px] text-purple-400 font-bold font-mono">
                          <span>{telemetry.platform}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[8px] text-slate-500 font-mono mt-0.5">
                          <Hash size={8} /> CORES: {telemetry.cores}
                       </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 items-end">
                    <h5 className="text-[9px] text-slate-600 uppercase tracking-widest flex items-center gap-2">
                       Sys_Time <Clock size={10} />
                    </h5>
                    <span className="text-[10px] text-slate-200 font-bold font-mono tabular-nums">{time}</span>
                    <div className="flex items-center gap-2 text-[8px] text-slate-500 font-mono">
                       <Battery size={8} className={telemetry.charging ? "text-yellow-400" : "text-slate-400"} /> 
                       PWR: {telemetry.battery}%
                    </div>
                </div>
            </div>

        </Motion.div>

        {/* Gradient Fade for Section Transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
