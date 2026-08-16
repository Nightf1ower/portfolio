(() => {
  if (window.__blandettoPrintLayoutRestoreV1) return;
  window.__blandettoPrintLayoutRestoreV1 = true;

  const STYLE_ID = 'blandetto-print-layout-restore-style';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .bf .bf-s[data-bf-section="prints"] .bf-g,
    .blandetto-modal [data-bf-section="prints"] .bf-g {
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      grid-auto-flow:row!important;
      align-items:start!important;
      gap:1rem!important;
      width:100%!important;
    }

    .bf .bf-s[data-bf-section="prints"] .bf-g > .bf-card,
    .blandetto-modal [data-bf-section="prints"] .bf-g > .bf-card {
      order:initial!important;
      grid-column:auto!important;
      grid-row:auto!important;
      grid-area:auto!important;
      width:100%!important;
      min-width:0!important;
      margin:0!important;
    }

    @media(max-width:900px){
      .bf .bf-s[data-bf-section="prints"] .bf-g,
      .blandetto-modal [data-bf-section="prints"] .bf-g {
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
      }
    }

    @media(max-width:560px){
      .bf .bf-s[data-bf-section="prints"] .bf-g,
      .blandetto-modal [data-bf-section="prints"] .bf-g {
        grid-template-columns:1fr!important;
      }
    }
  `;
  document.head.append(style);

  function restoreOrder() {
    const grids = document.querySelectorAll('.bf .bf-s[data-bf-section="prints"] .bf-g, .blandetto-modal [data-bf-section="prints"] .bf-g');
    grids.forEach(grid => {
      const cards = [...grid.children].filter(node => node instanceof HTMLElement && node.classList.contains('bf-card'));
      cards
        .map((card, index) => {
          const text = `${card.getAttribute('aria-label') || ''} ${card.textContent || ''}`;
          const src = card.querySelector('img')?.getAttribute('src') || '';
          const match = text.match(/PRINT\s*0?(\d+)/i) || src.match(/print[-_%20]*0?(\d+)/i);
          return { card, number: match ? Number(match[1]) : 1000 + index };
        })
        .sort((a,b) => a.number - b.number)
        .forEach(({card}) => grid.append(card));
    });
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      restoreOrder();
    });
  };

  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  addEventListener('load',schedule,{once:true});
  restoreOrder();
  [80,240,700].forEach(ms => setTimeout(schedule,ms));
})();
