(() => {
  if (window.__fontPanicOverrideLoaded) return;
  window.__fontPanicOverrideLoaded = true;

  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const FOLDER = 'public/fonts/font-panic';
  const STORE = 'nightflower-playground-scores-v1';
  const WORD = 'NIGHTFLOWER';
  const FONT_RE = /\.(woff2?|ttf|otf)$/i;
  const C = {
    ru: {
      title: 'FONT PANIC',
      desc: 'Запомни, каким шрифтом набрана каждая буква, и восстанови слово NIGHTFLOWER по памяти.',
      info: '5 СЕКУНД НА ЗАПОМИНАНИЕ · ПОТОМ 3 СЕКУНДЫ НА КАЖДУЮ БУКВУ',
      memorize: 'ЗАПОМНИ ШРИФТ КАЖДОЙ БУКВЫ',
      choose: 'ВЫБЕРИ ПРАВИЛЬНЫЙ ШРИФТ ДЛЯ БУКВЫ',
      original: 'ОРИГИНАЛ', assembled: 'ТВОЙ ВАРИАНТ', loaded: 'ЗАГРУЖЕНО ШРИФТОВ',
      score: 'СЧЁТ', time: 'ВРЕМЯ', close: 'ЗАКРЫТЬ', result: 'РЕЗУЛЬТАТ',
      again: 'ЕЩЁ РАЗ', projects: 'К ПРОЕКТАМ', poster: 'ОТКРЫТЬ ФИНАЛЬНЫЙ ПОСТЕР',
      best: 'ЛУЧШИЙ РЕЗУЛЬТАТ', easter: 'ПАСХАЛКА НАЙДЕНА',
    },
    en: {
      title: 'FONT PANIC',
      desc: 'Memorize the typeface used for each letter, then rebuild NIGHTFLOWER from memory.',
      info: '5 SECONDS TO MEMORIZE · THEN 3 SECONDS FOR EACH LETTER',
      memorize: 'MEMORIZE THE FONT OF EVERY LETTER',
      choose: 'CHOOSE THE CORRECT FONT FOR',
      original: 'ORIGINAL', assembled: 'YOUR VERSION', loaded: 'FONTS LOADED',
      score: 'SCORE', time: 'TIME', close: 'CLOSE', result: 'RESULT',
      again: 'PLAY AGAIN', projects: 'VIEW PROJECTS', poster: 'OPEN FINAL POSTER',
      best: 'BEST SCORE', easter: 'EASTER EGG FOUND',
    },
  };
  const FALLBACKS = [
    ['Arial Black','"Arial Black",Arial,sans-serif'],['Georgia','Georgia,serif'],
    ['Courier New','"Courier New",monospace'],['Impact','Impact,Haettenschweiler,sans-serif'],
    ['Trebuchet','"Trebuchet MS",sans-serif'],['Times','"Times New Roman",serif'],
    ['Verdana','Verdana,sans-serif'],['Arial','Arial,sans-serif'],
    ['Palatino','"Palatino Linotype",Palatino,serif'],['Lucida','"Lucida Console",Monaco,monospace'],
    ['Gill Sans','"Gill Sans","Gill Sans MT",sans-serif'],['Arial Narrow','"Arial Narrow",Arial,sans-serif'],
  ].map(([name,family]) => ({name,family}));

  let modal = null;
  let fontPromise = null;
  let cleanup = [];
  let bodyOverflow = '';
  let htmlOverflow = '';

  const t = () => C[document.documentElement.lang === 'ru' ? 'ru' : 'en'];
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const ri = (a,b) => Math.floor(Math.random() * (b-a+1)) + a;
  const shuffle = (array) => {
    const result = [...array];
    for (let i=result.length-1;i>0;i--) {
      const j=ri(0,i);
      [result[i],result[j]]=[result[j],result[i]];
    }
    return result;
  };
  const scores = () => {
    try { return JSON.parse(localStorage.getItem(STORE) || '{}'); }
    catch { return {}; }
  };

  function styles() {
    if (document.getElementById('font-panic-style')) return;
    const s = el('style');
    s.id = 'font-panic-style';
    s.textContent = `
      .fp-stage{position:relative;flex:1;min-height:34rem;border:1px solid rgba(255,255,255,.45);overflow:hidden;background:#f4f4f0;color:#050505}
      .fp-shell{min-height:34rem;display:flex;flex-direction:column;justify-content:center;gap:1rem;padding:3.8rem 1rem 1rem}
      .fp-phase,.fp-meta{margin:0;text-align:center;font-family:Arial,sans-serif;font-size:.68rem;font-weight:900;letter-spacing:.23em;text-transform:uppercase;color:rgba(5,5,5,.58)}
      .fp-word{display:flex;align-items:center;justify-content:center;gap:.01em;min-height:10rem;padding:1rem;overflow-x:auto;background:#fff;border:1px solid #050505}
      .fp-letter{display:inline-block;font-size:clamp(2.6rem,9vw,8.5rem);line-height:.8;white-space:pre}
      .fp-letter.empty{font-family:Arial,sans-serif;color:rgba(5,5,5,.18)}
      .fp-choices{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.65rem}
      .fp-choice{min-height:9rem;border:1px solid #050505;background:#fff;color:#050505;cursor:pointer;font-size:clamp(3rem,8vw,7rem);line-height:1;transition:.15s}
      .fp-choice:hover,.fp-choice:focus-visible,.fp-choice.correct{background:#b6ff00;transform:translateY(-.2rem);outline:none}
      .fp-choice.wrong{background:#9b0014;color:#fff}
      .fp-result{position:absolute;inset:0;z-index:40;overflow:auto;background:rgba(5,5,5,.97);color:#fff;padding:1rem;display:flex;align-items:center;justify-content:center}
      .fp-card{width:min(100%,54rem);border:1px solid #fff;padding:1.25rem;text-align:center}
      .fp-score{margin:.6rem 0 1rem;font-family:Arial,sans-serif;font-size:clamp(5rem,18vw,12rem);font-weight:900;line-height:.8;color:#b6ff00}
      .fp-compare{display:grid;gap:.65rem;margin:1rem 0}.fp-row{border:1px solid rgba(255,255,255,.35);padding:.7rem}
      .fp-label{display:block;margin-bottom:.5rem;font-family:Arial,sans-serif;font-size:.62rem;font-weight:900;letter-spacing:.22em;text-align:left;color:rgba(255,255,255,.55)}
      .fp-compare .fp-word{min-height:5rem;padding:.55rem}.fp-compare .fp-letter{font-size:clamp(1.7rem,5vw,4.2rem)}
      .fp-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.65rem}
      .fp-btn{border:1px solid #fff;background:#fff;color:#050505;padding:.8rem 1rem;font-family:Arial,sans-serif;font-size:.68rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}
      .fp-btn.alt{background:#050505;color:#fff}
      @media(max-width:800px){.fp-choices{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:520px){.fp-shell{padding:3.5rem .6rem .6rem}.fp-word{min-height:7rem}.fp-choice{min-height:7rem}}
    `;
    document.head.append(s);
  }

  function updateCard() {
    const card = document.querySelector('#nightflower-playground [data-nfp-game="escape"]');
    if (!card) return;
    const title = card.querySelector('.nfp-card-title');
    const desc = card.querySelector('.nfp-card-description');
    const status = card.querySelector('.nfp-card-status');
    if (title && title.textContent !== t().title) title.textContent = t().title;
    if (desc && desc.textContent !== t().desc) desc.textContent = t().desc;
    const data = scores();
    if (status && data.escape?.played) {
      const next = `${t().best}: ${Number(data.escape.best || 0)}`;
      if (status.textContent !== next) status.textContent = next;
    }
  }

  function save(score) {
    const data = scores();
    data.escape = { best: Math.max(Number(data.escape?.best || 0), Math.round(score)), played: true };
    localStorage.setItem(STORE, JSON.stringify(data));
    updateCard();
    if (['noise','grid','ugly','escape'].every((id) => data[id]?.played)) {
      document.querySelector('#nightflower-playground [data-nfp-final]')?.classList.add('is-visible');
    }
  }

  function close() {
    cleanup.splice(0).forEach((fn) => { try { fn(); } catch {} });
    modal?.remove();
    modal = null;
    document.body.style.overflow = bodyOverflow;
    document.documentElement.style.overflow = htmlOverflow;
  }

  async function fonts() {
    if (fontPromise) return fontPromise;
    fontPromise = (async () => {
      const loaded = [];
      try {
        const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${FOLDER}?ref=main&v=${Date.now()}`,{cache:'no-store'});
        if (r.ok) {
          const files = (await r.json()).filter((x) => x.type==='file' && FONT_RE.test(x.name||x.path)).slice(0,20);
          for (let i=0;i<files.length;i++) {
            const item=files[i], family=`FontPanic${i}`, src=item.download_url||`https://raw.githubusercontent.com/${REPO}/main/${item.path}`;
            try {
              const face=new FontFace(family,`url("${src}?v=font-panic-2")`);
              await face.load(); document.fonts.add(face);
              loaded.push({name:item.name.replace(/\.[^.]+$/,''),family:`"${family}"`});
            } catch {}
          }
        }
      } catch {}
      return [...loaded,...FALLBACKS].slice(0,20);
    })();
    return fontPromise;
  }

  function wordRow(base, selected=null) {
    const row=el('div','fp-word');
    [...WORD].forEach((letter,i) => {
      const font=selected ? selected[i] : base[i];
      const span=el('span',`fp-letter${font?'':' empty'}`,font?letter:'·');
      if (font) span.style.fontFamily=font.family;
      row.append(span);
    });
    return row;
  }

  function makeModal(source) {
    close();
    bodyOverflow=document.body.style.overflow;
    htmlOverflow=document.documentElement.style.overflow;
    document.body.style.overflow='hidden';
    document.documentElement.style.overflow='hidden';
    modal=el('div','nfp-modal');
    const inner=el('div','nfp-modal-inner'), head=el('div','nfp-modal-head');
    const x=el('button','nfp-close',t().close); x.onclick=close;
    head.append(el('p','nfp-modal-label',source==='easter'?`${t().easter} / ${t().title}`:t().title),x);
    const gameHead=el('div','nfp-game-header'), text=el('div'), stats=el('div','nfp-stats');
    text.append(el('h2','nfp-game-title',t().title),el('p','nfp-game-copy',t().info));
    const scoreBox=el('div','nfp-stat'), score=el('strong','nfp-stat-value','0/11');
    scoreBox.append(el('span','nfp-stat-label',t().score),score);
    const timeBox=el('div','nfp-stat'), time=el('strong','nfp-stat-value','5');
    timeBox.append(el('span','nfp-stat-label',t().time),time);
    stats.append(scoreBox,timeBox); gameHead.append(text,stats);
    const stage=el('div','fp-stage');
    inner.append(head,gameHead,stage); modal.append(inner); document.body.append(modal);
    return {stage,score,time};
  }

  async function open(source='card') {
    styles();
    const {stage,score,time}=makeModal(source);
    const shell=el('div','fp-shell'), phase=el('p','fp-phase',t().memorize), meta=el('p','fp-meta','LOADING FONTS...');
    shell.append(phase,meta); stage.append(shell);
    const pool=await fonts();
    if (!modal || !document.body.contains(stage)) return;

    const secret=[];
    [...WORD].forEach((_,i) => {
      let font=pool[ri(0,pool.length-1)];
      while (i && pool.length>1 && font.family===secret[i-1].family) font=pool[ri(0,pool.length-1)];
      secret.push(font);
    });
    meta.textContent=`${t().loaded}: ${pool.length}`;
    shell.insertBefore(wordRow(secret),meta);

    const chosen=Array(WORD.length).fill(null);
    let correct=0, bonus=0, left=5, pInt, pTo, rInt, rTo;
    const clearRound=()=>{clearInterval(rInt);clearTimeout(rTo)};
    cleanup.push(()=>{clearInterval(pInt);clearTimeout(pTo);clearRound()});

    const finish=()=>{
      clearRound();
      const total=correct*100+bonus; save(total);
      const overlay=el('div','fp-result'), card=el('div','fp-card');
      card.append(el('p','nfp-result-label',`${t().result} / ${t().title}`),el('p','fp-score',String(total)));
      const compare=el('div','fp-compare'), a=el('div','fp-row'), b=el('div','fp-row');
      a.append(el('span','fp-label',t().original),wordRow(secret));
      b.append(el('span','fp-label',t().assembled),wordRow(secret,chosen));
      compare.append(a,b); card.append(compare);
      const actions=el('div','fp-actions'), again=el('button','fp-btn',t().again), projects=el('button','fp-btn alt',t().projects);
      again.onclick=()=>open(); projects.onclick=()=>{close();document.querySelector('#works')?.scrollIntoView({behavior:'smooth'})};
      actions.append(again,projects);
      if (['noise','grid','ugly','escape'].every((id)=>scores()[id]?.played)) {
        const poster=el('button','fp-btn',t().poster);
        poster.onclick=()=>{close();document.querySelector('#nightflower-playground [data-nfp-final]')?.click()};
        actions.append(poster);
      }
      card.append(actions); overlay.append(card); stage.append(overlay);
    };

    const ask=(index)=>{
      if (index>=WORD.length) return finish();
      shell.innerHTML='';
      const letter=WORD[index];
      phase.textContent=`${t().choose} “${letter}”`;
      shell.append(phase,wordRow(secret,chosen));
      const right=secret[index], options=shuffle([right,...shuffle(pool.filter((f)=>f.family!==right.family)).slice(0,3)]);
      const grid=el('div','fp-choices');
      let answered=false; const started=performance.now();
      const choose=(font,button)=>{
        if (answered) return; answered=true; clearRound(); chosen[index]=font;
        if (font?.family===right.family) {
          correct++; bonus+=Math.max(0,Math.round((3000-(performance.now()-started))/30));
          button?.classList.add('correct');
        } else {
          button?.classList.add('wrong');
          [...grid.children].find((item)=>item.dataset.family===right.family)?.classList.add('correct');
        }
        score.textContent=`${correct}/11`; setTimeout(()=>ask(index+1),320);
      };
      options.forEach((font)=>{
        const button=el('button','fp-choice',letter);
        button.style.fontFamily=font.family; button.dataset.family=font.family; button.onclick=()=>choose(font,button); grid.append(button);
      });
      shell.append(grid,el('p','fp-meta',`${index+1} / 11`));
      time.textContent='3';
      rInt=setInterval(()=>{time.textContent=String(Math.ceil(Math.max(0,3000-(performance.now()-started))/1000))},80);
      rTo=setTimeout(()=>choose(null,null),3000);
    };

    pInt=setInterval(()=>{left--;time.textContent=String(Math.max(0,left))},1000);
    pTo=setTimeout(()=>{clearInterval(pInt);ask(0)},5000);
  }

  function intercept(event) {
    if (!event.target.closest('#nightflower-playground [data-nfp-game="escape"]')) return;
    event.preventDefault(); event.stopImmediatePropagation(); open('card');
  }

  function replaceEgg() {
    const dot=document.querySelector('header nav a[href="#top"] span.nfp-evasive-dot');
    if (dot && !dot.dataset.fpDone) {
      const clone=dot.cloneNode(true); clone.classList.remove('nfp-evasive-dot'); clone.style.transform='';
      clone.dataset.nfpEgg='true'; clone.dataset.fpDone='true'; dot.replaceWith(clone);
    }
    const brand=document.querySelector('header nav a[href="#top"]');
    if (!brand || brand.dataset.fpEgg) return;
    brand.dataset.fpEgg='true';
    let clicks=0, timer;
    brand.addEventListener('click',(event)=>{
      clicks++; clearTimeout(timer); timer=setTimeout(()=>clicks=0,2200);
      if (clicks>=5) { event.preventDefault(); event.stopImmediatePropagation(); clicks=0; open('easter'); }
    },true);
  }

  function patchPoster() {
    const canvas=document.querySelector('.nfp-poster-canvas:not([data-fp-patched])');
    if (!canvas) return;
    canvas.dataset.fpPatched='true';
    setTimeout(()=>{
      const ctx=canvas.getContext('2d');
      if (!ctx || canvas.width!==1080) return;
      ctx.fillStyle='#050505';ctx.fillRect(50,818,980,70);
      ctx.fillStyle='#fff';ctx.font='900 38px Arial';
      ctx.fillText(`FONT PANIC     ${Number(scores().escape?.best||0)}`,60,865);
    },50);
  }

  document.addEventListener('click',intercept,true);
  document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&modal)close()});
  const observer=new MutationObserver(()=>{updateCard();replaceEgg();patchPoster()});
  observer.observe(document.body,{childList:true,subtree:true});
  new MutationObserver(updateCard).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  styles(); updateCard(); replaceEgg();
})();