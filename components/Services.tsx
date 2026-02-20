import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { Diamond, ArrowDown, Eye } from 'lucide-react';

interface ServicesProps {
  content: Content['services'];
  onSelect: (plan: 'blue' | 'red') => void;
}

const Services: React.FC<ServicesProps> = ({ content, onSelect }) => {
  return (
    <section className="py-32 px-4 relative z-10 perspective-1000" id="services">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Blue Diamond Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex flex-col bg-[#050505] border border-authomia-blue/20 hover:border-authomia-blue/60 transition-all duration-500 overflow-hidden rounded-sm min-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] preserve-3d cursor-pointer"
          onClick={() => onSelect('blue')}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-authomia-blue/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="p-10 relative z-10 flex flex-col h-full transform-style-3d">
            <div className="flex items-center gap-4 mb-8 translate-z-10">
               <div className="w-12 h-12 bg-authomia-blue/10 border border-authomia-blue/30 flex items-center justify-center rounded-sm group-hover:bg-authomia-blue/20 transition-colors">
                  <Diamond className="w-6 h-6 text-authomia-blueLight" />
               </div>
               <div>
                  <h3 className="text-2xl font-mono text-authomia-blueLight tracking-tight">{content.blue.name}</h3>
                  <p className="text-xs text-white/50 uppercase tracking-widest">{content.blue.subtitle}</p>
               </div>
            </div>

            <ul className="space-y-6 mb-12 flex-grow translate-z-10">
              {content.blue.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 mt-2 bg-authomia-blueLight rounded-full" />
                  {feat}
                </li>
              ))}
            </ul>

            <div className="pt-8 border-t border-white/10 translate-z-20">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-white/40">RANGO DE INVERSIÓN</span>
                  <span className="text-lg font-mono text-white">Estratégico</span>
               </div>
               <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '30%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-authomia-blueLight" 
                  />
               </div>
               <button 
                 className="w-full mt-6 py-4 border border-authomia-blue/30 text-authomia-blueLight hover:bg-authomia-blue hover:text-white transition-all duration-300 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm group-hover:shadow-[0_0_20px_rgba(10,16,158,0.3)]"
               >
                 {content.blue.cta}
                 <ArrowDown className="w-3 h-3" />
               </button>
            </div>
          </div>
        </motion.div>

        {/* Red Diamond Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex flex-col bg-[#050505] border border-authomia-red/20 hover:border-authomia-red/60 transition-all duration-500 overflow-hidden rounded-sm min-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] preserve-3d cursor-pointer"
          onClick={() => onSelect('red')}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-authomia-red/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="p-10 relative z-10 flex flex-col h-full transform-style-3d">
            <div className="flex items-center gap-4 mb-8 translate-z-10">
               <div className="w-12 h-12 bg-authomia-red/10 border border-authomia-red/30 flex items-center justify-center rounded-sm group-hover:bg-authomia-red/20 transition-colors">
                  <Diamond className="w-6 h-6 text-authomia-redLight" />
               </div>
               <div>
                  <h3 className="text-2xl font-mono text-authomia-redLight tracking-tight">{content.red.name}</h3>
                  <p className="text-xs text-white/50 uppercase tracking-widest">{content.red.subtitle}</p>
               </div>
            </div>

            <ul className="space-y-6 mb-12 flex-grow translate-z-10">
              {content.red.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 text-white/80 font-light">
                  <div className="w-1.5 h-1.5 mt-2 bg-authomia-redLight rounded-full" />
                  {feat}
                </li>
              ))}
            </ul>

            <div className="pt-8 border-t border-white/10 translate-z-20">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-white/40">RANGO DE INVERSIÓN</span>
                  <span className="text-lg font-mono text-white">Enterprise</span>
               </div>
               <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="h-full bg-authomia-redLight" 
                  />
               </div>
               <button 
                 className="w-full mt-6 py-4 border border-authomia-red/30 text-authomia-redLight hover:bg-authomia-red hover:text-white transition-all duration-300 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm group-hover:shadow-[0_0_20px_rgba(179,10,10,0.3)]"
               >
                 {content.red.cta}
                 <ArrowDown className="w-3 h-3" />
               </button>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="mt-24 flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
         <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent mb-6" />
         <p className="font-mono text-xs tracking-[0.2em] uppercase text-white flex items-center gap-3">
            <Eye className="w-4 h-4" />
            {content.hook}
         </p>
         <div className="h-16 w-[1px] bg-gradient-to-b from-white via-transparent to-transparent mt-6" />
      </div>
    </section>
  );
};

export default Services;