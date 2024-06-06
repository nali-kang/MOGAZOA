import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// null, undefined 체크
const isNullOrUndefined = (value: any): boolean => value === null || value === undefined;

/**
 * URL decode 대응, object 대응 후 오류 시 string decode
 * @param param encoding된 URL string
 * @returns decode data
 */
const decode = (param: string) => {
  try {
    return JSON.parse(decodeURIComponent(param));
  } catch {
    return decodeURIComponent(param);
  }
};

/**
 * query string을 가져오기 위해 URLSearchParams to string
 * Param data를 받아와 URLSearchParams 객체로 활용
 * @param paramData search Param Data
 * @returns param to string
 */
const toQuery = (paramData: any): string => {
  const params = new URLSearchParams(paramData);

  return params.toString();
};

/**
 * get Query String URL use param data
 * @param pathname url pathname
 * @param paramData querystring 만들기 위한 param data
 * @returns Query String
 */
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

/**
 *
 * @return replace - route replace
 * @return push - route push
 * @return reset - searchParams reset
 * @return initReset - reset everything except initial data
 * @return has - check have data - return boolean
 * @return get - get Search Param Data - return string
 * @return getData - get Search Param Data to Decoding - return decode data
 * @return set - set Search Param data - return SearchParam
 * @return delete - delete Search Param - return SearchParam
 * @return toString - SearchParam get QueryString
 */
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
