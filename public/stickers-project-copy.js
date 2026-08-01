(() => {
  if (window.__stickersProjectCopyV1) return;
  window.__stickersProjectCopyV1 = true;

  const VERSION = 'stickers-project-copy-1';
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
    },
  };

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

      .stk-project-copy p {
        margin: 0;
      }

      .stk-project[data-stickers-project="flawa"] .stk-project-title {
        max-width: 12ch;
      }

      @media (max-width: 560px) {
        .stk-project-copy {
          margin-top: 0;
          line-height: 1.4;
        }
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
      const paragraph = document.createElement('p');
      block.append(paragraph);
      title?.after(block);
    }

    const paragraph = block.querySelector('p');
    if (paragraph && paragraph.textContent !== data.text) paragraph.textContent = data.text;
    block.lang = language();
  }

  function apply() {
    injectStyles();
    document.querySelectorAll('.stk-project[data-stickers-project="mnu"]').forEach((section) => applySection(section, 'mnu'));
    document.querySelectorAll('.stk-project[data-stickers-project="flawa"]').forEach((section) => applySection(section, 'flawa'));
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

  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });

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
