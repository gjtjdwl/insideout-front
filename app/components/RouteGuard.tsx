'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = ['/', '/login', '/register'];
const roleRoutes = {
  USER: ['/chat'],
  MANAGER: ['/dashboard'],
  ADMIN: ['/admin'],
};

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // 로그인한 사용자가 login 또는 register 페이지 접근 시 홈으로 리다이렉트
    if (isAuthenticated && ['/login', '/register'].includes(pathname)) {
      router.push('/');
      return;
    }

    // 공개 경로는 모든 사용자가 접근 가능
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // 인증이 필요한 경로에 대해 비인증 사용자 체크
    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    // 인증된 사용자의 경우 해당 역할에 맞는 경로인지 확인
    const allowedRoutes = roleRoutes[user.role];
    if (!allowedRoutes?.includes(pathname)) {
      router.push('/');
    }
  }, [isAuthenticated, pathname, router, user, isLoading]);

  if (isLoading) {
    return null; // 또는 로딩 인디케이터
  }

  return <>{children}</>;
}
