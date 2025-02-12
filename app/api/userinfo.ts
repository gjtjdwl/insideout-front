import { AxiosInstance } from 'axios';
import { mypageData, editRequestData, counsellog } from '../types/mypage';

function getCookieValue(cookieName: string): string | null {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split('=')[1] : null;
}

const user = (api: AxiosInstance) => ({
  userInfo: async (): Promise<mypageData> => {
    const token = getCookieValue('jwt');
    const response = await api.get<mypageData>('api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  editVerify: async (password: string) => {
    const token = getCookieValue('jwt');
    const response = await api.post(
      '/api/users/verify-password',
      {
        password: password,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
  edit: async (data: editRequestData) => {
    const token = getCookieValue('jwt');
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== undefined
      )
    ); //빈 객체 제거
    const response = await api.put('api/users/me', filteredData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  userSummary: async (userId: string) => {
    const response = await api.get<counsellog[]>(`/api/users/summary`);
    return response.data;
  },
});

export default user;
