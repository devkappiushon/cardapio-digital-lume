/* ─── Renderização do cardápio ─────────────────
   Cards modernos 1-col com monograma circular + nome + descrição
   + preço. Botão "+" no canto superior direito morphing para
   stepper inline (-/qty/+) quando o item já está no carrinho.
   Quando "Todos" está ativo, agrupa por categoria.
─────────────────────────────────────────────── */

import { categories, formatBRL, itemsById } from '../data/menu.js';
import { renderThumbArt, hasIllustration } from '../data/illustrations.js';

const TABS_EL = () => document.getElementById('menu-tabs');
const LIST_EL = () => document.getElementById('menu-list');

const ALL_ID = 'todos';

let activeCategoryId = ALL_ID;

/* ─── Tabs ───────────────────────────── */
export const initMenuTabs = () => {
  const tabs = TABS_EL();
  if (!tabs) return;

  const tabData = [
    { id: ALL_ID, label: 'Todos', count: categories.reduce((sum, c) => sum + c.items.length, 0) },
    ...categories.map((c) => ({ id: c.id, label: c.label, count: c.items.length })),
  ];

  tabs.innerHTML = tabData
    .map(
      (t) => `
        <button
          type="button"
          class="menu-tab ${t.id === activeCategoryId ? 'is-active' : ''}"
          role="tab"
          aria-selected="${t.id === activeCategoryId}"
          data-cat="${t.id}"
        >
          ${t.label}
          <span class="tab-count">${t.count}</span>
        </button>`
    )
    .join('');

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.menu-tab');
    if (!btn) return;
    const id = btn.dataset.cat;
    if (id === activeCategoryId) return;
    activeCategoryId = id;

    tabs.querySelectorAll('.menu-tab').forEach((b) => {
      const isActive = b.dataset.cat === id;
      b.classList.toggle('is-active', isActive);
      b.setAttribute('aria-selected', String(isActive));
    });
    renderMenu();
  });
};

/* ─── Helpers ────────────────────────── */
const getInitial = (name) => {
  const first = name.trim()[0] || '·';
  return first.toUpperCase();
};

const thumbClass = (item) => {
  if (item.flavor === 'doce') return 'is-doce';
  if (item.categoryId === 'geladas' || item.categoryId === undefined && /gelad/i.test(item.tag || '')) return 'is-frio';
  return '';
};

const getCartQty = (id) => {
  try {
    const raw = localStorage.getItem('lume.cart.v1');
    if (!raw) return 0;
    const items = JSON.parse(raw) || [];
    const found = items.find((x) => x.id === id);
    return found ? found.qty : 0;
  } catch { return 0; }
};

const actionHTML = (item, qty) => {
  if (qty > 0) {
    return `
      <div class="menu-card-stepper" data-id="${item.id}" role="group" aria-label="Quantidade de ${item.name}">
        <button type="button" class="menu-card-stepper-btn" data-action="dec" aria-label="Diminuir">−</button>
        <span class="menu-card-stepper-num" aria-live="polite">${qty}</span>
        <button type="button" class="menu-card-stepper-btn" data-action="inc" aria-label="Aumentar">+</button>
      </div>
    `;
  }
  return `
    <button type="button" class="menu-card-add" data-id="${item.id}" aria-label="Adicionar ${item.name} ao pedido">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  `;
};

/* ─── Card do cardápio ──────────────── */
const menuCardHTML = (item, i) => {
  const flavor = item.flavor === 'doce' ? 'is-doce' : '';
  const isFrio = (itemsById[item.id]?.categoryId === 'geladas');
  const thumbCls = isFrio ? 'is-frio' : flavor;
  const tag = item.tag
    ? `<span class="menu-card-tag ${flavor}">${item.tag}</span>`
    : '';
  const desc = item.desc
    ? `<p class="menu-card-desc">${item.desc}</p>`
    : '';

  const qty = getCartQty(item.id);
  // Foto real → fallback SVG (illustration) → fallback monograma se nem SVG existir.
  const fallbackContent = hasIllustration(item.id)
    ? renderThumbArt(item.id)
    : getInitial(item.name);
  const thumbInner = `
    <img class="menu-card-thumb-img"
         src="assets/images/items/${item.id}.jpg"
         alt=""
         loading="lazy"
         decoding="async"
         onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='flex');" />
    <span class="menu-card-thumb-fallback" aria-hidden="true">${fallbackContent}</span>
  `;

  return `
    <li class="menu-card" style="--row-i: ${i}" data-id="${item.id}">
      <a class="menu-card-link" href="item.html?id=${item.id}" aria-label="Ver detalhes de ${item.name}">
        <span class="menu-card-thumb ${thumbCls}" aria-hidden="true">${thumbInner}</span>
        <div class="menu-card-body">
          <div class="menu-card-row1">
            <span class="menu-card-name">${item.name}</span>
            <span class="menu-card-price">${formatBRL(item.price)}</span>
          </div>
          ${desc}
          <div class="menu-card-row2">
            <div class="menu-card-tags">${tag}</div>
          </div>
        </div>
      </a>
      <div class="menu-card-action" data-id="${item.id}">
        ${actionHTML(item, qty)}
      </div>
    </li>
  `;
};

