import { AxiosInstance } from 'axios';
import {
  departmentData,
  departmentUserData,
  PagedepartmentData,
  PagedepartmentUserData,
  weeklyData,
} from '../types/webManage';

const webManage = (api: AxiosInstance) => ({
  departments: async (page: number): Promise<PagedepartmentData> => {
    const response = await api.get<PagedepartmentData>(
      `manage/departments?page=${page}&size=4`
    );
    return response.data;
  },
  departmentUsers: async (
    departmentName: string, page:number
  ): Promise<PagedepartmentUserData> => {
    const response = await api.get<PagedepartmentUserData>(
      `manage/department/users?page=${page}&size=10`,
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
