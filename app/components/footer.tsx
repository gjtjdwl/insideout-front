const navigation = {
  main: [
    { name: '서비스소개', href: '#' },
    { name: '공지사항', href: '#' },
    { name: '감정본부', href: '#' },
    { name: '문의게시판', href: '#' },
  ],
};

export default function Footer() {
  return (
    <div className="bg-customPink px-4 sm:px-[50px] pb-[50px]">
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 pt-12 sm:pt-20 pb-8 lg:px-8">
          <div className="text-center mb-6 sm:mb-[32px]">🌸</div>
          <nav
            aria-label="Footer"
            className="flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-y-3 sm:gap-x-12 text-sm/6"
          >
            {navigation.main.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-center text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <p className="mt-8 sm:mt-16 text-center text-xs sm:text-sm/6 text-gray-600">
            &copy; 2025 EmotionHQ, All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
