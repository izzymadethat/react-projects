/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      title: ["IBM Plex Serif", "serif"],
      text: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
