(() => {
  if (window.__visualNoiseMobileV3) return;
  window.__visualNoiseMobileV3 = true;

  const VERSION = 'visual-noise-mobile-3';
  const STYLE_ID = 'visual-noise-mobile-v2-style';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      @media (max-width: 820px) {
        #top .nf-noise-panel {
          position: relative !important;
          box-sizing: border-box !important;
          width: 100% !important;
          max-width: none !important;
          min-width: 0 !important;
          min-height: 0 !important;
          height: clamp(17rem, 62vw, 20rem) !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          border: 1px solid #050505 !important;
          background: #efefec !important;
        }

        #top .nf-noise-panel > .nf-noise-stage {
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
          top: 1rem !important;
          left: 1rem !important;
          z-index: 20 !important;
          box-sizing: border-box !important;
          display: flex !important;
          align-items: center !important;
          width: min(10.5rem, 48vw) !important;
          min-height: 3.6rem !important;
          margin: 0 !important;
          padding: .72rem .9rem !important;
          background: #a6ff00 !important;
          color: #050505 !important;
          font-family: Arial, Helvetica, sans-serif !important;
          font-size: clamp(.72rem, 3.1vw, .9rem) !important;
          font-weight: 900 !important;
          line-height: .92 !important;
          letter-spacing: .22em !important;
          text-transform: uppercase !important;
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
          padding: 0 !important;
          overflow: hidden !important;
        }

        #top .nf-noise-shapes > div {
          position: absolute !important;
          margin: 0 !important;
          min-width: 0 !important;
          min-height: 0 !important;
          transform-origin: center !important;
          transition: none !important;
        }

        /* black anchor */
        #top .nf-noise-shapes > div:nth-child(1) {
          left: -9% !important;
          top: 39% !important;
          width: 54% !important;
          height: 62% !important;
          background: #050505 !important;
          clip-path: polygon(7% 10%, 73% 0, 100% 73%, 29% 100%, 0 66%) !important;
          transform: rotate(-7deg) !important;
        }

        /* pale gray middle shard */
        #top .nf-noise-shapes > div:nth-child(2) {
          left: 35% !important;
          top: 30% !important;
          width: 39% !important;
          height: 60% !important;
          background: #d6d6d3 !important;
          clip-path: polygon(25% 0, 100% 34%, 82% 100%, 0 78%) !important;
          transform: rotate(5deg) !important;
        }

        /* acid dominant blade */
        #top .nf-noise-shapes > div:nth-child(3) {
          right: -8% !important;
          top: -14% !important;
          width: 48% !important;
          height: 124% !important;
          background: #a6ff00 !important;
          clip-path: polygon(34% 0, 100% 17%, 76% 100%, 0 84%, 15% 31%) !important;
          transform: rotate(7deg) !important;
        }

        /* white foreground sheet */
        #top .nf-noise-shapes > div:nth-child(4) {
          left: 13% !important;
          bottom: -22% !important;
          width: 64% !important;
          height: 56% !important;
          background: #fff !important;
          outline: 0 !important;
          clip-path: polygon(8% 24%, 79% 0, 100% 90%, 18% 100%, 0 50%) !important;
          transform: rotate(-5deg) !important;
        }

        /* quiet gray tail */
        #top .nf-noise-shapes > div:nth-child(5) {
          right: 3% !important;
          bottom: -18% !important;
          width: 40% !important;
          height: 51% !important;
          background: rgba(5,5,5,.10) !important;
          outline: 0 !important;
          clip-path: polygon(13% 0, 100% 48%, 82% 100%, 0 78%) !important;
          transform: rotate(4deg) !important;
        }

        #top .nf-noise-panel:hover .nf-noise-shapes > div {
          translate: none !important;
        }
      }

      @media (max-width: 420px) {
        #top .nf-noise-panel {
          height: 17.25rem !important;
        }

        #top .nf-noise-label {
          top: .8rem !important;
          left: .8rem !important;
          width: 9.2rem !important;
          min-height: 3.25rem !important;
          padding: .64rem .75rem !important;
          font-size: .72rem !important;
        }

        #top .nf-noise-shapes > div:nth-child(1) {
          left: -13% !important;
          width: 60% !important;
        }

        #top .nf-noise-shapes > div:nth-child(3) {
          right: -14% !important;
          width: 54% !important;
        }

        #top .nf-noise-shapes > div:nth-child(4) {
          left: 8% !important;
          width: 70% !important;
        }
      }
    `;

    document.head.append(style);
  }

  function applyClasses() {
    const hero = document.getElementById('top');
    if (!hero) return false;

    const grid = hero.querySelector(':scope > .mx-auto.grid') || hero.querySelector('.mx-auto.grid');
    if (!grid) return false;

    const panel = grid.lastElementChild;
    if (!(panel instanceof HTMLElement)) return false;

    const stage = panel.firstElementChild;
    if (!(stage instanceof HTMLElement)) return false;

    const label = [...stage.children].find((node) => node.tagName === 'SPAN');
    const shapes = [...stage.children].find((node) => node !== label && node.tagName === 'DIV');
    if (!(label instanceof HTMLElement) || !(shapes instanceof HTMLElement) || shapes.children.length < 5) return false;

    panel.classList.add('nf-noise-panel');
    stage.classList.add('nf-noise-stage');
    label.classList.add('nf-noise-label');
    shapes.classList.add('nf-noise-shapes');
    panel.dataset.visualNoiseMobile = VERSION;
    return true;
  }

  installStyles();

  let queued = false;
  function scheduleApply() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      applyClasses();
    });
  }

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  let attempts = 0;
  const retry = setInterval(() => {
    attempts += 1;
    if (applyClasses() || attempts >= 80) clearInterval(retry);
  }, 100);

  window.addEventListener('load', scheduleApply, { once: true });
  scheduleApply();
})();