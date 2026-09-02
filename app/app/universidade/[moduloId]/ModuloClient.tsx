"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Lightbulb,
  ListChecks,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";
import { modulos } from "@/lib/universidade";
import { useGameStore } from "@/lib/store";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export default function ModuloClient() {
  const params = useParams();
  const router = useRouter();
  const moduloId = params.moduloId as string;
  const modulo = modulos.find((m) => m.id === moduloId);
  const { licoesConcluidas, concluirLicao } = useGameStore();
  const [licaoAtual, setLicaoAtual] = useState(0);
  const [checkState, setCheckState] = useState<Record<number, boolean>>({});

  if (!modulo) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Módulo não encontrado</p>
        <button onClick={() => router.push("/app/universidade")} className="btn-ghost mt-4">
          Voltar à Universidade
        </button>
      </div>
    );
  }

  const Icon = getIcon(modulo.icone);
  const licao = modulo.licoes[licaoAtual];
  const concluida = licoesConcluidas.includes(licao.id);

  function handleConcluir() {
    if (!modulo) return;
    concluirLicao(licao.id);
    if (licaoAtual < modulo.licoes.length - 1) {
      setLicaoAtual(licaoAtual + 1);
      setCheckState({});
    } else {
      router.push("/app/universidade");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Link
        href="/app/universidade"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} strokeWidth={1.75} /> Universidade
      </Link>

      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${modulo.cor}18` }}
        >
          <Icon size={22} strokeWidth={1.75} style={{ color: modulo.cor }} />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">{modulo.titulo}</h1>
          <p className="text-sm text-muted">{modulo.descricao}</p>
        </div>
      </div>

      {/* Navegação de lições */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {modulo.licoes.map((l, i) => {
          const done = licoesConcluidas.includes(l.id);
          const active = i === licaoAtual;
          return (
            <button
              key={l.id}
              onClick={() => {
                setLicaoAtual(i);
                setCheckState({});
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border",
                active
                  ? "bg-ink text-accent border-ink"
                  : done
                  ? "bg-sage/10 text-sage border-sage/30"
                  : "bg-card text-muted border-line hover:border-accent"
              )}
            >
              {done ? <Check size={14} strokeWidth={1.75} /> : <span className="w-5 text-center">{i + 1}</span>}
              {l.titulo}
            </button>
          );
        })}
      </div>

      {/* Conteúdo da lição */}
      <div className="card-fassi p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <h2 className="font-serif text-xl font-semibold text-ink">{licao.titulo}</h2>
            {concluida && (
              <span className="badge-gold text-[0.65rem]">
                <Check size={10} strokeWidth={1.75} /> Concluída
              </span>
            )}
          </div>
          <p className="text-sm text-ink/80 leading-relaxed">{licao.introducao}</p>
        </div>

        {/* Mídia (placeholder quando ainda não existe) */}
        <div
          className="rounded-xl border border-dashed border-line bg-bg flex flex-col items-center justify-center py-10 text-muted"
        >
          <ImageIcon size={28} strokeWidth={1.75} className="mb-2 opacity-60" />
          <p className="text-xs">Foto/vídeo desta lição em breve</p>
        </div>

        {/* Passo a passo */}
        <div>
          <h3 className="text-sm font-semibold text-ink mb-3">Passo a passo</h3>
          <ol className="space-y-3">
            {licao.passos.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-surface flex-shrink-0"
                  style={{ background: modulo.cor }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-ink/85 leading-relaxed pt-0.5">{p}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Dica Marken Fassi */}
        <div
          className="rounded-xl p-4 flex gap-3 items-start"
          style={{ background: "#B89A6A18", border: "1px solid #B89A6A40" }}
        >
          <Lightbulb size={18} strokeWidth={1.75} className="text-[#9A7E50] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-ink/90 leading-relaxed">{licao.dica}</p>
        </div>

        {/* Checklist */}
        {licao.checklist && licao.checklist.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
              <ListChecks size={16} strokeWidth={1.75} className="text-primary" /> Checklist
            </h3>
            <div className="space-y-2">
              {licao.checklist.map((c, i) => {
                const marcado = checkState[i];
                return (
                  <button
                    key={i}
                    onClick={() => setCheckState((s) => ({ ...s, [i]: !s[i] }))}
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-all",
                      marcado
                        ? "border-sage bg-sage/10 text-sage"
                        : "border-line text-ink/80 hover:border-accent/40"
                    )}
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={1.75}
                      className={marcado ? "text-sage" : "text-muted"}
                    />
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Erros comuns */}
        {licao.errosComuns && licao.errosComuns.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
              <AlertTriangle size={16} strokeWidth={1.75} className="text-red-500" /> Erros comuns
            </h3>
            <ul className="space-y-2">
              {licao.errosComuns.map((e, i) => (
                <li
                  key={i}
                  className="text-sm text-ink/80 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleConcluir}
          className="btn-gold w-full inline-flex items-center justify-center gap-2"
        >
          <Check size={18} strokeWidth={1.75} />
          {concluida
            ? licaoAtual < modulo.licoes.length - 1
              ? "Próxima lição"
              : "Voltar ao módulo"
            : "Concluir lição"}
          <ArrowRight size={18} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
