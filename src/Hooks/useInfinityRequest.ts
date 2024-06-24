import { apiRequestor } from '@/Apis/requestor';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';

interface requestType {
  infinityQueryKey: string | string[];
  requestParam: Record<string, any>;
  requestPath: string;
  method: string;
}

export const useInfinityRequest = ({ infinityQueryKey, requestParam, requestPath, method }: requestType) => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: typeof infinityQueryKey === 'string' ? [infinityQueryKey] : infinityQueryKey,
    queryFn: ({ pageParam }: { pageParam: any }) => {
      let path = requestPath;
      let apiBody = requestParam;
      if (method === 'GET') {
        const searchParam = new URLSearchParams({ ...apiBody, cursor: pageParam ?? 0 });
        path = requestPath + '?' + searchParam.toString();
      }
      return apiRequestor({
        method,
        url: path,
        data: pageParam ? { ...apiBody, cursor: pageParam } : { ...apiBody },
      });
    },
    getNextPageParam: (lastPage: any) => {
      return lastPage?.data?.nextCursor;
    },
    initialPageParam: undefined,
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return { data, isLoading, fetchNextPage, setTarget, refetch };
};
