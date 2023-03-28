module.exports = {
  keyframes: {
    "outro-fade-scale": {
      "0%": {
        opacity: 100,
        transform: "scale(1)",
      },
      "100%": {
        opacity: 0,
        transform: "scale(0.96)",
      },
    },
    "intro-fade-scale": {
      "0%": {
        opacity: 0,
        transform: "scale(0.96)",
      },
      "100%": {
        opacity: 100,
        transform: "scale(1)",
      },
    },
  },
  animation: {
    "intro-fade-scale": "intro-fade-scale 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
    "outro-fade-scale": "outro-fade-scale 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
  },
};
