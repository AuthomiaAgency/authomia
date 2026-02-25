import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, ArrowRight, Lock, ImageOff, ChevronDown } from 'lucide-react';
import { LOGO_ICON_URL } from '../constants';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface PublicationBlock {
  type: 'text' | 'image' | 'button' | 'heading' | 'h2' | 'h3' | 'h4' | 'quote' | 'divider' | 'video';
  content: string;
  extra?: string;
  buttonColor?: string;
  icon?: string;
}

interface PublicationGroup {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

interface Publication {
  id: string;
  title: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  groupId?: string;
  coverPosition?: string;
  date: string;
  coverImage: string;
  excerpt: string;
  blocks: PublicationBlock[];
}

const Publications: React.FC = () => {
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [groups, setGroups] = useState<PublicationGroup[]>([]);
  
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<PublicationGroup | null>(null);
  
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Extract slug from URL if present
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  // pathParts[0] = 'publicaciones'
  // pathParts[1] = 'grupo' or postSlug
  // pathParts[2] = groupSlug (if pathParts[1] === 'grupo')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pDoc, gDoc] = await Promise.all([
          getDoc(doc(db, 'appData', 'publications')),
          getDoc(doc(db, 'appData', 'publicationGroups'))
        ]);
        
        const fetchedPubs = pDoc.exists() ? pDoc.data().items || [] : [];
        const fetchedGroups = gDoc.exists() ? gDoc.data().items || [] : [];
        
        setPubs(fetchedPubs);
        setGroups(fetchedGroups);
        
        if (pathParts.length > 1) {
          if (pathParts[1] === 'grupo' && pathParts[2]) {
            const groupSlug = pathParts[2];
            const foundGroup = fetchedGroups.find((g: PublicationGroup) => g.slug === groupSlug || g.id === groupSlug);
            if (foundGroup) setSelectedGroup(foundGroup);
          } else {
            const postSlug = pathParts[1];
            const foundPub = fetchedPubs.find((p: Publication) => p.slug === postSlug || p.id === postSlug);
            if (foundPub) setSelectedPub(foundPub);
          }
        }
      } catch (e) {
        console.error("Failed to load data", e);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update SEO Meta Tags
  useEffect(() => {
    if (selectedPub) {
      document.title = selectedPub.seoTitle || `${selectedPub.title} | Authomia`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedPub.seoDescription || selectedPub.excerpt);
      }
    } else if (selectedGroup) {
      document.title = `${selectedGroup.title} | Authomia`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedGroup.description);
      }
    } else {
      document.title = 'Authomia | Sistemas de Inteligencia & Automatización';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Diagnóstico, arquitectura e implementación de sistemas digitales escalables. Convertimos el caos operativo en orden estratégico.');
      }
    }
  }, [selectedPub, selectedGroup]);

  const logoUrl = LOGO_ICON_URL || "https://imgur.com/R48vhCC.png";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  const handlePubClick = (pub: Publication) => {
    const targetSlug = pub.slug || pub.id;
    window.history.pushState({}, '', `/publicaciones/${targetSlug}`);
    setSelectedPub(pub);
    setSelectedGroup(null);
    window.scrollTo(0, 0);
  };

  const handleGroupClick = (group: PublicationGroup) => {
    const targetSlug = group.slug || group.id;
    window.history.pushState({}, '', `/publicaciones/grupo/${targetSlug}`);
    setSelectedGroup(group);
    setSelectedPub(null);
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    window.history.pushState({}, '', '/publicaciones');
    setSelectedPub(null);
    setSelectedGroup(null);
    window.scrollTo(0, 0);
  };

  const generateToC = (blocks: PublicationBlock[]) => {
    return blocks
      .map((block, index) => {
        if (['heading', 'h2', 'h3', 'h4'].includes(block.type)) {
          return {
            id: `heading-${index}`,
            title: block.content,
            level: block.type === 'heading' ? 1 : parseInt(block.type.replace('h', '')),
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  if (hasError) {
     return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/50 font-mono text-sm">
           System Maintenance. Please reload protocol.
        </div>
     );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-authomia-blueLight border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // NAVBAR COMPONENT
  const Navbar = () => (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <img src={logoUrl} className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" alt="Authomia" />
          <span className="font-mono text-sm tracking-widest font-bold hidden sm:block">AUTHOMIA</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors">Inicio</a>
          
          <div className="relative group/nav">
            <button className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-1 py-4">
              Servicios <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-0 w-64 bg-[#08090B] border border-white/10 rounded-sm opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 shadow-2xl transform translate-y-2 group-hover/nav:translate-y-0">
               <a href="/servicios" className="block p-4 hover:bg-white/5 border-b border-white/5 transition-colors">
                 <span className="block text-authomia-blueLight font-mono text-[10px] mb-1">BLUE DIAMOND</span>
                 <span className="text-sm">Automatización de Flujos</span>
               </a>
               <a href="/servicios" className="block p-4 hover:bg-white/5 transition-colors">
                 <span className="block text-authomia-redLight font-mono text-[10px] mb-1">RED DIAMOND</span>
                 <span className="text-sm">Sistemas de Inteligencia Core</span>
               </a>
            </div>
          </div>

          <div className="relative group/nav">
            <button className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-1 py-4">
              Authomia Agency <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-0 w-48 bg-[#08090B] border border-white/10 rounded-sm opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 shadow-2xl transform translate-y-2 group-hover/nav:translate-y-0">
               <a href="/contacto" className="block p-4 hover:bg-white/5 text-sm transition-colors border-b border-white/5">Contacto</a>
               <a href="/sobre-nosotros" className="block p-4 hover:bg-white/5 text-sm transition-colors">Quiénes Somos</a>
            </div>
          </div>

          {groups.map(g => (
            <div key={g.id} className="relative group/nav">
              <button onClick={() => handleGroupClick(g)} className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-1 py-4">
                {g.title} <ChevronDown size={12} />
              </button>
              <div className="absolute top-full left-0 w-80 bg-[#08090B] border border-white/10 rounded-sm opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 shadow-2xl p-2 transform translate-y-2 group-hover/nav:translate-y-0">
                 {pubs.filter(p => p.groupId === g.id).slice(0, 5).map(p => (
                   <button key={p.id} onClick={() => handlePubClick(p)} className="w-full text-left block p-3 hover:bg-white/5 rounded-sm transition-colors">
                     <span className="block text-xs text-white/90 truncate">{p.title}</span>
                   </button>
                 ))}
                 <button onClick={() => handleGroupClick(g)} className="w-full text-left block p-3 text-[10px] font-mono text-authomia-blueLight uppercase tracking-widest hover:bg-white/5 rounded-sm mt-2 border-t border-white/5 transition-colors">
                   Ver todo en {g.title} &rarr;
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );

  // VIEW SINGLE PUBLICATION
  if (selectedPub) {
    const toc = generateToC(selectedPub.blocks);

    return (
      <div className="min-h-screen bg-[#020202] text-white font-sans">
        <Navbar />
        
        {/* Banner Section */}
        <div className="relative w-full min-h-[60vh] md:min-h-[70vh] bg-[#08090B] overflow-hidden flex flex-col justify-end pb-16 px-6 pt-32">
          {selectedPub.coverImage && (
            <>
              <img 
                src={selectedPub.coverImage} 
                className="absolute inset-0 w-full h-full object-cover opacity-30" 
                style={{ objectPosition: selectedPub.coverPosition || 'center' }}
                alt="Cover" 
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
            </>
          )}
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <button onClick={handleBackClick} className="mb-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
              <ArrowLeft size={14} /> Volver
            </button>
            <span className="text-authomia-blueLight font-mono text-xs uppercase tracking-widest mb-4 block">{selectedPub.date}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight max-w-4xl">{selectedPub.title}</h1>
            {selectedPub.excerpt && (
              <p className="mt-6 text-lg md:text-xl text-white/60 font-light max-w-3xl leading-relaxed">{selectedPub.excerpt}</p>
            )}
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Table of Contents */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">Tabla de Contenidos</h3>
              <nav className="space-y-3 border-l border-white/10 pl-4">
                {toc.map((item: any) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`}
                    className={`block text-sm text-white/60 hover:text-authomia-blueLight transition-colors ${
                      item.level === 1 ? 'font-medium text-white/80' : 
                      item.level === 2 ? 'pl-2' : 
                      item.level === 3 ? 'pl-4 text-xs' : 'pl-6 text-xs'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Center Column: Main Content */}
          <div className="lg:col-span-6">
            <div className="space-y-8">
               {selectedPub.blocks.map((block, idx) => {
                  const blockId = `heading-${idx}`;
                  return (
                  <div key={idx}>
                     {block.type === 'heading' && <h2 id={blockId} className="text-3xl md:text-4xl font-light text-white mb-6 mt-12 scroll-mt-32">{block.content}</h2>}
                     {block.type === 'h2' && <h3 id={blockId} className="text-2xl md:text-3xl font-medium text-white/90 mb-4 mt-10 scroll-mt-32">{block.content}</h3>}
                     {block.type === 'h3' && <h4 id={blockId} className="text-xl md:text-2xl font-medium text-white/80 mb-3 mt-8 scroll-mt-32">{block.content}</h4>}
                     {block.type === 'h4' && <h5 id={blockId} className="text-lg md:text-xl font-medium text-white/70 mb-2 mt-6 scroll-mt-32">{block.content}</h5>}
                     
                     {block.type === 'text' && <p className="text-lg text-white/70 font-light leading-relaxed whitespace-pre-line">{block.content}</p>}
                     
                     {block.type === 'quote' && (
                        <blockquote className="border-l-2 border-authomia-blueLight pl-6 py-2 my-10 bg-white/[0.02] rounded-r-lg">
                           <p className="text-xl md:text-2xl font-light italic text-white/90 leading-relaxed">"{block.content}"</p>
                           {block.extra && <footer className="text-sm font-mono text-white/50 mt-4 uppercase tracking-widest">— {block.extra}</footer>}
                        </blockquote>
                     )}
                     
                     {block.type === 'divider' && <hr className="border-white/10 my-12" />}
                     
                     {block.type === 'image' && (
                        <div className="rounded-lg border border-white/10 overflow-hidden bg-[#08090B] my-10 shadow-2xl">
                           <img 
                             src={block.content} 
                             className="w-full h-auto object-cover" 
                             alt="Content" 
                             onError={handleImageError}
                           />
                        </div>
                     )}
                     
                     {block.type === 'video' && (
                        <div className="rounded-lg border border-white/10 overflow-hidden bg-[#08090B] my-10 aspect-video relative shadow-2xl">
                           <iframe 
                             src={block.content} 
                             className="absolute top-0 left-0 w-full h-full"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                             allowFullScreen
                           />
                        </div>
                     )}
                     
                     {block.type === 'button' && (
                        <div className="py-8 flex">
                           <a 
                             href={block.extra} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="group relative px-8 py-4 font-mono text-sm tracking-widest overflow-hidden rounded-full transition-all hover:scale-105 inline-flex items-center gap-3"
                             style={{ backgroundColor: block.buttonColor || '#0A109E', color: '#ffffff' }}
                           >
                              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-colors" />
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
               )})}
            </div>
          </div>

          {/* Right Column: Recommendations / Related */}
          <div className="lg:col-span-3">
            <div className="sticky top-32">
              <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">Recomendaciones</h3>
              <div className="space-y-6">
                {pubs.filter(p => p.id !== selectedPub.id).slice(0, 3).map(relatedPub => (
                  <div 
                    key={relatedPub.id} 
                    onClick={() => handlePubClick(relatedPub)}
                    className="group cursor-pointer block"
                  >
                    <div className="aspect-video rounded-sm overflow-hidden bg-[#08090B] mb-3 border border-white/10">
                      {relatedPub.coverImage ? (
                        <img src={relatedPub.coverImage} alt={relatedPub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={handleImageError} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10"><ImageOff size={24} /></div>
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-white/80 group-hover:text-authomia-blueLight transition-colors line-clamp-2">{relatedPub.title}</h4>
                    <span className="text-[10px] font-mono text-white/40 mt-1 block">{relatedPub.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // VIEW GROUP
  if (selectedGroup) {
    const groupPubs = pubs.filter(p => p.groupId === selectedGroup.id);
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans">
        <Navbar />
        
        {/* Group Banner */}
        <div className="relative w-full min-h-[50vh] bg-[#08090B] overflow-hidden flex flex-col justify-end pb-16 px-6 pt-32 border-b border-white/5">
          {selectedGroup.coverImage && (
            <>
              <img 
                src={selectedGroup.coverImage} 
                className="absolute inset-0 w-full h-full object-cover opacity-30" 
                alt="Group Cover" 
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            </>
          )}
          <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
            <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">{selectedGroup.title}</h1>
            <p className="text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">{selectedGroup.description}</p>
          </div>
        </div>

        {/* Group Publications */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {groupPubs.map((pub, idx) => (
                <motion.div 
                   key={pub.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   onClick={() => handlePubClick(pub)}
                   className="group cursor-pointer bg-[#08090B] border border-white/10 hover:border-authomia-blue/50 transition-colors duration-500 overflow-hidden flex flex-col h-full rounded-sm"
                >
                   <div className="h-64 overflow-hidden relative bg-[#020202] flex items-center justify-center">
                      {pub.coverImage ? (
                         <img 
                            src={pub.coverImage} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                            style={{ objectPosition: pub.coverPosition || 'center' }}
                            alt={pub.title} 
                            onError={handleImageError}
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
          {groupPubs.length === 0 && (
            <div className="text-center py-20 text-white/40 font-mono text-sm">
              No hay publicaciones en este grupo aún.
            </div>
          )}
        </div>
      </div>
    );
  }

  // MAIN FEED
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6 overflow-hidden relative">
       <Navbar />

       <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
             <h1 className="text-4xl md:text-5xl font-light mb-6">Archivo de Inteligencia</h1>
             <p className="text-white/40 font-mono text-xs uppercase tracking-[0.2em]">Recursos, Actualizaciones y Estrategia</p>
          </div>

          {/* GROUPS SECTION */}
          {groups.length > 0 && (
            <div className="mb-24">
              <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Categorías</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group, idx) => (
                  <motion.div 
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleGroupClick(group)}
                    className="group cursor-pointer relative overflow-hidden rounded-sm border border-white/10 aspect-[2/1] flex items-center justify-center"
                  >
                    {group.coverImage && (
                      <img src={group.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" alt={group.title} onError={handleImageError} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative z-10 text-center p-6">
                      <h3 className="text-xl font-medium text-white group-hover:text-authomia-blueLight transition-colors">{group.title}</h3>
                      <p className="text-xs text-white/60 mt-2 line-clamp-2">{group.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ALL POSTS SECTION */}
          <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Últimas Publicaciones</h2>
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
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
               {pubs.map((pub, idx) => (
                  <motion.div 
                     key={pub.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     onClick={() => handlePubClick(pub)}
                     className="group cursor-pointer bg-[#08090B] border border-white/10 hover:border-authomia-blue/50 transition-colors duration-500 overflow-hidden flex flex-col h-full rounded-sm"
                  >
                     <div className="h-64 overflow-hidden relative bg-[#020202] flex items-center justify-center">
                        {pub.coverImage ? (
                           <img 
                              src={pub.coverImage} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                              style={{ objectPosition: pub.coverPosition || 'center' }}
                              alt={pub.title} 
                              onError={handleImageError}
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