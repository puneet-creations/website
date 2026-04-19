/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Newsreader', 'Georgia', 'serif'],
        body: ['"Noto Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#1c1c1e',
        slate: '#6b6350',
        placeholder: '#a5a8b5',
        brd: '#ddd8ca',
        ring: '#e8e2d4',
        blue: {
          450: '#5b76fe',
          pressed: '#2a41b6',
        },
        success: '#00b473',
        coral: { light: '#ffc6c6', dark: '#600000' },
        rose: { light: '#ffd8f4' },
        teal: { light: '#c3faf5', dark: '#187574' },
        orange: { light: '#ffe6cd' },
        yellow: { light: '#fff4cf', dark: '#746019' },
        moss: { light: '#d7eac7', dark: '#2f5d14' },
        pink: { light: '#fde0f0' },
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
        '6xl': '50px',
      },
      boxShadow: {
        ring: 'rgb(232,226,212) 0 0 0 1px',
        'ring-blue': 'rgb(91,118,254) 0 0 0 2px',
        soft: '0 4px 24px rgba(28,28,30,0.06)',
        lift: '0 16px 40px rgba(28,28,30,0.10)',
      },
      letterSpacing: {
        hero: '-0.03em',
        section: '-0.02em',
        card: '-0.01em',
      },
    },
  },
  plugins: [],
};
