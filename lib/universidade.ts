import type { Modulo, Funcionario } from "./types";

// Conteúdo base da Universidade Marken Fassi.
// Estrutura pronta para receber o texto literal do briefing (seção 4).
export const modulos: Modulo[] = [
  {
    id: "produto",
    titulo: "Conheça o Produto",
    cor: "#1B3D2A",
    icone: "Package",
    descricao: "O que é a roupa de cama Marken Fassi e por que ela é diferente.",
    licoes: [
      {
        id: "prod-1",
        moduloId: "produto",
        titulo: "O que faz uma roupa de cama ser premium",
        introducao:
          "Antes de vender, você precisa entender o que o cliente está levando para casa.",
        passos: [
          "A qualidade começa no fio: quanto mais fino e resistente, mais macio e durável é o tecido.",
          "O número de fios (ex.: 200, 300, 400 fios) indica a densidade da trama.",
          "Fios de algodão de fibra longa (como o egípcio) resultam em toque sedoso e maior vida útil.",
          "Marken Fassi trabalha com acabamento que mantém o toque macio mesmo após várias lavagens.",
        ],
        dica: "Dica Marken Fassi: deixe o cliente TOCAR o tecido. O toque vende mais do que qualquer explicação.",
        checklist: [
          "Sei explicar o que é número de fios",
          "Sei a diferença entre percal e outros tecidos",
          "Consigo destacar 3 diferenciais Marken Fassi",
        ],
        errosComuns: [
          "Falar só de preço e esquecer da qualidade do fio",
          "Usar termos técnicos sem traduzir para o benefício do cliente",
        ],
      },
      {
        id: "prod-2",
        moduloId: "produto",
        titulo: "Tecidos e toques",
        introducao:
          "Cada tecido tem uma sensação e um público. Saber isso ajuda a recomendar certo.",
        passos: [
          "Percal: trama fechada, toque fresco e encorpado — ótimo para quem gosta de sensação 'de hotel'.",
          "Cetim/acetinado: toque liso e brilho elegante — sofisticação para o quarto.",
          "Malha: toque macio e elástico — conforto casual do dia a dia.",
          "Explique a sensação, não só o nome do tecido.",
        ],
        dica: "Dica Marken Fassi: associe o tecido ao momento do cliente ('fresco para o verão', 'aconchego para o inverno').",
        errosComuns: [
          "Recomendar o mesmo tecido para todos os clientes",
        ],
      },
      {
        id: "prod-3",
        moduloId: "produto",
        titulo: "Cuidados e durabilidade",
        introducao:
          "Um cliente que sabe cuidar do produto fica satisfeito por mais tempo e volta a comprar.",
        passos: [
          "Oriente a lavar com água fria ou morna e sabão neutro.",
          "Evitar alvejante e secadora em alta temperatura preserva as fibras.",
          "Guardar seco e arejado evita mofo e odores.",
          "Reforce que o cuidado certo mantém o toque e a cor por muito mais tempo.",
        ],
        dica: "Dica Marken Fassi: entregue a orientação de cuidado junto com a venda. Isso demonstra cuidado e evita reclamação.",
      },
    ],
  },
  {
    id: "cama-exposicao",
    titulo: "A Cama de Exposição",
    cor: "#2A5640",
    icone: "BedDouble",
    descricao: "Como montar a cama de exposição que faz o cliente parar e desejar.",
    licoes: [
      {
        id: "cama-1",
        moduloId: "cama-exposicao",
        titulo: "Preparando a base",
        introducao:
          "A cama de exposição é a sua vitrine mais poderosa. Tudo começa na base.",
        passos: [
          "Comece com o colchão limpo e um protetor bem esticado.",
          "Use um lençol de baixo com elástico, bem ajustado, sem rugas.",
          "Alise o tecido com as mãos do centro para as bordas.",
          "Uma base impecável faz toda a montagem parecer profissional.",
        ],
        dica: "Dica Marken Fassi: cama sem ruga transmite qualidade. Rugas transmitem descuido.",
        checklist: [
          "Colchão limpo e sem manchas",
          "Lençol de baixo bem esticado",
          "Sem rugas visíveis",
        ],
      },
      {
        id: "cama-2",
        moduloId: "cama-exposicao",
        titulo: "As camadas da cama",
        introducao:
          "O segredo de uma cama que encanta está nas camadas bem montadas.",
        passos: [
          "Coloque o lençol de cima com a barra virada para fora, mostrando o acabamento.",
          "Adicione o edredom ou a colcha centralizado e com caimento igual dos dois lados.",
          "Monte os travesseiros: os de dormir atrás, os decorativos na frente.",
          "Finalize com uma manta dobrada no pé da cama para dar volume e aconchego.",
        ],
        dica: "Dica Marken Fassi: trabalhe em camadas e volumes — cama 'cheia' desperta desejo de compra.",
        errosComuns: [
          "Caimento desigual dos lados",
          "Travesseiros amassados ou tortos",
        ],
      },
      {
        id: "cama-3",
        moduloId: "cama-exposicao",
        titulo: "Arremate e manutenção diária",
        introducao:
          "Uma cama linda de manhã pode estar desarrumada à tarde. Manutenção é parte da venda.",
        passos: [
          "Confira o caimento e alinhe as pontas antes de abrir a loja.",
          "Ajeite os travesseiros e a manta ao longo do dia.",
          "Remova fios, poeira ou marcas de manuseio dos clientes.",
          "Ao final do dia, deixe tudo pronto para o dia seguinte.",
        ],
        dica: "Dica Marken Fassi: passe pela cama de exposição a cada hora. Ela precisa estar sempre 'foto-pronta'.",
      },
    ],
  },
  {
    id: "loja",
    titulo: "A Loja Impecável",
    cor: "#B8860B",
    icone: "Store",
    descricao: "Como apresentar a loja para valorizar o produto e a marca.",
    licoes: [
      {
        id: "loja-1",
        moduloId: "loja",
        titulo: "Organização e vitrine",
        introducao:
          "A loja fala antes de você. Organização transmite confiança e qualidade.",
        passos: [
          "Mantenha as prateleiras alinhadas e os produtos dobrados no mesmo padrão.",
          "Agrupe por linha, cor e tamanho para facilitar a escolha.",
          "Na vitrine, destaque um ambiente completo (cama montada + acessórios).",
          "Troque a vitrine com frequência para atrair quem já passou antes.",
        ],
        dica: "Dica Marken Fassi: menos é mais. Um ambiente bem montado vende mais que prateleira lotada.",
        checklist: [
          "Prateleiras alinhadas e dobras padronizadas",
          "Produtos agrupados por linha e cor",
          "Vitrine com ambiente montado",
        ],
      },
      {
        id: "loja-2",
        moduloId: "loja",
        titulo: "Ambientação sensorial",
        introducao:
          "Roupa de cama é sobre conforto. A loja precisa transmitir essa sensação.",
        passos: [
          "Cuide da iluminação: luz quente valoriza os tecidos e o aconchego.",
          "Mantenha o ambiente limpo, cheiroso e com temperatura agradável.",
          "Deixe peças acessíveis para o cliente tocar sem receio.",
          "Uma música ambiente suave prolonga o tempo de permanência.",
        ],
        dica: "Dica Marken Fassi: o cliente compra a sensação de conforto. Faça a loja transmitir isso.",
      },
      {
        id: "loja-3",
        moduloId: "loja",
        titulo: "Reposição e etiquetas",
        introducao:
          "Produto em falta ou sem preço é venda perdida.",
        passos: [
          "Confira diariamente os itens em falta e reponha das gôndolas.",
          "Garanta que todo produto tenha etiqueta de preço legível.",
          "Mantenha os tamanhos e cores mais vendidos sempre disponíveis.",
          "Anote rupturas para o pedido de reposição.",
        ],
        dica: "Dica Marken Fassi: sem preço visível, o cliente desiste antes de perguntar.",
        errosComuns: [
          "Produto exposto sem etiqueta",
          "Deixar acabar os tamanhos mais procurados",
        ],
      },
    ],
  },
  {
    id: "venda",
    titulo: "A Venda Consultiva",
    cor: "#1B3D2A",
    icone: "Handshake",
    descricao: "Como conduzir a venda do acolhimento ao fechamento.",
    licoes: [
      {
        id: "venda-1",
        moduloId: "venda",
        titulo: "Abordagem e acolhimento",
        introducao:
          "Os primeiros segundos definem a venda. Acolha sem pressionar.",
        passos: [
          "Cumprimente com simpatia e deixe o cliente à vontade.",
          "Evite o 'posso ajudar?' — prefira um comentário sobre um produto.",
          "Observe o que o cliente olha para entender o interesse.",
          "Aproxime-se no momento certo, sem perseguir.",
        ],
        dica: "Dica Marken Fassi: sorria e chame pelo nome quando possível. Conexão vem antes da venda.",
        errosComuns: [
          "Abordar de forma invasiva logo na entrada",
          "Deixar o cliente sozinho tempo demais",
        ],
      },
      {
        id: "venda-2",
        moduloId: "venda",
        titulo: "Descoberta da necessidade",
        introducao:
          "Quem pergunta certo, vende mais. Entenda antes de oferecer.",
        passos: [
          "Pergunte para quem é e para qual ambiente (quarto de casal, hóspedes, presente).",
          "Descubra a preferência de toque (fresco, macio, aconchegante).",
          "Identifique o tamanho da cama e a faixa de investimento.",
          "Ouça mais do que fala nessa etapa.",
        ],
        dica: "Dica Marken Fassi: uma boa pergunta economiza dez argumentos.",
      },
      {
        id: "venda-3",
        moduloId: "venda",
        titulo: "Apresentação do produto",
        introducao:
          "Agora sim você mostra a solução — conectada ao que o cliente disse.",
        passos: [
          "Apresente 2 ou 3 opções, não a loja inteira, para não confundir.",
          "Traduza a característica em benefício ('300 fios = toque mais macio e durável').",
          "Convide o cliente a tocar e sentir o tecido.",
          "Use a cama de exposição para mostrar o resultado montado.",
        ],
        dica: "Dica Marken Fassi: venda o benefício e a sensação, não a ficha técnica.",
        errosComuns: [
          "Mostrar opções demais e travar a decisão",
          "Falar de características sem traduzir em benefício",
        ],
      },
      {
        id: "venda-4",
        moduloId: "venda",
        titulo: "Objeções e fechamento",
        introducao:
          "Objeção é interesse. Trate com calma e conduza ao 'sim'.",
        passos: [
          "Escute a objeção sem interromper e demonstre que entendeu.",
          "Responda com valor: durabilidade, conforto e custo por uso.",
          "Ofereça condições de pagamento como facilitador.",
          "Conduza ao fechamento com uma pergunta de decisão ('leva o branco ou o palha?').",
        ],
        dica: "Dica Marken Fassi: preço alto vira 'investimento' quando você mostra durabilidade.",
        checklist: [
          "Ouvi a objeção por completo",
          "Respondi com benefício, não com desconto imediato",
          "Fiz uma pergunta de fechamento",
        ],
      },
    ],
  },
  {
    id: "pos-venda",
    titulo: "Pós-venda e Fidelização",
    cor: "#2A5640",
    icone: "HeartHandshake",
    descricao: "Como transformar uma venda em um cliente que volta e indica.",
    licoes: [
      {
        id: "pos-1",
        moduloId: "pos-venda",
        titulo: "Fechando a experiência",
        introducao:
          "O fim da compra é o começo do relacionamento.",
        passos: [
          "Agradeça de forma genuína e reforce que fez uma ótima escolha.",
          "Entregue a orientação de cuidado do produto.",
          "Embale com capricho — a entrega faz parte da experiência.",
          "Convide o cliente a voltar e conhecer os lançamentos.",
        ],
        dica: "Dica Marken Fassi: a última impressão fica. Encerre com cuidado e simpatia.",
      },
      {
        id: "pos-2",
        moduloId: "pos-venda",
        titulo: "Cadastro e relacionamento",
        introducao:
          "Cliente cadastrado é cliente que você consegue trazer de volta.",
        passos: [
          "Cadastre nome, contato e preferências com o consentimento do cliente.",
          "Registre a compra para personalizar futuras ofertas.",
          "Mantenha contato em datas especiais e lançamentos.",
          "Peça feedback sobre a experiência de compra.",
        ],
        dica: "Dica Marken Fassi: um contato salvo hoje é uma venda futura.",
        errosComuns: [
          "Não pedir o cadastro por pressa",
        ],
      },
      {
        id: "pos-3",
        moduloId: "pos-venda",
        titulo: "Recompra e indicação",
        introducao:
          "Clientes satisfeitos são seus melhores vendedores.",
        passos: [
          "Avise clientes antigos sobre novidades que combinam com o que já compraram.",
          "Incentive a indicação para amigos e familiares.",
          "Ofereça combos e complementos (fronhas, mantas, toalhas).",
          "Reconheça e valorize o cliente fiel.",
        ],
        dica: "Dica Marken Fassi: é mais barato encantar quem já comprou do que conquistar um novo.",
      },
    ],
  },
];

