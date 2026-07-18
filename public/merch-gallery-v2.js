(() => {
  const REPO='Nightf1ower/portfolio', BRANCH='main', V='merch-4';
  const IMG=/\.(png|jpe?g|webp|gif|avif)$/i;
  const ROOT='public/works/merch/yablochko';
  let modal=null, bodyOverflow='', htmlOverflow='';
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n};
  const fileName=(x)=>(x.path||'').split('/').pop().toLowerCase();
  const number=(x)=>{const m=fileName(x).match(/(?:^|[-_ ])0?(\d+)(?:\D|$)/);return m?Number(m[1]):999};

  function styles(){
    if(document.getElementById('merch-v2-style'))return;
    const s=el('style');s.id='merch-v2-style';s.textContent=`
      html:has(.mv2-modal),body:has(.mv2-modal){overflow:hidden!important}
      .mv2-modal{position:fixed;inset:0;z-index:380;overflow:auto;background:#87CEEB;color:#050505;padding:1.25rem 1rem 5rem;opacity:0;transition:opacity .55s ease}
      .mv2-modal.is-open{opacity:1}.mv2-inner{width:min(100%,76rem);margin:auto;transform:translateY(20px);opacity:0;transition:transform .65s ease,opacity .65s ease}.mv2-modal.is-open .mv2-inner{transform:none;opacity:1}
      .mv2-head{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:.7rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.3);background:rgba(135,206,235,.95);backdrop-filter:blur(12px)}
      .mv2-label,.mv2-close,.mv2-count,.mv2-empty{font-size:.68rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase}.mv2-label,.mv2-close{background:#050505;color:#fff;padding:.55rem .85rem;border:0}
      .mv2-hero{padding:3.5rem 0 4.5rem}.mv2-kicker{font-size:.72rem;font-weight:900;letter-spacing:.3em;text-transform:uppercase}.mv2-title{max-width:15ch;margin:.8rem 0 0;font-size:clamp(3rem,7vw,8rem);font-weight:900;line-height:.84;letter-spacing:-.08em;text-transform:uppercase}
      .mv2-section{border-top:1px solid rgba(5,5,5,.3);padding-top:1.25rem;margin-top:5rem}.mv2-section:first-of-type{margin-top:0}.mv2-section-head{display:flex;justify-content:space-between;align-items:end;gap:1rem;margin-bottom:1.25rem}.mv2-h{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.075em}.mv2-count{color:rgba(5,5,5,.55)}
      .mv2-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.mv2-card{border:0;background:transparent;padding:0;cursor:zoom-in}.mv2-media{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}.mv2-card img{width:100%;height:100%;display:block;object-fit:contain;padding:0}
      .mv2-brochure-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}.mv2-brochure-card .mv2-media{aspect-ratio:4/3}.mv2-layer{position:absolute;inset:0;opacity:0;transition:opacity .45s ease}.mv2-brochure-card:hover .mv2-layer{opacity:1}
      .mv2-print-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.mv2-print-grid .mv2-feature{grid-column:1/-1;width:min(100%,58rem);justify-self:center}
      .mv2-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;width:min(100%,58rem);margin:0 auto}.mv2-feature-grid .mv2-feature{grid-column:1/-1;width:min(100%,46rem);justify-self:center}.mv2-feature-grid .mv2-feature.is-bottom{order:2}.mv2-compact-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;width:min(100%,58rem);margin:0 auto}.mv2-compact-grid .mv2-feature{grid-column:1/-1;width:min(100%,46rem);justify-self:center}
      .mv2-empty{padding:3rem;color:rgba(5,5,5,.55)}.mv2-light{position:fixed;inset:0;z-index:480;background:rgba(0,0,0,.93);display:flex;align-items:center;justify-content:center;padding:1rem}.mv2-light img{max-width:92vw;max-height:90vh;object-fit:contain}.mv2-light button{position:absolute;top:1rem;right:1rem;border:0;background:#fff;padding:.7rem 1rem;font-weight:900}
      @media(max-width:760px){.mv2-grid,.mv2-print-grid,.mv2-brochure-grid,.mv2-feature-grid,.mv2-compact-grid{grid-template-columns:1fr}.mv2-feature-grid .mv2-feature,.mv2-compact-grid .mv2-feature,.mv2-print-grid .mv2-feature{grid-column:auto;width:100%}.mv2-section-head{display:block}.mv2-count{margin-top:.7rem}}
    `;document.head.append(s)
  }

  async function folder(name){
    const url=`https://api.github.com/repos/${REPO}/contents/${ROOT}/${name}?ref=${BRANCH}&v=${Date.now()}`;
    const r=await fetch(url,{headers:{Accept:'application/vnd.github+json'}});
    if(!r.ok)return[];
    const data=await r.json();
    return (Array.isArray(data)?data:[]).filter(x=>x.type==='file'&&IMG.test(x.name||x.path||'')).map(x=>({path:x.path,url:x.download_url})).sort((a,b)=>number(a)-number(b));
  }
  async function assets(){const [brochure,prints,posters,ads,billboards]=await Promise.all([folder('brochure'),folder('print'),folder('poster'),folder('ad'),folder('billboard')]);return{brochure,prints,posters,ads,billboards}}
  function light(items,i=0){if(!items.length)return;const o=el('div','mv2-light'),b=el('button','', 'CLOSE'),im=el('img');const draw=()=>im.src=items[i].url;o.onclick=()=>o.remove();b.onclick=()=>o.remove();im.onclick=e=>{e.stopPropagation();i=(i+1)%items.length;draw()};o.append(b,im);document.body.append(o);draw()}
  function card(item,items,index,cls=''){const b=el('button',`mv2-card ${cls}`.trim()),m=el('div','mv2-media'),im=el('img');im.src=item.url;im.alt=fileName(item);m.append(im);b.append(m);b.onclick=()=>light(items,index);return b}
  function brochure(items){const g=el('div','mv2-brochure-grid');if(!items.length){g.append(el('p','mv2-empty','FILES NOT FOUND'));return g}[[1,3],[2,4]].forEach(([baseNo,hoverNo])=>{const base=items.find(x=>number(x)===baseNo),hover=items.find(x=>number(x)===hoverNo);if(!base)return;const b=el('button','mv2-card mv2-brochure-card'),m=el('div','mv2-media'),im=el('img');im.src=base.url;m.append(im);if(hover){const h=el('img','mv2-layer');h.src=hover.url;m.append(h)}b.append(m);b.onclick=()=>light([base,hover].filter(Boolean),0);g.append(b)});return g}
  function orderedPrints(items){const order=[1,4,2,3],sorted=order.map(n=>items.find(x=>number(x)===n)).filter(Boolean),g=el('div','mv2-print-grid');sorted.forEach((x,i)=>g.append(card(x,sorted,i,number(x)===3?'mv2-feature':'')));return g}
  function featureBottom(items,featureNo){const sorted=[...items].sort((a,b)=>number(a)-number(b)),feature=sorted.find(x=>number(x)===featureNo),rest=sorted.filter(x=>x!==feature),g=el('div','mv2-feature-grid');rest.forEach((x,i)=>g.append(card(x,sorted,sorted.indexOf(x))));if(feature)g.append(card(feature,sorted,sorted.indexOf(feature),'mv2-feature is-bottom'));return g}
  function featureTop(items,featureNo){const sorted=[...items].sort((a,b)=>number(a)-number(b)),feature=sorted.find(x=>number(x)===featureNo),rest=sorted.filter(x=>x!==feature),g=el('div','mv2-compact-grid');if(feature)g.append(card(feature,sorted,sorted.indexOf(feature),'mv2-feature'));rest.forEach(x=>g.append(card(x,sorted,sorted.indexOf(x))));return g}
  function regular(items){const g=el('div','mv2-compact-grid');items.forEach((x,i)=>g.append(card(x,items,i)));return g}
  function section(title,items,node){const s=el('section','mv2-section'),h=el('div','mv2-section-head');h.append(el('h2','mv2-h',title),el('p','mv2-count',`${items.length} / ${items.length}`));s.append(h,node);return s}
  function close(){modal?.classList.remove('is-open');setTimeout(()=>{modal?.remove();modal=null;document.body.style.overflow=bodyOverflow;document.documentElement.style.overflow=htmlOverflow},420)}
  async function open(){styles();modal?.remove();bodyOverflow=document.body.style.overflow;htmlOverflow=document.documentElement.style.overflow;document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';modal=el('div','mv2-modal');const inner=el('div','mv2-inner'),head=el('div','mv2-head'),closeBtn=el('button','mv2-close','ЗАКРЫТЬ');closeBtn.onclick=close;head.append(el('p','mv2-label','MERCH'),closeBtn);const lang=localStorage.getItem('site-language')==='ru'?'ru':'en',hero=el('section','mv2-hero');hero.append(el('p','mv2-kicker',lang==='ru'?'ЯБЛОЧКО ЗЕЛЕНОЕ':'YABLOCHKO ZELENOE'),el('h1','mv2-title',lang==='ru'?'Разработка мерча к альбому музыканта «Яблочко Зеленое»':'Merchandise Design for the Album “Yablochko Zelenoe”'));const loading=el('p','mv2-empty','LOADING ASSETS...');inner.append(head,hero,loading);modal.append(inner);document.body.append(modal);requestAnimationFrame(()=>modal.classList.add('is-open'));try{const groups=await assets();loading.remove();inner.append(section('BROCHURE',groups.brochure,brochure(groups.brochure)),section('PRINTS',groups.prints,orderedPrints(groups.prints)),section('POSTERS',groups.posters,featureBottom(groups.posters,3)),section('ADS',groups.ads,featureTop(groups.ads,4)),section('BILLBOARDS',groups.billboards,regular(groups.billboards)))}catch(e){loading.textContent=`LOAD ERROR: ${e.message}`}}
  document.addEventListener('click',e=>{const card=e.target.closest('#works article,#works button');if(!card)return;const title=(card.querySelector('h3')?.textContent||'').toUpperCase().replace(/[^A-ZА-Я0-9]/g,'');if(title!=='MERCH')return;e.preventDefault();e.stopImmediatePropagation();open()},true)
})();
