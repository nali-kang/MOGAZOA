import { apiRequestor } from '@/Apis/requestor';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';

interface requestType {
  queryKey: string | string[];
  requestParam: Record<string, any>;
  requestPath: string;
  method: string;
}

export const useInfinityRequest = ({ queryKey, requestParam, requestPath, method }: requestType) => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: typeof queryKey === 'string' ? [queryKey] : queryKey,
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
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return { data, isLoading, fetchNextPage, setTarget, refetch };
};
