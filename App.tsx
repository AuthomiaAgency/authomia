import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Comparison from './components/Comparison';
import Services from './components/Services';
import Process from './components/Process';
import AppExperience from './components/AppExperience';
import CostExperience from './components/CostExperience';
import Clients from './components/Clients';
import Testimonials from './components/Testimonials';
import Background from './components/Background';
import NeuroConcierge from './components/NeuroConcierge';
import Modal from './components/Modals';
import Manager from './components/Manager';
import Publications from './components/Publications';
import Survey from './components/Survey';
import QuestionnairePage from './components/QuestionnairePage'; // NEW PAGE COMPONENT
import ProtocolsOverlay from './components/ProtocolsOverlay';
import WhoWeAreOverlay from './components/WhoWeAreOverlay';
import { CONTENT, LOGO_ICON_URL } from './constants';
import { Language, LegalDocument } from './types';
import { Shield, Lock, Eye, ArrowRight, Diamond, Linkedin, Facebook, Instagram, ChevronDown, X, MapPin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // ROUTING LOGIC
  const path = window.location.pathname;
  if (path === '/manager') return <Manager />;
  if (path === '/publicaciones') return <Publications />;
  if (path === '/encuesta') return <Survey />;
  if (path === '/cuestionario') return <QuestionnairePage />; // Independent Page

  const [lang, setLang] = useState<Language>('es');
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocument | null>(null);
  
  // Logic for Final CTA Display (Single or Dual)
  const [targetPlan, setTargetPlan] = useState<'blue' | 'red' | null>(null);

  // New Overlay States
  const [showFaq, setShowFaq] = useState(false);
  const [showProtocols, setShowProtocols] = useState(false);
  const [showWhoWeAre, setShowWhoWeAre] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  const t = CONTENT[lang];

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
  }, []);

  // Updated Scroll Logic: Sets target plan and scrolls to footer
  const handleServiceSelect = (plan: 'blue' | 'red') => {
    setTargetPlan(plan);
    const el = document.getElementById('final-cta');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLegalClick = (index: number) => {
    const keys: Array<keyof typeof t.legalDocuments> = ['privacy', 'terms', 'legalNotice'];
    if (t.legalDocuments[keys[index]]) {
      setActiveLegalDoc(t.legalDocuments[keys[index]]);
    }
  };

  const handleNavClick = (item: string) => {
    if (item === 'FAQ') setShowFaq(true);
    if (item.includes('Protocolos') || item.includes('Protocols')) setShowProtocols(true);
    if (item.includes('Quiénes') || item.includes('Who')) setShowWhoWeAre(true);
  };

  const handleContactClick = () => {
    setShowContact(true);
  };

  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main className="relative min-h-screen text-white selection:bg-authomia-blue selection:text-white font-sans overflow-x-hidden">
      <Background />
      <Navbar lang={lang} setLang={setLang} />
      
      {/* 1. THE HOOK */}
      <Hero content={t.hero} onCta={() => {
         const el = document.getElementById('services');
         el?.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 2. THE DEFINITION */}
      <Intro content={t.intro} />
      
      {/* 3. THE PROOF */}
      <AppExperience content={t.appExperience} />

      {/* 4. THE CONTRAST */}
      <Comparison content={t.comparison} />

      {/* 5. THE LOGIC */}
      <CostExperience content={t.costExperience} />

      {/* 6. THE SOLUTION - Passes handler to set target plan */}
      <div id="services">
        <Services content={t.services} onSelect={handleServiceSelect} />
      </div>

      {/* 7. THE METHOD */}
      <Process content={t.process} />
      
      {/* 8. SOCIAL PROOF */}
      <Testimonials content={t.testimonials} />

      {/* 9. THE SCARCITY */}
      <Clients content={t.clients} />

      {/* 10. THE CLOSE - DYNAMIC BUTTONS */}
      <section id="final-cta" className="py-32 px-6 bg-[#020202] relative overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          <h2 className="text-3xl md:text-5xl font-light text-white mb-16 leading-tight">
            {t.finalCta.title}
          </h2>

          <div className={`grid gap-8 ${targetPlan ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
             
             {/* Blue Option - Show if no target selected OR target is blue */}
             {(!targetPlan || targetPlan === 'blue') && (
               <div className={`group relative p-8 border border-authomia-blue/20 bg-[#050505] hover:border-authomia-blue/60 transition-colors rounded-sm text-left ${targetPlan === 'blue' ? 'border-authomia-blue/60 shadow-[0_0_50px_rgba(10,16,158,0.2)]' : ''}`}>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-authomia-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-4">
                     <Diamond className="w-5 h-5 text-authomia-blueLight" />
                     <span className="font-mono text-authomia-blueLight tracking-widest text-sm">BLUE DIAMOND PRIME</span>
                  </div>
                  <p className="text-white/60 font-light text-sm mb-8 min-h-[40px]">{t.finalCta.blueSummary}</p>
                  <a href="/cuestionario?plan=blue" className="w-full py-6 bg-authomia-blue/10 text-authomia-blueLight border border-authomia-blue/30 hover:bg-authomia-blue hover:text-white transition-all font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                     {t.services.blue.cta}
                     <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
             )}

             {/* Red Option - Show if no target selected OR target is red */}
             {(!targetPlan || targetPlan === 'red') && (
               <div className={`group relative p-8 border border-authomia-red/20 bg-[#050505] hover:border-authomia-red/60 transition-colors rounded-sm text-left ${targetPlan === 'red' ? 'border-authomia-red/60 shadow-[0_0_50px_rgba(179,10,10,0.2)]' : ''}`}>
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-authomia-red opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-4">
                     <Diamond className="w-5 h-5 text-authomia-redLight" />
                     <span className="font-mono text-authomia-redLight tracking-widest text-sm">RED DIAMOND PRIME</span>
                  </div>
                  <p className="text-white/60 font-light text-sm mb-8 min-h-[40px]">{t.finalCta.redSummary}</p>
                  <a href="/cuestionario?plan=red" className="w-full py-6 bg-authomia-red/10 text-authomia-redLight border border-authomia-red/30 hover:bg-authomia-red hover:text-white transition-all font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                     {t.services.red.cta}
                     <ArrowRight className="w-4 h-4" />
                  </a>
               </div>
             )}
          </div>
          
          {/* Reset Selection Button (Only if filter is active) */}
          {targetPlan && (
             <button onClick={() => setTargetPlan(null)} className="mt-12 text-xs font-mono text-white/30 hover:text-white underline decoration-white/30 hover:decoration-white underline-offset-4">
                Ver todas las opciones disponibles
             </button>
          )}

          {/* Quality Assurance Disclaimer */}
          <div className="mt-16 max-w-2xl mx-auto px-4">
             <p className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                * Para garantizar la excelencia operativa y la precisión estratégica, Authomia limita su capacidad mensual a <span className="text-authomia-redLight">1 proyecto Red Diamond</span> y <span className="text-authomia-blueLight">4 proyectos Blue Diamond</span>. La calidad no es negociable.
             </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center gap-12 mt-20 opacity-30">
             <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-white stroke-[1]" />
                <span className="text-[9px] font-mono uppercase tracking-widest">Secured</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Lock className="w-6 h-6 text-white stroke-[1]" />
                <span className="text-[9px] font-mono uppercase tracking-widest">Encrypted</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Eye className="w-6 h-6 text-white stroke-[1]" />
                <span className="text-[9px] font-mono uppercase tracking-widest">Private</span>
             </div>
          </div>

        </div>
      </section>

      {/* EXTENDED FOOTER */}
      <footer className="border-t border-white/5 bg-[#08090B] pt-20 pb-12 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
             <span className="font-mono tracking-[0.3em] text-sm text-white block mb-6">AUTHOMIA</span>
             <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
               Engineering Intelligence for businesses that demand absolute precision and scalable autonomy.
             </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
               {t.footer.nav.map((item, i) => (
                 <li key={i}>
                   <button onClick={() => handleNavClick(item)} className="text-sm text-white/60 hover:text-white transition-colors">
                     {item}
                   </button>
                 </li>
               ))}
               <li>
                  <a href="/publicaciones" className="text-sm text-white/60 hover:text-authomia-blueLight transition-colors flex items-center gap-2">
                    Publicaciones
                  </a>
               </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
               {t.footer.legal.map((item, i) => (
                 <li key={i}>
                   <button onClick={() => handleLegalClick(i)} className="text-sm text-white/60 hover:text-white transition-colors">
                     {item}
                   </button>
                 </li>
               ))}
            </ul>
          </div>

          {/* Connect (Updated Links) */}
          <div>
            <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex gap-6">
               <button onClick={handleLinkedInClick} className="text-white/40 hover:text-[#0077b5] transition-colors relative">
                 <Linkedin className="w-6 h-6" />
               </button>
               <a href="https://www.facebook.com/authomia" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#1877F2] transition-colors">
                 <Facebook className="w-6 h-6" />
               </a>
               <a href="https://www.instagram.com/authomia.agency/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#E4405F] transition-colors">
                 <Instagram className="w-6 h-6" />
               </a>
            </div>
            <div className="mt-8">
               <button onClick={handleContactClick} className="px-6 py-3 border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                 {t.footer.contact}
               </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex justify-between items-center text-xs text-white/20 font-mono">
           <span>{t.footer.copyright}</span>
           <span>v3.0.1-QUANTUM</span>
        </div>

        {/* Toast for Coming Soon */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-xs font-mono tracking-widest text-white border border-white/20 shadow-xl z-50"
            >
               Próximamente en Authomia Network
            </motion.div>
          )}
        </AnimatePresence>
      </footer>

      {/* OVERLAYS (FAQ, Protocols, Contact, Legal, WhoWeAre) - Same as before */}
      <AnimatePresence>
        {showFaq && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowFaq(false)}
          >
             <motion.div 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: 50, opacity: 0 }}
               className="w-full max-w-4xl bg-[#0A0A0A]/95 border border-white/10 rounded-lg shadow-2xl overflow-hidden"
               onClick={(e) => e.stopPropagation()}
             >
                <div className="p-8 border-b border-white/10 flex justify-between items-center">
                   <h2 className="text-2xl font-light text-white">{t.faq.title}</h2>
                   <button onClick={() => setShowFaq(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                   <div className="space-y-2">
                     {t.faq.items.map((item, i) => (
                        <div key={i} className="border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden">
                           <button 
                             onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                             className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors group"
                           >
                              <span className="text-sm font-medium text-white/90 pr-4 group-hover:text-authomia-blueLight transition-colors">{item.question}</span>
                              <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${expandedFaq === i ? 'rotate-180 text-authomia-blueLight' : ''}`} />
                           </button>
                           <AnimatePresence>
                             {expandedFaq === i && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden"
                               >
                                  <div className="p-6 pt-0 text-sm text-white/60 font-light leading-relaxed border-t border-white/5">
                                     {item.answer}
                                  </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                     ))}
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProtocols && (
          <ProtocolsOverlay content={t.protocols} onClose={() => setShowProtocols(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
         {showWhoWeAre && (
            <WhoWeAreOverlay content={t.whoWeAre} onClose={() => setShowWhoWeAre(false)} />
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showContact && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-[#020202] flex flex-col md:flex-row"
            >
               <button onClick={() => setShowContact(false)} className="absolute top-8 right-8 p-3 text-white z-50 bg-black/50 rounded-full hover:bg-white/20">
                  <X className="w-6 h-6" />
               </button>

               {/* Left: Info */}
               <div className="w-full md:w-1/3 p-12 flex flex-col justify-center relative z-20 bg-[#050505] border-r border-white/5">
                  <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                  >
                     <img src={LOGO_ICON_URL} alt="Authomia" className="w-12 h-12 invert mb-8 opacity-80" />
                     <h2 className="text-4xl font-light text-white mb-12">{t.contact.title}</h2>

                     <div className="space-y-10">
                        <a href={`mailto:${t.contact.email}`} className="flex items-center gap-6 group">
                           <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                              <Mail className="w-5 h-5 text-authomia-blueLight" />
                           </div>
                           <div>
                              <span className="text-xs font-mono text-white/40 block mb-1">EMAIL</span>
                              <span className="text-lg text-white font-light group-hover:text-authomia-blueLight transition-colors">{t.contact.email}</span>
                           </div>
                        </a>
                        <div className="flex items-center gap-6 group cursor-default">
                           <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center transition-colors">
                              <Phone className="w-5 h-5 text-white" />
                           </div>
                           <div>
                              <span className="text-xs font-mono text-white/40 block mb-1">PHONE</span>
                              <span className="text-lg text-white font-light select-all">{t.contact.phone}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-authomia-redLight" />
                           </div>
                           <div>
                              <span className="text-xs font-mono text-white/40 block mb-1">{t.contact.locationLabel}</span>
                              <span className="text-lg text-white font-light">{t.contact.location}</span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Right: IMAGE MAP */}
               <div className="w-full md:w-2/3 relative bg-[#020202] overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     <img 
                        src="https://i.imgur.com/8INA5kg.png" 
                        alt="Peru Map" 
                        className="w-full max-h-[70vh] object-contain opacity-80 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-float"
                        style={{ filter: "invert(1) grayscale(100%) brightness(150%)" }} 
                     />
                     <div className="absolute animate-float" style={{ top: '52%', left: '48%' }}>
                        <div className="relative flex flex-col items-center group cursor-pointer perspective-1000">
                           <motion.div 
                             initial={{ y: -50, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                             whileHover={{ y: -10 }}
                             className="relative z-20 preserve-3d"
                           >
                              <div className="w-8 h-8 bg-authomia-red rounded-full flex items-center justify-center shadow-[0_0_20px_#B30A0A] border-2 border-white relative z-10">
                                 <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                              <div className="w-1 h-6 bg-white mx-auto -mt-1 shadow-lg" />
                              <div className="w-4 h-1 bg-black/50 blur-sm mx-auto rounded-full" />
                           </motion.div>
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.8 }}
                             className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#050505] border border-white/20 px-4 py-2 rounded-sm whitespace-nowrap shadow-xl"
                           >
                              <span className="text-xs font-mono font-bold text-white block">JAUJA, JUNÍN</span>
                              <span className="text-[9px] text-white/50 block tracking-widest">HQ CENTER</span>
                           </motion.div>
                           <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-32 h-32 border border-authomia-red/50 rounded-full animate-ping opacity-20 pointer-events-none" />
                           <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-64 h-64 border border-authomia-red/30 rounded-full animate-pulse opacity-10 pointer-events-none" />
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <Modal isOpen={!!activeLegalDoc} onClose={() => setActiveLegalDoc(null)} title={activeLegalDoc?.title || ''}>
         <div className="space-y-8">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest border-b border-white/10 pb-4">{activeLegalDoc?.lastUpdated}</p>
            {activeLegalDoc?.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                 <h3 className="text-lg font-medium text-white/90">{section.heading}</h3>
                 <p className="text-sm font-light leading-relaxed text-white/60 whitespace-pre-line">{section.content}</p>
              </div>
            ))}
            <div className="pt-8 mt-8 border-t border-white/10 text-center">
               <p className="text-xs text-white/30 italic">Authomia Agency // Compliance Dept.</p>
            </div>
         </div>
      </Modal>

      {/* <NeuroConcierge /> */}
    </main>
  );
};

export default App;