import { motion } from 'motion/react';
import { Award, Zap, Terminal, Heart, Code, Cpu, Server, Laptop } from 'lucide-react';

interface Skill {
  name: string;
  category: 'programming' | 'development' | 'itskills' | 'professional';
}

const skills: Skill[] = [
  // Programming
  { name: 'HTML', category: 'programming' },
  { name: 'CSS', category: 'programming' },
  { name: 'JavaScript', category: 'programming' },
  { name: 'TypeScript', category: 'programming' },
  { name: 'React', category: 'programming' },
  { name: 'Next.js', category: 'programming' },
  { name: 'Node.js', category: 'programming' },
  { name: 'Express.js', category: 'programming' },
  { name: 'PHP', category: 'programming' },
  { name: 'MySQL', category: 'programming' },
  { name: 'MongoDB', category: 'programming' },

  // Development
  { name: 'Tailwind CSS', category: 'development' },
  { name: 'Bootstrap', category: 'development' },
  { name: 'REST APIs', category: 'development' },
  { name: 'Git', category: 'development' },
  { name: 'GitHub', category: 'development' },
  { name: 'Responsive Design', category: 'development' },

  // IT Skills
  { name: 'Network Administration', category: 'itskills' },
  { name: 'Computer Hardware', category: 'itskills' },
  { name: 'System Troubleshooting', category: 'itskills' },
  { name: 'Software Installation', category: 'itskills' },
  { name: 'Windows Administration', category: 'itskills' },
  { name: 'Technical Support', category: 'itskills' },

  // Professional Skills
  { name: 'Leadership', category: 'professional' },
  { name: 'Communication', category: 'professional' },
  { name: 'Problem Solving', category: 'professional' },
  { name: 'Teamwork', category: 'professional' },
  { name: 'Time Management', category: 'professional' },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  return (
    <section 
      id="skills" 
      className="relative py-28 px-4 bg-[#080808] grid-overlay border-y border-white/5 overflow-hidden"
    >
      {/* Background spotlights */}
      <div className="absolute left-[15%] top-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-[1px] bg-purple-500" />
            <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">COMPETENCIES</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
            >
              Skills & Expertise
            </motion.h2>
            <p className="text-xs font-mono text-zinc-500 max-w-[280px]">
              A comprehensive suite of programming, system administration, and professional capabilities.
            </p>
          </div>
        </div>

        {/* Categorized Competency Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Visual Intro Panel (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 p-8 rounded-3xl glass border border-white/5 flex flex-col justify-between"
          >
            <div>
              <Zap className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="font-display font-bold text-white text-xl">The Skill Synthesis</h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed font-light">
                True engineering isn't just about writing code; it is about combining robust full stack software logic with stable IT systems and continuous learning.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
              <span className="text-[10px] font-mono text-purple-400">STATUS: PRODUCTION</span>
              <div className="flex h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Interactive Badges Panel (Right) */}
          <div className="lg:col-span-8">
            {/* Category Groups */}
            <div className="space-y-8">
              
              {/* Category: Programming */}
              <div>
                <span className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-4">01 / PROGRAMMING & CORE LANGUAGES</span>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {skills.filter(s => s.category === 'programming').map((skill, idx) => (
                    <motion.span
                      key={idx}
                      variants={itemVariants}
                      className="glow-badge cursor-default flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white"
                    >
                      <Code className="w-3.5 h-3.5 text-purple-400" />
                      <span>{skill.name}</span>
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Category: Development */}
              <div>
                <span className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-4">02 / DEVELOPMENT FRAMEWORKS & TOOLS</span>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {skills.filter(s => s.category === 'development').map((skill, idx) => (
                    <motion.span
                      key={idx}
                      variants={itemVariants}
                      className="glow-badge cursor-default flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white"
                    >
                      <Terminal className="w-3.5 h-3.5 text-fuchsia-400" />
                      <span>{skill.name}</span>
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Category: IT Skills */}
              <div>
                <span className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-4">03 / IT INFRASTRUCTURE & SYSTEMS</span>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {skills.filter(s => s.category === 'itskills').map((skill, idx) => (
                    <motion.span
                      key={idx}
                      variants={itemVariants}
                      className="glow-badge cursor-default flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white"
                    >
                      <Server className="w-3.5 h-3.5 text-purple-300" />
                      <span>{skill.name}</span>
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Category: Professional Skills */}
              <div>
                <span className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-4">04 / COLLABORATION & PROFESSIONAL CORE</span>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {skills.filter(s => s.category === 'professional').map((skill, idx) => (
                    <motion.span
                      key={idx}
                      variants={itemVariants}
                      className="glow-badge cursor-default flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white"
                    >
                      <Heart className="w-3.5 h-3.5 text-pink-400" />
                      <span>{skill.name}</span>
                    </motion.span>
                  ))}
                </motion.div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
