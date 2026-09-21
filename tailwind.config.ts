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
        // ── Brand Tokens (Enterprise Emerald) ──
        brand: {
          DEFAULT: '#059669',
          dark:    '#047857',
          light:   '#ECFDF5',
          muted:   '#F0FDF4',
          200:     '#A7F3D0',
          100:     '#D1FAE5',
          50:      '#ECFDF5',
        },
        accent: {
          DEFAULT: '#D97706',
          dark:    '#B45309',
          light:   '#FEF3C7',
          50:      '#FFFBEB',
          100:     '#FDE68A',
        },
        // ── Neutral / Ink (Enterprise Slate) ──
        ink: {
          DEFAULT: '#0F172A',
          700:     '#334155',
          500:     '#475569',
          400:     '#64748B',
          200:     '#CBD5E1',
          100:     '#E2E8F0',
          50:      '#F8FAFC',
        },
        cream:     '#F8FAFC',
        warmWhite: '#FFFFFF',
        // ── Status ──
        success: { DEFAULT: '#10B981', bg: '#ECFDF5' },
        warning: { DEFAULT: '#F59E0B', bg: '#FFFBEB' },
        danger:  { DEFAULT: '#EF4444', bg: '#FEF2F2' },
        info:    { DEFAULT: '#3B82F6', bg: '#EFF6FF' },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs':  ['11px', { lineHeight: '1.4' }],
        'xs':   ['12px', { lineHeight: '1.5' }],
        'sm':   ['13px', { lineHeight: '1.5' }],
        'base': ['14px', { lineHeight: '1.6' }],
        'md':   ['15px', { lineHeight: '1.6' }],
      },
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        // sidebar
        'sidebar': '252px',
        // header
        'header': '56px',
        'topbar': '30px',
      },
      borderRadius: {
        'xs':   '4px',
        'sm':   '6px',
        'md':   '10px',
        'lg':   '14px',
        'xl':   '18px',
        '2xl':  '24px',
        'full': '9999px',
        // Card aliases
        'card':    '14px',
        'card-sm': '10px',
        'card-lg': '18px',
      },
      boxShadow: {
        'xs':  '0 1px 2px rgba(23,34,28,0.04)',
        'sm':  '0 2px 4px rgba(23,34,28,0.06), 0 1px 2px rgba(23,34,28,0.04)',
        'md':  '0 4px 12px rgba(23,34,28,0.08), 0 2px 4px rgba(23,34,28,0.04)',
        'lg':  '0 12px 28px rgba(23,34,28,0.10), 0 4px 8px rgba(23,34,28,0.06)',
        'xl':  '0 24px 48px rgba(23,34,28,0.12), 0 8px 16px rgba(23,34,28,0.06)',
        // Legacy aliases
        'subtle':     '0 1px 3px rgba(23,34,28,0.04)',
        'card':       '0 2px 4px rgba(23,34,28,0.06), 0 1px 2px rgba(23,34,28,0.04)',
        'card-hover': '0 4px 12px rgba(23,34,28,0.08), 0 2px 4px rgba(23,34,28,0.04)',
      },
      maxWidth: {
        'page':    '1440px',
        'content': '1200px',
        'prose':   '680px',
      },
      transitionDuration: {
        'fast':    '120ms',
        'normal':  '200ms',
        'slow':    '300ms',
        'complex': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
