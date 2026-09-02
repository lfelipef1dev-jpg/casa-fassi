"use client";

import { useState } from "react";
import { Search, Play, FileText, Download, Clock, BookOpen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const filtros = [
  "Tudo",
  "Produtos",
  "Tecidos",
  "Coleções",
  "Atendimento",
  "Vitrine",
  "Redes sociais",
  "Campanhas",
  "Lançamentos",
  "Materiais para download",
  "Vídeos",
  "Aulas rápidas",
];

const conteudos = [
  { id: "c1", titulo: "Contagem de fios: o que significa", categoria: "Tecidos", formato: "video", duracao: "4 min", data: "12 Jul 2026" },
  { id: "c2", titulo: "Algodão egípcio vs. Tencel™", categoria: "Tecidos", formato: "video", duracao: "6 min", data: "10 Jul 2026" },
  { id: "c3", titulo: "Guia de tamanhos e medidas", categoria: "Produtos", formato: "pdf", duracao: "", data: "08 Jul 2026" },
  { id: "c4", titulo: "Como apresentar textura e toque", categoria: "Atendimento", formato: "video", duracao: "5 min", data: "05 Jul 2026" },
  { id: "c5", titulo: "Coleção Alameda: conceito e produtos", categoria: "Coleções", formato: "video", duracao: "12 min", data: "03 Jul 2026" },
  { id: "c6", titulo: "Como montar uma cama que inspira", categoria: "Vitrine", formato: "video", duracao: "8 min", data: "01 Jul 2026" },
  { id: "c7", titulo: "Atendimento no WhatsApp", categoria: "Atendimento", formato: "aula", duracao: "10 min", data: "28 Jun 2026" },
  { id: "c8", titulo: "Como gravar vídeos simples na loja", categoria: "Redes sociais", formato: "video", duracao: "7 min", data: "25 Jun 2026" },
  { id: "c9", titulo: "Cuidados e conservação dos produtos", categoria: "Produtos", formato: "pdf", duracao: "", data: "22 Jun 2026" },
  { id: "c10", titulo: "Argumentos de atendimento: valor além do preço", categoria: "Atendimento", formato: "aula", duracao: "9 min", data: "20 Jun 2026" },
  { id: "c11", titulo: "Calendário comercial Julho 2026", categoria: "Campanhas", formato: "pdf", duracao: "", data: "15 Jun 2026" },
  { id: "c12", titulo: "Como fotografar produtos e ambientes", categoria: "Vitrine", formato: "video", duracao: "11 min", data: "12 Jun 2026" },
];

const conteudosRapidos = [
  { id: "r1", titulo: "Qual tamanho de roupa de cama indicar?", duracao: "2 min" },
  { id: "r2", titulo: "Como explicar a contagem de fios em 30 segundos", duracao: "3 min" },
  { id: "r3", titulo: "Diferença entre as linhas Marken Fassi", duracao: "4 min" },
  { id: "r4", titulo: "Como cuidar de produtos de algodão egípcio", duracao: "3 min" },
];

const formatoConfig: Record<string, { icon: typeof Play; label: string; action: string }> = {
  video: { icon: Play, label: "Vídeo", action: "Assistir" },
  pdf: { icon: FileText, label: "Material", action: "Baixar" },
  aula: { icon: BookOpen, label: "Aula", action: "Assistir" },
};

export default function ConteudosPage() {
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("Tudo");

  const filtrados = conteudos.filter((c) => {
    const matchBusca = c.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro = filtroAtivo === "Tudo" || c.categoria === filtroAtivo || (filtroAtivo === "Vídeos" && c.formato === "video") || (filtroAtivo === "Materiais para download" && c.formato === "pdf") || (filtroAtivo === "Aulas rápidas" && c.formato === "aula");
    return matchBusca && matchFiltro;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Biblioteca de Conteúdos</h1>
        <p className="text-sm text-muted mt-1">Materiais de consulta, guias, vídeos e aulas para a sua rotina</p>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar conteúdo..."
          className="w-full bg-surface border border-line rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
        />
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltroAtivo(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all",
              filtroAtivo === f
                ? "bg-ink text-accent border-ink"
                : "bg-surface text-muted border-line hover:border-primary"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Conteúdos rápidos */}
      <div>
        <h2 className="font-serif text-lg font-semibold text-ink mb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-primary" strokeWidth={1.75} />
          Conteúdos rápidos para a rotina
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {conteudosRapidos.map((r, i) => {
            const thumb = `/images/marken/conteudos/thumb-0${(i % 3) + 1}.svg`;
            return (
            <div key={r.id} className="card-fassi p-4 flex items-center gap-3 group cursor-pointer">
              <img
                src={thumb}
                alt={r.titulo}
                loading="lazy"
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-ink truncate">{r.titulo}</div>
                <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                  <Clock size={11} /> {r.duracao}
                </div>
              </div>
              <Play size={16} className="text-muted group-hover:text-primary transition-colors" strokeWidth={1.75} />
            </div>
            );
          })}
        </div>
      </div>

      {/* Lista de conteúdos */}
      <div>
        <h2 className="font-serif text-lg font-semibold text-ink mb-3">Todos os conteúdos</h2>
        <div className="space-y-2">
          {filtrados.map((c, i) => {
            const config = formatoConfig[c.formato];
            const Icon = config.icon;
            const thumb = `/images/marken/conteudos/thumb-0${(i % 3) + 1}.svg`;
            return (
              <div key={c.id} className="card-fassi p-4 flex items-center gap-4 group cursor-pointer">
                <img
                  src={thumb}
                  alt={c.titulo}
                  loading="lazy"
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink truncate">{c.titulo}</div>
                  <div className="text-xs text-muted mt-0.5 flex items-center gap-2">
                    <span>{c.categoria}</span>
                    <span>·</span>
                    <span>{config.label}</span>
                    {c.duracao && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-0.5"><Clock size={10} /> {c.duracao}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{c.data}</span>
                  </div>
                </div>
                <button className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 flex-shrink-0">
                  {config.action === "Baixar" ? <Download size={14} /> : <Play size={14} />}
                  {config.action}
                </button>
              </div>
            );
          })}
          {filtrados.length === 0 && (
            <div className="card-fassi p-8 text-center">
              <p className="text-sm text-muted">Nenhum conteúdo encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
