import { useEffect, useState } from 'react';

export const useIntersectionObserver = ({ threshold = 0.1, hasNextPage, fetchNextPage }: any) => {
  //관찰할 요소입니다. 스크롤 최하단 div요소에 setTarget을 ref로 넣어 사용할 것입니다.
  const [target, setTarget] = useState();

  const observerCallback = (entries: any[]) => {
    entries.forEach((entry: { isIntersecting: any }) => {
      //target이 화면에 관찰되고, 다음페이지가 있다면 다음페이지를 호출
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (!target) return;

    //ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
};
