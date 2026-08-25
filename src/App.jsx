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

  // 🚀 Zero-Overhead IntersectionObserver for ScrollSpy (Native Browser Engine)
  useEffect(() => {
    const sectionElements = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -45% 0px',
        threshold: 0.05
      }
    );

    sectionElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleHudClick = (e, sectionId) => {
    e.preventDefault();
    smoothScrollTo(sectionId);
  };

  return (
    <div className="min-h-screen bg-[#070D14] text-[#F0F9FF] relative selection:bg-[#38BDF8]/30 selection:text-[#F0F9FF] font-sans">
      
      {/* 🌟 Dynamic Scrollytelling Background Engine */}
      <BackgroundCanvas activeSection={activeSection} />

      {/* ✨ Lightweight Nordic Glacier Cursor Spotlight */}
      <CursorSpotlight />

      {/* Fixed Sticky HUD Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* 🎯 Ultra-Minimalist Floating Dot Line (Takes 0 space, Never blocks content) */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center gap-3 pointer-events-auto">
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
                    ? 'w-2.5 h-6 bg-[#38BDF8] shadow-lg shadow-[#38BDF8]/50' 
                    : 'w-1.5 h-1.5 bg-[#1E3A5F] group-hover:bg-[#7DD3FC] group-hover:scale-150'
                }`}
              />

              {/* Hover Tooltip */}
              <span className="absolute right-7 px-2.5 py-1 rounded-lg bg-[#0D1926] border border-[#1E3A5F] text-[10px] font-mono font-bold text-[#7DD3FC] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl whitespace-nowrap">
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
