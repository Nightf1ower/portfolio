(() => {
  if (window.__projectCardUnifiedToneV7) return;
  window.__projectCardUnifiedToneV7 = true;

  const style = document.createElement('style');
  style.id = 'project-card-unified-tone-style';
  style.dataset.version = 'project-card-unified-tone-7';
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

    /* Card 04 is BLANDETTO. Keep the full word inside the card. */
    #works .mt-10.grid > :nth-child(4) h3 {
      display: block !important;
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      font-family: Helvetica, "Helvetica Neue", Arial, sans-serif !important;
      font-size: clamp(1.15rem, 1.55vw, 1.45rem) !important;
      font-weight: 800 !important;
      font-style: normal !important;
      font-stretch: normal !important;
      font-variation-settings: normal !important;
      line-height: 1 !important;
      letter-spacing: -0.045em !important;
      white-space: nowrap !important;
      word-break: normal !important;
      overflow-wrap: normal !important;
      transform: none !important;
    }

    @media (max-width: 820px) {
      #works .mt-10.grid > :nth-child(4) h3 {
        font-size: clamp(1.35rem, 6.5vw, 1.8rem) !important;
      }
    }
  `;

  document.getElementById('project-card-unified-tone-style')?.remove();
  document.head.append(style);
})();
