/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#4ade80', // Tailwind green-400
        secondary: '#38b2ac', // Tailwind teal-500
      },
    },
  },
  plugins: [],
}

