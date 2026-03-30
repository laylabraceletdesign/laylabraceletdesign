import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          blush: "#F9EDE8",
          sand: "#F4EDE4",
          coral: "#E8856A",
          warm: "#C4634A",
          dark: "#2C1810",
          gray: "#6B5E58",
        },
      },
    },
  },
  plugins: [],
};

export default config;
