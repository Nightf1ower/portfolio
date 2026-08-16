(() => {
  if (window.__project9006StandardIntroFixV1) return;
  window.__project9006StandardIntroFixV1 = true;

  const VERSION = 'project9006-standard-intro-fix-1';
  const STYLE_ID = 'project9006-standard-intro-fix-style';

  const COPY = {
    ru: {
      close: 'ЗАКРЫТЬ',
      about: 'О БРЕНДЕ',
      text: 'NINETY Z S — независимый творческий бренд, объединяющий одежду, графический дизайн и визуальные эксперименты.',
      chips: ['АЙДЕНТИКА', 'ПОДВЕСКА', 'ЛУКБУК', 'ПОСТЕРЫ'],
    },
    en: {
      close: 'CLOSE',
      about: 'ABOUT THE BRAND',
      text: 'NINETY Z S is an independent creative brand that brings together clothing, graphic design, and visual experimentation.',
      chips: ['IDENTITY', 'PENDANT', 'LOOKBOOK', 'POSTERS'],
    },
  };

  const language = () => (
    document.documentElement.lang === 'ru' || localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en'
  );

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .project9006-modal > .portfolio-standard-intro,
      .project9006-modal .portfolio-standard-intro[data-project="ninety-z-s"]{
        display:block!important;
        position:relative!important;
        z-index:2!important;
        box-sizing:border-box!important;
        width:100%!important;
        max-width:none!important;
        min-height:0!important;
        margin:0!important;
        padding:clamp(7rem,10vw,10rem) clamp(1rem,3.2vw,4rem) clamp(4.5rem,7vw,7rem)!important;
        background:#fff!important;
        color:#050505!important;
        opacity:1!important;
        visibility:visible!important;
        transform:none!important;
      }
      .project9006-modal .portfolio-standard-intro[data-project="ninety-z-s"] *{
        visibility:visible!important;
      }
      .project9006-modal .project9006-brand{
        display:none!important;
        height:0!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
      }
      .project9006-modal .portfolio-fixed-project-head-spacer,
      .project9006-modal .project9006-native-toolbar,
      .project9006-modal .project9006-toolbar{
        display:none!important;
      }
      .project9006-modal{
        padding-top:0!important;
        background:#050505!important;
      }
      @media(max-width:820px){
        .project9006-modal > .portfolio-standard-intro,
        .project9006-modal .portfolio-standard-intro[data-project="ninety-z-s"]{
          padding:clamp(6rem,22vw,7.5rem) 1rem clamp(3.5rem,14vw,5rem)!important;
        }
      }
    `;
    document.head.append(style);
  }

  function buildIntro(modal) {
    let intro = modal.querySelector('.portfolio-standard-intro[data-project="ninety-z-s"], .portfolio-standard-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.className = 'portfolio-standard-intro';
      intro.dataset.project = 'ninety-z-s';
      intro.innerHTML = `
        <div class="portfolio-standard-intro__inner">
          <h1 class="portfolio-standard-intro__title">NINETY Z S</h1>
          <div class="portfolio-standard-intro__chips"></div>
          <div class="portfolio-standard-intro__about">
            <p class="portfolio-standard-intro__about-label"></p>
            <p class="portfolio-standard-intro__about-text"></p>
          </div>
        </div>`;
    }

    intro.dataset.project = 'ninety-z-s';
    intro.classList.remove('portfolio-standard-source-hidden');
    let parent = intro.parentElement;
    while (parent && parent !== modal) {
      parent.classList?.remove('portfolio-standard-source-hidden');
      parent = parent.parentElement;
    }

    if (intro.parentElement !== modal) modal.prepend(intro);
    else {
      const head = modal.querySelector(':scope > .portfolio-standard-head');
      const desiredAnchor = head?.nextElementSibling;
      if (desiredAnchor !== intro) {
        if (head) head.after(intro);
        else modal.prepend(intro);
      }
    }

    const c = COPY[language()];
    const title = intro.querySelector('.portfolio-standard-intro__title');
    const chips = intro.querySelector('.portfolio-standard-intro__chips');
    const aboutLabel = intro.querySelector('.portfolio-standard-intro__about-label');
    const aboutText = intro.querySelector('.portfolio-standard-intro__about-text');
    if (title) title.textContent = 'NINETY Z S';
    if (chips) {
      const signature = c.chips.join('|');
      if (chips.dataset.signature !== signature) {
        chips.dataset.signature = signature;
        chips.replaceChildren(...c.chips.map(label => {
          const chip = document.createElement('span');
          chip.className = 'portfolio-standard-intro__chip';
          chip.textContent = label;
          return chip;
        }));
      }
    }
    if (aboutLabel) aboutLabel.textContent = c.about;
    if (aboutText) aboutText.textContent = c.text;

    modal.querySelectorAll('.project9006-brand').forEach(node => {
      node.classList.add('portfolio-standard-source-hidden');
      node.style.setProperty('display', 'none', 'important');
      node.style.setProperty('padding', '0', 'important');
      node.style.setProperty('margin', '0', 'important');
      node.style.setProperty('height', '0', 'important');
    });
  }

  function apply() {
    installStyles();
    const modal = document.querySelector('.project9006-modal');
    if (!modal) return;
    buildIntro(modal);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  };

  new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  new MutationObserver(schedule).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  addEventListener('popstate', schedule);
  addEventListener('load', schedule, { once:true });
  installStyles();
  apply();
  [40,120,300,700,1400].forEach(delay => setTimeout(schedule, delay));
})();
