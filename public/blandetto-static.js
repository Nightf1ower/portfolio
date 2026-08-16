(() => {
  const style = document.createElement('style');
  style.id = 'project-modal-final-fixes';
  style.textContent = `
    .fixed.inset-0.z-\[100\] h3,
    .fixed.inset-0.z-\[100\] p,
    .fixed.inset-0.z-\[100\] button,
    .bf,
    .bf * {
      font-family: Arial, Helvetica, sans-serif !important;
    }

    .fixed.inset-0.z-\[100\] h3,
    .bf-t {
      font-weight: 900 !important;
      letter-spacing: -0.085em !important;
      line-height: 0.82 !important;
    }

    .fixed.inset-0.z-\[100\] button,
    .fixed.inset-0.z-\[100\] p,
    .bf-l,
    .bf-x,
    .bf-c {
      font-weight: 900 !important;
      letter-spacing: 0.24em !important;
    }

    .bf .bf-x,
    .blandetto-modal .blandetto-close,
    .bld-modal .bld-close {
      background: #050505 !important;
      color: #fff !important;
      border-color: #050505 !important;
      box-shadow: none !important;
    }

    .bf .bf-s[data-bf-section="minimalLogo"] .bf-note {
      margin-bottom: 1.25rem !important;
    }

    .bf .bf-s[data-bf-section="minimalLogo"] .bf-m {
      aspect-ratio: auto !important;
      min-height: 0 !important;
      height: auto !important;
      overflow: visible !important;
    }

    .bf .bf-s[data-bf-section="minimalLogo"] .bf-img {
      position: static !important;
      inset: auto !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      object-fit: contain !important;
      object-position: top center !important;
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
  document.getElementById('project-modal-final-fixes')?.remove();
  document.head.append(style);

  const script = document.createElement('script');
  script.src = '/blandetto-final.js?v=direct-6';
  script.async = false;
  (document.currentScript || document.body).after(script);
})();