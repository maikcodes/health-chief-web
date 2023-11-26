/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        biscay: {
          50: '#f0f5fe',
          100: '#dde9fc',
          200: '#c3d9fa',
          300: '#9ac1f6',
          400: '#6aa0f0',
          500: '#477eea',
          600: '#3260de',
          700: '#294dcc',
          800: '#273fa6',
          900: '#1f306e',
          950: '#1b2550'
        },
        plum: {
          50: '#fdf6fb',
          100: '#faedf8',
          200: '#f4daef',
          300: '#ebbce0',
          400: '#de94cb',
          500: '#cb6ab3',
          600: '#ae4b93',
          700: '#8f3b76',
          800: '#763261',
          900: '#622d51',
          950: '#3e1430'
        }
      }
    }
  },
  plugins: []
  // darkMode: 'class',
}
