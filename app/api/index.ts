import axios from 'axios';
import auth from './auth';
import user from './userinfo';
import chat from './chat';
import board from './board';
import manage from './manage';
import webManage from './webManage';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://insideout-back.azurewebsites.net'
    : 'http://localhost:8080';

// 서버 사이드용 API 인스턴스
export const ServerAPI = axios.create({
  baseURL,
});

// 클라이언트 사이드용 API 인스턴스
export const API = axios.create({
  baseURL,
  withCredentials: true,
});

// 클라이언트 사이드에서만 인터셉터 설정
if (typeof window !== 'undefined') {
  // 요청 인터셉터
  API.interceptors.request.use(
    (config) => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
          document.cookie =
            'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
          document.cookie =
            'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
}

// 클라이언트 API exports
export const AuthAPI = auth(API);
export const UserAPI = user(API);
export const ChatAPI = chat(API);
export const ManageAPI = manage(API);
export const webManageAPI = webManage(API);
export const BoardAPI = board(API);

// 서버 사이드 API exports
export const ServerBoardAPI = board(ServerAPI);
