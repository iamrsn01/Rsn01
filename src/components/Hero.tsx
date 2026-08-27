import { useState, useRef, useEffect, ReactNode, MouseEvent, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, GraduationCap, Briefcase, Globe, ArrowRight, Sparkles, Download, X, Mail, Laptop, Rocket, Code, CheckCircle2 } from 'lucide-react';
import roshanImage from '../assets/images/rsn-bg.png';

const fullName = 'ROSHAN SAH';

interface QuickCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  delay: number;
}

function QuickCard({ icon, label, value, delay }: QuickCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glow-card glass hover:border-purple-500/20 group relative overflow-hidden p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-300 text-purple-400">
        {icon}
      </div>
      <div className="relative z-10">
        <span className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{label}</span>
        <span className="block mt-1 font-display font-medium text-white group-hover:text-purple-300 transition-colors duration-300 text-sm md:text-base">{value}</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High performance Canvas particle system mimicking 3D floating constellation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      particles.push({
        x: rx,
        y: ry,
        baseX: rx,
        baseY: ry,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 120 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle constellation connections
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Mouse avoidance/attraction
        if (mouse.x !== -1000) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= dx * force * 0.03;
            p.y -= dy * force * 0.03;
          }
        }

        // Boundary collision check
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        // Draw particle dot
        ctx.fillStyle = `rgba(192, 132, 252, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleContactClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = ((y / rect.height) - 0.5) * -16;

    setTiltStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  };

  const handleImageMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
  };

  const typedParts = typedName.includes(' ')
    ? typedName.split(' ', 2)
    : [typedName, ''];
  const typedSolid = typedParts[0];
  const typedTransparent = typedParts[1] || '';

  useEffect(() => {
    let currentIndex = 0;
    let typingTimer = 0;

    const typeNext = () => {
      currentIndex += 1;
      setTypedName(fullName.slice(0, currentIndex));

      if (currentIndex < fullName.length) {
        typingTimer = window.setTimeout(typeNext, 140 + Math.random() * 40);
      }
    };

    typingTimer = window.setTimeout(typeNext, 600);

    return () => {
      window.clearTimeout(typingTimer);
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-[#050505] grid-overlay pt-44 pb-20 px-4 overflow-hidden"
    >
      {/* Dynamic glow mesh background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-900/15 blur-[120px] animate-spotlight-1" />
        <div className="absolute bottom-[15%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-900/10 blur-[150px] animate-spotlight-2" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[25vw] h-[25vw] rounded-full bg-purple-600/5 blur-[90px] animate-spotlight-3" />
      </div>

      {/* GPU Accelerated particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-80" 
      />

      {/* Hero Content Grid */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Subtle top banner label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 mb-8 clickable"
        >
          <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1">
            TechByte <Sparkles className="w-3 h-3 text-purple-400 inline" />
          </span>
        </motion.div>

        {/* Big cinematic layout */}
        <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{opacity:0,x:-40}}
            animate={{opacity:1,x:0}}
            className="flex justify-center lg:justify-start order-1 lg:order-1"
          >
            <div className="relative animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute inset-0 rounded-3xl bg-purple-600/20 blur-3xl"></div>
              <img
                src={roshanImage}
                alt="Roshan Sah"
                className="relative w-[280px] sm:w-[360px] max-w-full blob-image premium-image border border-white/10 object-cover transition-transform duration-500"
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
                style={tiltStyle}
              />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1 className="font-vast-shadow text-5xl sm:text-7xl md:text-8xl tracking-tighter leading-[0.95] text-white uppercase">
              <span className="block font-vast-shadow text-white drop-shadow-[0_30px_60px_rgba(124,58,237,0.25)] roshan-name-solid">
                {typedSolid}
              </span>
              <span
                className="block font-vast-shadow text-transparent roshan-name-outline"
                style={{
                  WebkitTextStroke: '1.5px rgba(255,255,255,.45)',
                  textShadow: '0 0 30px rgba(168,85,247,0.22)',
                }}
              >
                {typedTransparent}
              </span>
            </h1>

            <motion.p
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{duration:1,delay:.2}}
              className="mt-8 text-lg leading-8 text-zinc-400 max-w-xl mx-auto lg:mx-0"
            >
              Building modern websites, scalable digital solutions, and reliable IT systems that help businesses grow through technology.
            </motion.p>

            <motion.div
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:.4}}
              className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="clickable group relative px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider text-black bg-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-200 to-fuchsia-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                <span>VIEW PORTFOLIO</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>

            {/* Download Resume Button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="clickable group relative px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider text-white border border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>DOWNLOAD RESUME</span>
              </span>
            </button>

            {/* Contact Button */}
            <button
              onClick={handleContactClick}
              className="clickable group relative px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider text-white/60 hover:text-white border border-transparent overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>CONTACT ME</span>
              </span>
            </button>
          </motion.div>

          </div>
        </div>

        {/* Bento Grid Quick Info Cards */}
        <div className="w-full mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickCard 
            icon={<MapPin className="w-5 h-5" />} 
            label="Location" 
            value="Simara-2, Bara (Nepal)" 
            delay={0.6} 
          />
          <QuickCard 
            icon={<Briefcase className="w-5 h-5" />} 
            label="Role" 
            value="Full Stack Web Developer" 
            delay={0.7} 
          />
          <QuickCard 
            icon={<Laptop className="w-5 h-5" />} 
            label="Specialization" 
            value="Web Apps & IT Support" 
            delay={0.8} 
          />
          <QuickCard 
            icon={<Rocket className="w-5 h-5" />} 
            label="Availability" 
            value="Available for Freelance" 
            delay={0.9} 
          />
        </div>
      </div>

      {/* Visual Accents from High Density design */}
      <div className="absolute bottom-10 right-10 hidden sm:flex gap-1 items-end z-10 pointer-events-none">
        <div className="w-1 h-8 bg-white/5"></div>
        <div className="w-1 h-12 bg-white/10"></div>
        <div className="w-1 h-16 bg-[#7C3AED]"></div>
        <div className="w-1 h-6 bg-white/5"></div>
      </div>

      {/* Interactive Beautiful Modal for Creative Resume */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Interactive Paper-glass Resume Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="font-display font-medium text-xs tracking-wider text-zinc-400"><span className="roshan-name">ROSHAN SAH</span> &mdash; OFFICIAL PORTFOLIO</span>
                </div>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Document Container */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                {/* Visual Bio Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h2 className="font-display font-bold text-3xl text-white roshan-name">Roshan Sah</h2>
                    <p className="text-purple-400 font-mono text-xs tracking-wide mt-1 font-semibold uppercase">Full Stack Web Developer | IT Support</p>
                    <p className="text-zinc-500 text-xs mt-2 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-purple-400" /> Simara-2, Bara (Nepal)</p>
                  </div>
                  <div className="space-y-1.5 text-xs text-zinc-400 font-mono bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-purple-400" /> iamrsn01@gmail.com</p>
                    <p className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-purple-400" /> facebook.com/rsn01</p>
                  </div>
                </div>

                {/* Section: Professional Experience */}
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-sm tracking-widest text-purple-300 uppercase">PROFESSIONAL EXPERIENCE</h3>
                  <div className="space-y-4 font-sans">
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-medium text-white text-sm">Full Stack Web Developer</h4>
                        <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">Freelance</span>
                      </div>
                      <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                        Building modern web applications, custom websites, responsive interfaces, and scalable solutions for businesses and individuals.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-medium text-white text-sm">IT Support & Systems Specialist</h4>
                        <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-white/5 border border-white/10">Freelance & Support</span>
                      </div>
                      <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                        Providing IT infrastructure support, networking solutions, system troubleshooting, hardware diagnostics, and technical consulting.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: Academic Journey */}
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-sm tracking-widest text-purple-300 uppercase">ACADEMIC BACKGROUND</h3>
                  <div className="space-y-4 font-sans">
                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-medium text-white text-sm">Tribhuvan University</h4>
                        <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">Bachelor's Degree</span>
                      </div>
                      <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                        Pursuing higher education with a focus on technology, computer science fundamentals, and scalable application logic.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: Personal Mission Statement */}
                <div className="p-5 rounded-xl bg-purple-500/[0.02] border border-purple-500/10">
                  <h3 className="font-display font-semibold text-xs tracking-wider text-purple-300">CORE MISSION</h3>
                  <p className="text-zinc-400 text-xs mt-2 italic leading-relaxed">
                    "I believe technology should be simple, reliable, and impactful. Whether developing scalable web applications or managing IT infrastructure, I strive to deliver high-quality solutions with clean design and efficient code."
                  </p>
                </div>
              </div>

              {/* Action buttons at bottom */}
              <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">FORMAT: PDF-SECURE</span>
                <button
                  onClick={() => {
                    setShowDownloadToast(true);
                    setIsResumeOpen(false);
                    setTimeout(() => setShowDownloadToast(false), 4000);
                  }}
                  className="group flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-xs font-semibold tracking-wider text-white transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification Toast for Resume Download */}
      <AnimatePresence>
        {showDownloadToast && (
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
              <h4 className="font-display font-bold text-white text-sm">Download Initiated</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Roshan Sah's digital resume and profile portfolio package has been prepared and generated successfully.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 