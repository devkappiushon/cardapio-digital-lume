/* ─── Carrinho ────────────────────────────────────
   Store em vanilla JS com pub/sub via custom events.
   Persiste no localStorage. Emite 'cart:changed' a cada mutação.

   Eventos consumidos:  'cart:add', 'cart:open', 'cart:checkout-done'
   Eventos emitidos:    'cart:changed', 'cart:checkout-request'
─────────────────────────────────────────────── */

import { itemsById, formatBRL } from '../data/menu.js';

const STORAGE_KEY = 'lume.cart.v1';

/* ─── Estado ──────────────────────────── */
const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCart = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch {
    /* quota cheia / privacy mode — segue o jogo em memória */
  }
};

const state = {
  items: loadCart(),  // [{ id, qty, note }]
};

/* ─── API pública (exposta via getCart) ── */
export const getCartSnapshot = () => state.items.map((it) => ({ ...it }));

export const getCartTotal = () =>
  state.items.reduce((sum, it) => {
    const item = itemsById[it.id];
    return sum + (item?.price ?? 0) * it.qty;
  }, 0);

export const getCartCount = () => state.items.reduce((sum, it) => sum + it.qty, 0);

/* ─── Mutações ────────────────────────── */
const emitChanged = () => {
  window.dispatchEvent(new CustomEvent('cart:changed', {
    detail: { items: getCartSnapshot(), total: getCartTotal(), count: getCartCount() },
  }));
};

const addItem = (id) => {
  if (!itemsById[id]) return;
  const existing = state.items.find((it) => it.id === id);
  if (existing) existing.qty += 1;
  else state.items.push({ id, qty: 1, note: '' });
  saveCart();
  emitChanged();
};

const setQty = (id, qty) => {
  const it = state.items.find((x) => x.id === id);
  if (!it) return;
  if (qty <= 0) {
    state.items = state.items.filter((x) => x.id !== id);
  } else {
    it.qty = qty;
  }
  saveCart();
  emitChanged();
};

const setNote = (id, note) => {
  const it = state.items.find((x) => x.id === id);
  if (!it) return;
  it.note = note;
  saveCart();
  // não emite changed (evita re-render durante digitação)
};

const removeItem = (id) => setQty(id, 0);

const clearCart = () => {
  state.items = [];
  saveCart();
  emitChanged();
};

/* ─── DOM refs ────────────────────────── */
const fab = () => document.getElementById('cart-fab');
const fabBadge = () => document.getElementById('cart-fab-badge');
const drawer = () => document.getElementById('cart-drawer');
const overlay = () => document.getElementById('cart-overlay');
const drawerBody = () => document.getElementById('cart-drawer-body');
const drawerFoot = () => document.getElementById('cart-drawer-foot');
const totalEl = () => document.getElementById('cart-total');
const sticky = () => document.getElementById('cart-sticky');
const stickyCount = () => document.getElementById('cart-sticky-count');
const stickyTotal = () => document.getElementById('cart-sticky-total');

/* ─── Drawer open/close ───────────────── */
let lastFocused = null;

const openDrawer = () => {
  const d = drawer();
  const o = overlay();
  if (!d || !o) return;
  lastFocused = document.activeElement;
  d.classList.add('is-open');
  d.setAttribute('aria-hidden', 'false');
  o.classList.add('is-visible');
  document.body.classList.add('is-drawer-open');
  fab()?.setAttribute('aria-expanded', 'true');
  // foco no botão de fechar para acessibilidade
  setTimeout(() => document.getElementById('cart-drawer-close')?.focus(), 50);
};

const closeDrawer = () => {
  const d = drawer();
  const o = overlay();
  if (!d || !o) return;
  d.classList.remove('is-open');
  d.setAttribute('aria-hidden', 'true');
  o.classList.remove('is-visible');
  document.body.classList.remove('is-drawer-open');
  fab()?.setAttribute('aria-expanded', 'false');
  if (lastFocused?.focus) lastFocused.focus();
};

/* ─── Render ──────────────────────────── */
const renderEmpty = () => `
  <div class="cart-empty">
    <span class="cart-empty-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6"/>
        <circle cx="9" cy="21" r="1.5"/>
        <circle cx="18" cy="21" r="1.5"/>
      </svg>
    </span>
    <h4>Sua cestinha está vazia</h4>
    <p>Escolha um café, um doce, talvez os dois. A gente prepara enquanto você decide.</p>
  </div>
`;

