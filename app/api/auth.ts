import { AxiosInstance } from 'axios';
import {
  RegisterRequestData,
  LoginRequestData,
  AuthResponseData,
} from '../types/auth';

const auth = (api: AxiosInstance) => ({
  register: async (data: RegisterRequestData): Promise<AuthResponseData> => {
    const response = await api.post<AuthResponseData>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequestData): Promise<AuthResponseData> => {
    const response = await api.post<AuthResponseData>('/auth/login', data);
    // 로그인 성공시 토큰을 localStorage에 저장
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('accessToken');
    await api.post('/auth/logout');
  },
});

export default auth;
