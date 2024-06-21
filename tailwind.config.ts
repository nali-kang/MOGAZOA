import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black1: '#17171C', // 진함
        black2: '#21212A', // 보통
        black3: '#2E2E3A', // 연함
        black4: '#353542',
        bgblack: '#1C1C22', // 배경 검정색
        scblack: '#252530', // 검색창 검정색
        gray1: '#6E6E82', // 진함
        gray2: '#9FA6B2', // 연함
        'gray2-10': 'rgba(159, 166, 178, 0.10)', // gray2 색상 불투명도 10%
        white: '#F1F1F5',
        blue: '#5097FA',
        'blue-10': 'rgba(48, 152, 227, 0.10)',
        indigo: '#5363FF',
        'indigo-10': 'rgba(117, 122, 255, 0.10)',
        yellow: '#FFC83C',
        lime: '#C5D17C',
        'lime-10': 'rgba(197, 209, 124, 0.10)',
        green: '#05D58B', // 청록색느낌
        'green-10': 'rgba(5, 213, 139, 0.10)', // green 색상 불투명도 10%
        green2: '#49AF1A', // 연두색
        'green2-10': 'rgba(73, 175, 26, 0.10)',
        pink: '#FF2F9F', // 진한 핑크
        'pink-10': 'rgba(255, 47, 159, 0.10)', // pink 불투명도 10%
        pink2: '#D676C1', // 연한핑크
        'pink2-10': 'rgba(214, 118, 193, 0.10)',
        red: '#FF0000',
        orange1: '#F75532', // 진함
        'orange1-10': 'rgba(247, 85, 50, 0.10)',
        orange2: '#FF7E46', // 연함
        'orange2-10': 'rgba(255, 126, 70, 0.10)',
        purple: '#A953FF',
        'purple-10': 'rgba(169, 83, 255, 0.10)',
        'gradient-blue': 'linear-gradient(91.17deg, #5097FA 0%, #5363FF 100%)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(102deg, rgba(80, 151, 250, 1) 4.11%, rgba(83, 99, 255, 1) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        Pre: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      screens: {
        mobile: { max: '767px' },
        desktop: '1400px',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) => {
      addUtilities({
        '.text-gradient': {
          'background-image': 'linear-gradient(91.17deg, #5097FA 0%, #5363FF 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    }),
  ],
};

export default config;
