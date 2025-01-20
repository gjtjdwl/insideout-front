import { AxiosInstance } from 'axios';
import { mypageType, mypageEditType } from '../types/mypage';

function getCookieValue(cookieName: string): string | null {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split('=')[1] : null;
}

const user = (api: AxiosInstance) => ({
  userInfo: async (): Promise<mypageType> => {
    const token = getCookieValue('jwt');
    const response = await api.get<mypageType>('api/users/me', {
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
  edit: async (data: mypageEditType) => {
    const token = getCookieValue('jwt');
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== '' && value !== undefined
      )
    );
    const response = await api.put(
      'api/users/me',

      filteredData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response.data);
    return response.data;
  },
});

export default user;
