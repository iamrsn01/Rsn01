import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Github, 
  Facebook, 
  Twitter, 
  Sparkles, 
  MessageSquare,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

const faqItems = [
  {
    q: 'What kind of projects do you take on?',
    a: 'I specialize in modern web applications, interactive frontend interfaces, IT infrastructure consulting, and student/educational utility tools.'
  },
  {
    q: 'What is your typical turnaround time?',
    a: 'Most initial consultations and inquiries receive a response within 24 hours. Project timelines depend on complexity and requirements.'
  },
  {
    q: 'Are you open to remote or international collaborations?',
    a: 'Yes, absolutely! I work seamlessly with remote teams, individuals, and organizations across various time zones.'
  }
];

export default function LetsTalkPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Web Design & Development',
    message: '',
    _gotcha: '' // Anti-spam honeypot
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iamrsn01@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    // Bot detection check
    if (formData._gotcha) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/iamrsn01@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `New Inquiry via Website: [${formData.subject}] from ${formData.name}`,
          category: formData.subject,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true || (data.message && data.message.toLowerCase().includes('activation')) || response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'Web Design & Development',
          message: '',
          _gotcha: ''
        });
      } else {
        throw new Error(data.message || 'Submission failed. Please try again or email directly.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Could not connect to the mail service. Please click below to send via your email app.');
    }
  };

  return (
    <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/4 w-[35vw] h-[35vw] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30vw] h-[30vw] rounded-full bg-fuchsia-900/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>LET&apos;S TALK &amp; COLLABORATE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white title-purple"
          >
            Have an idea, project, or opportunity?{' '}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Let&apos;s build together.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-light"
          >
            Whether you need modern web engineering, IT infrastructure consulting, educational collaboration, or just want to say hi — fill out the form below or reach out directly.
          </motion.p>
        </div>

        {/* 2-Column Main Content: Form (Left) & Direct Channels / FAQ (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: The Functional Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 glow-card glass p-6 sm:p-9 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-base">Direct Communication Channel</h3>
                  <p className="text-[11px] font-mono text-zinc-400">Payload routes straight to iamrsn01@gmail.com</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                ● Active
              </span>
            </div>

            {/* Success State View */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 text-center space-y-5 rounded-2xl bg-purple-950/20 border border-purple-500/30"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-bold text-2xl text-white">Message Delivered!</h4>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been sent directly to <strong>iamrsn01@gmail.com</strong>. I usually respond within 24 hours.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Honeypot field (hidden from real users to catch bots) */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                      Your Email Address <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                {/* Topic / Subject Select */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                    Inquiry Topic / Category
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/60 focus:bg-zinc-800 transition-all cursor-pointer"
                  >
                    <option value="Web Design & Development">💻 Web Design &amp; Development</option>
                    <option value="IT Systems & Infrastructure">🛠️ IT Systems &amp; Infrastructure</option>
                    <option value="Educational & Academic Collaboration">🎓 Educational &amp; Academic Collaboration</option>
                    <option value="Freelance / Consulting">🚀 Freelance / Consulting Project</option>
                    <option value="General Inquiry / Say Hi">👋 General Inquiry / Just saying Hi</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                    Your Message <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, question, or timeline..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p>{errorMessage}</p>
                      <a
                        href={`mailto:iamrsn01@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                        className="inline-flex items-center gap-1 text-purple-300 hover:text-white underline font-semibold mt-1"
                      >
                        Click to open in your default email client
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="clickable group w-full relative py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:opacity-60 text-white rounded-xl font-display font-bold text-xs tracking-widest uppercase overflow-hidden transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] cursor-pointer"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      <span>DISPATCHING MESSAGE...</span>
                    </span>
                  ) : (
                    <>
                      <span>DISPATCH MESSAGE</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] font-mono text-zinc-500">
                  🔒 Messages are encrypted in transit and delivered straight to Gmail inbox.
                </p>
              </form>
            )}
          </motion.div>

          {/* RIGHT COLUMN: Contact Details, Socials, and FAQ (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact & Credentials Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glow-card glass p-6 rounded-3xl border border-white/10 space-y-4"
            >
              <h3 className="font-display font-semibold text-white text-base">Direct Channels</h3>

              {/* Email with 1-click Copy */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">DIRECT EMAIL</span>
                    <a href="mailto:iamrsn01@gmail.com" className="block text-white hover:text-purple-300 font-medium text-sm transition-colors mt-0.5">
                      iamrsn01@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-purple-500/20 text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp Direct Chat Card */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">WHATSAPP DIRECT</span>
                    <a 
                      href="https://wa.me/9779801104032" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="block text-white hover:text-emerald-400 font-medium text-sm transition-colors mt-0.5"
                    >
                      +977 9801104032
                    </a>
                  </div>
                </div>

                <a
                  href="https://wa.me/9779801104032"
                  target="_blank"
                  rel="noreferrer"
                  title="Chat directly on WhatsApp"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <span>Chat</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 group hover:border-purple-500/30 transition-all">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">BASE LOCATION</span>
                  <span className="block text-white font-medium text-sm mt-0.5">Simara-2, Bara, Nepal</span>
                </div>
              </div>

              {/* Response Time Badge */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">TYPICAL RESPONSE</span>
                  <span className="block text-white font-medium text-sm mt-0.5">Within 24 Hours (NPT)</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-3">SOCIAL &amp; DEV PROFILES</span>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    href="https://github.com/iamrsn01"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-purple-500/15 border border-white/5 hover:border-purple-500/30 flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <Github className="w-4 h-4 text-zinc-400 group-hover:text-purple-300 transition-colors" />
                    <span className="text-[11px] font-medium text-zinc-300 group-hover:text-white">GitHub</span>
                  </a>

                  <a
                    href="https://www.facebook.com/rsn01"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-purple-500/15 border border-white/5 hover:border-purple-500/30 flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <Facebook className="w-4 h-4 text-zinc-400 group-hover:text-purple-300 transition-colors" />
                    <span className="text-[11px] font-medium text-zinc-300 group-hover:text-white">Facebook</span>
                  </a>

                  <a
                    href="https://x.com/Rosan4eva"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-purple-500/15 border border-white/5 hover:border-purple-500/30 flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <Twitter className="w-4 h-4 text-zinc-400 group-hover:text-purple-300 transition-colors" />
                    <span className="text-[11px] font-medium text-zinc-300 group-hover:text-white">X / Twitter</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Inquiries FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="glow-card glass p-6 rounded-3xl border border-white/10 space-y-3"
            >
              <div className="flex items-center gap-2 pb-1 border-b border-white/5">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <h4 className="font-display font-semibold text-white text-sm">Frequently Asked Questions</h4>
              </div>

              <div className="space-y-2 pt-1">
                {faqItems.map((item, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 pb-3 text-xs text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-2"
                          >
                            {item.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
