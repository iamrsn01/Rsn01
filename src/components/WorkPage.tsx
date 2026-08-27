import { useState, useMemo, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  ArrowUpRight,
  Code2,
  Layers,
  Sparkles,
  Calendar,
  Clock,
  X,
  ChevronRight,
  Search,
  Cpu,
  Terminal,
  CheckCircle2,
  Compass,
  Share2,
  Check
} from 'lucide-react';

interface WorkArticle {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  takeaways: string[];
  content: string[];
}

const workArticles: WorkArticle[] = [
  {
    id: 'calm-interfaces',
    title: 'Designing Calm & Focused User Interfaces',
    subtitle: 'Principles of minimal friction and intentional visual hierarchy',
    date: 'Aug 2026',
    readTime: '5 min read',
    tags: ['UI/UX', 'Design Systems', 'Frontend'],
    summary: 'How intentional whitespace, curated typographic rhythm, and subtle micro-interactions create web applications that feel effortless and natural to use.',
    takeaways: [
      'Visual noise increases cognitive load; subtract until only essential controls remain.',
      'Rely on consistent font scales and HSL color relationships rather than arbitrary styling.',
      'Animations should give spatial context, not demand attention.'
    ],
    content: [
      'In modern web development, interfaces are frequently overcrowded with flashing elements, aggressive badges, and competing calls-to-action. However, true craftsmanship in UI engineering is about deliberate subtraction.',
      'A calm interface reduces friction by establishing clear hierarchy, consistent spacing tokens, and purposeful contrasts. When every element on screen earns its right to exist, users experience immediate clarity and effortless navigation.',
      'Micro-animations must act as physical metaphors — gentle springs on hover, subtle page transitions, and smooth active indicators — that reassure users of system responsiveness without breaking their focus.'
    ],
  },
  {
    id: 'clean-architecture',
    title: 'Shipping with Intention: Clean Web Architectures',
    subtitle: 'Structuring modular React and TypeScript applications that scale gracefully',
    date: 'Jul 2026',
    readTime: '6 min read',
    tags: ['Architecture', 'React', 'TypeScript', 'Clean Code'],
    summary: 'Moving fast without creating architectural debt. How decoupling state, enforcing strict domain models, and pure utilities maintain speed over years.',
    takeaways: [
      'Separate presentation components from data-fetching and domain logic.',
      'Use discriminating unions in TypeScript to make invalid UI states unrepresentable.',
      'Keep business logic in pure, unit-testable helper functions.'
    ],
    content: [
      'Early project speed is often deceptive. Hacking together features without modular boundaries creates a brittle foundation that drastically slows teams down after a few months.',
      'By decoupling state management, adopting clear component contracts, and enforcing strict TypeScript types across boundaries, teams can refactor with complete confidence.',
      'Investing in explicit naming, descriptive folder layouts, and comprehensive typing upfront eliminates thousands of future debugging hours.'
    ],
  },
  {
    id: 'it-support-foundations',
    title: 'Reliable IT Infrastructure & Support Systems',
    subtitle: 'Practical methodologies for zero-downtime environments',
    date: 'Jun 2026',
    readTime: '5 min read',
    tags: ['IT Support', 'Networking', 'Diagnostics', 'Security'],
    summary: 'A look into systematic network diagnostic trees, proactive telemetry, endpoint security hardening, and resilient workflow automation.',
    takeaways: [
      'Proactive monitoring beats emergency troubleshooting every single time.',
      'Isolate critical services using VLANs and clear subnets.',
      'Automate backup routines and periodically test full recovery simulations.'
    ],
    content: [
      'A dependable system is built on proactive visibility rather than frantic firefighting. When infrastructure is transparent, failures are predicted before users ever notice.',
      'From systematic DNS resolution debugging to structured daily backup automations and isolated network segments, fundamental IT discipline forms the backbone of any serious digital service.',
      'Documenting network topology, keeping runbooks current, and automating repetitive maintenance routines safeguards stability and data integrity.'
    ],
  },
  {
    id: 'api-performance',
    title: 'High-Performance API Integrations & Real-Time Sync',
    subtitle: 'Optimizing data pipelines and frontend caching strategies',
    date: 'May 2026',
    readTime: '4 min read',
    tags: ['Backend', 'APIs', 'Performance', 'Full Stack'],
    summary: 'Best practices for handling asynchronous requests, optimistic UI mutations, and real-time state synchronization with minimal overhead.',
    takeaways: [
      'Leverage optimistic updates for instant user feedback.',
      'Implement intelligent cache invalidation to prevent stale renders.',
      'Debounce search inputs and rate-limit API calls on client boundaries.'
    ],
    content: [
      'Modern web apps live or die by perceived speed. Users expect interactions to register instantaneously, even over high-latency connections.',
      'By pairing optimistic UI updates with resilient rollback mechanisms and strategic caching, interfaces feel instantaneous while maintaining robust data synchronization.',
      'Structuring API payloads with lean schemas and utilizing compressed transport formats further ensures rapid page transitions and efficient resource consumption.'
    ]
  }
];

