"use client";

import { useState } from "react";
import { Search, Send, Bot, MessageSquare } from "lucide-react";

const sugestoes = [
  "Qual é a diferença entre algodão egípcio e Tencel™?",
  "Como explicar a contagem de fios?",
  "Qual tamanho de roupa de cama indicar?",
  "Como cuidar deste produto?",
  "Quais são os diferenciais desta coleção?",
];

const respostas: Record<string, string> = {
  "algodão egípcio": "O algodão egípcio é uma fibra natural extra-longa, conhecida pelo toque macio e durabilidade. O Tencel™ é uma fibra de origem vegetal (celulose de eucalipto), com toque sedoso, respirabilidade excelente e produção sustentável. Ambos oferecem qualidade superior, mas com sensações diferentes ao toque.",
  "contagem de fios": "A contagem de fios indica quantos fios de urdume e trama existem em uma polegada quadrada de tecido. quanto maior o número, mais denso e suave o tecido. Fios 300 a 600 já oferecem excelente qualidade. Acima de 600, trata-se de tecidos premium com fios mais finos.",
  "tamanho": "Para escolher o tamanho ideal, considere as medidas do colchão (largura, comprimento e altura). Para colchas e cobertores, adicione uma margem que cubra as laterais. Consulte sempre o guia de tamanhos Marken Fassi para garantir o encaixe perfeito.",
  "cuidar": "Lave sempre em água morna, evite alvejantes, seque à sombra e passe em temperatura média. Para produtos de algodão egípcio, prefira secagem natural. Consulte sempre a etiqueta de cada produto para instruções específicas.",
  "diferenciais": "Cada coleção Marken Fassi possui um conceito criativo próprio, com tecidos selecionados, cartela de cores exclusiva e acabamentos de ateliê. Consulte a página da coleção na Universidade para conhecer todos os diferenciais.",
};

function buscarResposta(pergunta: string): string {
  const lower = pergunta.toLowerCase();
  for (const [key, resp] of Object.entries(respostas)) {
    if (lower.includes(key)) return resp;
  }
  return "Esta é uma pergunta interessante. Nossa base de conhecimentos está em construção. Em breve, o Assistente Casa Fassi terá respostas completas para todas as suas dúvidas sobre produtos, tecidos, coleções e atendimento.";
}

export default function AssistentePage() {
  const [pergunta, setPergunta] = useState("");
  const [historico, setHistorico] = useState<{ pergunta: string; resposta: string }[]>([]);

  const handleEnviar = () => {
    if (!pergunta.trim()) return;
    const resp = buscarResposta(pergunta);
    setHistorico([...historico, { pergunta, resposta: resp }]);
    setPergunta("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink">Assistente Casa Fassi</h1>
        <p className="text-sm text-muted mt-1">Encontre informações sempre que precisar</p>
      </div>

      {/* Intro */}
      <div className="card-fassi p-5">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Bot size={20} className="text-primary" strokeWidth={1.75} />
          </div>
          <p className="text-sm text-ink/80 leading-relaxed">
            Encontre informações sobre produtos, tecidos, coleções, cuidados, medidas e argumentos
            de atendimento sempre que precisar. As respostas utilizam apenas informações oficiais da
            Marken Fassi.
          </p>
        </div>
      </div>

      {/* Sugestões */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Sugestões</p>
        <div className="flex flex-wrap gap-2">
          {sugestoes.map((s) => (
            <button
              key={s}
              onClick={() => setPergunta(s)}
              className="text-xs px-3 py-2 rounded-full border border-line bg-surface text-muted hover:border-primary hover:text-ink transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Campo de busca */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" strokeWidth={1.75} />
          <input
            type="text"
            aria-label="Digite sua pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
            placeholder="Digite sua pergunta..."
            className="w-full bg-surface border border-line rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          />
        </div>
        <button
          onClick={handleEnviar}
          disabled={!pergunta.trim()}
          aria-label="Enviar pergunta"
          className="bg-primary hover:bg-primary-hover text-surface px-5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Send size={16} strokeWidth={1.75} />
        </button>
      </div>

      {/* Histórico */}
      {historico.length > 0 ? (
        <div className="space-y-4">
          {historico.map((h, i) => (
            <div key={i} className="space-y-2">
              <div className="card-fassi p-4 bg-primary/5">
                <div className="flex items-start gap-2">
                  <MessageSquare size={16} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <p className="text-sm font-medium text-ink">{h.pergunta}</p>
                </div>
              </div>
              <div className="card-fassi p-4">
                <div className="flex items-start gap-3">
                  <Bot size={18} className="text-primary flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <p className="text-sm text-ink/85 leading-relaxed">{h.resposta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-fassi p-8 text-center">
          <Bot size={32} className="text-muted/40 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-sm text-muted">Faça uma pergunta ou escolha uma sugestão acima para começar.</p>
        </div>
      )}
    </div>
  );
}
