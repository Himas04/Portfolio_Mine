import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cloud, 
  Network, 
  CheckCircle,
  X,
  Maximize2,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { resumeData } from '../data/resumeData';

const CATEGORY_ICONS = {
  'Cloud & DevOps': Cloud,
  'QA & Software Testing': ShieldCheck,
  'Networking & Security': Network,
  'IT Systems & Support': CheckCircle
};

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const categories = ['ALL', 'Cloud & DevOps', 'QA & Software Testing', 'Networking & Security', 'IT Systems & Support'];

  const filteredCerts = activeCategory === 'ALL'
    ? resumeData.certifications
    : resumeData.certifications.filter(c => c.category === activeCategory);

  // Responsive items per page (3 on desktop, 2 on tablet, 1 on mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index when filter category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const maxIndex = Math.max(0, filteredCerts.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleCopyId = (certId, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(certId);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const visibleCerts = filteredCerts.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1926] border border-[#1E3A5F] text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F9FF] tracking-tight">
            Professional <span className="gradient-text-hero">Certifications</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            Official verified credentials in AWS Cloud Architecture, SDLC QA Testing, Cisco Networking, and Enterprise IT Systems.
          </p>
        </div>

        {/* Filter Tabs & Navigation Arrows Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#1E3A5F]/50 pb-5">
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#38BDF8] text-[#070D14] shadow-md shadow-[#38BDF8]/20 scale-105'
                    : 'bg-[#0D1926] text-[#94A3B8] hover:text-[#F0F9FF] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Slider Arrow Buttons (Previous & Next) */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-[#94A3B8] mr-1">
              Showing <span className="text-[#7DD3FC] font-bold">{Math.min(currentIndex + 1, filteredCerts.length)}</span> - <span className="text-[#7DD3FC] font-bold">{Math.min(currentIndex + itemsPerPage, filteredCerts.length)}</span> of <span className="text-[#F0F9FF] font-bold">{filteredCerts.length}</span>
            </div>

            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous Certificate"
              className="p-2.5 rounded-xl bg-[#0D1926] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F] hover:border-[#38BDF8] text-[#F0F9FF] disabled:opacity-30 disabled:hover:border-[#1E3A5F] disabled:hover:bg-[#0D1926] transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-[#38BDF8]" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next Certificate"
              className="p-2.5 rounded-xl bg-[#0D1926] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F] hover:border-[#38BDF8] text-[#F0F9FF] disabled:opacity-30 disabled:hover:border-[#1E3A5F] disabled:hover:bg-[#0D1926] transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-[#38BDF8]" />
            </button>
          </div>
        </div>

        {/* 🌟 1-Row Carousel Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {visibleCerts.map((cert) => {
            const CategoryIcon = CATEGORY_ICONS[cert.category] || Award;
            const isCopied = copiedId === cert.certificateId;

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-[#0D1926] rounded-3xl p-5 sm:p-6 border border-[#1E3A5F] hover:border-[#38BDF8] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-2xl backdrop-blur-2xl cursor-pointer overflow-hidden animate-in fade-in zoom-in-95 duration-300"
              >
                <div className="space-y-4">
                  
                  {/* Certificate Image Thumbnail */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#1E3A5F] aspect-[16/10] bg-[#08101A] shadow-inner group/thumb">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D14]/85 via-[#070D14]/20 to-transparent opacity-60 group-hover/thumb:opacity-30 transition-opacity" />
                    
                    {/* Floating Expand Indicator */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-[#070D14]/80 backdrop-blur-md border border-[#1E3A5F] text-[10px] font-mono text-[#F0F9FF] flex items-center gap-1.5 shadow-lg group-hover/thumb:bg-[#38BDF8] group-hover/thumb:text-[#070D14] transition-all">
                      <Maximize2 className="w-3 h-3" />
                      <span>View</span>
                    </div>

                    {/* Category pill */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070D14]/85 backdrop-blur-md border border-[#1E3A5F] text-[10px] font-mono text-[#7DD3FC]">
                      <CategoryIcon className="w-3 h-3 text-[#38BDF8]" />
                      <span>{cert.badge}</span>
                    </div>
                  </div>

                  {/* Issuer & Title */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#94A3B8] font-mono mb-1">
                      <span className="text-[#38BDF8] font-bold">{cert.issuer.split(' / ')[0]}</span>
                      <span className="text-[#F0F9FF]">{cert.date}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F0F9FF] group-hover:text-[#7DD3FC] transition-colors leading-snug line-clamp-2">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Skills Covered */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#08101A] border border-[#1E3A5F]/50 font-mono text-[#94A3B8]"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#08101A] font-mono text-[#7DD3FC] border border-[#1E3A5F]/40">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Certificate ID & Copy Action */}
                <div className="pt-4 mt-4 border-t border-[#1E3A5F]/50 flex items-center justify-between gap-2">
                  <div className="text-[10px] font-mono text-[#94A3B8] truncate max-w-[160px]" title={cert.certificateId}>
                    ID: <span className="text-[#7DD3FC]">{cert.certificateId.slice(0, 12)}...</span>
                  </div>

                  <button
                    onClick={(e) => handleCopyId(cert.certificateId, e)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#08101A] hover:bg-[#1E3A5F]/30 border border-[#1E3A5F] text-[#F0F9FF] transition-all cursor-pointer"
                    title="Copy Certificate ID"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-[#2DD4BF]" />
                        <span className="text-[10px] text-[#2DD4BF]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#38BDF8]" />
                        <span className="text-[10px]">Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-8 bg-[#38BDF8]'
                    : 'w-2 bg-[#1E3A5F] hover:bg-[#38BDF8]/60'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* 📜 High-Resolution Certificate Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070D14]/85 backdrop-blur-2xl animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0D1926] p-6 sm:p-8 rounded-3xl border border-[#1E3A5F] shadow-2xl shadow-black/80 space-y-6 backdrop-blur-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-xl text-[#94A3B8] hover:text-[#F0F9FF] bg-[#08101A] hover:bg-[#1E3A5F]/40 border border-[#1E3A5F] transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5 text-[#38BDF8]" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10 border-b border-[#1E3A5F]/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                  {selectedCert.issuer}
                </span>
                <span className="text-[#1E3A5F]">•</span>
                <span className="text-xs font-mono text-[#94A3B8]">{selectedCert.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#F0F9FF] tracking-tight">
                {selectedCert.title}
              </h3>
            </div>

            {/* High-Res Certificate Full Image Display */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1E3A5F] bg-[#08101A] shadow-2xl">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            {/* Certificate Meta Information Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-[#08101A] border border-[#1E3A5F]/60 space-y-0.5">
                <span className="text-[10px] font-mono text-[#94A3B8] block">Recipient</span>
                <span className="text-xs font-bold text-[#F0F9FF]">{resumeData.personal.name}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#08101A] border border-[#1E3A5F]/60 space-y-0.5">
                <span className="text-[10px] font-mono text-[#94A3B8] block">Duration / Credit</span>
                <span className="text-xs font-bold text-[#7DD3FC]">{selectedCert.duration}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#08101A] border border-[#1E3A5F]/60 space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-[#94A3B8] block">Signatory</span>
                <span className="text-xs font-bold text-[#F0F9FF]">{selectedCert.signatory}</span>
              </div>
            </div>

            {/* Certificate Verification ID Box */}
            <div className="p-4 rounded-2xl bg-[#08101A] border border-[#1E3A5F] space-y-2">
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase tracking-wider">
                Official Certificate Verification ID:
              </span>
              <div className="flex items-center justify-between gap-3 bg-[#070D14] p-2.5 rounded-xl border border-[#1E3A5F]/50 font-mono text-xs text-[#7DD3FC] break-all select-all">
                <span>{selectedCert.certificateId}</span>
                <button
                  onClick={(e) => handleCopyId(selectedCert.certificateId, e)}
                  className="p-2 rounded-lg bg-[#0D1926] hover:bg-[#1E3A5F]/30 border border-[#1E3A5F] text-[#F0F9FF] shrink-0 transition-colors cursor-pointer"
                  title="Copy ID"
                >
                  {copiedId === selectedCert.certificateId ? (
                    <Check className="w-4 h-4 text-[#2DD4BF]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#38BDF8]" />
                  )}
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between">
              <a
                href={selectedCert.image}
                download={`${selectedCert.id}.jpg`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#070D14] bg-[#38BDF8] hover:bg-[#7DD3FC] shadow-lg shadow-[#38BDF8]/20 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#070D14]" />
                <span>Download Certificate</span>
              </a>

              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-[#F0F9FF] bg-[#08101A] hover:bg-[#1E3A5F]/30 border border-[#1E3A5F] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
