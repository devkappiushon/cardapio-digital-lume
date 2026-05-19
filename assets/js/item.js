/* ─── Página de item (item.html) ─────────────────
   Lê ?id=<slug> da URL e hidrata #item-detail com
   nome, descrição, preço, ingredientes, história e
   itens relacionados da mesma categoria. Reusa cart
   + checkout + helpers compartilhados.
─────────────────────────────────────────────── */

import { initSharedUI, wireMagnetic } from './ui.js';
import { itemsById, categories, formatBRL } from '../data/menu.js';
import { initCart } from './cart.js';
import { initCheckout } from './checkout.js';
import { renderItemHeroArt, hasIllustration } from '../data/illustrations.js';

const ROOT = () => document.getElementById('item-detail');
const SKELETON_MIN_MS = 300;

const getItemId = () => new URLSearchParams(window.location.search).get('id');

/* ─── Skeleton: layout do item enquanto hidrata ── */
const renderSkeleton = () => {
  const root = ROOT();
  if (!root) return;
  root.innerHTML = `
    <span class="sk-line sk-line--sm skeleton" style="width: 11rem;" aria-hidden="true"></span>
    <div class="item-hero">
      <div class="item-hero-art is-skeleton skeleton" aria-hidden="true"></div>
      <header class="item-head sk-stack" aria-hidden="true">
        <span class="sk-line sk-line--sm sk-line--w-30 skeleton"></span>
        <span class="sk-line sk-line--xl sk-line--w-70 skeleton"></span>
        <span class="sk-line sk-line--w-90 skeleton"></span>
        <span class="sk-line sk-line--w-60 skeleton"></span>
      </header>
    </div>
    <div class="item-actions" aria-hidden="true">
      <span class="sk-line sk-line--lg sk-line--w-30 skeleton"></span>
      <span class="sk-line sk-line--xl sk-line--w-50 skeleton"></span>
    </div>
    <section class="item-section sk-stack" aria-hidden="true">
      <span class="sk-line sk-line--lg sk-line--w-40 skeleton"></span>
      <span class="sk-line sk-line--w-90 skeleton"></span>
      <span class="sk-line sk-line--w-70 skeleton"></span>
      <span class="sk-line sk-line--w-60 skeleton"></span>
    </section>
  `;
};

/* ─── Render: estado vazio (id inválido) ── */
const renderNotFound = () => {
  const root = ROOT();
  if (!root) return;
  root.innerHTML = `
    <a href="index.html#cardapio" class="item-back">
      <span aria-hidden="true">←</span> voltar ao cardápio
    </a>
    <div class="item-empty">
      <h1>Não achamos esse item.</h1>
      <p>Talvez ele tenha saído do cardápio ou o link esteja torto.<br/>Volte ao cardápio para escolher outro.</p>
      <a href="index.html#cardapio" class="btn-hero btn-magnetic">Ver cardápio</a>
    </div>
  `;
};

/* ─── Render: item completo ─────────────── */
const renderItem = (item) => {
  const root = ROOT();
  if (!root) return;

  const flavorClass = item.flavor === 'doce' ? 'is-doce' : '';
  const tagHtml = item.tag
    ? `<span class="item-tag ${flavorClass}">${item.tag}</span>`
    : '';

  const ingredientsHtml = (item.ingredients?.length)
    ? `
      <section class="item-section">
        <h2 class="item-section-title">Como é feito</h2>
        <ul class="item-ingredients">
          ${item.ingredients.map((i) => `<li>${i}</li>`).join('')}
        </ul>
      </section>
    `
    : '';

  const storyHtml = item.story
    ? `
      <section class="item-section">
        <h2 class="item-section-title">Da casa</h2>
        <p class="item-story">${item.story}</p>
      </section>
    `
    : '';

  const related = (categories.find((c) => c.id === item.categoryId)?.items || [])
    .filter((i) => i.id !== item.id)
    .slice(0, 4);

  const relatedHtml = related.length
    ? `
      <section class="item-section item-related">
        <h2 class="item-section-title">Outros ${item.categoryLabel.toLowerCase()}</h2>
        <ul class="item-related-list">
          ${related.map((r) => `
            <li>
              <a href="item.html?id=${r.id}" class="item-related-card">
                <span class="item-related-name">${r.name}</span>
                <span class="item-related-price">${formatBRL(r.price)}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </section>
    `
    : '';

  const initial = (item.name.trim()[0] || '·').toUpperCase();
  const itemNum = String(Object.keys(itemsById).indexOf(item.id) + 1).padStart(2, '0');
  const fallbackArt = hasIllustration(item.id)
    ? renderItemHeroArt(item.id)
    : `<span class="item-hero-art-mono">${initial}</span>`;

  root.innerHTML = `
    <a href="index.html#cardapio" class="item-back">
      <span aria-hidden="true">←</span> voltar ao cardápio
    </a>

    <div class="item-hero">
      <div class="item-hero-art" aria-hidden="true">
        <span class="item-hero-art-eyebrow">${itemNum} / ${item.categoryLabel}</span>
        <picture class="item-hero-pic">
          <source srcset="assets/images/items/${item.id}.webp" type="image/webp" />
          <img class="item-hero-img"
               src="assets/images/items/${item.id}.jpg"
               alt=""
               loading="eager"
               decoding="async"
               onerror="const pic=this.closest('.item-hero-pic'); if(pic) pic.style.display='none'; const fb=this.closest('.item-hero-art')?.querySelector('.item-hero-art-fallback'); if(fb) fb.style.display='block';" />
        </picture>
        <span class="item-hero-art-fallback">${fallbackArt}</span>
        <span class="item-hero-art-num">lume · feito em casa</span>
      </div>

      <header class="item-head">
        <span class="section-num">${item.categoryLabel}</span>
        <h1 class="item-name">${item.name}</h1>
        ${tagHtml}
        <p class="item-lead">${item.desc}</p>
      </header>
    </div>

    <div class="item-actions">
      <span class="item-price">${formatBRL(item.price)}</span>
      <button type="button" class="btn-hero btn-magnetic item-add-btn" id="item-add-btn" data-id="${item.id}">
        Adicionar ao pedido
      </button>
    </div>

    ${ingredientsHtml}
    ${storyHtml}
    ${relatedHtml}
  `;

  wireAddBtn(item);
  wireMagnetic(root);
};

/* ─── Botão "Adicionar ao pedido" ─────── */
const wireAddBtn = (item) => {
  const btn = document.getElementById('item-add-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('cart:add', { detail: { id: item.id } }));
    btn.classList.add('is-added');
    btn.textContent = '✓ Adicionado';
    setTimeout(() => {
      btn.classList.remove('is-added');
      btn.textContent = 'Adicionar ao pedido';
    }, 1400);
  });
};

/* ─── Atualiza <title> e meta description ─ */
const updateMeta = (item) => {
  document.title = `${item.name} · Lume`;
  const meta = document.getElementById('meta-description');
  if (meta && item.desc) meta.setAttribute('content', `${item.name} — ${item.desc}`);
};

/* ─── Boot ────────────────────────────── */
const id = getItemId();
const item = id ? itemsById[id] : null;

initSharedUI();
initCart();
initCheckout();
renderSkeleton();

setTimeout(() => {
  if (item) {
    updateMeta(item);
    renderItem(item);
  } else {
    renderNotFound();
  }
}, SKELETON_MIN_MS);
