import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Database, 
  Maximize2,
  AlertCircle,
  Sparkles,
  Code2,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { resumeData } from '../data/resumeData';
import ProjectModal from './ProjectModal';

const CATEGORY_ICONS = {
  'Full-Stack & Realtime': Layers,
  'Web Application': Code2,
  'Desktop Application': Cpu
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const { projects } = resumeData;
  const categories = ['ALL', 'Full-Stack & Realtime', 'Web Application', 'Desktop Application'];

  const filteredProjects = activeFilter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1926] border border-[#1E3A5F] text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            <FolderGit2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            Production <span className="gradient-text-hero">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            Real-world full-stack web applications, automated QA testing suites, and enterprise database implementations.
          </p>
        </div>

        {/* 📢 Sample Projects Disclaimer & GitHub CTA Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1926] border border-[#1E3A5F] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-[#08101A] border border-[#1E3A5F] text-[#38BDF8] shrink-0">
              <AlertCircle className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#F0F9FF]">
                These are sample highlighted projects.
              </p>
              <p className="text-xs text-[#94A3B8]">
                You can explore all my academic, industry, and individual projects on my GitHub profile.
              </p>
            </div>
          </div>

          <a
            href={resumeData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-lg shadow-[#38BDF8]/20 transition-all hover:scale-105 shrink-0 cursor-pointer"
          >
            <GithubIcon className="w-4 h-4 text-[#070D14]" />
            <span>Visit My GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#070D14]" />
          </a>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#38BDF8] text-[#070D14] shadow-lg shadow-[#38BDF8]/25 scale-105'
                  : 'bg-[#0D1926] text-[#94A3B8] hover:text-[#F0F9FF] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (Clean Card Architecture with NO Dummy Images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, pIdx) => {
            const projectTags = project.tags || project.techStack || [];
            const githubUrl = project.links?.github || project.github;
            const demoUrl = project.links?.demo || project.demo;
            const badgeText = project.badge || project.metrics || project.role;
            const CategoryIcon = CATEGORY_ICONS[project.category] || FolderGit2;

            return (
              <div
                key={project.id || pIdx}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-[#0D1926] rounded-3xl p-6 sm:p-8 border border-[#1E3A5F] hover:border-[#38BDF8] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl backdrop-blur-2xl cursor-pointer overflow-hidden"
              >
                <div className="space-y-6">
                  
                  {/* Card Header Banner (No Images, Sleek Tech Header) */}
                  <div className="flex items-start justify-between gap-3 border-b border-[#1E3A5F]/50 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#08101A] text-[#38BDF8] border border-[#1E3A5F] group-hover:scale-110 transition-transform">
                        <CategoryIcon className="w-6 h-6 text-[#38BDF8]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#08101A] text-[#7DD3FC] border border-[#1E3A5F]">
                          {project.category}
                        </span>
                        <div className="text-xs font-mono text-[#38BDF8] mt-1">
                          {project.role || 'Software Engineering'}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#08101A] border border-[#1E3A5F] text-[#94A3B8] group-hover:text-[#38BDF8] group-hover:bg-[#1E3A5F]/30 transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#F0F9FF] group-hover:text-[#7DD3FC] transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
                    {project.summary || project.description}
                  </p>

                  {/* Key Highlights / Deliverables */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-2 p-3.5 rounded-2xl bg-[#08101A] border border-[#1E3A5F]/60">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#7DD3FC] font-bold">
                        Key Accomplishment:
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#F0F9FF] font-mono leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2DD4BF] mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{project.highlights[0]}</span>
                      </div>
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {projectTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[#08101A] border border-[#1E3A5F] font-mono text-[#7DD3FC]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Card Actions */}
                <div className="pt-6 mt-6 border-t border-[#1E3A5F]/50 flex items-center justify-between">
                  <button
                    type="button"
                    className="text-xs font-bold font-mono text-[#38BDF8] hover:text-[#7DD3FC] flex items-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Read Full Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#08101A] hover:bg-[#1E3A5F]/40 text-[#94A3B8] hover:text-[#F0F9FF] border border-[#1E3A5F] transition-colors"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#08101A] hover:bg-[#1E3A5F]/40 text-[#2DD4BF] hover:text-[#7DD3FC] border border-[#1E3A5F] transition-colors"
                        title="Live Production Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Project Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
