/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        siteBg: '#F0EBE1',
        borderColor: '#C0BCB3',
        btnBg: '#B3B0A8'
      },
    },
  },
  plugins: [],
}