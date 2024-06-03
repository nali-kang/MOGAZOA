'use client';

// QueryClientProvider는 내부적으로 useContext를 사용하므로 'use client'를 맨 위에 놓아야 합니다.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 클라이언트에서 즉시 다시 가져오는 것을 방지
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버: 항상 새로운 쿼리 클라이언트를 만듭니다
    return makeQueryClient();
  }
  // 브라우저: 아직 클라이언트가 없으면 새 쿼리 클라이언트를 만듭니다.
  // 이것은 매우 중요하므로 React가 다음과 같은 경우 새 클라이언트를 다시 만들지 마십시오.
  // 초기 렌더링 중에는 일시 중지됩니다. 다음과 같은 경우에는 이것이 필요하지 않을 수도 있습니다.
  // 쿼리 클라이언트 생성 아래에 정지 경계가 있습니다.
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function Providers({ children }: { children: ReactNode }) {
  // 참고: 쿼리 클라이언트를 초기화할 때 useState를 사용하지 마세요.
  // 이 코드와 코드 사이에 서스펜스 경계가 있습니다.
  // React가 초기에 클라이언트를 버리기 때문에 일시 중지합니다.
  // 정지되고 경계가 없으면 렌더링됩니다.
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
