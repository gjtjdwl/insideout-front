'use client';

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

export default function Header() {
  let role = '관리자';
  let navigation = employerNav;
  return (
    <div className="bg-customPink px-[50px] pt-[50px]">
      <header className="bg-white z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
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
          <div className="flex flex-1 items-center justify-end gap-x-6">
            <a
              href="#"
              className="hidden text-sm/6 font-semibold text-gray-900 lg:block"
            >
              로그인
            </a>
            <a
              href="#"
              className="rounded-md bg-customPink px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-customPinkHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              회원가입
            </a>
          </div>
        </nav>
        <hr />
      </header>
    </div>
  );
}
