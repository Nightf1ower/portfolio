(() => {
  if (window.__portfolioUnifiedExceptionsV3) return;
  window.__portfolioUnifiedExceptionsV3 = true;
  window.__portfolioUnifiedExceptionsV2 = true;

  const VERSION = 'portfolio-unified-exceptions-3';
  const STYLE_ID = 'portfolio-unified-exceptions-style';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.dataset.version = VERSION;
  style.textContent = `
    .m10-modal{overflow-x:clip!important}
    .m10-modal .m10-dxs-zone{position:relative!important;left:50%!important;right:50%!important;box-sizing:border-box!important;width:100vw!important;max-width:100vw!important;margin-left:-50vw!important;margin-right:-50vw!important;padding-left:max(1rem,env(safe-area-inset-left))!important;padding-right:max(1rem,env(safe-area-inset-right))!important;background:#ef2b27!important;color:#050505!important}
    .m10-modal .m10-dxs-zone,.m10-modal .m10-dxs-zone *{font-family:Arial,Helvetica,sans-serif!important}
    .m10-modal .m10-dxs-zone>.m10-section,.m10-modal .m10-dxs-zone .m10-dxs-materials-intro{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;padding-top:clamp(4rem,7vw,7rem)!important;padding-bottom:clamp(4rem,7vw,7rem)!important}
    .m10-modal .m10-dxs-zone .m10-section-title,.m10-modal .m10-dxs-zone .m10-dxs-materials-title{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;margin-bottom:clamp(2rem,4vw,3.5rem)!important;font-family:Arial,Helvetica,sans-serif!important;line-height:.9!important;letter-spacing:.03em!important}
    .m10-modal .m10-dxs-zone .m10-project-copy,.m10-modal .m10-dxs-zone .m10-section-copy,.m10-modal .m10-dxs-zone .m10-copy-update,.m10-modal .m10-dxs-zone .m10-dxs-materials-copy,.m10-modal .m10-dxs-zone .m10-project-copy p,.m10-modal .m10-dxs-zone .m10-section-copy p,.m10-modal .m10-dxs-zone .m10-copy-update p{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;font:500 clamp(1rem,1.25vw,1.2rem)/1.45 Arial,Helvetica,sans-serif!important;letter-spacing:0!important;text-align:left!important}
    .m10-modal .m10-dxs-zone .m10-dxs-materials-copy{margin-top:0!important;margin-bottom:0!important}
    @media(max-width:640px){.m10-modal .m10-dxs-zone>.m10-section,.m10-modal .m10-dxs-zone .m10-dxs-materials-intro{padding-top:clamp(3rem,12vw,5rem)!important;padding-bottom:clamp(3rem,12vw,5rem)!important}}
  `;
  document.head.append(style);
})();
