import React from 'react';
import { motion } from 'framer-motion';
import { Content, Language } from '../types';
import { 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Workflow,
  Code2,
  Building2,
  Stethoscope,
  Truck,
  Landmark,
  ShoppingBag,
  Briefcase,
  Utensils,
  Laptop,
  GraduationCap,
  Tractor,
  Store
} from 'lucide-react';
import Navbar from './Navbar';
import { LOGO_ICON_URL } from '../constants';

interface WhoWeArePageProps {
  content?: Content;
}

const SECTORS = [
  { es: "Clínicas, Salud & Laboratorios", en: "Clinics, Health & Laboratories", icon: Stethoscope },
  { es: "Distribución, Logística & Transporte", en: "Logistics, Distribution & Transport", icon: Truck },
  { es: "Inmobiliarias & Construcción", en: "Real Estate & Construction", icon: Landmark },
  { es: "Cadenas Retail & Farmacias", en: "Retail Chains & Pharmacies", icon: ShoppingBag },
  { es: "Firmas Legales & Consultoras", en: "Law Firms & Consultancies", icon: Briefcase },
  { es: "Hotelería, Turismo & Gastronomía", en: "Hospitality & Restaurant Groups", icon: Utensils },
  { es: "Empresas de Software & SaaS", en: "Software & SaaS Companies", icon: Laptop },
  { es: "Instituciones Educativas", en: "Educational Institutions", icon: GraduationCap },
  { es: "Agroindustria & Exportación", en: "Agribusiness & Exporters", icon: Tractor },
  { es: "Empresas Familiares & Franquicias", en: "Family Businesses & Franchises", icon: Store }
];

const CORE_AREAS = [
  {
    title: "Arquitectura & Desarrollo Web",
    titleEn: "Web Architecture & Engineering",
    desc: "Plataformas web de alto rendimiento y paneles de control con código 100% propio del cliente.",
    descEn: "High-performance web platforms and dashboards with 100% proprietary code ownership.",
    icon: Code2
  },
  {
    title: "Inteligencia Artificial Aplicada",
    titleEn: "Applied Artificial Intelligence",
    desc: "Modelos y asistentes autónomos para atención 24/7, calificación de clientes y lectura de documentos.",
    descEn: "Autonomous agents for 24/7 customer handling, lead scoring, and intelligent document parsing.",
    icon: Cpu
  },
  {
    title: "Automatización & Conectividad",
    titleEn: "Automation & System Integration",
    desc: "Sincronización total entre CRM, ERP, facturación electrónica y canales de comunicación.",
    descEn: "Seamless sync across CRM, billing systems, electronic invoices, and messaging channels.",
    icon: Workflow
  },
  {
    title: "Soberanía Tecnológica",
    titleEn: "Technological Sovereignty",
    desc: "Entrega íntegra de repositorios e infraestructura cloud sin dependencias ni pagos recurrentes.",
    descEn: "Full handover of repositories and cloud setups with zero vendor lock-in or licensing fees.",
    icon: ShieldCheck
  }
];

