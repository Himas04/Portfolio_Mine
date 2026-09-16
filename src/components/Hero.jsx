import React from 'react';
import { 
  ArrowRight, 
  Download, 
  ChevronDown,
  MousePointer
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import { resumeData } from '../data/resumeData';
import { smoothScrollTo } from '../utils/smoothScroll';
import Hero3DOrbital from './Hero3DOrbital';

export default function Hero() {
  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 xl:pl-28 2xl:pl-32 overflow-hidden bg-[#05070D]"
    >
      {/* 🌌 Full-Hero 3D Technology Orbit & Ambient Glass Cubes Space */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden">
        <Hero3DOrbital />
      </div>

      {/* 🌟 Main 2-Column Hero Content Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 pointer-events-none">
        
        {/* Left Column: Typography, Badges & Action Calls */}
        <div className="lg:col-span-6 space-y-6 text-left pointer-events-auto">
          
          {/* Subtle Status Badge: OPEN TO INTERNSHIPS / JUNIOR ROLES */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1220]/80 border border-[#00D9FF]/25 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]" />
            </span>
            <span className="text-[11px] font-mono font-medium tracking-wide text-[#7DD3FC]/90">
              OPEN TO INTERNSHIPS / JUNIOR ROLES
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#FFFFFF] leading-tight">
              Hi, I'm{' '}
              <span className="text-[#00D9FF] drop-shadow-[0_0_35px_rgba(0,217,255,0.45)]">
                Himas
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F9FF] tracking-tight">
              Final Year Computer Science Student
            </h2>

            {/* Role subtitle */}
            <div className="flex flex-wrap items-center gap-2.5 text-sm sm:text-base font-medium text-[#94A3B8] pt-1 font-mono">
              <span className="text-[#F0F9FF]">Full-Stack Developer</span>
              <span className="text-[#1E3A5F]">|</span>
              <span className="text-[#00D9FF]">QA Engineer</span>
              <span className="text-[#1E3A5F]">|</span>
              <span className="text-[#2DD4BF]">DevOps Enthusiast</span>
            </div>
          </div>

          {/* Intro Description */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl">
            I build modern web applications, automate testing, and explore cloud technologies to create efficient, scalable, and user-friendly solutions.
          </p>

          {/* Action Buttons: View My Projects & Download CV */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={(e) => handleScrollClick(e, 'projects')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-[#05070D] bg-[#00D9FF] hover:bg-[#38BDF8] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-[#00D9FF]/25"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4 text-[#05070D]" />
            </a>

            <a
              href={resumeData.personal.resumeUrl}
              download="Ashraff_Mohamed_Himas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-[#FFFFFF] bg-transparent hover:bg-white/[0.08] border border-[#1E3A5F] hover:border-[#00D9FF] transition-all duration-300 cursor-pointer shadow-md backdrop-blur-md hover:scale-105"
            >
              <span>Download CV</span>
              <Download className="w-4 h-4 text-[#00D9FF]" />
            </a>
          </div>

          {/* Social Links Row */}
          <div className="pt-2 flex items-center gap-3">
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#94A3B8] hover:text-[#00D9FF] border border-white/10 hover:border-[#00D9FF]/60 transition-all hover:scale-110"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#94A3B8] hover:text-[#00D9FF] border border-white/10 hover:border-[#00D9FF]/60 transition-all hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={resumeData.personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#2DD4BF] hover:text-[#7DD3FC] border border-white/10 hover:border-[#2DD4BF]/60 transition-all hover:scale-110"
              aria-label="WhatsApp Contact"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Right Column: Spatial area on desktop allowing the 3D Technology Orbit to shine */}
        <div className="lg:col-span-6 w-full flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] pointer-events-none" />

      </div>

      {/* Bottom Footer Telemetry & SCROLL TO EXPLORE Indicator */}
      <div className="w-full max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8] relative z-10 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span>Code</span>
          <span className="text-[#00D9FF]">→</span>
          <span>Test</span>
          <span className="text-[#00D9FF]">→</span>
          <span>Deploy</span>
          <span className="text-[#00D9FF]">→</span>
          <span className="text-[#F0F9FF] font-semibold">Build the Future</span>
        </div>

        <a
          href="#about"
          onClick={(e) => handleScrollClick(e, 'about')}
          className="group flex items-center gap-2 text-[#94A3B8] hover:text-[#00D9FF] transition-colors cursor-pointer"
        >
          <span className="text-[11px] tracking-widest uppercase">SCROLL TO EXPLORE</span>
          <div className="w-4 h-5 rounded-full border border-white/30 group-hover:border-[#00D9FF]/60 flex items-start justify-center p-0.5 transition-colors">
            <span className="w-1 h-1.5 bg-[#00D9FF] rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}


