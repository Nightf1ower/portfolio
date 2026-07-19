(() => {
  if (window.__fontPanicOverrideLoaded) return;
  window.__fontPanicOverrideLoaded = true;

  const VERSION = 'font-panic-1';
  const REPO = 'Nightf1ower/portfolio';
  const BRANCH = 'main';
  const FONT_FOLDER = 'public/fonts/font-panic';
  const STORAGE_KEY = 'nightflower-playground-scores-v1';
  const WORD = 'NIGHTFLOWER';
  const FONT_RE = /\.(woff2?|ttf|otf)$/i;

  const COPY = {
    ru: {
      title: 'FONT PANIC',
      description: 'Запомни, каким шрифтом набрана каждая буква, и восстанови слово NIGHTFLOWER по памяти.',
      instruction: '5 СЕКУНД НА ЗАПОМИНАНИЕ · ПОТОМ 3 СЕКУНДЫ НА КАЖДУЮ БУКВУ',
      memorize: 'ЗАПОМНИ ШРИФТ КАЖДОЙ БУКВЫ',
      choose: 'ВЫБЕРИ ПРАВИЛЬНЫЙ ШРИФТ ДЛЯ БУКВЫ',
      original: 'ОРИГИНАЛ',
      assembled: 'ТВОЙ ВАРИАНТ',
      loaded: 'ЗАГРУЖЕНО ШРИФТОВ',
      score: 'СЧЁТ',
      time: 'ВРЕМЯ',
      close: 'ЗАКРЫТЬ',
      result: 'РЕЗУЛЬТАТ',
      again: 'ЕЩЁ РАЗ',
      projects: 'К ПРОЕКТАМ',
      poster: 'ОТКРЫТЬ ФИНАЛЬНЫЙ ПОСТЕР',
      best: 'ЛУЧШИЙ РЕЗУЛЬТАТ',
      easter: 'ПАСХАЛКА НАЙДЕНА',
    },
    en: {
      title: 'FONT PANIC',
      description: 'Memorize the typeface used for each letter, then rebuild NIGHTFLOWER from memory.',
      instruction: '5 SECONDS TO MEMORIZE · THEN 3 SECONDS FOR EACH LETTER',
      memorize: 'MEMORIZE THE FONT OF EVERY LETTER',
      choose: 'CHOOSE THE CORRECT FONT FOR',
      original: 'ORIGINAL',
      assembled: 'YOUR VERSION',
      loaded: 'FONTS LOADED',
      score: 'SCORE',
      time: 'TIME',
      close: 'CLOSE',
      result: 'RESULT',
      again: 'PLAY AGAIN',
      projects: 'VIEW PROJECTS',
      poster: 'OPEN FINAL POSTER',
      best: 'BEST SCORE',
      easter: 'EASTER EGG FOUND',
    },
  };

  const FALLBACKS = [
    ['Arial Black', '"Arial Black",Arial,sans-serif'],
    ['Georgia', 'Georgia,serif'],
    ['Courier New', '"Courier New",monospace'],
    ['Impact', 'Impact,Haettenschweiler,sans-serif'],
    ['Trebuchet', '"Trebuchet MS",sans-serif'],
    ['Times', '"Times New Roman",serif'],
    ['Verdana', 'Verdana,sans-serif'],
    ['Arial', 'Arial,sans-serif'],
    ['Palatino', '"Palatino Linotype",Palatino,serif'],
    ['Lucida', '"Lucida Console",Monaco,monospace'],
    ['Gill Sans', '"Gill Sans","Gill Sans MT",sans-serif'],
    ['Arial Narrow', '"Arial Narrow",Arial,sans-serif'],
  ].map(([name, family]) => ({ name, family }));

  let activeModal = null;
  let fontPromise = null;
  let cleanup = [];
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';

  const lang = () => document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const t = () => COPY[lang()];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffle = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = randomInt(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  function injectStyles() {
    if (document.getElementById('font-panic-style')) return;
    const style = el('style');
    style.id = 'font-panic-style';
    style.textContent = `
      .fp-stage{position:relative;flex:1;min-height:34rem;border:1px solid rgba(255,255,255,.45);overflow:hidden;background:#f4f4f0;color:#050505}
      .fp-shell{min-height:34rem;display:flex;flex-direction:column;justify-content:center;gap:1rem;padding:3.8rem 1rem 1rem}
      .fp-phase,.fp-meta{margin:0;text-align:center;font-family:Arial,sans-serif;font-size:.68rem;font-weight:900;letter-spacing:.23em;text-transform:uppercase;color:rgba(5,5,5,.58)}
      .fp-word{display:flex;align-items:center;justify-content:center;gap:.01em;min-height:10rem;padding:1rem;overflow-x:auto;background:#fff;border:1px solid #050505}
      .fp-letter{display:inline-block;font-size:clamp(2.6rem,9vw,8.5rem);line-height:.8;white-space:pre}
      .fp-letter.is-empty{font-family:Arial,sans-serif;color:rgba(5,5,5,.18)}
      .fp-choices{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.65rem}
      .fp-choice{min-height:9rem;border:1px solid #050505;background:#fff;color:#050505;cursor:pointer;font-size:clamp(3rem,8vw,7rem);line-height:1;transition:transform .15s ease,background .15s ease,color .15s ease}
      .fp-choice:hover,.fp-choice:focus-visible{background:#b6ff00;transform:translateY(-.2rem);outline:none}
      .fp-choice.is-correct{background:#b6ff00}
      .fp-choice.is-wrong{background:#9b0014;color:#fff}
      .fp-result{position:absolute;inset:0;z-index:40;overflow:auto;background:rgba(5,5,5,.97);color:#fff;padding:1rem;display:flex;align-items:center;justify-content:center}
      .fp-result-card{width:min(100%,54rem);border:1px solid #fff;padding:1.25rem;text-align:center}
      .fp-result-score{margin:.6rem 0 1rem;font-family:Arial,sans-serif;font-size:clamp(5rem,18vw,12rem);font-weight:900;line-height:.8;color:#b6ff00}
      .fp-comparison{display:grid;gap:.65rem;margin:1rem 0}
      .fp-comparison-row{border:1px solid rgba(255,255,255,.35);padding:.7rem}
      .fp-comparison-label{display:block;margin-bottom:.5rem;font-family:Arial,sans-serif;font-size:.62rem;font-weight:900;letter-spacing:.22em;text-align:left;color:rgba(255,255,255,.55)}
      .fp-comparison .fp-word{min-height:5rem;padding:.55rem}
      .fp-comparison .fp-letter{font-size:clamp(1.7rem,5vw,4.2rem)}
      .fp-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.65rem}
      .fp-button{border:1px solid #fff;background:#fff;color:#050505;padding:.8rem 1rem;font-family:Arial,sans-serif;font-size:.68rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}
      .fp-button.secondary{background:#050505;color:#fff}
      @media(max-width:800px){.fp-choices{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:520px){.fp-shell{padding:3.5rem .6rem .6rem}.fp-word{min-height:7rem}.fp-choice{min-height:7rem}}
    `;
    document.head.append(style);
  }

  function loadScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function saveScore(score) {
    const scores = loadScores();
    scores.escape = {
      best: Math.max(Number(scores.escape?.best || 0), Math.round(score)),
      played: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    updateCard();
    const unlock = document.querySelector('#nightflower-playground [data-nfp-final]');
    if (['noise', 'grid', 'ugly', 'escape'].every((id) => scores[id]?.played)) unlock?.classList.add('is-visible');
  }

  function updateCard() {
    const card = document.querySelector('#nightflower-playground [data-nfp-game="escape"]');
    if (!card) return;
    const title = card.querySelector('.nfp-card-title');
    const description = card.querySelector('.nfp-card-description');
    const status = card.querySelector('.nfp-card-status');
    if (title) title.textContent = t().title;
    if (description) description.textContent = t().description;
    const scores = loadScores();
    const best = Number(scores.escape?.best || 0);
    if (status && scores.escape?.played) status.textContent = `${t().best}: ${best}`;
  }

  function close() {
    cleanup.splice(0).forEach((fn) => {
      try { fn(); } catch {}
    });
    activeModal?.remove();
    activeModal = null;
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  async function loadFonts() {
    if (fontPromise) return fontPromise;
    fontPromise = (async () => {
      const loaded = [];
      try {
        const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${FONT_FOLDER}?ref=${BRANCH}&v=${Date.now()}`, { cache: 'no-store' });
        if (response.ok) {
          const items = await response.json();
          const files = (Array.isArray(items) ? items : []).filter((item) => item.type === 'file' && FONT_RE.test(item.name || item.path)).slice(0, 20);
          for (let index = 0; index < files.length; index += 1) {
            const item = files[index];
            const family = `FontPanic${index}`;
            const source = item.download_url || `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${item.path}`;
            try {
              const face = new FontFace(family, `url("${source}?v=${VERSION}")`);
              await face.load();
              document.fonts.add(face);
              loaded.push({ name: item.name.replace(/\.[^.]+$/, ''), family: `"${family}"` });
            } catch {}
          }
        }
      } catch {}
      return [...loaded, ...FALLBACKS].slice(0, 20);
    })();
    return fontPromise;
  }

  function wordRow(fonts, selected = null) {
    const row = el('div', 'fp-word');
    [...WORD].forEach((letter, index) => {
      const font = selected ? selected[index] : fonts[index];
      const span = el('span', `fp-letter${font ? '' : ' is-empty'}`, font ? letter : '·');
      if (font) span.style.fontFamily = font.family;
      row.append(span);
    });
    return row;
  }

  function createModal(source) {
    close();
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    activeModal = el('div', 'nfp-modal');
    const inner = el('div', 'nfp-modal-inner');
    const head = el('div', 'nfp-modal-head');
    const label = el('p', 'nfp-modal-label', source === 'easter' ? `${t().easter} / ${t().title}` : t().title);
    const closeButton = el('button', 'nfp-close', t().close);
    closeButton.onclick = close;
    head.append(label, closeButton);

    const gameHead = el('div', 'nfp-game-header');
    const text = el('div');
    text.append(el('h2', 'nfp-game-title', t().title), el('p', 'nfp-game-copy', t().instruction));
    const stats = el('div', 'nfp-stats');
    const scoreBox = el('div', 'nfp-stat');
    const scoreValue = el('strong', 'nfp-stat-value', '0/11');
    scoreBox.append(el('span', 'nfp-stat-label', t().score), scoreValue);
    const timeBox = el('div', 'nfp-stat');
    const timeValue = el('strong', 'nfp-stat-value', '5');
    timeBox.append(el('span', 'nfp-stat-label', t().time), timeValue);
    stats.append(scoreBox, timeBox);
    gameHead.append(text, stats);

    const stage = el('div', 'fp-stage');
    inner.append(head, gameHead, stage);
    activeModal.append(inner);
    document.body.append(activeModal);
    return { stage, scoreValue, timeValue };
  }

  async function openFontPanic(source = 'card') {
    injectStyles();
    const { stage, scoreValue, timeValue } = createModal(source);
    const shell = el('div', 'fp-shell');
    const phase = el('p', 'fp-phase', t().memorize);
    const meta = el('p', 'fp-meta', 'LOADING FONTS...');
    shell.append(phase, meta);
    stage.append(shell);

    const pool = await loadFonts();
    if (!activeModal || !document.body.contains(stage)) return;

    const secret = [];
    [...WORD].forEach((_, index) => {
      let font = pool[randomInt(0, pool.length - 1)];
      while (index && pool.length > 1 && font.family === secret[index - 1].family) font = pool[randomInt(0, pool.length - 1)];
      secret.push(font);
    });

    meta.textContent = `${t().loaded}: ${pool.length}`;
    shell.insertBefore(wordRow(secret), meta);

    const selected = Array(WORD.length).fill(null);
    let correct = 0;
    let bonus = 0;
    let previewLeft = 5;
    let previewInterval;
    let previewTimeout;
    let roundInterval;
    let roundTimeout;

    const clearRound = () => {
      clearInterval(roundInterval);
      clearTimeout(roundTimeout);
    };
    cleanup.push(() => {
      clearInterval(previewInterval);
      clearTimeout(previewTimeout);
      clearRound();
    });

    const finish = () => {
      clearRound();
      const result = el('div', 'fp-result');
      const card = el('div', 'fp-result-card');
      const finalScore = correct * 100 + bonus;
      saveScore(finalScore);
      card.append(el('p', 'nfp-result-label', `${t().result} / ${t().title}`), el('p', 'fp-result-score', String(finalScore)));
      const comparison = el('div', 'fp-comparison');
      const original = el('div', 'fp-comparison-row');
      original.append(el('span', 'fp-comparison-label', t().original), wordRow(secret));
      const assembled = el('div', 'fp-comparison-row');
      assembled.append(el('span', 'fp-comparison-label', t().assembled), wordRow(secret, selected));
      comparison.append(original, assembled);
      card.append(comparison);

      const actions = el('div', 'fp-actions');
      const again = el('button', 'fp-button', t().again);
      again.onclick = () => openFontPanic();
      const projects = el('button', 'fp-button secondary', t().projects);
      projects.onclick = () => {
        close();
        document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
      };
      actions.append(again, projects);
      const scores = loadScores();
      if (['noise', 'grid', 'ugly', 'escape'].every((id) => scores[id]?.played)) {
        const poster = el('button', 'fp-button', t().poster);
        poster.onclick = () => {
          close();
          document.querySelector('#nightflower-playground [data-nfp-final]')?.click();
        };
        actions.append(poster);
      }
      card.append(actions);
      result.append(card);
      stage.append(result);
    };

    const ask = (index) => {
      if (index >= WORD.length) {
        finish();
        return;
      }
      shell.innerHTML = '';
      const letter = WORD[index];
      phase.textContent = `${t().choose} “${letter}”`;
      shell.append(phase, wordRow(secret, selected));

      const correctFont = secret[index];
      const alternatives = shuffle(pool.filter((font) => font.family !== correctFont.family)).slice(0, 3);
      const choices = shuffle([correctFont, ...alternatives]);
      const grid = el('div', 'fp-choices');
      let answered = false;
      const started = performance.now();

      const choose = (font, button) => {
        if (answered) return;
        answered = true;
        clearRound();
        selected[index] = font;
        const isCorrect = font?.family === correctFont.family;
        if (isCorrect) {
          correct += 1;
          bonus += Math.max(0, Math.round((3000 - (performance.now() - started)) / 30));
          button?.classList.add('is-correct');
        } else {
          button?.classList.add('is-wrong');
          [...grid.children].find((item) => item.dataset.family === correctFont.family)?.classList.add('is-correct');
        }
        scoreValue.textContent = `${correct}/11`;
        setTimeout(() => ask(index + 1), 320);
      };

      choices.forEach((font) => {
        const button = el('button', 'fp-choice', letter);
        button.style.fontFamily = font.family;
        button.dataset.family = font.family;
        button.onclick = () => choose(font, button);
        grid.append(button);
      });
      shell.append(grid, el('p', 'fp-meta', `${index + 1} / 11`));

      timeValue.textContent = '3';
      roundInterval = setInterval(() => {
        timeValue.textContent = String(Math.ceil(Math.max(0, 3000 - (performance.now() - started)) / 1000));
      }, 80);
      roundTimeout = setTimeout(() => choose(null, null), 3000);
    };

    previewInterval = setInterval(() => {
      previewLeft -= 1;
      timeValue.textContent = String(Math.max(0, previewLeft));
    }, 1000);
    previewTimeout = setTimeout(() => {
      clearInterval(previewInterval);
      ask(0);
    }, 5000);
  }

  function interceptClicks(event) {
    const card = event.target.closest('#nightflower-playground [data-nfp-game="escape"]');
    if (!card) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openFontPanic('card');
  }

  function replaceOldEgg() {
    const oldDot = document.querySelector('header nav a[href="#top"] span.nfp-evasive-dot');
    if (oldDot && !oldDot.dataset.fpReplaced) {
      const clone = oldDot.cloneNode(true);
      clone.classList.remove('nfp-evasive-dot');
      clone.style.transform = '';
      clone.dataset.nfpEgg = 'true';
      clone.dataset.fpReplaced = 'true';
      oldDot.replaceWith(clone);
    }

    const brand = document.querySelector('header nav a[href="#top"]');
    if (!brand || brand.dataset.fpEgg) return;
    brand.dataset.fpEgg = 'true';
    let clicks = 0;
    let timeout;
    brand.addEventListener('click', (event) => {
      clicks += 1;
      clearTimeout(timeout);
      timeout = setTimeout(() => { clicks = 0; }, 2200);
      if (clicks >= 5) {
        event.preventDefault();
        event.stopImmediatePropagation();
        clicks = 0;
        openFontPanic('easter');
      }
    }, true);
  }

  function patchPoster() {
    const canvas = document.querySelector('.nfp-poster-canvas:not([data-fp-patched])');
    if (!canvas) return;
    canvas.dataset.fpPatched = 'true';
    setTimeout(() => {
      const context = canvas.getContext('2d');
      if (!context || canvas.width !== 1080) return;
      context.fillStyle = '#050505';
      context.fillRect(50, 818, 980, 70);
      context.fillStyle = '#ffffff';
      context.font = '900 38px Arial';
      context.fillText(`FONT PANIC     ${Number(loadScores().escape?.best || 0)}`, 60, 865);
    }, 50);
  }

  document.addEventListener('click', interceptClicks, true);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && activeModal) close();
  });

  const observer = new MutationObserver(() => {
    updateCard();
    replaceOldEgg();
    patchPoster();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const languageObserver = new MutationObserver(updateCard);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  injectStyles();
  updateCard();
  replaceOldEgg();
})();