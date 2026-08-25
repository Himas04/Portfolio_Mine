// 🚀 Cinematic Smooth Scroll with Native easeInOutCubic Curve
export const smoothScrollTo = (targetIdOrY, duration = 750) => {
  let targetY = 0;
  
  if (typeof targetIdOrY === 'string') {
    const cleanId = targetIdOrY.replace(/^#/, '');
    if (cleanId === 'hero' || cleanId === 'top' || !cleanId) {
      targetY = 0;
    } else {
      const element = document.getElementById(cleanId);
      if (element) {
        const navOffset = 72; // Space for sticky navbar
        const rect = element.getBoundingClientRect();
        targetY = rect.top + window.pageYOffset - navOffset;
      } else {
        return;
      }
    }
  } else if (typeof targetIdOrY === 'number') {
    targetY = targetIdOrY;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  let startTime = null;

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const step = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(startY + distance * ease));

    if (timeElapsed < duration) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
    }
  };

  requestAnimationFrame(step);
};
