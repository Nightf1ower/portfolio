(() => {
  if (window.__desktopSiteExperienceLoaderV2) return;
  window.__desktopSiteExperienceLoaderV2 = true;
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
  load('/desktop-site-experience-v2.js?v=desktop-site-experience-2', 'desktop-site-experience-2');
})();
