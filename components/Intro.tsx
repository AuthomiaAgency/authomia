import React from 'react';
import { motion } from 'framer-motion';
import { 
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
  Target,
  ArrowRight
} from 'lucide-react';

interface IntroProps {
  lang?: 'es' | 'en';
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

const DIVISIONS: Division[] = [
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

export const Intro: React.FC<IntroProps> = ({ lang = 'es' }) => {
  const isEs = lang === 'es';

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative" id="servicios">
      
      {/* Main Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
          {isEs ? (
            <>
              Servicios de Ingeniería & <span className="font-serif italic font-normal text-white/90">Desarrollo Tecnológico</span>
            </>
          ) : (
            <>
              Engineering Services & <span className="font-serif italic font-normal text-white/90">Technology Solutions</span>
            </>
          )}
        </h2>
        <p className="mt-3 text-white/50 text-xs sm:text-sm font-light leading-relaxed">
          {isEs 
            ? '4 divisiones de ejecución técnica para sistematizar, acelerar y proteger la operación de tu empresa.'
            : '4 specialized engineering divisions built to modernize, automate, and safeguard enterprise workflows.'}
        </p>
      </div>

      {/* 4 Distinct Divisions */}
      <div className="space-y-10">
        {DIVISIONS.map((div, dIdx) => (
          <motion.div
            key={div.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: dIdx * 0.05 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#06080e] border border-white/10 shadow-2xl"
          >
            {/* Division Header with Clean Typography - No DIV prefix */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4">
              <h3 className="text-lg sm:text-2xl font-medium text-white tracking-tight">
                {isEs ? div.title : div.titleEn}
              </h3>

              <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                {isEs ? div.categoryTag : div.categoryTagEn}
              </span>
            </div>

            {/* Division Clean Line Separator */}
            <div className="w-full h-px bg-white/10 mb-6" />

            {/* Grid of 3 blocks per row with precise engineering icons & clean typography */}
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

            {/* Quick Action Link */}
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/35">
                {isEs ? 'Entregable con código propio y sin pagos mensuales' : '100% proprietary code with zero recurring fees'}
              </span>
              <a
                href="/#contacto-directo"
                className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>{isEs ? 'Cotizar servicios de esta división' : 'Request this division'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Intro;

