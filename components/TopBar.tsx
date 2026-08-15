"use client";

import { Menu, Search } from "lucide-react";

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-line flex items-center gap-3 px-4 lg:px-6">
      <button onClick={onMenuClick} className="lg:hidden text-ink hover:text-brand">
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Buscar conteúdos, cursos, materiais..."
            className="w-full bg-bg border border-line rounded-xl pl-9 pr-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      </div>
    </header>
  );
}
