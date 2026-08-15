import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F7F4EF",
        ink: "#1B3D2A",
        brand: {
          DEFAULT: "#1B3D2A",
          light: "#2A5640",
        },
        accent: {
          DEFAULT: "#C9B37C",
          dark: "#A68A4B",
        },
        muted: "#8A8278",
        line: "#E8E2D8",
        card: "#FFFCF7",
        sage: "#7A8B6F",
        terra: "#A47864",
        teal: "#1B3D2A",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "flame": "flame 0.6s ease-in-out infinite alternate",
        "pop": "pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "confetti": "confetti 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.9)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        flame: { "0%": { transform: "scale(1) rotate(-2deg)", opacity: "0.8" }, "100%": { transform: "scale(1.1) rotate(2deg)", opacity: "1" } },
        pop: { "0%": { transform: "scale(0)" }, "50%": { transform: "scale(1.2)" }, "100%": { transform: "scale(1)" } },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
