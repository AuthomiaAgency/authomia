import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number; // ms per tick
  maxScramblesPerChar?: number;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  characters?: string;
  animateOn?: 'view' | 'hover' | 'mount';
  revealDirection?: 'start' | 'end' | 'center';
  sequentialDelay?: number; // delay between starting consecutive characters
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#$&%*+=-/<>[]{}';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 35,
  maxScramblesPerChar = 6,
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-white/40 font-mono',
  characters = DEFAULT_CHARS,
  animateOn = 'view',
  revealDirection = 'start',
  sequentialDelay = 25
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isDecrypted, setIsDecrypted] = useState<boolean>(true);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const hasTriggeredRef = useRef<boolean>(false);

  const startScramble = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsDecrypted(false);

    const length = text.length;
    // Track current step for each character
    const charStates = text.split('').map((char, index) => {
      // Calculate when this character should start decrypting based on direction
      let startOffset = 0;
      if (revealDirection === 'start') {
        startOffset = index * sequentialDelay;
      } else if (revealDirection === 'end') {
        startOffset = (length - 1 - index) * sequentialDelay;
      } else {
        const center = length / 2;
        startOffset = Math.abs(index - center) * sequentialDelay * 1.4;
      }

      return {
        char,
        isSpace: char === ' ',
        startAt: startOffset,
        scramblesCount: 0,
        resolved: char === ' '
      };
    });

    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      let allResolved = true;

      const newTextArray = charStates.map((state) => {
        if (state.isSpace) return ' ';
        if (state.resolved) return state.char;

        if (elapsed < state.startAt) {
          // Not yet starting to decrypt: show initial scramble or space
          allResolved = false;
          return characters[Math.floor(Math.random() * characters.length)];
        }

        // It is currently scrambling
        state.scramblesCount += 1;
        if (state.scramblesCount >= maxScramblesPerChar) {
          state.resolved = true;
          return state.char;
        } else {
          allResolved = false;
          return characters[Math.floor(Math.random() * characters.length)];
        }
      });

      setDisplayText(newTextArray.join(''));

      if (allResolved) {
        clearInterval(interval);
        setDisplayText(text);
        setIsDecrypted(true);
        isAnimatingRef.current = false;
      }
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text);
    hasTriggeredRef.current = false;

    if (animateOn === 'mount') {
      startScramble();
      return;
    }

    if (animateOn === 'view' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              // slight delay for fluid natural viewport entrance
              setTimeout(() => {
                startScramble();
              }, 60);
            }
          });
        },
        { 
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [text, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || !isAnimatingRef.current) {
      startScramble();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block ${parentClassName}`}
    >
      <span className={`${className} ${!isDecrypted ? encryptedClassName : ''} transition-colors duration-200`}>
        {displayText}
      </span>
    </span>
  );
};
