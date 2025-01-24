import { AxiosInstance } from 'axios';
import { MemberData, sType } from '../types/manage';
import { MessageResponse } from '../types/chat';

const manage = (api: AxiosInstance) => ({
  departmentUser: async (userId: string) => {
    const response = await api.get<MemberData[]>('/manage/department/users', {
      params: {
        userId: userId,
      },
    });
    return response.data;
  },
  userSession: async (userId:string) => {
    const response = await api.get<sType[]>('/manage/accepted', {
      params: {
        userId: userId,
      },
    });
    return response.data;
  },
  sessionChat: async (sessionID: number) => {
    const response = await api.get<MessageResponse[]>(`/chat/${sessionID}/messages`)
    return response.data;
  },
  statsORS: async (userId: string) => {
    const response = await api.get(`/manage/statistics/ors/${userId}`)
    return response.data;
  }
});

export default manage;
