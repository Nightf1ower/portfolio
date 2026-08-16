(() => {
  if (window.__desktopSiteExperienceLoaderV18) return;
  window.__desktopSiteExperienceLoaderV18 = true;
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
  load('/portfolio-fixed-project-header.js?v=portfolio-fixed-project-header-2', 'portfolio-fixed-project-header-2');
  load('/desktop-site-experience-v2.js?v=desktop-site-experience-2', 'desktop-site-experience-2');
  load('/portfolio-unified-project-intro.js?v=portfolio-unified-project-intro-1', 'portfolio-unified-project-intro-1');
  load('/blandetto-print-layout-restore.js?v=blandetto-print-layout-restore-1', 'blandetto-print-layout-restore-1');
  load('/project9006-standard-intro-fix.js?v=project9006-standard-intro-fix-1', 'project9006-standard-intro-fix-1');
  load('/portfolio-themed-intro-restore.js?v=portfolio-themed-intro-restore-2', 'portfolio-themed-intro-restore-2');
  load('/project-navigation-final-fix.js?v=project-navigation-final-fix-1', 'project-navigation-final-fix-1');
  load('/portfolio-intro-duplicate-cleanup.js?v=portfolio-intro-duplicate-cleanup-1', 'portfolio-intro-duplicate-cleanup-1');
})();