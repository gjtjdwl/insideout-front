import { AxiosInstance } from 'axios';
import { RegisterRequestData, RegisterResponseData } from '../types/auth';

const register = (api: AxiosInstance) => ({
  register: async (
    data: RegisterRequestData
  ): Promise<RegisterResponseData> => {
    const response = await api.post<RegisterResponseData>('/register', data);
    return response.data;
  },
});

export default register;
