import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content, Language } from '../types';
import { 
  ChevronDown, 
  ArrowRight, 
  FileCode2, 
  Server, 
  Database, 
  LayoutDashboard, 
  Code2, 
  ShieldCheck,
  MessageSquare, 
  Bot, 
  FileSearch, 
  CalendarCheck2, 
  BrainCircuit, 
  Lock,
  Network, 
  Boxes, 
  Receipt, 
  Truck, 
  Zap, 
  RefreshCw,
  Layout, 
  Palette, 
  BarChart3, 
  Filter, 
  Gauge, 
  Target
} from 'lucide-react';
import Navbar from './Navbar';
import { CONTENT, LOGO_ICON_URL } from '../constants';

interface ServicesPageProps {
  content?: Content;
}

interface ServiceBlock {
  name: string;
  nameEn: string;
  icon: React.ElementType;
}

interface Division {
  id: string;
  title: string;
  titleEn: string;
  categoryTag: string;
  categoryTagEn: string;
  services: ServiceBlock[];
}

const SERVICE_DIVISIONS: Division[] = [
  {
    id: "web-cloud",
    title: "Arquitectura Web & Plataformas Cloud",
    titleEn: "Web Architecture & Cloud Platforms",
    categoryTag: "Desarrollo de Software & Infraestructura",
    categoryTagEn: "Software Engineering & Infrastructure",
    services: [
      { name: "Frontend React & Next.js", nameEn: "React & Next.js Frontend", icon: FileCode2 },
      { name: "Backend & Microservicios", nameEn: "Backend & Microservices", icon: Server },
      { name: "Bases de Datos Relacionales", nameEn: "Relational Databases", icon: Database },
      { name: "Paneles de Control & Roles", nameEn: "Custom Dashboards & RBAC", icon: LayoutDashboard },
      { name: "Optimización SEO & Core Vitals", nameEn: "SEO & Core Web Vitals", icon: Code2 },
      { name: "Repositorio & Soberanía Total", nameEn: "Code Sovereignty Handover", icon: ShieldCheck }
    ]
  },
  {
    id: "ai-agents",
    title: "Inteligencia Operativa & Asistentes Autónomos",
    titleEn: "Applied AI & Autonomous Agents",
    categoryTag: "Modelos de IA & Procesamiento Natural",
    categoryTagEn: "AI Models & Natural Language Processing",
    services: [
      { name: "Asistentes WhatsApp 24/7", nameEn: "24/7 WhatsApp AI Agents", icon: MessageSquare },
      { name: "Calificación Automática de Leads", nameEn: "Automated Lead Qualification", icon: Bot },
      { name: "Extracción de Facturas y PDF", nameEn: "Document & Invoices OCR", icon: FileSearch },
      { name: "Agendamiento Inteligente", nameEn: "Smart Calendar Booking", icon: CalendarCheck2 },
      { name: "Integración de Modelos LLM", nameEn: "LLM Fine-Tuning & APIs", icon: BrainCircuit },
      { name: "Blindaje y Privacidad de Datos", nameEn: "Enterprise Data Privacy", icon: Lock }
    ]
  },
  {
    id: "workflows",
    title: "Automatización & Sincronización de Flujos",
    titleEn: "Workflow Automation & System Sync",
    categoryTag: "Interconexión de Sistemas & Procesos",
    categoryTagEn: "System Interconnection & Processes",
    services: [
      { name: "Conexión CRM, ERP y Software", nameEn: "CRM & ERP Integration", icon: Network },
      { name: "Sincronización de Inventarios", nameEn: "Multi-Store Inventory Sync", icon: Boxes },
      { name: "Facturación y Cobro Automático", nameEn: "Automated Billing & Invoices", icon: Receipt },
      { name: "Enrutamiento de Pedidos", nameEn: "Order & Dispatch Routing", icon: Truck },
      { name: "Disparadores y Webhooks", nameEn: "Webhooks & Real-time Triggers", icon: Zap },
      { name: "Eliminación de Tareas Manuales", nameEn: "Manual Task Eradication", icon: RefreshCw }
    ]
  },
  {
    id: "conversion",
    title: "Infraestructura Comercial & Conversión",
    titleEn: "Commercial Infrastructure & Conversion",
    categoryTag: "Captación B2B & Activos de Venta",
    categoryTagEn: "B2B Acquisition & Sales Assets",
    services: [
      { name: "Landing Pages de Alto Impacto", nameEn: "High-Performance Landing Pages", icon: Layout },
      { name: "Identidad Visual Corporativa", nameEn: "Corporate Visual Identity", icon: Palette },
      { name: "Dashboards BI de Ventas", nameEn: "Sales & Pipeline Dashboards", icon: BarChart3 },
      { name: "Embudos de Captación B2B", nameEn: "B2B Acquisition Funnels", icon: Filter },
      { name: "Rendimiento Web Sub-Segundo", nameEn: "Sub-Second Speed Execution", icon: Gauge },
      { name: "Trazabilidad de Cierres", nameEn: "Conversion & Deal Tracking", icon: Target }
    ]
  }
];

