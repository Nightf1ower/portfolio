(() => {
  if (window.__pinkPunkLayoutV3) return;
  window.__pinkPunkLayoutV3 = true;

  const VERSION = 'pink-layout-3';
  const COPY = {
    ru: {
      tees: {
        title: 'ФУТБОЛКИ',
        note: 'Сначала — превью принтов. На компьютере наведите на карточку, чтобы увидеть тот же дизайн на модели.',
      },
      posters: {
        title: 'ПОСТЕРЫ',
        note: 'Постеры и эксперименты с композицией для визуальной системы Pink Punk.',
      },
      prints: {
        title: 'ПРИНТЫ',
        note: 'Самостоятельные принты и дополнительные элементы визуальной системы.',
      },
    },
    en: {
      tees: {
        title: 'T-SHIRTS',
        note: 'Flat print previews first. On desktop, hover over a card to see the same graphic worn on body.',
      },
      posters: {
        title: 'POSTERS',
        note: 'Poster artworks and layout experiments for the Pink Punk visual system.',
      },
      prints: {
        title: 'PRINTS',
        note: 'Standalone print graphics and additional visual system elements.',
      },
    },
  };

  function injectStyles() {
    const previous = document.getElementById('pink-punk-layout-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'pink-punk-layout-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .pink-punk-fullscreen {
        background-color: #050505 !important;
        background-image: linear-gradient(
          180deg,
          #9b0014 0%,
          #7d0012 18%,
          #56000d 35%,
          #320008 52%,
          #180004 69%,
          #090102 84%,
          #050505 100%
        ) !important;
        background-repeat: no-repeat !important;
        background-size: 100% 100% !important;
        background-attachment: local !important;
      }

      .pink-punk-fullscreen > div > .sticky {
        background: transparent !important;
        border-bottom-color: rgba(255,255,255,.28) !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }

      .pink-punk-gallery.pink-punk-gallery--grouped {
        display: block !important;
        column-count: 1 !important;
        column-gap: 0 !important;
        padding-top: 1.5rem !important;
      }

      .pink-punk-section {
        border-top: 1px solid rgba(255,255,255,.32);
        padding-top: 1.25rem;
      }

      .pink-punk-section + .pink-punk-section {
        margin-top: clamp(4rem, 8vw, 7rem);
      }

      .pink-punk-section__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: .9rem;
      }

      .pink-punk-section__title {
        margin: 0;
        color: #fff;
        font-size: clamp(2.8rem, 7vw, 7rem);
        font-weight: 900;
        line-height: .82;
        letter-spacing: -.085em;
        text-transform: uppercase;
      }

      .pink-punk-section__note {
        max-width: 54rem;
        margin: 0 0 1.5rem;
        color: rgba(255,255,255,.7);
        font-size: clamp(1rem, 1.6vw, 1.35rem);
        font-weight: 700;
        line-height: 1.05;
        letter-spacing: -.035em;
      }

      .pink-punk-section__grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: start;
        gap: 1rem;
      }

      .pink-punk-section__grid .pink-punk-frame {
        display: block !important;
        width: 100% !important;
        margin: 0 !important;
        break-inside: auto !important;
        -webkit-column-break-inside: auto !important;
        page-break-inside: auto !important;
      }

      @media (max-width: 900px) {
        .pink-punk-section__grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (hover: none), (pointer: coarse), (max-width: 768px) {
        .pink-punk-section__grid {
          grid-template-columns: 1fr;
        }

        .pink-punk-frame,
        .pink-punk-frame:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .pink-punk-frame--hover .pink-punk-image--base,
        .pink-punk-frame--hover:hover .pink-punk-image--base,
        .pink-punk-lightbox-frame--hover .pink-punk-lightbox-image--base,
        .pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--base {
          opacity: 1 !important;
        }

        .pink-punk-frame--hover .pink-punk-image--worn,
        .pink-punk-frame--hover:hover .pink-punk-image--worn,
        .pink-punk-lightbox-frame--hover .pink-punk-lightbox-image--worn,
        .pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--worn {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      }
    `;
    document.head.append(style);
  }

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';

  function buildSection(key, cards) {
    const section = document.createElement('section');
    section.className = `pink-punk-section pink-punk-section--${key}`;
    section.dataset.section = key;

    const head = document.createElement('div');
    head.className = 'pink-punk-section__head';

    const title = document.createElement('h3');
    title.className = 'pink-punk-section__title';

    head.append(title);

    const note = document.createElement('p');
    note.className = 'pink-punk-section__note';

    const grid = document.createElement('div');
    grid.className = `pink-punk-section__grid pink-punk-section__grid--${key}`;
    cards.forEach((card) => grid.append(card));

    section.append(head, note, grid);
    return section;
  }

  function updateCopy(gallery) {
    const copy = COPY[language()];
    gallery.querySelectorAll('.pink-punk-section').forEach((section) => {
      const sectionCopy = copy[section.dataset.section];
      if (!sectionCopy) return;
      const title = section.querySelector('.pink-punk-section__title');
      const note = section.querySelector('.pink-punk-section__note');
      if (title) title.textContent = sectionCopy.title;
      if (note) note.textContent = sectionCopy.note;
    });
  }

  function enhance() {
    injectStyles();

    const gallery = document.querySelector('.pink-punk-gallery');
    if (!gallery) return false;

    const modal = gallery.closest('.fixed.inset-0');
    modal?.classList.add('pink-punk-fullscreen');

    if (gallery.dataset.pinkLayout !== VERSION) {
      const cards = Array.from(gallery.querySelectorAll('.pink-punk-frame'));
      if (cards.length < 7) return false;

      cards.forEach((card) => card.remove());
      gallery.replaceChildren(
        buildSection('tees', cards.slice(0, 3)),
        buildSection('posters', cards.slice(3, 6)),
        buildSection('prints', cards.slice(6)),
      );
      gallery.classList.add('pink-punk-gallery--grouped');
      gallery.dataset.pinkLayout = VERSION;
    }

    updateCopy(gallery);
    return true;
  }

  function retry(attempts = 24, delay = 120) {
    let count = 0;
    const run = () => {
      count += 1;
      if (enhance() || count >= attempts) return;
      window.setTimeout(run, delay);
    };
    window.setTimeout(run, 0);
  }

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article, #works button');
    const title = card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title === 'PINK PUNK') retry();

    if (event.target.closest('button[aria-label*="рус" i], button[aria-label*="english" i], button[aria-label*="switch" i]')) {
      window.setTimeout(enhance, 0);
      window.setTimeout(enhance, 120);
    }
  }, true);

  window.addEventListener('load', enhance);
})();