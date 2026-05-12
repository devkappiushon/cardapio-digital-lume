# Design System — Lume

Referência rápida dos tokens visuais do Cardápio Digital. Tudo declarado em `:root` no `assets/css/style.css`. Atualize esta tabela sempre que adicionar/renomear/remover um token.

> Este projeto **estende** o design system do portfólio (`devkappiushon/portfolio`) — mesma estrutura de tokens, fontes e arquitetura — mas em outra **família visual**: paleta café (espresso + creme + caramelo) no lugar do warm dark dourado do portfólio. A intenção é mostrar versatilidade dentro de uma mesma stack/disciplina.

---

## Cores

| Token | Hex / RGBA | Uso |
|-------|------------|-----|
| `--color-bg` | `#2a1a10` | Fundo principal — espresso |
| `--color-bg-deep` | `#1a0e07` | Footer, modal, áreas elevadas escuras — borra de café |
| `--color-surface` | `#3a2418` | Drawer, cards, modal interior — torra média |
| `--color-surface-2` | `#4a3122` | Hover state, qty stepper, inputs — torra clara |
| `--color-border` | `rgba(200, 155, 108, 0.20)` | Bordas hairline (caramelo transparente) |
| `--color-border-soft` | `rgba(237, 224, 199, 0.10)` | Divisores muito sutis (creme transparente) |
| `--color-text` | `#ede0c7` | Texto corpo — leite com café |
| `--color-text-muted` | `rgba(237, 224, 199, 0.55)` | Labels, captions, muted |
| `--color-heading` | `#f7ecd6` | Headings — espuma de cappuccino |
| `--color-accent` | `#c89b6c` | Caramelo — CTAs, links, highlights, preços |
| `--color-accent-warm` | `#b08456` | Hover de CTAs — caramelo tostado |
| `--color-accent-soft` | `rgba(200, 155, 108, 0.13)` | Backgrounds de tag/pill com accent |
| `--color-milk` | `#d4b896` | Leite quente — diferencia tag de doces, estado "adicionado" |

**Meta `theme-color`**: `#c89b6c` (caramelo, alinhado ao accent).

---

## Fontes

3 famílias carregadas via Google Fonts. **Mesmas do portfólio**, com tratamento diferente — aqui o italic do Space Grotesk é a marca da casa.

| Token | Família | Pesos | Uso |
|-------|---------|-------|-----|
| `--font-primary` | Inter | 400, 500, 600, 700, 800 | Corpo, UI, formulários |
| `--font-display` | Space Grotesk → Inter | 400, 500, 600, 700 | Headings (em italic), nomes de produtos, tagline |
| `--font-mono` | ui-monospace stack | sistema | Eyebrows, labels, navegação, preço de tabs (uppercase) |

**Poppins** (700, 800) é hardcoded em quatro lugares: `.hero-content h1`, `.brand-mark` (logo do hero), `.menu-row-price` e `.item-price`. Cumpre o papel de **número/marca** — nunca corpo nem heading editorial.

---

## Escala tipográfica

Base 16px (1rem). Estilo Tailwind. **Adicionado `--text-8xl`** sobre o portfólio (necessário pro h1 do hero).

| Token | rem | px | Uso típico |
|-------|-----|----|----|
| `--text-xs` | 0.75rem | 12 | Labels mono, eyebrows |
| `--text-sm` | 0.875rem | 14 | UI, descrições de produtos |
| `--text-base` | 1rem | 16 | Corpo |
| `--text-lg` | 1.125rem | 18 | Lead, parágrafos destacados |
| `--text-xl` | 1.25rem | 20 | Logo, títulos pequenos |
| `--text-2xl` | 1.5rem | 24 | h3, headings de cards |
| `--text-3xl` | 1.875rem | 30 | Cestinha title, h2 médio |
| `--text-4xl` | 2.25rem | 36 | h2 grande |
| `--text-5xl` | 3rem | 48 | h1 secundário |
| `--text-6xl` | 3.75rem | 60 | Display |
| `--text-7xl` | 4.5rem | 72 | Display gigante (`.item-name`) |
| `--text-8xl` | 6rem | 96 | Hero h1 da home |

---

## Pesos, line-heights, tracking, easing

Mesmos tokens do portfólio. A única diferença é o `--tracking-wider` que aqui está em `0.12em` (mais aberto que o `0.08em` do portfólio) — combina com o tom editorial mais formal.

---

## Padrões da casa