export const ServicesPage: React.FC<ServicesPageProps> = () => {
  const [lang, setLang] = useState<Language>('es');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const isEs = lang === 'es';
  const currentContent = CONTENT[lang];
  const { faq } = currentContent;

  return (
    <div className="min-h-screen bg-[#030407] text-white font-sans selection:bg-white selection:text-black">
      <Navbar lang={lang} setLang={setLang} />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* Header without labels above the title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3 leading-tight"
          >
            {isEs ? (
              <>
                Desglose de Servicios & <span className="font-serif italic font-normal text-white/90">Preguntas Frecuentes</span>
              </>
            ) : (
              <>
                Services Breakdown & <span className="font-serif italic font-normal text-white/90">Frequently Asked Questions</span>
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
              ? 'Arquitectura modular para digitalizar, optimizar e interconectar cada proceso crítico de tu empresa.'
              : 'Modular architecture designed to digitize, streamline, and integrate every mission-critical process.'}
          </motion.p>
        </div>

        {/* 4 Clean Divisions */}
        <div className="space-y-10 mb-20">
          {SERVICE_DIVISIONS.map((div, idx) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#06080e] border border-white/10 shadow-2xl"
            >
              {/* Header with clean typography */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4">
                <h2 className="text-lg sm:text-2xl font-medium text-white tracking-tight">
                  {isEs ? div.title : div.titleEn}
                </h2>

                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                  {isEs ? div.categoryTag : div.categoryTagEn}
                </span>
              </div>

              {/* Clean separator line */}
              <div className="w-full h-px bg-white/10 mb-6" />

              {/* Grid of 3 blocks per row with precise icons & clean typography */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {div.services.map((srv, sIdx) => {
                  const IconComp = srv.icon;
                  return (
                    <div
                      key={sIdx}
                      className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all flex items-center gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:scale-105 transition-all shrink-0">
                        <IconComp className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-white/85 group-hover:text-white transition-colors">
                        {isEs ? srv.name : srv.nameEn}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quick request link */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/35">
                  {isEs ? 'Entregable con código propio y sin pagos mensuales' : '100% proprietary code with zero recurring fees'}
                </span>
                <a
                  href="/#contacto-directo"
                  className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>{isEs ? 'Cotizar esta división' : 'Request this division'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        {faq && faq.items && faq.items.length > 0 && (
          <div className="max-w-3xl mx-auto mb-20" id="faq">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2">
                {faq.title || (isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions')}
              </h2>
              <p className="text-xs sm:text-sm text-white/50 font-light">
                {isEs 
                  ? 'Respuestas directas a consultas sobre propiedad del código, metodología y soporte.'
                  : 'Direct answers to questions regarding code ownership, delivery timeline, and engineering support.'}
              </p>
            </div>

            <div className="space-y-3">
              {faq.items.map((item, i) => (
                <div 
                  key={i} 
                  className="border border-white/10 rounded-xl bg-[#06080e] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-medium text-white/90">{item.question}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-white/40 transition-transform duration-200 shrink-0 ${
                        expandedFaq === i ? 'rotate-180 text-white' : ''
                      }`} 
                    />
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 sm:px-5 pb-5 text-xs text-white/60 leading-relaxed font-light border-t border-white/5 pt-3"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Direct CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#06080e] border border-white/10 text-center max-w-2xl mx-auto shadow-xl">
          <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
            {isEs ? '¿Quieres evaluar una solución técnica para tu empresa?' : 'Looking for a custom engineering architecture?'}
          </h3>
          <p className="text-xs sm:text-sm text-white/50 font-light mb-6">
            {isEs 
              ? 'Analizamos tus procesos actuales y te entregamos un plan técnico claro con cotización transparente.'
              : 'We analyze your workflows and present a clear technical blueprint with transparent pricing.'}
          </p>
          <a
            href="/#contacto-directo"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-medium text-xs rounded-xl hover:bg-white/90 transition-all shadow-lg"
          >
            <span>{isEs ? 'Iniciar Consulta Directa' : 'Initiate Consultation'}</span>
            <ArrowRight size={14} />
          </a>
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
            <a href="/servicios" className="text-white font-medium">{isEs ? 'Detalles & FAQ' : 'Details & FAQ'}</a>
            <a href="/quienes-somos" className="hover:text-white transition-colors">{isEs ? 'Quiénes Somos' : 'Who We Are'}</a>
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

export default ServicesPage;

