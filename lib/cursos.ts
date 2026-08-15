import type { Curso, AgendaItem, ModuloCurso, AulaCurso } from "./types";

export const categoriasCursos = [
  "Essência Marken Fassi",
  "Produtos e tecidos",
  "Coleções",
  "Atendimento",
  "Vitrine e composição",
  "Conteúdo digital",
  "Lançamentos",
  "Aulas rápidas",
  "Materiais para download",
  "Vendas",
];

export const cursos: Curso[] = [
  {
    id: "essencia-marken-fassi",
    titulo: "Essência Marken Fassi",
    categoria: "Essência Marken Fassi",
    descricao:
      "A história, os valores e o que faz a Marken Fassi ser uma marca de bem-viver. O ponto de partida para todos os parceiros.",
    professor: "Equipe Marken Fassi",
    publico: "Todos os parceiros",
    duracaoTotal: "45 min",
    certificado: true,
    imagem: "",
    destaque: true,
    essencial: true,
    novo: false,
    modulos: [
      {
        id: "emf-m1",
        nome: "Módulo 1 — Conheça a história",
        descricao: "As raízes da Marken Fassi e o que nos torna uma marca premium.",
        aulas: [
          {
            id: "emf-m1-a1",
            titulo: "As raízes da Marken Fassi",
            duracao: "6 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Conheça a história de como a Marken Fassi nasceu de uma visão de levar o bem-viver para cada casa.",
            textoComplementar:
              "A Marken Fassi nasceu do desejo de transformar o ato de dormir e viver em casa em uma experiência sensorial completa. Cada coleção carrega essa essência.",
            faq: [
              {
                pergunta: "O que diferencia a Marken Fassi de outras marcas?",
                resposta:
                  "O cuidado com cada detalhe — do fio ao acabamento — e a preocupação em criar experiências, não apenas produtos.",
              },
            ],
          },
          {
            id: "emf-m1-a2",
            titulo: "O que nos torna premium",
            duracao: "8 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Os pilares que sustentam a marca: qualidade dos fios, acabamento artesanal, design atemporal e experiência de uso.",
            textoComplementar:
              "Ser premium não é apenas ter produtos caros. É oferecer uma experiência completa — do toque do tecido à embalagem final.",
          },
          {
            id: "emf-m1-a3",
            titulo: "O bem-viver como filosofia",
            duracao: "5 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Como o conceito de bem-viver guia cada decisão da marca, desde o desenvolvimento do produto até o atendimento na loja.",
          },
        ],
      },
      {
        id: "emf-m2",
        nome: "Módulo 2 — Produtos e materiais",
        descricao: "Tudo sobre os tecidos, fios e acabamentos que fazem a diferença.",
        aulas: [
          {
            id: "emf-m2-a1",
            titulo: "Contagem de fios: o que significa",
            duracao: "4 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Entenda o que é a contagem de fios e por que ela importa na hora de explicar a qualidade ao cliente.",
            fichaTecnica: [
              { label: "Fios 200", valor: "Qualidade padrão" },
              { label: "Fios 300", valor: "Qualidade superior" },
              { label: "Fios 400+", valor: "Premium" },
            ],
            galeria: [
              { id: "g1", url: "", legenda: "Detalhe da trama do tecido" },
              { id: "g2", url: "", legenda: "Comparação de fios 200 vs 400" },
            ],
          },
          {
            id: "emf-m2-a2",
            titulo: "Algodão egípcio vs. Tencel™",
            duracao: "6 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "O algodão egípcio é uma fibra natural extra-longa. O Tencel™ é uma fibra vegetal sustentável. Conheça as diferenças.",
            fichaTecnica: [
              { label: "Algodão egípcio", valor: "Fibra natural extra-longa" },
              { label: "Tencel™", valor: "Fibra de celulose de eucalipto" },
              { label: "Toque", valor: "Algodão: macio e durável / Tencel: sedoso e respirável" },
            ],
            galeria: [
              { id: "g3", url: "", legenda: "Algodão egípcio — detalhe da fibra" },
              { id: "g4", url: "", legenda: "Tencel™ — detalhe da fibra" },
            ],
            faq: [
              {
                pergunta: "Qual é melhor para o cliente?",
                resposta:
                  "Depende da preferência pessoal. Algodão egípcio é mais durável, Tencel™ é mais fresco e sustentável.",
              },
            ],
          },
          {
            id: "emf-m2-a3",
            titulo: "Percal vs. Cetim vs. Malha",
            duracao: "5 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Cada tecido tem uma sensação única. Aprenda a traduzir isso em recomendações personalizadas.",
            galeria: [
              { id: "g5", url: "", legenda: "Percal — trama fechada" },
              { id: "g6", url: "", legenda: "Cetim — brilho elegante" },
              { id: "g7", url: "", legenda: "Malha — toque casual" },
            ],
          },
          {
            id: "emf-m2-a4",
            titulo: "Cuidados e conservação",
            duracao: "4 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Como orientar o cliente a cuidar do produto para manter o toque e a cor por muito mais tempo.",
            materiais: [
              { id: "mat1", nome: "Guia de cuidados Marken Fassi", tipo: "pdf", descricao: "Cartilha completa de conservação" },
            ],
          },
        ],
      },
      {
        id: "emf-m3",
        nome: "Módulo 3 — Como apresentar ao cliente",
        descricao: "Técnicas de atendimento consultivo para conduzir a venda com elegância.",
        aulas: [
          {
            id: "emf-m3-a1",
            titulo: "Acolhimento e primeira impressão",
            duracao: "7 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Os primeiros segundos definem a venda. Aprenda a acolher sem pressionar.",
          },
          {
            id: "emf-m3-a2",
            titulo: "Descoberta da necessidade",
            duracao: "6 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Quem pergunta certo, vende mais. Aprenda as perguntas que revelam o que o cliente realmente busca.",
          },
          {
            id: "emf-m3-a3",
            titulo: "Apresentação do produto",
            duracao: "8 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Como traduzir características técnicas em benefícios sensoriais que conectam com o cliente.",
          },
          {
            id: "emf-m3-a4",
            titulo: "Objeções e fechamento",
            duracao: "7 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Objeção é interesse. Aprenda a tratar com calma e conduzir ao 'sim' com elegância.",
          },
        ],
      },
      {
        id: "emf-m4",
        nome: "Módulo 4 — Vitrine e composição",
        descricao: "Como montar uma cama de exposição que faz o cliente parar e desejar.",
        aulas: [
          {
            id: "emf-m4-a1",
            titulo: "Preparando a base",
            duracao: "5 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "A cama de exposição é a sua vitrine mais poderosa. Tudo começa na base impecável.",
            galeria: [
              { id: "g8", url: "", legenda: "Base bem esticada, sem rugas" },
            ],
          },
          {
            id: "emf-m4-a2",
            titulo: "As camadas da cama",
            duracao: "6 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "O segredo de uma cama que encanta está nas camadas: lençol, edredom, travesseiros e manta.",
            galeria: [
              { id: "g9", url: "", legenda: "Camadas bem montadas" },
              { id: "g10", url: "", legenda: "Travesseiros decorativos" },
              { id: "g11", url: "", legenda: "Manta no pé da cama" },
            ],
          },
          {
            id: "emf-m4-a3",
            titulo: "Manutenção ao longo do dia",
            duracao: "4 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Uma cama linda de manhã pode estar desarrumada à tarde. Manutenção é parte da venda.",
          },
        ],
      },
      {
        id: "emf-m5",
        nome: "Módulo 5 — Conteúdo para redes sociais",
        descricao: "Como criar conteúdo simples e elegante para promover a loja e a marca.",
        aulas: [
          {
            id: "emf-m5-a1",
            titulo: "Como fotografar produtos e ambientes",
            duracao: "8 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Princípios básicos de fotografia para criar conteúdo que valoriza o produto.",
            galeria: [
              { id: "g12", url: "", legenda: "Iluminação natural valoriza o tecido" },
              { id: "g13", url: "", legenda: "Composição de ambiente" },
            ],
          },
          {
            id: "emf-m5-a2",
            titulo: "Como gravar vídeos simples na loja",
            duracao: "7 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Vídeos curtos e autênticos que mostram o produto em ação e aproximam a marca do cliente.",
          },
          {
            id: "emf-m5-a3",
            titulo: "Ideias de conteúdo para o mês",
            duracao: "5 min",
            professor: "Equipe Marken Fassi",
            resumo:
              "Um calendário prático de ideias de conteúdo para manter a loja ativa nas redes.",
            materiais: [
              { id: "mat2", nome: "Calendário de conteúdo mensal", tipo: "pdf", descricao: "30 ideias de posts para o mês" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "tecidos-fios",
    titulo: "Tecidos e Fios: O Toque Marken Fassi",
    categoria: "Produtos e tecidos",
    descricao:
      "Mergulho profundo nos tecidos, fios e acabamentos. Para quem quer dominar o assunto e orientar clientes com segurança.",
    professor: "Equipe de Produto Marken Fassi",
    publico: "Vendedores e lojistas",
    duracaoTotal: "35 min",
    certificado: true,
    imagem: "",
    destaque: false,
    essencial: true,
    novo: false,
    modulos: [
      {
        id: "tf-m1",
        nome: "Módulo 1 — Fundamentos dos tecidos",
        descricao: "O que torna um tecido premium e como identificar qualidade.",
        aulas: [
          {
            id: "tf-m1-a1",
            titulo: "Anatomia de um tecido premium",
            duracao: "6 min",
            professor: "Equipe de Produto",
            resumo: "Trama, urdume, fios e acabamento — entenda cada elemento que define a qualidade.",
            galeria: [
              { id: "g14", url: "", legenda: "Trama vista de perto" },
              { id: "g15", url: "", legenda: "Acabamento das bordas" },
            ],
          },
          {
            id: "tf-m1-a2",
            titulo: "Linho: o luxo natural",
            duracao: "5 min",
            professor: "Equipe de Produto",
            resumo: "O linho é o tecido mais antigo do mundo. Conheça suas características únicas.",
            fichaTecnica: [
              { label: "Origem", valor: "Fibra natural da planta do linho" },
              { label: "Toque", valor: "Fresco e texturizado" },
              { label: "Durabilidade", valor: "Alta — melhora com o tempo" },
            ],
          },
        ],
      },
      {
        id: "tf-m2",
        nome: "Módulo 2 — Argumentos de venda",
        descricao: "Como traduzir conhecimento técnico em benefícios que o cliente entende.",
        aulas: [
          {
            id: "tf-m2-a1",
            titulo: "Do técnico ao sensorial",
            duracao: "7 min",
            professor: "Equipe de Produto",
            resumo: "Aprenda a transformar '300 fios' em 'toque mais macio e durável'.",
          },
          {
            id: "tf-m2-a2",
            titulo: "Respondendo perguntas frequentes",
            duracao: "5 min",
            professor: "Equipe de Produto",
            resumo: "As dúvidas mais comuns dos clientes e as melhores respostas.",
            faq: [
              { pergunta: "Por que este é mais caro?", resposta: "Porque a qualidade do fio e o acabamento garantem durabilidade e toque superiores." },
              { pergunta: "Qual dura mais?", resposta: "Algodão egípcio de fibra longa mantém qualidade por muito mais tempo." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "colecao-alameda",
    titulo: "Coleção Alameda",
    categoria: "Coleções",
    descricao:
      "Conheça o conceito, as peças e os argumentos de venda da Coleção Alameda. Para apresentar com confiança na loja.",
    professor: "Design Team Marken Fassi",
    publico: "Vendedores e lojistas",
    duracaoTotal: "20 min",
    certificado: true,
    imagem: "",
    destaque: true,
    essencial: false,
    novo: true,
    modulos: [
      {
        id: "ca-m1",
        nome: "Módulo 1 — Conceito da coleção",
        descricao: "A história e a inspiração por trás da Coleção Alameda.",
        aulas: [
          {
            id: "ca-m1-a1",
            titulo: "A inspiração Alameda",
            duracao: "5 min",
            professor: "Design Team",
            resumo: "Conheça a inspiração e o conceito criativo da Coleção Alameda.",
            galeria: [
              { id: "g16", url: "", legenda: "Paleta de cores da coleção" },
              { id: "g17", url: "", legenda: "Ambientação completa" },
            ],
          },
          {
            id: "ca-m1-a2",
            titulo: "Peças e composições",
            duracao: "6 min",
            professor: "Design Team",
            resumo: "As principais peças da coleção e como compor ambientes.",
            galeria: [
              { id: "g18", url: "", legenda: "Jogo de cama Alameda" },
              { id: "g19", url: "", legenda: "Detalhe do bordado" },
              { id: "g20", url: "", legenda: "Variações de cor" },
            ],
            fichaTecnica: [
              { label: "Tecido", valor: "Algodão egípcio 300 fios" },
              { label: "Acabamento", valor: "Bordado exclusivo" },
              { label: "Cores", valor: "Branco, palha, verde oliva, terracota" },
            ],
          },
        ],
      },
      {
        id: "ca-m2",
        nome: "Módulo 2 — Como vender a coleção",
        descricao: "Argumentos e técnicas para apresentar a Coleção Alameda ao cliente.",
        aulas: [
          {
            id: "ca-m2-a1",
            titulo: "Argumentos de venda",
            duracao: "5 min",
            professor: "Design Team",
            resumo: "Os principais argumentos para apresentar a Coleção Alameda com confiança.",
          },
          {
            id: "ca-m2-a2",
            titulo: "Composições que encantam",
            duracao: "4 min",
            professor: "Design Team",
            resumo: "Como sugerir composições completas que fazem o cliente levar o conjunto.",
            galeria: [
              { id: "g21", url: "", legenda: "Composição cama completa" },
              { id: "g22", url: "", legenda: "Combinação com toalhas" },
            ],
            materiais: [
              { id: "mat3", nome: "Catálogo Coleção Alameda", tipo: "catalogo", descricao: "Catálogo completo com todas as peças" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "atendimento-premium",
    titulo: "Atendimento Premium",
    categoria: "Atendimento",
    descricao:
      "O padrão de atendimento que faz o cliente sentir que entrou em um mundo à parte. Inspirado nas melhores casas do mundo.",
    professor: "Equipe de Treinamento Marken Fassi",
    publico: "Vendedores e representantes",
    duracaoTotal: "30 min",
    certificado: true,
    imagem: "",
    destaque: false,
    essencial: true,
    novo: false,
    modulos: [
      {
        id: "ap-m1",
        nome: "Módulo 1 — O padrão de atendimento",
        descricao: "O que faz um atendimento ser premium e memorável.",
        aulas: [
          {
            id: "ap-m1-a1",
            titulo: "Os 3 passos do atendimento premium",
            duracao: "8 min",
            professor: "Equipe de Treinamento",
            resumo: "Acolhida, descoberta e encantamento — os três momentos que definem a experiência.",
          },
          {
            id: "ap-m1-a2",
            titulo: "Atendimento no WhatsApp",
            duracao: "10 min",
            professor: "Equipe de Treinamento",
            resumo: "Como levar o mesmo cuidado do presencial para o atendimento digital.",
          },
        ],
      },
      {
        id: "ap-m2",
        nome: "Módulo 2 — Pós-venda e fidelização",
        descricao: "Como transformar uma venda em um cliente que volta e indica.",
        aulas: [
          {
            id: "ap-m2-a1",
            titulo: "Fechando a experiência",
            duracao: "5 min",
            professor: "Equipe de Treinamento",
            resumo: "O fim da compra é o começo do relacionamento.",
          },
          {
            id: "ap-m2-a2",
            titulo: "Recompra e indicação",
            duracao: "7 min",
            professor: "Equipe de Treinamento",
            resumo: "Clientes satisfeitos são seus melhores vendedores.",
          },
        ],
      },
    ],
  },
  {
    id: "vitrine-composicao",
    titulo: "Vitrine e Composição de Ambiente",
    categoria: "Vitrine e composição",
    descricao:
      "Como montar vitrines e ambientes que traduzem o cuidado da Marken Fassi em cada detalhe visual.",
    professor: "Equipe de Visual Merchandising",
    publico: "Lojistas e vendedores",
    duracaoTotal: "25 min",
    certificado: true,
    imagem: "",
    destaque: false,
    essencial: false,
    novo: false,
    modulos: [
      {
        id: "vc-m1",
        nome: "Módulo 1 — Princípios de vitrine",
        descricao: "Os fundamentos de uma vitrine que para o cliente.",
        aulas: [
          {
            id: "vc-m1-a1",
            titulo: "A vitrine que para o cliente",
            duracao: "6 min",
            professor: "Equipe de Visual",
            resumo: "Os princípios visuais que fazem uma vitrine atrair e convidar para entrar.",
            galeria: [
              { id: "g23", url: "", legenda: "Vitrine com ambiente completo" },
              { id: "g24", url: "", legenda: "Iluminação valorizando o tecido" },
            ],
          },
          {
            id: "vc-m1-a2",
            titulo: "Mesa posta: elegância à brasileira",
            duracao: "7 min",
            professor: "Equipe de Visual",
            resumo: "Como montar uma mesa posta que conta uma história e faz o cliente querer levar tudo.",
            galeria: [
              { id: "g25", url: "", legenda: "Mesa posta completa" },
              { id: "g26", url: "", legenda: "Detalhe dos talheres e toalha" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "conteudo-digital",
    titulo: "Conteúdo Digital para a Loja",
    categoria: "Conteúdo digital",
    descricao:
      "Como criar conteúdo simples e elegante para redes sociais, aproximando a marca dos clientes no digital.",
    professor: "Equipe de Marketing Marken Fassi",
    publico: "Lojistas e vendedores",
    duracaoTotal: "20 min",
    certificado: false,
    imagem: "",
    destaque: false,
    essencial: false,
    novo: true,
    modulos: [
      {
        id: "cd-m1",
        nome: "Módulo 1 — Fotografia para redes",
        descricao: "Como fotografar produtos e ambientes com o celular.",
        aulas: [
          {
            id: "cd-m1-a1",
            titulo: "Fotografia de produto com celular",
            duracao: "8 min",
            professor: "Equipe de Marketing",
            resumo: "Princípios simples para fotos que valorizam o produto.",
            galeria: [
              { id: "g27", url: "", legenda: "Luz natural de frente" },
              { id: "g28", url: "", legenda: "Detalhe do tecido em macro" },
            ],
          },
          {
            id: "cd-m1-a2",
            titulo: "Composição de ambiente",
            duracao: "5 min",
            professor: "Equipe de Marketing",
            resumo: "Como compor o ambiente para a foto contar uma história.",
          },
        ],
      },
    ],
  },
  {
    id: "curso-vendas",
    titulo: "Curso de Vendas Marken Fassi",
    categoria: "Vendas",
    descricao:
      "Técnicas comerciais para conduzir a venda com elegância — da abordagem ao pós-venda. Trilha independente com certificado próprio.",
    professor: "Treinador de Vendas Marken Fassi",
    publico: "Vendedores, lojistas e representantes",
    duracaoTotal: "40 min",
    certificado: true,
    imagem: "",
    destaque: true,
    essencial: true,
    novo: true,
    modulos: [
      {
        id: "cv-m1",
        nome: "Módulo 1 — Técnicas de abordagem e fechamento",
        descricao: "Como iniciar a conversa e conduzir ao fechamento com naturalidade.",
        aulas: [
          {
            id: "cv-m1-a1",
            titulo: "A abordagem que abre portas",
            duracao: "8 min",
            professor: "Treinador de Vendas",
            resumo:
              "Os primeiros segundos definem tudo. Aprenda a abordagem que faz o cliente se sentir acolhido, não pressionado.",
            textoComplementar:
              "A abordagem premium não começa com 'posso ajudar?'. Começa com uma observação genuína sobre o que o cliente olha. Isso mostra atenção e abre a conversa naturalmente.",
            faq: [
              { pergunta: "E se o cliente não responder à abordagem?", resposta: "Respeite o silêncio. Diga algo como 'se precisar de qualquer coisa, estou por aqui' e mantenha-se disponível sem perseguir." },
            ],
          },
          {
            id: "cv-m1-a2",
            titulo: "Descobrindo o que o cliente realmente quer",
            duracao: "7 min",
            professor: "Treinador de Vendas",
            resumo:
              "As perguntas certas revelam necessidades que o cliente nem sabia que tinha. Aprenda a técnica da descoberta.",
          },
          {
            id: "cv-m1-a3",
            titulo: "Fechamento elegante: o 'sim' sem pressão",
            duracao: "8 min",
            professor: "Treinador de Vendas",
            resumo:
              "Como conduzir ao fechamento com uma pergunta de decisão simples, sem pressão e sem descontos desnecessários.",
          },
        ],
      },
      {
        id: "cv-m2",
        nome: "Módulo 2 — Contorno de objeções",
        descricao: "Cada objeção é uma oportunidade de entender melhor o cliente.",
        aulas: [
          {
            id: "cv-m2-a1",
            titulo: "'Está caro' — o que o cliente realmente diz",
            duracao: "7 min",
            professor: "Treinador de Vendas",
            resumo:
              "Quando o cliente diz 'está caro', ele está dizendo 'não entendi o valor'. Aprenda a traduzir preço em investimento.",
            faq: [
              { pergunta: "Devo oferecer desconto imediato?", resposta: "Não. Primeiro entenda a objeção. Muitas vezes o problema não é o preço, mas a falta de compreensão do valor." },
            ],
          },
          {
            id: "cv-m2-a2",
            titulo: "Ancoragem de preço na prática",
            duracao: "6 min",
            professor: "Treinador de Vendas",
            resumo:
              "Como apresentar opções de diferentes faixas para que o cliente perceba valor relativo e faça a escolha com confiança.",
          },
          {
            id: "cv-m2-a3",
            titulo: "Objeções comuns no enxoval",
            duracao: "5 min",
            professor: "Treinador de Vendas",
            resumo:
              "As objeções mais frequentes na venda de roupa de cama premium e as melhores respostas para cada uma.",
          },
        ],
      },
      {
        id: "cv-m3",
        nome: "Módulo 3 — Storytelling do produto",
        descricao: "Como contar a história do enxoval na venda, criando conexão emocional.",
        aulas: [
          {
            id: "cv-m3-a1",
            titulo: "Cada coleção tem uma história",
            duracao: "8 min",
            professor: "Treinador de Vendas",
            resumo:
              "Aprenda a usar a história da coleção para criar conexão emocional no momento da venda. O cliente não compra tecido — compra significado.",
          },
          {
            id: "cv-m3-a2",
            titulo: "Do tecido ao sentimento",
            duracao: "6 min",
            professor: "Treinador de Vendas",
            resumo:
              "Como traduzir características técnicas em histórias sensoriais que o cliente sente, não apenas entende.",
          },
        ],
      },
      {
        id: "cv-m4",
        nome: "Módulo 4 — Pós-venda e fidelização",
        descricao: "O fim da compra é o começo do relacionamento.",
        aulas: [
          {
            id: "cv-m4-a1",
            titulo: "A experiência que faz voltar",
            duracao: "7 min",
            professor: "Treinador de Vendas",
            resumo:
              "Como encerrar a venda de forma memorável — da embalagem ao agradecimento — para que o cliente volte e indique.",
          },
          {
            id: "cv-m4-a2",
            titulo: "Cadastro, contato e recompra",
            duracao: "6 min",
            professor: "Treinador de Vendas",
            resumo:
              "Como manter o relacionamento após a venda: cadastro, contato em datas especiais e aviso de lançamentos.",
          },
        ],
      },
    ],
  },
];

export const aulasRapidas = [
  { id: "ar1", titulo: "Qual tamanho de roupa de cama indicar?", duracao: "2 min", cursoId: "tecidos-fios" },
  { id: "ar2", titulo: "Como explicar a contagem de fios em 30 segundos", duracao: "3 min", cursoId: "tecidos-fios" },
  { id: "ar3", titulo: "Diferença entre as linhas Marken Fassi", duracao: "4 min", cursoId: "essencia-marken-fassi" },
  { id: "ar4", titulo: "Como cuidar de produtos de algodão egípcio", duracao: "3 min", cursoId: "tecidos-fios" },
  { id: "ar5", titulo: "Como montar uma cama em 2 minutos", duracao: "2 min", cursoId: "vitrine-composicao" },
  { id: "ar6", titulo: "O que dizer quando o cliente diz 'está caro'", duracao: "3 min", cursoId: "atendimento-premium" },
];

export const bibliotecaMateriais = [
  { id: "bib1", nome: "Guia de tamanhos e medidas", tipo: "pdf" as const, categoria: "Produtos e tecidos", data: "Jul 2026" },
  { id: "bib2", nome: "Catálogo Coleção Alameda", tipo: "catalogo" as const, categoria: "Coleções", data: "Jul 2026" },
  { id: "bib3", nome: "Cartilha de cuidados e conservação", tipo: "pdf" as const, categoria: "Produtos e tecidos", data: "Jun 2026" },
  { id: "bib4", nome: "Manual de visual merchandising", tipo: "manual" as const, categoria: "Vitrine e composição", data: "Jun 2026" },
  { id: "bib5", nome: "Calendário de conteúdo mensal", tipo: "pdf" as const, categoria: "Conteúdo digital", data: "Jun 2026" },
  { id: "bib6", nome: "Fichas técnicas — Linhas premium", tipo: "pdf" as const, categoria: "Produtos e tecidos", data: "Mai 2026" },
  { id: "bib7", nome: "Banco de imagens Marken Fassi", tipo: "imagem" as const, categoria: "Coleções", data: "Mai 2026" },
  { id: "bib8", nome: "Calendário comercial Julho 2026", tipo: "pdf" as const, categoria: "Lançamentos", data: "Jun 2026" },
];

export const agendaUniversidade: AgendaItem[] = [
  {
    id: "ag1",
    titulo: "Live: Apresentação da Coleção Alameda",
    data: "25 Jul 2026",
    horario: "19h00",
    tipo: "live",
    descricao: "Apresentação ao vivo da nova coleção com a equipe de design. Veja as peças, conceito e argumentos de venda.",
  },
  {
    id: "ag2",
    titulo: "Encontro: Boas práticas de atendimento",
    data: "30 Jul 2026",
    horario: "10h00",
    tipo: "encontro",
    descricao: "Encontro virtual para trocar experiências e boas práticas de atendimento entre lojistas e vendedores.",
  },
  {
    id: "ag3",
    titulo: "Conversa com especialistas: Tecidos e fios",
    data: "05 Ago 2026",
    horario: "18h00",
    tipo: "conversa",
    descricao: "Uma conversa descontraída com a equipe de produto sobre tecidos, fios e o que faz a diferença.",
  },
  {
    id: "ag4",
    titulo: "Lançamento: Linha Banho Ritual",
    data: "12 Ago 2026",
    horario: "19h30",
    tipo: "lancamento",
    descricao: "Apresentação da nova linha de banho como ritual de autocuidado.",
  },
];

export function totalAulasCurso(curso: Curso): number {
  return curso.modulos.reduce((acc, m) => acc + m.aulas.length, 0);
}

export function todasAulasIds(curso: Curso): string[] {
  return curso.modulos.flatMap((m) => m.aulas.map((a) => a.id));
}

export function getCursoById(id: string): Curso | undefined {
  return cursos.find((c) => c.id === id);
}

export function getAulaById(aulaId: string): { curso: Curso; modulo: ModuloCurso; aula: AulaCurso } | undefined {
  for (const curso of cursos) {
    for (const modulo of curso.modulos) {
      const aula = modulo.aulas.find((a) => a.id === aulaId);
      if (aula) return { curso, modulo, aula };
    }
  }
  return undefined;
}

export function getCursosTrilhaProduto(): Curso[] {
  return cursos.filter((c) => c.categoria !== "Vendas");
}

export function getAulasTrilhaProduto(): string[] {
  return getCursosTrilhaProduto().flatMap((c) => todasAulasIds(c));
}

export function getAulasTrilhaVendas(): string[] {
  const cv = getCursoById("curso-vendas");
  return cv ? todasAulasIds(cv) : [];
}

export const depoimentosLojistas = [
  {
    id: "dep1",
    lojista: "Ana Carolina",
    loja: "Casa Bella Enxovais",
    cidade: "Belo Horizonte, MG",
    case: "Como usar a história da coleção para fechar uma venda de kit completo",
    duracao: "2 min",
  },
  {
    id: "dep2",
    lojista: "Roberto Mendes",
    loja: "Mendes Cama & Banho",
    cidade: "Curitiba, PR",
    case: "O momento em que entendi que não vendo toalha — vendo cuidado",
    duracao: "1 min 30s",
  },
  {
    id: "dep3",
    lojista: "Juliana Prado",
    loja: "Prado Home",
    cidade: "Recife, PE",
    case: "Como montei uma vitrine que parou clientes na porta",
    duracao: "2 min 15s",
  },
  {
    id: "dep4",
    lojista: "Carlos Eduardo",
    loja: "Enxoval & Cia",
    cidade: "Porto Alegre, RS",
    case: "Pós-venda que transformou cliente em indicadora",
    duracao: "1 min 45s",
  },
];
