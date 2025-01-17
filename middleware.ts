import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const isAuthPage =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register';

  // 인증이 필요한 페이지 목록
  const authRequiredPages = ['/chat', '/dashboard', '/admin'];
  const isAuthRequired = authRequiredPages.some((page) =>
    request.nextUrl.pathname.startsWith(page)
  );

  // 이미 로그인한 사용자가 로그인/회원가입 페이지 접근 시
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 비로그인 사용자가 인증이 필요한 페이지 접근 시
  if (!token && isAuthRequired) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/chat/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};
