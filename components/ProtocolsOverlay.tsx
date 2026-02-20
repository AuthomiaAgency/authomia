import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { X, Filter, Users, Activity, Monitor, Zap, Lock, Layers, CheckCircle, FileText, Megaphone, TrendingUp, Package } from 'lucide-react';

interface ProtocolsOverlayProps {
  content: Content['protocols'];
  onClose: () => void;
}

const iconMap: any = {
  Filter, Users, Activity, Monitor, Zap, Lock, Layers, CheckCircle,
  FileText, Megaphone, TrendingUp, Package
};

const ProtocolsOverlay: React.FC<ProtocolsOverlayProps> = ({ content, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col"
    >
       {/* Header */}
       <div className="flex justify-between items-center p-8 border-b border-white/10 relative z-20 bg-[#050505] shrink-0">
          <div>
             <h2 className="text-2xl font-light text-white mb-1">{content.title}</h2>
             <p className="text-xs text-white/40 font-mono tracking-widest">{content.description}</p>
          </div>
          <button onClick={onClose} className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-colors group">
             <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
          </button>
       </div>

       {/* Scrollable Content - Clean BG */}
       <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-gradient-to-b from-[#050505] to-[#08090B] pb-20 perspective-1000">
          
          <div className="max-w-5xl mx-auto px-6 py-12">
            
            {/* 4 Pillars Section */}
            <div className="mb-24">
               <div className="text-center mb-12">
                  <h3 className="text-sm font-mono text-authomia-blueLight tracking-[0.3em] uppercase">{content.pillarsTitle}</h3>
                  <p className="text-xs text-white/30 mt-2">Base transversal de todo el protocolo</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {content.pillars.map((pillar, i) => {
                     const Icon = iconMap[pillar.icon] || FileText;
                     return (
                        <motion.div 
                           key={i}
                           initial={{ y: 20, opacity: 0 }}
                           whileInView={{ y: 0, opacity: 1 }}
                           transition={{ delay: i * 0.1 }}
                           viewport={{ once: true }}
                           whileHover={{ scale: 1.05, rotateX: 5, zIndex: 10 }}
                           className="relative p-6 bg-white/[0.02] rounded-sm group preserve-3d cursor-default"
                        >
                           {/* White Neon Border on Hover */}
                           <div className="absolute inset-0 border border-white/10 group-hover:border-white/80 transition-all duration-500 rounded-sm shadow-[0_0_0_rgba(255,255,255,0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                           
                           <div className="relative z-10 translate-z-10">
                              <div className="mb-4 text-white/50 group-hover:text-authomia-blueLight transition-colors">
                                 <Icon className="w-8 h-8" strokeWidth={1} />
                              </div>
                              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">{pillar.title}</h4>
                              <ul className="space-y-1">
                                 {pillar.desc.map((d, idx) => (
                                    <li key={idx} className="text-[10px] text-white/40 font-mono">{d}</li>
                                 ))}
                              </ul>
                              
                              {/* New Text Requirement */}
                              <div className="mt-4 pt-4 border-t border-white/5">
                                 <span className="text-[8px] uppercase tracking-widest text-white/30">
                                    Work executed in single pillar
                                 </span>
                              </div>
                           </div>
                        </motion.div>
                     );
                  })}
               </div>
               <div className="text-center mt-6">
                  <span className="text-[9px] text-white/20 font-mono uppercase tracking-widest">
                     Cada servicio se diseña e implementa dentro de uno o más de estos pilares.
                  </span>
               </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative">
               {/* Central Spine */}
               <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -ml-[1px]" />

               {content.steps.map((step, i) => {
                  const isEven = i % 2 === 0;
                  const Icon = iconMap[step.icon || 'Activity'] || Activity;
                  const colorClass = step.type === 'blue' ? 'text-authomia-blue border-authomia-blue' :
                                     step.type === 'red' ? 'text-authomia-red border-authomia-red' :
                                     step.type === 'gold' ? 'text-yellow-500 border-yellow-500' :
                                     'text-white/50 border-white/20';
                  
                  return (
                     <div key={i} className={`relative flex items-center mb-16 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        
                        {/* Timeline Node (Center) - ROTATING 3D */}
                        <div className="absolute left-0 md:left-1/2 -ml-[28px] md:-ml-[28px] w-14 h-14 rounded-full bg-[#050505] z-10 flex items-center justify-center perspective-1000">
                           <motion.div 
                             initial={{ rotateY: 0 }}
                             whileInView={{ rotateY: 360 }}
                             transition={{ duration: 2, ease: "easeInOut" }}
                             className={`w-10 h-10 rounded-full border flex items-center justify-center bg-[#08090B] ${colorClass} shadow-lg`}
                           >
                              <Icon className="w-5 h-5" />
                           </motion.div>
                        </div>

                        {/* Spacer for desktop layout */}
                        <div className="hidden md:block w-1/2" />

                        {/* Content Card */}
                        <motion.div 
                           initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true, margin: "-10%" }}
                           transition={{ duration: 0.6 }}
                           className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}
                        >
                           <div className={`p-8 border bg-[#08090B] relative group overflow-hidden ${
                              step.type === 'blue' ? 'border-authomia-blue/30 shadow-[0_0_30px_rgba(10,16,158,0.1)]' :
                              step.type === 'red' ? 'border-authomia-red/30 shadow-[0_0_30px_rgba(179,10,10,0.1)]' :
                              step.type === 'gold' ? 'border-yellow-500/30' :
                              'border-white/10'
                           } rounded-sm`}>
                              {/* Hover Glow */}
                              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-current ${colorClass.split(' ')[0]}`} />
                              
                              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-2 block ${colorClass.split(' ')[0]}`}>
                                 {step.phase}
                              </span>
                              <h3 className="text-xl font-medium text-white mb-4">{step.title}</h3>
                              <ul className={`space-y-2 ${isEven ? '' : 'md:flex md:flex-col md:items-end'}`}>
                                 {step.details.map((d, idx) => (
                                    <li key={idx} className="text-sm text-white/60 font-light flex items-center gap-2">
                                       <div className={`w-1 h-1 rounded-full ${isEven ? '' : 'order-2'} ${step.type === 'blue' ? 'bg-authomia-blue' : step.type === 'red' ? 'bg-authomia-red' : 'bg-white/30'}`} />
                                       <span className={isEven ? '' : 'order-1'}>{d}</span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </motion.div>

                     </div>
                  );
               })}
            </div>

            {/* Closure */}
            <div className="mt-20 p-8 border-t border-white/10 text-center">
               <p className="text-white/40 font-light italic max-w-2xl mx-auto">
                  "{content.closure}"
               </p>
            </div>

          </div>
       </div>
    </motion.div>
  );
};

export default ProtocolsOverlay;