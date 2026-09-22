/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          dark: "#0b0410",
          deep: "#140722",
          card: "rgba(25, 12, 38, 0.65)",
          border: "rgba(255, 182, 193, 0.2)",
          rose: "#ff3366",
          softRose: "#ff6b8b",
          blush: "#fda4af",
          burgundy: "#700f2b",
          gold: "#fcd34d",
          champagne: "#fef3c7"
        }
      },
      fontFamily: {
        romantic: ['"Great Vibes"', 'cursive'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
        }
      }
    },
  },
  plugins: [],
}
