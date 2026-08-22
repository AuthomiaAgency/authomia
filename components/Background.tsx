import React, { useEffect, useRef } from 'react';

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number, alpha: number}> = [];
    const particleCount = 75;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.003;
      
      // 1. Base Dark Obsidian Section
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#06080e');
      baseGrad.addColorStop(0.5, '#040508');
      baseGrad.addColorStop(1, '#020306');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Diagonal Dynamic Split / Silver-White Architectural Sector
      // The cut runs diagonally across the canvas
      const slope = 0.65; // Diagonal angle
      const waveShift = Math.sin(time) * 15;
      const startX = width * 0.45 + waveShift;
      const endX = startX - height * slope;

      // Draw the diagonal light/off-white zone on top-right / diagonal quadrant
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(endX + width * 0.2, height);
      ctx.closePath();

      // Soft luminous off-white / light platinum gradient
      const lightGrad = ctx.createLinearGradient(startX, 0, width, height);
      lightGrad.addColorStop(0, 'rgba(240, 244, 248, 0.18)');
      lightGrad.addColorStop(0.35, 'rgba(235, 240, 246, 0.12)');
      lightGrad.addColorStop(0.7, 'rgba(220, 230, 242, 0.08)');
      lightGrad.addColorStop(1, 'rgba(200, 215, 230, 0.04)');
      ctx.fillStyle = lightGrad;
      ctx.fill();
      ctx.restore();

      // 3. Crisp Diagonal Laser Edge Cut
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startX, 0);
      ctx.lineTo(endX + width * 0.2, height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 8;
      ctx.stroke();

      // Secondary ambient laser line parallel
      ctx.beginPath();
      ctx.moveTo(startX + 24, 0);
      ctx.lineTo(endX + width * 0.2 + 24, height);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 0;
      ctx.stroke();
      ctx.restore();

      // Helper function to test if a point is inside the light diagonal region
      const isInsideLightZone = (px: number, py: number) => {
        const cutXAtY = startX - py * slope + (width * 0.2 * (py / height));
        return px >= cutXAtY;
      };

      // 4. Floating Particles with Adaptive Dual-Tone Contrast
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const inLight = isInsideLightZone(p.x, p.y);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (inLight) {
          // Dark high-contrast particle in the light diagonal sector
          ctx.fillStyle = 'rgba(240, 248, 255, 0.95)';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = 6;
          ctx.globalAlpha = p.alpha * 0.85;
        } else {
          // Luminous celestial particle in dark sector
          ctx.fillStyle = 'rgba(186, 230, 253, 0.9)';
          ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
          ctx.shadowBlur = 4;
          ctx.globalAlpha = p.alpha * 0.6;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Dynamic Connecting Lines with adaptive contrast
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const inLight2 = isInsideLightZone((p.x + p2.x) / 2, (p.y + p2.y) / 2);
            ctx.beginPath();
            if (inLight2) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 * (1 - dist / 130)})`;
              ctx.lineWidth = 0.8;
            } else {
              ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 130)})`;
              ctx.lineWidth = 0.5;
            }
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    let resizeFrameId: number | null = null;
    const handleResize = () => {
      if (resizeFrameId !== null) {
        cancelAnimationFrame(resizeFrameId);
      }
      resizeFrameId = requestAnimationFrame(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        resizeFrameId = null;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      if (resizeFrameId !== null) {
        cancelAnimationFrame(resizeFrameId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-noise pointer-events-none fixed inset-0 z-0 opacity-30" />
      {/* Precision ambient light glow behind diagonal division */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-sky-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      </div>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none"
      />
    </>
  );
};

export default Background;
