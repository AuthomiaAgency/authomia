import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl bg-[#0A0A0A] border border-white/10 p-8 md:p-12 z-[70] max-h-[85vh] overflow-y-auto rounded-sm shadow-2xl scrollbar-none"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5 sticky top-0 bg-[#0A0A0A] z-10 pt-2">
              <h2 className="text-xl md:text-2xl font-mono text-white tracking-tight">{title}</h2>
              <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-white/80 font-light leading-relaxed space-y-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;