(() => {
  if (window.__projectListExpansionV1) return;
  window.__projectListExpansionV1 = true;

  const VERSION = 'project-list-expansion-1';
  const COPY = {
    ru: {
      type: 'Айдентика и визуальная система',
      open: 'ОТКРЫТЬ ПРОЕКТ',
      close: 'ЗАКРЫТЬ',
      status: 'IN DEVELOPMENT',
    },
    en: {
      type: 'Identity and visual system',
      open: 'OPEN PROJECT',
      close: 'CLOSE',
      status: 'IN DEVELOPMENT',
    },
  };

  let ankaModal = null;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';
  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const copy = () => COPY[language()];
  const normalized = (value) => (value || '').trim().toUpperCase().replace(/\s+/g, ' ');

  function injectStyles() {
    const previous = document.getElementById('project-list-expansion-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'project-list-expansion-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .anka-peresild-modal {
        position: fixed;
        inset: 0;
        z-index: 760000;
        overflow-y: auto;
        background: #fff;
        color: #050505;
        padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(4rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
      }
      .anka-peresild-inner { width: min(100%, 80rem); min-height: 100%; margin: 0 auto; }
      .anka-peresild-head {
        position: sticky;
        top: 0;
        z-index: 3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: .75rem 0 1rem;
        border-bottom: 1px solid rgba(5,5,5,.25);
        background: rgba(255,255,255,.96);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      .anka-peresild-label,
      .anka-peresild-close,
      .anka-peresild-status {
        font-family: Arial, Helvetica, sans-serif;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .26em;
        text-transform: uppercase;
      }
      .anka-peresild-label,
      .anka-peresild-close { border: 0; background: #050505; color: #fff; padding: .65rem 1rem; }
      .anka-peresild-close { cursor: pointer; }
      .anka-peresild-hero {
        min-height: calc(100dvh - 7rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: clamp(4rem, 10vw, 9rem) 0;
      }
      .anka-peresild-title {
        margin: 0;
        max-width: 12ch;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(4.2rem, 13vw, 12rem);
        font-weight: 900;
        line-height: .76;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .anka-peresild-status { width: fit-content; margin: 2rem 0 0; border: 1px solid #050505; padding: .7rem 1rem; }
    `;
    document.head.append(style);
  }

  function cards() {
    return [...document.querySelectorAll('#works article, #works button')];
  }

  function findCard(...titles) {
    const accepted = new Set(titles.map(normalized));
    return cards().find((card) => accepted.has(normalized(card.querySelector('h3')?.textContent)));
  }

  function rename9006Card() {
    const card = findCard('90.06', 'NINETY Z S');
    if (!card) return false;
    const heading = card.querySelector('h3');
    if (heading && heading.textContent !== 'NINETY Z S') heading.textContent = 'NINETY Z S';
    if (card.getAttribute('aria-label') !== 'Open NINETY Z S project') card.setAttribute('aria-label', 'Open NINETY Z S project');
    card.dataset.ninetyZsProject = 'true';
    return true;
  }

  function rename9006Modal() {
    const modal = document.querySelector('.project9006-modal') || [...document.querySelectorAll('div.fixed.inset-0')].find((node) =>
      [...node.querySelectorAll('p')].some((item) => normalized(item.textContent) === '90.06')
    );
    if (!modal) return false;
    const label = [...modal.querySelectorAll('p')].find((item) => ['90.06', 'NINETY Z S'].includes(normalized(item.textContent)));
    if (label && label.textContent !== 'NINETY Z S') label.textContent = 'NINETY Z S';
    return true;
  }

  function setCardCopy(card) {
    const current = copy();
    const heading = card.querySelector('h3');
    if (heading && heading.textContent !== 'ANKA PERESILD') heading.textContent = 'ANKA PERESILD';

    const type = heading?.nextElementSibling;
    if (type?.tagName === 'P' && type.textContent !== current.type) type.textContent = current.type;

    const mark = [...card.querySelectorAll('span')].find((node) => /^\d{2}$/.test(node.textContent?.trim() || ''));
    if (mark && mark.textContent !== '13') mark.textContent = '13';

    const visualText = [...card.querySelectorAll('div')].find((node) =>
      /^(визуальный плейсхолдер|placeholder visual|открыть проект|open project)$/i.test(node.textContent?.trim() || '')
    );
    if (visualText && visualText.textContent !== current.open) visualText.textContent = current.open;

    const chipWrap = type?.nextElementSibling;
    if (chipWrap) chipWrap.remove();

    if (card.getAttribute('aria-label') !== 'Open ANKA PERESILD project') card.setAttribute('aria-label', 'Open ANKA PERESILD project');
  }

  function createAnkaCard() {
    const existing = findCard('ANKA PERESILD');
    if (existing) {
      existing.dataset.ankaPeresildCard = 'true';
      setCardCopy(existing);
      return true;
    }

    const grid = document.querySelector('#works .mt-10.grid');
    const source = findCard('STAY UGLY', 'STAYUGLY') || cards().at(-1);
    if (!grid || !source) return false;

    const card = document.createElement('button');
    card.type = 'button';
    card.className = `${source.className} cursor-pointer`.replace(/\s+/g, ' ').trim();
    card.innerHTML = source.innerHTML;
    card.dataset.ankaPeresildCard = 'true';
    setCardCopy(card);
    grid.append(card);
    return true;
  }

  function closeAnka() {
    ankaModal?.remove();
    ankaModal = null;
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;
  }

  function openAnka() {
    closeAnka();
    injectStyles();
    const current = copy();
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;

    const modal = document.createElement('div');
    modal.className = 'anka-peresild-modal';
    const inner = document.createElement('div');
    inner.className = 'anka-peresild-inner';
    const head = document.createElement('div');
    head.className = 'anka-peresild-head';
    const label = document.createElement('p');
    label.className = 'anka-peresild-label';
    label.textContent = 'ANKA PERESILD';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'anka-peresild-close';
    close.textContent = current.close;
    close.onclick = closeAnka;

    const hero = document.createElement('section');
    hero.className = 'anka-peresild-hero';
    const title = document.createElement('h2');
    title.className = 'anka-peresild-title';
    title.textContent = 'ANKA PERESILD';
    const status = document.createElement('p');
    status.className = 'anka-peresild-status';
    status.textContent = current.status;

    head.append(label, close);
    hero.append(title, status);
    inner.append(head, hero);
    modal.append(inner);
    document.body.append(modal);
    ankaModal = modal;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function apply() {
    rename9006Card();
    createAnkaCard();
    window.setTimeout(rename9006Modal, 120);
    window.setTimeout(rename9006Modal, 360);
  }

  injectStyles();
  [0, 120, 450, 1000].forEach((delay) => window.setTimeout(apply, delay));

  document.addEventListener('click', (event) => {
    const card = event.target.closest('[data-anka-peresild-card]');
    if (!card) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openAnka();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && ankaModal) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeAnka();
    }
  }, true);

  const observer = new MutationObserver(apply);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  new MutationObserver(() => {
    apply();
    if (ankaModal) {
      const current = copy();
      const close = ankaModal.querySelector('.anka-peresild-close');
      const status = ankaModal.querySelector('.anka-peresild-status');
      if (close && close.textContent !== current.close) close.textContent = current.close;
      if (status && status.textContent !== current.status) status.textContent = current.status;
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();