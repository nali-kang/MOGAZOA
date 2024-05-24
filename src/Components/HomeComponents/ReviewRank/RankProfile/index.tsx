import RankingChip from '@/Components/Commons/Chip/RankingChip';
import Profile from '@/Components/Commons/Profile';
import { UserProfile } from '@/Types/UserProfile';

interface RankProfileProps {
  profile: UserProfile;
  rank: number;
}

export default function RankProfile({ profile, rank }: RankProfileProps) {
  const { image, nickname, followersCount, reviewCount } = profile;
  let rankText: string;
  switch (rank) {
    case 1:
      rankText = '1등';
      break;
    case 2:
      rankText = '2등';
      break;
    default:
      rankText = `${rank}등`;
      break;
  }

  return (
    <div className="flex items-center gap-[10px]">
      <Profile profileUrl={image} />
      <div className="flex flex-col">
        <div className="flex items-center gap-[5px]">
          <RankingChip>{rankText}</RankingChip>
          <p className="flex items-center text-white text-[14px] lg:text-[16px] ">{nickname}</p>
        </div>
        <div className="flex items-center gap-[10px] w-[120px]">
          <p className="font-light text-gray1 text-[10px] lg:text-[12px]">팔로워 {followersCount}</p>
          <p className="font-light text-gray1 text-[10px] lg:text-[12px]">리뷰 {reviewCount}</p>
        </div>
      </div>
    </div>
  );
}
