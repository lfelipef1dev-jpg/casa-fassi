"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Printer,
  Download,
  Clock,
  BookOpen,
  Check,
  Share2,
} from "lucide-react";
import { useGameStore } from "@/lib/store";
import { cursos, totalAulasCurso, todasAulasIds, getCursoById, getAulasTrilhaProduto, getAulasTrilhaVendas, getCursosTrilhaProduto } from "@/lib/cursos";
import { selos, getSeloById } from "@/lib/selos";
import { cn } from "@/lib/utils";

type CertTipo = "produto" | "vendas" | "master";

export default function CertificadoPage() {
  const params = useParams();
  const router = useRouter();
  const tipo = (params.tipo as CertTipo) || "produto";
  const { nome, loja, photo, horasAssistidas, aulasConcluidas, selosConquistados } = useGameStore();
  const [compartilharAberto, setCompartilharAberto] = useState(false);

  const cursosProduto = getCursosTrilhaProduto();
  const cursoVendas = getCursoById("curso-vendas");

  const idsProduto = getAulasTrilhaProduto();
  const idsVendas = getAulasTrilhaVendas();

  const feitasProduto = idsProduto.filter((id) => aulasConcluidas.includes(id)).length;
  const feitasVendas = idsVendas.filter((id) => aulasConcluidas.includes(id)).length;
  const pctProduto = idsProduto.length > 0 ? Math.round((feitasProduto / idsProduto.length) * 100) : 0;
  const pctVendas = idsVendas.length > 0 ? Math.round((feitasVendas / idsVendas.length) * 100) : 0;

  const produtoCompleto = pctProduto === 100;
  const vendasCompleto = pctVendas === 100;
  const masterCompleto = produtoCompleto && vendasCompleto;

  const config: Record<CertTipo, {
    titulo: string;
    subtitulo: string;
    completo: boolean;
    pct: number;
    curso: ReturnType<typeof getCursoById>;
  }> = {
    produto: {
      titulo: "Especialista em Produto",
      subtitulo: "Trilha de Produto/Enxoval",
      completo: produtoCompleto,
      pct: pctProduto,
      curso: undefined,
    },
    vendas: {
      titulo: "Especialista em Vendas",
      subtitulo: "Trilha de Vendas",
      completo: vendasCompleto,
      pct: pctVendas,
      curso: cursoVendas,
    },
    master: {
      titulo: "Especialista Master Marken Fassi",
      subtitulo: "Trilha de Produto + Vendas",
      completo: masterCompleto,
      pct: Math.round((pctProduto + pctVendas) / 2),
      curso: undefined,
    },
  };

  const cert = config[tipo];
  const dataEmissao = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const selosGanhos = selosConquistados.map(getSeloById).filter(Boolean);

  const textosCompartilhar = {
    instagram: {
      story: `Sou ${cert.titulo} da Universidade Marken Fassi! 🎉`,
      feed: `Mais um passo na minha formação como parceiro(a) Marken Fassi. Concluí a trilha de ${cert.subtitulo} 🧵✨`,
    },
    linkedin: {
      feed: `Concluí a trilha "${cert.subtitulo}" na Universidade Marken Fassi, obtendo o certificado de ${cert.titulo}. Mais um passo na minha formação como parceiro da marca. #MarkenFassi #Formação`,
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Link
        href="/app/perfil"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
      >
        <ArrowLeft size={16} /> Perfil
      </Link>

      {/* Status do certificado */}
      {!cert.completo && (
        <div className="card-fassi p-5 border-amber-200 bg-amber-50">
          <div className="flex items-center gap-3">
            <Award size={20} className="text-amber-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-ink">Certificado ainda não disponível</h3>
              <p className="text-xs text-muted mt-0.5">
                Conclua todas as aulas da trilha para liberar o certificado. Progresso atual: {cert.pct}%
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-amber-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${cert.pct}%` }} />
          </div>
          {tipo === "vendas" && cert.curso && (
            <Link
              href={`/app/universidade/curso/${cert.curso.id}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand"
            >
              Continuar trilha →
            </Link>
          )}
          {tipo === "produto" && (
            <Link
              href="/app/universidade"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand"
            >
              Continuar trilha de produto →
            </Link>
          )}
        </div>
      )}

      {/* Certificado */}
      <div
        className="rounded-2xl overflow-hidden relative print:rounded-none print:shadow-none"
        style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #F5F0E8 100%)" }}
        id="certificado"
      >
        {/* Borda decorativa */}
        <div className="absolute inset-2 border-2 border-[#D4AF37]/30 rounded-xl pointer-events-none" />
        <div className="absolute inset-3 border border-[#D4AF37]/20 rounded-xl pointer-events-none" />

        <div className="relative z-10 p-6 md:p-10 text-center">
          {/* Logo / Marca */}
          <div className="mb-6">
            <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#D4AF37]">Universidade Marken Fassi</p>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-2" />
          </div>

          {/* Título */}
          <p className="text-xs text-muted uppercase tracking-widest mb-2">Certificado de Conclusão</p>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-4">{cert.titulo}</h1>

          {/* Nome */}
          <p className="text-sm text-muted mb-1">Apresentado a</p>
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-ink mb-4">
            {nome || "Seu nome"}
          </h2>

          {/* Foto */}
          {photo && (
            <div className="mb-4">
              <img
                src={photo}
                alt=""
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#D4AF37]/30"
              />
            </div>
          )}

          {/* Descrição */}
          <p className="text-sm text-ink/70 max-w-md mx-auto leading-relaxed mb-6">
            Concluiu a {cert.subtitulo} da Universidade Marken Fassi, com carga horária de{" "}
            <strong className="text-ink">{horasAssistidas.toFixed(1)} horas</strong> de conteúdo,
            totalizando <strong className="text-ink">{aulasConcluidas.length} aulas</strong> assistidas.
          </p>

          {/* Selos conquistados */}
          {selosGanhos.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-muted mb-3">Selos conquistados</p>
              <div className="flex flex-wrap justify-center gap-3">
                {selosGanhos.map((s) => s && (
                  <div key={s.id} className="flex flex-col items-center">
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="text-[0.6rem] text-muted mt-1 max-w-[80px] text-center leading-tight">
                      {s.nome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data e validade */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-muted mb-6">
            <span>Emitido em {dataEmissao}</span>
            <span className="hidden md:inline">·</span>
            <span>Válido por 12 meses</span>
          </div>

          {/* Assinatura */}
          <div className="flex items-center justify-center gap-8 md:gap-16 mt-8">
            <div className="text-center">
              <div className="w-32 md:w-40 border-b border-ink/20 pb-1 mb-1" />
              <p className="text-[0.65rem] text-muted">Universidade Marken Fassi</p>
            </div>
            <div className="text-center">
              <div className="w-32 md:w-40 border-b border-ink/20 pb-1 mb-1" />
              <p className="text-[0.65rem] text-muted">Marca Marken Fassi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações */}
      {cert.completo && (
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-card px-5 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
          >
            <Printer size={18} /> Imprimir certificado
          </button>
          <button
            onClick={() => setCompartilharAberto(!compartilharAberto)}
            className="inline-flex items-center gap-2 border border-line text-ink hover:border-brand px-5 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            <Share2 size={18} /> Compartilhar conquista
          </button>
        </div>
      )}

      {/* Painel de compartilhamento */}
      {compartilharAberto && cert.completo && (
        <div className="card-fassi p-5 print:hidden">
          <h3 className="font-serif text-base font-semibold text-ink mb-4">Compartilhar conquista</h3>
          <p className="text-xs text-muted mb-4">Escolha o formato e a variação de arte. Cada opção gera uma imagem pronta para postar.</p>
          <div className="space-y-6">
            {/* Instagram Story — 3 variações */}
            <div className="border border-line rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-ink">Instagram Story (9:16)</span>
                <span className="text-[0.6rem] text-muted">3 variações</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {/* Variação 1 — Verde escuro */}
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 100%)", aspectRatio: "9/16" }}
                >
                  <p className="text-[#D4AF37] text-[0.5rem] uppercase tracking-widest mb-2">Universidade Marken Fassi</p>
                  <p className="text-white text-[0.65rem] font-serif font-semibold mb-1">{cert.titulo}</p>
                  <p className="text-white/70 text-[0.5rem]">{nome}</p>
                  <p className="text-white/50 text-[0.45rem] mt-2">@markenfassi</p>
                </div>
                {/* Variação 2 — Dourado */}
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)", aspectRatio: "9/16" }}
                >
                  <p className="text-[#1B3D2A] text-[0.5rem] uppercase tracking-widest mb-2">Universidade Marken Fassi</p>
                  <p className="text-white text-[0.65rem] font-serif font-semibold mb-1">{cert.titulo}</p>
                  <p className="text-white/80 text-[0.5rem]">{nome}</p>
                  <p className="text-white/60 text-[0.45rem] mt-2">@markenfassi</p>
                </div>
                {/* Variação 3 — Marfim */}
                <div
                  className="rounded-xl p-4 text-center border border-line"
                  style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #F5F0E8 100%)", aspectRatio: "9/16" }}
                >
                  <p className="text-[#D4AF37] text-[0.5rem] uppercase tracking-widest mb-2">Universidade Marken Fassi</p>
                  <p className="text-[#1B3D2A] text-[0.65rem] font-serif font-semibold mb-1">{cert.titulo}</p>
                  <p className="text-ink/70 text-[0.5rem]">{nome}</p>
                  <p className="text-muted text-[0.45rem] mt-2">@markenfassi</p>
                </div>
              </div>
              <p className="text-xs text-muted">{textosCompartilhar.instagram.story}</p>
              <button className="text-xs font-semibold text-brand mt-2">Baixar imagem</button>
            </div>

            {/* Instagram Feed — 3 variações */}
            <div className="border border-line rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-ink">Instagram / LinkedIn (quadrado)</span>
                <span className="text-[0.6rem] text-muted">3 variações</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {/* Variação 1 — Verde escuro */}
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 100%)", aspectRatio: "1/1" }}
                >
                  <p className="text-[#D4AF37] text-[0.55rem] uppercase tracking-widest mb-3">Universidade Marken Fassi</p>
                  <p className="text-white text-[0.7rem] font-serif font-semibold mb-1">{cert.titulo}</p>
                  <p className="text-white/70 text-[0.55rem]">{nome} · {loja}</p>
                </div>
                {/* Variação 2 — Dourado */}
                <div
                  className="rounded-xl p-4 text-center"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)", aspectRatio: "1/1" }}
                >
                  <p className="text-[#1B3D2A] text-[0.55rem] uppercase tracking-widest mb-3">Universidade Marken Fassi</p>
                  <p className="text-white text-[0.7rem] font-serif font-semibold mb-1">{cert.titulo}</p>
                  <p className="text-white/80 text-[0.55rem]">{nome} · {loja}</p>
                </div>
                {/* Variação 3 — Marfim */}
                <div
                  className="rounded-xl p-4 text-center border border-line"
                  style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #F5F0E8 100%)", aspectRatio: "1/1" }}
                >
                  <p className="text-[#D4AF37] text-[0.55rem] uppercase tracking-widest mb-3">Universidade Marken Fassi</p>
                  <p className="text-[#1B3D2A] text-[0.7rem] font-serif font-semibold mb-1">{cert.titulo}</p>
                  <p className="text-ink/70 text-[0.55rem]">{nome} · {loja}</p>
                </div>
              </div>
              <p className="text-xs text-muted">{textosCompartilhar.instagram.feed}</p>
              <button className="text-xs font-semibold text-brand mt-2">Baixar imagem</button>
            </div>

            {/* LinkedIn texto */}
            <div className="border border-line rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-ink">LinkedIn (texto profissional)</span>
              </div>
              <p className="text-xs text-muted leading-relaxed bg-bg rounded-lg p-3">{textosCompartilhar.linkedin.feed}</p>
              <button className="text-xs font-semibold text-brand mt-2">Copiar texto</button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de certificados disponíveis */}
      <div className="print:hidden">
        <h2 className="font-serif text-lg font-semibold text-ink mb-4">Seus certificados</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {(["produto", "vendas", "master"] as CertTipo[]).map((t) => {
            const c = config[t];
            return (
              <Link
                key={t}
                href={`/app/certificados/${t}`}
                className={cn(
                  "card-fassi p-5 group cursor-pointer",
                  !c.completo && "opacity-60"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    c.completo ? "bg-[#D4AF37]/15 text-[#B8860B]" : "bg-line text-muted"
                  )}>
                    {c.completo ? <Award size={18} /> : <Award size={18} className="opacity-40" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-ink truncate">{c.titulo}</h3>
                    <p className="text-xs text-muted">{c.subtitulo}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={c.completo ? "text-brand font-medium" : "text-muted"}>
                    {c.completo ? "Disponível" : `${c.pct}% concluído`}
                  </span>
                  {c.completo && <Check size={14} className="text-brand" />}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
