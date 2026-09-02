"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Slide = {
  src: string;
  alt: string;
  label: string;
};

const slides: Slide[] = [
  {
    src: "/images/hero/marken-hero-01.webp",
    alt: "Casa Fassi — Uma casa para quem transforma enxoval em experiência",
    label: "Institucional",
  },
  {
    src: "/images/hero/marken-hero-02.webp",
    alt: "Universidade Marken Fassi — Conhecimento que inspira excelência",
    label: "Universidade",
  },
  {
    src: "/images/hero/marken-hero-03.webp",
    alt: "Casa Fassi — Relacionamento que gera valor. Experiência que fortalece parcerias.",
    label: "Experiência",
  },
];

const AUTOPLAY_MS = 7000;
const TRANSITION_MS = 700;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
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

  // Autoplay — 7s, pausa em hover/pause manual/reducedMotion/aba oculta
  const shouldAutoplay = mounted && !isHovering && !isPaused && !reducedMotion;

  useEffect(() => {
    if (!shouldAutoplay) return;

    let timer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timer = setTimeout(() => {
        if (!document.hidden) {
          next();
        }
      }, AUTOPLAY_MS);
    };

    scheduleNext();

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timer);
      } else {
        scheduleNext();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [shouldAutoplay, next, current]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const togglePause = () => {
    setIsPaused((p) => !p);
  };

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-ink group"
      aria-roledescription="carousel"
      aria-label="Banners Casa Fassi"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
    >
      {/* Container responsivo — desktop 16:9, mobile mais alto para preservar texto */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: "16 / 9",
          maxHeight: "88vh",
        }}
      >
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
            aria-label={`${i + 1} de ${slides.length}: ${slide.label}`}
          >
            <img
              src={slide.src}
              alt={i === current ? slide.alt : ""}
              width={1717}
              height={916}
              fetchPriority={i === 0 ? "high" : "low"}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover object-center md:object-cover"
              style={{
                // Mobile: object-fit contain para preservar texto incorporado
                // Desktop: object-fit cover para preencher sem areas vazias
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>

      {/* Setas laterais (desktop, hover no grupo) */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-ink/40 backdrop-blur-sm text-surface/90 hover:bg-ink/60 hover:text-surface transition-all duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ChevronLeft size={22} strokeWidth={1.75} />
      </button>
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-ink/40 backdrop-blur-sm text-surface/90 hover:bg-ink/60 hover:text-surface transition-all duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <ChevronRight size={22} strokeWidth={1.75} />
      </button>

      {/* Controles inferiores — indicadores + pause/play + contador */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            aria-current={i === current}
            className="rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            style={{
              width: i === current ? 28 : 7,
              height: 7,
              backgroundColor: i === current ? "rgba(184, 154, 106, 0.95)" : "rgba(248, 246, 241, 0.45)",
            }}
          />
        ))}
      </div>

      {/* Botão pause/play explícito */}
      <button
        onClick={togglePause}
        aria-label={isPaused ? "Retomar apresentação" : "Pausar apresentação"}
        className="absolute bottom-4 right-6 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-ink/40 backdrop-blur-sm text-surface/80 hover:bg-ink/60 hover:text-surface transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:opacity-0 md:group-hover:opacity-100"
        style={{ opacity: 1 }}
      >
        {isPaused ? <Play size={16} strokeWidth={2} /> : <Pause size={16} strokeWidth={2} />}
      </button>

      {/* Contador 01/03 — movido para nao sobrepor o botao pause */}
      <div className="absolute bottom-5 right-20 z-20 text-surface/60 text-xs font-medium tracking-wider tabular-nums hidden md:block">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Overlay sutil no topo para o header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-ink/50 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
