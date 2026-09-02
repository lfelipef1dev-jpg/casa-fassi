"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Camera,
  Store,
  User,
  BookOpen,
  Award,
  Bookmark,
  MapPin,
  Clock,
  Share2,
  Image as ImageIcon,
  Lock,
} from "lucide-react";
import { useGameStore } from "@/lib/store";
import { modulos, totalLicoes } from "@/lib/universidade";
import { selos, getSeloById } from "@/lib/selos";
import { cursos, todasAulasIds, totalAulasCurso, getAulasTrilhaProduto, getAulasTrilhaVendas } from "@/lib/cursos";
import { cn } from "@/lib/utils";

export default function PerfilPage() {
  const {
    nome,
    loja,
    cidade,
    funcao,
    photo,
    licoesConcluidas,
    aulasConcluidas,
    aulasSalvas,
    videosSalvos,
    horasAssistidas,
    selosConquistados,
    fotosVitrine,
    setPhoto,
    setCidade,
  } = useGameStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const cidadeRef = useRef<HTMLInputElement>(null);

  const total = totalLicoes();
  const feitas = licoesConcluidas.filter((id) =>
    modulos.some((m) => m.licoes.some((l) => l.id === id))
  ).length;
  const pct = total > 0 ? Math.round((feitas / total) * 100) : 0;

  const modulosConcluidos = modulos.filter(
    (m) => m.licoes.every((l) => licoesConcluidas.includes(l.id))
  ).length;
  const modulosIniciados = modulos.filter(
    (m) => m.licoes.some((l) => licoesConcluidas.includes(l.id)) && !m.licoes.every((l) => licoesConcluidas.includes(l.id))
  ).length;

  // Certificados
  const idsProduto = getAulasTrilhaProduto();
  const idsVendas = getAulasTrilhaVendas();
  const pctProduto = idsProduto.length > 0
    ? Math.round((idsProduto.filter((id) => aulasConcluidas.includes(id)).length / idsProduto.length) * 100)
    : 0;
  const pctVendas = idsVendas.length > 0
    ? Math.round((idsVendas.filter((id) => aulasConcluidas.includes(id)).length / idsVendas.length) * 100)
    : 0;

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const stats = [
    { icon: BookOpen, label: "Cursos iniciados", value: modulosIniciados + modulosConcluidos },
    { icon: Award, label: "Cursos concluídos", value: modulosConcluidos },
    { icon: Bookmark, label: "Vídeos salvos", value: aulasSalvas.length + videosSalvos.length },
    { icon: Clock, label: "Horas assistidas", value: horasAssistidas.toFixed(1) },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho */}
      <div className="card-fassi p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <button
            onClick={() => fileRef.current?.click()}
            aria-label="Trocar foto"
            className="w-20 h-20 rounded-full bg-bg border-2 border-line hover:border-primary flex items-center justify-center overflow-hidden flex-shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {photo ? (
              <img src={photo} alt="" width={80} height={80} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            ) : (
              <Camera size={22} strokeWidth={1.75} className="text-muted" />
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />

          <div className="flex-1 min-w-0 w-full">
            <h1 className="font-serif text-2xl font-semibold text-ink">{nome || "Participante"}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted mt-1">
              {funcao && <span className="flex items-center gap-1"><User size={14} strokeWidth={1.75} /> {funcao}</span>}
              {loja && <span className="flex items-center gap-1"><Store size={14} strokeWidth={1.75} /> {loja}</span>}
            </div>
            {/* Cidade editável */}
            <div className="flex items-center gap-2 mt-2">
              <MapPin size={14} strokeWidth={1.75} className="text-muted" />
              <input
                ref={cidadeRef}
                defaultValue={cidade}
                onBlur={(e) => setCidade(e.target.value)}
                placeholder="Sua cidade"
                className="text-sm text-muted bg-transparent border-b border-line focus:border-primary focus:outline-none transition-colors max-w-[200px]"
              />
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted">Seu progresso geral</span>
                <span className="text-accent-dark font-semibold">{pct}%</span>
              </div>
              <div className="h-2 bg-line rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card-fassi p-4 text-center">
              <Icon size={20} strokeWidth={1.75} className="text-primary mx-auto mb-2" />
              <div className="font-serif font-semibold text-ink text-lg tabular-nums">{s.value}</div>
              <div className="text-xs text-muted">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Prateleira de conquistas (Selos) */}
      <div className="card-fassi p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold text-ink">Prateleira de conquistas</h3>
          <span className="text-xs text-muted">{selosConquistados.length} de {selos.length} selos</span>
        </div>
        <p className="text-xs text-muted mb-4">
          Cada ação relevante gera um selo colecionável — como uma estante de itens de enxoval.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {selos.map((s) => {
            const conquistado = selosConquistados.includes(s.id);
            return (
              <div
                key={s.id}
                className={cn(
                  "rounded-xl border p-3 text-center transition-all",
                  conquistado
                    ? "border-accent/30 bg-accent/5"
                    : "border-line bg-bg opacity-50"
                )}
              >
                <div className={cn("flex items-center justify-center mb-1", !conquistado && "grayscale opacity-30")}>
                  {conquistado ? (
                    <s.icon size={28} strokeWidth={1.75} className="text-accent" />
                  ) : (
                    <Lock size={28} strokeWidth={1.75} className="text-muted" />
                  )}
                </div>
                <div className={cn(
                  "text-[0.7rem] font-medium leading-tight",
                  conquistado ? "text-ink" : "text-muted"
                )}>
                  {s.nome}
                </div>
                <div className="text-[0.6rem] text-muted mt-1 leading-tight">
                  {s.descricao}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificados */}
      <div className="card-fassi p-5">
        <h3 className="font-serif text-lg font-semibold text-ink mb-4">Certificados</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <Link href="/app/certificados/produto" className="border border-line rounded-xl p-4 hover:border-primary transition-colors group">
            <div className="flex items-center gap-3 mb-2">
              <Award size={18} strokeWidth={1.75} className={pctProduto === 100 ? "text-accent-dark" : "text-muted"} />
              <span className="text-sm font-medium text-ink">Especialista em Produto</span>
            </div>
            <div className="text-xs text-muted mb-2">{pctProduto === 100 ? "Disponível" : `${pctProduto}% concluído`}</div>
            <div className="h-1.5 bg-line rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${pctProduto}%` }} />
            </div>
          </Link>
          <Link href="/app/certificados/vendas" className="border border-line rounded-xl p-4 hover:border-primary transition-colors group">
            <div className="flex items-center gap-3 mb-2">
              <Award size={18} strokeWidth={1.75} className={pctVendas === 100 ? "text-accent-dark" : "text-muted"} />
              <span className="text-sm font-medium text-ink">Especialista em Vendas</span>
            </div>
            <div className="text-xs text-muted mb-2">{pctVendas === 100 ? "Disponível" : `${pctVendas}% concluído`}</div>
            <div className="h-1.5 bg-line rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${pctVendas}%` }} />
            </div>
          </Link>
          <Link
            href="/app/certificados/master"
            className="border border-line rounded-xl p-4 hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <Award size={18} strokeWidth={1.75} className={pctProduto === 100 && pctVendas === 100 ? "text-accent-dark" : "text-muted"} />
              <span className="text-sm font-medium text-ink">Especialista Master</span>
            </div>
            <div className="text-xs text-muted mb-2">
              {pctProduto === 100 && pctVendas === 100 ? "Disponível" : "Pendente"}
            </div>
          </Link>
        </div>
      </div>

      {/* Minha Vitrine */}
      <div className="card-fassi p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold text-ink">Minha Vitrine</h3>
          <Link href="/app/vitrine" className="text-xs font-semibold text-primary">
            Gerenciar →
          </Link>
        </div>
        {fotosVitrine.length === 0 ? (
          <div className="text-center py-6">
            <ImageIcon size={28} strokeWidth={1.75} className="text-muted opacity-30 mx-auto mb-2" />
            <p className="text-sm text-muted">Nenhuma foto enviada ainda.</p>
            <Link href="/app/vitrine" className="text-xs font-semibold text-primary mt-2 inline-block">
              Enviar primeira foto →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {fotosVitrine.slice(0, 4).map((f) => (
              <div key={f.id} className="aspect-square rounded-lg overflow-hidden bg-bg">
                {f.url && <img src={f.url} alt={f.legenda} loading="lazy" decoding="async" className="w-full h-full object-cover" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progresso por módulo */}
      <div className="card-fassi p-5">
        <h3 className="font-serif text-lg font-semibold text-ink mb-4">Seu progresso na Universidade</h3>
        <div className="space-y-3">
          {modulos.map((m) => {
            const feitasMod = m.licoes.filter((l) => licoesConcluidas.includes(l.id)).length;
            const pctMod = m.licoes.length > 0 ? Math.round((feitasMod / m.licoes.length) * 100) : 0;
            return (
              <div key={m.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ink">{m.titulo}</span>
                  <span className="text-xs text-muted">{feitasMod}/{m.licoes.length}</span>
                </div>
                <div className="h-1.5 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pctMod}%`, background: m.cor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
