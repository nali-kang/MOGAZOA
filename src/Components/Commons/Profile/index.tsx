import Image from 'next/image';

interface ProfileProps {
  profileUrl?: string;
}

export default function Profile({ profileUrl }: ProfileProps) {
  const InitialProfile = '/Images/img-profile1.svg';
  return (
    <div className="relative w-[36px] h-[36px] lg:w-[42px] lg:h-[42px]">
      <Image src={profileUrl || InitialProfile} alt="profileImage" fill priority />
    </div>
  );
}
