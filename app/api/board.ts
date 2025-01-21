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

  modifyBoard: async (modifiedData: InquiryData) => {
    const response = await api.put<InquiryData>(
      `/api/boards/notice/modify/${modifiedData.inquiryId}`,
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
