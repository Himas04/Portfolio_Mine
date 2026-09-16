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
                className="group relative bg-[#07101E]/40 hover:bg-[#0B1728]/60 rounded-3xl border border-[#00D9FF]/20 hover:border-[#00D9FF]/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] backdrop-blur-xl cursor-pointer overflow-hidden"
              >
                {/* 🖼️ Project Image Preview Banner */}
                {project.image && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden border-b border-white/5 bg-[#05070D]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                    />
                    {/* Subtle Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07101E] via-transparent to-transparent opacity-80" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#05070D]/80 text-[#7DD3FC] border border-[#00D9FF]/30 backdrop-blur-md shadow-md flex items-center gap-1.5">
                        <CategoryIcon className="w-3 h-3 text-[#00D9FF]" />
                        <span>{project.category}</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#05070D]/70 border border-white/10 text-[#94A3B8] group-hover:text-[#00D9FF] transition-colors backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    {/* Role & Badge (if no image or secondary info) */}
                    {!project.image && (
                      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/[0.05] text-[#7DD3FC] border border-[#00D9FF]/25">
                          {project.category}
                        </span>
                        <div className="text-xs font-mono text-[#00D9FF]">
                          {project.role || 'Software Engineering'}
                        </div>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#FFFFFF] group-hover:text-[#00D9FF] transition-colors leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-2">
                      {project.summary || project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {projectTags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#05070D]/70 border border-[#00D9FF]/20 font-mono text-[#7DD3FC] backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {projectTags.length > 5 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[#94A3B8] font-mono">
                          +{projectTags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Card Actions (Explore Link + GitHub + Demo) */}
                  <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      className="text-xs font-bold font-mono text-[#00D9FF] hover:text-[#7DD3FC] flex items-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
                    >
                      <span>Explore Case Study</span>
                      <ChevronRight className="w-4 h-4 text-[#00D9FF]" />
                    </button>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#00D9FF]/20 text-[#94A3B8] hover:text-[#FFFFFF] border border-white/10 hover:border-[#00D9FF]/50 transition-colors"
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
                          className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#2DD4BF]/20 text-[#2DD4BF] hover:text-[#FFFFFF] border border-white/10 hover:border-[#2DD4BF]/50 transition-colors"
                          title="Live Production Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
