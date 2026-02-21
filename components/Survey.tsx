import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface SurveyQuestion {
  id: string;
  type: 'text' | 'choice' | 'email' | 'info' | 'button';
  question: string;
  options?: string[];
  url?: string;
}

interface SurveyData {
  id: string;
  title: string;
  description: string;
  introTitle?: string;
  introDescription?: string;
  introButtonLabel?: string;
  questions: SurveyQuestion[];
  responses: any[];
  ctaLabel?: string;
  ctaLink?: string;
}

const Survey: React.FC = () => {
  const [survey, setSurvey] = useState<SurveyData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      
      if (id) {
        try {
          const sDoc = await getDoc(doc(db, 'appData', 'surveys'));
          if (sDoc.exists()) {
            const allSurveys = sDoc.data().items || [];
            const found = allSurveys.find((s: any) => s.id === id);
            if (found) {
               setSurvey(found);
               if (!found.introTitle) setShowIntro(false);
            }
          }
        } catch (e) {
          console.error("Error fetching survey", e);
        }
      }
    };
    fetchSurvey();
  }, []);

  const handleAnswer = (val: string) => {
    if (!survey) return;
    setAnswers({ ...answers, [survey.questions[currentStep].id]: val });
    setError('');
  };

  const nextStep = () => {
    if (!survey) return;
    const q = survey.questions[currentStep];
    
    if (q.type === 'text' || q.type === 'choice') {
       if (!answers[q.id]) {
          setError('Por favor, completa este campo.');
          return;
       }
    }
    
    if (q.type === 'email') {
       if (!answers[q.id] || !answers[q.id].includes('@')) {
          setError('Formato de email inválido.');
          return;
       }
    }
    
    if (currentStep < survey.questions.length - 1) {
       setCurrentStep(prev => prev + 1);
    } else {
       submitSurvey();
    }
  };

  const submitSurvey = async () => {
    if (!survey) return;
    const newResponse = { date: new Date().toISOString(), answers };
    
    try {
      const sDoc = await getDoc(doc(db, 'appData', 'surveys'));
      if (sDoc.exists()) {
        const allSurveys = sDoc.data().items || [];
        const updatedSurveys = allSurveys.map((s: any) => {
           if (s.id === survey.id) {
              return { ...s, responses: [...(s.responses || []), newResponse] };
           }
           return s;
        });
        await setDoc(doc(db, 'appData', 'surveys'), { items: updatedSurveys });
      }
      setCompleted(true);
    } catch (e) {
      console.error("Error saving survey response", e);
      setError('Hubo un error al guardar tu respuesta. Por favor, intenta de nuevo.');
    }
  };

  if (!survey) return <div className="min-h-screen bg-[#020202] flex items-center justify-center text-white font-mono">Cargando Protocolo...</div>;

  if (showIntro) {
     return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,16,158,0.1)_0%,transparent_50%)] pointer-events-none" />
           <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             className="max-w-2xl relative z-10"
           >
              <h1 className="text-4xl md:text-6xl text-white font-light mb-6 tracking-tight">{survey.introTitle}</h1>
              <p className="text-white/60 text-lg font-light mb-12 leading-relaxed">{survey.introDescription}</p>
              <button 
                onClick={() => setShowIntro(false)} 
                className="px-10 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-authomia-blue hover:text-white transition-all flex items-center gap-3 mx-auto rounded-sm shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(10,16,158,0.4)]"
              >
                 {survey.introButtonLabel || 'INICIAR'} <ArrowRight size={16} />
              </button>
           </motion.div>
        </div>
     );
  }

  if (completed) {
     return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none" />
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-8 border border-green-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] relative z-10">
              <Check size={40} />
           </motion.div>
           <h1 className="text-3xl md:text-5xl text-white font-light mb-6 relative z-10">Protocolo Completado</h1>
           <p className="text-white/50 mb-12 max-w-md text-lg font-light relative z-10">Tus datos han sido encriptados y enviados a la base central de Authomia.</p>
           
           <div className="relative z-10 flex flex-col items-center gap-6">
              {survey.ctaLink && (
                 <a href={survey.ctaLink} className="px-10 py-4 bg-authomia-blue hover:bg-authomia-blueLight text-white font-mono text-sm tracking-widest rounded-sm transition-all shadow-[0_0_30px_rgba(10,16,158,0.3)]">
                    {survey.ctaLabel || 'CONTINUAR'}
                 </a>
              )}
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mt-4">
                 Ya puedes cerrar esta página
              </p>
           </div>
        </div>
     );
  }

  const q = survey.questions[currentStep];
  const isInformationBlock = q.type === 'info' || q.type === 'button';

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
       <div className="h-1 bg-white/10 w-full">
          <motion.div 
             className="h-full bg-authomia-blue" 
             initial={{ width: 0 }} 
             animate={{ width: `${((currentStep + 1) / survey.questions.length) * 100}%` }} 
          />
       </div>

       <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-20 max-w-4xl mx-auto w-full py-12">
          <AnimatePresence mode="wait">
             <motion.div 
               key={currentStep}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="w-full"
             >
                {!isInformationBlock && (
                   <span className="text-authomia-blue font-mono text-xs mb-6 block tracking-widest uppercase">PREGUNTA {currentStep + 1} DE {survey.questions.length}</span>
                )}
                
                {q.type === 'info' ? (
                   <div className="prose prose-invert max-w-none mb-12">
                      <h2 className="text-3xl md:text-5xl text-white font-light leading-tight whitespace-pre-line">{q.question}</h2>
                   </div>
                ) : q.type === 'button' ? (
                   <div className="flex flex-col items-center text-center mb-12">
                      <h2 className="text-3xl md:text-5xl text-white font-light mb-12 leading-tight">{q.question}</h2>
                      <a 
                        href={q.url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-10 py-5 bg-white/5 border border-white/20 hover:bg-white hover:text-black hover:border-white text-white font-mono text-sm uppercase tracking-widest transition-all flex items-center gap-3 rounded-sm"
                      >
                         {q.options?.[0] || 'ABRIR ENLACE'} <ExternalLink size={16} />
                      </a>
                   </div>
                ) : (
                   <h2 className="text-2xl md:text-4xl text-white font-light mb-8 md:mb-12 leading-tight">{q.question}</h2>
                )}

                {q.type === 'text' && (
                   <input 
                     autoFocus
                     className="w-full bg-transparent border-b border-white/20 text-2xl md:text-3xl text-white py-4 outline-none focus:border-authomia-blue transition-colors font-light placeholder-white/20"
                     placeholder="Escribe tu respuesta..."
                     value={answers[q.id] || ''}
                     onChange={(e) => handleAnswer(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                   />
                )}

                {q.type === 'email' && (
                   <input 
                     autoFocus
                     type="email"
                     className="w-full bg-transparent border-b border-white/20 text-2xl md:text-3xl text-white py-4 outline-none focus:border-authomia-blue transition-colors font-light placeholder-white/20"
                     placeholder="name@company.com"
                     value={answers[q.id] || ''}
                     onChange={(e) => handleAnswer(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                   />
                )}

                {q.type === 'choice' && (
                   <div className="space-y-3">
                      {q.options?.map((opt, idx) => (
                         <button 
                           key={idx}
                           onClick={() => { handleAnswer(opt); }}
                           className={`w-full text-left p-6 border ${answers[q.id] === opt ? 'border-authomia-blue bg-authomia-blue/10 text-white shadow-[0_0_20px_rgba(10,16,158,0.2)]' : 'border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:border-white/30'} transition-all text-lg rounded-sm flex items-center gap-4`}
                         >
                            <span className="w-6 h-6 border border-white/20 flex items-center justify-center text-xs font-mono">{String.fromCharCode(65 + idx)}</span>
                            {opt}
                         </button>
                      ))}
                   </div>
                )}

                {error && <div className="mt-6 flex items-center gap-2 text-red-400 text-sm font-mono"><AlertCircle size={14}/> {error}</div>}

                <div className="mt-16 flex justify-between items-center border-t border-white/10 pt-8">
                   <div className="text-white/30 font-mono text-xs">
                      {isInformationBlock ? 'INFORMACIÓN' : 'REQUERIDO'}
                   </div>
                   <button onClick={nextStep} className="px-8 py-4 bg-white text-black font-mono text-sm font-bold uppercase tracking-widest hover:bg-authomia-blue hover:text-white transition-all rounded-sm flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(10,16,158,0.4)]">
                      {currentStep === survey.questions.length - 1 ? 'FINALIZAR' : 'SIGUIENTE'} <ArrowRight size={16} />
                   </button>
                </div>

             </motion.div>
          </AnimatePresence>
       </div>
    </div>
  );
};

export default Survey;