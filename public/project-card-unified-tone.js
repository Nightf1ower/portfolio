(() => {
  if (window.__projectCardUnifiedToneV2) return;
  window.__projectCardUnifiedToneV2 = true;

  const style = document.createElement('style');
  style.id = 'project-card-unified-tone-style';
  style.dataset.version = 'project-card-unified-tone-2';
  style.textContent = `
    #works .mt-10.grid > article,
    #works .mt-10.grid > button {
      background-color: #dcdcd9 !important;
      background-image: none !important;
    }

    #works .mt-10.grid > article:hover,
    #works .mt-10.grid > button:hover {
      background-color: #dcdcd9 !important;
      background-image: none !important;
    }

    #works .mt-10.grid > article > div,
    #works .mt-10.grid > button > div {
      background-color: #e9e9e6 !important;
      background-image: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    /* Every brand title uses exactly the same typography. */
    #works .mt-10.grid h3 {
      font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
      font-weight: 900 !important;
      font-style: normal !important;
      font-stretch: normal !important;
      font-variation-settings: normal !important;
      font-synthesis: none !important;
      line-height: .88 !important;
      letter-spacing: -.065em !important;
      text-transform: uppercase !important;
    }
  `;
  document.getElementById('project-card-unified-tone-style')?.remove();
  document.head.append(style);
})();
