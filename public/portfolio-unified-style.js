(() => {
  if (window.__portfolioUnifiedStyleV5) return;
  window.__portfolioUnifiedStyleV5 = true;
  window.__portfolioUnifiedStyleV4 = true;

  const VERSION = 'portfolio-unified-style-5';
  const STYLE_ID = 'portfolio-unified-style-v5';
  const MODAL_SELECTOR = [
    '.m10-modal','.stk-modal','.posters-modal','.su-modal','.vtb-modal','.bf','.blandetto-modal','.fable-modal','.zny-modal',
    '.album-covers-modal','.collages-modal','.project9006-modal','.pcg-modal','.pag-modal','.cr-modal','.anka-peresild-modal'
  ].join(',');

  ['portfolio-unified-style-v1','portfolio-unified-style-v2','portfolio-unified-style-v3','portfolio-unified-style-v4','portfolio-unified-style-v5']
    .forEach(id => document.getElementById(id)?.remove());

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.dataset.version = VERSION;
  style.textContent = `
    :root{--portfolio-font:Arial,Helvetica,sans-serif;--portfolio-title-tracking:.025em;--portfolio-section-title-tracking:.03em;--portfolio-title-line:.92;--portfolio-copy-line:1.45;--portfolio-copy-size:clamp(1rem,1.25vw,1.2rem);--portfolio-section-space:clamp(4rem,7vw,7rem);--portfolio-block-gap:clamp(2rem,4vw,3.5rem)}
    html,body,button,input,textarea,select,#works,#works *{font-family:var(--portfolio-font)!important}
    :where(${MODAL_SELECTOR}),:where(${MODAL_SELECTOR}) *{font-family:var(--portfolio-font)!important}
    :where(${MODAL_SELECTOR})>:where([class$="-inner"],[class*="-inner "]),:where(${MODAL_SELECTOR}) :where(.m10-inner,.stk-inner,.posters-inner,.su-inner,.vtb-inner,.bf-i,.blandetto-inner,.fable-inner,.zny-inner,.album-covers-inner,.collages-inner,.project9006-inner,.pag-inner,.pcg-inner,.cr-inner,.anka-peresild-inner){box-sizing:border-box!important;width:100%!important;max-width:none!important}
    :where(${MODAL_SELECTOR}) :where(h1,h2,h3){box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;letter-spacing:var(--portfolio-title-tracking)!important;line-height:var(--portfolio-title-line)!important}
    :where(${MODAL_SELECTOR}) :where([class*="section-title"],[class*="project-title"],[class*="block-title"],[class*="group-title"],section>h2,section>h3){width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;margin-bottom:var(--portfolio-block-gap)!important;letter-spacing:var(--portfolio-section-title-tracking)!important;line-height:.9!important}
    :where(${MODAL_SELECTOR}) :where([class*="description"],[class*="project-copy"],[class*="section-copy"],[class*="intro-copy"],[class*="about-copy"],[class*="copy-block"],.stk-project-copy,.su-copy,.vtb-copy,.m10-copy,.bf-brand-copy,.bf-note,.project9006-brand-copy,.project9006-section-copy){box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;font-size:var(--portfolio-copy-size)!important;font-weight:500!important;line-height:var(--portfolio-copy-line)!important;letter-spacing:0!important;text-align:left!important}
    :where(${MODAL_SELECTOR}) section>p:not([class*="label"]):not([class*="count"]):not([class*="subtitle"]):not([class*="hint"]){width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;font-size:var(--portfolio-copy-size)!important;line-height:var(--portfolio-copy-line)!important;letter-spacing:0!important}
    :where(${MODAL_SELECTOR}) :where([class$="-inner"],[class*="-inner "])>:where(section,[class$="-section"],[class*="-section "],[class$="-project"],[class*="-project "]){padding-top:var(--portfolio-section-space)!important;padding-bottom:var(--portfolio-section-space)!important}
    :where(${MODAL_SELECTOR}) :where([class*="group"]+[class*="group"]){margin-top:var(--portfolio-section-space)!important}
    .bf .bf-i{width:100%!important;max-width:none!important;margin-inline:0!important}.bf .bf-brand{padding-top:var(--portfolio-section-space)!important;padding-bottom:var(--portfolio-section-space)!important}.bf .bf-brand-title{width:100%!important;max-width:none!important;line-height:var(--portfolio-title-line)!important;letter-spacing:var(--portfolio-title-tracking)!important}.bf .bf-t{width:100%!important;max-width:none!important;margin-bottom:var(--portfolio-block-gap)!important;line-height:.9!important;letter-spacing:var(--portfolio-section-title-tracking)!important}.bf .bf-brand-copy,.bf .bf-note{box-sizing:border-box!important;width:100%!important;max-width:none!important;color:inherit!important;font-size:var(--portfolio-copy-size)!important;font-weight:500!important;line-height:var(--portfolio-copy-line)!important;letter-spacing:0!important;text-align:left!important}.bf .bf-note{margin:0 0 var(--portfolio-block-gap)!important}.bf .bf-s{padding-top:var(--portfolio-section-space)!important;padding-bottom:var(--portfolio-section-space)!important}.bf .bf-s+.bf-s{margin-top:0!important}
    .project9006-modal .project9006-brand{padding-top:var(--portfolio-section-space)!important;padding-bottom:var(--portfolio-section-space)!important}.project9006-modal .project9006-brand-title{width:100%!important;max-width:none!important;line-height:var(--portfolio-title-line)!important;letter-spacing:var(--portfolio-title-tracking)!important}.project9006-modal section h3,.project9006-modal .project9006-section-title{width:100%!important;max-width:none!important;margin-bottom:var(--portfolio-block-gap)!important;line-height:.9!important;letter-spacing:var(--portfolio-section-title-tracking)!important}.project9006-modal .project9006-brand-copy,.project9006-modal .project9006-section-copy{box-sizing:border-box!important;width:100%!important;max-width:none!important;font-size:var(--portfolio-copy-size)!important;font-weight:500!important;line-height:var(--portfolio-copy-line)!important;letter-spacing:0!important;text-align:left!important}.project9006-modal .project9006-section-copy{margin:0 0 var(--portfolio-block-gap)!important}.project9006-modal section{padding-top:var(--portfolio-section-space)!important;padding-bottom:var(--portfolio-section-space)!important}
    #works h3{letter-spacing:.018em!important;line-height:.95!important}
    @media(max-width:640px){:root{--portfolio-title-tracking:.018em;--portfolio-section-title-tracking:.022em;--portfolio-section-space:clamp(3rem,12vw,5rem)}}
  `;
  document.head.append(style);
})();
