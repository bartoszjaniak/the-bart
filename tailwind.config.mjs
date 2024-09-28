/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        wave: "wave 4s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "5%": { transform: "rotate(14deg)" },
          "10%": { transform: "rotate(-8deg)" },
          "15%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-4deg)" },
          "25%": { transform: "rotate(10deg)" },
          "30%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
