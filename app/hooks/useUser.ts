import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { useRouter } from 'next/navigation';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    document.cookie = `jwt=${token}; path=/`;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

    window.location.href = '/'; // 이후 상태관리가 복잡해지면 다른 방법으로 처리
  };

  return { user, loading, login, logout };
}
