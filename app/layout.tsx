import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  preload: false,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Casa Fassi — Ecossistema de Embaixadores Marken Fassi",
    template: "%s — Casa Fassi",
  },
  description:
    "Plataforma de capacitação, reconhecimento e comunidade para embaixadores da Marken Fassi. Universidade, conteúdos, certificados e benefícios para a rede comercial.",
  openGraph: {
    title: "Casa Fassi — Ecossistema de Embaixadores Marken Fassi",
    description:
      "Plataforma de capacitação, reconhecimento e comunidade para embaixadores da Marken Fassi.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F6F1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
