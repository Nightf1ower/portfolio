(() => {
  if (window.__projectWideLayoutFinalV3) return;
  window.__projectWideLayoutFinalV3 = true;
  window.__projectWideLayoutFinalV2 = true;

  const STYLE_ID = 'project-wide-layout-final-style';
  const VERSION = 'project-wide-layout-final-3';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.dataset.version = VERSION;
  style.textContent = `
    .portfolio-project-context{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:.55rem!important;box-sizing:border-box!important;width:100%!important;margin:clamp(1.25rem,2.3vw,2rem) 0 clamp(2.5rem,5vw,4.5rem)!important}
    .portfolio-project-context__chip{display:inline-flex!important;align-items:center!important;min-height:2rem!important;margin:0!important;padding:.55rem .72rem!important;border:1px solid currentColor!important;border-radius:0!important;background:transparent!important;color:inherit!important;font:900 .62rem/1 Arial,Helvetica,sans-serif!important;letter-spacing:.16em!important;text-transform:uppercase!important;white-space:nowrap!important}
    .zny-modal .portfolio-project-context{padding:0!important}.cr-modal .portfolio-project-context{color:#f5f1e8!important}
    .project9006-modal{box-sizing:border-box!important;width:100%!important;max-width:none!important;overflow-x:clip!important}
    .project9006-modal>.mx-auto,.project9006-modal>[class*="max-w-"],.project9006-modal .project9006-wide-root{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:auto!important;margin-right:auto!important}
    .project9006-modal .space-y-20,.project9006-modal section,.project9006-modal .project9006-brand,.project9006-modal .project9006-switch-layout,.project9006-modal .project9006-logo-pair,.project9006-modal .project9006-pendant-wrap,.project9006-modal .project9006-lookbook-wrap,.project9006-modal .project9006-posters-grid{box-sizing:border-box!important;width:100%!important;max-width:none!important}
    .project9006-modal .project9006-logo-sheet{box-sizing:border-box!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important}
    .project9006-modal .project9006-logo-sheet img,.project9006-modal .project9006-lookbook-card img,.project9006-modal .project9006-photoshoot-card img{width:100%!important;max-width:none!important;height:auto!important}
    .project9006-modal .project9006-pendant-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;width:100%!important;max-width:none!important}
    .project9006-modal .project9006-pendant-card:last-child{grid-column:1/-1!important;width:100%!important;max-width:none!important;justify-self:stretch!important}
    .m10-modal .m10-billboard-grid{box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:start!important;gap:clamp(.75rem,1.25vw,1.25rem)!important;width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important}
    .m10-modal .m10-billboard-center-row{display:contents!important;width:auto!important;margin:0!important}
    .m10-modal .m10-billboard-grid .m10-card,.m10-modal .m10-billboard-grid .m10-media{box-sizing:border-box!important;display:block!important;width:100%!important;max-width:none!important;min-width:0!important;height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:auto!important;margin:0!important;overflow:visible!important}
    .m10-modal .m10-billboard-grid img{position:static!important;display:block!important;width:100%!important;max-width:none!important;height:auto!important;max-height:none!important;margin:0!important;padding:0!important;object-fit:contain!important;transform:none!important}
    .m10-modal .m10-dxs-zone .m10-dxs-posters{box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;align-items:start!important;gap:clamp(.9rem,1.5vw,1.4rem)!important;width:100%!important;max-width:none!important;margin:0!important}
    .m10-modal .m10-dxs-zone .m10-dxs-posters>.m10-card,.m10-modal .m10-dxs-zone .m10-dxs-posters .m10-media,.m10-modal .m10-dxs-zone .m10-dxs-posters img{box-sizing:border-box!important;width:100%!important;max-width:none!important;min-width:0!important;height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:auto!important;margin:0!important;object-fit:contain!important}
    @media(min-width:1440px){.project9006-modal{padding-left:clamp(2rem,3vw,4rem)!important;padding-right:clamp(2rem,3vw,4rem)!important}}
    @media(max-width:1100px){.m10-modal .m10-billboard-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}.m10-modal .m10-dxs-zone .m10-dxs-posters{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:720px){.portfolio-project-context{gap:.4rem!important}.portfolio-project-context__chip{min-height:1.8rem!important;padding:.48rem .58rem!important;font-size:.56rem!important;letter-spacing:.12em!important}.project9006-modal .project9006-pendant-grid,.m10-modal .m10-dxs-zone .m10-dxs-posters{grid-template-columns:1fr!important}.project9006-modal .project9006-pendant-card:last-child{grid-column:auto!important}.m10-modal .m10-billboard-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:460px){.m10-modal .m10-billboard-grid{grid-template-columns:1fr!important}}
  `;
  document.head.append(style);
})();
