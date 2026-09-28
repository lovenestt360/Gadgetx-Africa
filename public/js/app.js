'use strict';
/*
 * Lógica da loja GadgetX Africa. O conteúdo (catálogo, textos, contactos) vem de
 * STORE em js/data.js, que é carregado antes deste ficheiro.
 */

const $ = selector => document.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// Escapa texto vindo de data.js antes de o inserir como HTML.
const esc = value => String(value).replace(/[&<>"']/g, ch => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
));

const findIphone = id => STORE.iphones.find(p => p.id === id);
const familyOf = gen => STORE.families.find(f => f.gen === gen);
const colorsOf = p => (p && STORE.colors[p.colors]) || [];
// Descrição da variante no carrinho e na revisão: "512 GB · Preto".
const variantLabel = x => [x.size, x.color].filter(Boolean).join(' · ');
const MAX_QTY = STORE.maxQtyPerItem;
const CART_KEY = 'gadgetx-cart';

/* ---------- Contactos e conteúdo estático ---------- */

$$('[data-whatsapp]').forEach(a => { a.href = STORE.contact.whatsapp; });
$$('[data-instagram]').forEach(a => { a.href = STORE.contact.instagram; });
$('#year').textContent = new Date().getFullYear();

STORE.countries.forEach(country => {
  const option = document.createElement('option');
  option.value = country;
  option.textContent = country;
  $('#country').append(option);
});

function renderShop() {
  $$('[data-shop]').forEach(grid => {
    const items = STORE.shop[grid.dataset.shop] || [];
    grid.innerHTML = items.map(item => `
      <article class="shop-card">
        <div class="shop-image"><img src="${esc(item.image)}" alt="${esc(item.alt || item.name)}" width="400" height="400" loading="lazy"></div>
        <p class="eyebrow">${esc(item.eyebrow)}</p>
        <h3>${esc(item.name)}</h3>
        <a href="${esc(STORE.contact.whatsapp)}" target="_blank" rel="noopener noreferrer" class="shop-enquire">Consultar disponibilidade <span aria-hidden="true">↗</span></a>
      </article>`).join('');
  });
}

/* ---------- Carrinho (guardado no navegador) ---------- */

let cart = [];
try {
  const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  if (Array.isArray(raw)) {
    cart = raw
      .filter(x => {
        const p = x && findIphone(x.id);
        if (!p || !p.sizes.includes(x.size) || !Number.isInteger(x.qty) || x.qty < 1 || x.qty > MAX_QTY) return false;
        // Cor opcional; quando existe tem de ser uma das cores do modelo.
        return x.color === undefined || colorsOf(p).some(c => c.name === x.color);
      })
      .map(x => ({ id: x.id, size: x.size, color: x.color, qty: x.qty }))
      .slice(0, 20);
  }
} catch { /* armazenamento indisponível: começa vazio */ }

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* ignora */ }
  $('#bag-count').textContent = cart.reduce((n, x) => n + x.qty, 0);
}

function addToCart(id, size, color) {
  const item = cart.find(x => x.id === id && x.size === size && x.color === color);
  if (item && item.qty >= MAX_QTY) {
    toast(`Máximo de ${MAX_QTY} unidades por variante nesta demonstração.`);
    return false;
  }
  if (item) item.qty++;
  else cart.push({ id, size, color, qty: 1 });
  saveCart();
  return true;
}

