import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
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
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  Sparkles
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
  const [hoveredCert, setHoveredCert] = useState(null);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Mobile Touch / Swipe Gesture Tracking
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const minSwipeDistance = 45;

  const categories = ['ALL', 'Cloud & DevOps', 'QA & Software Testing', 'Networking & Security', 'IT Systems & Support'];

  const filteredCerts = activeCategory === 'ALL'
    ? resumeData.certifications
    : resumeData.certifications.filter(c => c.category === activeCategory);

  const maxIndex = Math.max(0, filteredCerts.length - itemsPerPage);

  // Responsive items per page
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

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // 🔄 AUTO-SCROLL ENGINE (Pauses immediately on hover or modal open)
  useEffect(() => {
    if (!isAutoScrollActive || hoveredCert !== null || selectedCert !== null || maxIndex <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3600);

    return () => clearInterval(interval);
  }, [isAutoScrollActive, hoveredCert, selectedCert, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleCopyId = (certId, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(certId);
    setCopiedId(certId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const visibleCerts = filteredCerts.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-glossy border border-[#00D9FF]/30 text-[#7DD3FC] text-xs font-mono tracking-wider uppercase backdrop-blur-xl shadow-lg shadow-black/30">
            <Award className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
            Professional <span className="gradient-text-hero">Certifications</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto drop-shadow-sm">
            Official industry-certified credentials in AWS Cloud Computing, Automated SDLC QA Testing, and Enterprise IT Systems.
          </p>

          {/* ⚡ Auto-Scroll Live Status & Interactive Pause/Play Pill */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAutoScrollActive(!isAutoScrollActive)}
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                isAutoScrollActive && !hoveredCert
                  ? 'bg-[#0B1220]/80 border-[#00D9FF]/40 text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.15)]'
                  : 'bg-[#0B1220]/60 border-white/10 text-[#94A3B8] hover:text-[#FFFFFF]'
              }`}
              title="Toggle Auto-Scroll"
            >
              {isAutoScrollActive && !hoveredCert ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
                  <span>Auto-Scrolling • Hover to Inspect</span>
                  <Pause className="w-3 h-3 text-[#00D9FF] ml-1" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Paused {hoveredCert ? '(Inspecting)' : ''}</span>
                  <Play className="w-3 h-3 text-[#7DD3FC] ml-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Tabs & Navigation Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#00D9FF] to-[#38BDF8] text-[#05070D] font-bold shadow-[0_0_20px_rgba(0,217,255,0.3)] scale-105'
                    : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Slider Controls (Previous & Next) */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-[#94A3B8]">
              <span className="text-[#00D9FF] font-bold">{Math.min(currentIndex + 1, filteredCerts.length)}</span> - <span className="text-[#00D9FF] font-bold">{Math.min(currentIndex + itemsPerPage, filteredCerts.length)}</span> of <span className="text-[#FFFFFF] font-bold">{filteredCerts.length}</span>
            </div>

            <button
              onClick={handlePrev}
              aria-label="Previous Certificate"
              className="p-2.5 rounded-xl glass-glossy border border-white/10 hover:border-[#00D9FF] text-[#FFFFFF] transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 text-[#00D9FF]" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Certificate"
              className="p-2.5 rounded-xl glass-glossy border border-white/10 hover:border-[#00D9FF] text-[#FFFFFF] transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <ChevronRight className="w-4 h-4 text-[#00D9FF]" />
            </button>
          </div>
        </div>

        {/* 🌟 AUTO-SCROLLING CAROUSEL WITH INSTANT HOVER DETAILS INSPECTION */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 select-none"
        >
          {visibleCerts.map((cert) => {
            const CategoryIcon = CATEGORY_ICONS[cert.category] || Award;
            const isCopied = copiedId === cert.certificateId;
            const isHovered = hoveredCert?.id === cert.id;

            return (
              <div
                key={cert.id}
                onMouseEnter={() => setHoveredCert(cert)}
                onMouseLeave={() => setHoveredCert(null)}
                onClick={() => setSelectedCert(cert)}
                className={`group relative glass-glossy rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between shadow-2xl cursor-pointer overflow-hidden ${
                  isHovered
                    ? 'border-[#00D9FF] -translate-y-2 shadow-[0_20px_45px_rgba(0,217,255,0.25)] ring-1 ring-[#00D9FF]/40'
                    : 'border-white/10 hover:border-[#00D9FF]/50 hover:-translate-y-1'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Certificate Image Thumbnail with Hover Glaze */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-white/[0.02] shadow-inner group/thumb">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/85 via-[#05070D]/25 to-transparent opacity-65 group-hover/thumb:opacity-20 transition-opacity" />
                    
                    {/* View Button */}
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-[#FFFFFF] flex items-center gap-1.5 shadow-lg group-hover/thumb:bg-[#00D9FF] group-hover/thumb:text-[#05070D] transition-all">
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand</span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#7DD3FC]">
                      <CategoryIcon className="w-3 h-3 text-[#00D9FF]" />
                      <span>{cert.badge}</span>
                    </div>
                  </div>

                  {/* Issuer & Title */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#94A3B8] font-mono mb-1">
                      <span className="text-[#00D9FF] font-bold">{cert.issuer.split(' / ')[0]}</span>
                      <span className="text-[#FFFFFF]">{cert.date}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] group-hover:text-[#7DD3FC] transition-colors leading-snug line-clamp-2">
                      {cert.title}
                    </h3>
                  </div>

                  {/* 🔍 ON-HOVER EXPANDED DETAILS INSPECTOR */}
                  {isHovered ? (
                    <div className="p-3 rounded-2xl bg-black/60 border border-[#00D9FF]/40 backdrop-blur-xl space-y-2 animate-in fade-in zoom-in-95 duration-200 shadow-xl">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#94A3B8]">Duration:</span>
                        <span className="text-[#7DD3FC] font-bold">{cert.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#94A3B8]">Signatory:</span>
                        <span className="text-[#FFFFFF] font-medium truncate max-w-[170px]">{cert.signatory}</span>
                      </div>
                      <div className="pt-1.5 border-t border-white/10">
                        <span className="text-[10px] font-mono text-[#94A3B8] block mb-1">Skills Verified:</span>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] px-2 py-0.5 rounded-md bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30 font-mono"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Default compact skills view */
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 font-mono text-[#94A3B8]"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[#7DD3FC] border border-white/10">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                </div>

                {/* Bottom Row: Certificate ID & Copy Action */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="text-[10px] font-mono text-[#94A3B8] truncate max-w-[160px]" title={cert.certificateId}>
                    ID: <span className="text-[#7DD3FC]">{cert.certificateId.slice(0, 10)}...</span>
                  </div>

                  <button
                    onClick={(e) => handleCopyId(cert.certificateId, e)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-[#FFFFFF] transition-all cursor-pointer backdrop-blur-sm shadow-sm"
                    title="Copy Certificate ID"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-[#2DD4BF]" />
                        <span className="text-[10px] text-[#2DD4BF]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#00D9FF]" />
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
                    ? 'w-8 bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]'
                    : 'w-2 bg-white/20 hover:bg-[#00D9FF]/60'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* 📜 High-Resolution Certificate Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-glossy p-6 sm:p-8 rounded-3xl border border-[#00D9FF]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-6 backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-xl text-[#94A3B8] hover:text-[#FFFFFF] bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5 text-[#00D9FF]" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-10 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider">
                  {selectedCert.issuer}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs font-mono text-[#94A3B8]">{selectedCert.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#FFFFFF] tracking-tight">
                {selectedCert.title}
              </h3>
            </div>

            {/* High-Res Certificate Image Display */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            {/* Certificate Meta Information Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-0.5 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-[#94A3B8] block">Recipient</span>
                <span className="text-xs font-bold text-[#FFFFFF]">{resumeData.personal.name}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-0.5 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-[#94A3B8] block">Duration / Credit</span>
                <span className="text-xs font-bold text-[#7DD3FC]">{selectedCert.duration}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-0.5 col-span-2 sm:col-span-1 backdrop-blur-sm">
                <span className="text-[10px] font-mono text-[#94A3B8] block">Signatory</span>
                <span className="text-xs font-bold text-[#FFFFFF]">{selectedCert.signatory}</span>
              </div>
            </div>

            {/* Certificate Verification ID Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 backdrop-blur-sm">
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase tracking-wider">
                Official Certificate Verification ID:
              </span>
              <div className="flex items-center justify-between gap-3 bg-black/50 p-3 rounded-xl border border-white/10 font-mono text-xs text-[#7DD3FC] break-all select-all">
                <span>{selectedCert.certificateId}</span>
                <button
                  onClick={(e) => handleCopyId(selectedCert.certificateId, e)}
                  className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[#FFFFFF] shrink-0 transition-colors cursor-pointer"
                  title="Copy ID"
                >
                  {copiedId === selectedCert.certificateId ? (
                    <Check className="w-4 h-4 text-[#2DD4BF]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#00D9FF]" />
                  )}
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between">
              <a
                href={selectedCert.image}
                download={`${selectedCert.id}.jpg`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-[#05070D] bg-gradient-to-r from-[#00D9FF] to-[#38BDF8] hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#05070D]" />
                <span>Download Certificate</span>
              </a>

              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-3 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-[#FFFFFF] bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors cursor-pointer"
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
