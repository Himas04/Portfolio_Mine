import React from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Languages, 
  Award, 
  Target, 
  Sparkles,
  Layers
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function About() {
  const { personal, languages } = resumeData;

  const keyStrengths = [
    {
      title: 'Full-Stack Web Engineering',
      desc: 'Building responsive, scalable web applications with React, Tailwind CSS, Node.js, Express, PHP, and PostgreSQL.',
      icon: Layers
    },
    {
      title: 'QA Automation & SDLC Testing',
      desc: 'Writing reliable end-to-end automated UI & API test suites with Playwright, Postman, and Test Case documentation.',
      icon: Target
    },
    {
      title: 'DevOps, Cloud & Linux',
      desc: 'Containerizing microservices with Docker, deploying on AWS / Vercel / Render, and automating GitHub Actions CI/CD.',
      icon: Award
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#38BDF8]/30 text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-black/20">
            <User className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            About <span className="gradient-text-hero">Ashraff Himas</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto drop-shadow-sm">
            A passionate Computer Science undergraduate specializing in full-stack architecture, software quality assurance, and DevOps automation.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative Summary & Strengths */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Story Card (Crystal Clear Glass) */}
            <div className="bg-[#050C16]/25 hover:bg-[#050C16]/40 p-6 sm:p-8 rounded-3xl border border-[#38BDF8]/30 hover:border-[#38BDF8]/70 space-y-5 shadow-2xl backdrop-blur-md transition-all duration-300">
              
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#38BDF8] p-0.5 bg-white/[0.05] shadow-md shrink-0">
                  <img
                    src={personal.avatar}
                    alt={personal.name}
                    className="w-full h-full object-cover object-top rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F0F9FF]">
                    Full-Stack Developer & QA Specialist
                  </h3>
                  <p className="text-xs font-mono text-[#38BDF8]">
                    Based in Colombo, Sri Lanka • Open Worldwide
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#94A3B8] leading-relaxed">
                <p>
                  I am a <strong className="text-[#F0F9FF]">Final Year BSc (Hons) in Computer Science</strong> undergraduate at <span className="text-[#7DD3FC]">University of Plymouth, UK</span> with <strong className="text-[#00D9FF]">1+ years of hands-on experience</strong> developing modern web applications and conducting thorough manual quality assurance testing.
                </p>
                <p>
                  My background spans building full-stack platforms using <strong className="text-[#F0F9FF]">React, Node.js, Express, MongoDB, and PostgreSQL</strong>, while actively advancing into <strong className="text-[#2DD4BF]">QA Automation (Playwright, Postman API testing)</strong> and <strong className="text-[#38BDF8]">DevOps workflows (Docker containerization, CI/CD deployment pipelines, and cloud hosting)</strong>.
                </p>
                <p>
                  Currently contributing as a <strong className="text-[#2DD4BF]">Full-Stack Developer Intern</strong> at <span className="text-[#F0F9FF]">MARAZIN Academy and Software Solution</span>, where I build production features, validate API and UI workflows, and optimize deployment cycles.
                </p>
              </div>

              {/* Stat Highlights Row */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                  <span className="text-xl sm:text-2xl font-black text-[#00D9FF] block">1+ Yrs</span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#94A3B8]">Dev & QA Exp</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                  <span className="text-xl sm:text-2xl font-black text-[#38BDF8] block">Final Yr</span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#94A3B8]">BSc Plymouth</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                  <span className="text-xl sm:text-2xl font-black text-[#2DD4BF] block">5+</span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#94A3B8]">Certifications</span>
                </div>
              </div>

            </div>

            {/* Core Strengths Accordion Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#7DD3FC] px-1">
                Core Engineering Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {keyStrengths.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#050C16]/25 hover:bg-[#050C16]/45 border border-[#38BDF8]/25 hover:border-[#38BDF8] backdrop-blur-md transition-all space-y-2 group shadow-lg"
                    >
                      <div className="p-2 rounded-xl bg-white/[0.05] text-[#38BDF8] w-fit border border-white/10">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h5 className="text-xs font-bold text-[#F0F9FF] group-hover:text-[#7DD3FC] transition-colors leading-tight">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-[#94A3B8] leading-normal line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Contact Details & Languages */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-[#050C16]/25 hover:bg-[#050C16]/40 p-6 sm:p-7 rounded-3xl border border-[#38BDF8]/30 hover:border-[#38BDF8]/70 space-y-5 shadow-2xl backdrop-blur-md transition-all duration-300">
              <h3 className="text-base font-bold text-[#F0F9FF] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>Personal & Contact Info</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm font-mono">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <div>
                    <span className="text-[#94A3B8] text-[10px] block uppercase">Location</span>
                    <span className="text-[#F0F9FF] font-semibold">{personal.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                  <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <div>
                    <span className="text-[#94A3B8] text-[10px] block uppercase">Email</span>
                    <a href={`mailto:${personal.email}`} className="text-[#F0F9FF] font-semibold hover:text-[#7DD3FC] transition-colors">
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                  <Phone className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                  <div>
                    <span className="text-[#94A3B8] text-[10px] block uppercase">Phone & WhatsApp</span>
                    <a href={personal.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#F0F9FF] font-semibold hover:text-[#2DD4BF] transition-colors">
                      {personal.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Multilingual Capabilities */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F0F9FF] flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-[#38BDF8]" />
                    <span>Languages Spoken</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8]">3 Languages</span>
                </div>

                <div className="space-y-2">
                  {languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm text-xs"
                    >
                      <span className="font-semibold text-[#F0F9FF]">{lang.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] text-[#7DD3FC] border border-[#38BDF8]/20">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
