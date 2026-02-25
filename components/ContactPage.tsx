import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { LOGO_ICON_URL } from '../constants';

interface ContactPageProps {
  content: Content['contact'];
}

const ContactPage: React.FC<ContactPageProps> = ({ content }) => {
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-authomia-blue selection:text-white flex flex-col md:flex-row">
      {/* Navbar (Simplified for Contact Page) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between pointer-events-auto">
          <a href="/" className="flex items-center gap-3 group">
            <img src={LOGO_ICON_URL || "https://imgur.com/R48vhCC.png"} className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" alt="Authomia" />
            <span className="font-mono text-sm tracking-widest font-bold hidden sm:block">AUTHOMIA</span>
          </a>
          <a href="/" className="text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <ArrowLeft size={14} /> Volver al Inicio
          </a>
        </div>
      </nav>

      {/* Left: Info */}
      <div className="w-full md:w-1/3 p-12 flex flex-col justify-center relative z-20 bg-[#050505] border-r border-white/5 min-h-screen">
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            <img src={LOGO_ICON_URL} alt="Authomia" className="w-12 h-12 invert mb-8 opacity-80" />
            <h2 className="text-4xl font-light text-white mb-12">{content.title}</h2>

            <div className="space-y-10">
                <a href={`mailto:${content.email}`} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Mail className="w-5 h-5 text-authomia-blueLight" />
                    </div>
                    <div>
                        <span className="text-xs font-mono text-white/40 block mb-1">EMAIL</span>
                        <span className="text-lg text-white font-light group-hover:text-authomia-blueLight transition-colors">{content.email}</span>
                    </div>
                </a>
                <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center transition-colors">
                        <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="text-xs font-mono text-white/40 block mb-1">PHONE</span>
                        <span className="text-lg text-white font-light select-all">{content.phone}</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-authomia-redLight" />
                    </div>
                    <div>
                        <span className="text-xs font-mono text-white/40 block mb-1">{content.locationLabel}</span>
                        <span className="text-lg text-white font-light">{content.location}</span>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Right: IMAGE MAP */}
      <div className="w-full md:w-2/3 relative bg-[#020202] overflow-hidden flex items-center justify-center min-h-[50vh] md:min-h-screen">
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img 
                src="https://i.imgur.com/8INA5kg.png" 
                alt="Peru Map" 
                className="w-full max-h-[70vh] object-contain opacity-80 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-float"
                style={{ filter: "invert(1) grayscale(100%) brightness(150%)" }} 
            />
            <div className="absolute animate-float" style={{ top: '52%', left: '48%' }}>
                <div className="relative flex flex-col items-center group cursor-pointer perspective-1000">
                    <motion.div 
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                        whileHover={{ y: -10 }}
                        className="relative z-20 preserve-3d"
                    >
                        <div className="w-8 h-8 bg-authomia-red rounded-full flex items-center justify-center shadow-[0_0_20px_#B30A0A] border-2 border-white relative z-10">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div className="w-1 h-6 bg-white mx-auto -mt-1 shadow-lg" />
                        <div className="w-4 h-1 bg-black/50 blur-sm mx-auto rounded-full" />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#050505] border border-white/20 px-4 py-2 rounded-sm whitespace-nowrap shadow-xl"
                    >
                        <span className="text-xs font-mono font-bold text-white block">JAUJA, JUNÍN</span>
                        <span className="text-[9px] text-white/50 block tracking-widest">HQ CENTER</span>
                    </motion.div>
                    <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-32 h-32 border border-authomia-red/50 rounded-full animate-ping opacity-20 pointer-events-none" />
                    <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-64 h-64 border border-authomia-red/30 rounded-full animate-pulse opacity-10 pointer-events-none" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
