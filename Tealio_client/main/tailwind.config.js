/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        quicksand:['Quicksand','Sans'],
      },
      colors:{
        bgcolor:'#FEFDED',
        txtgreen:'#244d19',
        hvgreen:'#FEFDE5',
        hvdarkgreen:'#9BC690',
        bdgreen:'#A1C398',
        btgreen:'#A1C398',
        ft:'#3B5249',
      },
    },
  },
  plugins: [],
}
