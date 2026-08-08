(() => {
  if (window.__homepageSectionOrderV4) return;
  window.__homepageSectionOrderV4 = true;

  const VERSION = 'homepage-section-order-4';
  const STYLE_ID = 'homepage-section-order-style';
  const SECTION_ORDER = ['top', 'about', 'services', 'works', 'contacts'];
  const NAV_ORDER = ['#about', '#services', '#works', '#contacts'];

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

  function reorderNavigation() {
    const nav = document.querySelector('#root > main > header nav');
    const linksWrap = nav?.querySelector('.sm\\:flex');
    if (!linksWrap) return false;

    const links = new Map(
      [...linksWrap.querySelectorAll('a.nav-link')]
        .map((link) => [link.getAttribute('href'), link])
    );
    if (!NAV_ORDER.every((href) => links.has(href))) return false;

    const currentOrder = [...linksWrap.querySelectorAll('a.nav-link')]
      .map((link) => link.getAttribute('href'));

    const alreadyCorrect = NAV_ORDER.every((href, index) => currentOrder[index] === href);
    if (!alreadyCorrect) {
      NAV_ORDER.forEach((href) => linksWrap.append(links.get(href)));
    }

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
