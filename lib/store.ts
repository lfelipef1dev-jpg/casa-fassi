"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "./types";
import { verificarSelosConquistados } from "./selos";
import { getAulasTrilhaProduto, getAulasTrilhaVendas } from "./cursos";

type VitrineFoto = {
  id: string;
  url: string;
  legenda: string;
  data: string;
  curtidas: number;
  comentarios: { id: string; autor: string; texto: string; data: string }[];
};

type CasaState = {
  onboardingCompleto: boolean;
  nome: string;
  loja: string;
  cidade: string;
  funcao: string;
  photo: string;
  role: UserRole;
  licoesConcluidas: string[];
  aulasConcluidas: string[];
  aulasSalvas: string[];
  anotacoes: Record<string, string>;
  videosSalvos: string[];
  postsCurtidos: string[];
  horasAssistidas: number;
  selosConquistados: string[];
  livesAssistidas: number;
  indicacoes: number;
  fotosVitrine: VitrineFoto[];
  vitrinesCurtidas: string[];

  completarOnboarding: (nome: string, loja: string, funcao: string) => void;
  setCidade: (cidade: string) => void;
  setPhoto: (photo: string) => void;
  concluirLicao: (licaoId: string) => void;
  concluirAula: (aulaId: string, duracaoMin?: number) => void;
  toggleAulaSalva: (aulaId: string) => void;
  setAnotacao: (aulaId: string, texto: string) => void;
  toggleVideoSalvo: (videoId: string) => void;
  toggleCurtir: (postId: string) => void;
  registrarLiveAssistida: () => void;
  registrarIndicacao: () => void;
  adicionarFotoVitrine: (url: string, legenda: string) => void;
  adicionarComentarioVitrine: (fotoId: string, texto: string) => void;
  toggleVitrineCurtida: (fotoId: string) => void;
  setRole: (role: UserRole) => void;
  reset: () => void;
};

function atualizarSelos(s: CasaState): Partial<CasaState> {
  const modulosConcluidos = s.aulasConcluidas.length;
  const perfilCompleto = !!(s.nome && s.loja && s.cidade && s.photo);

  const idsProduto = getAulasTrilhaProduto();
  const idsVendas = getAulasTrilhaVendas();
  const feitasProduto = idsProduto.filter((id) => s.aulasConcluidas.includes(id)).length;
  const feitasVendas = idsVendas.filter((id) => s.aulasConcluidas.includes(id)).length;
  const trilhaProdutoCompleta = idsProduto.length > 0 && feitasProduto === idsProduto.length;
  const trilhaVendasCompleta = idsVendas.length > 0 && feitasVendas === idsVendas.length;

  const selos = verificarSelosConquistados({
    modulosConcluidos,
    perfilCompleto,
    fotosVitrine: s.fotosVitrine.length,
    livesAssistidas: s.livesAssistidas,
    indicacoes: s.indicacoes,
    trilhaProdutoCompleta,
    trilhaVendasCompleta,
  });

  const novosSelos = selos.filter((id) => !s.selosConquistados.includes(id));
  if (novosSelos.length > 0) {
    return { selosConquistados: [...s.selosConquistados, ...novosSelos] };
  }
  return {};
}

