import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

interface SurveyQuestion {
  id: string;
  type: 'text' | 'choice' | 'email';
  question: string;
  options?: string[];
}

interface SurveyData {
  id: string;
  title: string;
  description: string;
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const savedSurveys = localStorage.getItem('authomia_surveys');
    
    if (id && savedSurveys) {
      const found = JSON.parse(savedSurveys).find((s: any) => s.id === id);
      if (found) setSurvey(found);
    }
  }, []);

  const handleAnswer = (val: string) => {
    if (!survey) return;
    setAnswers({ ...answers, [survey.questions[currentStep].id]: val });
    setError('');
  };

  const nextStep = () => {
    if (!survey) return;
    const q = survey.questions[currentStep];
    if (!answers[q.id]) {
       setError('Por favor, completa este campo.');
       return;
    }
    if (q.type === 'email' && !answers[q.id].includes('@')) {
       setError('Formato de email inválido.');
       return;
    }
    
    if (currentStep < survey.questions.length - 1) {
       setCurrentStep(prev => prev + 1);
    } else {
       submitSurvey();
    }
  };

  const submitSurvey = () => {
    if (!survey) return;
    const newResponse = { date: new Date().toISOString(), answers };
    
    // Update local storage
    const allSurveys = JSON.parse(localStorage.getItem('authomia_surveys') || '[]');
    const updatedSurveys = allSurveys.map((s: any) => {
       if (s.id === survey.id) {
          return { ...s, responses: [...(s.responses || []), newResponse] };
       }
       return s;
    });
    localStorage.setItem('authomia_surveys', JSON.stringify(updatedSurveys));
    setCompleted(true);
  };

  if (!survey) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">Cargando Protocolo...</div>;

  if (completed) {
     return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 text-center">
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-8 border border-green-500/50">
              <Check size={40} />
           </motion.div>
           <h1 className="text-3xl md:text-4xl text-white font-light mb-4">Registro Completado</h1>
           <p className="text-white/40 mb-12 max-w-md">Tus datos han sido encriptados y enviados a la base central de Authomia.</p>
           
           {survey.ctaLink && (
              <a href={survey.ctaLink} className="px-8 py-4 bg-authomia-blue hover:bg-authomia-blueLight text-white font-mono text-sm tracking-widest rounded-full transition-colors">
                 {survey.ctaLabel || 'CONTINUAR'}
              </a>
           )}
           {!survey.ctaLink && (
              <a href="/" className="text-white/30 font-mono text-xs hover:text-white mt-8">VOLVER AL INICIO</a>
           )}
        </div>
     );
  }

  const q = survey.questions[currentStep];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
       <div className="h-1 bg-white/10 w-full">
          <motion.div 
             className="h-full bg-authomia-blue" 
             initial={{ width: 0 }} 
             animate={{ width: `${((currentStep + 1) / survey.questions.length) * 100}%` }} 
          />
       </div>

       <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-20 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
             <motion.div 
               key={currentStep}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="w-full"
             >
                <span className="text-authomia-blue font-mono text-xs mb-4 block">PREGUNTA {currentStep + 1} DE {survey.questions.length}</span>
                <h2 className="text-2xl md:text-4xl text-white font-light mb-8 md:mb-12 leading-tight">{q.question}</h2>

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
                           className={`w-full text-left p-6 border ${answers[q.id] === opt ? 'border-authomia-blue bg-authomia-blue/10 text-white' : 'border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:border-white/30'} transition-all text-lg rounded-sm flex items-center gap-4`}
                         >
                            <span className="w-6 h-6 border border-white/20 flex items-center justify-center text-xs font-mono">{String.fromCharCode(65 + idx)}</span>
                            {opt}
                         </button>
                      ))}
                   </div>
                )}

                {error && <div className="mt-4 flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={14}/> {error}</div>}

                <div className="mt-12">
                   <button onClick={nextStep} className="px-8 py-3 bg-white text-black font-mono text-sm font-bold uppercase tracking-widest hover:bg-authomia-blue hover:text-white transition-colors rounded-sm flex items-center gap-2">
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