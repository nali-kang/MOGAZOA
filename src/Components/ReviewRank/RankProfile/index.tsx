import Profile from '@/Components/Commons/Profile';
import { UserProfile } from '@/Types/UserProfile';

interface RankProfileProps {
  profile: UserProfile;
}

export default function RankProfile({ profile }: RankProfileProps) {
  const { image, nickname, followersCount, reviewCount } = profile;

  return (
    <div>
      <Profile profileUrl={image} />
      <div>
        <div className="flex-line bg-pink">임시chip</div>
        <p className="text-white text-[14px] lg:text-[16px] ">{nickname}</p>
      </div>
      <div className="font-light text-gray1 text-[10px] lg:text-[12px]">
        <p className="text-gray1">팔로워 : {followersCount}</p>
        <p className="text-gray1">리뷰 : {reviewCount}</p>
      </div>
    </div>
  );
}
