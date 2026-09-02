import Link from "next/link";
import { LogoFull } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-line bg-surface">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" aria-label="Página inicial">
            <LogoFull theme="light" height={32} />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif text-6xl md:text-8xl font-semibold text-accent-dark tabular-nums mb-4">
          404
        </p>
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-3">
          Página não encontrada
        </h1>
        <p className="text-sm text-muted max-w-md leading-relaxed mb-8">
          A página que você procura pode ter sido movida ou não existe mais.
          Volte ao início da Casa Fassi para continuar sua jornada.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-ink px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Voltar ao início
        </Link>
      </main>
    </div>
  );
}
