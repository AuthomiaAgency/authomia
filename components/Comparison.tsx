import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { X, Check } from 'lucide-react';

interface ComparisonProps {
  content: Content['comparison'];
}

const Comparison: React.FC<ComparisonProps> = ({ content }) => {
  return (
    <section className="py-24 px-6 relative bg-[#020202]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-3xl md:text-4xl font-light mb-16"
        >
          {content.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          
          {/* Chaos Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 border border-white/5 bg-white/[0.02] flex flex-col gap-6 relative overflow-hidden"
          >
             <h3 className="text-xl font-mono text-white/50 mb-4 uppercase tracking-widest">{content.left.title}</h3>
             <ul className="space-y-6 relative z-10">
               {content.left.items.map((item, i) => (
                 <li key={i} className="flex items-center gap-4 text-white/50">
                   <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
                     <X className="w-3 h-3 text-red-500" />
                   </div>
                   <span className="font-light">{item}</span>
                 </li>
               ))}
             </ul>
             
             {/* Chaos Background Animation */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 w-64 h-64 border border-dashed border-white/20 rounded-full"
                />
             </div>
          </motion.div>

          {/* Order Side (Authomia) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 border border-authomia-blue/30 bg-authomia-blue/[0.02] flex flex-col gap-6 relative overflow-hidden shadow-[0_0_50px_rgba(10,16,158,0.1)]"
          >
             <h3 className="text-xl font-mono text-authomia-blueLight mb-4 uppercase tracking-widest">{content.right.title}</h3>
             <ul className="space-y-6 relative z-10">
               {content.right.items.map((item, i) => (
                 <li key={i} className="flex items-center gap-4 text-white">
                   <div className="w-6 h-6 rounded-full bg-authomia-blue/20 flex items-center justify-center">
                     <Check className="w-3 h-3 text-authomia-blueLight" />
                   </div>
                   <span className="font-medium">{item}</span>
                 </li>
               ))}
             </ul>

             {/* Order Background Animation */}
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(10,16,158,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(10,16,158,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;
