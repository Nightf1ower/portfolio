(() => {
  if (window.__fableGradientSectionsV1) return;
  window.__fableGradientSectionsV1 = true;

  const STYLE_ID = 'fable-gradient-sections-style';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    html:has(.fable-modal),
    body:has(.fable-modal),
    .fable-modal {
      background: #fff !important;
    }

    .fable-section:nth-of-type(2),
    .fable-section:nth-of-type(3) {
      position: relative;
      isolation: isolate;
    }

    .fable-section:nth-of-type(2)::before,
    .fable-section:nth-of-type(3)::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 100vw;
      transform: translateX(-50%);
      pointer-events: none;
    }

    .fable-section:nth-of-type(2)::before {
      background: linear-gradient(180deg, #fff 0%, #f9f9f9 28%, #f6f6f6 82%, #f6f6f6 100%);
    }

    .fable-section:nth-of-type(3)::before {
      background: #f6f6f6;
    }
  `;

  document.head.append(style);
})();
