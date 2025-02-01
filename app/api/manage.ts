import { AxiosInstance } from 'axios';
import { MemberData, statsData, SessionIdResponse } from '../types/manage';
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
  userSession: async (userId: string) => {
    const response = await api.get<SessionIdResponse[]>('/manage/accepted', {
      params: {
        userId: userId,
      },
    });
    return response.data;
  },
  sessionChat: async (sessionID: number) => {
    const response = await api.get<MessageResponse[]>(
      `/chat/${sessionID}/messages`
    );
    return response.data;
  },
  statsORS: async (userId: string) => {
    const response = await api.get<statsData>('/manage/statistics/ors', {
      params: {
        userId: userId,
      },
    });
    return response.data;
  },
  improvements: async (userId: string) => {
    const response = await api.post(`/manage/department/improvements/${userId}`, userId)
    return response.data
  }
});

export default manage;
