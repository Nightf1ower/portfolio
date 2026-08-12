(() => {
  if (window.__desktopSiteExperienceLoaderV2) return;
  window.__desktopSiteExperienceLoaderV2 = true;
  window.__desktopSiteExperienceV1 = true;

  const existing = document.querySelector('script[data-desktop-site-experience="2"]');
  if (existing) return;

  const script = document.createElement('script');
  script.src = '/desktop-site-experience-v2.js?v=desktop-site-experience-2';
  script.dataset.desktopSiteExperience = '2';
  script.async = false;
  document.head.append(script);
})();
