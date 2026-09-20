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
        // Strict 16-color DairyLift Enterprise Palette
        primaryForest: '#14532D',
        deepForest: '#0B3B24',
        pasture: '#2F855A',
        freshGreen: '#22C55E',
        cream: '#F7F4EA',
        warmWhite: '#FCFCF9',
        softBeige: '#EFEBDD',
        gold: {
          DEFAULT: '#C9962B',
          50: '#FDF9F0',
          100: '#F8F0DB',
          200: '#EEDDB4',
          300: '#E4C98E',
          400: '#D9B55A',
          500: '#C9962B',
          600: '#A67920',
          700: '#835E17',
          800: '#614410',
          900: '#422D0A',
        },
        darkNavy: '#0F172A',
        slate: {
          DEFAULT: '#475569',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          850: '#151F32',
          900: '#0F172A',
          950: '#020617',
        },
        muted: '#64748B',
        border: '#E2E8F0',
        danger: '#DC2626',
        warning: '#D97706',
        info: '#2563EB',
        success: '#15803D',

        // Forest scale mapped to enterprise tokens
        forest: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#22C55E',
          500: '#15803D',
          600: '#166534',
          700: '#14532D', // Primary Forest
          800: '#0B3B24', // Deep Forest
          900: '#052E16',
          DEFAULT: '#14532D',
        },
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '30': '120px',
      },
      borderRadius: {
        'card': '16px',
        'card-sm': '12px',
        'card-lg': '20px',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 20px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
