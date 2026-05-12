# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static-site **digital menu / online ordering** for a fictional café/bakery called **Lume**, built as a portfolio case for **João Pedro** (`devkappiushon`). Content is in Brazilian Portuguese (`lang="pt-br"`). The site has no build step and no package manager — open `index.html` in a browser, or serve the directory:

```bash
python3 -m http.server 8000   # then http://localhost:8000
```

There are no tests, linters, or CI configured.

When taking screenshots with the Playwright MCP (`browser_take_screenshot`), always save them under `screenshots/` by passing `filename: "screenshots/<name>.png"`.

## Architecture

Static site with duas páginas (`index.html`, `item.html`) que compartilham `assets/css/style.css` e uma camada JS em ES modules. A página de item é hidratada por query string (`item.html?id=<slug>`).

### File map

```
index.html                  # home: hero, sobre, cardápio, visita
item.html                   # template da página de item — recebe ?id=<slug>
assets/
├── css/style.css           # design system + componentes (home + item)
├── js/
│   ├── main.js             # entry point da home (boot)
│   ├── item.js             # entry point da página de item (boot + render)
│   ├── ui.js               # helpers compartilhados (mobile menu, reveal, header, magnetic, glow)
│   ├── menu-render.js      # render do cardápio na home (tabs + lista impressa)
│   ├── cart.js             # store + drawer + localStorage
│   └── checkout.js         # modal + envio pelo WhatsApp
└── data/
    └── menu.js             # categorias e itens fictícios (ES module — fonte única)
```

### Module responsibilities

- **`main.js`** boot da home. Chama `initSharedUI()` (de `ui.js`) e em seguida `initMenuTabs`, `renderMenu`, `initCart`, `initCheckout`. Sem lógica própria — só orquestração.
- **`item.js`** boot da página de item. Lê `?id=<slug>`, busca em `itemsById`, e renderiza o detalhe (categoria + nome + tag + lead + preço + botão "Adicionar ao pedido" + ingredientes + story + relacionados). Reusa `ui.js`, `cart.js` e `checkout.js`. Atualiza `<title>` e meta description em runtime. Estado vazio se o id for inválido.
- **`ui.js`** helpers de UI compartilhados pelas duas páginas: hamburger toggle, logo letter-splitting, IntersectionObserver de `.reveal*`, cursor glow desktop-only, header shadow + scroll progress, `wireMagnetic()`. Exporta `initSharedUI()` que chama tudo de uma vez.
- **`menu-render.js`** lê `data/menu.js` e injeta tabs (`#menu-tabs`) + lista (`#menu-list`). Cada linha do cardápio é um link (`<a class="menu-row-main" href="item.html?id=<id>">`); clicar no botão "+" emite `cart:add { detail: { id } }` no `window`. Não conhece o carrinho.
- **`cart.js`** mantém estado (array `{ id, qty, note }`) em memória + `localStorage` (`lume.cart.v1`), escuta `cart:add`, renderiza o drawer (`#cart-drawer`), atualiza o FAB (`#cart-fab`) com badge. Quando o usuário clica em "Finalizar pelo WhatsApp", emite `cart:checkout-request` com snapshot dos itens e total. Funciona em qualquer página que tenha o markup do drawer/FAB (home + item).
- **`checkout.js`** escuta `cart:checkout-request`, abre o modal (`#checkout-modal`), coleta nome/entrega/endereço/pagamento/observação, monta a mensagem e abre `wa.me/<PHONE>?text=...` em nova aba. Após enviar, dispara `cart:checkout-done` para que `cart.js` limpe o carrinho e feche o drawer. Importa `wireMagnetic` de `ui.js`.

### Por que pub/sub via custom events?

Mantém os módulos desacoplados (cardápio não conhece carrinho, carrinho não conhece checkout, item.js não conhece nenhum dos dois diretamente). Funciona muito bem nesta escala — sem dependências de framework, sem build, sem store global.

