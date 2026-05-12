/* ─── Ilustrações SVG line-art por item ──────────
   Estilo: monoline, currentColor (herda accent do tema),
   viewBox 200×200. Cada item tem uma SILHUETA única que
   se distingue mesmo no thumb 84×84 — não só nos detalhes
   internos.
─────────────────────────────────────────────── */

const ILLUSTRATIONS = {
  /* ── CAFÉS (cada um com silhueta distinta) ───── */

  // Espresso: demitasse pequeno e curto
  espresso: `
    <ellipse cx="100" cy="92" rx="36" ry="6"/>
    <path d="M64 92 L 70 132 C 71 140, 80 144, 100 144 C 120 144, 129 140, 130 132 L 136 92"/>
    <path d="M136 102 C 152 102, 158 112, 158 120 C 158 128, 152 138, 136 138"/>
    <ellipse cx="100" cy="96" rx="30" ry="4" stroke-width="0.7" opacity="0.5"/>
    <ellipse cx="100" cy="156" rx="50" ry="5"/>
    <path d="M50 156 C 50 162, 70 166, 100 166 C 130 166, 150 162, 150 156" stroke-width="0.7" opacity="0.5"/>
  `,

  // Macchiato: copo pequeno com dollop de espuma TRANSBORDANDO no topo
  macchiato: `
    <path d="M62 96 C 62 78, 70 64, 84 60 C 88 50, 98 46, 110 50 C 122 46, 132 56, 132 68 C 138 76, 138 88, 132 96 C 124 96, 76 96, 62 96 Z" stroke-width="1.4"/>
    <ellipse cx="100" cy="98" rx="42" ry="5" stroke-width="0.9" opacity="0.55"/>
    <ellipse cx="100" cy="100" rx="42" ry="6"/>
    <path d="M58 100 L 64 156 C 65 166, 78 172, 100 172 C 122 172, 135 166, 136 156 L 142 100"/>
    <path d="M142 116 C 162 116, 168 130, 168 142 C 168 154, 162 164, 142 164"/>
    <ellipse cx="100" cy="180" rx="56" ry="5"/>
  `,

  // Cappuccino: xícara larga clássica com latte art em CORAÇÃO
  cappuccino: `
    <g class="hero-cup-steam">
      <path d="M82 50 C 76 36, 90 26, 82 12" opacity="0.55"/>
      <path d="M118 50 C 112 36, 124 26, 118 12" opacity="0.55"/>
    </g>
    <ellipse cx="100" cy="78" rx="56" ry="8"/>
    <path d="M44 78 L 50 142 C 52 156, 68 164, 100 164 C 132 164, 148 156, 150 142 L 156 78"/>
    <path d="M156 96 C 184 96, 192 112, 192 128 C 192 144, 184 158, 156 158"/>
    <ellipse cx="100" cy="82" rx="46" ry="5" stroke-width="0.7" opacity="0.45"/>
    <path d="M100 70 C 90 70, 82 78, 82 84 C 82 92, 92 96, 100 100 C 108 96, 118 92, 118 84 C 118 78, 110 70, 100 70 Z" stroke-width="1.2"/>
    <ellipse cx="100" cy="180" rx="68" ry="6"/>
  `,

  // Latte: copo ALTO de vidro com 3 listras (camadas leite/café)
  latte: `
    <path d="M68 32 L 132 32 L 138 168 L 62 168 Z"/>
    <path d="M68 32 C 68 24, 132 24, 132 32" stroke-width="0.8" opacity="0.6"/>
    <path d="M70 60 L 130 60" stroke-width="0.8" opacity="0.55"/>
    <path d="M68 96 L 132 96" stroke-width="0.8" opacity="0.55"/>
    <path d="M66 132 L 134 132" stroke-width="0.8" opacity="0.55"/>
    <path d="M68 32 C 76 36, 88 28, 100 32 C 112 36, 124 28, 132 32" stroke-width="1.2" opacity="0.7"/>
    <ellipse cx="84" cy="32" rx="2.5" ry="1.2" fill="currentColor" stroke="none" opacity="0.5"/>
    <ellipse cx="116" cy="32" rx="2" ry="1" fill="currentColor" stroke="none" opacity="0.5"/>
    <ellipse cx="100" cy="180" rx="60" ry="6"/>
  `,

  // Coado V60: dripper TRIANGULAR proeminente sobre xícara
  coado: `
    <path d="M50 30 L 150 30 L 110 100 L 90 100 Z" stroke-width="1.6"/>
    <path d="M62 50 L 138 50" stroke-width="0.8" opacity="0.5"/>
    <path d="M76 70 L 124 70" stroke-width="0.7" opacity="0.4"/>
    <path d="M88 90 L 112 90" stroke-width="0.7" opacity="0.4"/>
    <path d="M50 30 C 50 22, 80 18, 100 18 C 120 18, 150 22, 150 30" stroke-width="1.2"/>
    <path d="M100 100 L 100 116" stroke-width="1"/>
    <ellipse cx="100" cy="120" rx="40" ry="5"/>
    <path d="M60 120 L 64 158 C 65 166, 76 172, 100 172 C 124 172, 135 166, 136 158 L 140 120"/>
    <path d="M140 132 C 158 132, 164 142, 164 152 C 164 162, 158 170, 140 170"/>
  `,

  // Mocha: xícara com DRIZZLE de chocolate em ZIGZAG visível
  mocha: `
    <ellipse cx="100" cy="80" rx="56" ry="8"/>
    <path d="M44 80 L 50 144 C 52 156, 68 164, 100 164 C 132 164, 148 156, 150 144 L 156 80"/>
    <path d="M156 96 C 184 96, 192 112, 192 128 C 192 144, 184 158, 156 158"/>
    <ellipse cx="100" cy="84" rx="46" ry="5" stroke-width="0.7" opacity="0.45"/>
    <path d="M64 86 L 78 76 L 92 90 L 106 76 L 120 90 L 134 76" stroke-width="1.6" opacity="0.85"/>
    <path d="M64 96 L 78 86 L 92 100 L 106 86 L 120 100 L 134 86" stroke-width="1.2" opacity="0.55"/>
    <ellipse cx="100" cy="180" rx="68" ry="6"/>
  `,

  /* ── DOCES ───────────────────────────────────── */

  // Brigadeiro: pote/ramekin com bola de chocolate dentro
  brigadeiro: `
    <ellipse cx="100" cy="76" rx="50" ry="8"/>
    <path d="M50 76 L 56 124 C 58 134, 72 140, 100 140 C 128 140, 142 134, 144 124 L 150 76"/>
    <ellipse cx="100" cy="80" rx="42" ry="5" stroke-width="0.7" opacity="0.45"/>
    <circle cx="100" cy="78" r="20" fill="currentColor" stroke="none" opacity="0.7"/>
    <circle cx="100" cy="78" r="20" stroke-width="1"/>
    <ellipse cx="92" cy="72" rx="2" ry="1" fill="currentColor" stroke="none" opacity="0.4"/>
    <ellipse cx="100" cy="68" rx="1.5" ry="0.8" fill="currentColor" stroke="none" opacity="0.4"/>
    <ellipse cx="108" cy="74" rx="1.8" ry="0.9" fill="currentColor" stroke="none" opacity="0.4"/>
    <ellipse cx="86" cy="80" rx="1.5" ry="0.8" fill="currentColor" stroke="none" opacity="0.4"/>
    <ellipse cx="114" cy="82" rx="1.5" ry="0.8" fill="currentColor" stroke="none" opacity="0.4"/>
    <ellipse cx="100" cy="148" rx="60" ry="6"/>
  `,

  // Cookie: círculo com chips MUITO visíveis
  cookie: `
    <circle cx="100" cy="100" r="64" stroke-width="1.6"/>
    <circle cx="100" cy="100" r="58" stroke-width="0.6" opacity="0.4"/>
    <ellipse cx="74" cy="80" rx="9" ry="7" fill="currentColor" stroke="none" opacity="0.85"/>
    <ellipse cx="124" cy="74" rx="8" ry="6" fill="currentColor" stroke="none" opacity="0.85"/>
    <ellipse cx="100" cy="108" rx="10" ry="7" fill="currentColor" stroke="none" opacity="0.85"/>
    <ellipse cx="78" cy="128" rx="8" ry="6" fill="currentColor" stroke="none" opacity="0.85"/>
    <ellipse cx="130" cy="124" rx="9" ry="6" fill="currentColor" stroke="none" opacity="0.85"/>
    <ellipse cx="62" cy="106" rx="5" ry="4" fill="currentColor" stroke="none" opacity="0.75"/>
    <ellipse cx="138" cy="100" rx="5" ry="4" fill="currentColor" stroke="none" opacity="0.75"/>
    <ellipse cx="100" cy="68" rx="4" ry="3" fill="currentColor" stroke="none" opacity="0.7"/>
    <ellipse cx="106" cy="142" rx="4" ry="3" fill="currentColor" stroke="none" opacity="0.7"/>
  `,

  // Cheesecake: TRIÂNGULO (fatia de bolo) com calda escorrendo
  cheesecake: `
    <path d="M40 90 L 160 90 L 110 170 L 90 170 Z" stroke-width="1.5"/>
    <path d="M40 90 L 160 90" stroke-width="1.2"/>
    <path d="M44 102 L 156 102" stroke-width="0.7" opacity="0.55"/>
    <path d="M48 116 L 152 116" stroke-width="0.7" opacity="0.4"/>
    <path d="M48 86 C 56 70, 76 64, 100 68 C 124 64, 144 70, 152 86" stroke-width="1.2"/>
    <path d="M52 84 C 60 80, 80 86, 100 82 C 120 86, 140 80, 148 84" stroke-width="0.9" opacity="0.6"/>
    <circle cx="78" cy="78" r="3" fill="currentColor" stroke="none" opacity="0.7"/>
    <circle cx="120" cy="76" r="2.5" fill="currentColor" stroke="none" opacity="0.7"/>
    <circle cx="100" cy="80" r="2.5" fill="currentColor" stroke="none" opacity="0.7"/>
    <path d="M80 90 L 78 100" stroke-width="1.2" opacity="0.7"/>
    <path d="M122 92 L 126 102" stroke-width="1.2" opacity="0.7"/>
  `,

  // Pudim: forma cilíndrica com calda escorrendo PELOS LADOS
  pudim: `
    <ellipse cx="100" cy="60" rx="56" ry="9"/>
    <path d="M44 60 L 52 132 C 54 142, 70 148, 100 148 C 130 148, 146 142, 148 132 L 156 60"/>
    <ellipse cx="100" cy="64" rx="48" ry="5" stroke-width="0.7" opacity="0.45"/>
    <path d="M50 84 C 60 78, 76 88, 92 80 C 108 72, 124 88, 140 78 C 148 76, 152 80, 152 86" stroke-width="1.4" opacity="0.85"/>
    <path d="M48 92 C 56 90, 72 98, 88 90 C 104 82, 120 96, 136 88 C 144 86, 150 88, 150 94" stroke-width="1" opacity="0.55"/>
    <path d="M50 132 C 52 144, 56 156, 62 160" stroke-width="1.4" opacity="0.85"/>
    <path d="M148 132 C 146 144, 142 156, 136 160" stroke-width="1.4" opacity="0.85"/>
    <ellipse cx="100" cy="170" rx="64" ry="6"/>
  `,

  // Bolo: BUNDT (rosca com furo no meio) — silhueta inconfundível
  bolo: `
    <ellipse cx="100" cy="60" rx="68" ry="14"/>
    <ellipse cx="100" cy="60" rx="20" ry="4"/>
    <path d="M32 60 L 38 130 C 40 142, 60 152, 100 152 C 140 152, 160 142, 162 130 L 168 60"/>
    <path d="M80 60 L 78 132 C 78 142, 86 148, 100 148 C 114 148, 122 142, 122 132 L 120 60" stroke-width="1.2"/>
    <ellipse cx="100" cy="60" rx="30" ry="6" stroke-width="0.8" opacity="0.5"/>
    <path d="M40 70 C 50 66, 70 76, 100 70 C 130 64, 150 76, 160 70" stroke-width="1" opacity="0.55"/>
    <path d="M40 86 C 52 82, 76 92, 100 86 C 124 80, 148 92, 160 86" stroke-width="0.8" opacity="0.4"/>
    <ellipse cx="100" cy="160" rx="72" ry="6"/>
  `,

  /* ── SALGADOS ────────────────────────────────── */

  // Pão de queijo: DOIS círculos (duo) bem visíveis
  'pao-queijo': `
    <circle cx="68" cy="106" r="44" stroke-width="1.6"/>
    <circle cx="68" cy="100" r="36" stroke-width="0.7" opacity="0.45"/>
    <ellipse cx="58" cy="86" rx="3.5" ry="1.8" fill="currentColor" stroke="none" opacity="0.5"/>
    <ellipse cx="76" cy="96" rx="3" ry="1.5" fill="currentColor" stroke="none" opacity="0.5"/>
    <ellipse cx="68" cy="116" rx="3.5" ry="1.8" fill="currentColor" stroke="none" opacity="0.5"/>
    <circle cx="138" cy="98" r="40" stroke-width="1.6"/>
    <circle cx="138" cy="92" r="32" stroke-width="0.7" opacity="0.45"/>
    <ellipse cx="128" cy="80" rx="3" ry="1.5" fill="currentColor" stroke="none" opacity="0.5"/>
    <ellipse cx="146" cy="92" rx="3" ry="1.5" fill="currentColor" stroke="none" opacity="0.5"/>
    <ellipse cx="138" cy="106" rx="3" ry="1.5" fill="currentColor" stroke="none" opacity="0.5"/>
    <ellipse cx="100" cy="158" rx="76" ry="6" stroke-width="0.7" opacity="0.45"/>
  `,

  // Croissant: forma crescente folhada inconfundível
  croissant: `
    <path d="M30 110 C 36 70, 70 36, 120 36 C 160 36, 180 64, 178 96 C 176 130, 140 146, 100 142 C 60 138, 36 124, 30 110 Z" stroke-width="1.6"/>
    <path d="M44 102 C 54 76, 76 56, 110 54" stroke-width="1" opacity="0.6"/>
    <path d="M58 96 C 70 78, 88 64, 116 62" stroke-width="0.9" opacity="0.55"/>
    <path d="M72 92 C 84 80, 100 70, 124 70" stroke-width="0.9" opacity="0.5"/>
    <path d="M86 96 C 100 86, 116 80, 138 80" stroke-width="0.8" opacity="0.45"/>
    <path d="M44 100 L 56 92" stroke-width="0.9" opacity="0.55"/>
    <path d="M82 130 L 92 120" stroke-width="0.9" opacity="0.55"/>
    <path d="M124 138 L 134 128" stroke-width="0.9" opacity="0.55"/>
    <path d="M154 122 L 164 112" stroke-width="0.9" opacity="0.55"/>
  `,

  // Misto: SANDUÍCHE prensado com camadas (pão/recheio/pão visíveis)
  misto: `
    <path d="M30 60 L 170 60 L 168 88 L 32 88 Z" stroke-width="1.5"/>
    <path d="M34 88 L 166 88 L 164 108 L 36 108 Z" stroke-width="1.2" opacity="0.7"/>
    <path d="M38 108 L 162 108 L 160 124 L 40 124 Z" stroke-width="1.2"/>
    <path d="M42 124 L 158 124 L 156 144 L 44 144 Z" stroke-width="1.2" opacity="0.7"/>
    <path d="M46 144 L 154 144 L 152 162 L 48 162 Z" stroke-width="1.2"/>
    <path d="M30 60 C 30 48, 70 44, 100 44 C 130 44, 170 48, 170 60" stroke-width="1.2"/>
    <path d="M46 162 C 70 156, 130 156, 154 162" stroke-width="1" opacity="0.55"/>
    <path d="M40 88 C 64 84, 136 84, 162 88" stroke-width="0.7" opacity="0.4"/>
    <path d="M44 124 C 68 120, 132 120, 156 124" stroke-width="0.7" opacity="0.4"/>
    <path d="M64 108 L 64 100 M 96 108 L 96 100 M 128 108 L 128 100" stroke-width="0.6" opacity="0.5"/>
  `,

  // Quiche: TRIÂNGULO (fatia) com bordas onduladas e recheio
  quiche: `
    <path d="M40 90 L 160 90 L 110 170 L 90 170 Z" stroke-width="1.5"/>
    <path d="M40 90 L 160 90" stroke-width="1.4"/>
    <path d="M44 90 L 44 100 M 56 90 L 56 100 M 68 90 L 68 100 M 80 90 L 80 100 M 92 90 L 92 100 M 100 90 L 100 100 M 108 90 L 108 100 M 120 90 L 120 100 M 132 90 L 132 100 M 144 90 L 144 100 M 156 90 L 156 100" stroke-width="0.8" opacity="0.55"/>
    <path d="M48 110 L 152 110" stroke-width="0.7" opacity="0.4"/>
    <path d="M58 90 C 70 76, 100 70, 142 90" stroke-width="1.2"/>
    <ellipse cx="78" cy="120" rx="4" ry="2.5" fill="currentColor" stroke="none" opacity="0.7"/>
    <ellipse cx="120" cy="124" rx="4" ry="2.5" fill="currentColor" stroke="none" opacity="0.7"/>
    <ellipse cx="100" cy="142" rx="3.5" ry="2" fill="currentColor" stroke="none" opacity="0.7"/>
    <path d="M70 130 L 76 134" stroke-width="0.8" opacity="0.6"/>
    <path d="M126 132 L 132 136" stroke-width="0.8" opacity="0.6"/>
  `,

  /* ── GELADAS ─────────────────────────────────── */

  // Cold brew: copo ALTO + canudo + GELO + conteúdo escuro (ondas)
  'cold-brew': `
    <path d="M64 30 L 136 30 L 144 178 L 56 178 Z" stroke-width="1.5"/>
    <ellipse cx="100" cy="32" rx="36" ry="6"/>
    <path d="M64 32 C 68 22, 132 22, 136 32" stroke-width="1" opacity="0.7"/>
    <path d="M68 60 L 132 60" stroke-width="0.7" opacity="0.5"/>
    <path d="M70 50 C 80 46, 90 54, 100 50 C 110 46, 120 54, 130 50" stroke-width="1.4" opacity="0.85"/>
    <rect x="80" y="80" width="18" height="18" stroke-width="1.2" rx="2"/>
    <rect x="106" y="92" width="18" height="18" stroke-width="1.2" rx="2"/>
    <rect x="74" y="112" width="18" height="18" stroke-width="1.2" rx="2"/>
    <rect x="100" y="124" width="18" height="18" stroke-width="1.2" rx="2"/>
    <path d="M80 80 L 86 86 M 106 92 L 112 98 M 74 112 L 80 118 M 100 124 L 106 130" stroke-width="0.7" opacity="0.5"/>
    <path d="M122 16 L 116 60 L 113 140" stroke-width="2"/>
  `,

  // Mocha gelado: copo com FOAM ALTO + ice + listra escura
  'mocha-gelado': `
    <path d="M60 40 L 140 40 L 146 178 L 54 178 Z" stroke-width="1.5"/>
    <ellipse cx="100" cy="42" rx="40" ry="7"/>
    <path d="M60 42 C 68 30, 96 26, 100 30 C 104 26, 132 30, 140 42" stroke-width="1.4" opacity="0.85"/>
    <path d="M64 36 C 76 28, 92 38, 100 32 C 108 28, 124 36, 136 30" stroke-width="1.2" opacity="0.65"/>
    <ellipse cx="80" cy="36" rx="3" ry="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
    <ellipse cx="120" cy="34" rx="2.5" ry="1.2" fill="currentColor" stroke="none" opacity="0.6"/>
    <path d="M64 70 L 136 70" stroke-width="1" opacity="0.55"/>
    <path d="M62 80 L 138 80" stroke-width="0.7" opacity="0.4"/>
    <rect x="76" y="92" width="18" height="18" stroke-width="1.2" rx="2"/>
    <rect x="106" y="106" width="18" height="18" stroke-width="1.2" rx="2"/>
    <rect x="80" y="130" width="18" height="18" stroke-width="1.2" rx="2"/>
  `,

  // Limonada: copo com FATIA DE LIMÃO BEM VISÍVEL no topo + gelo
  limonada: `
    <path d="M64 40 L 136 40 L 144 178 L 56 178 Z" stroke-width="1.5"/>
    <ellipse cx="100" cy="42" rx="36" ry="6"/>
    <path d="M64 42 C 68 32, 132 32, 136 42" stroke-width="1" opacity="0.7"/>
    <circle cx="100" cy="42" r="22" stroke-width="1.6"/>
    <circle cx="100" cy="42" r="18" stroke-width="0.8" opacity="0.5"/>
    <line x1="100" y1="24" x2="100" y2="60" stroke-width="0.8" opacity="0.55"/>
    <line x1="82" y1="42" x2="118" y2="42" stroke-width="0.8" opacity="0.55"/>
    <line x1="86" y1="28" x2="114" y2="56" stroke-width="0.8" opacity="0.55"/>
    <line x1="114" y1="28" x2="86" y2="56" stroke-width="0.8" opacity="0.55"/>
    <path d="M64 80 L 136 80" stroke-width="0.7" opacity="0.5"/>
    <rect x="78" y="92" width="18" height="18" stroke-width="1.2" rx="2"/>
    <rect x="104" y="108" width="18" height="18" stroke-width="1.2" rx="2"/>
    <rect x="76" y="130" width="18" height="18" stroke-width="1.2" rx="2"/>
    <path d="M58 22 L 56 60 L 54 140" stroke-width="2"/>
  `,
};

const SVG_ATTRS = `viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;

export const renderItemHeroArt = (id) => {
  const inner = ILLUSTRATIONS[id];
  if (!inner) return '';
  return `<svg class="item-hero-illustration" ${SVG_ATTRS}>${inner}</svg>`;
};

export const renderThumbArt = (id) => {
  const inner = ILLUSTRATIONS[id];
  if (!inner) return '';
  return `<svg class="menu-card-thumb-svg" ${SVG_ATTRS}>${inner}</svg>`;
};

export const hasIllustration = (id) => Boolean(ILLUSTRATIONS[id]);
