import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '../types';
import { 
  Diamond, ChevronDown, Brain, Bot, MessageSquare, Headphones, 
  FileText, Cpu, TrendingUp, Megaphone, BarChart3, Code, Link, ShieldCheck, ArrowLeft 
} from 'lucide-react';
import { LOGO_ICON_URL } from '../constants';

interface ServicesPageProps {
  content: Content;
}

const iconMap: Record<string, React.ElementType> = {
  Brain, Bot, MessageSquare, Headphones, FileText, Cpu, TrendingUp, Megaphone, BarChart3, Code, Link, ShieldCheck
};

const ServicesPage: React.FC<ServicesPageProps> = ({ content }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { detailedServices, faq } = content;

  if (!detailedServices) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-authomia-blue selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img src={LOGO_ICON_URL || "https://imgur.com/R48vhCC.png"} className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" alt="Authomia" />
            <span className="font-mono text-sm tracking-widest font-bold hidden sm:block">AUTHOMIA</span>
          </a>
          
          <div>
             <a href="/" className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
               <ArrowLeft size={14} /> Volver al Inicio
             </a>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light mb-6"
          >
            Arquitectura de Servicios
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-mono text-xs uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed"
          >
            Desglose técnico de nuestros protocolos de intervención. <br/>
            Desde el diagnóstico estratégico hasta la implementación de sistemas autónomos.
          </motion.p>
        </div>

        {/* Blue Diamond Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
            <div className="w-12 h-12 bg-authomia-blue/10 border border-authomia-blue/30 flex items-center justify-center rounded-sm">
              <Diamond className="w-6 h-6 text-authomia-blueLight" />
            </div>
            <div>
              <h2 className="text-2xl font-mono text-authomia-blueLight tracking-tight">{detailedServices.blue.title}</h2>
              <p className="text-sm text-white/60 font-light mt-1">{detailedServices.blue.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailedServices.blue.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/10 bg-[#08090B] rounded-sm hover:border-authomia-blue/30 transition-colors group"
              >
                <h3 className="text-lg font-medium text-white mb-3 group-hover:text-authomia-blueLight transition-colors">{item.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Red Diamond Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
            <div className="w-12 h-12 bg-authomia-red/10 border border-authomia-red/30 flex items-center justify-center rounded-sm">
              <Diamond className="w-6 h-6 text-authomia-redLight" />
            </div>
            <div>
              <h2 className="text-2xl font-mono text-authomia-redLight tracking-tight">{detailedServices.red.title}</h2>
              <p className="text-sm text-white/60 font-light mt-1">{detailedServices.red.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedServices.red.items.map((item, idx) => {
              const Icon = iconMap[item.icon] || Code;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="p-8 border border-white/10 bg-[#08090B] rounded-sm hover:border-authomia-red/40 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon size={48} />
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-authomia-red/20 transition-colors">
                    <Icon size={20} className="text-white/70 group-hover:text-authomia-redLight transition-colors" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3 pr-8">{item.title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-white mb-4">{faq.title}</h2>
            <div className="h-1 w-20 bg-authomia-blueLight mx-auto rounded-full" />
          </div>
          
          <div className="space-y-4">
            {faq.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/10 bg-[#08090B] rounded-sm overflow-hidden hover:border-white/20 transition-colors"
              >
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors group"
                >
                  <span className="text-base font-medium text-white/90 pr-8 group-hover:text-authomia-blueLight transition-colors">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${expandedFaq === i ? 'rotate-180 text-authomia-blueLight' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-base text-white/60 font-light leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;
