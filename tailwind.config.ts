import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F8F6F1",
        surface: "#FFFFFF",
        "surface-subtle": "#F2EEE7",
        ink: {
          DEFAULT: "#1F1C18",
          soft: "#3D3833",
        },
        muted: "#706A62",
        primary: {
          DEFAULT: "#7C6041",
          hover: "#674D33",
          light: "#9A7A56",
        },
        accent: {
          DEFAULT: "#B89A6A",
          dark: "#9A7E50",
          light: "#D4BC8E",
        },
        line: "#E7E0D7",
        card: "#FFFFFF",
        sage: "#6B7A5E",
        terra: "#A47864",
        success: "#6B7A5E",
        warning: "#B8860B",
        danger: "#9E3B3B",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(31,28,24,0.04), 0 1px 2px rgba(31,28,24,0.03)",
        card: "0 2px 8px rgba(31,28,24,0.05), 0 1px 3px rgba(31,28,24,0.04)",
        elevated: "0 8px 24px rgba(31,28,24,0.08), 0 2px 8px rgba(31,28,24,0.05)",
        hover: "0 12px 32px rgba(31,28,24,0.10), 0 4px 12px rgba(31,28,24,0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.97)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};

export default config;
