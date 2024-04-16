/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl': { 'max': '1309px' },
        'desktop': { 'max': '1023px' },
        'laptop': { 'max': '991px' },
        'mobile': { 'max': '767px' },
        'xs': { 'max': '511px' },
      },
      fontFamily: {
        'circe': ["Circe"],
        'orchidea': ["Orchidea Pro"],
      },
      fontSize: {
        'xlarge': ['40px', {
          lineHeight: '52px',
          letterSpacing: '4px',
          fontWeight: '400',
        }],
        'large': ['20px', {
          lineHeight: '28px',
          letterSpacing: '4px',
          fontWeight: '400',
        }],
        'middle': ['18px', {
          lineHeight: '24px',
          fontWeight: '400',
        }],
        'small': ['14px', {
          lineHeight: '22px',
          fontWeight: '400',
        }],
      },
      colors: {
        'color-primary': '#4E76C6',
        'color-hover': '#426bbd',
        'color-text-primary': '#1E1E1E',
        'color-text-secondary': '#72716E',
        'color-divider': '#ECEAE7',
        'color-icon': '#2C2D2E',
        'color-icon-secondary': '#BFC0C7',
        'color-red': '#d34546',
        'color-bg-light': '#F5F3F0',
      },
      backgroundImage: {
        'home': "url('/public/images//back//home-background.jpeg')",
      },
      letterSpacing: {
        'current': '4px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'linear',
      },
      keyframes: {
        fadeIn: {
          from: {
            maxHeight: '0px',
          },
          to: {
            maxHeight: '1200px',
          }
        },
        fadeOut: {
          from: {
            maxHeight: '1200px',
          },
          to: {
            maxHeight: '0px',
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s linear',
        fadeOut: 'fadeOut 1s linear',
      }
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.btn': {
          display: 'block',
          height: '60px',
          borderRadius: '60px',
          fontFamily: 'Orchidea Pro',
          fontSize: theme('fontSize.small'),
          lineHeight: '20px',
          letterSpacing: theme('letterSpacing.current'),
          textTransform: 'uppercase',
          color: theme('colors.white'),
          backgroundColor: theme('colors.color-primary'),
          transition: 'background-color',
          transitionDuration: theme('transitionDuration.DEFAULT'),
          transitionTimingFunction: theme('transitionTimingFunction.DEFAULT'),
          '&:hover': {
            backgroundColor: theme('colors.color-hover')
          }
        },
      })
    })
  ],
}


