# Lume — café & confeitaria

> Cardápio digital + carrinho + envio de pedido pelo WhatsApp.
> Case de portfólio para uma cafeteria fictícia, escrito sem build step.

![hero](screenshots/01-hero.png)

---

## O que é

Site estático para uma cafeteria fictícia chamada **Lume**. O cliente navega o cardápio, monta um pedido (com observações por item) e finaliza pelo WhatsApp — a mensagem chega formatada no número da casa.

Funcionalidades:

- Cardápio em 4 categorias com filtro por pill
- Carrinho com `+/−`, observações por item e total dinâmico
- Persistência do pedido no `localStorage` (não se perde ao recarregar)
- Modal de finalização: nome, entrega/retirada, endereço, pagamento
- Mensagem montada automaticamente e aberta em `wa.me`
- Acessibilidade básica: navegação por teclado, ESC fecha drawer/modal, ARIA nas regiões interativas
- Responsivo (testado de 390px a 1366px)
- Sem build, sem package manager, sem framework

---

## Decisões técnicas (e por quê)

### Stack: HTML / CSS / JS puro
Cardápio digital é um caso onde **uma página estática + JS leve resolve bem**. Adicionar React/Astro/Vue traria peso e build que não pagam o preço aqui. Resultado: o `index.html` é servível por qualquer hosting estático (GitHub Pages, Netlify, S3) e carrega instantaneamente.

### ES modules como única dependência
`assets/js/main.js` é o entry point com `<script type="module">`. Os outros arquivos (`menu-render.js`, `cart.js`, `checkout.js`, `data/menu.js`) são módulos importados. Nenhum bundler, nenhum transpiler — o navegador resolve. Funciona desde 2018+.

### Pub/sub com `CustomEvent`
Os módulos são desacoplados via custom events no `window`:

```
menu-render.js  ──cart:add──▶          cart.js
                                ──cart:checkout-request──▶  checkout.js
                                ◀────cart:checkout-done────
```

`menu-render` não conhece `cart`. `cart` não conhece `checkout`. Cada um é responsável por uma fatia clara. Reescrever um deles não exige tocar os outros.

### Estado do carrinho em vanilla JS + localStorage
Não precisa de Redux/Zustand/store global pra um carrinho de cafeteria. Um `array` em memória + `JSON.stringify` no localStorage cobrem todos os requisitos:

- Persistência entre reloads
- Recuperação se o usuário sair e voltar
- Snapshot fácil pra mensagem do WhatsApp

### Design system token-driven (estende o do portfólio)
O `:root` tem ~30 CSS variables (cores, escala tipográfica, pesos, easing). Reutilizo o **mesmo padrão de tokens do meu portfólio** (ver `devkappiushon/portfolio`), mas em outra família visual (botânico noturno em vez de warm dark dourado). Isso me permite construir mais rápido (já tenho a disciplina) e demonstrar versatilidade sem reinventar.

Ver `DESIGN.md` para o catálogo completo dos tokens.

### Cardápio em formato de lista impressa, não cards
Cardápio físico de bistrô/café tem estrutura `nome ........... preço`. Os "leader dots" preenchem o espaço entre nome e preço. Lê como **menu impresso**, mais elegante que grid de cards genéricos. Decisão de design coerente com a marca botânica.

### Wordmark = folha botânica em SVG
`html::before` renderiza uma folha vetorial gigante na lateral, com leve sway infinito. É a contraparte do "MONTESOUZA" do meu portfólio: peça visual fixa, não decoração — parte da identidade.

### Acessibilidade
- ESC fecha drawer e modal
- Foco volta pro último elemento ativo após fechar
- ARIA labels em CTAs com ícones
- `prefers-reduced-motion` respeitado: animações desligam, marquee para
- Navegação por teclado em pills, qty steppers e formulário

### Animações simplificadas (decisão consciente)
Inicialmente havia `transition` em transform/opacity nos drawers/modais com `display: none/flex`. Em browsers reais funciona, mas em alguns ambientes (testei via Playwright) a transition prendia no from-state. Trocar para `display: none/flex` puro elimina o problema sem perder UX — o overlay imediato e os hovers menores ainda têm transição. Lição: às vezes a animação mais simples é a mais correta.

---

## Como rodar

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

Ou qualquer outro servidor estático (`npx serve`, `live-server`, etc). Não precisa de instalação.

---

## Estrutura

```
.
├── index.html
├── assets/
│   ├── css/style.css            # design system + componentes (~1.6 mil linhas)
│   ├── js/
│   │   ├── main.js              # entry point + helpers do portfólio
│   │   ├── menu-render.js       # render do cardápio
│   │   ├── cart.js              # store + drawer + localStorage
│   │   └── checkout.js          # modal + WhatsApp
│   └── data/menu.js             # fonte única dos pratos (ES module)
├── screenshots/                 # capturas pra README
├── DESIGN.md                    # catálogo de tokens
├── CLAUDE.md                    # guia para o assistente
└── readme.md                    # este arquivo
```

---

## Capturas

### Hero
![hero](screenshots/01-hero.png)

### Cardápio
![cardápio](screenshots/02-cardapio.png)

### Pedido aberto
![drawer](screenshots/03-drawer.png)

### Finalização
![checkout](screenshots/04-checkout.png)

### Filtro de categorias
![doces](screenshots/05-doces.png)

### Mobile
![mobile hero](screenshots/06-hero-mobile.png) ![mobile cardápio](screenshots/07-cardapio-mobile.png)

---

## Adaptar para um cliente real

1. Atualizar `assets/data/menu.js` com os itens reais e preços.
2. Trocar o número em `assets/js/checkout.js` (constante `PHONE`).
3. Atualizar nome da casa em `STORE_NAME` (no mesmo arquivo) e em `index.html` (hero, footer, meta tags).
4. Substituir a folha SVG do `html::before` por uma marca da casa (opcional).
5. Hospedar em qualquer estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

---

**João Pedro · `montesouza.dev`**
