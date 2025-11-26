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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        accent: ['Audiowide', 'Orbitron', 'sans-serif'],
      },
      fontSize: {
        // Display Scale (Orbitron)
        'display-2xl': ['clamp(4rem, 6vw + 1rem, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-1xl': ['clamp(3.5rem, 5.5vw + 1rem, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-xl': ['clamp(3rem, 5vw + 1rem, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 4vw + 1rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(2rem, 3vw + 1rem, 2.5rem)', { lineHeight: '1.2', letterSpacing: '0' }],
        'display-sm': ['clamp(1.5rem, 2vw + 1rem, 1.75rem)', { lineHeight: '1.3', letterSpacing: '0' }],
        // Body Scale (Inter)
        'body-lg': ['clamp(1rem, 1vw + 0.75rem, 1.125rem)', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.4' }],
        // Mono Scale (JetBrains Mono)
        'mono-lg': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'mono-md': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'mono-sm': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        // Accent Scale (Audiowide)
        'accent-lg': ['clamp(1.5rem, 2vw + 1rem, 2rem)', { lineHeight: '1.2', letterSpacing: '0.05em' }],
        'accent-md': ['clamp(1.25rem, 1.5vw + 1rem, 1.5rem)', { lineHeight: '1.3', letterSpacing: '0.05em' }],
      },
      colors: {
        slate: {
          850: 'var(--color-slate-850)',
          900: '#0f172a', // Keep standard for now or map to --bg-surface if desired
          950: 'var(--bg-base)', // Deep dark background (0%)
        },
        // Brand Spectrum: Cyan, Blue, Purple (Used flexibly across the site)
        // Defined in index.css via @theme for Tailwind v4 compatibility
        cyan: {
          400: 'var(--color-brand-cyan)',
          500: 'var(--color-brand-cyan-dim)',
          900: 'var(--color-brand-cyan-deep)',
        },
        blue: {
          500: 'var(--color-brand-blue)',
          600: 'var(--color-brand-blue-dim)',
        },
        purple: {
          400: '#c084fc', // Keep as fallback or define variable
          500: 'var(--color-brand-purple)',
          900: 'var(--color-brand-purple-deep)',
        },
        accent: 'var(--color-brand-blue)',
        
        // Semantic Colors
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
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
