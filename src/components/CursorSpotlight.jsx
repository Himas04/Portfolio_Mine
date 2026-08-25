import React, { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    // Only run on devices with hover / fine pointer (desktops & laptops)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const spotlightEl = spotlightRef.current;
    if (!spotlightEl) return;

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;
    let animId = null;
    let isMoving = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        spotlightEl.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isMoving = false;
      spotlightEl.style.opacity = '0';
    };

    // 🚀 Pure GPU transform loop (Zero reflows, Zero DOM queries)
    const render = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      spotlightEl.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-30 opacity-0 transition-opacity duration-300 transform-gpu will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(45, 212, 191, 0.06) 40%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
    />
  );
}
