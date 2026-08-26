/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          green: "#138808", // Indian Green (Softer)
          light: "#008272", // Teal
          yellow: "#FF9933", // Indian Saffron (Softer)
          brown: "#000080", // Navy Blue
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
