import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowUpRight, Briefcase, Heart, Sparkles, Clock, Calendar, X, Layers, ChevronRight } from 'lucide-react';
import { BlogCategory } from '../App';

interface Post {
  id: string;
  title: string;
  category: 'work' | 'life';
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
}

const allPosts: Post[] = [
  {
    id: 'calm-interfaces',
    title: 'Designing Calm & Focused Interfaces',
    category: 'work',
    date: 'Aug 2026',
    readTime: '4 min read',
    summary: 'How minimal visual noise, harmonious contrast, and intentional micro-interactions produce web software that feels effortless to use.',
    tags: ['UI/UX', 'Design Systems', 'Frontend'],
    content: [
      'In modern software, visual clutter is often mistaken for feature richness. However, true craftsmanship in UI engineering is about deliberate subtraction.',
      'A calm interface reduces cognitive friction by establishing clear visual hierarchy, consistent typography scales, and purposeful white space. When every element on screen earns its right to exist, the user experiences clarity and focus.',
      'Micro-animations should serve as subtle spatial cues rather than flashy distractions. Smooth transitions and tactile hover states reassure users without interrupting their workflow.'
    ],
  },
  {
    id: 'clean-architecture',
    title: 'Shipping with Intention: Clean Web Architectures',
    category: 'work',
    date: 'Jul 2026',
    readTime: '5 min read',
    summary: 'Structuring scalable React and TypeScript codebases that teams can iterate upon without accumulating hidden architectural debt.',
    tags: ['Architecture', 'React', 'TypeScript'],
    content: [
      'Speed without structure is an illusion. Moving quickly in early development cycles without thoughtful boundaries leads to brittle systems that stall later.',
      'By decoupling state management, keeping utility functions strictly pure, and enforcing strong TypeScript interfaces across component boundaries, codebases remain pleasant to extend.',
      'Investing in modularity and descriptive naming today saves hundreds of debugging hours tomorrow.'
    ],
  },
  {
    id: 'it-support-foundations',
    title: 'Reliable IT Infrastructure & Support Systems',
    category: 'work',
    date: 'Jun 2026',
    readTime: '4 min read',
    summary: 'Practical approaches to diagnosing networking bottlenecks, hardening endpoint security, and maintaining zero-downtime developer workflows.',
    tags: ['IT Support', 'Networking', 'Diagnostics'],
    content: [
      'A dependable system is one built on proactive visibility rather than reactive firefighting.',
      'From systematic DNS resolution debugging to structured backup automations and isolated VLANs, fundamental IT discipline forms the backbone of any productive tech organization.',
      'Documenting network topology and automating repetitive recovery procedures ensures operational resilience.'
    ],
  },
  {
    id: 'balance-code-living',
    title: 'The Balance Between Code and Living',
    category: 'life',
    date: 'Aug 2026',
    readTime: '3 min read',
    summary: 'Finding mental clarity, intentional offline downtime, and sustaining creative energy beyond the glow of the monitor.',
    tags: ['Lifestyle', 'Mindset', 'Productivity'],
    content: [
      'Programming is an intense cognitive pursuit. Staring into problems for hours often drains perspective if left unbalanced.',
      'Stepping away from screens — walking outside, spending time with family, or reading physical books — often yields the breakthrough solutions that elude us during marathon coding sessions.',
      'True productivity is not measured by hours spent sitting, but by the clarity and vitality brought to every focused session.'
    ],
  },
  {
    id: 'continuous-learning',
    title: 'Cultivating Daily Curiosity in Fast-Moving Times',
    category: 'life',
    date: 'Jul 2026',
    readTime: '4 min read',
    summary: 'Developing consistent learning habits, embracing beginner mindset, and staying grounded amidst technological shifts.',
    tags: ['Growth', 'Habits', 'Learning'],
    content: [
      'The tech landscape shifts constantly, but the underlying fundamentals of logic, empathy, and curiosity remain timeless.',
      'Approaching new frameworks, tools, and paradigms not with anxiety, but with open-minded curiosity transforms continuous learning into an enjoyable lifelong adventure.',
      'Small, consistent 20-minute daily learning blocks compound dramatically over years.'
    ],
  },
  {
    id: 'simplicity-philosophy',
    title: 'Simplicity as a Daily Guiding Philosophy',
    category: 'life',
    date: 'May 2026',
    readTime: '3 min read',
    summary: 'Why uncluttered workspaces, focused commitments, and simple daily routines unlock deep creative output.',
    tags: ['Philosophy', 'Simplicity', 'Focus'],
    content: [
      'Complexity is easy; simplicity requires rigorous intention.',
      'Whether decluttering your desk, pruning unnecessary commitments, or refining a design to its most essential form, choosing simplicity brings peace of mind and effortless velocity.',
      'Focus on the few things that truly move the needle, and let the rest fall away.'
    ],
  },
];

