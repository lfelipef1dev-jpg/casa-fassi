"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  BookOpen,
  Clock,
  Award,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  Check,
  Users,
  Image as ImageIcon,
  FileText,
  Video,
  ChevronRight,
} from "lucide-react";
import { useGameStore } from "@/lib/store";
import {
  cursos,
  categoriasCursos,
  aulasRapidas,
  bibliotecaMateriais,
  agendaUniversidade,
  depoimentosLojistas,
  totalAulasCurso,
  todasAulasIds,
} from "@/lib/cursos";
import { cn } from "@/lib/utils";

const agendaIcon: Record<string, typeof Video> = {
  live: Video,
  encontro: Users,
  lancamento: Sparkles,
  conversa: BookOpen,
};

const materialIcon: Record<string, typeof FileText> = {
  pdf: FileText,
  catalogo: BookOpen,
  manual: FileText,
  imagem: ImageIcon,
};

export default function UniversidadePage() {
  const { aulasConcluidas, role, funcao } = useGameStore();
  const [filtro, setFiltro] = useState("Tudo");

  const cursosIniciados = cursos.filter((c) => {
    const ids = todasAulasIds(c);
    const feitas = ids.filter((id) => aulasConcluidas.includes(id));
    return feitas.length > 0 && feitas.length < ids.length;
  });

  const novosConteudos = cursos.filter((c) => c.novo);
  const essenciais = cursos.filter((c) => c.essencial);
  const destaques = cursos.filter((c) => c.destaque);

  const recomendados = cursos.filter((c) => {
    if (funcao === "Lojista") return c.categoria === "Vitrine e composição" || c.categoria === "Conteúdo digital";
    if (funcao === "Vendedor(a)") return c.categoria === "Atendimento" || c.categoria === "Produtos e tecidos";
    return !c.essencial;
  }).slice(0, 3);

  const cursosFiltrados = filtro === "Tudo" ? cursos : cursos.filter((c) => c.categoria === filtro);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div
        className="rounded-2xl p-6 md:p-8 text-card relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 60%, #1B3D2A 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#D4AF37] blur-[100px]" />
        </div>
        <div className="relative z-10">
          <p className="text-[#D4AF37] text-xs font-semibold tracking-[0.15em] uppercase mb-2">Universidade</p>
          <h1 className="font-serif text-3xl font-semibold mb-2">Universidade Marken Fassi</h1>
          <p className="text-sm text-white/80 max-w-xl leading-relaxed">
            Conhecimento para orientar. Repertório para encantar. Uma plataforma de formação para
            quem cuida da marca.
          </p>
        </div>
      </div>

      {/* 1. Continue de onde parou */}
      {cursosIniciados.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-4">Continue de onde parou</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cursosIniciados.map((c) => {
              const ids = todasAulasIds(c);
              const feitas = ids.filter((id) => aulasConcluidas.includes(id)).length;
              const pct = Math.round((feitas / ids.length) * 100);
              return (
                <Link key={c.id} href={`/app/universidade/curso/${c.id}`}>
                  <div className="card-fassi p-5 group cursor-pointer h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={20} className="text-brand" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-ink truncate">{c.titulo}</h3>
                        <p className="text-xs text-muted">{c.categoria}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted mb-1.5">
                      <span>{feitas} de {ids.length} aulas</span>
                      <span className="font-semibold text-brand">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-line rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Continuar <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. Novos conteúdos */}
      {novosConteudos.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#D4AF37]" /> Novos conteúdos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {novosConteudos.map((c) => (
              <CursoCard key={c.id} curso={c} aulasConcluidas={aulasConcluidas} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Cursos essenciais */}
      <section>
        <h2 className="font-serif text-xl font-semibold text-ink mb-4">Cursos essenciais</h2>
        <p className="text-sm text-muted mb-4">Conteúdos fundamentais para todos os parceiros da Marken Fassi.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {essenciais.map((c) => (
            <CursoCard key={c.id} curso={c} aulasConcluidas={aulasConcluidas} />
          ))}
        </div>
      </section>

      {/* 4. Coleções em destaque */}
      <section>
        <h2 className="font-serif text-xl font-semibold text-ink mb-4">Coleções em destaque</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destaques.map((c) => (
            <CursoCard key={c.id} curso={c} aulasConcluidas={aulasConcluidas} />
          ))}
        </div>
      </section>

      {/* 5. Aulas rápidas */}
      <section>
        <h2 className="font-serif text-xl font-semibold text-ink mb-4 flex items-center gap-2">
          <Video size={18} className="text-brand" /> Aulas rápidas
        </h2>
        <p className="text-sm text-muted mb-4">Vídeos de 2 a 5 minutos para dúvidas práticas da rotina.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {aulasRapidas.map((a) => (
            <Link key={a.id} href={`/app/universidade/aula/${a.id}`}>
              <div className="card-fassi p-4 flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <Play size={16} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{a.titulo}</div>
                  <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                    <Clock size={11} /> {a.duracao}
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted group-hover:text-brand transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5b. Cases de venda — depoimentos de lojistas */}
      <section>
        <h2 className="font-serif text-xl font-semibold text-ink mb-1 flex items-center gap-2">
          <Video size={18} className="text-brand" /> Cases de venda
        </h2>
        <p className="text-sm text-muted mb-4">Lojistas contando histórias reais de venda. Inspiração em formato curto.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {depoimentosLojistas.map((d) => (
            <div key={d.id} className="card-fassi p-5 flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 100%)" }}>
                <Play size={20} className="text-white/80 ml-1" fill="currentColor" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-ink mb-1">{d.case}</h3>
                <div className="text-xs text-muted">
                  <span className="font-medium text-ink/70">{d.lojista}</span> · {d.loja} · {d.cidade}
                </div>
                <div className="text-xs text-muted mt-1 flex items-center gap-1">
                  <Clock size={11} /> {d.duracao}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Conteúdos recomendados */}
      {recomendados.length > 0 && (
        <section>
          <h2 className="font-serif text-xl font-semibold text-ink mb-4">Recomendados para você</h2>
          <p className="text-sm text-muted mb-4">
            Baseado na sua função{funcao ? ` (${funcao})` : ""} e nos conteúdos que você já assistiu.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recomendados.map((c) => (
              <CursoCard key={c.id} curso={c} aulasConcluidas={aulasConcluidas} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Biblioteca de materiais */}
      <section>
        <h2 className="font-serif text-xl font-semibold text-ink mb-4 flex items-center gap-2">
          <Download size={18} className="text-brand" /> Biblioteca de materiais
        </h2>
        <p className="text-sm text-muted mb-4">Guias, catálogos, fichas técnicas, imagens e manuais para apoio.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {bibliotecaMateriais.map((m) => {
            const Icon = materialIcon[m.tipo] || FileText;
            return (
              <div key={m.id} className="card-fassi p-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-brand" />
                </div>
                <div className="text-sm font-medium text-ink mb-1">{m.nome}</div>
                <div className="text-xs text-muted">{m.categoria} · {m.data}</div>
                <button className="text-xs font-semibold text-brand mt-2 inline-flex items-center gap-1">
                  <Download size={12} /> Baixar
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Agenda da Universidade */}
      <section>
        <h2 className="font-serif text-xl font-semibold text-ink mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-brand" /> Agenda da Universidade
        </h2>
        <p className="text-sm text-muted mb-4">Lives, encontros, lançamentos e conversas com especialistas.</p>
        <div className="space-y-3">
          {agendaUniversidade.map((a) => {
            const Icon = agendaIcon[a.tipo] || BookOpen;
            return (
              <div key={a.id} className="card-fassi p-4 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-ink">{a.titulo}</h3>
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-full font-medium bg-brand/10 text-brand">
                      {a.tipo === "live" ? "Live" : a.tipo === "encontro" ? "Encontro" : a.tipo === "lancamento" ? "Lançamento" : "Conversa"}
                    </span>
                  </div>
                  <p className="text-xs text-muted mb-2">{a.descricao}</p>
                  <div className="text-xs text-muted flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {a.data}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {a.horario}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Filtros e todos os cursos */}
      <section>
        <h2 className="font-serif text-xl font-semibold text-ink mb-4">Todos os cursos</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {["Tudo", ...categoriasCursos].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all",
                filtro === f
                  ? "bg-ink text-accent border-ink"
                  : "bg-card text-muted border-line hover:border-brand"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cursosFiltrados.map((c) => (
            <CursoCard key={c.id} curso={c} aulasConcluidas={aulasConcluidas} />
          ))}
        </div>
      </section>

      {/* Painel da equipe (lojista) */}
      {role === "lojista" && (
        <section>
          <Link
            href="/app/universidade/equipe"
            className="card-fassi p-5 flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
              <Users size={20} className="text-brand" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-base font-semibold text-ink">Painel da Equipe</h3>
              <p className="text-sm text-muted">Acompanhe o progresso de treinamento dos funcionários da sua loja.</p>
            </div>
            <ArrowRight size={18} className="text-muted group-hover:text-brand transition-colors" />
          </Link>
        </section>
      )}
    </div>
  );
}

function CursoCard({ curso, aulasConcluidas }: { curso: typeof cursos[0]; aulasConcluidas: string[] }) {
  const ids = todasAulasIds(curso);
  const feitas = ids.filter((id) => aulasConcluidas.includes(id)).length;
  const pct = ids.length > 0 ? Math.round((feitas / ids.length) * 100) : 0;
  const totalAulas = totalAulasCurso(curso);
  const totalModulos = curso.modulos.length;
  const concluido = feitas === ids.length && feitas > 0;
  const iniciado = feitas > 0 && !concluido;

  return (
    <Link href={`/app/universidade/curso/${curso.id}`}>
      <div className="card-fassi overflow-hidden group cursor-pointer h-full flex flex-col">
        <div
          className="h-32 relative flex items-end p-4"
          style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 100%)" }}
        >
          {curso.imagem ? (
            <img src={curso.imagem} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="relative z-10 flex items-center gap-2">
            {curso.novo && (
              <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1B3D2A] font-bold">
                NOVO
              </span>
            )}
            {curso.essencial && (
              <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                ESSENCIAL
              </span>
            )}
            {concluido && (
              <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium flex items-center gap-1">
                <Check size={9} /> CONCLUÍDO
              </span>
            )}
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <span className="text-[0.65rem] text-muted font-medium uppercase tracking-wide mb-1">{curso.categoria}</span>
          <h3 className="font-serif text-base font-semibold text-ink mb-1.5 leading-snug">{curso.titulo}</h3>
          <p className="text-xs text-muted leading-relaxed mb-3 flex-1 line-clamp-2">{curso.descricao}</p>

          <div className="flex items-center gap-3 text-[0.7rem] text-muted mb-3">
            <span className="flex items-center gap-1"><BookOpen size={11} /> {totalModulos} mód.</span>
            <span className="flex items-center gap-1"><Play size={11} /> {totalAulas} aulas</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {curso.duracaoTotal}</span>
          </div>

          <div className="flex items-center justify-between text-[0.7rem] mb-3">
            <span className="text-muted">{curso.professor}</span>
            {curso.certificado && (
              <span className="flex items-center gap-1 text-[#B8860B] font-medium">
                <Award size={11} /> Certificado
              </span>
            )}
          </div>

          {iniciado && (
            <div className="mb-3">
              <div className="flex justify-between text-[0.65rem] text-muted mb-1">
                <span>Seu progresso</span>
                <span className="font-semibold text-brand">{pct}%</span>
              </div>
              <div className="h-1.5 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-line">
            <span className={cn(
              "text-xs font-semibold inline-flex items-center gap-1",
              concluido ? "text-muted" : "text-brand"
            )}>
              {concluido ? "Rever" : iniciado ? "Continuar" : "Começar"}
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
