/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#102A43',
          500: '#18A999',
          050: '#E8F8F4',
        },
        info100: '#C8E8EF',
        surface: {
          000: '#FFFFFF',
          050: '#F8FBFA',
        },
        accent: '#E9DFFF',
        success: '#35B87A',
        warning: '#F4C95D',
        error: '#D9534F',
        information: '#4FB3BF',
        dark: {
          bg: '#102A43',
          surface: '#17324D',
          primary: '#35C8B5',
          text: '#FFFFFF',
          secondary: '#C8E8EF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '999px',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
      },
    },
  },
  plugins: [],
}
