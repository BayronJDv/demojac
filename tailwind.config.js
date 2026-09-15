/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Paleta: mercado gastronómico nocturno — carbón profundo, mango asado, verde hierba fresca
        charcoal: {
          950: '#141311',
          900: '#1C1A17',
          800: '#26221D'
        },
        mango: {
          400: '#FF9A52',
          500: '#FF7A2E',
          600: '#E8621A'
        },
        herb: {
          400: '#7DB36A',
          500: '#5C9A4B'
        },
        cream: '#F4EEE2'
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      },
      height: {
        screen: '100dvh'
      }
    }
  },
  plugins: []
}
