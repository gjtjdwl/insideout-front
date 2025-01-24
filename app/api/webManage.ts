import { AxiosInstance } from 'axios';
import { departmentData, departmentUserData } from '../types/webManage';

const webManage = (api: AxiosInstance) => ({
  departments: async (): Promise<departmentData[]> => {
    const response = await api.get<departmentData[]>('manage/departments');
    return response.data;
  },
  departmentUsers: async (
    departmentName: string
  ): Promise<departmentUserData[]> => {
    const response = await api.get<departmentUserData[]>(
      'manage/department/users',
      { params: { departmentName } }
    );
    return response.data;
  },
});
export default webManage;
