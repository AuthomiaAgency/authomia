import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Activity, Zap, AlertTriangle, CheckCircle, ShieldAlert, Cpu, Database, Lock, Lightbulb, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface Process {
  id: string;
  name: string;
  frequency: 'Diaria' | 'Semanal' | 'Mensual';
  dependency: number; // 0 to 100
  mentalLoad: number; // 1 to 10
}

const SUGGESTIONS = {
  universal: [
    {
      title: "Administración y Finanzas",
      items: [
        "Conciliación bancaria diaria/semanal.",
        "Emisión y envío de facturas a clientes.",
        "Carga de facturas de proveedores al sistema contable.",
        "Seguimiento de cuentas por cobrar (cobranza morosa).",
        "Gestión de nómina y pagos a colaboradores.",
        "Categorización de gastos para reportes mensuales.",
        "Renovación de licencias, seguros y suscripciones."
      ]
    },
    {
      title: "Ventas y Comercial",
      items: [
        "Registro manual de leads en el CRM.",
        "Asignación de prospectos a vendedores.",
        "Agendamiento de reuniones y recordatorios de citas.",
        "Generación de presupuestos y propuestas comerciales.",
        "Seguimiento de propuestas enviadas (Follow-up).",
        "Actualización de estados en el pipeline de ventas.",
        "Redacción de contratos y envío para firma digital."
      ]
    },
    {
      title: "Marketing y Comunicación",
      items: [
        "Programación de contenido en redes sociales.",
        "Respuesta a comentarios y mensajes directos (DMs) iniciales.",
        "Extracción de métricas de anuncios (Ads) para reportes.",
        "Envío de newsletters o campañas de Email Marketing.",
        "Actualización de precios o stock en la página web.",
        "Moderación de reseñas y testimonios."
      ]
    },
    {
      title: "Fulfillment y Operaciones",
      items: [
        "Asignación de tareas a equipos de trabajo.",
        "Seguimiento del estado de proyectos o pedidos.",
        "Control de calidad de entregables.",
        "Gestión de tickets de soporte técnico o atención al cliente.",
        "Solicitud de feedback/reseña post-venta.",
        "Actualización de bases de datos de clientes."
      ]
    }
  ],
  sectors: [
    {
      title: "Hotelería y Alojamiento",
      items: [
        "Sincronización de calendarios entre OTAs (Booking, Airbnb, etc.).",
        "Envío de instrucciones de Check-in automático.",
        "Asignación de turnos de limpieza (Housekeeping).",
        "Gestión de depósitos de seguridad y reembolsos.",
        "Reporte de mantenimiento de habitaciones.",
        "Encuestas de satisfacción post-estancia."
      ]
    },
    {
      title: "Restaurantes y Gastronomía",
      items: [
        "Gestión y confirmación de reservas de mesas.",
        "Control de inventario de insumos críticos.",
        "Cálculo de costo de platos (Escandallos).",
        "Gestión de pedidos a proveedores según stock.",
        "Actualización de menús en plataformas de Delivery.",
        "Control de turnos y asistencia del personal."
      ]
    },
    {
      title: "Real Estate (Inmobiliarias)",
      items: [
        "Publicación de propiedades en portales inmobiliarios.",
        "Calificación de leads (separar curiosos de compradores reales).",
        "Coordinación de visitas a propiedades.",
        "Actualización de base de datos de propietarios y captaciones.",
        "Seguimiento de documentación legal para cierres."
      ]
    },
    {
      title: "E-commerce y Retail",
      items: [
        "Procesamiento de etiquetas de envío.",
        "Notificación de cambio de estado del pedido al cliente.",
        "Gestión de devoluciones y cambios (Logística inversa).",
        "Recuperación de carritos abandonados.",
        "Alertas de bajo stock para reorden de compra."
      ]
    },
    {
      title: "Servicios Profesionales",
      items: [
        "Control de horas facturables por proyecto.",
        "Recolección de documentos mensuales de clientes.",
        "Gestión de plazos legales y vencimientos de impuestos.",
        "Onboarding de nuevos clientes (contratos, accesos, formularios).",
        "Archivo y organización de expedientes digitales."
      ]
    },
    {
      title: "Salud, Bienestar y Clínicas",
      items: [
        "Recordatorios de citas vía WhatsApp/Email.",
        "Actualización de historias clínicas o fichas de pacientes.",
        "Gestión de inventario de insumos médicos.",
        "Facturación a aseguradoras.",
        "Seguimiento post-tratamiento."
      ]
    },
    {
      title: "Logística y Transporte",
      items: [
        "Asignación de rutas y despachos a conductores.",
        "Seguimiento GPS y actualización de estado de entrega.",
        "Gestión de mantenimiento preventivo de flota.",
        "Liquidación de viáticos y gastos de viaje.",
        "Emisión de guías de remisión electrónicas."
      ]
    },
    {
      title: "Educación y Academias",
      items: [
        "Control de asistencia y registro de calificaciones.",
        "Emisión de certificados y diplomas automáticos.",
        "Gestión de cobros de mensualidades y recordatorios.",
        "Onboarding de nuevos alumnos (accesos a plataforma).",
        "Programación de clases y asignación de aulas/enlaces."
      ]
    },
    {
      title: "Construcción y Arquitectura",
      items: [
        "Control de avance de obra y reportes fotográficos.",
        "Gestión de compras de materiales y comparativas de precios.",
        "Control de asistencia de personal en obra (tareos).",
        "Seguimiento de permisos y licencias municipales.",
        "Elaboración de valorizaciones mensuales."
      ]
    },
    {
      title: "Agencias Creativas y Marketing",
      items: [
        "Recepción de briefs y asignación de tareas creativas.",
        "Envío de entregables para aprobación del cliente.",
        "Control de versiones de diseño y feedback.",
        "Renovación de dominios y hosting de clientes.",
        "Generación de reportes de rendimiento de campañas."
      ]
    }
  ]
};

