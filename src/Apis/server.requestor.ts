/**
 * Server Component에서 사용할 수 있도록 use client 제거 한 axios instance
 * react query prefetch 사용하지 않는 기능에서 사용 가능
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: 'https://mogazoa-api.vercel.app/4-18/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // 모든 도메인 허용
  },
};

/**
 * 성공적인 응답을 처리하는 인터셉터
 *
 * @param {AxiosResponse} response - Axios 응답 객체
 * @returns {AxiosResponse} 응답 객체
 */
const successInterceptor = (response: AxiosResponse): AxiosResponse => response;

/**
 * 에러를 처리하는 인터셉터
 *
 * @param {AxiosError} error - Axios 에러 객체
 * @returns error.response - 에러 response; response가 없으면 error 반환
 */
const errorInterceptor = (error: AxiosError) => {
  console.error('Response Error:', error);
  return Promise.reject(error);
};

const apiRequestor: AxiosInstance = axios.create(axiosRequestConfig); // Token 필요 X

apiRequestor.interceptors.response.use(successInterceptor, errorInterceptor);

// eslint-disable-next-line import/prefer-default-export
export { apiRequestor };
