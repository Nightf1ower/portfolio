(() => {
  if (window.__pinkPunkNativeRestoreV2) return;
  window.__pinkPunkNativeRestoreV2 = true;

  const VERSION = 'pink-punk-native-restore-2';
  const STYLE_ID = 'pink-punk-native-restore-style';

  function installStyles() {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.dataset.version = VERSION;
    style.textContent = `
      .pink-punk-fullscreen{
        background:#050505!important;
        background-image:linear-gradient(180deg,#9b0014 0%,#7d0012 18%,#56000d 35%,#320008 52%,#180004 69%,#090102 84%,#050505 100%)!important;
        background-repeat:no-repeat!important;
        background-size:100% 100%!important;
      }

      .pink-punk-fullscreen > div{
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0 clamp(1rem,3.2vw,4rem) clamp(4rem,8vw,8rem)!important;
      }

      .pink-punk-fullscreen > div > .sticky{
        position:fixed!important;
        top:0!important;
        left:0!important;
        right:0!important;
        z-index:1900000!important;
        box-sizing:border-box!important;
        display:flex!important;
        width:100vw!important;
        max-width:none!important;
        min-height:4rem!important;
        margin:0!important;
        padding:.72rem clamp(1rem,1.8vw,2rem)!important;
        background:#9b0014!important;
        color:#fff!important;
        border:0!important;
        border-bottom:1px solid rgba(255,255,255,.28)!important;
        transform:none!important;
        transition:none!important;
        animation:none!important;
        backdrop-filter:none!important;
        -webkit-backdrop-filter:none!important;
      }

      .pink-punk-fullscreen > div > .sticky button{
        background:#050505!important;
        color:#fff!important;
        border:0!important;
      }

      .pink-punk-fullscreen .pink-punk-gallery{
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        width:100%!important;
        max-width:none!important;
        height:auto!important;
        min-height:0!important;
        margin:0!important;
        padding-top:0!important;
      }

      .pink-punk-fullscreen .pink-punk-brand{
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        width:100%!important;
        max-width:none!important;
        min-height:0!important;
        height:auto!important;
        margin:0!important;
        padding:clamp(7rem,9vw,9rem) 0 clamp(2.5rem,4vw,4rem)!important;
        border:0!important;
      }

      .pink-punk-fullscreen .pink-punk-brand__title{
        display:block!important;
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        color:#fff!important;
        font:900 clamp(4.6rem,10.6vw,12rem)/.79 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.075em!important;
        text-transform:uppercase!important;
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
        background:transparent!important;
        color:#fff!important;
        font:900 .62rem/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.18em!important;
        text-transform:uppercase!important;
      }

      .pink-punk-fullscreen .pink-punk-brand__label{
        display:inline-flex!important;
        width:max-content!important;
        max-width:100%!important;
        margin:0 0 1.25rem!important;
        padding:.6rem .8rem!important;
        background:#050505!important;
        color:#fff!important;
        font:900 .64rem/1 Arial,Helvetica,sans-serif!important;
        letter-spacing:.2em!important;
        text-transform:uppercase!important;
      }

      .pink-punk-fullscreen .pink-punk-brand__copy{
        display:block!important;
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0!important;
        color:#fff!important;
        font:600 clamp(1.15rem,2vw,2rem)/1.28 Arial,Helvetica,sans-serif!important;
        letter-spacing:-.025em!important;
      }

      .pink-punk-fullscreen .pink-punk-section{
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        height:auto!important;
        min-height:0!important;
      }

      @media(max-width:820px){
        .pink-punk-fullscreen > div{padding-left:1rem!important;padding-right:1rem!important}
        .pink-punk-fullscreen > div > .sticky{min-height:3.65rem!important;padding:.62rem .75rem!important}
        .pink-punk-fullscreen .pink-punk-brand{padding-top:5.5rem!important}
        .pink-punk-fullscreen .pink-punk-brand__title{font-size:clamp(3.25rem,16vw,6.2rem)!important;line-height:.82!important}
      }
    `;
    document.head.append(style);
  }

  function restoreNode(node) {
    if (!(node instanceof HTMLElement)) return;
    node.classList.remove(
      'portfolio-stable-legacy-hidden',
      'portfolio-standard-source-hidden',
      'portfolio-legacy-intro-collapsed',
      'portfolio-intro-dedupe-hidden',
      'portfolio-pink-native-head-hidden'
    );
    node.style.removeProperty('display');
    node.style.removeProperty('height');
    node.style.removeProperty('min-height');
    node.style.removeProperty('max-height');
    node.style.removeProperty('visibility');
    node.style.removeProperty('overflow');
  }

  function ensureChips(brand) {
    let chips = brand.querySelector(':scope > .pink-punk-native-chips');
    if (!chips) {
      chips = document.createElement('div');
      chips.className = 'pink-punk-native-chips';
      const label = brand.querySelector('.pink-punk-brand__label');
      if (label) label.before(chips);
      else brand.append(chips);
    }
    const wanted = ['GRAPHICS','POSTERS','PRINTS'];
    if (chips.dataset.signature !== wanted.join('|')) {
      chips.dataset.signature = wanted.join('|');
      chips.replaceChildren(...wanted.map(text => {
        const chip = document.createElement('span');
        chip.className = 'pink-punk-native-chip';
        chip.textContent = text;
        return chip;
      }));
    }
  }

  function repair() {
    const gallery = document.querySelector('.pink-punk-gallery');
    if (!(gallery instanceof HTMLElement)) return false;
    const modal = gallery.closest('.pink-punk-fullscreen,.fixed.inset-0,[role="dialog"]');
    if (!(modal instanceof HTMLElement)) return false;

    modal.classList.add('pink-punk-fullscreen');

    // Remove the generic portfolio shell from Pink Punk completely.
    modal.querySelectorAll(':scope > .portfolio-stable-head,:scope > .portfolio-stable-intro').forEach(node => node.remove());

    let parent = gallery;
    while (parent && parent !== modal) {
      restoreNode(parent);
      parent = parent.parentElement;
    }

    const nativeHead = gallery.parentElement
      ? [...gallery.parentElement.children].find(node => node instanceof HTMLElement && node.classList.contains('sticky'))
      : null;
    restoreNode(nativeHead);

    const brand = gallery.querySelector('.pink-punk-brand');
    restoreNode(brand);
    if (brand) ensureChips(brand);

    gallery.querySelectorAll('.pink-punk-section,.pink-punk-section__grid,.pink-punk-frame').forEach(restoreNode);
    modal.dataset.pinkNativeRestored = VERSION;
    return true;
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      repair();
    });
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches('.pink-punk-gallery,.pink-punk-fullscreen') || node.querySelector('.pink-punk-gallery')) {
          schedule();
          return;
        }
      }
    }
  });

  installStyles();
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('load',schedule,{once:true});
  schedule();
})();