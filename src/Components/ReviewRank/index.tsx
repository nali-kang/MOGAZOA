import RankProfile from './RankProfile';
import mockData from './mockData.json';

export default function ReveiwRank() {
  return (
    <div>
      <p className="text-white mb-[20px]">리뷰어 랭킹</p>
      {mockData.map((profile) => (
        <RankProfile key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
