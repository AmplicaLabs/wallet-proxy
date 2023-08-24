/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'sm': { 'max': '767px'},
      'md': { 'min': '768px'},
      'lg': { 'min': '1023px'},
      'xl': { 'min': '1280px'},
    },
    extend: {
      borderRadius: {
        'rounded-3xl': '20px',
        'rounded-md': '5px',
      },
      boxShadow: {
        'md': '0px 4px 7px rgba(0,0,0,.25)',
      },
      backgroundImage: {
        'topRight': 'url(/assets/top-right-bars.png)'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'black': '#222222',
        'white-transparent': 'rgb(254,255,255,.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}

