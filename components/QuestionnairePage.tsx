import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, AlertCircle, Building2, User, Instagram, Linkedin, Globe, Facebook, Twitter, MessageCircle, Youtube, Mail, Ticket, Sparkles, Diamond, ArrowUpCircle, ArrowLeft, Github, Share2, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- CONFIG ---
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// --- TYPES ---
type Plan = 'blue' | 'red';
type ProjectType = 'company' | 'project';

interface FormData {
  fullName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  projectType: ProjectType | null;
  businessName: string; // Separated for better data capture
  industry: string;
  socials: string[];
  pillar: string;
  budget: string;
  message: string;
  agreed: boolean;
}

const COUNTRY_CODES = [
  { code: '+51', country: 'PE', flag: '🇵🇪' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+54', country: 'AR', flag: '🇦🇷' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+56', country: 'CL', flag: '🇨🇱' },
  { code: '+57', country: 'CO', flag: '🇨🇴' },
  { code: '+593', country: 'EC', flag: '🇪🇨' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
];

const PILLARS = ["Administración", "Marketing", "Ventas", "Fulfillment"];

const INDUSTRIES = [
  "Agroindustria", "Alimentos & Bebidas", "Arquitectura & Construcción", 
  "Automotriz", "Banca & Fintech", "Comercio Minorista (Retail)", 
  "Comercio Mayorista", "Consultoría & Servicios", "E-commerce", 
  "Educación", "Energía & Minería", "Entretenimiento & Medios", 
  "Farmacéutica & Salud", "Gastronomía", "Hotelería & Turismo", 
  "Inmobiliaria (Real Estate)", "Legal", "Logística & Transporte", 
  "Manufactura", "Marketing & Publicidad", "SaaS / Tecnología", 
  "Seguros", "Textil & Moda", "Otro"
];

// --- PARTICLE EFFECT (Simple CSS based) ---
const SparklesEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100, x: Math.random() * window.innerWidth }}
          animate={{ opacity: [0, 1, 0], y: -100, x: Math.random() * window.innerWidth }}
          transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() * 2 }}
          className="absolute bottom-0 w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_10px_gold]"
          style={{ left: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  );
};

