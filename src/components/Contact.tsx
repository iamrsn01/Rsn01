import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Facebook, Twitter, Github, Send, CheckCircle2, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iamrsn01@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);
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
          _subject: `New Message from Homepage Reach Out: ${formData.name}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true || (data.message && data.message.toLowerCase().includes('activation')) || response.ok) {
        setShowSuccessToast(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowSuccessToast(false), 6000);
      } else {
        throw new Error(data.message || 'Submission failed.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Fallback
      window.location.href = `mailto:iamrsn01@gmail.com?subject=${encodeURIComponent('Inquiry from ' + formData.name)}&body=${encodeURIComponent(formData.message)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-28 px-4 bg-[#050505] grid-overlay overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-fuchsia-900/5 blur-[120px] pointer-events-none" />

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
            <span className="font-mono text-[10px] tracking-widest text-purple-400 uppercase">REACH OUT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white"
          >
            Let's build something <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">meaningful</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-zinc-400 text-sm max-w-lg font-light"
          >
            Have a project in mind or need assistance with web infrastructure and IT? Send a message and let's discuss possibilities.
          </motion.p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Direct Contact Details & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              
              {/* Email Card with 1-Click Copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glow-card glass p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-purple-400 group-hover:bg-purple-500/10 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">DIRECT EMAIL</span>
                    <a href="mailto:iamrsn01@gmail.com" className="block text-white hover:text-purple-300 font-medium text-sm sm:text-base transition-colors mt-0.5">
                      iamrsn01@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-purple-500/20 text-zinc-400 hover:text-purple-300 transition-colors clickable"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glow-card glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-purple-400 group-hover:bg-purple-500/10 transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">BASE LOCATION</span>
                  <span className="block text-white font-medium text-sm sm:text-base mt-0.5">Simara-2, Bara (Nepal)</span>
                </div>
              </motion.div>

            </div>

            {/* Social Grid */}
            <div className="space-y-4 pt-4">
              <span className="block font-mono text-[9px] tracking-widest text-zinc-500 uppercase">SOCIAL & CODE CHANNELS</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* GitHub Card */}
                <motion.a
                  href="https://github.com/iamrsn01"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glow-card glass p-4 rounded-xl border border-white/5 flex items-center justify-between group clickable hover:border-purple-500/25"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">GitHub</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 group-hover:text-purple-400">/iamrsn01</span>
                </motion.a>

                {/* Facebook Card */}
                <motion.a
                  href="https://www.facebook.com/rsn01"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="glow-card glass p-4 rounded-xl border border-white/5 flex items-center justify-between group clickable hover:border-purple-500/25"
                >
                  <div className="flex items-center gap-2.5">
                    <Facebook className="w-4 h-4 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">Facebook</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 group-hover:text-purple-400">/rsn01</span>
                </motion.a>

                {/* Twitter / X Card */}
                <motion.a
                  href="https://x.com/Rosan4eva"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glow-card glass p-4 rounded-xl border border-white/5 flex items-center justify-between group clickable hover:border-purple-500/25"
                >
                  <div className="flex items-center gap-2.5">
                    <Twitter className="w-4 h-4 text-zinc-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">X</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 group-hover:text-purple-400">@Rosan4eva</span>
                </motion.a>

              </div>
            </div>
          </div>

          {/* Column 2: Interactive Glass Contact Form */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-8 sm:p-10 rounded-3xl border border-white/5 space-y-6 relative"
            >
              {/* Field: Full Name */}
              <div className="space-y-2 relative">
                <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">01 / YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all"
                />
              </div>

              {/* Field: Email Address */}
              <div className="space-y-2 relative">
                <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">02 / EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all"
                />
              </div>

              {/* Field: Message */}
              <div className="space-y-2 relative">
                <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">03 / YOUR MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, idea, or academic opportunity..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="clickable group w-full relative py-4 bg-white hover:bg-zinc-100 disabled:bg-zinc-800 text-black rounded-xl font-display font-bold text-xs tracking-widest uppercase overflow-hidden transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-zinc-400 border-t-black animate-spin" />
                    <span>DISPATCHING...</span>
                  </span>
                ) : (
                  <>
                    <span>DISPATCH MESSAGE</span>
                    <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </motion.form>
          </div>

        </div>

      </div>

      {/* Success Notification Toast overlay */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 glass border border-purple-500/30 p-5 rounded-2xl flex items-start gap-4 shadow-2xl max-w-sm"
          >
            <div className="p-1 rounded-lg bg-purple-500/10 text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-sm">Message Dispatched</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Thank you! Your communication payload has been securely routed. Roshan Sah will respond shortly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
