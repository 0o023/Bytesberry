module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'Sans'],
      },
      colors: {
        customGreen: '#79ab70',
        'light-green': '#E6F5E1',
        'darker-green': '#A4D3A2',
        'beige': '#F5F5DC',
        'very-light-gray': '#F2F3F4',
        'bgcolor': '#FEFDED',
        'txtgreen': '#244d19',
        'hvgreen': '#FEFDE5',
        'hvdarkgreen': '#9BC690',
        'bdgreen': '#A1C398',
        'btgreen': '#A1C398',
        'ft': '#3B5249',
        'even-row': '#eaf0d4',
        'odd-row': '#e4e4ca',
      },
      fontSize: {
        '2.5xl': '1.75rem',
      },
      spacing: {
        '70px': '70px',
      },
      width: {
        '300px': '300px',
      },
      height: {
        '200px': '200px',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translate(-100%, -500px)' },
          '100%': { transform: 'translate(-50%, 400px)' },
        },
      },
      animation: {
        fall: 'fall 3s infinite',
      },
      animationDelay: {
        '1000': '1s',
        '2000': '2s',
        '3000': '3s',
      },
    },
  },
  plugins: [],
}