### Fonte única do cardápio

`assets/data/menu.js` exporta `categories` (array com itens) e `itemsById` (lookup por id, montado automaticamente no module load — inclui `categoryId` e `categoryLabel`). Cada item tem `id`, `name`, `desc`, `price`, opcionalmente `tag`, `flavor`, `ingredients` (array, alimenta a página de item) e `story` (parágrafo, alimenta a página de item). Todo lugar que precisa de info de um item (carrinho, drawer, página de item, mensagem do WhatsApp) usa `itemsById[id]`.

### Phone number

O número do WhatsApp está hardcoded em `assets/js/checkout.js` (`const PHONE = '5581999214850'`). É o mesmo do portfólio do João — para um case de portfólio fictício, intencional. Trocar lá se for adaptado pra cliente real.

## Design system

**Full token reference is in `DESIGN.md` at the project root.** Read it before adding new components or styles.

Resumo: paleta café — espresso (`#2a1a10`) + creme (`#ede0c7`) + caramelo (`#c89b6c`) + leite (`#d4b896`). Wordmark é um grão de café gigante em SVG fixo no canto, com leve `beanFloat` infinito. Cardápio é lista estilo cardápio impresso (leader dots entre nome e preço), não grid de cards.

## Known quirks (don't "fix" without asking)

- **`assets/css/style.css` linha 1** é a bare-text `Reset básico` (sem `/* */`). Herdado do portfólio. Erro silencioso, mantido propositalmente — confirmar antes de reformatar.
- **Mobile menu (`.navbar` < 768px)** usa `position: absolute; top: 100%; height: 100vh` em vez de `position: fixed`. Razão: `.header` tem `backdrop-filter`, que faz `position: fixed` em descendentes (Firefox especialmente) ser relativo ao header, colapsando o overlay.
- **Off-state da `.navbar` mobile** usa `opacity + pointer-events: none`, NÃO `display: none`. Toggling `display` durante transição de `opacity` faz a transition ser pulada — herdado do portfólio.
- **Drawer / modal / overlay / cart-fab** usam `display: none/flex` para mostrar/esconder em vez de `transition` em transform/right/opacity. Foi uma decisão pragmática após observar (em ambiente Playwright/Firefox) transições presas em from-state quando o elemento muda de `display: none` para `display: flex` simultaneamente com a aplicação da classe ativa. As transitions menores (hover de cards, magnetic CTA, mudança de categoria) seguem normais.
- **`html::before`** renderiza um grão de café vetorial gigante via SVG inline em data-URL (com leve `beanFloat` infinito). É decisão editorial — peça da identidade da casa. **Não substituir por gradiente ou wordmark de texto** sem combinar antes.
- **Carrinho persistido em `localStorage`** key `lume.cart.v1`. Se o schema mudar, incremente para `v2` (não migra automaticamente — só descarta).
- **Header / cart drawer / checkout modal duplicados em `index.html` e `item.html`**: custo aceito por não ter build step. Quando mexer em um, mexer no outro também (mesmos IDs em ambos).

## Common operations

- **Adicionar um item ao cardápio**: editar `assets/data/menu.js`, adicionar entrada à categoria desejada com `id` único. O lookup `itemsById` é montado automaticamente; a tab da categoria é regerada; a página `item.html?id=<id>` passa a funcionar imediatamente. Preencher também `ingredients` e `story` para que a página de detalhe fique rica (ambos opcionais — o template degrada graciosamente).
- **Mudar o telefone do WhatsApp**: `assets/js/checkout.js`, constante `PHONE` no topo.
- **Mudar nome da casa nas mensagens**: `assets/js/checkout.js`, constante `STORE_NAME`.
- **Adicionar nova categoria**: incluir objeto novo em `categories` (em `assets/data/menu.js`). As tabs são geradas automaticamente; os relacionados na página de item também (ele filtra pela `categoryId` do item atual).
