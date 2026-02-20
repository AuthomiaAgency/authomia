import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '../types';

interface CostProps {
  content: Content['costExperience'];
}

const CostExperience: React.FC<CostProps> = ({ content }) => {
  const [hoverX, setHoverX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphWidth, setGraphWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setGraphWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
       if (containerRef.current) setGraphWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setHoverX(Math.max(0, Math.min(x, rect.width)));
  };

  const handleMouseLeave = () => {
    setHoverX(null);
  };

  const getComparisons = (x: number, width: number) => {
    const percentage = x / width; 
    const month = Math.ceil(percentage * 12);
    
    // Traditional: Starts low (450 Y-inv), climbs fast to high cost (300 Y-inv)
    let tradProfit = 0;
    if (percentage < 0.2) {
        tradProfit = 500 + (percentage / 0.2) * 3000; 
    } else {
        tradProfit = 3500 - ((percentage - 0.2) * 1000); 
    }
    
    // Authomia: Starts low (450 Y-inv), slight dip then massive climb
    let authProfit = 0;
    if (percentage < 0.1) {
        authProfit = 500 + (percentage / 0.1) * 200; 
    } else {
        const growthP = (percentage - 0.1) / 0.9;
        authProfit = 700 + Math.pow(growthP, 2) * 9000; 
    }

    tradProfit = Math.round(tradProfit);
    authProfit = Math.round(authProfit);

    let efficiency = tradProfit > 0 ? Math.round(((authProfit - tradProfit) / tradProfit) * 100) : 0;
    
    const displayTrad = Math.max(0, tradProfit);
    const displayAuth = Math.max(0, authProfit);

    return { month, displayTrad, displayAuth, efficiency };
  };

  const data = hoverX !== null && graphWidth > 0 ? getComparisons(hoverX, graphWidth) : null;

  return (
    <section className="py-32 px-6 bg-[#020202] relative overflow-hidden perspective-1000">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-10">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-light text-white mb-4"
           >
             {content.title}
           </motion.h2>
           <p className="text-white/40 max-w-2xl mx-auto font-mono text-xs tracking-widest uppercase">{content.subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-authomia-blue/50 rounded-full shadow-[0_0_10px_#0A109E]" />
              <div className="text-left">
                 <p className="text-xs text-white font-mono tracking-wider">{content.labels.authomia}</p>
                 <p className="text-[10px] text-white/40">{content.labels.authomiaDesc}</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-authomia-red/50 rounded-full shadow-[0_0_10px_#B30A0A]" />
              <div className="text-left">
                 <p className="text-xs text-white font-mono tracking-wider">{content.labels.traditional}</p>
                 <p className="text-[10px] text-white/40">{content.labels.traditionalDesc}</p>
              </div>
           </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[600px] border-b border-l border-white/20 bg-white/[0.01] rounded-lg group overflow-hidden cursor-crosshair depth-card backdrop-blur-sm"
        >
           <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-bold font-mono text-white/40 tracking-[0.3em] -rotate-90 origin-center pointer-events-none whitespace-nowrap z-10">
              PROFITABILITY INDEX
           </div>
           <div className="absolute left-1/2 bottom-6 -translate-x-1/2 text-[10px] font-bold font-mono text-white/40 tracking-[0.3em] pointer-events-none z-10">
              TIME (MONTHS)
           </div>

           {/* START POINT CHANGED FROM 350 to 450 (Lower) */}
           <svg className="absolute inset-0 w-full h-full overflow-visible px-0 py-0" preserveAspectRatio="none" viewBox="0 0 1000 500">
              <defs>
                 <linearGradient id="gradAuthomia" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0A109E" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
                 </linearGradient>
                 <linearGradient id="gradTrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B30A0A" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#555" stopOpacity="1" />
                    <stop offset="100%" stopColor="#333" stopOpacity="1" />
                 </linearGradient>
                 <filter id="neonGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                 </filter>
              </defs>

              <motion.path
                d="M 0 450 C 200 200, 500 250, 1200 300" 
                fill="none"
                stroke="url(#gradTrad)"
                strokeWidth="4" 
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0.5 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />

              <motion.path
                d="M 0 450 C 300 450, 500 100, 1200 10"
                fill="none"
                stroke="url(#gradAuthomia)"
                strokeWidth="6" 
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, delay: 0.5, ease: "circOut" }}
                style={{ filter: "url(#neonGlow)" }}
              />
           </svg>

           <AnimatePresence>
             {hoverX !== null && data && (
               <>
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute top-0 bottom-0 w-[1px] bg-white/40 pointer-events-none z-20"
                   style={{ left: hoverX }}
                 />
                 <motion.div
                   initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                   animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                   exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                   transition={{ duration: 0.2, ease: "easeOut" }}
                   className="absolute top-[10%] z-30 pointer-events-none perspective-1000"
                   style={{ left: hoverX < graphWidth / 2 ? hoverX + 60 : hoverX - 300 }}
                 >
                    <div className="bg-[#050505]/95 backdrop-blur-3xl border border-white/20 p-6 rounded-xl shadow-[0_30px_80px_rgba(0,0,0,1),0_0_40px_rgba(0,240,255,0.15)] w-[280px] transform-style-3d overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                       <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3 relative z-10">
                          <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">Month {data.month}</span>
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                       </div>
                       <div className="space-y-4 mb-6 relative z-10">
                          <div className="flex justify-between items-center text-sm group">
                             <span className="text-white/40 font-light group-hover:text-white/60 transition-colors">Traditional</span>
                             <div className="font-mono text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">${data.displayTrad.toLocaleString()}</div>
                          </div>
                          <div className="flex justify-between items-center text-sm group">
                             <span className="text-white font-medium group-hover:text-authomia-blueLight transition-colors">Authomia Prime</span>
                             <div className="font-mono text-authomia-blueLight font-bold text-lg drop-shadow-[0_0_10px_rgba(77,85,255,0.8)]">${data.displayAuth.toLocaleString()}</div>
                          </div>
                       </div>
                       <div className="pt-4 border-t border-white/10 relative z-10 bg-white/[0.02] -mx-6 -mb-6 px-6 pb-6 mt-4">
                          <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Efficiency Gain</div>
                          <div className={`text-4xl font-mono font-bold ${data.efficiency >= 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500' : 'text-red-500'}`}>
                             {data.efficiency >= 0 ? '+' : ''}{data.efficiency}%
                          </div>
                       </div>
                    </div>
                 </motion.div>
               </>
             )}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CostExperience;