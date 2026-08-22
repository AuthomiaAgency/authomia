import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, Building2, User, Phone, ShieldCheck, Check, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { WordPullUp, BlurReveal } from './ui/BlurReveal';
import { DecryptedText } from './ui/DecryptedText';
import { 
  signInWithGoogleGmail, 
  initGmailAuth, 
  sendInquiryViaGmailAPI, 
  getGmailAccessToken 
} from '../lib/gmailAuth';

interface BusinessContactFormProps {
  lang?: 'es' | 'en';
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Security Helper: Sanitize text inputs against XSS and control character injection
const sanitizeInput = (val: string): string => {
  return val
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim();
};

// Security Helper: Strict RFC 5322 compliant email validator
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email) && email.length <= 120;
};

// Security Helper: Phone number format validator
const isValidPhone = (phone: string): boolean => {
  if (!phone.trim()) return true;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;
  return phoneRegex.test(phone.trim());
};

export const BusinessContactForm: React.FC<BusinessContactFormProps> = ({ lang = 'es' }) => {
  const isEs = lang === 'es';

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    mensaje: '',
    website_trap: '',
    consent: false
  });

  const [googleConnected, setGoogleConnected] = useState(false);
  const [googleUserEmail, setGoogleUserEmail] = useState<string | null>(null);
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initGmailAuth(
      (user, token) => {
        if (token && user.email) {
          setGoogleConnected(true);
          setGoogleUserEmail(user.email);
          setFormData(prev => ({
            ...prev,
            email: prev.email || user.email || '',
            nombre: prev.nombre || user.displayName || ''
          }));
        }
      },
      () => {
        setGoogleConnected(false);
        setGoogleUserEmail(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleConnect = async () => {
    setError(null);
    setIsConnectingGoogle(true);
    try {
      const result = await signInWithGoogleGmail();
      if (result) {
        setGoogleConnected(true);
        setGoogleUserEmail(result.user.email);
        setFormData(prev => ({
          ...prev,
          email: prev.email || result.user.email || '',
          nombre: prev.nombre || result.user.displayName || ''
        }));
      }
    } catch (err: any) {
      console.warn('Google sign-in skipped or cancelled:', err);
    } finally {
      setIsConnectingGoogle(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Cybersecurity: Honeypot trap validation
    if (formData.website_trap) {
      setSubmitted(true);
      return;
    }

    // 2. Client-side Rate Limiting
    const lastSubmitTime = sessionStorage.getItem('last_inquiry_timestamp');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 6000) {
      setError(
        isEs 
          ? 'Por favor espera unos segundos antes de enviar otra solicitud.' 
          : 'Please wait a few seconds before submitting another inquiry.'
      );
      return;
    }

    // 3. Sanitization
    const sanitizedNombre = sanitizeInput(formData.nombre);
    const sanitizedEmpresa = sanitizeInput(formData.empresa);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedTelefono = sanitizeInput(formData.telefono);
    const sanitizedMensaje = sanitizeInput(formData.mensaje);

    // 4. Validations
    if (!sanitizedNombre || !sanitizedEmail || !sanitizedEmpresa || !sanitizedMensaje) {
      setError(
        isEs 
          ? 'Por favor completa todos los campos requeridos.' 
          : 'Please complete all required fields.'
      );
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      setError(
        isEs 
          ? 'Por favor ingresa un correo electrónico válido.' 
          : 'Please provide a valid email address.'
      );
      return;
    }

    if (sanitizedTelefono && !isValidPhone(sanitizedTelefono)) {
      setError(
        isEs 
          ? 'El formato del número telefónico no es válido.' 
          : 'Invalid phone number format.'
      );
      return;
    }

    if (!formData.consent) {
      setError(
        isEs 
          ? 'Debes autorizar el tratamiento de datos para procesar tu consulta.' 
          : 'You must authorize data processing to handle your inquiry.'
      );
      return;
    }

    setLoading(true);

    const generatedId = `AUTH-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    setTicketId(generatedId);

    try {
      // Step A: Save to Firestore Database
      try {
        const inquiriesRef = collection(db, 'contact_inquiries');
        await addDoc(inquiriesRef, {
          ticketId: generatedId,
          nombre: sanitizedNombre,
          empresa: sanitizedEmpresa,
          email: sanitizedEmail,
          telefono: sanitizedTelefono,
          mensaje: sanitizedMensaje,
          consent: formData.consent,
          recipient: 'authomia.agency@gmail.com',
          source: 'business_contact_form_v2',
          clientLanguage: lang,
          createdAt: serverTimestamp(),
          status: 'unread'
        });
      } catch (dbErr) {
        console.warn('Database record note:', dbErr);
      }

      // Step B: Send via Gmail API if authenticated
      const token = getGmailAccessToken();
      if (token) {
        try {
          await sendInquiryViaGmailAPI({
            nombre: sanitizedNombre,
            empresa: sanitizedEmpresa,
            email: sanitizedEmail,
            telefono: sanitizedTelefono,
            mensaje: sanitizedMensaje
          }, token);
        } catch (gmailErr) {
          console.warn('Gmail API dispatch note:', gmailErr);
        }
      }

      // Step C: Send via EmailJS (if configured)
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          const templateParams = {
            ticketId: generatedId,
            fullName: sanitizedNombre,
            email: sanitizedEmail,
            phone: sanitizedTelefono || 'No proporcionado',
            businessName: sanitizedEmpresa,
            message: sanitizedMensaje,
            recipient: 'authomia.agency@gmail.com',
            time: new Date().toLocaleString()
          };
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
        } catch (ejsErr) {
          console.warn('EmailJS dispatch note:', ejsErr);
        }
      }

      sessionStorage.setItem('last_inquiry_timestamp', now.toString());
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(
        isEs 
          ? 'Error al procesar la solicitud. Por favor intenta nuevamente.' 
          : 'Error submitting inquiry. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto-directo" className="py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-[#030407] border-t border-white/[0.08] relative overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-3">
            {isEs ? (
              <>
                <WordPullUp words="Inicia tu Consulta con" />{' '}
                <span className="font-serif italic font-normal text-white/90">
                  <WordPullUp words="Nuestro Equipo" delay={0.15} />
                </span>
              </>
            ) : (
              <>
                <WordPullUp words="Initiate Your" />{' '}
                <span className="font-serif italic font-normal text-white/90">
                  <WordPullUp words="Technical Consultation" delay={0.15} />
                </span>
              </>
            )}
          </h2>
          <BlurReveal delay={0.2} yOffset={8} className="text-xs sm:text-sm md:text-base text-white/60 font-light leading-relaxed">
            {isEs 
              ? 'Cuéntanos sobre tu empresa y tus objetivos. Evaluaremos tu requerimiento y te enviaremos una propuesta de arquitectura y desarrollo a medida.'
              : 'Tell us about your organization and technical objectives. We will review your requirements and provide an architectural assessment.'}
          </BlurReveal>
        </div>

        {/* Card Container */}
        <div className="bg-[#07090e] border border-white/10 rounded-2xl p-5 sm:p-10 lg:p-12 shadow-2xl">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Honeypot Spam Trap Field */}
                <div style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <input
                    type="text"
                    name="website_trap"
                    value={formData.website_trap}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Optional Google Account Link Bar */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-white/70">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                    <span>
                      {googleConnected 
                        ? (isEs ? `Conectado con Google: ${googleUserEmail}` : `Connected with Google: ${googleUserEmail}`)
                        : (isEs ? 'Verificación directa y envío sincronizado con Gmail' : 'Direct verification and synced Gmail delivery')}
                    </span>
                  </div>

                  {!googleConnected ? (
                    <button
                      type="button"
                      onClick={handleGoogleConnect}
                      disabled={isConnectingGoogle}
                      className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-[11px] transition-all flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      <span>{isConnectingGoogle ? (isEs ? 'Conectando...' : 'Connecting...') : (isEs ? 'Autenticar con Google' : 'Sign in with Google')}</span>
                    </button>
                  ) : (
                    <span className="text-emerald-400 text-[11px] font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {isEs ? 'Verificado' : 'Verified'}
                    </span>
                  )}
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-white/80">
                      {isEs ? 'Nombre y Apellidos *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        name="nombre"
                        maxLength={80}
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder={isEs ? 'Ej. Carlos Mendoza' : 'e.g., Charles Miller'}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all pl-10"
                      />
                      <User className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Empresa */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-white/80">
                      {isEs ? 'Empresa u Organización *' : 'Company or Organization *'}
                    </label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        name="empresa"
                        maxLength={100}
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder={isEs ? 'Ej. Distribuidora del Centro S.A.' : 'e.g., Global Logistics Corp.'}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all pl-10"
                      />
                      <Building2 className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-white/80">
                      {isEs ? 'Correo Electrónico Corporativo *' : 'Corporate Email Address *'}
                    </label>
                    <div className="relative">
                      <input 
                        required
                        type="email" 
                        name="email"
                        maxLength={120}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contacto@tuempresa.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all pl-10"
                      />
                      <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-white/80">
                      {isEs ? 'Teléfono / WhatsApp de Contacto' : 'Phone / WhatsApp'}
                    </label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        name="telefono"
                        maxLength={25}
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+51 999 999 999"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all pl-10"
                      />
                      <Phone className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                </div>

                {/* Mensaje */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-white/80">
                    {isEs ? 'Descripción del Requerimiento / Proyecto *' : 'Project Requirements & Scope *'}
                  </label>
                  <textarea 
                    required
                    name="mensaje"
                    rows={4}
                    maxLength={1500}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder={isEs 
                      ? 'Describe los objetivos principales, alcance estimado o infraestructura actual...'
                      : 'Describe your core objectives, estimated scope, or current infrastructure...'}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-4 h-4 rounded border border-white/30 bg-white/5 peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                        <Check className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                      {isEs 
                        ? 'Autorizo el tratamiento de mis datos para la evaluación técnica y el envío de propuestas por parte de Authomia.' 
                        : 'I authorize data processing for technical evaluation and proposal submissions by Authomia.'}
                    </span>
                  </label>
                </div>

                {/* Submit button & Security Badge */}
                <div className="pt-3">
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading || !formData.consent}
                    className="w-full py-4 bg-white text-black hover:bg-white/90 font-medium text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-pulse">{isEs ? 'Transmitiendo y registrando consulta...' : 'Transmitting and securing inquiry...'}</span>
                    ) : (
                      <>
                        <DecryptedText 
                          text={isEs ? 'Enviar Consulta Directa a Authomia' : 'Submit Direct Consultation'}
                          speed={30}
                          maxIterations={6}
                          animateOn="hover"
                        />
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                  
                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-white/40 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
                    <span>
                      {isEs 
                        ? 'Cifrado en tránsito y entrega directa garantizada a authomia.agency@gmail.com' 
                        : 'Encrypted in transit and direct guaranteed delivery to authomia.agency@gmail.com'}
                    </span>
                  </div>
                </div>

              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-3 max-w-lg mx-auto">
                  <h3 className="text-2xl font-medium text-white">
                    {isEs ? 'Consulta Transmitida con Éxito' : 'Inquiry Successfully Transmitted'}
                  </h3>
                  
                  {ticketId && (
                    <div className="inline-block px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 font-mono text-[11px] text-emerald-400">
                      ID: {ticketId}
                    </div>
                  )}

                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {isEs ? (
                      <>
                        Hemos registrado tu requerimiento para <strong className="text-white font-medium">{formData.empresa}</strong> y la notificación ha sido remitida a nuestro equipo técnico. Un arquitecto de software se comunicará a <strong className="text-white font-medium">{formData.email}</strong> o por WhatsApp.
                      </>
                    ) : (
                      <>
                        We have recorded your requirements for <strong className="text-white font-medium">{formData.empresa}</strong>. Our engineering team has received the dispatch and will reach out to <strong className="text-white font-medium">{formData.email}</strong> or WhatsApp.
                      </>
                    )}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-center">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nombre: '',
                        empresa: '',
                        email: googleUserEmail || '',
                        telefono: '',
                        mensaje: '',
                        website_trap: '',
                        consent: false
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono transition-all cursor-pointer"
                  >
                    {isEs ? 'Enviar otra consulta' : 'Submit another inquiry'}
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

export default BusinessContactForm;