### O italic é a marca
H2, h3, .section-title, .menu-row-name, .menu-cat-head h3, .visit-card p, .cart-item-name, .checkout-modal-head h3, .item-name, .item-lead, .item-story, .item-related-name — todos em italic Space Grotesk. Cria coesão e dá peso editorial. Em h1 (Poppins), o italic é só pra palavras-chave (`em`).

### Botões duros (border-radius: 2px)
CTAs e cards usam radius `2px`. Não 8px (portfólio) nem 0 (brutalist). 2px lê como **carimbo / etiqueta de jarro de mercado** — coerente com a marca de cafeteria de bairro.

### Wordmark watermark = grão de café SVG
`html::before` renderiza um grão de café vetorial sobre o canto direito, com `opacity: 0.09` e leve `beanFloat` (animação de 22s). É a contraparte do "MONTESOUZA" do portfólio: peça visual fixa, parte da identidade, não decorativa.

### Cardápio = lista impressa, não cards
A escolha foi deliberada: cardápio físico de bar/cafeteria tem essa estrutura `nome ........... preço`. Os "leader dots" (radial-gradient repetido) preenchem o espaço entre nome e preço. Visualmente lê como **menu impresso de bistrô**, mais elegante que grid de cards genéricos.

### Tabs do cardápio = underline animado
`.menu-tab` é um botão flat (sem background) com `::after` em `scaleX(0)`. No hover anima para `scaleX(0.4)`, no `.is-active` para `scaleX(1)`. Mais leve que pílula com background — não compete com os nomes dos pratos abaixo.

### Linha do cardápio = link
`.menu-row-main` é um `<a>` para `item.html?id=<id>`. Hover destaca o nome em accent e revela "ver detalhes →" em mono small. Botão "+" continua sendo `<button>` separado (adiciona ao carrinho sem navegar).

### Página de item
Layout single-column (`max-width: 820px`), preto-no-fundo-café. Hierarquia: back link → categoria eyebrow → nome gigante italic → tag → lead → divisor com preço + CTA → "Como é feito" (lista de ingredientes com bullet caramelo) → "Da casa" (story com drop cap caramelo) → "Outros [categoria]" (cards de relacionados). Reusa header/footer/cart drawer/checkout modal da home.

### Tags de sabor
- Salgado / clássico → caramelo (`var(--color-accent)`)
- Doce → leite (`var(--color-milk)`)

A diferença cromática ajuda o cliente a escanear o cardápio rápido.

---

## Animações

Devido a um bug de transition/animation observado no Playwright (transitions presas em from-state após troca de display), as animações de entrada de drawer/modal/reveal foram simplificadas pra `transition: opacity` em vez de `animation`. Em browsers reais (Chrome/Firefox/Safari) animations funcionam normal — esta simplificação garante robustez em qualquer ambiente.

| Animação | Onde | Detalhes |
|----------|------|----------|
| `beanFloat` | `html::before` | Grão de café gira sutilmente entre -14° e -11°, 22s loop |
| `marqueeScroll` | `.marquee` | Carrossel de palavras-chave, 45s linear loop |
| `badgeBump` | `.cart-fab.bumped .cart-fab-badge` | Pulso ao adicionar item ao carrinho |
| reveal (transition) | `.reveal*` | Opacity + translate 0.7s, disparado por IntersectionObserver via `.visible` |

---

## Quirks documentados

- **Linha 1 do `style.css`** é a string solta `Reset básico` (sem comentário) — herdado do portfólio. Erro silencioso, mantido propositalmente — confirmar antes de tocar.
- **Mobile menu** usa `position: absolute + top: 100% + height: 100vh`, não `fixed`. Mesma razão do portfólio: o `.header` tem `backdrop-filter`.
- **Drawer/modal/overlay/fab** usam `display: none/flex` em vez de transition em transform/right/opacity. Decisão pragmática após bug com transitions presas em from-state em alguns ambientes (Playwright). Em browsers reais a UX continua boa por causa do `transition` em `background`/`box-shadow` em hovers e do efeito de overlay imediato.
- **`text-rendering: optimizeLegibility` + `font-feature-settings: 'cv11', 'ss01', 'ss03'`** estão no body — ativam ligaduras estilísticas do Inter. Não tirar.
- **Header / cart drawer / checkout modal duplicados** entre `index.html` e `item.html`. Custo do "no build step". Mesmos IDs nos dois arquivos — ao mudar markup, ajustar nos dois.
