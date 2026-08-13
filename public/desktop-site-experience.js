(() => {
  if (window.__desktopSiteExperienceLoaderV5) return;
  window.__desktopSiteExperienceLoaderV5 = true;
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
  load('/portfolio-final-qa-fixes.js?v=portfolio-final-qa-fixes-1', 'portfolio-final-qa-fixes-1');
  load('/desktop-site-experience-v2.js?v=desktop-site-experience-2', 'desktop-site-experience-2');
})();
