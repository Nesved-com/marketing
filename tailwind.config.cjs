/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          primaryDark: '#1D4FCE',
          primaryLight: '#35BDE7',
          secondary: '#35BDE7',
          secondaryDark: '#8A6A2F',
          background: '#FFFFFF',
          surface: '#FBF8F2',
          text: '#1A1206',
          textMuted: '#6B5A3A',
          border: 'rgba(29,79,206,.18)',
        },
      },
      boxShadow: {
        soft: '0 16px 44px -18px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1D4FCE 0%, #2563EB 52%, #35BDE7 100%)',
      },
    },
  },
  plugins: [],
};
