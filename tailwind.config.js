/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: '"Roboto Condensed", sans-serif',
      backgroundImage: {
        'backgrodund-img': 'url("/background.webp")'
      }
    },
    colors: {
      'primary': '#0E2B8D',
      'hover-color': '#465481',
      'pressed': '#001452',
      'inactive': '#BDBDBD',
      'success-color': '#37B230',
      'warning-color': '#FBC756',
      'error-color': '#D70D2C',
      'error-color-secondary': '#FF5574',
      'white': '#FFFFFF',
      'white-secondary': '#FAFAFA',
      'black': '#000000',
      'gray': '#7E7E7E'
    }
  },
  plugins: [],
}

