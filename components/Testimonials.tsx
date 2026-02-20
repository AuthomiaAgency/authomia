import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { Quote, Radio, MessageSquarePlus, Star } from 'lucide-react';

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
              {/* Trustindex Widget Space */}
              <div className="w-full max-w-4xl mx-auto mb-8 relative z-20 min-h-[200px] flex items-center justify-center">
                 <div className="w-full" src='https://cdn.trustindex.io/loader.js?c1944fc653ab348af1969151da0'></div>
              </div>

              <a 
                href="https://www.trustindex.io/reviews/authomia.cloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 px-8 py-3 bg-[#00b67a] text-white font-sans font-medium text-sm rounded-md hover:bg-[#00a06b] transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(0,182,122,0.2)] hover:shadow-[0_0_30px_rgba(0,182,122,0.4)] hover:-translate-y-1"
              >
                 <Star className="w-4 h-4 fill-white" />
                 Escribir una reseña en Trustindex
              </a>
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