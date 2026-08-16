(() => {
  if (window.__projectNavigationPinkPunkBridgeV1) return;
  window.__projectNavigationPinkPunkBridgeV1 = true;

  const VERSION = 'project-navigation-pink-punk-bridge-1';
  const BUTTON = '.desktop-project-navigation__button[data-project-slug="pink-punk"]';

  const norm = value => String(value || '')
    .toUpperCase()
    .replace(/\|/g, ' ')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const visible = node => {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  };

  function pinkIsOpen() {
    const modal = document.querySelector('.pink-punk-fullscreen');
    if (modal && visible(modal)) return true;
    const gallery = document.querySelector('.pink-punk-gallery');
    return Boolean(gallery && visible(gallery));
  }

  function pinkCard() {
    return [...document.querySelectorAll('#works article,#works button')].find(card => {
      const title = norm(card.querySelector('h3')?.textContent);
      return title === 'PINK PUNK' || title === 'PINKPUNK';
    }) || null;
  }

  function activeProjectModal() {
    const selectors = [
      '.blandetto-modal','.bf','.zny-modal','.fable-modal','.cr-modal','.project9006-modal',
      '.pcg-modal','.mc-modal','.m10-modal','.stk-modal','.lcg-modal','.album-covers-modal',
      '.su-modal','.anka-peresild-modal','.vtb-modal','.collages-modal'
    ];
    for (const selector of selectors) {
      const modal = [...document.querySelectorAll(selector)].filter(visible).at(-1);
      if (modal) return modal;
    }
    return null;
  }

  function closeModal(modal) {
    if (!(modal instanceof HTMLElement)) return;

    const stable = modal.querySelector(':scope > .portfolio-stable-head .portfolio-stable-head__close');
    if (stable) {
      stable.click();
      return;
    }

    const explicit = modal.querySelector([
      '.blandetto-close','.bf-close','.bf-x','.zny-close','.fable-close','.cr-close',
      '.project9006-toolbar__close','.project9006-close','.pcg-close','.mc-close','.stk-close',
      '.lcg-close','.album-covers-close','.su-close','.anka-peresild-close','.vtb-close'
    ].join(','));
    if (explicit) {
      explicit.click();
      return;
    }

    const generic = [...modal.querySelectorAll('button,[role="button"]')].find(button => {
      const text = norm([button.textContent, button.getAttribute('aria-label'), button.getAttribute('title')].filter(Boolean).join(' '));
      return text === 'CLOSE' || text === 'ЗАКРЫТЬ' || text.includes('CLOSE PROJECT') || text.includes('ЗАКРЫТЬ ПРОЕКТ');
    });
    generic?.click();
  }

  function setPinkUrl() {
    const url = new URL(location.href);
    url.searchParams.set('project', 'pink-punk');
    url.searchParams.delete('section');
    url.hash = '';
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${location.pathname}${location.search}${location.hash}`;
    if (next !== current) {
      history.pushState({ projectNavigationPinkBridge: VERSION, project: 'pink-punk' }, '', next);
    }
  }

  function openPink() {
    if (pinkIsOpen()) return;
    const card = pinkCard();
    if (!card) return;
    card.click();
  }

  function navigateToPink() {
    if (pinkIsOpen()) return;

    setPinkUrl();
    const current = activeProjectModal();
    if (current) closeModal(current);

    // React's PINK PUNK project is opened by its real work-card click.
    // Retry briefly because legacy project modals may remove themselves asynchronously.
    [0, 60, 160, 360, 760, 1300].forEach(delay => {
      window.setTimeout(() => {
        if (pinkIsOpen()) return;
        openPink();
      }, delay);
    });
  }

  function pinkButtonFromEvent(event) {
    const target = event.target instanceof Element ? event.target : null;
    return target?.closest(BUTTON) || null;
  }

  window.addEventListener('pointerdown', event => {
    if (!pinkButtonFromEvent(event)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    navigateToPink();
  }, true);

  window.addEventListener('click', event => {
    if (!pinkButtonFromEvent(event)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }, true);

  window.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (!pinkButtonFromEvent(event)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    navigateToPink();
  }, true);
})();