module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    { pattern: /(w|h)-(2|4|10)/ },
    { pattern: /border-(2|4)/ },
    ...`
      hover:border-white
      border-gray-700
      border-purple-500
    `.split('\n').map(v => v.trim())
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          '"Nanum Gothic Coding"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
        highlight: [
          '"DM Serif Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      animation: {
        'from-up': 'fromUp 700ms forwards cubic-bezier(0.16, 1, 0.3, 1)',
        'from-right': 'fromRight 700ms forwards cubic-bezier(0.16, 1, 0.3, 1)',
        'to-up': 'toUp 400ms forwards cubic-bezier(0.7, 0, 0.84, 0)',
        'to-right': 'toRight 400ms forwards cubic-bezier(0.7, 0, 0.84, 0)',
        'spin-fast': 'spin 500ms linear infinite',
        'scale-grow': 'scaleGrow 400ms forwards cubic-bezier(0.16, 1, 0.3, 1)',
        'bg-black-70': 'bgBlack70 400ms forwards',
        'fade-in': 'fadeIn 400ms forwards',
        'scale-grow-fade-in': 'scaleGrow 400ms forwards cubic-bezier(0.16, 1, 0.3, 1), fadeIn 400ms forwards',
      },
      keyframes: {
        'fromUp': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'fromRight': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'toUp': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'toRight': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'scaleGrow': {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'bgBlack70': {
          '0%': { backgroundColor: 'rgba(0, 0, 0, 0)' },
          '100%': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        },
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animation-delay'),
  ],
}
