"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Clock,
  User,
  Bookmark,
  Check,
  Download,
  FileText,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
  X,
  StickyNote,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { getAulaById, getCursoById } from "@/lib/cursos";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function AulaPage() {
  const params = useParams();
  const router = useRouter();
  const aulaId = params.aulaId as string;
  const info = getAulaById(aulaId);
  const { aulasConcluidas, aulasSalvas, anotacoes, concluirAula, toggleAulaSalva, setAnotacao } = useGameStore();
  const [galeriaAberta, setGaleriaAberta] = useState<number | null>(null);
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  if (!info) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Aula não encontrada</p>
        <button onClick={() => router.push("/app/universidade")} className="btn-ghost mt-4">
          Voltar à Universidade
        </button>
      </div>
    );
  }

  const { curso, modulo, aula } = info;
  const concluida = aulasConcluidas.includes(aula.id);
  const salva = aulasSalvas.includes(aula.id);
  const anotacao = anotacoes[aula.id] || "";

  // Navegação entre aulas
  const todasAulas = curso.modulos.flatMap((m) => m.aulas);
  const idxAtual = todasAulas.findIndex((a) => a.id === aula.id);
  const proxima = idxAtual < todasAulas.length - 1 ? todasAulas[idxAtual + 1] : null;
  const anterior = idxAtual > 0 ? todasAulas[idxAtual - 1] : null;

  // Conteúdos relacionados
  const relacionados = (aula.relacionados || [])
    .map((id) => getAulaById(id))
    .filter(Boolean);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted">
        <Link href="/app/universidade" className="hover:text-ink transition-colors">Universidade</Link>
        <ChevronRight size={12} />
        <Link href={`/app/universidade/curso/${curso.id}`} className="hover:text-ink transition-colors truncate max-w-[150px]">
          {curso.titulo}
        </Link>
        <ChevronRight size={12} />
        <span className="text-ink truncate">{aula.titulo}</span>
      </div>

      {/* Player de vídeo */}
      <div
        className="rounded-2xl overflow-hidden relative aspect-video flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 100%)" }}
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Play size={28} className="text-white/80 ml-1" fill="currentColor" />
          </div>
          <p className="text-sm text-white/60">Vídeo desta aula em breve</p>
        </div>
      </div>

      {/* Título e ações */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-2xl font-semibold text-ink mb-2">{aula.titulo}</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1"><User size={12} /> {aula.professor}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {aula.duracao}</span>
            <span>{modulo.nome}</span>
            {concluida && (
              <span className="flex items-center gap-1 text-brand font-medium">
                <Check size={12} /> Concluída
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleAulaSalva(aula.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all",
              salva ? "border-brand bg-brand/5 text-brand" : "border-line text-muted hover:border-brand"
            )}
          >
            <Bookmark size={14} fill={salva ? "currentColor" : "none"} />
            {salva ? "Salva" : "Salvar"}
          </button>
          <button
            onClick={() => concluirAula(aula.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all",
              concluida ? "bg-line text-muted" : "bg-brand text-card hover:bg-brand-light active:scale-95"
            )}
          >
            <Check size={14} />
            {concluida ? "Concluída" : "Marcar como concluída"}
          </button>
        </div>
      </div>

      {/* Resumo */}
      <div className="card-fassi p-5">
        <h2 className="font-serif text-base font-semibold text-ink mb-2">Resumo da aula</h2>
        <p className="text-sm text-ink/80 leading-relaxed">{aula.resumo}</p>
      </div>

      {/* Texto complementar */}
      {aula.textoComplementar && (
        <div className="card-fassi p-5">
          <h2 className="font-serif text-base font-semibold text-ink mb-2">Texto complementar</h2>
          <p className="text-sm text-ink/80 leading-relaxed">{aula.textoComplementar}</p>
        </div>
      )}

      {/* Galeria — VEJA DE PERTO */}
      {aula.galeria && aula.galeria.length > 0 && (
        <div className="card-fassi p-5">
          <h2 className="font-serif text-lg font-semibold text-ink mb-1 flex items-center gap-2">
            <ImageIcon size={18} className="text-brand" /> Veja de perto
          </h2>
          <p className="text-xs text-muted mb-4">Detalhes que fazem a diferença. Clique para ampliar.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {aula.galeria.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setGaleriaAberta(i)}
                className="group relative rounded-xl overflow-hidden border border-line bg-bg aspect-[4/3] flex items-center justify-center"
              >
                {img.url ? (
                  <img src={img.url} alt={img.legenda} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="flex flex-col items-center text-muted">
                    <ImageIcon size={24} className="mb-1 opacity-40" />
                    <span className="text-[0.65rem]">Imagem em breve</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-[0.65rem] text-white truncate">{img.legenda}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox da galeria */}
      {galeriaAberta !== null && aula.galeria && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setGaleriaAberta(null)}
        >
          <button className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X size={24} />
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-xl overflow-hidden bg-bg aspect-[4/3] flex items-center justify-center mb-3">
              {aula.galeria[galeriaAberta].url ? (
                <img src={aula.galeria[galeriaAberta].url} alt="" decoding="async" className="w-full h-full object-contain" />
              ) : (
                <ImageIcon size={48} className="text-muted opacity-40" />
              )}
            </div>
            <p className="text-sm text-white/90 text-center">{aula.galeria[galeriaAberta].legenda}</p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setGaleriaAberta(Math.max(0, galeriaAberta - 1))}
                disabled={galeriaAberta === 0}
                className="text-white/80 hover:text-white disabled:opacity-30 px-3 py-2"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="text-xs text-white/60">{galeriaAberta + 1} de {aula.galeria.length}</span>
              <button
                onClick={() => setGaleriaAberta(Math.min(aula.galeria!.length - 1, galeriaAberta + 1))}
                disabled={galeriaAberta === aula.galeria.length - 1}
                className="text-white/80 hover:text-white disabled:opacity-30 px-3 py-2"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ficha técnica */}
      {aula.fichaTecnica && aula.fichaTecnica.length > 0 && (
        <div className="card-fassi p-5">
          <h2 className="font-serif text-base font-semibold text-ink mb-3">Ficha técnica</h2>
          <div className="space-y-2">
            {aula.fichaTecnica.map((f, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                <span className="text-sm text-muted">{f.label}</span>
                <span className="text-sm font-medium text-ink">{f.valor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Materiais para download */}
      {aula.materiais && aula.materiais.length > 0 && (
        <div className="card-fassi p-5">
          <h2 className="font-serif text-base font-semibold text-ink mb-3 flex items-center gap-2">
            <Download size={16} className="text-brand" /> Materiais para download
          </h2>
          <div className="space-y-2">
            {aula.materiais.map((mat) => (
              <div key={mat.id} className="flex items-center gap-3 p-3 rounded-xl border border-line bg-bg">
                <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{mat.nome}</div>
                  <div className="text-xs text-muted">{mat.descricao}</div>
                </div>
                <button className="text-xs font-semibold text-brand flex items-center gap-1 flex-shrink-0">
                  <Download size={12} /> Baixar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anotações pessoais */}
      <div className="card-fassi p-5">
        <h2 className="font-serif text-base font-semibold text-ink mb-3 flex items-center gap-2">
          <StickyNote size={16} className="text-brand" /> Anotações pessoais
        </h2>
        <textarea
          value={anotacao}
          onChange={(e) => setAnotacao(aula.id, e.target.value)}
          placeholder="Escreva suas anotações sobre esta aula..."
          className="w-full bg-bg border border-line rounded-xl p-3 text-sm text-ink resize-none focus:outline-none focus:border-brand transition-colors"
          rows={4}
        />
        <p className="text-xs text-muted mt-2">Suas anotações ficam salvas automaticamente.</p>
      </div>

      {/* FAQ */}
      {aula.faq && aula.faq.length > 0 && (
        <div className="card-fassi p-5">
          <h2 className="font-serif text-base font-semibold text-ink mb-3 flex items-center gap-2">
            <HelpCircle size={16} className="text-brand" /> Perguntas frequentes
          </h2>
          <div className="space-y-2">
            {aula.faq.map((f, i) => (
              <div key={i} className="border border-line rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                  className="w-full p-3 flex items-center justify-between text-left"
                >
                  <span className="text-sm font-medium text-ink">{f.pergunta}</span>
                  <ChevronDown
                    size={16}
                    className={cn("text-muted transition-transform flex-shrink-0", faqAberto === i && "rotate-180")}
                  />
                </button>
                {faqAberto === i && (
                  <div className="px-3 pb-3 text-sm text-muted leading-relaxed border-t border-line pt-3">
                    {f.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdos relacionados */}
      {relacionados.length > 0 && (
        <div>
          <h2 className="font-serif text-lg font-semibold text-ink mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-brand" /> Conteúdos relacionados
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {relacionados.map((r) => r && (
              <Link key={r.aula.id} href={`/app/universidade/aula/${r.aula.id}`}>
                <div className="card-fassi p-4 flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <Play size={16} className="text-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-ink truncate">{r.aula.titulo}</div>
                    <div className="text-xs text-muted">{r.curso.titulo}</div>
                  </div>
                  <ChevronRight size={16} className="text-muted group-hover:text-brand transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navegação entre aulas */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-line">
        {anterior ? (
          <Link
            href={`/app/universidade/aula/${anterior.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} /> Aula anterior
          </Link>
        ) : (
          <span />
        )}
        {proxima ? (
          <button
            onClick={() => {
              concluirAula(aula.id);
              router.push(`/app/universidade/aula/${proxima.id}`);
            }}
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-card px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95"
          >
            Próxima aula <ArrowRight size={16} />
          </button>
        ) : (
          <Link
            href={`/app/universidade/curso/${curso.id}`}
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-card px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
          >
            Concluir curso <Check size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
