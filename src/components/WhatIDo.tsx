import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Code, Server, Cpu, Sparkles, ArrowUpRight } from 'lucide-react';

interface OfferingProps {
  index: string;
  title: string;
  description: string;
  icon: ReactNode;
  technologies: string[];
  delay: number;
}

function OfferingCard({ index, title, description, icon, technologies, delay }: OfferingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glow-card glass p-8 rounded-3xl border border-white/5 hover:border-purple-500/20 relative group transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/5 blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
      
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
            {icon}
          </div>
          <span className="font-mono text-xs text-zinc-600 group-hover:text-purple-400 transition-colors font-bold tracking-wider">
            {index}
          </span>
        </div>
        
        <h3 className="font-display font-bold text-white text-xl mb-3 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        
        <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light mb-6">
          {description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {technologies.map((tech, idx) => (
            <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-zinc-400">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatIDo() {
  return (
    <section 
      id="services" 
      className="relative py-28 px-4 bg-[#050505] grid-overlay overflow-hidden"
    >
      {/* Dynamic Background Spotlights */}
      <div className="absolute top-[30%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-950/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-[1px] bg-purple-500" />
            <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">SOLUTIONS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
          >
            What I Do
          </motion.h2>
          <p className="text-zinc-500 text-xs font-mono mt-3 uppercase tracking-wider">
            Bridging High-End Software Engineering with Stable IT Infrastructure
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <OfferingCard
            index="01"
            title="Web Development"
            description="Crafting high-performance websites, dynamic web applications, and modern digital platforms. I design scalable, responsive frontends and backends with state-of-the-art tech stacks."
            icon={<Code className="w-5 h-5" />}
            technologies={['React', 'Next.js', 'Node.js', 'Express', 'PHP', 'TypeScript']}
            delay={0.1}
          />

          <OfferingCard
            index="02"
            title="Systems Management"
            description="Keeping systems stable, secure, and ready for real work with dependable server and network support."
            icon={<Server className="w-5 h-5" />}
            technologies={['Server', 'Network', 'Support', 'Operations']}
            delay={0.2}
          />

          <OfferingCard
            index="03"
            title="Network Administration & Support"
            description="Configuring robust local area networks (LAN/WAN), maintaining network hardware, resolving hardware issues, and providing continuous user-level technical support."
            icon={<Cpu className="w-5 h-5" />}
            technologies={['Network Admin', 'Hardware Repair', 'User Support', 'Win Server']}
            delay={0.3}
          />

          <OfferingCard
            index="04"
            title="Digital Transformation"
            description="Helping businesses and educational institutions digitize operations, optimize manual workflows, and adapt reliable software systems to secure productivity."
            icon={<Sparkles className="w-5 h-5" />}
            technologies={['Workflows', 'Consultation', 'Automation', 'Data Systems']}
            delay={0.4}
          />

        </div>

      </div>
    </section>
  );
}
