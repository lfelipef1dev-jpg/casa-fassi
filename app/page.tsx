"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Users,
  Gift,
  ArrowRight,
  GraduationCap,
  Library,
  HeartHandshake,
  Camera,
  Calendar,
  Award,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { LogoFull } from "@/components/Logo";
import { HeroCarousel } from "@/components/HeroCarousel";
import { useGameStore } from "@/lib/store";

const pilares = [
  {
    icon: GraduationCap,
    titulo: "Universidade Marken Fassi",
    descricao:
      "Vídeos, cursos e conteúdos para conhecer profundamente a marca, os produtos e o universo do bem-viver.",
  },
  {
    icon: Library,
    titulo: "Conteúdos para a rotina",
    descricao:
      "Materiais de consulta, guias de produtos, argumentos de atendimento, informações sobre tecidos e novidades das coleções.",
  },
  {
    icon: Users,
    titulo: "Comunidade Casa Fassi",
    descricao:
      "Um espaço para compartilhar experiências, vitrines, boas práticas e histórias vividas nas lojas.",
  },
  {
    icon: HeartHandshake,
    titulo: "Benefícios e experiências",
    descricao:
      "Acesso a encontros, lançamentos, conteúdos especiais, certificados, produtos e experiências da marca.",
  },
];

const categoriasUniversidade = [
  { letra: "A", titulo: "Essência Marken Fassi", desc: "A história, os valores e o cuidado presente em cada detalhe." },
  { letra: "B", titulo: "Produtos, tecidos e acabamentos", desc: "Fios, matérias-primas, linhas, coleções e cuidados." },
  { letra: "C", titulo: "Coleções Marken Fassi", desc: "Conceito, produtos, diferenciais e argumentos de atendimento." },
  { letra: "D", titulo: "Atendimento e experiência", desc: "Acolhimento, escuta, apresentação de valor e pós-venda." },
  { letra: "E", titulo: "Vitrine e composição", desc: "Como montar ambientes que inspiram e fotografar produtos." },
  { letra: "F", titulo: "Conteúdo e presença digital", desc: "Redes sociais, vídeos na loja e uso correto de materiais." },
  { letra: "G", titulo: "Novidades e lançamentos", desc: "Vídeos recentes, campanhas, calendários e conteúdos sazonais." },
];

