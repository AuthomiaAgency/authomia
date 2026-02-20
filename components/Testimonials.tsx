import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { Quote, Radio, MessageSquarePlus } from 'lucide-react';

interface TestimonialsProps {
  content: Content['testimonials'];
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section className="py-24 px-6 bg-[#030303] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12 opacity-50">
           <Quote className="w-5 h-5 text-white" />
           <span className="text-xs font-mono uppercase tracking-[0.2em]">{content.title}</span>
        </div>

        {/* The Void Container */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[#08090B] border border-white/5 p-12 pb-16 rounded-sm relative overflow-hidden group hover:border-white/10 transition-colors"
        >
           {/* Scanline Animation */}
           <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
           <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-[scan_4s_linear_infinite]" />

           <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Icon moved lower with mt-6 */}
              <div className="mt-6 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center animate-pulse border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                 <Radio className="w-6 h-6 text-white/30" />
              </div>
              
              <h3 className="text-xl font-mono text-white tracking-tight">{content.voidTitle}</h3>
              <p className="text-sm text-white/40 max-w-lg leading-relaxed font-light">
                 {content.voidDesc}
              </p>

              <button className="mt-4 px-6 py-3 border border-white/20 text-white/60 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center gap-3">
                 <MessageSquarePlus className="w-3 h-3" />
                 {content.cta}
              </button>
           </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;