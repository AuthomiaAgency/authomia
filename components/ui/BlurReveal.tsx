import React from 'react';
import { motion } from 'framer-motion';

interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  blur?: string;
  yOffset?: number;
  className?: string;
  staggerChildren?: number;
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  blur = '8px',
  yOffset = 14,
  className = '',
  staggerChildren = 0
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blur})`,
        y: yOffset
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0
      }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface WordPullUpProps {
  words: string;
  delay?: number;
  className?: string;
  wrapperClassName?: string;
}

export const WordPullUp: React.FC<WordPullUpProps> = ({
  words,
  delay = 0,
  className = '',
  wrapperClassName = ''
}) => {
  const wordArray = words.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-20px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: delay
          }
        }
      }}
      className={`inline-flex flex-wrap gap-x-[0.28em] ${wrapperClassName}`}
    >
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              y: 14,
              opacity: 0,
              filter: 'blur(5px)'
            },
            show: {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1]
              }
            }
          }}
          className={`inline-block ${className}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
