import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Download, 
  MapPin, 
  CheckCircle, 
  Terminal as TerminalIcon, 
  ChevronDown
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import { resumeData } from '../data/resumeData';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = resumeData.personal.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Bio & Action Callouts */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Status Badge with Mini Avatar */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D1926] border border-[#1E3A5F] backdrop-blur-xl shadow-lg shadow-black/40">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-[#38BDF8]">
              <img
                src={resumeData.personal.avatar}
                alt={resumeData.personal.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="text-xs font-mono font-medium text-[#7DD3FC]">
              {resumeData.personal.status}
            </span>
          </div>

          {/* Name & Dynamic Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="text-[#F0F9FF]">{resumeData.personal.location}</span>
              <span className="text-[#1E3A5F]">•</span>
              <span>CS Undergraduate</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F0F9FF] leading-tight">
              Hello, I'm <br />
              <span className="gradient-text-hero text-glow-cyan">
                {resumeData.personal.name}
              </span>
            </h1>

            {/* Rotating Role Text */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <div className="text-xl sm:text-2xl font-mono font-bold text-[#F0F9FF] flex items-center gap-2">
                <span className="text-[#1E3A5F]">&gt;</span>
                <span className="text-[#38BDF8] transition-all duration-500">
                  {roles[roleIndex]}
                </span>
                <span className="w-2.5 h-6 bg-[#2DD4BF] animate-pulse inline-block" />
              </div>
            </div>
          </div>

          {/* Short Intro Summary */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
            {resumeData.personal.headline} Experienced in <span className="text-[#F0F9FF] font-semibold underline decoration-[#38BDF8]/50 underline-offset-4">MERN Stack</span>, <span className="text-[#F0F9FF] font-semibold underline decoration-[#2DD4BF]/50 underline-offset-4">Docker & CI/CD</span>, and automated QA testing with <span className="text-[#7DD3FC] font-semibold">Playwright</span>.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <a
              href="#projects"
              onClick={(e) => handleScrollClick(e, 'projects')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-xl shadow-[#38BDF8]/25 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-4 h-4 text-[#070D14]" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollClick(e, 'contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#F0F9FF] bg-[#0D1926] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F] hover:border-[#38BDF8] transition-all cursor-pointer shadow-lg"
            >
              <Mail className="w-4 h-4 text-[#38BDF8]" />
              <span>Contact Me</span>
            </a>

            <a
              href={resumeData.personal.resumeUrl}
              download="Ashraff_Mohamed_Himas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-[#7DD3FC] hover:text-[#070D14] bg-[#0D1926] hover:bg-[#38BDF8] border border-[#1E3A5F] hover:border-[#7DD3FC] transition-all shadow-md cursor-pointer"
              title="Download Ashraff Mohamed Himas Resume PDF"
            >
              <Download className="w-4 h-4 text-[#38BDF8] group-hover:text-[#070D14]" />
              <span>Get Resume</span>
            </a>
          </div>

          {/* Social Links Bar */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
            <span className="text-xs font-mono text-[#94A3B8]">Connect:</span>
            
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0D1926] hover:bg-[#1E3A5F]/40 text-[#F0F9FF] hover:text-[#38BDF8] border border-[#1E3A5F] transition-all hover:scale-110"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0D1926] hover:bg-[#1E3A5F]/40 text-[#F0F9FF] hover:text-[#38BDF8] border border-[#1E3A5F] transition-all hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={resumeData.personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#0D1926] hover:bg-[#1E3A5F]/40 text-[#2DD4BF] hover:text-[#7DD3FC] border border-[#1E3A5F] transition-all hover:scale-110"
              aria-label="WhatsApp Contact"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Profile Image & Interactive Terminal IDE Card */}
        <div className="lg:col-span-5 flex flex-col items-center gap-6">
          
          {/* 🌟 Featured Profile Portrait Card */}
          <div className="relative group">
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#7DD3FC]/40 via-[#38BDF8]/30 to-[#2DD4BF]/40 opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-3xl p-1.5 bg-[#0D1926] border border-[#1E3A5F] shadow-2xl backdrop-blur-2xl overflow-hidden group-hover:scale-105 transition-all duration-300">
              <img
                src={resumeData.personal.avatar}
                alt={resumeData.personal.name}
                className="w-full h-full object-cover object-top rounded-2xl"
              />
              <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl bg-[#070D14]/90 backdrop-blur-md border border-[#1E3A5F] text-[10px] font-mono text-[#F0F9FF] text-center flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
                <span className="text-[#7DD3FC]">Ashraff Himas</span>
              </div>
            </div>
          </div>

          {/* Terminal Window Card (Midnight Ice & Glacial Navy) */}
          <div className="relative w-full max-w-md">
            <div className="relative rounded-2xl bg-[#0D1926] border border-[#1E3A5F] p-5 shadow-2xl overflow-hidden backdrop-blur-2xl">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E3A5F]/50 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#94A3B8]">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>ashraff@himas-dev:~$</span>
                </div>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#08101A] text-[#7DD3FC] border border-[#1E3A5F]">
                  bash 5.2
                </div>
              </div>

              {/* Terminal Code Content */}
              <div className="font-mono text-xs space-y-2.5 text-[#F0F9FF] leading-relaxed">
                <div>
                  <span className="text-[#38BDF8] font-semibold">const</span> developer = &#123;
                </div>
                <div className="pl-4 space-y-1 text-[#94A3B8]">
                  <div><span className="text-[#7DD3FC]">name</span>: <span className="text-[#38BDF8]">"Ashraff Mohamed Himas"</span>,</div>
                  <div><span className="text-[#7DD3FC]">role</span>: <span className="text-[#F0F9FF]">"Full-Stack / QA / DevOps"</span>,</div>
                  <div><span className="text-[#7DD3FC]">degree</span>: <span className="text-[#F0F9FF]">"BSc (Hons) Computer Science"</span>,</div>
                  <div><span className="text-[#7DD3FC]">stack</span>: [
                    <span className="text-[#38BDF8]">"React"</span>, 
                    <span className="text-[#38BDF8]">"Node"</span>, 
                    <span className="text-[#2DD4BF]">"Docker"</span>, 
                    <span className="text-[#38BDF8]">"Playwright"</span>
                  ],</div>
                  <div><span className="text-[#7DD3FC]">openToWork</span>: <span className="text-[#2DD4BF] font-bold">true</span></div>
                </div>
                <div>&#125;;</div>

                <div className="pt-2 border-t border-[#1E3A5F]/50 flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span className="flex items-center gap-1 text-[#7DD3FC] font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-[#2DD4BF]" /> All systems passing
                  </span>
                  <span className="text-[#1E3A5F] font-mono">v2.0.26</span>
                </div>
              </div>

              {/* Floating Quick Badges */}
              <div className="mt-3 pt-3 border-t border-[#1E3A5F]/50 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                <div className="p-1.5 rounded-lg bg-[#08101A] border border-[#1E3A5F]">
                  <span className="text-[#F0F9FF] font-bold block text-sm">2+</span>
                  <span className="text-[#94A3B8]">Live Apps</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#08101A] border border-[#1E3A5F]">
                  <span className="text-[#38BDF8] font-bold block text-sm">20+</span>
                  <span className="text-[#94A3B8]">Bugs QA'd</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#08101A] border border-[#1E3A5F]">
                  <span className="text-[#2DD4BF] font-bold block text-sm">5+</span>
                  <span className="text-[#94A3B8]">Certs</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Scroll Down Hint */}
      <div className="mt-12 flex flex-col items-center gap-2 text-[#94A3B8] hover:text-[#F0F9FF] transition-colors animate-bounce cursor-pointer">
        <a 
          href="#about" 
          onClick={(e) => handleScrollClick(e, 'about')}
          className="flex flex-col items-center text-xs font-mono cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-[#38BDF8]" />
        </a>
      </div>
    </section>
  );
}
