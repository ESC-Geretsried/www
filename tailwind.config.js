const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        blue: "#223550",
        gold: "#A8803B",

        gray: "rgba(255, 255, 255, 0.87)",
        "gray:transparent": "rgba(255, 255, 255, 0.5)",
        "gray:dark": "#6B6B6B",

        white: "#fff",
        black: "#0B0B0B",
        ice: "rgba(255, 255, 255, 0.87)",
      },
      fontFamily: {
        sans: ["PTSans", ...defaultTheme.fontFamily.sans],
        rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        maxContainer: "75rem",
        navbar: "4rem",
      },

      gridTemplateColumns: {
        main: "2fr 10fr",
      },
    },
  },
  plugins: [],
};