const QuestionnairePage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<Plan>('blue');
  const [data, setData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneCode: '+51',
    phoneNumber: '',
    projectType: null,
    businessName: '',
    industry: '',
    socials: [''],
    pillar: '',
    budget: '',
    message: '',
    agreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize Plan from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('plan');
    if (p === 'red') setPlan('red');
    else setPlan('blue'); // Default
  }, []);

  // Promo Logic: If Project Type is "project", activate festive mode
  const isPromo = data.projectType === 'project';
  
  // Dynamic Pricing Ranges
  const getBudgetRanges = () => {
    if (plan === 'blue') {
      const ranges = ["$100 - $300 USD", "$300 - $600 USD", "+ $600 USD"];
      if (isPromo) return ["$20 USD (Cupón 'Slot Génesis')", ...ranges];
      return ranges;
    } else {
      const ranges = ["$800 - $1,500 USD", "$1,500 - $3,000 USD", "$3,000 - $5,000 USD", "+ $5,000 USD (Enterprise)"];
      if (isPromo) return ["$100 USD (Cupón 'Slot Génesis')", ...ranges];
      return ranges;
    }
  };

  const handleNext = () => {
    setError('');
    // Validation
    if (step === 0) { // Identity
      if (!data.fullName || !data.email || !data.phoneNumber) {
        setError("Todos los campos de identidad son obligatorios.");
        return;
      }
      if (!data.email.includes('@')) {
        setError("Formato de email inválido.");
        return;
      }
    }
    if (step === 1) { // Context
      if (!data.projectType) {
         setError("Selecciona el tipo de entidad.");
         return;
      }
      if (!data.businessName || !data.industry) {
         setError("Nombre del negocio y sector son obligatorios.");
         return;
      }
    }
    if (step === 2 && !data.pillar) {
      setError("Selecciona un pilar principal.");
      return;
    }
    if (step === 4 && !data.budget) {
      setError("Selecciona un rango de inversión.");
      return;
    }

    // Upsell Logic
    if (step === 4 && plan === 'blue') {
      setStep(5); // Go to Upsell
      return;
    }

    setStep(prev => prev + 1);
  };

  const handleUpsellDecision = (accept: boolean) => {
    if (accept) {
      setPlan('red');
    }
    setStep(6);
  };

  const handleBack = () => {
    if (step === 0) {
      window.location.href = '/'; // Go back home
      return;
    }
    if (step === 6) { // If at Message step
       if (plan === 'red' || plan === 'blue') { 
          // Check if we came from Upsell (Step 5)
          // If the user *was* Blue originally, they passed through Step 5.
          // If they accepted upsell, they are now Red.
          // We need to know if they came from upsell. 
          // Simplification: If current step is 6, go back to 5 ONLY if we were offering upsell (Blue originally). 
          // But state 'plan' might have changed.
          // Safer bet: Go back to 4 (Budget).
          setStep(4);
          // If they accepted upsell, revert plan to Blue for logic consistency? 
          // Or keep as Red? Let's go to 4.
          return;
       }
    }
    setStep(prev => prev - 1);
  };

  const detectSocialIcon = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes('instagram')) return <Instagram size={16} className="text-[#E4405F]" />;
    if (lower.includes('linkedin')) return <Linkedin size={16} className="text-[#0077b5]" />;
    if (lower.includes('facebook')) return <Facebook size={16} className="text-[#1877F2]" />;
    if (lower.includes('twitter') || lower.includes('x.com')) return <Twitter size={16} className="text-white" />;
    if (lower.includes('youtube')) return <Youtube size={16} className="text-[#FF0000]" />;
    if (lower.includes('whatsapp')) return <MessageCircle size={16} className="text-[#25D366]" />;
    if (lower.includes('github')) return <Github size={16} className="text-white" />;
    if (lower.includes('pinterest')) return <span className="text-red-500 font-bold text-xs">P</span>;
    if (lower.includes('telegram')) return <Send size={16} className="text-blue-400" />;
    if (lower.includes('tiktok')) return <span className="text-pink-500 font-bold text-xs">Tk</span>;
    if (lower.includes('behance')) return <span className="text-blue-500 font-bold text-xs">Be</span>;
    if (lower.includes('dribbble')) return <span className="text-pink-400 font-bold text-xs">Dr</span>;
    if (lower.includes('@')) return <Mail size={16} className="text-yellow-500" />;
    return <Globe size={16} className="text-authomia-blueLight" />;
  };

  const handleSubmit = async () => {
    if (!data.message || !data.agreed) {
       setError("Debes escribir tu mensaje y aceptar el contacto.");
       return;
    }

    setIsSubmitting(true);

    try {
      const socialString = data.socials.filter(s => s.trim() !== '').map(s => `• ${s}`).join('\n') || "No se proporcionaron enlaces.";
      const planName = plan === 'blue' ? "Blue Diamond Prime™" : "Red Diamond Prime™";
      const planDesc = plan === 'blue' 
         ? "Diagnóstico estratégico integral (Sin implementación)" 
         : "Diagnóstico + Implementación (Diagnóstico bonificado al 100%)";

      const templateParams = {
        fullName: data.fullName,
        email: data.email,
        phone: `${data.phoneCode} ${data.phoneNumber}`,
        businessName: data.businessName,
        clientType: data.projectType === 'company' ? 'Empresa Activa' : 'Nuevo Proyecto',
        industry: data.industry,
        message: data.message,
        selectedPlan: planName,
        planDescription: planDesc,
        socialNetworks: socialString,
        budgetRange: data.budget,
        time: new Date().toLocaleString()
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-8 ${isPromo ? 'bg-[#0f0b05]' : 'bg-[#020202]'} transition-colors duration-1000 relative overflow-hidden`}>
      
      {/* Background Ambience */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000 ${isPromo ? 'bg-gradient-to-br from-yellow-900/40 via-black to-red-900/40' : (plan === 'blue' ? 'bg-gradient-to-br from-authomia-blue/20 via-black to-black' : 'bg-gradient-to-br from-authomia-red/20 via-black to-black')}`} />
      
      {/* Particles for Promo */}
      {isPromo && <SparklesEffect />}

      {/* Close Button */}
      <a href="/" className="fixed top-8 right-8 z-50 p-3 bg-white/5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
        <X size={24} />
      </a>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-[#08090B] border border-white/10 rounded-sm shadow-2xl relative overflow-hidden flex flex-col min-h-[600px] z-10"
      >
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5">
          <motion.div 
            className={`h-full ${plan === 'blue' ? 'bg-authomia-blueLight' : 'bg-authomia-redLight'} ${isPromo ? 'bg-gradient-to-r from-yellow-400 to-red-500' : ''}`}
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / 7) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-[#050505] relative z-20">
           <div className="flex items-center gap-3">
              <Diamond className={`w-4 h-4 ${plan === 'blue' ? 'text-authomia-blueLight' : 'text-authomia-redLight'}`} />
              <span className={`text-xs font-mono uppercase tracking-[0.2em] ${plan === 'blue' ? 'text-authomia-blueLight' : 'text-authomia-redLight'}`}>
                 {plan === 'blue' ? "Blue Diamond Prime™" : "Red Diamond Prime™"}
              </span>
           </div>
           {isPromo && (
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full animate-pulse">
                 <Sparkles size={10} className="text-yellow-500" />
                 <span className="text-[9px] font-mono text-yellow-500 uppercase tracking-widest">Promo Activa</span>
              </div>
           )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-16 flex-1 overflow-y-auto custom-scrollbar relative">
          
          {isSuccess ? (
             <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} 
                  className={`w-24 h-24 rounded-full border-2 flex items-center justify-center mb-8 ${plan === 'blue' ? 'border-authomia-blue text-authomia-blueLight' : 'border-authomia-red text-authomia-redLight'}`}
                >
                   <Check size={40} />
                </motion.div>
                <h2 className="text-3xl text-white font-light mb-4">Solicitud Recibida</h2>
                <p className="text-white/50 max-w-md leading-relaxed mb-8">
                   Un especialista de Authomia analizará su arquitectura digital y le contactará en breve.
                </p>
                <a href="/" className="text-xs font-mono text-white/30 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-1">
                   Volver al Inicio
                </a>
             </div>
          ) : (
            <>
               {/* STEP 0: IDENTITY */}
               {step === 0 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                     <div>
                        <h2 className="text-3xl font-light text-white mb-2">Identidad</h2>
                        <p className="text-white/40 text-sm">Paso 01 — Credenciales de acceso.</p>
                     </div>
                     <div className="space-y-6 max-w-lg">
                        <div className="group">
                           <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2 block">Nombre Completo</label>
                           <input autoFocus className="w-full bg-transparent border-b border-white/10 py-3 text-lg text-white outline-none focus:border-authomia-blueLight transition-all placeholder-white/10" placeholder="Ej. Alejandro Toledo" value={data.fullName} onChange={e => setData({...data, fullName: e.target.value})} />
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2 block">Correo Electrónico</label>
                           <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 text-lg text-white outline-none focus:border-authomia-blueLight transition-all placeholder-white/10" placeholder="Ej. contacto@empresa.com" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2 block">WhatsApp / Teléfono</label>
                           <div className="flex gap-4">
                              <select className="bg-[#050505] border-b border-white/10 py-3 text-white outline-none w-24" value={data.phoneCode} onChange={e => setData({...data, phoneCode: e.target.value})}>
                                 {COUNTRY_CODES.map(c => (<option key={c.code} value={c.code}>{c.flag} {c.code}</option>))}
                              </select>
                              <input type="tel" className="flex-1 bg-transparent border-b border-white/10 py-3 text-lg text-white outline-none focus:border-authomia-blueLight transition-all placeholder-white/10" placeholder="999 999 999" value={data.phoneNumber} onChange={e => setData({...data, phoneNumber: e.target.value})} />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               )}

               {/* STEP 1: CONTEXT */}
               {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                     <div>
                        <h2 className="text-3xl font-light text-white mb-2">Contexto</h2>
                        <p className="text-white/40 text-sm">Paso 02 — Etapa del proyecto.</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button onClick={() => setData({...data, projectType: 'company'})} className={`p-8 border rounded-sm flex flex-col items-center justify-center gap-4 transition-all duration-300 ${data.projectType === 'company' ? 'bg-white/10 border-white text-white' : 'bg-[#050505] border-white/10 text-white/50 hover:border-white/30 hover:bg-white/5'}`}>
                           <div className="p-4 rounded-full bg-authomia-red/20 text-authomia-redLight"><Building2 size={32} /></div>
                           <h3 className="text-lg font-medium">Empresa Activa</h3>
                        </button>
                        <button onClick={() => setData({...data, projectType: 'project'})} className={`p-8 border rounded-sm flex flex-col items-center justify-center gap-4 transition-all duration-300 ${data.projectType === 'project' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-[#050505] border-white/10 text-white/50 hover:border-yellow-500/50 hover:bg-yellow-500/5'}`}>
                           <div className="p-4 rounded-full bg-white/10 text-white"><User size={32} /></div>
                           <h3 className="text-lg font-medium">Nuevo Proyecto</h3>
                        </button>
                     </div>
                     {/* Expanded Fields */}
                     <div className="space-y-6 pt-4">
                        <div className="group">
                           <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2 block">Nombre de Empresa o Negocio</label>
                           <input className="w-full bg-transparent border-b border-white/10 py-3 text-lg text-white outline-none" placeholder="Nombre Oficial" value={data.businessName} onChange={e => setData({...data, businessName: e.target.value})} />
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2 block">Sector / Industria</label>
                           <select className="w-full bg-[#050505] border-b border-white/10 py-3 text-lg text-white outline-none" value={data.industry} onChange={e => setData({...data, industry: e.target.value})}>
                              <option value="" disabled>Seleccionar Sector...</option>
                              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                           </select>
                        </div>
                     </div>
                  </motion.div>
               )}

               {/* STEP 2: PILLAR */}
               {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                     <div><h2 className="text-3xl font-light text-white mb-2">Enfoque</h2><p className="text-white/40 text-sm">Paso 03 — Pilar principal de intervención.</p></div>
                     <div className="grid grid-cols-2 gap-4">
                        {PILLARS.map(p => (
                           <button key={p} onClick={() => setData({...data, pillar: p})} className={`py-6 px-4 border rounded-sm text-sm font-mono uppercase tracking-wider transition-all ${data.pillar === p ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white/60 hover:border-white/40'}`}>{p}</button>
                        ))}
                     </div>
                  </motion.div>
               )}

               {/* STEP 3: SOCIALS */}
               {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                     <div><h2 className="text-3xl font-light text-white mb-2">Huella Digital</h2><p className="text-white/40 text-sm">Paso 04 — Ecosistema digital (Opcional).</p></div>
                     <div className="space-y-4">
                        {data.socials.map((social, idx) => (
                           <div key={idx} className="flex gap-2 items-center group">
                              <div className="flex-1 relative">
                                 <div className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">{social ? detectSocialIcon(social) : <Globe size={16} className="text-white/20" />}</div>
                                 <input className="w-full bg-[#050505] border border-white/10 rounded-sm py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-white/30" placeholder="https://..." value={social} onChange={e => { const n = [...data.socials]; n[idx] = e.target.value; setData({...data, socials: n}); }} />
                              </div>
                              {data.socials.length > 1 && <button onClick={() => { const n = data.socials.filter((_, i) => i !== idx); setData({...data, socials: n}); }} className="p-3 bg-white/5 hover:bg-red-500/20 text-white/30 hover:text-red-500"><X size={16} /></button>}
                           </div>
                        ))}
                        <button onClick={() => setData({...data, socials: [...data.socials, '']})} className="text-xs font-mono text-authomia-blueLight hover:text-white uppercase tracking-widest flex items-center gap-2 mt-4">+ Agregar otra red</button>
                     </div>
                  </motion.div>
               )}

               {/* STEP 4: BUDGET */}
               {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                     <div><h2 className="text-3xl font-light text-white mb-2">Inversión</h2><p className="text-white/40 text-sm">Paso 05 — Rango de inversión estimada.</p></div>
                     <div className="space-y-3">
                        {getBudgetRanges().map((range, idx) => {
                           const isPromoOption = isPromo && range.includes('Cupón');
                           return (
                              <button key={idx} onClick={() => setData({...data, budget: range})} className={`w-full text-left py-4 px-6 border rounded-sm flex justify-between items-center group transition-all duration-300 ${data.budget === range ? (isPromoOption ? 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_20px_rgba(255,215,0,0.2)]' : (plan === 'blue' ? 'bg-authomia-blue/20 border-authomia-blue' : 'bg-authomia-red/20 border-authomia-red')) : 'bg-transparent border-white/10 hover:bg-white/5 hover:border-white/30'}`}>
                                 <span className={`font-mono text-sm ${data.budget === range ? 'text-white font-bold' : 'text-white/70'}`}>{range}</span>
                                 {data.budget === range && <div className={`w-2 h-2 rounded-full ${isPromoOption ? 'bg-yellow-500' : 'bg-white'} animate-pulse`} />}
                                 {isPromoOption && <Ticket size={16} className="text-yellow-500" />}
                              </button>
                           );
                        })}
                     </div>
                     <AnimatePresence>
                        {isPromo && data.budget.includes('Cupón') && (
                           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-sm mt-4">
                              <p className="text-[10px] text-yellow-500/80 font-mono leading-relaxed mb-2 flex gap-2"><AlertCircle size={12} className="shrink-0 mt-0.5" /> DISCLAIMER PROMOCIONAL:</p>
                              <p className="text-xs text-white/60 font-light leading-relaxed mb-4">La complejidad técnica será proporcional al valor del cupón. Costos de terceros (Hosting, APIs, Credenciales) se cotizan por separado.</p>
                              <div className="flex gap-2"><div className="px-2 py-1 bg-white/10 rounded text-[9px] font-mono text-white/50">3 CUPONES RESTANTES</div></div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
               )}

               {/* STEP 5: UPSELL */}
               {step === 5 && plan === 'blue' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 flex flex-col items-center justify-center text-center py-8">
                     <div className="w-20 h-20 rounded-full border-2 border-authomia-red flex items-center justify-center shadow-[0_0_40px_rgba(179,10,10,0.5)] animate-pulse-slow"><ArrowUpCircle size={40} className="text-authomia-redLight" /></div>
                     <div><h2 className="text-3xl font-light text-white mb-4">Escalar a Red Diamond</h2><p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">Con <strong>Red Diamond Prime™</strong>, el costo del diagnóstico es <span className="text-authomia-redLight font-bold">BONIFICADO 100%</span>.</p></div>
                     <div className="grid grid-cols-1 w-full gap-4 mt-8">
                        <button onClick={() => handleUpsellDecision(true)} className="w-full py-4 bg-authomia-red text-white font-mono text-sm tracking-widest hover:bg-authomia-redLight transition-colors rounded-sm shadow-lg flex items-center justify-center gap-2">SÍ, CAMBIAR A RED DIAMOND <Sparkles size={14} /></button>
                        <button onClick={() => handleUpsellDecision(false)} className="w-full py-4 bg-transparent border border-white/10 text-white/40 font-mono text-xs hover:text-white hover:border-white/30 transition-colors rounded-sm">No, mantener Diagnóstico</button>
                     </div>
                  </motion.div>
               )}

               {/* STEP 6: MESSAGE */}
               {step === 6 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                     <div><h2 className="text-3xl font-light text-white mb-2">Mensaje</h2><p className="text-white/40 text-sm">Objetivos o visión actual.</p></div>
                     <textarea autoFocus className="w-full h-32 bg-[#050505] border border-white/10 p-4 text-white outline-none focus:border-white/30 resize-none rounded-sm" placeholder="Escribe aquí..." value={data.message} onChange={e => setData({...data, message: e.target.value})} />
                     <div className="flex items-start gap-4 p-4 border border-white/5 bg-white/[0.02] rounded-sm cursor-pointer" onClick={() => setData({...data, agreed: !data.agreed})}>
                        <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${data.agreed ? 'bg-authomia-blue border-authomia-blue' : 'border-white/30'}`}>{data.agreed && <Check size={14} className="text-white" />}</div>
                        <p className="text-xs text-white/50 leading-relaxed select-none">Acepto la comunicación vía correo electrónico.</p>
                     </div>
                  </motion.div>
               )}
            </>
          )}

          {/* Footer Nav */}
          {!isSuccess && (
             <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center bg-[#08090B] relative z-20">
                <button onClick={handleBack} className="text-xs font-mono text-white/30 hover:text-white flex items-center gap-2 uppercase tracking-widest"><ArrowLeft size={14} /> Atrás</button>
                {step === 6 ? (
                   <button onClick={handleSubmit} disabled={isSubmitting} className={`px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest rounded-sm flex items-center gap-2 transition-all ${isSubmitting ? 'bg-white/10 text-white/30 cursor-wait' : 'bg-gradient-to-r from-authomia-blue to-authomia-red hover:brightness-110 text-white shadow-lg'}`}>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'} <ArrowRight size={16} /></button>
                ) : step !== 5 && (
                   <button onClick={handleNext} className="px-8 py-3 bg-white/5 border border-white/10 text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm flex items-center gap-2">CONTINUAR <ArrowRight size={16} /></button>
                )}
             </div>
          )}

          {error && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-24 left-8 right-8 bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-sm text-xs flex items-center gap-2"><AlertCircle size={14} /> {error}</motion.div>}

        </div>
      </motion.div>
    </div>
  );
};

export default QuestionnairePage;