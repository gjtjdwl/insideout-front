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
    <div className="bg-customPink px-[50px] pb-[50px]">
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 pt-20 sm:pt-24 pb-8 lg:px-8">
          <div className="text-center mb-[32px]">🌸</div>
          <nav
            aria-label="Footer"
            className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
          >
            {navigation.main.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <p className="mt-16 text-center text-sm/6 text-gray-600">
            &copy; 2025 EmotionHQ, All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
