import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 100;

// Section ambient glow overlays for Nordic Glacier & Ice Cyan
const SECTION_AMBIENTS = {
  hero: 'radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.22) 0%, transparent 65%)',
  about: 'radial-gradient(circle at 20% 40%, rgba(45, 212, 191, 0.18) 0%, transparent 55%)',
  experience: 'radial-gradient(circle at 80% 50%, rgba(56, 189, 248, 0.2) 0%, transparent 60%)',
  projects: 'radial-gradient(circle at 50% 60%, rgba(125, 211, 252, 0.2) 0%, transparent 65%)',
  skills: 'radial-gradient(circle at 30% 70%, rgba(45, 212, 191, 0.18) 0%, transparent 55%)',
  education: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.2) 0%, transparent 60%)',
  certificates: 'radial-gradient(circle at 50% 65%, rgba(45, 212, 191, 0.22) 0%, transparent 60%)',
  contact: 'radial-gradient(circle at 50% 80%, rgba(56, 189, 248, 0.24) 0%, transparent 65%)'
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
  const isRunningRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. ⚡ CONCURRENT ASYNC PRELOADER & GPU TEXTURE DECODER (ALL 100 FRAMES)
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
        // Fallback for decode error
      }

      if (!isMounted) return img;
      loadedSetRef.current.add(index);

      // Draw initial frame as soon as frame 1 is decoded
      if (index === 1 && !isReadyRef.current) {
        isReadyRef.current = true;
        setIsLoaded(true);
        drawFrame(1);
      }
      return img;
    };

    imagesRef.current = images;

    // Load first 15 frames immediately for instant rendering
    const initialBatch = [];
    for (let i = 1; i <= Math.min(15, TOTAL_FRAMES); i++) {
      initialBatch.push(loadSingleFrame(i));
    }

    Promise.all(initialBatch).then(() => {
      if (!isMounted) return;

      // Concurrently load the rest of the 85 frames (total size is only ~3.5MB)
      const remainingBatches = [];
      for (let i = 16; i <= TOTAL_FRAMES; i++) {
        remainingBatches.push(loadSingleFrame(i));
      }
      Promise.all(remainingBatches);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. 🚀 HIGH-PERFORMANCE DIRECT GPU 2D DRAWING
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
    if (!ctx) return;

    // Use fast hardware bilinear interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

    let img = imagesRef.current[frameIndex];

    // Safe fallback if target frame is still decoding
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

    // Cover scale calculation
    const scale = Math.max(cw / iw, ch / ih);
    const rw = iw * scale;
    const rh = ih * scale;
    const ox = (cw - rw) * 0.5;
    const oy = (ch - rh) * 0.5;

    ctx.drawImage(img, 0, 0, iw, ih, ox, oy, rw, rh);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // 3. 🎯 BUTTERY SMOOTH 60/120 FPS SCROLL-SYNCED LERP ENGINE
  useEffect(() => {
    let animId = null;

    const setupCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Balanced DPR for optimal sharpness without 4K GPU fill-rate throttling
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

    // Fluid Animation Loop with Adaptive Dynamic Damping
    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        // Smooth lerp follow factor (0.16 offers ultra-smooth buttery inertia)
        currentFrameRef.current += diff * 0.16;
        const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));

        if (frameIndex !== lastDrawnFrameRef.current) {
          drawFrame(frameIndex);
        }
        animId = requestAnimationFrame(animate);
      } else {
        // Snap to exact target and pause RAF when resting to save CPU/GPU cycles
        currentFrameRef.current = target;
        if (target !== lastDrawnFrameRef.current) {
          drawFrame(target);
        }
        isRunningRef.current = false;
      }
    };

    const startAnimationLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animId = requestAnimationFrame(animate);
      }
    };

    // Native Passive Scroll Listener
    const onScroll = () => {
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const progress = Math.min(Math.max(scrollY / totalScroll, 0), 1);
        const nextTarget = Math.min(
          TOTAL_FRAMES,
          Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1)
        );

        if (nextTarget !== targetFrameRef.current) {
          targetFrameRef.current = nextTarget;
          startAnimationLoop();
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setupCanvasSize, { passive: true });

    // Initial check & draw
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setupCanvasSize);
      if (animId) cancelAnimationFrame(animId);
      isRunningRef.current = false;
    };
  }, [drawFrame]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#070D14] transform-gpu">
      
      {/* 🎬 1. HIGH-SPEED DIRECT GPU SCROLLYTELLING CANVAS */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 transform-gpu ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* 🌓 2. NORDIC GLACIER & ICE CYAN AMBIENT GLOW OVERLAYS */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out opacity-80 pointer-events-none"
        style={{ background: SECTION_AMBIENTS[activeSection] || SECTION_AMBIENTS.hero }}
      />

      {/* 🕸️ 3. Sub-pixel Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* 🌑 4. Deep Ocean Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/50 via-[#070D14]/25 to-[#070D14]/70 pointer-events-none" />

      {/* 🏷️ 5. Section Watermark */}
      <div className="absolute bottom-6 right-8 text-[120px] font-black uppercase tracking-widest text-[#38BDF8]/[0.03] select-none pointer-events-none hidden md:block">
        {activeSection}
      </div>

    </div>
  );
}