/* ─── Render principal ───────────────── */
export const renderMenu = () => {
  const root = LIST_EL();
  if (!root) return;

  const showAll = activeCategoryId === ALL_ID;
  const visibleCats = showAll ? categories : categories.filter((c) => c.id === activeCategoryId);

  if (!visibleCats.length || !visibleCats.some((c) => c.items.length)) {
    root.innerHTML = `<div class="menu-empty">Nada por aqui ainda.</div>`;
    return;
  }

  let i = 0;
  root.innerHTML = visibleCats
    .map((cat) => {
      const head = `
        <header class="menu-cat-head">
          <h3>${cat.label}</h3>
          <span class="cat-label">${cat.description}</span>
        </header>`;
      const rows = cat.items
        .map((item) => menuCardHTML({ ...item, categoryId: cat.id }, i++))
        .join('');
      return `<section class="menu-cat" data-cat="${cat.id}">${head}<ul class="menu-items">${rows}</ul></section>`;
    })
    .join('');

  wireActions(root);
};

/* ─── Atualiza só uma ação (sem re-render do cardápio inteiro) ── */
const updateAction = (id) => {
  const root = LIST_EL();
  if (!root) return;
  const slot = root.querySelector(`.menu-card-action[data-id="${id}"]`);
  if (!slot) return;
  const item = itemsById[id];
  if (!item) return;
  const qty = getCartQty(id);
  slot.innerHTML = actionHTML(item, qty);
  wireActionSlot(slot, item);
};

/* ─── Cliques: + adiciona, stepper +/− muta carrinho ─── */
const wireActions = (root) => {
  root.querySelectorAll('.menu-card-action').forEach((slot) => {
    const id = slot.dataset.id;
    const item = itemsById[id];
    if (item) wireActionSlot(slot, item);
  });
};

const wireActionSlot = (slot, item) => {
  const id = item.id;
  const addBtn = slot.querySelector('.menu-card-add');
  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent('cart:add', { detail: { id } }));
      // animação leve de confirmação
      addBtn.style.transform = 'scale(1.12)';
      setTimeout(() => { addBtn.style.transform = ''; }, 180);
    });
  }

  const stepper = slot.querySelector('.menu-card-stepper');
  if (stepper) {
    stepper.querySelector('[data-action="dec"]')?.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      window.dispatchEvent(new CustomEvent('cart:dec', { detail: { id } }));
    });
    stepper.querySelector('[data-action="inc"]')?.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      window.dispatchEvent(new CustomEvent('cart:add', { detail: { id } }));
    });
  }
};

/* ─── Sincroniza com cart:changed (vindo do cart.js) ─── */
window.addEventListener('cart:changed', (e) => {
  const items = e.detail?.items || [];
  // reflete qty atual em cada slot
  const root = LIST_EL();
  if (!root) return;
  // pega todos os ids exibidos
  const slots = root.querySelectorAll('.menu-card-action');
  slots.forEach((slot) => {
    const id = slot.dataset.id;
    const inCart = items.find((x) => x.id === id);
    const currentNum = slot.querySelector('.menu-card-stepper-num');
    const wasStepper = !!slot.querySelector('.menu-card-stepper');
    const wasAdd = !!slot.querySelector('.menu-card-add');
    const newQty = inCart ? inCart.qty : 0;
    // se mudou o tipo de elemento, re-renderiza esse slot
    if ((newQty > 0 && wasAdd) || (newQty === 0 && wasStepper) || (currentNum && Number(currentNum.textContent) !== newQty)) {
      updateAction(id);
    }
  });
});