export const WhoWeArePage: React.FC<WhoWeArePageProps> = () => {
  const [lang, setLang] = React.useState<Language>('es');
  const isEs = lang === 'es';

  return (
    <div className="min-h-screen bg-[#030407] text-white font-sans selection:bg-white selection:text-black">
      <Navbar lang={lang} setLang={setLang} />

      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        
        {/* Main Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3 leading-tight"
          >
            {isEs ? (
              <>
                Sectores de Intervención & <span className="font-serif italic font-normal text-white/90">Capacidades Técnicas</span>
              </>
            ) : (
              <>
                Target Sectors & <span className="font-serif italic font-normal text-white/90">Engineering Capabilities</span>
              </>
            )}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-xs sm:text-sm text-white/50 font-light leading-relaxed"
          >
            {isEs 
              ? 'Desarrollamos soluciones de software y automatización adaptadas a la operativa y escala de cada industria.'
              : 'We engineer software and automation solutions tailored to the operational scale of each industry.'}
          </motion.p>
        </div>

        {/* Sectors of Intervention in Foreground */}
        <div className="p-7 sm:p-9 rounded-2xl bg-[#06080e] border border-white/10 mb-16 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-white/60" />
              <span>{isEs ? 'Industrias y Sectores en los que Intervenimos' : 'Industries & Sectors We Modernize'}</span>
            </h2>
            <span className="text-[11px] font-mono text-white/40">
              {isEs ? 'Soluciones a Medida' : 'Custom Tailored Solutions'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {SECTORS.map((sec, idx) => {
              const IconComp = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white mb-2.5">
                    <IconComp className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium text-white/85 group-hover:text-white leading-snug">
                    {isEs ? sec.es : sec.en}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-16">
          <div className="pb-4 mb-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight">
              {isEs ? 'Enfoque de Ingeniería Digital' : 'Digital Engineering Approach'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CORE_AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <div 
                  key={i} 
                  className="p-5 sm:p-6 rounded-xl bg-[#06080e] border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-lg"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1">
                      {isEs ? area.title : area.titleEn}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      {isEs ? area.desc : area.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operating Principles */}
        <div className="p-7 sm:p-9 rounded-2xl bg-[#06080e] border border-white/10 space-y-6 shadow-xl mb-16">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base sm:text-lg font-medium text-white">
              {isEs ? 'Principios Técnicos' : 'Technical Principles'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-white/40 uppercase">01 / {isEs ? 'Diagnóstico Riguroso' : 'Discovery'}</span>
              <h4 className="text-xs sm:text-sm font-medium text-white">{isEs ? 'Comprender antes de programar' : 'Understand before engineering'}</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                {isEs 
                  ? 'Mapeamos la operativa y viabilidad técnica antes de iniciar la construcción del software.'
                  : 'We map operations and technical feasibility before executing production code.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-white/40 uppercase">02 / {isEs ? 'Soberanía Total' : 'Sovereignty'}</span>
              <h4 className="text-xs sm:text-sm font-medium text-white">{isEs ? 'Propiedad íntegra del cliente' : '100% Client-Owned Assets'}</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                {isEs 
                  ? 'Entregamos repositorios limpios y bases de datos independientes sin licencias cautivas.'
                  : 'We deliver clean repos and private cloud setups with zero vendor lock-in or recurring fees.'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-white/40 uppercase">03 / {isEs ? 'Utilidad Real' : 'Pragmatism'}</span>
              <h4 className="text-xs sm:text-sm font-medium text-white">{isEs ? 'Automatización medible' : 'Measurable Automation'}</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                {isEs 
                  ? 'Implementamos herramientas únicamente donde reducen costos operativos o aceleran conversiones.'
                  : 'We implement automation exclusively where it reduces costs or accelerates real pipeline.'}
              </p>
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-white/40">
              {isEs ? 'Authomia • Cobertura Nacional e Internacional' : 'Authomia • Global & National Engineering Delivery'}
            </span>
            <a
              href="/#contacto-directo"
              className="px-6 py-2.5 bg-white text-black font-medium text-xs rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 shrink-0"
            >
              <span>{isEs ? 'Iniciar Consulta' : 'Initiate Consultation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </main>

      {/* Synchronized Footer */}
      <footer className="border-t border-white/10 bg-[#040508] pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_ICON_URL} alt="Authomia" className="w-5 h-5 opacity-90" />
            <span className="font-mono tracking-[0.2em] text-xs text-white font-bold">AUTHOMIA</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-white/50">
            <a href="/" className="hover:text-white transition-colors">{isEs ? 'Inicio' : 'Home'}</a>
            <a href="/#servicios" className="hover:text-white transition-colors">{isEs ? 'Servicios' : 'Services'}</a>
            <a href="/servicios" className="hover:text-white transition-colors">{isEs ? 'Detalles & FAQ' : 'Details & FAQ'}</a>
            <a href="/quienes-somos" className="text-white font-medium">{isEs ? 'Quiénes Somos' : 'Who We Are'}</a>
            <a href="/#reseñas" className="hover:text-white transition-colors">{isEs ? 'Reseñas' : 'Reviews'}</a>
            <a href="/#contacto-directo" className="hover:text-white transition-colors">{isEs ? 'Contacto' : 'Contact'}</a>
          </div>
          <span className="text-xs text-white/40 font-mono">
            © {new Date().getFullYear()} Authomia
          </span>
        </div>
      </footer>
    </div>
  );
};

export default WhoWeArePage;

