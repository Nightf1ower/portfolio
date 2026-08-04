(() => {
  if (window.__projectCardUnifiedToneV1) return;
  window.__projectCardUnifiedToneV1 = true;

  const style = document.createElement('style');
  style.id = 'project-card-unified-tone-style';
  style.dataset.version = 'project-card-unified-tone-1';
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
  `;
  document.head.append(style);
})();
