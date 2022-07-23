module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1rem',
          xl: '1rem',
          '2xl': '1rem',
        },
      },
      colors: {
        primary: '#D8E2DC',
        secondary: '#D8E2DC',
        light: '#383838',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        serif: ['Alegreya', 'serif']
      }
    },
  },
  plugins: [],
}