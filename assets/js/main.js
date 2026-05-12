/* ─── Entry point: home (index.html) ─────────────
   Inicializa helpers compartilhados (ui.js) e os
   módulos específicos do cardápio.
─────────────────────────────────────────────── */

import { initSharedUI } from './ui.js';
import { renderMenu, initMenuTabs } from './menu-render.js';
import { initCart } from './cart.js';
import { initCheckout } from './checkout.js';

initSharedUI();
initMenuTabs();
renderMenu();
initCart();
initCheckout();
