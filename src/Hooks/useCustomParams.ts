import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const isNullOrUndefined = (value: any): boolean => value === null || value === undefined;

const decode = (param: string) => {
  try {
    return JSON.parse(decodeURIComponent(param));
  } catch {
    return decodeURIComponent(param);
  }
};

const toQuery = (paramData: any): string => {
  const params = new URLSearchParams(paramData);

  return params.toString();
};

export const getURL = (pathname: string, paramData: any): string => {
  let url = '';
  const query = toQuery(paramData);

  if (pathname) url += pathname;

  if (query) {
    url += '?';
    url += query;
  }

  return url;
};

export const encodeParam = (param: Record<string, any>) => {
  const compParam: Record<string, any> = {};

  Object.keys(param).forEach((e: string) => {
    if (!isNullOrUndefined(param[e])) {
      compParam[e] = encodeURIComponent(JSON.stringify(param[e]));
    }
  });

  return compParam;
};

// TODO: any type
interface SearchParam {
  replace: () => void;
  push: () => void;
  reset: () => void;
  initReset: (param: any) => void;
  has: (name: string) => boolean;
  get: (name: string) => string | null;
  getData: (name: string) => any;
  set: (name: string, value: any) => SearchParam;
  delete: (name: string) => SearchParam;
  toString: () => string;
}

export function useCustomParam(): SearchParam {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();

  return {
    replace: () => {
      router.replace(getURL(pathname, searchParams.toString()));
    },
    push: () => {
      router.push(getURL(pathname, searchParams.toString()));
    },
    reset: () => {
      // [TODO]: initial params
      router.push(pathname);
    },
    initReset: (param: any) => {
      router.push(getURL(pathname, param));
    },
    has(name: string) {
      return searchParams.has(name);
    },
    getData(name: string) {
      return decode(searchParams.get(name) || '');
    },
    get(name: string) {
      return searchParams.get(name);
    },
    set<T>(name: string, value: T) {
      if (!isNullOrUndefined(value)) {
        searchParams.set(name, encodeURIComponent(JSON.stringify(value)));
      }

      return this;
    },
    delete(name: string) {
      searchParams.delete(name);

      return this;
    },
  };
}
