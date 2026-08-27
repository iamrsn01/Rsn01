import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, FolderGit2, Calendar, Layout, Server, Database, Globe } from 'lucide-react';

interface ProjectProps {
  index: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  icon: ReactNode;
  delay: number;
}

function ProjectCard({ index, title, category, description, technologies, icon, delay }: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glow-card glass p-8 rounded-3xl border border-white/5 hover:border-purple-500/20 relative group transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
            {icon}
          </div>
          <span className="font-mono text-[10px] tracking-widest text-zinc-600 group-hover:text-purple-400 transition-colors font-bold">
            {index}
          </span>
        </div>

        <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-semibold block mb-2">
          {category}
        </span>

        <h3 className="font-display font-bold text-white text-xl mb-3 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>

        <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light mb-6">
          {description}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mb-6">
          {technologies.map((tech, idx) => (
            <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-zinc-400">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center text-xs font-mono text-zinc-500 group-hover:text-white transition-colors gap-1">
          <span>Explore Architecture</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section 
      id="projects" 
      className="relative py-28 px-4 bg-[#080808] grid-overlay border-y border-white/5 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute left-[20%] top-[30%] w-[35vw] h-[35vw] rounded-full bg-purple-900/5 blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-8 h-[1px] bg-purple-500" />
              <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">CASE STUDIES</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
            >
              Featured Projects
            </motion.h2>
          </div>
          <p className="text-zinc-500 text-xs font-mono max-w-[280px]">
            A showcase of modern web engineering, ERP systems, and educational technology integration.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <ProjectCard
            index="01"
            category="IT Solutions & Development"
            title="Little Flower Secondary School Website & ERP Integration"
            description="Designed and deployed a responsive portal with modern backend integrations and cloud ERP sync, enabling school operations, student records, and public communications to function smoothly."
            technologies={['PHP', 'MySQL', 'ERP API', 'Tailwind CSS', 'Admin Panel']}
            icon={<Globe className="w-5 h-5" />}
            delay={0.1}
          />

          <ProjectCard
            index="02"
            category="Full Stack Application"
            title="E-Commerce Web Application"
            description="Built a premium digital marketplace featuring comprehensive state management, robust database search, secure admin checkout dashboards, and smooth client-side interactions."
            technologies={['React', 'Node.js', 'Express', 'MongoDB', 'REST API']}
            icon={<FolderGit2 className="w-5 h-5" />}
            delay={0.2}
          />

          <ProjectCard
            index="03"
            category="IT Operations & Support"
            title="School Management ERP Configuration & Support"
            description="Established server hosting environment, configured database backup schedulers, customized role-based controls, and provided staff training for school ERP systems."
            technologies={['ERP System', 'Windows Server', 'Technical Support', 'Troubleshooting']}
            icon={<Server className="w-5 h-5" />}
            delay={0.3}
          />

          <ProjectCard
            index="04"
            category="Responsive Web Design"
            title="Freelance Client Websites & Digital Portfolios"
            description="Delivered high-converting landing pages, highly responsive portfolios, and custom web assets for various small businesses, organizations, and professional creators."
            technologies={['React', 'TypeScript', 'Next.js', 'Framer Motion', 'SEO']}
            icon={<Layout className="w-5 h-5" />}
            delay={0.4}
          />

        </div>

      </div>
    </section>
  );
}
