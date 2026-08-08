(() => {
  if (window.__homepageSectionOrderV2) return;
  window.__homepageSectionOrderV2 = true;

  const VERSION = 'homepage-section-order-2';
  const SECTION_ORDER = ['top', 'about', 'services', 'works', 'contacts'];
  const NAV_ORDER = ['#about', '#services', '#works', '#contacts'];

  function reorderSections() {
    const main = document.querySelector('#root > main');
    if (!main) return false;

    const sections = SECTION_ORDER
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length !== SECTION_ORDER.length) return false;

    let anchor = main.querySelector('header');
    sections.forEach((section) => {
      const expectedPrevious = anchor;
      if (section.previousElementSibling !== expectedPrevious) {
        expectedPrevious.after(section);
      }
      anchor = section;
    });

    return true;
  }

  function reorderNavigation() {
    const nav = document.querySelector('header nav');
    const linksWrap = nav?.querySelector('.sm\\:flex');
    if (!linksWrap) return false;

    const links = new Map(
      [...linksWrap.querySelectorAll('a.nav-link')]
        .map((link) => [link.getAttribute('href'), link])
    );

    if (!NAV_ORDER.every((href) => links.has(href))) return false;

    NAV_ORDER.forEach((href) => linksWrap.append(links.get(href)));
    linksWrap.dataset.sectionOrderVersion = VERSION;
    return true;
  }

  function scrollToTarget(href) {
    if (!href?.startsWith('#')) return false;
    const target = document.getElementById(href.slice(1));
    if (!target) return false;

    const header = document.querySelector('header');
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerHeight - 12;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });

    try {
      history.replaceState(null, '', href);
    } catch {}

    return true;
  }

  function apply() {
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

  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => {
      const target = mutation.target instanceof Element
        ? mutation.target
        : mutation.target.parentElement;
      return Boolean(target?.closest?.('#root, header'));
    });
    if (relevant) schedule();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    const navLink = event.target instanceof Element
      ? event.target.closest('header a.nav-link[href^="#"]')
      : null;

    if (navLink) {
      const href = navLink.getAttribute('href');
      if (scrollToTarget(href)) {
        event.preventDefault();
        return;
      }
    }

    if (event.target instanceof Element && event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0);
      setTimeout(schedule, 100);
    }
  }, true);

  window.addEventListener('load', schedule);
  [0, 80, 240, 700].forEach((delay) => setTimeout(schedule, delay));
})();
