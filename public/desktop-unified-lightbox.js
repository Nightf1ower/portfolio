(() => {
  if (window.__desktopUnifiedLightboxV2) return;
  window.__desktopUnifiedLightboxV2 = true;

  const VERSION = 'desktop-unified-lightbox-2';
  const STYLE_ID = 'desktop-unified-lightbox-style';
  const MODAL_SELECTOR = [
    '.zny-modal','.fable-modal','.pink-punk-fullscreen','.cr-modal','.blandetto-modal','.bf',
    '.project9006-modal','.pcg-modal','.pag-modal','.mc-modal','.m10-modal','.stk-modal','.lcg-modal',
    '.album-covers-modal','.su-modal','.anka-peresild-modal','.vtb-modal','.collages-modal'
  ].join(',');
  const CONTROL_SELECTOR = [
    '.zny-close','.fable-close','.su-close','.vtb-close','.cr-close','.mc-close','.stk-close',
    '.pcg-close','.lcg-close','.pag-close','.blandetto-close','.bf-close','.bf-x',
    '.anka-peresild-close','.album-covers-close','.project9006-toolbar__close','.project9006-close',
    '.p9006-close','.desktop-project-navigation','.project-scroll-top','a','input','select','textarea'
  ].join(',');
  const GROUP_SELECTOR = [
    '[data-images]','[data-hover-src]','[data-worn-src]','[data-alt-src]','[data-full]',
    '.cr-card','.zny-card','.fable-card','.bf-card','.blandetto-card','.m10-card','.mc-card',
    '.su-card','.su-concept-main','.su-concept-step','.vtb-card','.stk-card','.pcg-card','.pag-card',
    '.lcg-card','.album-covers-card','.anka-peresild-card','.project9006-logo-card',
    '.project9006-logo-sheet','.project9006-merch-media','.project9006-photoshoot-card','.project9006-poster-card',
    '.pink-punk-frame','.pink-punk-frame--hover','button[class*="card"]'
  ].join(',');
  const SECTION_SELECTOR = [
    'section','[data-section]','.zny-section','.fable-section','.cr-section','.mc-section','.m10-section',
    '.su-section','.vtb-section','.stk-section','.pcg-section','.pag-section','.lcg-row','.bf-s'
  ].join(',');
  const WHOLE_PROJECT_GALLERY = '.cr-modal,.mc-modal,.m10-modal';

  let overlay = null;
  let sources = [];
  let index = 0;
  let previousFocus = null;
  const isDesktop = () => innerWidth > 820 && matchMedia('(hover:hover) and (pointer:fine)').matches;

  function installStyles(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');s.id=STYLE_ID;s.dataset.version=VERSION;s.textContent=`
      @media(hover:hover) and (pointer:fine) and (min-width:821px){${MODAL_SELECTOR} img:not(.desktop-unified-lightbox__image),${MODAL_SELECTOR} ${GROUP_SELECTOR}{cursor:zoom-in}}
      .desktop-unified-lightbox{position:fixed;inset:0;z-index:3000000;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(.75rem,2vw,1.5rem);box-sizing:border-box;width:100vw;height:100dvh;padding:max(1rem,env(safe-area-inset-top)) max(1rem,env(safe-area-inset-right)) max(1rem,env(safe-area-inset-bottom)) max(1rem,env(safe-area-inset-left));background:rgba(0,0,0,.975);color:#fff;overflow:hidden;opacity:0;transition:opacity .16s ease}
      .desktop-unified-lightbox.is-open{opacity:1}.desktop-unified-lightbox__stage{position:relative;display:flex;align-items:center;justify-content:center;min-width:0;height:calc(100dvh - 2rem);overflow:hidden}
      .desktop-unified-lightbox__image{display:block;width:auto;height:auto;max-width:100%;max-height:92dvh;object-fit:contain;user-select:none;-webkit-user-drag:none;opacity:1;transform:translateX(0);transition:opacity .13s ease,transform .15s cubic-bezier(.2,.8,.2,1)}
      .desktop-unified-lightbox__image.is-changing{opacity:0;transform:translateX(var(--du-direction,0px))}
      .desktop-unified-lightbox__nav,.desktop-unified-lightbox__close{border:1px solid rgba(255,255,255,.82);border-radius:0;background:#050505;color:#fff;cursor:pointer;font-family:Arial,Helvetica,sans-serif;font-weight:900;transition:background-color .14s ease,color .14s ease,transform .14s ease}
      .desktop-unified-lightbox__nav{display:grid;place-items:center;width:3.6rem;height:3.6rem;font-size:1.6rem}.desktop-unified-lightbox__nav:hover,.desktop-unified-lightbox__close:hover{background:#a6ff00;color:#050505}.desktop-unified-lightbox__nav:active,.desktop-unified-lightbox__close:active{transform:scale(.97)}
      .desktop-unified-lightbox__close{position:absolute;top:max(1rem,env(safe-area-inset-top));right:max(1rem,env(safe-area-inset-right));z-index:2;min-height:2.9rem;padding:.75rem 1rem;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase}
      .desktop-unified-lightbox__counter{position:absolute;left:50%;bottom:max(1rem,env(safe-area-inset-bottom));transform:translateX(-50%);margin:0;padding:.5rem .75rem;background:#fff;color:#050505;font:900 .65rem/1 Arial,Helvetica,sans-serif;letter-spacing:.18em}.desktop-unified-lightbox__hint{position:absolute;left:max(1rem,env(safe-area-inset-left));bottom:max(1rem,env(safe-area-inset-bottom));margin:0;color:rgba(255,255,255,.58);font:900 .58rem/1 Arial,Helvetica,sans-serif;letter-spacing:.16em;text-transform:uppercase}.desktop-unified-lightbox.is-single .desktop-unified-lightbox__nav{visibility:hidden;pointer-events:none}
      @media(prefers-reduced-motion:reduce){.desktop-unified-lightbox,.desktop-unified-lightbox__image,.desktop-unified-lightbox__nav,.desktop-unified-lightbox__close{transition:none!important}}
    `;document.head.append(s);
  }
  function norm(v){if(!v)return'';const x=String(v).trim().replace(/^[\'\"]|[\'\"]$/g,'');if(!x||x==='none')return'';try{return new URL(x,location.href).href}catch{return x}}
  const unique=a=>[...new Set(a.map(norm).filter(Boolean))];
  function imgSrc(img){return img instanceof HTMLImageElement?norm(img.dataset.portfolioOriginal||img.getAttribute('data-original')||img.getAttribute('data-full')||img.getAttribute('data-large')||img.currentSrc||img.getAttribute('src')):''}
  function bgUrls(n){if(!(n instanceof Element))return[];return[...(getComputedStyle(n).backgroundImage||'').matchAll(/url\(([\'\"]?)(.*?)\1\)/g)].map(m=>norm(m[2]))}
  function sourceUrls(root,includeHidden=true){
    if(!(root instanceof Element))return[];const out=[];[root,...root.querySelectorAll('*')].forEach(n=>{if(!(n instanceof Element))return;if(n instanceof HTMLImageElement){if(!includeHidden){const r=n.getBoundingClientRect(),c=getComputedStyle(n);if(r.width<40||r.height<40||c.display==='none'||c.visibility==='hidden')return}out.push(imgSrc(n))}['data-hover-src','data-alt-src','data-worn-src','data-active-src','data-image','data-src','data-full','data-large'].forEach(k=>out.push(norm(n.getAttribute(k))));const list=n.getAttribute('data-images');if(list)out.push(...list.split(/[|,]/).map(norm));out.push(...bgUrls(n))});return unique(out).filter(u=>!u.startsWith('data:image/svg'))
  }
  function visibleImage(root){return[...root.querySelectorAll('img')].filter(i=>{const r=i.getBoundingClientRect(),c=getComputedStyle(i);return r.width>24&&r.height>24&&c.display!=='none'&&c.visibility!=='hidden'}).sort((a,b)=>{const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();return br.width*br.height-ar.width*ar.height})[0]||root.querySelector('img')}
  function resolveTarget(target){
    if(!(target instanceof Element))return null;const modal=target.closest(MODAL_SELECTOR);if(!modal||target.closest(CONTROL_SELECTOR))return null;let image=target.closest('img');if(!(image instanceof HTMLImageElement)){const group=target.closest(GROUP_SELECTOR);if(group&&modal.contains(group))image=visibleImage(group)}if(!(image instanceof HTMLImageElement))return null;return{modal,image}
  }
  function resolveGallery(modal,image){
    if(modal.matches(WHOLE_PROJECT_GALLERY)){const all=sourceUrls(modal,true);if(all.length)return all}
    const group=image.closest(GROUP_SELECTOR);if(group&&modal.contains(group)){const a=sourceUrls(group,true);if(a.length)return a}
    const section=image.closest(SECTION_SELECTOR);if(section&&modal.contains(section)){const a=sourceUrls(section,false);if(a.length)return a}
    return sourceUrls(modal,false)
  }
  function preload(){if(!sources.length)return;[-1,1].forEach(o=>{const i=new Image();i.decoding='async';i.src=sources[(index+o+sources.length)%sources.length]})}
  function render(dir=0,immediate=false){if(!overlay||!sources.length)return;const img=overlay.querySelector('.desktop-unified-lightbox__image'),count=overlay.querySelector('.desktop-unified-lightbox__counter');const apply=()=>{img.src=sources[index];count.textContent=`${String(index+1).padStart(2,'0')} / ${String(sources.length).padStart(2,'0')}`;img.style.setProperty('--du-direction','0px');img.classList.remove('is-changing');preload()};if(immediate)return apply();img.style.setProperty('--du-direction',`${dir*30}px`);img.classList.add('is-changing');setTimeout(apply,85)}
  function step(n){if(sources.length<2)return;index=(index+n+sources.length)%sources.length;render(n>0?1:-1)}
  function close(){if(!overlay)return;const r=overlay;overlay=null;r.classList.remove('is-open');setTimeout(()=>r.remove(),150);sources=[];index=0;previousFocus?.focus?.({preventScroll:true});previousFocus=null}
  function open(items,start){close();installStyles();sources=unique(items);if(!sources.length)return;index=Math.max(0,sources.indexOf(norm(start)));previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;const r=document.createElement('div'),prev=document.createElement('button'),stage=document.createElement('div'),img=document.createElement('img'),next=document.createElement('button'),x=document.createElement('button'),count=document.createElement('p'),hint=document.createElement('p');r.className=`desktop-unified-lightbox${sources.length<2?' is-single':''}`;r.setAttribute('role','dialog');r.setAttribute('aria-modal','true');prev.type=next.type=x.type='button';prev.className='desktop-unified-lightbox__nav desktop-unified-lightbox__prev';next.className='desktop-unified-lightbox__nav desktop-unified-lightbox__next';x.className='desktop-unified-lightbox__close';stage.className='desktop-unified-lightbox__stage';img.className='desktop-unified-lightbox__image';count.className='desktop-unified-lightbox__counter';hint.className='desktop-unified-lightbox__hint';prev.textContent='←';next.textContent='→';x.textContent=document.documentElement.lang==='ru'?'ЗАКРЫТЬ':'CLOSE';hint.textContent='ESC · ← →';prev.onclick=e=>{e.stopPropagation();step(-1)};next.onclick=e=>{e.stopPropagation();step(1)};x.onclick=e=>{e.stopPropagation();close()};stage.onclick=e=>e.stopPropagation();r.onclick=close;stage.append(img);r.append(prev,stage,next,x,count,hint);document.body.append(r);overlay=r;render(0,true);requestAnimationFrame(()=>r.classList.add('is-open'));x.focus({preventScroll:true})}

  window.addEventListener('click',e=>{if(!isDesktop()||overlay)return;if(e.target instanceof Element&&e.target.closest('.desktop-unified-lightbox'))return;const hit=resolveTarget(e.target);if(!hit)return;const items=resolveGallery(hit.modal,hit.image);if(!items.length)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open(items,imgSrc(hit.image))},true);
  window.addEventListener('keydown',e=>{if(!overlay)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();close()}else if(e.key==='ArrowLeft'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();step(-1)}else if(e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();step(1)}},true);
  installStyles();
})();
