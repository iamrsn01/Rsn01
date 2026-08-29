import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MessageCircle, Copy, Check, Sparkles, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface ContactCTAProps {
  onNavigateToLetsTalk: () => void;
}

export default function Contact({ onNavigateToLetsTalk }: ContactCTAProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iamrsn01@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="contact" 
      className="relative py-28 px-4 bg-[#050505] grid-overlay overflow-hidden"
    >
      {/* Background ambient radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-purple-900/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[30vw] h-[30vw] rounded-full bg-fuchsia-900/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        
        {/* Main CTA Card Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-8 sm:p-14 glass border border-purple-500/20 shadow-2xl overflow-hidden text-center md:text-left group"
        >
          {/* Subtle gradient light sweep inside the card */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-900/15 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>LET'S BUILD TOGETHER</span>
              </div>

              {/* Headline */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
                Have a project or idea in mind?{' '}
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Let's make it happen.
                </span>
              </h2>

              {/* Description */}
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                Whether you need modern web applications, IT infrastructure solutions, academic collaboration, or just want to discuss possibilities — I'm always open to new connections.
              </p>

              {/* Availability & Response Highlights */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-zinc-300 font-mono">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Projects</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Response &lt; 24h</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>Nepal (Remote Friendly)</span>
                </div>
              </div>

            </div>

            {/* Right Action Area */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-4 w-full">
              
              {/* Primary Call to Action Button */}
              <button
                type="button"
                onClick={onNavigateToLetsTalk}
                className="clickable group relative w-full sm:w-auto px-8 py-4.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-2xl font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>LET'S TALK & COLLABORATE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Divider text */}
              <div className="w-full flex items-center justify-center gap-3 py-1">
                <span className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">or reach directly</span>
                <span className="h-[1px] flex-1 bg-white/10" />
              </div>

              {/* Direct Fast Contact Pill Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                
                {/* 1-Click Copy Email */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="clickable p-3 rounded-xl bg-white/[0.03] hover:bg-purple-500/15 border border-white/10 hover:border-purple-500/30 flex items-center justify-between text-left transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase">EMAIL ME</span>
                      <span className="block text-xs font-medium text-white truncate">iamrsn01@gmail.com</span>
                    </div>
                  </div>
                  <div className="p-1 rounded-md bg-white/[0.05] text-zinc-400 group-hover:text-purple-300">
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Direct WhatsApp Chat */}
                <a
                  href="https://wa.me/9779801104032"
                  target="_blank"
                  rel="noreferrer"
                  title="Chat directly on WhatsApp"
                  className="clickable p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 flex items-center justify-between text-left transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block text-[9px] font-mono text-zinc-500 uppercase">WHATSAPP</span>
                      <span className="block text-xs font-medium text-white">+977 9801104032</span>
                    </div>
                  </div>
                  <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
