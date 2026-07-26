(() => {
  if (window.__carnivalRecordsFinalCopyV1) return;
  window.__carnivalRecordsFinalCopyV1 = true;

  const VERSION = 'carnival-final-copy-1';
  const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438 602" role="img" aria-label="Carnival Records logo"><path d="M168,20 L149,36 L117,69 L126,71 L136,75 L141,78 L150,87 L157,102 L160,118 L159,120 L153,120 L139,117 L120,109 L108,99 L100,87 L86,105 L67,124 L42,142 L42,144 L54,151 L66,165 L73,178 L80,197 L86,224 L87,239 L88,240 L88,253 L89,254 L88,298 L87,299 L87,308 L86,309 L84,326 L80,342 L73,362 L65,378 L56,392 L46,404 L20,426 L27,435 L70,480 L75,478 L79,473 L91,463 L112,449 L132,439 L151,432 L161,430 L161,438 L159,453 L155,467 L149,479 L142,489 L132,498 L120,504 L111,507 L101,508 L101,511 L112,523 L131,526 L202,527 L212,525 L212,521 L204,511 L199,500 L196,489 L195,476 L197,468 L201,467 L221,468 L251,471 L276,478 L278,491 L279,511 L280,512 L280,557 L279,558 L279,568 L278,569 L276,583 L272,595 L271,601 L278,597 L286,588 L292,578 L296,565 L297,553 L297,527 L296,526 L296,506 L295,505 L294,490 L301,493 L315,500 L328,510 L340,522 L351,510 L382,481 L398,464 L406,454 L392,442 L382,432 L375,421 L369,410 L363,395 L359,380 L357,365 L356,338 L355,337 L355,324 L354,323 L354,313 L350,316 L333,325 L316,334 L301,342 L298,337 L292,325 L286,315 L279,306 L270,295 L260,285 L253,281 L254,275 L260,264 L268,251 L276,237 L283,222 L289,207 L294,194 L298,181 L300,172 L300,166 L309,163 L325,158 L337,153 L347,147 L355,141 L364,131 L364,127 L360,117 L354,106 L345,95 L338,88 L330,82 L322,87 L309,97 L295,105 L283,110 L283,106 L292,95 L302,85 L312,75 L299,59 L285,42 L276,27 L263,33 L248,37 L232,40 L215,41 L194,40 L180,37 Z M201,79 L274,79 L269,90 L259,108 L253,118 L241,121 L201,125 L202,111 L201,96 Z M156,134 L209,137 L208,174 L207,175 L207,344 L171,349 L158,352 L159,339 L163,322 L166,304 L168,283 L168,250 L167,249 L167,221 L166,220 L165,198 L162,176 L157,155 Z M207,172 L245,174 L234,195 L224,212 L215,225 L208,232 Z M207,265 L216,270 L227,279 L239,293 L250,310 L260,330 L267,348 L270,359 L271,369 L237,363 L208,360 Z" fill="#050505" fill-rule="evenodd"/></svg>`;

  const COPY = {
    ru: {
      firstTitle: 'CARNIVAL RECORDS COLLECTION',
      firstText: 'Разработка отдельной серии графики для Carnival Records — бренда исполнителя SALUKI. Визуальная концепция основана на стилистике существующих проектов бренда и объединяет ковбойскую, карнавальную и психоделическую эстетику, винтажную типографику и экспериментальную работу с изображениями.',
      secondTitle: 'ВЛАСТЕЛИН КАЛЕК COLLECTION',
      secondText: 'Разработка серии графики для коллекции, посвящённой альбому «Властелин Калек». Каждый принт отсылает к отдельному треку либо переосмысливает визуальные мотивы, атмосферу и общую эстетику релиза.',
      vinylTitle: 'VINYL ALBUM COVER DESIGN',
      vinylText: 'Разработка дизайна винилового издания альбома «Властелин Калек». В проект вошли оформление треклиста, внутреннего разворота обложки и самих пластинок. Визуальная концепция основана на ранее созданной графике и продолжает общую эстетику релиза.',
      tracklist: 'ТРЕКЛИСТ',
      gatefold: 'РАЗВОРОТ ВИНИЛА',
      records: 'ПЛАСТИНКИ',
      merchTitle: 'MERCH',
      merchText: 'Вместе с виниловым изданием была разработана отдельная коллекция одежды, посвящённая альбому «Властелин Калек». Графика мерча продолжает визуальный язык релиза и переносит его ключевые образы и мотивы на предметы коллекции.',
      capsTitle: 'CAPS',
      capsText: 'Разработка серии кепок для последнего релиза исполнителя. Дизайн моделей отсылает к эстетике нового альбома «Эйфория», а также к визуальному миру альбома WILD EAST.',
    },
    en: {
      firstTitle: 'CARNIVAL RECORDS COLLECTION',
      firstText: 'A standalone graphic collection developed for Carnival Records, SALUKI’s brand. The visual concept builds on the brand’s established identity, combining Western, carnival, and psychedelic aesthetics with vintage typography and experimental imagery.',
      secondTitle: 'ВЛАСТЕЛИН КАЛЕК COLLECTION',
      secondText: 'A graphic collection developed around the album Властелин Калек. Each print references a specific track or reinterprets the visual motifs, atmosphere, and overall aesthetic of the release.',
      vinylTitle: 'VINYL ALBUM COVER DESIGN',
      vinylText: 'Vinyl edition design for the album Властелин Калек. The project includes the tracklist, inner gatefold, and vinyl record designs. The visual concept builds on the previously developed graphics and continues the overall aesthetic of the release.',
      tracklist: 'TRACKLIST',
      gatefold: 'VINYL GATEFOLD',
      records: 'RECORDS',
      merchTitle: 'MERCH',
      merchText: 'Alongside the vinyl edition, a standalone apparel collection dedicated to the album Властелин Калек was developed. The merchandise graphics extend the visual language of the release, translating its key imagery and motifs into wearable pieces.',
      capsTitle: 'CAPS',
      capsText: 'A series of caps developed for the artist’s latest release. The designs reference the aesthetic of the new album Эйфория, as well as the visual world of WILD EAST.',
    },
  };

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const text = () => COPY[language()];

  function injectStyles() {
    document.getElementById('carnival-records-final-copy-style')?.remove();
    const style = document.createElement('style');
    style.id = 'carnival-records-final-copy-style';
    style.dataset.version = VERSION;
    style.textContent = `
      html:has(.cr-modal), body:has(.cr-modal) { background: #fff !important; }
      .cr-modal { background: #fff !important; color: #050505 !important; }
      .cr-modal .cr-head { background: rgba(255,255,255,.96) !important; border-bottom-color: rgba(5,5,5,.24) !important; }
      .cr-modal .cr-label, .cr-modal .cr-close { background: #050505 !important; color: #fff !important; border-color: #050505 !important; }
      .cr-modal .cr-kicker, .cr-modal .cr-lead { display: none !important; }
      .cr-modal .cr-hero { margin-bottom: clamp(5rem,10vw,9rem) !important; }
      .cr-modal .cr-section { border-top-color: rgba(5,5,5,.24) !important; }
      .cr-modal .cr-h, .cr-modal .cr-title { color: #050505 !important; }
      .cr-modal .cr-note { color: rgba(5,5,5,.52) !important; }
      .cr-modal .cr-description { max-width: 61rem; margin: clamp(1.35rem,2.8vw,2.2rem) 0 clamp(2rem,4vw,3.4rem); color: #050505; font-size: clamp(1.05rem,1.75vw,1.45rem); font-weight: 650; line-height: 1.2; letter-spacing: -.025em; }
      .cr-modal .cr-card, .cr-modal .cr-media, .cr-modal .cr-img { border-color: rgba(5,5,5,.14) !important; background: #fff !important; }
      .cr-modal .cr-subtitle { color: #d71920 !important; }
      .cr-subgroup-gatefold .cr-grid, .cr-section-merch-album .cr-grid { display: flex !important; flex-direction: column !important; align-items: stretch !important; gap: clamp(1rem,2.5vw,2rem) !important; }
      .cr-subgroup-gatefold .cr-card, .cr-section-merch-album .cr-card, .cr-subgroup-gatefold .cr-media, .cr-section-merch-album .cr-media { width: 100% !important; aspect-ratio: auto !important; border: 0 !important; background: transparent !important; overflow: visible !important; }
      .cr-subgroup-gatefold .cr-img, .cr-section-merch-album .cr-img { position: static !important; display: block !important; width: 100% !important; height: auto !important; opacity: 1 !important; object-fit: contain !important; background: transparent !important; }
      .cr-project-card-cover { display: flex !important; align-items: center !important; justify-content: center !important; min-height: 12rem !important; background: #fff !important; border-color: rgba(5,5,5,.22) !important; overflow: hidden !important; transform: none !important; }
      .cr-project-card-cover > * { display: none !important; }
      .cr-project-card-logo { display: block !important; width: min(68%,13.5rem) !important; height: auto !important; transform: none !important; }
      .cr-project-card-logo svg { display: block; width: 100%; height: auto; }
    `;
    document.head.append(style);
  }

  function addDescription(section, value) {
    let paragraph = section.querySelector(':scope > .cr-description');
    if (!paragraph) {
      paragraph = document.createElement('p');
      paragraph.className = 'cr-description';
      const heading = section.querySelector(':scope > .cr-h');
      heading?.insertAdjacentElement('afterend', paragraph);
    }
    paragraph.textContent = value;
  }

  function renameSection(section, title, description) {
    const heading = section?.querySelector(':scope > .cr-h');
    if (heading) heading.textContent = title;
    if (section && description) addDescription(section, description);
  }

  function makeSubgroup(title, cards) {
    const subgroup = document.createElement('div');
    subgroup.className = 'cr-subgroup cr-subgroup-gatefold';
    const heading = document.createElement('h3');
    heading.className = 'cr-subtitle';
    heading.textContent = title;
    const grid = document.createElement('div');
    grid.className = 'cr-grid';
    cards.forEach((card) => grid.append(card));
    subgroup.append(heading, grid);
    return subgroup;
  }

  function makeMerchSection(sourceGroup, copy) {
    const section = document.createElement('section');
    section.className = 'cr-section cr-section-merch-album';
    const heading = document.createElement('h2');
    heading.className = 'cr-h';
    heading.textContent = copy.merchTitle;
    const description = document.createElement('p');
    description.className = 'cr-description';
    description.textContent = copy.merchText;
    section.append(heading, description);
    if (sourceGroup) {
      const grid = sourceGroup.querySelector('.cr-grid');
      if (grid) section.append(grid);
      sourceGroup.remove();
    }
    return section;
  }

  function enhanceModal(modal) {
    if (!modal || modal.dataset.carnivalFinalCopy === VERSION) return;
    const copy = text();
    const sections = [...modal.querySelectorAll('.cr-inner > .cr-section')];
    if (sections.length < 4) return;

    const [first, second, vinyl, caps] = sections;
    renameSection(first, copy.firstTitle, copy.firstText);
    renameSection(second, copy.secondTitle, copy.secondText);
    renameSection(vinyl, copy.vinylTitle, copy.vinylText);
    renameSection(caps, copy.capsTitle, copy.capsText);

    const groups = [...vinyl.querySelectorAll(':scope > div > .cr-subgroup, :scope > .cr-subgroup')];
    if (groups.length >= 3) {
      const [albumGroup, recordGroup, merchGroup] = groups;
      const albumGrid = albumGroup.querySelector('.cr-grid');
      const albumCards = [...(albumGrid?.querySelectorAll(':scope > .cr-card') || [])];

      const albumTitle = albumGroup.querySelector('.cr-subtitle');
      if (albumTitle) albumTitle.textContent = copy.tracklist;
      albumCards.slice(2).forEach((card) => card.remove());

      const gatefold = makeSubgroup(copy.gatefold, albumCards.slice(2));
      albumGroup.insertAdjacentElement('afterend', gatefold);

      const recordTitle = recordGroup.querySelector('.cr-subtitle');
      if (recordTitle) recordTitle.textContent = copy.records;

      const merchSection = makeMerchSection(merchGroup, copy);
      vinyl.insertAdjacentElement('afterend', merchSection);
    }

    modal.dataset.carnivalFinalCopy = VERSION;
  }

  function findCard() {
    return [...document.querySelectorAll('#works article,#works button')].find((node) => node.querySelector('h3')?.textContent?.trim().toUpperCase() === 'CARNIVAL RECORDS');
  }

  function enhanceCard() {
    const card = findCard();
    if (!card) return false;
    const visual = card.querySelector('.my-10 > div');
    if (!visual) return false;
    visual.classList.add('cr-project-card-cover');
    if (!visual.querySelector('.cr-project-card-logo')) {
      const holder = document.createElement('div');
      holder.className = 'cr-project-card-logo';
      holder.innerHTML = LOGO_SVG;
      visual.append(holder);
    }
    return true;
  }

  injectStyles();
  [0,120,450,1000].forEach((delay) => setTimeout(enhanceCard, delay));
  enhanceModal(document.querySelector('.cr-modal'));

  const observer = new MutationObserver((mutations) => {
    enhanceCard();
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.cr-modal')) enhanceModal(node);
        else node.querySelectorAll?.('.cr-modal').forEach(enhanceModal);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  new MutationObserver(() => {
    injectStyles();
    enhanceCard();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();