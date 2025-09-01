/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', 'App.vue','Navbar.vue', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c3aed', // violet
          dark: '#5b21b6',
          light: '#a78bfa',
        },
        secondary: {
          DEFAULT: '#22c55e', // vert
          dark: '#15803d',
          light: '#86efac',
        },
        // Optionnel : override green et purple pour fallback
        green: {
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        purple: {
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
        },
      },
      fontFamily:{
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
   variants: {
    extend: {},
  },
  plugins: [],
}