interface BlogPageProps {
  activeCategory?: BlogCategory;
  onSelectCategory?: (category: BlogCategory) => void;
}

export default function BlogPage({ 
  activeCategory = 'all',
  onSelectCategory 
}: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return allPosts;
    return allPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const counts = useMemo(() => {
    return {
      all: allPosts.length,
      work: allPosts.filter((p) => p.category === 'work').length,
      life: allPosts.filter((p) => p.category === 'life').length,
    };
  }, []);

  return (
    <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        
        {/* Banner Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10 shadow-2xl shadow-black/20 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 text-purple-300">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs font-mono uppercase tracking-[0.3em]">Thoughts & Perspectives</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-5xl tracking-tight">
            Notes on <span className="text-purple-400">Work</span> & <span className="text-pink-400">Life</span>.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base font-light">
            A space dedicated to engineering practices, interface design, personal growth, and lessons learned building real-world digital experiences.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5 pt-6 border-t border-white/5">
            <button
              onClick={() => onSelectCategory && onSelectCategory('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-white text-zinc-900 shadow-md font-semibold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Posts</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === 'all' ? 'bg-zinc-200 text-zinc-900' : 'bg-white/10 text-zinc-400'}`}>
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => onSelectCategory && onSelectCategory('work')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === 'work'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-semibold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-purple-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>Work</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === 'work' ? 'bg-purple-800 text-white' : 'bg-white/10 text-zinc-400'}`}>
                {counts.work}
              </span>
            </button>

            <button
              onClick={() => onSelectCategory && onSelectCategory('life')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === 'life'
                  ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] font-semibold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-pink-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span>Life</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === 'life' ? 'bg-pink-800 text-white' : 'bg-white/10 text-zinc-400'}`}>
                {counts.life}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => {
              const isWork = post.category === 'work';
              return (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group rounded-[1.8rem] border border-white/10 bg-[#070707] p-7 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-purple-400" />
                  </div>

                  <div>
                    {/* Category and meta */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        isWork 
                          ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                          : 'bg-pink-500/10 text-pink-300 border-pink-500/20'
                      }`}>
                        {isWork ? <Briefcase className="w-3 h-3" /> : <Heart className="w-3 h-3" />}
                        <span>{post.category}</span>
                      </span>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-display text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 font-light">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-xs font-medium text-purple-300 hover:text-white flex items-center gap-1 transition-colors pl-2"
                    >
                      <span>Read</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      selectedPost.category === 'work'
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                        : 'bg-pink-500/10 text-pink-300 border-pink-500/20'
                    }`}>
                      {selectedPost.category === 'work' ? <Briefcase className="w-3 h-3" /> : <Heart className="w-3 h-3" />}
                      <span>{selectedPost.category}</span>
                    </span>
                    <span className="text-xs font-mono text-zinc-400">• {selectedPost.readTime}</span>
                  </div>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {selectedPost.title}
                  </h2>
                  <p className="text-xs font-mono text-zinc-500 mt-2">Published: {selectedPost.date}</p>
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300 font-light border-y border-white/5 py-6">
                  {selectedPost.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
