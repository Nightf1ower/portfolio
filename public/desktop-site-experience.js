(() => {
  if (window.__desktopSiteExperienceLoaderV20) return;
  window.__desktopSiteExperienceLoaderV20 = true;
  window.__desktopSiteExperienceV1 = true;

  const load = (src, marker) => {
    if (document.querySelector(`script[data-runtime-marker="${marker}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.dataset.runtimeMarker = marker;
    script.async = false;
    document.head.append(script);
  };

  load('/contact-email-runtime-v2.js?v=contact-email-runtime-2', 'contact-email-2');
  load('/portfolio-mobile-gestures-v2.js?v=portfolio-mobile-gestures-2', 'portfolio-mobile-gestures-2');
  load('/portfolio-mobile-touchend-guard-v3.js?v=portfolio-mobile-touchend-guard-3', 'portfolio-mobile-touchend-guard-3');
  load('/portfolio-final-qa-fixes.js?v=portfolio-final-qa-fixes-5', 'portfolio-final-qa-fixes-5');
  load('/blandetto-print-layout-restore.js?v=blandetto-print-layout-restore-1', 'blandetto-print-layout-restore-1');
  load('/project-navigation-final-fix.js?v=project-navigation-final-fix-1', 'project-navigation-final-fix-1');
  load('/portfolio-stable-project-shell.js?v=portfolio-stable-project-shell-1', 'portfolio-stable-project-shell-1');
  load('/portfolio-shell-theme-pink-fix.js?v=portfolio-shell-theme-pink-fix-1', 'portfolio-shell-theme-pink-fix-1');
})();