import axios from 'axios';
import auth from './auth';
import user from './userinfo';

axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://insideout-back-production.up.railway.app'
    : 'http://localhost:8080';

export const API = axios.create({
  baseURL,
});

// 요청 인터셉터 추가
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료된 경우
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const AuthAPI = auth(API);
export const UserAPI = user(API);
