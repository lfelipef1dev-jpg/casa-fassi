import type { Metadata } from "next";
import { LogoFull } from "@/components/Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade da Casa Fassi — plataforma de capacitação da Marken Fassi. Como tratamos dados de embaixadores e parceiros.",
  alternates: { canonical: "/privacidade/" },
  openGraph: {
    title: "Política de Privacidade — Casa Fassi",
    description: "Como a Casa Fassi trata dados de embaixadores e parceiros.",
    type: "website",
  },
};

export default function PrivacidadePage() {
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
          Política de Privacidade
        </h1>
        <div className="w-12 h-px bg-accent mb-10" />

        <div className="space-y-8 text-ink/85">
          <section>
            <p className="text-sm text-muted mb-2">Última atualização: setembro de 2026</p>
            <p className="text-base leading-relaxed">
              A Casa Fassi — plataforma de capacitação da Marken Fassi — respeita
              a privacidade de seus embaixadores e parceiros. Esta política
              descreve como coletamos, usamos e protegemos informações dentro da
              plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              1. Dados coletados
            </h2>
            <p className="text-base leading-relaxed">
              A Casa Fassi coleta informações fornecidas pelo próprio parceiro
              durante o cadastro e uso da plataforma: nome, função, loja
              parceira, e-mail corporativo e progresso nas formações. Dados de
              navegação anônimos podem ser coletados para fins de análise e
              melhoria da experiência.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              2. Uso dos dados
            </h2>
            <p className="text-base leading-relaxed mb-3">
              As informações são utilizadas para:
            </p>
            <ul className="space-y-2 text-base">
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Personalizar a experiência de formação e conteúdo;</span></li>
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Emitir certificados e registrar reconhecimentos;</span></li>
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Comunicar novidades, lançamentos e ações da Casa Fassi;</span></li>
              <li className="flex gap-3"><span className="text-accent flex-shrink-0">—</span><span>Melhorar continuamente a plataforma.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              3. Compartilhamento
            </h2>
            <p className="text-base leading-relaxed">
              Os dados não são compartilhados com terceiros para fins
              comerciais. Podem ser compartilhados internamente entre as áreas
              da Marken Fassi responsáveis pelo relacionamento com lojas
              parceiras, sempre com finalidade institucional e de formação.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              4. Direitos do titular
            </h2>
            <p className="text-base leading-relaxed">
              Em conformidade com a LGPD (Lei nº 13.709/2018), o parceiro pode
              solicitar acesso, correção ou exclusão de seus dados a qualquer
              momento, através do e-mail{" "}
              <a href="mailto:casafassi@markenfassi.com.br" className="text-accent-dark font-semibold hover:text-accent transition-colors">
                casafassi@markenfassi.com.br
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              5. Segurança
            </h2>
            <p className="text-base leading-relaxed">
              A plataforma adota medidas técnicas e organizacionais para
              proteger os dados contra acesso não autorizado, alteração ou
              divulgação indevida.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-ink mb-3">
              6. Contato
            </h2>
            <p className="text-base leading-relaxed">
              Dúvidas sobre esta política podem ser enviadas para{" "}
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
