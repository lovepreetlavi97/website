/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C75D68",
          50: "#F7E6E8",
          100: "#F0D2D6",
          200: "#E3ADB3",
          300: "#D8868F",
          400: "#CE746E",
          500: "#C75D68",
          600: "#A04851",
          700: "#7A353D",
          800: "#532329",
          900: "#2B1214",
          950: "#170A0B",
        },
        'primary-light': '#f8e8e0',
        'primary-dark': '#a66a4c',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}