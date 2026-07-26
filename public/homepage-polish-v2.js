(() => {
  if (window.__homepagePolishV2) return;
  window.__homepagePolishV2 = true;

  const VERSION = 'homepage-polish-2';

  const COPY = {
    ru: {
      noise: 'ВИЗУАЛЬНЫЙ ШУМ',
      projects: 'ПРОЕКТЫ',
      footer: 'NIGHTFLOWER — графический дизайнер',
    },
    en: {
      noise: 'VISUAL NOISE',
      projects: 'PROJECTS',
      footer: 'NIGHTFLOWER — Graphic Designer',
    },
  };

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';

  function injectStyles() {
    const previous = document.getElementById('homepage-polish-v2-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'homepage-polish-v2-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .nf-noise-panel {
        overflow: hidden !important;
        isolation: isolate;
      }

      .nf-noise-label {
        position: relative !important;
        z-index: 5 !important;
        display: inline-flex !important;
        width: fit-content !important;
        visibility: visible !important;
        opacity: 1 !important;
        background: #a6ff00 !important;
        color: #050505 !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: .72rem !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        letter-spacing: .28em !important;
        text-transform: uppercase !important;
        padding: .48rem .72rem !important;
        white-space: nowrap;
      }

      .nf-noise-shapes {
        position: relative !important;
        display: block !important;
        width: 100% !important;
        height: clamp(14rem, 29vw, 21rem) !important;
        margin-top: 2rem !important;
        overflow: visible !important;
      }

      .nf-noise-shapes > div {
        position: absolute !important;
        margin: 0 !important;
        transition: transform .55s cubic-bezier(.2,.8,.2,1), clip-path .55s ease !important;
        transform-origin: center;
      }

      .nf-noise-shapes > div:nth-child(1) {
        left: 4%; top: 10%; width: 34%; height: 70% !important;
        clip-path: polygon(8% 2%, 91% 0, 100% 38%, 82% 96%, 18% 100%, 0 61%);
        transform: rotate(-4deg);
      }

      .nf-noise-shapes > div:nth-child(2) {
        left: 31%; top: 24%; width: 27%; height: 58% !important;
        clip-path: polygon(14% 0, 100% 12%, 88% 100%, 0 88%, 5% 27%);
        transform: rotate(3deg);
      }

      .nf-noise-shapes > div:nth-child(3) {
        right: 4%; top: 1%; width: 35%; height: 72% !important;
        clip-path: polygon(17% 0, 100% 9%, 87% 66%, 98% 100%, 18% 91%, 0 38%);
        transform: rotate(4deg);
      }

      .nf-noise-shapes > div:nth-child(4) {
        left: 7%; bottom: 0; width: 46%; height: 37% !important;
        clip-path: polygon(3% 16%, 82% 0, 100% 28%, 91% 100%, 12% 92%);
        transform: rotate(1.5deg);
      }

      .nf-noise-shapes > div:nth-child(5) {
        right: 11%; bottom: -2%; width: 25%; height: 42% !important;
        clip-path: polygon(18% 0, 100% 18%, 82% 100%, 0 86%, 8% 31%);
        transform: rotate(-5deg);
      }

      .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(1) { transform: rotate(-7deg) translate(-.2rem,.15rem); }
      .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(2) { transform: rotate(6deg) translate(.15rem,-.2rem); }
      .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(3) { transform: rotate(7deg) translate(.2rem,.1rem); }
      .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(4) { transform: rotate(-1deg) translate(-.1rem,.2rem); }
      .nf-noise-panel:hover .nf-noise-shapes > div:nth-child(5) { transform: rotate(-8deg) translate(.15rem,-.15rem); }

      @media (max-width: 640px) {
        .nf-noise-label {
          font-size: .62rem !important;
          letter-spacing: .22em !important;
        }
        .nf-noise-shapes {
          height: 15rem !important;
          margin-top: 1.4rem !important;
        }
      }
    `;
    document.head.append(style);
  }

  function findHeroPanel() {
    const hero = document.getElementById('top');
    if (!hero) return null;
    const candidates = [...hero.querySelectorAll('div')];
    return candidates.find((node) =>
      node.classList.contains('min-h-[24rem]') && node.classList.contains('border')
    ) || null;
  }

  function updateHero() {
    const panel = findHeroPanel();
    if (!panel) return false;
    panel.classList.add('nf-noise-panel');

    const inner = panel.firstElementChild;
    if (!inner) return false;

    let label = [...inner.querySelectorAll('span')].find((node) =>
      /visual noise|selected visual noise|визуальный шум/i.test(node.textContent?.trim() || '')
    );
    if (!label) {
      label = document.createElement('span');
      inner.prepend(label);
    }
    label.classList.add('nf-noise-label');
    label.textContent = COPY[language()].noise;

    const shapes = [...inner.children].find((node) =>
      node.tagName === 'DIV' && node.querySelectorAll(':scope > div').length === 5
    );
    shapes?.classList.add('nf-noise-shapes');
    return true;
  }

  function updateProjectsLabel() {
    const section = document.getElementById('works');
    const eyebrow = section?.querySelector(':scope > div > div > p');
    if (!eyebrow) return false;
    eyebrow.textContent = COPY[language()].projects;
    return true;
  }

  function updateFooter() {
    const footer = document.getElementById('contacts');
    if (!footer) return false;
    const footerText = [...footer.querySelectorAll('p')].at(-1);
    if (!footerText) return false;
    footerText.textContent = COPY[language()].footer;
    return true;
  }

  function apply() {
    injectStyles();
    updateHero();
    updateProjectsLabel();
    updateFooter();
  }

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    apply();
    if ((findHeroPanel() && document.getElementById('works') && document.getElementById('contacts')) || attempts >= 30) {
      window.clearInterval(retry);
    }
  }, 120);

  const languageObserver = new MutationObserver(apply);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      window.setTimeout(apply, 0);
      window.setTimeout(apply, 120);
    }
  }, true);

  window.addEventListener('load', apply);
  apply();
})();