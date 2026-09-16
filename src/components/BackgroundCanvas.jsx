import React, { useEffect, useRef } from 'react';

// Section-Mood Atmospheric Aurora Gradients
const SECTION_AMBIENTS = {
  hero: 'radial-gradient(circle at 50% 20%, rgba(0, 217, 255, 0.22) 0%, rgba(124, 58, 237, 0.12) 35%, rgba(11, 18, 32, 0.05) 60%, transparent 75%)',
  about: 'radial-gradient(circle at 25% 35%, rgba(45, 212, 191, 0.22) 0%, rgba(0, 217, 255, 0.10) 40%, transparent 70%)',
  experience: 'radial-gradient(circle at 75% 45%, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 70%)',
  projects: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.24) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 75%)',
  skills: 'radial-gradient(circle at 35% 60%, rgba(124, 58, 237, 0.22) 0%, rgba(129, 140, 248, 0.12) 45%, transparent 70%)',
  education: 'radial-gradient(circle at 65% 35%, rgba(56, 189, 248, 0.20) 0%, rgba(45, 212, 191, 0.10) 45%, transparent 70%)',
  certificates: 'radial-gradient(circle at 50% 65%, rgba(45, 212, 191, 0.22) 0%, rgba(0, 217, 255, 0.10) 45%, transparent 70%)',
  contact: 'radial-gradient(circle at 50% 80%, rgba(0, 217, 255, 0.25) 0%, rgba(124, 58, 237, 0.14) 45%, transparent 75%)'
};

// Subtle engineering telemetry strings for negative-space atmosphere
const TELEMETRY_SNIPPETS = [
  'PIPELINE // RUNNING',
  'TEST SUITE // 42 PASS',
  'CLUSTER // US-EAST-1',
  'DOCKER // HEALTHY',
  'API // 200 OK',
  'GIT // COMMIT SYNCED'
];

export default function BackgroundCanvas({ activeSection = 'hero' }) {
  const canvasRef = useRef(null);
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isTabActive = true;
    let animId = null;

    // Mouse tracking for interactive laser web
    const mouse = { x: -1000, y: -1000, radius: 140 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Particle System (55 lightweight floating nodes)
    const PARTICLE_COUNT = 55;
    const particles = [];
    const colors = ['#00D9FF', '#2DD4BF', '#38BDF8', '#818CF8'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseVx: (Math.random() - 0.5) * 0.45,
        baseVy: (Math.random() - 0.5) * 0.45,
        radius: 1.2 + Math.random() * 1.5,
        color: colors[i % colors.length],
        alpha: 0.2 + Math.random() * 0.35,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }

    // 60 FPS Render Loop
    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isTabActive) return;

      ctx.clearRect(0, 0, width, height);

      const section = activeSectionRef.current;

      // Section-specific behavioral adjustments
      let targetDx = 0;
      let targetDy = 0;

      if (section === 'experience') {
        targetDy = -0.3; // subtle upward deployment flow
      } else if (section === 'contact') {
        // particles gravitate gently towards center
      }

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Section behavioral steering
        if (section === 'contact') {
          const centerX = width / 2;
          const centerY = height / 2;
          p.x += (centerX - p.x) * 0.001;
          p.y += (centerY - p.y) * 0.001;
        }

        p.x += p.vx + targetDx;
        p.y += p.vy + targetDy;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse avoidance/interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.8;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;

          // Connect cursor to particle with a subtle cyan laser hairline
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(0, 217, 255, ${(1 - dist / mouse.radius) * 0.25})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // Pulse opacity
        p.pulseAngle += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulseAngle) * 0.1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(currentAlpha, 0.7));
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 2. Connect nearby particles with subtle cyber constellation hairlines
      const MAX_DISTANCE = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (d < MAX_DISTANCE) {
            const lineAlpha = (1 - d / MAX_DISTANCE) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#05070D] transform-gpu">
      {/* 🌓 1. Dynamic Section-Mood Atmospheric Aurora Shifts */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out opacity-90 pointer-events-none"
        style={{ background: SECTION_AMBIENTS[activeSection] || SECTION_AMBIENTS.hero }}
      />

      {/* 🔮 2. Subtle Floating Atmospheric Mesh Orbs */}
      <div className="absolute -top-[25%] -left-[15%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#00D9FF]/12 via-[#7C3AED]/8 to-transparent blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-[#2DD4BF]/12 via-[#00D9FF]/6 to-transparent blur-[150px] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute -bottom-[25%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-[#7C3AED]/12 via-[#1E3A5F]/20 to-transparent blur-[160px] pointer-events-none animate-pulse duration-[12000ms]" />

      {/* 🕸️ 3. Ultra-Subtle Cyber Tech Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* 🌌 4. Interactive Constellation Canvas Across All Sections */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* 🌑 5. Deep Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/60 via-transparent to-[#05070D]/80 pointer-events-none" />

      {/* 🏷️ 6. Faint Architectural Section Watermark (Far Bottom Right) */}
      <div className="absolute bottom-6 right-8 text-[110px] font-black uppercase tracking-widest text-[#00D9FF]/[0.025] select-none pointer-events-none hidden md:block">
        {activeSection}
      </div>
    </div>
  );
}
