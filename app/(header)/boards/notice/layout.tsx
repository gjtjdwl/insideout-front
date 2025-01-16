'use client';

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link'
import { useUser } from '../../../hooks/useUser';
import { IoSearch, IoClose } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";

export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  const boardName = 'notice'
  const router = useRouter();
  // const { user } = useUser();
  const [searchValue, setSearchValue] = useState<string>("");
  const user: string = 'ADMIN'
  const pathname = usePathname();

  const handleClear = () => {
    setSearchValue("");
  }
  // 특정 경로에서 버튼 숨김  오.. 쩐다. . .. 
  const hideButton = pathname.startsWith('/boards/notice/')
  
  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-xl lg:text-3xl">
            공지사항
          </div>
          {/* 버튼 조건부 렌더링  */}
          {!hideButton && (
            !user ? (
            <>
              <div className="flex items-center relative">
                <IoSearch className="absolute left-4 text-[#757575]" />
                <input
                  id="search"
                  name="search"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder=""
                  className="border border-[#D9D9D9] rounded-3xl block min-w-0 grow py-1.5 pr-6 pl-10 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
                <IoClose onClick={handleClear} type="button" className="absolute right-3 cursor-pointer" />
              </div>
            </>
          )
            : (
              <>
                {user === 'ADMIN' && (
                  <>
                    <Link href={`/boards/create/${boardName}`} className="flex items-center px-5 py-3 text-sm border border-[#D9D9D9] rounded-2xl">
                      <span className='hidden md:block'>공지하기</span>
                      <FaPencil />
                    </Link>
                  </>
                )
                }
              </>
            )
          )
        }
        </div>
        <div className="flex">
          {children}
        </div>
      </div>
    </div>
  )
}
