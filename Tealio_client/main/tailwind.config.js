/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#E6F5E1',
        'darker-green': '#A4D3A2',
        'beige': '#F5F5DC',
      },
      spacing: {
        '70px': '70px', // Custom spacing for image width
      },
      width: {
        '300px': '300px', // Custom width for the card
      },
      height: {
        '200px': '200px', // Custom height for the card
      },
    },
  },
  plugins: [],
}
