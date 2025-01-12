'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const defaultNav = [
  { name: '서비스소개', href: '#serviceInfo' },
  { name: '공지사항', href: '#' },
  { name: '감정본부', href: '#' },
  { name: '문의게시판', href: '#' },
];

const employeeNav = [
  { name: '서비스소개', href: '#serviceInfo' },
  { name: '공지사항', href: '#' },
  { name: '감정본부', href: '#' },
  { name: '문의게시판', href: '#' },
  { name: '마이페이지', href: '#' },
];

const employerNav = [
  { name: '서비스소개', href: '#serviceInfo' },
  { name: '공지사항', href: '#' },
  { name: '관리자페이지', href: '#' },
  { name: '문의게시판', href: '#' },
  { name: '마이페이지', href: '#' },
];

const adminNav = [
  { name: '서비스소개', href: '#serviceInfo' },
  { name: '공지사항', href: '#' },
  { name: '관리자페이지', href: '#' },
  { name: '문의게시판', href: '#' },
  { name: '마이페이지', href: '#' },
];
// user manager admin
export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 사용자 역할에 따른 네비게이션 선택
  let navigation = defaultNav;
  if (user) {
    switch (user.role) {
      case 'MANAGER':
        navigation = employerNav;
        break;
      case 'USER':
        navigation = employeeNav;
        break;
      case 'ADMIN':
        navigation = adminNav;
        break;
    }
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="bg-customPink px-4 sm:px-[50px] pt-[50px]">
      <header className="bg-white z-50 relative">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-6 w-auto sm:h-8"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">메뉴 열기</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t">
              <div className="space-y-1 px-4 py-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-base font-medium text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-1 items-center justify-end gap-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm/6 font-semibold text-gray-900">
                  {user?.name}님
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  로그인
                </a>
                <a
                  href="/register"
                  className="rounded-md bg-customPink px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-customPinkHover"
                >
                  회원가입
                </a>
              </>
            )}
          </div>
        </nav>
        <hr />
      </header>
    </div>
  );
}
