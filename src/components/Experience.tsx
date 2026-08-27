import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Server, Laptop } from 'lucide-react';

interface ExpCardProps {
  index: string;
  role: string;
  company: string;
  period: string;
  description: string;
  icon: ReactNode;
  tags: string[];
}

function ExperienceCard({ index, role, company, period, description, icon, tags }: ExpCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="glow-card glass p-8 rounded-3xl border border-white/5 hover:border-purple-500/20 group relative overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1"
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 text-purple-400 transition-all duration-300">
              {icon}
            </div>
            <div>
              <span className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{period}</span>
              <h3 className="font-display font-bold text-lg text-white mt-1 group-hover:text-purple-300 transition-colors">
                {company}
              </h3>
            </div>
          </div>
          <span className="font-mono text-xs text-zinc-600 group-hover:text-purple-500 transition-colors font-bold">
            {index}
          </span>
        </div>

        <h4 className="font-display font-medium text-white text-base md:text-lg mb-4">
          {role}
        </h4>
        <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light mb-6">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-[10px] font-mono text-zinc-400 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-full group-hover:border-purple-500/15 group-hover:text-purple-300 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const skillGroups = [
  { title: 'Programming', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'PHP'] },
  { title: 'Development', items: ['Tailwind CSS', 'REST APIs', 'Git', 'GitHub', 'Responsive Design'] },
  { title: 'Systems', items: ['Network Administration', 'Computer Hardware', 'System Troubleshooting', 'Technical Support'] },
  { title: 'Professional', items: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'] },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 px-4 bg-[#080808] grid-overlay border-y border-white/5 overflow-hidden"
    >
      <div className="absolute left-[-5%] top-[10%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-900/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-8 h-[1px] bg-purple-500" />
            <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">PROFESSIONAL</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
            >
              Professional Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xs font-mono text-zinc-500 max-w-[240px]"
            >
              Combining rigorous creative leadership with structured technical execution.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <ExperienceCard
            index="01"
            role="Full Stack Web Developer"
            company="Independent / Freelance"
            period="ACTIVE"
            description="Developing high-performance modern web applications, responsive user interfaces, APIs, and custom client solutions."
            icon={<Laptop className="w-5 h-5" />}
            tags={['React', 'TypeScript', 'NodeJS', 'PHP', 'FullStack', 'TailwindCSS']}
          />

          <ExperienceCard
            index="02"
            role="IT Support Specialist"
            company="Technical Support & Systems"
            period="ACTIVE"
            description="Providing technical support, network configuration, system troubleshooting, hardware diagnostics, and IT maintenance."
            icon={<Server className="w-5 h-5" />}
            tags={['ITSupport', 'Networking', 'Troubleshooting', 'Hardware', 'Systems']}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 rounded-[2rem] border border-white/10 bg-[#060606] p-8"
        >
          <div className="mb-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400">Skillset</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-white">
              Built across product, systems, and delivery.
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">{group.title}</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
