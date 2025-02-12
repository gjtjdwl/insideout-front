import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './app/types/auth';

// 페이지별 접근 가능한 역할 정의
const roleBasedRoutes: Record<string, UserRole[]> = {
  '/manage': ['MANAGER', 'ADMIN'],
  '/admin/web': ['ADMIN'],
  '/chat': ['USER'],
};

export async function middleware(request: NextRequest) {
  // 쿠키 확인을 위한 지연 추가
  const waitForCookies = new Promise((resolve) => setTimeout(resolve, 200));
  await waitForCookies;

  const token = request.cookies.get('jwt')?.value;
  const userRole = request.cookies.get('role')?.value;
  const path = request.nextUrl.pathname;

  // 로그인/회원가입 페이지 처리
  const isAuthPage = ['/login', '/register'].includes(path);
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();

  // 보호된 경로 체크
  const protectedPath = Object.keys(roleBasedRoutes).find((route) =>
    path.startsWith(route)
  );

  // 보호된 경로가 아닌 경우 그대로 진행
  if (!protectedPath) {
    return response;
  }

  // 보호된 경로인데 토큰이 없는 경우
  if (!token || !userRole) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 권한 체크
  const allowedRoles =
    roleBasedRoutes[protectedPath as keyof typeof roleBasedRoutes];
  if (!allowedRoles.includes(userRole as UserRole)) {
    const redirectResponse = NextResponse.redirect(new URL('/', request.url));
    redirectResponse.cookies.set('error', '잘못된 접근입니다.');
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/chat/:path*',
    '/manage/:path*',
    '/admin/web/:path*',
  ],
};
