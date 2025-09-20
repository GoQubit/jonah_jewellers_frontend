/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand:'#E8A83E',
        brandDark:'#e6981a',
        brandLight:'#f4b64e',
        primary:'#F59E0B',
        primaryLight: '#FCD34D',
        primaryDark: '#D97706',
        secondary: '#F59E0B',
        secondaryLight: '#FCD34D',
        secondaryDark: '#D97706',
        accent: '#F59E0B',
        accentLight: '#FCD34D',
        accentDark: '#D97706',
        grayLight:'#DFDFDF',
        grayDark:'#757575'
      },
      fontFamily: {
        besley: ['Besley', 'sans-serif', 'cursive'],
        nunito: ['Nunito Sans', 'serif', 'cursive'],
        epilogue: ['Epilogue', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif','cursive' ],
      },
      screens: {
        '230': '230px',
        '250': '250px',
        '272': '272px',
        '300': '300px',
        '350': '350px',
        '360': '360px',
        '380': '380px',
        '389': '389px',
        'tsm': '365px',
        '400': '400px',
        '426': '426px',
        '480': '480px',
        '500': '500px',
        '609': '609px',
        'sm': '640px',
        'md': '768px',
        '800': '800px',
        '2md': '950px',
        'lg': '1024px',
        '1070': '1070px',
        'mid': '1120px',
        '1200': '1200px',
        'xl': '1280px',
        '1370': '1370px',
        '1400': '1400px',
        '2xl': '1536px'
    }
    },
  },
  plugins: [],
};