function renderBag() {
  if (!cart.length) {
    $('#bag-items').innerHTML = '<p class="empty-bag">O teu carrinho está vazio.<br>Explora o catálogo e escolhe o teu iPhone.</p>';
    $('#bag-summary').innerHTML = '<button class="button dark" data-close>Explorar catálogo →</button>';
    return;
  }
  $('#bag-items').innerHTML = cart.map((x, i) => {
    const p = findIphone(x.id);
    return `
      <article class="bag-line">
        <div>
          <h3>${esc(p.name)}</h3>
          <p>${esc(variantLabel(x))} · Preço por confirmar</p>
          <button class="remove" data-remove="${i}">Remover</button>
        </div>
        <div class="quantity">
          <button data-qty="${i}" data-delta="-1" aria-label="Diminuir quantidade de ${esc(p.name)}" ${x.qty <= 1 ? 'disabled' : ''}>−</button>
          <span>${x.qty}</span>
          <button data-qty="${i}" data-delta="1" aria-label="Aumentar quantidade de ${esc(p.name)}" ${x.qty >= MAX_QTY ? 'disabled' : ''}>+</button>
        </div>
      </article>`;
  }).join('');
  $('#bag-summary').innerHTML = `
    <p class="notice">Subtotal e portes por confirmar. Podes experimentar o formulário de entrega sem efetuar uma compra.</p>
    <button class="button dark" id="start-checkout">Continuar para entrega →</button>`;
  $('#start-checkout').onclick = () => {
    showCheckoutStep(0);
    openModal('#checkout-dialog');
  };
}

/* ---------- Diálogos e avisos ---------- */

let toastTimer;
function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('visible'), 2800);
}

function openModal(selector) {
  $$('dialog[open]').forEach(d => d.close());
  $(selector).showModal();
}

function showPolicy(key) {
  const policy = STORE.policies[key];
  if (!policy) return;
  $('#policy-title').textContent = policy.title;
  $('#policy-body').innerHTML = policy.body;
  openModal('#policy-dialog');
}

/* ---------- Catálogo ---------- */

