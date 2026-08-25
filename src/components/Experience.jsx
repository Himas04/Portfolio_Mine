import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Experience() {
  const { experience } = resumeData;

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1926] border border-[#1E3A5F] text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Work & Internships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            Professional <span className="gradient-text-hero">Experience</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            Practical software engineering experience building production systems, implementing security policies, and optimizing web performance.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#1E3A5F]/70 ml-4 sm:ml-8 md:ml-32 space-y-12">
          {experience.map((item, idx) => (
            <div key={item.id || `${item.company}-${idx}`} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#070D14] border-2 border-[#38BDF8] group-hover:scale-125 group-hover:bg-[#38BDF8] transition-all duration-300 shadow-md shadow-[#38BDF8]/40" />

              {/* Main Experience Card (Midnight Ice) */}
              <div className="bg-[#0D1926] rounded-3xl p-6 sm:p-8 border border-[#1E3A5F] hover:border-[#38BDF8] transition-all duration-300 space-y-6 shadow-2xl backdrop-blur-2xl group-hover:-translate-y-1">
                
                {/* Header Row: Role, Company, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E3A5F]/50 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#08101A] text-[#7DD3FC] border border-[#1E3A5F]">
                        {item.type}
                      </span>
                      <span className="text-xs font-mono text-[#2DD4BF] flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Present Role
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#F0F9FF] tracking-tight">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-[#38BDF8] flex items-center gap-2">
                      <span>{item.company}</span>
                      <span className="text-[#1E3A5F]">•</span>
                      <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#08101A] border border-[#1E3A5F] text-xs font-mono font-bold text-[#F0F9FF]">
                      <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>

                {/* Accomplishment Highlights */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#7DD3FC]">
                    Key Deliverables & Responsibilities:
                  </h4>
                  <ul className="space-y-2.5 text-sm text-[#94A3B8] leading-relaxed">
                    {item.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] mt-1 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#1E3A5F]/50">
                  <span className="text-xs font-mono text-[#94A3B8] mr-1">Technologies Used:</span>
                  {item.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#08101A] border border-[#1E3A5F] text-xs font-mono font-medium text-[#7DD3FC]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
