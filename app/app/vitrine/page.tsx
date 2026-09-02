"use client";

import { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Upload,
  Camera,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function MinhaVitrinePage() {
  const {
    nome,
    loja,
    photo,
    fotosVitrine,
    adicionarFotoVitrine,
    adicionarComentarioVitrine,
    vitrinesCurtidas,
    toggleVitrineCurtida,
    selosConquistados,
  } = useGameStore();
  const [showUpload, setShowUpload] = useState(false);
  const [legenda, setLegenda] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const temSeloVitrine = selosConquistados.includes("vitrine-marken");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewUrl(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!previewUrl) return;
    adicionarFotoVitrine(previewUrl, legenda || "Minha vitrine");
    setPreviewUrl("");
    setLegenda("");
    setShowUpload(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div
        className="rounded-2xl p-6 md:p-8 text-surface relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1F1C18 0%, #3D3833 60%, #1F1C18 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent blur-[100px]" />
        </div>
        <div className="relative z-10">
          <p className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-2">Sua vitrine</p>
          <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-2">Minha Vitrine</h1>
          <p className="text-sm text-white/80 max-w-xl leading-relaxed">
            Compartilhe a montagem da sua loja. Mostre como você cuida de cada detalhe e inspire outros lojistas.
          </p>
        </div>
      </div>

      {/* Aviso de selo */}
      {!temSeloVitrine && (
        <div className="card-fassi p-4 flex items-center gap-3 border-accent/30">
          <Store size={24} strokeWidth={1.75} className="text-accent flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink">Envie sua primeira foto e ganhe o selo Vitrine Marken Fassi!</p>
          </div>
        </div>
      )}
      {temSeloVitrine && (
        <div className="card-fassi p-4 flex items-center gap-3">
          <Store size={24} strokeWidth={1.75} className="text-accent flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-ink">Selo Vitrine Marken Fassi conquistado!</p>
            <p className="text-xs text-muted">Continue compartilhando suas montagens.</p>
          </div>
        </div>
      )}

      {/* Botão de upload */}
      <button
        onClick={() => setShowUpload(true)}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-surface px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
      >
        <Camera size={18} strokeWidth={1.75} /> Enviar foto da vitrine
      </button>

      {/* Referências de apresentação */}
      {fotosVitrine.length === 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-1">Referência editorial</p>
              <h2 className="font-serif text-lg md:text-xl font-semibold text-ink">Inspiração de apresentação</h2>
              <p className="text-xs text-muted mt-1 max-w-md leading-relaxed">
                Exemplos de composição para orientar a montagem da sua vitrine. Use como referência comercial ao fotografar sua loja.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/images/marken/vitrine/ref-composicao.webp", alt: "Referência de composição Marken Fassi", legenda: "Composição" },
              { src: "/images/marken/vitrine/ref-detalhe.webp", alt: "Referência de detalhe Marken Fassi", legenda: "Detalhe" },
              { src: "/images/marken/vitrine/ref-ambiente.webp", alt: "Referência de ambiente Marken Fassi", legenda: "Ambiente" },
            ].map((ref) => (
              <figure key={ref.src} className="card-fassi overflow-hidden">
                <div className="aspect-[4/5] bg-bg">
                  <img
                    src={ref.src}
                    alt={ref.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-muted text-center tracking-wide uppercase">
                  {ref.legenda}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Grid de fotos */}
      {fotosVitrine.length === 0 ? (
        <div className="card-fassi p-10 text-center">
          <ImageIcon size={40} strokeWidth={1.75} className="text-muted opacity-30 mx-auto mb-3" />
          <p className="text-sm text-muted">Nenhuma foto enviada ainda.</p>
          <p className="text-xs text-muted mt-1">Compartilhe a montagem da sua loja para inspirar a comunidade.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fotosVitrine.map((foto) => {
            const curtida = vitrinesCurtidas.includes(foto.id);
            return (
              <div key={foto.id} className="card-fassi overflow-hidden">
                <div className="aspect-[4/3] bg-bg relative">
                  {foto.url ? (
                    <img src={foto.url} alt={foto.legenda} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon size={32} strokeWidth={1.75} className="text-muted opacity-30" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm text-ink mb-2">{foto.legenda}</p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{foto.data}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleVitrineCurtida(foto.id)}
                        className="flex items-center gap-1"
                      >
                        <Heart
                          size={14}
                          strokeWidth={1.75}
                          className={curtida ? "text-primary fill-current" : "text-muted"}
                        />
                        <span>{foto.curtidas + (curtida ? 1 : 0)}</span>
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} strokeWidth={1.75} /> {foto.comentarios.length}
                      </span>
                    </div>
                  </div>
                  {/* Comentários */}
                  {foto.comentarios.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-line space-y-2">
                      {foto.comentarios.map((c) => (
                        <div key={c.id} className="text-xs">
                          <span className="font-medium text-ink/70">{c.autor}</span>
                          <span className="text-muted"> · {c.data}</span>
                          <p className="text-muted mt-0.5">{c.texto}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Input de comentário */}
                  <ComentarioInput fotoId={foto.id} onComentar={adicionarComentarioVitrine} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de upload */}
      {showUpload && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowUpload(false)}
        >
          <div
            className="bg-card rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold text-ink">Enviar foto da vitrine</h2>
              <button onClick={() => setShowUpload(false)} className="text-muted hover:text-ink">
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            {/* Preview */}
            {previewUrl ? (
              <div className="mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full rounded-xl object-cover max-h-64"
                />
                <button
                  onClick={() => setPreviewUrl("")}
                  className="text-xs text-muted mt-2"
                >
                  Remover imagem
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-line rounded-xl p-8 flex flex-col items-center gap-2 hover:border-primary transition-colors mb-4"
              >
                <Upload size={28} strokeWidth={1.75} className="text-muted" />
                <span className="text-sm text-muted">Clique para escolher uma foto</span>
                <span className="text-xs text-muted/70">JPG ou PNG</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Legenda */}
            {previewUrl && (
              <>
                <textarea
                  value={legenda}
                  onChange={(e) => setLegenda(e.target.value)}
                  placeholder="Descreva sua vitrine (ex.: 'Nova coleção Alameda em destaque')"
                  className="w-full bg-bg border border-line rounded-xl p-3 text-sm text-ink resize-none focus:outline-none focus:border-primary transition-colors mb-4"
                  rows={3}
                />
                <button
                  onClick={handleUpload}
                  className="w-full bg-primary hover:bg-primary-light text-surface py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                >
                  Publicar foto
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ComentarioInput({
  fotoId,
  onComentar,
}: {
  fotoId: string;
  onComentar: (fotoId: string, texto: string) => void;
}) {
  const [texto, setTexto] = useState("");
  const [aberto, setAberto] = useState(false);

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="mt-3 text-xs text-muted hover:text-primary transition-colors"
      >
        + Comentar
      </button>
    );
  }

  return (
    <div className="mt-3 flex gap-2">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva um comentário..."
        className="flex-1 bg-bg border border-line rounded-lg px-3 py-2 text-xs text-ink focus:outline-none focus:border-primary transition-colors"
      />
      <button
        onClick={() => {
          if (texto.trim()) {
            onComentar(fotoId, texto.trim());
            setTexto("");
            setAberto(false);
          }
        }}
        className="px-3 py-2 bg-primary text-surface rounded-lg text-xs font-semibold transition-all active:scale-95"
      >
        Enviar
      </button>
    </div>
  );
}
