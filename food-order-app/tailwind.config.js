module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFF9E6',
          100: '#FFEDB3',
          200: '#FFE180',
          300: '#FFD54D',
          400: '#FFC926',
          500: '#D4AF37', // Primary gold
          600: '#B38C00',
          700: '#806A00',
          800: '#4D4000',
          900: '#1A1500',
        },
        black: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#9E9E9E',
          400: '#757575',
          500: '#616161',
          600: '#424242',
          700: '#212121',
          800: '#121212', // Primary black
          900: '#000000',
        }
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.4)',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}