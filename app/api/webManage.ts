import { AxiosInstance } from 'axios';

interface departmentType {
  deptCode: string;
  departmentName: string;
  managerName: string;
}
interface departmentUserType {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const webManage = (api: AxiosInstance) => ({
  departments: async (): Promise<departmentType> => {
    const response = await api.get<departmentType>('manage/departments');
    return response.data;
  },
});
export default webManage;
