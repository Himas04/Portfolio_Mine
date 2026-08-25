import React from 'react';

export default function BrandLogo({ size = 'md', showBadge = true }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  }[size] || 'w-10 h-10 text-sm';

  return (
    <div className={`relative ${sizeClasses} rounded-2xl p-[2px] bg-gradient-to-br from-[#7DD3FC] via-[#38BDF8] to-[#2DD4BF] shadow-lg shadow-[#38BDF8]/20 group-hover:shadow-[#38BDF8]/50 transition-all duration-300 group-hover:scale-105 group-hover:rotate-2`}>
      {/* Inner Cyber Glass Box */}
      <div className="w-full h-full rounded-[14px] bg-[#070D14] flex items-center justify-center border border-[#1E3A5F] overflow-hidden relative">
        
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/20 to-[#2DD4BF]/10 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Vector Razor-Sharp Cyber Monogram Icon */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
        >
          {/* Tech Hex Shield Outline */}
          <path
            d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
            stroke="url(#glacierGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 'H' Cyber Monogram with Tech Notch */}
          <path
            d="M14 14V26M26 14V26M14 20H26"
            stroke="#F0F9FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center Energy Pulse Node */}
          <circle cx="20" cy="20" r="2" fill="#2DD4BF" />
          
          <defs>
            <linearGradient id="glacierGrad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7DD3FC" />
              <stop offset="0.5" stopColor="#38BDF8" />
              <stop offset="1" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>

      </div>

      {/* Online Status Green/Cyan Dot */}
      {showBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#2DD4BF] border-2 border-[#070D14] shadow-sm shadow-[#2DD4BF] animate-pulse" />
      )}
    </div>
  );
}
