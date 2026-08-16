(() => {
  if (window.__portfolioIntroDedupeFinalV2) return;
  window.__portfolioIntroDedupeFinalV2 = true;

  const VERSION = 'portfolio-intro-dedupe-final-2';
  const STYLE_ID = 'portfolio-intro-dedupe-final-style';
  const MODALS = '.zny-modal,.fable-modal,.pink-punk-fullscreen,.cr-modal,.blandetto-modal,.bf,.project9006-modal,.pcg-modal,.mc-modal,.m10-modal,.stk-modal,.lcg-modal,.album-covers-modal,.su-modal,.anka-peresild-modal,.vtb-modal,.collages-modal';
  const ABOUT_LABELS = new Set(['ABOUT THE BRAND','ABOUT THE PROJECT','О БРЕНДЕ','О ПРОЕКТЕ']);

  const norm = value => String(value || '')
    .toUpperCase().replace(/Ё/g,'Е').replace(/\|/g,' ')
    .replace(/[^A-ZА-Я0-9]+/g,' ').trim().replace(/\s+/g,' ');

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-stable-intro__about{
        display:flex!important;
        flex-direction:column!important;
        align-items:flex-start!important;
        gap:clamp(1rem,1.6vw,1.5rem)!important;
        width:100%!important;
        max-width:none!important;
      }

      /* FABLE is the canonical ABOUT badge. Every project uses exactly this visual treatment. */
      .portfolio-stable-intro__about-label,
      .pink-punk-fullscreen .pink-punk-brand__label,
      .project9006-modal .project9006-brand-label,
      .portfolio-about-label-standard{
        box-sizing:border-box!important;
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        align-self:flex-start!important;
        justify-self:start!important;
        width:max-content!important;
        max-width:100%!important;
        min-height:0!important;
        height:auto!important;
        margin:0!important;
        padding:.6rem .8rem!important;
        border:0!important;
        border-radius:0!important;
        background:#050505!important;
        color:#fff!important;
        font:900 .64rem/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.2em!important;
        text-align:left!important;
        text-transform:uppercase!important;
        white-space:nowrap!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
      }

      .pink-punk-fullscreen .pink-punk-brand__label,
      .project9006-modal .project9006-brand-label{
        margin-bottom:1.25rem!important;
      }

      .portfolio-stable-intro__about-text{
        box-sizing:border-box!important;
        display:block!important;
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0!important;
        text-align:left!important;
        justify-self:start!important;
      }
      .portfolio-intro-duplicate-hidden{
        display:none!important;
        width:0!important;
        height:0!important;
        min-width:0!important;
        min-height:0!important;
        max-width:0!important;
        max-height:0!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        overflow:hidden!important;
        visibility:hidden!important;
      }
      .portfolio-intro-duplicate-shell-hidden{
        display:none!important;
        height:0!important;
        min-height:0!important;
        max-height:0!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        overflow:hidden!important;
      }
    `;
    document.head.append(style);
  }

  function chipSet(intro) {
    return new Set([...intro.querySelectorAll('.portfolio-stable-intro__chip')]
      .map(node => norm(node.textContent)).filter(Boolean));
  }

  function hide(node) {
    if (!(node instanceof HTMLElement)) return;
    node.classList.add('portfolio-intro-duplicate-hidden');
  }

  function standardizeNativeAboutLabels(root = document) {
    root.querySelectorAll?.('.pink-punk-brand__label,.project9006-brand-label').forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      if (!ABOUT_LABELS.has(norm(node.textContent))) return;
      node.classList.add('portfolio-about-label-standard');
    });
  }

  function hideDuplicateChipGroups(modal, intro) {
    const wanted = chipSet(intro);
    if (wanted.size < 2) return;

    [...modal.querySelectorAll('div,nav,ul,section')].forEach(group => {
      if (!(group instanceof HTMLElement) || group === intro || group.closest('.portfolio-stable-intro')) return;
      if (group.closest('.desktop-project-navigation,.desktop-unified-lightbox')) return;
      if (group.querySelector('img,video,picture,canvas')) return;

      const children = [...group.children].filter(child => child instanceof HTMLElement);
      if (children.length < 2 || children.length > 10) return;
      const values = children.map(child => norm(child.textContent)).filter(Boolean);
      const matches = values.filter(value => wanted.has(value));
      const nonMatches = values.filter(value => !wanted.has(value));
      if (matches.length >= 2 && nonMatches.length === 0) {
        group.classList.add('portfolio-intro-duplicate-shell-hidden');
      }
    });
  }

  function hideDuplicateAbout(modal, intro) {
    const canonicalText = String(intro.querySelector('.portfolio-stable-intro__about-text')?.textContent || '')
      .replace(/\s+/g,' ').trim();

    [...modal.querySelectorAll('p,span,h1,h2,h3,h4,div')].forEach(node => {
      if (!(node instanceof HTMLElement) || node.closest('.portfolio-stable-intro')) return;
      if (node.closest('.desktop-project-navigation,.desktop-unified-lightbox')) return;
      if (node.querySelector('img,video,picture,canvas')) return;
      const text = String(node.textContent || '').replace(/\s+/g,' ').trim();
      if (!text) return;
      if (ABOUT_LABELS.has(norm(text))) {
        hide(node);
        return;
      }
      if (canonicalText && text === canonicalText) hide(node);
    });

    [...modal.querySelectorAll('section,div')].forEach(wrapper => {
      if (!(wrapper instanceof HTMLElement) || wrapper === intro || wrapper.closest('.portfolio-stable-intro')) return;
      if (wrapper.closest('.desktop-project-navigation,.desktop-unified-lightbox')) return;
      if (wrapper.querySelector('img,video,picture,canvas')) return;
      const meaningful = [...wrapper.children].filter(child => {
        if (!(child instanceof HTMLElement)) return false;
        if (child.classList.contains('portfolio-intro-duplicate-hidden') || child.classList.contains('portfolio-intro-duplicate-shell-hidden')) return false;
        const css = getComputedStyle(child);
        if (css.display === 'none') return false;
        return String(child.textContent || '').trim().length > 0;
      });
      if (!meaningful.length && String(wrapper.textContent || '').trim().length) {
        wrapper.classList.add('portfolio-intro-duplicate-shell-hidden');
      }
    });
  }

  function cleanModal(modal) {
    if (!(modal instanceof HTMLElement)) return false;
    standardizeNativeAboutLabels(modal);
    const intro = modal.querySelector(':scope > .portfolio-stable-intro');
    if (!(intro instanceof HTMLElement)) return false;
    intro.querySelector('.portfolio-stable-intro__about-label')?.classList.add('portfolio-about-label-standard');
    hideDuplicateChipGroups(modal,intro);
    hideDuplicateAbout(modal,intro);
    modal.dataset.portfolioIntroDedupe = VERSION;
    return true;
  }

  function cleanAll() {
    standardizeNativeAboutLabels(document);
    document.querySelectorAll(MODALS).forEach(cleanModal);
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      cleanAll();
    });
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (
          node.matches('.portfolio-stable-intro,.pink-punk-brand__label,.project9006-brand-label') ||
          node.querySelector('.portfolio-stable-intro,.pink-punk-brand__label,.project9006-brand-label')
        ) {
          schedule();
          return;
        }
      }
    }
  });
  observer.observe(document.body,{childList:true,subtree:true});

  installStyles();
  cleanAll();
})();
