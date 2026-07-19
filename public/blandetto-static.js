(() => {
  const style = document.createElement('style');
  style.id = 'project-modal-final-fixes';
  style.textContent = `
    .fixed.inset-0.z-\[100\] h3,
    .fixed.inset-0.z-\[100\] p,
    .fixed.inset-0.z-\[100\] button,
    .pink-punk-section__title,
    .pink-punk-section__counter,
    .pink-punk-section__note,
    .bf,
    .bf * {
      font-family: Arial, Helvetica, sans-serif !important;
    }

    .fixed.inset-0.z-\[100\] h3,
    .pink-punk-section__title,
    .bf-t {
      font-weight: 900 !important;
      letter-spacing: -0.085em !important;
      line-height: 0.82 !important;
    }

    .fixed.inset-0.z-\[100\] button,
    .fixed.inset-0.z-\[100\] p,
    .pink-punk-section__counter,
    .bf-l,
    .bf-x,
    .bf-c {
      font-weight: 900 !important;
      letter-spacing: 0.24em !important;
    }

    div[class*="bg-[#050505]"][class*="fixed"][class*="inset-0"] img[src*="/works/90-06/logo-variations"] {
      max-width: min(72%, 48rem) !important;
      max-height: 56vh !important;
      width: auto !important;
      height: auto !important;
      object-fit: contain !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    div[class*="bg-[#050505]"][class*="fixed"][class*="inset-0"] button:has(img[src*="/works/90-06/logo-variations"]) {
      min-height: 0 !important;
      height: auto !important;
      max-width: 58rem !important;
      margin-left: auto !important;
      margin-right: auto !important;
      padding-top: 1.25rem !important;
      padding-bottom: 1.25rem !important;
    }
  `;
  document.head.append(style);

  const script = document.createElement('script');
  script.src = '/blandetto-final.js?v=direct-2';
  script.async = false;
  (document.currentScript || document.body).after(script);
})();