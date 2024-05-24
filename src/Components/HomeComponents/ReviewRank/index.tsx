import mockData from './mockData.json';
import RankProfile from './RankProfile';

export default function ReveiwRank() {
  const sortedReviewData = mockData.sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <div className="mb-[60px]">
      <p className="text-white mb-[20px]">리뷰어 랭킹</p>
      <div className="flex overflow-x-auto gap-[15px] lg:overflow-hidden lg:flex-col">
        {sortedReviewData.slice(0, 5).map((profile, ranking) => (
          <div className="w-[300px] h-[36px] lg:h-[42px]">
            <RankProfile key={profile.id} profile={profile} rank={ranking + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
