(() => {
  if (window.__portfolioContentMediaSpacingV1) return;
  window.__portfolioContentMediaSpacingV1 = true;

  const VERSION = 'portfolio-content-media-spacing-1';
  const STYLE_ID = 'portfolio-content-media-spacing-style';

  const ROOT_SELECTOR = [
    '.m10-modal',
    '.stk-modal',
    '.posters-modal',
    '.su-modal',
    '.vtb-modal',
    '.bf',
    '.project9006-modal',
    '.pink-punk-fullscreen',
    '.fable-modal',
    '.zny-modal',
    '.album-covers-modal',
    '.collages-modal',
    '[class$="-modal"]',
    '[class*="-modal "]',
    '.fixed.inset-0',
  ].join(',');

  const COPY_SELECTOR = [
    '.portfolio-unified-copy',
    '.m10-project-copy',
    '.m10-section-copy',
    '.m10-copy-update',
    '.m10-dxs-materials-copy',
    '.vtb-project-intro__text',
    '.vtb-print-copy',
    '.stk-project-copy',
    '.su-copy',
    '.bf-brand-copy',
    '.bf-note',
    '.pink-punk-brand__copy',
    '.pink-punk-section__note',
    '[class*="description"]',
    '[class*="section-copy"]',
    '[class*="project-copy"]',
    '[class*="about-copy"]',
    '[class*="intro-copy"]',
  ].join(',');

  const VISUAL_SELECTOR = [
    'img',
    'video',
    'picture',
    'figure',
    '[class*="grid"]',
    '[class*="gallery"]',
    '[class*="layout"]',
    '[class*="media"]',
    '[class*="cards"]',
    '[class*="visual"]',
    '[class*="mockup"]',
  ].join(',');

  const CAPTION_SELECTOR = [
    'figcaption',
    '.bf-p',
    '[class*="caption"]',
  ].join(',');

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      :where(${ROOT_SELECTOR}) .portfolio-copy-before-media {
        margin-bottom: clamp(2.25rem, 4vw, 3.5rem) !important;
      }

      :where(${ROOT_SELECTOR}) .portfolio-heading-before-media {
        margin-bottom: clamp(1.75rem, 3vw, 2.75rem) !important;
      }

      :where(${ROOT_SELECTOR}) .portfolio-caption-spacing {
        box-sizing: border-box !important;
        display: block !important;
        width: 100% !important;
        margin-top: .85rem !important;
        margin-bottom: 1.5rem !important;
        padding-bottom: 0 !important;
        line-height: 1.35 !important;
      }

      /* BLANDETTO cap cards have captions inside each button. */
      .bf .bf-capg {
        row-gap: clamp(2.25rem, 4vw, 3.5rem) !important;
      }

      .bf .bf-capg > .bf-card {
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        overflow: visible !important;
      }

      .bf .bf-capg > .bf-card > img {
        flex: 0 0 auto !important;
      }

      .bf .bf-capg > .bf-card > .bf-p {
        margin: .85rem 0 0 !important;
        padding: 0 0 .35rem !important;
      }

      /* Known text-to-gallery transitions. */
      .vtb-modal .vtb-print-copy,
      .m10-modal .m10-section-copy,
      .m10-modal .m10-copy-update,
      .m10-modal .m10-dxs-materials-copy,
      .pink-punk-fullscreen .pink-punk-section__note,
      .bf .bf-note,
      .stk-modal .stk-project-copy {
        margin-bottom: clamp(2.25rem, 4vw, 3.5rem) !important;
      }

      @media (max-width: 820px) {
        :where(${ROOT_SELECTOR}) .portfolio-copy-before-media {
          margin-bottom: clamp(2.75rem, 10vw, 4.25rem) !important;
        }

        :where(${ROOT_SELECTOR}) .portfolio-heading-before-media {
          margin-bottom: clamp(2.25rem, 8vw, 3.5rem) !important;
        }

        :where(${ROOT_SELECTOR}) .portfolio-caption-spacing {
          margin-top: .9rem !important;
          margin-bottom: 2rem !important;
        }

        .bf .bf-capg {
          row-gap: 2.75rem !important;
        }

        .bf .bf-capg > .bf-card > .bf-p {
          margin-top: .9rem !important;
          margin-bottom: 0 !important;
          padding-bottom: .5rem !important;
        }

        .vtb-modal .vtb-print-copy,
        .m10-modal .m10-section-copy,
        .m10-modal .m10-copy-update,
        .m10-modal .m10-dxs-materials-copy,
        .pink-punk-fullscreen .pink-punk-section__note,
        .bf .bf-note,
        .stk-modal .stk-project-copy {
          margin-bottom: clamp(2.75rem, 10vw, 4.25rem) !important;
        }
      }
    `;

    document.head.append(style);
  }

  function hasMeaningfulText(element) {
    if (!(element instanceof HTMLElement)) return false;
    if (element.matches('button, nav, header, [class*="count"], [class*="counter"], [class*="label"], [class*="light"]')) return false;
    if (element.querySelector('img, video, picture')) return false;
    const text = element.textContent?.replace(/\s+/g, ' ').trim() || '';
    return text.length >= 45;
  }

  function isCopyBlock(element) {
    if (!(element instanceof HTMLElement)) return false;
    return element.matches(COPY_SELECTOR) || hasMeaningfulText(element);
  }

  function isVisualBlock(element) {
    if (!(element instanceof HTMLElement)) return false;
    if (element.matches('script, style, template')) return false;
    return element.matches(VISUAL_SELECTOR) || Boolean(element.querySelector(VISUAL_SELECTOR));
  }

  function nextVisibleSibling(element) {
    let sibling = element.nextElementSibling;
    while (sibling) {
      const style = getComputedStyle(sibling);
      if (style.display !== 'none' && style.visibility !== 'hidden') return sibling;
      sibling = sibling.nextElementSibling;
    }
    return null;
  }

  function markDirectTransitions(root) {
    const containers = new Set([root]);
    root.querySelectorAll([
      'section',
      '[class*="section"]',
      '[class*="project"]',
      '[class*="intro"]',
      '[class*="content"]',
      '[class*="inner"]',
    ].join(',')).forEach((node) => containers.add(node));

    containers.forEach((container) => {
      if (!(container instanceof HTMLElement)) return;
      [...container.children].forEach((child) => {
        if (!(child instanceof HTMLElement)) return;
        const next = nextVisibleSibling(child);
        if (!next || !isVisualBlock(next)) return;

        if (isCopyBlock(child)) {
          child.classList.add('portfolio-copy-before-media');
          return;
        }

        if (child.matches('h1, h2, h3, [class*="title"]')) {
          child.classList.add('portfolio-heading-before-media');
        }
      });
    });
  }

  function markNestedCopy(root) {
    root.querySelectorAll(COPY_SELECTOR).forEach((copy) => {
      if (!(copy instanceof HTMLElement)) return;
      const next = nextVisibleSibling(copy);
      if (next && isVisualBlock(next)) {
        copy.classList.add('portfolio-copy-before-media');
        return;
      }

      const parent = copy.parentElement;
      if (!parent) return;
      const parentNext = nextVisibleSibling(parent);
      if (parentNext && isVisualBlock(parentNext) && !parent.querySelector('img, video, picture')) {
        parent.classList.add('portfolio-copy-before-media');
      }
    });
  }

  function markCaptions(root) {
    root.querySelectorAll(CAPTION_SELECTOR).forEach((caption) => {
      if (!(caption instanceof HTMLElement)) return;
      if (caption.closest('[class*="lightbox"], .m10-light, .m10-layout-light, .vtb-light, .bf-light')) return;
      const parent = caption.parentElement;
      if (!parent?.querySelector('img, picture, video')) return;
      caption.classList.add('portfolio-caption-spacing');
    });
  }

  function apply() {
    installStyles();
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (!(root instanceof HTMLElement)) return;
      markDirectTransitions(root);
      markNestedCopy(root);
      markCaptions(root);
    });
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => (
      mutation.type === 'characterData' ||
      [...mutation.addedNodes].some((node) => node instanceof Element)
    ));
    if (relevant) schedule();
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule);
  document.fonts?.ready?.then(schedule).catch(() => {});

  installStyles();
  schedule();
})();
