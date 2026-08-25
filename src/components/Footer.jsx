import React from 'react';
import { 
  Heart, 
  ArrowUp, 
  Terminal, 
  Mail, 
  MapPin, 
  Code2,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import { resumeData } from '../data/resumeData';
import { smoothScrollTo } from '../utils/smoothScroll';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e) => {
    e.preventDefault();
    smoothScrollTo('hero');
  };

  return (
    <footer className="relative bg-[#09121C] border-t border-[#1E3A5F] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#94A3B8] font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-[#7DD3FC] via-[#38BDF8] to-[#2DD4BF] shadow-lg shadow-[#38BDF8]/20">
                <img
                  src={resumeData.personal.avatar}
                  alt={resumeData.personal.name}
                  className="w-full h-full object-cover object-top rounded-full border border-[#1E3A5F]"
                />
              </div>
              <div>
                <span className="font-bold text-[#F0F9FF] tracking-tight text-base block">
                  {resumeData.personal.name}
                </span>
                <span className="text-xs font-mono text-[#38BDF8]">
                  Full-Stack • QA • DevOps
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Designing and building high-performance web systems, test automation suites, and cloud CI/CD pipelines with precision.
            </p>

            <div className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{resumeData.personal.location}</span>
              <span className="text-[#1E3A5F]">•</span>
              <span className="text-[#2DD4BF]">Open Worldwide</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#7DD3FC]">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <a href="#about" onClick={(e) => { e.preventDefault(); smoothScrollTo('about'); }} className="hover:text-[#F0F9FF] hover:translate-x-1 transition-all">About</a>
              <a href="#experience" onClick={(e) => { e.preventDefault(); smoothScrollTo('experience'); }} className="hover:text-[#F0F9FF] hover:translate-x-1 transition-all">Experience</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); smoothScrollTo('projects'); }} className="hover:text-[#F0F9FF] hover:translate-x-1 transition-all">Projects</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); smoothScrollTo('skills'); }} className="hover:text-[#F0F9FF] hover:translate-x-1 transition-all">Skills</a>
              <a href="#education" onClick={(e) => { e.preventDefault(); smoothScrollTo('education'); }} className="hover:text-[#F0F9FF] hover:translate-x-1 transition-all">Education</a>
              <a href="#certificates" onClick={(e) => { e.preventDefault(); smoothScrollTo('certificates'); }} className="hover:text-[#F0F9FF] hover:translate-x-1 transition-all">Certifications</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); }} className="hover:text-[#F0F9FF] hover:translate-x-1 transition-all">Contact</a>
            </div>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="md:col-span-4 space-y-4 md:text-right flex flex-col md:items-end">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#7DD3FC]">
              Get in Touch
            </h4>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#08101A] hover:bg-[#1E3A5F]/40 text-[#94A3B8] hover:text-[#38BDF8] border border-[#1E3A5F] transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#08101A] hover:bg-[#1E3A5F]/40 text-[#94A3B8] hover:text-[#38BDF8] border border-[#1E3A5F] transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={resumeData.personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#08101A] hover:bg-[#1E3A5F]/40 text-[#2DD4BF] hover:text-[#7DD3FC] border border-[#1E3A5F] transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={handleBackToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#08101A] hover:bg-[#38BDF8] border border-[#1E3A5F] hover:border-[#38BDF8] text-xs font-bold text-[#F0F9FF] hover:text-[#070D14] transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#38BDF8] group-hover:text-[#070D14] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#1E3A5F]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} Ashraff Mohamed Himas. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
