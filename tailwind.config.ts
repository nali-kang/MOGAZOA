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
        black3: '#353542', // 연함
        gray1: '#6E6E82', // 진함
        gray2: '#9FA6B2', // 연함
        'gray2-10': 'rgba(159, 166, 178, 0.10)', // gray2 색상 불투명도 10%
        white: '#F1F1F5',
        blue: '#5097FA',
        indigo: '#5363FF',
        yellow: '#FFC83C',
        green: '#05D58B',
        'green-10': 'rgba(5, 213, 139, 0.10)', // green 색상 불투명도 10%
        pink: '#FF2F9F',
        'pink-10': 'rgba(255, 47, 159, 0.10)', // pink 불투명도 10%
        red: '#FF0000',
      },
      backgroundImage: {
        gradient: 'linear-gradient(102deg, rgba(80, 151, 250, 1) 4.11%, rgba(83, 99, 255, 1) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
