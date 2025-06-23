import { defineConfig } from 'tailwindcss';

export default defineConfig({
  theme: {
    extend: {
      colors: {

      },
      boxShadow: {
        'right': '5px 0 5px -2px rgba(185, 189, 199, 0.3)',  // Right shadow
        'bottom': '0 10px 15px -3px rgba(0, 0, 0, 0.3)',  // Bottom shadow
        'left': '-10px 0 15px -3px rgba(0, 0, 0, 0.3)',   // Left shadow
        'top': '0 -10px 15px -3px rgba(0, 0, 0, 0.3)',    // Top shadow
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#181C1F #0E1113',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0E1113',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#0E1113',
            borderRadius: '20px',
            border: '2px solid gray',
            transition: 'background-color 0.3s ease',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#33393F', // Darker color on hover
            border: '2px solid white', // Change border color on hover
          },
        },
      };
      addUtilities(newUtilities, { variants: ['responsive', 'hover'] });
    },
  ],
});
