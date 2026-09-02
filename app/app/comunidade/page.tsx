"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Send, Sparkles, Image as ImageIcon } from "lucide-react";
import { postsComunidade } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const tipoConfig: Record<string, { label: string; color: string; bg: string }> = {
  vitrine: { label: "Vitrine", color: "#7C6041", bg: "#7C604115" },
  dica: { label: "Boa prática", color: "#6B7A5E", bg: "#6B7A5E15" },
  venda: { label: "História", color: "#A47864", bg: "#A4786415" },
  duvida: { label: "Dúvida", color: "#B89A6A", bg: "#B89A6A15" },
};

export default function ComunidadePage() {
  const { postsCurtidos, toggleCurtir, nome } = useGameStore();
  const [filtro, setFiltro] = useState<string>("todos");
  const [novoPost, setNovoPost] = useState("");
  const [showComposer, setShowComposer] = useState(false);

  const posts = filtro === "todos" ? postsComunidade : postsComunidade.filter((p) => p.tipo === filtro);
  const filtros = ["todos", "vitrine", "dica", "venda", "duvida"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Comunidade Casa Fassi</h1>
        <p className="text-sm text-muted mt-1">Uma casa feita de encontros</p>
      </div>

      {/* Intro */}
      <div className="card-fassi p-5">
        <p className="text-sm text-ink/80 leading-relaxed">
          A Casa Fassi também é um espaço para compartilhar experiências, conhecer boas práticas e
          encontrar novas formas de levar o bem-viver para cada loja.
        </p>
      </div>

      {/* Composer */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Compartilhe com a comunidade</p>
        <button onClick={() => setShowComposer(!showComposer)} className="btn-gold text-sm">
          <Sparkles size={16} className="inline mr-1" /> Postar
        </button>
      </div>

      {showComposer && (
        <div className="card-fassi p-4 animate-fade-in">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
              {nome ? nome.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="flex-1">
              <textarea
                value={novoPost}
                onChange={(e) => setNovoPost(e.target.value)}
                placeholder="Compartilhe uma vitrine, uma boa prática ou uma história de atendimento..."
                className="w-full bg-bg border border-line rounded-xl p-3 text-sm text-ink resize-none focus:outline-none focus:border-primary transition-colors"
                rows={3}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  {["vitrine", "dica", "venda", "duvida"].map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full border border-line text-muted"
                      style={filtro === t ? { background: tipoConfig[t].bg, borderColor: tipoConfig[t].color } : {}}
                    >
                      {tipoConfig[t].label}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setNovoPost("");
                    setShowComposer(false);
                  }}
                  className="btn-gold text-sm disabled:opacity-40"
                  disabled={!novoPost.trim()}
                >
                  <Send size={14} className="inline mr-1" /> Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all",
              filtro === f
                ? "bg-ink text-accent border-ink"
                : "bg-card text-muted border-line hover:border-primary"
            )}
          >
            {f === "todos" ? "Tudo" : tipoConfig[f]?.label || f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => {
          const curtido = postsCurtidos.includes(post.id);
          const config = tipoConfig[post.tipo] || { label: post.tipo, color: "#888", bg: "#88888815" };
          return (
            <div key={post.id} className="card-fassi p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-ink">{post.autor}</span>
                    <span
                      className="text-[0.65rem] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: config.bg, color: config.color }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <div className="text-xs text-muted">{post.loja} · {post.tempo}</div>
                </div>
              </div>

              <p className="text-sm text-ink/90 leading-relaxed mb-4">{post.texto}</p>

              <div className="flex items-center gap-5 text-sm">
                <button
                  onClick={() => toggleCurtir(post.id)}
                  className={cn(
                    "flex items-center gap-1.5 transition-colors",
                    curtido ? "text-primary" : "text-muted hover:text-primary"
                  )}
                >
                  <Heart size={16} fill={curtido ? "currentColor" : "none"} />
                  <span className="text-xs font-medium">{post.curtidas + (curtido ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted hover:text-ink transition-colors">
                  <MessageCircle size={16} />
                  <span className="text-xs font-medium">{post.comentarios}</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted hover:text-ink transition-colors ml-auto">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
