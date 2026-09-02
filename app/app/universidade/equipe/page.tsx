"use client";

import Link from "next/link";
import { ArrowLeft, Users, TrendingUp, Award, Lock } from "lucide-react";
import { modulos, funcionarios, totalLicoes } from "@/lib/universidade";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function EquipePage() {
  const { role } = useGameStore();
  const total = totalLicoes();

  if (role !== "lojista") {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Lock size={24} strokeWidth={1.75} className="text-primary" />
        </div>
        <h1 className="font-serif text-xl font-semibold text-ink">Área do Lojista</h1>
        <p className="text-sm text-muted">
          O painel da equipe está disponível apenas para o dono da loja.
        </p>
        <Link href="/app/universidade" className="btn-ghost inline-flex items-center gap-2">
          <ArrowLeft size={16} strokeWidth={1.75} /> Voltar à Universidade
        </Link>
      </div>
    );
  }

  const equipe = funcionarios
    .map((f) => {
      const feitas = f.licoesConcluidas.filter((id) =>
        modulos.some((m) => m.licoes.some((l) => l.id === id))
      ).length;
      const pct = total > 0 ? Math.round((feitas / total) * 100) : 0;
      return { ...f, feitas, pct };
    })
    .sort((a, b) => b.pct - a.pct);

  const mediaEquipe = Math.round(equipe.reduce((acc, f) => acc + f.pct, 0) / (equipe.length || 1));
  const concluiram = equipe.filter((f) => f.pct === 100).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <Link
        href="/app/universidade"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} strokeWidth={1.75} /> Universidade
      </Link>

      <div>
        <h1 className="section-title">Painel da Equipe</h1>
        <p className="section-sub">Acompanhe o progresso de treinamento dos funcionários da sua loja.</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-fassi p-4">
          <Users size={18} strokeWidth={1.75} className="text-primary mb-2" />
          <p className="text-2xl font-bold text-ink">{equipe.length}</p>
          <p className="text-xs text-muted">Funcionários</p>
        </div>
        <div className="card-fassi p-4">
          <TrendingUp size={18} strokeWidth={1.75} className="text-primary mb-2" />
          <p className="text-2xl font-bold text-ink">{mediaEquipe}%</p>
          <p className="text-xs text-muted">Média da equipe</p>
        </div>
        <div className="card-fassi p-4">
          <Award size={18} strokeWidth={1.75} className="text-[#9A7E50] mb-2" />
          <p className="text-2xl font-bold text-ink">{concluiram}</p>
          <p className="text-xs text-muted">Concluíram tudo</p>
        </div>
      </div>

      {/* Lista de funcionários */}
      <div className="card-fassi divide-y divide-line">
        {equipe.map((f, i) => (
          <div key={f.id} className="flex items-center gap-4 p-4">
            <span className="text-sm font-bold text-muted w-5 text-center">{i + 1}</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-sm font-bold text-surface flex-shrink-0">
              {f.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-ink truncate">{f.nome}</p>
                {f.pct === 100 && (
                  <span className="badge-gold text-[0.6rem]">
                    <Award size={9} strokeWidth={1.75} /> Certificado
                  </span>
                )}
              </div>
              <p className="text-xs text-muted">{f.cargo}</p>
              <div className="h-1.5 bg-line rounded-full overflow-hidden mt-2">
                <div
                  className={cn("h-full rounded-full transition-all duration-500")}
                  style={{
                    width: `${f.pct}%`,
                    background: f.pct === 100 ? "#B89A6A" : "#7C6041",
                  }}
                />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-ink">{f.pct}%</p>
              <p className="text-[0.65rem] text-muted">
                {f.feitas}/{total} lições
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progresso por módulo da equipe */}
      <div>
        <h2 className="font-serif text-lg font-semibold text-ink mb-3">Progresso por módulo</h2>
        <div className="space-y-3">
          {modulos.map((m) => {
            const ids = m.licoes.map((l) => l.id);
            const somaPct =
              equipe.reduce((acc, f) => {
                const feitasMod = f.licoesConcluidas.filter((id) => ids.includes(id)).length;
                return acc + (ids.length ? feitasMod / ids.length : 0);
              }, 0) / (equipe.length || 1);
            const pctModulo = Math.round(somaPct * 100);
            return (
              <div key={m.id} className="card-fassi p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-ink">{m.titulo}</p>
                  <span className="text-sm font-semibold text-ink">{pctModulo}%</span>
                </div>
                <div className="h-1.5 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pctModulo}%`, background: m.cor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
