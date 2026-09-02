"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Library,
  Users,
  Gift,
  Award,
  Bot,
  User,
  ChevronLeft,
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

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface border-r border-line z-50 flex flex-col transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Navegação principal"
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-line flex-shrink-0">
          <Link href="/app" onClick={onClose} aria-label="Página inicial">
            <LogoFull theme="light" height={30} />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-muted hover:text-ink p-1 rounded-lg hover:bg-surface-subtle transition-colors"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-line flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-full bg-primary/10 border border-line flex items-center justify-center overflow-hidden flex-shrink-0">
              {photo ? (
                <img src={photo} alt={`Foto de ${nome || "participante"}`} width={44} height={44} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              ) : (
                <Camera size={16} className="text-muted" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink truncate">
                {nome || "Participante"}
              </div>
              <div className="text-xs text-muted truncate">{funcao || "Embaixador"}</div>
            </div>
          </div>
          {loja && (
            <p className="text-xs text-muted/80 pl-14 -mt-1 truncate">{loja}</p>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto no-scrollbar" aria-label="Menu principal">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-primary/8 text-primary"
                    : "text-muted hover:bg-surface-subtle hover:text-ink"
                )}
              >
                <Icon size={18} className={active ? "text-primary" : "text-muted"} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-line flex-shrink-0">
          <p className="text-[10px] text-muted/60 font-medium tracking-wide">
            Casa Fassi · Ecossistema de Embaixadores
          </p>
        </div>
      </aside>
    </>
  );
}
