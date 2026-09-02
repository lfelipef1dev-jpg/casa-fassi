import Image from "next/image";

type LogoProps = {
  size?: number;
  variant?: "full" | "mf";
  theme?: "light" | "dark";
  className?: string;
};

const logoMap = {
  full: {
    light: "/logo-casa-fassi.png",
    dark: "/logo-casa-fassi.png",
  },
  mf: {
    light: "/icon-mf.png",
    dark: "/icon-mf.png",
  },
};

export function Logo({ size = 40, variant = "mf", theme = "light", className = "" }: LogoProps) {
  const src = logoMap[variant][theme];
  const w = variant === "mf" ? size : size * 3.2;
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
      src="/logo-casa-fassi.png"
      alt="Casa Fassi — Ecossistema de Embaixadores Marken Fassi"
      width={height * 3}
      height={height}
      className={`object-contain ${className}`}
      style={{ height: `${height}px`, width: "auto" }}
      priority
    />
  );
}
