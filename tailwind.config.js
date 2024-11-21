/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        twitter: {
          blue: "#1da1f2",
          darkBlue: "#0d95e8",
          gray: "#657786",
          lightGray: "#aab8c2",
          lighterGray: "#e1e8ed",
          lime: "#1eac62",
        },
        dark: {
          primary: "#15202b",
          secondary: "#192734",
          accent: "#129c29",
          text: "#ffffff",
          subtext: "#8899a6",
        },
      },
      fontFamily: {
        sans: ['"Montserrat"', "sans-serif"],
      },
      boxShadow: {
        'md-dark': '0 4px 6px rgba(0, 0, 0, 0.5)',
      },
      fontWeight: {
        thin: 200,
        extraBold: 800,
      },
      fontSize: {
        'title': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '800' }],
        'paragraph': ['1rem', { lineHeight: '1.5rem', fontWeight: '200' }],
      },
    },
  },
  plugins: [],
};

