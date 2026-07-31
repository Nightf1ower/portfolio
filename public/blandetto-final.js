(() => {
  const VERSION = 'direct-3';
  const q = (path) => `${path}?v=${VERSION}`;

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      aboutLabel: 'О БРЕНДЕ',
      about: 'Blandetto — молодой московский бренд одежды, основанный в 2024 году. Проект развивается в направлении современного стритвира, сочетая лаконичные силуэты, экспериментальную графику и визуальные отсылки к уличной культуре.\n\nВ основе бренда — небольшие тиражи, самостоятельный визуальный язык и внимание к графическим деталям, которые становятся главным элементом каждой вещи.',
      minimalLogo: {
        title: 'МИНИМАЛИСТИЧНЫЕ ЛОГОТИПЫ',
        note: 'Создание минималистичных логотипов для разных коллекций бренда Blandetto.',
      },
      brandIdentity: {
        title: 'АЙДЕНТИКА И ДИЗАЙН ЛОГОТИПА',
        note: 'Разработка основного логотипа Blandetto и основы визуальной айдентики бренда. Задача заключалась в создании узнаваемого знака, который отражает характер бренда и последовательно работает на одежде, бирках, упаковке и в цифровых материалах.\n\nЛоготип стал отправной точкой для дальнейшей айдентики, объединив разные коллекции и графические направления в единую визуальную систему.',
      },
      prints: {
        title: 'ПРИНТЫ ДЛЯ BLANDETTO',
        note: 'Разработка серии принтов для основных изделий Blandetto. Графика создавалась как продолжение айдентики бренда и сочетает выразительную типографику, персонажей, символы и элементы современной уличной культуры.\n\nКаждый принт задуман как самостоятельная композиция, при этом все работы сохраняют единый визуальный характер и легко адаптируются под разные модели одежды и способы нанесения.',
      },
      cap: {
        title: 'РАЗРАБОТКА КЕПКИ',
        note: 'Разработка дизайна кепки как отдельного элемента коллекции. Работа включала создание графического решения, подбор расположения элементов и адаптацию дизайна под форму изделия и технологию вышивки.\n\nОсновной задачей было сохранить узнаваемость графики в небольшом формате и создать самостоятельный аксессуар, который продолжает визуальный язык бренда.',
      },
      dentist: {
        title: 'ПРИНТЫ ДЛЯ DENTIST MARKET',
        note: 'Разработка отдельной серии графики для Dentist Market. В основе принтов — переосмысление медицинской и стоматологической символики через ироничный визуальный язык современной уличной одежды.\n\nКонтраст между профессиональной тематикой и неформальной графической подачей позволил создать заметные изображения, которые сохраняют связь с названием проекта, но не выглядят как стандартный медицинский мерч.',
      },
      realisticRender: 'РЕАЛИСТИЧНЫЙ 3D-РЕНДЕР',
      finalProduct: 'ФИНАЛЬНЫЙ ПРОДУКТ',
      reference: 'ЗА ОСНОВУ ВЗЯТ ЭТОТ ЛОГОТИП',
    },
    en: {
      close: 'CLOSE',
      aboutLabel: 'ABOUT THE BRAND',
      about: 'Blandetto is an independent Moscow-based clothing brand established in 2024. The project explores contemporary streetwear through clean silhouettes, experimental graphics, and references to urban culture.\n\nThe brand focuses on limited releases, a distinctive visual language, and graphic details that become the central element of each garment.',
      minimalLogo: {
        title: 'MINIMAL LOGO DESIGN',
        note: 'Creation of minimalist logos for different Blandetto collections.',
      },
      brandIdentity: {
        title: 'BRAND IDENTITY & LOGO DESIGN',
        note: 'Development of the primary Blandetto logo and the foundation of the brand’s visual identity. The goal was to create a recognizable mark that reflects the brand’s character and works consistently across garments, labels, packaging, and digital media.\n\nThe logo became the starting point for the wider identity, connecting different collections and graphic directions within one coherent visual system.',
      },
      prints: {
        title: 'BLANDETTO GRAPHIC SERIES',
        note: 'A series of graphic prints developed for Blandetto’s core garments. The graphics extend the brand identity through expressive typography, characters, symbols, and references to contemporary street culture.\n\nEach print works as an independent composition while remaining part of a consistent visual system that can be adapted to different garments and production techniques.',
      },
      cap: {
        title: 'CUSTOM CAP DESIGN',
        note: 'Development of a custom cap as a standalone part of the collection. The work included creating the graphic concept, defining element placement, and adapting the design to the shape of the product and embroidery production.\n\nThe main goal was to preserve the recognition of the graphics within a compact format and create an independent accessory that extends the brand’s visual language.',
      },
      dentist: {
        title: 'DENTIST MARKET GRAPHICS',
        note: 'A separate series of graphics developed for Dentist Market. The prints reinterpret medical and dental imagery through the ironic visual language of contemporary streetwear.\n\nThe contrast between professional references and an informal graphic approach creates bold designs that connect with the project’s name without resembling conventional medical merchandise.',
      },
      realisticRender: 'REALISTIC 3D RENDER',
      finalProduct: 'FINAL PRODUCT',
      reference: 'BASED ON THIS LOGO',
    },
  };

  const data = {
    logos: [
      ['LOGO 01', '/works/blandetto/logo/logo-01.jpg', '/works/blandetto/logo/logo-01-inv.jpg'],
      ['LOGO 02', '/works/blandetto/logo/logo-02.png', '/works/blandetto/logo/logo-02-inv.png', '/works/blandetto/logo/logo-02-sweatshirt.jpg', '/works/blandetto/logo/logo-02-pants.jpg'],
      ['LOGO 03', '/works/blandetto/logo/logo-03.jpg', '/works/blandetto/logo/logo-03-inv.jpg'],
    ],
    cap: [
      '/works/blandetto/cap/cap-01.png',
      '/works/blandetto/cap/cap-02.png',
      '/works/blandetto/cap/cap-03.png',
      '/works/blandetto/cap/cap-04.png',
    ],
    prints: [
      ['PRINT 01', '/works/blandetto/print/print-01.jpg'],
      ['PRINT 02', '/works/blandetto/print/print-02.jpg'],
      ['PRINT 03', '/works/blandetto/print/print-03.jpg'],
      ['PRINT 04', '/works/blandetto/print/print-04.jpg'],
      ['PRINT 05', '/works/blandetto/print/print-05.png'],
      ['PRINT 06', '/works/blandetto/print/print-06.jpg'],
      ['PRINT 07', '/works/blandetto/print/print-07.jpg'],
      ['PRINT 08', '/works/blandetto/print/print-08.jpg'],
      ['PRINT 09', '/works/blandetto/print/print-09.jpg'],
      ['PRINT 10', '/works/blandetto/print/print-10.jpg'],
    ],
    dentist: [
      ['DENTIST 01', '/works/blandetto/dentist/dentist-01.jpg'],
      ['DENTIST 02', '/works/blandetto/dentist/dentist-02.jpg'],
      ['DENTIST 03', '/works/blandetto/dentist/dentist-03.jpg'],
      ['DENTIST 04', '/works/blandetto/dentist/dentist-04.png'],
      ['DENTIST 05', '/works/blandetto/dentist/dentist-05.png'],
      ['DENTIST 06', '/works/blandetto/dentist/dentist-06.png'],
    ],
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  const currentLanguage = () => {
    const htmlLanguage = document.documentElement.lang;
    if (htmlLanguage === 'ru' || htmlLanguage === 'en') return htmlLanguage;
    return localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  };

  let modal = null;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  function lockPageScroll() {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPageScroll() {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function closeModal() {
    modal?.remove();
    modal = null;
    unlockPageScroll();
  }

  function injectStyles() {
    document.getElementById('bf-style')?.remove();
    document.getElementById('bf-style-v2')?.remove();
    if (document.getElementById('bf-style-v3')) return;

    const style = el('style');
    style.id = 'bf-style-v3';
    style.textContent = `
      html:has(.bf),body:has(.bf){overflow:hidden!important}
      .bf{position:fixed;inset:0;z-index:300;background:#fff;color:#050505;overflow:auto;padding:1.5rem 1rem 4rem}
      .bf-i{width:min(100%,80rem);margin:auto}
      .bf-h{position:sticky;top:0;z-index:20;display:flex;justify-content:space-between;border-bottom:1px solid #050505;padding:.7rem 0 1rem;background:rgba(255,255,255,.94);backdrop-filter:blur(10px)}
      .bf-l,.bf-x,.bf-p{font-size:.68rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase}
      .bf-l{background:#050505;color:#fff;padding:.35rem .75rem}
      .bf-x{background:#fff;border:1px solid #050505;padding:.55rem 1rem}
      .bf-brand{padding:clamp(3rem,7vw,6rem) 0 clamp(5rem,10vw,9rem)}
      .bf-brand-title{margin:0;font-size:clamp(4.8rem,15vw,13rem);font-weight:900;line-height:.72;letter-spacing:-.095em;text-transform:uppercase}
      .bf-brand-label{margin:clamp(2.4rem,5vw,4rem) 0 .9rem;font-size:.72rem;font-weight:900;letter-spacing:.26em;text-transform:uppercase}
      .bf-brand-copy,.bf-note{max-width:58rem;color:rgba(5,5,5,.72);font-size:clamp(1rem,1.45vw,1.25rem);font-weight:600;line-height:1.48;letter-spacing:-.018em;white-space:pre-line}
      .bf-brand-copy{margin:0}
      .bf-s{border-top:1px solid rgba(5,5,5,.42);padding-top:1.25rem}
      .bf-s+.bf-s{margin-top:clamp(5rem,9vw,8rem)}
      .bf-sh{margin-bottom:.85rem}
      .bf-t{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.085em;text-transform:uppercase;text-wrap:balance}
      .bf-note{margin:1.2rem 0 2rem}
      .bf-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
      .bf-card{border:0;background:#fff;padding:0;width:100%;cursor:zoom-in}
      .bf-m{position:relative;aspect-ratio:1/1;background:#fff;overflow:hidden}
      .bf-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center}
      .bf-cap{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(17rem,.55fr);gap:1rem}
      .bf-capg{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
      .bf-cap img,.bf-ref img{display:block;width:100%;height:auto}
      .bf-p{color:rgba(5,5,5,.55)}
      .bf-ref{position:sticky;top:5rem}
      .bf-ref div{padding:1rem}
      .bf-dentist .bf-card:nth-child(1){grid-column:1;grid-row:1}
      .bf-dentist .bf-card:nth-child(3){grid-column:2;grid-row:1}
      .bf-dentist .bf-card:nth-child(2){grid-column:3;grid-row:1}
      .bf-dentist .bf-card:nth-child(5){grid-column:1;grid-row:2}
      .bf-dentist .bf-card:nth-child(4){grid-column:2;grid-row:2}
      .bf-dentist .bf-card:nth-child(6){grid-column:3;grid-row:2}
      .bf-light{position:fixed;inset:0;z-index:400;background:rgba(5,5,5,.94);display:flex;align-items:center;justify-content:center;padding:1rem}
      .bf-light img{max-width:92vw;max-height:90vh;object-fit:contain}
      .bf-close{position:absolute;right:1rem;top:1rem;background:#fff;border:0;padding:.7rem 1rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase}
      @media(max-width:900px){.bf-g{grid-template-columns:repeat(2,1fr)}.bf-dentist .bf-card{grid-column:auto!important;grid-row:auto!important}.bf-cap{grid-template-columns:1fr}.bf-ref{position:static}}
      @media(max-width:560px){.bf-g,.bf-capg{grid-template-columns:1fr}.bf-brand-title{font-size:clamp(4.4rem,25vw,7rem)}.bf-t{font-size:clamp(2.35rem,11vw,4rem)}}
    `;
    document.head.append(style);
  }

  function updateLanguage() {
    if (!modal) return;
    const copy = COPY[currentLanguage()];
    const closeButton = modal.querySelector('.bf-x');
    if (closeButton) closeButton.textContent = copy.close;

    const brandLabel = modal.querySelector('.bf-brand-label');
    const brandCopy = modal.querySelector('.bf-brand-copy');
    if (brandLabel) brandLabel.textContent = copy.aboutLabel;
    if (brandCopy) brandCopy.textContent = copy.about;

    modal.querySelectorAll('.bf-s[data-bf-section]').forEach((sectionNode) => {
      const sectionCopy = copy[sectionNode.dataset.bfSection];
      if (!sectionCopy) return;
      const title = sectionNode.querySelector('.bf-t');
      const note = sectionNode.querySelector('.bf-note');
      if (title) title.textContent = sectionCopy.title;
      if (note) note.textContent = sectionCopy.note;
    });

    modal.querySelectorAll('[data-bf-cap-caption]').forEach((caption) => {
      caption.textContent = caption.dataset.bfCapCaption === 'final' ? copy.finalProduct : copy.realisticRender;
    });

    const reference = modal.querySelector('[data-bf-reference]');
    if (reference) reference.textContent = copy.reference;
  }

  function lightbox(paths, index = 0) {
    let currentIndex = index;
    const overlay = el('div', 'bf-light');
    const img = el('img');
    const closeButton = el('button', 'bf-close', COPY[currentLanguage()].close);
    const render = () => { img.src = q(paths[currentIndex]); };
    closeButton.onclick = () => overlay.remove();
    overlay.onclick = () => overlay.remove();
    img.onclick = (event) => {
      event.stopPropagation();
      currentIndex = (currentIndex + 1) % paths.length;
      render();
    };
    overlay.append(closeButton, img);
    document.body.append(overlay);
    render();
  }

  function card(item) {
    const button = el('button', 'bf-card');
    const media = el('div', 'bf-m');
    const mainImage = el('img', 'bf-img bf-main');
    button.type = 'button';
    mainImage.src = q(item[1]);
    mainImage.alt = item[0];
    media.append(mainImage);
    button.append(media);
    button.onclick = (event) => {
      event.stopPropagation();
      lightbox([item[1]], 0);
    };
    return button;
  }

  function section(sectionKey, items, className = '') {
    const copy = COPY[currentLanguage()][sectionKey];
    const sectionNode = el('section', 'bf-s');
    sectionNode.dataset.bfSection = sectionKey;
    const heading = el('div', 'bf-sh');
    heading.append(el('h3', 'bf-t', copy.title));
    const note = el('p', 'bf-note', copy.note);
    const grid = el('div', `bf-g ${className}`.trim());
    items.forEach((item) => grid.append(card(item)));
    sectionNode.append(heading, note, grid);
    return sectionNode;
  }

  function capSection() {
    const copy = COPY[currentLanguage()];
    const sectionNode = el('section', 'bf-s');
    sectionNode.dataset.bfSection = 'cap';
    const heading = el('div', 'bf-sh');
    heading.append(el('h3', 'bf-t', copy.cap.title));
    const note = el('p', 'bf-note', copy.cap.note);
    const wrapper = el('div', 'bf-cap');
    const grid = el('div', 'bf-capg');

    data.cap.forEach((path, index) => {
      const button = el('button', 'bf-card');
      const image = el('img');
      const captionType = index === data.cap.length - 1 ? 'final' : 'render';
      const caption = el('p', 'bf-p', captionType === 'final' ? copy.finalProduct : copy.realisticRender);
      caption.dataset.bfCapCaption = captionType;
      image.src = q(path);
      image.alt = `Blandetto cap ${index + 1}`;
      button.append(image, caption);
      button.onclick = (event) => {
        event.stopPropagation();
        lightbox(data.cap, index);
      };
      grid.append(button);
    });

    const reference = el('aside', 'bf-ref');
    const referenceImageWrapper = el('div');
    const referenceImage = el('img');
    const referenceCaption = el('p', 'bf-p', copy.reference);
    referenceCaption.dataset.bfReference = 'true';
    referenceImage.src = q(data.logos[0][1]);
    referenceImage.alt = 'Blandetto source logo';
    referenceImageWrapper.append(referenceImage);
    reference.append(referenceImageWrapper, referenceCaption);
    wrapper.append(grid, reference);
    sectionNode.append(heading, note, wrapper);
    return sectionNode;
  }

  function open() {
    injectStyles();
    closeModal();
    lockPageScroll();
    const copy = COPY[currentLanguage()];
    modal = el('div', 'bf');
    const inner = el('div', 'bf-i');
    const header = el('div', 'bf-h');
    const closeButton = el('button', 'bf-x', copy.close);
    closeButton.onclick = closeModal;
    header.append(el('p', 'bf-l', 'BLANDETTO'), closeButton);

    const brand = el('section', 'bf-brand');
    const brandTitle = el('h1', 'bf-brand-title', 'BLANDETTO');
    const brandLabel = el('p', 'bf-brand-label', copy.aboutLabel);
    const brandCopy = el('p', 'bf-brand-copy', copy.about);
    brand.append(brandTitle, brandLabel, brandCopy);

    inner.append(
      header,
      brand,
      section('minimalLogo', data.logos.slice(1)),
      section('brandIdentity', [data.logos[0]]),
      section('prints', data.prints),
      capSection(),
      section('dentist', data.dentist, 'bf-dentist'),
    );
    modal.append(inner);
    document.body.append(modal);
  }

  new MutationObserver(updateLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal) closeModal();
  });

  document.addEventListener('click', (event) => {
    const cardNode = event.target.closest('#works article,#works button');
    if (!cardNode) return;
    if (cardNode.querySelector('h3')?.textContent?.trim().toUpperCase() !== 'BLANDETTO') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);
})();