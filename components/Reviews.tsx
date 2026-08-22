import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, ExternalLink, Facebook, ShieldCheck, MessageSquarePlus } from 'lucide-react';
import { WordPullUp, BlurReveal } from './ui/BlurReveal';

interface ReviewsProps {
  lang?: 'es' | 'en';
}

export const Reviews: React.FC<ReviewsProps> = ({ lang = 'es' }) => {
  const isEs = lang === 'es';

  useEffect(() => {
    // Load Elfsight platform script for verified review widget
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="reseñas" className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#030407] border-t border-white/[0.08] relative overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 px-2">
          <div className="text-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-3">
              {isEs ? (
                <>
                  <WordPullUp words="Reseñas &" />{' '}
                  <span className="font-serif italic font-normal text-white/90">
                    <WordPullUp words="Testimonios Verificados" delay={0.15} />
                  </span>
                </>
              ) : (
                <>
                  <WordPullUp words="Verified Reviews &" />{' '}
                  <span className="font-serif italic font-normal text-white/90">
                    <WordPullUp words="Client Feedback" delay={0.15} />
                  </span>
                </>
              )}
            </h2>
            <BlurReveal delay={0.2} yOffset={8} className="text-white/50 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              {isEs 
                ? 'Valoraciones transparentes y opiniones públicas de empresas y profesionales que operan con nuestra infraestructura.'
                : 'Direct public ratings and feedback from organizations operating on our engineering infrastructure.'}
            </BlurReveal>
          </div>
        </div>

        {/* Live Widget & Verified Portals Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#06080e] border border-white/10 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl space-y-8"
        >
          
          {/* Elfsight Reviews Widget */}
          <div className="min-h-[220px] w-full flex items-center justify-center">
            <div className="elfsight-app-069bcaf7-54c1-4945-8f32-25bf2eb28cd8 w-full" data-elfsight-app-lazy></div>
          </div>

          {/* Verification Portals */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/50 font-light">
              {isEs 
                ? 'Consulta calificaciones y testimonios auditados en nuestras plataformas públicas oficiales.'
                : 'Check audited reviews and client ratings across our verified public channels.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://www.trustindex.io/reviews/authomia.cloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#00b67a] hover:bg-[#00a06b] text-white text-xs font-medium rounded-xl transition-all flex items-center gap-2 shadow"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>Trustindex</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </motion.a>

              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://www.facebook.com/authomia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-medium rounded-xl transition-all flex items-center gap-2 shadow"
              >
                <Facebook className="w-3.5 h-3.5 fill-white" />
                <span>Facebook Reviews</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </motion.a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Reviews;

