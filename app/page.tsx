"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Users,
  Gift,
  ArrowRight,
  GraduationCap,
  Library,
  HeartHandshake,
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
    { label: "Início", href: "#inicio" },
    { label: "Universidade", href: "#universidade" },
    { label: "Conteúdos", href: "#pilares" },
    { label: "Comunidade", href: "#comunidade" },
    { label: "Ambientação", href: "#galeria" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Minha jornada", href: "#jornada" },
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
          <LogoFull theme="light" height={28} />

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
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 bg-accent text-ink hover:bg-accent-dark"
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

      {/* Comunidade */}
      <section id="comunidade" className="py-20 px-6 bg-bg scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
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
          <div className="w-12 h-px bg-accent mx-auto mt-6 mb-10" />
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              { titulo: "Vitrines que inspiram", desc: "Composições e ideias de outras lojas parceiras." },
              { titulo: "Histórias de atendimento", desc: "Experiências reais vividas no dia a dia das lojas." },
              { titulo: "Agenda de encontros", desc: "Eventos, lives e momentos de convivência da Casa." },
            ].map((item) => (
              <div key={item.titulo} className="card-fassi p-5">
                <h3 className="font-serif text-base font-semibold text-ink mb-1">{item.titulo}</h3>
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
              { src: "/images/marken/universidade/capa-essencia.svg", alt: "Essência Marken Fassi — história e valores" },
              { src: "/images/marken/universidade/capa-tecidos.svg", alt: "Tecidos e fios premium Marken Fassi" },
              { src: "/images/marken/universidade/capa-alameda.svg", alt: "Coleção Alameda — design e inspiração" },
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

      {/* Benefícios */}
      <section id="beneficios" className="py-20 px-6 bg-bg scroll-mt-16">
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
          <div className="w-12 h-px bg-accent mx-auto mt-6 mb-10" />
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              "Certificados",
              "Conteúdos antecipados",
              "Participação em lançamentos",
              "Encontros com especialistas",
              "Visitas à marca",
              "Produtos e experiências",
              "Materiais exclusivos",
              "Convites para eventos",
              "Reconhecimento editorial",
            ].map((b) => (
              <div key={b} className="card-fassi p-4 flex items-center gap-3">
                <Gift size={16} className="text-primary flex-shrink-0" strokeWidth={1.75} />
                <span className="text-sm text-ink/85">{b}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-8 italic">
            Os benefícios podem variar conforme a participação nas formações e ações da Casa Fassi.
          </p>
        </div>
      </section>

      {/* Minha Jornada */}
      <section id="jornada" className="py-20 px-6 bg-bg scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
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
          <div className="w-12 h-px bg-accent mx-auto mt-6 mb-10" />
          <div className="grid md:grid-cols-4 gap-4 text-left">
            {[
              { titulo: "Cursos iniciados", desc: "Continue de onde parou." },
              { titulo: "Certificados", desc: "Reconhecimento do seu conhecimento." },
              { titulo: "Vídeos salvos", desc: "Conteúdos para rever quando precisar." },
              { titulo: "Próximos conteúdos", desc: "Novos caminhos para explorar." },
            ].map((item) => (
              <div key={item.titulo} className="card-fassi p-5">
                <h3 className="font-serif text-sm font-semibold text-ink mb-1">{item.titulo}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
              <LogoFull theme="dark" height={40} />
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
                className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-ink px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-elevated active:scale-95"
              >
                Entrar na Casa Fassi
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/app/universidade")}
                className="inline-flex items-center gap-2 border border-surface/20 text-surface hover:bg-surface/10 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all"
              >
                Conhecer a Universidade
              </button>
            </div>
          </m.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-bg border-t border-line">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
            <div>
              <LogoFull theme="light" height={26} />
              <p className="text-xs text-muted mt-3 max-w-xs leading-relaxed">
                Casa Fassi — conhecimento, cuidado e relacionamento.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#universidade" className="text-xs text-muted hover:text-ink transition-colors">Universidade</a>
              <a href="#pilares" className="text-xs text-muted hover:text-ink transition-colors">Conteúdos</a>
              <a href="#comunidade" className="text-xs text-muted hover:text-ink transition-colors">Comunidade</a>
              <a href="#beneficios" className="text-xs text-muted hover:text-ink transition-colors">Benefícios</a>
            </div>
          </div>
          <div className="pt-6 border-t border-line">
            <p className="text-xs text-muted/70 leading-relaxed">
              Marken Fassi — há quase 50 anos transformando tecidos, detalhes e histórias em
              experiências de bem-viver.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </LazyMotion>
  );
}
