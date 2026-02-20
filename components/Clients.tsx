import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '../types';
import { Server, Lock, ChevronRight, X, ExternalLink, Linkedin, Instagram, Facebook } from 'lucide-react';
import Modal from './Modals';

interface ClientsProps {
  content: Content['clients'];
}

interface Partner {
  id: string;
  companyName: string;
  personName: string;
  quote: string;
  image: string;
  website: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const Clients: React.FC<ClientsProps> = ({ content }) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [hoveredPartnerId, setHoveredPartnerId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('authomia_partners');
    if (saved) {
      setPartners(JSON.parse(saved));
    }
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const totalSlots = 4;
  const slots = Array.from({ length: totalSlots }).map((_, i) => partners[i] || null);

  return (
    <section className="py-32 px-6 bg-[#050505] border-t border-white/5 relative overflow-hidden" id="clients">
      
      {/* Custom Cursor for Partner Hover */}
      <motion.div 
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        animate={{ 
          x: cursorPos.x - 64, 
          y: cursorPos.y - 64, 
          scale: hoveredPartnerId ? 1 : 0,
          opacity: hoveredPartnerId ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full rounded-full border border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <span className="text-[10px] font-mono font-bold text-white text-center uppercase tracking-widest">
            Ver Socio<br/>Legado
          </span>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-white mb-4">{content.title}</h2>
            <p className="text-white/40 max-w-2xl mx-auto font-light">{content.subtitle}</p>
         </div>

         {/* The Vault Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {slots.map((partner, index) => {
              // PARTNER SLOT (FILLED)
              if (partner) {
                return (
                  <motion.div 
                     key={partner.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     onMouseEnter={() => setHoveredPartnerId(partner.id)}
                     onMouseLeave={() => setHoveredPartnerId(null)}
                     onClick={() => setSelectedPartner(partner)}
                     className="group relative h-[400px] bg-[#08090B] border border-white/10 rounded-sm p-8 overflow-hidden cursor-none flex flex-col justify-between hover:border-authomia-blue/40 transition-colors duration-500 preserve-3d"
                  >
                     <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                     
                     <div className="relative z-10">
                        {/* Company Title */}
                        <div className="mb-6">
                           <h3 className="text-lg font-bold font-mono text-white mb-1 tracking-wide">{partner.companyName}</h3>
                           <p className="text-xs text-authomia-blueLight font-mono uppercase tracking-widest">{partner.personName}</p>
                        </div>

                        {/* Profile Image */}
                        <div className="w-20 h-20 rounded-full border-2 border-white/10 overflow-hidden mb-6 shadow-2xl group-hover:scale-105 transition-transform duration-500 group-hover:border-authomia-blue/50">
                           <img src={partner.image} alt={partner.personName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>

                        {/* Quote */}
                        <p className="text-sm font-light text-white/60 italic leading-relaxed">
                          "{partner.quote}"
                        </p>
                     </div>

                     <div className="relative z-10 pt-6 border-t border-white/5 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-mono uppercase">Legacy Status: Active</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                     </div>
                  </motion.div>
                );
              }

              // EMPTY SLOT (CTA) - ONLY FOR FIRST EMPTY SLOT
              const isFirstEmpty = !partner && (index === 0 || slots[index - 1]);
              
              if (isFirstEmpty) {
                 return (
                  <motion.div 
                     key={`empty-${index}`}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="group relative h-[400px] bg-gradient-to-b from-authomia-blue/10 to-transparent border border-authomia-blue/30 rounded-sm p-1 overflow-hidden"
                  >
                     {/* Active Scan Animation */}
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-authomia-blue shadow-[0_0_20px_rgba(0,240,255,1)] animate-[scan_3s_ease-in-out_infinite]" />
                     
                     <div className="h-full bg-[#08090B] flex flex-col justify-between p-8 relative z-10">
                        <div>
                           <div className="flex justify-between items-start mb-6">
                              <Server className="w-6 h-6 text-authomia-blue" />
                              <span className="text-[10px] font-mono text-authomia-blue animate-pulse">AVAILABLE</span>
                           </div>
                           <h3 className="text-xl font-mono text-white mb-4">SLOT 0{index + 1}</h3>
                           <p className="text-sm text-white/50 leading-relaxed">
                             Este espacio está reservado para la próxima gran historia de éxito. Tu empresa podría ser el siguiente socio legado.
                           </p>
                        </div>

                        <div className="w-full py-4 border border-white/10 text-white/60 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                           Trabaja con nosotros
                           <span className="block w-1 h-1 bg-white/50 rounded-full" />
                           Sé un Socio Legado
                        </div>
                     </div>
                  </motion.div>
                 );
              }

              // LOCKED SLOT
              return (
                 <motion.div 
                    key={`locked-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-[400px] bg-[#020202] border border-white/5 rounded-sm p-6 flex flex-col justify-center items-center opacity-60 grayscale hover:opacity-80 transition-opacity"
                 >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                       <Lock className="w-6 h-6 text-white/30" />
                    </div>
                    <h3 className="text-lg font-mono text-white/30 mb-2">SLOT 0{index + 1}</h3>
                    <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-white/20 tracking-widest">
                       LOCKED
                    </div>
                 </motion.div>
              );
            })}
         </div>
      </div>

      {/* PARTNER DETAIL MODAL */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedPartner(null)}
          >
             <motion.div 
               initial={{ y: 50, opacity: 0, scale: 0.95 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               exit={{ y: 50, opacity: 0, scale: 0.95 }}
               onClick={(e) => e.stopPropagation()}
               className="w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
             >
                <button 
                  onClick={() => setSelectedPartner(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 z-20"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Left: Visuals */}
                <div className="w-full md:w-1/3 bg-[#08090B] p-8 border-r border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-authomia-blue/10 to-transparent opacity-50" />
                   
                   <div className="relative z-10">
                     <div className="w-32 h-32 rounded-full border-2 border-white/20 overflow-hidden mb-6 mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <img src={selectedPartner.image} alt={selectedPartner.personName} className="w-full h-full object-cover" />
                     </div>
                     <h2 className="text-xl font-bold font-mono text-white mb-1">{selectedPartner.companyName}</h2>
                     <p className="text-sm text-authomia-blueLight font-mono uppercase tracking-widest mb-6">{selectedPartner.personName}</p>

                     <div className="flex justify-center gap-4">
                        {selectedPartner.socials.linkedin && (
                          <a href={selectedPartner.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {selectedPartner.socials.instagram && (
                          <a href={selectedPartner.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#E4405F] hover:text-white transition-colors">
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                        {selectedPartner.socials.twitter && ( // Using facebook icon for generic field map
                          <a href={selectedPartner.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-[#1877F2] hover:text-white transition-colors">
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}
                     </div>
                   </div>
                </div>

                {/* Right: Report */}
                <div className="w-full md:w-2/3 p-8 md:p-12 relative">
                   <div className="flex items-center gap-3 mb-8 opacity-50">
                      <ExternalLink className="w-4 h-4" />
                      <a href={selectedPartner.website} target="_blank" rel="noreferrer" className="text-xs font-mono uppercase tracking-widest hover:text-white hover:underline">
                        {selectedPartner.website}
                      </a>
                   </div>

                   <div className="prose prose-invert max-w-none">
                      <h3 className="text-lg font-light text-white mb-4 border-b border-white/10 pb-4">Informe de Socio Legado</h3>
                      <p className="text-white/70 font-light leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {selectedPartner.bio}
                      </p>
                   </div>

                   <div className="mt-12 pt-6 border-t border-white/10 text-[10px] text-white/30 font-mono text-center">
                      <p>Este informe ha sido generado bajo las políticas de transparencia de Authomia Agency, con la aprobación expresa de la marca asociada. Authomia Protocol v2.5 Verified.</p>
                   </div>
                </div>

             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Clients;