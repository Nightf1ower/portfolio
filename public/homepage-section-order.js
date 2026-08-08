(() => {
  if (window.__homepageSectionOrderV3) return;
  window.__homepageSectionOrderV3 = true;

  const VERSION = 'homepage-section-order-3';
  const STYLE_ID = 'homepage-section-order-style';
  const SECTION_ORDER = ['top', 'about', 'services', 'works', 'contacts'];
  const NAV_ORDER = ['#about', '#services', '#works', '#contacts'];
  const MODAL_SELECTOR = [
    '.pcg-modal', '.mc-modal', '.stk-modal', '.logos-clean-modal', '.vtb-modal',
    '.blandetto-modal', '.fable-modal', '.zny-modal', '.pink-punk-fullscreen',
    '.album-covers-modal', '.collages-modal', '.project9006-modal', '.su-modal',
    '.cr-modal', '.bf', '.posters-modal', '.pcg-light', '.mc-lightbox',
    '.blandetto-lightbox', '.cr-final-lightbox', '.z\\-\\[100\\].fixed.inset-0',
    '.z\\-\\[150\\].fixed.inset-0'
  ].join(',');

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      body.homepage-nav-active,
      html:has(body.homepage-nav-active) {
        overflow-y: auto !important;
      }

      body.homepage-nav-active #root > main > header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 2000000 !important;
        pointer-events: auto !important;
        isolation: isolate !important;
      }

      body.homepage-nav-active #root > main > header,
      body.homepage-nav-active #root > main > header nav,
      body.homepage-nav-active #root > main > header nav *,
      body.homepage-nav-active #root > main > header a.nav-link {
        pointer-events: auto !important;
      }

      body.homepage-nav-active #root > main > header a.nav-link {
        position: relative !important;
        z-index: 2 !important;
        cursor: pointer !important;
      }

      #about, #services, #works, #contacts {
        scroll-margin-top: 5rem;
      }
    `;
    document.head.append(style);
  }

  function elementIsVisible(node) {
    if (!(node instanceof Element) || !node.isConnected) return false;
    const style = getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (Number(style.opacity || 1) <= 0.01) return false;
    return true;
  }

  function hasActiveModal() {
    return [...document.querySelectorAll(MODAL_SELECTOR)].some(elementIsVisible);
  }

  function syncHeaderLayer() {
    const active = !hasActiveModal();
    document.body.classList.toggle('homepage-nav-active', active);
    if (active) {
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    }
  }

  function reorderSections() {
    const main = document.querySelector('#root > main');
    if (!main) return false;

    const sections = SECTION_ORDER.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length !== SECTION_ORDER.length) return false;

    let anchor = main.querySelector('header');
    if (!anchor) return false;

    sections.forEach((section) => {
      if (section.previousElementSibling !== anchor) anchor.after(section);
      anchor = section;
    });
    return true;
  }

  function scrollToTarget(href) {
    if (!href?.startsWith('#')) return false;
    const target = document.getElementById(href.slice(1));
    if (!target) return false;

    syncHeaderLayer();
    const header = document.querySelector('#root > main > header');
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 10;

    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    window.setTimeout(() => {
      const correction = target.getBoundingClientRect().top - headerHeight - 10;
      if (Math.abs(correction) > 3) window.scrollBy({ top: correction, behavior: 'auto' });
    }, 420);

    try { history.replaceState(null, '', href); } catch {}
    return true;
  }

  function bindNavLink(link) {
    if (!(link instanceof HTMLAnchorElement) || link.dataset.homepageNavBound === VERSION) return;
    link.dataset.homepageNavBound = VERSION;
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!scrollToTarget(href)) return;
      event.preventDefault();
      event.stopPropagation();
    });
  }

  function reorderNavigation() {
    const nav = document.querySelector('#root > main > header nav');
    const linksWrap = nav?.querySelector('.sm\\:flex');
    if (!linksWrap) return false;

    const links = new Map(
      [...linksWrap.querySelectorAll('a.nav-link')].map((link) => [link.getAttribute('href'), link])
    );
    if (!NAV_ORDER.every((href) => links.has(href))) return false;

    NAV_ORDER.forEach((href) => {
      const link = links.get(href);
      linksWrap.append(link);
      bindNavLink(link);
    });
    linksWrap.dataset.sectionOrderVersion = VERSION;
    return true;
  }

  function apply() {
    installStyles();
    syncHeaderLayer();
    const sectionsReady = reorderSections();
    const navReady = reorderNavigation();
    return sectionsReady && navReady;
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

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  window.addEventListener('hashchange', () => scrollToTarget(window.location.hash));
  window.addEventListener('load', schedule);
  [0, 80, 240, 700].forEach((delay) => setTimeout(schedule, delay));

  installStyles();
  schedule();
})();
