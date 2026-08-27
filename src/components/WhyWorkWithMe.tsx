import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, ShieldCheck, CheckCircle, Target, Zap, Shield, Handshake } from 'lucide-react';

interface ValueProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay: number;
}

function ValueBlock({ title, description, icon, delay }: ValueProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 rounded-3xl glass border border-white/5 hover:border-purple-500/15 transition-all duration-300 relative group flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/[0.02] rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/[0.05]" />
      
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
            {icon}
          </div>
          <h3 className="font-display font-bold text-white text-lg">
            {title}
          </h3>
        </div>
        
        <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyWorkWithMe() {
  return (
    <section 
      id="values" 
      className="relative py-28 px-4 bg-[#080808] grid-overlay border-y border-white/5 overflow-hidden"
    >
      {/* Background radial spotlight */}
      <div className="absolute right-[10%] top-[30%] w-[35vw] h-[35vw] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        
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
            <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">ETHOS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
          >
            Why Work With Me
          </motion.h2>
          <p className="text-zinc-500 text-xs font-mono mt-3 uppercase tracking-wider">
            Commitment to Craft, Stability, and High Performance
          </p>
        </div>

        {/* Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="lg:col-span-8"
          >
            <h3 className="font-display font-medium text-2xl md:text-3xl text-zinc-300 tracking-tight leading-normal">
              I build clean, reliable digital products and steady systems that help teams move faster.
            </h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-zinc-400 text-xs font-mono uppercase tracking-wider space-y-3.5"
          >
            <div className="flex items-center gap-2.5">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Goal-Oriented Development</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-fuchsia-400" />
              <span>Performance Optimization</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Reliable Systems Architecture</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Handshake className="w-4 h-4 text-fuchsia-400" />
              <span>Professional Integrity</span>
            </div>
          </motion.div>
        </div>

        {/* Values Block Sub-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <ValueBlock
            title="Simplicity & Impact"
            description="Developing user-friendly, elegant interfaces and straightforward architectures that make immediate sense to users while driving concrete results."
            icon={<Sparkles className="w-5 h-5" />}
            delay={0.15}
          />

          <ValueBlock
            title="Modern Architectures"
            description="Leveraging industry-standard tools like React, TypeScript, and Next.js to compile robust, responsive, and SEO-optimized web systems."
            icon={<Layers className="w-5 h-5" />}
            delay={0.25}
          />

          <ValueBlock
            title="Reliable Systems & Network"
            description="Structuring fail-safe network routing and system configurations that keep institutions or commercial ventures active 24/7."
            icon={<ShieldCheck className="w-5 h-5" />}
            delay={0.35}
          />

          <ValueBlock
            title="Professional Dedication"
            description="Striving to maintain thorough service support, transparent team coordination, and constant communication at every stage."
            icon={<CheckCircle className="w-5 h-5" />}
            delay={0.45}
          />

        </div>

      </div>
    </section>
  );
}
