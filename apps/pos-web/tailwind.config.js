const { settings } = require("tailwindcss-fluid-type/src/config/defaults");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {},
  plugins: [
    require("tailwindcss-fluid-type")({
      settings: {
        fontSizeMin: 1.125,
        fontSizeMax: 1.25,
        ratioMin: 1.125,
        ratioMax: 1.2,
        screenMin: 20,
        screenMax: 96,
        unit: "rem",
        prefix: "",
      },
      values: {
        // ...
        base: 0,
        // ...
      },
      variants: {
        fluidType: ["responsive"],
      },
    }),
  ],
};