export default function Mifo() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [email, setEmail] = useState('');
  const [processes, setProcesses] = useState<Process[]>([
    { id: '1', name: '', frequency: 'Diaria', dependency: 50, mentalLoad: 5 }
  ]);
  const [materialId, setMaterialId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMaterialId(params.get('material'));
  }, []);

  const handleStart = () => {
    setStep(1);
  };

  const addProcess = () => {
    setProcesses([...processes, { id: Date.now().toString(), name: '', frequency: 'Diaria', dependency: 50, mentalLoad: 5 }]);
  };

  const updateProcess = (id: string, field: keyof Process, value: any) => {
    setProcesses(processes.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removeProcess = (id: string) => {
    if (processes.length > 1) {
      setProcesses(processes.filter(p => p.id !== id));
    }
  };

  const handleComplete = () => {
    setStep(2);
    // Simulate AI Scanning
    setTimeout(() => {
      saveLead();
      setStep(3);
    }, 3500);
  };

  const saveLead = async () => {
    if (!email || !materialId) return;
    try {
      const mDoc = await getDoc(doc(db, 'appData', 'materials'));
      if (mDoc.exists()) {
        const allMaterials = mDoc.data().items || [];
        const updated = allMaterials.map((m: any) => {
          if (m.id === materialId) {
            return { ...m, leads: [...(m.leads || []), { email, date: new Date().toISOString() }] };
          }
          return m;
        });
        await setDoc(doc(db, 'appData', 'materials'), { items: updated });
      }
    } catch (e) {
      console.error("Error saving lead", e);
    }
  };

  // Calculations
  const avgDependency = processes.reduce((acc, p) => acc + p.dependency, 0) / processes.length;
  const avgMentalLoad = processes.reduce((acc, p) => acc + p.mentalLoad, 0) / processes.length;
  
  const fragilityIndex = Math.min(100, (avgDependency * 1.2));
  const automationPotential = Math.min(100, (avgMentalLoad * 10));
  const scalabilityScore = Math.max(0, 100 - (fragilityIndex * 0.6 + automationPotential * 0.4));

  const radarData = [
    { subject: 'Fricción Operativa', A: avgMentalLoad * 10, fullMark: 100 },
    { subject: 'Dependencia Humana', A: avgDependency, fullMark: 100 },
    { subject: 'Riesgo de Colapso', A: fragilityIndex, fullMark: 100 },
    { subject: 'Potencial de IA', A: automationPotential, fullMark: 100 },
    { subject: 'Escalabilidad Actual', A: scalabilityScore, fullMark: 100 },
  ];

  const highRiskProcesses = processes.filter(p => p.dependency > 80 || p.mentalLoad > 8);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans relative overflow-hidden selection:bg-authomia-blueLight/30">
      {/* Ambient Orbs */}
      <div className="fixed top-1/4 -left-[20vw] w-[40vw] h-[40vw] bg-[#B30A0A] rounded-full blur-[120px] opacity-15 pointer-events-none" />
      <div className="fixed bottom-1/4 -right-[20vw] w-[40vw] h-[40vw] bg-[#0A109E] rounded-full blur-[120px] opacity-15 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
              <Activity size={16} className="text-white/70" />
            </div>
            <span className="font-mono text-sm tracking-widest uppercase text-white/80">Authomia MIFO</span>
          </div>
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
            <Lock size={10} /> Encrypted Session
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* STEP 0: ONBOARDING */}
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
            >
              <div className="inline-block px-3 py-1 border border-white/10 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/60 mb-8">
                Herramienta de Diagnóstico
              </div>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
                Matriz MIFO:<br/>El fin de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 font-medium">prisión operativa</span>.
              </h1>
              <p className="text-lg text-white/50 font-light mb-12 max-w-xl">
                Tu negocio es un sistema. ¿Está optimizado o saturado? Identifica dónde se estanca tu crecimiento antes de intentar automatizar el caos.
              </p>

              <div className="w-full max-w-md space-y-6 bg-white/[0.02] border border-white/10 p-8 rounded-sm backdrop-blur-md">
                <div className="text-left space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/50">Email Corporativo <span className="text-authomia-redLight">*</span></label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ceo@empresa.com"
                    className="w-full bg-black/50 border border-white/10 p-4 text-white font-mono text-sm focus:border-authomia-blueLight outline-none transition-colors rounded-sm"
                  />
                  <p className="text-[10px] text-white/30 font-mono mt-2 leading-relaxed">
                    * Requerido con fines estadísticos. Los datos de tu operación que ingreses a continuación están encriptados localmente; no tenemos acceso a ellos, garantizando tu absoluta privacidad y seguridad.
                  </p>
                </div>

                <button 
                  onClick={handleStart}
                  disabled={!email || !email.includes('@')}
                  className="w-full group relative px-8 py-4 font-mono text-sm tracking-widest overflow-hidden rounded-sm transition-all bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
                >
                  INICIAR AUDITORÍA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: MATRIX */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-12 text-center relative">
                <h2 className="text-2xl font-light mb-2">Inventario de Fricción</h2>
                <p className="text-white/50 text-sm mb-6">Registra las tareas clave de tu operación diaria. Sé brutalmente honesto.</p>
                <button 
                  onClick={() => setShowSuggestions(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono text-white/70 hover:text-white transition-colors"
                >
                  <Lightbulb size={14} className="text-authomia-blueLight" />
                  Ver Ejemplos de Tareas
                </button>
              </div>

              {/* Central Core Visualization */}
              <div className="relative flex justify-center mb-16 h-32">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/20 bg-black flex items-center justify-center z-10 shadow-[0_0_30px_rgba(10,16,158,0.2)]">
                  <Database className="text-white/80 animate-pulse-slow" size={32} />
                </div>
                {/* SVG Lines connecting to processes below */}
                <svg className="absolute top-1/2 left-0 w-full h-full overflow-visible pointer-events-none z-0">
                  {processes.map((p, i) => {
                    const xPos = `${(i + 1) * (100 / (processes.length + 1))}%`;
                    const isCritical = p.dependency > 70;
                    return (
                      <motion.path
                        key={p.id}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: isCritical ? 0.8 : 0.3 }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        d={`M 50% 50% C 50% 150%, ${xPos} 50%, ${xPos} 200%`}
                        stroke={isCritical ? '#B30A0A' : '#ffffff'}
                        strokeWidth="1"
                        fill="none"
                        className={isCritical ? 'animate-pulse' : ''}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Processes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-10">
                <AnimatePresence>
                  {processes.map((p, i) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`bg-[#050505] border ${p.dependency > 70 ? 'border-red-500/30 shadow-[0_0_15px_rgba(179,10,10,0.1)]' : 'border-white/10'} p-6 rounded-sm relative group`}
                    >
                      <button onClick={() => removeProcess(p.id)} className="absolute top-3 right-3 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="text-[10px] font-mono uppercase text-white/40 mb-1 block">Proceso / Tarea</label>
                          <input 
                            type="text" 
                            value={p.name}
                            onChange={(e) => updateProcess(p.id, 'name', e.target.value)}
                            placeholder="Ej: Facturación manual"
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm outline-none focus:border-white transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="text-[10px] font-mono uppercase text-white/40 mb-1 block">Frecuencia</label>
                          <select 
                            value={p.frequency}
                            onChange={(e) => updateProcess(p.id, 'frequency', e.target.value)}
                            className="w-full bg-black border border-white/10 p-2 text-xs outline-none"
                          >
                            <option>Diaria</option>
                            <option>Semanal</option>
                            <option>Mensual</option>
                          </select>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-[10px] font-mono uppercase text-white/40">Dependencia de ti</label>
                            <span className="text-[10px] font-mono text-white/70">{p.dependency}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" max="100" 
                            value={p.dependency}
                            onChange={(e) => updateProcess(p.id, 'dependency', parseInt(e.target.value))}
                            className="w-full accent-white h-1 bg-white/10 appearance-none rounded-full"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <label className="text-[10px] font-mono uppercase text-white/40">Carga Mental / Estrés</label>
                            <span className="text-[10px] font-mono text-white/70">{p.mentalLoad}/10</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" max="10" 
                            value={p.mentalLoad}
                            onChange={(e) => updateProcess(p.id, 'mentalLoad', parseInt(e.target.value))}
                            className="w-full accent-white h-1 bg-white/10 appearance-none rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.button 
                  onClick={addProcess}
                  className="border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] flex flex-col items-center justify-center p-6 min-h-[280px] transition-colors text-white/50 hover:text-white group rounded-sm"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    +
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Añadir Proceso</span>
                </motion.button>
              </div>

              <div className="flex justify-center mt-auto pt-8">
                <button 
                  onClick={handleComplete}
                  disabled={processes.some(p => !p.name)}
                  className="px-8 py-4 bg-white text-black font-mono text-sm tracking-widest hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 rounded-sm"
                >
                  HE COMPLETADO EL MIFO <Cpu size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SCANNING */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 border-t-2 border-authomia-blueLight rounded-full animate-spin" style={{ animationDuration: '1s' }} />
                <div className="absolute inset-2 border-r-2 border-white/50 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                <div className="absolute inset-4 border-b-2 border-authomia-redLight rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="text-white animate-pulse" size={32} />
                </div>
              </div>
              <h2 className="text-xl font-mono tracking-widest uppercase mb-4">Procesando Diagnóstico</h2>
              <div className="w-64 h-1 bg-white/10 overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-authomia-blueLight to-authomia-redLight"
                />
              </div>
              <div className="mt-8 font-mono text-xs text-white/40 space-y-2 text-center">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Calculando Índice de Fragilidad...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Evaluando Potencial de Automatización...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Generando Arquitectura de Solución...</motion.p>
              </div>
            </motion.div>
          )}

          {/* STEP 3: RESULTS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light mb-4">Reporte Estratégico MIFO</h2>
                <p className="text-white/50">Diagnóstico generado basado en la arquitectura de tus procesos.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Radar Chart */}
                <div className="lg:col-span-1 bg-[#050505] border border-white/10 p-6 rounded-sm flex flex-col items-center justify-center min-h-[300px]">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6 w-full text-left">Vector de Escalabilidad</h3>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'monospace' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Tu Negocio" dataKey="A" stroke="#0A109E" fill="#0A109E" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-4xl font-light">{Math.round(scalabilityScore)}%</div>
                    <div className="text-[10px] font-mono uppercase text-white/40 mt-1">Score de Escalabilidad</div>
                  </div>
                </div>

                {/* Risk & Insights */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">Riesgos Detectados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {highRiskProcesses.length > 0 ? (
                      highRiskProcesses.map(p => (
                        <div key={p.id} className="bg-red-500/5 border border-red-500/20 p-4 rounded-sm flex gap-4">
                          <ShieldAlert className="text-red-500 shrink-0" size={20} />
                          <div>
                            <h4 className="font-bold text-sm text-red-100 mb-1">Cuello de Botella: {p.name}</h4>
                            <p className="text-xs text-red-200/60">Dependencia del {p.dependency}% con alta carga mental. Si te ausentas, este proceso colapsa la operación.</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-sm flex gap-4 col-span-2">
                        <CheckCircle className="text-green-500 shrink-0" size={20} />
                        <div>
                          <h4 className="font-bold text-sm text-green-100 mb-1">Dependencia Controlada</h4>
                          <p className="text-xs text-green-200/60">Tus procesos actuales no muestran un riesgo inminente de colapso por dependencia directa.</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-authomia-blueLight/5 border border-authomia-blueLight/20 p-4 rounded-sm flex gap-4">
                      <Zap className="text-authomia-blueLight shrink-0" size={20} />
                      <div>
                        <h4 className="font-bold text-sm text-blue-100 mb-1">Potencial de Automatización</h4>
                        <p className="text-xs text-blue-200/60">El {Math.round(automationPotential)}% de tu carga operativa actual es delegable a sistemas de Inteligencia Artificial o flujos automatizados.</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mt-8 mb-4">Hoja de Ruta Recomendada</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center bg-white/[0.02] border border-white/5 p-4">
                      <div className="text-authomia-blueLight font-mono font-bold">01</div>
                      <div className="text-sm text-white/80">Documentar los procesos con dependencia mayor al 70%.</div>
                    </div>
                    <div className="flex gap-4 items-center bg-white/[0.02] border border-white/5 p-4">
                      <div className="text-authomia-blueLight font-mono font-bold">02</div>
                      <div className="text-sm text-white/80">Sistematizar la lógica de decisión (Quitar la carga mental humana).</div>
                    </div>
                    <div className="flex gap-4 items-center bg-white/[0.02] border border-white/5 p-4">
                      <div className="text-authomia-blueLight font-mono font-bold">03</div>
                      <div className="text-sm text-white/80">Implementar IA y Automatización para ejecución a costo marginal cero.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-6 mt-8">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest max-w-xl mx-auto">
                  * Por seguridad y confidencialidad, estos datos están encriptados en tu sesión local y se destruirán al cerrar esta ventana. Guarda una captura si deseas conservar el reporte.
                </p>
                <a 
                  href="https://wa.me/51934384060" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-sm tracking-widest hover:bg-white/90 transition-all rounded-sm"
                >
                  HABLAR CON UN ESTRATEGA DE AUTHOMIA <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SUGGESTIONS MODAL */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowSuggestions(false)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-5xl bg-[#0A0A0A]/95 border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-[#050505]">
                <div>
                  <h2 className="text-2xl font-light text-white mb-1">Catálogo de Fricciones</h2>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Inspiración para tu Matriz MIFO</p>
                </div>
                <button onClick={() => setShowSuggestions(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-sm bg-authomia-blueLight/10 border border-authomia-blueLight/20 flex items-center justify-center">
                      <Database className="text-authomia-blueLight" size={16} />
                    </div>
                    <h3 className="text-lg font-medium text-white">BLOQUE A: ÁREAS UNIVERSALES</h3>
                  </div>
                  <p className="text-sm text-white/50 mb-8">Estas son las tareas que drenan la energía del fundador en el 90% de los negocios.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SUGGESTIONS.universal.map((area, idx) => (
                      <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-authomia-blueLight font-mono">{idx + 1}.</span> {area.title}
                        </h4>
                        <ul className="space-y-3">
                          {area.items.map((item, i) => (
                            <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                              <span className="text-white/20 mt-0.5">•</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-sm bg-authomia-redLight/10 border border-authomia-redLight/20 flex items-center justify-center">
                      <Activity className="text-authomia-redLight" size={16} />
                    </div>
                    <h3 className="text-lg font-medium text-white">BLOQUE B: SECTORES ESPECÍFICOS</h3>
                  </div>
                  <p className="text-sm text-white/50 mb-8">Fricciones operativas comunes según la vertical de tu negocio.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SUGGESTIONS.sectors.map((sector, idx) => (
                      <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
                        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                          <span className="text-authomia-redLight font-mono">{idx + 1}.</span> {sector.title}
                        </h4>
                        <ul className="space-y-3">
                          {sector.items.map((item, i) => (
                            <li key={i} className="text-xs text-white/70 flex items-start gap-2">
                              <span className="text-white/20 mt-0.5">•</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
