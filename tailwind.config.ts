import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: '#0D4A35',
          DEFAULT: '#0B3D2E', // Deep Forest Green
          dark: '#072C21',
        },
        accent: {
          light: '#F0C040',
          DEFAULT: '#C9A84C', // Rich Gold
          dark: '#8B6914',
        },
        card: {
          light: '#1A5C45',
          DEFAULT: '#0F4A38',
        },
        cream: '#F5F0E8',
        softGold: '#D4AF6A',
      },
      fontFamily: {
        tamil: ['var(--font-catamaran)', 'var(--font-mukta)', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #C9A84C, #F0C040, #8B6914)',
        'parchment-tex': 'url("/textures/parchment.png")',
        'chalkboard-tex': 'url("/textures/chalkboard.png")',
      },
    },
  },
  plugins: [],
};
export default config;