const renderItem = (it) => {
  const item = itemsById[it.id];
  if (!item) return '';
  const lineTotal = item.price * it.qty;
  const safeNote = (it.note || '').replace(/"/g, '&quot;');
  return `
    <div class="cart-item" data-id="${it.id}">
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-price">${formatBRL(lineTotal)}</div>
      <div class="cart-item-controls">
        <div class="qty-stepper" role="group" aria-label="Quantidade de ${item.name}">
          <button type="button" class="qty-btn" data-action="dec" aria-label="Diminuir">−</button>
          <span class="qty-num" aria-live="polite">${it.qty}</span>
          <button type="button" class="qty-btn" data-action="inc" aria-label="Aumentar">+</button>
        </div>
        <button type="button" class="cart-item-remove" data-action="remove">remover</button>
      </div>
      <textarea
        class="cart-item-note"
        rows="1"
        placeholder="alguma observação? ex: sem açúcar"
        data-action="note"
      >${safeNote}</textarea>
    </div>
  `;
};

const renderDrawer = () => {
  const body = drawerBody();
  const foot = drawerFoot();
  const total = totalEl();
  if (!body || !foot || !total) return;

  if (state.items.length === 0) {
    body.innerHTML = renderEmpty();
    foot.hidden = true;
    return;
  }

  body.innerHTML = state.items.map(renderItem).join('');
  foot.hidden = false;
  total.textContent = formatBRL(getCartTotal());

  // wire controls
  body.querySelectorAll('.cart-item').forEach((row) => {
    const id = row.dataset.id;
    const dec = row.querySelector('[data-action="dec"]');
    const inc = row.querySelector('[data-action="inc"]');
    const rm = row.querySelector('[data-action="remove"]');
    const note = row.querySelector('[data-action="note"]');
    const it = state.items.find((x) => x.id === id);
    if (!it) return;

    dec?.addEventListener('click', () => setQty(id, it.qty - 1));
    inc?.addEventListener('click', () => setQty(id, it.qty + 1));
    rm?.addEventListener('click', () => removeItem(id));
    note?.addEventListener('input', (e) => setNote(id, e.target.value));
  });
};

/* ─── Atualiza FAB (badge + visibilidade) ── */
const renderFab = () => {
  const f = fab();
  const badge = fabBadge();
  if (!f || !badge) return;
  const count = getCartCount();
  badge.textContent = String(count);
  f.classList.toggle('is-visible', count > 0);
  if (count > 0) {
    f.classList.add('bumped');
    setTimeout(() => f.classList.remove('bumped'), 460);
  }
};

/* ─── Atualiza sticky cart bar (mobile) ── */
const renderSticky = () => {
  const bar = sticky();
  const c = stickyCount();
  const t = stickyTotal();
  if (!bar || !c || !t) return;
  const count = getCartCount();
  c.textContent = String(count);
  t.textContent = formatBRL(getCartTotal());
  bar.classList.toggle('is-visible', count > 0);
  document.body.classList.toggle('cart-has-items', count > 0);
};

/* ─── Init ────────────────────────────── */
export const initCart = () => {
  // FAB + sticky bar mobile
  fab()?.addEventListener('click', openDrawer);
  sticky()?.addEventListener('click', openDrawer);
  // close
  document.getElementById('cart-drawer-close')?.addEventListener('click', closeDrawer);
  overlay()?.addEventListener('click', closeDrawer);

  // limpar
  document.getElementById('cart-clear-btn')?.addEventListener('click', () => {
    if (state.items.length === 0) return;
    clearCart();
  });

  // checkout dispara modal — dono é checkout.js
  document.getElementById('cart-checkout-btn')?.addEventListener('click', () => {
    if (state.items.length === 0) return;
    window.dispatchEvent(new CustomEvent('cart:checkout-request', {
      detail: { items: getCartSnapshot(), total: getCartTotal() },
    }));
  });

  // ESC fecha drawer (e modal — checkout.js trata o seu)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer()?.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Eventos vindos do menu-render
  window.addEventListener('cart:add', (e) => addItem(e.detail.id));
  window.addEventListener('cart:dec', (e) => {
    const id = e.detail?.id;
    const it = state.items.find((x) => x.id === id);
    if (!it) return;
    setQty(id, it.qty - 1);
  });
  window.addEventListener('cart:open', openDrawer);
  window.addEventListener('cart:close', closeDrawer);
  window.addEventListener('cart:checkout-done', () => {
    clearCart();
    closeDrawer();
  });
  window.addEventListener('cart:changed', () => {
    renderDrawer();
    renderFab();
    renderSticky();
  });

  // Pintura inicial
  renderDrawer();
  renderFab();
  renderSticky();
};
