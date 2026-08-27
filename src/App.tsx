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
          <WorkPage onNavigateToLife={() => handleNavigate('life')} />
        ) : currentView === 'life' ? (
          <LifePage onNavigateToWork={() => handleNavigate('work')} />
        ) : currentView === 'blog' ? (
          <WorkPage onNavigateToLife={() => handleNavigate('life')} />
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

