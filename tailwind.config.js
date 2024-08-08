/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumnsColumn: {
        card: "repeat(auto-fit, minmax(0px, 1fr))",
      },
      colors: {
        djob: "#110066",
        neoBlue: "#87CEEB",
      },
      boxShadow: {
        neoB: "4px 6px 0 #000",
        "neoB-hover": "6px 8px 0 #000",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(15deg)" },
        },
      },
      transitionProperty: {
        fill: "fill",
      },
      fontFamily: {
        archivo: ['"Archivo Black"', "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 1s 1",
        wiggle: "wiggle 0.3s 1",
      },
    },
  },
  plugins: [],
};
