(() => {
  // Legacy dedupe is retired. Duplicate removal now happens once, synchronously,
  // inside portfolio-stable-project-shell before the project is painted.
  if (window.__portfolioIntroDedupeFinalV4) return;
  window.__portfolioIntroDedupeFinalV4 = true;
  window.__portfolioIntroDedupeFinalV3 = true;
  document.getElementById('portfolio-intro-dedupe-final-style')?.remove();
})();
