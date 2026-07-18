(() => {
  const REPO='Nightf1ower/portfolio', BRANCH='main', V='merch-3';
  const IMG=/\.(png|jpe?g|webp|gif|avif)$/i;
  const ROOT='public/works/merch/yablochko';
  let modal=null, bodyOverflow='', htmlOverflow='';
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n};
  const src=(path)=>`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${path}?v=${V}`;

  function styles(){if(document.getElementById('merch-v2-style'))return;const s=el('style');s.id='merch-v2-style';s.textContent=`
  html:has(.mv2-modal),body:has(.mv2-modal){overflow:hidden!important}.mv2-modal{position:fixed;inset:0;z-index:380;overflow:auto;background:#87CEEB;color:#050505;padding:1.25rem 1rem 5rem}.mv2-inner{width:min(100%,82rem);margin:auto}.mv2-head{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:.7rem 0 1rem;border-bottom:1px solid rgba(5,5,5,.3);background:rgba(135,206,235,.95);backdrop-filter:blur(12px)}.mv2-label,.mv2-close,.mv2-count,.mv2-empty{font-size:.68rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase}.mv2-label,.mv2-close{background:#050505;color:#fff;padding:.55rem .85rem;border:0}.mv2-hero{padding:3.5rem 0 4.5rem}.mv2-kicker{font-size:.72rem;font-weight:900;letter-spacing:.3em;text-transform:uppercase}.mv2-title{max-width:15ch;margin:.8rem 0 0;font-size:clamp(3rem,7vw,8rem);font-weight:900;line-height:.84;letter-spacing:-.08em;text-transform:uppercase}.mv2-section{border-top:1px solid rgba(5,5,5,.3);padding-top:1.25rem;margin-top:5rem}.mv2-section:first-of-type{margin-top:0}.mv2-section-head{display:flex;justify-content:space-between;align-items:end;gap:1rem;margin-bottom:1.25rem}.mv2-h{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.075em}.mv2-count{color:rgba(5,5,5,.55)}.mv2-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.mv2-card{border:0;background:rgba(255,255,255,.72);padding:0;cursor:zoom-in}.mv2-media{position:relative;aspect-ratio:1/1;overflow:hidden;display:flex;align-items:center;justify-content:center}.mv2-card img{width:100%;height:100%;display:block;object-fit:contain;padding:.75rem}.mv2-brochure{width:min(100%,58rem);margin:auto}.mv2-brochure .mv2-media{aspect-ratio:4/3}.mv2-layer{position:absolute;inset:0;opacity:0;transition:opacity .5s ease}.mv2-layer.active{opacity:1}.mv2-empty{padding:3rem;background:rgba(255,255,255,.65);color:rgba(5,5,5,.55)}.mv2-light{position:fixed;inset:0;z-index:480;background:rgba(0,0,0,.93);display:flex;align-items:center;justify-content:center;padding:1rem}.mv2-light img{max-width:92vw;max-height:90vh;object-fit:contain}.mv2-light button{position:absolute;top:1rem;right:1rem;border:0;background:#fff;padding:.7rem 1rem;font-weight:900}@media(max-width:900px){.mv2-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.mv2-grid{grid-template-columns:1fr}.mv2-section-head{display:block}.mv2-count{margin-top:.7rem}}
  `;document.head.append(s)}

  async function folder(name){
    const url=`https://api.github.com/repos/${REPO}/contents/${ROOT}/${name}?ref=${BRANCH}&v=${Date.now()}`;
    const r=await fetch(url,{headers:{Accept:'application/vnd.github+json'}});
    if(!r.ok) return [];
    const data=await r.json();
    return (Array.isArray(data)?data:[])
      .filter(x=>x.type==='file'&&IMG.test(x.name||x.path||''))
      .map(x=>({path:x.path,url:x.download_url||src(x.path)}))
      .sort((a,b)=>a.path.localeCompare(b.path,undefined,{numeric:true}));
  }

  async function assets(){
    const [brochure,prints,posters,ads,billboards]=await Promise.all([
      folder('brochure'),folder('print'),folder('poster'),folder('ad'),folder('billboard')
    ]);
    return {brochure,prints,posters,ads,billboards};
  }

  function light(items,i=0){if(!items.length)return;const o=el('div','mv2-light'),b=el('button','', 'CLOSE'),im=el('img');const draw=()=>im.src=items[i].url||src(items[i].path);o.onclick=()=>o.remove();b.onclick=()=>o.remove();im.onclick=e=>{e.stopPropagation();i=(i+1)%items.length;draw()};o.append(b,im);document.body.append(o);draw()}
  function grid(items){const g=el('div','mv2-grid');if(!items.length){g.append(el('p','mv2-empty','FILES NOT FOUND'));return g}items.forEach((x,i)=>{const b=el('button','mv2-card'),m=el('div','mv2-media'),im=el('img');im.src=x.url||src(x.path);im.alt=x.path.split('/').pop();m.append(im);b.append(m);b.onclick=()=>light(items,i);g.append(b)});return g}
  function brochure(items){if(!items.length)return grid(items);const b=el('button','mv2-card mv2-brochure'),m=el('div','mv2-media'),base=el('img');base.src=items[0].url||src(items[0].path);m.append(base);const layers=items.slice(1).map(x=>{const im=el('img','mv2-layer');im.src=x.url||src(x.path);m.append(im);return im});let t=null,i=0;const show=()=>{layers.forEach((x,j)=>x.classList.toggle('active',j===i));i=(i+1)%Math.max(1,layers.length)};b.onmouseenter=()=>{if(!layers.length)return;i=0;show();t=setInterval(show,900)};b.onmouseleave=()=>{clearInterval(t);layers.forEach(x=>x.classList.remove('active'))};b.onclick=()=>light(items,0);b.append(m);return b}
  function section(title,items,node){const s=el('section','mv2-section'),h=el('div','mv2-section-head');h.append(el('h2','mv2-h',title),el('p','mv2-count',`${items.length} / ${items.length}`));s.append(h,node);return s}
  function close(){modal?.remove();modal=null;document.body.style.overflow=bodyOverflow;document.documentElement.style.overflow=htmlOverflow}
  async function open(){styles();modal?.remove();bodyOverflow=document.body.style.overflow;htmlOverflow=document.documentElement.style.overflow;document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';modal=el('div','mv2-modal');const inner=el('div','mv2-inner'),head=el('div','mv2-head'),closeBtn=el('button','mv2-close','ЗАКРЫТЬ');closeBtn.onclick=close;head.append(el('p','mv2-label','MERCH'),closeBtn);const lang=localStorage.getItem('site-language')==='ru'?'ru':'en',hero=el('section','mv2-hero');hero.append(el('p','mv2-kicker',lang==='ru'?'ЯБЛОЧКО ЗЕЛЕНОЕ':'YABLOCHKO ZELENOE'),el('h1','mv2-title',lang==='ru'?'Разработка мерча к альбому музыканта «Яблочко Зеленое»':'Merchandise Design for the Album “Yablochko Zelenoe”'));const loading=el('p','mv2-empty','LOADING ASSETS...');inner.append(head,hero,loading);modal.append(inner);document.body.append(modal);try{const groups=await assets();loading.remove();inner.append(section('BROCHURE',groups.brochure,brochure(groups.brochure)),section('PRINTS',groups.prints,grid(groups.prints)),section('POSTERS',groups.posters,grid(groups.posters)),section('ADS',groups.ads,grid(groups.ads)),section('BILLBOARDS',groups.billboards,grid(groups.billboards)))}catch(e){loading.textContent=`LOAD ERROR: ${e.message}`}}
  document.addEventListener('click',e=>{const card=e.target.closest('#works article,#works button');if(!card)return;const title=(card.querySelector('h3')?.textContent||'').toUpperCase().replace(/[^A-ZА-Я0-9]/g,'');if(title!=='MERCH')return;e.preventDefault();e.stopImmediatePropagation();open()},true)
})();
