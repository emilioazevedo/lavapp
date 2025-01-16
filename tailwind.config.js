/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#581c87',  // You can name this whatever you want
        'custom-dark-purple': '#4a044e',
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
       
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
       }
    
    },
  },
  plugins: [],
}

