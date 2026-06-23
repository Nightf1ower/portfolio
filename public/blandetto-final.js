(() => {
  const v = 'direct-1';
  const q = (p) => `${p}?v=${v}`;
  const data = {
    logos: [
      ['LOGO 01','/works/blandetto/logo/logo-01.jpg','/works/blandetto/logo/logo-01-inv.jpg'],
      ['LOGO 02','/works/blandetto/logo/logo-02.png','/works/blandetto/logo/logo-02-inv.png','/works/blandetto/logo/logo-02-sweatshirt.jpg','/works/blandetto/logo/logo-02-pants.jpg'],
      ['LOGO 03','/works/blandetto/logo/logo-03.jpg','/works/blandetto/logo/logo-03-inv.jpg']
    ],
    cap: ['/works/blandetto/cap/cap-01.png','/works/blandetto/cap/cap-02.png','/works/blandetto/cap/cap-03.png','/works/blandetto/cap/cap-04.png'],
    prints: [
      ['PRINT 01','/works/blandetto/print/print-01.jpg','/works/blandetto/print/print-01-tee.jpg','/works/blandetto/print/print-01-hoodie.jpg'],
      ['PRINT 02','/works/blandetto/print/print-02.jpg','/works/blandetto/print/print-02-tee.jpg'],
      ['PRINT 03','/works/blandetto/print/print-03.jpg'],['PRINT 04','/works/blandetto/print/print-04.jpg'],
      ['PRINT 05','/works/blandetto/print/print-05.png','/works/blandetto/print/print-05-sweatshirt.jpg'],
      ['PRINT 06','/works/blandetto/print/print-06.jpg'],['PRINT 07','/works/blandetto/print/print-07.jpg'],['PRINT 08','/works/blandetto/print/print-08.jpg'],
      ['PRINT 09','/works/blandetto/print/print-09.jpg','/works/blandetto/print/print-09-hoodie.jpg'],
      ['PRINT 10','/works/blandetto/print/print-10.jpg','/works/blandetto/print/print-10-hoodie.jpg']
    ],
    dentist: [
      ['DENTIST 01','/works/blandetto/dentist/dentist-01.jpg'],
      ['DENTIST 02','/works/blandetto/dentist/dentist-02.jpg','/works/blandetto/dentist/dentist-02-hoodie.jpg'],
      ['DENTIST 03','/works/blandetto/dentist/dentist-03.jpg','/works/blandetto/dentist/dentist-03-tee.jpg'],
      ['DENTIST 04','/works/blandetto/dentist/dentist-04.png','/works/blandetto/dentist/dentist-04-tee.jpg'],
      ['DENTIST 05','/works/blandetto/dentist/dentist-05.png'],['DENTIST 06','/works/blandetto/dentist/dentist-06.png']
    ]
  };
  const el = (t,c,txt) => { const x=document.createElement(t); if(c)x.className=c; if(txt)x.textContent=txt; return x; };
  let modal;
  function css(){ if(document.getElementById('bf-style'))return; const s=el('style'); s.id='bf-style'; s.textContent=`.bf{position:fixed;inset:0;z-index:300;background:#fff;color:#050505;overflow:auto;padding:1.5rem 1rem 3rem}.bf-i{width:min(100%,80rem);margin:auto}.bf-h{position:sticky;top:0;background:#fff;z-index:2;display:flex;justify-content:space-between;border-bottom:1px solid #050505;padding:.7rem 0 1rem;margin-bottom:2rem}.bf-l,.bf-x,.bf-n{font-size:.68rem;font-weight:900;letter-spacing:.28em;text-transform:uppercase}.bf-l{background:#050505;color:#fff;padding:.35rem .75rem}.bf-x{background:#fff;border:1px solid #050505;padding:.55rem 1rem}.bf-s{border-top:1px solid rgba(5,5,5,.42);padding-top:1.25rem}.bf-s+.bf-s{margin-top:5rem}.bf-sh{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.25rem}.bf-t{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.085em}.bf-c{margin:0;color:rgba(5,5,5,.5);font-size:.72rem;font-weight:900;letter-spacing:.25em}.bf-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.bf-card{border:0;background:#fff;padding:0;width:100%;cursor:zoom-in}.bf-m{position:relative;aspect-ratio:1/1;background:#fff;overflow:hidden}.bf-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center}.bf-hov{opacity:0}.bf-card:hover .bf-main{opacity:0}.bf-card:hover .bf-hov{opacity:1}.bf-card:not(.has-hov):hover .bf-main{opacity:1}.bf-cap{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(17rem,.55fr);gap:1rem}.bf-capg{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}.bf-cap img,.bf-ref img{display:block;width:100%;height:auto}.bf-p{font-size:.68rem;font-weight:900;letter-spacing:.23em;text-transform:uppercase;color:rgba(5,5,5,.55)}.bf-ref{position:sticky;top:5.5rem}.bf-ref div{padding:1rem}.bf-dentist .bf-card:nth-child(1){grid-column:1;grid-row:1}.bf-dentist .bf-card:nth-child(3){grid-column:2;grid-row:1}.bf-dentist .bf-card:nth-child(2){grid-column:3;grid-row:1}.bf-dentist .bf-card:nth-child(5){grid-column:1;grid-row:2}.bf-dentist .bf-card:nth-child(4){grid-column:2;grid-row:2}.bf-dentist .bf-card:nth-child(6){grid-column:3;grid-row:2}.bf-light{position:fixed;inset:0;z-index:400;background:rgba(5,5,5,.92);display:flex;align-items:center;justify-content:center;padding:1rem}.bf-light img{max-width:92vw;max-height:90vh}.bf-close{position:absolute;right:1rem;top:1rem;background:#fff;border:0;padding:.7rem 1rem;font-weight:900}@media(max-width:900px){.bf-g{grid-template-columns:repeat(2,1fr)}.bf-dentist .bf-card{grid-column:auto!important;grid-row:auto!important}.bf-cap{grid-template-columns:1fr}.bf-ref{position:static}}@media(max-width:560px){.bf-g,.bf-capg{grid-template-columns:1fr}.bf-sh{display:block}}`; document.head.append(s); }
  function light(paths,i=0){let k=i;const o=el('div','bf-light'),img=el('img'),x=el('button','bf-close','CLOSE');function r(){img.src=q(paths[k]);} x.onclick=()=>o.remove(); o.onclick=()=>o.remove(); img.onclick=e=>{e.stopPropagation();k=(k+1)%paths.length;r();}; o.append(x,img); document.body.append(o); r();}
  function card(a){const b=el('button','bf-card'),m=el('div','bf-m'),im=el('img','bf-img bf-main'); b.type='button'; im.src=q(a[1]); m.append(im); if(a[2]){b.classList.add('has-hov'); const h=el('img','bf-img bf-hov'); h.src=q(a[2]); m.append(h);} b.append(m); b.onclick=e=>{e.stopPropagation();light(a.slice(1));}; return b;}
  function section(name,items,cls){const s=el('section','bf-s'),h=el('div','bf-sh'),g=el('div',`bf-g ${cls||''}`); h.append(el('h3','bf-t',name),el('p','bf-c',`${items.length} / ${items.length}`)); items.forEach(a=>g.append(card(a))); s.append(h,g); return s;}
  function cap(){const s=el('section','bf-s'),h=el('div','bf-sh'),wrap=el('div','bf-cap'),g=el('div','bf-capg'); h.append(el('h3','bf-t','CAP'),el('p','bf-c',`${data.cap.length} / ${data.cap.length}`)); data.cap.forEach((p,i)=>{const b=el('button','bf-card'),im=el('img'); im.src=q(p); b.append(im,el('p','bf-p',i===data.cap.length-1?'FINAL PRODUCT':'REALISTIC 3D RENDER')); b.onclick=e=>{e.stopPropagation();light(data.cap,i);}; g.append(b);}); const ref=el('aside','bf-ref'),rd=el('div'),ri=el('img'); ri.src=q(data.logos[0][1]); rd.append(ri); ref.append(rd,el('p','bf-p','за основу взят этот логотип')); wrap.append(g,ref); s.append(h,wrap); return s;}
  function open(){css(); modal?.remove(); modal=el('div','bf'); const i=el('div','bf-i'),h=el('div','bf-h'),x=el('button','bf-x','CLOSE'); x.onclick=()=>modal.remove(); h.append(el('p','bf-l','BLANDETTO'),x); i.append(h,section('LOGO VARIATIONS',data.logos),cap(),section('PRINTS',data.prints),section('DENTIST MARKET',data.dentist,'bf-dentist')); modal.append(i); document.body.append(modal);}
  document.addEventListener('click',e=>{const c=e.target.closest('#works article,#works button'); if(c&&c.querySelector('h3')?.textContent?.trim().toUpperCase()==='BLANDETTO'){e.preventDefault();e.stopImmediatePropagation();open();}},true);
})();
