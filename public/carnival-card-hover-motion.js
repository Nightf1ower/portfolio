(() => {
  if (window.__carnivalCardHoverMotionV1) return;
  window.__carnivalCardHoverMotionV1 = true;

  const VERSION = 'carnival-card-hover-motion-1';
  const STYLE_ID = 'carnival-card-hover-motion-style';

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/[^A-ZА-ЯЁ0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function installStyles() {
    const old = document.getElementById(STYLE_ID);
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      #works [data-carnival-card-motion="${VERSION}"] .carnival-card-preview-motion {
        transform: rotate(0deg) scale(1) !important;
        transform-origin: center center !important;
        transition: transform 500ms ease !important;
        will-change: transform !important;
      }

      @media (hover: hover) and (pointer: fine) {
        #works [data-carnival-card-motion="${VERSION}"]:hover .carnival-card-preview-motion {
          transform: rotate(3deg) scale(1.05) !important;
        }
      }
    `;
    document.head.append(style);
  }

  function findCarnivalCard() {
    return [...document.querySelectorAll('#works article, #works button')]
      .find((card) => normalize(card.querySelector('h3')?.textContent) === 'CARNIVAL RECORDS') || null;
  }

  function apply() {
    installStyles();

    const card = findCarnivalCard();
    if (!(card instanceof HTMLElement)) return;

    const host = card.querySelector('.my-10.flex.flex-1')
      || card.querySelector('.my-10')
      || null;
    if (!(host instanceof HTMLElement)) return;

    const target = host.firstElementChild;
    if (!(target instanceof HTMLElement)) return;

    card.dataset.carnivalCardMotion = VERSION;
    host.querySelectorAll('.carnival-card-preview-motion').forEach((node) => {
      if (node !== target) node.classList.remove('carnival-card-preview-motion');
    });
    target.classList.add('carnival-card-preview-motion');
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  schedule();
  const works = document.getElementById('works');
  if (works) {
    new MutationObserver(schedule).observe(works, {
      childList: true,
      subtree: true,
    });
  }
  window.addEventListener('load', schedule);
})();
