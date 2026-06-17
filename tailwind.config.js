/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      colors: {
        background: '#0B0B0D',
        surface: '#151518',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5D67B',
          dark: '#B8960C',
          dim: 'rgba(212,175,55,0.2)',
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 14px rgba(212,175,55,0.4)' },
          '50%': { boxShadow: '0 0 28px rgba(212,175,55,0.8)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