export const useGameStore = create<CasaState>()(
  persist(
    (set) => ({
      onboardingCompleto: false,
      nome: "",
      loja: "",
      cidade: "",
      funcao: "",
      photo: "",
      role: "lojista",
      licoesConcluidas: ["prod-1", "prod-2", "cama-1"],
      aulasConcluidas: ["emf-m1-a1", "emf-m1-a2", "tf-m1-a1"],
      aulasSalvas: [],
      anotacoes: {},
      videosSalvos: [],
      postsCurtidos: [],
      horasAssistidas: 0.5,
      selosConquistados: ["boas-vindas", "toalha-rosto", "toalha-banho"],
      livesAssistidas: 0,
      indicacoes: 0,
      fotosVitrine: [],
      vitrinesCurtidas: [],

      completarOnboarding: (nome, loja, funcao) => {
        set({ onboardingCompleto: true, nome, loja, funcao });
      },

      setCidade: (cidade) => {
        set((s) => {
          const updates = { cidade } as Partial<CasaState>;
          const selosUpdate = atualizarSelos({ ...s, ...updates } as CasaState);
          return { ...updates, ...selosUpdate };
        });
      },

      setPhoto: (photo) => {
        set((s) => {
          const updates = { photo } as Partial<CasaState>;
          const selosUpdate = atualizarSelos({ ...s, ...updates } as CasaState);
          return { ...updates, ...selosUpdate };
        });
      },

      concluirLicao: (licaoId) => {
        set((s) => {
          if (s.licoesConcluidas.includes(licaoId)) return s;
          return { licoesConcluidas: [...s.licoesConcluidas, licaoId] };
        });
      },

      concluirAula: (aulaId, duracaoMin) => {
        set((s) => {
          const jaConcluida = s.aulasConcluidas.includes(aulaId);
          const updates: Partial<CasaState> = {};
          if (!jaConcluida) {
            updates.aulasConcluidas = [...s.aulasConcluidas, aulaId];
          }
          if (duracaoMin) {
            updates.horasAssistidas = s.horasAssistidas + duracaoMin / 60;
          }
          const merged = { ...s, ...updates } as CasaState;
          const selosUpdate = atualizarSelos(merged);
          return { ...updates, ...selosUpdate };
        });
      },

      toggleAulaSalva: (aulaId) => {
        set((s) => {
          if (s.aulasSalvas.includes(aulaId)) {
            return { aulasSalvas: s.aulasSalvas.filter((a) => a !== aulaId) };
          }
          return { aulasSalvas: [...s.aulasSalvas, aulaId] };
        });
      },

      setAnotacao: (aulaId, texto) => {
        set((s) => ({ anotacoes: { ...s.anotacoes, [aulaId]: texto } }));
      },

      toggleVideoSalvo: (videoId) => {
        set((s) => {
          if (s.videosSalvos.includes(videoId)) {
            return { videosSalvos: s.videosSalvos.filter((v) => v !== videoId) };
          }
          return { videosSalvos: [...s.videosSalvos, videoId] };
        });
      },

      toggleCurtir: (postId) => {
        set((s) => {
          if (s.postsCurtidos.includes(postId)) {
            return { postsCurtidos: s.postsCurtidos.filter((p) => p !== postId) };
          }
          return { postsCurtidos: [...s.postsCurtidos, postId] };
        });
      },

      registrarLiveAssistida: () => {
        set((s) => {
          const updates = { livesAssistidas: s.livesAssistidas + 1 } as Partial<CasaState>;
          const selosUpdate = atualizarSelos({ ...s, ...updates } as CasaState);
          return { ...updates, ...selosUpdate };
        });
      },

      registrarIndicacao: () => {
        set((s) => {
          const updates = { indicacoes: s.indicacoes + 1 } as Partial<CasaState>;
          const selosUpdate = atualizarSelos({ ...s, ...updates } as CasaState);
          return { ...updates, ...selosUpdate };
        });
      },

      adicionarFotoVitrine: (url, legenda) => {
        set((s) => {
          const foto: VitrineFoto = {
            id: `vf-${Date.now()}`,
            url,
            legenda,
            data: new Date().toLocaleDateString("pt-BR"),
            curtidas: 0,
            comentarios: [],
          };
          const updates = { fotosVitrine: [foto, ...s.fotosVitrine] } as Partial<CasaState>;
          const selosUpdate = atualizarSelos({ ...s, ...updates } as CasaState);
          return { ...updates, ...selosUpdate };
        });
      },

      adicionarComentarioVitrine: (fotoId, texto) => {
        set((s) => ({
          fotosVitrine: s.fotosVitrine.map((f) =>
            f.id === fotoId
              ? { ...f, comentarios: [...f.comentarios, { id: `c-${Date.now()}`, autor: s.nome || "Lojista", texto, data: new Date().toLocaleDateString("pt-BR") }] }
              : f
          ),
        }));
      },

      toggleVitrineCurtida: (fotoId) => {
        set((s) => {
          if (s.vitrinesCurtidas.includes(fotoId)) {
            return { vitrinesCurtidas: s.vitrinesCurtidas.filter((v) => v !== fotoId) };
          }
          return { vitrinesCurtidas: [...s.vitrinesCurtidas, fotoId] };
        });
      },

      setRole: (role) => set({ role }),

      reset: () => {
        set({
          onboardingCompleto: false,
          nome: "",
          loja: "",
          cidade: "",
          funcao: "",
          photo: "",
          role: "lojista",
          licoesConcluidas: [],
          aulasConcluidas: [],
          aulasSalvas: [],
          anotacoes: {},
          videosSalvos: [],
          postsCurtidos: [],
          horasAssistidas: 0,
          selosConquistados: [],
          livesAssistidas: 0,
          indicacoes: 0,
          fotosVitrine: [],
          vitrinesCurtidas: [],
        });
      },
    }),
    { name: "casa-marken-fassi-store" }
  )
);
