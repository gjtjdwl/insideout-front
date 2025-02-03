import { AxiosInstance } from 'axios';
import {
  InquiryData,
  IFormData,
  apiData,
  CommentData,
  delData,
} from '../types/board';

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
    const request = {
      userId: String(modifiedData.userId),
      title: modifiedData.title,
      content: modifiedData.content,
    };
    formData.append('request', JSON.stringify(request));
    const response = await api.put<IFormData>(
      `/api/boards/modify/${modifiedData.inquiryId}`,
      formData
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

  modifyComment: async (commentId: number, modifiedComment: string) => {
    const response = await api.put<string>(
      `/api/comments/${commentId}`,
      modifiedComment
    );
    return response.data;
  },
  createComment: async (inquiryId: number, comment: CommentData) => {
    const response = await api.post<CommentData>(
      `/api/comments/${inquiryId}`,
      comment
    );
    return response.data;
  },

  deleteComment: async (deleteData: delData) => {
    const response = await api.delete('/api/comments/delete', {
      data: deleteData,
    });
    return response.data;
  },
});

export default board;
