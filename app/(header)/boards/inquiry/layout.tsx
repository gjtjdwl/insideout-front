'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaPencil } from "react-icons/fa6";
export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const boardName = 'inquiry'
  const breakdown = [
    {
      title: '전체 문의 내역'
    },
    {
      title: '나의 문의 내역'
    },
  ];
  const hideButton = pathname.startsWith('/boards/inquiry/')

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl lg:text-3xl">
            문의게시판
          </div>
          {!hideButton && (
            <Link href={`/boards/create/${boardName}`} className="flex items-center px-5 py-3 text-sm border border-[#D9D9D9] rounded-2xl">
              <span className='hidden md:block'>문의하기</span>
              <FaPencil />
            </Link>
          )}
        </div>
        <div className="flex">
          <div className="my-9 whitespace-normal sm:whitespace-nowrap break-words">
            {breakdown.map((item, index) => (
              <div key={index} className="px-6 pb-4 mt-4 font-semibold cursor-pointer text-sm lg:text-base">
                <span>{item.title}</span>
              </div>
            ))}
          </div>
          <div className="mt-9 w-[90%] flex-grow flex flex-col justify-center border p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
