/* ─── Cardápio: dados ─────────────────────────────
   Fonte única dos itens da casa. Consumido por menu-render.js
   (lista) e item-render.js (página de detalhe).

   Campos por item:
     - id          : slug único (chave no carrinho e na URL ?id=)
     - name        : nome do prato/bebida
     - desc        : 1 linha curta (lista do cardápio)
     - price       : número, em reais
     - tag         : rótulo curto opcional
     - flavor      : 'doce' destaca a tag em outra cor
     - ingredients : lista (página de detalhe)
     - story       : parágrafo curto (página de detalhe)
─────────────────────────────────────────────── */

export const categories = [
  {
    id: 'cafes',
    label: 'Cafés',
    description: 'Torra fresca, semanal, de pequenos produtores brasileiros.',
    items: [
      {
        id: 'espresso',
        name: 'Espresso curto',
        desc: 'Dose dupla de café especial, chocolatado e com notas de castanha.',
        price: 7.00,
        tag: 'clássico',
        ingredients: ['18g de café especial', 'extração curta · 22s', 'água filtrada a 92°C'],
        story: 'A medida da casa. Servido em xícara pequena, pré-aquecida no balcão. Pegue ele forte ou peça um pouco de água quente do lado — a gente faz do jeito que você gosta.',
      },
      {
        id: 'macchiato',
        name: 'Macchiato cremoso',
        desc: 'Espresso coberto com uma colher de espuma de leite vaporizado.',
        price: 8.50,
        ingredients: ['espresso curto', 'colher de espuma de leite integral'],
        story: 'O meio-termo entre o espresso puro e o cappuccino. Uma colher de espuma macia "mancha" o café — daí o nome — e o resultado é cremoso sem cobrir o sabor do grão.',
      },
      {
        id: 'cappuccino',
        name: 'Cappuccino da casa',
        desc: 'Café, leite e espuma sedosa em três camadas, finalizado com canela.',
        price: 12.00,
        tag: 'queridinho',
        ingredients: ['espresso duplo', '120ml de leite vaporizado', 'espuma de leite', 'canela em pó da casa'],
        story: 'O queridinho da manhã. Três camadas equilibradas, espuma firme o bastante pra desenhar com a peneirinha de canela na hora de servir.',
      },
      {
        id: 'latte',
        name: 'Café latte',
        desc: 'Leite cremoso e espresso suave, com latte art feita na hora.',
        price: 13.50,
        ingredients: ['espresso curto', '180ml de leite vaporizado', 'fina camada de espuma sedosa'],
        story: 'Mais leite, menos espuma. A bebida certa pra desenhar uma rosetta na superfície — todo barista da casa aprende a fazer antes de chegar ao balcão.',
      },
      {
        id: 'coado',
        name: 'Coado V60',
        desc: 'Método filtrado, corpo leve e doçura natural. Servido em xícara aberta.',
        price: 11.00,
        tag: 'do dia',
        ingredients: ['18g de café do dia', '300ml de água a 94°C', 'filtro de papel branqueado'],
        story: 'O grão do dia muda toda semana — pergunte ao balcão. Coamos por gravidade no V60, fluxo lento, pra extrair doçura e clareza no copo.',
      },
      {
        id: 'mocha',
        name: 'Mocha com cacau',
        desc: 'Espresso, leite vaporizado e chocolate 70% nacional. Conforto líquido.',
        price: 14.50,
        ingredients: ['espresso duplo', 'leite vaporizado', 'ganache de chocolate 70%', 'raspas de cacau brasileiro'],
        story: 'Pro dia frio, ou pra quem ainda não decidiu se quer café ou chocolate. Usamos chocolate brasileiro 70% derretido na hora.',
      },
    ],
  },
  {
    id: 'doces',
    label: 'Doces',
    description: 'Receitas escritas à mão. Sai do forno todas as manhãs.',
    items: [
      {
        id: 'brigadeiro',
        name: 'Brigadeiro de colher',
        desc: 'Chocolate belga, leite condensado caseiro e flor de sal por cima.',
        price: 9.00,
        flavor: 'doce',
        ingredients: ['leite condensado caseiro', 'chocolate belga 60%', 'manteiga de qualidade', 'flor de sal'],
        story: 'Não é o brigadeiro de festa de criança — é o de colher, mais denso, com flor de sal por cima pra cortar a doçura. Vem em potinho de cerâmica pra comer ali na hora.',
      },
      {
        id: 'cookie',
        name: 'Cookie de chocolate',
        desc: 'Centro mole, bordas crocantes, gotas generosas de chocolate amargo.',
        price: 8.50,
        flavor: 'doce',
        tag: 'fresquinho',
        ingredients: ['farinha de trigo', 'manteiga', 'açúcar mascavo', 'gotas de chocolate 55%', 'baunilha'],
        story: 'Massa descansada por 24h na geladeira — segredo pra borda crocante e centro mole. Sai do forno três vezes ao dia.',
      },
      {
        id: 'cheesecake',
        name: 'Cheesecake de goiabada',
        desc: 'Base de biscoito amanteigado, cream cheese e calda de goiabada cremosa.',
        price: 16.00,
        flavor: 'doce',
        tag: 'fatia',
        ingredients: ['biscoito amanteigado', 'cream cheese', 'goiabada cascão derretida', 'limão siciliano'],
        story: 'A versão Lume do clássico americano. Trocamos a calda de morango pela goiabada nacional — mais suave, com leve acidez do limão pra balancear o creme.',
      },
      {
        id: 'pudim',
        name: 'Pudim de leite',
        desc: 'Receita da Dona Marisa. Pequeno, denso, com calda quase queimada.',
        price: 12.00,
        flavor: 'doce',
        ingredients: ['leite integral', 'leite condensado', 'ovos da fazenda', 'açúcar caramelizado quase no escuro'],
        story: 'É a receita da avó da Mari, escrita à caneta num caderno azul que ela trouxe quando entrou pra casa. Calda escura de propósito — a beira do amargo.',
      },
      {
        id: 'bolo',
        name: 'Bolo do dia',
        desc: 'Pergunte ao balcão. Hoje pode ser de fubá, milho ou laranja com calda.',
        price: 11.00,
        flavor: 'doce',
        tag: 'surpresa',
        ingredients: ['varia conforme o dia', 'sempre com manteiga de verdade e ovos da fazenda'],
        story: 'Toda manhã o bolo é diferente — depende do que tem na cozinha e do humor da padeira. Pergunte ao balcão antes de pedir.',
      },
    ],
  },
  {
    id: 'salgados',
    label: 'Salgados',
    description: 'Massa folhada feita aqui. Recheios honestos.',
    items: [
      {
        id: 'pao-queijo',
        name: 'Pão de queijo',
        desc: 'Mineiro, com queijo canastra, massa elástica e crosta dourada.',
        price: 7.00,
        tag: 'duo',
        ingredients: ['polvilho azedo', 'queijo canastra curado', 'leite', 'ovos da fazenda'],
        story: 'Receita mineira, sem atalhos. Vem em duo, dois pãezinhos quentinhos — um sempre escapa antes de chegar à mesa.',
      },
      {
        id: 'croissant',
        name: 'Croissant amanteigado',
        desc: 'Manteiga francesa, 28 camadas folhadas, assado na hora.',
        price: 13.00,
        ingredients: ['farinha branca', 'manteiga francesa 82%', 'fermento natural', 'leite, ovo, sal'],
        story: 'Três dias de processo pra chegar até você: massa, dobra, descanso, dobra de novo. 28 camadas, manteiga de verdade, casca que estala.',
      },
      {
        id: 'misto',
        name: 'Misto na chapa',
        desc: 'Pão de fermentação natural, presunto cru, queijo prato e manteiga.',
        price: 18.00,
        tag: 'almoço',
        ingredients: ['pão de fermentação natural', 'presunto cru artesanal', 'queijo prato', 'manteiga da casa'],
        story: 'O misto-quente sério. Pão de fermentação natural, presunto cru de produtor pequeno, prensado na chapa até o queijo escorrer pelas beiradas.',
      },
      {
        id: 'quiche',
        name: 'Quiche de alho-poró',
        desc: 'Massa amanteigada, recheio cremoso e parmesão gratinado.',
        price: 15.00,
        ingredients: ['massa brisée amanteigada', 'alho-poró refogado', 'creme de leite fresco', 'parmesão gratinado'],
        story: 'Massa brisée feita do zero, recheio aveludado de alho-poró com creme fresco. Servida morna — quente demais cobre o sabor.',
      },
    ],
  },
  {
    id: 'geladas',
    label: 'Geladas',
    description: 'Pra quando o sol decide que é verão de novo.',
    items: [
      {
        id: 'cold-brew',
        name: 'Cold brew',
        desc: 'Café gelado de extração lenta, 14 horas. Servido com gelo cristal.',
        price: 13.00,
        tag: 'sem leite',
        ingredients: ['90g de café especial moagem grossa', '1L de água filtrada', 'gelo cristal'],
        story: 'Extração a frio por 14 horas. Sem amargor, sem leite, sem açúcar — só o café puro, gelado, refrescante. Servido em copo alto com gelo grande pra não diluir.',
      },
      {
        id: 'mocha-gelado',
        name: 'Mocha gelado',
        desc: 'Cold brew, leite e chocolate amargo, batido com gelo.',
        price: 15.00,
        ingredients: ['cold brew', 'leite gelado', 'ganache de chocolate 70%', 'gelo'],
        story: 'O mocha quente em versão de tarde quente. Batemos o cold brew com chocolate amargo e leite gelado — ganha um topo de espuma natural.',
      },
      {
        id: 'limonada',
        name: 'Limonada de gengibre',
        desc: 'Limão siciliano, gengibre fresco e mel de laranjeira. Sem açúcar refinado.',
        price: 11.00,
        flavor: 'doce',
        ingredients: ['limão siciliano espremido na hora', 'gengibre fresco ralado', 'mel de laranjeira', 'água com gás opcional'],
        story: 'Sem açúcar refinado — adoçada com mel de laranjeira de produtor pequeno. Tem um pique de gengibre que acorda no calor.',
      },
    ],
  },
];

/* Lookup por id — útil pro carrinho e pra página de item recuperarem item completo */
export const itemsById = Object.fromEntries(
  categories.flatMap((cat) => cat.items.map((item) => [item.id, { ...item, categoryId: cat.id, categoryLabel: cat.label }]))
);

/* Helper: formata número como BRL */
export const formatBRL = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
