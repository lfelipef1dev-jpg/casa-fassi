import {
  Bath,
  BedDouble,
  Store,
  HandHeart,
  Video,
  Users,
  TrendingUp,
  Shirt,
  Award,
  type LucideIcon,
} from "lucide-react";

export type Selo = {
  id: string;
  nome: string;
  emoji: string;
  icon: LucideIcon;
  descricao: string;
  conquista: string;
  categoria: "modulo" | "trilha" | "perfil" | "vitrine" | "social" | "presenca";
};

export const selos: Selo[] = [
  {
    id: "toalha-rosto",
    nome: "Toalha de Rosto",
    emoji: "",
    icon: Bath,
    descricao: "Concluiu o 1º módulo de qualquer trilha",
    conquista: "1 módulo concluído",
    categoria: "modulo",
  },
  {
    id: "toalha-banho",
    nome: "Toalha de Banho",
    emoji: "",
    icon: Bath,
    descricao: "Concluiu 2 módulos na Casa",
    conquista: "2 módulos concluídos",
    categoria: "modulo",
  },
  {
    id: "jogo-cama",
    nome: "Jogo de Cama",
    emoji: "",
    icon: BedDouble,
    descricao: "Concluiu 3 módulos na Casa",
    conquista: "3 módulos concluídos",
    categoria: "modulo",
  },
  {
    id: "vitrine-marken",
    nome: "Vitrine Marken Fassi",
    emoji: "",
    icon: Store,
    descricao: "Enviou foto da vitrine da própria loja",
    conquista: "1 foto de vitrine enviada",
    categoria: "vitrine",
  },
  {
    id: "boas-vindas",
    nome: "Boas-Vindas",
    emoji: "",
    icon: HandHeart,
    descricao: "Completou o perfil (foto, loja, cidade)",
    conquista: "Perfil completo",
    categoria: "perfil",
  },
  {
    id: "presenca",
    nome: "Presença",
    emoji: "",
    icon: Video,
    descricao: "Assistiu a uma live ou encontro ao vivo",
    conquista: "1 live/encontro assistido",
    categoria: "presenca",
  },
  {
    id: "embaixador",
    nome: "Embaixador",
    emoji: "",
    icon: Users,
    descricao: "Indicou outro lojista para a Casa",
    conquista: "1 indicação realizada",
    categoria: "social",
  },
  {
    id: "especialista-produto",
    nome: "Especialista em Produto",
    emoji: "",
    icon: Shirt,
    descricao: "Completou a trilha de Produto/Enxoval inteira",
    conquista: "Trilha de Produto concluída",
    categoria: "trilha",
  },
  {
    id: "especialista-vendas",
    nome: "Especialista em Vendas",
    emoji: "",
    icon: TrendingUp,
    descricao: "Completou a trilha de Vendas inteira",
    conquista: "Trilha de Vendas concluída",
    categoria: "trilha",
  },
  {
    id: "especialista-master",
    nome: "Especialista Master Marken Fassi",
    emoji: "",
    icon: Award,
    descricao: "Completou as duas trilhas (Produto + Vendas)",
    conquista: "Duas trilhas concluídas",
    categoria: "trilha",
  },
];

export type SeloConquistado = {
  seloId: string;
  data: string;
};

export function verificarSelosConquistados(params: {
  modulosConcluidos: number;
  perfilCompleto: boolean;
  fotosVitrine: number;
  livesAssistidas: number;
  indicacoes: number;
  trilhaProdutoCompleta: boolean;
  trilhaVendasCompleta: boolean;
}): string[] {
  const conquistados: string[] = [];

  if (params.modulosConcluidos >= 1) conquistados.push("toalha-rosto");
  if (params.modulosConcluidos >= 2) conquistados.push("toalha-banho");
  if (params.modulosConcluidos >= 3) conquistados.push("jogo-cama");
  if (params.perfilCompleto) conquistados.push("boas-vindas");
  if (params.fotosVitrine >= 1) conquistados.push("vitrine-marken");
  if (params.livesAssistidas >= 1) conquistados.push("presenca");
  if (params.indicacoes >= 1) conquistados.push("embaixador");
  if (params.trilhaProdutoCompleta) conquistados.push("especialista-produto");
  if (params.trilhaVendasCompleta) conquistados.push("especialista-vendas");
  if (params.trilhaProdutoCompleta && params.trilhaVendasCompleta) conquistados.push("especialista-master");

  return conquistados;
}

export function getSeloById(id: string): Selo | undefined {
  return selos.find((s) => s.id === id);
}
