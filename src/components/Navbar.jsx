import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Download } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { smoothScrollTo } from '../utils/smoothScroll';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Education', href: '#education', id: 'education' },
  { name: 'Certificates', href: '#certificates', id: 'certificates' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    smoothScrollTo(targetId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0D1926]/90 backdrop-blur-2xl border-b border-[#1E3A5F]/70 shadow-2xl shadow-black/80'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Real Profile Image */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-[#7DD3FC] via-[#38BDF8] to-[#2DD4BF] shadow-lg shadow-[#38BDF8]/25 group-hover:shadow-[#38BDF8]/50 transition-all duration-300 group-hover:scale-105">
            <img
              src={resumeData.personal.avatar}
              alt={resumeData.personal.name}
              className="w-full h-full object-cover object-top rounded-full border border-[#1E3A5F]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#2DD4BF] border-2 border-[#070D14] animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-[#F0F9FF] tracking-tight text-sm sm:text-base flex items-center gap-1.5 group-hover:text-[#38BDF8] transition-colors">
              Ashraff Himas
            </span>
            <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider">
              Full-Stack / QA / DevOps
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0D1926]/90 p-1.5 rounded-full border border-[#1E3A5F] backdrop-blur-xl shadow-lg shadow-black/40">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#38BDF8] text-[#070D14] font-bold shadow-md shadow-[#38BDF8]/25'
                    : 'text-[#94A3B8] hover:text-[#F0F9FF] hover:bg-[#1E3A5F]/40'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Quick Action CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href={resumeData.personal.resumeUrl}
            download="Ashraff_Mohamed_Himas_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#7DD3FC] hover:text-[#070D14] bg-[#0D1926] hover:bg-[#38BDF8] border border-[#1E3A5F] hover:border-[#38BDF8] transition-all shadow-sm backdrop-blur-md cursor-pointer"
            title="Download Resume PDF"
          >
            <Download className="w-3.5 h-3.5 text-[#38BDF8] group-hover:text-[#070D14]" />
            <span>CV</span>
          </a>

          <a
            href={resumeData.personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#2DD4BF] bg-[#0D1926] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F] transition-all shadow-sm backdrop-blur-md"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] border border-[#7DD3FC] shadow-lg shadow-[#38BDF8]/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-xl text-[#94A3B8] hover:text-[#F0F9FF] bg-[#0D1926] border border-[#1E3A5F] backdrop-blur-lg cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#38BDF8]" /> : <Menu className="w-5 h-5 text-[#38BDF8]" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#0D1926]/95 backdrop-blur-3xl border border-[#1E3A5F] shadow-2xl space-y-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-[#38BDF8] text-[#070D14] font-bold'
                    : 'text-[#94A3B8] hover:text-[#F0F9FF] hover:bg-[#1E3A5F]/30'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1E3A5F]/50 flex flex-col gap-2">
            <a
              href={resumeData.personal.resumeUrl}
              download="Ashraff_Mohamed_Himas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#7DD3FC] bg-[#08101A] border border-[#1E3A5F]"
            >
              <Download className="w-4 h-4 text-[#38BDF8]" />
              <span>Download Resume PDF</span>
            </a>
            <a
              href={resumeData.personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-[#2DD4BF] bg-[#08101A] border border-[#1E3A5F]"
            >
              <MessageSquare className="w-4 h-4 text-[#2DD4BF]" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] border border-[#7DD3FC]"
            >
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
