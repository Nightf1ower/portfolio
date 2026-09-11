(() => {
  if (window.__desktopSiteExperienceLoaderV38) return;
  window.__desktopSiteExperienceLoaderV38 = true;
  window.__desktopSiteExperienceLoaderV37 = true;
  window.__desktopSiteExperienceLoaderV36 = true;
  window.__desktopSiteExperienceLoaderV35 = true;
  window.__desktopSiteExperienceLoaderV34 = true;
  window.__desktopSiteExperienceLoaderV33 = true;
  window.__desktopSiteExperienceLoaderV32 = true;
  window.__desktopSiteExperienceLoaderV31 = true;
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

  load('/portfolio-stable-project-shell.js?v=portfolio-stable-project-shell-8', 'portfolio-stable-project-shell-8');
  load('/about-content-update.js?v=about-content-update-4', 'about-content-update-4');
  load('/portfolio-mobile-gestures-v2.js?v=portfolio-mobile-gestures-2', 'portfolio-mobile-gestures-2');
  load('/portfolio-mobile-touchend-guard-v3.js?v=portfolio-mobile-touchend-guard-3', 'portfolio-mobile-touchend-guard-3');
  load('/portfolio-final-qa-fixes.js?v=portfolio-final-qa-fixes-5', 'portfolio-final-qa-fixes-5');
  load('/blandetto-print-layout-restore.js?v=blandetto-print-layout-restore-1', 'blandetto-print-layout-restore-1');
  load('/homepage-project-curation.js?v=homepage-project-curation-2', 'homepage-project-curation-2');
  load('/portfolio-project-consistency.js?v=portfolio-project-consistency-1', 'portfolio-project-consistency-1');
  load('/visual-noise-mobile-v2.js?v=visual-noise-mobile-3', 'visual-noise-mobile-3');
  load('/portfolio-folder-final-fixes.js?v=portfolio-folder-final-fixes-1', 'portfolio-folder-final-fixes-1');
  load('/portfolio-header-top-layer.js?v=portfolio-header-top-layer-1', 'portfolio-header-top-layer-1');
})();
