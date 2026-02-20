import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ArrowRight, Lock, ImageOff } from 'lucide-react';
import { LOGO_ICON_URL } from '../constants';

interface PublicationBlock {
  type: 'text' | 'image' | 'button';
  content: string;
  extra?: string;
}

interface Publication {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  blocks: PublicationBlock[];
}

const Publications: React.FC = () => {
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('authomia_publications');
      if (saved) {
        setPubs(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load publications", e);
      setHasError(true);
    }
  }, []);

  // Safe logo fallback
  const logoUrl = LOGO_ICON_URL || "https://imgur.com/R48vhCC.png";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'; // Hide broken images
  };

  if (hasError) {
     return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/50 font-mono text-sm">
           System Maintenance. Please reload protocol.
        </div>
     );
  }

  // VIEW SINGLE PUBLICATION
  if (selectedPub) {
    return (
      <div className="min-h-screen bg-[#020202] text-white pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
           <button onClick={() => setSelectedPub(null)} className="mb-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest">
              <ArrowLeft size={16} /> Volver a Publicaciones
           </button>
           
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-authomia-blueLight font-mono text-xs uppercase tracking-widest mb-4 block">{selectedPub.date}</span>
              <h1 className="text-4xl md:text-6xl font-light mb-12 leading-tight">{selectedPub.title}</h1>
              {selectedPub.coverImage && (
                 <div className="w-full h-[400px] md:h-[600px] mb-16 overflow-hidden rounded-sm bg-[#08090B]">
                    <img 
                      src={selectedPub.coverImage} 
                      className="w-full h-full object-cover" 
                      alt="Cover" 
                      onError={handleImageError}
                    />
                 </div>
              )}
              
              <div className="space-y-12 max-w-2xl mx-auto">
                 {selectedPub.blocks.map((block, idx) => (
                    <div key={idx}>
                       {block.type === 'text' && <p className="text-lg text-white/80 font-light leading-relaxed whitespace-pre-line">{block.content}</p>}
                       {block.type === 'image' && (
                          <div className="rounded-sm border border-white/10 overflow-hidden bg-[#08090B]">
                             <img 
                               src={block.content} 
                               className="w-full" 
                               alt="Content" 
                               onError={handleImageError}
                             />
                          </div>
                       )}
                       {block.type === 'button' && (
                          <div className="py-8 flex justify-center">
                             <a 
                               href={block.extra} 
                               target="_blank" 
                               rel="noreferrer" 
                               className="group relative px-8 py-4 font-mono text-sm tracking-widest overflow-hidden rounded-full transition-all hover:scale-105"
                               style={{ backgroundColor: block.buttonColor || '#0A109E', color: '#ffffff' }}
                             >
                                <div className="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-colors" />
                                <div className="absolute inset-0 rounded-full ring-2 ring-white/50 animate-pulse" />
                                <span className="relative z-10 flex items-center gap-3">
                                   {block.content} 
                                   {block.icon === 'ArrowRight' && <ArrowRight size={16} />}
                                   {block.icon === 'Lock' && <Lock size={16} />}
                                   {block.icon === 'Calendar' && <Calendar size={16} />}
                                   {!block.icon && <ArrowRight size={16} />}
                                </span>
                             </a>
                          </div>
                       )}
                    </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    );
  }

  // MAIN FEED
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 px-6 overflow-hidden relative">
       
       {/* Sophisticated Header */}
       <div className="absolute top-8 left-8 z-20">
          <a href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
             <ArrowLeft size={14} /> Volver al Inicio
          </a>
       </div>
       <div className="flex justify-center mb-16 relative z-10">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src={logoUrl} 
            alt="Authomia" 
            className="w-16 h-16 opacity-80 invert mb-6"
            onError={handleImageError}
          />
       </div>

       <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
             <h1 className="text-4xl md:text-5xl font-light mb-6">Archivo de Inteligencia</h1>
             <p className="text-white/40 font-mono text-xs uppercase tracking-[0.2em]">Recursos, Actualizaciones y Estrategia</p>
          </div>

          {/* EMPTY STATE */}
          {pubs.length === 0 ? (
             <div className="flex flex-col items-center justify-center min-h-[40vh]">
                <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                   <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                   <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                   <Lock className="w-6 h-6 text-white/20" />
                </div>
                <h3 className="text-lg font-mono text-white/40 mb-2">NO DATA STREAMS</h3>
                <p className="text-xs text-white/20 font-light max-w-sm text-center mb-8">
                   No hay nada nuevo aquí, vuelve más tarde. La base de conocimientos se está compilando.
                </p>
                <a href="/" className="px-6 py-3 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                   <ArrowLeft size={14} /> Volver al Inicio
                </a>
             </div>
          ) : (
            // GRID STATE
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
               {pubs.map((pub, idx) => (
                  <motion.div 
                     key={pub.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     onClick={() => setSelectedPub(pub)}
                     className="group cursor-pointer bg-[#08090B] border border-white/10 hover:border-authomia-blue/50 transition-colors duration-500 overflow-hidden flex flex-col h-full rounded-sm"
                  >
                     <div className="h-64 overflow-hidden relative bg-[#020202] flex items-center justify-center">
                        {pub.coverImage ? (
                           <img 
                              src={pub.coverImage} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                              alt={pub.title} 
                              onError={(e) => {
                                 e.currentTarget.style.display = 'none';
                                 e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                 // Add placeholder content via DOM manipulation logic or just fallback to container style
                              }}
                           />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center">
                              <span className="font-mono text-4xl text-white/5 font-bold tracking-tighter">AUTHOMIA</span>
                           </div>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[9px] font-mono uppercase tracking-widest border border-white/10 text-white/70">
                           {pub.date}
                        </div>
                     </div>
                     <div className="p-8 flex-1 flex flex-col">
                        <h2 className="text-lg font-medium mb-4 group-hover:text-authomia-blueLight transition-colors leading-tight">{pub.title}</h2>
                        <p className="text-white/40 font-light text-xs line-clamp-3 mb-6 flex-1 leading-relaxed">{pub.excerpt}</p>
                        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-white transition-colors border-t border-white/5 pt-4">
                           Leer Entrada <ArrowRight size={10} />
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
          )}
       </div>
    </div>
  );
};

export default Publications;