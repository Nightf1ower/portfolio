(() => {
  if (window.__pinkPunkLayoutV4) return;
  window.__pinkPunkLayoutV4 = true;

  const VERSION = 'pink-layout-4';
  const COPY = {
    ru: {
      aboutLabel: 'О БРЕНДЕ',
      about: 'PinkPunk — бренд уличной одежды, объединяющий моду, музыку и современную молодежную культуру. В основе бренда — свобода самовыражения, оверсайз-силуэты, экспериментальная графика и стремление превратить одежду в визуальное продолжение характера человека.\n\nБренд переосмысляет знакомые элементы стритвира, соединяя их с панк-эстетикой, яркими цветовыми решениями и собственным взглядом на современную уличную культуру.',
      tees: {
        title: 'ГРАФИКА ДЛЯ ФУТБОЛОК',
        note: 'Разработка серии принтов для футболок PinkPunk. Графика создавалась с учетом визуального языка бренда и сочетает выразительную типографику, ироничные образы и элементы панк-культуры.\n\nОсновной задачей было создать самостоятельные графические композиции, которые органично работают на одежде и сохраняют узнаваемый характер бренда.',
      },
      posters: {
        title: 'СЕРИЯ ПОСТЕРОВ',
        note: 'Серия постеров, вдохновленная винтажной печатной графикой, панк-эстетикой и техникой аналогового коллажа. В композициях использованы вырезанные изображения, рваные текстуры, контрастная типографика и намеренно необработанные графические элементы.\n\nПостеры продолжают визуальный язык коллекции и передают ощущение спонтанности, бунтарства и эстетики независимых музыкальных изданий и панк-зинов.',
      },
      prints: {
        title: 'ГРАФИКА КОЛЛЕКЦИИ',
        note: 'Разработка дополнительной серии принтов для коллекции PinkPunk. Основной акцент был сделан на ключевом цвете коллекции, который объединяет разные графические элементы в единую визуальную систему.\n\nЦвет используется не только как декоративный прием, но и как главный идентификатор коллекции, усиливающий контраст, эмоциональность и узнаваемость каждого принта.',
      },
    },
    en: {
      aboutLabel: 'ABOUT THE BRAND',
      about: 'PinkPunk is a streetwear brand that brings together fashion, music, and contemporary youth culture. Its identity is built around freedom of self-expression, oversized silhouettes, experimental graphics, and the idea of clothing as a visual extension of one’s personality.\n\nThe brand reinterprets familiar streetwear elements through punk-inspired aesthetics, bold color combinations, and its own perspective on modern urban culture.',
      tees: {
        title: 'GRAPHIC T-SHIRT DESIGN',
        note: 'A series of graphic prints developed for PinkPunk T-shirts. The designs follow the brand’s visual language, combining expressive typography, ironic imagery, and references to punk culture.\n\nThe main goal was to create distinctive compositions that work naturally on garments while maintaining the recognizable character of the brand.',
      },
      posters: {
        title: 'PUNK-INSPIRED POSTER SERIES',
        note: 'A poster series inspired by vintage printed graphics, punk aesthetics, and analogue collage techniques. The compositions combine cut-out imagery, torn textures, contrasting typography, and deliberately raw graphic elements.\n\nThe posters extend the visual language of the collection, capturing the spontaneity, rebellious attitude, and DIY character of independent music publications and punk zines.',
      },
      prints: {
        title: 'COLLECTION COLOR GRAPHICS',
        note: 'An additional series of prints developed for the PinkPunk collection. The graphics are united by the collection’s primary color, which acts as the central element of the overall visual system.\n\nRather than serving as a purely decorative feature, the color becomes the main identifier of the collection, strengthening the contrast, emotional impact, and recognition of each design.',
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

      .pink-punk-brand {
        padding: clamp(2.5rem, 6vw, 5rem) 0 clamp(5rem, 10vw, 9rem);
      }

      .pink-punk-brand__title {
        margin: 0;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(4.8rem, 15vw, 13rem);
        font-weight: 900;
        line-height: .72;
        letter-spacing: -.095em;
        text-transform: uppercase;
      }

      .pink-punk-brand__label {
        margin: clamp(2.4rem, 5vw, 4rem) 0 .9rem;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: .72rem;
        font-weight: 900;
        line-height: 1;
        letter-spacing: .26em;
        text-transform: uppercase;
      }

      .pink-punk-brand__copy,
      .pink-punk-section__note {
        max-width: 58rem;
        color: rgba(255,255,255,.76);
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(1rem, 1.45vw, 1.25rem);
        font-weight: 600;
        line-height: 1.48;
        letter-spacing: -.018em;
        white-space: pre-line;
      }

      .pink-punk-brand__copy {
        margin: 0;
      }

      .pink-punk-section {
        border-top: 1px solid rgba(255,255,255,.32);
        padding-top: 1.25rem;
      }

      .pink-punk-section + .pink-punk-section {
        margin-top: clamp(5rem, 10vw, 9rem);
      }

      .pink-punk-section__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: .9rem;
      }

      .pink-punk-section__title {
        width: 100%;
        margin: 0;
        color: #fff;
        font-size: clamp(2.8rem, 6vw, 6.5rem);
        font-weight: 900;
        line-height: .82;
        letter-spacing: -.085em;
        text-transform: uppercase;
        text-wrap: balance;
      }

      .pink-punk-section__note {
        margin: 0 0 2.2rem;
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
        .pink-punk-brand__title {
          font-size: clamp(4.4rem, 24vw, 8rem);
        }

        .pink-punk-section__title {
          font-size: clamp(2.35rem, 10.5vw, 4rem);
        }

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

  function buildBrand() {
    const brand = document.createElement('section');
    brand.className = 'pink-punk-brand';

    const title = document.createElement('h1');
    title.className = 'pink-punk-brand__title';
    title.textContent = 'PINKPUNK';

    const label = document.createElement('p');
    label.className = 'pink-punk-brand__label';

    const copy = document.createElement('p');
    copy.className = 'pink-punk-brand__copy';

    brand.append(title, label, copy);
    return brand;
  }

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
    const brandLabel = gallery.querySelector('.pink-punk-brand__label');
    const brandCopy = gallery.querySelector('.pink-punk-brand__copy');
    if (brandLabel) brandLabel.textContent = copy.aboutLabel;
    if (brandCopy) brandCopy.textContent = copy.about;

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
        buildBrand(),
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

  new MutationObserver(() => {
    const gallery = document.querySelector('.pink-punk-gallery');
    if (gallery) updateCopy(gallery);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.addEventListener('load', enhance);
})();