import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

export function getNivelByXp(xp: number, niveis: { id: number; name: string; minXp: number; icon: string }[]) {
  let nivel = niveis[0];
  for (const n of niveis) {
    if (xp >= n.minXp) nivel = n;
  }
  return nivel;
}

export function getProximoNivel(xp: number, niveis: { id: number; name: string; minXp: number; icon: string }[]) {
  const atual = getNivelByXp(xp, niveis);
  const proximo = niveis.find((n) => n.id === atual.id + 1);
  return proximo || atual;
}

export function getLigaByXp(xp: number, ligas: { id: string; nome: string; cor: string; minXp: number; descricao: string }[]) {
  let liga = ligas[0];
  for (const l of ligas) {
    if (xp >= l.minXp) liga = l;
  }
  return liga;
}

export function getProgressoNivel(xp: number, niveis: { id: number; name: string; minXp: number; icon: string }[]) {
  const atual = getNivelByXp(xp, niveis);
  const proximo = niveis.find((n) => n.id === atual.id + 1);
  if (!proximo) return 100;
  const total = proximo.minXp - atual.minXp;
  const progresso = xp - atual.minXp;
  return Math.min(100, Math.round((progresso / total) * 100));
}
