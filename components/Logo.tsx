import Image from "next/image";

type LogoProps = {
  size?: number;
  variant?: "full" | "mf";
  theme?: "light" | "dark";
  className?: string;
};

const logoMap = {
  full: {
    light: "/logo-verde-escuro.png",
    dark: "/logo-branco.png",
  },
  mf: {
    light: "/logo-mf-verde-escuro.png",
    dark: "/logo-mf-verde-escuro.png",
  },
};

export function Logo({ size = 40, variant = "mf", theme = "light", className = "" }: LogoProps) {
  const src = logoMap[variant][theme];
  const w = variant === "mf" ? size : size * 3.2;
  const h = variant === "mf" ? size : size;

  return (
    <Image
      src={src}
      alt="Marken Fassi"
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
      src={theme === "light" ? "/logo-verde-escuro.png" : "/logo-branco.png"}
      alt="Marken Fassi"
      width={height * 5.6}
      height={height}
      className={`object-contain ${className}`}
      style={{ height: `${height}px`, width: "auto" }}
      priority
    />
  );
}
