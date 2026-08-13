(() => {
  if (window.__portfolioMobileGesturesV2) return;
  window.__portfolioMobileGesturesV2 = true;

  const VERSION = 'portfolio-mobile-gestures-2';
  const isTouchUI = () =>
    matchMedia('(hover:none), (pointer:coarse)').matches ||
    navigator.maxTouchPoints > 0 ||
    innerWidth <= 820;

  const LIGHTBOX_SELECTORS = [
    '.psg-lightbox', '.pul-overlay', '.cr-final-lightbox',
    '.cr-light', '.cr-lightbox', '.zny-light', '.zny-lightbox',
    '.fable-light', '.fable-lightbox', '.bf-light', '.blandetto-lightbox',
    '.su-light', '.su-lightbox', '.m10-light', '.merch9-light', '.mc-light', '.mc-lightbox',
    '.project9006-lightbox', '.vtb-light',
    '.pcg-light', '.pcg-lightbox', '.pag-light', '.pag-lightbox',
    '.lcg-light', '.lcg-lightbox', '.stk-light', '.stk-lightbox',
    '.album-covers-lightbox', '.anka-peresild-lightbox',
    '.collages-light', '.collages-lightbox', '.z-\\[150\\].fixed.inset-0'
  ];
  const LIGHTBOX_SELECTOR = LIGHTBOX_SELECTORS.join(',');
  const CLOSE_HINT = /(close|dismiss|exit|закрыть|✕|×)/i;
  const PREV_HINT = /(prev|previous|left|пред|←|‹)/i;
  const NEXT_HINT = /(next|right|след|→|›)/i;

  const state = {
    root: null, image: null,
    startX: 0, startY: 0, lastX: 0, lastY: 0,
    startTime: 0, mode: '',
    baseTransform: '', baseTransition: '',
    raf: 0, frameX: 0, frameY: 0,
    suppressClickUntil: 0,
  };

  function installStyles() {
    document.getElementById('portfolio-mobile-gestures-v2-style')?.remove();
    const style = document.createElement('style');
    style.id = 'portfolio-mobile-gestures-v2-style';
    style.dataset.version = VERSION;
    style.textContent = `
      @media (hover:none), (pointer:coarse), (max-width:820px) {
        ${LIGHTBOX_SELECTOR}{
          min-height:100dvh!important;
          overscroll-behavior:none!important;
          touch-action:pinch-zoom!important;
        }
        ${LIGHTBOX_SELECTOR} img{
          backface-visibility:hidden!important;
          -webkit-backface-visibility:hidden!important;
        }

        .desktop-project-navigation{
          display:grid!important;
          grid-template-columns:1fr!important;
          gap:1px!important;
          width:100%!important;
          margin:clamp(3.5rem,14vw,5rem) 0 0!important;
          padding:1px!important;
        }
        .desktop-project-navigation__spacer{display:none!important}
        .desktop-project-navigation__button{
          min-height:8.5rem!important;
          padding:1.1rem!important;
          touch-action:manipulation!important;
        }
        .desktop-project-navigation__eyebrow{
          font-size:.58rem!important;
          letter-spacing:.17em!important;
        }
        .desktop-project-navigation__title{
          max-width:12ch!important;
          margin:2rem 0 0!important;
          font-size:clamp(2.15rem,10.5vw,3.8rem)!important;
          line-height:.84!important;
        }
        .desktop-project-navigation__button--next{
          align-items:flex-end!important;
          text-align:right!important;
        }
      }
    `;
    document.head.append(style);
  }

  function visible(node) {
    if (!(node instanceof Element) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function rootFromTarget(target) {
    if (!(target instanceof Element)) return null;
    const known = target.closest(LIGHTBOX_SELECTOR);
    if (known && visible(known)) return known;

    let node = target;
    for (let depth = 0; node && node !== document.body && depth < 10; depth += 1, node = node.parentElement) {
      if (!(node instanceof HTMLElement) || !node.querySelector('img')) continue;
      const css = getComputedStyle(node);
      if (css.position !== 'fixed') continue;
      const rect = node.getBoundingClientRect();
      if (rect.width >= innerWidth * .72 && rect.height >= innerHeight * .68) return node;
    }
    return null;
  }

  function currentImage(root, target) {
    const direct = target instanceof HTMLImageElement ? target : target?.closest?.('img');
    if (direct && root.contains(direct) && visible(direct)) return direct;

    const preferred = root.querySelector([
      '.psg-image', '.pul-image', '.cr-final-lightbox__image', '.vtb-light-image',
      '.zny-light img', '.fable-light img', '.bf-light img', '.blandetto-lightbox img',
      '.su-light img', '.mc-light img', '.project9006-lightbox img'
    ].join(','));
    if (preferred && visible(preferred)) return preferred;

    let best = null;
    let bestArea = 0;
    root.querySelectorAll('img').forEach((img) => {
      if (!visible(img)) return;
      const rect = img.getBoundingClientRect();
      const area = rect.width * rect.height;
      if (area > bestArea) { best = img; bestArea = area; }
    });
    return best;
  }

  function buttonLabel(button) {
    return [
      button.className, button.id,
      button.getAttribute('aria-label'),
      button.getAttribute('title'),
      button.textContent
    ].filter(Boolean).join(' ');
  }

  function controls(root) {
    return [...root.querySelectorAll('button,[role="button"]')].filter(visible);
  }

  function closeButton(root) {
    const known = root.querySelector([
      '.psg-close', '.pul-close', '.cr-final-lightbox__close', '.vtb-light-close',
      '[class*="lightbox"][class*="close"]', '[class*="light"][class*="close"]',
      '[aria-label*="close" i]'
    ].join(','));
    if (known && visible(known)) return known;
    return controls(root).find((button) => CLOSE_HINT.test(buttonLabel(button))) || null;
  }

  function navButton(root, direction, image) {
    const hint = direction < 0 ? PREV_HINT : NEXT_HINT;
    const close = closeButton(root);
    const list = controls(root).filter((button) => button !== close);
    const hinted = list.find((button) => hint.test(buttonLabel(button)));
    if (hinted) return hinted;

    const imageRect = image.getBoundingClientRect();
    const center = imageRect.left + imageRect.width / 2;
    return list
      .map((button) => {
        const rect = button.getBoundingClientRect();
        return { button, x: rect.left + rect.width / 2 };
      })
      .filter(({ x }) => direction < 0 ? x < center - 8 : x > center + 8)
      .sort((a, b) => direction < 0 ? b.x - a.x : a.x - b.x)[0]?.button || null;
  }

  function clearFrame() {
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
  }

  function applyFrame() {
    state.raf = 0;
    const image = state.image;
    if (!image?.isConnected) return;

    if (state.mode === 'horizontal') {
      const dx = state.frameX;
      const limit = innerWidth * .64;
      const resisted = Math.sign(dx) * Math.min(Math.abs(dx), limit);
      image.style.transform = `translate3d(${Math.round(resisted)}px,0,0)`;
    } else if (state.mode === 'down') {
      const dy = Math.max(0, state.frameY) * .58;
      image.style.transform = `translate3d(0,${Math.round(dy)}px,0)`;
    }
  }

  function scheduleFrame(dx, dy) {
    state.frameX = dx;
    state.frameY = dy;
    if (!state.raf) state.raf = requestAnimationFrame(applyFrame);
  }

  function begin(root, image, touch) {
    clearFrame();
    state.root = root;
    state.image = image;
    state.startX = state.lastX = touch.clientX;
    state.startY = state.lastY = touch.clientY;
    state.startTime = performance.now();
    state.mode = 'pending';
    state.baseTransform = image.style.transform;
    state.baseTransition = image.style.transition;
    image.style.transition = 'none';
    image.style.willChange = 'transform';
  }

  function resetImage(animate = true) {
    clearFrame();
    const image = state.image;
    if (!image?.isConnected) return;
    const ms = matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : (animate ? 120 : 0);
    image.style.transition = `transform ${ms}ms cubic-bezier(.22,.8,.25,1)`;
    image.style.transform = state.baseTransform || 'translate3d(0,0,0)';
    setTimeout(() => {
      if (!image.isConnected) return;
      image.style.transition = state.baseTransition;
      image.style.willChange = '';
    }, ms + 18);
  }

  function finish() {
    clearFrame();
    state.root = null;
    state.image = null;
    state.mode = '';
  }

  function step(direction) {
    const root = state.root;
    const image = state.image;
    if (!root || !image) return;
    const button = navButton(root, direction, image);
    if (button) {
      button.click();
      return;
    }
    const key = direction < 0 ? 'ArrowLeft' : 'ArrowRight';
    document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  }

  function close() {
    const root = state.root;
    if (!root) return;
    const button = closeButton(root);
    if (button) button.click();
    else document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  }

  window.addEventListener('touchstart', (event) => {
    if (!isTouchUI() || event.touches.length !== 1) {
      if (state.root) { resetImage(false); finish(); }
      return;
    }
    const root = rootFromTarget(event.target);
    if (!root) return;
    const image = currentImage(root, event.target);
    if (!image) return;

    begin(root, image, event.touches[0]);
    event.stopImmediatePropagation();
  }, { capture: true, passive: true });

  window.addEventListener('touchmove', (event) => {
    if (!state.root || !state.image || event.touches.length !== 1) return;
    const touch = event.touches[0];
    const dx = touch.clientX - state.startX;
    const dy = touch.clientY - state.startY;
    state.lastX = touch.clientX;
    state.lastY = touch.clientY;

    if (state.mode === 'pending' && Math.hypot(dx, dy) >= 8) {
      if (Math.abs(dx) > Math.abs(dy) * 1.2) state.mode = 'horizontal';
      else if (dy > 0 && Math.abs(dy) > Math.abs(dx) * 1.35) state.mode = 'down';
      else if (Math.abs(dy) > Math.abs(dx) * 1.08) state.mode = 'vertical';
    }

    if (state.mode === 'horizontal' || state.mode === 'down') {
      event.preventDefault();
      event.stopImmediatePropagation();
      scheduleFrame(dx, dy);
    }
  }, { capture: true, passive: false });

  window.addEventListener('touchend', (event) => {
    if (!state.root || !state.image) return;
    const touch = event.changedTouches[0];
    if (!touch) { resetImage(true); finish(); return; }

    const dx = touch.clientX - state.startX;
    const dy = touch.clientY - state.startY;
    const elapsed = Math.max(1, performance.now() - state.startTime);
    const vx = dx / elapsed;
    const vy = dy / elapsed;
    const mode = state.mode;

    if (mode === 'horizontal') {
      event.preventDefault();
      event.stopImmediatePropagation();
      state.suppressClickUntil = performance.now() + 450;

      const commit = Math.abs(dx) >= Math.max(50, innerWidth * .13) || Math.abs(vx) >= .44;
      if (!commit) {
        resetImage(true);
        finish();
        return;
      }

      clearFrame();
      const image = state.image;
      const direction = dx < 0 ? 1 : -1;
      const visualDirection = dx < 0 ? -1 : 1;
      const ms = matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : 90;
      image.style.transition = `transform ${ms}ms cubic-bezier(.22,.8,.25,1)`;
      image.style.transform = `translate3d(${visualDirection * Math.max(120, innerWidth * .34)}px,0,0)`;

      setTimeout(() => {
        step(direction);
        if (image.isConnected) {
          image.style.transition = 'none';
          image.style.transform = state.baseTransform || 'translate3d(0,0,0)';
          image.style.willChange = '';
        }
        finish();
      }, ms);
      return;
    }

    if (mode === 'down') {
      event.preventDefault();
      event.stopImmediatePropagation();
      state.suppressClickUntil = performance.now() + 450;

      const commit = dy >= Math.max(80, innerHeight * .11) || vy >= .5;
      if (commit) close();
      else resetImage(true);
      finish();
      return;
    }

    resetImage(false);
    finish();
  }, { capture: true, passive: false });

  window.addEventListener('touchcancel', () => {
    if (!state.root) return;
    resetImage(true);
    finish();
  }, { capture: true, passive: true });

  window.addEventListener('click', (event) => {
    if (performance.now() > state.suppressClickUntil) return;
    const root = rootFromTarget(event.target);
    if (!root) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  installStyles();
})();