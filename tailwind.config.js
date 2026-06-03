/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        genshin: {
          bg: '#0a0a12',
          'bg-elevated': '#12121f',
          card: '#16162a',
          'card-hover': '#1e1e3a',
          border: '#2a2a4a',
          'border-light': '#3d3d6a',
          accent: '#8B5CF6',
          'accent-glow': 'rgba(139, 92, 246, 0.4)',
          'accent-secondary': '#06B6D4',
          text: '#F8FAFC',
          muted: '#94A3B8',
          'text-dim': '#64748B',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
        element: {
          pyro: '#DC2626',
          hydro: '#0284C7',
          electro: '#7C3AED',
          cryo: '#38BDF8',
          geo: '#D97706',
          anemo: '#0D9488',
          dendro: '#16A34A',
        },
        status: {
          disponivel: '#10B981',
          reservada: '#F59E0B',
          vendida: '#6B7280',
          pausada: '#7C3AED',
          farmando: '#0891B2',
          revisar: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
