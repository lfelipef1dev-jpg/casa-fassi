"use client";

import { Menu, Search, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pageTitles: Record<string, string> = {
  "/app": "Início",
  "/app/universidade": "Universidade",
  "/app/conteudos": "Conteúdos",
  "/app/vitrine": "Minha Vitrine",
  "/app/comunidade": "Comunidade",
  "/app/beneficios": "Benefícios",
  "/app/reconhecimento": "Reconhecimento",
  "/app/certificados": "Certificados",
  "/app/assistente": "Assistente",
  "/app/perfil": "Perfil",
};

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  const pageTitle =
    Object.entries(pageTitles).find(([href]) =>
      href === "/app" ? pathname === "/app" : pathname.startsWith(href)
    )?.[1] || "Casa Fassi";

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/90 backdrop-blur-md border-b border-line flex items-center gap-3 px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-ink hover:text-primary p-1.5 rounded-lg hover:bg-surface-subtle transition-colors"
        aria-label="Abrir menu"
        aria-expanded="false"
      >
        <Menu size={20} />
      </button>

      <h1 className="text-lg font-serif font-semibold text-ink hidden sm:block flex-shrink-0">
        {pageTitle}
      </h1>

      <div className="flex-1 max-w-md ml-auto sm:ml-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Buscar conteúdos, cursos, materiais..."
            aria-label="Buscar na plataforma"
            className="w-full bg-surface-subtle border border-line rounded-xl pl-9 pr-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-primary focus:bg-surface transition-colors"
          />
        </div>
      </div>

      <button
        className="text-muted hover:text-primary p-2 rounded-lg hover:bg-surface-subtle transition-colors flex-shrink-0"
        aria-label="Notificações"
      >
        <Bell size={18} />
      </button>
    </header>
  );
}
