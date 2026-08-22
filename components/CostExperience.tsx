import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '../types';
import { TrendingUp, Activity } from 'lucide-react';

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
    const month = Math.max(1, Math.ceil(percentage * 12));
    
    // Traditional
    let tradProfit = 0;
    if (percentage < 0.2) {
        tradProfit = 500 + (percentage / 0.2) * 3000; 
    } else {
        tradProfit = 3500 - ((percentage - 0.2) * 1000); 
    }
    
    // Authomia
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
    <section className="py-28 px-6 bg-[#030407] relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono uppercase tracking-[0.2em] text-white/70 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-authomia-blueLight" />
            <span>Proyección de Eficiencia & Retorno de Inversión</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight leading-snug mb-3">
            {content.title}
          </h2>
          <p className="text-white/50 text-sm font-light leading-relaxed">{content.subtitle}</p>
        </div>

        {/* Legend */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
           <div className="flex items-center gap-3 bg-[#07090e] border border-white/10 px-4 py-2.5 rounded-lg">
              <div className="w-3 h-3 bg-authomia-blueLight rounded-sm" />
              <div className="text-left">
                 <p className="text-xs text-white font-mono uppercase tracking-wider">{content.labels.authomia}</p>
                 <p className="text-[11px] text-white/40">{content.labels.authomiaDesc}</p>
              </div>
           </div>
           <div className="flex items-center gap-3 bg-[#07090e] border border-white/10 px-4 py-2.5 rounded-lg">
              <div className="w-3 h-3 bg-red-400/80 rounded-sm" />
              <div className="text-left">
                 <p className="text-xs text-white font-mono uppercase tracking-wider">{content.labels.traditional}</p>
                 <p className="text-[11px] text-white/40">{content.labels.traditionalDesc}</p>
              </div>
           </div>
        </div>

        {/* Chart Canvas */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[480px] border border-white/10 bg-[#07090e] rounded-xl overflow-hidden cursor-crosshair shadow-2xl"
        >
           {/* Grid Lines */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

           {/* Axis Labels */}
           <div className="absolute left-4 top-4 text-[10px] font-mono text-white/40 tracking-widest uppercase pointer-events-none z-10 flex items-center gap-2">
              <Activity className="w-3 h-3 text-white/30" />
              <span>Índice de Retorno & Rentabilidad</span>
           </div>
           <div className="absolute right-4 bottom-4 text-[10px] font-mono text-white/40 tracking-widest uppercase pointer-events-none z-10">
              Horizonte Temporal (12 Meses)
           </div>

           {/* Vectors */}
           <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 500">
              {/* Traditional Curve */}
              <motion.path
                d="M 0 450 C 200 200, 500 250, 1000 320" 
                fill="none"
                stroke="#f87171"
                strokeWidth="2.5" 
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0.4 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Authomia Curve */}
              <motion.path
                d="M 0 450 C 300 450, 500 120, 1000 40"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="3.5" 
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, delay: 0.2, ease: "easeOut" }}
              />
           </svg>

           {/* Interactive Tooltip Cursor */}
           <AnimatePresence>
             {hoverX !== null && data && (
               <>
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute top-0 bottom-0 w-[1px] bg-white/30 pointer-events-none z-20"
                   style={{ left: hoverX }}
                 />
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.15 }}
                   className="absolute top-[12%] z-30 pointer-events-none"
                   style={{ left: hoverX < graphWidth / 2 ? hoverX + 30 : hoverX - 270 }}
                 >
                    <div className="bg-[#0b0e14]/95 border border-white/20 p-5 rounded-xl shadow-2xl w-[240px] text-left">
                       <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                          <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest">Mes {data.month}</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Proyectado</span>
                       </div>
                       
                       <div className="space-y-3 mb-4 text-xs font-mono">
                          <div className="flex justify-between items-center">
                             <span className="text-white/50">Convencional:</span>
                             <span className="text-red-400">${data.displayTrad.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-white font-medium">Authomia:</span>
                             <span className="text-blue-400 font-bold">${data.displayAuth.toLocaleString()}</span>
                          </div>
                       </div>

                       <div className="pt-3 border-t border-white/10">
                          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Incremento en Eficiencia</div>
                          <div className={`text-2xl font-mono font-bold ${data.efficiency >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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