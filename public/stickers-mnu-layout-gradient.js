(() => {
  if (window.__stickersMnuLayoutGradientV1) return;
  window.__stickersMnuLayoutGradientV1 = true;

  const VERSION = 'stickers-mnu-layout-gradient-1';
  const ORDER = {
    left: ['real-4', 'real-5', 'real-1'],
    right: ['real-2', 'real-3'],
  };

  function normalizeName(card) {
    const image = card?.querySelector('img');
    const value = image?.currentSrc || image?.getAttribute('src') || image?.src || '';
    try {
      return decodeURIComponent(value).split(/[?#]/)[0].split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
    } catch {
      return value.split(/[?#]/)[0].split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
    }
  }

  function injectStyles() {
    document.getElementById('stickers-mnu-layout-gradient-style')?.remove();
    const style = document.createElement('style');
    style.id = 'stickers-mnu-layout-gradient-style';
    style.textContent = `
      .stk-modal {
        position: fixed !important;
        background: #e1e1df !important;
        isolation: isolate;
      }

      .stk-gradient-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        pointer-events: none;
        background: linear-gradient(
          180deg,
          #e1e1df 0,
          #e1e1df var(--stk-gradient-start, 55%),
          #00ff00 var(--stk-gradient-end, 82%),
          #00ff00 100%
        );
      }

      .stk-modal > .stk-inner {
        position: relative;
        z-index: 1;
      }

      .stk-project[data-stickers-project="mnu"] .stk-grid--real.stk-grid--mnu-real {
        display: block !important;
      }

      .stk-mnu-real-layout {
        display: grid;
        grid-template-columns: minmax(0, .9fr) minmax(0, 1.05fr);
        align-items: start;
        gap: clamp(1rem, 1.6vw, 1.5rem);
      }

      .stk-mnu-real-column {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: clamp(1rem, 1.6vw, 1.5rem);
      }

      .stk-mnu-real-layout .stk-card,
      .stk-mnu-real-layout .stk-card img {
        display: block;
        width: 100%;
        height: auto !important;
        aspect-ratio: auto !important;
        object-fit: contain !important;
      }

      @media (max-width: 720px) {
        .stk-mnu-real-layout {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.append(style);
  }

  function arrangeMnuReal(modal) {
    const mnu = modal.querySelector('.stk-project[data-stickers-project="mnu"]');
    const grid = mnu?.querySelector('.stk-grid--real');
    if (!grid || grid.dataset.mnuLayoutVersion === VERSION) return;

    const cards = [...grid.querySelectorAll(':scope > .stk-card')];
    if (!cards.length) return;

    const byName = new Map(cards.map((card) => [normalizeName(card), card]));
    const findCard = (wanted) => {
      for (const [name, card] of byName) {
        if (name === wanted || name.endsWith(wanted) || name.includes(wanted)) return card;
      }
      return null;
    };

    const leftCards = ORDER.left.map(findCard).filter(Boolean);
    const rightCards = ORDER.right.map(findCard).filter(Boolean);
    const selected = new Set([...leftCards, ...rightCards]);
    const remaining = cards.filter((card) => !selected.has(card));

    const layout = document.createElement('div');
    const left = document.createElement('div');
    const right = document.createElement('div');
    layout.className = 'stk-mnu-real-layout';
    left.className = 'stk-mnu-real-column stk-mnu-real-column--left';
    right.className = 'stk-mnu-real-column stk-mnu-real-column--right';

    left.append(...leftCards);
    right.append(...rightCards);
    if (remaining.length) left.append(...remaining);

    layout.append(left, right);
    grid.replaceChildren(layout);
    grid.classList.add('stk-grid--mnu-real');
    grid.dataset.mnuLayoutVersion = VERSION;
  }

  function updateGradient(modal) {
    let background = modal.querySelector(':scope > .stk-gradient-bg');
    if (!background) {
      background = document.createElement('div');
      background.className = 'stk-gradient-bg';
      modal.prepend(background);
    }

    const flawa = modal.querySelector('.stk-project[data-stickers-project="flawa"]');
    const totalHeight = Math.max(modal.scrollHeight, modal.clientHeight);
    const start = flawa ? Math.max(0, flawa.offsetTop) : totalHeight * 0.55;
    const transitionLength = flawa
      ? Math.max(520, Math.min(1100, flawa.offsetHeight * 0.72))
      : Math.max(520, totalHeight * 0.25);
    const end = Math.min(totalHeight, start + transitionLength);

    background.style.height = `${totalHeight}px`;
    background.style.setProperty('--stk-gradient-start', `${start}px`);
    background.style.setProperty('--stk-gradient-end', `${end}px`);
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.stk-modal').forEach((modal) => {
      arrangeMnuReal(modal);
      updateGradient(modal);

      modal.querySelectorAll('img').forEach((image) => {
        if (image.complete) return;
        image.addEventListener('load', () => updateGradient(modal), { once: true });
      });
    });
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  };

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule);
  apply();
})();
