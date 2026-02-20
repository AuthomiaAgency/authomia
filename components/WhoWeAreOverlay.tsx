import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '../types';
import { X, FileText, Megaphone, TrendingUp, Package, Users, Layers, BarChart3, Network, CreditCard, Shield, Activity, Radio, Terminal, Smartphone, MessageCircle, Send, Coins, Banknote, Rocket, Cpu, Fingerprint, Eye, Zap, Lock, Globe } from 'lucide-react';
import { LOGO_ICON_URL } from '../constants';

interface WhoWeAreOverlayProps {
  content: Content['whoWeAre'];
  onClose: () => void;
}

const iconMap: any = {
  FileText, Megaphone, TrendingUp, Package
};

// Fallback for Target if not imported (Moved up to fix block-scoped variable error)
const Target = Activity;

// Report Icons Mapping
const reportIcons = [
  Fingerprint, // Identity
  Layers,      // Nature
  Target,      // Purpose (Using Target locally def below)
  Zap,         // Method
  Activity,    // Intervention
  Shield,      // Criteria
  Users,       // Client Profile
  Globe,       // Base (Replaces Map)
  Cpu          // Synthesis
];

const WhoWeAreOverlay: React.FC<WhoWeAreOverlayProps> = ({ content, onClose }) => {
  const [sectorIndex, setSectorIndex] = useState(0);
  const [isSpecial, setIsSpecial] = useState(false); 
  
  const fullList = React.useMemo(() => {
     const list = [...content.sectors];
     list.splice(2, 0, content.specialSector);
     list.push(content.specialSector); 
     return list;
  }, [content.sectors, content.specialSector]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSectorIndex((prev) => (prev + 1) % fullList.length);
    }, 3500); 
    return () => clearInterval(interval);
  }, [fullList.length]);

  useEffect(() => {
     setIsSpecial(fullList[sectorIndex] === content.specialSector);
  }, [sectorIndex, fullList, content.specialSector]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col overflow-hidden perspective-1000"
    >
       <button onClick={onClose} className="absolute top-8 right-8 p-3 text-white/50 hover:text-white transition-colors z-50 bg-black/20 rounded-full border border-white/10">
          <X className="w-8 h-8" />
       </button>

       {/* Clean Background - Deep Black */}
       <div className="absolute inset-0 bg-[#050505]" />

       <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
             
             {/* ROULETTE SECTION */}
             <div className="mb-12 flex flex-col items-center justify-center min-h-[40vh] relative">
                <AnimatePresence>
                   {isSpecial && (
                      <motion.div 
                         initial={{ opacity: 0, scale: 0.5 }}
                         animate={{ opacity: 0.4, scale: 1.5 }}
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 bg-gradient-to-r from-authomia-blue/20 via-transparent to-authomia-red/20 blur-[100px] pointer-events-none"
                      />
                   )}
                </AnimatePresence>

                <h2 className="text-sm font-mono text-white/40 uppercase tracking-[0.3em] mb-8">
                   {content.rouletteTitle}
                </h2>
                
                <div className="h-[80px] md:h-[100px] overflow-hidden relative w-full text-center perspective-1000">
                   <AnimatePresence mode="wait">
                      <motion.div
                         key={sectorIndex}
                         initial={{ y: 50, opacity: 0, rotateX: -20 }}
                         animate={{ y: 0, opacity: 1, rotateX: 0 }}
                         exit={{ y: -50, opacity: 0, rotateX: 20 }}
                         transition={{ duration: 0.8, ease: "circOut" }}
                         className="absolute w-full flex flex-col items-center justify-center"
                      >
                         <span className={`text-3xl md:text-5xl font-light tracking-tight leading-tight ${isSpecial ? 'text-transparent bg-clip-text bg-gradient-to-r from-authomia-blueLight via-white to-authomia-redLight drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-white'}`}>
                            {fullList[sectorIndex]}
                         </span>
                         {isSpecial && (
                            <motion.div 
                               initial={{ width: 0 }} 
                               animate={{ width: "200px" }} 
                               className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mt-4" 
                            />
                         )}
                      </motion.div>
                   </AnimatePresence>
                </div>

                <div className="h-[40px] mt-4">
                   <AnimatePresence>
                      {isSpecial && (
                         <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-mono text-authomia-blueLight tracking-widest uppercase"
                         >
                            {content.specialMessage}
                         </motion.p>
                      )}
                   </AnimatePresence>
                </div>
             </div>

             {/* 3D ROTATING WHITE LOGO (Below Roulette) */}
             <div className="flex justify-center mb-32 relative">
                <motion.div 
                   animate={{ rotateY: 360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="preserve-3d"
                >
                   <img 
                      src={LOGO_ICON_URL} 
                      alt="Authomia Core" 
                      className="w-32 h-32 opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      style={{ filter: "brightness(100) contrast(100%)" }} // Make it white
                   />
                </motion.div>
                {/* Floor reflection */}
                <div className="absolute -bottom-10 w-32 h-4 bg-white/20 blur-xl rounded-[100%] opacity-20" />
             </div>

             {/* PILLARS STRIP */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 border-y border-white/5 py-12 bg-white/[0.01] backdrop-blur-sm rounded-sm">
                {content.pillars.map((pillar, i) => {
                   const Icon = iconMap[pillar.icon] || FileText;
                   return (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex flex-col items-center text-center p-4 group"
                      >
                         <Icon className="w-8 h-8 text-white/30 mb-4 group-hover:text-authomia-blueLight group-hover:drop-shadow-[0_0_10px_rgba(77,85,255,0.8)] transition-all duration-300" />
                         <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">{pillar.title}</h4>
                         <p className="text-[10px] text-white/40 font-mono">{pillar.desc.join(" / ")}</p>
                      </motion.div>
                   )
                })}
             </div>

             {/* CORPORATE REPORT (ZIG-ZAG STRUCTURE) */}
             <div className="space-y-32">
                {content.report.map((item, i) => {
                   // Exclude Map item logic from here as per request, keep text content
                   const Icon = reportIcons[i % reportIcons.length];
                   const isEven = i % 2 === 0;

                   return (
                      <motion.div 
                         key={i}
                         initial={{ opacity: 0, y: 50 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.8 }}
                         viewport={{ once: true, margin: "-100px" }}
                         className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                         {/* SYMBOL SIDE */}
                         <div className="flex-1 flex justify-center items-center">
                            <div className="relative group">
                               <div className={`absolute inset-0 blur-[50px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000 ${isEven ? 'bg-authomia-blue' : 'bg-authomia-red'}`} />
                               <div className="relative z-10 p-8 border border-white/10 bg-[#08090B] rounded-full shadow-2xl">
                                  <Icon className={`w-16 h-16 stroke-[0.5] ${isEven ? 'text-authomia-blueLight' : 'text-authomia-redLight'} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse-slow`} />
                               </div>
                               {/* Orbiting particles */}
                               <motion.div 
                                 animate={{ rotate: 360 }}
                                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                 className="absolute inset-[-20px] rounded-full border border-white/5 border-dashed"
                               />
                            </div>
                         </div>

                         {/* TEXT SIDE */}
                         <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                            <h3 className={`text-3xl font-light mb-6 tracking-tight ${isEven ? 'text-white' : 'text-white'}`}>
                               <span className={`border-b-2 pb-2 ${isEven ? 'border-authomia-blue' : 'border-authomia-red'}`}>
                                 {item.title}
                               </span>
                            </h3>
                            <p className={`text-lg font-light leading-relaxed ${isEven ? 'text-white/70' : 'text-white/60'}`}>
                               {item.content}
                            </p>
                         </div>
                      </motion.div>
                   );
                })}
             </div>

             {/* Footer Mark */}
             <div className="mt-40 flex flex-col items-center justify-center opacity-30 gap-4">
                <img src={LOGO_ICON_URL} alt="Authomia" className="w-12 h-12 invert" />
                <div className="w-[1px] h-12 bg-white/50" />
             </div>

          </div>
       </div>
    </motion.div>
  );
};

export default WhoWeAreOverlay;