'use client';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // 모든 도메인 허용
  },
};

const axiosRequestNoBaseUrlConfig: AxiosRequestConfig = {
  baseURL: ``,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const axiosFileRequestConfig: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
};

const apiRequestor: AxiosInstance = axios.create(axiosRequestConfig); // Token 필요 X
const apiRequestorNoBaseUrl: AxiosInstance = axios.create(axiosRequestNoBaseUrlConfig); // Token 필요 X
const apiFileRequestor: AxiosInstance = axios.create(axiosFileRequestConfig); // Token 필요 O, File 업로드
const apiRequestorToken: AxiosInstance = axios.create(axiosRequestConfig); // Token 필요 O

apiRequestorToken.interceptors.request.use(requestInterceptor);
apiFileRequestor.interceptors.request.use(requestInterceptor);

apiRequestor.interceptors.response.use(successInterceptor, errorInterceptor);
// apiFileRequestor.interceptors.response.use(successInterceptor, errorInterceptor);
apiRequestorToken.interceptors.response.use(successInterceptor, errorInterceptor);

export { apiRequestor, apiRequestorNoBaseUrl, apiFileRequestor, apiRequestorToken };
