'use strict';
// Filmes editoriais: reprodução em silêncio apenas quando visíveis.
(() => {
  const films = [...document.querySelectorAll('.news-video-wrap video')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const start = film => {
    if (reduced.matches || document.hidden) return;
    if (!film.getAttribute('src')) film.src = film.dataset.videoSrc;
    film.play().catch(() => { /* poster continua visível */ });
  };
  films.forEach(film => {
    film.controls = false;
    film.addEventListener('pause', () => {
      if (film.dataset.visible === 'true' && !reduced.matches && !document.hidden) start(film);
    });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.dataset.visible = String(entry.isIntersecting);
      if (entry.isIntersecting) start(entry.target);
      else entry.target.pause();
    }), { threshold: .25 });
    films.forEach(film => observer.observe(film));
  } else films.forEach(start);
  reduced.addEventListener('change', () => films.forEach(film => {
    if (reduced.matches) film.pause();
    else if (film.dataset.visible === 'true') start(film);
  }));
  document.addEventListener('visibilitychange', () => films.forEach(film => {
    if (!document.hidden && film.dataset.visible === 'true') start(film);
  }));
})();
