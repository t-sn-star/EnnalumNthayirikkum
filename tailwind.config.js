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
        obsidian: {
          950: '#050608',
          900: '#090a0f',
          850: '#0e1118',
          800: '#141824',
          750: '#1a1f30',
          700: '#22283d',
          600: '#323a54'
        },
        crimson: {
          500: '#f43f5e',
          400: '#fb7185',
          glow: 'rgba(244, 63, 94, 0.35)'
        },
        emerald: {
          500: '#10b981',
          400: '#34d399',
          glow: 'rgba(16, 185, 129, 0.35)'
        },
        violet: {
          500: '#8b5cf6',
          400: '#a78bfa',
          glow: 'rgba(139, 92, 246, 0.35)'
        },
        cyan: {
          500: '#06b6d4',
          400: '#22d3ee',
          glow: 'rgba(6, 182, 212, 0.35)'
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
