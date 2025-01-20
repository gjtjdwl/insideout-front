import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];

      if (!jwt) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // JWT 디코딩하여 만료 확인
        const decoded = jwtDecode(jwt);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        }

        // localStorage에서 사용자 정보 복원
        const userStr = localStorage.getItem('user');
        if (userStr) {
          setUser(JSON.parse(userStr));
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        logout();
      }
      setLoading(false);
    };

    checkAuth();
    // 상태 변화를 감지하기 위한 이벤트 리스너 추가
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    // 사용자 정보 저장
    localStorage.setItem('user', JSON.stringify(userData));
    // JWT 쿠키 설정
    document.cookie = `jwt=${token}; path=/; secure; samesite=strict`;
    document.cookie = `role=${userData.role}; path=/; secure; samesite=strict`;
    // storage 이벤트를 수동으로 발생시켜 다른 탭/창에서도 상태 업데이트
    window.dispatchEvent(new Event('storage'));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // 쿠키 삭제
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    // storage 이벤트를 수동으로 발생시켜 다른 탭/창에서도 상태 업데이트
    window.dispatchEvent(new Event('storage'));
    router.push('/login');
  };

  return { user, loading, login, logout };
}
