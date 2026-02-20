import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { LOGO_ICON_URL } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none"
    >
      <div className="pointer-events-auto cursor-pointer group flex items-center gap-3">
        <img src={LOGO_ICON_URL} alt="Authomia" className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" />
        <span className="font-mono text-sm tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">AUTHOMIA</span>
      </div>

      <div className="pointer-events-auto flex items-center gap-6 glass-panel px-6 py-2 rounded-full">
        <button 
          onClick={() => setLang('en')}
          className={`text-xs font-mono tracking-widest transition-all ${lang === 'en' ? 'text-white font-bold' : 'text-white/40 hover:text-white/70'}`}
        >
          EN
        </button>
        <div className="w-[1px] h-3 bg-white/10" />
        <button 
          onClick={() => setLang('es')}
          className={`text-xs font-mono tracking-widest transition-all ${lang === 'es' ? 'text-white font-bold' : 'text-white/40 hover:text-white/70'}`}
        >
          ES
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
