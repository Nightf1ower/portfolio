(() => {
  if (window.__postersMoreLinksV1) return;
  window.__postersMoreLinksV1 = true;

  const VERSION = 'posters-more-links-1';

  const COPY = {
    ru: {
      title: 'ИХ ЕЩЁ БОЛЬШЕ',
      text: 'Постеры также есть внутри отдельных проектов.',
      action: 'К ПОСТЕРАМ',
      yablochko: 'ЯБЛОЧКО ЗЕЛЁНОЕ',
    },
    en: {
      title: "THERE'S MORE",
      text: 'More poster work can also be found inside individual projects.',
      action: 'VIEW POSTERS',
      yablochko: 'YABLOCHKO ZELENOE',
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const normalize = (value) => String(value || '')
    .trim()
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const headingText = (section) => normalize(
    section?.querySelector('h1,h2,h3,.mc-section-title,.project9006-clean-title,.pink-punk-section__title')?.textContent,
  );

  function injectStyles() {
    document.getElementById('posters-more-links-style')?.remove();
    const style = document.createElement('style');
    style.id = 'posters-more-links-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .pcg-more {
        box-sizing: border-box;
        width: 100vw;
        margin: -1px 0 0 calc(50% - 50vw);
        padding: clamp(5rem,10vw,9rem) max(1rem,env(safe-area-inset-right)) max(5rem,calc(3rem + env(safe-area-inset-bottom))) max(1rem,env(safe-area-inset-left));
        border-top: 1px solid rgba(5,5,5,.28);
        background: #56876D;
        color: #050505;
      }
      .pcg-more__title {
        margin: 0;
        font: 900 clamp(3.8rem,9vw,9rem)/.76 Arial,Helvetica,sans-serif;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .pcg-more__copy {
        width: min(100%,46rem);
        margin: clamp(1.25rem,2.5vw,2rem) 0 clamp(2.5rem,5vw,4rem);
        font: 600 clamp(1rem,1.4vw,1.25rem)/1.45 Arial,Helvetica,sans-serif;
        letter-spacing: -.015em;
      }
      .pcg-more__list { border-top: 1px solid rgba(5,5,5,.32); }
      .pcg-more__link {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: clamp(1.35rem,2.8vw,2.4rem) 0;
        border: 0;
        border-bottom: 1px solid rgba(5,5,5,.32);
        background: transparent;
        color: #050505;
        cursor: pointer;
        text-align: left;
        appearance: none;
        -webkit-appearance: none;
        touch-action: manipulation;
      }
      .pcg-more__brand {
        pointer-events: none;
        font: 900 clamp(2.6rem,6.2vw,6.3rem)/.8 Arial,Helvetica,sans-serif;
        letter-spacing: -.075em;
        text-transform: uppercase;
      }
      .pcg-more__action {
        flex: 0 0 auto;
        pointer-events: none;
        font: 900 .68rem/1 Arial,Helvetica,sans-serif;
        letter-spacing: .2em;
        text-transform: uppercase;
      }
      .pcg-more__arrow {
        display: inline-block;
        margin-left: .6rem;
        font-size: 1.25em;
        transition: transform .2s ease;
      }
      .pcg-more__link:hover .pcg-more__arrow,
      .pcg-more__link:focus-visible .pcg-more__arrow { transform: translateX(.5rem); }
      @media (max-width:620px) {
        .pcg-more__link { align-items: flex-end; }
        .pcg-more__brand { font-size: clamp(2.3rem,13vw,4.5rem); }
        .pcg-more__action { font-size: .56rem; letter-spacing: .12em; }
      }
    `;
    document.head.append(style);
  }

  function findHomeCard(titles) {
    const accepted = new Set(titles.map(normalize));
    return [...document.querySelectorAll('#works article,#works button')].find((card) => (
      accepted.has(normalize(card.querySelector('h3')?.textContent))
    )) || null;
  }

  function findPinkPunkPosters() {
    return document.querySelector('.pink-punk-section--posters') || [...document.querySelectorAll('.pink-punk-section')].find((section) => (
      headingText(section).includes('POSTER') || headingText(section).includes('ПОСТЕР')
    )) || null;
  }

  function findNinetyPosters() {
    return document.querySelector('.project9006-posters-grid')?.closest('section') || [...document.querySelectorAll('.project9006-modal section')].find((section) => {
      const text = headingText(section);
      return text.includes('POSTER') || text.includes('ПОСТЕР');
    }) || null;
  }

  function findMerchPosters(target) {
    const modal = document.querySelector('.mc-modal');
    if (!modal) return null;

    if (target === 'dxs') {
      const dxs = modal.querySelector('.mc-dxs');
      if (!dxs) return null;
      return [...dxs.querySelectorAll('.mc-section')].find((section) => {
        const text = headingText(section);
        return text.includes('POSTER') || text.includes('ПОСТЕР');
      }) || null;
    }

    return [...modal.querySelectorAll('.mc-section')].find((section) => {
      if (section.closest('.mc-dxs')) return false;
      const text = headingText(section);
      return text.includes('POSTER') || text.includes('ПОСТЕР');
    }) || null;
  }

  const TARGETS = {
    pinkpunk: {
      titles: ['PINK PUNK', 'PINKPUNK'],
      locate: findPinkPunkPosters,
    },
    ninety: {
      titles: ['NINETY Z S', '90.06'],
      locate: findNinetyPosters,
    },
    yablochko: {
      titles: ['MERCH'],
      locate: () => findMerchPosters('yablochko'),
    },
    dxs: {
      titles: ['MERCH'],
      locate: () => findMerchPosters('dxs'),
    },
  };

  function scrollDirectly(target) {
    if (!target) return false;
    const scroller = target.closest('.pink-punk-fullscreen,.project9006-modal,.mc-modal');
    if (!scroller) {
      target.scrollIntoView({ block: 'start' });
      return true;
    }

    const scrollerRect = scroller.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = scroller.scrollTop + targetRect.top - scrollerRect.top - 16;
    scroller.scrollTop = Math.max(0, top);
    return true;
  }

  function waitForTarget(locate) {
    const immediate = locate();
    if (immediate) {
      requestAnimationFrame(() => scrollDirectly(immediate));
      return;
    }

    let observer = null;
    let timer = null;
    const finish = () => {
      const target = locate();
      if (!target) return false;
      observer?.disconnect();
      if (timer) clearTimeout(timer);
      requestAnimationFrame(() => scrollDirectly(target));
      return true;
    };

    observer = new MutationObserver(finish);
    observer.observe(document.body, { childList: true, subtree: true });
    timer = window.setTimeout(() => {
      finish();
      observer?.disconnect();
    }, 1800);
  }

  function openTarget(key) {
    const config = TARGETS[key];
    if (!config) return;
    const card = findHomeCard(config.titles);
    if (!card) return;

    document.querySelector('.pcg-close')?.click();
    requestAnimationFrame(() => {
      waitForTarget(config.locate);
      card.click();
    });
  }

  function brandLabel(key) {
    if (key === 'pinkpunk') return 'PINK PUNK';
    if (key === 'ninety') return 'NINETY Z S';
    if (key === 'dxs') return 'DXS';
    return COPY[language()].yablochko;
  }

  function createBlock(inner) {
    const block = document.createElement('section');
    block.className = 'pcg-more';
    block.dataset.version = VERSION;

    const title = document.createElement('h2');
    title.className = 'pcg-more__title';
    const copy = document.createElement('p');
    copy.className = 'pcg-more__copy';
    const list = document.createElement('div');
    list.className = 'pcg-more__list';

    ['pinkpunk', 'ninety', 'yablochko', 'dxs'].forEach((key) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pcg-more__link';
      button.dataset.posterProjectTarget = key;

      const brand = document.createElement('span');
      brand.className = 'pcg-more__brand';
      brand.dataset.posterBrand = key;

      const action = document.createElement('span');
      action.className = 'pcg-more__action';
      action.dataset.posterAction = 'true';
      const arrow = document.createElement('span');
      arrow.className = 'pcg-more__arrow';
      arrow.textContent = '→';
      action.append(document.createTextNode(''), arrow);

      button.append(brand, action);
      list.append(button);
    });

    block.append(title, copy, list);
    inner.append(block);
    return block;
  }

  function updateBlock() {
    injectStyles();
    const inner = document.querySelector('.pcg-modal .pcg-inner');
    if (!inner) return;
    const block = inner.querySelector(':scope > .pcg-more') || createBlock(inner);
    const copy = COPY[language()];
    block.querySelector('.pcg-more__title').textContent = copy.title;
    block.querySelector('.pcg-more__copy').textContent = copy.text;

    block.querySelectorAll('.pcg-more__link').forEach((button) => {
      const key = button.dataset.posterProjectTarget;
      const brand = button.querySelector('.pcg-more__brand');
      const action = button.querySelector('.pcg-more__action');
      if (brand) brand.textContent = brandLabel(key);
      const textNode = action ? [...action.childNodes].find((node) => node.nodeType === Node.TEXT_NODE) : null;
      if (textNode) textNode.nodeValue = copy.action;
      button.setAttribute('aria-label', `${brandLabel(key)} — ${copy.action}`);
    });
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateBlock();
    });
  }

  new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => [...mutation.addedNodes].some((node) => (
      node.nodeType === 1 && (node.matches?.('.pcg-modal') || node.querySelector?.('.pcg-modal'))
    )));
    if (relevant) schedule();
  }).observe(document.body, { childList: true, subtree: true });

  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('.pcg-more__link[data-poster-project-target]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openTarget(button.dataset.posterProjectTarget);
  }, true);

  window.addEventListener('load', schedule);
  schedule();
})();
