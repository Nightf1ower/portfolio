(() => {
  const VERSION = 'direct-2';
  const q = (path) => `${path}?v=${VERSION}`;

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      logo: {
        title: 'ЛОГОТИП',
        note: 'Разработка логотипа для независимого московского стритвир-бренда Blandetto.',
      },
      prints: {
        title: 'ПРИНТЫ',
        note: 'Серия принтов, основанная на ироничном переосмыслении узнаваемых брендов из разных индустрий. Этот подход сформировал основной визуальный язык Blandetto.',
      },
      dentist: {
        title: 'DENTIST MARKET',
        note: 'Ироничное переосмысление узнаваемой айдентики через стоматологическую тематику — один из ключевых примеров визуального подхода подбренда.',
      },
      cap: {
        title: 'КЕПКА',
        note: 'Разработка фирменной кепки и графики Blandetto.',
      },
      realisticRender: 'РЕАЛИСТИЧНЫЙ 3D-РЕНДЕР',
      finalProduct: 'ФИНАЛЬНЫЙ ПРОДУКТ',
      reference: 'ЗА ОСНОВУ ВЗЯТ ЭТОТ ЛОГОТИП',
    },
    en: {
      close: 'CLOSE',
      logo: {
        title: 'LOGO',
        note: 'Logo design for Blandetto, an independent Moscow-based streetwear brand.',
      },
      prints: {
        title: 'PRINTS',
        note: 'A series of prints based on ironic reinterpretations of recognizable brands across different industries. This approach shaped Blandetto’s core visual language.',
      },
      dentist: {
        title: 'DENTIST MARKET',
        note: 'An ironic reinterpretation of a recognizable brand identity through a dental-themed concept, reflecting Blandetto’s sub-brand signature visual approach.',
      },
      cap: {
        title: 'CAP',
        note: 'Design of Blandetto’s signature cap and accompanying graphics.',
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
      ['PRINT 01', '/works/blandetto/print/print-01.jpg', '/works/blandetto/print/print-01-tee.jpg', '/works/blandetto/print/print-01-hoodie.jpg'],
      ['PRINT 02', '/works/blandetto/print/print-02.jpg', '/works/blandetto/print/print-02-tee.jpg'],
      ['PRINT 03', '/works/blandetto/print/print-03.jpg'],
      ['PRINT 04', '/works/blandetto/print/print-04.jpg'],
      ['PRINT 05', '/works/blandetto/print/print-05.png', '/works/blandetto/print/print-05-sweatshirt.jpg'],
      ['PRINT 06', '/works/blandetto/print/print-06.jpg'],
      ['PRINT 07', '/works/blandetto/print/print-07.jpg'],
      ['PRINT 08', '/works/blandetto/print/print-08.jpg'],
      ['PRINT 09', '/works/blandetto/print/print-09.jpg', '/works/blandetto/print/print-09-hoodie.jpg'],
      ['PRINT 10', '/works/blandetto/print/print-10.jpg', '/works/blandetto/print/print-10-hoodie.jpg'],
    ],
    dentist: [
      ['DENTIST 01', '/works/blandetto/dentist/dentist-01.jpg'],
      ['DENTIST 02', '/works/blandetto/dentist/dentist-02.jpg', '/works/blandetto/dentist/dentist-02-hoodie.jpg'],
      ['DENTIST 03', '/works/blandetto/dentist/dentist-03.jpg', '/works/blandetto/dentist/dentist-03-tee.jpg'],
      ['DENTIST 04', '/works/blandetto/dentist/dentist-04.png', '/works/blandetto/dentist/dentist-04-tee.jpg'],
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
    if (document.getElementById('bf-style-v2')) return;

    const style = el('style');
    style.id = 'bf-style-v2';
    style.textContent = `
      html:has(.bf),body:has(.bf){overflow:hidden!important}
      .bf{position:fixed;inset:0;z-index:300;background:#fff;color:#050505;overflow:auto;padding:1.5rem 1rem 3rem}
      .bf-i{width:min(100%,80rem);margin:auto}
      .bf-h{position:relative;z-index:2;display:flex;justify-content:space-between;border-bottom:1px solid #050505;padding:.7rem 0 1rem;margin-bottom:2rem;background:transparent}
      .bf-l,.bf-x,.bf-p{font-size:.68rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase}
      .bf-l{background:#050505;color:#fff;padding:.35rem .75rem}
      .bf-x{background:#fff;border:1px solid #050505;padding:.55rem 1rem}
      .bf-s{border-top:1px solid rgba(5,5,5,.42);padding-top:1.25rem}
      .bf-s+.bf-s{margin-top:5rem}
      .bf-sh{margin-bottom:.85rem}
      .bf-t{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.085em;text-transform:uppercase}
      .bf-note{max-width:54rem;margin:0 0 1.5rem;color:rgba(5,5,5,.66);font-size:clamp(1rem,1.6vw,1.35rem);font-weight:700;line-height:1.05;letter-spacing:-.035em}
      .bf-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
      .bf-card{border:0;background:#fff;padding:0;width:100%;cursor:zoom-in}
      .bf-m{position:relative;aspect-ratio:1/1;background:#fff;overflow:hidden}
      .bf-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center}
      .bf-hov{opacity:0}
      .bf-card:hover .bf-main{opacity:0}
      .bf-card:hover .bf-hov{opacity:1}
      .bf-card:not(.has-hov):hover .bf-main{opacity:1}
      .bf-cap{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(17rem,.55fr);gap:1rem}
      .bf-capg{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
      .bf-cap img,.bf-ref img{display:block;width:100%;height:auto}
      .bf-p{color:rgba(5,5,5,.55)}
      .bf-ref{position:sticky;top:1rem}
      .bf-ref div{padding:1rem}
      .bf-dentist .bf-card:nth-child(1){grid-column:1;grid-row:1}
      .bf-dentist .bf-card:nth-child(3){grid-column:2;grid-row:1}
      .bf-dentist .bf-card:nth-child(2){grid-column:3;grid-row:1}
      .bf-dentist .bf-card:nth-child(5){grid-column:1;grid-row:2}
      .bf-dentist .bf-card:nth-child(4){grid-column:2;grid-row:2}
      .bf-dentist .bf-card:nth-child(6){grid-column:3;grid-row:2}
      .bf-light{position:fixed;inset:0;z-index:400;background:rgba(5,5,5,.92);display:flex;align-items:center;justify-content:center;padding:1rem}
      .bf-light img{max-width:92vw;max-height:90vh}
      .bf-close{position:absolute;right:1rem;top:1rem;background:#fff;border:0;padding:.7rem 1rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase}
      @media(max-width:900px){.bf-g{grid-template-columns:repeat(2,1fr)}.bf-dentist .bf-card{grid-column:auto!important;grid-row:auto!important}.bf-cap{grid-template-columns:1fr}.bf-ref{position:static}}
      @media(max-width:560px){.bf-g,.bf-capg{grid-template-columns:1fr}}
    `;
    document.head.append(style);
  }

  function updateLanguage() {
    if (!modal) return;
    const copy = COPY[currentLanguage()];

    const closeButton = modal.querySelector('.bf-x');
    if (closeButton) closeButton.textContent = copy.close;

    modal.querySelectorAll('.bf-s[data-bf-section]').forEach((section) => {
      const sectionCopy = copy[section.dataset.bfSection];
      if (!sectionCopy) return;
      const title = section.querySelector('.bf-t');
      const note = section.querySelector('.bf-note');
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

    if (item[2]) {
      button.classList.add('has-hov');
      const hoverImage = el('img', 'bf-img bf-hov');
      hoverImage.src = q(item[2]);
      hoverImage.alt = `${item[0]} alternative`;
      media.append(hoverImage);
    }

    button.append(media);
    button.onclick = (event) => {
      event.stopPropagation();
      lightbox(item.slice(1));
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
    inner.append(
      header,
      section('logo', data.logos),
      capSection(),
      section('prints', data.prints),
      section('dentist', data.dentist, 'bf-dentist'),
    );
    modal.append(inner);
    document.body.append(modal);
  }

  const languageObserver = new MutationObserver(updateLanguage);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

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