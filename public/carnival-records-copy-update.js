(() => {
  if (window.__carnivalRecordsCopyUpdateV1) return;
  window.__carnivalRecordsCopyUpdateV1 = true;

  const VERSION = 'carnival-copy-update-1';
  const COPY = {
    ru: {
      aboutTitle: 'ABOUT CARNIVAL RECORDS',
      aboutText: 'Carnival Records — музыкальный лейбл и творческая платформа артиста SALUKI. Визуальный язык бренда объединяет карнавальную, ковбойскую и психоделическую эстетику, винтажную типографику и выразительную ручную графику. В рамках сотрудничества были разработаны принты, оформление музыкальных релизов и элементы мерча, объединённые общей визуальной системой.',
      vinylText: 'Разработка дизайна винилового издания альбома «Властелин Калек», основанного на работах Антона Реввы, созданных для данного релиза. В проект вошли оформление треклиста, внутреннего разворота обложки и самих пластинок. Вся графика и шрифтовые элементы были отрисованы вручную без использования Photoshop и объединены в цельную визуальную систему, продолжающую эстетику альбома.',
      calecText: 'Разработка серии графики для коллекции, посвящённой альбому «Властелин Калек». Каждый принт отсылает к отдельному треку либо переосмысливает визуальные мотивы, атмосферу и общую эстетику релиза. Часть изображений основана на рисунках из дневника, посвящённого выходу альбома. Они были заново вручную отрисованы и переработаны, чтобы лучше соответствовать общей графической системе коллекции.',
    },
    en: {
      aboutTitle: 'ABOUT CARNIVAL RECORDS',
      aboutText: 'Carnival Records is a music label and creative platform founded by the artist SALUKI. Its visual language combines carnival, Western and psychedelic aesthetics with vintage typography and expressive hand-drawn graphics. The collaboration included the development of prints, music release artwork and merchandise elements united by a consistent visual system.',
      vinylText: 'Design of the vinyl edition of the album Vlastelin Kalek, based on Anton Revva’s original artworks created for the release. The project included the tracklist, the inner gatefold and the vinyl records themselves. All graphics and typographic elements were drawn entirely by hand without the use of Photoshop and combined into a cohesive visual system that continues the album’s aesthetic.',
      calecText: 'Development of a graphic series for a collection dedicated to the album Vlastelin Kalek. Each print refers to a specific track or reinterprets the visual motifs, atmosphere and overall aesthetic of the release. Some of the illustrations are based on drawings from a diary created for the album’s release. They were redrawn and reworked by hand to better fit the collection’s overall graphic system.',
    },
  };

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const normalize = (value) => String(value || '').trim().toUpperCase();

  function injectStyles() {
    const previous = document.getElementById('carnival-records-copy-update-style');
    if (previous?.dataset.version === VERSION) return;
    previous?.remove();

    const style = document.createElement('style');
    style.id = 'carnival-records-copy-update-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .cr-modal .cr-about {
        max-width: 61rem;
        margin-top: clamp(2.5rem, 5vw, 4.5rem);
        padding-top: 1.15rem;
        border-top: 1px solid rgba(5,5,5,.24);
      }
      .cr-modal .cr-about__title {
        margin: 0 0 1rem;
        color: #050505;
        font: 900 .72rem/1 Arial,Helvetica,sans-serif;
        letter-spacing: .24em;
        text-transform: uppercase;
      }
      .cr-modal .cr-about__copy {
        width: 100%;
        max-width: none;
        margin: 0;
        color: #050505;
        font: 650 clamp(1.05rem,1.75vw,1.45rem)/1.2 Arial,Helvetica,sans-serif;
        letter-spacing: -.025em;
      }
    `;
    document.head.append(style);
  }

  function findSection(modal, expectedTitle) {
    return [...modal.querySelectorAll('.cr-inner > .cr-section')].find((section) =>
      normalize(section.querySelector(':scope > .cr-h')?.textContent) === expectedTitle
    ) || null;
  }

  function setDescription(section, value) {
    if (!section) return;
    let description = section.querySelector(':scope > .cr-description');
    if (!description) {
      description = document.createElement('p');
      description.className = 'cr-description';
      section.querySelector(':scope > .cr-h')?.insertAdjacentElement('afterend', description);
    }
    description.textContent = value;
  }

  function apply(modal = document.querySelector('.cr-modal')) {
    if (!modal) return false;
    injectStyles();

    const lang = language();
    const copy = COPY[lang];
    const hero = modal.querySelector('.cr-hero');
    if (!hero) return false;

    let about = hero.querySelector(':scope > .cr-about');
    if (!about) {
      about = document.createElement('div');
      about.className = 'cr-about';
      const title = document.createElement('h2');
      title.className = 'cr-about__title';
      const paragraph = document.createElement('p');
      paragraph.className = 'cr-about__copy';
      about.append(title, paragraph);
      hero.append(about);
    }

    about.querySelector('.cr-about__title').textContent = copy.aboutTitle;
    about.querySelector('.cr-about__copy').textContent = copy.aboutText;

    setDescription(findSection(modal, 'VINYL ALBUM COVER DESIGN'), copy.vinylText);
    setDescription(findSection(modal, 'ВЛАСТЕЛИН КАЛЕК COLLECTION'), copy.calecText);

    modal.dataset.carnivalCopyUpdate = `${VERSION}-${lang}`;
    return true;
  }

  function scheduleApply() {
    requestAnimationFrame(() => apply());
    window.setTimeout(() => apply(), 80);
    window.setTimeout(() => apply(), 240);
  }

  scheduleApply();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.cr-modal') || node.querySelector?.('.cr-modal')) {
          scheduleApply();
          return;
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  new MutationObserver(scheduleApply).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
})();