(() => {
  if (window.__portfolioShellThemePinkFixV1) return;
  window.__portfolioShellThemePinkFixV1 = true;

  const VERSION = 'portfolio-shell-theme-pink-fix-1';
  const STYLE_ID = 'portfolio-shell-theme-pink-fix-style';

  const PINK_COPY = {
    ru: 'PinkPunk — бренд уличной одежды, объединяющий моду, музыку и современную молодежную культуру. В основе бренда — свобода самовыражения, оверсайз-силуэты, экспериментальная графика и стремление превратить одежду в визуальное продолжение характера человека. Бренд переосмысляет знакомые элементы стритвира, соединяя их с панк-эстетикой, яркими цветовыми решениями и собственным взглядом на современную уличную культуру.',
    en: 'PinkPunk is a streetwear brand that brings together fashion, music, and contemporary youth culture. Its identity is built around freedom of self-expression, oversized silhouettes, experimental graphics, and the idea of clothing as a visual extension of one’s personality. The brand reinterprets familiar streetwear elements through punk-inspired aesthetics, bold color combinations, and its own perspective on modern urban culture.',
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
      .portfolio-stable-head{
        background:var(--psh-bg,#fff)!important;
        color:var(--psh-fg,#050505)!important;
        border-bottom:1px solid currentColor!important;
      }

      .pink-punk-fullscreen{
        background-color:#050505!important;
        background-image:linear-gradient(180deg,#9b0014 0%,#7d0012 18%,#56000d 35%,#320008 52%,#180004 69%,#090102 84%,#050505 100%)!important;
        background-repeat:no-repeat!important;
        background-size:100% 100%!important;
      }
      .pink-punk-fullscreen .pink-punk-gallery{
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        width:100%!important;
        height:auto!important;
        min-height:0!important;
      }
      .pink-punk-fullscreen .pink-punk-section{
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        height:auto!important;
        min-height:0!important;
      }
      .pink-punk-fullscreen .pink-punk-brand{display:none!important}
      .pink-punk-fullscreen > .portfolio-stable-head{
        position:fixed!important;
        top:0!important;
        left:0!important;
        right:0!important;
        bottom:auto!important;
        background:#9b0014!important;
        color:#fff!important;
      }
      .pink-punk-fullscreen > .portfolio-stable-intro{
        --psi-bg:#9b0014!important;
        --psi-fg:#fff!important;
        background:#9b0014!important;
        color:#fff!important;
      }
      .pink-punk-fullscreen > div > .sticky.portfolio-pink-native-head-hidden{
        display:none!important;
        visibility:hidden!important;
        height:0!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        overflow:hidden!important;
      }
    `;
    document.head.append(style);
  }

  function syncHeadTheme(head) {
    if (!(head instanceof HTMLElement)) return;
    const modal = head.parentElement;
    if (!(modal instanceof HTMLElement)) return;
    const intro = modal.querySelector(':scope > .portfolio-stable-intro');
    let bg = intro?.style.getPropertyValue('--psi-bg')?.trim() || '';
    let fg = intro?.style.getPropertyValue('--psi-fg')?.trim() || '';

    if (modal.classList.contains('pink-punk-fullscreen')) {
      bg = '#9b0014';
      fg = '#fff';
    }
    if (!bg) {
      const css = getComputedStyle(modal);
      bg = css.backgroundColor && css.backgroundColor !== 'rgba(0, 0, 0, 0)' ? css.backgroundColor : '#fff';
    }
    if (!fg) fg = getComputedStyle(modal).color || '#050505';

    head.style.setProperty('--psh-bg', bg);
    head.style.setProperty('--psh-fg', fg);
  }

  function nativePinkHead(modal, gallery) {
    const inner = gallery.parentElement;
    if (!(inner instanceof HTMLElement)) return null;
    return [...inner.children].find(node => node instanceof HTMLElement && node.classList.contains('sticky') && node.querySelector('button')) || null;
  }

  function restorePinkContent(modal, gallery) {
    const safe = [gallery, ...gallery.querySelectorAll('.pink-punk-section,.pink-punk-section__grid,.pink-punk-frame')];
    safe.forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      node.classList.remove('portfolio-stable-legacy-hidden','portfolio-standard-source-hidden','portfolio-legacy-intro-collapsed');
    });

    let parent = gallery.parentElement;
    while (parent && parent !== modal) {
      parent.classList.remove('portfolio-stable-legacy-hidden','portfolio-standard-source-hidden','portfolio-legacy-intro-collapsed');
      parent = parent.parentElement;
    }
  }

  function ensurePinkHead(modal, gallery, nativeHead) {
    let head = modal.querySelector(':scope > .portfolio-stable-head');
    if (!head) {
      head = document.createElement('div');
      head.className = 'portfolio-stable-head';
      const label = document.createElement('span');
      label.className = 'portfolio-stable-head__label';
      label.textContent = 'PINK PUNK';
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'portfolio-stable-head__close';
      close.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const liveHead = nativePinkHead(modal, gallery);
        const liveClose = liveHead?.querySelector('button');
        if (liveClose) liveClose.click();
      });
      head.append(label, close);
      modal.prepend(head);
    }
    head.querySelector('.portfolio-stable-head__label').textContent = 'PINK PUNK';
    head.querySelector('.portfolio-stable-head__close').textContent = language() === 'ru' ? 'ЗАКРЫТЬ' : 'CLOSE';
    head.style.setProperty('--psh-bg','#9b0014');
    head.style.setProperty('--psh-fg','#fff');
    return head;
  }

  function ensurePinkIntro(modal, head) {
    let intro = modal.querySelector(':scope > .portfolio-stable-intro');
    if (!intro) {
      intro = document.createElement('section');
      intro.className = 'portfolio-stable-intro';
      intro.innerHTML = '<h1 class="portfolio-stable-intro__title"></h1><div class="portfolio-stable-intro__chips"></div><div class="portfolio-stable-intro__about"><p class="portfolio-stable-intro__about-label"></p><p class="portfolio-stable-intro__about-text"></p></div>';
      head.after(intro);
    } else if (head.nextElementSibling !== intro) {
      head.after(intro);
    }

    intro.classList.remove('portfolio-stable-legacy-hidden','portfolio-standard-source-hidden','portfolio-legacy-intro-collapsed');
    intro.style.setProperty('--psi-bg','#9b0014');
    intro.style.setProperty('--psi-fg','#fff');
    intro.querySelector('.portfolio-stable-intro__title').textContent = 'PINK PUNK';

    const chips = intro.querySelector('.portfolio-stable-intro__chips');
    const wanted = ['GRAPHICS','POSTERS','PRINTS'];
    if (chips.dataset.pinkSignature !== wanted.join('|')) {
      chips.dataset.pinkSignature = wanted.join('|');
      chips.replaceChildren(...wanted.map(text => {
        const span = document.createElement('span');
        span.className = 'portfolio-stable-intro__chip';
        span.textContent = text;
        return span;
      }));
    }

    intro.querySelector('.portfolio-stable-intro__about-label').textContent = language() === 'ru' ? 'О БРЕНДЕ' : 'ABOUT THE BRAND';
    intro.querySelector('.portfolio-stable-intro__about-text').textContent = PINK_COPY[language()];
    intro.querySelector('.portfolio-stable-intro__about').classList.remove('is-empty');
    return intro;
  }

  function repairPink() {
    const gallery = document.querySelector('.pink-punk-gallery');
    if (!(gallery instanceof HTMLElement)) return false;
    const modal = gallery.closest('.fixed.inset-0,.pink-punk-fullscreen');
    if (!(modal instanceof HTMLElement)) return false;

    modal.classList.add('pink-punk-fullscreen');
    restorePinkContent(modal, gallery);

    const nativeHead = nativePinkHead(modal, gallery);
    const head = ensurePinkHead(modal, gallery, nativeHead);
    ensurePinkIntro(modal, head);
    if (nativeHead) nativeHead.classList.add('portfolio-pink-native-head-hidden');
    syncHeadTheme(head);
    modal.dataset.portfolioPinkShellRepair = VERSION;
    return true;
  }

  function syncAllHeaders() {
    document.querySelectorAll('.portfolio-stable-head').forEach(syncHeadTheme);
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      repairPink();
      syncAllHeaders();
    });
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.pink-punk-gallery,.portfolio-stable-head,.portfolio-stable-intro') || node.querySelector('.pink-punk-gallery,.portfolio-stable-head,.portfolio-stable-intro')) {
          schedule();
          return;
        }
      }
    }
  });
  observer.observe(document.body,{childList:true,subtree:true});

  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  installStyles();
  repairPink();
  syncAllHeaders();
})();