import axios from 'axios';
import auth from './auth';
import user from './userinfo';
import chat from './chat';
import webManage from './webManage';

axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://insideout-back-production.up.railway.app'
    : 'http://localhost:8080';

export const API = axios.create({
  baseURL,
});

// 요청 인터셉터 수정
API.interceptors.request.use(
  (config) => {
    // 쿠키에서 JWT 토큰 가져오기
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwt='))
      ?.split('=')[1];

    if (token) {
      // Bearer 스키마 추가
      config.headers.Authorization = `Bearer ${token}`;
      // Content-Type 헤더 추가
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const isTokenError =
        error.response?.data?.error === 'Token is expired' ||
        error.response?.data?.error === 'Invalid token';

      if (isTokenError) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie =
          'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const AuthAPI = auth(API);
export const UserAPI = user(API);
export const ChatAPI = chat(API);
export const webManageAPI = webManage(API);
