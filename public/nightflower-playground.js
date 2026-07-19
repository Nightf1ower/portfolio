(() => {
  if (window.__nightflowerPlaygroundLoaded) return;
  window.__nightflowerPlaygroundLoaded = true;

  const VERSION = 'playground-1';
  const STORAGE_KEY = 'nightflower-playground-scores-v1';
  const GAME_IDS = ['noise', 'grid', 'ugly', 'escape'];

  const COPY = {
    ru: {
      eyebrow: 'ИНТЕРАКТИВНЫЕ ЭКСПЕРИМЕНТЫ',
      title: 'NIGHTFLOWER PLAYGROUND',
      lead: 'Визуальный шум, сломанные сетки и несколько способов испортить этот сайт.',
      play: 'ИГРАТЬ',
      best: 'ЛУЧШИЙ РЕЗУЛЬТАТ',
      notPlayed: 'НЕ ПРОЙДЕНО',
      completed: 'ПРОЙДЕНО',
      close: 'ЗАКРЫТЬ',
      score: 'СЧЁТ',
      time: 'ВРЕМЯ',
      restart: 'ЕЩЁ РАЗ',
      projects: 'К ПРОЕКТАМ',
      result: 'РЕЗУЛЬТАТ',
      unlocked: 'YOU BROKE THE PORTFOLIO',
      unlockedText: 'Все четыре эксперимента пройдены. Собери финальный постер из своих результатов.',
      openPoster: 'ОТКРЫТЬ ФИНАЛЬНЫЙ ПОСТЕР',
      savePoster: 'СОХРАНИТЬ ПОСТЕР',
      posterAgain: 'СОБРАТЬ ДРУГОЙ',
      backToGames: 'К ИГРАМ',
      easterEgg: 'ПАСХАЛКА НАЙДЕНА',
      games: {
        noise: {
          number: '01',
          title: 'VISUAL NOISE',
          description: 'Лови цветок. Каждое попадание превращает экран в новый экспериментальный постер.',
          instruction: 'ПОЙМАЙ ЦВЕТОК И СОБЕРИ КАК МОЖНО БОЛЬШЕ ВИЗУАЛЬНОГО ШУМА',
        },
        grid: {
          number: '02',
          title: 'DESTROY THE GRID',
          description: 'Разрушай идеальную сетку, пока композиция окончательно не потеряет контроль.',
          instruction: 'РАЗБЕЙ ВСЕ ЭЛЕМЕНТЫ СЕТКИ ДО КОНЦА ВРЕМЕНИ',
        },
        ugly: {
          number: '03',
          title: 'MAKE IT UGLY',
          description: 'Добавляй шум, типографику, стикеры и искажения, пока макет не станет достаточно уродливым.',
          instruction: 'ДОВЕДИ ШКАЛУ ДО UGLY ENOUGH',
          actions: ['ШУМ', 'ТЕКСТ', 'СТИКЕР', 'ИСКАЗИТЬ'],
          enough: 'UGLY ENOUGH',
        },
        escape: {
          number: '04',
          title: 'LOGO ESCAPE',
          description: 'Цветок постоянно убегает. Успей поймать его как можно больше раз.',
          instruction: 'ЛОВИ ЦВЕТОК, ПОКА ОН НЕ СБЕЖАЛ',
        },
      },
    },
    en: {
      eyebrow: 'INTERACTIVE EXPERIMENTS',
      title: 'NIGHTFLOWER PLAYGROUND',
      lead: 'Visual noise, broken grids and several ways to ruin this website.',
      play: 'PLAY',
      best: 'BEST SCORE',
      notPlayed: 'NOT PLAYED',
      completed: 'COMPLETED',
      close: 'CLOSE',
      score: 'SCORE',
      time: 'TIME',
      restart: 'PLAY AGAIN',
      projects: 'VIEW PROJECTS',
      result: 'RESULT',
      unlocked: 'YOU BROKE THE PORTFOLIO',
      unlockedText: 'All four experiments are complete. Build a final poster from your results.',
      openPoster: 'OPEN FINAL POSTER',
      savePoster: 'SAVE POSTER',
      posterAgain: 'GENERATE ANOTHER',
      backToGames: 'BACK TO GAMES',
      easterEgg: 'EASTER EGG FOUND',
      games: {
        noise: {
          number: '01',
          title: 'VISUAL NOISE',
          description: 'Catch the flower. Every hit turns the screen into a new experimental poster.',
          instruction: 'CATCH THE FLOWER AND BUILD AS MUCH VISUAL NOISE AS POSSIBLE',
        },
        grid: {
          number: '02',
          title: 'DESTROY THE GRID',
          description: 'Break the perfect grid until the composition completely loses control.',
          instruction: 'DESTROY EVERY GRID ELEMENT BEFORE TIME RUNS OUT',
        },
        ugly: {
          number: '03',
          title: 'MAKE IT UGLY',
          description: 'Add noise, typography, stickers and distortion until the layout is ugly enough.',
          instruction: 'FILL THE METER UNTIL IT SAYS UGLY ENOUGH',
          actions: ['NOISE', 'TYPE', 'STICKER', 'DISTORT'],
          enough: 'UGLY ENOUGH',
        },
        escape: {
          number: '04',
          title: 'LOGO ESCAPE',
          description: 'The flower keeps running away. Catch it as many times as possible.',
          instruction: 'CATCH THE FLOWER BEFORE IT ESCAPES',
        },
      },
    },
  };

  let modal = null;
  let activeCleanup = [];
  let previousBodyOverflow = '';
  let previousHtmlOverflow = '';
  let sectionMounted = false;
  let currentGameId = null;

  const currentLanguage = () => {
    const htmlLanguage = document.documentElement.lang;
    if (htmlLanguage === 'ru' || htmlLanguage === 'en') return htmlLanguage;
    return localStorage.getItem('site-language') === 'ru' ? 'ru' : 'en';
  };

  const t = () => COPY[currentLanguage()];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
  }

  function loadScores() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return GAME_IDS.reduce((acc, id) => {
        acc[id] = {
          best: Number(parsed[id]?.best || 0),
          played: Boolean(parsed[id]?.played),
        };
        return acc;
      }, {});
    } catch {
      return GAME_IDS.reduce((acc, id) => {
        acc[id] = { best: 0, played: false };
        return acc;
      }, {});
    }
  }

  function saveScore(gameId, score) {
    const scores = loadScores();
    scores[gameId] = {
      best: Math.max(scores[gameId]?.best || 0, Math.round(score)),
      played: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    renderSection();
    return scores;
  }

  function allGamesComplete(scores = loadScores()) {
    return GAME_IDS.every((id) => scores[id]?.played);
  }

  function lockPage() {
    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockPage() {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  }

  function addCleanup(callback) {
    activeCleanup.push(callback);
  }

  function runCleanup() {
    activeCleanup.splice(0).forEach((callback) => {
      try {
        callback();
      } catch {
        // Cleanup should never block closing the game.
      }
    });
  }

  function closeModal() {
    runCleanup();
    modal?.remove();
    modal = null;
    currentGameId = null;
    unlockPage();
  }

  function injectStyles() {
    if (document.getElementById('nightflower-playground-style')) return;
    const style = el('style');
    style.id = 'nightflower-playground-style';
    style.textContent = `
      #nightflower-playground{position:relative;background:#050505;color:#fff;border-top:1px solid #050505;padding:5rem 1rem 6rem;overflow:hidden}
      .nfp-inner{width:min(100%,80rem);margin:0 auto}
      .nfp-eyebrow,.nfp-card-number,.nfp-card-status,.nfp-modal-label,.nfp-close,.nfp-stat-label,.nfp-game-copy,.nfp-action,.nfp-result-label,.nfp-result-button,.nfp-unlock-kicker{font-family:Arial,Helvetica,sans-serif;font-size:.68rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase}
      .nfp-eyebrow{display:inline-block;background:#b6ff00;color:#050505;padding:.42rem .75rem;margin:0 0 1.4rem}
      .nfp-title{margin:0;max-width:12ch;font-family:Arial,Helvetica,sans-serif;font-size:clamp(4rem,11vw,10rem);font-weight:900;line-height:.78;letter-spacing:-.09em;text-transform:uppercase}
      .nfp-lead{max-width:58rem;margin:1.5rem 0 0;font-family:Arial,Helvetica,sans-serif;font-size:clamp(1.25rem,2.6vw,2.5rem);font-weight:800;line-height:.96;letter-spacing:-.045em;text-transform:uppercase;color:rgba(255,255,255,.72)}
      .nfp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:4rem}
      .nfp-card{position:relative;min-height:22rem;border:1px solid rgba(255,255,255,.45);background:#050505;color:#fff;padding:1.25rem;text-align:left;overflow:hidden;cursor:pointer;transition:transform .25s ease,background .25s ease,color .25s ease,box-shadow .25s ease}
      .nfp-card:hover,.nfp-card:focus-visible{background:#b6ff00;color:#050505;transform:translateY(-.45rem);box-shadow:.65rem .65rem 0 #fff;outline:none}
      .nfp-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}
      .nfp-card-status{opacity:.55}
      .nfp-card-title{position:absolute;left:1.25rem;right:1.25rem;bottom:5.2rem;margin:0;font-family:Arial,Helvetica,sans-serif;font-size:clamp(2.6rem,5vw,5.7rem);font-weight:900;line-height:.78;letter-spacing:-.075em;text-transform:uppercase}
      .nfp-card-description{position:absolute;left:1.25rem;right:1.25rem;bottom:1.25rem;margin:0;max-width:42rem;font-family:Arial,Helvetica,sans-serif;font-size:.9rem;font-weight:700;line-height:1.05;letter-spacing:-.02em}
      .nfp-card-play{position:absolute;right:1.25rem;top:50%;width:4rem;height:4rem;border-radius:50%;display:flex;align-items:center;justify-content:center;border:1px solid currentColor;font-family:Arial,Helvetica,sans-serif;font-size:1.6rem;font-weight:900;transform:translateY(-50%)}
      .nfp-unlock{display:none;margin-top:1rem;border:1px solid #b6ff00;background:#b6ff00;color:#050505;padding:1.5rem;cursor:pointer;text-align:left}
      .nfp-unlock.is-visible{display:grid;grid-template-columns:1fr auto;align-items:end;gap:1rem}
      .nfp-unlock h3{margin:.45rem 0 0;font-family:Arial,Helvetica,sans-serif;font-size:clamp(2.5rem,7vw,7rem);font-weight:900;line-height:.8;letter-spacing:-.08em;text-transform:uppercase}
      .nfp-unlock p{max-width:48rem;margin:1rem 0 0;font-family:Arial,Helvetica,sans-serif;font-size:1rem;font-weight:700;line-height:1.05}
      .nfp-unlock-arrow{font-size:4rem;font-weight:900}
      .nfp-modal{position:fixed;inset:0;z-index:700;background:#050505;color:#fff;overflow:auto;padding:1rem}
      .nfp-modal-inner{width:min(100%,88rem);min-height:100%;margin:0 auto;display:flex;flex-direction:column}
      .nfp-modal-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.5rem 0 1rem;border-bottom:1px solid rgba(255,255,255,.35)}
      .nfp-modal-label{background:#b6ff00;color:#050505;padding:.45rem .75rem}
      .nfp-close{border:1px solid #fff;background:#050505;color:#fff;padding:.65rem 1rem;cursor:pointer}
      .nfp-game-header{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:end;padding:1.5rem 0}
      .nfp-game-title{margin:0;font-family:Arial,Helvetica,sans-serif;font-size:clamp(3.5rem,9vw,9rem);font-weight:900;line-height:.78;letter-spacing:-.085em;text-transform:uppercase}
      .nfp-game-copy{max-width:52rem;margin:.9rem 0 0;color:rgba(255,255,255,.66);line-height:1.2}
      .nfp-stats{display:flex;gap:.75rem}
      .nfp-stat{min-width:7rem;border:1px solid rgba(255,255,255,.4);padding:.75rem}
      .nfp-stat-value{display:block;margin-top:.35rem;font-family:Arial,Helvetica,sans-serif;font-size:2rem;font-weight:900;line-height:1}
      .nfp-stage{position:relative;flex:1;min-height:32rem;border:1px solid rgba(255,255,255,.45);overflow:hidden;background:#111}
      .nfp-instruction{position:absolute;left:1rem;right:1rem;top:1rem;z-index:10;margin:0;pointer-events:none;font-family:Arial,Helvetica,sans-serif;font-size:.66rem;font-weight:900;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.58)}
      .nfp-flower{position:absolute;width:4.5rem;height:4.5rem;border:0;border-radius:50%;background:#b6ff00;color:#050505;font-size:2.5rem;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:.35rem .35rem 0 #fff;transition:left .16s ease,top .16s ease,transform .12s ease}
      .nfp-flower:active{transform:scale(.84)}
      .nfp-noise-piece{position:absolute;display:block;max-width:75%;padding:.15rem .35rem;font-family:Arial,Helvetica,sans-serif;font-weight:900;line-height:.78;letter-spacing:-.06em;text-transform:uppercase;pointer-events:none;mix-blend-mode:screen}
      .nfp-grid-stage{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));grid-template-rows:repeat(5,minmax(4rem,1fr));gap:.35rem;padding:3.5rem 1rem 1rem;background:#fff}
      .nfp-grid-cell{border:1px solid #050505;background:#fff;color:#050505;display:flex;align-items:center;justify-content:center;font-family:Arial,Helvetica,sans-serif;font-size:clamp(1rem,3vw,3rem);font-weight:900;cursor:pointer;transition:transform .35s cubic-bezier(.2,.9,.2,1.4),opacity .35s ease,background .2s ease}
      .nfp-grid-cell:hover{background:#b6ff00}
      .nfp-grid-cell.is-destroyed{transform:translate(var(--tx),var(--ty)) rotate(var(--rot)) scale(.55);opacity:.12;background:#050505;color:#fff;pointer-events:none}
      .nfp-ugly-layout{display:grid;grid-template-columns:minmax(0,1fr) 15rem;gap:1rem;height:100%;padding:3.5rem 1rem 1rem;background:#e9e9e9}
      .nfp-clean-poster{position:relative;min-height:26rem;background:#fff;color:#050505;border:1px solid #050505;overflow:hidden;transition:filter .25s ease,transform .25s ease}
      .nfp-clean-poster::before{content:'NIGHTFLOWER';position:absolute;left:6%;top:8%;font-family:Arial,Helvetica,sans-serif;font-size:clamp(2rem,8vw,8rem);font-weight:900;line-height:.78;letter-spacing:-.09em}
      .nfp-clean-poster::after{content:'TOO CLEAN';position:absolute;right:6%;bottom:6%;font-family:Arial,Helvetica,sans-serif;font-size:.7rem;font-weight:900;letter-spacing:.3em}
      .nfp-ugly-layer{position:absolute;z-index:3;pointer-events:none;font-family:Arial,Helvetica,sans-serif;font-weight:900;text-transform:uppercase}
      .nfp-ugly-controls{display:flex;flex-direction:column;gap:.6rem}
      .nfp-action{border:1px solid #050505;background:#fff;color:#050505;padding:1rem .75rem;cursor:pointer;text-align:left}
      .nfp-action:hover{background:#b6ff00}
      .nfp-meter{height:1.3rem;border:1px solid #050505;background:#fff;margin-bottom:.5rem}
      .nfp-meter-fill{height:100%;width:0;background:#b6ff00;transition:width .2s ease}
      .nfp-meter-label{font-family:Arial,Helvetica,sans-serif;font-size:.68rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:#050505}
      .nfp-escape-stage{background:radial-gradient(circle at center,#262626 0,#050505 70%)}
      .nfp-escape-trail{position:absolute;width:.5rem;height:.5rem;border-radius:50%;background:#b6ff00;pointer-events:none;opacity:.55}
      .nfp-result{position:absolute;inset:0;z-index:30;display:flex;align-items:center;justify-content:center;background:rgba(5,5,5,.94);padding:1rem}
      .nfp-result-card{width:min(100%,48rem);border:1px solid #fff;background:#050505;padding:1.5rem;text-align:center}
      .nfp-result-score{margin:.8rem 0 1.4rem;font-family:Arial,Helvetica,sans-serif;font-size:clamp(5rem,18vw,13rem);font-weight:900;line-height:.75;letter-spacing:-.09em;color:#b6ff00}
      .nfp-result-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem}
      .nfp-result-button{border:1px solid #fff;background:#fff;color:#050505;padding:.85rem 1rem;cursor:pointer}
      .nfp-result-button.is-secondary{background:#050505;color:#fff}
      .nfp-poster-wrap{flex:1;display:grid;grid-template-columns:minmax(0,1fr) 14rem;gap:1rem;padding:1.5rem 0}
      .nfp-poster-canvas-wrap{display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.35);padding:1rem;background:#111}
      .nfp-poster-canvas{display:block;max-width:100%;max-height:72vh;width:auto;height:auto;background:#050505}
      .nfp-poster-actions{display:flex;flex-direction:column;gap:.75rem}
      .nfp-evasive-dot{position:relative;z-index:100;transition:transform .12s ease;will-change:transform}
      @media(max-width:800px){.nfp-grid{grid-template-columns:1fr}.nfp-card{min-height:18rem}.nfp-game-header{grid-template-columns:1fr}.nfp-stats{justify-content:flex-start}.nfp-ugly-layout,.nfp-poster-wrap{grid-template-columns:1fr}.nfp-ugly-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.nfp-stage{min-height:28rem}.nfp-grid-stage{grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(7,minmax(3.5rem,1fr))}}
      @media(max-width:520px){#nightflower-playground{padding:4rem 1rem}.nfp-title{font-size:3.7rem}.nfp-card-title{font-size:3rem}.nfp-game-title{font-size:3.6rem}.nfp-stats{width:100%}.nfp-stat{flex:1;min-width:0}.nfp-stage{min-height:31rem}.nfp-grid-stage{grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(9,minmax(3.2rem,1fr))}.nfp-flower{width:4rem;height:4rem}.nfp-unlock.is-visible{grid-template-columns:1fr}.nfp-unlock-arrow{display:none}}
    `;
    document.head.append(style);
  }

  function cardMarkup(gameId, scores) {
    const copy = t();
    const game = copy.games[gameId];
    const score = scores[gameId];
    const status = score.played ? `${copy.best}: ${score.best}` : copy.notPlayed;
    return `
      <button type="button" class="nfp-card" data-nfp-game="${gameId}">
        <span class="nfp-card-top">
          <span class="nfp-card-number">${game.number}</span>
          <span class="nfp-card-status">${status}</span>
        </span>
        <span class="nfp-card-play">↗</span>
        <h3 class="nfp-card-title">${game.title}</h3>
        <p class="nfp-card-description">${game.description}</p>
      </button>
    `;
  }

  function renderSection() {
    const section = document.getElementById('nightflower-playground');
    if (!section) return;
    const copy = t();
    const scores = loadScores();
    section.innerHTML = `
      <div class="nfp-inner">
        <p class="nfp-eyebrow">${copy.eyebrow}</p>
        <h2 class="nfp-title">${copy.title}</h2>
        <p class="nfp-lead">${copy.lead}</p>
        <div class="nfp-grid">
          ${GAME_IDS.map((id) => cardMarkup(id, scores)).join('')}
        </div>
        <button type="button" class="nfp-unlock ${allGamesComplete(scores) ? 'is-visible' : ''}" data-nfp-final>
          <span>
            <span class="nfp-unlock-kicker">${copy.completed}</span>
            <h3>${copy.unlocked}</h3>
            <p>${copy.unlockedText}</p>
          </span>
          <span class="nfp-unlock-arrow">↗</span>
        </button>
      </div>
    `;
  }

  function mountSection() {
    injectStyles();
    const footer = document.querySelector('#contacts');
    if (!footer) return false;
    let section = document.getElementById('nightflower-playground');
    if (!section) {
      section = el('section');
      section.id = 'nightflower-playground';
      footer.insertAdjacentElement('afterend', section);
      section.addEventListener('click', (event) => {
        const gameButton = event.target.closest('[data-nfp-game]');
        if (gameButton) openGame(gameButton.dataset.nfpGame);
        const finalButton = event.target.closest('[data-nfp-final]');
        if (finalButton) openFinalPoster();
      });
    }
    sectionMounted = true;
    renderSection();
    bindEasterEggs();
    return true;
  }

  function createModal(gameId, source) {
    const copy = t();
    const game = copy.games[gameId];
    closeModal();
    lockPage();
    currentGameId = gameId;

    modal = el('div', 'nfp-modal');
    modal.dataset.nfpGameModal = gameId;
    const inner = el('div', 'nfp-modal-inner');
    const header = el('div', 'nfp-modal-head');
    const labelText = source === 'easter' ? `${copy.easterEgg} / ${game.title}` : game.title;
    const label = el('p', 'nfp-modal-label', labelText);
    const closeButton = el('button', 'nfp-close', copy.close);
    closeButton.type = 'button';
    closeButton.onclick = closeModal;
    header.append(label, closeButton);

    const gameHeader = el('div', 'nfp-game-header');
    const headingWrap = el('div');
    headingWrap.append(
      el('h2', 'nfp-game-title', game.title),
      el('p', 'nfp-game-copy', game.instruction),
    );
    const stats = el('div', 'nfp-stats');
    const scoreStat = el('div', 'nfp-stat');
    scoreStat.append(el('span', 'nfp-stat-label', copy.score), el('strong', 'nfp-stat-value', '0'));
    scoreStat.dataset.nfpScoreStat = 'true';
    const timeStat = el('div', 'nfp-stat');
    timeStat.append(el('span', 'nfp-stat-label', copy.time), el('strong', 'nfp-stat-value', '20'));
    timeStat.dataset.nfpTimeStat = 'true';
    stats.append(scoreStat, timeStat);
    gameHeader.append(headingWrap, stats);

    const stage = el('div', 'nfp-stage');
    stage.dataset.nfpStage = 'true';
    stage.append(el('p', 'nfp-instruction', game.instruction));
    inner.append(header, gameHeader, stage);
    modal.append(inner);
    document.body.append(modal);

    return {
      stage,
      scoreValue: scoreStat.querySelector('.nfp-stat-value'),
      timeValue: timeStat.querySelector('.nfp-stat-value'),
    };
  }

  function startTimer(seconds, onTick, onEnd) {
    let remaining = seconds;
    onTick(remaining);
    const interval = window.setInterval(() => {
      remaining -= 1;
      onTick(Math.max(remaining, 0));
      if (remaining <= 0) {
        clearInterval(interval);
        onEnd();
      }
    }, 1000);
    addCleanup(() => clearInterval(interval));
    return () => remaining;
  }

  function finishGame(gameId, score, stage) {
    if (!modal || modal.dataset.nfpFinished === 'true') return;
    modal.dataset.nfpFinished = 'true';
    runCleanup();
    const copy = t();
    const finalScore = Math.max(0, Math.round(score));
    const scores = saveScore(gameId, finalScore);

    const result = el('div', 'nfp-result');
    const card = el('div', 'nfp-result-card');
    card.append(
      el('p', 'nfp-result-label', `${copy.result} / ${copy.games[gameId].title}`),
      el('p', 'nfp-result-score', String(finalScore)),
    );
    const actions = el('div', 'nfp-result-actions');
    const restart = el('button', 'nfp-result-button', copy.restart);
    restart.type = 'button';
    restart.onclick = () => openGame(gameId);
    const projects = el('button', 'nfp-result-button is-secondary', copy.projects);
    projects.type = 'button';
    projects.onclick = () => {
      closeModal();
      document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
    };
    actions.append(restart, projects);
    if (allGamesComplete(scores)) {
      const poster = el('button', 'nfp-result-button', copy.openPoster);
      poster.type = 'button';
      poster.onclick = openFinalPoster;
      actions.append(poster);
    }
    card.append(actions);
    result.append(card);
    stage.append(result);
  }

  function openGame(gameId, source = 'card') {
    if (!GAME_IDS.includes(gameId)) return;
    const ui = createModal(gameId, source);
    if (gameId === 'noise') startVisualNoise(ui);
    if (gameId === 'grid') startDestroyGrid(ui);
    if (gameId === 'ugly') startMakeItUgly(ui);
    if (gameId === 'escape') startLogoEscape(ui);
  }

  function moveFlower(flower, stage) {
    const padding = 18;
    const maxX = Math.max(padding, stage.clientWidth - flower.offsetWidth - padding);
    const maxY = Math.max(58, stage.clientHeight - flower.offsetHeight - padding);
    flower.style.left = `${randomInt(padding, maxX)}px`;
    flower.style.top = `${randomInt(54, maxY)}px`;
  }

  function startVisualNoise({ stage, scoreValue, timeValue }) {
    stage.classList.add('nfp-noise-stage');
    const words = ['NOISE', 'NIGHTFLOWER', 'RAW', 'CTRL', 'UGLY', 'TYPE', '×', '03.04.26', 'POSTER', 'ERROR'];
    const flower = el('button', 'nfp-flower', '✿');
    flower.type = 'button';
    stage.append(flower);
    let score = 0;
    let ended = false;

    const addPiece = () => {
      const piece = el('span', 'nfp-noise-piece', words[randomInt(0, words.length - 1)]);
      const size = random(1.4, 8.5);
      piece.style.left = `${random(0, 78)}%`;
      piece.style.top = `${random(8, 82)}%`;
      piece.style.fontSize = `${size}rem`;
      piece.style.transform = `rotate(${random(-35, 35)}deg)`;
      piece.style.color = Math.random() > .45 ? '#b6ff00' : '#ffffff';
      piece.style.background = Math.random() > .68 ? '#9b0014' : 'transparent';
      piece.style.opacity = String(random(.55, 1));
      stage.append(piece);
    };

    const hit = (event) => {
      event.preventDefault();
      score += 1;
      scoreValue.textContent = String(score);
      addPiece();
      if (score % 2 === 0) addPiece();
      moveFlower(flower, stage);
    };
    flower.addEventListener('pointerdown', hit);
    addCleanup(() => flower.removeEventListener('pointerdown', hit));

    const mover = window.setInterval(() => {
      if (!ended) moveFlower(flower, stage);
    }, 1100);
    addCleanup(() => clearInterval(mover));

    requestAnimationFrame(() => moveFlower(flower, stage));
    startTimer(20, (time) => { timeValue.textContent = String(time); }, () => {
      ended = true;
      finishGame('noise', score * 10, stage);
    });
  }

  function startDestroyGrid({ stage, scoreValue, timeValue }) {
    stage.classList.add('nfp-grid-stage');
    const symbols = ['N', 'I', 'G', 'H', 'T', 'F', 'L', 'O', 'W', 'E', 'R', '×', '01', '02', '03', '04', '05', '06', 'RAW', 'GRID', '+', '///', 'CTRL', 'ERR', 'END'];
    let destroyed = 0;
    let finished = false;
    let remainingGetter = () => 0;

    symbols.forEach((symbol, index) => {
      const cell = el('button', 'nfp-grid-cell', symbol);
      cell.type = 'button';
      cell.style.setProperty('--tx', `${random(-120, 120)}px`);
      cell.style.setProperty('--ty', `${random(-100, 100)}px`);
      cell.style.setProperty('--rot', `${random(-65, 65)}deg`);
      cell.dataset.index = String(index);
      stage.append(cell);
    });

    const onClick = (event) => {
      const cell = event.target.closest('.nfp-grid-cell');
      if (!cell || cell.classList.contains('is-destroyed') || finished) return;
      cell.classList.add('is-destroyed');
      destroyed += 1;
      scoreValue.textContent = String(destroyed);
      if (destroyed === symbols.length) {
        finished = true;
        finishGame('grid', destroyed * 8 + remainingGetter() * 5, stage);
      }
    };
    stage.addEventListener('click', onClick);
    addCleanup(() => stage.removeEventListener('click', onClick));

    remainingGetter = startTimer(20, (time) => { timeValue.textContent = String(time); }, () => {
      if (!finished) finishGame('grid', destroyed * 8, stage);
    });
  }

  function startMakeItUgly({ stage, scoreValue, timeValue }) {
    stage.classList.add('nfp-ugly-stage');
    const layout = el('div', 'nfp-ugly-layout');
    const poster = el('div', 'nfp-clean-poster');
    const controls = el('div', 'nfp-ugly-controls');
    const meter = el('div', 'nfp-meter');
    const meterFill = el('div', 'nfp-meter-fill');
    meter.append(meterFill);
    const meterLabel = el('p', 'nfp-meter-label', '0%');
    controls.append(meter, meterLabel);
    t().games.ugly.actions.forEach((label, index) => {
      const button = el('button', 'nfp-action', label);
      button.type = 'button';
      button.dataset.uglyAction = String(index);
      controls.append(button);
    });
    layout.append(poster, controls);
    stage.append(layout);

    let ugly = 0;
    let finished = false;
    let remainingGetter = () => 0;
    const words = ['TOO MUCH', 'WRONG', 'RAW', 'NIGHTFLOWER', 'NO RULES', '404', 'UGLY', 'CTRL+Z?'];

    const addLayer = (type) => {
      const layer = el('span', 'nfp-ugly-layer');
      layer.style.left = `${random(2, 72)}%`;
      layer.style.top = `${random(4, 80)}%`;
      layer.style.transform = `rotate(${random(-32, 32)}deg)`;
      if (type === 0) {
        layer.textContent = '▒▒▒▒▒▒▒▒▒▒';
        layer.style.fontSize = `${random(1.5, 5)}rem`;
        layer.style.color = '#050505';
        layer.style.opacity = String(random(.25, .75));
      } else if (type === 1) {
        layer.textContent = words[randomInt(0, words.length - 1)];
        layer.style.fontSize = `${random(2.2, 7.5)}rem`;
        layer.style.lineHeight = '.75';
        layer.style.letterSpacing = '-.08em';
        layer.style.color = Math.random() > .45 ? '#050505' : '#9b0014';
      } else if (type === 2) {
        layer.textContent = ['★', '✿', '×', 'NO', 'YES'][randomInt(0, 4)];
        layer.style.padding = '.3rem .55rem';
        layer.style.border = '2px solid #050505';
        layer.style.background = Math.random() > .5 ? '#b6ff00' : '#ffffff';
        layer.style.fontSize = `${random(1.2, 3.5)}rem`;
      } else {
        layer.textContent = '////////////////';
        layer.style.fontSize = `${random(1, 3)}rem`;
        layer.style.color = '#b6ff00';
        poster.style.transform = `skew(${random(-5, 5)}deg) rotate(${random(-2, 2)}deg)`;
        poster.style.filter = `contrast(${random(1.1, 1.8)}) saturate(${random(1.2, 2.4)})`;
      }
      poster.append(layer);
    };

    const onAction = (event) => {
      const button = event.target.closest('[data-ugly-action]');
      if (!button || finished) return;
      const type = Number(button.dataset.uglyAction);
      addLayer(type);
      ugly = Math.min(100, ugly + randomInt(9, 16));
      scoreValue.textContent = String(ugly);
      meterFill.style.width = `${ugly}%`;
      meterLabel.textContent = ugly >= 100 ? t().games.ugly.enough : `${ugly}%`;
      if (ugly >= 100) {
        finished = true;
        window.setTimeout(() => finishGame('ugly', 100 + remainingGetter() * 4, stage), 350);
      }
    };
    controls.addEventListener('click', onAction);
    addCleanup(() => controls.removeEventListener('click', onAction));

    remainingGetter = startTimer(25, (time) => { timeValue.textContent = String(time); }, () => {
      if (!finished) finishGame('ugly', ugly, stage);
    });
  }

  function startLogoEscape({ stage, scoreValue, timeValue }) {
    stage.classList.add('nfp-escape-stage');
    const flower = el('button', 'nfp-flower', '✿');
    flower.type = 'button';
    stage.append(flower);
    let score = 0;
    let finished = false;

    const addTrail = () => {
      const trail = el('span', 'nfp-escape-trail');
      trail.style.left = flower.style.left;
      trail.style.top = flower.style.top;
      stage.append(trail);
      window.setTimeout(() => trail.remove(), 750);
    };

    const move = () => {
      addTrail();
      moveFlower(flower, stage);
    };

    const catchFlower = (event) => {
      event.preventDefault();
      score += 1;
      scoreValue.textContent = String(score);
      flower.style.transform = `scale(${Math.max(.62, 1 - score * .025)})`;
      move();
    };
    flower.addEventListener('pointerdown', catchFlower);
    addCleanup(() => flower.removeEventListener('pointerdown', catchFlower));

    const mover = window.setInterval(() => {
      if (!finished) move();
    }, 780);
    addCleanup(() => clearInterval(mover));

    requestAnimationFrame(() => moveFlower(flower, stage));
    startTimer(20, (time) => { timeValue.textContent = String(time); }, () => {
      finished = true;
      finishGame('escape', score * 12, stage);
    });
  }

  function drawPoster(canvas) {
    const scores = loadScores();
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    const total = GAME_IDS.reduce((sum, id) => sum + (scores[id]?.best || 0), 0);
    const seed = Date.now() % 100000;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 18; i += 1) {
      ctx.save();
      ctx.translate(random(0, width), random(0, height));
      ctx.rotate(random(-.5, .5));
      ctx.fillStyle = i % 3 === 0 ? '#b6ff00' : i % 4 === 0 ? '#9b0014' : '#ffffff';
      ctx.globalAlpha = random(.18, .8);
      ctx.fillRect(-random(30, 180), -random(10, 70), random(120, 520), random(15, 130));
      ctx.restore();
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 150px Arial';
    ctx.fillText('YOU BROKE', 55, 180);
    ctx.fillStyle = '#b6ff00';
    ctx.fillText('THE', 55, 330);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('PORTFOLIO', 55, 480);

    ctx.font = '900 38px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`VISUAL NOISE  ${scores.noise.best}`, 60, 670);
    ctx.fillText(`DESTROY GRID  ${scores.grid.best}`, 60, 735);
    ctx.fillText(`MAKE IT UGLY  ${scores.ugly.best}`, 60, 800);
    ctx.fillText(`LOGO ESCAPE   ${scores.escape.best}`, 60, 865);

    ctx.fillStyle = '#b6ff00';
    ctx.fillRect(55, 940, 970, 4);
    ctx.font = '900 98px Arial';
    ctx.fillText(String(total).padStart(4, '0'), 55, 1070);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px Arial';
    ctx.fillText(`NIGHTFLOWER PLAYGROUND / ${seed}`, 58, 1265);
    ctx.fillText('INTERACTIVE PORTFOLIO EXPERIMENT', 58, 1305);
  }

  function openFinalPoster() {
    closeModal();
    lockPage();
    currentGameId = 'poster';

    modal = el('div', 'nfp-modal');
    const inner = el('div', 'nfp-modal-inner');
    const header = el('div', 'nfp-modal-head');
    const label = el('p', 'nfp-modal-label', t().unlocked);
    const closeButton = el('button', 'nfp-close', t().close);
    closeButton.type = 'button';
    closeButton.onclick = closeModal;
    header.append(label, closeButton);

    const wrap = el('div', 'nfp-poster-wrap');
    const canvasWrap = el('div', 'nfp-poster-canvas-wrap');
    const canvas = el('canvas', 'nfp-poster-canvas');
    canvasWrap.append(canvas);
    const actions = el('div', 'nfp-poster-actions');
    const saveButton = el('button', 'nfp-result-button', t().savePoster);
    const againButton = el('button', 'nfp-result-button is-secondary', t().posterAgain);
    const backButton = el('button', 'nfp-result-button is-secondary', t().backToGames);
    saveButton.type = againButton.type = backButton.type = 'button';
    saveButton.onclick = () => {
      const link = document.createElement('a');
      link.download = `nightflower-playground-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    againButton.onclick = () => drawPoster(canvas);
    backButton.onclick = () => {
      closeModal();
      document.querySelector('#nightflower-playground')?.scrollIntoView({ behavior: 'smooth' });
    };
    actions.append(saveButton, againButton, backButton);
    wrap.append(canvasWrap, actions);
    inner.append(header, wrap);
    modal.append(inner);
    document.body.append(modal);
    drawPoster(canvas);
  }

  function bindEasterEggs() {
    const heroTitle = document.querySelector('#top h1');
    if (heroTitle && !heroTitle.dataset.nfpEgg) {
      heroTitle.dataset.nfpEgg = 'true';
      heroTitle.style.cursor = 'pointer';
      let clicks = 0;
      let timeout = null;
      heroTitle.addEventListener('click', () => {
        clicks += 1;
        clearTimeout(timeout);
        timeout = window.setTimeout(() => { clicks = 0; }, 1800);
        if (clicks >= 4) {
          clicks = 0;
          openGame('noise', 'easter');
        }
      });
    }

    const visualCells = document.querySelectorAll('#top .grid.grid-cols-3 > div');
    visualCells.forEach((cell) => {
      if (cell.dataset.nfpEgg) return;
      cell.dataset.nfpEgg = 'true';
      cell.style.cursor = 'crosshair';
      cell.addEventListener('click', () => {
        const total = Number(sessionStorage.getItem('nfp-grid-egg') || 0) + 1;
        sessionStorage.setItem('nfp-grid-egg', String(total));
        if (total >= 6) {
          sessionStorage.setItem('nfp-grid-egg', '0');
          openGame('grid', 'easter');
        }
      });
    });

    const worksTitle = document.querySelector('#works h2');
    if (worksTitle && !worksTitle.dataset.nfpEgg) {
      worksTitle.dataset.nfpEgg = 'true';
      worksTitle.style.cursor = 'help';
      let clicks = 0;
      worksTitle.addEventListener('click', () => {
        clicks += 1;
        if (clicks >= 5) {
          clicks = 0;
          openGame('ugly', 'easter');
        }
      });
    }

    const dot = document.querySelector('header nav a[href="#top"] span');
    if (dot && !dot.dataset.nfpEgg) {
      dot.dataset.nfpEgg = 'true';
      dot.classList.add('nfp-evasive-dot');
      let escapes = 0;
      const evade = (event) => {
        if (event.pointerType === 'touch') return;
        escapes += 1;
        dot.style.transform = `translate(${random(-55, 55)}px,${random(-28, 28)}px) scale(1.7)`;
        if (escapes >= 4) {
          escapes = 0;
          dot.style.transform = '';
          openGame('escape', 'easter');
        }
      };
      dot.addEventListener('pointerenter', evade);
      dot.addEventListener('click', (event) => {
        event.preventDefault();
        escapes += 1;
        if (escapes >= 4) {
          escapes = 0;
          openGame('escape', 'easter');
        }
      });
    }
  }

  const observer = new MutationObserver(() => {
    if (!sectionMounted) mountSection();
    bindEasterEggs();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const languageObserver = new MutationObserver(() => {
    renderSection();
  });
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal) closeModal();
  });

  window.addEventListener('load', mountSection);
  mountSection();
})();