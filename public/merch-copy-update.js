(() => {
  if (window.__merchCopyUpdateV1) return;
  window.__merchCopyUpdateV1 = true;

  const VERSION = 'merch-copy-update-1';
  const COPY = {
    ru: {
      merchTitle: 'ГРАФИКА ДЛЯ МЕРЧА',
      merchText: 'Разработка серии графических работ для мерча, посвящённого музыкальному альбому. Дизайны создавались для футболок и других предметов коллекции, объединяя клубную эстетику, характер исполнителя и визуальные отсылки к тематике релиза.',
      postersTitle: 'СЕРИЯ ПОСТЕРОВ',
      postersText: 'Серия постеров основана на эстетике и характере исполнителя, а также на главной фразе альбома — “Stuck in the Loop? Don’t Worry, It’s Just Techno.” В каждом изображении эта надпись интерпретируется по-разному: через фотографию, типографику, коллажи и графические образы, связанные с клубной культурой и электронной музыкой.',
      socialTitle: 'КОНТЕНТ ДЛЯ СОЦИАЛЬНЫХ СЕТЕЙ',
      socialText: 'Разработка различных изображений для продвижения альбома в социальных сетях. В серию вошли визуалы для постов, сторис, анонсов и других цифровых форматов. Все материалы продолжают общую стилистику релиза и адаптируют её под разные способы коммуникации с аудиторией.',
      dxsTitle: 'КОНТЕНТ ДЛЯ СОЦСЕТЕЙ И ПЕЧАТНЫЕ МАТЕРИАЛЫ',
      dxsText: 'Разработка серии визуальных материалов для модельного комьюнити DXS. В проект вошли изображения для постов и сторис, рекламные и имиджевые постеры, а также графика для стикеров и других носителей. Дизайн строится на сочетании минималистичной типографики, рукописной графики, коротких высказываний и контрастной красно-бело-чёрной палитры, отражающей независимый и экспериментальный характер проекта.',
    },
    en: {
      merchTitle: 'MERCH GRAPHICS',
      merchText: 'Development of a series of graphic works for merchandise dedicated to the music album. The designs were created for T-shirts and other items from the collection, combining club aesthetics, the artist’s character, and visual references to the theme of the release.',
      postersTitle: 'POSTER SERIES',
      postersText: 'The poster series is based on the artist’s aesthetic and personality, as well as the album’s key phrase — “Stuck in the Loop? Don’t Worry, It’s Just Techno.” Each visual reinterprets the phrase through photography, typography, collage, and graphic imagery inspired by club culture and electronic music.',
      socialTitle: 'SOCIAL MEDIA CONTENT',
      socialText: 'Development of various visuals for promoting the album across social media. The series includes content for posts, stories, announcements, and other digital formats. All materials continue the visual direction of the release and adapt it to different ways of communicating with the audience.',
      dxsTitle: 'SOCIAL MEDIA & PRINT MATERIALS',
      dxsText: 'Development of a series of visual materials for the DXS model community. The project includes content for social media posts and stories, promotional and image-based posters, as well as graphics for stickers and other formats. The visual direction combines minimalist typography, handwritten graphics, concise statements, and a contrasting red, white, and black palette that reflects the project’s independent and experimental character.',
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function sectionCopy(section, text) {
    if (!section) return;
    let block = section.querySelector(':scope > .m10-copy-update');
    if (!block) {
      block = document.createElement('div');
      block.className = 'm10-project-copy m10-section-copy m10-copy-update';
      const paragraph = document.createElement('p');
      block.append(paragraph);
      const head = section.querySelector(':scope > .m10-section-head');
      head?.insertAdjacentElement('afterend', block);
    }
    let paragraph = block.querySelector('p');
    if (!paragraph) {
      paragraph = document.createElement('p');
      block.append(paragraph);
    }
    paragraph.textContent = text;
  }

  function rename(section, title, text) {
    if (!section) return;
    const heading = section.querySelector(':scope > .m10-section-head .m10-section-title');
    if (heading) heading.textContent = title;
    sectionCopy(section, text);
  }

  function apply(modal = document.querySelector('.m10-modal')) {
    if (!modal) return false;
    const copy = COPY[language()];

    const mainSections = [...modal.querySelectorAll('.m10-inner > .m10-section')];
    const dxsZone = modal.querySelector('.m10-dxs-zone');
    const dxsSections = [...(dxsZone?.querySelectorAll(':scope > .m10-section') || [])];

    const merch = mainSections.find((section) => section.querySelector('.m10-campaign'));
    const posters = mainSections.find((section) => section.querySelector('.m10-poster-layout'));
    const social = mainSections.find((section) => section.querySelector('.m10-ad-layout'));
    const dxsMaterials = dxsSections.find((section) => section.querySelector('.m10-dxs-ads'));

    rename(merch, copy.merchTitle, copy.merchText);
    rename(posters, copy.postersTitle, copy.postersText);
    rename(social, copy.socialTitle, copy.socialText);
    rename(dxsMaterials, copy.dxsTitle, copy.dxsText);

    modal.dataset.merchCopyUpdate = `${VERSION}-${language()}`;
    return Boolean(merch || posters || social || dxsMaterials);
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  schedule();
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true });
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) {
      setTimeout(schedule, 0);
      setTimeout(schedule, 100);
    }
  }, true);
})();