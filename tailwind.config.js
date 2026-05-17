/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        acid: '#B6FF00',
        ink: '#050505',
        fog: '#F2F2F0',
        concrete: '#D9D9D4',
      },
      fontFamily: {
        display: ['Inter Tight', 'Arial Narrow', 'Arial', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '-0.08em',
      },
      boxShadow: {
        brutal: '8px 8px 0 #050505',
      },
    },
  },
  plugins: [],
};
