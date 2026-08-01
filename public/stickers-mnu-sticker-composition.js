(() => {
  if (window.__stickersMnuStickerCompositionV2) return;
  window.__stickersMnuStickerCompositionV2 = true;

  const VERSION = 'stickers-mnu-sticker-composition-2';
  const ROWS = [
    ['sticker-mnu-05', 'sticker-mnu-02', 'sticker-mnu-04'],
    ['sticker-mnu-09', 'sticker-mnu-01', 'sticker-mnu-10'],
    ['sticker-mnu-07', 'sticker-mnu-08'],
    ['sticker-mnu-03', 'sticker-mnu-06'],
  ];

  function filename(card) {
    const image = card?.querySelector('img');
    const source = image?.currentSrc || image?.getAttribute('src') || image?.src || '';
    try {
      return decodeURIComponent(source)
        .split(/[?#]/)[0]
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
        .toLowerCase();
    } catch {
      return source
        .split(/[?#]/)[0]
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
        .toLowerCase();
    }
  }

  function injectStyles() {
    document.getElementById('stickers-mnu-sticker-composition-style')?.remove();
    const style = document.createElement('style');
    style.id = 'stickers-mnu-sticker-composition-style';
    style.textContent = `
      .stk-project[data-stickers-project="mnu"] .stk-grid--stickers.stk-grid--mnu-composition {
        display: block !important;
      }

      .stk-mnu-composition {
        display: flex;
        flex-direction: column;
        gap: clamp(1rem, 2vw, 1.8rem);
        width: 100%;
      }

      .stk-mnu-composition__row {
        display: grid;
        align-items: center;
        justify-content: center;
        gap: clamp(.8rem, 1.8vw, 1.6rem);
        width: 100%;
      }

      .stk-mnu-composition__row--three {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .stk-mnu-composition__row--two {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        width: min(100%, 74rem);
        margin-inline: auto;
      }

      .stk-mnu-composition__cell {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
      }

      .stk-mnu-composition__cell .stk-card {
        width: 100%;
        overflow: visible !important;
      }

      .stk-mnu-composition__cell .stk-card img {
        display: block;
        width: 100%;
        height: auto !important;
        max-height: none !important;
        object-fit: contain !important;
        background: transparent !important;
      }

      .stk-mnu-composition__row--top .stk-mnu-composition__cell:nth-child(2) .stk-card {
        width: min(78%, 18rem);
      }

      .stk-mnu-composition__row--middle .stk-mnu-composition__cell:nth-child(1) .stk-card,
      .stk-mnu-composition__row--middle .stk-mnu-composition__cell:nth-child(3) .stk-card {
        width: min(72%, 16rem);
      }

      .stk-mnu-composition__row--middle .stk-mnu-composition__cell:nth-child(2) .stk-card {
        width: min(100%, 31rem);
      }

      .stk-mnu-composition__row--pair .stk-card {
        width: min(100%, 31rem);
      }

      .stk-mnu-composition__extras {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }

      @media (max-width: 760px) {
        .stk-mnu-composition__row--three,
        .stk-mnu-composition__row--two {
          grid-template-columns: 1fr;
          width: 100%;
        }

        .stk-mnu-composition__row--top .stk-mnu-composition__cell:nth-child(2) .stk-card,
        .stk-mnu-composition__row--middle .stk-mnu-composition__cell:nth-child(1) .stk-card,
        .stk-mnu-composition__row--middle .stk-mnu-composition__cell:nth-child(2) .stk-card,
        .stk-mnu-composition__row--middle .stk-mnu-composition__cell:nth-child(3) .stk-card,
        .stk-mnu-composition__row--pair .stk-card {
          width: 100%;
        }
      }
    `;
    document.head.append(style);
  }

  function findCard(cards, wanted) {
    return cards.find((card) => {
      const name = filename(card);
      return name === wanted || name.endsWith(wanted) || name.includes(wanted);
    }) || null;
  }

  function makeCell(card) {
    const cell = document.createElement('div');
    cell.className = 'stk-mnu-composition__cell';
    if (card) cell.append(card);
    return cell;
  }

  function makeRow(cards, index) {
    const row = document.createElement('div');
    const type = cards.length === 3 ? 'three' : 'two';
    const role = index === 0 ? 'top' : index === 1 ? 'middle' : 'pair';
    row.className = `stk-mnu-composition__row stk-mnu-composition__row--${type} stk-mnu-composition__row--${role}`;
    cards.forEach((card) => row.append(makeCell(card)));
    return row;
  }

  function arrange(modal) {
    const mnu = modal.querySelector('.stk-project[data-stickers-project="mnu"]');
    const grid = mnu?.querySelector('.stk-grid--stickers');
    if (!grid || grid.dataset.mnuCompositionVersion === VERSION) return;

    const existing = grid.querySelector(':scope > .stk-mnu-composition');
    const cards = existing
      ? [...existing.querySelectorAll('.stk-card')]
      : [...grid.querySelectorAll(':scope > .stk-card')];
    if (!cards.length) return;

    const selectedRows = ROWS.map((row) => row.map((wanted) => findCard(cards, wanted)));
    const used = new Set(selectedRows.flat().filter(Boolean));
    const remaining = cards.filter((card) => !used.has(card));

    selectedRows.forEach((row) => {
      row.forEach((card, index) => {
        if (!card && remaining.length) row[index] = remaining.shift();
      });
    });

    const composition = document.createElement('div');
    composition.className = 'stk-mnu-composition';
    selectedRows.forEach((row, index) => composition.append(makeRow(row, index)));

    grid.replaceChildren(composition);
    if (remaining.length) {
      const extras = document.createElement('div');
      extras.className = 'stk-mnu-composition__extras';
      extras.append(...remaining);
      grid.append(extras);
    }

    grid.classList.add('stk-grid--mnu-composition');
    grid.dataset.mnuCompositionVersion = VERSION;
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.stk-modal').forEach(arrange);
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

  window.addEventListener('load', schedule);
  apply();
})();
