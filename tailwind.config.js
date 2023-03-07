const animations = require("./src/theme/animations.js");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...animations,
      fontFamily: {
        "radio-canada": ['"Radio Canada"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