interface WorkPageProps {
  initialArticleId?: string | null;
  onNavigateToLife?: () => void;
}

export default function WorkPage({ initialArticleId, onNavigateToLife }: WorkPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<WorkArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-open article if deep link matches
  useEffect(() => {
    if (initialArticleId) {
      const match = workArticles.find(
        a => a.id.toLowerCase() === initialArticleId.toLowerCase() ||
             a.id.toLowerCase().includes(initialArticleId.toLowerCase())
      );
      if (match) {
        setSelectedArticle(match);
      }
    }
  }, [initialArticleId]);

  const handleOpenArticle = (article: WorkArticle) => {
    setSelectedArticle(article);
    window.location.hash = `#/blog/work/${article.id}`;
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    window.location.hash = '#/blog/work';
  };

  const handleCopyShareLink = (article: WorkArticle, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#/blog/work/${article.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    workArticles.forEach(a => a.tags.forEach(t => tags.add(t)));
    return ['all', ...Array.from(tags)];
  }, []);

  const filteredArticles = useMemo(() => {
    return workArticles.filter(article => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = activeTag === 'all' || article.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeTag]);

  return (
    <section className="min-h-screen px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">

        {/* Page Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12 shadow-2xl shadow-black/20 relative overflow-hidden"
        >
          <div className="absolute right-[-5%] top-[-10%] w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-[30%] bottom-[-20%] w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2.5 text-purple-400 font-mono text-xs uppercase tracking-[0.25em]">
                <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span>Engineering & Work Journal</span>
              </div>

              {onNavigateToLife && (
                <button
                  onClick={onNavigateToLife}
                  className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-emerald-400 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Switch to Life Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h1 className="mt-5 font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Engineering, Architecture & <span className="text-purple-400">IT Solutions</span>.
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-400 font-light">
              In-depth articles, architectural breakdowns, and hands-on IT troubleshooting guides based on real-world web engineering and enterprise support experience.
            </p>

            {/* Search & Tags Bar */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search articles (e.g. React, IT support, design)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${activeTag === tag
                        ? 'bg-purple-600 text-white font-medium shadow-md shadow-purple-900/30'
                        : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                  >
                    {tag === 'all' ? 'All Topics' : `#${tag}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles List Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                id={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-3xl border border-white/10 bg-[#070707] p-6 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/20"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {article.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => handleCopyShareLink(article, e)}
                        title="Copy article link"
                        className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-purple-500/20 text-zinc-400 hover:text-purple-300 transition-colors cursor-pointer"
                      >
                        {copiedId === article.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="text-[11px] font-mono text-zinc-500">{article.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-display text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {article.title}
                  </h2>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-400 font-light line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">{article.date}</span>
                  <button
                    onClick={() => handleOpenArticle(article)}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Article Reader */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={handleCloseArticle}
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
                    <span className="p-1 rounded-md bg-purple-500/20 text-purple-300">
                      <Briefcase className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">Work Article</span>
                    <span className="text-xs font-mono text-zinc-400">• {selectedArticle.readTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyShareLink(selectedArticle)}
                      className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-purple-500/20 text-xs font-mono text-zinc-300 hover:text-purple-300 transition-colors border border-white/10 cursor-pointer flex items-center gap-1.5"
                    >
                      {copiedId === selectedArticle.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCloseArticle}
                      aria-label="Close modal"
                      className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-xs font-mono text-zinc-400 mt-2">{selectedArticle.subtitle} — {selectedArticle.date}</p>
                </div>

                {/* Key Takeaways */}
                <div className="bg-purple-950/20 border border-purple-500/20 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-semibold block">Key Engineering Takeaways:</span>
                  <div className="space-y-1.5">
                    {selectedArticle.takeaways.map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300 font-light border-y border-white/5 py-6">
                  {selectedArticle.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleCloseArticle}
                    className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
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
