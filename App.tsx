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
import Mifo from './components/Mifo';
import QuestionnairePage from './components/QuestionnairePage';
import ServicesPage from './components/ServicesPage';
import ProtocolsPage from './components/ProtocolsPage'; // NEW
import WhoWeArePage from './components/WhoWeArePage'; // NEW
import ContactPage from './components/ContactPage'; // NEW
import { CONTENT, LOGO_ICON_URL } from './constants';
import { Language, LegalDocument } from './types';
import { Shield, Lock, Eye, ArrowRight, Diamond, Linkedin, Facebook, Instagram, ChevronDown, X, MapPin, Mail, Phone, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
  if (path === '/protocolos') return <ProtocolsPage content={t} />; // NEW ROUTE
  if (path === '/sobre-nosotros') return <WhoWeArePage content={t} />; // NEW ROUTE
  if (path === '/contacto') return <ContactPage content={t.contact} />; // NEW ROUTE

  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocument | null>(null);
  
  // Logic for Final CTA Display (Single or Dual)
  const [targetPlan, setTargetPlan] = useState<'blue' | 'red' | null>(null);

  const [showToast, setShowToast] = useState(false);

  // Join Team State
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinTeamData, setJoinTeamData] = useState({ name: '', email: '', specialty: '', pastProjects: '', socialUrl: '' });
  const [joinTeamStatus, setJoinTeamStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleJoinTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinTeamStatus('submitting');
    try {
      const appDoc = await getDoc(doc(db, 'appData', 'applications'));
      const currentApps = appDoc.exists() ? appDoc.data().items || [] : [];
      const newApp = {
        id: Date.now().toString(),
        ...joinTeamData,
        date: new Date().toISOString()
      };
      await setDoc(doc(db, 'appData', 'applications'), { items: [...currentApps, newApp] });
      setJoinTeamStatus('success');
      setJoinTeamData({ name: '', email: '', specialty: '', pastProjects: '', socialUrl: '' });
      setTimeout(() => setJoinTeamStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setJoinTeamStatus('error');
      setTimeout(() => setJoinTeamStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
  }, [path]);

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
    if (item.includes('FAQ') || item.includes('Servicios')) {
       window.location.href = '/servicios';
       return;
    }
    if (item.includes('Protocolos') || item.includes('Protocols')) {
       window.location.href = '/protocolos';
       return;
    }
    if (item.includes('Quiénes') || item.includes('Who')) {
       window.location.href = '/sobre-nosotros';
       return;
    }
  };

  const handleContactClick = () => {
    window.location.href = '/contacto';
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

      {/* 11. JOIN THE TEAM */}
      <section className="py-24 px-6 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,16,158,0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">¿Quieres formar parte del equipo técnico de Authomia?</h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Buscamos talento excepcional para proyectos de alto impacto.</p>
          </div>

          {!showJoinForm ? (
             <div className="flex justify-center">
                <button 
                   onClick={() => setShowJoinForm(true)}
                   className="group relative px-10 py-5 bg-transparent overflow-hidden rounded-full transition-all duration-500 hover:scale-105"
                >
                   {/* Animated Border */}
                   <div className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50 group-hover:opacity-100 group-hover:animate-spin-slow" />
                   <div className="absolute inset-[1px] bg-[#050505] rounded-full z-0" />
                   
                   {/* Glow Effect */}
                   <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] z-0" />
                   
                   {/* Text */}
                   <span className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                      Aplicar Ahora
                   </span>
                </button>
             </div>
          ) : (
             <motion.form 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               onSubmit={handleJoinTeamSubmit} 
               className="bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-xl shadow-2xl space-y-6 relative"
             >
               <button 
                  type="button" 
                  onClick={() => setShowJoinForm(false)} 
                  className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
               >
                  <X size={20} />
               </button>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">Nombre Completo</label>
                   <input required type="text" value={joinTeamData.name} onChange={e => setJoinTeamData({...joinTeamData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-sm focus:border-authomia-blueLight focus:bg-white/10 outline-none transition-all" placeholder="John Doe" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">Correo Electrónico</label>
                   <input required type="email" value={joinTeamData.email} onChange={e => setJoinTeamData({...joinTeamData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-sm focus:border-authomia-blueLight focus:bg-white/10 outline-none transition-all" placeholder="john@example.com" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">Especialidad</label>
                 <input required type="text" value={joinTeamData.specialty} onChange={e => setJoinTeamData({...joinTeamData, specialty: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-sm focus:border-authomia-blueLight focus:bg-white/10 outline-none transition-all" placeholder="e.g. Full-Stack, IA, RPA, Diseño UI/UX" />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">Proyectos en los que has trabajado</label>
                 <textarea required value={joinTeamData.pastProjects} onChange={e => setJoinTeamData({...joinTeamData, pastProjects: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-sm focus:border-authomia-blueLight focus:bg-white/10 outline-none transition-all resize-none h-32" placeholder="Describe brevemente tu experiencia..." />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">Red Social Profesional (LinkedIn, Behance, etc.)</label>
                 <input type="url" value={joinTeamData.socialUrl} onChange={e => setJoinTeamData({...joinTeamData, socialUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-sm focus:border-authomia-blueLight focus:bg-white/10 outline-none transition-all" placeholder="https://linkedin.com/in/..." />
               </div>

               <div className="pt-6">
                 <button 
                   type="submit" 
                   disabled={joinTeamStatus === 'submitting'}
                   className="w-full bg-white text-black py-4 rounded-lg font-mono text-xs uppercase tracking-widest hover:bg-authomia-blueLight hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-authomia-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {joinTeamStatus === 'submitting' ? 'Enviando...' : joinTeamStatus === 'success' ? 'Enviado Correctamente' : 'Enviar Postulación'} 
                   {joinTeamStatus === 'idle' && <Send size={14} />}
                 </button>
                 {joinTeamStatus === 'error' && <p className="text-red-400 text-xs text-center mt-4 font-mono">Hubo un error al enviar. Inténtalo de nuevo.</p>}
               </div>
             </motion.form>
          )}
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