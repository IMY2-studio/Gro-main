module.exports = {
  content: [
    './config/*.json',
    './layout/*.liquid',
    './assets/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/*.liquid',
    './templates/*.json',
    './templates/customers/*.liquid',
  ],
  safelist: [
    'overflow-hidden',
    'bg-green',
    'bg-white',
    'text-white',
    'fill-white',
    'stroke-white',
    'bg-transparent',
    'border-transparent',
    'border-b-transparent',
    'text-green',
    'border-b',
    'border-b-green-light',
    'fill-green',
    'stroke-green',
    '!opacity-100',
    'border-b',
    'bg-green',
    'lg:text-green',
    '!text-green',
    '!bg-transparent',
    'lg:bg-white',
    'lg:bg-green',
    'lg:bg-transparent',
    'lg:stroke-green',
    'lg:!flex',
    'transition-[border-radius]', 
    'transition-[border-color]',
    'object-fit'
  ],
  theme: {
    fontFamily: {
      'sans': ['FoundersGrotesk', 'Arial', 'sans-serif'],
    },
    colors: {
      'transparent': 'transparent',
      'success': 'black',
      'error': '#E44138',
      'white': '#FFF',
      'current': 'currentColor',
      'inherit': 'inherit',
      'green': 'var(--green)',
      'green-light': 'var(--green-light)'
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))'
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
      },
      animation: {
        'ticker': 'ticker 15s infinite linear'
      },
      keyframes: {
        ticker: {
            '100%': { transform: 'translateX(-100%)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-text-fill-stroke')(),
    require('tailwindcss-debug-screens'),
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
}
