/* ─── Checkout + WhatsApp ────────────────────────
   Modal coleta nome, tipo (entrega/retirada), endereço,
   pagamento e observação geral. Monta mensagem formatada
   e abre wa.me em nova aba.
─────────────────────────────────────────────── */

import { itemsById, formatBRL } from '../data/menu.js';
import { wireMagnetic } from './ui.js';

const PHONE = '5581999214850'; // (81) 99921-4850 — número fictício do case
const STORE_NAME = 'Lume café & confeitaria';

const modal = () => document.getElementById('checkout-modal');
const form = () => document.getElementById('checkout-form');
const enderecoWrap = () => document.getElementById('ck-endereco-wrap');

let lastFocused = null;
let pendingItems = [];
let pendingTotal = 0;

/* ─── Open / close ────────────────────── */
const openModal = () => {
  const m = modal();
  if (!m) return;
  lastFocused = document.activeElement;
  m.classList.add('is-open');
  m.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-modal-open');
  setTimeout(() => document.getElementById('ck-nome')?.focus(), 80);
};

const closeModal = () => {
  const m = modal();
  if (!m) return;
  m.classList.remove('is-open');
  m.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-modal-open');
  if (lastFocused?.focus) lastFocused.focus();
};

/* ─── Toggle endereço quando entrega/retirada ─ */
const syncEntregaMode = () => {
  const f = form();
  if (!f) return;
  const mode = f.querySelector('input[name="entrega"]:checked')?.value || 'entrega';
  f.classList.toggle('is-retirada', mode === 'retirada');
  const endereco = document.getElementById('ck-endereco');
  if (endereco) endereco.required = mode === 'entrega';
};

/* ─── Monta mensagem do WhatsApp ─────── */
const buildMessage = ({ nome, modo, endereco, pagamento, observacao }) => {
  const linhas = [];
  linhas.push(`*Olá, ${STORE_NAME}!*`);
  linhas.push(`Sou o(a) *${nome}* e gostaria de fazer um pedido:`);
  linhas.push('');

  pendingItems.forEach((it) => {
    const item = itemsById[it.id];
    if (!item) return;
    const lineTotal = item.price * it.qty;
    linhas.push(`• ${it.qty}× *${item.name}* — ${formatBRL(lineTotal)}`);
    if (it.note) linhas.push(`   _obs: ${it.note}_`);
  });

  linhas.push('');
  linhas.push(`*Subtotal:* ${formatBRL(pendingTotal)}`);
  linhas.push('');

  if (modo === 'entrega') {
    linhas.push(`*Entrega em:* ${endereco}`);
  } else {
    linhas.push(`*Retirada na casa*`);
  }
  linhas.push(`*Pagamento:* ${pagamentoLabel(pagamento)}`);

  if (observacao) {
    linhas.push('');
    linhas.push(`*Observação:* ${observacao}`);
  }

  linhas.push('');
  linhas.push('Aguardo a confirmação. Obrigado(a)!');

  return linhas.join('\n');
};

const pagamentoLabel = (val) => ({
  pix: 'Pix · na entrega',
  dinheiro: 'Dinheiro · na entrega',
  cartao: 'Cartão · maquininha',
}[val] || 'A combinar');

/* ─── Submit handler ─────────────────── */
const onSubmit = (e) => {
  e.preventDefault();
  const f = form();
  if (!f) return;

  const nome = f.querySelector('#ck-nome').value.trim() || 'cliente';
  const modo = f.querySelector('input[name="entrega"]:checked')?.value || 'entrega';
  const endereco = f.querySelector('#ck-endereco').value.trim();
  const pagamento = f.querySelector('#ck-pagamento').value;
  const observacao = f.querySelector('#ck-obs').value.trim();

  if (modo === 'entrega' && !endereco) {
    f.querySelector('#ck-endereco').focus();
    return;
  }

  const msg = buildMessage({ nome, modo, endereco, pagamento, observacao });
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');

  // Limpa carrinho, fecha modal
  window.dispatchEvent(new CustomEvent('cart:checkout-done'));
  closeModal();
  f.reset();
  syncEntregaMode();
};

/* ─── Init ────────────────────────────── */
export const initCheckout = () => {
  const m = modal();
  const f = form();
  if (!m || !f) return;

  // open vem do cart.js
  window.addEventListener('cart:checkout-request', (e) => {
    pendingItems = e.detail?.items || [];
    pendingTotal = e.detail?.total || 0;
    if (!pendingItems.length) return;
    openModal();
  });

  // close
  document.getElementById('checkout-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('ck-back')?.addEventListener('click', closeModal);
  m.addEventListener('click', (e) => {
    if (e.target === m) closeModal(); // clicar no fundo fecha
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && m.classList.contains('is-open')) closeModal();
  });

  // entrega/retirada
  f.querySelectorAll('input[name="entrega"]').forEach((r) =>
    r.addEventListener('change', syncEntregaMode)
  );
  syncEntregaMode();

  // submit
  f.addEventListener('submit', onSubmit);

  // magnetic CTA do botão de submit
  wireMagnetic(m);
};
