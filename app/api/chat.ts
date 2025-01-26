import { AxiosInstance } from 'axios';
import {
  SessionCreationRequest,
  SessionInfo,
  MessageRequest,
  MessageResponse,
  ORSRequest,
  SessionEndRequest,
} from '../types/chat';

const chat = (api: AxiosInstance) => ({
  createSession: async (data: SessionCreationRequest) => {
    const response = await api.post('/chat/session/create', data);
    if (!response.data?.sessionId) {
      throw new Error('Invalid session response');
    }
    return {
      id: response.data.sessionId,
      date: response.data.createdAt,
      status: 'ACTIVE' as const,
      userId: response.data.userId,
    };
  },

  getSessions: async (userId: string) => {
    const response = await api.get<
      Array<{
        sessionId: number;
        createdAt: string;
        isClosed: boolean;
      }>
    >(`/chat/sessions?userId=${userId}`);

    // 백엔드 응답을 SessionInfo 형식으로 변환
    return response.data.map((session) => ({
      id: session.sessionId,
      date: session.createdAt,
      status: session.isClosed ? ('TERMINATED' as const) : ('ACTIVE' as const),
    }));
  },

  getMessages: async (sessionId: number) => {
    const response = await api.get<MessageResponse[]>(
      `/chat/${sessionId}/messages`
    );
    return response.data;
  },

  sendMessage: async (data: MessageRequest) => {
    try {
      const response = await api.post<MessageResponse>('/chat/send', data);
      return response.data;
    } catch (error) {
      console.error('Message send error:', error);
      throw error;
    }
  },

  updateOrsScore: async (data: ORSRequest) => {
    const response = await api.put('/chat/ORS', data);
    return response.data;
  },

  terminateSession: async (data: SessionEndRequest) => {
    const response = await api.put('/chat/session/terminate', data);
    return response.data;
  },

  cancelSession: async (sessionId: number) => {
    try {
      await api.put('/chat/session/terminate', {
        sessionId,
        srsScore: 0,
        agreement: 'DENIED',
      });
    } catch (error) {
      console.error('Failed to cancel session:', error);
      throw error;
    }
  },
  deleteSession: async (sessionId: number) => {
    try {
      await api.delete(`chat/session/${sessionId}/delete`);
    } catch (error) {
      console.error('Failed to cancel session:', error);
      throw error;
    }
  },
});

export default chat;
