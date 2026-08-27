import { ArrowUp, Github, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-16 px-4 overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[15vw] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Signoff */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
            <h3 className="font-display font-black text-xl tracking-tighter text-white uppercase">rsn<span className="text-[#7C3AED]">01</span></h3>
          </div>
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
            Full Stack Web Developer | IT Support
          </p>
        </div>

        {/* Social Icons & Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/iamrsn01"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 text-zinc-400 hover:text-white transition-all duration-300"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/rsn01"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 text-zinc-400 hover:text-white transition-all duration-300"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/Rosan4eva"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 text-zinc-400 hover:text-white transition-all duration-300"
            title="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>

        {/* Back to Top */}
        <div>
          <button
            onClick={scrollToTop}
            className="clickable group p-3.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-purple-500/30 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
