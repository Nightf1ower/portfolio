(() => {
  if (window.__portfolioIntroDuplicateCleanupV1) return;
  window.__portfolioIntroDuplicateCleanupV1 = true;

  const VERSION = 'portfolio-intro-duplicate-cleanup-1';
  const STYLE_ID = 'portfolio-intro-duplicate-cleanup-style';

  const PROJECTS = [
    { selector: '.zny-modal', aliases: ['ZNY'] },
    { selector: '.fable-modal', aliases: ['F | ABLE', 'FABLE'] },
    { selector: '.pink-punk-fullscreen', aliases: ['PINK PUNK'] },
    { selector: '.cr-modal', aliases: ['CARNIVAL RECORDS'] },
    { selector: '.blandetto-modal,.bf', aliases: ['BLANDETTO'] },
    { selector: '.project9006-modal', aliases: ['NINETY Z S', '90.06', '90 06'] },
    { selector: '.pcg-modal', aliases: ['POSTERS'] },
    { selector: '.mc-modal,.m10-modal', aliases: ['MERCH'] },
    { selector: '.stk-modal', aliases: ['STICKERS'] },
    { selector: '.lcg-modal', aliases: ['LOGOS', 'ЛОГОТИПЫ'] },
    { selector: '.album-covers-modal', aliases: ['ALBUM COVERS'] },
    { selector: '.su-modal', aliases: ['STAY UGLY', 'STAYUGLY'] },
    { selector: '.anka-peresild-modal', aliases: ['ANKA PERESILD'] },
    { selector: '.vtb-modal', aliases: ['VTB DESIGN TEAM'] },
    { selector: '.collages-modal', aliases: ['COLLAGES PHOTO EDIT', 'COLLAGES'] },
  ];

  const ABOUT_LABELS = new Set([
    'ABOUT THE BRAND', 'ABOUT THE PROJECT', 'ABOUT BRAND', 'ABOUT PROJECT',
    'О БРЕНДЕ', 'О ПРОЕКТЕ',
  ]);

  const norm = value => String(value || '')
    .toUpperCase().replace(/Ё/g, 'Е').replace(/\|/g, ' ')
    .replace(/[^A-ZА-Я0-9]+/g, ' ').trim().replace(/\s+/g, ' ');

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .portfolio-legacy-intro-collapsed{
        display:none!important;
        visibility:hidden!important;
        width:0!important;
        height:0!important;
        min-height:0!important;
        max-height:0!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        overflow:hidden!important;
      }

      .portfolio-standard-intro[data-portfolio-themed="true"]{
        padding:clamp(6rem,8vw,7.5rem) clamp(1rem,3.2vw,4rem) clamp(2.6rem,4vw,3.6rem)!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__chips{
        margin-top:clamp(1.25rem,2vw,1.8rem)!important;
      }
      .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__about{
        margin-top:clamp(2.2rem,3.5vw,3.25rem)!important;
        padding-top:clamp(1.15rem,1.8vw,1.6rem)!important;
      }

      @media(max-width:820px){
        .portfolio-standard-intro[data-portfolio-themed="true"]{
          padding:5.75rem 1rem 2.75rem!important;
        }
        .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__chips{
          margin-top:1.15rem!important;
        }
        .portfolio-standard-intro[data-portfolio-themed="true"] .portfolio-standard-intro__about{
          margin-top:2rem!important;
          padding-top:1.1rem!important;
        }
      }
    `;
    document.head.append(style);
  }

  function visible(node) {
    if (!(node instanceof HTMLElement) || !node.isConnected) return false;
    const css = getComputedStyle(node);
    return css.display !== 'none' && css.visibility !== 'hidden' && Number(css.opacity || 1) !== 0;
  }

  function before(node, reference) {
    if (!reference || node === reference || node.contains(reference)) return false;
    return Boolean(node.compareDocumentPosition(reference) & Node.DOCUMENT_POSITION_FOLLOWING);
  }

  function hasMedia(node) {
    return Boolean(node.querySelector('img,video,picture,canvas,svg'));
  }

  function exactHeadingMatch(node, aliases) {
    const accepted = new Set(aliases.map(norm));
    return [...node.querySelectorAll('h1,h2,h3,h4')]
      .some(heading => accepted.has(norm(heading.textContent)));
  }

  function hasAboutLabel(node) {
    return [...node.querySelectorAll('p,span,h1,h2,h3,h4')]
      .some(child => ABOUT_LABELS.has(norm(child.textContent)));
  }

  function looksLikeChipRow(node) {
    const children = [...node.children].filter(child => (child.textContent || '').trim());
    if (children.length < 2 || children.length > 8) return false;
    if (children.some(child => child.querySelector('img,video,picture,canvas'))) return false;

    const short = children.filter(child => {
      const text = String(child.textContent || '').replace(/\s+/g, ' ').trim();
      return text.length > 0 && text.length <= 34 && !/[.!?]{1,}/.test(text);
    });
    if (short.length < Math.ceil(children.length * .75)) return false;

    const cls = String(node.className || '');
    const semanticClass = /(chip|tag|categor|meta|filter|intro|hero|brand|nav)/i.test(cls);
    const buttonLike = children.filter(child => child.matches('button,a,span,li') || /(chip|tag|badge|pill)/i.test(String(child.className || ''))).length;
    return semanticClass || buttonLike >= Math.ceil(children.length * .6);
  }

  function collapse(node) {
    if (!(node instanceof HTMLElement)) return;
    if (node.matches('.portfolio-standard-head,.portfolio-standard-intro,.desktop-project-navigation')) return;
    if (node.closest('.portfolio-standard-head,.portfolio-standard-intro,.desktop-project-navigation,.desktop-unified-lightbox')) return;
    node.classList.add('portfolio-legacy-intro-collapsed');
  }

  function collapseEmptyShellFrom(hidden, modal, firstMedia) {
    let parent = hidden.parentElement;
    for (let depth = 0; parent && parent !== modal && depth < 3; depth += 1, parent = parent.parentElement) {
      if (!before(parent, firstMedia) || hasMedia(parent)) break;
      if (parent.matches('.portfolio-standard-head,.portfolio-standard-intro')) break;

      const meaningful = [...parent.children].filter(child => {
        if (child.classList.contains('portfolio-legacy-intro-collapsed') || child.classList.contains('portfolio-standard-source-hidden')) return false;
        if (!visible(child)) return false;
        const text = String(child.textContent || '').replace(/\s+/g, ' ').trim();
        return text.length > 0 || hasMedia(child);
      });
      if (meaningful.length === 0) collapse(parent);
      else break;
    }
  }

  function cleanModal(modal, project) {
    if (!(modal instanceof HTMLElement) || !visible(modal)) return;
    const intro = modal.querySelector(':scope > .portfolio-standard-intro');
    if (!intro) return;

    const firstMedia = [...modal.querySelectorAll('img,video,picture,canvas')]
      .find(node => !node.closest('.portfolio-standard-intro,.portfolio-standard-head,.desktop-unified-lightbox')) || null;

    const candidates = [...modal.querySelectorAll('section,div,nav,ul')]
      .filter(node => node instanceof HTMLElement)
      .filter(node => !node.closest('.portfolio-standard-intro,.portfolio-standard-head,.desktop-project-navigation,.desktop-unified-lightbox'))
      .filter(node => !firstMedia || before(node, firstMedia));

    candidates.forEach(node => {
      if (hasMedia(node)) return;
      const cls = String(node.className || '');
      const topishClass = /(intro|hero|brand|overview|summary|chip|tag|categor|meta)/i.test(cls);
      const duplicateIdentity = exactHeadingMatch(node, project.aliases);
      const duplicateAbout = hasAboutLabel(node);
      const duplicateChips = looksLikeChipRow(node);

      if (duplicateIdentity || duplicateAbout || (topishClass && duplicateChips)) collapse(node);
    });

    [...modal.querySelectorAll('.portfolio-standard-source-hidden')].forEach(node => {
      if (!firstMedia || before(node, firstMedia)) collapseEmptyShellFrom(node, modal, firstMedia);
    });

    // Any surviving standalone ABOUT label before the first real media is legacy.
    [...modal.querySelectorAll('p,span,h1,h2,h3,h4')].forEach(node => {
      if (node.closest('.portfolio-standard-intro,.portfolio-standard-head,.desktop-project-navigation')) return;
      if (firstMedia && !before(node, firstMedia)) return;
      if (ABOUT_LABELS.has(norm(node.textContent))) {
        const block = node.closest('section,div,nav,ul');
        if (block && !hasMedia(block)) collapse(block);
        else collapse(node);
      }
    });

    modal.dataset.portfolioIntroCleaned = VERSION;
  }

  function apply() {
    installStyles();
    PROJECTS.forEach(project => {
      document.querySelectorAll(project.selector).forEach(modal => cleanModal(modal, project));
    });
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  };

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('popstate', () => setTimeout(schedule, 0));

  installStyles();
  [0, 80, 220, 600, 1200].forEach(delay => setTimeout(schedule, delay));
})();
