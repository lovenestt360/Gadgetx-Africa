'use strict';
/* Scroll native → video time. One pending seek, no wheel/touch interception.
 * Keep final 12% of the sticky runway for the final frame before the next section.
 */
(() => {
  const story = document.querySelector('.camera-story');
  const stage = story.querySelector('.camera-stage');
  const video = document.querySelector('#camera-video');
  const play = document.querySelector('#camera-play');
  const ending = story.querySelector('.camera-ending');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  let progress = 0;
  let frame = 0;
  let manual = false;
  let failed = false;
  let pendingTime = 0;

  function seek() {
    if (manual || failed || reduced.matches || !Number.isFinite(video.duration) || video.seeking) return;
    if (!video.seekable.length || video.seekable.end(video.seekable.length - 1) < pendingTime) return;
    // A seeked event flushes the latest target, even after a fast scroll jump.
    if (Math.abs(video.currentTime - pendingTime) > 0.025) {
      try { video.currentTime = pendingTime; } catch (_) { /* metadata not ready yet */ }
    }
  }

  function render() {
    frame = 0;
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, story.offsetHeight - stage.offsetHeight);
    progress = clamp(-rect.top / travel);
    const p = reduced.matches || failed ? 0 : progress;
    stage.style.setProperty('--camera-scale', (1.12 - 0.34 * p).toFixed(4));
    stage.style.setProperty('--camera-radius', (p * 28).toFixed(1) + 'px');
    stage.style.setProperty('--camera-progress', p);
    stage.style.setProperty('--opening-opacity', clamp(1 - p / .28));
    stage.style.setProperty('--ending-opacity', clamp((p - .66) / .19));
    const showEnding = p >= .72 && !manual;
    ending.inert = !showEnding;
    ending.setAttribute('aria-hidden', String(!showEnding));
    document.body.classList.toggle('camera-view', rect.bottom > 90 && rect.top < innerHeight);
    if (Number.isFinite(video.duration)) {
      pendingTime = clamp(progress / .88) * Math.max(0, video.duration - 1 / 30);
      seek();
    }
  }
  function requestRender() { if (!frame) frame = requestAnimationFrame(render); }
  function leaveManual() {
    if (!manual) return;
    manual = false;
    video.pause();
    video.controls = false;
    stage.classList.remove('manual-play');
    play.textContent = 'Reproduzir vídeo';
    play.setAttribute('aria-pressed', 'false');
  }
  addEventListener('scroll', () => {
    if (!reduced.matches) leaveManual();
    requestRender();
  }, { passive: true });
  addEventListener('resize', requestRender, { passive: true });
  addEventListener('pageshow', requestRender);
  addEventListener('gadgetx:intro-ready', requestRender);
  video.addEventListener('loadedmetadata', requestRender);
  video.addEventListener('loadeddata', () => { stage.classList.add('video-ready'); seek(); });
  video.addEventListener('seeked', seek);
  video.addEventListener('progress', seek);
  video.addEventListener('canplay', seek);
  function showFallback() {
    failed = true;
    leaveManual();
    story.classList.add('media-unavailable');
    story.querySelector('.camera-fallback').hidden = false;
    play.hidden = true;
    requestRender();
  }
  video.addEventListener('error', showFallback);
  video.querySelector('source').addEventListener('error', showFallback);
  play.addEventListener('click', async () => {
    if (manual) { leaveManual(); requestRender(); return; }
    manual = true;
    stage.classList.add('manual-play');
    ending.inert = true;
    ending.setAttribute('aria-hidden', 'true');
    video.controls = true;
    play.textContent = 'Pausar vídeo';
    play.setAttribute('aria-pressed', 'true');
    if (video.currentTime >= video.duration - .1) video.currentTime = 0;
    try { await video.play(); } catch (_) { leaveManual(); }
  });
  video.addEventListener('ended', () => { leaveManual(); requestRender(); });
  reduced.addEventListener('change', () => { leaveManual(); requestRender(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) leaveManual(); else requestRender();
  });
  requestRender();

  // Vídeos das Novidades: reprodução automática, em loop e sem controlos.
  // Só descarregam e tocam quando estão no ecrã; com movimento reduzido fica o poster.
  const films = [...document.querySelectorAll('.news-video-wrap video')];
  const startFilm = film => {
    if (reduced.matches) return;
    if (!film.getAttribute('src')) film.src = film.dataset.videoSrc;
    film.play().catch(() => { /* autoplay bloqueado: fica o poster */ });
  };
  films.forEach(film => {
    film.controls = false;
    film.addEventListener('pause', () => {
      // Sem controlos, só pausa quando sai do ecrã ou com movimento reduzido.
      if (film.dataset.visible === 'true' && !reduced.matches && !document.hidden) startFilm(film);
    });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.dataset.visible = String(entry.isIntersecting);
      if (entry.isIntersecting) startFilm(entry.target);
      else entry.target.pause();
    }), { threshold: .25 });
    films.forEach(film => observer.observe(film));
  } else {
    films.forEach(startFilm);
  }
  reduced.addEventListener('change', () => films.forEach(film => {
    if (reduced.matches) film.pause();
    else if (film.dataset.visible === 'true') startFilm(film);
  }));
  document.addEventListener('visibilitychange', () => films.forEach(film => {
    if (!document.hidden && film.dataset.visible === 'true') startFilm(film);
  }));
})();
