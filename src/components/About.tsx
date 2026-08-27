import { motion } from 'motion/react';
import { Laptop, BookOpen, Target, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section 
      id="about" 
      className="relative py-28 px-4 bg-[#080808] grid-overlay border-y border-white/5 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute right-[-10%] top-[20%] w-[35vw] h-[35vw] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

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
            <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">INCEPTION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight"
          >
            About Me
          </motion.h2>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Custom Premium Abstract Vector Visualizer */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden glass border border-white/10 flex items-center justify-center p-8 shadow-2xl shadow-purple-900/10 group clickable"
            >
              {/* Outer rotating glowing ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-dashed border-purple-500/20 group-hover:border-purple-500/50 transition-colors"
              />

              {/* Inner fast counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute inset-10 rounded-full border border-purple-400/10 group-hover:border-fuchsia-400/40 transition-colors"
              />

              {/* Floating ambient vector shapes inside */}
              <div className="absolute inset-0 bg-radial from-purple-600/10 via-transparent to-transparent opacity-60" />

              {/* Center Abstract Monogram / Graphic */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#C084FC] flex items-center justify-center shadow-xl shadow-purple-500/20"
                >
                  <Laptop className="w-9 h-9 text-white group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                
                <h3 className="mt-6 font-display font-black tracking-tighter text-white uppercase text-lg roshan-name">Roshan <span className="text-[#7C3AED]">Sah</span></h3>
                <p className="text-[10px] text-purple-300 font-mono tracking-widest mt-1">SIMARA-2, BARA (NEPAL)</p>

                {/* Micro stats inside graphic */}
                <div className="mt-4 flex gap-4 text-[9px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> IT</span>
                  <span className="flex items-center gap-1"><Target className="w-3 h-3" /> DEV</span>
                </div>
              </div>

              {/* Hover highlight corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          {/* Column 2: Elegant Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed"
            >
              <p className="font-medium text-white text-lg">
                I am <span className="roshan-name font-semibold">Roshan Sah</span>, a Full Stack Web Developer and IT Support Specialist focused on clean code, dependable systems, and fast delivery.
              </p>

              <p>
                I build dynamic web applications, modern responsive user interfaces, and provide comprehensive IT support and troubleshooting.
              </p>

              <p>
                Working as an independent freelancer, my solutions are crafted around clarity, performance, and practical reliability.
              </p>
            </motion.div>

            {/* Quote badge block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-5 rounded-2xl glass-accent border border-purple-500/20 relative"
            >
              <div className="absolute top-3 right-4">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-purple-200 text-xs sm:text-sm italic leading-relaxed">
                "I believe technology should be simple, reliable, and impactful. Whether developing scalable web applications or managing IT infrastructure, I strive to deliver high-quality solutions with clean design and efficient code."
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
