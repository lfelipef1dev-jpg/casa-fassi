"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Camera,
  Store,
  User,
} from "lucide-react";
import { LogoFull } from "@/components/Logo";
import { useGameStore } from "@/lib/store";

const funcoes = [
  "Lojista",
  "Vendedor(a)",
  "Representante",
  "Gerente",
  "Outro",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { completarOnboarding, onboardingCompleto } = useGameStore();
  const [step, setStep] = useState(0);
  const [nome, setNome] = useState("Ana");
  const [loja, setLoja] = useState("Casa Marken Fassi — São Paulo");
  const [funcao, setFuncao] = useState("Vendedor(a)");
  const [photo, setPhoto] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onboardingCompleto) {
      router.push("/app");
    }
  }, [onboardingCompleto, router]);

  const podeAvancar = step === 0 ? nome.trim() && loja.trim() : funcao !== "";

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFinalizar = () => {
    completarOnboarding(nome, loja, funcao);
    router.push("/app");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1B3D2A 0%, #2A5640 50%, #1B3D2A 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <LogoFull theme="dark" height={44} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-2xl shadow-2xl border border-line overflow-hidden"
        >
          <div className="h-1 bg-line">
            <motion.div
              className="h-full bg-gradient-to-r from-brand to-brand-light"
              animate={{ width: step === 0 ? "50%" : "100%" }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* Step 0: Perfil */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <p className="text-accent-dark text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                      Passo 1 de 2
                    </p>
                    <h2 className="font-serif text-2xl font-semibold text-ink mb-1">
                      Bem-vindo à Casa Marken Fassi
                    </h2>
                    <p className="text-sm text-muted">
                      Conte-nos um pouco sobre você para personalizar sua jornada.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Upload de foto */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="w-20 h-20 rounded-full bg-bg border-2 border-line hover:border-brand flex items-center justify-center overflow-hidden transition-all"
                      >
                        {photo ? (
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Camera size={24} className="text-muted" />
                        )}
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto}
                        className="hidden"
                      />
                      <p className="text-xs text-muted mt-2">Anexe uma foto (opcional)</p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">
                        Seu nome
                      </label>
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Como você gosta de ser chamado?"
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-sm text-ink outline-none focus:border-brand transition-colors"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted uppercase tracking-wide block mb-2">
                        Sua loja
                      </label>
                      <input
                        type="text"
                        value={loja}
                        onChange={(e) => setLoja(e.target.value)}
                        placeholder="Onde você trabalha?"
                        className="w-full bg-bg border border-line rounded-xl px-4 py-3 text-sm text-ink outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => nome.trim() && loja.trim() && setStep(1)}
                    disabled={!nome.trim() || !loja.trim()}
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-light text-card px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                  >
                    Continuar
                    <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* Step 1: Função */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <p className="text-accent-dark text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                      Passo 2 de 2
                    </p>
                    <h2 className="font-serif text-2xl font-semibold text-ink mb-1">
                      Qual é a sua função?
                    </h2>
                    <p className="text-sm text-muted">
                      Isso nos ajuda a sugerir os conteúdos certos para você.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {funcoes.map((f) => {
                      const selecionado = funcao === f;
                      return (
                        <button
                          key={f}
                          onClick={() => setFuncao(f)}
                          className={`w-full p-4 rounded-xl flex items-center gap-3 text-left transition-all border ${
                            selecionado
                              ? "border-brand bg-brand/5"
                              : "border-line bg-bg hover:border-brand/40"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                              selecionado ? "bg-brand text-card" : "bg-brand/10 text-brand"
                            }`}
                          >
                            <User size={20} />
                          </div>
                          <span className="flex-1 text-sm font-medium text-ink">{f}</span>
                          {selecionado ? (
                            <Sparkles size={18} className="text-brand flex-shrink-0" />
                          ) : (
                            <ChevronRight size={18} className="text-muted flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(0)}
                      className="inline-flex items-center justify-center gap-1 bg-transparent text-muted hover:text-ink px-4 py-3 rounded-xl font-medium text-sm border border-line transition-all"
                    >
                      <ChevronLeft size={16} />
                      Voltar
                    </button>
                    <button
                      onClick={handleFinalizar}
                      disabled={!funcao}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-light text-card px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                    >
                      <Sparkles size={18} />
                      Entrar na Casa Marken Fassi
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-accent" : i < step ? "w-4 bg-accent/50" : "w-4 bg-card/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
