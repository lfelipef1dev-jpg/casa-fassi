"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Gift,
  ArrowRight,
  GraduationCap,
  Library,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { LogoFull } from "@/components/Logo";
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
    titulo: "Comunidade Casa Marken Fassi",
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
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
    { label: "Universidade Marken Fassi", href: "#universidade" },
    { label: "Conteúdos", href: "#pilares" },
    { label: "Comunidade", href: "#comunidade" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Minha jornada", href: "#jornada" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-card/90 backdrop-blur-md border-b border-line shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <LogoFull theme={scrolled ? "light" : "dark"} height={30} />

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? "text-muted hover:text-ink" : "text-card/70 hover:text-card"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={handleEntrar}
            className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 ${
              scrolled
                ? "bg-accent hover:bg-accent-dark text-ink"
                : "border border-card/30 text-card hover:bg-card/10"
            }`}
          >
            {ctaLabel}
            <ArrowRight size={15} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 50%, #1B3D2A 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-accent/90 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Casa Marken Fassi
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-3xl md:text-5xl font-semibold text-card leading-tight mb-6"
          >
            Uma casa para quem transforma enxoval em experiência
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-card/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4"
          >
            A Casa Marken Fassi é o espaço de formação, relacionamento e reconhecimento da Marken Fassi
            para lojistas, vendedores, representantes e parceiros que levam o cuidado da nossa marca
            até cada cliente.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-card/50 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10"
          >
            Aqui, conhecimento, repertório e inspiração se encontram para tornar cada atendimento
            ainda mais especial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => router.push("/app/universidade")}
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-ink px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
            >
              Conheça a Universidade Marken Fassi
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleEntrar}
              className="inline-flex items-center gap-2 border border-card/30 text-card hover:bg-card/10 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all"
            >
              Entrar na Casa Marken Fassi
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-card/40 text-xs mt-6"
          >
            Conteúdos, vídeos, materiais e benefícios exclusivos para parceiros Marken Fassi.
          </motion.p>

          {/* Três conceitos no lugar de números fictícios */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-14 flex items-center justify-center gap-8 text-card/60"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-accent" />
              <span className="text-xs font-medium">Formação contínua</span>
            </div>
            <div className="w-px h-4 bg-card/20" />
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <span className="text-xs font-medium">Conteúdo para o atendimento</span>
            </div>
            <div className="w-px h-4 bg-card/20" />
            <div className="flex items-center gap-2">
              <HeartHandshake size={16} className="text-accent" />
              <span className="text-xs font-medium">Relacionamento com a marca</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apresentação da Casa Marken Fassi */}
      <section id="pilares" className="py-20 px-6 bg-bg scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
              Um espaço para aprender, trocar e fazer parte
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed mb-2">
              A Casa Marken Fassi nasceu para aproximar ainda mais a Marken Fassi de quem apresenta nossas
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
                <motion.div
                  key={p.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-fassi p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/15 transition-colors">
                    <Icon size={22} className="text-brand" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-ink mb-2">{p.titulo}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.descricao}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Universidade Marken Fassi */}
      <section
        id="universidade"
        className="py-20 px-6 bg-card border-y border-line scroll-mt-16"
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
              <motion.div
                key={c.letra}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card-fassi p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-card"
                    style={{ background: "#1B3D2A" }}
                  >
                    {c.letra}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-ink">{c.titulo}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/app/universidade")}
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-ink px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
            >
              Conheça a Universidade Marken Fassi
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Comunidade */}
      <section id="comunidade" className="py-20 px-6 bg-bg scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Comunidade Casa Marken Fassi
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
            Uma casa feita de encontros
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
            A Casa Marken Fassi também é um espaço para compartilhar experiências, conhecer boas práticas e
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

      {/* Benefícios */}
      <section id="beneficios" className="py-20 px-6 bg-card border-y border-line scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-3">
            Benefícios
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
            Cuidado também para quem cuida da marca
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
            A participação nas formações, encontros e ações da Casa Marken Fassi pode dar acesso a benefícios
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
                <Gift size={16} className="text-brand flex-shrink-0" />
                <span className="text-sm text-ink/85">{b}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-8 italic">
            Os benefícios podem variar conforme a participação nas formações e ações da Casa Marken Fassi.
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
            Acompanhe seu percurso na Casa Marken Fassi
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
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 50%, #1B3D2A 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent blur-[120px]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 flex justify-center">
              <LogoFull theme="dark" height={44} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-card mb-4">
              Você faz parte desta história
            </h2>
            <p className="text-card/60 text-base mb-4 leading-relaxed">
              Cada atendimento, cada escolha e cada detalhe ajudam a levar o cuidado da Marken Fassi
              para novas casas.
            </p>
            <p className="text-card/50 text-sm mb-10 leading-relaxed">
              Entre na Casa Marken Fassi e encontre conhecimento, ferramentas e experiências pensadas para
              acompanhar sua jornada com a marca.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleEntrar}
                className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-ink px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
              >
                Entrar na Casa Marken Fassi
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/app/universidade")}
                className="inline-flex items-center gap-2 border border-card/30 text-card hover:bg-card/10 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all"
              >
                Conhecer a Universidade
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-bg border-t border-line">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
            <div>
              <LogoFull theme="light" height={28} />
              <p className="text-xs text-muted mt-3 max-w-xs leading-relaxed">
                Casa Marken Fassi — conhecimento, cuidado e relacionamento.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#universidade" className="text-xs text-muted hover:text-ink transition-colors">Universidade Marken Fassi</a>
              <a href="#pilares" className="text-xs text-muted hover:text-ink transition-colors">Conteúdos</a>
              <a href="#comunidade" className="text-xs text-muted hover:text-ink transition-colors">Comunidade</a>
              <a href="#beneficios" className="text-xs text-muted hover:text-ink transition-colors">Benefícios</a>
              <a href="#" className="text-xs text-muted hover:text-ink transition-colors">Política de privacidade</a>
              <a href="#" className="text-xs text-muted hover:text-ink transition-colors">Termos de uso</a>
              <a href="#" className="text-xs text-muted hover:text-ink transition-colors">Contato</a>
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
  );
}
