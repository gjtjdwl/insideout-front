import axios from 'axios';
import auth from './auth';

axios.defaults.withCredentials = true;

export const API = axios.create({
  baseURL: 'http://localhost:8080',
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
