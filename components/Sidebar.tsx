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
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-line z-50 flex flex-col transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-line">
          <LogoFull theme="light" height={32} />
          <button onClick={onClose} className="lg:hidden text-muted hover:text-ink">
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-line">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-full bg-brand/10 border border-line flex items-center justify-center overflow-hidden flex-shrink-0">
              {photo ? (
                <img src={photo} alt="" className="w-full h-full object-cover" />
              ) : (
                <Camera size={16} className="text-muted" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink truncate">
                {nome || "Participante"}
              </div>
              <div className="text-xs text-muted truncate">{funcao || "Lojista"}</div>
            </div>
          </div>
          {loja && (
            <p className="text-xs text-muted/80 pl-14 -mt-1">{loja}</p>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
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
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-brand/10 text-ink"
                    : "text-muted hover:bg-brand/5 hover:text-ink"
                )}
              >
                <Icon size={18} className={active ? "text-brand" : ""} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
