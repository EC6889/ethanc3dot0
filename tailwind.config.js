/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
    './index.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        slate: {
          850: '#151f32',
          900: '#0f172a',
          950: '#020617', // Deep dark background
        },
        // Brand Spectrum: Cyan, Blue, Purple (Used flexibly across the site)
        // Brand Spectrum: Cyan, Blue, Purple (Used flexibly across the site)
        // Brand Spectrum: Cyan, Blue, Purple (Used flexibly across the site)
        // Defined in index.css via @theme for Tailwind v4 compatibility
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          900: '#164e63',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
          900: '#581c87',
        },
        accent: '#3b82f6',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 1.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
