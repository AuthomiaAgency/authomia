import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { LOGO_TEXT_URL } from '../constants';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  content: Content['hero'];
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ content, onCta }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden perspective-1000">
      
      {/* Background Neural Network Hint */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-authomia-blue/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-authomia-red/5 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: '4s' }} />
      </div>

      <div className="z-10 flex flex-col items-center gap-8 text-center max-w-5xl pt-10">
        
        {/* Breathing Logo - SMALLER, ELEGANT, HIGH POSITION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-4 mt-0 w-full flex justify-center"
        >
           <img 
            src={LOGO_TEXT_URL} 
            alt="Authomia Agency" 
            className="w-[120px] md:w-[150px] h-auto invert opacity-80 animate-pulse-slow object-contain" 
            style={{ 
              filter: 'invert(1) drop-shadow(0 0 15px rgba(10,16,158,0.5))',
              transform: 'translateZ(0)' // HW accel
            }}
           />
        </motion.div>

        {/* H1 - Smooth Fade Up */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight leading-[1.1] text-white drop-shadow-2xl"
        >
          {content.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl font-light text-white/70 max-w-3xl leading-relaxed"
        >
          {content.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-10 pb-10" 
        >
          <button 
            onClick={onCta}
            className="group relative flex items-center gap-3 px-10 py-5 bg-[#050505] border border-white/10 text-white font-mono text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:border-authomia-blue/50 hover:shadow-[0_0_40px_rgba(10,16,158,0.3)] rounded-sm overflow-hidden"
          >
            {/* Inner Glow via pseudo element inside */}
            <div className="absolute inset-0 bg-authomia-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative z-10 flex items-center gap-3 font-semibold">
              {content.ctaPrimary}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;