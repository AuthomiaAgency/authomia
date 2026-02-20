import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Content } from '../types';
import { Zap, Play, AlertCircle, Clock, ToggleRight, ToggleLeft } from 'lucide-react';

interface AppExperienceProps {
  content: Content['appExperience'];
}

interface Project {
  id: string;
  name: string;
  executions: number;
  failed: number;
  time: number; // in seconds
  isActive: boolean;
}

const INITIAL_PROJECTS: Project[] = [
  { id: 'p1', name: 'Neuro-Lead Scoring Protocol', executions: 2450, failed: 2, time: 0.45, isActive: false },
  { id: 'p2', name: 'Auto-CRM Synapse Sync', executions: 1820, failed: 0, time: 0.22, isActive: false },
  { id: 'p3', name: 'Sentiment Analysis Core', executions: 950, failed: 5, time: 1.15, isActive: false },
  { id: 'p4', name: 'Fiscal Bot Orchestrator', executions: 310, failed: 0, time: 0.85, isActive: false },
  { id: 'p5', name: 'Omni-Channel Response Grid', executions: 5600, failed: 12, time: 0.15, isActive: false },
];

// Helper for counting numbers fluidly
const AnimatedNumber = ({ value, toFixed = 0, suffix = '' }: { value: number, toFixed?: number, suffix?: string }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => current.toFixed(toFixed) + suffix);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

const AppExperience: React.FC<AppExperienceProps> = ({ content }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [metrics, setMetrics] = useState({ executions: 0, failed: 0, failureRate: 0, avgTime: 0 });

  useEffect(() => {
    // Calculate totals
    const active = projects.filter(p => p.isActive);
    const totalExec = active.reduce((acc, curr) => acc + curr.executions, 0);
    const totalFailed = active.reduce((acc, curr) => acc + curr.failed, 0);
    // Base latency calculation simulating load
    const avgTime = active.length > 0 ? active.reduce((acc, curr) => acc + curr.time, 0) / active.length : 0;
    
    setMetrics({
      executions: totalExec,
      failed: totalFailed,
      failureRate: totalExec > 0 ? (totalFailed / totalExec) * 100 : 0,
      avgTime: avgTime
    });

  }, [projects]);

  const toggleProject = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-[#050505] perspective-1000">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-authomia-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Intro Text */}
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center text-xl md:text-2xl font-light text-white/80 max-w-2xl mb-16"
        >
          {content.text}
        </motion.p>

        {/* 3D INTERACTIVE DASHBOARD */}
        <motion.div 
           initial={{ rotateX: 5, opacity: 0 }}
           whileInView={{ rotateX: 0, opacity: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative w-full border border-white/10 rounded-lg bg-[#08090B]/80 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col depth-card"
        >
          
          {/* Top Bar: Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 divide-x divide-white/5 bg-[#050505]/50">
             {/* Prod Executions */}
             <div className="p-6">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Play className="w-3 h-3 text-authomia-blue" /> Prod. Executions
                </div>
                <div className="text-3xl font-mono text-white">
                   <AnimatedNumber value={metrics.executions} />
                </div>
             </div>

             {/* Failed Executions */}
             <div className="p-6">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-authomia-red" /> Failed
                </div>
                <div className="text-3xl font-mono text-white">
                   <AnimatedNumber value={metrics.failed} />
                </div>
             </div>

             {/* Failure Rate */}
             <div className="p-6">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-yellow-500" /> Failure Rate
                </div>
                <div className="text-3xl font-mono text-white">
                   <AnimatedNumber value={metrics.failureRate} toFixed={3} suffix="%" />
                </div>
             </div>

             {/* Run Time */}
             <div className="p-6">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-green-500" /> Avg. Time
                </div>
                <div className="text-3xl font-mono text-white">
                   <AnimatedNumber value={metrics.avgTime} toFixed={2} suffix="s" />
                </div>
             </div>
          </div>

          {/* Project List (Control Panel) */}
          <div className="p-0 bg-[#060606]">
             <div className="flex items-center px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Active Neural Workflows</div>
             </div>
             
             {projects.map((project, i) => (
                <div 
                   key={project.id} 
                   className={`
                      relative flex items-center justify-between px-6 py-5 border-b border-white/5 transition-all duration-300
                      ${project.isActive 
                          ? 'bg-authomia-blue/[0.05] z-10 shadow-[0_0_15px_rgba(255,255,255,0.3),inset_0_0_20px_rgba(255,255,255,0.05)] border-l-4 border-l-white border-y border-y-white/20' 
                          : 'hover:bg-white/[0.02] border-l-4 border-l-transparent'}
                   `}
                >
                   {/* "Neon" White Outline Effect Overlay for active state */}
                   {project.isActive && (
                      <div className="absolute inset-0 border border-white/40 pointer-events-none opacity-50 shadow-[0_0_10px_white]" />
                   )}

                   <div className="flex items-center gap-4 relative z-10">
                      {/* Status Indicator */}
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${project.isActive ? 'bg-white shadow-[0_0_10px_white,0_0_20px_#0A109E]' : 'bg-white/10'}`} />
                      
                      <div className="flex flex-col">
                         <span className={`font-mono text-sm transition-colors ${project.isActive ? 'text-white font-bold tracking-wide text-shadow' : 'text-white/50'}`}>
                            {project.name}
                         </span>
                         <span className="text-[10px] text-white/20 font-mono">
                            ID: {project.id.toUpperCase()} // Latency: {project.time}s
                         </span>
                      </div>
                   </div>

                   {/* Toggle Switch */}
                   <button 
                      onClick={() => toggleProject(project.id)}
                      className={`relative z-10 text-2xl transition-all duration-300 ${project.isActive ? 'text-white scale-110 drop-shadow-[0_0_8px_white]' : 'text-white/20 hover:text-white/40'}`}
                   >
                      {project.isActive ? <ToggleRight /> : <ToggleLeft />}
                   </button>
                </div>
             ))}

             {/* Empty State / Hint */}
             <div className="p-6 text-center">
                <p className="text-[10px] font-mono text-white/30 italic tracking-wider">
                   "Activating protocols simulates load on the Authomia infrastructure."
                </p>
             </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default AppExperience;