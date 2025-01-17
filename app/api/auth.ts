import { AxiosInstance } from 'axios';
import {
  RegisterRequestData,
  LoginRequestData,
  AuthResponseData,
} from '../types/auth';

const auth = (api: AxiosInstance) => ({
  register: async (data: RegisterRequestData): Promise<AuthResponseData> => {
    const response = await api.post<AuthResponseData>('/api/users/register', {
      userId: data.userId,
      passwordHash: data.passwordHash,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      department: data.department,
      role: data.role.toUpperCase(),
      deptCode: data.deptCode,
    });
    return response.data;
  },

  login: async (data: LoginRequestData): Promise<AuthResponseData> => {
    const response = await api.post<AuthResponseData>('/api/auth/login', {
      userId: data.userId,
      password: data.password,
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  },
});

export default auth;
