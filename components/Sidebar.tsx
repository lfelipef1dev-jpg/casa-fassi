"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  Home,
  BookOpen,
  Library,
  Users,
  Gift,
  Award,
  Bot,
  User,
  Camera,
  Image as ImageIcon,
  Trophy,
  X,
} from "lucide-react";
import { LogoFull } from "./Logo";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app", label: "Início", icon: Home },
  { href: "/app/universidade", label: "Universidade", icon: BookOpen },
  { href: "/app/conteudos", label: "Conteúdos", icon: Library },
  { href: "/app/vitrine", label: "Minha Vitrine", icon: ImageIcon },
  { href: "/app/comunidade", label: "Comunidade", icon: Users },
  { href: "/app/beneficios", label: "Benefícios", icon: Gift },
  { href: "/app/reconhecimento", label: "Reconhecimento", icon: Award },
  { href: "/app/certificados/produto", label: "Certificados", icon: Trophy },
  { href: "/app/assistente", label: "Assistente", icon: Bot },
  { href: "/app/perfil", label: "Perfil", icon: User },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { nome, loja, funcao, photo } = useGameStore();

  // Bloquear scroll do body quando drawer abre + ESC para fechar
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-72 bg-surface border-r border-line z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 flex-shrink-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Navegação principal"
      >
        {/* Branding */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-line flex-shrink-0">
          <Link href="/app" onClick={onClose} aria-label="Página inicial" className="flex-1 min-w-0">
            <LogoFull theme="light" height={36} />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-muted hover:text-ink p-1.5 rounded-lg hover:bg-surface-subtle transition-colors flex-shrink-0"
            aria-label="Fechar menu"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Perfil do embaixador */}
        <div className="px-5 py-5 border-b border-line flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/8 border border-line flex items-center justify-center overflow-hidden flex-shrink-0">
              {photo ? (
                <img src={photo} alt={`Foto de ${nome || "participante"}`} width={48} height={48} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              ) : (
                <Camera size={18} className="text-muted" strokeWidth={1.75} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink truncate">
                {nome || "Participante"}
              </div>
              <div className="text-xs text-muted truncate">{funcao || "Embaixador"}</div>
              {loja && (
                <div className="text-xs text-muted/70 truncate mt-0.5">{loja}</div>
              )}
            </div>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar" aria-label="Menu principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                  active
                    ? "bg-primary/8 text-primary"
                    : "text-muted hover:bg-surface-subtle hover:text-ink"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-accent" />
                )}
                <Icon
                  size={18}
                  className={cn(
                    "transition-colors flex-shrink-0",
                    active ? "text-primary" : "text-muted group-hover:text-ink"
                  )}
                  strokeWidth={1.75}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer da marca */}
        <div className="px-5 py-4 border-t border-line flex-shrink-0">
          <p className="text-[10px] text-muted/60 font-medium tracking-wide leading-relaxed">
            Casa Fassi · Ecossistema de Embaixadores
          </p>
        </div>
      </aside>
    </>
  );
}
