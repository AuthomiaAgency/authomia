import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Terminal } from 'lucide-react';
import { generateResponse } from '../services/geminiService';
import { AIState } from '../types';

const NeuroConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [state, setState] = useState<AIState>({
    isOpen: false,
    isLoading: false,
    messages: [{ role: 'model', text: 'Authomia Core Online. System initialized. How may I assist your architectural needs?' }]
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || state.isLoading) return;

    const userMsg = input;
    setInput('');
    setState(prev => ({
      ...prev,
      isLoading: true,
      messages: [...prev.messages, { role: 'user', text: userMsg }]
    }));

    const response = await generateResponse(state.messages, userMsg);

    setState(prev => ({
      ...prev,
      isLoading: false,
      messages: [...prev.messages, { role: 'model', text: response }]
    }));
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 p-4 bg-authomia-black border border-authomia-blue/50 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-shadow group"
          >
            <Bot className="w-6 h-6 text-authomia-blue group-hover:animate-bounce" />
            <span className="absolute -top-10 right-0 bg-authomia-blue text-black text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Neuro-Concierge
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 right-4 md:right-8 w-[90vw] md:w-[400px] h-[500px] z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border border-authomia-blue/20 rounded-lg flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-authomia-blue" />
                <span className="text-xs font-mono text-authomia-blue tracking-widest">AUTHOMIA CORE v2.5</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {state.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 text-sm font-light leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white/10 border border-white/10 text-white' 
                      : 'text-authomia-blue border-l border-authomia-blue pl-4'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {state.isLoading && (
                 <div className="flex justify-start">
                    <div className="text-authomia-blue/50 text-xs font-mono animate-pulse">Processing logic stream...</div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query the system..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm font-mono placeholder-white/30"
                />
                <button onClick={handleSend} disabled={state.isLoading} className="text-authomia-blue disabled:opacity-50 hover:scale-110 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NeuroConcierge;
