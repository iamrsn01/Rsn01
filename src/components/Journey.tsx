import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

interface JourneyItem {
  school: string;
  degree: string;
  description: string;
  period: string;
  icon: ReactNode;
}

const journeyItems: JourneyItem[] = [
  {
    school: 'Tribhuvan University',
    degree: "Bachelor's Degree",
    description: 'Currently pursuing higher education with a strong commitment to academic excellence, intellectual curiosity, and continuous personal development while preparing for advanced graduate studies.',
    period: 'PRESENT',
    icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
  },
  {
    school: 'Mount Everest Higher Secondary School',
    degree: 'Higher Secondary Education',
    description: 'Built a solid academic foundation while strengthening communication, teamwork, and leadership abilities.',
    period: 'HIGH SCHOOL',
    icon: <BookOpen className="w-5 h-5 text-purple-400" />,
  },
  {
    school: 'Shree Nepal National Higher Secondary School',
    degree: 'Secondary Education',
    description: 'Completed secondary education with dedication, discipline, and a passion for lifelong learning.',
    period: 'SECONDARY',
    icon: <Award className="w-5 h-5 text-purple-400" />,
  },
];

export default function Journey() {
  return (
    <section 
      id="journey" 
      className="relative py-28 px-4 bg-[#050505] grid-overlay overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute left-[10%] bottom-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <span className="font-mono text-[9px] tracking-widest text-purple-400 uppercase">ACADEMIA</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
          >
            Academic Journey
          </motion.h2>
        </div>

        {/* Timeline Path Container */}
        <div className="relative mt-12 pl-6 sm:pl-0">
          
          {/* Vertical central track line for large screen, left-snapped for small */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {journeyItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline node/dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-1.5 z-20">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="w-10 h-10 rounded-full bg-black border border-purple-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:border-purple-400 transition-colors cursor-pointer"
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Spacer for structural symmetry on large screen */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Journey Content Card */}
                  <div className="w-full sm:w-[45%] pl-8 sm:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="glow-card glass p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-purple-500/15 transition-all duration-300 relative group clickable hover:-translate-y-1"
                    >
                      <div className="absolute top-4 right-4 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                        <span className="font-mono text-[9px] tracking-widest text-purple-400 font-semibold">{item.period}</span>
                      </div>

                      <h3 className="font-display font-bold text-lg md:text-xl text-white group-hover:text-purple-300 transition-colors">
                        {item.school}
                      </h3>
                      
                      <p className="font-sans text-xs font-semibold text-purple-400 mt-1 uppercase tracking-wide">
                        {item.degree}
                      </p>
                      
                      <p className="font-sans text-sm text-zinc-400 mt-4 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Accent corner line indicator */}
                      <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} w-1/3 h-[2px] bg-gradient-to-r from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
