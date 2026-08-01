(() => {
  if (window.__vtbLayoutOrderV1) return;
  window.__vtbLayoutOrderV1 = true;

  const VERSION = 'vtb-layout-order-1';
  const PRINT_ORDER = [1, 3, 2, 4, 5, 6, 9, 7, 8];
  const BOXERS_ORDER = [1, 2];
  const ASHTRAYS_TOP_ORDER = [3, 4];
  const ASHTRAYS_BOTTOM_ORDER = [5, 6, 7];
  const BILLBOARD_ORDER = [2, 1];

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const SUBTITLES = {
    ru: { boxers: 'БОКСЕРЫ', ashtrays: 'ПЕПЕЛЬНИЦЫ' },
    en: { boxers: 'BOXERS', ashtrays: 'ASHTRAYS' },
  };

  function injectStyles() {
    const old = document.getElementById('vtb-layout-order-style');
    if (old?.dataset.version === VERSION) return;
    old?.remove();

    const style = document.createElement('style');
    style.id = 'vtb-layout-order-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .vtb-merch-layout {
        display: block;
      }

      .vtb-merch-subtitle {
        margin: 0 0 1.15rem;
        font-family: Arial, Helvetica, sans-serif;
        font-size: .72rem;
        font-weight: 900;
        line-height: 1;
        letter-spacing: .25em;
        text-transform: uppercase;
      }

      .vtb-merch-subtitle--ashtrays {
        margin-top: clamp(3rem, 6vw, 5rem);
      }

      .vtb-merch-grid {
        display: grid;
        gap: 1rem;
        align-items: start;
      }

      .vtb-merch-grid--two {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .vtb-merch-grid--three {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin-top: 1rem;
      }

      @media (max-width: 700px) {
        .vtb-merch-grid--two,
        .vtb-merch-grid--three {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.append(style);
  }

  function numberFromCard(card, type) {
    const label = card.getAttribute('aria-label') || '';
    const match = label.match(new RegExp(`${type}\\s+(\\d+)`, 'i'));
    return match ? Number(match[1]) : 999;
  }

  function orderCards(container, cards, order, type) {
    if (!(container instanceof Element)) return;
    const byNumber = new Map(cards.map((card) => [numberFromCard(card, type), card]));
    const desired = order.map((number) => byNumber.get(number)).filter(Boolean);
    const current = [...container.children].filter((node) => node.classList?.contains('vtb-card'));
    const alreadyCorrect = desired.length === current.length && desired.every((card, index) => card === current[index]);
    if (alreadyCorrect) return;
    desired.forEach((card) => container.append(card));
  }

  function arrangePrints(section) {
    const grid = section?.querySelector(':scope > .vtb-grid');
    if (!grid) return;
    const cards = [...grid.querySelectorAll(':scope > .vtb-print-card')];
    orderCards(grid, cards, PRINT_ORDER, 'print');
  }

  function createMerchLayout(section) {
    const layout = document.createElement('div');
    const boxersTitle = document.createElement('h3');
    const boxersGrid = document.createElement('div');
    const ashtraysTitle = document.createElement('h3');
    const ashtraysTop = document.createElement('div');
    const ashtraysBottom = document.createElement('div');

    layout.className = 'vtb-merch-layout';
    layout.dataset.vtbLayout = VERSION;
    boxersTitle.className = 'vtb-merch-subtitle vtb-merch-subtitle--boxers';
    boxersTitle.dataset.vtbSubtitle = 'boxers';
    boxersGrid.className = 'vtb-merch-grid vtb-merch-grid--two vtb-merch-grid--boxers';
    ashtraysTitle.className = 'vtb-merch-subtitle vtb-merch-subtitle--ashtrays';
    ashtraysTitle.dataset.vtbSubtitle = 'ashtrays';
    ashtraysTop.className = 'vtb-merch-grid vtb-merch-grid--two vtb-merch-grid--ashtrays-top';
    ashtraysBottom.className = 'vtb-merch-grid vtb-merch-grid--three vtb-merch-grid--ashtrays-bottom';

    layout.append(boxersTitle, boxersGrid, ashtraysTitle, ashtraysTop, ashtraysBottom);
    section.append(layout);
    return layout;
  }

  function arrangeMerch(section) {
    if (!(section instanceof Element)) return;
    let layout = section.querySelector(':scope > .vtb-merch-layout');
    const cards = [...section.querySelectorAll('.vtb-card')];
    const byNumber = new Map(cards.map((card) => [numberFromCard(card, 'merch'), card]));

    if (!layout) layout = createMerchLayout(section);

    const boxersGrid = layout.querySelector('.vtb-merch-grid--boxers');
    const ashtraysTop = layout.querySelector('.vtb-merch-grid--ashtrays-top');
    const ashtraysBottom = layout.querySelector('.vtb-merch-grid--ashtrays-bottom');

    BOXERS_ORDER.forEach((number) => {
      const card = byNumber.get(number);
      if (card && card.parentElement !== boxersGrid) boxersGrid.append(card);
    });
    ASHTRAYS_TOP_ORDER.forEach((number) => {
      const card = byNumber.get(number);
      if (card && card.parentElement !== ashtraysTop) ashtraysTop.append(card);
    });
    ASHTRAYS_BOTTOM_ORDER.forEach((number) => {
      const card = byNumber.get(number);
      if (card && card.parentElement !== ashtraysBottom) ashtraysBottom.append(card);
    });

    section.querySelectorAll(':scope > .vtb-grid').forEach((grid) => {
      if (!grid.querySelector('.vtb-card')) grid.remove();
    });

    const copy = SUBTITLES[language()];
    layout.querySelector('[data-vtb-subtitle="boxers"]').textContent = copy.boxers;
    layout.querySelector('[data-vtb-subtitle="ashtrays"]').textContent = copy.ashtrays;
  }

  function arrangeAdvertising(section) {
    if (!(section instanceof Element)) return;
    const adGrid = section.querySelector(':scope > .vtb-ad-grid');
    const billboardGrid = section.querySelector(':scope > .vtb-billboard-grid');

    if (adGrid) {
      const cards = [...adGrid.querySelectorAll(':scope > .vtb-card')];
      orderCards(adGrid, cards, [3, 4], 'ad');
    }

    if (billboardGrid) {
      const cards = [...billboardGrid.querySelectorAll(':scope > .vtb-card')];
      orderCards(billboardGrid, cards, BILLBOARD_ORDER, 'billboard');
    }
  }

  function applyToModal(modal) {
    const inner = modal.querySelector('.vtb-inner');
    const sections = [...(inner?.querySelectorAll(':scope > .vtb-section') || [])];
    if (sections.length < 3) return;

    arrangePrints(sections[0]);
    arrangeMerch(sections[1]);
    arrangeAdvertising(sections[2]);
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.vtb-modal').forEach(applyToModal);
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

  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0);
      setTimeout(schedule, 120);
    }
  }, true);

  apply();
})();