function renderProducts(gen = 'all') {
  $$('.filters button').forEach(b => {
    const on = b.dataset.filter === gen;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  $('#products').innerHTML = STORE.families
    .filter(f => gen === 'all' || f.gen === gen)
    .map(f => {
      const colors = colorsOf(findIphone(f.lead));
      const swatches = colors.length
        ? `<p class="product-colors" aria-label="Cores: ${esc(colors.map(c => c.name).join(', '))}">${colors.map(c => `<span class="swatch" style="--swatch:${esc(c.hex)}" title="${esc(c.name)}"></span>`).join('')}</p>`
        : '';
      return `
      <article class="product-card ${f.featured ? 'featured' : ''}">
        <p class="generation">${esc(f.label)}</p>
        <button type="button" data-product="${esc(f.lead)}" aria-label="Explorar ${esc(f.title)}" class="product-visual gen-${esc(f.gen)}">
          <img loading="lazy" src="${esc(f.image)}" alt="${esc(f.title)}">
        </button>
        <h3>${esc(f.title)}</h3>
        <p class="product-sub">${esc(f.sub)}</p>
        ${swatches}
        <div class="product-bottom">
          <p>Preço por confirmar</p>
          <button class="model-button" data-product="${esc(f.lead)}">Ver modelos <span aria-hidden="true">↗</span></button>
        </div>
      </article>`;
    })
    .join('');
}

// `preferredColor` mantém a cor escolhida ao trocar de modelo (ex.: Pro → Pro Max).
function showProduct(id, preferredColor) {
  const p = findIphone(id);
  if (!p) return;
  const detail = $('#product-detail');
  const models = STORE.iphones.filter(x => x.gen === p.gen);
  const family = familyOf(p.gen);
  const colors = colorsOf(p);
  let color = colors.find(c => c.name === preferredColor) || colors[0];
  const photoAlt = c => c ? `${p.name} em ${c.name}` : `Imagem ilustrativa de ${family?.title || p.name}`;
  detail.innerHTML = `
    <p class="eyebrow">${esc((family?.title || p.name).toUpperCase())}</p>
    <h2 id="product-title">${esc(p.name)}</h2>
    <p class="muted">${esc(p.sub)}</p>
    <img class="detail-photo" src="${esc(color?.image || family?.image || '')}" alt="${esc(photoAlt(color))}">
    <label class="detail-label" for="model-choice">Modelo</label>
    <select id="model-choice">
      ${models.map(x => `<option value="${esc(x.id)}" ${x.id === p.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}
    </select>
    ${colors.length ? `
    <span class="detail-label">Cor · <strong id="color-name">${esc(color.name)}</strong></span>
    <div class="option-row color-row" role="group" aria-label="Escolher cor">
      ${colors.map(c => `<button data-color="${esc(c.name)}" class="${c === color ? 'selected' : ''}" aria-pressed="${c === color}"><span class="swatch" style="--swatch:${esc(c.hex)}"></span>${esc(c.name)}</button>`).join('')}
    </div>` : ''}
    <span class="detail-label">Capacidade pretendida</span>
    <div class="option-row" role="group" aria-label="Escolher capacidade">
      ${p.sizes.map((s, i) => `<button data-size="${esc(s)}" class="${i === 0 ? 'selected' : ''}" aria-pressed="${i === 0}">${esc(s)}</button>`).join('')}
    </div>
    <p class="notice">Preço e stock por confirmar. A cor e a capacidade escolhidas nesta demonstração representam uma preferência e não uma reserva de stock.</p>
    <div class="detail-actions">
      <button class="button dark" id="add-cart">Adicionar ao carrinho <span aria-hidden="true">+</span></button>
      <a href="${esc(STORE.contact.whatsapp)}" target="_blank" rel="noopener noreferrer">Tirar uma dúvida ↗</a>
    </div>`;

  let selected = p.sizes[0];
  $('#model-choice').onchange = e => showProduct(e.target.value, color?.name);
  $$('[data-color]', detail).forEach(b => b.addEventListener('click', () => {
    color = colors.find(c => c.name === b.dataset.color);
    const photo = $('.detail-photo', detail);
    photo.src = color.image;
    photo.alt = photoAlt(color);
    $('#color-name').textContent = color.name;
    $$('[data-color]', detail).forEach(x => {
      x.classList.toggle('selected', x === b);
      x.setAttribute('aria-pressed', String(x === b));
    });
  }));
  $$('[data-size]', detail).forEach(b => b.addEventListener('click', () => {
    selected = b.dataset.size;
    $$('[data-size]', detail).forEach(x => {
      x.classList.toggle('selected', x === b);
      x.setAttribute('aria-pressed', String(x === b));
    });
  }));
  $('#add-cart').onclick = () => {
    if (!addToCart(p.id, selected, color?.name)) return;
    $('#product-dialog').close();
    toast(`${[p.name, color?.name].filter(Boolean).join(' · ')} adicionado ao carrinho`);
  };

  if ($('#product-dialog').open) $('#model-choice').focus({ preventScroll: true });
  else openModal('#product-dialog');
}

/* ---------- Checkout de demonstração ---------- */

function showCheckoutStep(step) {
  $('#shipping-form').hidden = step !== 0;
  $('#review').hidden = step !== 1;
  $$('.checkout-progress li').forEach((li, i) => li.classList.toggle('current', i === step));
}

$('#shipping-form').addEventListener('submit', e => {
  e.preventDefault();
  if (!cart.length) {
    renderBag();
    openModal('#bag-dialog');
    return;
  }
  if (!e.target.reportValidity()) return;
  const d = Object.fromEntries(new FormData(e.target));
  const review = $('#review');
  showCheckoutStep(1);
  review.replaceChildren();

  const add = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    review.append(el);
    return el;
  };

  add('h3', '', 'Confirma os detalhes.');
  cart.forEach(x => {
    const row = add('div', 'review-row');
    const model = document.createElement('span');
    const qty = document.createElement('span');
    model.textContent = `${findIphone(x.id).name} · ${variantLabel(x)}`;
    qty.textContent = `× ${x.qty}`;
    row.append(model, qty);
  });
  add('p', 'review-address', [
    d.name,
    d.address,
    [d.city, d.region, d.postcode].filter(Boolean).join(', '),
    d.country,
    d.phone,
    d.email,
    d.reference
  ].filter(Boolean).join('\n'));

  const edit = add('button', 'edit-link', 'Editar dados de entrega');
  edit.type = 'button';
  edit.onclick = () => showCheckoutStep(0);

  add('p', 'notice', 'Demonstração concluída. Estes dados não foram enviados. O pagamento será disponibilizado depois de confirmados os preços, portes, stock e prestador. Nenhuma encomenda foi criada.');
  const pay = add('button', 'button dark', 'Pagamento ainda indisponível');
  pay.disabled = true;
  $('#checkout-dialog').scrollTop = 0;
});

/* ---------- Cliques delegados ---------- */

$('#open-bag').onclick = () => {
  renderBag();
  openModal('#bag-dialog');
};

document.addEventListener('click', e => {
  const b = e.target.closest('[data-close],[data-filter],[data-product],[data-policy],[data-remove],[data-qty]');
  if (!b) return;
  if (b.hasAttribute('data-close')) {
    b.closest('dialog').close();
  } else if (b.dataset.filter) {
    renderProducts(b.dataset.filter);
  } else if (b.dataset.product) {
    showProduct(b.dataset.product);
  } else if (b.dataset.policy) {
    e.preventDefault();
    showPolicy(b.dataset.policy);
  } else if (b.dataset.remove !== undefined) {
    cart.splice(Number(b.dataset.remove), 1);
    saveCart();
    renderBag();
  } else if (b.dataset.qty !== undefined) {
    const item = cart[Number(b.dataset.qty)];
    if (item) item.qty = Math.min(MAX_QTY, Math.max(1, item.qty + Number(b.dataset.delta)));
    saveCart();
    renderBag();
  }
});

renderShop();
renderProducts();
saveCart();

/* ---------- Movimento ----------
 * Tudo usa apenas transform e opacity; a loja continua utilizável sem estas animações.
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)');

// Menu em cortina
const menu = $('#site-menu');
const menuButton = $('#menu-toggle');
const curtain = $('.page-curtain');
let curtainBusy = false;
let curtainTimer;

function setMenu(open) {
  menu.classList.toggle('open', open);
  menu.inert = !open;
  menu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));

document.addEventListener('keydown', e => {
  if (!menu.classList.contains('open')) return;
  if (e.key === 'Escape') {
    setMenu(false);
    menuButton.focus();
    return;
  }
  // Mantém o foco do teclado dentro do menu aberto, incluindo o botão de fechar.
  if (e.key !== 'Tab') return;
  const links = [menuButton, ...menu.querySelectorAll('a')];
  const index = links.indexOf(document.activeElement);
  if (e.shiftKey && index <= 0) {
    e.preventDefault();
    links.at(-1).focus();
  } else if (!e.shiftKey && (index < 0 || index === links.length - 1)) {
    e.preventDefault();
    menuButton.focus();
  }
});

// Links internos (#secção) passam pela transição de cortina.
function navigateWithCurtain(anchor) {
  const destination = anchor.getAttribute('href');
  const target = document.querySelector(destination);
  if (!target) return;

  const change = () => {
    if (anchor.dataset.filter) renderProducts(anchor.dataset.filter);
    setMenu(false);
    history.replaceState(null, '', destination);
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto';
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    html.style.scrollBehavior = '';
    const heading = target.querySelector('h2') || target;
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  };

  if (reducedMotion.matches) { change(); return; }
  if (curtainBusy) return;
  curtainBusy = true;
  curtain.classList.remove('reveal');
  curtain.classList.add('active');
  requestAnimationFrame(() => requestAnimationFrame(() => curtain.classList.add('cover')));
  clearTimeout(curtainTimer);
  curtainTimer = setTimeout(() => {
    change();
    curtain.classList.add('reveal');
    curtain.classList.remove('cover');
    curtainTimer = setTimeout(() => {
      curtain.classList.remove('active', 'reveal');
      curtainBusy = false;
    }, 760);
  }, 680);
}

document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor || anchor.hasAttribute('data-policy') || anchor.classList.contains('skip')) return;
  const href = anchor.getAttribute('href');
  if (!href || href === '#' || !document.querySelector(href)) return;
  e.preventDefault();
  e.stopPropagation();
  navigateWithCurtain(anchor);
}, true);

window.addEventListener('pageshow', () => {
  curtain.classList.remove('active', 'cover', 'reveal');
  curtainBusy = false;
});

// Revelação dos cartões ao entrar no ecrã
const revealObserver = 'IntersectionObserver' in window && !reducedMotion.matches
  ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
  : null;

function registerReveals(scope = document) {
  if (!revealObserver) return;
  $$('.section-heading, .delivery-steps article, .help, .product-card, .shop-card', scope).forEach((el, i) => {
    if (el.classList.contains('reveal-item')) return;
    el.style.setProperty('--reveal-delay', Math.min(i % 4, 3) * 65 + 'ms');
    el.classList.add('reveal-item');
    revealObserver.observe(el);
  });
}
registerReveals();
const productGrid = $('#products');
new MutationObserver(() => registerReveals(productGrid)).observe(productGrid, { childList: true });

// Os vídeos das Novidades são geridos por news-videos.js.

// Botões "magnéticos" que seguem ligeiramente o ponteiro
if (finePointer.matches) {
  let activeMagnet = null;
  let magnetBox = null;
  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const resetMagnet = el => {
    el.style.setProperty('--mag-x', '0px');
    el.style.setProperty('--mag-y', '0px');
  };

  document.addEventListener('pointerover', e => {
    const el = e.target.closest('.button, .menu-toggle');
    if (el === activeMagnet) return;
    if (activeMagnet) resetMagnet(activeMagnet);
    activeMagnet = el;
    magnetBox = el ? el.getBoundingClientRect() : null;
    if (el) el.classList.add('magnetic');
  });

  document.addEventListener('pointermove', e => {
    if (reducedMotion.matches || !activeMagnet) return;
    pointerX = e.clientX;
    pointerY = e.clientY;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      if (!activeMagnet || !magnetBox) return;
      const x = (pointerX - magnetBox.left - magnetBox.width / 2) * 0.12;
      const y = (pointerY - magnetBox.top - magnetBox.height / 2) * 0.12;
      activeMagnet.style.setProperty('--mag-x', Math.max(-9, Math.min(9, x)) + 'px');
      activeMagnet.style.setProperty('--mag-y', Math.max(-7, Math.min(7, y)) + 'px');
    });
  }, { passive: true });

  document.addEventListener('pointerout', e => {
    if (!activeMagnet || activeMagnet.contains(e.relatedTarget)) return;
    resetMagnet(activeMagnet);
    activeMagnet = null;
  });
}

// Cursor "Ver ↗" sobre as imagens do catálogo
if (finePointer.matches && !reducedMotion.matches) {
  const hoverCursor = $('.hover-cursor');
  document.addEventListener('pointermove', e => {
    const card = e.target.closest('.product-visual');
    hoverCursor.classList.toggle('visible', Boolean(card));
    if (!card) return;
    hoverCursor.style.setProperty('--cursor-x', (e.clientX - 29) + 'px');
    hoverCursor.style.setProperty('--cursor-y', (e.clientY - 29) + 'px');
  }, { passive: true });
}

// Saudação multilingue: só numa visita nova, nunca ao voltar com o botão "atrás".
const entry = $('.entry-loader');
const cameBack = performance.getEntriesByType('navigation').some(n => n.type === 'back_forward');
if (!reducedMotion.matches && !cameBack) {
  const words = ['Hello.', 'Bonjour.', 'Olá.', 'Ciao.', 'Hallo.'];
  const word = entry.querySelector('.entry-word');
  let index = 0;
  entry.classList.add('playing');
  document.body.classList.add('entry-loading');
  const cycle = setInterval(() => {
    index++;
    if (index < words.length) {
      word.textContent = words[index];
      return;
    }
    clearInterval(cycle);
    entry.classList.add('exit');
    setTimeout(() => {
      entry.classList.remove('playing', 'exit');
      document.body.classList.remove('entry-loading');
      document.body.classList.add('entry-complete');
      window.dispatchEvent(new Event('gadgetx:intro-ready'));
    }, 700);
  }, 285);
} else {
  document.body.classList.add('entry-complete');
}

reducedMotion.addEventListener('change', () => {
  if (!reducedMotion.matches) return;
  $$('.reveal-item').forEach(el => el.classList.add('in-view'));
  entry.classList.remove('playing', 'exit');
  document.body.classList.remove('entry-loading');
  document.body.classList.add('entry-complete');
});
