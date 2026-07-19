(() => {
  if (window.__stayUglyV5Loaded) return;
  window.__stayUglyV5Loaded = true;

  const V = 'stayugly-14';
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const FOLDERS = { concept: 'concept', final: 'final', photoshoot: 'photo', packaging: 'package' };
  const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      loading: 'ЗАГРУЗКА МАТЕРИАЛОВ STAYUGLY...',
      empty: 'ФАЙЛЫ ДЛЯ ЭТОГО БЛОКА ПОКА НЕ НАЙДЕНЫ',
      kicker: 'ЛИЧНЫЙ ПРОДУКТ / КОЛЛАБОРАЦИЯ',
      lead: 'Личная разработанная мною вещь в коллаборации с коллегой STAYUGLY. Разработка с нуля: собственные лекала, принт, дизайн, подбор подрядчиков и полный путь от идеи до готового продукта.',
      concept: {
        title: 'КОНЦЕПЦИЯ',
        note: 'Совместный экспериментальный проект, построенный вокруг нестандартного силуэта, необработанных краёв и ручной доработки каждой вещи.',
      },
      final: {
        title: 'ФИНАЛЬНЫЙ РЕЗУЛЬТАТ',
        note: '',
      },
      photoshoot: {
        title: 'ФОТОСЪЁМКА',
        note: 'Полная организация съёмки: разработка визуальной концепции, подбор образов, съёмка, отбор кадров, цветокоррекция и ретушь. Итоговая подача подчёркивает свободный силуэт, необработанную фактуру и характер изделия.',
      },
      packaging: {
        title: 'УПАКОВКА',
        note: 'Чтобы усилить суровый и нарочито грубый характер проекта, каждый зип-пак вручную расписывался маркером. Благодаря этому упаковка стала не просто функциональной частью, а отдельным элементом визуального языка Stay Ugly.',
      },
      specs: [
        'Футер 2-х нитка 245 гр/м²',
        'Вручную обрезаны',
        'BIG SQUARE футболка 80×60',
        'Каждая вещь уникальна',
      ],
      conceptCaptions: [
        'ПЕРВОНАЧАЛЬНЫЙ КОНЦЕПТ',
        'ВТОРАЯ ВЕРСИЯ · РАСПОЛОЖИЛИ НАДПИСЬ',
        'ФИНАЛЬНЫЙ РЕЗУЛЬТАТ',
      ],
    },
    en: {
      close: 'CLOSE',
      loading: 'LOADING STAYUGLY ASSETS...',
      empty: 'FILES FOR THIS SECTION HAVE NOT BEEN ADDED YET',
      kicker: 'PERSONAL PRODUCT / COLLABORATION',
      lead: 'A personal garment developed in collaboration with STAYUGLY. Built from scratch: custom patterns, print, design, contractor sourcing and the full process from idea to finished product.',
      concept: {
        title: 'CONCEPT',
        note: 'A collaborative experimental project built around an unconventional silhouette, raw edges and hand-finished details.',
      },
      final: {
        title: 'FINAL RESULT',
        note: '',
      },
      photoshoot: {
        title: 'PHOTO SHOOT',
        note: 'Full photoshoot production, including visual direction, styling, shooting, image selection, color correction and retouching. The final imagery highlights the oversized silhouette, raw texture and character of the garment.',
      },
      packaging: {
        title: 'PACKAGING',
        note: 'To reinforce the project’s raw and uncompromising character, every zip bag was hand-drawn with a marker. This turned the packaging from a functional detail into a distinct part of Stay Ugly’s visual language.',
      },
      specs: [
        '245 GSM two-thread cotton fabric',
        'Hand-cut raw edges',
        'BIG SQUARE T-shirt 80×60',
        'Every garment is unique',
      ],
      conceptCaptions: [
        'INITIAL CONCEPT',
        'SECOND VERSION · REPOSITIONED THE TEXT',
        'FINAL RESULT',
      ],
    },
  };

  let modal = null;
  let scrollLocked = false;
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const currentLanguage = () => {
    const htmlLanguage = document.documentElement.lang;
    if (htmlLanguage === 'ru' || htmlLanguage === 'en') return htmlLanguage;
    return localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  };
  const q = (path) => `${path}?v=${V}`;
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  function lockPageScroll() {
    if (scrollLocked) return;
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    scrollLocked = true;
  }

  function unlockPageScroll() {
    if (!scrollLocked) return;
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
    scrollLocked = false;
  }

  function closeModal() {
    modal?.remove();
    modal = null;
    unlockPageScroll();
  }

  function styles() {
    document.getElementById('stayugly-style')?.remove();
    document.getElementById('stayugly-v5-style')?.remove();
    const style = el('style');
    style.id = 'stayugly-v5-style';
    style.textContent = `
      .su-modal{position:fixed;inset:0;z-index:320;background:linear-gradient(180deg,#fff 0%,#fff 35%,#57bd93 75%,#57bd93 100%);background-attachment:local;color:#050505;overflow:auto;padding:1.5rem 1rem 4rem}.su-inner{width:min(100%,80rem);margin:0 auto}.su-head{position:relative;display:flex;justify-content:space-between;gap:1rem;margin-bottom:2rem;padding:.7rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.22);background:transparent}.su-label,.su-close,.su-kicker{font-size:.68rem;font-weight:900;letter-spacing:.28em;text-transform:uppercase}.su-kicker{margin:0 0 clamp(1.5rem,2.5vw,2.75rem)}.su-label{background:#050505;color:#fcfcfa;padding:.35rem .75rem}.su-close{border:1px solid #050505;background:#050505;color:#fcfcfa;padding:.55rem 1rem}.su-hero{padding-top:1.25rem;margin-bottom:5rem}.su-title{margin:0;font-size:clamp(4rem,12vw,12rem);font-weight:900;line-height:.78;letter-spacing:-.09em;text-transform:uppercase}.su-lead{width:100%;max-width:none;margin:1.5rem 0 0;font-size:clamp(1.45rem,3vw,3rem);font-weight:800;line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.su-section{border-top:1px solid rgba(5,5,5,.22);padding-top:1.25rem}.su-section+.su-section{margin-top:5rem}.su-section-head{margin-bottom:1.25rem}.su-h{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.085em;text-transform:uppercase}.su-text{max-width:52rem;margin:0 0 1.5rem;color:rgba(5,5,5,.72);font-size:clamp(1rem,1.6vw,1.35rem);font-weight:700;line-height:1.05;letter-spacing:-.035em}.su-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.su-card{border:0;background:#fcfcfa;padding:0;cursor:zoom-in}.su-card img{display:block;width:100%;height:100%;aspect-ratio:1/1;object-fit:cover}.su-grid--portrait .su-card img{height:auto;aspect-ratio:3/4;object-fit:cover}.su-specs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.9rem;width:100%;max-width:none;margin:0 0 1.5rem;padding:0;list-style:none}.su-specs li{border:1px solid rgba(5,5,5,.22);padding:1.05rem 1.2rem;font-size:.82rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase;min-height:4.2rem;display:flex;align-items:center}
      .su-concept{display:flex;flex-direction:column;gap:2rem}.su-concept-main{display:block;width:100%;border:0;background:transparent;padding:0;cursor:zoom-in}.su-concept-main img{display:block;width:100%;height:auto;max-height:none;object-fit:contain}.su-concept-flow{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr);align-items:start;gap:.7rem}.su-concept-item{min-width:0}.su-concept-step{display:block;width:100%;border:0;background:transparent;padding:0;cursor:zoom-in}.su-concept-step img{display:block;width:100%;height:auto;object-fit:contain}.su-concept-caption{margin:.75rem 0 0;font-size:.7rem;font-weight:900;line-height:1.15;letter-spacing:.18em;text-transform:uppercase}.su-concept-arrow{align-self:center;font-family:inherit;font-size:clamp(2.2rem,4vw,4.8rem);font-weight:900;line-height:1;color:#050505}
      .su-empty{font-size:.72rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase;color:rgba(5,5,5,.45)}.su-light{position:fixed;inset:0;z-index:420;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);padding:1rem}.su-light img{max-width:92vw;max-height:90vh;object-fit:contain}.su-light button{position:absolute;right:1rem;top:1rem;border:0;background:#fcfcfa;color:#050505;padding:.7rem 1rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase}
      @media(max-width:900px){.su-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.su-concept-flow{grid-template-columns:1fr}.su-concept-arrow{transform:rotate(90deg);justify-self:center;margin:.25rem 0}.su-concept-caption{text-align:center}.su-specs{grid-template-columns:1fr}}@media(max-width:560px){.su-grid{grid-template-columns:1fr}}
    `;
    document.head.append(style);
  }

  function updateLanguage() {
    if (!modal) return;
    const copy = COPY[currentLanguage()];
    const closeButton = modal.querySelector('.su-close');
    const loading = modal.querySelector('[data-su-loading]');
    const kicker = modal.querySelector('.su-kicker');
    const lead = modal.querySelector('.su-lead');

    if (closeButton) closeButton.textContent = copy.close;
    if (loading) loading.textContent = copy.loading;
    if (kicker) kicker.textContent = copy.kicker;
    if (lead) lead.textContent = copy.lead;

    modal.querySelectorAll('.su-section[data-su-section]').forEach((sectionNode) => {
      const sectionCopy = copy[sectionNode.dataset.suSection];
      if (!sectionCopy) return;
      const title = sectionNode.querySelector('.su-h');
      const note = sectionNode.querySelector('.su-text');
      if (title) title.textContent = sectionCopy.title;
      if (note) note.textContent = sectionCopy.note;
    });

    modal.querySelectorAll('.su-specs li').forEach((item, index) => {
      item.textContent = copy.specs[index] || '';
    });

    modal.querySelectorAll('.su-concept-caption').forEach((caption, index) => {
      caption.textContent = copy.conceptCaptions[index] || '';
    });

    modal.querySelectorAll('[data-su-empty]').forEach((empty) => {
      empty.textContent = copy.empty;
    });
  }

  const apiUrl = (folder) => `https://api.github.com/repos/${REPO}/contents/public/works/stayugly/${folder}?ref=${BRANCH}`;

  async function fetchFolder(folder) {
    try {
      const response = await fetch(apiUrl(folder), { cache: 'no-store' });
      if (!response.ok) return [];
      const items = await response.json();
      return (Array.isArray(items) ? items : [])
        .filter((item) => item.type === 'file' && IMAGE_RE.test(item.name || item.path))
        .sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { numeric: true }))
        .map((item) => item.download_url || `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path}`);
    } catch {
      return [];
    }
  }

  const load = (sectionKey) => fetchFolder(FOLDERS[sectionKey]);

  function lightbox(list, index = 0) {
    let currentIndex = index;
    const overlay = el('div', 'su-light');
    const closeButton = el('button', '', COPY[currentLanguage()].close);
    const image = el('img');
    const draw = () => { image.src = q(list[currentIndex]); };
    closeButton.onclick = () => overlay.remove();
    overlay.onclick = () => overlay.remove();
    image.onclick = (event) => {
      event.stopPropagation();
      currentIndex = (currentIndex + 1) % list.length;
      draw();
    };
    overlay.append(closeButton, image);
    document.body.append(overlay);
    draw();
  }

  function gallery(list, modifier = '') {
    const grid = el('div', modifier ? `su-grid ${modifier}` : 'su-grid');
    if (!list.length) {
      const empty = el('p', 'su-empty', COPY[currentLanguage()].empty);
      empty.dataset.suEmpty = 'true';
      grid.append(empty);
      return grid;
    }
    list.forEach((src, index) => {
      const button = el('button', 'su-card');
      const image = el('img');
      button.type = 'button';
      image.src = q(src);
      image.loading = 'lazy';
      button.append(image);
      button.onclick = (event) => {
        event.stopPropagation();
        lightbox(list, index);
      };
      grid.append(button);
    });
    return grid;
  }

  function conceptGallery(list) {
    const wrapper = el('div', 'su-concept');
    if (!list.length) {
      const empty = el('p', 'su-empty', COPY[currentLanguage()].empty);
      empty.dataset.suEmpty = 'true';
      wrapper.append(empty);
      return wrapper;
    }

    const main = el('button', 'su-concept-main');
    const mainImage = el('img');
    main.type = 'button';
    mainImage.src = q(list[0]);
    main.append(mainImage);
    main.onclick = (event) => {
      event.stopPropagation();
      lightbox(list, 0);
    };
    wrapper.append(main);

    const order = [2, 1, 3].filter((index) => list[index]);
    const captions = COPY[currentLanguage()].conceptCaptions;
    const flow = el('div', 'su-concept-flow');
    order.forEach((imageIndex, position) => {
      const item = el('div', 'su-concept-item');
      const button = el('button', 'su-concept-step');
      const image = el('img');
      const caption = el('p', 'su-concept-caption', captions[position] || '');
      button.type = 'button';
      image.src = q(list[imageIndex]);
      button.append(image);
      button.onclick = (event) => {
        event.stopPropagation();
        lightbox(list, imageIndex);
      };
      item.append(button, caption);
      flow.append(item);
      if (position < order.length - 1) flow.append(el('span', 'su-concept-arrow', '→'));
    });
    wrapper.append(flow);
    return wrapper;
  }

  function section(sectionKey, list, extra = null, custom = null) {
    const sectionCopy = COPY[currentLanguage()][sectionKey];
    const sectionNode = el('section', 'su-section');
    sectionNode.dataset.suSection = sectionKey;
    const heading = el('div', 'su-section-head');
    heading.append(el('h3', 'su-h', sectionCopy.title));
    sectionNode.append(heading);
    if (sectionCopy.note) sectionNode.append(el('p', 'su-text', sectionCopy.note));
    if (extra) sectionNode.append(extra);
    sectionNode.append(custom ? custom(list) : gallery(list));
    return sectionNode;
  }

  async function open() {
    styles();
    closeModal();
    lockPageScroll();

    const copy = COPY[currentLanguage()];
    modal = el('div', 'su-modal');
    const inner = el('div', 'su-inner');
    const header = el('div', 'su-head');
    const closeButton = el('button', 'su-close', copy.close);
    closeButton.onclick = closeModal;
    header.append(el('p', 'su-label', 'STAYUGLY'), closeButton);

    const loading = el('p', 'su-empty', copy.loading);
    loading.dataset.suLoading = 'true';
    inner.append(header, loading);
    modal.append(inner);
    document.body.append(modal);

    const [concept, final, photoshoot, packaging] = await Promise.all([
      load('concept'),
      load('final'),
      load('photoshoot'),
      load('packaging'),
    ]);

    loading.remove();
    const hero = el('section', 'su-hero');
    hero.append(
      el('p', 'su-kicker', copy.kicker),
      el('h2', 'su-title', 'STAYUGLY'),
      el('p', 'su-lead', copy.lead),
    );

    const specs = el('ul', 'su-specs');
    copy.specs.forEach((text) => specs.append(el('li', '', text)));

    inner.append(
      hero,
      section('concept', concept, null, conceptGallery),
      section('final', final, specs, (list) => gallery(list, 'su-grid--portrait')),
      section('photoshoot', photoshoot),
      section('packaging', packaging),
    );
  }

  const languageObserver = new MutationObserver(updateLanguage);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal) closeModal();
  });

  document.addEventListener('click', (event) => {
    const card = event.target.closest('#works article,#works button');
    if (!card) return;
    const title = card.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'STAY UGLY' && title !== 'STAYUGLY') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);
})();