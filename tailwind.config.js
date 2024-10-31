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
        poppins: "Poppins, sans-serif",
      },

      colors: {
        primary: "#23232C",
      },
      cursor: {
        test: "url(https://icons.iconarchive.com/icons/github/octicons/48/x-24-icon.png), pointer",
      },
    },
  },
  plugins: [],
};
