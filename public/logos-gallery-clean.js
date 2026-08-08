(() => {
  if (window.__logosGalleryCleanV2) return;
  window.__logosGalleryCleanV2 = true;

  const VERSION = 'logos-gallery-clean-2';
  const manifest = window.PORTFOLIO_GALLERY_MANIFEST || {};
  const SOURCE = Array.isArray(manifest.logos) ? manifest.logos : [];

  const normalize = value => String(value || '')
    .trim()
    .toUpperCase()
    .replace(/Ё/g, 'Е')
    .replace(/[^A-ZА-Я0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru'
      ? 'ru'
      : 'en'
  );

  const COPY = {
    ru: {
      label: 'ЛОГОТИПЫ',
      close: 'ЗАКРЫТЬ',
      open: 'ОТКРЫТЬ ЛОГОТИП',
      sections: [
        { title: 'РАЗРАБОТКА СИСТЕМЫ ЛОГОТИПОВ', image: 'cpm-main-logo', text: 'Основой проекта стал уже существующий логотип ЦПМ — объёмная геометрическая композиция, построенная на сочетании синих, зелёных и оранжевых плоскостей. Моей задачей было изучить его визуальную логику и создать на её основе отдельные логотипы для разных подразделений и сервисов компании.\n\nЯ выделил главные элементы исходной айдентики: изометрическую перспективу, крупные геометрические формы, диагональные срезы, яркую фирменную палитру и соединение нескольких модулей в единую конструкцию. Далее для каждого направления был выбран самостоятельный образ, отражающий его назначение. Этот образ перерабатывался в стилистике основного логотипа, благодаря чему все знаки получили собственную идею, но сохранили визуальную связь с брендом ЦПМ.' },
        { title: 'ТРАНСПОРТНОЕ НАПРАВЛЕНИЕ', image: 'cpm-logo-1', text: 'Для транспортного направления основным образом стал грузовой автомобиль — понятный символ перевозок, движения и логистики. Его конструкция была собрана из крупных геометрических объёмов, повторяющих модульный принцип основного логотипа.\n\nКабина выполнена в синем цвете, зелёная плоскость формирует боковую часть кузова, а оранжевые и жёлтые элементы создают яркие акценты и подчёркивают объём. На верхней поверхности кузова сохранены характерные формы и диагональные элементы исходного знака. Благодаря этому автомобиль воспринимается не как отдельная иллюстрация, а как новая конструкция, собранная из элементов фирменной айдентики ЦПМ.' },
        { title: 'ОБРАЗОВАТЕЛЬНОЕ НАПРАВЛЕНИЕ', image: 'cpm-logo-2', text: 'Для образовательного направления был выбран образ раскрытой книги — универсальный символ знаний, обучения и развития. Книга построена из двух крупных цветовых плоскостей: синяя часть отвечает за одну сторону обложки, а оранжевая — за другую. Центральный элемент одновременно формирует корешок книги и объединяет композицию.\n\nДиагональные грани на обложке продолжают геометрию основного логотипа, а белые страницы делают знак легче и визуально отделяют его от массивной основы. Зелёные элементы над книгой символизируют новые знания, идеи и процесс интеллектуального развития. Их форма и цвет поддерживают фирменную систему и связывают логотип с остальными направлениями компании.' },
        { title: 'СИСТЕМА MEMOS', image: 'cpm-logo-3', text: 'Логотип MEMOS был разработан вокруг образа документа и ручки, отражающего работу с текстами, записями и внутренними материалами. Основой композиции стала крупная синяя рамка, внутри которой размещён лист с условными строками текста.\n\nОранжевые линии продолжают цветовую палитру основного логотипа и создают простой, легко считываемый образ документа. Зелёная ручка выступает главным смысловым элементом и собирается из нескольких лаконичных геометрических форм. Сам знак выполнен с небольшим перспективным искажением, благодаря чему сохраняет объём и связь с изометрическим характером исходной айдентики.' },
        { title: 'AUDITORIUM — СИСТЕМА БРОНИРОВАНИЯ', image: 'cpm-logo-4', text: 'Для системы бронирования Auditorium был разработан компактный знак, основанный на идее пространства, разделённого на отдельные помещения или ячейки расписания. Квадратный модуль поделён на четыре секции, каждая из которых содержит отдельный символ.\n\nВнутри конструкции размещены буквы «ЦПМ» и знак геолокации, обозначающий выбор конкретной аудитории или помещения. Синяя рамка объединяет элементы, зелёный и оранжевый цвета выделяют отдельные функциональные части. Логотип получился более плоским и лаконичным, чем основные объёмные знаки, но сохранил общую геометрию, модульность и фирменную палитру бренда.' },
        { title: 'ОПИС.ЦЕНТР', image: 'cpm-logo-5', text: 'Логотип ОПИС.ЦЕНТР был построен вокруг идеи образовательного и информационного пространства, объединяющего несколько направлений. Основой знака стала объёмная буквенная композиция, встроенная в форму куба.\n\nБуквы образуют боковые грани конструкции, благодаря чему название становится частью самого символа. Синяя верхняя плоскость превращена в академическую шапочку и подчёркивает образовательную направленность центра. Зелёные поверхности формируют основной объём, а небольшой оранжевый элемент добавляет фирменный цветовой акцент. Таким образом, логотип одновременно воспринимается как аббревиатура, объёмный объект и символ образовательной среды.' },
        { title: 'РЕЗУЛЬТАТ', text: 'В результате была создана единая система логотипов, в которой каждый знак отражает функцию конкретного подразделения через собственный понятный образ: автомобиль, книгу, документ, систему помещений или образовательный центр.\n\nВсе логотипы построены по общим правилам: фирменная палитра, геометрические модули, диагональные плоскости, объём и конструктивный подход к форме. Основной логотип ЦПМ стал визуальным конструктором, который удалось адаптировать под разные задачи, сохранив целостность, узнаваемость и возможность дальнейшего развития айдентики.' },
      ],
    },
    en: {
      label: 'LOGOS',
      close: 'CLOSE',
      open: 'OPEN LOGO',
      sections: [
        { title: 'LOGO SYSTEM DEVELOPMENT', image: 'cpm-main-logo', text: 'The project was based on the existing CPM logo — a three-dimensional geometric composition built from blue, green, and orange planes. My task was to study its visual logic and use it as the foundation for a series of logos representing different company departments and services.\n\nI identified the key elements of the original identity: isometric perspective, bold geometric forms, diagonal cuts, a vibrant corporate color palette, and the combination of multiple modules into a single structure. A distinct visual symbol was then selected for each department based on its purpose. Every symbol was redesigned using the visual principles of the main logo, allowing each mark to communicate its own idea while remaining clearly connected to the CPM brand.' },
        { title: 'TRANSPORTATION DEPARTMENT', image: 'cpm-logo-1', text: 'A delivery truck was chosen as the central image for the transportation department — a clear symbol of logistics, movement, and delivery. Its structure was assembled from large geometric volumes that follow the modular construction of the original logo.\n\nThe blue cab acts as the main structural element, the green plane forms the side of the cargo section, while orange and yellow details create visual accents and emphasize depth. The top surface of the truck retains the distinctive shapes and diagonal elements of the original mark. As a result, the vehicle does not appear as a separate illustration but as a new object constructed from the visual elements of the CPM identity.' },
        { title: 'EDUCATIONAL DEPARTMENT', image: 'cpm-logo-2', text: 'An open book was selected for the educational department as a universal symbol of knowledge, learning, and development. The book is constructed from two large color planes: blue forms one side of the cover, while orange forms the other. The central element acts as the book spine and visually connects the composition.\n\nThe diagonal surfaces of the cover continue the geometry of the main logo, while the white pages make the mark feel lighter and separate them from the bold base. The green elements above the book represent new knowledge, ideas, and intellectual growth. Their shape and color support the corporate visual system and connect the logo to the other company departments.' },
        { title: 'MEMOS SYSTEM', image: 'cpm-logo-3', text: 'The MEMOS logo was developed around the image of a document and a pen, representing work with texts, notes, and internal materials. The composition is based on a bold blue frame containing a sheet with simplified lines of text.\n\nThe orange lines continue the color palette of the main logo and create a clear, instantly recognizable document symbol. The green pen acts as the central conceptual element and is assembled from several simple geometric shapes. A slight perspective distortion adds depth to the mark and maintains its connection to the isometric character of the original identity.' },
        { title: 'AUDITORIUM — BOOKING SYSTEM', image: 'cpm-logo-4', text: 'The Auditorium booking system required a compact logo based on the idea of a space divided into separate rooms or scheduling cells. The square symbol is divided into four sections, each containing an individual graphic element.\n\nThe structure combines the CPM initials with a location pin, representing the selection of a particular classroom or space. A blue frame unifies the elements, while green and orange highlight different functional areas. The result is flatter and more minimal than the main three-dimensional symbols, yet it retains the geometry, modularity, and corporate color palette of the overall brand identity.' },
        { title: 'OPIS.CENTER', image: 'cpm-logo-5', text: 'The OPIS.CENTER logo was built around the idea of an educational and informational space that brings several areas together. The basis of the mark is a three-dimensional letter composition integrated into the shape of a cube.\n\nThe letters form the side surfaces of the structure, turning the name itself into part of the symbol. The blue top plane becomes a graduation cap, emphasizing the center’s educational purpose. Green surfaces form the main volume, while a small orange element introduces a recognizable corporate accent. The logo can therefore be perceived simultaneously as an abbreviation, a three-dimensional object, and a symbol of an educational environment.' },
        { title: 'RESULT', text: 'The result is a unified logo system in which each mark communicates the purpose of a specific department through a clear visual image: a truck, a book, a document, a room-booking system, or an educational center.\n\nAll logos follow the same principles: the corporate color palette, geometric modules, diagonal planes, dimensionality, and a structural approach to form. The main CPM logo became a visual construction system that could be adapted to different functions while preserving consistency, recognition, and the potential for further development of the identity.' },
      ],
    },
  };

  const baseName = item => String(item?.name || item?.src || '')
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .toLowerCase();

  const findImage = name => SOURCE.find(item => baseName(item) === name.toLowerCase()) || null;
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  let modal = null;
  let lightbox = null;
  let oldBodyOverflow = '';
  let oldHtmlOverflow = '';

  function installStyles() {
    const id = 'logos-gallery-clean-style';
    const existing = document.getElementById(id);
    if (existing?.dataset.version === VERSION) return;
    existing?.remove();
    const style = el('style');
    style.id = id;
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.lcg-modal), body:has(.lcg-modal) { overflow:hidden !important; }
      .lcg-modal { position:fixed; inset:0; z-index:955000; width:100vw; height:100dvh; overflow-y:auto; overflow-x:hidden; background:#fff; color:#050505; }
      .lcg-head { position:sticky; top:0; z-index:30; box-sizing:border-box; display:flex; align-items:center; justify-content:space-between; gap:1rem; width:100%; padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) 1rem max(1rem,env(safe-area-inset-left)); background:rgba(255,255,255,.95); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
      .lcg-label,.lcg-close { margin:0; border:0; padding:.72rem 1rem; background:#050505; color:#fff; font:900 .68rem/1 Arial,Helvetica,sans-serif; letter-spacing:.24em; text-transform:uppercase; }
      .lcg-close { cursor:pointer; }
      .lcg-inner { width:100%; }
      .lcg-row { box-sizing:border-box; display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:clamp(2rem,6vw,7rem); align-items:center; min-height:70vh; padding:clamp(4rem,8vw,9rem) max(1rem,env(safe-area-inset-right)) clamp(4rem,8vw,9rem) max(1rem,env(safe-area-inset-left)); border-bottom:1px solid rgba(5,5,5,.14); content-visibility:auto; contain-intrinsic-size:900px 720px; }
      .lcg-copy { min-width:0; }
      .lcg-title { margin:0 0 clamp(1.4rem,2.5vw,2.4rem); font:900 clamp(2.2rem,5vw,5.6rem)/.88 Arial,Helvetica,sans-serif; letter-spacing:-.06em; text-transform:uppercase; }
      .lcg-text { margin:0; white-space:pre-line; font:500 clamp(1rem,1.22vw,1.25rem)/1.45 Arial,Helvetica,sans-serif; letter-spacing:-.015em; }
      .lcg-media { min-width:0; display:flex; align-items:center; justify-content:center; }
      .lcg-logo-button { display:flex; align-items:center; justify-content:center; width:100%; min-height:32rem; margin:0; padding:clamp(1.5rem,4vw,4rem); border:0; background:#fff; cursor:zoom-in; }
      .lcg-logo { display:block; width:100%; max-width:46rem; max-height:68vh; height:auto; object-fit:contain; }
      .lcg-result { display:block; min-height:0; padding-top:clamp(5rem,9vw,10rem); padding-bottom:clamp(6rem,10vw,12rem); }
      .lcg-result .lcg-copy { max-width:75rem; }
      .lcg-light { position:fixed; inset:0; z-index:995000; display:flex; align-items:center; justify-content:center; padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left)); background:rgba(0,0,0,.96); }
      .lcg-light img { display:block; max-width:92vw; max-height:90dvh; width:auto; height:auto; object-fit:contain; }
      .lcg-light-close { position:absolute; top:max(1rem,env(safe-area-inset-top)); right:max(1rem,env(safe-area-inset-right)); border:1px solid #fff; background:#050505; color:#fff; padding:.75rem 1rem; font:900 .68rem/1 Arial,Helvetica,sans-serif; letter-spacing:.2em; cursor:pointer; }
      @media(max-width:820px){
        .lcg-row { grid-template-columns:1fr; gap:2.2rem; min-height:0; padding-top:4rem; padding-bottom:4rem; }
        .lcg-title { font-size:clamp(2.4rem,11vw,4.8rem); }
        .lcg-logo-button { min-height:0; padding:1rem 0 0; }
        .lcg-logo { max-height:none; }
        .lcg-result { padding-bottom:7rem; }
      }
    `;
    document.head.append(style);
  }

  function lockPage() {
    oldBodyOverflow = document.body.style.overflow;
    oldHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPage() {
    document.body.style.overflow = oldBodyOverflow;
    document.documentElement.style.overflow = oldHtmlOverflow;
  }

  function closeLightbox() {
    lightbox?.remove();
    lightbox = null;
  }

  function openLightbox(item) {
    if (!item) return;
    closeLightbox();
    const copy = COPY[language()];
    const overlay = el('div', 'lcg-light');
    const image = el('img');
    const close = el('button', 'lcg-light-close', copy.close);
    image.src = item.src;
    image.alt = item.name || 'CPM logo';
    image.decoding = 'async';
    close.type = 'button';
    close.onclick = event => { event.stopPropagation(); closeLightbox(); };
    overlay.onclick = closeLightbox;
    image.onclick = event => event.stopPropagation();
    overlay.append(image, close);
    document.body.append(overlay);
    lightbox = overlay;
  }

  function closeModal() {
    closeLightbox();
    modal?.remove();
    modal = null;
    unlockPage();
  }

  function createRow(section, index) {
    const row = el('section', `lcg-row${section.image ? '' : ' lcg-result'}`);
    const copyWrap = el('div', 'lcg-copy');
    copyWrap.append(el('h2', 'lcg-title', section.title));
    copyWrap.append(el('p', 'lcg-text', section.text));
    row.append(copyWrap);

    if (section.image) {
      const item = findImage(section.image);
      const media = el('div', 'lcg-media');
      if (item) {
        const button = el('button', 'lcg-logo-button');
        const image = el('img', 'lcg-logo');
        button.type = 'button';
        button.setAttribute('aria-label', COPY[language()].open);
        image.src = item.thumb || item.src;
        image.alt = item.name || section.title;
        image.decoding = 'async';
        image.loading = index === 0 ? 'eager' : 'lazy';
        try { image.fetchPriority = index === 0 ? 'high' : 'low'; } catch {}
        button.addEventListener('pointerenter', () => {
          const preload = new Image();
          preload.decoding = 'async';
          preload.src = item.src;
        }, { once:true, passive:true });
        button.onclick = event => {
          event.preventDefault();
          event.stopPropagation();
          openLightbox(item);
        };
        button.append(image);
        media.append(button);
      }
      row.append(media);
    }

    return row;
  }

  function openModal() {
    installStyles();
    closeModal();
    lockPage();
    const copy = COPY[language()];
    const overlay = el('div', 'lcg-modal');
    const head = el('div', 'lcg-head');
    const label = el('p', 'lcg-label', copy.label);
    const close = el('button', 'lcg-close', copy.close);
    const inner = el('main', 'lcg-inner');
    close.type = 'button';
    close.onclick = event => { event.stopPropagation(); closeModal(); };
    head.append(label, close);
    copy.sections.forEach((section, index) => inner.append(createRow(section, index)));
    overlay.append(head, inner);
    document.body.append(overlay);
    modal = overlay;
  }

  function findLogosCard(target) {
    const card = target?.closest?.('#works article, #works button');
    if (!card) return null;
    const title = normalize(card.querySelector('h3')?.textContent);
    return title === 'LOGOS' || title === 'ЛОГОТИПЫ' ? card : null;
  }

  window.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!findLogosCard(target)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openModal();
  }, true);

  window.addEventListener('keydown', event => {
    if (lightbox && event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeLightbox();
      return;
    }
    if (modal && event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeModal();
    }
  }, true);
})();