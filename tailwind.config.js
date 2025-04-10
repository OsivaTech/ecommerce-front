// filepath: f:\web\lsinjectable\tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        app: {
          text: '#121417',
          primary: '#F0F2F5',
        },
        gray: {
          100: '#ffffff',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        customGray: {
          50: '#f5f7fa',
          100: '#e4e8ed',
          200: '#c9d1d9',
          300: '#aebac5',
          400: '#93a3b1',
          500: '#788c9d',
          600: '#637587', // Base color
          700: '#4e5e6f',
          800: '#394757',
          900: '#242f3f',
        },
      },
    },
  },
  mode: 'jit',
  plugins: [require('tailwindcss-animate')],
}
