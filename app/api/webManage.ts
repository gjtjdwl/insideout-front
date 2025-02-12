import { AxiosInstance } from 'axios';
import {
  departmentData,
  departmentUserData,
  PagedepartmentData,
  PagedepartmentUserData,
  weeklyData,
} from '../types/webManage';

const webManage = (api: AxiosInstance) => ({
  departments: async (
    keyword: string,
    page: number
  ): Promise<PagedepartmentData> => {
    const response = await api.get<PagedepartmentData>(
      `manage/departments?keyword=${keyword}&page=${page}&size=4`
    );
    return response.data;
  },
  departmentUsers: async (
    departmentName: string,
    page: number
  ): Promise<PagedepartmentUserData> => {
    const response = await api.get<PagedepartmentUserData>(
      `manage/department/users/by?departmentName=${departmentName}&page=${page}&size=10`
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
