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
          bg: '#0f0f1a',
          card: '#1a1a2e',
          border: '#2d2d44',
          accent: '#7C3AED',
          'accent-hover': '#6D28D9',
          text: '#F8FAFC',
          muted: '#94A3B8',
          danger: '#DC3545',
          success: '#10B981',
          warning: '#F59E0B',
          info: '#0DCAF0',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
