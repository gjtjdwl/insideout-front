import { AxiosInstance } from 'axios';
import { InquiryData, IFormData, apiData } from '../types/board';

const board = (api: AxiosInstance) => ({
  inquiry: async () => {
    const response = await api.get<InquiryData[]>('/api/boards/inquiry');
    return response.data;
  },
  notice: async () => {
    const response = await api.get<InquiryData[]>('/api/boards/notice');
    return response.data;
  },

  inquiryDetail: async (inquiryId: number) => {
    const response = await api.get<InquiryData>(
      `/api/boards/inquiry/${inquiryId}`
    );
    return response.data;
  },

  noticeDetail: async (inquiryId: number) => {
    const response = await api.get<InquiryData>(
      `/api/boards/notice/${inquiryId}`
    );
    return response.data;
  },

  createBoard: async (data: FormData) => {
    const response = await api.post<IFormData>('/api/boards/create', data);
    return response.data;
  },

  modifyBoard: async (modifiedData: IFormData) => {
    const formData = new FormData();
    formData.append('userId', String(modifiedData.userId));
    formData.append('inquiryId', String(modifiedData.inquiryId));
    formData.append('title', modifiedData.title);
    formData.append('content', modifiedData.content);
    const response = await api.put<IFormData>(
      `/api/boards/modify/${modifiedData.inquiryId}`,
      modifiedData
    );

    return response.data;
  },

  deleteBoard: async (boardName: string, deleteData: apiData) => {
    const response = await api.delete<InquiryData>(
      `/api/boards/${boardName}/delete`,
      { data: deleteData }
    );
    return response.data;
  },
});

export default board;
