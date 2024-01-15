/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bar: '#1E7900',
        primary: '#CCCABD',
        bg_menu: '#212121',
        accent: '#EDF30D',
        accent2: '#1E7900'
      }
    }
  },
  plugins: []
}
