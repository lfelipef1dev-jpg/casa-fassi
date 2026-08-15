export type UserRole = "vendedor" | "lojista" | "admin";

export type Level = {
  id: number;
  name: string;
  minXp: number;
  icon: string;
};

export type Trilha = {
  id: string;
  titulo: string;
  descricao: string;
  cor: string;
  icone: string;
  aulas: Aula[];
  xpTotal: number;
};

export type Aula = {
  id: string;
  trilhaId: string;
  titulo: string;
  duracao: string;
  tipo: "video" | "texto" | "quiz";
  conteudo: string;
  xp: number;
  concluida?: boolean;
};

export type Licao = {
  id: string;
  moduloId: string;
  titulo: string;
  introducao: string;
  passos: string[];
  dica: string;
  checklist?: string[];
  errosComuns?: string[];
  midia?: { foto?: string; video?: string };
};

export type Modulo = {
  id: string;
  titulo: string;
  cor: string;
  icone: string;
  descricao: string;
  licoes: Licao[];
};

// ===== Novos tipos da Universidade =====

export type GaleriaImagem = {
  id: string;
  url: string;
  legenda: string;
};

export type MaterialDownload = {
  id: string;
  nome: string;
  tipo: "pdf" | "imagem" | "catalogo" | "manual";
  descricao: string;
};

export type FAQItem = {
  pergunta: string;
  resposta: string;
};

export type AulaCurso = {
  id: string;
  titulo: string;
  duracao: string;
  professor: string;
  resumo: string;
  textoComplementar?: string;
  galeria?: GaleriaImagem[];
  fichaTecnica?: { label: string; valor: string }[];
  materiais?: MaterialDownload[];
  faq?: FAQItem[];
  relacionados?: string[];
};

export type ModuloCurso = {
  id: string;
  nome: string;
  descricao: string;
  aulas: AulaCurso[];
};

export type Curso = {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  professor: string;
  publico: string;
  duracaoTotal: string;
  certificado: boolean;
  imagem: string;
  destaque: boolean;
  essencial: boolean;
  novo: boolean;
  modulos: ModuloCurso[];
};

export type AgendaItem = {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  tipo: "live" | "encontro" | "lancamento" | "conversa";
  descricao: string;
};

export type Funcionario = {
  id: string;
  nome: string;
  cargo: string;
  avatar: string;
  licoesConcluidas: string[];
};

export type QuizPergunta = {
  id: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export type Badge = {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  conquistado: boolean;
  data?: string;
};

export type Missao = {
  id: string;
  titulo: string;
  descricao: string;
  xp: number;
  moedas: number;
  progresso: number;
  total: number;
  tipo: "semanal" | "mensal" | "especial";
  prazo: string;
};

export type RankingEntry = {
  id: string;
  nome: string;
  loja: string;
  estado: string;
  avatar: string;
  xp: number;
  nivel: number;
  streak: number;
  posicao: number;
  souEu?: boolean;
};

export type PostComunidade = {
  id: string;
  autor: string;
  avatar: string;
  loja: string;
  tempo: string;
  texto: string;
  imagem?: string;
  curtidas: number;
  comentarios: number;
  curtido?: boolean;
  tipo: "vitrine" | "venda" | "dica" | "duvida";
};

export type Beneficio = {
  id: string;
  nome: string;
  descricao: string;
  custoMoedas: number;
  categoria: "produto" | "viagem" | "experiencia" | "certificado" | "evento";
  icone: string;
  destaque?: boolean;
};

export type Liga = {
  id: string;
  nome: string;
  cor: string;
  minXp: number;
  descricao: string;
};

export type Notificacao = {
  id: string;
  tipo: "badge" | "xp" | "streak" | "missao" | "comunidade" | "sistema";
  titulo: string;
  texto: string;
  tempo: string;
  lida: boolean;
};
