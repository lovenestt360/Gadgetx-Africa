'use strict';
/* A escolha no destaque é uma preferência de demonstração: não confirma stock nem preço. */
(() => {
  const stage = document.querySelector('#pdp-image-stage');
  if (!stage) return;
  const image = document.querySelector('#pdp-image');
  const caption = stage.querySelector('.pdp-image-caption');
  const gallery = [
    { src: 'assets/iphone18/pro-duo.webp', alt: 'iPhone 18 Pro em borgonha visto de frente e de trás', caption: '01 / 03 · iPhone 18 Pro' },
    { src: 'assets/iphone18-pro-detail.webp', alt: 'Detalhe das três câmaras do iPhone 18 Pro', caption: '02 / 03 · Câmara Pro' },
    { src: 'assets/iphone18/finishes.webp', alt: 'Quatro acabamentos da família iPhone 18 Pro', caption: '03 / 03 · Acabamentos' }
  ];
  let model = '18pro';
  let size = '256 GB';
  let colour = 'Borgonha';
  let current = 0;
  const dock = document.querySelector('#purchase-dock');
  const updateDock = () => {
    document.querySelector('#dock-model').textContent = findIphone(model).name;
    document.querySelector('#dock-variant').textContent = `${colour} · ${size} · Preço por confirmar`;
  };

  const selectIn = (selector, selected) => {
    document.querySelectorAll(selector).forEach(button => {
      const active = button === selected;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  function showImage(index, force = false) {
    if (index === current && !force) return;
    current = index;
    const item = gallery[index];
    stage.classList.toggle('is-light', item.src.endsWith('.png'));
    image.classList.add('switching');
    const next = new Image();
    next.src = item.src;
    const reveal = () => {
      image.src = item.src;
      image.alt = item.alt;
      caption.textContent = item.caption;
      requestAnimationFrame(() => image.classList.remove('switching'));
    };
    if (next.complete) reveal();
    else { next.onload = reveal; next.onerror = () => image.classList.remove('switching'); }
    selectIn('[data-gallery]', document.querySelector(`[data-gallery="${index}"]`));
  }

  document.querySelectorAll('[data-gallery]').forEach(button => {
    button.addEventListener('click', () => showImage(Number(button.dataset.gallery)));
  });
  document.querySelectorAll('[data-hero-model]').forEach(button => {
    button.addEventListener('click', () => {
      model = button.dataset.heroModel;
      selectIn('[data-hero-model]', button);
      document.querySelector('#pdp-title').innerHTML = model === '18max' ? 'iPhone 18 Pro Max<span>.</span>' : 'iPhone 18 Pro<span>.</span>';
      gallery[0].caption = `01 / 03 · ${findIphone(model).name}`;
      if (current === 0) caption.textContent = gallery[0].caption;
      updateDock();
    });
  });
  document.querySelectorAll('[data-hero-size]').forEach(button => {
    button.addEventListener('click', () => {
      size = button.dataset.heroSize;
      selectIn('[data-hero-size]', button);
      updateDock();
    });
  });
  document.querySelectorAll('[data-hero-colour]').forEach(button => {
    button.addEventListener('click', () => {
      selectIn('[data-hero-colour]', button);
      colour = button.dataset.heroColour;
      document.querySelector('#pdp-colour-name').textContent = '· ' + colour;
      const variant = colorsOf(findIphone(model)).find(item => item.name === colour);
      if (variant) {
        gallery[0].src = variant.image;
        gallery[0].alt = `${findIphone(model).name} em ${colour}`;
        gallery[0].caption = `01 / 03 · ${colour}`;
        document.querySelector('[data-gallery="0"] img').src = variant.image;
        showImage(0, true);
      }
      updateDock();
    });
  });
  document.querySelector('#pdp-add').addEventListener('click', () => {
    if (!addToCart(model, size, colour)) return;
    toast(`${findIphone(model).name} · ${size} · ${colour} adicionado ao carrinho de demonstração`);
  });
  document.querySelector('#dock-add').addEventListener('click', () => document.querySelector('#pdp-add').click());
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      dock.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(document.querySelector('#produto-destaque'));
  }

  const search = document.querySelector('#search-input');
  const results = document.querySelector('#search-results');
  const setResults = () => {
    const query = search.value.trim().toLocaleLowerCase('pt');
    const matches = query.length > 1 ? STORE.iphones.filter(item => item.name.toLocaleLowerCase('pt').includes(query)).slice(0, 6) : [];
    results.innerHTML = matches.map(item => `<button type="button" data-product="${esc(item.id)}">${esc(item.name)}<span>Ver modelo ↗</span></button>`).join('');
    results.hidden = !matches.length;
    search.setAttribute('aria-expanded', String(matches.length > 0));
    return matches;
  };
  search.addEventListener('input', setResults);
  document.querySelector('#site-search').addEventListener('submit', event => {
    event.preventDefault();
    const first = setResults()[0];
    if (first) { showProduct(first.id); results.hidden = true; search.setAttribute('aria-expanded', 'false'); }
  });
  results.addEventListener('click', () => { results.hidden = true; search.setAttribute('aria-expanded', 'false'); });
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { results.hidden = true; search.setAttribute('aria-expanded', 'false'); }
  });
  stage.addEventListener('click', () => showImage((current + 1) % gallery.length));
  stage.tabIndex = 0;
  stage.setAttribute('role', 'button');
  stage.setAttribute('aria-label', 'Ver próxima imagem do iPhone 18 Pro');
  stage.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showImage((current + 1) % gallery.length);
    }
  });
})();
