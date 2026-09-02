"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  src: string;
  alt: string;
};

const slides: Slide[] = [
  {
    src: "/images/hero/marken-hero-01.webp",
    alt: "Casa Fassi — Uma casa para quem transforma enxoval em experiência",
  },
  {
    src: "/images/hero/marken-hero-02.webp",
    alt: "Universidade Marken Fassi — Conhecimento que inspira excelência",
  },
  {
    src: "/images/hero/marken-hero-03.webp",
    alt: "Casa Fassi — Relacionamento que gera valor. Experiência que fortalece parcerias.",
  },
];

const AUTOPLAY_MS = 7000;
const TRANSITION_MS = 700;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detectar prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    intervalRef.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, reducedMotion, next, current]);

  // Pausar quando aba não visível
  useEffect(() => {
    const handler = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Touch / swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label="Banners Casa Fassi"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
    >
      {/* Container com aspect ratio controlado */}
      <div className="relative w-full" style={{ aspectRatio: "16 / 9", maxHeight: "88vh" }}>
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transitionDuration: reducedMotion ? "0ms" : `${TRANSITION_MS}ms`,
              pointerEvents: i === current ? "auto" : "none",
              zIndex: i === current ? 2 : 1,
            }}
            aria-hidden={i !== current}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}`}
          >
            <img
              src={slide.src}
              alt={i === current ? slide.alt : ""}
              width={1717}
              height={916}
              fetchPriority={i === 0 ? "high" : "low"}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover object-center"
              style={{
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>

      {/* Setas laterais (desktop, hover) */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-ink/30 backdrop-blur-sm text-surface/80 hover:bg-ink/50 hover:text-surface opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300"
        style={{ opacity: 0 }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseOut={(e) => (e.currentTarget.style.opacity = "0")}
      >
        <ChevronLeft size={20} strokeWidth={1.75} />
      </button>
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-ink/30 backdrop-blur-sm text-surface/80 hover:bg-ink/50 hover:text-surface opacity-0 transition-all duration-300"
        style={{ opacity: 0 }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseOut={(e) => (e.currentTarget.style.opacity = "0")}
      >
        <ChevronRight size={20} strokeWidth={1.75} />
      </button>

      {/* Indicadores discretos */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            aria-current={i === current}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 6,
              height: 6,
              backgroundColor: i === current ? "rgba(184, 154, 106, 0.9)" : "rgba(248, 246, 241, 0.4)",
            }}
          />
        ))}
      </div>

      {/* Overlay sutil no topo para o header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-ink/40 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
