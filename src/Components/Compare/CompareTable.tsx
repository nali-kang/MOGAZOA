import { Compare } from '@/Types/CompareType';

interface Props {
  compareFirst?: Compare;
  compareSecond?: Compare;
}
const COMPARE_LIST = [
  { dataIndex: 'rating', label: '별점' },
  { dataIndex: 'reviewCount', label: '리뷰 개수' },
  { dataIndex: 'favoriteCount', label: '찜 개수' },
];

function CompareTable({ compareFirst, compareSecond }: Props) {
  return (
    <div className="w-full h-[18.5625rem] mt-20 bg-[#252530] border-2 border-[#353542] rounded-xl">
      <div className="h-[3.75rem] border-b-2 border-[#353542] grid grid-cols-4 content-center justify-items-center text-[#9FA6B2] text-base font-normal leading-normal">
        <p>기준</p>
        <p>상품1</p>
        <p>상품2</p>
        <p>결과</p>
      </div>
      <div className="grid grid-rows-3 text-[#9FA6B2] text-base font-normal leading-normal">
        {COMPARE_LIST.map((e: any) => {
          const first = compareFirst?.[e.dataIndex as 'rating' | 'reviewCount' | 'favoriteCount'] ?? 0;
          const second = compareSecond?.[e.dataIndex as 'rating' | 'reviewCount' | 'favoriteCount'] ?? 0;
          return (
            <div className="h-[5rem] grid grid-cols-4 content-center justify-items-center">
              <p>{e.label}</p>
              <p className="text-white">{first}</p>
              <p className="text-white">{second}</p>
              <p className="text-white">
                {first > second && <span className="text-[#05D58B]">상품 1 승리</span>}
                {first < second && <span className="text-[#FF2F9F]">상품 2 승리</span>}
                {first === second && <span>무승부</span>}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompareTable;
