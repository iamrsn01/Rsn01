import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export default function LetsTalkPage() {
  return (
    <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-purple-300"
        >
          <Send className="h-5 w-5" />
          <span className="text-xs font-mono uppercase tracking-[0.3em]">Let&apos;s talk</span>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Open for thoughtful collaborations and clear product work.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              If you need a calm, modern interface or a polished web experience, I&apos;d be glad to connect.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#080808] p-6 text-sm text-zinc-300">
            <p className="font-medium text-white">Reach out</p>
            <p className="mt-3 leading-7">Email: iamrsn01@gmail.com</p>
            <p className="mt-2 leading-7">Location: Simara-2, Bara (Nepal)</p>
            <a href="mailto:iamrsn01@gmail.com" className="mt-6 inline-flex rounded-full border border-purple-500/30 px-4 py-2 text-purple-300 transition hover:bg-purple-500/10">
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
