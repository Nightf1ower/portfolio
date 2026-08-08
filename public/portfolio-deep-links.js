(() => {
  if (window.__portfolioDeepLinksV1) return;
  window.__portfolioDeepLinksV1 = true;

  const VERSION = 'portfolio-deep-links-1';
  const normalize = value => String(value || '')
    .trim()
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
  const key = value => String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[._|]+/g, '-')
    .replace(/[^a-zа-я0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

  const PROJECTS = [
    { slug: 'zny', titles: ['ZNY'], modals: ['.zny-modal'] },
    { slug: 'fable', aliases: ['f-able'], titles: ['F | ABLE', 'FABLE'], modals: ['.fable-modal'] },
    { slug: 'pink-punk', aliases: ['pinkpunk'], titles: ['PINK PUNK', 'PINKPUNK'], modals: ['.pink-punk-fullscreen'] },
    { slug: 'carnival-records', aliases: ['carnival'], titles: ['CARNIVAL RECORDS'], modals: ['.cr-modal'] },
    { slug: 'blandetto', titles: ['BLANDETTO'], modals: ['.blandetto-modal', '.bf'] },
    { slug: 'ninety-z-s', aliases: ['90-06', '90.06', '9006', 'ninety-zs'], titles: ['NINETY Z S', '90.06', '90 06'], modals: ['.project9006-modal'] },
    { slug: 'posters', titles: ['POSTERS'], modals: ['.pcg-modal'] },
    { slug: 'merch', titles: ['MERCH'], modals: ['.mc-modal'] },
    { slug: 'stickers', titles: ['STICKERS'], modals: ['.stk-modal'] },
    { slug: 'logos', titles: ['LOGOS', 'ЛОГОТИПЫ'], modals: ['.lcg-modal'] },
    { slug: 'album-covers', aliases: ['covers'], titles: ['ALBUM COVERS'], modals: ['.album-covers-modal'] },
    { slug: 'stay-ugly', aliases: ['stayugly'], titles: ['STAY UGLY', 'STAYUGLY'], modals: ['.su-modal'] },
    { slug: 'anka-peresild', aliases: ['anka'], titles: ['ANKA PERESILD'], modals: ['.anka-peresild-modal'] },
    { slug: 'vtb-design-team', aliases: ['vtb'], titles: ['VTB DESIGN TEAM'], modals: ['.vtb-modal'] },
    { slug: 'collages-photo-edit', aliases: ['collages'], titles: ['COLLAGES PHOTO EDIT'], modals: ['.collages-modal'] },
  ];

  const PROJECT_BY_PARAM = new Map();
  PROJECTS.forEach(project => {
    [project.slug, ...(project.aliases || [])].forEach(alias => PROJECT_BY_PARAM.set(key(alias), project));
  });

  const SECTION_SPECS = {
    zny: [
      { key: 'prints', aliases: ['HANDMADE PRINTS FW 24 25', 'ХЭНДМЕЙД ПРИНТЫ FW 24 25'] },
      { key: 'campaign', aliases: ['VISUAL IDENTITY CAMPAIGN SS 25', 'ВИЗУАЛЬНЫЙ СТИЛЬ И КАМПЕЙН SS 25'] },
      { key: 'stickers', aliases: ['STICKER SERIES SS 25', 'СЕРИЯ СТИКЕРОВ SS 25'] },
    ],
    fable: [
      { key: 'vintage', aliases: ['VINTAGE SPORTS GRAPHICS'] },
      { key: 'contemporary', aliases: ['CONTEMPORARY GRAPHICS'] },
      { key: 'production', aliases: ['GRAPHICS IN PRODUCTION'] },
      { key: 'saint', aliases: ['SAINT IDENTITY'] },
    ],
    'ninety-z-s': [
      { key: 'identity', keys: ['logos', 'logo'], aliases: ['VISUAL IDENTITY LOGO DESIGN', 'АЙДЕНТИКА И ЛОГОТИП', 'LOGO VARIATIONS'] },
      { key: 'pendant', keys: ['merch'], aliases: ['PENDANT DESIGN', 'ДИЗАЙН ПОДВЕСКИ', 'MERCH'] },
      { key: 'lookbook', keys: ['photoshoot'], aliases: ['LOOKBOOK PHOTOSHOOT HANDMADE COLLAGE', 'ЛУКБУК И КОЛЛАЖ', 'PHOTOSHOOT'] },
      { key: 'posters', aliases: ['MASCOT POSTER SERIES', 'МАСКОТ И СЕРИЯ ПОСТЕРОВ', 'POSTERS'] },
    ],
    'carnival-records': [
      { key: 'carnival-print', aliases: ['CARNIVAL PRINT'] },
      { key: 'calec-print', aliases: ['CALEC PRINT'] },
      { key: 'album', aliases: ['ALBUM'] },
      { key: 'merch', aliases: ['MERCH'] },
    ],
    'vtb-design-team': [
      { key: 'prints', aliases: ['PRINTS'] },
      { key: 'merch', aliases: ['MERCH'] },
      { key: 'advertising', keys: ['ads'], aliases: ['ADVERTISING'] },
    ],
    logos: [
      { key: 'development', keys: ['system'], aliases: ['LOGO SYSTEM DEVELOPMENT', 'РАЗРАБОТКА СИСТЕМЫ ЛОГОТИПОВ'] },
      { key: 'transport', aliases: ['TRANSPORTATION DEPARTMENT', 'ТРАНСПОРТНОЕ НАПРАВЛЕНИЕ'] },
      { key: 'education', aliases: ['EDUCATIONAL DEPARTMENT', 'ОБРАЗОВАТЕЛЬНОЕ НАПРАВЛЕНИЕ'] },
      { key: 'memos', aliases: ['MEMOS SYSTEM', 'СИСТЕМА MEMOS'] },
      { key: 'auditorium', aliases: ['AUDITORIUM BOOKING SYSTEM', 'AUDITORIUM СИСТЕМА БРОНИРОВАНИЯ'] },
      { key: 'opis-center', aliases: ['OPIS CENTER', 'ОПИС ЦЕНТР'] },
      { key: 'result', aliases: ['RESULT', 'РЕЗУЛЬТАТ'] },
    ],
    posters: [
      { key: 'special-italy', keys: ['italy'], aliases: ['SPECIAL ITALY PROJECT'] },
      { key: 'events', aliases: ['EVENT POSTERS', 'ИВЕНТ ПОСТЕРЫ', 'EVENTS PARTIES'] },
      { key: 'flawa', aliases: ['FLAWA POSTERS'] },
      { key: 'more', aliases: ['THERE S MORE', 'ИХ ЕЩЕ БОЛЬШЕ'] },
    ],
    stickers: [
      { key: 'mnu', aliases: ['MNU'] },
      { key: 'nightflower', aliases: ['NIGHTFLOWER', 'FLAWA'] },
      { key: 'more', aliases: ['EVEN MORE', 'ИХ ЕЩЕ БОЛЬШЕ'] },
    ],
    blandetto: [
      { key: 'logos', aliases: ['LOGOS', 'ЛОГОТИПЫ'] },
      { key: 'prints', aliases: ['PRINTS', 'ПРИНТЫ'] },
      { key: 'dentist-market', aliases: ['DENTIST MARKET'] },
      { key: 'cap', aliases: ['CAP', 'CAP DEVELOPMENT', 'РАЗРАБОТКА КЕПКИ'] },
    ],
    'collages-photo-edit': [
      { key: 'collages', aliases: ['COLLAGES', 'КОЛЛАЖИ'] },
      { key: 'collage-posters', aliases: ['COLLAGE POSTERS', 'КОЛЛАЖНЫЕ ПОСТЕРЫ'] },
      { key: 'dots', aliases: ['DOTS'] },
    ],
    'anka-peresild': [
      { key: 'clothes', aliases: ['CLOTHES'] },
      { key: 'accessories', keys: ['acs'], aliases: ['ACCESSORIES', 'ACS'] },
      { key: 'babes', aliases: ['BABES'] },
    ],
  };

  const CLOSE_SELECTOR = [
    '.zny-close', '.fable-close', '.su-close', '.vtb-close', '.cr-close', '.mc-close',
    '.stk-close', '.pcg-close', '.lcg-close', '.pag-close', '.blandetto-close', '.bf-close',
    '.anka-peresild-close', '.album-covers-close', '.project9006-toolbar__close'
  ].join(',');

  let activeProject = null;
  let activeModal = null;
  let activeSections = [];
  let modalSectionObserver = null;
  let scrollFrame = 0;
  let pendingUserProject = '';
  let suppressCloseUrlSync = false;
  let locationNavigation = false;

  const projectFromParam = value => PROJECT_BY_PARAM.get(key(value)) || null;
  const cards = () => [...document.querySelectorAll('#works article,#works button')];
  const findCard = project => {
    const accepted = new Set(project.titles.map(normalize));
    return cards().find(card => accepted.has(normalize(card.querySelector('h3')?.textContent))) || null;
  };

  function pagProject(modal) {
    if (!modal?.matches?.('.pag-modal')) return null;
    const title = normalize(modal.querySelector('.pag-title,.pag-label')?.textContent);
    if (title.includes('COLLAGE') || title.includes('КОЛЛАЖ')) return PROJECT_BY_PARAM.get('collages-photo-edit') || null;
    if (title.includes('POSTER') || title.includes('ПОСТЕР')) return PROJECT_BY_PARAM.get('posters') || null;
    if (title.includes('LOGO') || title.includes('ЛОГО')) return PROJECT_BY_PARAM.get('logos') || null;
    return null;
  }

  function detectOpenProject() {
    for (const project of PROJECTS) {
      for (const selector of project.modals) {
        const modal = document.querySelector(selector);
        if (modal) return { project, modal };
      }
    }

    const pag = document.querySelector('.pag-modal');
    const pagDetected = pagProject(pag);
    if (pag && pagDetected) return { project: pagDetected, modal: pag };

    const pinkGallery = document.querySelector('.pink-punk-gallery');
    if (pinkGallery) {
      const modal = pinkGallery.closest('.fixed.inset-0,[role="dialog"]');
      const project = PROJECT_BY_PARAM.get('pink-punk');
      if (modal && project) return { project, modal };
    }
    return null;
  }

  function setUrl(projectSlug = '', section = '', mode = 'replace') {
    const url = new URL(window.location.href);
    if (projectSlug) url.searchParams.set('project', projectSlug);
    else url.searchParams.delete('project');
    if (projectSlug && section) url.searchParams.set('section', section);
    else url.searchParams.delete('section');
    if (projectSlug) url.hash = '';

    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next === current) return;
    const method = mode === 'push' ? 'pushState' : 'replaceState';
    history[method]({ portfolioDeepLink: VERSION, project: projectSlug, section }, '', next);
  }

  const normalizeAliasSet = aliases => new Set((aliases || []).map(normalize));
  const sectionKeyMatches = (spec, requested) => {
    const wanted = key(requested);
    return [spec.key, ...(spec.keys || [])].some(value => key(value) === wanted);
  };

  function headingTarget(modal, aliases) {
    const accepted = normalizeAliasSet(aliases);
    const headings = [...modal.querySelectorAll('h1,h2,h3,h4,[data-section-title]')];
    const heading = headings.find(node => accepted.has(normalize(node.textContent)));
    if (!heading) return null;
    return heading.closest('section,[data-section],.fable-section,.zny-section,.vtb-section,.cr-section,.pag-section,.lcg-row') || heading;
  }

  function specialSectionTarget(project, requested, modal) {
    const wanted = key(requested);

    if (project.slug === 'pink-punk') {
      const mapping = {
        tees: 'tees',
        't-shirt-graphics': 'tees',
        posters: 'posters',
        prints: 'prints',
        'collection-graphics': 'prints',
      };
      const section = mapping[wanted];
      return section ? modal.querySelector(`.pink-punk-section[data-section="${section}"],.pink-punk-section--${section}`) : null;
    }

    if (project.slug === 'stay-ugly') {
      const mapping = { concept: 'concept', final: 'final', photoshoot: 'photoshoot', photo: 'photoshoot', packaging: 'packaging' };
      const section = mapping[wanted];
      return section ? modal.querySelector(`.su-section[data-su-section="${section}"]`) : null;
    }

    if (project.slug === 'merch') {
      const dxs = modal.querySelector('.mc-dxs');
      if (wanted === 'dxs') return dxs;
      if (wanted === 'billboards') return modal.querySelector('.mc-billboards');

      const sectionByHeading = (root, aliases) => {
        if (!root) return null;
        const accepted = normalizeAliasSet(aliases);
        return [...root.querySelectorAll('.mc-section')].find(section => {
          const heading = section.querySelector('.mc-section-title,h2,h3');
          return accepted.has(normalize(heading?.textContent));
        }) || null;
      };

      if (wanted === 'dxs-stickers') return sectionByHeading(dxs, ['STICKERS', 'СТИКЕРЫ']);
      if (wanted === 'dxs-posters') return sectionByHeading(dxs, ['POSTER SERIES', 'СЕРИЯ ПОСТЕРОВ']);
      if (wanted === 'dxs-ads' || wanted === 'ads' || wanted === 'advertising') {
        return sectionByHeading(dxs, ['ADVERTISING MATERIALS', 'РЕКЛАМНЫЕ МАТЕРИАЛЫ']);
      }

      const outsideDxs = [...modal.querySelectorAll('.mc-section')].filter(section => !section.closest('.mc-dxs'));
      const outsideByHeading = aliases => {
        const accepted = normalizeAliasSet(aliases);
        return outsideDxs.find(section => accepted.has(normalize(section.querySelector('.mc-section-title,h2,h3')?.textContent))) || null;
      };
      if (wanted === 'merch' || wanted === 'graphics') return outsideByHeading(['MERCH GRAPHICS', 'ГРАФИКА ДЛЯ МЕРЧА']);
      if (wanted === 'yablochko-posters' || wanted === 'posters') return outsideByHeading(['POSTER SERIES', 'СЕРИЯ ПОСТЕРОВ']);
      if (wanted === 'social' || wanted === 'social-media') return outsideByHeading(['SOCIAL MEDIA CONTENT', 'КОНТЕНТ ДЛЯ СОЦИАЛЬНЫХ СЕТЕЙ']);
    }

    return null;
  }

  function genericSectionTarget(project, requested, modal) {
    const specs = SECTION_SPECS[project.slug] || [];
    const spec = specs.find(item => sectionKeyMatches(item, requested));
    return spec ? headingTarget(modal, spec.aliases) : null;
  }

  function findSectionTarget(project, requested, modal) {
    if (!project || !requested || !modal) return null;
    return specialSectionTarget(project, requested, modal)
      || genericSectionTarget(project, requested, modal);
  }

  function sectionEntries(project, modal) {
    if (!project || !modal) return [];
    const entries = [];
    const add = (sectionKey, target) => {
      if (!target || entries.some(entry => entry.target === target)) return;
      target.dataset.portfolioDeepSection = sectionKey;
      entries.push({ key: sectionKey, target });
    };

    if (project.slug === 'pink-punk') {
      add('tees', findSectionTarget(project, 'tees', modal));
      add('posters', findSectionTarget(project, 'posters', modal));
      add('collection-graphics', findSectionTarget(project, 'collection-graphics', modal));
      return entries;
    }
    if (project.slug === 'stay-ugly') {
      ['concept', 'final', 'photoshoot', 'packaging'].forEach(value => add(value, findSectionTarget(project, value, modal)));
      return entries;
    }
    if (project.slug === 'merch') {
      ['merch', 'yablochko-posters', 'social', 'billboards', 'dxs', 'dxs-stickers', 'dxs-posters', 'dxs-ads']
        .forEach(value => add(value, findSectionTarget(project, value, modal)));
      return entries;
    }

    (SECTION_SPECS[project.slug] || []).forEach(spec => add(spec.key, genericSectionTarget(project, spec.key, modal)));
    return entries;
  }

  function targetTop(modal, target) {
    const modalRect = modal.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return modal.scrollTop + targetRect.top - modalRect.top;
  }

  function scrollToTarget(modal, target) {
    if (!modal || !target?.isConnected) return;
    const top = targetTop(modal, target);
    modal.scrollTop = Math.max(0, top - 14);
  }

  function currentSectionFromScroll() {
    if (!activeProject || !activeModal || !activeSections.length) return '';
    const sorted = activeSections
      .filter(entry => entry.target?.isConnected)
      .map(entry => ({ ...entry, top: targetTop(activeModal, entry.target) }))
      .sort((a, b) => a.top - b.top);
    if (!sorted.length) return '';
    const marker = activeModal.scrollTop + Math.min(180, Math.max(72, activeModal.clientHeight * .18));
    if (marker < sorted[0].top) return '';
    let chosen = sorted[0];
    for (const entry of sorted) {
      if (entry.top <= marker) chosen = entry;
      else break;
    }
    return chosen.key;
  }

  function syncSectionFromScroll() {
    scrollFrame = 0;
    if (locationNavigation) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('project') !== activeProject?.slug) return;
    const next = currentSectionFromScroll();
    if ((params.get('section') || '') === next) return;
    setUrl(activeProject.slug, next, 'replace');
  }

  function attachSectionTracking(project, modal) {
    modalSectionObserver?.disconnect();
    modalSectionObserver = null;
    activeSections = sectionEntries(project, modal);

    const refresh = () => { activeSections = sectionEntries(project, modal); };
    let timer = 0;
    modalSectionObserver = new MutationObserver(refresh);
    modalSectionObserver.observe(modal, { childList: true, subtree: true });
    timer = window.setTimeout(() => {
      modalSectionObserver?.disconnect();
      modalSectionObserver = null;
      refresh();
    }, 1800);

    modal.addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(syncSectionFromScroll);
    }, { passive: true });

    return () => {
      clearTimeout(timer);
      modalSectionObserver?.disconnect();
      modalSectionObserver = null;
    };
  }

  function navigateSectionWhenReady(project, modal, requested) {
    if (!requested) return;
    const tryScroll = () => {
      const target = findSectionTarget(project, requested, modal);
      if (!target) return false;
      requestAnimationFrame(() => {
        scrollToTarget(modal, target);
        requestAnimationFrame(() => { locationNavigation = false; });
      });
      return true;
    };

    locationNavigation = true;
    if (tryScroll()) return;
    const observer = new MutationObserver(() => {
      if (!tryScroll()) return;
      observer.disconnect();
      clearTimeout(timer);
    });
    observer.observe(modal, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    const timer = window.setTimeout(() => {
      observer.disconnect();
      locationNavigation = false;
    }, 2200);
  }

  function onProjectOpened(project, modal) {
    if (!project || !modal) return;
    if (activeModal === modal && activeProject?.slug === project.slug) return;

    activeProject = project;
    activeModal = modal;
    attachSectionTracking(project, modal);

    const params = new URLSearchParams(window.location.search);
    const currentProject = projectFromParam(params.get('project'));
    const currentSection = params.get('section') || '';
    const userOpen = pendingUserProject === project.slug;
    pendingUserProject = '';

    if (!currentProject || currentProject.slug !== project.slug) {
      setUrl(project.slug, '', userOpen ? 'push' : 'replace');
    } else if (params.get('project') !== project.slug) {
      setUrl(project.slug, currentSection, 'replace');
    }

    const refreshed = new URLSearchParams(window.location.search);
    const requested = refreshed.get('section') || '';
    if (requested) navigateSectionWhenReady(project, modal, requested);
  }

  function onProjectClosed() {
    if (!activeProject) return;
    const closedSlug = activeProject.slug;
    activeProject = null;
    activeModal = null;
    activeSections = [];
    modalSectionObserver?.disconnect();
    modalSectionObserver = null;
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;

    if (suppressCloseUrlSync) {
      suppressCloseUrlSync = false;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const current = projectFromParam(params.get('project'));
    if (current?.slug === closedSlug) setUrl('', '', 'replace');
  }

  function closeActiveModal() {
    if (!activeModal?.isConnected) return;
    let button = activeModal.querySelector(CLOSE_SELECTOR);
    if (!button) {
      button = [...activeModal.querySelectorAll('button')].find(node => {
        const text = normalize(node.textContent);
        return text === 'CLOSE' || text === 'ЗАКРЫТЬ';
      }) || null;
    }
    if (button) button.click();
  }

  function waitForCard(project, callback) {
    const existing = findCard(project);
    if (existing) {
      callback(existing);
      return;
    }
    const observer = new MutationObserver(() => {
      const card = findCard(project);
      if (!card) return;
      observer.disconnect();
      clearTimeout(timer);
      callback(card);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = window.setTimeout(() => observer.disconnect(), 4000);
  }

  function openProjectFromLocation(project, section = '') {
    if (!project) return;
    const opened = detectOpenProject();
    if (opened?.project.slug === project.slug) {
      onProjectOpened(opened.project, opened.modal);
      if (section) navigateSectionWhenReady(project, opened.modal, section);
      return;
    }

    const openCard = () => waitForCard(project, card => {
      pendingUserProject = '';
      locationNavigation = Boolean(section);
      card.click();
    });

    if (activeModal?.isConnected) {
      suppressCloseUrlSync = true;
      closeActiveModal();
      const observer = new MutationObserver(() => {
        if (activeModal?.isConnected) return;
        observer.disconnect();
        clearTimeout(timer);
        openCard();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      const timer = window.setTimeout(() => {
        observer.disconnect();
        openCard();
      }, 1200);
      return;
    }
    openCard();
  }

  function reconcileLocation() {
    const params = new URLSearchParams(window.location.search);
    const project = projectFromParam(params.get('project'));
    const section = params.get('section') || '';

    if (!project) {
      if (activeModal?.isConnected) {
        suppressCloseUrlSync = true;
        closeActiveModal();
      }
      return;
    }
    openProjectFromLocation(project, section);
  }

  function projectForCard(card) {
    const title = normalize(card?.querySelector('h3')?.textContent);
    if (!title) return null;
    return PROJECTS.find(project => project.titles.some(candidate => normalize(candidate) === title)) || null;
  }

  document.addEventListener('pointerdown', event => {
    const card = event.target.closest?.('#works article,#works button');
    const project = projectForCard(card);
    if (project) pendingUserProject = project.slug;
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest?.('#works article,#works button');
    const project = projectForCard(card);
    if (project) pendingUserProject = project.slug;
  }, true);

  new MutationObserver(() => {
    if (activeModal && !activeModal.isConnected) onProjectClosed();
    const opened = detectOpenProject();
    if (opened) onProjectOpened(opened.project, opened.modal);
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

  window.addEventListener('popstate', reconcileLocation);
  window.addEventListener('load', reconcileLocation, { once: true });
  requestAnimationFrame(reconcileLocation);
})();
