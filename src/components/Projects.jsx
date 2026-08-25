import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  Maximize2,
  AlertCircle,
  Code2,
  CheckCircle2,
  Cpu,
  ChevronRight
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#38BDF8]/30 text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-black/20">
            <FolderGit2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            Production <span className="gradient-text-hero">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto drop-shadow-sm">
            Real-world full-stack web applications, automated QA testing suites, and enterprise database implementations.
          </p>
        </div>

        {/* 📢 Disclaimer & GitHub CTA Banner (Crystal Glass) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#050C16]/25 border border-[#38BDF8]/30 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-xl bg-white/[0.05] border border-[#38BDF8]/30 text-[#38BDF8] shrink-0">
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
                  : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F0F9FF] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (Ultra-Transparent Polarforce Style Glass Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, pIdx) => {
            const projectTags = project.tags || project.techStack || [];
            const githubUrl = project.links?.github || project.github;
            const demoUrl = project.links?.demo || project.demo;
            const CategoryIcon = CATEGORY_ICONS[project.category] || FolderGit2;

            return (
              <div
                key={project.id || pIdx}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-[#050C16]/25 hover:bg-[#050C16]/40 rounded-3xl p-6 sm:p-8 border border-[#38BDF8]/30 hover:border-[#38BDF8]/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl backdrop-blur-md cursor-pointer overflow-hidden"
              >
                <div className="space-y-5">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-white/[0.05] text-[#38BDF8] border border-[#38BDF8]/30 group-hover:scale-110 transition-transform">
                        <CategoryIcon className="w-5 h-5 text-[#38BDF8]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/[0.05] text-[#7DD3FC] border border-[#38BDF8]/25">
                          {project.category}
                        </span>
                        <div className="text-xs font-mono text-[#38BDF8] mt-1">
                          {project.role || 'Software Engineering'}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-[#94A3B8] group-hover:text-[#38BDF8] group-hover:bg-[#38BDF8]/10 transition-all">
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

                  {/* Key Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
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
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[#7DD3FC] backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Card Actions (Explore Link) */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    className="text-xs font-bold font-mono text-[#38BDF8] hover:text-[#7DD3FC] flex items-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Explore Case Study</span>
                    <ChevronRight className="w-4 h-4 text-[#38BDF8]" />
                  </button>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-[#94A3B8] hover:text-[#F0F9FF] border border-white/10 transition-colors"
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
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-[#2DD4BF] hover:text-[#7DD3FC] border border-white/10 transition-colors"
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
