(() => {
  if (window.__portfolioContentMediaSpacingV2) return;
  window.__portfolioContentMediaSpacingV2 = true;
  window.__portfolioContentMediaSpacingV1 = true;

  const VERSION = 'portfolio-content-media-spacing-2';
  const STYLE_ID = 'portfolio-content-media-spacing-style';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.dataset.version = VERSION;
  style.textContent = `
    .bf .bf-capg{row-gap:clamp(2.25rem,4vw,3.5rem)!important}
    .bf .bf-capg>.bf-card{display:flex!important;flex-direction:column!important;align-items:stretch!important;overflow:visible!important}
    .bf .bf-capg>.bf-card>img{flex:0 0 auto!important}
    .bf .bf-capg>.bf-card>.bf-p{margin:.85rem 0 0!important;padding:0 0 .35rem!important;line-height:1.35!important}
    .vtb-modal .vtb-print-copy,.m10-modal .m10-section-copy,.m10-modal .m10-copy-update,.m10-modal .m10-dxs-materials-copy,.bf .bf-note,.stk-modal .stk-project-copy,.fable-modal .fable-section-description,.zny-modal .zny-section-copy,.project9006-modal .project9006-section-copy{margin-bottom:clamp(2.25rem,4vw,3.5rem)!important}
    :where(.m10-modal,.stk-modal,.posters-modal,.su-modal,.vtb-modal,.bf,.project9006-modal,.fable-modal,.zny-modal,.album-covers-modal,.collages-modal) figcaption,
    :where(.m10-modal,.stk-modal,.posters-modal,.su-modal,.vtb-modal,.bf,.project9006-modal,.fable-modal,.zny-modal,.album-covers-modal,.collages-modal) [class*="caption"]{box-sizing:border-box!important;display:block!important;width:100%!important;margin-top:.85rem!important;margin-bottom:1.5rem!important;padding-bottom:0!important;line-height:1.35!important}
    @media(max-width:820px){.bf .bf-capg{row-gap:2.75rem!important}.bf .bf-capg>.bf-card>.bf-p{margin-top:.9rem!important;margin-bottom:0!important;padding-bottom:.5rem!important}.vtb-modal .vtb-print-copy,.m10-modal .m10-section-copy,.m10-modal .m10-copy-update,.m10-modal .m10-dxs-materials-copy,.bf .bf-note,.stk-modal .stk-project-copy,.fable-modal .fable-section-description,.zny-modal .zny-section-copy,.project9006-modal .project9006-section-copy{margin-bottom:clamp(2.75rem,10vw,4.25rem)!important}:where(.m10-modal,.stk-modal,.posters-modal,.su-modal,.vtb-modal,.bf,.project9006-modal,.fable-modal,.zny-modal,.album-covers-modal,.collages-modal) figcaption,:where(.m10-modal,.stk-modal,.posters-modal,.su-modal,.vtb-modal,.bf,.project9006-modal,.fable-modal,.zny-modal,.album-covers-modal,.collages-modal) [class*="caption"]{margin-top:.9rem!important;margin-bottom:2rem!important}}
  `;
  document.head.append(style);
})();
