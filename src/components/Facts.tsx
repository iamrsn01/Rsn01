import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { MapPin, GraduationCap, Briefcase, Globe, BookOpen, Sparkles } from 'lucide-react';

interface Fact {
  id: number;
  icon: ReactNode;
  text: string;
  delay: number;
  yOffset: number;
  glowColor: string;
}

const facts: Fact[] = [
  {
    id: 1,
    icon: <MapPin className="w-5 h-5 text-purple-400" />,
    text: 'Based in Simara, Nepal',
    delay: 0,
    yOffset: -8,
    glowColor: 'rgba(124, 58, 237, 0.15)',
  },
  {
    id: 2,
    icon: <GraduationCap className="w-5 h-5 text-fuchsia-400" />,
    text: 'Tribhuvan University Alumnus',
    delay: 0.5,
    yOffset: -12,
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 3,
    icon: <Briefcase className="w-5 h-5 text-purple-300" />,
    text: 'Full Stack Web Developer',
    delay: 0.2,
    yOffset: -6,
    glowColor: 'rgba(192, 132, 252, 0.15)',
  },
  {
    id: 4,
    icon: <Globe className="w-5 h-5 text-purple-400" />,
    text: 'Freelance Web Developer & IT Support',
    delay: 0.7,
    yOffset: -10,
    glowColor: 'rgba(124, 58, 237, 0.15)',
  },
  {
    id: 5,
    icon: <BookOpen className="w-5 h-5 text-fuchsia-400" />,
    text: 'Reliable Systems Architect',
    delay: 0.4,
    yOffset: -8,
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 6,
    icon: <Sparkles className="w-5 h-5 text-purple-300" />,
    text: 'Passionate about Digital Creation',
    delay: 0.9,
    yOffset: -14,
    glowColor: 'rgba(192, 132, 252, 0.15)',
  },
];

export default function Facts() {
  return (
    <section className="relative py-28 px-4 bg-[#050505] grid-overlay overflow-hidden">
      {/* Dynamic spot glows */}
      <div className="absolute top-[30%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest text-purple-400 uppercase">FAST DATA</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
          >
            Quick Facts
          </motion.h2>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: fact.id * 0.1 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, fact.yOffset, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6 + fact.id,
                  ease: 'easeInOut',
                  delay: fact.delay,
                }}
                className="glow-card glass p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-purple-500/20 flex flex-col justify-between items-start gap-6 h-full transition-all duration-300 relative group clickable"
              >
                {/* Micro Spotlight corner glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(150px circle at 0px 0px, ${fact.glowColor}, transparent)`,
                  }}
                />

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
                  {fact.icon}
                </div>

                <p className="font-display font-medium text-white text-base md:text-lg leading-snug group-hover:text-purple-300 transition-colors">
                  {fact.text}
                </p>

                <div className="w-full flex justify-between items-center font-mono text-[9px] text-zinc-600 pt-4 border-t border-white/5">
                  <span>METADATA_FACT_0{fact.id}</span>
                  <span className="text-purple-500/50 group-hover:text-purple-400 transition-colors">verified</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
