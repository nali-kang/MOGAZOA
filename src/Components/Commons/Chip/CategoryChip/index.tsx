interface CategoryChiProps {
  category:
    | '음악'
    | '영화/드라마'
    | '강의/책'
    | '호텔'
    | '가구/인테리어'
    | '식당'
    | '전자기기'
    | '화장품'
    | '의류/악세서리'
    | '앱';
}

export default function CategoryChip({ category }: CategoryChiProps) {
  const categoryColors: { [key in CategoryChiProps['category']]: string } = {
    음악: 'bg-lime-10  text-lime',
    '영화/드라마': 'bg-orange1-10 text-orange1',
    '강의/책': 'bg-purple-10 text-purple',
    호텔: 'bg-green2-10 text-green2',
    '가구/인테리어': 'bg-pink2-10 text-pink2',
    식당: 'bg-orange2-10 text-orange2',
    전자기기: 'bg-green-10 text-green',
    화장품: 'bg-pink-10 text-pink',
    '의류/악세서리': 'bg-indigo-10 text-indigo',
    앱: 'bg-blue-10 text-blue',
  };

  const chipStyle = categoryColors[category];

  return (
    <div
      className={`inline-flex justify-center items-center rounded-md font-normal text-[12px] px-1 py-2 h-[22px] lg:rounded-lg lg:font-medium lg:text-[18px] lg:h-[29px] ${chipStyle}`}
    >
      {category}
    </div>
  );
}
