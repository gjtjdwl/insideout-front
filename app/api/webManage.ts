import { AxiosInstance } from 'axios';
import {
  departmentData,
  departmentUserData,
  weeklyData,
} from '../types/webManage';

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
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/api/users/${userId}/delete`);
    return response.data;
  },
  SRS: async (): Promise<weeklyData> => {
    const response = await api.get<weeklyData>('/manage/statistics/srs');
    return response.data;
  },
});
export default webManage;
