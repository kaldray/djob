/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        djob: "#110066",
        neoBlue: "#87CEEB",
      },
      boxShadow: {
        neoB: "4px 6px 0 #000",
        "neoB-hover": "6px 8px 0 #000",
      },
      transitionProperty: {
        fill: "fill",
      },
      fontFamily: {
        archivo: ['"Archivo Black"', "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 1s 1",
      },
    },
  },
  plugins: [],
};
