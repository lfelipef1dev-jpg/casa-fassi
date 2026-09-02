"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Clock,
  BookOpen,
  Award,
  Bookmark,
  Check,
  ChevronDown,
  User,
  Download,
  FileText,
} from "lucide-react";
import { getCursoById, totalAulasCurso, todasAulasIds } from "@/lib/cursos";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function CursoPage() {
  const params = useParams();
  const router = useRouter();
  const cursoId = params.cursoId as string;
  const curso = getCursoById(cursoId);
  const { aulasConcluidas, aulasSalvas, toggleAulaSalva, concluirAula } = useGameStore();
  const [moduloExpandido, setModuloExpandido] = useState<string | null>(null);

  if (!curso) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Curso não encontrado</p>
        <button onClick={() => router.push("/app/universidade")} className="btn-ghost mt-4">
          Voltar à Universidade
        </button>
      </div>
    );
  }

  const ids = todasAulasIds(curso);
  const feitas = ids.filter((id) => aulasConcluidas.includes(id)).length;
  const pct = ids.length > 0 ? Math.round((feitas / ids.length) * 100) : 0;
  const totalAulas = totalAulasCurso(curso);
  const concluido = feitas === ids.length && feitas > 0;
  const iniciado = feitas > 0 && !concluido;

  // Encontrar próxima aula não concluída
  const proximaAula = ids.find((id) => !aulasConcluidas.includes(id));

  return (
    <div className="space-y-6 animate-fade-in">
      <Link
        href="/app/universidade"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} strokeWidth={1.75} /> Universidade
      </Link>

      {/* Header do curso */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1F1C18 0%, #3D3833 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#B89A6A] blur-[100px]" />
        </div>
        <div className="relative z-10 p-6 md:p-8 text-surface">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-white/15 text-white font-medium">
              {curso.categoria}
            </span>
            {curso.certificado && (
              <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[#B89A6A]/20 text-[#B89A6A] font-medium flex items-center gap-1">
                <Award size={10} strokeWidth={1.75} /> Certificado disponível
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-2">{curso.titulo}</h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl mb-4">{curso.descricao}</p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 mb-4">
            <span className="flex items-center gap-1"><User size={13} strokeWidth={1.75} /> {curso.professor}</span>
            <span className="flex items-center gap-1"><BookOpen size={13} strokeWidth={1.75} /> {curso.modulos.length} módulos</span>
            <span className="flex items-center gap-1"><Play size={13} strokeWidth={1.75} /> {totalAulas} aulas</span>
            <span className="flex items-center gap-1"><Clock size={13} strokeWidth={1.75} /> {curso.duracaoTotal}</span>
            <span className="flex items-center gap-1"><User size={13} strokeWidth={1.75} /> {curso.publico}</span>
          </div>

          {/* Progresso */}
          {iniciado && (
            <div className="mb-4 max-w-md">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/70">Seu progresso</span>
                <span className="text-[#B89A6A] font-semibold">{pct}%</span>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                <div className="h-full bg-[#B89A6A] rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          {/* Botão de ação */}
          <button
            onClick={() => {
              if (proximaAula) {
                router.push(`/app/universidade/aula/${proximaAula}`);
              } else {
                router.push(`/app/universidade/aula/${ids[0]}`);
              }
            }}
            className="inline-flex items-center gap-2 bg-[#B89A6A] hover:bg-[#9A7E50] text-[#7C6041] px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
          >
            <Play size={18} strokeWidth={1.75} />
            {concluido ? "Rever curso" : iniciado ? "Continuar curso" : "Iniciar curso"}
          </button>
        </div>
      </div>

      {/* Objetivos */}
      <div className="card-fassi p-5">
        <h2 className="font-serif text-lg font-semibold text-ink mb-3">O que você vai aprender</h2>
        <ul className="space-y-2">
          {curso.modulos.map((m) => (
            <li key={m.id} className="flex items-start gap-2 text-sm text-ink/80">
              <Check size={16} strokeWidth={1.75} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{m.nome.replace(/^Módulo \d+ — /, "")}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Módulos */}
      <div>
        <h2 className="font-serif text-xl font-semibold text-ink mb-4">Conteúdo do curso</h2>
        <div className="space-y-3">
          {curso.modulos.map((m, idx) => {
            const aulasIds = m.aulas.map((a) => a.id);
            const feitasMod = aulasIds.filter((id) => aulasConcluidas.includes(id)).length;
            const pctMod = aulasIds.length > 0 ? Math.round((feitasMod / aulasIds.length) * 100) : 0;
            const completo = feitasMod === aulasIds.length && feitasMod > 0;
            const emAndamento = feitasMod > 0 && !completo;
            const expandido = moduloExpandido === m.id;

            return (
              <div key={m.id} className="card-fassi overflow-hidden">
                <button
                  onClick={() => setModuloExpandido(expandido ? null : m.id)}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm",
                    completo ? "bg-primary/15 text-primary" : emAndamento ? "bg-[#B89A6A]/15 text-[#9A7E50]" : "bg-line text-muted"
                  )}>
                    {completo ? <Check size={18} strokeWidth={1.75} /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-ink">{m.nome}</h3>
                    <p className="text-xs text-muted mt-0.5">{m.descricao}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[0.7rem] text-muted">
                      <span>{m.aulas.length} aulas</span>
                      <span>·</span>
                      <span>{feitasMod}/{m.aulas.length} concluídas</span>
                      {completo && <span className="text-primary font-medium">· Concluído</span>}
                      {emAndamento && <span className="text-[#9A7E50] font-medium">· Em andamento</span>}
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    strokeWidth={1.75}
                    className={cn("text-muted transition-transform flex-shrink-0", expandido && "rotate-180")}
                  />
                </button>

                {expandido && (
                  <div className="border-t border-line divide-y divide-line">
                    {m.aulas.map((a, aIdx) => {
                      const concluida = aulasConcluidas.includes(a.id);
                      const salva = aulasSalvas.includes(a.id);
                      return (
                        <div key={a.id} className="flex items-center gap-3 p-3 pl-6 group">
                          <Link
                            href={`/app/universidade/aula/${a.id}`}
                            className="flex items-center gap-3 flex-1 min-w-0"
                          >
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                              concluida ? "bg-primary/10 text-primary" : "bg-line text-muted"
                            )}>
                              {concluida ? <Check size={14} strokeWidth={1.75} /> : <Play size={13} strokeWidth={1.75} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-ink truncate">{a.titulo}</div>
                              <div className="text-[0.7rem] text-muted flex items-center gap-2">
                                <span className="flex items-center gap-0.5"><Clock size={10} strokeWidth={1.75} /> {a.duracao}</span>
                                <span>· {a.professor}</span>
                              </div>
                            </div>
                          </Link>
                          <button
                            onClick={() => toggleAulaSalva(a.id)}
                            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-line transition-colors"
                          >
                            <Bookmark
                              size={15}
                              strokeWidth={1.75}
                              className={salva ? "text-primary fill-current" : "text-muted"}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Materiais incluídos */}
      <div className="card-fassi p-5">
        <h2 className="font-serif text-lg font-semibold text-ink mb-3 flex items-center gap-2">
          <Download size={18} strokeWidth={1.75} className="text-primary" /> Materiais incluídos
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {curso.modulos.flatMap((m) => m.aulas).flatMap((a) => a.materiais || []).map((mat) => (
            <div key={mat.id} className="flex items-center gap-3 p-3 rounded-xl border border-line bg-bg">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText size={16} strokeWidth={1.75} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-ink truncate">{mat.nome}</div>
                <div className="text-xs text-muted">{mat.descricao}</div>
              </div>
              <button className="text-xs font-semibold text-primary flex items-center gap-1 flex-shrink-0">
                <Download size={12} strokeWidth={1.75} /> Baixar
              </button>
            </div>
          ))}
          {curso.modulos.flatMap((m) => m.aulas).flatMap((a) => a.materiais || []).length === 0 && (
            <p className="text-sm text-muted">Nenhum material complementar neste curso.</p>
          )}
        </div>
      </div>
    </div>
  );
}
