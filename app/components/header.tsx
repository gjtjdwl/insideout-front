'use client';

import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

type NavigationItem =
  | { name: string; href: string; isDropdown: false } // 일반 링크
  | {
      name: string;
      isDropdown: true;
      dropDownItems: { name: string; href: string | undefined }[];
    }; // 드롭다운 메뉴

const defaultNav: NavigationItem[] = [
  { name: '서비스소개', href: '#serviceInfo', isDropdown: false },
  { name: '공지사항', href: '/boards/notice', isDropdown: false },
  { name: '감정본부', href: '/chat', isDropdown: false },
  { name: '문의게시판', href: '/boards/inquiry', isDropdown: false },
];

const employeeNav: NavigationItem[] = [
  { name: '서비스소개', href: '#serviceInfo', isDropdown: false },
  { name: '공지사항', href: '/boards/notice', isDropdown: false },
  { name: '감정본부', href: '/chat', isDropdown: false },
  { name: '문의게시판', href: '/boards/inquiry', isDropdown: false },
  {
    name: '마이페이지',
    isDropdown: true,
    dropDownItems: [
      { name: '내 정보', href: '/mypage' },
      { name: '상담 결과', href: '/mypage/counsellog' },
    ],
  },
];

const employerNav: NavigationItem[] = [
  { name: '서비스소개', href: '#serviceInfo', isDropdown: false },
  { name: '공지사항', href: '/boards/notice', isDropdown: false },
  { name: '관리자페이지', href: '/admin', isDropdown: false },
  { name: '문의게시판', href: '/boards/inquiry', isDropdown: false },
  { name: '마이페이지', href: '/mypage', isDropdown: false },
];

const adminNav: NavigationItem[] = [
  { name: '서비스소개', href: '#serviceInfo', isDropdown: false },
  { name: '공지사항', href: '/boards/notice', isDropdown: false },
  {
    name: '관리자페이지',
    isDropdown: true,
    dropDownItems: [
      { name: '부서 관리', href: '/manage/department' },
      { name: '개선 사항', href: '/manage/feedback' },
    ],
  },
  { name: '문의게시판', href: '/boards/inquiry', isDropdown: false },
  { name: '마이페이지', href: '/mypage', isDropdown: false },
];

export default function Header() {
  const { user, logout } = useUser();
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
  const solutions = [
    { name: '부서 관리', href: '#' },
    { name: '개선 사항', href: '#' },
  ];
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-customPink px-4 sm:px-[50px] pt-[50px]">
      <header className="bg-white z-50 relative">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt="Company Logo"
                src="/hq_logo.svg"
                width={30}
                height={30}
                className="w-14 h-14"
              />
            </Link>
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
            {navigation.map((item, index) => (
              <div key={index} className="relative">
                {item.isDropdown ? (
                  <Popover className="relative">
                    <PopoverButton className="inline-flex items-center outline-none gap-x-1 text-sm/6 font-semibold text-gray-900 ">
                      <span>{item.name}</span>
                      {/* <ChevronDownIcon aria-hidden="true" className="size-5" /> */}
                    </PopoverButton>
                    <PopoverPanel
                      transition
                      className="absolute left-1/2 z-10 mt-3 flex w-screen max-w-max -translate-x-1/2 pl-6 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                    >
                      <div className="w-full flex-auto overflow-hidden rounded-md bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
                        <div className="px-3 pt-3">
                          {item.dropDownItems.map((items) => (
                            <div
                              key={items.name}
                              className="group relative flex gap-x-6 rounded-sm p-2 pr-6 mb-3 "
                            >
                              <div>
                                <a
                                  href={items.href}
                                  className=" text-[#5F5F5F] hover:text-[#FE6767]"
                                >
                                  {items.name}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverPanel>
                  </Popover>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t">
              <div className="space-y-1 px-4 py-3">
                {navigation.map((item, index) => (
                  <div key={index} className="relative">
                    {item.isDropdown ? (
                      <div className="relative">
                        <div className="inline-flex items-center outline-none gap-x-1 pt-2 text-base font-medium text-gray-900">
                          <span>{item.name}</span>
                          {/* <ChevronDownIcon aria-hidden="true" className="size-5" /> */}
                        </div>
                        <div className="z-10 flex w-screen max-w-max">
                          <div className="w-full flex-auto overflow-hidden bg-white text-sm/6 font-medium ring-gray-900/5">
                            <div className="pl-4">
                              {item.dropDownItems.map((items) => (
                                <div
                                  key={items.name}
                                  className="relative flex hover:bg-gray-50 "
                                >
                                  <div>
                                    <a
                                      href={items.href}
                                      className="text-gray-900 hover:text-[#FE6767]"
                                    >
                                      {items.name}
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-base font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-1 items-center justify-end gap-x-4">
            {user ? (
              <>
                <span className="text-sm/6 font-semibold text-gray-900">
                  {user.name}님
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
                <Link
                  href="/login"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  로그인
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-customPink px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-customPinkHover"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </nav>
        <hr />
      </header>
    </div>
  );
}
