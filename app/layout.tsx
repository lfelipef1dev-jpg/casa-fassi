import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const SITE_URL = "https://marken.expostacker.com.br";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Casa Fassi — Ecossistema de Embaixadores Marken Fassi",
    template: "%s — Casa Fassi",
  },
  description:
    "Plataforma de capacitação, reconhecimento e comunidade para embaixadores da Marken Fassi. Universidade, conteúdos, certificados e benefícios para a rede comercial.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Casa Fassi — Ecossistema de Embaixadores Marken Fassi",
    description:
      "Plataforma de capacitação, reconhecimento e comunidade para embaixadores da Marken Fassi.",
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Casa Fassi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Casa Fassi — Ecossistema de Embaixadores Marken Fassi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Fassi — Ecossistema de Embaixadores Marken Fassi",
    description:
      "Plataforma de capacitação, reconhecimento e comunidade para embaixadores da Marken Fassi.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
