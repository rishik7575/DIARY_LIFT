import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Slate for enterprise navigation, executive headers, and sidebars
        slate: {
          950: '#090D16',
          900: '#0F172A', // Primary Deep Slate
          850: '#1E293B',
          800: '#334155',
          700: '#475569',
          600: '#64748B',
          500: '#94A3B8',
          400: '#CBD5E1',
          300: '#E2E8F0',
          200: '#F1F5F9',
          100: '#F8FAFC',
          50: '#FAFAFA', // Primary Off-White
        },
        // Muted Forest Green for primary actions & verification
        forest: {
          900: '#052E16',
          800: '#064E3B',
          700: '#14532D',
          600: '#166534', // Primary Action Forest Green
          500: '#15803D',
          400: '#22C55E',
          300: '#86EFAC',
          200: '#BBF7D0',
          100: '#DCFCE7',
          50: '#F0FDF4',
          DEFAULT: '#166534',
        },
        // Warm Gold for investment yields, returns, and highlights
        gold: {
          900: '#78350F',
          800: '#92400E',
          700: '#B45309',
          600: '#D97706', // Primary Warm Gold
          500: '#F59E0B',
          400: '#FBBF24',
          300: '#FCD34D',
          200: '#FDE68A',
          100: '#FEF3C7',
          50: '#FFFBEB',
          DEFAULT: '#D97706',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        'gold-glow': '0 0 20px rgba(217, 119, 6, 0.25)',
        'forest-glow': '0 0 20px rgba(22, 101, 52, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