export default function RootPage() {
  const router = useRouter();
  const onboardingCompleto = useGameStore((s) => s.onboardingCompleto);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEntrar = () => {
    if (onboardingCompleto) {
      router.push("/app");
    } else {
      router.push("/onboarding");
    }
  };

  const ctaLabel = mounted && onboardingCompleto ? "Acessar plataforma" : "Entrar";

  const navLinks = [
    { label: "Universidade", href: "#universidade" },
    { label: "Comunidade", href: "#comunidade" },
    { label: "Ambientação", href: "#galeria" },
    { label: "Benefícios", href: "#beneficios" },
  ];

  return (
    <LazyMotion features={domAnimation}>
    <div className="min-h-screen bg-bg">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface/95 backdrop-blur-md border-b border-line shadow-subtle"
            : "bg-gradient-to-b from-ink/40 to-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <LogoFull theme="light" height={40} />

          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação da página">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? "text-muted hover:text-ink" : "text-surface/80 hover:text-surface"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={handleEntrar}
            aria-label={ctaLabel}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 bg-accent text-ink hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {ctaLabel}
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Apresentação da Casa Fassi */}
      <section id="pilares" className="py-20 px-6 bg-bg scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
              Um espaço para aprender, trocar e fazer parte
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed mb-2">
              A Casa Fassi nasceu para aproximar ainda mais a Marken Fassi de quem apresenta nossas
              coleções todos os dias.
            </p>
            <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed">
              Um ambiente criado para compartilhar conhecimento, apoiar o atendimento, inspirar novas
              experiências nas lojas e reconhecer as pessoas que ajudam a construir a nossa história.
            </p>
            <div className="w-12 h-px bg-accent mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pilares.map((p, i) => {
              const Icon = p.icon;
              return (
                <m.div
                  key={p.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-fassi p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon size={22} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-ink mb-2">{p.titulo}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.descricao}</p>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Universidade Marken Fassi */}
      <section
        id="universidade"
        className="py-20 px-6 bg-surface border-y border-line scroll-mt-16"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Universidade Marken Fassi
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
              Conhecimento para orientar. Repertório para encantar.
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed mb-2">
              Conhecer cada tecido, acabamento, coleção e detalhe transforma a conversa com o cliente.
            </p>
            <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed">
              A Universidade Marken Fassi reúne vídeos, aulas, materiais e percursos de formação para
              tornar esse conhecimento mais próximo, prático e presente na rotina de cada parceiro.
            </p>
            <div className="w-12 h-px bg-accent mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriasUniversidade.map((c, i) => (
              <m.div
                key={c.letra}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card-fassi p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-surface bg-primary"
                  >
                    {c.letra}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-ink">{c.titulo}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
              </m.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/app/universidade")}
              className="group inline-flex items-center gap-2 btn-gold"
            >
              Conheça a Universidade
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Comunidade — mais humana, editorial */}
      <section id="comunidade" className="py-20 px-6 bg-bg scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Comunidade Casa Fassi
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
              Uma casa feita de encontros
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
              A Casa Fassi também é um espaço para compartilhar experiências, conhecer boas práticas e
              encontrar novas formas de levar o bem-viver para cada loja.
            </p>
            <div className="w-12 h-px bg-accent mx-auto mt-6" />
          </div>

          {/* Quote editorial — voz humana */}
          <blockquote className="text-center mb-12 max-w-2xl mx-auto">
            <p className="font-serif text-xl md:text-2xl text-ink/80 italic leading-relaxed">
              “Cada loja parceira carrega uma história. Cada vitrine, um cuidado.
              Cada atendimento, uma oportunidade de surpreender.”
            </p>
          </blockquote>

          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              { titulo: "Vitrines que inspiram", desc: "Composições e ideias de outras lojas parceiras.", icon: "camera" },
              { titulo: "Histórias de atendimento", desc: "Experiências reais vividas no dia a dia das lojas.", icon: "heart" },
              { titulo: "Agenda de encontros", desc: "Eventos, lives e momentos de convivência da Casa.", icon: "calendar" },
            ].map((item) => (
              <div key={item.titulo} className="card-fassi p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  {item.icon === "camera" && <Camera size={18} className="text-primary" strokeWidth={1.75} />}
                  {item.icon === "heart" && <HeartHandshake size={18} className="text-primary" strokeWidth={1.75} />}
                  {item.icon === "calendar" && <Calendar size={18} className="text-primary" strokeWidth={1.75} />}
                </div>
                <h3 className="font-serif text-base font-semibold text-ink mb-2">{item.titulo}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria editorial */}
      <section id="galeria" className="py-20 px-6 bg-surface border-y border-line scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Ambientação
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
              O universo do bem-viver em detalhes
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
              Tecidos, texturas e ambientes que traduzem o cuidado da Marken Fassi em cada composição.
            </p>
            <div className="w-12 h-px bg-accent mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { src: "/images/marken/universidade/capa-essencia.webp", alt: "Essência Marken Fassi — história e valores" },
              { src: "/images/marken/universidade/capa-tecidos-fios-v2.webp", alt: "Tecidos e fios premium Marken Fassi" },
              { src: "/images/marken/universidade/capa-colecao-alameda-v2.webp", alt: "Coleção Alameda — design e inspiração" },
            ].map((img, i) => (
              <m.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-line group aspect-[4/3]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios — 3 principais + secundários */}
      <section id="beneficios" className="py-24 px-6 bg-bg scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Benefícios
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
            Cuidado também para quem cuida da marca
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
            A participação nas formações, encontros e ações da Casa Fassi pode dar acesso a benefícios
            pensados para valorizar quem faz parte da nossa história.
          </p>
          <div className="w-12 h-px bg-accent mx-auto mt-6 mb-12" />

          {/* 3 benefícios principais — destaque */}
          <div className="grid md:grid-cols-3 gap-5 mb-10 text-left">
            {[
              { titulo: "Certificados", desc: "Reconhecimento oficial do seu conhecimento e participação nas formações.", icon: Award },
              { titulo: "Lançamentos antecipados", desc: "Acesso prioritário a novas coleções, produtos e campanhas da marca.", icon: Sparkles },
              { titulo: "Encontros com especialistas", desc: "Conversas, visitas e momentos de convivência com a equipe Marken Fassi.", icon: Users },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.titulo} className="card-fassi p-6">
                  <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent-dark" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-ink mb-2">{b.titulo}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Benefícios secundários — lista compacta */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-2xl mx-auto">
            {[
              "Conteúdos antecipados",
              "Materiais exclusivos",
              "Convites para eventos",
              "Produtos e experiências",
              "Reconhecimento editorial",
            ].map((b) => (
              <span key={b} className="inline-flex items-center gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {b}
              </span>
            ))}
          </div>

          <p className="text-xs text-muted mt-10 italic">
            Os benefícios podem variar conforme a participação nas formações e ações da Casa Fassi.
          </p>
        </div>
      </section>

      {/* Minha Jornada — preview de produto */}
      <section id="jornada" className="py-20 px-6 bg-surface border-t border-line scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-3">
              Minha jornada
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
              Acompanhe seu percurso na Casa Fassi
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
              Cursos iniciados, conteúdos concluídos, certificados, vídeos salvos e próximos passos —
              tudo em um só lugar, no seu ritmo.
            </p>
            <div className="w-12 h-px bg-accent mx-auto" />
          </div>

          {/* Preview do dashboard — cards com indicadores */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Card principal — progresso de formação */}
            <div className="card-fassi p-6 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen size={18} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-ink">Formação em andamento</h3>
                    <p className="text-xs text-muted">Essência Marken Fassi — Módulo 2 de 5</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-accent-dark tabular-nums">40%</span>
              </div>
              {/* Barra de progresso */}
              <div className="h-2 bg-line rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "40%" }} />
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted">Próxima aula: Algodão egípcio vs. Tencel™</span>
                <span className="text-xs font-medium text-ink/70">8 min</span>
              </div>
            </div>

            {/* Cards menores — métricas */}
            {[
              { titulo: "Certificados", valor: "3", desc: "concluídos", icon: Award },
              { titulo: "Vídeos salvos", valor: "12", desc: "para rever", icon: Library },
              { titulo: "Conteúdos novos", valor: "5", desc: "esta semana", icon: Sparkles },
              { titulo: "Próximos passos", valor: "2", desc: "trilhas sugeridas", icon: ArrowRight },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titulo} className="card-fassi p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-semibold text-ink">{item.titulo}</h3>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                  <span className="font-serif text-2xl font-semibold text-accent-dark tabular-nums">{item.valor}</span>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleEntrar}
              className="group inline-flex items-center gap-2 btn-gold"
            >
              Acessar minha jornada
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section
        className="py-20 px-6 relative overflow-hidden bg-ink"
      >
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent blur-[120px]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 flex justify-center">
              <LogoFull theme="dark" height={52} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-surface mb-4">
              Você faz parte desta história
            </h2>
            <p className="text-surface/60 text-base mb-4 leading-relaxed">
              Cada atendimento, cada escolha e cada detalhe ajudam a levar o cuidado da Marken Fassi
              para novas casas.
            </p>
            <p className="text-surface/50 text-sm mb-10 leading-relaxed">
              Entre na Casa Fassi e encontre conhecimento, ferramentas e experiências pensadas para
              acompanhar sua jornada com a marca.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleEntrar}
                aria-label="Entrar na Casa Fassi"
                className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-ink px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-elevated active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Entrar na Casa Fassi
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/app/universidade")}
                aria-label="Conhecer a Universidade Marken Fassi"
                className="inline-flex items-center gap-2 border border-surface/20 text-surface hover:bg-surface/10 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Conhecer a Universidade
              </button>
            </div>
          </m.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-surface">
        {/* Topo — logo + tagline editorial */}
        <div className="px-6 pt-16 pb-12 border-b border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <LogoFull theme="light" height={52} />
            <p className="font-serif text-lg md:text-xl text-surface/70 mt-6 max-w-xl mx-auto leading-relaxed italic">
              Conhecimento para orientar. Repertório para encantar.
            </p>
            <div className="w-16 h-px bg-accent mx-auto mt-6" />
          </div>
        </div>

        {/* Centro — colunas de links */}
        <div className="px-6 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="col-span-2 md:col-span-1">
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">A Casa Fassi</p>
              <p className="text-sm text-surface/60 leading-relaxed max-w-xs">
                Plataforma de capacitação, reconhecimento e comunidade para
                embaixadores da Marken Fassi.
              </p>
            </div>

            <div>
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Plataforma</p>
              <ul className="space-y-3">
                <li><a href="#universidade" className="text-sm text-surface/70 hover:text-surface transition-colors">Universidade</a></li>
                <li><a href="#pilares" className="text-sm text-surface/70 hover:text-surface transition-colors">Conteúdos</a></li>
                <li><a href="#comunidade" className="text-sm text-surface/70 hover:text-surface transition-colors">Comunidade</a></li>
                <li><a href="#beneficios" className="text-sm text-surface/70 hover:text-surface transition-colors">Benefícios</a></li>
              </ul>
            </div>

            <div>
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Institucional</p>
              <ul className="space-y-3">
                <li><Link href="/sobre" className="text-sm text-surface/70 hover:text-surface transition-colors">Sobre</Link></li>
                <li><Link href="/contato" className="text-sm text-surface/70 hover:text-surface transition-colors">Contato</Link></li>
                <li><Link href="/privacidade" className="text-sm text-surface/70 hover:text-surface transition-colors">Privacidade</Link></li>
                <li><Link href="/termos" className="text-sm text-surface/70 hover:text-surface transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Acesso</p>
              <ul className="space-y-3">
                <li><Link href="/onboarding" className="text-sm text-surface/70 hover:text-surface transition-colors">Acessar plataforma</Link></li>
                <li><Link href="/contato" className="text-sm text-surface/70 hover:text-surface transition-colors">Seja um parceiro</Link></li>
              </ul>
              <button
                onClick={handleEntrar}
                className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-sm bg-accent text-ink hover:bg-accent-dark transition-colors"
              >
                Entrar
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Base — copyright + assinatura */}
        <div className="px-6 py-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-surface/50 leading-relaxed text-center md:text-left">
              © {new Date().getFullYear()} Marken Fassi. Todos os direitos reservados.
            </p>
            <p className="text-xs text-surface/40 leading-relaxed text-center md:text-right">
              Há quase 50 anos transformando tecidos, detalhes e histórias em
              experiências de bem-viver.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </LazyMotion>
  );
}
