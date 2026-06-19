/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors — Orange Soda primary, dark prussian bg
        primary: {
          50:  '#fff2ee',
          100: '#ffe0d5',
          200: '#ffc1ab',
          300: '#ff9977',
          400: '#ff6b43',
          500: '#f04d22', // orange-soda
          600: '#e03010',
          700: '#bb230c',
          800: '#991f10',
          900: '#7d1e12',
        },
        dark: {
          50:  '#eef2f7',
          100: '#d4dde9',
          200: '#a9bbd3',
          300: '#7e99bd',
          400: '#5377a7',
          500: '#2e558e',
          600: '#1d3a6e',
          700: '#142b55',
          800: '#0d1f3f',  // prussian-blue
          900: '#080f20',  // dark-jungle-green
        },
        accent: {
          green: '#6abf2e',   // yellow-green
          cadet: '#5f7d8a',
          opal:  '#7db3b8',
        },
      },
      fontFamily: {
        sans:    ['Nunito Sans', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 5px 20px 0 rgba(30,55,90,0.10)',
        card2: '0 16px 32px rgba(8,20,44,0.10)',
        glow:  '0 0 30px rgba(240,77,34,0.25)',
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
