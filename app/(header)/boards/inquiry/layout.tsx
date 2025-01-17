'use client'

import React from 'react';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { FaPencil } from "react-icons/fa6";

export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const boardName = 'inquiry'

  const hideButton = pathname.startsWith('/boards/inquiry/')

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl md:text-3xl" onClick={()=> router.push('/boards/inquiry')}>
            문의게시판
          </div>
          {!hideButton && (
            <Link href={`/boards/create/${boardName}`} className="flex items-center px-5 py-3 text-sm border border-[#D9D9D9] rounded-2xl">
              <span className='hidden md:block'>문의하기</span>
              <FaPencil />
            </Link>
          )}
        </div>
        <div >
            {children}
        </div>
      </div>
    </div>
  );
}
