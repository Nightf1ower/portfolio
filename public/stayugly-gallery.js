(() => {
  const V = 'stayugly-1';
  const roots = ['/works/stayugly', '/works/STAYUGLY', '/works/stay-ugly', '/works/stay_ugly', '/works/StayUgly'];
  const ext = ['jpg', 'jpeg', 'png', 'webp'];
  const sections = {
    concept: ['concept', 'process', 'development', 'dev', 'sketch'],
    final: ['final', 'product', 'result', 'item', 'tee', 'tshirt'],
    photoshoot: ['photoshoot', 'photo', 'shoot', 'lookbook', 'model'],
    packaging: ['packaging', 'package', 'pack', 'box']
  };
  let modal = null;
  const q = p => `${p}?v=${V}`;
  const el = (t, c, txt) => { const x = document.createElement(t); if (c) x.className = c; if (txt) x.textContent = txt; return x; };

  function styles() {
    if (document.getElementById('stayugly-style')) return;
    const s = el('style');
    s.id = 'stayugly-style';
    s.textContent = `
      .su-modal{position:fixed;inset:0;z-index:320;background:#050505;color:#fff;overflow:auto;padding:1.5rem 1rem 4rem}.su-inner{width:min(100%,80rem);margin:0 auto}.su-head{position:sticky;top:0;z-index:4;display:flex;justify-content:space-between;gap:1rem;margin-bottom:2rem;padding:.7rem 0 1rem;border-bottom:1px solid rgba(255,255,255,.25);background:rgba(5,5,5,.95);backdrop-filter:blur(10px)}.su-label,.su-close,.su-count,.su-kicker{font-size:.68rem;font-weight:900;letter-spacing:.28em;text-transform:uppercase}.su-label{background:#fff;color:#050505;padding:.35rem .75rem}.su-close{border:1px solid #fff;background:#fff;color:#050505;padding:.55rem 1rem}.su-hero{border-top:1px solid rgba(255,255,255,.25);padding-top:1.25rem;margin-bottom:5rem}.su-title{margin:0;font-size:clamp(4rem,12vw,12rem);font-weight:900;line-height:.78;letter-spacing:-.09em;text-transform:uppercase}.su-lead{max-width:58rem;margin:1.5rem 0 0;font-size:clamp(1.45rem,3vw,3rem);font-weight:800;line-height:.92;letter-spacing:-.055em;text-transform:uppercase}.su-section{border-top:1px solid rgba(255,255,255,.25);padding-top:1.25rem}.su-section+.su-section{margin-top:5rem}.su-section-head{display:flex;justify-content:space-between;gap:1rem;margin-bottom:1.25rem}.su-h{margin:0;font-size:clamp(2.8rem,6vw,6.5rem);font-weight:900;line-height:.82;letter-spacing:-.085em;text-transform:uppercase}.su-text{max-width:52rem;margin:0 0 1.5rem;color:rgba(255,255,255,.72);font-size:clamp(1rem,1.6vw,1.35rem);font-weight:700;line-height:1.05;letter-spacing:-.035em}.su-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.su-card{border:0;background:#111;padding:0;cursor:zoom-in}.su-card img{display:block;width:100%;height:100%;aspect-ratio:1/1;object-fit:cover}.su-specs{display:grid;gap:.55rem;max-width:42rem;margin:0 0 1.5rem;padding:0;list-style:none}.su-specs li{border:1px solid rgba(255,255,255,.25);padding:.8rem 1rem;font-size:.82rem;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.su-note{font-size:.8rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.58)}.su-empty{font-size:.72rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.45)}.su-light{position:fixed;inset:0;z-index:420;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.92);padding:1rem}.su-light img{max-width:92vw;max-height:90vh;object-fit:contain}.su-light button{position:absolute;right:1rem;top:1rem;border:0;background:#fff;color:#050505;padding:.7rem 1rem;font-weight:900;letter-spacing:.24em;text-transform:uppercase}@media(max-width:900px){.su-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.su-grid{grid-template-columns:1fr}.su-section-head{display:block}.su-count{display:block;margin-top:.75rem}}
    `;
    document.head.append(s);
  }

  function candidates(section) {
    const dirs = sections[section];
    const names = [];
    for (let i = 1; i <= 16; i++) {
      const n = String(i).padStart(2, '0');
      const short = String(i);
      dirs.forEach(d => names.push(`${d}-${n}`, `${d}_${n}`, `${d}${n}`, `${d}-${short}`, `${d}_${short}`, `${n}`, short));
    }
    const out = [];
    roots.forEach(root => dirs.forEach(dir => names.forEach(name => ext.forEach(e => {
      out.push(`${root}/${dir}/${name}.${e}`);
      out.push(`${root}/${name}.${e}`);
    }))));
    return [...new Set(out)];
  }

  function probe(path) {
    return new Promise(resolve => {
      const img = new Image();
      const timer = setTimeout(() => resolve(null), 1500);
      img.onload = () => { clearTimeout(timer); resolve(path); };
      img.onerror = () => { clearTimeout(timer); resolve(null); };
      img.src = q(path);
    });
  }

  async function load(section) {
    const found = await Promise.all(candidates(section).map(probe));
    return found.filter(Boolean).slice(0, 24);
  }

  function lightbox(list, index = 0) {
    let i = index;
    const overlay = el('div', 'su-light');
    const close = el('button', '', 'CLOSE');
    const img = el('img');
    const render = () => { img.src = q(list[i]); };
    close.onclick = () => overlay.remove();
    overlay.onclick = () => overlay.remove();
    img.onclick = e => { e.stopPropagation(); i = (i + 1) % list.length; render(); };
    overlay.append(close, img);
    document.body.append(overlay);
    render();
  }

  function gallery(list) {
    const grid = el('div', 'su-grid');
    if (!list.length) {
      grid.append(el('p', 'su-empty', 'Файлы для этого блока пока не найдены в /works/stayugly'));
      return grid;
    }
    list.forEach((src, i) => {
      const b = el('button', 'su-card');
      b.type = 'button';
      const img = el('img');
      img.src = q(src);
      img.loading = 'lazy';
      b.append(img);
      b.onclick = e => { e.stopPropagation(); lightbox(list, i); };
      grid.append(b);
    });
    return grid;
  }

  function makeSection(title, text, list, extra) {
    const s = el('section', 'su-section');
    const head = el('div', 'su-section-head');
    head.append(el('h3', 'su-h', title), el('p', 'su-count', `${list.length} / ${list.length}`));
    s.append(head);
    if (text) s.append(el('p', 'su-text', text));
    if (extra) s.append(extra);
    s.append(gallery(list));
    return s;
  }

  async function open() {
    styles();
    modal?.remove();
    modal = el('div', 'su-modal');
    const inner = el('div', 'su-inner');
    const header = el('div', 'su-head');
    const close = el('button', 'su-close', 'ЗАКРЫТЬ');
    close.onclick = () => modal.remove();
    header.append(el('p', 'su-label', 'STAYUGLY'), close);
    const loading = el('p', 'su-empty', 'LOADING STAYUGLY ASSETS...');
    inner.append(header, loading);
    modal.append(inner);
    document.body.append(modal);

    const [concept, final, photoshoot, packaging] = await Promise.all([load('concept'), load('final'), load('photoshoot'), load('packaging')]);
    loading.remove();

    const hero = el('section', 'su-hero');
    hero.append(el('p', 'su-kicker', 'PERSONAL PRODUCT / COLLABORATION'), el('h2', 'su-title', 'STAYUGLY'), el('p', 'su-lead', 'Личная разработанная мною вещь в коллаборации с коллегой STAYUGLY. Разработка с нуля: собственные лекала, принт, дизайн, подбор подрядчиков и полный путь от идеи до готового продукта.'));
    inner.append(hero);

    inner.append(makeSection('CONCEPT', 'Как разрабатывалась вещь: первые визуальные решения, поиск формы, принта, посадки и общего характера изделия.', concept));

    const specs = el('ul', 'su-specs');
    ['Футер 2-х нитка 245 гр/м²', 'Вручную обрезаны', 'BIG SQUARE футболка 80×60', '*каждая вещь уникальна'].forEach(item => specs.append(el('li', '', item)));
    inner.append(makeSection('FINAL RESULT', 'Финальный результат: несколько фотографий товара и то, как вещь выглядит вживую.', final, specs));

    inner.append(makeSection('PHOTOSET', 'Фотосет также сделан нами: съемка, обработка, ретушь и финальная визуальная сборка — всё внутри проекта.', photoshoot));
    inner.append(makeSection('PACKAGING', 'Небольшой милый финальный блок про упаковку и то, как вещь приходит к человеку.', packaging));
  }

  document.addEventListener('click', event => {
    const card = event.target.closest('#works article, #works button');
    if (!card) return;
    const title = card.querySelector('h3')?.textContent?.trim().toUpperCase();
    if (title !== 'STAY UGLY' && title !== 'STAYUGLY') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    open();
  }, true);
})();
