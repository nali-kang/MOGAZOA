import { ReactNode } from 'react';

interface RankingChipProps {
  children: ReactNode;
}

export default function RankingChip({ children }: RankingChipProps) {
  let rankChipStyle = 'text-gray2 bg-gray2-10';
  if (children === '1등') {
    rankChipStyle = 'text-pink bg-pink-10';
  } else if (children === '2등') {
    rankChipStyle = 'text-green bg-green-10';
  }
  // children에 '1등' '2등' 이외등수 적으시면 각 스타일 적용
  return (
    <div
      className={`flex justify-center items-center ${rankChipStyle} rounded-[50px]  w-[26px] h-[16px] text-[10px] lg:w-[32] lg:h-[18px] lg:text-[12px]`}
    >
      {children}
    </div>
  );
}