// Funcionários mock para o painel do lojista.
export const funcionarios: Funcionario[] = [
  {
    id: "f1",
    nome: "Ana Souza",
    cargo: "Vendedora",
    avatar: "AS",
    licoesConcluidas: [
      "prod-1", "prod-2", "prod-3", "cama-1", "cama-2", "cama-3",
      "loja-1", "loja-2", "loja-3", "venda-1", "venda-2", "venda-3", "venda-4",
      "pos-1", "pos-2", "pos-3",
    ],
  },
  {
    id: "f2",
    nome: "Bruno Lima",
    cargo: "Vendedor",
    avatar: "BL",
    licoesConcluidas: [
      "prod-1", "prod-2", "prod-3", "cama-1", "cama-2",
      "loja-1", "loja-2", "venda-1", "venda-2", "venda-3",
    ],
  },
  {
    id: "f3",
    nome: "Carla Dias",
    cargo: "Vendedora",
    avatar: "CD",
    licoesConcluidas: ["prod-1", "prod-2", "cama-1", "loja-1", "venda-1"],
  },
  {
    id: "f4",
    nome: "Diego Reis",
    cargo: "Estoquista",
    avatar: "DR",
    licoesConcluidas: ["prod-1", "cama-1"],
  },
];

export function totalLicoes(): number {
  return modulos.reduce((acc, m) => acc + m.licoes.length, 0);
}

export function licoesDoModulo(moduloId: string): string[] {
  const m = modulos.find((x) => x.id === moduloId);
  return m ? m.licoes.map((l) => l.id) : [];
}
