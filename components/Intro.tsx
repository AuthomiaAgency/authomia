import React from 'react';
import { motion } from 'framer-motion';
import { Content } from '../types';
import { Target, Layers, Cpu, Users } from 'lucide-react';

interface IntroProps {
  content: Content['intro'];
}

const icons = [Target, Layers, Cpu, Users];

const Intro: React.FC<IntroProps> = ({ content }) => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto" id="intro">
      <div className="text-center mb-20">
         <h2 className="text-sm font-mono text-authomia-blueLight tracking-[0.3em] uppercase mb-6">{content.title}</h2>
         <p className="text-2xl md:text-3xl font-light text-white mb-6 leading-relaxed max-w-4xl mx-auto">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {content.cards.map((card, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group p-8 border border-white/5 bg-[#08090B] hover:bg-white/[0.03] transition-colors rounded-sm flex flex-col items-center text-center"
            >
              <Icon className="w-8 h-8 text-authomia-blueLight mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1} />
              <h3 className="text-lg font-medium text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/40 font-light">{card.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Intro;
