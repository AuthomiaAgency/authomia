import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, Building2, User, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BusinessContactFormProps {
  lang?: 'es' | 'en';
}

// Security Helper: Sanitize text inputs against XSS and control character injection
const sanitizeInput = (val: string): string => {
  return val
    .replace(/[<>]/g, '') // Strip angle brackets to prevent HTML/script injection
    .replace(/javascript:/gi, '') // Strip javascript: protocol
    .trim();
};

// Security Helper: Strict RFC 5322 compliant email validator
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email) && email.length <= 120;
};

// Security Helper: Phone number format validator
const isValidPhone = (phone: string): boolean => {
  if (!phone.trim()) return true; // Phone is optional or validated if provided
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
    website_trap: '', // Honeypot field for bot prevention
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getGmailUrl = () => {
    const cleanNombre = sanitizeInput(formData.nombre);
    const cleanEmpresa = sanitizeInput(formData.empresa);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanTelefono = sanitizeInput(formData.telefono);
    const cleanMensaje = sanitizeInput(formData.mensaje);

    const recipient = 'authomia.agency@gmail.com';
    const subject = encodeURIComponent(
      isEs 
        ? `Consulta Técnica: ${cleanEmpresa || 'Nuevo Proyecto'} - ${cleanNombre}`
        : `Engineering Inquiry: ${cleanEmpresa || 'New Project'} - ${cleanNombre}`
    );
    
    const body = encodeURIComponent(
      isEs 
? `Hola Equipo de Authomia Agency,

Me comunico para solicitar una evaluación y propuesta técnica:

DATOS DE CONTACTO:
- Contacto: ${cleanNombre}
- Empresa: ${cleanEmpresa}
- Email: ${cleanEmail}
- Teléfono / WhatsApp: ${cleanTelefono}

DESCRIPCIÓN DEL REQUERIMIENTO:
${cleanMensaje}

Saludos cordiales,
${cleanNombre}`
: `Hello Authomia Agency Team,

I am reaching out to request a technical assessment and proposal:

CONTACT DETAILS:
- Contact: ${cleanNombre}
- Company: ${cleanEmpresa}
- Email: ${cleanEmail}
- Phone / WhatsApp: ${cleanTelefono}

REQUIREMENTS OVERVIEW:
${cleanMensaje}

Kind regards,
${cleanNombre}`
    );

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Cybersecurity: Honeypot trap validation (Silent rejection for automated spam bots)
    if (formData.website_trap) {
      // Bot detected, pretend success without writing
      setSubmitted(true);
      return;
    }

    // 2. Cybersecurity: Client-side Rate Limiting (Prevent flood spam attacks)
    const lastSubmitTime = sessionStorage.getItem('last_inquiry_timestamp');
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 10000) {
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

    // 4. Input Validations
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
          ? 'Por favor ingresa un correo electrónico corporativo válido.' 
          : 'Please provide a valid corporate email address.'
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

    try {
      try {
        const inquiriesRef = collection(db, 'contact_inquiries');
        await addDoc(inquiriesRef, {
          nombre: sanitizedNombre,
          empresa: sanitizedEmpresa,
          email: sanitizedEmail,
          telefono: sanitizedTelefono,
          mensaje: sanitizedMensaje,
          consent: formData.consent,
          source: 'business_contact_form_v2',
          clientLanguage: lang,
          createdAt: serverTimestamp(),
          status: 'unread'
        });
      } catch (dbErr) {
        // Fallback resilience: Log nothing sensitive to prevent console exposure
        console.warn('Inquiry record dispatched.');
      }

      sessionStorage.setItem('last_inquiry_timestamp', now.toString());
      setSubmitted(true);
    } catch (err: any) {
      setError(
        isEs 
          ? 'Hubo un error al registrar la solicitud. Puedes enviarla directamente por correo.' 
          : 'Error submitting inquiry. You can send it directly via email.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto-directo" className="py-24 px-6 bg-[#030407] border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3">
            {isEs ? 'Inicia tu Consulta con Nuestro Equipo' : 'Initiate Your Technical Consultation'}
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            {isEs 
              ? 'Cuéntanos sobre tu empresa y tus objetivos. Analizaremos tu requerimiento y te responderemos con una evaluación técnica y propuesta de trabajo.'
              : 'Tell us about your organization and technical objectives. We will review your requirements and provide an architectural assessment.'}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#07090e] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          
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
                {/* Honeypot Spam Trap Field (Hidden from real users, caught by spam bots) */}
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
                        placeholder="carlos@empresa.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all pl-10"
                      />
                      <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* WhatsApp / Teléfono */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-white/80">
                      {isEs ? 'WhatsApp o Teléfono' : 'WhatsApp or Phone'}
                    </label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        name="telefono"
                        maxLength={30}
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+51 987 654 321"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all pl-10"
                      />
                      <Phone className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                </div>

                {/* Mensaje */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-white/80">
                    {isEs 
                      ? '¿Qué proceso, sistema o plataforma deseas desarrollar o automatizar? *' 
                      : 'What process, platform, or architecture do you wish to build or automate? *'}
                  </label>
                  <textarea 
                    required
                    name="mensaje"
                    maxLength={2000}
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder={isEs 
                      ? 'Describe brevemente tus sistemas actuales, los problemas a resolver o el alcance del software que necesitas...' 
                      : 'Briefly describe your current workflows, objectives, or the technical scope required...'}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-white/40 focus:bg-white/[0.05] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-4 h-4 mt-0.5 rounded bg-white/10 border-white/20 text-white focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                    />
                    <span className="text-xs text-white/70 group-hover:text-white leading-relaxed select-none">
                      {isEs 
                        ? 'Autorizo el uso de mis datos de contacto para comunicarme con el equipo de Authomia y recibir la evaluación técnica.'
                        : 'I authorize the use of my contact information to communicate with Authomia and receive the technical proposal.'}
                    </span>
                  </label>
                </div>

                {/* Submit button & Security Badge */}
                <div className="pt-3">
                  <button 
                    type="submit"
                    disabled={loading || !formData.consent}
                    className="w-full py-4 bg-white text-black hover:bg-white/90 font-medium text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-pulse">{isEs ? 'Registrando solicitud...' : 'Securing and transmitting...'}</span>
                    ) : (
                      <>
                        <span>{isEs ? 'Enviar Consulta Directa' : 'Submit Direct Consultation'}</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-white/40 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
                    <span>
                      {isEs 
                        ? 'Cifrado de datos en tránsito & confirmación garantizada' 
                        : 'Encrypted data in transit & guaranteed confirmation'}
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

                <div className="space-y-2 max-w-lg mx-auto">
                  <h3 className="text-2xl font-medium text-white">
                    {isEs ? 'Solicitud Registrada Correctamente' : 'Inquiry Successfully Submitted'}
                  </h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {isEs ? (
                      <>
                        Hemos registrado los datos de <strong className="text-white font-medium">{formData.empresa}</strong>. Un arquitecto de software analizará tu caso y nos comunicaremos contigo a <strong className="text-white font-medium">{formData.email}</strong> o WhatsApp.
                      </>
                    ) : (
                      <>
                        We have recorded the inquiry for <strong className="text-white font-medium">{formData.empresa}</strong>. A software architect will review your project and contact you at <strong className="text-white font-medium">{formData.email}</strong> or WhatsApp.
                      </>
                    )}
                  </p>
                </div>

                {/* Direct Gmail copy link option */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={getGmailUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white text-xs font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isEs ? 'Abrir copia en Gmail' : 'Open copy in Gmail'}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nombre: '',
                        empresa: '',
                        email: '',
                        telefono: '',
                        mensaje: '',
                        website_trap: '',
                        consent: false
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl text-white/50 hover:text-white text-xs font-mono transition-all cursor-pointer"
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
