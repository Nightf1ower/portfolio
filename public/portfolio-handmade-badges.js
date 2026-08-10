(() => {
  if (window.__portfolioHandmadeBadgesV2) return;
  window.__portfolioHandmadeBadgesV2 = true;

  const VERSION = 'handmade-badges-2';
  const BADGE_SRC = '/works/HANDMADE.png?v=handmade-badge-2';
  const STYLE_ID = 'portfolio-handmade-badges-style';

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/\s+/g, ' ')
    .trim();

  function installStyles() {
    const current = document.getElementById(STYLE_ID);
    if (current?.dataset.version === VERSION) return;
    current?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-handmade-title-wrap {
        position: relative !important;
        display: inline-block !important;
        width: auto !important;
        max-width: 100% !important;
        overflow: visible !important;
        vertical-align: top !important;
      }

      .portfolio-handmade-media-anchor,
      .portfolio-handmade-merch-anchor {
        position: relative !important;
        overflow: visible !important;
      }

      .portfolio-handmade-badge {
        position: absolute !important;
        z-index: 500 !important;
        display: block !important;
        max-width: none !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        transform-origin: 50% 50% !important;
        animation: portfolio-handmade-pulse 4.8s ease-in-out infinite !important;
        will-change: transform;
      }

      .portfolio-handmade-badge--zny {
        top: -2.7rem !important;
        right: -4.4rem !important;
        width: clamp(10rem, 12.5vw, 15.5rem) !important;
      }

      .portfolio-handmade-badge--ninety-identity {
        top: -2.2rem !important;
        right: -4.6rem !important;
        width: clamp(9rem, 10.5vw, 13rem) !important;
      }

      .portfolio-handmade-badge--ninety-lookbook {
        top: -1.9rem !important;
        right: -1.15rem !important;
        width: clamp(8.5rem, 10vw, 12rem) !important;
      }

      .portfolio-handmade-badge--klubique {
        top: -2.25rem !important;
        right: -3.7rem !important;
        width: clamp(8rem, 9.5vw, 11.5rem) !important;
      }

      .portfolio-handmade-badge--flawa {
        top: -2.8rem !important;
        right: -4.4rem !important;
        width: clamp(9rem, 10.5vw, 13rem) !important;
      }

      .portfolio-handmade-badge--merch-prints {
        top: -2.5rem !important;
        left: 25% !important;
        right: auto !important;
        width: clamp(8.5rem, 10vw, 12rem) !important;
        animation-name: portfolio-handmade-pulse-centered !important;
      }

      #works [data-handmade-collages-card="true"] {
        position: relative !important;
        z-index: 6 !important;
        overflow: visible !important;
        isolation: isolate !important;
      }

      #works [data-handmade-collages-card="true"] .portfolio-handmade-native-dot {
        display: none !important;
      }

      #works [data-handmade-collages-card="true"] > .portfolio-handmade-badge--collages {
        top: -2.4rem !important;
        right: -2.8rem !important;
        width: clamp(10.5rem, 14vw, 14.5rem) !important;
        z-index: 600 !important;
      }

      @keyframes portfolio-handmade-pulse {
        0%, 100% { transform: scale(.965); }
        50% { transform: scale(1.04); }
      }

      @keyframes portfolio-handmade-pulse-centered {
        0%, 100% { transform: translateX(-50%) scale(.965); }
        50% { transform: translateX(-50%) scale(1.04); }
      }

      @media (max-width: 900px) {
        .portfolio-handmade-badge--zny {
          width: clamp(8.5rem, 22vw, 11.5rem) !important;
          top: -2rem !important;
          right: -2.4rem !important;
        }
        .portfolio-handmade-badge--ninety-identity,
        .portfolio-handmade-badge--flawa {
          width: clamp(8rem, 21vw, 11rem) !important;
          top: -1.9rem !important;
          right: -2.2rem !important;
        }
        .portfolio-handmade-badge--klubique {
          width: clamp(7.25rem, 20vw, 9.5rem) !important;
          top: -1.75rem !important;
          right: -1.9rem !important;
        }
        .portfolio-handmade-badge--ninety-lookbook {
          width: clamp(7.5rem, 20vw, 9.5rem) !important;
          top: -1.5rem !important;
          right: -.75rem !important;
        }
        .portfolio-handmade-badge--merch-prints {
          width: clamp(7.5rem, 20vw, 9.5rem) !important;
          top: -1.8rem !important;
        }
        #works [data-handmade-collages-card="true"] > .portfolio-handmade-badge--collages {
          width: 10rem !important;
          top: -2rem !important;
          right: -2rem !important;
        }
      }

      @media (max-width: 620px), (hover:none), (pointer:coarse) {
        .portfolio-handmade-badge--zny,
        .portfolio-handmade-badge--ninety-identity,
        .portfolio-handmade-badge--flawa {
          width: clamp(7.25rem, 31vw, 9.75rem) !important;
          top: -1.35rem !important;
          right: -1.15rem !important;
          animation-duration: 5.2s !important;
        }
        .portfolio-handmade-badge--klubique {
          width: clamp(6.75rem, 28vw, 8.75rem) !important;
          top: -1.25rem !important;
          right: -1rem !important;
          animation-duration: 5.2s !important;
        }
        .portfolio-handmade-badge--ninety-lookbook {
          width: clamp(7rem, 29vw, 9rem) !important;
          top: -1.2rem !important;
          right: -.55rem !important;
          animation-duration: 5.2s !important;
        }
        .portfolio-handmade-badge--merch-prints {
          left: 50% !important;
          width: clamp(7rem, 29vw, 9rem) !important;
          top: -1.35rem !important;
          animation-duration: 5.2s !important;
        }
        #works [data-handmade-collages-card="true"] > .portfolio-handmade-badge--collages {
          width: clamp(9rem, 33vw, 11.5rem) !important;
          top: -1.75rem !important;
          right: -1.5rem !important;
          animation-duration: 5.2s !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .portfolio-handmade-badge { animation: none !important; }
        .portfolio-handmade-badge--merch-prints { transform: translateX(-50%) !important; }
      }
    `;
    document.head.append(style);
  }

  function badge(className, key) {
    const image = document.createElement('img');
    image.className = `portfolio-handmade-badge ${className}`;
    image.src = BADGE_SRC;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.draggable = false;
    image.decoding = 'async';
    image.dataset.portfolioFullres = 'true';
    image.dataset.handmadeKey = key;
    return image;
  }

  function addHeadingBadge(heading, className, key) {
    if (!(heading instanceof HTMLElement)) return false;

    let wrap = heading.querySelector(':scope > .portfolio-handmade-title-wrap');
    if (!wrap) {
      const label = heading.textContent?.replace(/\s+/g, ' ').trim() || '';
      heading.textContent = '';
      wrap = document.createElement('span');
      wrap.className = 'portfolio-handmade-title-wrap';
      wrap.textContent = label;
      heading.append(wrap);
    }

    let image = wrap.querySelector(`:scope > [data-handmade-key="${key}"]`);
    if (!image) {
      image = badge(className, key);
      wrap.append(image);
    }
    return true;
  }

  function findHeading(root, predicate) {
    if (!(root instanceof Element)) return null;
    return [...root.querySelectorAll('h1,h2,h3,h4')].find((heading) => predicate(normalize(heading.textContent))) || null;
  }

  function applyZny() {
    const modal = document.querySelector('.zny-modal');
    if (!modal) return false;
    const heading = findHeading(modal, (text) => (
      (text.includes('FW 24/25') || text.includes('FW24/25') || text.includes('FW 24 25'))
      && (text.includes('ХЭНДМЕЙД') || text.includes('HANDMADE'))
    ));
    return addHeadingBadge(heading, 'portfolio-handmade-badge--zny', 'zny-handmade-prints');
  }

  function applyMerch() {
    const modal = document.querySelector('.mc-modal');
    if (!modal) return false;

    const title = [...modal.querySelectorAll('.mc-section-title')].find((heading) => {
      const text = normalize(heading.textContent);
      return text === 'ГРАФИКА ДЛЯ МЕРЧА' || text === 'MERCH GRAPHICS';
    });
    const section = title?.closest('.mc-section');
    if (!section) return false;

    const printsGrid = section.querySelector('.mc-grid--4')
      || [...section.querySelectorAll('.mc-grid')].find((grid) => grid.querySelector('img[src*="/yablochko/print/"]'))
      || null;
    if (!printsGrid) return false;

    printsGrid.classList.add('portfolio-handmade-merch-anchor');
    let image = printsGrid.querySelector(':scope > [data-handmade-key="merch-yablochko-prints"]');
    if (!image) {
      image = badge('portfolio-handmade-badge--merch-prints', 'merch-yablochko-prints');
      printsGrid.append(image);
    }
    return true;
  }

  function applyNinety() {
    const modal = document.querySelector('.project9006-modal');
    if (!modal) return false;

    const identityHeading = findHeading(modal, (text) => (
      text === 'АЙДЕНТИКА И ЛОГОТИП'
      || text === 'VISUAL IDENTITY & LOGO DESIGN'
    ));
    const identityDone = addHeadingBadge(identityHeading, 'portfolio-handmade-badge--ninety-identity', 'ninety-identity');

    const cards = [...modal.querySelectorAll('.project9006-photoshoot-card')];
    const lastCard = cards.at(-1) || null;
    let lookbookDone = false;
    if (lastCard) {
      lastCard.classList.add('portfolio-handmade-media-anchor');
      let image = lastCard.querySelector(':scope > [data-handmade-key="ninety-lookbook-last"]');
      if (!image) {
        image = badge('portfolio-handmade-badge--ninety-lookbook', 'ninety-lookbook-last');
        lastCard.append(image);
      }
      lookbookDone = true;
    }
    return identityDone || lookbookDone;
  }

  function applyPosters() {
    const modal = document.querySelector('.pcg-modal');
    if (!modal) return false;

    const klubiqueHeading = modal.querySelector('.pcg-event-block--klubique .pcg-event-subtitle')
      || findHeading(modal, (text) => text === 'KLUBIQUE PARTY');
    const flawaHeading = modal.querySelector('.pcg-flawa-section .pcg-section-title')
      || findHeading(modal, (text) => text === 'FLAWA POSTERS');

    const klubiqueDone = addHeadingBadge(klubiqueHeading, 'portfolio-handmade-badge--klubique', 'posters-klubique');
    const flawaDone = addHeadingBadge(flawaHeading, 'portfolio-handmade-badge--flawa', 'posters-flawa');
    return klubiqueDone || flawaDone;
  }

  function findCollagesCard() {
    const direct = document.querySelector('#works [data-auto-gallery-card="COLLAGES PHOTO EDIT"]');
    if (direct) return direct;
    return [...document.querySelectorAll('#works .mt-10.grid > article, #works .mt-10.grid > button')].find((card) => (
      normalize(card.querySelector('h3')?.textContent) === 'COLLAGES PHOTO EDIT'
    )) || null;
  }

  function applyCollagesCard() {
    const card = findCollagesCard();
    if (!card) return false;
    card.dataset.handmadeCollagesCard = 'true';

    const nativeDot = [...card.querySelectorAll('span')].find((span) => (
      span.classList.contains('h-3')
      && span.classList.contains('w-3')
      && span.classList.contains('rounded-full')
    ));
    nativeDot?.classList.add('portfolio-handmade-native-dot');

    let image = card.querySelector(':scope > [data-handmade-key="collages-card"]');
    if (!image) {
      image = badge('portfolio-handmade-badge--collages', 'collages-card');
      card.append(image);
    }
    return true;
  }

  function applyAll() {
    installStyles();
    applyCollagesCard();
    applyZny();
    applyMerch();
    applyNinety();
    applyPosters();
  }

  let frame = 0;
  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      applyAll();
    });
  }

  function runPasses() {
    [0, 70, 160, 320, 650, 1100, 1800, 2800].forEach((delay) => window.setTimeout(schedule, delay));
  }

  const relevantProjects = new Set([
    'ZNY',
    'MERCH',
    'NINETY Z S',
    '90.06',
    'POSTERS',
    'COLLAGES PHOTO EDIT',
  ]);

  // Window capture fires before legacy document capture handlers that can stop propagation.
  window.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const card = target.closest('#works article,#works button');
    const title = normalize(card?.querySelector('h3')?.textContent);
    if (relevantProjects.has(title)) runPasses();
  }, true);

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) runPasses();
  }, true);

  // Small scoped observer: only reacts when one of the relevant project modals is inserted.
  // It does not re-run on image loads, attributes or inner gallery mutations.
  const modalSelectors = ['.zny-modal', '.mc-modal', '.project9006-modal', '.pcg-modal'];
  const modalObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (modalSelectors.some((selector) => node.matches?.(selector) || node.querySelector?.(selector))) {
          runPasses();
          return;
        }
      }
    }
  });
  modalObserver.observe(document.body, { childList: true });

  window.addEventListener('load', runPasses, { once: true });
  installStyles();
  runPasses();
})();
