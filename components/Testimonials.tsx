import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { Quote, Radio, MessageSquarePlus, Star, Facebook } from 'lucide-react';

interface TestimonialsProps {
  content: Content['testimonials'];
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Optional cleanup if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
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
              {/* Elfsight Widget Space */}
              <div className="w-full max-w-4xl mx-auto mb-8 relative z-20 min-h-[200px] flex items-center justify-center">
                 <div className="elfsight-app-069bcaf7-54c1-4945-8f32-25bf2eb28cd8 w-full" data-elfsight-app-lazy></div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                 <a 
                   href="https://www.trustindex.io/reviews/authomia.cloud" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-8 py-3 bg-[#00b67a] text-white font-sans font-medium text-sm rounded-md hover:bg-[#00a06b] transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(0,182,122,0.2)] hover:shadow-[0_0_30px_rgba(0,182,122,0.4)] hover:-translate-y-1"
                 >
                    <Star className="w-4 h-4 fill-white" />
                    Escribir una reseña en Trustindex
                 </a>

                 <a 
                   href="https://www.facebook.com/authomia" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-8 py-3 bg-[#1877F2] text-white font-sans font-medium text-sm rounded-md hover:bg-[#166fe5] transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(24,119,242,0.2)] hover:shadow-[0_0_30px_rgba(24,119,242,0.4)] hover:-translate-y-1"
                 >
                    <Facebook className="w-4 h-4 fill-white" />
                    Escribir una opinión en Facebook
                 </a>
              </div>
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