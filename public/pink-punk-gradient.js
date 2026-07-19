(() => {
  if (window.__pinkPunkGradientLoaded) return;
  window.__pinkPunkGradientLoaded = true;

  const VERSION = 'pink-gradient-2';

  function injectStyles() {
    if (document.getElementById('pink-punk-gradient-style')) return;

    const style = document.createElement('style');
    style.id = 'pink-punk-gradient-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .pink-punk-gradient-modal {
        background-color: #050505 !important;
        background-image: linear-gradient(
          180deg,
          #9b0014 0%,
          #7c0011 20%,
          #4a000c 43%,
          #210007 67%,
          #0d0003 84%,
          #050505 100%
        ) !important;
        background-attachment: local !important;
        background-repeat: no-repeat !important;
        background-size: 100% 100% !important;
      }

      .pink-punk-gradient-modal > div > .sticky {
        background: transparent !important;
        border-bottom-color: transparent !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }

      .pink-punk-gradient-modal .pink-punk-section {
        border-top-color: rgba(255, 255, 255, 0.28) !important;
      }

      @media (max-width: 640px) {
        .pink-punk-gradient-modal {
          background-image: linear-gradient(
            180deg,
            #9b0014 0%,
            #720010 24%,
            #390009 50%,
            #140004 74%,
            #050505 100%
          ) !important;
        }
      }
    `;
    document.head.append(style);
  }

  function applyGradient() {
    const gallery = document.querySelector('.pink-punk-gallery');
    const modal = gallery?.closest('.fixed.inset-0');
    if (!modal) return false;
    modal.classList.add('pink-punk-gradient-modal');
    return true;
  }

  injectStyles();
  applyGradient();

  const observer = new MutationObserver(applyGradient);
  observer.observe(document.body, { childList: true, subtree: true });
})();
