export const smoothScrollTo = (targetY: number, duration = 600) => {
  // @param: duration is in ms
  
  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOutQuad = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + difference * easeInOutQuad);

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};