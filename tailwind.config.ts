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
        black1: '#17171C', // 진함
        black2: '#21212A', // 보통
        black3: '#2E2E3A', // 연함
        black4: '#353542', 
        gray1: '#6E6E82', // 진함
        gray2: '#9FA6B2', // 연함
        white: '#F1F1F5',
        blue: '#5097FA',
        indigo: '#5363FF',
        yellow: '#FFC83C',
        green: '#05D58B',
        pink: '#FF2F9F',
        red: '#FF0000',
      },
      backgroundImage: {
        gradient: 'linear-gradient(102deg, rgba(80, 151, 250, 1) 4.11%, rgba(83, 99, 255, 1) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem', // 32px
        '4xl': '2.625rem', // 42px
        '5xl': '3.25rem', // 52px
        '6xl': '5.5rem', // 88px
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      lineHeight: {
        none: '1',
        tighter: '1.125',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        '3': '.75rem',
        '4': '1rem',
        '5': '1.2rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      screens: {
        mobile: { max: '767px' }, 
      },
    },
  },
  plugins: [],
};
export default config;
