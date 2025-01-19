import { AxiosInstance } from 'axios';
import { mypageType, mypageEditType } from '../types/mypage';

function getCookieValue(cookieName: string): string | null {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split('=')[1] : null;
}

const user = (api: AxiosInstance) => ({
  userInfo: async (): Promise<mypageType> => {
    const token = getCookieValue('jwt'); // 쿠키에서 토큰 가져오기
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
    const token = getCookieValue('jwt'); // 쿠키에서 토큰 가져오기
    const response = await api.put(
      'api/users/me',
      {
        newPassword: data.newPassword,
        email: data.email,
        phoneNumber: data.phoneNumber,
        deptCode: data.deptCode,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
});

export default user;
