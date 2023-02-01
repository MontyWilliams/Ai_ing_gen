/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      fontFamily: {
        Bungee: ['Bungee Shade'],
        inter: ['Inter var', 'sans-serif'],
        fredricka: ['Fredericka the Great'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
      backgroundImage: {
        'tulsa': "url('/public/assets/tulsa-oklahoma.gif')",
      },
    },
  },
  plugins: [],
};
