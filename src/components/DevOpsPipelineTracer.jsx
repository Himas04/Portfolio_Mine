import React, { useEffect, useState } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

const PIPELINE_STAGES = [
  { id: 'hero', code: '01.INIT', label: 'Hero', color: '#00D9FF' },
  { id: 'about', code: '02.BIO', label: 'About', color: '#2DD4BF' },
  { id: 'experience', code: '03.EXP', label: 'Experience', color: '#38BDF8' },
  { id: 'projects', code: '04.BUILD', label: 'Projects', color: '#00D9FF' },
  { id: 'skills', code: '05.STACK', label: 'Skills', color: '#818CF8' },
  { id: 'education', code: '06.ACAD', label: 'Education', color: '#2DD4BF' },
  { id: 'certificates', code: '07.CERTS', label: 'Certificates', color: '#38BDF8' },
  { id: 'contact', code: '08.DEPLOY', label: 'Contact', color: '#7C3AED' },
];

export default function DevOpsPipelineTracer({ activeSection = 'hero' }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animId = null;

    const onScroll = () => {
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = (window.scrollY || window.pageYOffset || 0) / totalScroll;
        setScrollProgress(Math.min(Math.max(current, 0), 1));
      }
    };

    const handleScrollThrottled = () => {
      if (!animId) {
        animId = requestAnimationFrame(() => {
          onScroll();
          animId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleStageClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  const activeIndex = PIPELINE_STAGES.findIndex((s) => s.id === activeSection);
  const activeColor = PIPELINE_STAGES[activeIndex]?.color || '#00D9FF';

  return (
    <aside
      aria-label="DevOps Pipeline Navigation Tracer"
      className="fixed left-2 lg:left-4 xl:left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start pointer-events-none select-none opacity-30 hover:opacity-100 transition-opacity duration-300"
    >
      {/* 🚀 Fully Transparent Floating Pipeline Tracker (No Background Box) */}
      <div className="flex flex-col items-start gap-3 pointer-events-auto bg-transparent">
        
        {/* Header Tag */}
        <div className="flex items-center gap-1.5 px-1 py-0.5 bg-transparent">
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: activeColor }}
          />
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#7DD3FC]/80">
            PIPELINE
          </span>
        </div>

        {/* ⚡ Vertical Track Line Container */}
        <div className="relative flex flex-col items-start gap-4 py-2 pl-0.5">
          {/* Background Track Line */}
          <div className="absolute left-[7px] top-1 bottom-1 w-[2px] bg-[#1E3A5F]/40 rounded-full" />

          {/* Dynamic Progress Fill Line */}
          <div
            className="absolute left-[7px] top-1 w-[2px] rounded-full transition-all duration-150"
            style={{
              height: `${scrollProgress * 100}%`,
              background: `linear-gradient(to bottom, #00D9FF, ${activeColor})`,
              boxShadow: `0 0 10px ${activeColor}`,
            }}
          />

          {/* Traveling Laser Photon Bead */}
          <div
            className="absolute left-[4px] w-2 h-2 rounded-full transform -translate-y-1/2 pointer-events-none transition-all duration-150 ease-out"
            style={{
              top: `${scrollProgress * 100}%`,
              backgroundColor: activeColor,
              boxShadow: `0 0 12px ${activeColor}, 0 0 4px #FFFFFF`,
            }}
          />

          {/* Pipeline Stage Nodes */}
          {PIPELINE_STAGES.map((stage, idx) => {
            const isActive = activeSection === stage.id;
            const isPassed = activeIndex >= idx;

            return (
              <a
                key={stage.id}
                href={`#${stage.id}`}
                onClick={(e) => handleStageClick(e, stage.id)}
                className="group relative flex items-center gap-2.5 cursor-pointer py-0.5"
                aria-label={`Jump to pipeline stage ${stage.label}`}
              >
                {/* Node Bead */}
                <div
                  className={`relative z-10 w-3 h-3 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'border-[#FFFFFF] scale-125 bg-[#05070D]'
                      : isPassed
                      ? 'border-[#00D9FF]/70 bg-[#070D14]'
                      : 'border-[#1E3A5F] bg-[#05070D]/80 group-hover:border-[#7DD3FC]'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 12px ${stage.color}` : 'none',
                  }}
                >
                  <span
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'animate-pulse'
                        : isPassed
                        ? 'opacity-85'
                        : 'opacity-25 group-hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: isActive || isPassed ? stage.color : '#94A3B8',
                    }}
                  />
                </div>

                {/* Stage Text & Label */}
                <div
                  className={`hidden 2xl:flex items-center gap-1.5 font-mono text-[9px] transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 translate-x-0 font-bold drop-shadow-[0_0_8px_rgba(0,217,255,0.4)]'
                      : 'opacity-40 group-hover:opacity-100 -translate-x-0.5 group-hover:translate-x-0'
                  }`}
                >
                  <span
                    style={{
                      color: isActive ? stage.color : '#7DD3FC',
                    }}
                  >
                    {stage.code}
                  </span>
                  <span className="text-[#94A3B8] group-hover:text-[#FFFFFF]">
                    {stage.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* 📊 Bottom Progress Percentage Indicator */}
        <div className="px-1 font-mono text-[9px] text-[#94A3B8]/70 bg-transparent">
          <span>SYS: </span>
          <span className="text-[#00D9FF] font-semibold">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

      </div>
    </aside>
  );
}
