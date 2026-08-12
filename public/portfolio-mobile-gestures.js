(() => {
  if (window.__portfolioMobileGesturesV1) return;
  window.__portfolioMobileGesturesV1 = true;

  const VERSION = 'portfolio-mobile-gestures-1';
  const isTouchUI = () =>
    window.matchMedia('(hover: none), (pointer: coarse)').matches
    || navigator.maxTouchPoints > 0
    || window.innerWidth <= 820;

  const PROJECT_SELECTORS = [
    '.zny-modal',
    '.fable-modal',
    '.pink-punk-fullscreen',
    '.cr-modal',
    '.blandetto-modal',
    '.bf',
    '.project9006-modal',
    '.pcg-modal',
    '.pag-modal',
    '.mc-modal',
    '.stk-modal',
    '.lcg-modal',
    '.album-covers-modal',
    '.su-modal',
    '.anka-peresild-modal',
    '.vtb-modal',
    '.collages-modal',
  ];

  const PROJECT_CLOSE_SELECTORS = [
    '.zny-close',
    '.fable-close',
    '.su-close',
    '.vtb-close',
    '.cr-close',
    '.mc-close',
    '.stk-close',
    '.pcg-close',
    '.lcg-close',
    '.pag-close',
    '.blandetto-close',
    '.bf-close',
    '.bf-x',
    '.anka-peresild-close',
    '.album-covers-close',
    '.project9006-toolbar__close',
    '.project9006-close',
    '.p9006-close',
    '.pink-punk-fullscreen > div > .sticky button',
  ];

  const LIGHTBOX_SELECTORS = [
    '.psg-lightbox',
    '.pul-overlay',
    '.cr-light',
    '.cr-lightbox',
    '.zny-light',
    '.zny-lightbox',
    '.fable-light',
    '.fable-lightbox',
    '.bf-light',
    '.blandetto-lightbox',
    '.su-light',
    '.su-lightbox',
    '.m10-light',
    '.merch9-light',
    '.mc-light',
    '.mc-lightbox',
    '.project9006-lightbox',
    '.vtb-light',
    '.pcg-light',
    '.pcg-lightbox',
    '.pag-light',
    '.pag-lightbox',
    '.lcg-light',
    '.lcg-lightbox',
    '.stk-light',
    '.stk-lightbox',
    '.album-covers-lightbox',
    '.anka-peresild-lightbox',
    '.collages-light',
    '.collages-lightbox',
    '.z-\\[150\\].fixed.inset-0',
  ];

  const CLOSE_HINTS = /(^|[\s_-])(close|dismiss|exit|lightbox-close|modal-close)([\s_-]|$)|закрыть|✕|×/i;
  const PREV_HINTS = /(^|[\s_-])(prev|previous|left)([\s_-]|$)|пред|←|‹/i;
  const NEXT_HINTS = /(^|[\s_-])(next|right)([\s_-]|$)|след|→|›/i;
  const PROJECT_SELECTOR = PROJECT_SELECTORS.join(',');
  const LIGHTBOX_SELECTOR = LIGHTBOX_SELECTORS.join(',');

  const state = {
    lightbox: null,
    image: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    startTime: 0,
    mode: '',
    originalTransition: '',
    originalTransform: '',
    originalOpacity: '',
    project: null,
    edgeIndicator: null,
    edgeStartX: 0,
    edgeStartY: 0,
    edgeLastX: 0,
    edgeLastY: 0,
    edgeTime: 0,
    edgeMode: '',
  };

  function injectStyles() {
    document.getElementById('portfolio-mobile-gestures-style')?.remove();
    const style = document.createElement('style');
    style.id = 'portfolio-mobile-gestures-style';
    style.dataset.version = VERSION;
    style.textContent = `
      @media (hover:none), (pointer:coarse), (max-width:820px) {
        #works .mt-10.grid > article,
        #works .mt-10.grid > button {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        #works .mt-10.grid > article:active,
        #works .mt-10.grid > button:active {
          transform: scale(.985) !important;
          transition: transform 90ms ease !important;
        }

        ${PROJECT_CLOSE_SELECTORS.join(',')},
        .psg-close,.pul-close,
        [class*="light"][class*="close"],
        [class*="lightbox"][class*="close"] {
          min-width: 44px !important;
          min-height: 44px !important;
          -webkit-tap-highlight-color: transparent;
        }

        ${LIGHTBOX_SELECTOR} {
          min-height: 100dvh;
          overscroll-behavior: none;
          touch-action: pinch-zoom !important;
        }

        .pmg-edge-indicator {
          position: fixed;
          left: max(7px, env(safe-area-inset-left));
          top: 50%;
          z-index: 2147483646;
          width: 34px;
          height: 56px;
          display: grid;
          place-items: center;
          transform: translate3d(-46px,-50%,0);
          border: 1px solid rgba(255,255,255,.65);
          background: rgba(5,5,5,.78);
          color: #fff;
          font: 900 22px/1 Arial,Helvetica,sans-serif;
          pointer-events: none;
          opacity: 0;
          transition: transform 160ms cubic-bezier(.22,.8,.25,1), opacity 120ms ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .pmg-edge-indicator.is-active {
          opacity: 1;
        }

        .pmg-edge-indicator.is-commit {
          transform: translate3d(8px,-50%,0) scale(1.06);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .pmg-edge-indicator {
          transition-duration: 0ms !important;
        }
      }
    `;
    document.head.append(style);
  }

  function isVisible(node) {
    if (!(node instanceof Element) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    if (css.display === 'none' || css.visibility === 'hidden' || Number(css.opacity || 1) === 0) return false;
    const rect = node.getBoundingClientRect();
    return rect.width > 2 && rect.height > 2;
  }

  function isProjectModal(node) {
    return node instanceof Element && node.matches(PROJECT_SELECTOR);
  }

  function activeProjectModal() {
    const known = PROJECT_SELECTORS
      .flatMap((selector) => [...document.querySelectorAll(selector)])
      .filter(isVisible);
    if (!known.length) return null;
    return known.at(-1);
  }

  function fallbackLightbox() {
    const candidates = [...document.body.querySelectorAll('div,section')]
      .filter((node) => {
        if (!isVisible(node) || isProjectModal(node) || node.closest('#works')) return false;
        const css = getComputedStyle(node);
        if (css.position !== 'fixed') return false;
        const rect = node.getBoundingClientRect();
        if (rect.width < innerWidth * .78 || rect.height < innerHeight * .72) return false;
        if (!node.querySelector('img')) return false;
        const z = Number.parseInt(css.zIndex, 10);
        return Number.isFinite(z) ? z >= 1000 : true;
      })
      .filter((node) => !node.querySelector(PROJECT_SELECTOR));
    return candidates.sort((a, b) => {
      const az = Number.parseInt(getComputedStyle(a).zIndex, 10) || 0;
      const bz = Number.parseInt(getComputedStyle(b).zIndex, 10) || 0;
      return az - bz;
    }).at(-1) || null;
  }

  function activeLightbox() {
    const known = LIGHTBOX_SELECTORS
      .flatMap((selector) => [...document.querySelectorAll(selector)])
      .filter(isVisible);
    return known.at(-1) || fallbackLightbox();
  }

  function largestVisibleImage(root) {
    if (!(root instanceof Element)) return null;
    return [...root.querySelectorAll('img')]
      .filter(isVisible)
      .map((image) => {
        const rect = image.getBoundingClientRect();
        return { image, area: rect.width * rect.height };
      })
      .sort((a, b) => b.area - a.area)[0]?.image || null;
  }

  function buttonText(button) {
    return [
      button.className,
      button.id,
      button.getAttribute('aria-label'),
      button.getAttribute('title'),
      button.textContent,
    ].filter(Boolean).join(' ').trim();
  }

  function buttons(root) {
    return root instanceof Element ? [...root.querySelectorAll('button,[role="button"]')].filter(isVisible) : [];
  }

  function findClose(root) {
    const known = [
      '.psg-close','.pul-close','.vtb-light-close',
      '[class*="lightbox"][class*="close"]',
      '[class*="light"][class*="close"]',
      '[aria-label*="close" i]',
    ];
    for (const selector of known) {
      const node = root.querySelector(selector);
      if (isVisible(node)) return node;
    }
    return buttons(root).find((button) => CLOSE_HINTS.test(buttonText(button))) || null;
  }

  function findNav(root, direction, image) {
    const hint = direction < 0 ? PREV_HINTS : NEXT_HINTS;
    const hinted = buttons(root).find((button) => {
      if (button === findClose(root)) return false;
      return hint.test(buttonText(button));
    });
    if (hinted) return hinted;

    const imageRect = image?.getBoundingClientRect();
    const center = imageRect ? imageRect.left + imageRect.width / 2 : innerWidth / 2;
    const candidates = buttons(root)
      .filter((button) => button !== findClose(root))
      .map((button) => {
        const rect = button.getBoundingClientRect();
        return { button, center: rect.left + rect.width / 2 };
      })
      .filter(({ center: x }) => direction < 0 ? x < center - 12 : x > center + 12)
      .sort((a, b) => direction < 0 ? b.center - a.center : a.center - b.center);
    return candidates[0]?.button || null;
  }

  function resetImage(animate = true) {
    const image = state.image;
    if (!image) return;
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : (animate ? 180 : 0);
    image.style.transition = `transform ${duration}ms cubic-bezier(.22,.8,.25,1), opacity ${duration}ms ease`;
    image.style.transform = state.originalTransform || 'translate3d(0,0,0)';
    image.style.opacity = state.originalOpacity || '1';
    window.setTimeout(() => {
      if (!image.isConnected) return;
      image.style.transition = state.originalTransition;
      image.style.willChange = '';
    }, duration + 24);
  }

  function clearLightboxGesture(restore = true) {
    if (restore) resetImage(true);
    state.lightbox = null;
    state.image = null;
    state.mode = '';
  }

  function activateImageDrag(image) {
    if (!image) return;
    state.originalTransition = image.style.transition;
    state.originalTransform = image.style.transform;
    state.originalOpacity = image.style.opacity;
    image.style.transition = 'none';
    image.style.willChange = 'transform,opacity';
  }

  function stepLightbox(direction) {
    const root = state.lightbox;
    const image = state.image;
    if (!root || !image) return false;
    const nav = findNav(root, direction, image);
    if (nav) {
      nav.click();
      return true;
    }

    const key = direction < 0 ? 'ArrowLeft' : 'ArrowRight';
    document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    return true;
  }

  function closeLightbox() {
    const root = state.lightbox;
    if (!root) return;
    const close = findClose(root);
    if (close) {
      close.click();
      return;
    }
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  }

  function animateLightboxCommit(direction, callback) {
    const image = state.image;
    if (!image) {
      callback();
      return;
    }
    const rect = image.getBoundingClientRect();
    const distance = Math.max(innerWidth, rect.width) * .72;
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 170;
    image.style.transition = `transform ${duration}ms cubic-bezier(.22,.8,.25,1), opacity ${duration}ms ease`;
    image.style.transform = `translate3d(${direction * distance}px,0,0)`;
    image.style.opacity = '.18';
    window.setTimeout(() => {
      callback();
      requestAnimationFrame(() => {
        if (!image.isConnected) return;
        image.style.transition = 'none';
        image.style.transform = `translate3d(${-direction * Math.min(50, innerWidth * .08)}px,0,0)`;
        image.style.opacity = '.4';
        requestAnimationFrame(() => resetImage(true));
      });
    }, duration);
  }

  function animateLightboxClose(callback) {
    const image = state.image;
    if (!image) {
      callback();
      return;
    }
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 170;
    image.style.transition = `transform ${duration}ms cubic-bezier(.22,.8,.25,1), opacity ${duration}ms ease`;
    image.style.transform = `translate3d(0,${Math.max(140, innerHeight * .22)}px,0) scale(.96)`;
    image.style.opacity = '.1';
    window.setTimeout(callback, duration);
  }

  function ensureEdgeIndicator() {
    if (state.edgeIndicator?.isConnected) return state.edgeIndicator;
    const node = document.createElement('div');
    node.className = 'pmg-edge-indicator';
    node.setAttribute('aria-hidden', 'true');
    node.textContent = '←';
    document.body.append(node);
    state.edgeIndicator = node;
    return node;
  }

  function resetEdgeIndicator() {
    const node = state.edgeIndicator;
    if (!node) return;
    node.classList.remove('is-active', 'is-commit');
    node.style.transform = '';
    state.project = null;
    state.edgeMode = '';
  }

  function projectCloseButton(modal) {
    for (const selector of PROJECT_CLOSE_SELECTORS) {
      const button = modal.querySelector(selector);
      if (button) return button;
    }
    return [...modal.querySelectorAll('button')].find((button) => /^(close|закрыть|back|назад)$/i.test(button.textContent?.trim() || '')) || null;
  }

  function goBackFromProject(modal) {
    const params = new URLSearchParams(location.search);
    const stateData = history.state;
    const hasManagedHistory = Boolean(
      params.get('project')
      && stateData
      && stateData.portfolioDeepLink
      && stateData.project
    );

    if (hasManagedHistory) {
      history.back();
      window.setTimeout(() => {
        if (!modal.isConnected) return;
        projectCloseButton(modal)?.click();
      }, 360);
      return;
    }

    projectCloseButton(modal)?.click();
  }

  function beginLightboxGesture(event) {
    if (!isTouchUI() || event.touches.length !== 1) return false;
    const root = activeLightbox();
    if (!root || !root.contains(event.target)) return false;
    const image = largestVisibleImage(root);
    if (!image) return false;

    const touch = event.touches[0];
    state.lightbox = root;
    state.image = image;
    state.startX = state.lastX = touch.clientX;
    state.startY = state.lastY = touch.clientY;
    state.startTime = performance.now();
    state.mode = 'pending';
    return true;
  }

  function beginProjectEdgeGesture(event) {
    if (!isTouchUI() || event.touches.length !== 1 || activeLightbox()) return false;
    const modal = activeProjectModal();
    if (!modal || !modal.contains(event.target)) return false;

    const touch = event.touches[0];
    const edge = Math.min(32, Math.max(24, innerWidth * .07));
    if (touch.clientX > edge) return false;

    state.project = modal;
    state.edgeStartX = state.edgeLastX = touch.clientX;
    state.edgeStartY = state.edgeLastY = touch.clientY;
    state.edgeTime = performance.now();
    state.edgeMode = 'pending';
    ensureEdgeIndicator();
    return true;
  }

  document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) {
      clearLightboxGesture(false);
      resetEdgeIndicator();
      return;
    }
    if (beginLightboxGesture(event)) return;
    beginProjectEdgeGesture(event);
  }, { capture: true, passive: true });

  document.addEventListener('touchmove', (event) => {
    if (!isTouchUI() || event.touches.length !== 1) return;
    const touch = event.touches[0];

    if (state.lightbox?.isConnected && state.image?.isConnected) {
      const dx = touch.clientX - state.startX;
      const dy = touch.clientY - state.startY;
      state.lastX = touch.clientX;
      state.lastY = touch.clientY;

      if (state.mode === 'pending' && Math.hypot(dx, dy) >= 9) {
        if (Math.abs(dx) > Math.abs(dy) * 1.18) {
          state.mode = 'horizontal';
          activateImageDrag(state.image);
        } else if (dy > 0 && Math.abs(dy) > Math.abs(dx) * 1.28) {
          state.mode = 'down';
          activateImageDrag(state.image);
        } else if (Math.abs(dy) > Math.abs(dx) * 1.1) {
          state.mode = 'vertical';
        }
      }

      if (state.mode === 'horizontal') {
        event.preventDefault();
        event.stopPropagation();
        const resistance = Math.abs(dx) > innerWidth * .45 ? .72 : 1;
        const offset = dx * resistance;
        state.image.style.transform = `translate3d(${offset}px,0,0)`;
        state.image.style.opacity = String(Math.max(.68, 1 - Math.abs(offset) / Math.max(innerWidth, 1) * .34));
      } else if (state.mode === 'down') {
        event.preventDefault();
        event.stopPropagation();
        const offset = Math.max(0, dy) * .72;
        state.image.style.transform = `translate3d(0,${offset}px,0) scale(${Math.max(.94, 1 - offset / Math.max(innerHeight, 1) * .08)})`;
        state.image.style.opacity = String(Math.max(.55, 1 - offset / Math.max(innerHeight, 1) * .48));
      }
      return;
    }

    if (state.project?.isConnected) {
      const dx = touch.clientX - state.edgeStartX;
      const dy = touch.clientY - state.edgeStartY;
      state.edgeLastX = touch.clientX;
      state.edgeLastY = touch.clientY;

      if (state.edgeMode === 'pending' && Math.hypot(dx, dy) >= 10) {
        if (dx > 0 && dx > Math.abs(dy) * 1.22) state.edgeMode = 'right';
        else if (Math.abs(dy) > Math.abs(dx) * 1.08 || dx < -8) state.edgeMode = 'cancel';
      }

      if (state.edgeMode === 'right') {
        event.preventDefault();
        event.stopPropagation();
        const progress = Math.min(1, Math.max(0, dx) / Math.max(innerWidth * .28, 90));
        const indicator = ensureEdgeIndicator();
        indicator.classList.add('is-active');
        indicator.style.transform = `translate3d(${Math.round(-30 + progress * 38)}px,-50%,0)`;
        indicator.style.opacity = String(.35 + progress * .65);
        indicator.classList.toggle('is-commit', progress >= .72);
      }
    }
  }, { capture: true, passive: false });

  document.addEventListener('touchend', (event) => {
    const changed = event.changedTouches[0];

    if (state.lightbox && changed) {
      const root = state.lightbox;
      const image = state.image;
      const mode = state.mode;
      const dx = changed.clientX - state.startX;
      const dy = changed.clientY - state.startY;
      const elapsed = Math.max(1, performance.now() - state.startTime);
      const vx = dx / elapsed;
      const vy = dy / elapsed;

      if (mode === 'horizontal') {
        event.preventDefault();
        event.stopImmediatePropagation();
        const commit = Math.abs(dx) >= Math.max(58, innerWidth * .15) || Math.abs(vx) >= .48;
        if (commit) {
          const direction = dx < 0 ? 1 : -1;
          animateLightboxCommit(dx < 0 ? -1 : 1, () => {
            state.lightbox = root;
            state.image = image;
            stepLightbox(direction);
          });
          window.setTimeout(() => clearLightboxGesture(false), 260);
        } else {
          resetImage(true);
          clearLightboxGesture(false);
        }
        return;
      }

      if (mode === 'down') {
        event.preventDefault();
        event.stopImmediatePropagation();
        const commit = dy >= Math.max(86, innerHeight * .12) || vy >= .52;
        if (commit) {
          animateLightboxClose(() => {
            state.lightbox = root;
            closeLightbox();
            clearLightboxGesture(false);
          });
        } else {
          resetImage(true);
          clearLightboxGesture(false);
        }
        return;
      }

      clearLightboxGesture(false);
    }

    if (state.project && changed) {
      const modal = state.project;
      const mode = state.edgeMode;
      const dx = changed.clientX - state.edgeStartX;
      const dy = changed.clientY - state.edgeStartY;
      const elapsed = Math.max(1, performance.now() - state.edgeTime);
      const vx = dx / elapsed;
      const commit = mode === 'right'
        && dx > 0
        && dx > Math.abs(dy) * 1.18
        && (dx >= Math.max(76, innerWidth * .20) || vx >= .48);

      if (mode === 'right') {
        event.preventDefault();
        event.stopImmediatePropagation();
      }

      if (commit) {
        const indicator = ensureEdgeIndicator();
        indicator.classList.add('is-active', 'is-commit');
        goBackFromProject(modal);
      }
      window.setTimeout(resetEdgeIndicator, commit ? 220 : 0);
    }
  }, { capture: true, passive: false });

  document.addEventListener('touchcancel', () => {
    clearLightboxGesture(true);
    resetEdgeIndicator();
  }, { capture: true, passive: true });

  new MutationObserver((records) => {
    if (!isTouchUI()) return;
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) return;
      const root = node.matches(LIGHTBOX_SELECTOR) ? node : node.querySelector?.(LIGHTBOX_SELECTOR);
      if (!root) return;
      requestAnimationFrame(() => {
        const image = largestVisibleImage(root);
        if (image) {
          image.draggable = false;
          image.setAttribute('draggable', 'false');
        }
      });
    }));
  }).observe(document.body, { childList: true, subtree: true });

  injectStyles();
})();