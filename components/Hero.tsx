import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { LOGO_TEXT_URL } from '../constants';
import { ArrowRight, ShieldCheck, Cpu, Code2, Globe2 } from 'lucide-react';
import { WordPullUp, BlurReveal } from './ui/BlurReveal';
import { DecryptedText } from './ui/DecryptedText';

interface HeroProps {
  content: Content['hero'];
  lang?: 'es' | 'en';
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ content, lang = 'es', onCta }) => {
  const isEs = lang === 'es';

  return (
    <section className="relative min-h-[100vh] lg:min-h-[105vh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 sm:pb-28 overflow-hidden bg-[#030407]">
      {/* Precision Background Geometry */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Subtle deep ambient tone */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[750px] h-[300px] sm:h-[350px] bg-authomia-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto my-auto">
        
        {/* Brand Logo Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8"
        >
          <img 
            src={LOGO_TEXT_URL} 
            alt="Authomia Agency" 
            className="w-[130px] sm:w-[150px] md:w-[180px] h-auto invert opacity-90 object-contain mx-auto transition-transform hover:scale-105 duration-500" 
          />
        </motion.div>

        {/* Primary Headline with WordPullUp animation */}
        <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.12] text-white max-w-4xl px-2">
          {isEs ? (
            <>
              <WordPullUp words="Infraestructura digital con" delay={0.1} />{' '}
              <span className="font-serif italic font-normal text-white/90">
                <WordPullUp words="precisión técnica" delay={0.3} />
              </span>{' '}
              <WordPullUp words="e inteligencia real." delay={0.45} />
            </>
          ) : (
            <>
              <WordPullUp words="Digital infrastructure with" delay={0.1} />{' '}
              <span className="font-serif italic font-normal text-white/90">
                <WordPullUp words="technical precision" delay={0.3} />
              </span>{' '}
              <WordPullUp words="and applied intelligence." delay={0.45} />
            </>
          )}
        </div>

        {/* Subtitle with BlurReveal */}
        <BlurReveal delay={0.5} duration={0.9} yOffset={14} className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/60 max-w-2xl leading-relaxed font-light px-4">
          {isEs ? (
            <>
              Diseñamos plataformas web, automatización de procesos e integraciones de IA que transforman fricciones operativas en <span className="text-white/80">activos escalables</span>.
            </>
          ) : (
            <>
              We engineer web platforms, process automation, and applied AI systems that turn operational frictions into <span className="text-white/80">scalable digital assets</span>.
            </>
          )}
        </BlurReveal>

        {/* Actions Bar with Micro-interactions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4"
        >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCta}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#050505] hover:bg-white/90 font-medium text-sm rounded-xl transition-all duration-300 shadow-md hover:shadow-white/10 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{isEs ? 'Explorar Servicios' : 'Explore Services'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.98 }}
            href="#contacto-directo"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/[0.03] text-white border border-white/10 hover:border-white/25 font-medium text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <DecryptedText 
              text={isEs ? 'Iniciar Consulta' : 'Start Consultation'} 
              speed={35}
              maxIterations={8}
              animateOn="hover"
            />
          </motion.a>
        </motion.div>

        {/* Enterprise Highlights Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl px-2"
        >
          <div className="flex items-center justify-center gap-2 text-white/50 hover:text-white/80 transition-colors text-[11px] sm:text-xs font-mono group cursor-default">
            <Code2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/70 group-hover:text-white group-hover:rotate-6 transition-all shrink-0" />
            <DecryptedText 
              text={isEs ? 'Desarrollo a Medida' : 'Custom Engineering'} 
              speed={40}
              maxIterations={8}
              animateOn="view"
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-white/50 hover:text-white/80 transition-colors text-[11px] sm:text-xs font-mono group cursor-default">
            <Cpu className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/70 group-hover:text-white group-hover:rotate-6 transition-all shrink-0" />
            <DecryptedText 
              text={isEs ? 'Integración IA Aplicada' : 'Applied AI Systems'} 
              speed={40}
              maxIterations={8}
              animateOn="view"
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-white/50 hover:text-white/80 transition-colors text-[11px] sm:text-xs font-mono group cursor-default">
            <Globe2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/70 group-hover:text-white group-hover:rotate-6 transition-all shrink-0" />
            <DecryptedText 
              text={isEs ? 'Visibilidad y Conversión' : 'Conversion & Scale'} 
              speed={40}
              maxIterations={8}
              animateOn="view"
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-white/50 hover:text-white/80 transition-colors text-[11px] sm:text-xs font-mono group cursor-default">
            <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/70 group-hover:text-white group-hover:rotate-6 transition-all shrink-0" />
            <DecryptedText 
              text={isEs ? 'Seguridad & Soberanía' : 'Security & Ownership'} 
              speed={40}
              maxIterations={8}
              animateOn="view"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;