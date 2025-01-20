import { AxiosInstance } from 'axios';
import { InquiryData, IFormData } from '../types/board';

const board = (api: AxiosInstance) => ({
  inquiry: async () => {
    const response = await api.get<InquiryData[]>('/api/boards/inquiry');
    return response.data;
  },

  inquiryDetail: async (inquiryId: number) => {
    const response = await api.get<InquiryData>(`/api/boards/inquiry/${inquiryId}`);
    return response.data;
  },
  
  noticeDetail: async (inquiryId: number) => {
    const response = await api.get<InquiryData>(`/api/boards/notice/${inquiryId}`);
    return response.data;
  },

  createBoard: async (data: FormData) => {
    const response = await api.post<IFormData>('/api/boards/create', data);
    return response.data;
  },

  modifyBoard: async (inquiryId: number, modifiedData: InquiryData) => {
    const response = await api.put<InquiryData>(`/api/boards/notice/modify/${inquiryId}`, modifiedData);
    return response.data;
  },

  deleteBoard: async (boardName:string, inquiryId: number) => {
    const response = await api.delete<InquiryData>(`/api/boards/notice/${inquiryId}`);
    return response.data;
  },

})

export default board;

