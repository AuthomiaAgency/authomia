import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { ArrowDown, Zap } from 'lucide-react';

interface ProcessProps {
  content: Content['process'];
}

const Process: React.FC<ProcessProps> = ({ content }) => {
  return (
    <section className="py-32 px-4 relative bg-[#020202] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
           <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">{content.title}</h2>
           <div className="w-1 h-16 bg-gradient-to-b from-transparent via-authomia-blue to-transparent mx-auto opacity-50" />
        </div>

        <div className="relative grid grid-cols-1 gap-0">
          
          {/* Central Neural Spine (The Beam) */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-white/5 z-0">
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: '100%' }}
               viewport={{ once: true }}
               transition={{ duration: 3, ease: "linear" }}
               className="w-full bg-gradient-to-b from-authomia-blue via-white to-authomia-red shadow-[0_0_20px_rgba(255,255,255,0.5)]"
             />
          </div>

          {/* BLUE PHASE NODES */}
          {content.bluePhase.steps.map((step, index) => (
            <div key={step.id} className="relative group min-h-[150px] flex md:justify-center">
               {/* Connector Dot */}
               <motion.div 
                 initial={{ scale: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                 whileInView={{ scale: 1, boxShadow: "0 0 30px rgba(10,16,158,0.6)" }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ delay: index * 0.5, duration: 0.5 }}
                 className="absolute left-[14px] md:left-1/2 md:-ml-[6px] top-8 w-3 h-3 rounded-full bg-authomia-blue z-10 border border-white/50"
               />
               
               {/* Content Card */}
               <motion.div 
                 initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ delay: index * 0.5, duration: 0.6 }}
                 className={`ml-16 md:ml-0 w-full md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:text-right md:pr-12' : 'md:ml-auto md:pl-12'}`}
               >
                 <div className="p-6 border border-authomia-blue/20 bg-[#050505] hover:bg-authomia-blue/5 transition-colors duration-500 rounded-sm relative overflow-hidden group-hover:border-authomia-blue/50">
                    <div className="absolute top-0 left-0 w-1 h-full bg-authomia-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-mono text-authomia-blue mb-2 block tracking-widest">{step.id} // {content.bluePhase.title}</span>
                    <h3 className="text-xl text-white font-medium mb-2">{step.title}</h3>
                    <p className="text-sm text-white/50 font-light">{step.desc}</p>
                 </div>
               </motion.div>
            </div>
          ))}

          {/* THE GATE (Transition) */}
          <div className="relative py-12 flex justify-center">
             <motion.div 
               initial={{ width: 0, opacity: 0 }}
               whileInView={{ width: '200px', opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2"
             />
             <div className="relative z-10 bg-[#020202] border border-white/20 px-8 py-3 rounded-full flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <div className="w-2 h-2 bg-authomia-blue rounded-full animate-pulse" />
                <span className="text-xs font-mono text-white tracking-[0.2em]">{content.barrierLabel}</span>
                <div className="w-2 h-2 bg-authomia-red rounded-full animate-pulse" />
             </div>
          </div>

          {/* RED PHASE NODES */}
          {content.redPhase.steps.map((step, index) => {
            const adjustedIndex = index + 3; // Continue delay timing
            return (
              <div key={step.id} className="relative group min-h-[150px] flex md:justify-center">
                 {/* Connector Dot */}
                 <motion.div 
                   initial={{ scale: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                   whileInView={{ scale: 1, boxShadow: "0 0 30px rgba(179,10,10,0.6)" }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ delay: 0.5, duration: 0.5 }} // Faster trigger for red phase
                   className="absolute left-[14px] md:left-1/2 md:-ml-[6px] top-8 w-3 h-3 rounded-full bg-authomia-red z-10 border border-white/50"
                 />
                 
                 {/* Content Card */}
                 <motion.div 
                   initial={{ opacity: 0, x: index % 2 !== 0 ? -50 : 50 }} // Swap direction for visual variety
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ delay: 0.5, duration: 0.6 }}
                   className={`ml-16 md:ml-0 w-full md:w-[45%] ${index % 2 !== 0 ? 'md:mr-auto md:text-right md:pr-12' : 'md:ml-auto md:pl-12'}`}
                 >
                   <div className="p-6 border border-authomia-red/20 bg-[#050505] hover:bg-authomia-red/5 transition-colors duration-500 rounded-sm relative overflow-hidden group-hover:border-authomia-red/50">
                      <div className="absolute top-0 left-0 w-1 h-full bg-authomia-red opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-xs font-mono text-authomia-red mb-2 block tracking-widest">{step.id} // {content.redPhase.title}</span>
                      <h3 className="text-xl text-white font-medium mb-2">{step.title}</h3>
                      <p className="text-sm text-white/50 font-light">{step.desc}</p>
                   </div>
                 </motion.div>
              </div>
            );
          })}
          
          {/* Final Grounding */}
          <div className="absolute bottom-0 left-[20px] md:left-1/2 w-[2px] -ml-[1px] h-24 bg-gradient-to-b from-authomia-red to-transparent opacity-50" />

        </div>
      </div>
    </section>
  );
};

export default Process;
