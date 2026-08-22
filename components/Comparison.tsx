import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';
import { WordPullUp, BlurReveal } from './ui/BlurReveal';
import { DecryptedText } from './ui/DecryptedText';

interface ComparisonProps {
  lang?: 'es' | 'en';
}

interface CriterionItem {
  dimension: string;
  dimensionEn: string;
  traditional: string;
  traditionalEn: string;
  authomia: string;
  authomiaEn: string;
}

const CRITERIA: CriterionItem[] = [
  {
    dimension: "Propiedad del Código",
    dimensionEn: "Code Ownership",
    traditional: "Plantillas cautivas y rentas mensuales obligatorias.",
    traditionalEn: "Vendor lock-in with mandatory monthly fees.",
    authomia: "Repositorio y base de datos 100% de tu empresa.",
    authomiaEn: "100% client-owned code and independent database."
  },
  {
    dimension: "Rendimiento Web",
    dimensionEn: "Performance & Speed",
    traditional: "Constructores genéricos lentos (3 a 6s de carga).",
    traditionalEn: "Heavy page builders (3 to 6s load times).",
    authomia: "Arquitectura React/Next.js sub-segundo (<0.8s).",
    authomiaEn: "Optimized React/Next.js stack (<0.8s load times)."
  },
  {
    dimension: "Automatización & IA",
    dimensionEn: "AI & Automation",
    traditional: "Plugins desarticulados sin conexión a la operativa.",
    traditionalEn: "Generic detached plugins with zero workflow sync.",
    authomia: "Agentes e integraciones directas a CRM, ERP y WhatsApp.",
    authomiaEn: "Direct custom agents tied to CRM, ERP, and WhatsApp."
  }
];

export const Comparison: React.FC<ComparisonProps> = ({ lang = 'es' }) => {
  const isEs = lang === 'es';

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 relative bg-[#030408] border-t border-white/[0.08] scroll-mt-20" id="comparativa">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16 max-w-2xl mx-auto px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
            {isEs ? (
              <>
                <WordPullUp words="Criterios Técnicos:" />{' '}
                <span className="font-serif italic font-normal text-white/90">
                  <WordPullUp words="Authomia vs. Agencias" delay={0.15} />
                </span>
              </>
            ) : (
              <>
                <WordPullUp words="Technical Matrix:" />{' '}
                <span className="font-serif italic font-normal text-white/90">
                  <WordPullUp words="Authomia vs. Traditional" delay={0.15} />
                </span>
              </>
            )}
          </h2>
          <BlurReveal delay={0.25} yOffset={10} className="mt-3 sm:mt-4 text-white/50 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            {isEs 
              ? 'Diferencias concretas de arquitectura, soberanía y rendimiento operativo.'
              : 'Concrete technical differences in architecture, ownership, and performance.'}
          </BlurReveal>
        </div>

        {/* Minimalist Executive Comparison Matrix with sleek architectural styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/10 bg-[#06080e] overflow-hidden shadow-2xl relative"
        >
          {/* Subtle top diagonal accent glow */}
          <div className="absolute top-0 right-0 w-80 h-32 bg-sky-500/5 blur-2xl pointer-events-none" />

          {/* Table Header */}
          <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.03] p-4 sm:p-5 text-xs font-mono uppercase tracking-wider relative z-10">
            <div className="col-span-4 sm:col-span-3 text-white/40">
              <DecryptedText 
                text={isEs ? 'Dimensión' : 'Criterion'} 
                speed={30}
                maxIterations={6}
                animateOn="view"
              />
            </div>
            <div className="col-span-4 sm:col-span-4 text-white/50">
              {isEs ? 'Agencia Convencional' : 'Traditional Agency'}
            </div>
            <div className="col-span-4 sm:col-span-5 text-white font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
              <span className="text-white tracking-normal font-semibold">Authomia Engineering</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5 relative z-10">
            {CRITERIA.map((row, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="grid grid-cols-12 p-4 sm:p-5 text-xs items-center gap-2 hover:bg-white/[0.025] transition-colors group"
              >
                {/* Dimension Label */}
                <div className="col-span-12 sm:col-span-3 font-mono text-white/60 group-hover:text-white/90 transition-colors text-[11px] sm:text-xs font-medium">
                  {isEs ? row.dimension : row.dimensionEn}
                </div>

                {/* Traditional Agency */}
                <div className="col-span-6 sm:col-span-4 text-white/40 flex items-start gap-2 font-light text-[11px] sm:text-xs pr-2">
                  <X className="w-3.5 h-3.5 text-rose-400/70 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>{isEs ? row.traditional : row.traditionalEn}</span>
                </div>

                {/* Authomia */}
                <div className="col-span-6 sm:col-span-5 text-white/95 font-normal flex items-start gap-2 text-[11px] sm:text-xs bg-sky-500/[0.04] sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-sky-500/10 sm:border-0 group-hover:bg-sky-500/[0.06] transition-colors">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-white">{isEs ? row.authomia : row.authomiaEn}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Comparison;

