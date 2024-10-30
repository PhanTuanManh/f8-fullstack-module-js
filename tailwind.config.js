/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "576px",

      md: "768px",

      lg: "992px",

      xl: "1200px",

      "2xl": "1400px",

      "3xl": "1600px",

      "4xl": "1800px",
    },
    extend: {
      fontFamily: {
        roboto: "Roboto, sans-serif",
        marcel: "Marcellus, serif",
      },
    },
  },
  plugins: [],
};
