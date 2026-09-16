import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  Layout, 
  Server, 
  Cloud, 
  CheckCircle2 
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import TestRunnerDemo from './TestRunnerDemo';

const SKILL_ICONS = {
  'Programming Languages': Code2,
  'Frontend Development': Layout,
  'Backend & Databases': Server,
  'DevOps & Cloud': Cloud,
  'Software Testing & QA': CheckCircle2,
  'IT Support & Tools': Cpu
};

export default function Skills() {
  const skillsData = resumeData.skillsData || [];
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = ['ALL', ...skillsData.map(s => s.category)];

  const filteredCategories = activeTab === 'ALL'
    ? skillsData
    : skillsData.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#38BDF8]/30 text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-black/20">
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            Skills & <span className="gradient-text-hero">Specializations</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto drop-shadow-sm">
            Comprehensive technology stack covering modern frontend engineering, secure backend microservices, QA automation, and cloud deployments.
          </p>
        </div>

        {/* 🧪 LIVE AUTOMATED QA TEST RUNNER DEMO SIMULATOR */}
        <TestRunnerDemo />

        {/* Skills Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#38BDF8] text-[#070D14] shadow-lg shadow-[#38BDF8]/25 scale-105'
                  : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F0F9FF] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Category Grid (Crystal Clear Glass) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group, groupIdx) => {
            const Icon = SKILL_ICONS[group.category] || Code2;

            return (
              <div
                key={group.category || groupIdx}
                className="bg-[#050C16]/25 hover:bg-[#050C16]/40 rounded-3xl p-6 sm:p-7 border border-[#38BDF8]/30 hover:border-[#38BDF8]/80 transition-all duration-300 space-y-6 shadow-2xl backdrop-blur-md group hover:-translate-y-1"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="p-2.5 rounded-2xl bg-white/[0.05] text-[#38BDF8] border border-[#38BDF8]/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F0F9FF] group-hover:text-[#7DD3FC] transition-colors leading-snug">
                      {group.category}
                    </h3>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      {group.skills?.length || 0} Technologies
                    </span>
                  </div>
                </div>

                {/* Skill Items Progress List */}
                <div className="space-y-4">
                  {(group.skills || []).map((skill, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2 h-2 rounded-full shadow-sm"
                            style={{
                              backgroundColor: 
                                skill.name.includes('React') ? '#61DAFB' :
                                skill.name.includes('Node') ? '#539E43' :
                                skill.name.includes('Docker') ? '#2496ED' :
                                skill.name.includes('AWS') ? '#FF9900' :
                                skill.name.includes('Mongo') ? '#00ED64' :
                                skill.name.includes('Playwright') ? '#2DD4BF' :
                                skill.name.includes('JavaScript') ? '#F7DF1E' :
                                skill.name.includes('Tailwind') ? '#06B6D4' :
                                skill.name.includes('Python') ? '#3776AB' :
                                skill.name.includes('Postman') ? '#FF6C37' :
                                skill.name.includes('Git') ? '#F05032' :
                                skill.name.includes('Linux') ? '#FCC624' :
                                skill.name.includes('PHP') ? '#777BB4' :
                                skill.name.includes('C#') ? '#239120' :
                                '#38BDF8',
                              boxShadow: `0 0 8px ${
                                skill.name.includes('React') ? '#61DAFB' :
                                skill.name.includes('Docker') ? '#2496ED' :
                                skill.name.includes('AWS') ? '#FF9900' :
                                '#38BDF8'
                              }`
                            }}
                          />
                          <span className="text-[#F0F9FF] font-medium">{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {skill.tag && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.05] text-[#94A3B8] border border-white/10">
                              {skill.tag}
                            </span>
                          )}
                          <span className="text-[#7DD3FC] font-bold">{skill.level}%</span>
                        </div>
                      </div>
                      
                      {/* Nordic Glacier Progress Bar */}
                      <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-[#1E3A5F] via-[#38BDF8] to-[#2DD4BF] rounded-full transition-all duration-1000 group-hover:shadow-sm group-hover:shadow-[#38BDF8]/40"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
