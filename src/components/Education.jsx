import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  CheckCircle 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Education() {
  const education = resumeData.education || [];

  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#38BDF8]/30 text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-black/20">
            <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            Academic <span className="gradient-text-hero">Qualifications</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto drop-shadow-sm">
            Formal Computer Science and Software Engineering degree programs and foundation credentials.
          </p>
        </div>

        {/* Education Grid (Crystal Clear Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item, idx) => {
            const highlightsList = item.highlights || item.modules || [];
            const statusBadge = item.status || item.grade || 'Completed';

            return (
              <div
                key={item.id || `${item.degree}-${idx}`}
                className="group bg-[#050C16]/25 hover:bg-[#050C16]/40 rounded-3xl p-6 sm:p-8 border border-[#38BDF8]/30 hover:border-[#38BDF8]/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl backdrop-blur-md"
              >
                <div className="space-y-6">
                  
                  {/* Header: Degree, Institution, Period */}
                  <div className="space-y-2 border-b border-white/10 pb-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/[0.05] text-[#7DD3FC] border border-[#38BDF8]/30 backdrop-blur-sm">
                        {statusBadge}
                      </span>
                      <span className="text-xs font-mono text-[#F0F9FF] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-[#F0F9FF] group-hover:text-[#7DD3FC] transition-colors leading-tight pt-1">
                      {item.degree}
                    </h3>

                    <div className="text-xs sm:text-sm font-semibold text-[#38BDF8] flex items-center gap-2">
                      <span>{item.institution}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Key Coursework & Modules */}
                  {highlightsList.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#7DD3FC] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Key Focus Areas & Curriculum:</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#94A3B8]">
                        {highlightsList.map((mod, modIdx) => (
                          <li key={modIdx} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 text-[#2DD4BF] mt-0.5 shrink-0" />
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Bottom Card Footer Badge */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span>Status: <strong className="text-[#2DD4BF] font-bold">{statusBadge}</strong></span>
                  <span className="text-[#7DD3FC] group-hover:translate-x-1 transition-transform">
                    {item.type === 'university' ? 'Cardiff Met / Plymouth Standard →' : 'Secondary Education →'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
