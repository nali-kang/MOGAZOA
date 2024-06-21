import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.css'; // 위 CSS 코드를 이 파일에 추가했다고 가정합니다

export default function DetailSkeleton() {
  return (
    <div className="w-[335px] justify-center items-center gap-10 mt-[30px]  md:w-[684px] md:h-[285px] xl:w-[940px] md:flex">
      <div className="rounded-md md:w-[280px] md:h-[197px] xl:w-[355px] xl:h-[249px]">
        <Skeleton className="skeleton-pulsate" height={249} width="100%" />
      </div>
      <div className="flex-col justify-center items-start gap-10">
        <div className="w-[335px] md:w-[384px] flex-col justify-start items-start gap-5 flex mb-10">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="w-[335px] md:w-[384px] h-[22px] justify-between items-center flex mt-5 relative">
              <Skeleton className="skeleton-pulsate" height={22} width={50} />
              <div className="justify-start items-center gap-2.5 flex md:absolute md:top-[-5px] md:right-[7px] xl:top-6 xl:right-[-160px]">
                <Skeleton className="skeleton-pulsate" circle height={24} width={24} />
                <Skeleton className="skeleton-pulsate" circle height={24} width={24} />
              </div>
            </div>
          </div>
          <div className="w-[335px] md:w-[384px] xl:w-[545px] text-gray-100 text-sm font-normal font-['Pretendard'] leading-5">
            <Skeleton className="skeleton-pulsate" count={3} />
          </div>
        </div>
        <div className="w-[335px] md:w-[380px] md:flex">
          <Skeleton className="skeleton-pulsate flex-grow" width="100%" height={50} />
          <div className="h-[15px] w-0" />
          <Skeleton className="skeleton-pulsate flex-grow" width="100%" height={50} />
          <div className="h-[15px] w-0" />
        </div>
      </div>
    </div>
  );
}
