/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{vue,js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        luxury: {
          DEFAULT: '#0A0809',
          950: '#0A0809',
          900: '#130E10',
          850: '#1A1417',
          800: '#231B1F',
          700: '#32262C',
          600: '#46373E'
        },
        obsidian: {
          950: '#0A0809',
          900: '#130E10',
          850: '#1A1417',
          800: '#231B1F',
          750: '#2C2227',
          700: '#3A2E34',
          600: '#4F3F47'
        },
        wine: {
          900: '#3A0E1A',
          800: '#4F1524',
          700: '#5D192B',
          DEFAULT: '#6B1E32',
          600: '#6B1E32',
          500: '#85253E',
          400: '#A33350',
          300: '#C44D6D',
          glow: 'rgba(107, 30, 50, 0.45)'
        },
        champagne: {
          DEFAULT: '#E8C7B8',
          200: '#FAF0EB',
          300: '#F3DBD0',
          400: '#E8C7B8',
          500: '#D9AEA0',
          600: '#C29384',
          glow: 'rgba(232, 199, 184, 0.35)'
        },
        warm: {
          DEFAULT: '#F8F1EE',
          50: '#FFFFFF',
          100: '#F8F1EE',
          200: '#EDE4E0',
          300: '#DDCFC9',
          400: '#C6B4AC'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'ticker': 'ticker 20s linear infinite'
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(244, 63, 94, 0.3))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.6))' }
        }
      }
    }
  },
  plugins: []
}
