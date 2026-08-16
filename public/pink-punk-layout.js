(() => {
  if (window.__pinkPunkLayoutV6) return;
  window.__pinkPunkLayoutV6 = true;
  window.__pinkPunkLayoutV5 = true;
  window.__pinkPunkLayoutV4 = true;

  const VERSION = 'pink-layout-6';
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

  const language = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const chipLabels = () => language() === 'ru'
    ? ['ГРАФИКА', 'ПОСТЕРЫ', 'ПРИНТЫ']
    : ['GRAPHICS', 'POSTERS', 'PRINTS'];

  function injectStyles() {
    document.getElementById('pink-punk-layout-style')?.remove();
    const style = document.createElement('style');
    style.id = 'pink-punk-layout-style';
    style.dataset.version = VERSION;
    style.textContent = `
      .pink-punk-fullscreen{
        background:#050505!important;
        background-image:linear-gradient(180deg,#9b0014 0%,#7d0012 18%,#56000d 35%,#320008 52%,#180004 69%,#090102 84%,#050505 100%)!important;
        background-repeat:no-repeat!important;
        background-size:100% 100%!important;
        background-attachment:local!important;
      }
      .pink-punk-fullscreen>div{
        box-sizing:border-box!important;
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0 clamp(1rem,3.2vw,4rem) clamp(4rem,8vw,8rem)!important;
      }
      .pink-punk-fullscreen>div>.sticky{
        position:fixed!important;
        inset:0 0 auto 0!important;
        z-index:1900000!important;
        box-sizing:border-box!important;
        display:flex!important;
        align-items:center!important;
        justify-content:space-between!important;
        width:100vw!important;
        max-width:none!important;
        min-height:4rem!important;
        margin:0!important;
        padding:.72rem clamp(1rem,1.8vw,2rem)!important;
        background:#9b0014!important;
        color:#fff!important;
        border:0!important;
        border-bottom:1px solid rgba(255,255,255,.28)!important;
        box-shadow:none!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
        backdrop-filter:none!important;
        -webkit-backdrop-filter:none!important;
      }
      .pink-punk-fullscreen>div>.sticky button{
        background:#050505!important;
        color:#fff!important;
        border:0!important;
        border-radius:0!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
      }
      .pink-punk-gallery.pink-punk-gallery--grouped{
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0!important;
        column-count:1!important;
        column-gap:0!important;
      }
      .pink-punk-brand{
        box-sizing:border-box!important;
        display:block!important;
        width:100%!important;
        max-width:none!important;
        min-height:0!important;
        margin:0!important;
        padding:clamp(7rem,9vw,9rem) 0 clamp(4rem,7vw,6rem)!important;
      }
      .pink-punk-brand__title{
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0!important;
        color:#fff!important;
        font:900 clamp(5.5rem,17vw,14rem)/.7 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.1em!important;
        text-transform:uppercase!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
        will-change:auto!important;
      }
      .pink-punk-native-chips{
        display:flex!important;
        flex-wrap:wrap!important;
        gap:.55rem!important;
        margin:clamp(1.2rem,1.8vw,1.7rem) 0 clamp(2rem,3vw,2.8rem)!important;
        padding:0!important;
      }
      .pink-punk-native-chip{
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        min-height:2rem!important;
        margin:0!important;
        padding:.55rem .85rem!important;
        border:1px solid #fff!important;
        border-radius:0!important;
        background:transparent!important;
        color:#fff!important;
        font:900 .62rem/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.18em!important;
        text-transform:uppercase!important;
        white-space:nowrap!important;
      }
      .pink-punk-brand__label{
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        width:max-content!important;
        max-width:100%!important;
        margin:0 0 1.25rem!important;
        padding:.6rem .8rem!important;
        border:0!important;
        border-radius:0!important;
        background:#050505!important;
        color:#fff!important;
        font:900 .64rem/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.2em!important;
        text-transform:uppercase!important;
      }
      .pink-punk-brand__copy{
        box-sizing:border-box!important;
        display:block!important;
        width:min(100%,58rem)!important;
        max-width:58rem!important;
        margin:0!important;
        padding:0!important;
        color:rgba(255,255,255,.78)!important;
        font:600 clamp(1rem,1.45vw,1.25rem)/1.48 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.018em!important;
        text-align:left!important;
        white-space:pre-line!important;
      }
      .pink-punk-section{
        position:relative!important;
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        width:100%!important;
        min-height:0!important;
        border-top:1px solid rgba(255,255,255,.32)!important;
        padding-top:1.35rem!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
      }
      .pink-punk-section+.pink-punk-section{margin-top:clamp(5rem,10vw,9rem)!important}
      .pink-punk-section__head{
        position:static!important;
        display:block!important;
        width:100%!important;
        margin:0!important;
        padding:0!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
        will-change:auto!important;
      }
      .pink-punk-section__title{
        position:static!important;
        display:block!important;
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0!important;
        color:#fff!important;
        font:900 clamp(2.8rem,5.2vw,5.9rem)/.86 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.075em!important;
        text-transform:uppercase!important;
        white-space:normal!important;
        transform:none!important;
        translate:none!important;
        scale:none!important;
        rotate:none!important;
        transition:none!important;
        animation:none!important;
        will-change:auto!important;
        backface-visibility:visible!important;
        -webkit-font-smoothing:antialiased!important;
      }
      .pink-punk-section__note{
        box-sizing:border-box!important;
        display:block!important;
        width:min(100%,58rem)!important;
        max-width:58rem!important;
        margin:1.3rem 0 2.2rem!important;
        padding:0!important;
        color:rgba(255,255,255,.78)!important;
        font:600 clamp(1rem,1.45vw,1.25rem)/1.48 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.018em!important;
        text-align:left!important;
        white-space:pre-line!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
      }
      .pink-punk-section__grid{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        align-items:start!important;
        gap:1rem!important;
        width:100%!important;
      }
      .pink-punk-section__grid .pink-punk-frame{
        display:block!important;
        width:100%!important;
        margin:0!important;
        break-inside:auto!important;
        -webkit-column-break-inside:auto!important;
        page-break-inside:auto!important;
      }
      @media(max-width:900px){.pink-punk-section__grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
      @media(max-width:820px){
        .pink-punk-fullscreen>div{padding-left:1rem!important;padding-right:1rem!important}
        .pink-punk-fullscreen>div>.sticky{min-height:3.65rem!important;padding:.62rem .75rem!important}
        .pink-punk-brand{padding-top:5.5rem!important}
        .pink-punk-brand__title{font-size:clamp(5rem,30vw,8rem)!important;line-height:.7!important}
        .pink-punk-brand__copy{font-size:1rem!important;line-height:1.48!important}
        .pink-punk-section__title{font-size:clamp(2.35rem,11vw,4rem)!important;line-height:.86!important}
        .pink-punk-section__grid{grid-template-columns:1fr!important}
        .pink-punk-frame,.pink-punk-frame:hover{transform:none!important;box-shadow:none!important}
        .pink-punk-frame--hover .pink-punk-image--base,.pink-punk-frame--hover:hover .pink-punk-image--base,.pink-punk-lightbox-frame--hover .pink-punk-lightbox-image--base,.pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--base{opacity:1!important}
        .pink-punk-frame--hover .pink-punk-image--worn,.pink-punk-frame--hover:hover .pink-punk-image--worn,.pink-punk-lightbox-frame--hover .pink-punk-lightbox-image--worn,.pink-punk-lightbox-frame--hover:hover .pink-punk-lightbox-image--worn{opacity:0!important;pointer-events:none!important}
      }
    `;
    document.head.append(style);
  }

  function buildChips() {
    const chips = document.createElement('div');
    chips.className = 'pink-punk-native-chips';
    chipLabels().forEach(text => {
      const chip = document.createElement('span');
      chip.className = 'pink-punk-native-chip';
      chip.textContent = text;
      chips.append(chip);
    });
    return chips;
  }

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
    brand.append(title, buildChips(), label, copy);
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
    cards.forEach(card => grid.append(card));
    section.append(head,note,grid);
    return section;
  }

  function updateCopy(gallery) {
    const copy = COPY[language()];
    const brandLabel = gallery.querySelector('.pink-punk-brand__label');
    const brandCopy = gallery.querySelector('.pink-punk-brand__copy');
    if (brandLabel) brandLabel.textContent = copy.aboutLabel;
    if (brandCopy) brandCopy.textContent = copy.about;
    const chips = gallery.querySelector('.pink-punk-native-chips');
    if (chips) {
      const labels = chipLabels();
      [...chips.children].forEach((chip,index) => { if (labels[index]) chip.textContent = labels[index]; });
    }
    gallery.querySelectorAll('.pink-punk-section').forEach(section => {
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
    const modal = gallery.closest('.fixed.inset-0,[role="dialog"]');
    modal?.classList.add('pink-punk-fullscreen');

    if (gallery.dataset.pinkLayout !== VERSION) {
      const cards = Array.from(gallery.querySelectorAll('.pink-punk-frame'));
      if (cards.length < 7) return false;
      cards.forEach(card => card.remove());
      gallery.replaceChildren(
        buildBrand(),
        buildSection('tees',cards.slice(0,3)),
        buildSection('posters',cards.slice(3,6)),
        buildSection('prints',cards.slice(6)),
      );
      gallery.classList.add('pink-punk-gallery--grouped');
      gallery.dataset.pinkLayout = VERSION;
    }
    updateCopy(gallery);
    return true;
  }

  function retry(attempts=24,delay=120) {
    let count=0;
    const run=()=>{count+=1;if(enhance()||count>=attempts)return;window.setTimeout(run,delay)};
    window.setTimeout(run,0);
  }

  document.addEventListener('click',event=>{
    const card=event.target.closest('#works article,#works button');
    const title=card?.querySelector('h3')?.textContent?.trim().toUpperCase();
    if(title==='PINK PUNK') retry();
    if(event.target.closest('button[aria-label*="рус" i],button[aria-label*="english" i],button[aria-label*="switch" i]')) window.setTimeout(enhance,0);
  },true);

  new MutationObserver(()=>{
    const gallery=document.querySelector('.pink-punk-gallery');
    if(gallery) updateCopy(gallery);
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  injectStyles();
  window.addEventListener('load',enhance,{once:true});
  enhance();
})();