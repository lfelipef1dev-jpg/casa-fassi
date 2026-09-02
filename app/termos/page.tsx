import type { Metadata } from "next";
import { LogoFull } from "@/components/Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso da Casa Fassi — plataforma de capacitação da Marken Fassi para embaixadores e parceiros comerciais.",
  alternates: { canonical: "/termos/" },
  openGraph: {
    title: "Termos de Uso — Casa Fassi",
    description: "Termos de uso da plataforma Casa Fassi — Marken Fassi.",
    type: "website",
  },
};

export default function TermosPage() {
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
          Legal
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight">
          Termos de Uso
        </h1>
        <div className="w-12 h-px bg-accent mb-10" />

        <div className="space-y-8 text-ink/85">
          <section>
            <p className="text-sm text-muted mb-2">Última atualização: setembro de 2026</p>
            <p className="text-base leading-relaxed">
              Estes Termos de Uso regulam o acesso e a utilização da Casa Fassi —
              plataforma de capacitação, reconhecimento e comunidade da Marken
              Fassi. Ao acessar a plataforma, o parceiro concorda com os termos
              abaixo.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              1. Natureza da plataforma
            </h2>
            <p className="text-base leading-relaxed">
              A Casa Fassi é uma plataforma de uso institucional destinada a
              embaixadores e parceiros comerciais da Marken Fassi. Não se trata
              de e-commerce: não há compra, venda, carrinho ou checkout. O
              conteúdo é oferecido para formação e relacionamento.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              2. Acesso
            </h2>
            <p className="text-base leading-relaxed">
              O acesso é destinado a profissionais vinculados a lojas parceiras
              da Marken Fassi. O cadastro pode ser realizado através do
              onboarding disponível na plataforma. A Marken Fassi reserva-se o
              direito de validar o vínculo comercial antes de liberar o acesso
              completo.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              3. Uso responsável
            </h2>
            <p className="text-base leading-relaxed mb-3">
              O parceiro se compromete a:
            </p>
            <ul className="space-y-2 text-base">
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Utilizar a plataforma para fins profissionais e de formação;</span></li>
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Não compartilhar credenciais de acesso com terceiros;</span></li>
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Respeitar os direitos autorais dos conteúdos, cursos e materiais;</span></li>
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Não reproduzir, distribuir ou comercializar o conteúdo sem autorização.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              4. Conteúdo
            </h2>
            <p className="text-base leading-relaxed">
              Os cursos, materiais, certificados e conteúdos disponíveis na
              plataforma são de propriedade da Marken Fassi. Os certificados
              emitidos têm caráter de reconhecimento de participação nas
              formações e não constituem certificação profissional regulamentada
              por órgão público.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              5. Modificações
            </h2>
            <p className="text-base leading-relaxed">
              A Marken Fassi pode atualizar o conteúdo, a estrutura e estes
              Termos a qualquer momento, comunicando alterações relevantes
              através da própria plataforma ou por e-mail corporativo.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              6. Contato
            </h2>
            <p className="text-base leading-relaxed">
              Dúvidas sobre estes Termos podem ser enviadas para{" "}
              <a href="mailto:casafassi@markenfassi.com.br" className="text-accent-dark font-semibold hover:text-accent transition-colors">
                casafassi@markenfassi.com.br
              </a>.
            </p>
          </section>
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
