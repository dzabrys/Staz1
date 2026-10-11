/* Content is visible by default, including when JS or observer support is absent. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate || preference.matches) return;
  const active = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target;
      observer.unobserve(element);
      if (preference.matches) continue;
      const base = getComputedStyle(element).transform;
      const siblings = [...element.parentElement.children].filter(child => child.matches('.game-card, .feature, .steps > li'));
      const delay = Math.min(Math.max(siblings.indexOf(element), 0) * 65, 195);
      element.classList.add('motion-arrived');
      const animation = element.animate([
        { opacity: .45, transform: `translateY(16px) ${base === 'none' ? '' : base}` },
        { opacity: 1, transform: base }
      ], { duration: 620, delay, easing: 'cubic-bezier(.16,1,.3,1)' });
      active.add(animation);
      animation.finished.then(() => active.delete(animation)).catch(() => active.delete(animation));
    }
  }, { threshold: .08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.subpage-intro, .subpage-aside, .games-section > h2, .process > h2, .benefits > h2, .subpage-footer > h2, .game-card, .steps > li, .benefits .feature, .subpage-footer .feature, .audience')
    .forEach(element => observer.observe(element));
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer.disconnect();
    for (const animation of active) animation.cancel();
    active.clear();
  });
})();
