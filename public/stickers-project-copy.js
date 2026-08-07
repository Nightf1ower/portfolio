(() => {
  if (window.__stickersProjectCopyV2) return;
  window.__stickersProjectCopyV2 = true;

  const VERSION = 'stickers-project-copy-2';
  const COPY = {
    ru: {
      mnu: {
        title: 'MNU MASSAGE STUDIO',
        text: 'Разработка серии небольших объёмных 3D-стикеров для массажной студии MNU. В основе графики — различные отсылки к массажу, телесным практикам и расслаблению, переосмысленные через образы из повседневной жизни, поп-культуры и других визуальных сфер.',
      },
      flawa: {
        title: 'NIGHTFLOWER STICKER PACK',
        text: 'Разработка авторской серии стикеров для стикербомбинга. Визуальный стиль строится на сочетании ярких цветов, гранжевой графики и намеренно хаотичной, безумной эстетики. Каждый стикер работает как самостоятельный объект, сохраняя общий характер и настроение серии.',
      },
      moreTitle: 'ИХ ЕЩЁ БОЛЬШЕ',
      moreText: 'Стикеры также есть внутри отдельных проектов.',
      action: 'К СТИКЕРАМ',
    },
    en: {
      mnu: {
        title: 'MNU MASSAGE STUDIO',
        text: 'A series of small dimensional 3D stickers created for MNU Massage Studio. The designs feature references to massage, body practices, and relaxation, reinterpreted through imagery inspired by everyday life, pop culture, and various visual contexts.',
      },
      flawa: {
        title: 'NIGHTFLOWER STICKER PACK',
        text: 'An original sticker series designed for sticker bombing. The visual style combines bright colors, grunge-inspired graphics, and an intentionally chaotic, wild aesthetic. Each sticker works as an independent graphic object while maintaining the overall character and mood of the series.',
      },
      moreTitle: 'EVEN MORE',
      moreText: 'More sticker work can also be found inside individual projects.',
      action: 'VIEW STICKERS',
    },
  };

  const LINKS = [
    { brand: 'ZNY', project: 'ZNY', target: 'zny' },
    { brand: 'DXS', project: 'MERCH', target: 'dxs' },
  ];

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  function injectStyles() {
    document.getElementById('stickers-project-copy-style')?.remove();
    const style = document.createElement('style');
    style.id = 'stickers-project-copy-style';
    style.textContent = `
      .stk-project-copy {
        width: min(100%, 52rem);
        margin: clamp(-1rem, -1.5vw, -.35rem) 0 clamp(3rem, 6vw, 5.5rem);
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(1rem, 1.45vw, 1.28rem);
        font-weight: 500;
        line-height: 1.35;
        letter-spacing: -.025em;
      }
      .stk-project-copy p { margin: 0; }
      .stk-project[data-stickers-project="flawa"] .stk-project-title { max-width: 12ch; }

      .stk-more-projects {
        padding: clamp(5rem, 10vw, 9rem) 0 clamp(2rem, 4vw, 4rem);
        border-top: 1px solid rgba(5,5,5,.3);
      }
      .stk-more-projects__title {
        margin: 0;
        font: 900 clamp(3.8rem, 9vw, 9rem)/.76 Arial, Helvetica, sans-serif;
        letter-spacing: -.09em;
        text-transform: uppercase;
      }
      .stk-more-projects__copy {
        width: min(100%, 46rem);
        margin: clamp(1.25rem, 2.5vw, 2rem) 0 clamp(2.5rem, 5vw, 4rem);
        font: 600 clamp(1rem, 1.4vw, 1.25rem)/1.45 Arial, Helvetica, sans-serif;
        letter-spacing: -.015em;
      }
      .stk-more-projects__list { border-top: 1px solid rgba(5,5,5,.32); }
      .stk-more-projects__link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        margin: 0;
        padding: clamp(1.35rem, 2.8vw, 2.4rem) 0;
        border: 0;
        border-bottom: 1px solid rgba(5,5,5,.32);
        background: transparent;
        color: #050505;
        cursor: pointer;
        text-align: left;
      }
      .stk-more-projects__brand {
        font: 900 clamp(2.8rem, 6.5vw, 6.5rem)/.8 Arial, Helvetica, sans-serif;
        letter-spacing: -.075em;
        text-transform: uppercase;
      }
      .stk-more-projects__action {
        flex: 0 0 auto;
        font: 900 .68rem/1 Arial, Helvetica, sans-serif;
        letter-spacing: .2em;
        text-transform: uppercase;
      }
      .stk-more-projects__arrow {
        display: inline-block;
        margin-left: .6rem;
        font-size: 1.25em;
        transition: transform .2s ease;
      }
      .stk-more-projects__link:hover .stk-more-projects__arrow,
      .stk-more-projects__link:focus-visible .stk-more-projects__arrow { transform: translateX(.5rem); }

      @media (max-width: 560px) {
        .stk-project-copy { margin-top: 0; line-height: 1.4; }
        .stk-more-projects__link { align-items: flex-end; }
        .stk-more-projects__action { font-size: .58rem; letter-spacing: .13em; }
      }
    `;
    document.head.append(style);
  }

  function applySection(section, key) {
    const data = COPY[language()][key];
    if (!data) return;

    const title = section.querySelector(':scope > .stk-project-title');
    if (title && title.textContent !== data.title) title.textContent = data.title;

    let block = section.querySelector(':scope > .stk-project-copy');
    if (!block) {
      block = document.createElement('div');
      block.className = 'stk-project-copy';
      block.dataset.version = VERSION;
      block.append(document.createElement('p'));
      title?.after(block);
    }

    const paragraph = block.querySelector('p');
    if (paragraph && paragraph.textContent !== data.text) paragraph.textContent = data.text;
    block.lang = language();
  }

  function homepageCard(title) {
    const wanted = String(title || '').trim().toUpperCase();
    return [...document.querySelectorAll('#works article, #works button')].find((card) => (
      card.querySelector('h3')?.textContent?.trim().toUpperCase() === wanted
    )) || null;
  }

  function findTarget(target) {
    if (target === 'zny') {
      const root = document.querySelector('.zny-modal');
      return [...(root?.querySelectorAll('.zny-section') || [])].find((section) => {
        const text = section.querySelector('.zny-title')?.textContent?.toUpperCase() || '';
        return text.includes('STICKER') || text.includes('СТИКЕР');
      }) || null;
    }

    if (target === 'dxs') {
      const root = document.querySelector('.mc-modal, .m10-modal');
      const dxs = root?.querySelector('.mc-dxs, .m10-dxs-zone');
      return [...(dxs?.querySelectorAll('section, .mc-section, .m10-section') || [])].find((section) => {
        const text = section.querySelector('h1,h2,h3,.mc-section-title,.m10-section-title')?.textContent?.trim().toUpperCase() || '';
        return text === 'STICKERS' || text === 'СТИКЕРЫ';
      }) || null;
    }

    return null;
  }

  function scrollWhenReady(target, attempt = 0) {
    const section = findTarget(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (attempt < 80) setTimeout(() => scrollWhenReady(target, attempt + 1), 50);
  }

  function openProject(link) {
    const card = homepageCard(link.project);
    if (!card) return;
    document.querySelector('.stk-close')?.click();
    setTimeout(() => {
      card.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      scrollWhenReady(link.target);
    }, 40);
  }

  function ensureMoreBlock() {
    const inner = document.querySelector('.stk-modal .stk-inner');
    if (!inner) return;

    let block = inner.querySelector(':scope > .stk-more-projects');
    if (!block) {
      block = document.createElement('section');
      block.className = 'stk-more-projects';
      block.innerHTML = '<h2 class="stk-more-projects__title"></h2><p class="stk-more-projects__copy"></p><div class="stk-more-projects__list"></div>';
      inner.append(block);
    }

    const copy = COPY[language()];
    block.querySelector('.stk-more-projects__title').textContent = copy.moreTitle;
    block.querySelector('.stk-more-projects__copy').textContent = copy.moreText;

    const list = block.querySelector('.stk-more-projects__list');
    list.replaceChildren();
    LINKS.forEach((link) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'stk-more-projects__link';

      const brand = document.createElement('span');
      brand.className = 'stk-more-projects__brand';
      brand.textContent = link.brand;

      const action = document.createElement('span');
      action.className = 'stk-more-projects__action';
      action.textContent = copy.action;
      const arrow = document.createElement('span');
      arrow.className = 'stk-more-projects__arrow';
      arrow.textContent = '→';
      action.append(arrow);

      button.append(brand, action);
      button.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        openProject(link);
      };
      list.append(button);
    });
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.stk-project[data-stickers-project="mnu"]').forEach((section) => applySection(section, 'mnu'));
    document.querySelectorAll('.stk-project[data-stickers-project="flawa"]').forEach((section) => applySection(section, 'flawa'));
    ensureMoreBlock();
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  };

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0);
      setTimeout(schedule, 120);
    }
  }, true);

  window.addEventListener('storage', schedule);
  window.addEventListener('load', schedule);
  apply();
})();
