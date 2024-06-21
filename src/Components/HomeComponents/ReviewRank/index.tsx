import { useGetUserRanking } from '@/Apis/User/useUserService';
import RankProfile from './RankProfile';
import Link from 'next/link';

interface UserProfile {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
  reviewCount: number;
  followersCount: number;
}

export default function ReviewRank() {
  const { data } = useGetUserRanking();
  const sortedReviewData = data.sort((a: UserProfile, b: UserProfile) => b.followersCount - a.followersCount);

  return (
    <div className="flex flex-col mb-[60px] lg:border-l lg:border-scblack lg:pl-[30px] w-[530px] md:w-[550px] lg:w-[300px]">
      <p className="text-white mb-[20px] lg:mb-[30px]">리뷰어 랭킹</p>
      <div className="flex overflow-x-auto gap-[15px]  lg:flex-col lg:overflow-hidden">
        {sortedReviewData.slice(0, 5).map((profile: UserProfile, ranking: number) => (
          <div key={profile.id} className="w-[300px] h-[36px] lg:h-[42px] lg:mb-[30px]">
            <Link href={`/userprofile/${profile.id}`}>
              <RankProfile profile={profile} rank={ranking + 1} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
