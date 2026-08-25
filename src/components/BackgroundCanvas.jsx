import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 100;

// Section ambient glow overlays for Nordic Glacier & Ice Cyan
const SECTION_AMBIENTS = {
  hero: 'radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.2) 0%, transparent 65%)',
  about: 'radial-gradient(circle at 20% 40%, rgba(45, 212, 191, 0.16) 0%, transparent 55%)',
  experience: 'radial-gradient(circle at 80% 50%, rgba(56, 189, 248, 0.18) 0%, transparent 60%)',
  projects: 'radial-gradient(circle at 50% 60%, rgba(125, 211, 252, 0.18) 0%, transparent 65%)',
  skills: 'radial-gradient(circle at 30% 70%, rgba(45, 212, 191, 0.16) 0%, transparent 55%)',
  education: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.18) 0%, transparent 60%)',
  certificates: 'radial-gradient(circle at 50% 65%, rgba(45, 212, 191, 0.2) 0%, transparent 60%)',
  contact: 'radial-gradient(circle at 50% 80%, rgba(56, 189, 248, 0.22) 0%, transparent 65%)'
};

const getFramePath = (index) => {
  const padded = String(index).padStart(3, '0');
  return `/assets/Images/ezgif-frame-${padded}.jpg`;
};

export default function BackgroundCanvas({ activeSection = 'hero' }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedSetRef = useRef(new Set());
  const lastDrawnFrameRef = useRef(-1);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const isReadyRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. ⚡ ULTRA-FAST ASYNC RAM PRELOADER
  useEffect(() => {
    let isMounted = true;
    const images = new Array(TOTAL_FRAMES + 1);

    const loadSingleFrame = async (index) => {
      const img = new Image();
      img.src = getFramePath(index);
      images[index] = img;

      try {
        if ('decode' in img) {
          await img.decode();
        } else {
          await new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          });
        }
      } catch (err) {
        // Safe fallback
      }

      if (!isMounted) return img;
      loadedSetRef.current.add(index);

      // Draw frame 1 immediately when loaded
      if (index === 1 && !isReadyRef.current) {
        isReadyRef.current = true;
        setIsLoaded(true);
        drawFrame(1);
      }
      return img;
    };

    imagesRef.current = images;

    // Load initial 20 frames with top priority
    const priorityBatch = [];
    for (let i = 1; i <= Math.min(20, TOTAL_FRAMES); i++) {
      priorityBatch.push(loadSingleFrame(i));
    }

    Promise.all(priorityBatch).then(() => {
      if (!isMounted) return;

      // Load remaining frames in background idle chunks
      let idx = 21;
      const loadNextBatch = () => {
        if (!isMounted || idx > TOTAL_FRAMES) return;
        const chunk = [];
        for (let b = 0; b < 15 && idx <= TOTAL_FRAMES; b++, idx++) {
          chunk.push(loadSingleFrame(idx));
        }

        Promise.all(chunk).then(() => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextBatch, { timeout: 80 });
          } else {
            setTimeout(loadNextBatch, 16);
          }
        });
      };

      loadNextBatch();
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. 🚀 RAZOR-SHARP HIGH-QUALITY DIRECT GPU BLIT
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    // Enable high-quality image smoothing for razor-sharp clarity
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let img = imagesRef.current[frameIndex];

    // Fallback to nearest loaded frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      if (lastDrawnFrameRef.current > 0 && imagesRef.current[lastDrawnFrameRef.current]?.complete) {
        img = imagesRef.current[lastDrawnFrameRef.current];
      } else {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = frameIndex - offset;
          const next = frameIndex + offset;
          if (prev >= 1 && loadedSetRef.current.has(prev)) {
            img = imagesRef.current[prev];
            break;
          }
          if (next <= TOTAL_FRAMES && loadedSetRef.current.has(next)) {
            img = imagesRef.current[next];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const rw = iw * scale;
    const rh = ih * scale;
    const ox = (cw - rw) * 0.5;
    const oy = (ch - rh) * 0.5;

    ctx.drawImage(img, 0, 0, iw, ih, ox, oy, rw, rh);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // 3. 🎯 ULTRA-SMOOTH RAF ANIMATION LOOP (Retina Clarity & High FPS)
  useEffect(() => {
    let animId = null;
    let ticking = false;

    // Razor-Sharp High-Definition Buffer
    const setupCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        
        if (lastDrawnFrameRef.current > 0) {
          drawFrame(lastDrawnFrameRef.current);
        }
      }
    };

    setupCanvasSize();

    // Smooth Lerp Animation Loop
    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.08) {
        currentFrameRef.current += diff * 0.28;
        const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));
        if (frameIndex !== lastDrawnFrameRef.current) {
          drawFrame(frameIndex);
        }
      } else {
        currentFrameRef.current = target;
        if (target !== lastDrawnFrameRef.current) {
          drawFrame(target);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Passive Scroll Listener
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const progress = Math.min(Math.max((window.scrollY || window.pageYOffset) / totalScroll, 0), 1);
            targetFrameRef.current = Math.min(TOTAL_FRAMES, Math.max(1, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setupCanvasSize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setupCanvasSize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#070D14] transform-gpu will-change-transform">
      
      {/* 🎬 1. HIGH-CLARITY RETINA 100-FRAME SCROLLYTELLING CANVAS */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 transform-gpu will-change-transform ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          imageRendering: '-webkit-optimize-contrast'
        }}
      />

      {/* 🌓 2. NORDIC GLACIER & ICE CYAN AMBIENT GLOW OVERLAYS */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out mix-blend-screen opacity-75 pointer-events-none"
        style={{ background: SECTION_AMBIENTS[activeSection] || SECTION_AMBIENTS.hero }}
      />

      {/* 🕸️ 3. Sub-pixel Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 mix-blend-overlay pointer-events-none" />

      {/* 🌑 4. Deep Ocean Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/55 via-[#070D14]/30 to-[#070D14]/75 pointer-events-none" />

      {/* 🏷️ 5. Section Watermark */}
      <div className="absolute bottom-6 right-8 text-[120px] font-black uppercase tracking-widest text-[#38BDF8]/[0.03] select-none pointer-events-none hidden md:block">
        {activeSection}
      </div>

    </div>
  );
}
