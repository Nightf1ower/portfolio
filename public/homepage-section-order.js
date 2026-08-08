(() => {
  if (window.__homepageSectionOrderV5) return;
  window.__homepageSectionOrderV5 = true;

  const VERSION = 'homepage-section-order-5';
  const STYLE_ID = 'homepage-section-order-style';
  const SECTION_ORDER = ['top', 'about', 'services', 'works', 'contacts'];
  const NAV_ORDER = ['#about', '#services', '#works', '#contacts'];

  const normalize = (value) => String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();

  function installStyles() {
    const existing = document.getElementById(STYLE_ID);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      #about, #services, #works, #contacts {
        scroll-margin-top: 5rem;
      }

      #root > main > header,
      #root > main > header nav,
      #root > main > header a,
      #root > main > header button {
        pointer-events: auto;
      }
    `;
    document.head.append(style);
  }

  function reorderSections() {
    const main = document.querySelector('#root > main');
    const header = main?.querySelector(':scope > header');
    if (!main || !header) return false;

    const sections = SECTION_ORDER.map((id) => document.getElementById(id));
    if (sections.some((section) => !section)) return false;

    let anchor = header;
    sections.forEach((section) => {
      if (section.previousElementSibling !== anchor) anchor.after(section);
      anchor = section;
    });
    return true;
  }

  function targetForLink(link) {
    const text = normalize(link.textContent);

    if (text.includes('ABOUT') || text.includes('ОБО МНЕ') || text.includes('О БО МНЕ')) return '#about';
    if (text.includes('SERVICES') || text.includes('УСЛУГИ')) return '#services';
    if (text.includes('PROJECTS') || text.includes('WORKS') || text.includes('ПРОЕКТЫ') || text.includes('РАБОТЫ')) return '#works';
    if (text.includes('CONTACT') || text.includes('КОНТАКТ')) return '#contacts';

    const href = link.getAttribute('href');
    return NAV_ORDER.includes(href) ? href : null;
  }

  function scrollToSection(href) {
    const target = document.querySelector(href);
    if (!target) return;

    const header = document.querySelector('#root > main > header');
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const getTop = () => Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 8);

    window.scrollTo({ top: getTop(), behavior: 'smooth' });

    window.setTimeout(() => {
      const correction = target.getBoundingClientRect().top - headerHeight - 8;
      if (Math.abs(correction) > 2) window.scrollBy({ top: correction, behavior: 'auto' });
    }, 420);

    try { history.replaceState(null, '', href); } catch {}
  }

  function bindLink(link, href) {
    link.setAttribute('href', href);
    link.dataset.homepageNavTarget = href;

    if (link.dataset.homepageNavBound === VERSION) return;
    link.dataset.homepageNavBound = VERSION;

    link.addEventListener('click', (event) => {
      const targetHref = link.dataset.homepageNavTarget;
      if (!targetHref) return;
      event.preventDefault();
      scrollToSection(targetHref);
    });
  }

  function reorderNavigation() {
    const nav = document.querySelector('#root > main > header nav');
    const linksWrap = nav?.querySelector('.sm\\:flex');
    if (!linksWrap) return false;

    const links = [...linksWrap.querySelectorAll('a.nav-link')];
    if (links.length < 4) return false;

    const byTarget = new Map();
    links.forEach((link) => {
      const target = targetForLink(link);
      if (!target) return;
      bindLink(link, target);
      byTarget.set(target, link);
    });

    if (!NAV_ORDER.every((href) => byTarget.has(href))) return false;

    const currentOrder = [...linksWrap.querySelectorAll('a.nav-link')]
      .map((link) => link.dataset.homepageNavTarget || link.getAttribute('href'));
    const alreadyCorrect = NAV_ORDER.every((href, index) => currentOrder[index] === href);

    if (!alreadyCorrect) NAV_ORDER.forEach((href) => linksWrap.append(byTarget.get(href)));

    linksWrap.dataset.sectionOrderVersion = VERSION;
    return true;
  }

  function apply() {
    installStyles();
    return reorderSections() && reorderNavigation();
  }

  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    if (apply() || attempts >= 30) window.clearInterval(retry);
  }, 80);

  window.addEventListener('load', apply, { once: true });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      window.setTimeout(reorderNavigation, 0);
      window.setTimeout(reorderNavigation, 120);
    }
  }, true);

  installStyles();
  apply();
})();
