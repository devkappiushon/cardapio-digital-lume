/* ─── Entry point: home (index.html) ─────────────
   Inicializa helpers compartilhados (ui.js) e os
   módulos específicos do cardápio.
─────────────────────────────────────────────── */

import { initSharedUI } from './ui.js';
import { renderMenu, initMenuTabs, renderMenuSkeleton, renderTabsSkeleton } from './menu-render.js';
import { initCart } from './cart.js';
import { initCheckout } from './checkout.js';

const SKELETON_MIN_MS = 300;

initSharedUI();
initCart();
initCheckout();

renderTabsSkeleton();
renderMenuSkeleton();

setTimeout(() => {
  initMenuTabs();
  renderMenu();
}, SKELETON_MIN_MS);
