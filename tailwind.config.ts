import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // La landing reprend exactement le rendu validé (reset navigateur par défaut),
  // donc on n'applique pas le reset Tailwind.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#2E2420", soft: "#6B5952" },
        cream: "#FFFBF8",
        blush: { DEFAULT: "#FBEEEF", deep: "#F6E0E3" },
        line: { DEFAULT: "#EFDFE1", strong: "#E4CBCF" },
        rose: { DEFAULT: "#B3445C", dark: "#96364C" },
        gold: "#C98B6B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
