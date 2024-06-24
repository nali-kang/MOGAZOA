import { apiRequestor } from '@/Apis/requestor';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from './useIntersectionObserver';

interface requestType {
  queryKey: string | string[];
  requestParam: Record<string, any>;
  requestPath: string;
  method: string;
}

export const useInfinityRequest = ({ queryKey, requestParam, requestPath, method }: requestType) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: typeof queryKey === 'string' ? [queryKey] : queryKey,
    queryFn: ({ pageParam }: { pageParam: any }) => {
      let path = requestPath;
      let apiBody = requestParam;
      if (method === 'GET' && pageParam) {
        const searchParam = new URLSearchParams({ ...apiBody, cursor: pageParam });
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

  return { data, isLoading, fetchNextPage, setTarget };
};
