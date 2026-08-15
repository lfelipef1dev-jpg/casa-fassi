"use client";

import Link from "next/link";
import {
  BookOpen,
  Library,
  Award,
  Bookmark,
  ArrowRight,
  Sparkles,
  Camera,
  Clock,
  Trophy,
  Image as ImageIcon,
} from "lucide-react";
import { useGameStore } from "@/lib/store";
import { modulos, totalLicoes } from "@/lib/universidade";
import { getSeloById } from "@/lib/selos";

export default function JornadaPage() {
  const { nome, loja, funcao, photo, licoesConcluidas, aulasConcluidas, aulasSalvas, videosSalvos, horasAssistidas, selosConquistados } = useGameStore();
  const total = totalLicoes();
  const feitas = licoesConcluidas.filter((id) =>
    modulos.some((m) => m.licoes.some((l) => l.id === id))
  ).length;
  const pct = total > 0 ? Math.round((feitas / total) * 100) : 0;

  const modulosComProgresso = modulos.map((m) => {
    const feitasMod = m.licoes.filter((l) => licoesConcluidas.includes(l.id)).length;
    const pctMod = m.licoes.length > 0 ? Math.round((feitasMod / m.licoes.length) * 100) : 0;
    return { ...m, feitasMod, pctMod };
  });

  const emAndamento = modulosComProgresso.filter((m) => m.feitasMod > 0 && m.feitasMod < m.licoes.length);
  const concluidos = modulosComProgresso.filter((m) => m.feitasMod === m.licoes.length);
  const proximoModulo = modulosComProgresso.find((m) => m.feitasMod === 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 lg:p-8"
        style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 50%, #1B3D2A 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            <p className="text-accent/80 text-sm font-medium tracking-wide uppercase mb-1">
              Minha jornada na Casa Marken Fassi
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-card">
              {nome || "Bem-vindo"}
            </h1>
            <p className="text-card/60 text-sm mt-2">
              {funcao && loja ? `${funcao} · ${loja}` : funcao || loja || "Acompanhe seus conteúdos e formações"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-card/10 border border-card/20 flex items-center justify-center overflow-hidden">
              {photo ? (
                <img src={photo} alt="" width={64} height={64} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              ) : (
                <Camera size={22} className="text-card/40" />
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-card">{pct}%</div>
              <div className="text-xs text-card/50">seu progresso</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card-fassi p-5">
          <BookOpen size={20} className="text-brand mb-2" />
          <div className="text-2xl font-bold text-ink">{emAndamento.length + concluidos.length}</div>
          <div className="text-xs text-muted">Cursos iniciados</div>
        </div>
        <div className="card-fassi p-5">
          <Award size={20} className="text-[#B8860B] mb-2" />
          <div className="text-2xl font-bold text-ink">{concluidos.length}</div>
          <div className="text-xs text-muted">Cursos concluídos</div>
        </div>
        <div className="card-fassi p-5">
          <Bookmark size={20} className="text-brand mb-2" />
          <div className="text-2xl font-bold text-ink">{aulasSalvas.length + videosSalvos.length}</div>
          <div className="text-xs text-muted">Vídeos salvos</div>
        </div>
        <div className="card-fassi p-5">
          <Clock size={20} className="text-brand mb-2" />
          <div className="text-2xl font-bold text-ink">{horasAssistidas.toFixed(1)}h</div>
          <div className="text-xs text-muted">Horas assistidas</div>
        </div>
      </div>

      {/* Continue de onde parou */}
      {emAndamento.length > 0 && (
        <div>
          <h2 className="font-serif text-lg font-semibold text-ink mb-3">Continue de onde parou</h2>
          <div className="space-y-3">
            {emAndamento.map((m) => (
              <Link key={m.id} href={`/app/universidade/${m.id}`}>
                <div className="card-fassi p-5 flex items-center gap-4 group cursor-pointer">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${m.cor}15` }}
                  >
                    <BookOpen size={22} style={{ color: m.cor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink text-sm">{m.titulo}</div>
                    <div className="text-xs text-muted mt-0.5">
                      {m.feitasMod} de {m.licoes.length} lições
                    </div>
                    <div className="h-1.5 bg-line rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${m.pctMod}%`, background: m.cor }}
                      />
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Próximos aprendizados */}
      {proximoModulo && (
        <div>
          <h2 className="font-serif text-lg font-semibold text-ink mb-3">Próximo aprendizado</h2>
          <Link href={`/app/universidade/${proximoModulo.id}`}>
            <div className="card-fassi p-5 flex items-center gap-4 group cursor-pointer">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${proximoModulo.cor}15` }}
              >
                <Sparkles size={22} style={{ color: proximoModulo.cor }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink text-sm">{proximoModulo.titulo}</div>
                <div className="text-xs text-muted mt-0.5">{proximoModulo.descricao}</div>
              </div>
              <ArrowRight size={20} className="text-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      )}

      {/* Selos recentes */}
      {selosConquistados.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-lg font-semibold text-ink">Suas conquistas</h2>
            <Link href="/app/perfil" className="text-xs font-semibold text-brand">Ver todos →</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {selosConquistados.slice(0, 6).map((sid) => {
              const s = getSeloById(sid);
              if (!s) return null;
              return (
                <div key={sid} className="card-fassi p-3 flex flex-col items-center min-w-[90px] text-center">
                  <span className="text-2xl mb-1">{s.emoji}</span>
                  <span className="text-[0.65rem] font-medium text-ink leading-tight">{s.nome}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Atalhos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link href="/app/universidade" className="card-fassi p-5 text-center group hover:border-brand/30">
          <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <BookOpen size={22} className="text-brand" />
          </div>
          <div className="text-sm font-semibold text-ink">Universidade</div>
          <div className="text-xs text-muted mt-0.5">{modulos.length} módulos</div>
        </Link>
        <Link href="/app/vitrine" className="card-fassi p-5 text-center group hover:border-brand/30">
          <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <ImageIcon size={22} className="text-brand" />
          </div>
          <div className="text-sm font-semibold text-ink">Minha Vitrine</div>
          <div className="text-xs text-muted mt-0.5">Enviar fotos</div>
        </Link>
        <Link href="/app/certificados/produto" className="card-fassi p-5 text-center group hover:border-brand/30">
          <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Trophy size={22} className="text-brand" />
          </div>
          <div className="text-sm font-semibold text-ink">Certificados</div>
          <div className="text-xs text-muted mt-0.5">Sua formação</div>
        </Link>
        <Link href="/app/beneficios" className="card-fassi p-5 text-center group hover:border-brand/30">
          <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Award size={22} className="text-brand" />
          </div>
          <div className="text-sm font-semibold text-ink">Benefícios</div>
          <div className="text-xs text-muted mt-0.5">Experiências</div>
        </Link>
      </div>
    </div>
  );
}
