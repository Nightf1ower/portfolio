(() => {
  if (window.__desktopSiteExperienceLoaderV30) return;
  window.__desktopSiteExperienceLoaderV30 = true;
  window.__desktopSiteExperienceV1 = true;

  const load = (src, marker) => {
    if (document.querySelector(`script[data-runtime-marker="${marker}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.dataset.runtimeMarker = marker;
    script.async = false;
    document.head.append(script);
  };

  load('/about-content-update.js?v=about-content-update-4', 'about-content-update-4');
  load('/portfolio-mobile-gestures-v2.js?v=portfolio-mobile-gestures-2', 'portfolio-mobile-gestures-2');
  load('/portfolio-mobile-touchend-guard-v3.js?v=portfolio-mobile-touchend-guard-3', 'portfolio-mobile-touchend-guard-3');
  load('/portfolio-final-qa-fixes.js?v=portfolio-final-qa-fixes-5', 'portfolio-final-qa-fixes-5');
  load('/blandetto-print-layout-restore.js?v=blandetto-print-layout-restore-1', 'blandetto-print-layout-restore-1');
  load('/portfolio-stable-project-shell.js?v=portfolio-stable-project-shell-2', 'portfolio-stable-project-shell-2');
  load('/pink-punk-layout.js?v=pink-layout-5', 'pink-layout-5');
  load('/portfolio-intro-dedupe-final.js?v=portfolio-intro-dedupe-final-3', 'portfolio-intro-dedupe-final-3');
})();
