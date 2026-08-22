import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { LOGO_ICON_URL } from '../constants';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#030407]/90 backdrop-blur-xl border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <a href="/" className="flex items-center gap-3 group">
          <img 
            src={LOGO_ICON_URL || "https://imgur.com/R48vhCC.png"} 
            alt="Authomia" 
            className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" 
          />
          <span className="font-mono text-sm tracking-[0.25em] text-white font-bold">AUTHOMIA</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.15em] text-white/60">
          <a href="/#servicios" className="hover:text-white transition-colors">
            {lang === 'es' ? 'Servicios' : 'Services'}
          </a>
          <a href="/servicios" className="hover:text-white transition-colors">
            {lang === 'es' ? 'Detalles & FAQ' : 'Details & FAQ'}
          </a>
          <a href="/quienes-somos" className="hover:text-white transition-colors">
            {lang === 'es' ? 'Quiénes Somos' : 'Who We Are'}
          </a>
          <a href="/#reseñas" className="hover:text-white transition-colors">
            {lang === 'es' ? 'Reseñas' : 'Reviews'}
          </a>
        </div>

        {/* Desktop Right Actions: Lang + Contact CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5 text-white/40 mr-1" />
            <button 
              onClick={() => setLang('es')}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${lang === 'es' ? 'text-white font-bold bg-white/10' : 'text-white/40 hover:text-white/70'}`}
            >
              ES
            </button>
            <span className="text-white/20 text-xs">/</span>
            <button 
              onClick={() => setLang('en')}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${lang === 'en' ? 'text-white font-bold bg-white/10' : 'text-white/40 hover:text-white/70'}`}
            >
              EN
            </button>
          </div>

          <a 
            href="/#contacto-directo"
            className="text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-white/90 px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>{lang === 'es' ? 'Consultar' : 'Contact'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Controls (Lang + Toggle) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')} 
            className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/80 uppercase"
          >
            {lang.toUpperCase()}
          </button>

          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/80 hover:text-white border border-white/10 rounded-lg bg-white/[0.03] cursor-pointer"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-[#06070a] px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
              <a 
                href="/#servicios" 
                onClick={() => setMobileOpen(false)}
                className="py-2 text-white/70 hover:text-white border-b border-white/5"
              >
                {lang === 'es' ? 'Servicios' : 'Services'}
              </a>
              <a 
                href="/servicios" 
                onClick={() => setMobileOpen(false)}
                className="py-2 text-white/70 hover:text-white border-b border-white/5"
              >
                {lang === 'es' ? 'Detalles & FAQ' : 'Details & FAQ'}
              </a>
              <a 
                href="/quienes-somos" 
                onClick={() => setMobileOpen(false)}
                className="py-2 text-white/70 hover:text-white border-b border-white/5"
              >
                {lang === 'es' ? 'Quiénes Somos' : 'Who We Are'}
              </a>
              <a 
                href="/#reseñas" 
                onClick={() => setMobileOpen(false)}
                className="py-2 text-white/70 hover:text-white border-b border-white/5"
              >
                {lang === 'es' ? 'Reseñas' : 'Reviews'}
              </a>
              <a 
                href="/#contacto-directo"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center py-3 bg-white text-black font-semibold rounded-lg"
              >
                {lang === 'es' ? 'Iniciar Consulta' : 'Start Inquiry'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
