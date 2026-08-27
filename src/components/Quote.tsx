import { motion } from 'motion/react';
import { Quote as QuoteIcon } from 'lucide-react';

export default function Quote() {
  return (
    <section className="relative py-32 px-4 bg-[#080808] grid-overlay border-y border-white/5 overflow-hidden flex items-center justify-center">
      {/* Background radial spotlight */}
      <div className="absolute w-[45vw] h-[45vw] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />

      {/* Giant watermarked Quotes watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02]">
        <QuoteIcon className="w-[400px] h-[400px] text-white" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Animated small quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex p-4 rounded-full bg-white/[0.02] border border-white/5 text-purple-400 mb-8"
        >
          <QuoteIcon className="w-6 h-6" />
        </motion.div>

        {/* Central Quote Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-normal text-reveal max-w-3xl mx-auto"
        >
          "Technology is at its best when it is simple, reliable, and impactful — creating solutions that solve real-world problems and empower people through digital transformation."
        </motion.p>

        {/* Signature Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest"
        >
          <span className="w-6 h-[1px] bg-zinc-700" />
          <span className="roshan-name">ROSHAN SAH</span>
          <span className="w-6 h-[1px] bg-zinc-700" />
        </motion.div>
      </div>
    </section>
  );
}
