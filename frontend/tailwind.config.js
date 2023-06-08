/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:  {
        principal: "#006C79",
        secondc: "#F6835F"

      }
    },
  },
  plugins: [],
}