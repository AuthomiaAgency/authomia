import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Comparison from './components/Comparison';
import Reviews from './components/Reviews';
import Background from './components/Background';
import { BusinessContactForm } from './components/BusinessContactForm';
import Modal from './components/Modals';
import Manager from './components/Manager';
import Publications from './components/Publications';
import Survey from './components/Survey';
import Mifo from './components/Mifo';
import QuestionnairePage from './components/QuestionnairePage';
import ServicesPage from './components/ServicesPage';
import ProtocolsPage from './components/ProtocolsPage';
import WhoWeArePage from './components/WhoWeArePage';
import ContactPage from './components/ContactPage';
import { CONTENT, LOGO_ICON_URL } from './constants';
import { Language, LegalDocument } from './types';
import { Linkedin, Facebook, Instagram, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // ROUTING LOGIC
  const path = window.location.pathname;
  const [lang, setLang] = useState<Language>('es');
  const t = CONTENT[lang];

  if (path === '/manager') return <Manager />;
  if (path.startsWith('/publicaciones')) return <Publications />;
  if (path === '/encuesta') return <Survey />;
  if (path === '/material') return <Mifo />;
  if (path === '/cuestionario') return <QuestionnairePage />;
  if (path === '/servicios') return <ServicesPage content={t} />;
  if (path === '/protocolos') return <ProtocolsPage content={t} />;
  if (path === '/sobre-nosotros' || path === '/quienes-somos') return <WhoWeArePage content={t} />;
  if (path === '/contacto') return <ContactPage content={t.contact} />;

  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocument | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
  }, [path]);

  const handleLegalClick = (index: number) => {
    const keys: Array<keyof typeof t.legalDocuments> = ['privacy', 'terms', 'legalNotice'];
    if (t.legalDocuments[keys[index]]) {
      setActiveLegalDoc(t.legalDocuments[keys[index]]);
    }
  };

  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main className="relative min-h-screen text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      <Background />
      <Navbar lang={lang} setLang={setLang} />
      
      {/* 1. HERO */}
      <Hero 
        content={t.hero} 
        lang={lang}
        onCta={() => {
          const el = document.getElementById('servicios');
          el?.scrollIntoView({ behavior: 'smooth' });
        }} 
      />

      {/* 2. CORE SERVICES & CAPABILITIES */}
      <Intro lang={lang} />

      {/* 3. ENGINEERING CRITERIA VS CONVENTIONAL */}
      <Comparison content={t.comparison} />

      {/* 4. BITÁCORA & REVIEWS (SOCIAL PROOF & REVIEWS) */}
      <Reviews lang={lang} />

      {/* 5. DIRECT BUSINESS CONTACT FORM */}
      <BusinessContactForm lang={lang} />

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#040508] pt-14 pb-10 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2.5 mb-3">
               <img src={LOGO_ICON_URL} alt="Authomia" className="w-6 h-6 opacity-90" />
               <span className="font-mono tracking-[0.2em] text-sm text-white font-bold">AUTHOMIA</span>
             </div>
             <p className="text-xs text-white/50 leading-relaxed font-light">
               {lang === 'es' 
                 ? 'Diseño, ingeniería y desarrollo de infraestructura digital, plataformas web corporativas e integraciones de inteligencia estratégica.'
                 : 'Design, engineering, and deployment of digital infrastructure, enterprise web platforms, and strategic automation.'}
             </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium text-white/70 mb-3">{lang === 'es' ? 'Navegación' : 'Navigation'}</h4>
            <ul className="space-y-2.5">
               <li>
                 <a href="/#servicios" className="text-xs text-white/50 hover:text-white transition-colors">
                   {lang === 'es' ? 'Servicios' : 'Services'}
                 </a>
               </li>
               <li>
                 <a href="/servicios" className="text-xs text-white/50 hover:text-white transition-colors">
                   {lang === 'es' ? 'Detalles & FAQ' : 'Details & FAQ'}
                 </a>
               </li>
               <li>
                 <a href="/quienes-somos" className="text-xs text-white/50 hover:text-white transition-colors">
                   {lang === 'es' ? 'Quiénes Somos' : 'Who We Are'}
                 </a>
               </li>
               <li>
                 <a href="/#reseñas" className="text-xs text-white/50 hover:text-white transition-colors">
                   {lang === 'es' ? 'Reseñas' : 'Reviews'}
                 </a>
               </li>
               <li>
                 <a href="/#contacto-directo" className="text-xs text-white/50 hover:text-white transition-colors">
                   {lang === 'es' ? 'Contacto' : 'Contact'}
                 </a>
               </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium text-white/70 mb-3">{lang === 'es' ? 'Legal & Privacidad' : 'Legal & Privacy'}</h4>
            <ul className="space-y-2.5">
               {t.footer.legal.map((item, i) => (
                 <li key={i}>
                   <button onClick={() => handleLegalClick(i)} className="text-xs text-white/50 hover:text-white transition-colors text-left cursor-pointer">
                     {item}
                   </button>
                 </li>
               ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-medium text-white/70 mb-3">{lang === 'es' ? 'Contacto' : 'Contact'}</h4>
            <div className="flex gap-3 mb-5">
               <button onClick={handleLinkedInClick} className="text-white/40 hover:text-[#0077b5] transition-colors p-2 rounded-lg bg-white/[0.02] border border-white/10 cursor-pointer" aria-label="LinkedIn">
                 <Linkedin className="w-4 h-4" />
               </button>
               <a href="https://www.facebook.com/authomia" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#1877F2] transition-colors p-2 rounded-lg bg-white/[0.02] border border-white/10" aria-label="Facebook">
                 <Facebook className="w-4 h-4" />
               </a>
               <a href="https://www.instagram.com/authomia.agency/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#E4405F] transition-colors p-2 rounded-lg bg-white/[0.02] border border-white/10" aria-label="Instagram">
                 <Instagram className="w-4 h-4" />
               </a>
            </div>
            <a 
              href="#contacto-directo" 
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/[0.04] border border-white/10 hover:border-white/20 text-xs text-white/80 hover:text-white rounded-lg transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-white/60" />
              <span>{lang === 'es' ? 'Iniciar Consulta' : 'Start Consultation'}</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-white/40 gap-4">
           <span>{t.footer.copyright}</span>
           <span>Authomia Digital Engineering</span>
        </div>

        {/* Toast */}
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

      {/* Legal Modal */}
      <Modal isOpen={!!activeLegalDoc} onClose={() => setActiveLegalDoc(null)} title={activeLegalDoc?.title || ''}>
         <div className="space-y-6">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest border-b border-white/10 pb-3">{activeLegalDoc?.lastUpdated}</p>
            {activeLegalDoc?.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                 <h3 className="text-base font-medium text-white/90">{section.heading}</h3>
                 <p className="text-xs font-light leading-relaxed text-white/60 whitespace-pre-line">{section.content}</p>
              </div>
            ))}
            <div className="pt-6 border-t border-white/10 text-center">
               <p className="text-[11px] text-white/30 font-mono">Authomia Agency // Corporate Compliance</p>
            </div>
         </div>
      </Modal>

    </main>
  );
};

export default App;
