import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ChevronDown, ChevronRight, GraduationCap, Laptop, Network, Sparkles, Layers, Lightbulb, Briefcase, Heart, BookOpen } from 'lucide-react';
import { ToolCategory, View } from '../App';

interface NavItem {
  label: string;
  href?: string;
  view?: View;
}

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View, category?: ToolCategory) => void;
  activeCategory?: ToolCategory;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const homeNavItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const blogNavItems = [
  { id: 'work' as const, label: 'Work', desc: 'Code, tech & architecture', icon: Briefcase },
  { id: 'life' as const, label: 'Life', desc: 'Mindset, habits & reflections', icon: Heart },
];

const toolCategories: Array<{
  id: ToolCategory;
  label: string;
  desc: string;
  icon: typeof GraduationCap;
}> = [
  { id: 'educational', label: 'Educational', desc: 'GPA, School & Learning Hub', icon: GraduationCap },
  { id: 'tech', label: 'Tech', desc: 'Dev, Code & Web Utilities', icon: Laptop },
  { id: 'networking', label: 'Networking', desc: 'IP, DNS & Diagnostics', icon: Network },
];

export default function Navbar({ 
  currentView, 
  onNavigate, 
  activeCategory = 'all',
  theme = 'dark',
  onToggleTheme
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isMobileToolsExpanded, setIsMobileToolsExpanded] = useState(false);
  const [isMobileBlogExpanded, setIsMobileBlogExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dropdownTimeoutRef = useRef<number | null>(null);
  const blogDropdownTimeoutRef = useRef<number | null>(null);

  const blogContainerRef = useRef<HTMLDivElement>(null);
  const toolsContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (blogContainerRef.current && !blogContainerRef.current.contains(e.target as Node)) {
        setIsBlogDropdownOpen(false);
      }
      if (toolsContainerRef.current && !toolsContainerRef.current.contains(e.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnterTools = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsToolsDropdownOpen(true);
  };

  const handleMouseLeaveTools = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => {
      setIsToolsDropdownOpen(false);
    }, 250);
  };

  const handleMouseEnterBlog = () => {
    if (blogDropdownTimeoutRef.current) {
      clearTimeout(blogDropdownTimeoutRef.current);
    }
    setIsBlogDropdownOpen(true);
  };

  const handleMouseLeaveBlog = () => {
    blogDropdownTimeoutRef.current = window.setTimeout(() => {
      setIsBlogDropdownOpen(false);
    }, 250);
  };

  useEffect(() => {
    if (currentView !== 'home') {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }

      const sections = homeNavItems.map((item) => item.href?.slice(1) ?? 'home');
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleMainNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentView !== 'home') {
      onNavigate('home');
      requestAnimationFrame(() => scrollToSection(href));
    } else {
      scrollToSection(href);
    }
    setIsMobileMenuOpen(false);
  };

  const handleCategorySelect = (category: ToolCategory) => {
    onNavigate('tools', category);
    setIsToolsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogNavigate = (targetView: 'work' | 'life') => {
    onNavigate(targetView);
    setIsBlogDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isBlogActive = currentView === 'work' || currentView === 'life' || currentView === 'blog';

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-400"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl transition-all duration-500 ${
          isScrolled
            ? 'glass py-3 px-6 rounded-full shadow-2xl shadow-black/40 border border-white/10'
            : 'bg-transparent py-5 px-4'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleMainNavClick(e, '#home')}
            className="group flex items-center gap-2 font-display font-bold text-lg tracking-tight text-white hover:opacity-90"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <span className="tracking-tighter font-black text-xl font-display">
              rsn<span className="text-[#7C3AED]">01</span>
            </span>
          </a>

          {/* Main Navigation Section Links */}
          <nav className="hidden md:flex items-center gap-1">
            {homeNavItems.map((item) => {
              const isActive = currentView === 'home' && activeSection === item.href?.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleMainNavClick(e, item.href ?? '#home')}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveBg"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/5"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Gap & Divider separating special pages */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <div className="h-4 w-[1px] bg-white/10" />

            {/* Separated Pill Container for Blogs Dropdown, Tools Dropdown, Lets Talk & Lightbulb */}
            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 p-1 rounded-full shadow-inner shadow-black/20">
              
              {/* Blog Button with Dropdown (Sub-categories: Work and Life) */}
              <div 
                ref={blogContainerRef}
                className="relative"
                onMouseEnter={handleMouseEnterBlog}
                onMouseLeave={handleMouseLeaveBlog}
              >
                <button
                  type="button"
                  onClick={() => setIsBlogDropdownOpen((prev) => !prev)}
                  className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    isBlogActive
                      ? 'bg-purple-600/25 text-purple-300 font-semibold border border-purple-500/40 shadow-sm'
                      : isBlogDropdownOpen
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-expanded={isBlogDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Blog</span>
                  <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-300 ${isBlogDropdownOpen ? 'rotate-180 text-purple-400' : ''}`} />
                </button>

                {/* Blog Dropdown Menu Popup */}
                <AnimatePresence>
                  {isBlogDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2.5 w-64 glass rounded-2xl border border-white/10 p-2 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> Blog Categories
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500">Select Topic</span>
                      </div>

                      <div className="mt-1 space-y-1">
                        {blogNavItems.map((item) => {
                          const Icon = item.icon;
                          const isItemActive = currentView === item.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleBlogNavigate(item.id)}
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer group ${
                                isItemActive
                                  ? item.id === 'work'
                                    ? 'bg-purple-600/20 text-white border border-purple-500/30 shadow-inner'
                                    : 'bg-emerald-600/20 text-white border border-emerald-500/30 shadow-inner'
                                  : 'hover:bg-white/[0.06] text-zinc-300 hover:text-white'
                              }`}
                            >
                              <div className={`p-2 rounded-lg transition-transform duration-200 group-hover:scale-105 ${
                                isItemActive 
                                  ? item.id === 'work' ? 'bg-purple-500/30 text-purple-300' : 'bg-emerald-500/30 text-emerald-300'
                                  : item.id === 'work' ? 'bg-white/[0.04] text-purple-400 group-hover:bg-purple-500/10' : 'bg-white/[0.04] text-emerald-400 group-hover:bg-emerald-500/10'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="block text-xs font-semibold tracking-wide text-white">
                                    {item.label}
                                  </span>
                                  <ChevronRight className="w-3 h-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                                <span className="block text-[10px] text-zinc-400 truncate mt-0.5">
                                  {item.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tools with Hover Dropdown */}
              <div 
                ref={toolsContainerRef}
                className="relative"
                onMouseEnter={handleMouseEnterTools}
                onMouseLeave={handleMouseLeaveTools}
              >
                <button
                  type="button"
                  onClick={() => setIsToolsDropdownOpen((prev) => !prev)}
                  className={`relative flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                    currentView === 'tools'
                      ? 'bg-white/15 text-white font-semibold border border-purple-500/30'
                      : isToolsDropdownOpen
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Tools</span>
                  <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-300 ${isToolsDropdownOpen ? 'rotate-180 text-purple-400' : ''}`} />
                </button>

                {/* Dropdown Menu Popup */}
                <AnimatePresence>
                  {isToolsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-64 glass rounded-2xl border border-white/10 p-2 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-1">
                          <Layers className="w-3 h-3" /> Tool Categories
                        </span>
                        <button
                          onClick={() => handleCategorySelect('all')}
                          className="text-[9px] font-mono text-zinc-500 hover:text-white transition-colors"
                        >
                          View All
                        </button>
                      </div>

                      <div className="mt-1 space-y-1">
                        {toolCategories.map((cat) => {
                          const Icon = cat.icon;
                          const isCatActive = currentView === 'tools' && activeCategory === cat.id;

                          return (
                            <button
                              key={cat.id}
                              onClick={() => handleCategorySelect(cat.id)}
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                                isCatActive
                                  ? 'bg-purple-600/20 text-white border border-purple-500/30 shadow-inner'
                                  : 'hover:bg-white/[0.06] text-zinc-300 hover:text-white'
                              }`}
                            >
                              <div className={`p-2 rounded-lg ${isCatActive ? 'bg-purple-500/30 text-purple-300' : 'bg-white/[0.04] text-purple-400'}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="block text-xs font-semibold tracking-wide text-white">
                                  {cat.label}
                                </span>
                                <span className="block text-[10px] text-zinc-400 truncate mt-0.5">
                                  {cat.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Lets Talk CTA Link */}
              <button
                onClick={() => {
                  onNavigate('lets-talk');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  currentView === 'lets-talk'
                    ? 'bg-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 hover:text-white border border-purple-500/30'
                }`}
              >
                Lets Talk
              </button>

              {/* Functional Lightbulb Theme Toggle Button (Directly after Lets Talk) */}
              <button
                type="button"
                onClick={onToggleTheme}
                title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to White (Light) Theme'}
                aria-label="Toggle Light / Dark Theme"
                className={`relative flex items-center justify-center p-1.5 rounded-full transition-all duration-300 group cursor-pointer ${
                  theme === 'light'
                    ? 'bg-amber-400/20 text-amber-500 border border-amber-400/60 shadow-[0_0_14px_rgba(245,158,11,0.45)] hover:bg-amber-400/30'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-amber-300 hover:bg-amber-400/15 hover:border-amber-400/40 border border-white/10 hover:shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                }`}
              >
                <Lightbulb 
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    theme === 'light'
                      ? 'fill-amber-400 text-amber-500 scale-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]'
                      : 'group-hover:text-amber-300 group-hover:scale-115'
                  }`}
                />
              </button>

            </div>
          </div>

          {/* Mobile Theme Toggle & Menu Toggle Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onToggleTheme}
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to White (Light) Theme'}
              aria-label="Toggle Theme"
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-400/20 text-amber-500 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : 'bg-white/[0.06] text-zinc-400 hover:text-amber-300 border-white/10'
              }`}
            >
              <Lightbulb className={`w-4 h-4 ${theme === 'light' ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-[2.5%] w-[95%] z-40 glass rounded-3xl p-6 border border-white/10 shadow-2xl block md:hidden max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-2">
              {homeNavItems.map((item) => {
                const isActive = currentView === 'home' && activeSection === item.href?.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleMainNavClick(e, item.href ?? '#home')}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'bg-purple-950/20 text-purple-300 border border-purple-500/15'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-purple-400 translate-x-0.5 -translate-y-0.5' : 'text-zinc-600'}`} />
                  </a>
                );
              })}

              {/* Mobile Separator Gap */}
              <div className="my-2 pt-2 border-t border-white/10 flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 px-2">Explore Pages</span>
                <span className="flex-1 h-[1px] bg-white/5" />
              </div>

              {/* Separate Work & Life Accordion */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileBlogExpanded(!isMobileBlogExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium tracking-wide transition-colors cursor-pointer ${
                    isBlogActive ? 'text-purple-300' : 'text-zinc-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>Blog (Work & Life)</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isMobileBlogExpanded ? 'rotate-180 text-purple-400' : ''}`} />
                </button>

                <div className={`px-2 pb-2 space-y-1.5 ${isMobileBlogExpanded ? 'block' : 'hidden'}`}>
                  {blogNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleBlogNavigate(item.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          currentView === item.id
                            ? item.id === 'work' 
                              ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                              : 'bg-emerald-600/20 text-emerald-200 border border-emerald-500/30'
                            : 'text-zinc-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${item.id === 'work' ? 'text-purple-400' : 'text-emerald-400'}`} />
                        <div className="flex-1">
                          <span className="font-semibold">{item.label}</span>
                          <span className="block text-[10px] text-zinc-400">{item.desc}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tools Accordion with Categories */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setIsMobileToolsExpanded(!isMobileToolsExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium tracking-wide transition-colors ${
                    currentView === 'tools' ? 'text-purple-300' : 'text-zinc-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Tools Categories</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isMobileToolsExpanded ? 'rotate-180 text-purple-400' : ''}`} />
                </button>

                <div className={`px-2 pb-2 space-y-1.5 ${isMobileToolsExpanded ? 'block' : 'hidden'}`}>
                  <button
                    onClick={() => handleCategorySelect('all')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 flex items-center justify-between"
                  >
                    <span>All Tools</span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  </button>

                  {toolCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                          currentView === 'tools' && activeCategory === cat.id
                            ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                            : 'text-zinc-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-purple-400" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lets Talk CTA */}
              <button
                onClick={() => {
                  onNavigate('lets-talk');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 hover:text-white"
              >
                <span>Lets Talk</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </button>

              {/* Mobile Theme Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  if (onToggleTheme) onToggleTheme();
                }}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20"
              >
                <span className="flex items-center gap-2.5">
                  <Lightbulb className={`w-4 h-4 ${theme === 'light' ? 'fill-amber-400 text-amber-500' : 'text-amber-400'}`} />
                  <span>Theme: {theme === 'light' ? 'White / Light' : 'Dark'}</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">Toggle</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
