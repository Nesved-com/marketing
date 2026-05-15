/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          primaryDark: '#12345F',
          primaryLight: '#35BDE7',
          secondary: '#19B6C8',
          secondaryDark: '#0E8EA4',
          background: '#F4F8FC',
          surface: '#FFFFFF',
          text: '#102A4C',
          textMuted: '#6B7C93',
          border: '#D7E3EF',
        },
      },
      boxShadow: {
        soft: '0 16px 44px -18px rgba(18, 52, 95, 0.32)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #12345F 0%, #2563EB 52%, #19B6C8 100%)',
      },
    },
  },
  plugins: [],
};
