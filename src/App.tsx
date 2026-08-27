/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import useMouseGlow from './hooks/useMouseGlow';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Facts from './components/Facts';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WorkPage from './components/WorkPage';
import LifePage from './components/LifePage';
import ToolsPage from './components/ToolsPage';
import LetsTalkPage from './components/LetsTalkPage';

export type View = 'home' | 'work' | 'life' | 'blog' | 'tools' | 'lets-talk';
export type ToolCategory = 'all' | 'educational' | 'tech' | 'networking';
export type BlogCategory = 'all' | 'work' | 'life';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [selectedToolCategory, setSelectedToolCategory] = useState<ToolCategory>('all');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Initialize general-purpose mouse glow spotlight tracking
  useMouseGlow();

  // Parse URL hash on initial load and on hash change for deep-linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      
      if (!hash || hash === 'home') {
        setCurrentView('home');
        setActiveStoryId(null);
        setActiveArticleId(null);
      } else if (hash.includes('tools')) {
        setCurrentView('tools');
      } else if (hash.includes('lets-talk') || hash.includes('contact')) {
        setCurrentView('lets-talk');
      } else if (hash.includes('life')) {
        setCurrentView('life');
        // Extract story id e.g. "blog/life/friends-more-than-decades" or "life/friends-more-than-decades"
        const parts = hash.split('/');
        const storyPart = parts[parts.length - 1];
        if (storyPart && storyPart !== 'life' && storyPart !== 'blog') {
          setActiveStoryId(storyPart);
        }
      } else if (hash.includes('work')) {
        setCurrentView('work');
        const parts = hash.split('/');
        const articlePart = parts[parts.length - 1];
        if (articlePart && articlePart !== 'work' && articlePart !== 'blog') {
          setActiveArticleId(articlePart);
        }
      } else if (hash.includes('friends') || hash.includes('rara') || hash.includes('tilicho') || hash.includes('mustang') || hash.includes('abc')) {
        // Direct place ID match in hash
        setCurrentView('life');
        setActiveStoryId(hash.split('/').pop() || hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (view: View, category?: ToolCategory) => {
    setCurrentView(view);
    if (category) {
      setSelectedToolCategory(category);
    }

    // Update URL hash smoothly for shareable links
    if (view === 'home') {
      window.location.hash = '#/';
    } else if (view === 'work' || view === 'blog') {
      window.location.hash = '#/blog/work';
    } else if (view === 'life') {
      window.location.hash = '#/blog/life';
    } else if (view === 'tools') {
      window.location.hash = '#/tools';
    } else if (view === 'lets-talk') {
      window.location.hash = '#/lets-talk';
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-[#ffffff] text-slate-900 selection:bg-purple-500/20 selection:text-purple-900' 
        : 'bg-[#050505] text-white selection:bg-purple-500/30 selection:text-white'
    }`}>
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        activeCategory={selectedToolCategory}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        {currentView === 'home' ? (
          <>
            <Hero />
            <About />
            <WhatIDo />
            <Projects />
            <Experience />
            <Facts />
            <Quote />
            <Contact />
          </>
        ) : currentView === 'work' ? (
          <WorkPage 
            initialArticleId={activeArticleId}
            onNavigateToLife={() => handleNavigate('life')} 
          />
        ) : currentView === 'life' ? (
          <LifePage 
            initialStoryId={activeStoryId}
            onNavigateToWork={() => handleNavigate('work')} 
          />
        ) : currentView === 'blog' ? (
          <WorkPage 
            initialArticleId={activeArticleId}
            onNavigateToLife={() => handleNavigate('life')} 
          />
        ) : currentView === 'tools' ? (
          <ToolsPage 
            activeCategory={selectedToolCategory} 
            onSelectCategory={setSelectedToolCategory} 
          />
        ) : (
          <LetsTalkPage />
        )}
      </main>

      <Footer />
    </div>
  );
}

