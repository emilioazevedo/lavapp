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
        'custon-dark-purple': '#4a044e',
      }
    },
  },
  plugins: [],
}

