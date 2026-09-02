import type { Metadata } from "next";
import { LogoFull } from "@/components/Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Casa Fassi — ecossistema de embaixadores da Marken Fassi. Dúvidas, sugestões e suporte para parceiros.",
  alternates: { canonical: "/contato/" },
  openGraph: {
    title: "Contato — Casa Fassi",
    description: "Entre em contato com a Casa Fassi — Marken Fassi.",
    type: "website",
  },
};

export default function ContatoPage() {
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
          Contato
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight">
          Fale com a Casa Fassi
        </h1>
        <div className="w-12 h-px bg-accent mb-10" />

        <div className="space-y-6">
          <p className="text-base text-ink/85 leading-relaxed">
            A Casa Fassi é a plataforma de capacitação e relacionamento da
            Marken Fassi para embaixadores e parceiros comerciais. Estamos à
            disposição para dúvidas, sugestões e suporte.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="card-fassi p-6">
              <h2 className="font-serif text-lg font-semibold text-ink mb-2">
                Suporte à plataforma
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-3">
                Dúvidas sobre acesso, cursos, certificados ou navegação na Casa
                Fassi.
              </p>
              <a
                href="mailto:casafassi@markenfassi.com.br"
                className="text-sm font-semibold text-accent-dark hover:text-accent transition-colors"
              >
                casafassi@markenfassi.com.br
              </a>
            </div>

            <div className="card-fassi p-6">
              <h2 className="font-serif text-lg font-semibold text-ink mb-2">
                Parceria comercial
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-3">
                Informações sobre o programa de embaixadores e parcerias com a
                Marken Fassi.
              </p>
              <a
                href="mailto:parcerias@markenfassi.com.br"
                className="text-sm font-semibold text-accent-dark hover:text-accent transition-colors"
              >
                parcerias@markenfassi.com.br
              </a>
            </div>
          </div>

          <div className="card-fassi p-6 mt-6">
            <h2 className="font-serif text-lg font-semibold text-ink mb-2">
              Já é embaixador?
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Acesse a plataforma para ver seus cursos, conteúdos, certificados
              e benefícios.
            </p>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-accent text-ink hover:bg-accent-dark transition-colors"
            >
              Acessar plataforma →
            </Link>
          </div>
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
