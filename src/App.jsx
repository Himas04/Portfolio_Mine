import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import DevOpsPipelineTracer from './components/DevOpsPipelineTracer';
import CursorSpotlight from './components/CursorSpotlight';
import { smoothScrollTo } from './utils/smoothScroll';

const SECTIONS = [
  { id: 'hero', name: 'Hero' },
  { id: 'about', name: 'About' },
  { id: 'experience', name: 'Experience' },
  { id: 'projects', name: 'Projects' },
  { id: 'skills', name: 'Skills' },
  { id: 'education', name: 'Education' },
  { id: 'certificates', name: 'Certificates' },
  { id: 'contact', name: 'Contact' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // 🔝 Always open the website at the top (Hero section)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (!window.location.hash || window.location.hash === '#hero') {
      window.scrollTo(0, 0);
    }
  }, []);

  // 🚀 Robust, Zero-Lag ScrollSpy for Precise Section Highlighting
  useEffect(() => {
    let animId = null;

    const calculateActiveSection = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. Top of page is always strictly hero
      if (scrollY < 200) {
        setActiveSection('hero');
        return;
      }

      // 2. Very bottom of page is always contact
      if (scrollY + viewportHeight >= documentHeight - 120) {
        setActiveSection('contact');
        return;
      }

      // 3. Find the section whose center or visible area dominates the upper-middle viewport
      const targetLine = scrollY + viewportHeight * 0.38;
      let currentSection = 'hero';

      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (targetLine >= top && targetLine < top + height) {
            currentSection = sec.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (!animId) {
        animId = requestAnimationFrame(() => {
          calculateActiveSection();
          animId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleHudClick = (e, sectionId) => {
    e.preventDefault();
    smoothScrollTo(sectionId);
  };

  return (
    <div className="min-h-screen bg-[#050B12] text-[#F0F9FF] relative selection:bg-[#38BDF8]/30 selection:text-[#F0F9FF] font-sans">
      
      {/* 🌟 Dynamic Ambient Background Engine */}
      <BackgroundCanvas activeSection={activeSection} />

      {/* ⚡ Vertical DevOps Pipeline Navigation Tracer */}
      <DevOpsPipelineTracer activeSection={activeSection} />

      {/* ✨ Lightweight Nordic Glacier Cursor Spotlight */}
      <CursorSpotlight />

      {/* Fixed Sticky HUD Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* 🎯 Fully Transparent Floating Dot HUD (Right Side) */}
      <div className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center gap-2.5 p-1 bg-transparent pointer-events-auto">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => handleHudClick(e, sec.id)}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
              aria-label={`Scroll to ${sec.name}`}
            >
              {/* Minimal Dot */}
              <span 
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-2 h-5 bg-[#00D9FF] shadow-[0_0_12px_#00D9FF]' 
                    : 'w-1.5 h-1.5 bg-[#1E3A5F] group-hover:bg-[#7DD3FC] group-hover:scale-150'
                }`}
              />

              {/* Hover Tooltip */}
              <span className="absolute right-9 px-2.5 py-1 rounded-xl bg-[#0B1220]/90 backdrop-blur-xl border border-[#00D9FF]/40 text-[10px] font-mono font-bold text-[#7DD3FC] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-2xl whitespace-nowrap">
                {sec.name}
              </span>
            </a>
          );
        })}
      </div>

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certificates />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
