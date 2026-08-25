import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Target, 
  ShieldCheck,
  FolderGit2
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const projectTags = project.techStack || project.tags || [];
  const projectHighlights = project.highlights || project.deliverables || [];
  const githubUrl = project.links?.github || project.github;
  const demoUrl = project.links?.demo || project.demo;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D14]/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0D1926] p-6 sm:p-8 rounded-3xl border border-[#1E3A5F] shadow-2xl shadow-black/90 space-y-8 backdrop-blur-3xl text-[#F0F9FF]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-[#94A3B8] hover:text-[#F0F9FF] bg-[#08101A] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5 text-[#38BDF8]" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-10 border-b border-[#1E3A5F]/50 pb-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#08101A] text-[#7DD3FC] border border-[#1E3A5F]">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#38BDF8]">{project.role || project.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F0F9FF] tracking-tight">
            {project.title}
          </h2>
        </div>

        {/* Deep Dive Case Study Content */}
        <div className="space-y-6 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#F0F9FF] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#38BDF8]" />
              <span>Project Architecture & Overview</span>
            </h3>
            <p className="bg-[#08101A] p-4 rounded-2xl border border-[#1E3A5F]/50 leading-relaxed text-sm text-[#F0F9FF]">
              {project.description || project.summary}
            </p>
          </div>

          {/* Key Deliverables & Outcomes */}
          {projectHighlights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#F0F9FF] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#2DD4BF]" />
                <span>Key Engineering Highlights & Responsibilities</span>
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {projectHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#08101A] border border-[#1E3A5F] text-xs sm:text-sm font-mono">
                    <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] mt-0.5 shrink-0" />
                    <span className="text-[#F0F9FF]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Matrix */}
          {projectTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#7DD3FC]">
                Technologies & Tools Applied
              </h3>
              <div className="flex flex-wrap gap-2">
                {projectTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#08101A] border border-[#1E3A5F] text-xs font-mono font-medium text-[#7DD3FC]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-[#1E3A5F]/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-lg shadow-[#38BDF8]/20 transition-all cursor-pointer"
              >
                <span>Live Project Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-[#F0F9FF] bg-[#08101A] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F] hover:border-[#38BDF8] transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4 text-[#38BDF8]" />
                <span>Source Code Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-[#F0F9FF] bg-[#08101A] hover:bg-[#1E3A5F]/30 border border-[#1E3A5F] transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
