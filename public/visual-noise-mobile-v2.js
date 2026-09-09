(() => {
  if (window.__visualNoiseMobileV2) return;
  window.__visualNoiseMobileV2 = true;

  const STYLE_ID = 'visual-noise-mobile-v2-style';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @media (max-width: 820px) {
      #top .nf-noise-panel {
        box-sizing: border-box !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        min-height: 0 !important;
        height: clamp(18.5rem, 72vw, 22rem) !important;
        margin: 0 !important;
        padding: .65rem !important;
        overflow: hidden !important;
        background: #efefec !important;
      }

      #top .nf-noise-panel > div {
        position: relative !important;
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        background-image: none !important;
      }

      #top .nf-noise-label {
        position: absolute !important;
        top: .95rem !important;
        left: .95rem !important;
        z-index: 20 !important;
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        width: 8.7rem !important;
        min-height: 3.35rem !important;
        margin: 0 !important;
        padding: .72rem .85rem !important;
        background: #a6ff00 !important;
        color: #050505 !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: .78rem !important;
        font-weight: 900 !important;
        line-height: .92 !important;
        letter-spacing: .24em !important;
        white-space: normal !important;
        text-wrap: balance !important;
      }

      #top .nf-noise-shapes {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        overflow: hidden !important;
      }

      #top .nf-noise-shapes > div {
        position: absolute !important;
        margin: 0 !important;
        transform-origin: center !important;
        transition: none !important;
      }

      #top .nf-noise-shapes > div:nth-child(1) {
        left: -8% !important;
        top: 40% !important;
        width: 52% !important;
        height: 57% !important;
        clip-path: polygon(9% 8%, 75% 0, 100% 78%, 28% 100%, 0 64%) !important;
        transform: rotate(-8deg) !important;
      }

      #top .nf-noise-shapes > div:nth-child(2) {
        left: 35% !important;
        top: 28% !important;
        width: 38% !important;
        height: 58% !important;
        clip-path: polygon(24% 0, 100% 34%, 82% 100%, 0 78%) !important;
        transform: rotate(5deg) !important;
      }

      #top .nf-noise-shapes > div:nth-child(3) {
        right: -9% !important;
        top: -10% !important;
        width: 47% !important;
        height: 116% !important;
        clip-path: polygon(35% 0, 100% 17%, 74% 100%, 0 84%, 15% 31%) !important;
        transform: rotate(7deg) !important;
      }

      #top .nf-noise-shapes > div:nth-child(4) {
        left: 15% !important;
        bottom: -21% !important;
        width: 61% !important;
        height: 53% !important;
        clip-path: polygon(8% 24%, 79% 0, 100% 90%, 18% 100%, 0 50%) !important;
        transform: rotate(-5deg) !important;
      }

      #top .nf-noise-shapes > div:nth-child(5) {
        right: 5% !important;
        bottom: -16% !important;
        width: 39% !important;
        height: 48% !important;
        clip-path: polygon(13% 0, 100% 48%, 82% 100%, 0 78%) !important;
        transform: rotate(4deg) !important;
      }

      #top .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(1),
      #top .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(2),
      #top .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(3),
      #top .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(4),
      #top .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(5) {
        translate: none !important;
      }
    }

    @media (max-width: 420px) {
      #top .nf-noise-panel {
        height: 18.75rem !important;
      }

      #top .nf-noise-label {
        top: .8rem !important;
        left: .8rem !important;
        width: 8.25rem !important;
        min-height: 3.15rem !important;
        padding: .66rem .75rem !important;
        font-size: .72rem !important;
      }

      #top .nf-noise-shapes > div:nth-child(1) {
        left: -12% !important;
        width: 58% !important;
      }

      #top .nf-noise-shapes > div:nth-child(3) {
        right: -13% !important;
        width: 52% !important;
      }

      #top .nf-noise-shapes > div:nth-child(4) {
        left: 10% !important;
        width: 67% !important;
      }
    }
  `;

  document.head.append(style);
})();
