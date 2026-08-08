(() => {
  if (window.__logosMoreLinksV1) return;
  window.__logosMoreLinksV1 = true;

  const VERSION = 'logos-more-links-1';

  const COPY = {
    ru: {
      title: 'ИХ ЕЩЁ БОЛЬШЕ',
      text: 'Ещё несколько логотипов можно посмотреть внутри отдельных проектов.',
      action: 'К ЛОГОТИПАМ',
    },
    en: {
      title: "THERE'S MORE",
      text: 'More logo work can also be found inside individual projects.',
      action: 'VIEW LOGOS',
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const normalize = value => String(value || '')
    .trim()
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  function injectStyles() {
    if (document.getElementById('logos-more-links-style')) return;
    const style = document.createElement('style');
    style.id = 'logos-more-links-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .lcg-more {
        box-sizing: border-box;
        width: 100%;
        padding: clamp(5rem,10vw,9rem) max(1rem,env(safe-area-inset-right)) max(5rem,calc(3rem + env(safe-area-inset-bottom))) max(1rem,env(safe-area-inset-left));
        border-top: 1px solid rgba(5,5,5,.14);
        background: #fff;
        color: #050505;
      }
      .lcg-more__title {
        margin: 0;
        font: 900 clamp(3.8rem,9vw,9rem)/.76 Arial,Helvetica,sans-serif;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .lcg-more__copy {
        width: min(100%,46rem);
        margin: clamp(1.25rem,2.5vw,2rem) 0 clamp(2.5rem,5vw,4rem);
        font: 600 clamp(1rem,1.4vw,1.25rem)/1.45 Arial,Helvetica,sans-serif;
        letter-spacing: -.015em;
      }
      .lcg-more__list { border-top: 1px solid rgba(5,5,5,.28); }
      .lcg-more__link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: clamp(1.35rem,2.8vw,2.4rem) 0;
        border: 0;
        border-bottom: 1px solid rgba(5,5,5,.28);
        background: transparent;
        color: #050505;
        cursor: pointer;
        text-align: left;
        appearance: none;
        -webkit-appearance: none;
        touch-action: manipulation;
      }
      .lcg-more__brand {
        pointer-events: none;
        font: 900 clamp(2.6rem,6.2vw,6.3rem)/.8 Arial,Helvetica,sans-serif;
        letter-spacing: -.075em;
        text-transform: uppercase;
      }
      .lcg-more__action {
        flex: 0 0 auto;
        pointer-events: none;
        font: 900 .68rem/1 Arial,Helvetica,sans-serif;
        letter-spacing: .2em;
        text-transform: uppercase;
      }
      .lcg-more__arrow {
        display: inline-block;
        margin-left: .6rem;
        font-size: 1.25em;
        transition: transform .2s ease;
      }
      .lcg-more__link:hover .lcg-more__arrow,
      .lcg-more__link:focus-visible .lcg-more__arrow { transform: translateX(.5rem); }
      @media (max-width:620px) {
        .lcg-more__link { align-items: flex-end; }
        .lcg-more__brand { font-size: clamp(2.3rem,13vw,4.5rem); }
        .lcg-more__action { font-size: .56rem; letter-spacing: .12em; }
      }
    `;
    document.head.append(style);
  }

  function findHomeCard(titles) {
    const accepted = new Set(titles.map(normalize));
    return [...document.querySelectorAll('#works article,#works button')].find(card => (
      accepted.has(normalize(card.querySelector('h3')?.textContent))
    )) || null;
  }

  function locateBlandettoLogos() {
    return document.querySelector('.bf .bf-s[data-bf-section="minimalLogo"]')
      || [...document.querySelectorAll('.bf .bf-s')].find(section => {
        const title = normalize(section.querySelector('.bf-t,h2,h3')?.textContent);
        return title.includes('LOGO') || title.includes('ЛОГО');
      })
      || null;
  }

  function locateNinetyLogos() {
    return document.querySelector('.project9006-logo-pair')?.closest('section')
      || [...document.querySelectorAll('.project9006-modal section')].find(section => {
        const title = normalize(section.querySelector('h2,h3,.project9006-clean-title')?.textContent);
        return title.includes('LOGO') || title.includes('ЛОГО') || title.includes('IDENTITY') || title.includes('АЙДЕНТИ');
      })
      || null;
  }

  const TARGETS = {
    blandetto: {
      titles: ['BLANDETTO'],
      locate: locateBlandettoLogos,
    },
    ninety: {
      titles: ['NINETY Z S', '90.06'],
      locate: locateNinetyLogos,
    },
  };

  function scrollDirectly(target) {
    if (!target) return false;
    const scroller = target.closest('.bf,.project9006-modal');
    if (!scroller) {
      target.scrollIntoView({ block: 'start' });
      return true;
    }
    const scrollerRect = scroller.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    scroller.scrollTop = Math.max(0, scroller.scrollTop + targetRect.top - scrollerRect.top - 16);
    return true;
  }

  function waitForTarget(locate) {
    const immediate = locate();
    if (immediate) {
      requestAnimationFrame(() => scrollDirectly(immediate));
      return;
    }

    let observer = null;
    const finish = () => {
      const target = locate();
      if (!target) return false;
      observer?.disconnect();
      requestAnimationFrame(() => scrollDirectly(target));
      return true;
    };

    observer = new MutationObserver(finish);
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer?.disconnect(), 1800);
  }

  function openTarget(key) {
    const config = TARGETS[key];
    if (!config) return;
    const card = findHomeCard(config.titles);
    if (!card) return;

    document.querySelector('.lcg-close')?.click();
    requestAnimationFrame(() => {
      waitForTarget(config.locate);
      card.click();
    });
  }

  function createBlock(inner) {
    const block = document.createElement('section');
    block.className = 'lcg-more';
    block.dataset.version = VERSION;

    const title = document.createElement('h2');
    title.className = 'lcg-more__title';
    const copy = document.createElement('p');
    copy.className = 'lcg-more__copy';
    const list = document.createElement('div');
    list.className = 'lcg-more__list';

    [['blandetto', 'BLANDETTO'], ['ninety', 'NINETY Z S']].forEach(([key, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lcg-more__link';
      button.dataset.logoProjectTarget = key;

      const brand = document.createElement('span');
      brand.className = 'lcg-more__brand';
      brand.textContent = label;

      const action = document.createElement('span');
      action.className = 'lcg-more__action';
      const text = document.createTextNode('');
      const arrow = document.createElement('span');
      arrow.className = 'lcg-more__arrow';
      arrow.textContent = '→';
      action.append(text, arrow);

      button.append(brand, action);
      list.append(button);
    });

    block.append(title, copy, list);
    inner.append(block);
    return block;
  }

  function updateBlock() {
    injectStyles();
    const inner = document.querySelector('.lcg-modal .lcg-inner');
    if (!inner) return false;
    const block = inner.querySelector(':scope > .lcg-more') || createBlock(inner);
    const copy = COPY[language()];
    block.querySelector('.lcg-more__title').textContent = copy.title;
    block.querySelector('.lcg-more__copy').textContent = copy.text;
    block.querySelectorAll('.lcg-more__link').forEach(button => {
      const action = button.querySelector('.lcg-more__action');
      const textNode = action?.firstChild;
      if (textNode?.nodeType === Node.TEXT_NODE) textNode.nodeValue = copy.action;
    });
    return true;
  }

  const observer = new MutationObserver(mutations => {
    const addedLogosModal = mutations.some(mutation => [...mutation.addedNodes].some(node => (
      node.nodeType === 1 && (node.matches?.('.lcg-modal') || node.querySelector?.('.lcg-modal'))
    )));
    if (addedLogosModal) requestAnimationFrame(updateBlock);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', event => {
    const button = event.target.closest?.('.lcg-more__link[data-logo-project-target]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    openTarget(button.dataset.logoProjectTarget);
  }, true);

  window.addEventListener('load', updateBlock, { once: true });
  injectStyles();
  updateBlock();
})();
