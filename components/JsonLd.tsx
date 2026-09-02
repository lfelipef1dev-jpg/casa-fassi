import type { Metadata } from "next";

const SITE_URL = "https://casafassi.expostacker.com.br";

const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Casa Fassi — Marken Fassi",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/marken-fassi/logo-horizontal.webp`,
  description:
    "Plataforma de capacitação, reconhecimento e comunidade para embaixadores da Marken Fassi.",
  sameAs: [],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Casa Fassi — Ecossistema de Embaixadores Marken Fassi",
  description:
    "Plataforma de capacitação, reconhecimento e comunidade para embaixadores da Marken Fassi.",
  inLanguage: "pt-BR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [organizationSchema, websiteSchema],
        }),
      }}
    />
  );
}
