"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
        <AlertCircle size={28} className="text-accent-dark" strokeWidth={1.75} />
      </div>
      <h2 className="font-serif text-xl font-semibold text-ink mb-2">
        Não foi possível carregar esta página
      </h2>
      <p className="text-sm text-muted max-w-md leading-relaxed mb-6">
        Algo inesperado aconteceu. Tente novamente — se o problema persistir,
        a equipe da Casa Fassi será avisada.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-surface px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <RefreshCw size={16} strokeWidth={1.75} />
        Tentar novamente
      </button>
    </div>
  );
}
