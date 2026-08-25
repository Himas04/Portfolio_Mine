import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 100;
const IMAGE_NATURAL_WIDTH = 1920;
const IMAGE_NATURAL_HEIGHT = 1080;

// Section ambient accent glows
const SECTION_AMBIENTS = {
  hero: 'radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
  about: 'radial-gradient(circle at 20% 40%, rgba(45, 212, 191, 0.12) 0%, transparent 60%)',
  experience: 'radial-gradient(circle at 80% 50%, rgba(56, 189, 248, 0.12) 0%, transparent 65%)',
  projects: 'radial-gradient(circle at 50% 60%, rgba(125, 211, 252, 0.14) 0%, transparent 70%)',
  skills: 'radial-gradient(circle at 30% 70%, rgba(45, 212, 191, 0.12) 0%, transparent 60%)',
  education: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.12) 0%, transparent 65%)',
  certificates: 'radial-gradient(circle at 50% 65%, rgba(45, 212, 191, 0.14) 0%, transparent 65%)',
  contact: 'radial-gradient(circle at 50% 80%, rgba(56, 189, 248, 0.16) 0%, transparent 70%)'
};

const getFramePath = (index) => {
  const padded = String(index).padStart(3, '0');
  return `/assets/Images/ezgif-frame-${padded}.png`;
};

export default function BackgroundCanvas({ activeSection = 'hero' }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES + 1));
  const loadedSetRef = useRef(new Set());
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const isRunningRef = useRef(false);
  const isReadyRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cached geometry bounds for instantaneous GPU rendering
  const boundsRef = useRef({ cw: 0, ch: 0, rw: 0, rh: 0, ox: 0, oy: 0 });

  // 1. ⚡ PARALLEL PRELOADER FOR ORIGINAL PNG IMAGES
  useEffect(() => {
    let isMounted = true;
    const images = new Array(TOTAL_FRAMES + 1);

    const loadSingleImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);

        img.onload = () => {
          if (!isMounted) return resolve(img);
          loadedSetRef.current.add(index);
          images[index] = img;

          // Render first frame immediately
          if (index === 1 && !isReadyRef.current) {
            isReadyRef.current = true;
            setIsLoaded(true);
            drawSubFrame(1.0);
          }
          resolve(img);
        };

        img.onerror = () => {
          resolve(null);
        };

        images[index] = img;
      });
    };

    imagesRef.current = images;

    // Load initial 10 frames with priority
    const priorityBatch = [];
    for (let i = 1; i <= Math.min(10, TOTAL_FRAMES); i++) {
      priorityBatch.push(loadSingleImage(i));
    }

    Promise.all(priorityBatch).then(() => {
      if (!isMounted) return;
      // Load remaining frames
      for (let i = 11; i <= TOTAL_FRAMES; i++) {
        loadSingleImage(i);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. 🎬 ULTRA-FLUID SUB-FRAME ALPHA CROSS-FADING ENGINE
  const drawSubFrame = useCallback((frameFloat) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
    if (!ctx) return;

    const { cw, ch, rw, rh, ox, oy } = boundsRef.current;
    if (cw === 0 || ch === 0) return;

    const clamped = Math.max(1, Math.min(TOTAL_FRAMES, frameFloat));
    const floorIndex = Math.floor(clamped);
    const ceilIndex = Math.min(TOTAL_FRAMES, floorIndex + 1);
    const fraction = clamped - floorIndex;

    let baseImg = imagesRef.current[floorIndex];
    let nextImg = imagesRef.current[ceilIndex];

    // Fallback if specific frame is buffering
    if (!baseImg || !baseImg.complete) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = floorIndex - offset;
        const next = floorIndex + offset;
        if (prev >= 1 && loadedSetRef.current.has(prev)) {
          baseImg = imagesRef.current[prev];
          break;
        }
        if (next <= TOTAL_FRAMES && loadedSetRef.current.has(next)) {
          baseImg = imagesRef.current[next];
          break;
        }
      }
    }

    if (!nextImg || !nextImg.complete) {
      nextImg = baseImg;
    }

    if (!baseImg || !baseImg.complete) return;

    // Draw primary frame (100% solid opacity)
    ctx.globalAlpha = 1.0;
    ctx.drawImage(baseImg, 0, 0, IMAGE_NATURAL_WIDTH, IMAGE_NATURAL_HEIGHT, ox, oy, rw, rh);

    // Continuous Sub-frame alpha blend for liquid video fluidity
    if (fraction > 0.005 && floorIndex !== ceilIndex && nextImg && nextImg.complete) {
      ctx.globalAlpha = fraction;
      ctx.drawImage(nextImg, 0, 0, IMAGE_NATURAL_WIDTH, IMAGE_NATURAL_HEIGHT, ox, oy, rw, rh);
    }
  }, []);

  // 3. 🎯 BUTTER-SMOOTH CONTINUOUS INTERPOLATION ENGINE
  useEffect(() => {
    let animId = null;
    let lastTime = performance.now();

    const setupCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = window.innerWidth;
        const h = window.innerHeight;

        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);

        const iw = IMAGE_NATURAL_WIDTH;
        const ih = IMAGE_NATURAL_HEIGHT;
        const scale = Math.max(canvas.width / iw, canvas.height / ih);
        const rw = Math.round(iw * scale);
        const rh = Math.round(ih * scale);
        const ox = Math.round((canvas.width - rw) * 0.5);
        const oy = Math.round((canvas.height - rh) * 0.5);

        boundsRef.current = {
          cw: canvas.width,
          ch: canvas.height,
          rw,
          rh,
          ox,
          oy
        };

        drawSubFrame(currentFrameRef.current);
      }
    };

    setupCanvasSize();

    // High-performance continuous damping loop
    const animate = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        // Smooth exponential follow
        const factor = 1 - Math.exp(-14 * dt);
        currentFrameRef.current += diff * factor;

        drawSubFrame(currentFrameRef.current);
        animId = requestAnimationFrame(animate);
      } else {
        currentFrameRef.current = target;
        drawSubFrame(target);
        isRunningRef.current = false;
      }
    };

    const startAnimationLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(animate);
      }
    };

    // Instant Passive Scroll Listener
    const onScroll = () => {
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - window.innerHeight;

      if (totalScroll > 0) {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const progress = Math.min(Math.max(scrollY / totalScroll, 0), 1);
        const nextTarget = 1 + progress * (TOTAL_FRAMES - 1);

        targetFrameRef.current = nextTarget;
        startAnimationLoop();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setupCanvasSize, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setupCanvasSize);
      if (animId) cancelAnimationFrame(animId);
      isRunningRef.current = false;
    };
  }, [drawSubFrame]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050B12] transform-gpu">
      
      {/* 🎬 1. ORIGINAL FULL HD PNG SCROLLYTELLING CANVAS */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 transform-gpu ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          imageRendering: 'auto'
        }}
      />

      {/* 🌓 2. SUBTLE AMBIENT ACCENTS */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out opacity-60 pointer-events-none"
        style={{ background: SECTION_AMBIENTS[activeSection] || SECTION_AMBIENTS.hero }}
      />

      {/* 🕸️ 3. Ultra-subtle cyber grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* 🌑 4. Ultra-light vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050B12]/20 via-transparent to-[#050B12]/35 pointer-events-none" />

      {/* 🏷️ 5. Section Watermark */}
      <div className="absolute bottom-6 right-8 text-[120px] font-black uppercase tracking-widest text-[#38BDF8]/[0.03] select-none pointer-events-none hidden md:block">
        {activeSection}
      </div>

    </div>
  );
}
