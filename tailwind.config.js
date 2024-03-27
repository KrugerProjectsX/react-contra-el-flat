/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  important: '#root',
  theme: {
    extend: {
      colors: {
        'bg-greenish-gray-600': '#6D9773',
        'bg-dark-green-900': '#0C3B2E',
        'bg-tan-600': '#BB8A52',
        'bg-sunflower-500': '#FFBA00',
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight: false,
  }
}

