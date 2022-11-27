/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      header: ['Prompt', 'sans-serif'],
      main: ['DM Sans', 'sans-serif'],
    },
    colors: {
      primary: '#08081E',
      secondary: '#D9D9D9',
      texts: 'rgba(255, 255, 255, 1)',
      highlight:
        'rgba(57, 64, 222, 1) rgba(143, 0, 255, 1) rgba(149, 57, 222, 1)',
      white: '#FFFFFF',
      black: '#000000',
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
}
