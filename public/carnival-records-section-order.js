(() => {
  if (window.__carnivalRecordsSectionOrderV2) return;
  window.__carnivalRecordsSectionOrderV2 = true;

  const SECTION_ORDER_KEY = 'vinyl-merch-carnival-calec-caps';
  const CALEC_ORDER = ['2', '4', '5', '3', '1', '6', '14', '11', '15', '9', '8', '12', '16', '17', '13'];
  const CALEC_ORDER_KEY = `${CALEC_ORDER.join('-')}-tee`;
  const CALEC_TEE_SRC = '/works/carnival-records/calec-print/calec-print-tee.jpg?v=calec-order-2';

  function normalize(value) {
    return String(value || '').trim().toUpperCase();
  }

  function findByTitle(sections, patterns) {
    return sections.find((section) => {
      const title = normalize(section.querySelector(':scope > .cr-h')?.textContent);
      return patterns.some((pattern) => pattern.test(title));
    }) || null;
  }

  function injectStyles() {
    if (document.getElementById('carnival-records-calec-order-style')) return;
    const style = document.createElement('style');
    style.id = 'carnival-records-calec-order-style';
    style.textContent = `
      .cr-modal .cr-calec-tee-card {
        grid-column: 1 / -1 !important;
        width: 100% !important;
        background: transparent !important;
      }
      .cr-modal .cr-calec-tee-card .cr-media {
        display: block !important;
        width: 100% !important;
        aspect-ratio: auto !important;
        overflow: visible !important;
        background: transparent !important;
      }
      .cr-modal .cr-calec-tee-card .cr-img {
        position: static !important;
        inset: auto !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        opacity: 1 !important;
        object-fit: contain !important;
        background: transparent !important;
      }
    `;
    document.head.append(style);
  }

  function openSingleImage() {
    document.querySelector('.cr-light')?.remove();

    const overlay = document.createElement('div');
    const stage = document.createElement('div');
    const image = document.createElement('img');
    const close = document.createElement('button');

    overlay.className = 'cr-light cr-calec-tee-light';
    stage.className = 'cr-stage';
    image.className = 'cr-light-img';
    close.className = 'cr-light-close';
    close.type = 'button';
    close.textContent = document.documentElement.lang === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    image.src = CALEC_TEE_SRC;
    image.alt = 'CALEC PRINT TEE';

    close.onclick = (event) => {
      event.stopPropagation();
      overlay.remove();
    };
    stage.onclick = (event) => event.stopPropagation();
    overlay.onclick = () => overlay.remove();

    stage.append(image);
    overlay.append(stage, close);
    document.body.append(overlay);
  }

  function createCalecTeeCard() {
    const button = document.createElement('button');
    const media = document.createElement('span');
    const image = document.createElement('img');

    button.type = 'button';
    button.className = 'cr-card cr-calec-tee-card';
    media.className = 'cr-media';
    image.className = 'cr-img active';
    image.src = CALEC_TEE_SRC;
    image.alt = 'CALEC PRINT TEE';
    image.loading = 'lazy';
    image.decoding = 'async';

    media.append(image);
    button.append(media);
    button.onclick = (event) => {
      event.stopPropagation();
      openSingleImage();
    };
    return button;
  }

  function applySectionOrder(modal) {
    if (modal.dataset.carnivalSectionOrder === SECTION_ORDER_KEY) return true;

    const inner = modal.querySelector('.cr-inner');
    if (!inner) return false;

    const sections = [...inner.querySelectorAll(':scope > .cr-section')];
    if (sections.length < 5) return false;

    const vinyl = findByTitle(sections, [/^VINYL ALBUM COVER DESIGN$/]);
    const merch = findByTitle(sections, [/^MERCH$/]);
    const carnival = findByTitle(sections, [/^CARNIVAL RECORDS COLLECTION$/]);
    const calec = findByTitle(sections, [/^ВЛАСТЕЛИН КАЛЕК COLLECTION$/]);
    const caps = findByTitle(sections, [/^CAPS$/]);
    const ordered = [vinyl, merch, carnival, calec, caps];

    if (ordered.some((section) => !section)) return false;
    ordered.forEach((section) => inner.append(section));
    modal.dataset.carnivalSectionOrder = SECTION_ORDER_KEY;
    return true;
  }

  function applyCalecOrder(modal) {
    if (modal.dataset.carnivalCalecOrder === CALEC_ORDER_KEY) return true;

    const sections = [...modal.querySelectorAll('.cr-inner > .cr-section')];
    const calecSection = findByTitle(sections, [/^ВЛАСТЕЛИН КАЛЕК COLLECTION$/]);
    const grid = calecSection?.querySelector(':scope > .cr-grid') || calecSection?.querySelector('.cr-grid');
    if (!grid) return false;

    const byNumber = new Map();
    const numberedCards = [];

    [...grid.querySelectorAll(':scope > .cr-card')].forEach((card) => {
      if (card.classList.contains('cr-calec-tee-card')) return;
      const baseImage = card.querySelector('.cr-img[src*="/calec-print/calec-print-"]');
      const match = baseImage?.src?.match(/\/calec-print-(\d+)\.jpg(?:\?|$)/i);
      if (!match) return;
      numberedCards.push(card);
      byNumber.set(String(Number(match[1])), card);
    });

    if (CALEC_ORDER.some((number) => !byNumber.has(number))) return false;

    const allowed = new Set(CALEC_ORDER);
    numberedCards.forEach((card) => {
      const image = card.querySelector('.cr-img[src*="/calec-print/calec-print-"]');
      const match = image?.src?.match(/\/calec-print-(\d+)\.jpg(?:\?|$)/i);
      const number = match ? String(Number(match[1])) : '';
      if (number && !allowed.has(number)) card.remove();
    });

    CALEC_ORDER.forEach((number) => grid.append(byNumber.get(number)));

    let teeCard = grid.querySelector(':scope > .cr-calec-tee-card');
    if (!teeCard) teeCard = createCalecTeeCard();
    grid.append(teeCard);

    grid.dataset.calecPrintOrder = CALEC_ORDER_KEY;
    modal.dataset.carnivalCalecOrder = CALEC_ORDER_KEY;
    return true;
  }

  function apply(modal) {
    if (!modal || !modal.dataset.carnivalFinalCopy) return false;
    injectStyles();
    const sectionsReady = applySectionOrder(modal);
    const calecReady = applyCalecOrder(modal);
    return sectionsReady && calecReady;
  }

  function scan(root = document) {
    if (root instanceof Element && root.matches('.cr-modal')) apply(root);
    root.querySelectorAll?.('.cr-modal').forEach(apply);
  }

  scan();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) scan(node);
      }
    }
    scan();
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();