import type { Metadata } from "next";
import { LogoFull } from "@/components/Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre a Casa Fassi",
  description:
    "Casa Fassi é a plataforma oficial de capacitação, reconhecimento e comunidade da Marken Fassi para embaixadores e parceiros comerciais. Conheça nossa história e propósito.",
  alternates: { canonical: "/sobre/" },
  openGraph: {
    title: "Sobre a Casa Fassi",
    description:
      "Plataforma oficial de capacitação e reconhecimento da Marken Fassi para embaixadores e parceiros.",
    type: "website",
  },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-surface sticky top-0 z-50 backdrop-blur-md bg-surface/95">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Página inicial">
            <LogoFull theme="light" height={32} />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-ink transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-accent-dark text-sm font-semibold tracking-[0.15em] uppercase mb-4">
          Sobre
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight">
          A Casa Fassi e o ecossistema de embaixadores Marken Fassi
        </h1>
        <div className="w-12 h-px bg-accent mb-10" />

        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-base text-ink/85 leading-relaxed">
            A Casa Fassi é a plataforma oficial de capacitação, reconhecimento e
            comunidade da Marken Fassi. Um espaço criado para apoiar quem apresenta
            nossas coleções todos os dias — do vendedor ao gestor de loja, do
            consultor ao visual merchandiser.
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink mt-10 mb-3">
            O propósito
          </h2>
          <p className="text-base text-ink/85 leading-relaxed">
            Há quase cinco décadas, a Marken Fassi transforma tecidos, detalhes e
            histórias em experiências de bem-viver. A Casa Fassi nasceu para
            aproximar ainda mais a marca de quem cuida do atendimento, da vitrine
            e da relação com o cliente final — compartilhando conhecimento,
            reconhecendo boas práticas e fortalecendo a rede de parceiros.
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink mt-10 mb-3">
            O que oferecemos
          </h2>
          <ul className="space-y-3 text-ink/85">
            <li className="flex gap-3">
              <span className="text-accent flex-shrink-0 mt-1">—</span>
              <span>
                <strong className="font-semibold">Universidade Marken Fassi:</strong>{" "}
                cursos, trilhas e aulas sobre produtos, tecidos, atendimento,
                composição de vitrine e conteúdo digital.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent flex-shrink-0 mt-1">—</span>
              <span>
                <strong className="font-semibold">Conteúdos:</strong>{" "}
                materiais de apoio, guias, argumentos de venda e novidades das
                coleções.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent flex-shrink-0 mt-1">—</span>
              <span>
                <strong className="font-semibold">Comunidade:</strong>{" "}
                espaço de troca entre lojas parceiras, com vitrines que inspiram
                e histórias de atendimento.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent flex-shrink-0 mt-1">—</span>
              <span>
                <strong className="font-semibold">Reconhecimento:</strong>{" "}
                certificados, selos e benefícios para quem participa das
                formações e ações da Casa.
              </span>
            </li>
          </ul>

          <h2 className="font-serif text-xl font-semibold text-ink mt-10 mb-3">
            Para quem
          </h2>
          <p className="text-base text-ink/85 leading-relaxed">
            A Casa Fassi é destinada a embaixadores e parceiros comerciais da
            Marken Fassi — vendedores, consultores, gerentes de loja,
            visual merchandisers e demais profissionais que representam a marca
            no ponto de venda.
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink mt-10 mb-3">
            Sobre a Marken Fassi
          </h2>
          <p className="text-base text-ink/85 leading-relaxed">
            Marken Fassi é uma marca premium de cama e banho, reconhecida pelo
            cuidado com cada detalhe — do fio ao acabamento — e pela preocupação
            em criar experiências, não apenas produtos. Cada coleção carrega
            uma filosofia de bem-viver que guia o desenvolvimento do produto,
            o atendimento na loja e a relação com o cliente.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-line">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark hover:text-accent transition-colors"
          >
            ← Voltar ao início
          </Link>
        </div>
      </main>

      <footer className="py-10 px-6 bg-surface border-t border-line">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted/70">
            Casa Fassi — Ecossistema de Embaixadores Marken Fassi
          </p>
        </div>
      </footer>
    </div>
  );
}
