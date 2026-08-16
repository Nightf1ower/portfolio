(() => {
  if (window.__portfolioHandmadeBadgesV4) return;
  window.__portfolioHandmadeBadgesV4 = true;
  window.__portfolioHandmadeBadgesV3 = true;

  const VERSION = 'handmade-badges-4';
  const BADGE_SRC = '/works/HANDMADE.png?v=handmade-badge-3';
  const STYLE_ID = 'portfolio-handmade-badges-style';

  const normalize = (value) => String(value || '')
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/\s+/g, ' ')
    .trim();

  function preloadBadgeRatio() {
    const probe = new Image();
    probe.onload = () => {
      if (!probe.naturalWidth || !probe.naturalHeight) return;
      document.documentElement.style.setProperty('--portfolio-handmade-ratio', `${probe.naturalWidth} / ${probe.naturalHeight}`);
    };
    probe.src = BADGE_SRC;
  }

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
        width: fit-content !important;
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
        z-index: 700 !important;
        display: block !important;
        aspect-ratio: var(--portfolio-handmade-ratio, 2 / 1) !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        background-color: transparent !important;
        background-image: url('${BADGE_SRC}') !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
        pointer-events: auto !important;
        cursor: default !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        touch-action: pan-x pan-y !important;
        transform-origin: 50% 50% !important;
        animation: portfolio-handmade-pulse-v4 4.8s ease-in-out infinite !important;
        will-change: scale;
      }

      .portfolio-handmade-badge--zny {
        top: -2.7rem !important;
        right: -4.4rem !important;
        width: clamp(10rem, 12.5vw, 15.5rem) !important;
      }

      .portfolio-handmade-badge--ninety-identity {
        top: -2.15rem !important;
        right: -3.3rem !important;
        width: clamp(8rem, 9vw, 11rem) !important;
      }

      .project9006-modal .project9006-photoshoot-card.portfolio-handmade-media-anchor {
        position: relative !important;
        overflow: visible !important;
      }

      .project9006-modal .project9006-photoshoot-card.portfolio-handmade-media-anchor > .portfolio-handmade-badge--ninety-lookbook {
        position: absolute !important;
        top: -1.6rem !important;
        right: -1rem !important;
        z-index: 900 !important;
        display: block !important;
        width: clamp(7.5rem, 9vw, 10.5rem) !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 0 !important;
        pointer-events: auto !important;
        transform: none !important;
        animation: portfolio-handmade-pulse-v4 4.8s ease-in-out infinite !important;
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

      .portfolio-handmade-badge--merch-brochures {
        top: -2.4rem !important;
        left: 50% !important;
        right: auto !important;
        translate: -50% 0 !important;
        width: clamp(8.5rem, 10vw, 12rem) !important;
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
        z-index: 800 !important;
      }

      @keyframes portfolio-handmade-pulse-v4 {
        0%, 100% { scale: .965; }
        50% { scale: 1.04; }
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
        .project9006-modal .project9006-photoshoot-card.portfolio-handmade-media-anchor > .portfolio-handmade-badge--ninety-lookbook {
          width: clamp(7.25rem, 19vw, 9.25rem) !important;
          top: -1.35rem !important;
          right: -.7rem !important;
        }
        .portfolio-handmade-badge--merch-brochures {
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
        .project9006-modal .project9006-photoshoot-card.portfolio-handmade-media-anchor > .portfolio-handmade-badge--ninety-lookbook {
          width: clamp(6.75rem, 28vw, 8.5rem) !important;
          top: -1.1rem !important;
          right: -.45rem !important;
          animation-duration: 5.2s !important;
        }
        .portfolio-handmade-badge--merch-brochures {
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
        .portfolio-handmade-badge { animation: none !important; scale: 1 !important; }
      }
    `;
    document.head.append(style);
  }

  const BLOCKED_EVENTS = [
    'pointerdown', 'pointerup', 'pointercancel',
    'mousedown', 'mouseup',
    'touchstart', 'touchend',
    'click', 'dblclick', 'auxclick',
    'contextmenu', 'dragstart',
  ];

  function stopBadgeEvent(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest('.portfolio-handmade-badge')) return;
    if (['click', 'dblclick', 'auxclick', 'contextmenu', 'dragstart'].includes(event.type)) event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  BLOCKED_EVENTS.forEach((type) => {
    window.addEventListener(type, stopBadgeEvent, { capture: true, passive: type.startsWith('touch') });
  });

  function badge(className, key) {
    const node = document.createElement('span');
    node.className = `portfolio-handmade-badge ${className}`;
    node.setAttribute('aria-hidden', 'true');
    node.setAttribute('role', 'presentation');
    node.tabIndex = -1;
    node.dataset.handmadeKey = key;
    node.dataset.lightboxIgnore = 'true';
    node.dataset.galleryIgnore = 'true';
    node.dataset.portfolioNoOpen = 'true';
    return node;
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

    let node = wrap.querySelector(`:scope > [data-handmade-key="${key}"]`);
    if (!node) {
      node = badge(className, key);
      wrap.append(node);
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

    section.querySelectorAll('[data-handmade-key="merch-yablochko-prints"]').forEach((node) => node.remove());

    const brochureGrid = [...section.querySelectorAll('.mc-grid')].find((grid) => (
      grid.querySelector('img[src*="/yablochko/brochure/"],img[data-src*="/yablochko/brochure/"]')
    )) || section.querySelector('.mc-grid--2');
    if (!brochureGrid) return false;

    brochureGrid.classList.add('portfolio-handmade-merch-anchor');
    let node = brochureGrid.querySelector(':scope > [data-handmade-key="merch-yablochko-brochures"]');
    if (!node) {
      node = badge('portfolio-handmade-badge--merch-brochures', 'merch-yablochko-brochures');
      brochureGrid.append(node);
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
      let node = lastCard.querySelector(':scope > [data-handmade-key="ninety-lookbook-last"]');
      if (!node) {
        node = badge('portfolio-handmade-badge--ninety-lookbook', 'ninety-lookbook-last');
        lastCard.append(node);
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
      !span.classList.contains('portfolio-handmade-badge')
      && span.classList.contains('h-3')
      && span.classList.contains('w-3')
      && span.classList.contains('rounded-full')
    ));
    nativeDot?.classList.add('portfolio-handmade-native-dot');

    let node = card.querySelector(':scope > [data-handmade-key="collages-card"]');
    if (!node) {
      node = badge('portfolio-handmade-badge--collages', 'collages-card');
      card.append(node);
    }
    return true;
  }

  function removeLegacyImageBadges() {
    document.querySelectorAll('img.portfolio-handmade-badge').forEach((image) => image.remove());
  }

  function applyAll() {
    installStyles();
    removeLegacyImageBadges();
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

  window.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target || target.closest('.portfolio-handmade-badge')) return;
    const card = target.closest('#works article,#works button');
    const title = normalize(card?.querySelector('h3')?.textContent);
    if (relevantProjects.has(title)) runPasses();
  }, true);

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) runPasses();
  }, true);

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
  preloadBadgeRatio();
  installStyles();
  runPasses();
})();
