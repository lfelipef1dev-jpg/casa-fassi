import Image from "next/image";

type LogoProps = {
  size?: number;
  variant?: "full" | "mf";
  theme?: "light" | "dark";
  className?: string;
};

const logoMap = {
  full: {
    light: "/brand/marken-fassi/logo-horizontal.webp",
    dark: "/brand/marken-fassi/logo-horizontal.webp",
  },
  mf: {
    light: "/icon-mf.png",
    dark: "/icon-mf.png",
  },
};

// Proporcao real do logo horizontal: 2172x724 (3:1)
const LOGO_RATIO = 2172 / 724;

export function Logo({ size = 40, variant = "mf", theme = "light", className = "" }: LogoProps) {
  const src = logoMap[variant][theme];
  const w = variant === "mf" ? size : size * LOGO_RATIO;
  const h = variant === "mf" ? size : size;

  return (
    <Image
      src={src}
      alt="Casa Fassi — Marken Fassi"
      width={w}
      height={h}
      className={`object-contain ${className}`}
      priority
    />
  );
}

export function LogoFull({ theme = "dark", className = "", height = 44 }: { theme?: "light" | "dark"; className?: string; height?: number }) {
  return (
    <Image
      src="/brand/marken-fassi/logo-horizontal.webp"
      alt="Casa Fassi — Ecossistema de Embaixadores Marken Fassi"
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      className={`object-contain ${className}`}
      style={{ height: `${height}px`, width: "auto" }}
      priority
    />
  );
}
